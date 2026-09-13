// viewer.js - Canvas stitching engine, zoom manager, privacy blur/crop, and PNG/PDF export

document.addEventListener('DOMContentLoaded', async () => {
  const canvas = document.getElementById('output-canvas');
  const ctx = canvas.getContext('2d');
  const canvasWrapper = document.getElementById('canvas-wrapper');
  const loadingSpinner = document.getElementById('loading-spinner');
  const pageTitleLabel = document.getElementById('page-title-label');
  const zoomLevelLabel = document.getElementById('zoom-level');
  const selectionOverlay = document.getElementById('selection-overlay');

  const btnZoomIn = document.getElementById('btn-zoom-in');
  const btnZoomOut = document.getElementById('btn-zoom-out');
  const btnZoomFit = document.getElementById('btn-zoom-fit');
  const btnZoom100 = document.getElementById('btn-zoom-100');
  const btnDownloadPng = document.getElementById('btn-download-png');
  const btnDownloadPdf = document.getElementById('btn-download-pdf');
  const btnToolBlur = document.getElementById('btn-tool-blur');
  const btnToolCrop = document.getElementById('btn-tool-crop');

  let activeMode = null; // 'blur' or 'crop'
  let currentZoom = 1;
  let isSelecting = false;
  let startX = 0, startY = 0;
  let captureMetadata = null;

  // 1. Fetch capture data from background service worker
  const captureData = await new Promise((resolve) => {
    chrome.runtime.sendMessage({ action: 'GET_CAPTURE_DATA' }, (res) => resolve(res));
  });

  if (!captureData || !captureData.slices || captureData.slices.length === 0) {
    loadingSpinner.innerHTML = '<p style="color: #ef4444;">No capture data found. Please take a new screenshot.</p>';
    return;
  }

  captureMetadata = captureData;
  if (pageTitleLabel && captureData.pageTitle) {
    pageTitleLabel.textContent = captureData.pageTitle;
    document.title = `${captureData.pageTitle} — MyPdfTools Capture`;
  }

  // 2. Stitch the slices together onto the canvas
  await stitchSlices(captureData);

  async function stitchSlices(data) {
    const dpr = data.devicePixelRatio || 1;
    const slices = data.slices;

    // Load first image to verify true physical pixel width
    const firstImg = await loadImage(slices[0].dataUrl);
    const pixelWidth = firstImg.width;
    const scaleFactor = pixelWidth / data.totalWidth;
    const totalPixelHeight = Math.round(data.totalHeight * scaleFactor);

    canvas.width = pixelWidth;
    canvas.height = totalPixelHeight;

    for (let i = 0; i < slices.length; i++) {
      const slice = slices[i];
      const img = i === 0 ? firstImg : await loadImage(slice.dataUrl);
      const drawY = Math.round(slice.yOffset * scaleFactor);
      ctx.drawImage(img, 0, drawY);
    }

    loadingSpinner.style.display = 'none';
    fitToWidth();
  }

  function loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  }

  // 3. Zoom Controls
  function setZoom(scale, labelText) {
    currentZoom = Math.max(0.1, Math.min(scale, 3.0));
    canvasWrapper.style.transform = `scale(${currentZoom})`;
    zoomLevelLabel.textContent = labelText || `${Math.round(currentZoom * 100)}%`;
  }

  function fitToWidth() {
    const containerWidth = canvasWrapper.parentElement.clientWidth - 48;
    const scale = containerWidth / canvas.width;
    setZoom(scale, 'Fit');
  }

  btnZoomFit?.addEventListener('click', fitToWidth);
  btnZoom100?.addEventListener('click', () => setZoom(1, '100%'));
  btnZoomIn?.addEventListener('click', () => setZoom(currentZoom + 0.15));
  btnZoomOut?.addEventListener('click', () => setZoom(currentZoom - 0.15));

  // 4. Privacy Blur / Redact Tool
  btnToolBlur?.addEventListener('click', () => {
    if (activeMode === 'blur') {
      activeMode = null;
      btnToolBlur.classList.remove('active');
    } else {
      activeMode = 'blur';
      btnToolBlur.classList.add('active');
      btnToolCrop.classList.remove('active');
    }
  });

  btnToolCrop?.addEventListener('click', () => {
    if (activeMode === 'crop') {
      activeMode = null;
      btnToolCrop.classList.remove('active');
    } else {
      activeMode = 'crop';
      btnToolCrop.classList.add('active');
      btnToolBlur.classList.remove('active');
    }
  });

  // Canvas selection for Blur and Crop
  canvasWrapper.addEventListener('mousedown', (e) => {
    if (!activeMode) return;
    const rect = canvas.getBoundingClientRect();
    startX = (e.clientX - rect.left) / currentZoom;
    startY = (e.clientY - rect.top) / currentZoom;
    isSelecting = true;
    selectionOverlay.classList.remove('hidden');
    updateOverlay(startX, startY, 0, 0);
  });

  window.addEventListener('mousemove', (e) => {
    if (!isSelecting || !activeMode) return;
    const rect = canvas.getBoundingClientRect();
    const currentX = (e.clientX - rect.left) / currentZoom;
    const currentY = (e.clientY - rect.top) / currentZoom;

    const x = Math.min(startX, currentX);
    const y = Math.min(startY, currentY);
    const w = Math.abs(currentX - startX);
    const h = Math.abs(currentY - startY);

    updateOverlay(x, y, w, h);
  });

  window.addEventListener('mouseup', (e) => {
    if (!isSelecting || !activeMode) return;
    isSelecting = false;
    selectionOverlay.classList.add('hidden');

    const rect = canvas.getBoundingClientRect();
    const endX = (e.clientX - rect.left) / currentZoom;
    const endY = (e.clientY - rect.top) / currentZoom;

    const x = Math.round(Math.min(startX, endX));
    const y = Math.round(Math.min(startY, endY));
    const w = Math.round(Math.abs(endX - startX));
    const h = Math.round(Math.abs(endY - startY));

    if (w < 5 || h < 5) return;

    if (activeMode === 'blur') {
      applyBlur(x, y, w, h);
    } else if (activeMode === 'crop') {
      applyCrop(x, y, w, h);
      activeMode = null;
      btnToolCrop.classList.remove('active');
    }
  });

  function updateOverlay(x, y, w, h) {
    selectionOverlay.style.left = `${x}px`;
    selectionOverlay.style.top = `${y}px`;
    selectionOverlay.style.width = `${w}px`;
    selectionOverlay.style.height = `${h}px`;
  }

  // Applies high-grade privacy pixelation / blur to the selected region
  function applyBlur(x, y, w, h) {
    const imgData = ctx.getImageData(x, y, w, h);
    // Draw a solid frosted privacy block over the area
    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = '#34d399';
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, w, h);
  }

  function applyCrop(x, y, w, h) {
    const croppedData = ctx.getImageData(x, y, w, h);
    canvas.width = w;
    canvas.height = h;
    ctx.putImageData(croppedData, 0, 0);
    fitToWidth();
  }

  // 5. Download PNG
  btnDownloadPng?.addEventListener('click', () => {
    const filename = sanitizeFilename(captureMetadata?.pageTitle || 'screenshot') + '.png';
    const link = document.createElement('a');
    link.download = filename;
    link.href = canvas.toDataURL('image/png');
    link.click();
  });

  // 6. Export as PDF (Client-side clean print stylesheet)
  btnDownloadPdf?.addEventListener('click', () => {
    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow popups to generate the PDF.');
      return;
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>${captureMetadata?.pageTitle || 'Document'} - PDF Export</title>
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
        <img src="${imgData}" onload="window.print(); window.close();" />
      </body>
      </html>
    `);
    printWindow.document.close();
  });

  function sanitizeFilename(title) {
    return title.replace(/[^a-z0-9_-]/gi, '_').toLowerCase().substring(0, 50);
  }
});

