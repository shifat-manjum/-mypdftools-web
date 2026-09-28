// viewer.js - Production Stitching Engine, Interactive Light Studio, and Export Center

document.addEventListener('DOMContentLoaded', async () => {
  const hiddenCanvas = document.getElementById('hidden-canvas');
  const ctx = hiddenCanvas.getContext('2d');
  const previewStage = document.getElementById('preview-stage');
  const previewImage = document.getElementById('preview-image');
  const documentPaper = document.getElementById('document-paper');
  const loadingSpinner = document.getElementById('loading-spinner');
  const pageTitleLabel = document.getElementById('page-title-label');
  const dimensionBadge = document.getElementById('dimension-badge');
  const blurOverlay = document.getElementById('blur-overlay');
  const zoomLevelText = document.getElementById('zoom-level-text');

  const btnZoomIn = document.getElementById('btn-zoom-in');
  const btnZoomOut = document.getElementById('btn-zoom-out');
  const btnFitScreen = document.getElementById('btn-fit-screen');
  const btnZoom100 = document.getElementById('btn-zoom-100');
  const btnToolBlur = document.getElementById('btn-tool-blur');
  const btnCopyClipboard = document.getElementById('btn-copy-clipboard');
  const btnDownloadPng = document.getElementById('btn-download-png');
  const btnDownloadPdf = document.getElementById('btn-download-pdf');

  let captureMetadata = null;
  let fullImageDataUrl = null;
  let isBlurActive = false;
  let isDragging = false;
  let startX = 0, startY = 0;

  // Zoom management
  const ZOOM_LEVELS = [25, 40, 50, 65, 80, 100, 125, 150, 200];
  let currentZoomIndex = 5; // index of 100%
  let isFitMode = true;

  // 1. Fetch capture data from background service worker
  const captureData = await new Promise((resolve) => {
    chrome.runtime.sendMessage({ action: 'GET_CAPTURE_DATA' }, (res) => resolve(res));
  });

  if (!captureData || !captureData.slices || captureData.slices.length === 0) {
    loadingSpinner.innerHTML = '<p style="color: #ef4444; font-weight: 700;">No screenshot data found. Please trigger a new capture from the extension.</p>';
    return;
  }

  captureMetadata = captureData;
  if (pageTitleLabel && captureData.pageTitle) {
    pageTitleLabel.textContent = captureData.pageTitle;
    pageTitleLabel.title = captureData.pageTitle;
    document.title = `${captureData.pageTitle} — MyPdfTools Capture`;
  }

  // 2. Pre-load all captured slice images
  const loadedImages = await Promise.all(
    captureData.slices.map((slice) => loadImage(slice.dataUrl))
  );

  const firstImg = loadedImages[0];
  const dpr = firstImg.width / (captureData.totalWidth || captureData.viewportWidth || window.innerWidth);
  const totalPixelWidth = firstImg.width;
  let totalPixelHeight = firstImg.height;

  // 3. Intelligent Stitching Engine (Deep Inner Container vs Standard Window)
  if (captureData.isContainer && captureData.containerRect && captureData.slices.length > 1) {
    // -------------------------------------------------------------
    // Gmail / SPA Inner Container Stitching Pattern
    // -------------------------------------------------------------
    const cRect = captureData.containerRect;
    const cx = Math.round(cRect.x * dpr);
    const cy = Math.round(cRect.y * dpr);
    const cw = Math.round(cRect.width * dpr);
    const ch = Math.round(cRect.height * dpr);

    const lastSlice = captureData.slices[captureData.slices.length - 1];
    const totalContainerContentPx = Math.round((lastSlice.scrollY + cRect.height) * dpr);
    const bottomBarHeight = Math.max(0, firstImg.height - (cy + ch));

    totalPixelHeight = cy + totalContainerContentPx + bottomBarHeight;

    hiddenCanvas.width = totalPixelWidth;
    hiddenCanvas.height = totalPixelHeight;

    // A. Draw base slice 0 (Top Gmail bar, Search, Tabs, Compose button)
    ctx.drawImage(firstImg, 0, 0);

    // B. Extend left sidebar background cleanly down
    if (cx > 0 && totalPixelHeight > firstImg.height) {
      const sampleY = Math.max(0, Math.min(firstImg.height - 10, cy + ch - 10));
      for (let y = firstImg.height; y < totalPixelHeight; y += 10) {
        const h = Math.min(10, totalPixelHeight - y);
        ctx.drawImage(firstImg, 0, sampleY, cx, 10, 0, y, cx, h);
      }
    }

    // C. Extend right side panel background cleanly down
    const rightX = cx + cw;
    const rightW = totalPixelWidth - rightX;
    if (rightW > 0 && totalPixelHeight > firstImg.height) {
      const sampleY = Math.max(0, Math.min(firstImg.height - 10, cy + ch - 10));
      for (let y = firstImg.height; y < totalPixelHeight; y += 10) {
        const h = Math.min(10, totalPixelHeight - y);
        ctx.drawImage(firstImg, rightX, sampleY, rightW, 10, rightX, y, rightW, h);
      }
    }

    // D. Stitch all email rows / container slices with overlap trimming
    for (let i = 0; i < captureData.slices.length; i++) {
      const slice = captureData.slices[i];
      const img = loadedImages[i];
      const currentScrollYPx = Math.round(slice.scrollY * dpr);

      if (i === 0) {
        ctx.drawImage(img, cx, cy, cw, ch, cx, cy, cw, ch);
      } else {
        const prevSlice = captureData.slices[i - 1];
        const prevBottomPx = Math.round((prevSlice.scrollY + cRect.height) * dpr);
        const overlap = prevBottomPx - currentScrollYPx;

        if (overlap > 0 && overlap < ch) {
          const srcY = cy + overlap;
          const srcH = ch - overlap;
          const destY = cy + prevBottomPx;
          ctx.drawImage(img, cx, srcY, cw, srcH, cx, destY, cw, srcH);
        } else {
          const destY = cy + currentScrollYPx;
          ctx.drawImage(img, cx, cy, cw, ch, cx, destY, cw, ch);
        }
      }
    }

    // E. Draw bottom footer bar at the bottom of the long document
    if (bottomBarHeight > 0) {
      const lastImg = loadedImages[loadedImages.length - 1];
      const srcBottomY = cy + ch;
      const destBottomY = cy + totalContainerContentPx;
      ctx.drawImage(lastImg, 0, srcBottomY, totalPixelWidth, bottomBarHeight, 0, destBottomY, totalPixelWidth, bottomBarHeight);
    }
  } else if (captureData.slices.length > 1) {
    // -------------------------------------------------------------
    // Standard Full Window Vertical Stitching Pattern
    // -------------------------------------------------------------
    const lastSlice = captureData.slices[captureData.slices.length - 1];
    totalPixelHeight = Math.round((lastSlice.scrollY + captureData.viewportHeight) * dpr);

    hiddenCanvas.width = totalPixelWidth;
    hiddenCanvas.height = totalPixelHeight;

    ctx.drawImage(firstImg, 0, 0);

    for (let i = 1; i < captureData.slices.length; i++) {
      const slice = captureData.slices[i];
      const img = loadedImages[i];
      const prevSlice = captureData.slices[i - 1];
      const prevBottomY = Math.round((prevSlice.scrollY + captureData.viewportHeight) * dpr);
      const drawY = Math.round(slice.scrollY * dpr);
      const overlap = prevBottomY - drawY;

      if (overlap > 0 && overlap < img.height) {
        const srcY = overlap;
        const srcH = img.height - overlap;
        const destY = prevBottomY;
        ctx.drawImage(img, 0, srcY, img.width, srcH, 0, destY, img.width, srcH);
      } else {
        ctx.drawImage(img, 0, drawY);
      }
    }
  } else {
    // Single slice
    hiddenCanvas.width = totalPixelWidth;
    hiddenCanvas.height = totalPixelHeight;
    ctx.drawImage(firstImg, 0, 0);
  }

  // 4. Render Preview in Studio Canvas
  fullImageDataUrl = hiddenCanvas.toDataURL('image/png');
  previewImage.src = fullImageDataUrl;

  if (dimensionBadge) {
    const slicesCount = captureData.slices.length;
    dimensionBadge.textContent = `${totalPixelWidth} × ${totalPixelHeight} px (${slicesCount} ${slicesCount === 1 ? 'part' : 'parts'})`;
  }

  loadingSpinner.style.display = 'none';
  previewStage.classList.remove('hidden');

  function loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  }

  // 5. Zoom & Fit Controls
  function applyFitMode() {
    isFitMode = true;
    previewImage.className = 'preview-img fit-mode';
    previewImage.style.width = '';
    btnFitScreen.classList.add('active');
    btnZoom100.classList.remove('active');
    zoomLevelText.textContent = 'Fit';
  }

  function applyZoomPercent(pct) {
    isFitMode = false;
    previewImage.className = 'preview-img zoom-100';
    const computedW = Math.round((totalPixelWidth * (pct / 100)) / (window.devicePixelRatio || 1));
    previewImage.style.width = `${computedW}px`;
    btnFitScreen.classList.remove('active');
    btnZoom100.classList.toggle('active', pct === 100);
    zoomLevelText.textContent = `${pct}%`;
  }

  btnFitScreen?.addEventListener('click', () => applyFitMode());

  btnZoom100?.addEventListener('click', () => {
    currentZoomIndex = ZOOM_LEVELS.indexOf(100);
    applyZoomPercent(100);
  });

  btnZoomIn?.addEventListener('click', () => {
    if (isFitMode) {
      currentZoomIndex = ZOOM_LEVELS.indexOf(100);
      applyZoomPercent(100);
      return;
    }
    if (currentZoomIndex < ZOOM_LEVELS.length - 1) {
      currentZoomIndex++;
      applyZoomPercent(ZOOM_LEVELS[currentZoomIndex]);
    }
  });

  btnZoomOut?.addEventListener('click', () => {
    if (isFitMode) {
      currentZoomIndex = Math.max(0, ZOOM_LEVELS.indexOf(65));
      applyZoomPercent(ZOOM_LEVELS[currentZoomIndex]);
      return;
    }
    if (currentZoomIndex > 0) {
      currentZoomIndex--;
      applyZoomPercent(ZOOM_LEVELS[currentZoomIndex]);
    }
  });

  // Click image to toggle Fit <-> 100%
  previewImage?.addEventListener('click', (e) => {
    if (isBlurActive) return;
    if (isFitMode) {
      currentZoomIndex = ZOOM_LEVELS.indexOf(100);
      applyZoomPercent(100);
    } else {
      applyFitMode();
    }
  });

  // 6. Privacy Redact / Blur Tool
  btnToolBlur?.addEventListener('click', () => {
    isBlurActive = !isBlurActive;
    btnToolBlur.classList.toggle('active', isBlurActive);
    documentPaper.style.cursor = isBlurActive ? 'crosshair' : 'default';
    previewImage.style.cursor = isBlurActive ? 'crosshair' : (isFitMode ? 'zoom-in' : 'zoom-out');
    if (isBlurActive) {
      showToast('✏️ Click and drag over sensitive text to redact');
    }
  });

  documentPaper?.addEventListener('mousedown', (e) => {
    if (!isBlurActive) return;
    const rect = previewImage.getBoundingClientRect();
    startX = e.clientX - rect.left;
    startY = e.clientY - rect.top;
    isDragging = true;
    blurOverlay.classList.remove('hidden');
    updateBlurBox(startX, startY, 0, 0);
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging || !isBlurActive) return;
    const rect = previewImage.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;

    const x = Math.min(startX, currentX);
    const y = Math.min(startY, currentY);
    const w = Math.abs(currentX - startX);
    const h = Math.abs(currentY - startY);

    updateBlurBox(x, y, w, h);
  });

  window.addEventListener('mouseup', (e) => {
    if (!isDragging || !isBlurActive) return;
    isDragging = false;
    blurOverlay.classList.add('hidden');

    const rect = previewImage.getBoundingClientRect();
    const endX = e.clientX - rect.left;
    const endY = e.clientY - rect.top;

    const dispX = Math.min(startX, endX);
    const dispY = Math.min(startY, endY);
    const dispW = Math.abs(endX - startX);
    const dispH = Math.abs(endY - startY);

    if (dispW < 6 || dispH < 6) return;

    // Map screen display coordinates back to canvas pixel coordinates
    const scale = hiddenCanvas.width / rect.width;
    const trueX = Math.round(dispX * scale);
    const trueY = Math.round(dispY * scale);
    const trueW = Math.round(dispW * scale);
    const trueH = Math.round(dispH * scale);

    // Apply clean privacy redact block onto canvas
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(trueX, trueY, trueW, trueH);

    // Refresh preview image
    fullImageDataUrl = hiddenCanvas.toDataURL('image/png');
    previewImage.src = fullImageDataUrl;
    showToast('✓ Redacted area applied');
  });

  function updateBlurBox(x, y, w, h) {
    blurOverlay.style.left = `${x}px`;
    blurOverlay.style.top = `${y}px`;
    blurOverlay.style.width = `${w}px`;
    blurOverlay.style.height = `${h}px`;
  }

  // 7. Copy Image Directly to Clipboard
  btnCopyClipboard?.addEventListener('click', async () => {
    try {
      hiddenCanvas.toBlob(async (blob) => {
        if (!blob) throw new Error('Blob creation failed');
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob })
        ]);
        showToast('✓ Screenshot copied to clipboard! Paste anywhere (Ctrl+V)');
      }, 'image/png');
    } catch (err) {
      console.warn('Clipboard write error:', err);
      showToast('⚠️ Could not copy image automatically');
    }
  });

  // 8. Download High-Res PNG
  btnDownloadPng?.addEventListener('click', () => {
    const filename = sanitizeFilename(captureMetadata?.pageTitle || 'fullpage_screenshot') + '.png';
    const link = document.createElement('a');
    link.download = filename;
    link.href = fullImageDataUrl;
    link.click();
    showToast('✓ PNG downloaded successfully');
  });

  // 9. Export as Clean PDF (Native Print to PDF)
  btnDownloadPdf?.addEventListener('click', () => {
    window.print();
  });

  function sanitizeFilename(title) {
    return title.replace(/[^a-z0-9_-]/gi, '_').toLowerCase().substring(0, 50);
  }

  function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.remove('hidden');
    setTimeout(() => {
      toast.classList.add('hidden');
    }, 2500);
  }
});
