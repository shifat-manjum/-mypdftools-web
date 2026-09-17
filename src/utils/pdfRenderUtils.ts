import * as pdfjsLib from 'pdfjs-dist';
// @ts-ignore
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.js?url';

// Configure worker source with bundled Vite worker and public fallback
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = (pdfWorkerUrl as string) || '/pdf.worker.min.js';
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
    standardFontDataUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/standard_fonts/',
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
 * Converts HTML5 Canvas to Blob reliably and performantly
 */
export function canvasToBlob(canvas: HTMLCanvasElement, mimeType: string, quality: number = 0.92): Promise<Blob> {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        const dataUrl = canvas.toDataURL(mimeType, quality);
        const parts = dataUrl.split(',');
        const byteString = atob(parts[1] || '');
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        resolve(new Blob([ab], { type: mimeType }));
      }
    }, mimeType, quality);
  });
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

  // Fill canvas with white background before rendering (prevents black background in JPG)
  context.fillStyle = '#ffffff';
  context.fillRect(0, 0, canvas.width, canvas.height);

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
    const blob = await canvasToBlob(canvas, mime, 0.92);
    const dataUrl = URL.createObjectURL(blob);

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
