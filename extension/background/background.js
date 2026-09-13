// background.js - Service Worker orchestrating screenshot captures and opening the viewer studio

let currentCaptureData = null;

// Handle messages from popup or content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'START_CAPTURE') {
    startCaptureWorkflow(message.tabId, message.mode || 'desktop');
    sendResponse({ success: true });
    return true;
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
    console.error('Failed to inject or message content script:', err);
  }
}

// Keyboard shortcut handler (Alt+Shift+P)
chrome.commands.onCommand.addListener(async (command) => {
  if (command === 'capture-full-page') {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab && tab.id) {
      startCaptureWorkflow(tab.id, 'desktop');
    }
  }
});

