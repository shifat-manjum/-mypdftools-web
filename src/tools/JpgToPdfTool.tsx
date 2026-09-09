import React, { useState } from 'react';
import { Dropzone } from '../components/Dropzone';
import { UploadedFile } from '../types';
import { convertImagesToPdf, ImageToPdfOptions, toPdfBlob } from '../utils/pdfUtils';
import { saveAs } from 'file-saver';
import confetti from 'canvas-confetti';
import { ArrowLeft, ArrowRight, Download, Loader2, Sparkles } from 'lucide-react';

export const JpgToPdfTool: React.FC = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [options, setOptions] = useState<ImageToPdfOptions>({
    orientation: 'auto',
    pageSize: 'a4',
    margin: 'none',
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [downloadReady, setDownloadReady] = useState(false);
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);

  const handleConvert = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);
    setDownloadReady(false);

    try {
      const rawFiles = files.map((f) => f.file);
      const pdfBytes = await convertImagesToPdf(rawFiles, options);
      const blob = toPdfBlob(pdfBytes);
      setPdfBlob(blob);
      setDownloadReady(true);

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (err: any) {
      console.error(err);
      alert('Error converting images to PDF: ' + (err.message || 'Unknown error'));
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (pdfBlob) {
      saveAs(pdfBlob, 'converted_images.pdf');
    }
  };

  const moveFile = (index: number, direction: 'left' | 'right') => {
    const newFiles = [...files];
    const targetIndex = direction === 'left' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= files.length) return;
    const temp = newFiles[index];
    newFiles[index] = newFiles[targetIndex];
    newFiles[targetIndex] = temp;
    setFiles(newFiles);
  };

  return (
    <div className="space-y-6">
      {/* Upload Zone */}
      <Dropzone
        accept="image/jpeg,image/png,image/webp"
        multiple={true}
        buttonLabel="Select JPG / PNG images"
        helperText="or drop images here"
        files={files}
        onFilesChange={(newFiles) => {
          setFiles(newFiles);
          setDownloadReady(false);
        }}
        showPreviewList={false}
      />

      {files.length > 0 && (
        <div className="space-y-6">
          {/* Images Grid with Reorder Controls */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-bold text-gray-800">
                Selected Images ({files.length})
              </h4>
              <span className="text-xs text-gray-500">
                Use arrows to reorder pages
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {files.map((item, idx) => (
                <div
                  key={item.id}
                  className="bg-white border border-gray-200 rounded-xl p-2 shadow-sm flex flex-col items-center"
                >
                  <div className="w-full aspect-[3/4] bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center mb-2 border border-gray-100">
                    {item.previewUrl && (
                      <img
                        src={item.previewUrl}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <span className="text-[10px] font-bold text-gray-400">
                    Page {idx + 1}
                  </span>
                  <p className="text-[11px] font-medium text-gray-700 truncate w-full text-center">
                    {item.name}
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    <button
                      disabled={idx === 0}
                      onClick={() => moveFile(idx, 'left')}
                      className="p-1 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-30"
                      title="Move left"
                    >
                      <ArrowLeft className="w-3 h-3" />
                    </button>
                    <button
                      disabled={idx === files.length - 1}
                      onClick={() => moveFile(idx, 'right')}
                      className="p-1 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-30"
                      title="Move right"
                    >
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Settings Bar */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
            <h4 className="text-xs font-bold uppercase text-gray-500 tracking-wider mb-3">
              Image to PDF Options
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Orientation */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Orientation
                </label>
                <select
                  value={options.orientation}
                  onChange={(e) =>
                    setOptions({ ...options, orientation: e.target.value as any })
                  }
                  className="w-full text-xs font-medium bg-white border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-red-500/20 focus:outline-none"
                >
                  <option value="auto">Auto (match image)</option>
                  <option value="portrait">Portrait</option>
                  <option value="landscape">Landscape</option>
                </select>
              </div>

              {/* Page Size */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Page Size
                </label>
                <select
                  value={options.pageSize}
                  onChange={(e) =>
                    setOptions({ ...options, pageSize: e.target.value as any })
                  }
                  className="w-full text-xs font-medium bg-white border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-red-500/20 focus:outline-none"
                >
                  <option value="a4">A4 (Fit to standard page)</option>
                  <option value="fit">Fit image (Same as image dimensions)</option>
                </select>
              </div>

              {/* Margin */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Margins
                </label>
                <select
                  value={options.margin}
                  onChange={(e) =>
                    setOptions({ ...options, margin: e.target.value as any })
                  }
                  className="w-full text-xs font-medium bg-white border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-red-500/20 focus:outline-none"
                >
                  <option value="none">No margin</option>
                  <option value="small">Small margin</option>
                  <option value="big">Big margin</option>
                </select>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
            {!downloadReady ? (
              <button
                disabled={isProcessing}
                onClick={handleConvert}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#e5322d] hover:bg-[#c92520] text-white font-bold rounded-xl shadow-lg shadow-red-500/25 flex items-center justify-center gap-2 transition-all transform active:scale-95 disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Converting images...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>Convert to PDF</span>
                  </>
                )}
              </button>
            ) : (
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={handleDownload}
                  className="w-full sm:w-auto px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 transition-all transform active:scale-95"
                >
                  <Download className="w-5 h-5" />
                  <span>Download PDF</span>
                </button>
                <button
                  onClick={() => {
                    setFiles([]);
                    setDownloadReady(false);
                  }}
                  className="px-4 py-3.5 text-xs font-bold text-gray-500 hover:text-gray-900"
                >
                  Start over
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
