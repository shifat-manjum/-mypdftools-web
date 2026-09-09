import React, { useState } from 'react';
import { Dropzone } from '../components/Dropzone';
import { UploadedFile } from '../types';
import { mergePdfFiles, toPdfBlob } from '../utils/pdfUtils';
import { saveAs } from 'file-saver';
import confetti from 'canvas-confetti';
import { ArrowUp, ArrowDown, Download, Loader2, Sparkles, Layers } from 'lucide-react';

export const MergePdfTool: React.FC = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [mergedBlob, setMergedBlob] = useState<Blob | null>(null);

  const handleMerge = async () => {
    if (files.length < 2) {
      alert('Please add at least 2 PDF files to merge.');
      return;
    }
    setIsProcessing(true);
    setMergedBlob(null);

    try {
      const rawFiles = files.map((f) => f.file);
      const pdfBytes = await mergePdfFiles(rawFiles);
      const blob = toPdfBlob(pdfBytes);
      setMergedBlob(blob);

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (err: any) {
      console.error(err);
      alert('Failed to merge PDFs: ' + (err.message || 'Unknown error'));
    } finally {
      setIsProcessing(false);
    }
  };

  const moveFile = (index: number, direction: 'up' | 'down') => {
    const newFiles = [...files];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= files.length) return;
    const temp = newFiles[index];
    newFiles[index] = newFiles[targetIndex];
    newFiles[targetIndex] = temp;
    setFiles(newFiles);
  };

  return (
    <div className="space-y-6">
      <Dropzone
        accept="application/pdf"
        multiple={true}
        buttonLabel="Select PDF files"
        helperText="or drop multiple PDF files here"
        files={files}
        onFilesChange={(newFiles) => {
          setFiles(newFiles);
          setMergedBlob(null);
        }}
        showPreviewList={false}
      />

      {files.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-gray-900">
              Files to Merge ({files.length})
            </h4>
            <span className="text-xs text-gray-500">
              Files will be combined in this order:
            </span>
          </div>

          <div className="space-y-2">
            {files.map((item, idx) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-white border border-gray-200 rounded-xl p-3.5 shadow-sm"
              >
                <div className="flex items-center gap-3 truncate">
                  <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center text-[#e5322d] font-bold text-xs">
                    {idx + 1}
                  </div>
                  <div className="truncate">
                    <p className="text-xs font-bold text-gray-900 truncate">
                      {item.name}
                    </p>
                    <p className="text-[11px] text-gray-400">
                      {(item.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    disabled={idx === 0}
                    onClick={() => moveFile(idx, 'up')}
                    className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-30 transition-colors"
                    title="Move up"
                  >
                    <ArrowUp className="w-4 h-4 text-gray-700" />
                  </button>
                  <button
                    disabled={idx === files.length - 1}
                    onClick={() => moveFile(idx, 'down')}
                    className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-30 transition-colors"
                    title="Move down"
                  >
                    <ArrowDown className="w-4 h-4 text-gray-700" />
                  </button>
                  <button
                    onClick={() => setFiles(files.filter((f) => f.id !== item.id))}
                    className="ml-2 text-xs text-gray-400 hover:text-red-500 font-semibold px-2 py-1"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4">
            {!mergedBlob ? (
              <button
                disabled={isProcessing || files.length < 2}
                onClick={handleMerge}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#e5322d] hover:bg-[#c92520] text-white font-bold rounded-xl shadow-lg shadow-red-500/25 flex items-center justify-center gap-2 transition-all transform active:scale-95 disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Merging files...</span>
                  </>
                ) : (
                  <>
                    <Layers className="w-5 h-5" />
                    <span>Merge PDF</span>
                  </>
                )}
              </button>
            ) : (
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => saveAs(mergedBlob, 'merged_document.pdf')}
                  className="w-full sm:w-auto px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 transition-all transform active:scale-95"
                >
                  <Download className="w-5 h-5" />
                  <span>Download Merged PDF</span>
                </button>
                <button
                  onClick={() => {
                    setFiles([]);
                    setMergedBlob(null);
                  }}
                  className="px-4 py-3.5 text-xs font-bold text-gray-500 hover:text-gray-900"
                >
                  Merge more
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
