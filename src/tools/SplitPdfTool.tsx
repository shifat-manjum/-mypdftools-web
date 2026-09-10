import React, { useState, useEffect } from 'react';
import { Dropzone } from '../components/Dropzone';
import { UploadedFile } from '../types';
import { splitPdfByRange, toPdfBlob } from '../utils/pdfUtils';
import { getPdfPageCount } from '../utils/pdfRenderUtils';
import { PDFDocument } from 'pdf-lib';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import confetti from 'canvas-confetti';
import { Scissors, Download, Loader2, Sparkles } from 'lucide-react';
import { Language } from '../i18n/translations';

interface SplitPdfToolProps {
  currentLang?: Language;
}

export const SplitPdfTool: React.FC<SplitPdfToolProps> = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [splitMode, setSplitMode] = useState<'range' | 'all'>('range');
  const [rangeInput, setRangeInput] = useState<string>('1');
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultBlob, setResultBlob] = useState<{ blob: Blob; filename: string } | null>(null);

  useEffect(() => {
    if (files.length > 0) {
      getPdfPageCount(files[0].file)
        .then((cnt) => {
          setPageCount(cnt);
          setRangeInput(`1-${Math.min(cnt, 3)}`);
        })
        .catch(console.error);
    } else {
      setPageCount(null);
    }
  }, [files]);

  const handleSplit = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);
    setResultBlob(null);

    try {
      const file = files[0].file;

      if (splitMode === 'range') {
        const bytes = await splitPdfByRange(file, rangeInput);
        const blob = toPdfBlob(bytes);
        setResultBlob({ blob, filename: `split_${rangeInput.replace(/[^a-zA-Z0-9-]/g, '_')}.pdf` });
      } else {
        // Extract all pages as separate files
        const buffer = await file.arrayBuffer();
        const srcDoc = await PDFDocument.load(buffer, { ignoreEncryption: true });
        const total = srcDoc.getPageCount();
        const zip = new JSZip();

        for (let i = 0; i < total; i++) {
          const singleDoc = await PDFDocument.create();
          const [copied] = await singleDoc.copyPages(srcDoc, [i]);
          singleDoc.addPage(copied);
          const singleBytes = await singleDoc.save();
          zip.file(`page_${i + 1}.pdf`, singleBytes);
        }

        const zipBlob = await zip.generateAsync({ type: 'blob' });
        setResultBlob({ blob: zipBlob, filename: 'all_pages_extracted.zip' });
      }

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (err: any) {
      console.error(err);
      alert('Failed to split PDF: ' + (err.message || 'Unknown error'));
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
        helperText="or drop a PDF file to split"
        files={files}
        onFilesChange={(newFiles) => {
          setFiles(newFiles);
          setResultBlob(null);
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
                {pageCount ? `${pageCount} page(s) detected` : 'Analyzing pages...'}
              </p>
            </div>
            <button
              onClick={() => {
                setFiles([]);
                setResultBlob(null);
              }}
              className="text-xs font-semibold text-gray-400 hover:text-red-500"
            >
              Change file
            </button>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-4">
            <h4 className="text-xs font-bold uppercase text-gray-500 tracking-wider">
              Split Mode
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label
                className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                  splitMode === 'range'
                    ? 'border-red-500 bg-red-50/30'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="splitMode"
                  checked={splitMode === 'range'}
                  onChange={() => setSplitMode('range')}
                  className="mt-0.5 text-red-600 focus:ring-red-500"
                />
                <div>
                  <span className="text-xs font-bold text-gray-900 block">
                    Extract Page Range
                  </span>
                  <span className="text-[11px] text-gray-500">
                    Extract specific pages into a new PDF document.
                  </span>
                </div>
              </label>

              <label
                className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                  splitMode === 'all'
                    ? 'border-red-500 bg-red-50/30'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="splitMode"
                  checked={splitMode === 'all'}
                  onChange={() => setSplitMode('all')}
                  className="mt-0.5 text-red-600 focus:ring-red-500"
                />
                <div>
                  <span className="text-xs font-bold text-gray-900 block">
                    Extract Every Page
                  </span>
                  <span className="text-[11px] text-gray-500">
                    Convert each page into its own individual PDF file (ZIP).
                  </span>
                </div>
              </label>
            </div>

            {splitMode === 'range' && (
              <div className="pt-2">
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Page range to extract (e.g. 1-2, 4)
                </label>
                <input
                  type="text"
                  value={rangeInput}
                  onChange={(e) => setRangeInput(e.target.value)}
                  placeholder="1-3, 5"
                  className="w-full text-xs font-medium bg-white border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-red-500/20 focus:outline-none"
                />
                <p className="mt-1 text-[11px] text-gray-400">
                  Total pages: {pageCount ?? '...'}. Example: "1-3" extracts pages 1, 2, and 3.
                </p>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-2">
            {!resultBlob ? (
              <button
                disabled={isProcessing}
                onClick={handleSplit}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#e5322d] hover:bg-[#c92520] text-white font-bold rounded-xl shadow-lg shadow-red-500/25 flex items-center justify-center gap-2 transition-all transform active:scale-95 disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Extracting pages...</span>
                  </>
                ) : (
                  <>
                    <Scissors className="w-5 h-5" />
                    <span>Split PDF</span>
                  </>
                )}
              </button>
            ) : (
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => saveAs(resultBlob.blob, resultBlob.filename)}
                  className="w-full sm:w-auto px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 transition-all transform active:scale-95"
                >
                  <Download className="w-5 h-5" />
                  <span>Download File ({resultBlob.filename.endsWith('.zip') ? 'ZIP' : 'PDF'})</span>
                </button>
                <button
                  onClick={() => setResultBlob(null)}
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
