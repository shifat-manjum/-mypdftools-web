import React, { useState } from 'react';
import { Dropzone } from '../components/Dropzone';
import { UploadedFile } from '../types';
import { addPageNumbersToPdf, toPdfBlob } from '../utils/pdfUtils';
import { saveAs } from 'file-saver';
import confetti from 'canvas-confetti';
import { Hash, Download, Loader2, Sparkles } from 'lucide-react';
import { Language } from '../i18n/translations';

interface PageNumbersToolProps {
  currentLang?: Language;
}

export const PageNumbersTool: React.FC<PageNumbersToolProps> = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [position, setPosition] = useState<'bottom-center' | 'bottom-right' | 'top-right'>('bottom-center');
  const [format, setFormat] = useState<'of-total' | 'number'>('of-total');
  const [isProcessing, setIsProcessing] = useState(false);
  const [downloadBlob, setDownloadBlob] = useState<Blob | null>(null);

  const handleApply = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);
    setDownloadBlob(null);

    try {
      const pdfBytes = await addPageNumbersToPdf(files[0].file, position, format);
      const blob = toPdfBlob(pdfBytes);
      setDownloadBlob(blob);

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (err: any) {
      console.error(err);
      alert('Failed to add page numbers: ' + (err.message || 'Unknown error'));
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
        helperText="or drop a PDF to add page numbers"
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
              Page Number Settings
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Position
                </label>
                <select
                  value={position}
                  onChange={(e) => setPosition(e.target.value as any)}
                  className="w-full text-xs font-medium bg-white border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-red-500/20 focus:outline-none"
                >
                  <option value="bottom-center">Bottom Center (Standard)</option>
                  <option value="bottom-right">Bottom Right</option>
                  <option value="top-right">Top Right</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Numbering Format
                </label>
                <select
                  value={format}
                  onChange={(e) => setFormat(e.target.value as any)}
                  className="w-full text-xs font-medium bg-white border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-red-500/20 focus:outline-none"
                >
                  <option value="of-total">Page 1 of N</option>
                  <option value="number">Just numbers (1, 2, 3...)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            {!downloadBlob ? (
              <button
                disabled={isProcessing}
                onClick={handleApply}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#e5322d] hover:bg-[#c92520] text-white font-bold rounded-xl shadow-lg shadow-red-500/25 flex items-center justify-center gap-2 transition-all transform active:scale-95 disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Adding numbers...</span>
                  </>
                ) : (
                  <>
                    <Hash className="w-5 h-5" />
                    <span>Insert Page Numbers</span>
                  </>
                )}
              </button>
            ) : (
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => saveAs(downloadBlob, 'numbered_document.pdf')}
                  className="w-full sm:w-auto px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 transition-all transform active:scale-95"
                >
                  <Download className="w-5 h-5" />
                  <span>Download Numbered PDF</span>
                </button>
                <button
                  onClick={() => setDownloadBlob(null)}
                  className="px-4 py-3.5 text-xs font-bold text-gray-500 hover:text-gray-900"
                >
                  Reset
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
