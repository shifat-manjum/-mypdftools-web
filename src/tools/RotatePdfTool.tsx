import React, { useState, useEffect } from 'react';
import { Dropzone } from '../components/Dropzone';
import { UploadedFile } from '../types';
import { rotatePdfPages, toPdfBlob } from '../utils/pdfUtils';
import { convertPdfToImages, RenderedPageImage } from '../utils/pdfRenderUtils';
import { saveAs } from 'file-saver';
import confetti from 'canvas-confetti';
import { RotateCw, RotateCcw, Download, Loader2, Sparkles } from 'lucide-react';

export const RotatePdfTool: React.FC = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [pages, setPages] = useState<RenderedPageImage[]>([]);
  const [rotations, setRotations] = useState<{ [pageIndex: number]: number }>({});
  const [isRendering, setIsRendering] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [savedBlob, setSavedBlob] = useState<Blob | null>(null);

  useEffect(() => {
    if (files.length > 0) {
      setIsRendering(true);
      setPages([]);
      setRotations({});
      setSavedBlob(null);

      convertPdfToImages(files[0].file, 0.8, 'image/jpeg')
        .then((imgs) => {
          setPages(imgs);
          const initial: { [key: number]: number } = {};
          imgs.forEach((_, idx) => (initial[idx] = 0));
          setRotations(initial);
        })
        .catch(console.error)
        .finally(() => setIsRendering(false));
    }
  }, [files]);

  const rotateSingle = (pageIdx: number, delta: number) => {
    setRotations((prev) => ({
      ...prev,
      [pageIdx]: ((prev[pageIdx] || 0) + delta + 360) % 360,
    }));
    setSavedBlob(null);
  };

  const rotateAll = (delta: number) => {
    setRotations((prev) => {
      const next = { ...prev };
      pages.forEach((_, idx) => {
        next[idx] = ((next[idx] || 0) + delta + 360) % 360;
      });
      return next;
    });
    setSavedBlob(null);
  };

  const handleSave = async () => {
    if (files.length === 0) return;
    setIsSaving(true);

    try {
      const bytes = await rotatePdfPages(files[0].file, rotations);
      const blob = toPdfBlob(bytes);
      setSavedBlob(blob);

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (err: any) {
      console.error(err);
      alert('Error rotating PDF: ' + (err.message || 'Unknown error'));
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
        helperText="or drop a PDF to rotate pages"
        files={files}
        onFilesChange={setFiles}
        showPreviewList={false}
      />

      {files.length > 0 && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-3 shadow-sm">
            <div>
              <h4 className="text-xs font-bold text-gray-900 truncate">
                {files[0].name}
              </h4>
              <p className="text-[11px] text-gray-500">
                {pages.length} page(s) loaded
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => rotateAll(90)}
                className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>Rotate All Right</span>
              </button>
              <button
                onClick={() => rotateAll(-90)}
                className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Rotate All Left</span>
              </button>
            </div>
          </div>

          {/* Page Grid */}
          {isRendering ? (
            <div className="p-12 text-center text-gray-500 flex flex-col items-center gap-2">
              <Loader2 className="w-6 h-6 animate-spin text-red-500" />
              <span className="text-xs font-medium">Generating page previews...</span>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {pages.map((p, idx) => {
                const rot = rotations[idx] || 0;
                return (
                  <div
                    key={p.pageNumber}
                    className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm flex flex-col items-center"
                  >
                    <div className="w-full aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center p-2 mb-2">
                      <img
                        src={p.dataUrl}
                        alt={`Page ${p.pageNumber}`}
                        style={{
                          transform: `rotate(${rot}deg)`,
                          transition: 'transform 0.2s ease',
                        }}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>

                    <div className="flex items-center justify-between w-full mt-1">
                      <span className="text-[11px] font-bold text-gray-500">
                        Page {p.pageNumber}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => rotateSingle(idx, 90)}
                          className="p-1 rounded bg-gray-100 hover:bg-red-50 hover:text-red-600 text-gray-600 transition-colors"
                          title="Rotate 90 degrees right"
                        >
                          <RotateCw className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Save Button */}
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
                    <span>Applying rotations...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>Save Rotated PDF</span>
                  </>
                )}
              </button>
            ) : (
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => saveAs(savedBlob, 'rotated_document.pdf')}
                  className="w-full sm:w-auto px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 transition-all transform active:scale-95"
                >
                  <Download className="w-5 h-5" />
                  <span>Download PDF</span>
                </button>
                <button
                  onClick={() => setSavedBlob(null)}
                  className="px-4 py-3.5 text-xs font-bold text-gray-500 hover:text-gray-900"
                >
                  Adjust more
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
