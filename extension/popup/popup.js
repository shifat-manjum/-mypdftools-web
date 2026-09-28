// popup.js - Handles user capture triggers and restricted page detection

document.addEventListener('DOMContentLoaded', async () => {
  const normalActions = document.getElementById('normal-actions');
  const restrictedView = document.getElementById('restricted-view');
  const btnRestrictedVisible = document.getElementById('btn-capture-restricted-visible');

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

  function hideStatus() {
    if (statusBanner) {
      statusBanner.classList.add('hidden');
    }
  }

  async function getActiveTab() {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      return tab;
    } catch (err) {
      console.error('Failed to query active tab:', err);
      return null;
    }
  }

  // Detects URLs where Chrome blocks extension content script injection
  function isRestrictedPage(url) {
    if (!url) return true;
    const u = url.toLowerCase().trim();

    // Browser internal system URLs
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

    // Chrome Web Store & Edge Addons (scripting is strictly forbidden by browser security)
    if (
      u.includes('chromewebstore.google.com') ||
      (u.includes('chrome.google.com') && u.includes('webstore')) ||
      u.includes('microsoftedge.microsoft.com/addons')
    ) {
      return true;
    }

    return false;
  }

  // Check active tab and toggle normal vs restricted UI
  const currentTab = await getActiveTab();
  const isRestricted = isRestrictedPage(currentTab?.url);

  if (isRestricted) {
    if (normalActions) normalActions.classList.add('hidden');
    if (restrictedView) restrictedView.classList.remove('hidden');
  } else {
    if (normalActions) normalActions.classList.remove('hidden');
    if (restrictedView) restrictedView.classList.add('hidden');
  }

  // Normal capture trigger
  async function triggerCapture(mode) {
    const tab = await getActiveTab();
    if (!tab || !tab.id) {
      alert('Cannot capture: no active tab found.');
      return;
    }

    if (isRestrictedPage(tab.url)) {
      // If user somehow triggers full-page on restricted URL, switch to restricted visible capture
      triggerRestrictedVisibleCapture();
      return;
    }

    showStatus('Preparing capture engine...');

    chrome.runtime.sendMessage({
      action: 'START_CAPTURE',
      tabId: tab.id,
      mode: mode, // 'desktop', 'mobile', or 'visible'
      tabTitle: tab.title || 'Screenshot',
      tabUrl: tab.url,
    }, () => {
      if (chrome.runtime.lastError) {
        console.error('Runtime error:', chrome.runtime.lastError);
      }
      setTimeout(() => {
        window.close();
      }, 200);
    });
  }

  // Restricted page visible capture trigger
  async function triggerRestrictedVisibleCapture() {
    const tab = await getActiveTab();
    if (!tab || !tab.id) return;

    showStatus('Capturing visible area...');

    chrome.runtime.sendMessage({
      action: 'CAPTURE_RESTRICTED_VISIBLE',
      tabId: tab.id,
      tabTitle: tab.title || 'Webpage Screenshot',
      tabUrl: tab.url || '',
    }, (response) => {
      if (chrome.runtime.lastError || (response && !response.success)) {
        hideStatus();
        const err = response?.error || chrome.runtime.lastError?.message || '';
        alert(
          err.includes('chrome://') || tab.url?.startsWith('chrome://')
            ? 'Chrome internal system pages (chrome://) cannot be captured by browser extensions for security reasons. Please try on any standard webpage!'
            : 'Could not capture this page: ' + (err || 'Browser policy restriction.')
        );
        return;
      }

      setTimeout(() => {
        window.close();
      }, 200);
    });
  }

  btnFullPage?.addEventListener('click', () => triggerCapture('desktop'));
  btnMobilePage?.addEventListener('click', () => triggerCapture('mobile'));
  btnVisiblePage?.addEventListener('click', () => triggerCapture('visible'));
  btnRestrictedVisible?.addEventListener('click', triggerRestrictedVisibleCapture);
});
