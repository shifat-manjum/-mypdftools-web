// content.js - GoFullPage-grade auto-scroller with top-right cute chomping animation

(() => {
  let progressOverlay = null;

  function createProgressOverlay() {
    if (progressOverlay) return;

    progressOverlay = document.createElement('div');
    progressOverlay.id = '__mypdftools_capture_overlay';
    progressOverlay.style.cssText = `
      position: fixed !important;
      top: 14px !important;
      right: 18px !important;
      z-index: 2147483647 !important;
      pointer-events: none !important;
      user-select: none !important;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
    `;

    progressOverlay.innerHTML = `
      <style>
        @keyframes __mypdftools_slide_in {
          from { transform: translateY(-16px) scale(0.92); opacity: 0; }
          to { transform: translateY(0) scale(1); opacity: 1; }
        }
        @keyframes __mypdftools_chomp_top {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(-36deg); }
        }
        @keyframes __mypdftools_chomp_bottom {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(36deg); }
        }
        @keyframes __mypdftools_dots_flow {
          0% { transform: translateX(0); }
          100% { transform: translateX(-10px); }
        }
      </style>
      <div style="
        background: rgba(15, 23, 42, 0.94);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        border: 1px solid rgba(16, 185, 129, 0.4);
        border-radius: 14px;
        padding: 10px 14px;
        box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4), 0 0 15px rgba(16, 185, 129, 0.25);
        color: #ffffff;
        display: flex;
        flex-direction: column;
        gap: 8px;
        min-width: 210px;
        animation: __mypdftools_slide_in 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      ">
        <!-- Top Row: Pac-Man & Labels -->
        <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px;">
          <!-- Funny Chomping Character -->
          <div style="display: flex; align-items: center; gap: 4px;">
            <div style="position: relative; width: 22px; height: 22px; flex-shrink: 0;">
              <!-- Top Jaw -->
              <div style="
                position: absolute; top: 0; left: 0; width: 22px; height: 11px;
                background: #facc15; border-radius: 22px 22px 0 0;
                transform-origin: bottom center;
                animation: __mypdftools_chomp_top 0.25s ease-in-out infinite alternate;
              "></div>
              <!-- Bottom Jaw -->
              <div style="
                position: absolute; bottom: 0; left: 0; width: 22px; height: 11px;
                background: #facc15; border-radius: 0 0 22px 22px;
                transform-origin: top center;
                animation: __mypdftools_chomp_bottom 0.25s ease-in-out infinite alternate;
              "></div>
              <!-- Eye -->
              <div style="
                position: absolute; top: 3px; left: 9px; width: 3px; height: 3px;
                background: #0f172a; border-radius: 50%; z-index: 2;
              "></div>
            </div>

            <!-- Dots Track -->
            <div style="width: 30px; height: 10px; overflow: hidden; display: flex; align-items: center;">
              <div style="display: flex; gap: 5px; animation: __mypdftools_dots_flow 0.45s linear infinite;">
                <span style="width: 4px; height: 4px; border-radius: 50%; background: #34d399; flex-shrink: 0;"></span>
                <span style="width: 4px; height: 4px; border-radius: 50%; background: #34d399; flex-shrink: 0;"></span>
                <span style="width: 4px; height: 4px; border-radius: 50%; background: #34d399; flex-shrink: 0;"></span>
                <span style="width: 4px; height: 4px; border-radius: 50%; background: #34d399; flex-shrink: 0;"></span>
              </div>
            </div>
          </div>

          <!-- Status Text -->
          <div style="display: flex; align-items: center; gap: 6px;">
            <span id="__mypdftools_status" style="font-size: 11px; font-weight: 700; color: #cbd5e1;">Capturing...</span>
            <span id="__mypdftools_pct_badge" style="font-size: 10px; font-weight: 800; background: rgba(16, 185, 129, 0.2); color: #34d399; padding: 1px 5px; border-radius: 4px;">0%</span>
          </div>
        </div>

        <!-- Progress Bar -->
        <div style="width: 100%; height: 5px; background: rgba(255, 255, 255, 0.1); border-radius: 999px; overflow: hidden;">
          <div id="__mypdftools_bar" style="width: 0%; height: 100%; background: linear-gradient(90deg, #10b981, #34d399); transition: width 0.15s ease-out; border-radius: 999px;"></div>
        </div>
      </div>
    `;

    document.body.appendChild(progressOverlay);
  }

  function updateProgress(percent, current, total) {
    const statusEl = document.getElementById('__mypdftools_status');
    const badgeEl = document.getElementById('__mypdftools_pct_badge');
    const barEl = document.getElementById('__mypdftools_bar');
    const pct = Math.min(100, Math.max(0, Math.round(percent)));

    if (statusEl) {
      statusEl.textContent = total > 1 ? `Part ${current} of ${total}` : `Capturing...`;
    }
    if (badgeEl) {
      badgeEl.textContent = `${pct}%`;
    }
    if (barEl) {
      barEl.style.width = `${pct}%`;
    }
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
        if (progressOverlay) progressOverlay.style.visibility = 'hidden';
        await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
        await sleep(50);

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

        // Hide overlay and flush compositor before snapping screenshot
        if (progressOverlay) {
          progressOverlay.style.visibility = 'hidden';
        }
        await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
        await sleep(60);

        const response = await new Promise((resolve) => {
          chrome.runtime.sendMessage({ action: 'CAPTURE_SLICE' }, (res) => resolve(res));
        });

        // Restore overlay
        if (progressOverlay) {
          progressOverlay.style.visibility = 'visible';
        }

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
