import React, { useState } from 'react';
import { Dropzone } from '../components/Dropzone';
import { UploadedFile } from '../types';
import { addWatermarkToPdf, toPdfBlob } from '../utils/pdfUtils';
import { saveAs } from 'file-saver';
import confetti from 'canvas-confetti';
import { Stamp, Download, Loader2, Sparkles } from 'lucide-react';

export const WatermarkPdfTool: React.FC = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [text, setText] = useState<string>('CONFIDENTIAL');
  const [opacity, setOpacity] = useState<number>(0.25);
  const [fontSize, setFontSize] = useState<number>(50);
  const [rotation, setRotation] = useState<number>(45);
  const [isProcessing, setIsProcessing] = useState(false);
  const [downloadBlob, setDownloadBlob] = useState<Blob | null>(null);

  const handleApply = async () => {
    if (files.length === 0 || !text.trim()) return;
    setIsProcessing(true);
    setDownloadBlob(null);

    try {
      const pdfBytes = await addWatermarkToPdf(files[0].file, text.trim(), {
        opacity,
        fontSize,
        rotation,
      });

      const blob = toPdfBlob(pdfBytes);
      setDownloadBlob(blob);

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (err: any) {
      console.error(err);
      alert('Failed to apply watermark: ' + (err.message || 'Unknown error'));
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <Dropzone
        accept="application/pdf"
        multiple={false}
        buttonLabel="Select PDF file"
        helperText="or drop a PDF to add watermark"
        files={files}
        onFilesChange={(newFiles) => {
          setFiles(newFiles);
          setDownloadBlob(null);
        }}
        showPreviewList={false}
      />

      {files.length > 0 && (
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between shadow-sm">
            <div>
              <h4 className="text-xs font-bold text-gray-900 truncate">
                {files[0].name}
              </h4>
              <p className="text-[11px] text-gray-500">
                {(files[0].size / (1024 * 1024)).toFixed(2)} MB
              </p>
            </div>
            <button
              onClick={() => {
                setFiles([]);
                setDownloadBlob(null);
              }}
              className="text-xs font-semibold text-gray-400 hover:text-red-500"
            >
              Change file
            </button>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-4">
            <h4 className="text-xs font-bold uppercase text-gray-500 tracking-wider">
              Watermark Settings
            </h4>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Watermark Text
              </label>
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="e.g. CONFIDENTIAL, DRAFT, SAMPLE"
                className="w-full text-xs font-semibold bg-white border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-red-500/20 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Transparency ({Math.round(opacity * 100)}%)
                </label>
                <input
                  type="range"
                  min="0.1"
                  max="0.9"
                  step="0.05"
                  value={opacity}
                  onChange={(e) => setOpacity(parseFloat(e.target.value))}
                  className="w-full accent-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Font Size ({fontSize} pt)
                </label>
                <input
                  type="range"
                  min="24"
                  max="96"
                  step="4"
                  value={fontSize}
                  onChange={(e) => setFontSize(parseInt(e.target.value, 10))}
                  className="w-full accent-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Rotation Angle
                </label>
                <select
                  value={rotation}
                  onChange={(e) => setRotation(parseInt(e.target.value, 10))}
                  className="w-full text-xs font-medium bg-white border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-red-500/20 focus:outline-none"
                >
                  <option value="45">45° (Diagonal - Recommended)</option>
                  <option value="0">0° (Horizontal)</option>
                  <option value="90">90° (Vertical)</option>
                  <option value="-45">-45° (Reverse Diagonal)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            {!downloadBlob ? (
              <button
                disabled={isProcessing || !text.trim()}
                onClick={handleApply}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#e5322d] hover:bg-[#c92520] text-white font-bold rounded-xl shadow-lg shadow-red-500/25 flex items-center justify-center gap-2 transition-all transform active:scale-95 disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Stamping watermark...</span>
                  </>
                ) : (
                  <>
                    <Stamp className="w-5 h-5" />
                    <span>Apply Watermark</span>
                  </>
                )}
              </button>
            ) : (
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => saveAs(downloadBlob, 'watermarked_document.pdf')}
                  className="w-full sm:w-auto px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 transition-all transform active:scale-95"
                >
                  <Download className="w-5 h-5" />
                  <span>Download Watermarked PDF</span>
                </button>
                <button
                  onClick={() => setDownloadBlob(null)}
                  className="px-4 py-3.5 text-xs font-bold text-gray-500 hover:text-gray-900"
                >
                  Modify
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
