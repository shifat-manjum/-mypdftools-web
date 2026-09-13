// popup.js - Handles user capture triggers from the extension popup

document.addEventListener('DOMContentLoaded', () => {
  const btnFullPage = document.getElementById('btn-full-page');
  const btnMobilePage = document.getElementById('btn-mobile-page');
  const btnVisiblePage = document.getElementById('btn-visible-page');
  const statusBanner = document.getElementById('status-banner');
  const statusText = document.getElementById('status-text');

  function showStatus(text) {
    if (statusBanner && statusText) {
      statusText.textContent = text;
      statusBanner.classList.remove('hidden');
    }
  }

  async function getActiveTab() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    return tab;
  }

  function isValidUrl(url) {
    if (!url) return false;
    return !url.startsWith('chrome://') &&
           !url.startsWith('chrome-extension://') &&
           !url.startsWith('edge://') &&
           !url.startsWith('about:') &&
           !url.startsWith('view-source:');
  }

  async function triggerCapture(mode) {
    const tab = await getActiveTab();
    if (!tab || !tab.id) {
      alert('Cannot capture: no active tab found.');
      return;
    }

    if (!isValidUrl(tab.url)) {
      alert('Browser policy prevents taking screenshots on system pages (chrome://, extension settings, etc.). Please navigate to any normal webpage and try again!');
      return;
    }

    showStatus('Preparing capture engine...');

    // Send capture command to background service worker
    chrome.runtime.sendMessage({
      action: 'START_CAPTURE',
      tabId: tab.id,
      mode: mode, // 'desktop', 'mobile', or 'visible'
      tabTitle: tab.title || 'Screenshot',
      tabUrl: tab.url,
    }, (response) => {
      if (chrome.runtime.lastError) {
        console.error('Runtime error:', chrome.runtime.lastError);
      }
      // Close the popup so it doesn't block the screen during scrolling/capture
      setTimeout(() => {
        window.close();
      }, 200);
    });
  }

  btnFullPage?.addEventListener('click', () => triggerCapture('desktop'));
  btnMobilePage?.addEventListener('click', () => triggerCapture('mobile'));
  btnVisiblePage?.addEventListener('click', () => triggerCapture('visible'));
});

