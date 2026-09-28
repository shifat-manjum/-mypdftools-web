// background.js - Service Worker orchestrating screenshot captures and opening the viewer studio

let currentCaptureData = null;

// URLs where content script injection is prohibited by Chrome security policies
function isRestrictedPage(url) {
  if (!url) return true;
  const u = url.toLowerCase().trim();

  // Internal browser system URLs
  if (
    u.startsWith('chrome://') ||
    u.startsWith('chrome-extension://') ||
    u.startsWith('edge://') ||
    u.startsWith('about:') ||
    u.startsWith('view-source:') ||
    u.startsWith('chrome-search://') ||
    u.startsWith('devtools://')
  ) {
    return true;
  }

  // Chrome Web Store & Edge Add-ons
  if (
    u.includes('chromewebstore.google.com') ||
    (u.includes('chrome.google.com') && u.includes('webstore')) ||
    u.includes('microsoftedge.microsoft.com/addons')
  ) {
    return true;
  }

  return false;
}

// Directly captures visible area without requiring content script injection
function captureVisibleDirect(tab, callback) {
  chrome.tabs.captureVisibleTab(null, { format: 'png' }, (dataUrl) => {
    if (chrome.runtime.lastError || !dataUrl) {
      const errMsg = chrome.runtime.lastError ? chrome.runtime.lastError.message : 'Capture failed';
      console.warn('Cannot capture visible tab:', errMsg);
      if (callback) callback({ success: false, error: errMsg });
      return;
    }

    const tabWidth = (tab && tab.width) || 1280;
    const tabHeight = (tab && tab.height) || 800;
    const pageTitle = (tab && tab.title) || 'Screen Capture';
    const pageUrl = (tab && tab.url) || '';

    const captureData = {
      slices: [{
        dataUrl: dataUrl,
        scrollY: 0,
        viewportHeight: tabHeight,
        viewportWidth: tabWidth,
      }],
      totalWidth: tabWidth,
      totalHeight: tabHeight,
      viewportHeight: tabHeight,
      devicePixelRatio: 1,
      pageTitle: pageTitle,
      pageUrl: pageUrl,
      mode: 'visible',
      isContainer: false,
      containerRect: null,
    };

    currentCaptureData = captureData;
    chrome.storage.local.set({ activeCapture: captureData }, () => {
      chrome.tabs.create({
        url: chrome.runtime.getURL('viewer/viewer.html'),
      });
    });

    if (callback) callback({ success: true });
  });
}

// Handle messages from popup or content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'START_CAPTURE') {
    startCaptureWorkflow(message.tabId, message.mode || 'desktop');
    sendResponse({ success: true });
    return true;
  }

  // Dedicated handler for capturing restricted pages (Chrome Web Store, etc.)
  if (message.action === 'CAPTURE_RESTRICTED_VISIBLE') {
    chrome.tabs.get(message.tabId, (tab) => {
      if (chrome.runtime.lastError || !tab) {
        sendResponse({ success: false, error: 'Could not access active tab.' });
        return;
      }
      captureVisibleDirect(tab, sendResponse);
    });
    return true; // async sendResponse
  }

  if (message.action === 'CAPTURE_SLICE') {
    // Capture the current visible tab viewport
    chrome.tabs.captureVisibleTab(null, { format: 'png' }, (dataUrl) => {
      if (chrome.runtime.lastError) {
        console.error('Error capturing visible tab:', chrome.runtime.lastError);
        sendResponse({ dataUrl: null, error: chrome.runtime.lastError.message });
      } else {
        sendResponse({ dataUrl: dataUrl });
      }
    });
    return true; // async sendResponse
  }

  if (message.action === 'CAPTURE_COMPLETED') {
    // Save capture data and launch Viewer Studio
    currentCaptureData = message;
    
    // Save to chrome.storage.local for viewer access
    chrome.storage.local.set({ activeCapture: message }, () => {
      chrome.tabs.create({
        url: chrome.runtime.getURL('viewer/viewer.html'),
      });
    });
    sendResponse({ success: true });
    return true;
  }

  if (message.action === 'GET_CAPTURE_DATA') {
    if (currentCaptureData) {
      sendResponse(currentCaptureData);
    } else {
      chrome.storage.local.get(['activeCapture'], (result) => {
        sendResponse(result.activeCapture || null);
      });
    }
    return true;
  }
});

async function startCaptureWorkflow(tabId, mode) {
  try {
    // Inject content script into active tab
    await chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ['scripts/content.js'],
    });

    // Send execute command
    chrome.tabs.sendMessage(tabId, {
      action: 'EXECUTE_CAPTURE',
      mode: mode,
    });
  } catch (err) {
    console.warn('Failed to inject content script (restricted or sandboxed page). Falling back to direct visible capture:', err);
    chrome.tabs.get(tabId, (tab) => {
      if (tab) {
        captureVisibleDirect(tab);
      }
    });
  }
}

// Keyboard shortcut handler (Alt+Shift+P)
chrome.commands.onCommand.addListener(async (command) => {
  if (command === 'capture-full-page') {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab && tab.id) {
      if (isRestrictedPage(tab.url)) {
        captureVisibleDirect(tab);
      } else {
        startCaptureWorkflow(tab.id, 'desktop');
      }
    }
  }
});
