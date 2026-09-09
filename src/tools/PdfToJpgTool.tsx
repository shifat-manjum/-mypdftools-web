import React, { useState } from 'react';
import { Dropzone } from '../components/Dropzone';
import { UploadedFile } from '../types';
import { convertPdfToImages, RenderedPageImage } from '../utils/pdfRenderUtils';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import confetti from 'canvas-confetti';
import { Download, Loader2, Sparkles, Image as ImageIcon, Archive } from 'lucide-react';

export const PdfToJpgTool: React.FC = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [renderedImages, setRenderedImages] = useState<RenderedPageImage[]>([]);
  const [format, setFormat] = useState<'image/jpeg' | 'image/png'>('image/jpeg');
  const [scale, setScale] = useState<number>(1.5);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState<{ current: number; total: number } | null>(null);

  const handleConvert = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);
    setRenderedImages([]);
    setProgress({ current: 0, total: 1 });

    try {
      const pdfFile = files[0].file;
      const images = await convertPdfToImages(
        pdfFile,
        scale,
        format,
        (current, total) => {
          setProgress({ current, total });
        }
      );

      setRenderedImages(images);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (err: any) {
      console.error(err);
      alert('Failed to convert PDF to images: ' + (err.message || 'Unknown error'));
    } finally {
      setIsProcessing(false);
      setProgress(null);
    }
  };

  const handleDownloadSingle = (img: RenderedPageImage) => {
    const ext = format === 'image/png' ? 'png' : 'jpg';
    saveAs(img.blob, `page_${img.pageNumber}.${ext}`);
  };

  const handleDownloadAllZip = async () => {
    if (renderedImages.length === 0) return;
    const zip = new JSZip();
    const ext = format === 'image/png' ? 'png' : 'jpg';

    renderedImages.forEach((img) => {
      zip.file(`page_${img.pageNumber}.${ext}`, img.blob);
    });

    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, 'pdf_pages_images.zip');
  };

  return (
    <div className="space-y-6">
      {/* Upload Zone */}
      <Dropzone
        accept="application/pdf"
        multiple={false}
        buttonLabel="Select PDF file"
        helperText="or drop a PDF document here"
        files={files}
        onFilesChange={(newFiles) => {
          setFiles(newFiles);
          setRenderedImages([]);
        }}
        showPreviewList={false}
      />

      {files.length > 0 && (
        <div className="space-y-6">
          {/* File Selected Badge */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3 truncate">
              <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center text-[#e5322d] flex-shrink-0">
                <ImageIcon className="w-5 h-5" />
              </div>
              <div className="truncate">
                <h4 className="text-xs font-bold text-gray-900 truncate">
                  {files[0].name}
                </h4>
                <p className="text-[11px] text-gray-500">
                  {(files[0].size / (1024 * 1024)).toFixed(2)} MB • Ready to convert
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setFiles([]);
                setRenderedImages([]);
              }}
              className="text-xs font-semibold text-gray-400 hover:text-red-500 px-3 py-1"
            >
              Change file
            </button>
          </div>

          {/* Conversion Options */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
            <h4 className="text-xs font-bold uppercase text-gray-500 tracking-wider mb-3">
              Output Options
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Image Format
                </label>
                <select
                  value={format}
                  onChange={(e) => setFormat(e.target.value as any)}
                  className="w-full text-xs font-medium bg-white border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-red-500/20 focus:outline-none"
                >
                  <option value="image/jpeg">JPG (Standard web format)</option>
                  <option value="image/png">PNG (Lossless with sharp text)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Resolution / Quality
                </label>
                <select
                  value={scale}
                  onChange={(e) => setScale(parseFloat(e.target.value))}
                  className="w-full text-xs font-medium bg-white border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-red-500/20 focus:outline-none"
                >
                  <option value="1.0">Standard (100 DPI)</option>
                  <option value="1.5">High Quality (150 DPI - Recommended)</option>
                  <option value="2.0">Ultra High (200 DPI)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Progress or Convert Trigger */}
          {renderedImages.length === 0 ? (
            <div className="flex justify-end">
              <button
                disabled={isProcessing}
                onClick={handleConvert}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#e5322d] hover:bg-[#c92520] text-white font-bold rounded-xl shadow-lg shadow-red-500/25 flex items-center justify-center gap-2 transition-all transform active:scale-95 disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>
                      {progress
                        ? `Rendering page ${progress.current} of ${progress.total}...`
                        : 'Processing PDF...'}
                    </span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>Convert to {format === 'image/png' ? 'PNG' : 'JPG'}</span>
                  </>
                )}
              </button>
            </div>
          ) : (
            /* Rendered Results Gallery */
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                <div>
                  <h4 className="text-sm font-bold text-emerald-900">
                    Successfully converted {renderedImages.length} page(s)!
                  </h4>
                  <p className="text-xs text-emerald-700">
                    Download individual pages or get all pages bundled in a single ZIP archive.
                  </p>
                </div>
                <button
                  onClick={handleDownloadAllZip}
                  className="w-full sm:w-auto px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition-all transform active:scale-95"
                >
                  <Archive className="w-4 h-4" />
                  <span>Download All as ZIP</span>
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {renderedImages.map((img) => (
                  <div
                    key={img.pageNumber}
                    className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm flex flex-col items-center group hover:shadow-md transition-shadow"
                  >
                    <div className="w-full aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden mb-2 border border-gray-100">
                      <img
                        src={img.dataUrl}
                        alt={`Page ${img.pageNumber}`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="text-xs font-bold text-gray-700 mb-2">
                      Page {img.pageNumber}
                    </span>
                    <button
                      onClick={() => handleDownloadSingle(img)}
                      className="w-full py-1.5 px-3 bg-gray-100 hover:bg-red-50 hover:text-[#e5322d] text-gray-700 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

