// viewer.js - Stitching engine with overlap trimming and GoFullPage-style full document preview

document.addEventListener('DOMContentLoaded', async () => {
  const hiddenCanvas = document.getElementById('hidden-canvas');
  const ctx = hiddenCanvas.getContext('2d');
  const previewStage = document.getElementById('preview-stage');
  const previewImage = document.getElementById('preview-image');
  const previewCard = document.getElementById('preview-card');
  const loadingSpinner = document.getElementById('loading-spinner');
  const pageTitleLabel = document.getElementById('page-title-label');
  const dimensionBadge = document.getElementById('dimension-badge');
  const blurOverlay = document.getElementById('blur-overlay');

  const btnFitWidth = document.getElementById('btn-fit-width');
  const btnZoom100 = document.getElementById('btn-zoom-100');
  const btnDownloadPng = document.getElementById('btn-download-png');
  const btnDownloadPdf = document.getElementById('btn-download-pdf');
  const btnToolBlur = document.getElementById('btn-tool-blur');

  let captureMetadata = null;
  let fullImageDataUrl = null;
  let isBlurActive = false;
  let isDragging = false;
  let startX = 0, startY = 0;

  // 1. Fetch capture data from background service worker
  const captureData = await new Promise((resolve) => {
    chrome.runtime.sendMessage({ action: 'GET_CAPTURE_DATA' }, (res) => resolve(res));
  });

  if (!captureData || !captureData.slices || captureData.slices.length === 0) {
    loadingSpinner.innerHTML = '<p style="color: #ef4444; font-weight: 700;">No screenshot data found. Please take a new screenshot.</p>';
    return;
  }

  captureMetadata = captureData;
  if (pageTitleLabel && captureData.pageTitle) {
    pageTitleLabel.textContent = captureData.pageTitle;
    document.title = `${captureData.pageTitle} — Full Page Preview`;
  }

  // 2. Pre-load all captured slice images
  const loadedImages = await Promise.all(
    captureData.slices.map((slice) => loadImage(slice.dataUrl))
  );

  const firstImg = loadedImages[0];
  const dpr = firstImg.width / captureData.totalWidth;

  // Total canvas height = true document scroll height in physical pixels
  const totalPixelWidth = firstImg.width;
  const totalPixelHeight = Math.round(captureData.totalHeight * dpr);

  hiddenCanvas.width = totalPixelWidth;
  hiddenCanvas.height = totalPixelHeight;

  // 3. Precision Stitching with Overlap Trimming
  // Draw each slice at its true physical scroll position
  for (let i = 0; i < captureData.slices.length; i++) {
    const slice = captureData.slices[i];
    const img = loadedImages[i];
    const drawY = Math.round(slice.scrollY * dpr);

    // If this is the last slice and overlaps the previous slice:
    if (i > 0 && i === captureData.slices.length - 1) {
      const prevSlice = captureData.slices[i - 1];
      const prevBottomY = Math.round((prevSlice.scrollY + captureData.viewportHeight) * dpr);
      const overlap = prevBottomY - drawY;

      if (overlap > 0 && overlap < img.height) {
        // Skip the duplicate top portion of this final slice
        const srcY = overlap;
        const srcH = img.height - overlap;
        const destY = prevBottomY;
        const destH = srcH;

        ctx.drawImage(img, 0, srcY, img.width, srcH, 0, destY, img.width, destH);
        continue;
      }
    }

    ctx.drawImage(img, 0, drawY);
  }

  // 4. Render the Full Document Preview
  fullImageDataUrl = hiddenCanvas.toDataURL('image/png');
  previewImage.src = fullImageDataUrl;

  if (dimensionBadge) {
    dimensionBadge.textContent = `${totalPixelWidth} × ${totalPixelHeight} px`;
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

  // 5. Preview Mode & Zoom Controls (Fit vs 100%)
  btnFitWidth?.addEventListener('click', () => {
    previewImage.className = 'preview-image fit-mode';
    btnFitWidth.classList.add('active');
    btnZoom100.classList.remove('active');
  });

  btnZoom100?.addEventListener('click', () => {
    previewImage.className = 'preview-image zoom-100';
    btnZoom100.classList.add('active');
    btnFitWidth.classList.remove('active');
  });

  // 6. Privacy Blur Tool
  btnToolBlur?.addEventListener('click', () => {
    isBlurActive = !isBlurActive;
    btnToolBlur.classList.toggle('active', isBlurActive);
    previewCard.style.cursor = isBlurActive ? 'crosshair' : 'default';
  });

  previewCard?.addEventListener('mousedown', (e) => {
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

    if (dispW < 5 || dispH < 5) return;

    // Map displayed coordinates back to true canvas pixel coordinates
    const scale = hiddenCanvas.width / rect.width;
    const trueX = Math.round(dispX * scale);
    const trueY = Math.round(dispY * scale);
    const trueW = Math.round(dispW * scale);
    const trueH = Math.round(dispH * scale);

    // Apply frosted privacy redaction block onto canvas
    ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
    ctx.fillRect(trueX, trueY, trueW, trueH);
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 3;
    ctx.strokeRect(trueX, trueY, trueW, trueH);

    // Refresh preview image
    fullImageDataUrl = hiddenCanvas.toDataURL('image/png');
    previewImage.src = fullImageDataUrl;
  });

  function updateBlurBox(x, y, w, h) {
    blurOverlay.style.left = `${x}px`;
    blurOverlay.style.top = `${y}px`;
    blurOverlay.style.width = `${w}px`;
    blurOverlay.style.height = `${h}px`;
  }

  // 7. Download PNG
  btnDownloadPng?.addEventListener('click', () => {
    const filename = sanitizeFilename(captureMetadata?.pageTitle || 'fullpage_screenshot') + '.png';
    const link = document.createElement('a');
    link.download = filename;
    link.href = fullImageDataUrl;
    link.click();
  });

  // 8. Export as PDF
  btnDownloadPdf?.addEventListener('click', () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow popups to generate the PDF.');
      return;
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>${captureMetadata?.pageTitle || 'Full Page Screenshot'} - PDF</title>
        <style>
          @page {
            margin: 0;
            size: auto;
          }
          body {
            margin: 0;
            padding: 0;
            background: #ffffff;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          img {
            max-width: 100%;
            height: auto;
            display: block;
          }
        </style>
      </head>
      <body>
        <img src="${fullImageDataUrl}" onload="window.print(); window.close();" />
      </body>
      </html>
    `);
    printWindow.document.close();
  });

  function sanitizeFilename(title) {
    return title.replace(/[^a-z0-9_-]/gi, '_').toLowerCase().substring(0, 50);
  }
});
