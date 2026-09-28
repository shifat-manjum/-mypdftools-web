// content.js - Robust GoFullPage-style full page auto-scroller with dynamic container fallback

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

  // Find scrollable container if html/body are fixed height (common in SPAs / web apps)
  function getScrollTarget() {
    const docHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight
    );
    if (docHeight > window.innerHeight + 50) {
      return window;
    }

    // Check inner containers with scroll
    const candidates = document.querySelectorAll('main, [role="main"], #root, #__next, #app, .app, body > div');
    for (const el of candidates) {
      if (el.scrollHeight > window.innerHeight + 50) {
        const style = window.getComputedStyle(el);
        if (style.overflowY === 'auto' || style.overflowY === 'scroll') {
          return el;
        }
      }
    }
    return window;
  }

  function getScrollY(target) {
    if (target === window) {
      return window.scrollY || window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    }
    return target.scrollTop || 0;
  }

  function setScrollY(target, y) {
    if (target === window) {
      window.scrollTo({ left: 0, top: y, behavior: 'instant' });
      if (document.documentElement) document.documentElement.scrollTop = y;
      if (document.body) document.body.scrollTop = y;
    } else {
      target.scrollTop = y;
    }
  }

  function getDocHeight(target) {
    if (target === window) {
      return Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.documentElement.clientHeight,
        window.innerHeight
      );
    }
    return Math.max(target.scrollHeight, target.clientHeight, window.innerHeight);
  }

  // Soften top fixed header bars (< 140px) on subsequent scrolls so they don't repeat
  function handleFixedHeaders(hide) {
    const all = document.querySelectorAll('header, nav, [class*="header"], [class*="nav"]');
    for (const el of all) {
      if (el.id === '__mypdftools_capture_overlay' || el.closest('#__mypdftools_capture_overlay')) continue;

      const style = window.getComputedStyle(el);
      const rect = el.getBoundingClientRect();

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

  async function executeCapture(mode) {
    const scrollTarget = getScrollTarget();
    const origScrollX = window.scrollX;
    const origScrollY = getScrollY(scrollTarget);
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const devicePixelRatio = window.devicePixelRatio || 1;

    // Inject styles to disable smooth scrolling and hide scrollbars during capture
    const overrideStyle = document.createElement('style');
    overrideStyle.id = '__mypdftools_capture_styles';
    overrideStyle.textContent = `
      html, body, * {
        scroll-behavior: auto !important;
      }
      ::-webkit-scrollbar {
        display: none !important;
        width: 0 !important;
        height: 0 !important;
      }
    `;
    document.documentElement.appendChild(overrideStyle);

    let origBodyStyle = '';
    if (mode === 'mobile') {
      origBodyStyle = document.body.getAttribute('style') || '';
      document.body.style.maxWidth = '390px';
      document.body.style.margin = '0 auto';
      document.body.style.boxShadow = '0 0 40px rgba(0,0,0,0.5)';
      await sleep(350);
    }

    createProgressOverlay();

    const slices = [];

    try {
      // 1. Visible Screen Only Mode
      if (mode === 'visible') {
        if (progressOverlay) progressOverlay.style.display = 'none';
        await sleep(100);

        const response = await new Promise((resolve) => {
          chrome.runtime.sendMessage({ action: 'CAPTURE_SLICE' }, (res) => resolve(res));
        });

        if (response && response.dataUrl) {
          slices.push({
            dataUrl: response.dataUrl,
            scrollY: 0,
            viewportHeight: viewportHeight,
            viewportWidth: viewportWidth,
          });
        }

        chrome.runtime.sendMessage({
          action: 'CAPTURE_COMPLETED',
          slices: slices,
          totalWidth: viewportWidth,
          totalHeight: viewportHeight,
          viewportHeight: viewportHeight,
          devicePixelRatio: devicePixelRatio,
          pageTitle: document.title || 'Screen Capture',
          pageUrl: window.location.href,
          mode: 'visible',
        });
        return;
      }

      // 2. Full Page (Desktop or Mobile) Mode - GoFullPage Scrolling Loop
      setScrollY(scrollTarget, 0);
      await sleep(300);

      let currentY = 0;
      let lastActualY = -1;
      let maxIterations = 60; // Up to ~60 viewports (~60,000px) safety guard

      while (maxIterations-- > 0) {
        setScrollY(scrollTarget, currentY);
        await sleep(250); // Allow DOM rendering and lazy images to settle

        const actualY = getScrollY(scrollTarget);
        const dynamicDocHeight = getDocHeight(scrollTarget);

        // Hide fixed header after first slice
        if (actualY > 50) {
          handleFixedHeaders(true);
        }

        // Hide overlay before snapping slice
        if (progressOverlay) progressOverlay.style.display = 'none';

        const response = await new Promise((resolve) => {
          chrome.runtime.sendMessage({ action: 'CAPTURE_SLICE' }, (res) => resolve(res));
        });

        if (progressOverlay) progressOverlay.style.display = 'block';

        if (response && response.dataUrl) {
          slices.push({
            dataUrl: response.dataUrl,
            scrollY: actualY,
            viewportHeight: viewportHeight,
            viewportWidth: viewportWidth,
          });
        }

        const progress = Math.min(100, ((actualY + viewportHeight) / dynamicDocHeight) * 100);
        updateProgress(progress);

        // Check if reached bottom or cannot scroll further
        if (actualY + viewportHeight >= dynamicDocHeight - 5 || actualY === lastActualY) {
          break;
        }

        lastActualY = actualY;
        currentY += viewportHeight;
      }

      // Calculate total height accurately from actual slices
      const lastSlice = slices[slices.length - 1];
      const finalHeight = lastSlice ? lastSlice.scrollY + viewportHeight : viewportHeight;

      chrome.runtime.sendMessage({
        action: 'CAPTURE_COMPLETED',
        slices: slices,
        totalWidth: viewportWidth,
        totalHeight: finalHeight,
        viewportHeight: viewportHeight,
        devicePixelRatio: devicePixelRatio,
        pageTitle: document.title || 'Webpage Screenshot',
        pageUrl: window.location.href,
        mode: mode,
      });
    } catch (err) {
      console.error('Capture sequence error:', err);
    } finally {
      handleFixedHeaders(false);
      if (overrideStyle && overrideStyle.parentNode) {
        overrideStyle.parentNode.removeChild(overrideStyle);
      }
      if (mode === 'mobile') {
        document.body.setAttribute('style', origBodyStyle);
      }
      setScrollY(scrollTarget, origScrollY);
      window.scrollTo(origScrollX, origScrollY);
      removeProgressOverlay();
    }
  }

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'EXECUTE_CAPTURE') {
      executeCapture(message.mode || 'desktop');
      sendResponse({ status: 'started' });
    }
    return true;
  });
})();
