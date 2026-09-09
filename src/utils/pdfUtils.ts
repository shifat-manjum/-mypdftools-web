import { PDFDocument, rgb, degrees, StandardFonts } from 'pdf-lib';

export interface ImageToPdfOptions {
  orientation: 'portrait' | 'landscape' | 'auto';
  pageSize: 'fit' | 'a4';
  margin: 'none' | 'small' | 'big';
}

/**
 * Converts Uint8Array from pdf-lib into a valid browser Blob
 */
export function toPdfBlob(bytes: Uint8Array): Blob {
  return new Blob([bytes.buffer as ArrayBuffer], { type: 'application/pdf' });
}

/**
 * Helper to convert any image file (JPG, PNG, WebP, etc.) to PNG DataURL
 */
export async function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Converts any image format into a clean PNG / JPEG Uint8Array using browser canvas
 */
export async function normalizeImageToJpegOrPng(file: File): Promise<{ bytes: Uint8Array; isPng: boolean; width: number; height: number }> {
  const dataUrl = await fileToDataUrl(file);
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Canvas context unavailable'));
        return;
      }
      ctx.drawImage(img, 0, 0);

      const isPng = file.type === 'image/png';
      const outputType = isPng ? 'image/png' : 'image/jpeg';
      canvas.toBlob(
        async (blob) => {
          if (!blob) {
            reject(new Error('Image conversion failed'));
            return;
          }
          const buffer = await blob.arrayBuffer();
          resolve({
            bytes: new Uint8Array(buffer),
            isPng,
            width: img.naturalWidth,
            height: img.naturalHeight,
          });
        },
        outputType,
        0.95
      );
    };
    img.onerror = reject;
    img.src = dataUrl;
  });
}

/**
 * Convert multiple images to a single PDF
 */
export async function convertImagesToPdf(
  files: File[],
  options: ImageToPdfOptions = { orientation: 'auto', pageSize: 'a4', margin: 'none' }
): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();

  // A4 standard points: 595.28 x 841.89
  const A4_WIDTH = 595.28;
  const A4_HEIGHT = 841.89;

  let marginPoints = 0;
  if (options.margin === 'small') marginPoints = 20;
  if (options.margin === 'big') marginPoints = 40;

  for (const file of files) {
    const { bytes, isPng, width: imgW, height: imgH } = await normalizeImageToJpegOrPng(file);
    const embeddedImg = isPng ? await pdfDoc.embedPng(bytes) : await pdfDoc.embedJpg(bytes);

    let pageWidth = A4_WIDTH;
    let pageHeight = A4_HEIGHT;

    if (options.pageSize === 'fit') {
      pageWidth = imgW + marginPoints * 2;
      pageHeight = imgH + marginPoints * 2;
    } else {
      // A4
      const isLandscape =
        options.orientation === 'landscape' ||
        (options.orientation === 'auto' && imgW > imgH);

      if (isLandscape) {
        pageWidth = A4_HEIGHT;
        pageHeight = A4_WIDTH;
      }
    }

    const availableW = pageWidth - marginPoints * 2;
    const availableH = pageHeight - marginPoints * 2;

    const scale = Math.min(availableW / imgW, availableH / imgH);
    const drawW = imgW * scale;
    const drawH = imgH * scale;

    const x = (pageWidth - drawW) / 2;
    const y = (pageHeight - drawH) / 2;

    const page = pdfDoc.addPage([pageWidth, pageHeight]);
    page.drawImage(embeddedImg, {
      x,
      y,
      width: drawW,
      height: drawH,
    });
  }

  return await pdfDoc.save();
}

/**
 * Merge multiple PDFs into one
 */
export async function mergePdfFiles(files: File[]): Promise<Uint8Array> {
  const mergedPdf = await PDFDocument.create();

  for (const file of files) {
    const buffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(buffer, { ignoreEncryption: true });
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    copiedPages.forEach((page) => mergedPdf.addPage(page));
  }

  return await mergedPdf.save();
}

/**
 * Split PDF by page ranges or specific indices (1-indexed input: e.g. "1-3, 5")
 */
export async function splitPdfByRange(
  file: File,
  rangeString: string
): Promise<Uint8Array> {
  const buffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(buffer, { ignoreEncryption: true });
  const totalPages = pdfDoc.getPageCount();

  const indicesToKeep = new Set<number>();
  const parts = rangeString.split(',').map((p) => p.trim()).filter(Boolean);

  for (const part of parts) {
    if (part.includes('-')) {
      const [startStr, endStr] = part.split('-');
      const start = Math.max(1, parseInt(startStr, 10));
      const end = Math.min(totalPages, parseInt(endStr, 10));
      for (let i = start; i <= end; i++) {
        indicesToKeep.add(i - 1);
      }
    } else {
      const pageNum = parseInt(part, 10);
      if (pageNum >= 1 && pageNum <= totalPages) {
        indicesToKeep.add(pageNum - 1);
      }
    }
  }

  const newPdf = await PDFDocument.create();
  const sortedIndices = Array.from(indicesToKeep).sort((a, b) => a - b);
  const pages = await newPdf.copyPages(pdfDoc, sortedIndices);
  pages.forEach((p) => newPdf.addPage(p));

  return await newPdf.save();
}

/**
 * Rotate PDF pages by 90, 180, 270 degrees
 */
export async function rotatePdfPages(
  file: File,
  pageRotations: { [pageIndex: number]: number } | number
): Promise<Uint8Array> {
  const buffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(buffer, { ignoreEncryption: true });
  const pages = pdfDoc.getPages();

  pages.forEach((page, idx) => {
    const currentRot = page.getRotation().angle;
    const additional = typeof pageRotations === 'number' ? pageRotations : (pageRotations[idx] || 0);
    page.setRotation(degrees((currentRot + additional) % 360));
  });

  return await pdfDoc.save();
}

/**
 * Organize / Reorder pages of a PDF
 */
export async function organizePdfPages(
  file: File,
  newOrderIndices: number[]
): Promise<Uint8Array> {
  const buffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(buffer, { ignoreEncryption: true });
  const newPdf = await PDFDocument.create();

  const pages = await newPdf.copyPages(pdfDoc, newOrderIndices);
  pages.forEach((p) => newPdf.addPage(p));

  return await newPdf.save();
}

/**
 * Add Watermark to PDF
 */
export async function addWatermarkToPdf(
  file: File,
  watermarkText: string,
  options: {
    opacity?: number;
    fontSize?: number;
    rotation?: number;
    color?: string;
  } = {}
): Promise<Uint8Array> {
  const buffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(buffer, { ignoreEncryption: true });
  const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const opacity = options.opacity ?? 0.3;
  const fontSize = options.fontSize ?? 48;
  const rotation = options.rotation ?? 45;

  const pages = pdfDoc.getPages();
  for (const page of pages) {
    const { width, height } = page.getSize();
    const textWidth = font.widthOfTextAtSize(watermarkText, fontSize);
    const textHeight = font.heightAtSize(fontSize);

    page.drawText(watermarkText, {
      x: width / 2 - textWidth / 2,
      y: height / 2 - textHeight / 2,
      size: fontSize,
      font,
      color: rgb(0.8, 0.2, 0.2),
      opacity,
      rotate: degrees(rotation),
    });
  }

  return await pdfDoc.save();
}

/**
 * Add Page Numbers to PDF
 */
export async function addPageNumbersToPdf(
  file: File,
  position: 'bottom-center' | 'bottom-right' | 'top-right' = 'bottom-center',
  format: 'number' | 'of-total' = 'of-total'
): Promise<Uint8Array> {
  const buffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(buffer, { ignoreEncryption: true });
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const total = pdfDoc.getPageCount();

  const pages = pdfDoc.getPages();
  pages.forEach((page, idx) => {
    const { width, height } = page.getSize();
    const pageNum = idx + 1;
    const text = format === 'of-total' ? `Page ${pageNum} of ${total}` : `${pageNum}`;
    const fontSize = 11;
    const textW = font.widthOfTextAtSize(text, fontSize);

    let x = (width - textW) / 2;
    let y = 25;

    if (position === 'bottom-right') {
      x = width - textW - 35;
      y = 25;
    } else if (position === 'top-right') {
      x = width - textW - 35;
      y = height - 35;
    }

    page.drawText(text, {
      x,
      y,
      size: fontSize,
      font,
      color: rgb(0.3, 0.3, 0.3),
    });
  });

  return await pdfDoc.save();
}

/**
 * Stamp signature on PDF page
 */
export async function stampSignatureOnPdf(
  file: File,
  signatureDataUrl: string,
  pageIndex: number,
  normX: number,
  normY: number,
  normW: number,
  normH: number
): Promise<Uint8Array> {
  const buffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(buffer, { ignoreEncryption: true });
  const pages = pdfDoc.getPages();

  if (pageIndex < 0 || pageIndex >= pages.length) {
    pageIndex = 0;
  }

  const page = pages[pageIndex];
  const { width, height } = page.getSize();

  // Load signature image
  const res = await fetch(signatureDataUrl);
  const imgBlob = await res.blob();
  const imgBytes = new Uint8Array(await imgBlob.arrayBuffer());
  const sigImage = await pdfDoc.embedPng(imgBytes);

  page.drawImage(sigImage, {
    x: normX * width,
    y: (1 - normY - normH) * height,
    width: normW * width,
    height: normH * height,
  });

  return await pdfDoc.save();
}
