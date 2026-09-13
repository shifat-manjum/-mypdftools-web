// content.js - Injected into webpage to handle auto-scrolling, sticky-header management, and slice coordination

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
        <span style="font-size: 10px; color: #94a3b8; text-align: center;">Auto-scrolling and stitching page...</span>
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

  // Handle sticky / fixed elements to prevent repeating headers down the stitched image
  function handleFixedElements(hide) {
    const all = document.querySelectorAll('*');
    for (const el of all) {
      // Don't touch our progress overlay
      if (el.id === '__mypdftools_capture_overlay' || el.closest('#__mypdftools_capture_overlay')) continue;

      const style = window.getComputedStyle(el);
      if (style.position === 'fixed' || style.position === 'sticky') {
        if (hide) {
          if (!el.__mypdftools_orig_display) {
            el.__mypdftools_orig_display = el.style.display || 'block';
          }
          el.style.display = 'none';
        } else {
          if (el.__mypdftools_orig_display) {
            el.style.display = el.__mypdftools_orig_display;
            delete el.__mypdftools_orig_display;
          }
        }
      }
    }
  }

  async function executeFullPageCapture(mode) {
    const origScrollX = window.scrollX;
    const origScrollY = window.scrollY;

    createProgressOverlay();

    // If mobile simulation requested, apply temporary viewport constraint
    let origBodyStyle = '';
    if (mode === 'mobile') {
      origBodyStyle = document.body.getAttribute('style') || '';
      document.body.style.maxWidth = '390px';
      document.body.style.margin = '0 auto';
      document.body.style.boxShadow = '0 0 40px rgba(0,0,0,0.5)';
      await sleep(350); // let responsive styles recalculate
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

    try {
      while (currentY < scrollHeight) {
        // Scroll to position
        window.scrollTo(0, currentY);

        // After the first viewport slice, temporarily hide fixed headers to avoid repeating headers
        if (currentY > 0) {
          handleFixedElements(true);
        }

        // Wait for render / lazy images
        await sleep(220);

        // Notify background to capture visible area
        const response = await new Promise((resolve) => {
          chrome.runtime.sendMessage(
            { action: 'CAPTURE_SLICE' },
            (res) => resolve(res)
          );
        });

        if (response && response.dataUrl) {
          slices.push({
            dataUrl: response.dataUrl,
            yOffset: currentY,
            viewportHeight: viewportHeight,
            viewportWidth: viewportWidth,
          });
        }

        currentY += viewportHeight;
        const progress = Math.min(100, (currentY / scrollHeight) * 100);
        updateProgress(progress);
      }
    } catch (err) {
      console.error('Capture sequence error:', err);
    } finally {
      // Restore page state
      handleFixedElements(false);
      if (mode === 'mobile') {
        document.body.setAttribute('style', origBodyStyle);
      }
      window.scrollTo(origScrollX, origScrollY);
      removeProgressOverlay();
    }

    // Send collected slices to background to assemble into the studio
    chrome.runtime.sendMessage({
      action: 'CAPTURE_COMPLETED',
      slices: slices,
      totalWidth: viewportWidth,
      totalHeight: scrollHeight,
      devicePixelRatio: devicePixelRatio,
      pageTitle: document.title || 'Webpage Screenshot',
      pageUrl: window.location.href,
      mode: mode,
    });
  }

  // Listen for messages from background / popup
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'EXECUTE_CAPTURE') {
      executeFullPageCapture(message.mode || 'desktop');
      sendResponse({ status: 'started' });
    }
    return true;
  });
})();

