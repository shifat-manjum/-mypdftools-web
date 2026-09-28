// content.js - GoFullPage-grade auto-scroller with deep container detection (Gmail, Dashboards, SPAs)

(() => {
  let progressOverlay = null;

  function createProgressOverlay() {
    if (progressOverlay) return;

    progressOverlay = document.createElement('div');
    progressOverlay.id = '__mypdftools_capture_overlay';
    progressOverlay.innerHTML = `
      <div style="
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 2147483647;
        background: rgba(15, 23, 42, 0.94);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid rgba(16, 185, 129, 0.35);
        color: #ffffff;
        padding: 26px 36px;
        border-radius: 20px;
        box-shadow: 0 25px 60px rgba(0, 0, 0, 0.45), 0 0 30px rgba(16, 185, 129, 0.2);
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;
        min-width: 320px;
        pointer-events: none;
        animation: __mypdftools_pop 0.22s cubic-bezier(0.16, 1, 0.3, 1);
      ">
        <style>
          @keyframes __mypdftools_pop {
            from { transform: translate(-50%, -46%) scale(0.92); opacity: 0; }
            to { transform: translate(-50%, -50%) scale(1); opacity: 1; }
          }
          @keyframes __mypdftools_pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.08); }
          }
          @keyframes __mypdftools_shutter {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        </style>
        
        <!-- Animated Camera Shutter Icon -->
        <div style="position: relative; width: 60px; height: 60px; display: flex; align-items: center; justify-content: center;">
          <div style="position: absolute; inset: 0; border: 3px dashed rgba(16, 185, 129, 0.35); border-radius: 50%; animation: __mypdftools_shutter 8s linear infinite;"></div>
          <div style="width: 48px; height: 48px; border-radius: 50%; background: linear-gradient(135deg, #10b981, #059669); display: flex; align-items: center; justify-content: center; box-shadow: 0 0 20px rgba(16, 185, 129, 0.5); animation: __mypdftools_pulse 2s ease-in-out infinite;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
              <circle cx="12" cy="13" r="4"></circle>
            </svg>
          </div>
        </div>

        <!-- Text Labels -->
        <div style="text-align: center;">
          <h3 style="margin: 0; font-size: 16px; font-weight: 800; color: #ffffff; letter-spacing: -0.2px;">Capturing Full Page</h3>
          <p id="__mypdftools_status" style="margin: 4px 0 0 0; font-size: 13px; color: #94a3b8; font-weight: 600;">Scanning document (0%)...</p>
        </div>

        <!-- Progress Bar -->
        <div style="width: 100%; height: 7px; background: rgba(255, 255, 255, 0.1); border-radius: 999px; overflow: hidden;">
          <div id="__mypdftools_bar" style="width: 0%; height: 100%; background: linear-gradient(90deg, #10b981, #34d399); transition: width 0.18s ease-out; border-radius: 999px;"></div>
        </div>
      </div>
    `;

    document.body.appendChild(progressOverlay);
  }

  function updateProgress(percent, current, total) {
    const statusEl = document.getElementById('__mypdftools_status');
    const barEl = document.getElementById('__mypdftools_bar');
    const pct = Math.min(100, Math.max(0, Math.round(percent)));
    if (statusEl) {
      statusEl.textContent = total > 1 ? `Capturing part ${current} of ${total} (${pct}%)` : `Capturing page (${pct}%)...`;
    }
    if (barEl) barEl.style.width = `${pct}%`;
  }

  function removeProgressOverlay() {
    if (progressOverlay && progressOverlay.parentNode) {
      progressOverlay.parentNode.removeChild(progressOverlay);
      progressOverlay = null;
    }
  }

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Deep inspection to identify the real scrolling element (Gmail, Notion, Slack, Google Docs, etc.)
  function findScrollTarget() {
    // 1. Check if window can actually scroll
    const origWinY = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    window.scrollTo({ left: 0, top: origWinY + 50, behavior: 'instant' });
    const afterWinY = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const winCanScroll = Math.abs(afterWinY - origWinY) > 5;
    window.scrollTo({ left: 0, top: origWinY, behavior: 'instant' });

    // 2. Scan DOM elements for scrollable containers (like Gmail email tables)
    const elements = document.querySelectorAll('*');
    let bestEl = null;
    let maxScore = 0;

    for (const el of elements) {
      if (['SCRIPT', 'STYLE', 'LINK', 'META', 'NOSCRIPT', 'SVG', 'PATH', 'IFRAME'].includes(el.tagName)) continue;
      if (el.id === '__mypdftools_capture_overlay' || el.closest('#__mypdftools_capture_overlay')) continue;

      const scrollH = el.scrollHeight;
      const clientH = el.clientHeight;
      const diff = scrollH - clientH;

      if (diff > 50 && clientH > 150 && el.clientWidth > 200) {
        // Test if scrollTop can actually be changed
        const curTop = el.scrollTop;
        const testDelta = (curTop > 10) ? -10 : 10;
        el.scrollTop = curTop + testDelta;
        const canScroll = Math.abs(el.scrollTop - curTop) > 2;
        el.scrollTop = curTop; // restore original position

        if (canScroll) {
          const area = el.clientWidth * el.clientHeight;
          const score = diff * 4 + area;
          if (score > maxScore) {
            maxScore = score;
            bestEl = el;
          }
        }
      }
    }

    const winScrollHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight,
      document.documentElement.offsetHeight,
      window.innerHeight
    );

    // If an inner container exists and (window can't scroll OR container has much more content):
    if (bestEl && (!winCanScroll || (bestEl.scrollHeight - bestEl.clientHeight > 300))) {
      const rect = bestEl.getBoundingClientRect();
      return {
        isWindow: false,
        el: bestEl,
        rect: {
          x: Math.round(rect.left),
          y: Math.round(rect.top),
          width: Math.round(rect.width),
          height: Math.round(rect.height),
        },
        getScrollY: () => bestEl.scrollTop || 0,
        setScrollY: (y) => { bestEl.scrollTop = y; },
        getScrollHeight: () => bestEl.scrollHeight,
        getViewportHeight: () => bestEl.clientHeight,
        getViewportWidth: () => window.innerWidth,
      };
    }

    // Default: Window / Document element
    return {
      isWindow: true,
      el: window,
      rect: null,
      getScrollY: () => window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0,
      setScrollY: (y) => {
        window.scrollTo({ left: 0, top: y, behavior: 'instant' });
        if (document.documentElement) document.documentElement.scrollTop = y;
        if (document.body) document.body.scrollTop = y;
      },
      getScrollHeight: () => winScrollHeight,
      getViewportHeight: () => window.innerHeight,
      getViewportWidth: () => window.innerWidth,
    };
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
    const target = findScrollTarget();
    const origWinX = window.scrollX;
    const origWinY = window.scrollY;
    const origTargetY = target.getScrollY();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const devicePixelRatio = window.devicePixelRatio || 1;

    // Inject temporary styles to disable smooth scrolling animations and hide ugly scrollbars
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
          isContainer: false,
          containerRect: null,
        });
        return;
      }

      // 2. Full Page Mode (Window or Inner Container like Gmail)
      window.scrollTo({ left: 0, top: 0, behavior: 'instant' });
      target.setScrollY(0);
      await sleep(350);

      const clientH = target.getViewportHeight();
      const scrollHeight = target.getScrollHeight();
      // Step size with 50px overlap buffer
      const stepSize = Math.max(160, clientH - 50);

      let currentY = 0;
      let lastActualY = -99999;
      let maxIterations = 60; // Up to 60 slices safety limit

      while (maxIterations-- > 0) {
        target.setScrollY(currentY);
        await sleep(300); // Allow browser rendering, layout, and images to settle

        const actualY = target.getScrollY();
        const curScrollHeight = target.getScrollHeight();
        const estTotalSlices = Math.max(1, Math.ceil(curScrollHeight / stepSize));
        const currentSliceNum = slices.length + 1;

        if (target.isWindow && actualY > 50) {
          handleFixedHeaders(true);
        }

        // Hide overlay before snapping screenshot
        if (progressOverlay) progressOverlay.style.display = 'none';

        const response = await new Promise((resolve) => {
          chrome.runtime.sendMessage({ action: 'CAPTURE_SLICE' }, (res) => resolve(res));
        });

        if (progressOverlay) progressOverlay.style.display = 'flex';

        if (response && response.dataUrl) {
          slices.push({
            dataUrl: response.dataUrl,
            scrollY: actualY,
            stepSize: stepSize,
            viewportHeight: viewportHeight,
            viewportWidth: viewportWidth,
          });
        }

        const pct = Math.min(100, Math.round(((actualY + clientH) / curScrollHeight) * 100));
        updateProgress(pct, currentSliceNum, estTotalSlices);

        // Completion check:
        // Case A: Page content is already shorter than viewport (1 slice needed)
        if (slices.length === 1 && curScrollHeight <= clientH + 10) {
          break;
        }

        // Case B: Subsequent slices reached bottom or scrolling stopped
        if (slices.length > 1) {
          if (actualY === lastActualY || actualY + clientH >= curScrollHeight - 5) {
            break;
          }
        }

        lastActualY = actualY;
        currentY += stepSize;
      }

      const lastSlice = slices[slices.length - 1];
      const finalHeight = target.isWindow
        ? (lastSlice ? lastSlice.scrollY + viewportHeight : viewportHeight)
        : target.getScrollHeight();

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
        isContainer: !target.isWindow,
        containerRect: target.isWindow ? null : target.rect,
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
      target.setScrollY(origTargetY);
      window.scrollTo(origWinX, origWinY);
      removeProgressOverlay();
    }
  }

  // Register or replace the message listener
  if (window.__mypdftools_listener) {
    chrome.runtime.onMessage.removeListener(window.__mypdftools_listener);
  }
  window.__mypdftools_listener = (message, sender, sendResponse) => {
    if (message.action === 'EXECUTE_CAPTURE') {
      executeCapture(message.mode || 'desktop');
      sendResponse({ status: 'started' });
    }
    return true;
  };
  chrome.runtime.onMessage.addListener(window.__mypdftools_listener);
})();
