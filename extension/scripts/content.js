// content.js - Reliable auto-scroller with exact pixel positioning and smart header handling

(() => {
  // Prevent duplicate injection
  if (window.__mypdftools_capture_injected) return;
  window.__mypdftools_capture_injected = true;

  let progressOverlay = null;

  function createProgressOverlay() {
    if (progressOverlay) return;

    progressOverlay = document.createElement('div');
    progressOverlay.id = '__mypdftools_capture_overlay';
    progressOverlay.innerHTML = `
      <div style="
        position: fixed;
        top: 24px;
        right: 24px;
        z-index: 2147483647;
        background: rgba(15, 23, 42, 0.94);
        backdrop-filter: blur(12px);
        border: 1px solid rgba(16, 185, 129, 0.4);
        color: #ffffff;
        padding: 14px 20px;
        border-radius: 16px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(16, 185, 129, 0.2);
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-size: 13px;
        display: flex;
        flex-direction: column;
        gap: 8px;
        min-width: 240px;
        pointer-events: none;
        animation: __mypdftools_fade 0.2s ease-out;
      ">
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <div style="width: 10px; height: 10px; border-radius: 50%; background: #10b981; box-shadow: 0 0 10px #10b981;"></div>
            <span style="font-weight: 800; letter-spacing: -0.2px;">MyPdfTools Capture</span>
          </div>
          <span id="__mypdftools_percent" style="font-weight: 900; color: #34d399; font-size: 14px;">0%</span>
        </div>
        <div style="width: 100%; height: 6px; background: rgba(255, 255, 255, 0.1); border-radius: 9999px; overflow: hidden;">
          <div id="__mypdftools_bar" style="width: 0%; height: 100%; background: linear-gradient(90deg, #10b981, #34d399); transition: width 0.15s ease;"></div>
        </div>
        <span style="font-size: 10px; color: #94a3b8; text-align: center;">Scanning & stitching full page...</span>
      </div>
    `;

    document.body.appendChild(progressOverlay);
  }

  function updateProgress(percent) {
    const percentEl = document.getElementById('__mypdftools_percent');
    const barEl = document.getElementById('__mypdftools_bar');
    if (percentEl) percentEl.textContent = `${Math.min(100, Math.round(percent))}%`;
    if (barEl) barEl.style.width = `${Math.min(100, Math.round(percent))}%`;
  }

  function removeProgressOverlay() {
    if (progressOverlay && progressOverlay.parentNode) {
      progressOverlay.parentNode.removeChild(progressOverlay);
      progressOverlay = null;
    }
  }

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Only soften top fixed navigation bars (< 140px) on subsequent scrolls so they don't repeat
  // NEVER use display: none which breaks page layout!
  function handleFixedHeaders(hide) {
    const all = document.querySelectorAll('header, nav, [class*="header"], [class*="nav"]');
    for (const el of all) {
      if (el.id === '__mypdftools_capture_overlay' || el.closest('#__mypdftools_capture_overlay')) continue;

      const style = window.getComputedStyle(el);
      const rect = el.getBoundingClientRect();

      // Only target small top header bars that stick to top: 0
      if ((style.position === 'fixed' || style.position === 'sticky') && rect.top <= 10 && rect.height < 140) {
        if (hide) {
          if (el.__mypdftools_orig_opacity === undefined) {
            el.__mypdftools_orig_opacity = el.style.opacity || '1';
          }
          el.style.opacity = '0';
        } else {
          if (el.__mypdftools_orig_opacity !== undefined) {
            el.style.opacity = el.__mypdftools_orig_opacity;
            delete el.__mypdftools_orig_opacity;
          }
        }
      }
    }
  }

  async function executeFullPageCapture(mode) {
    const origScrollX = window.scrollX;
    const origScrollY = window.scrollY;

    // Reset scroll to top smoothly before starting capture
    window.scrollTo(0, 0);
    await sleep(250);

    createProgressOverlay();

    let origBodyStyle = '';
    if (mode === 'mobile') {
      origBodyStyle = document.body.getAttribute('style') || '';
      document.body.style.maxWidth = '390px';
      document.body.style.margin = '0 auto';
      document.body.style.boxShadow = '0 0 40px rgba(0,0,0,0.5)';
      await sleep(350);
    }

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const scrollHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.documentElement.clientHeight
    );
    const devicePixelRatio = window.devicePixelRatio || 1;

    const slices = [];
    let currentY = 0;
    let lastActualY = -1;

    try {
      while (true) {
        window.scrollTo(0, currentY);
        await sleep(250); // Allow render and animations to settle

        const actualY = window.scrollY;

        // Hide top fixed header bar after the first viewport slice so it only appears at the top
        if (actualY > 50) {
          handleFixedHeaders(true);
        }

        // Hide progress overlay briefly so it is never captured in the slice screenshot
        if (progressOverlay) progressOverlay.style.display = 'none';

        // Capture visible slice from background service worker
        const response = await new Promise((resolve) => {
          chrome.runtime.sendMessage(
            { action: 'CAPTURE_SLICE' },
            (res) => resolve(res)
          );
        });

        // Restore progress overlay immediately after capture
        if (progressOverlay) progressOverlay.style.display = 'block';

        if (response && response.dataUrl) {
          slices.push({
            dataUrl: response.dataUrl,
            scrollY: actualY,
            viewportHeight: viewportHeight,
            viewportWidth: viewportWidth,
          });
        }

        const progress = Math.min(100, ((actualY + viewportHeight) / scrollHeight) * 100);
        updateProgress(progress);

        // Check if we've reached the very bottom of the webpage
        if (actualY + viewportHeight >= scrollHeight - 5 || actualY === lastActualY) {
          break;
        }

        lastActualY = actualY;
        currentY += viewportHeight;
      }
    } catch (err) {
      console.error('Capture sequence error:', err);
    } finally {
      handleFixedHeaders(false);
      if (mode === 'mobile') {
        document.body.setAttribute('style', origBodyStyle);
      }
      window.scrollTo(origScrollX, origScrollY);
      removeProgressOverlay();
    }

    // Send the captured slices to the background service worker
    chrome.runtime.sendMessage({
      action: 'CAPTURE_COMPLETED',
      slices: slices,
      totalWidth: viewportWidth,
      totalHeight: scrollHeight,
      viewportHeight: viewportHeight,
      devicePixelRatio: devicePixelRatio,
      pageTitle: document.title || 'Webpage Screenshot',
      pageUrl: window.location.href,
      mode: mode,
    });
  }

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'EXECUTE_CAPTURE') {
      executeFullPageCapture(message.mode || 'desktop');
      sendResponse({ status: 'started' });
    }
    return true;
  });
})();
