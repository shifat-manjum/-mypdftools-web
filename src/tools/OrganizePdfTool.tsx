import React, { useState, useEffect } from 'react';
import { Dropzone } from '../components/Dropzone';
import { UploadedFile } from '../types';
import { organizePdfPages, toPdfBlob } from '../utils/pdfUtils';
import { convertPdfToImages, RenderedPageImage } from '../utils/pdfRenderUtils';
import { saveAs } from 'file-saver';
import confetti from 'canvas-confetti';
import { ArrowLeft, ArrowRight, Trash2, Copy, Download, Loader2, Sparkles, ArrowDownUp } from 'lucide-react';

interface PageItem {
  originalIndex: number;
  dataUrl: string;
}

export const OrganizePdfTool: React.FC = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [pageItems, setPageItems] = useState<PageItem[]>([]);
  const [isRendering, setIsRendering] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [savedBlob, setSavedBlob] = useState<Blob | null>(null);

  useEffect(() => {
    if (files.length > 0) {
      setIsRendering(true);
      setPageItems([]);
      setSavedBlob(null);

      convertPdfToImages(files[0].file, 0.7, 'image/jpeg')
        .then((imgs) => {
          setPageItems(
            imgs.map((img, idx) => ({
              originalIndex: idx,
              dataUrl: img.dataUrl,
            }))
          );
        })
        .catch(console.error)
        .finally(() => setIsRendering(false));
    }
  }, [files]);

  const movePage = (index: number, direction: 'left' | 'right') => {
    const newItems = [...pageItems];
    const targetIndex = direction === 'left' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= pageItems.length) return;
    const temp = newItems[index];
    newItems[index] = newItems[targetIndex];
    newItems[targetIndex] = temp;
    setPageItems(newItems);
    setSavedBlob(null);
  };

  const deletePage = (index: number) => {
    if (pageItems.length <= 1) {
      alert('A PDF must have at least one page.');
      return;
    }
    setPageItems(pageItems.filter((_, idx) => idx !== index));
    setSavedBlob(null);
  };

  const duplicatePage = (index: number) => {
    const newItems = [...pageItems];
    newItems.splice(index + 1, 0, { ...newItems[index] });
    setPageItems(newItems);
    setSavedBlob(null);
  };

  const handleSave = async () => {
    if (files.length === 0 || pageItems.length === 0) return;
    setIsSaving(true);

    try {
      const indices = pageItems.map((p) => p.originalIndex);
      const bytes = await organizePdfPages(files[0].file, indices);
      const blob = toPdfBlob(bytes);
      setSavedBlob(blob);

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (err: any) {
      console.error(err);
      alert('Failed to organize PDF: ' + (err.message || 'Unknown error'));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <Dropzone
        accept="application/pdf"
        multiple={false}
        buttonLabel="Select PDF file"
        helperText="or drop a PDF to organize and reorder pages"
        files={files}
        onFilesChange={setFiles}
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
                {pageItems.length} page(s) • Reorder, duplicate or delete pages
              </p>
            </div>
            <button
              onClick={() => {
                setFiles([]);
                setSavedBlob(null);
              }}
              className="text-xs font-semibold text-gray-400 hover:text-red-500"
            >
              Change file
            </button>
          </div>

          {isRendering ? (
            <div className="p-12 text-center text-gray-500 flex flex-col items-center gap-2">
              <Loader2 className="w-6 h-6 animate-spin text-red-500" />
              <span className="text-xs font-medium">Generating page thumbnails...</span>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {pageItems.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm flex flex-col items-center relative group"
                >
                  <div className="w-full aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center p-1 mb-2">
                    <img
                      src={item.dataUrl}
                      alt={`Page ${idx + 1}`}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>

                  <div className="flex items-center justify-between w-full mb-2">
                    <span className="text-xs font-bold text-gray-700">
                      Page {idx + 1}
                    </span>
                    <span className="text-[10px] text-gray-400">
                      (orig #{item.originalIndex + 1})
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between w-full pt-1 border-t border-gray-100">
                    <div className="flex items-center gap-1">
                      <button
                        disabled={idx === 0}
                        onClick={() => movePage(idx, 'left')}
                        className="p-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 disabled:opacity-20"
                        title="Move left"
                      >
                        <ArrowLeft className="w-3 h-3" />
                      </button>
                      <button
                        disabled={idx === pageItems.length - 1}
                        onClick={() => movePage(idx, 'right')}
                        className="p-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 disabled:opacity-20"
                        title="Move right"
                      >
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => duplicatePage(idx)}
                        className="p-1 rounded hover:bg-blue-50 text-gray-500 hover:text-blue-600"
                        title="Duplicate page"
                      >
                        <Copy className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => deletePage(idx)}
                        className="p-1 rounded hover:bg-red-50 text-gray-500 hover:text-red-600"
                        title="Delete page"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-end pt-2">
            {!savedBlob ? (
              <button
                disabled={isSaving || isRendering}
                onClick={handleSave}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#e5322d] hover:bg-[#c92520] text-white font-bold rounded-xl shadow-lg shadow-red-500/25 flex items-center justify-center gap-2 transition-all transform active:scale-95 disabled:opacity-50"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Rebuilding PDF...</span>
                  </>
                ) : (
                  <>
                    <ArrowDownUp className="w-5 h-5" />
                    <span>Save Organized PDF</span>
                  </>
                )}
              </button>
            ) : (
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => saveAs(savedBlob, 'organized_document.pdf')}
                  className="w-full sm:w-auto px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 transition-all transform active:scale-95"
                >
                  <Download className="w-5 h-5" />
                  <span>Download PDF</span>
                </button>
                <button
                  onClick={() => setSavedBlob(null)}
                  className="px-4 py-3.5 text-xs font-bold text-gray-500 hover:text-gray-900"
                >
                  Organize further
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
