import * as pdfjsLib from 'pdfjs-dist';
// @ts-ignore
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.js?url';

// Configure worker source with Vite bundled worker or public fallback
if (typeof window !== 'undefined') {
  try {
    pdfjsLib.GlobalWorkerOptions.workerSrc =
      pdfWorkerUrl || '/pdf.worker.min.js';
  } catch {
    pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';
  }
}

export interface RenderedPageImage {
  pageNumber: number;
  dataUrl: string;
  blob: Blob;
  width: number;
  height: number;
}

/**
 * Loads a PDF Document from File using pdfjs-dist
 */
export async function loadPdfDocument(file: File) {
  const arrayBuffer = await file.arrayBuffer();
  const loadingTask = pdfjsLib.getDocument({
    data: new Uint8Array(arrayBuffer),
    cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/cmaps/',
    cMapPacked: true,
  });
  return await loadingTask.promise;
}

/**
 * Gets total page count of a PDF file
 */
export async function getPdfPageCount(file: File): Promise<number> {
  const pdf = await loadPdfDocument(file);
  return pdf.numPages;
}

/**
 * Converts dataURL to Blob synchronously and safely across all browsers
 */
function dataUrlToBlob(dataUrl: string, mimeType: string): Blob {
  const parts = dataUrl.split(',');
  const byteString = atob(parts[1] || '');
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const uint8Array = new Uint8Array(arrayBuffer);
  for (let i = 0; i < byteString.length; i++) {
    uint8Array[i] = byteString.charCodeAt(i);
  }
  return new Blob([uint8Array], { type: mimeType });
}

/**
 * Renders a specific page of a PDF file onto an HTML5 Canvas
 */
export async function renderPdfPageToCanvas(
  pdf: any,
  pageNumber: number,
  scale: number = 1.5
): Promise<HTMLCanvasElement> {
  const page = await pdf.getPage(pageNumber);
  const viewport = page.getViewport({ scale });

  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d', { willReadFrequently: true });
  if (!context) throw new Error('Canvas context not available');

  canvas.width = Math.floor(viewport.width);
  canvas.height = Math.floor(viewport.height);

  await page.render({
    canvasContext: context,
    viewport,
  }).promise;

  return canvas;
}

/**
 * Converts all or selected pages of a PDF to high quality images
 */
export async function convertPdfToImages(
  file: File,
  scale: number = 1.5,
  format: 'image/jpeg' | 'image/png' = 'image/jpeg',
  onProgress?: (progress: number, total: number) => void
): Promise<RenderedPageImage[]> {
  const pdf = await loadPdfDocument(file);
  const totalPages = pdf.numPages;
  const results: RenderedPageImage[] = [];
  const mime = format === 'image/png' ? 'image/png' : 'image/jpeg';

  for (let i = 1; i <= totalPages; i++) {
    const canvas = await renderPdfPageToCanvas(pdf, i, scale);
    const dataUrl = canvas.toDataURL(mime, 0.92);
    const blob = dataUrlToBlob(dataUrl, mime);

    results.push({
      pageNumber: i,
      dataUrl,
      blob,
      width: canvas.width,
      height: canvas.height,
    });

    if (onProgress) {
      onProgress(i, totalPages);
    }
  }

  return results;
}

/**
 * Extracts plain text and converts to structured Markdown from PDF
 */
export async function extractTextFromPdf(
  file: File,
  onProgress?: (current: number, total: number) => void
): Promise<{ markdown: string; plainText: string; pageCount: number }> {
  const pdf = await loadPdfDocument(file);
  const totalPages = pdf.numPages;
  let markdown = `# ${file.name.replace(/\.[^/.]+$/, '')}\n\n`;
  let plainText = '';

  for (let i = 1; i <= totalPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const items = textContent.items as Array<{ str: string; hasEOL?: boolean }>;

    markdown += `## Page ${i}\n\n`;
    let pageStr = '';

    for (const item of items) {
      pageStr += item.str + (item.hasEOL ? '\n' : ' ');
    }

    markdown += pageStr.trim() + '\n\n---\n\n';
    plainText += `--- Page ${i} ---\n` + pageStr.trim() + '\n\n';

    if (onProgress) {
      onProgress(i, totalPages);
    }
  }

  return { markdown: markdown.trim(), plainText: plainText.trim(), pageCount: totalPages };
}
