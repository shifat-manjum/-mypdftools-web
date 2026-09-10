import React, { useState, useRef, useEffect } from 'react';
import { Dropzone } from '../components/Dropzone';
import { UploadedFile } from '../types';
import { stampSignatureOnPdf, toPdfBlob } from '../utils/pdfUtils';
import { convertPdfToImages, RenderedPageImage } from '../utils/pdfRenderUtils';
import { saveAs } from 'file-saver';
import confetti from 'canvas-confetti';
import { PenSquare, Download, Loader2, Eraser, Check } from 'lucide-react';
import { Language } from '../i18n/translations';

interface SignPdfToolProps {
  currentLang?: Language;
}

export const SignPdfTool: React.FC<SignPdfToolProps> = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [pages, setPages] = useState<RenderedPageImage[]>([]);
  const [selectedPage, setSelectedPage] = useState<number>(0);
  const [signatureDataUrl, setSignatureDataUrl] = useState<string | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [sigPos, setSigPos] = useState<{ x: number; y: number }>({ x: 0.5, y: 0.8 });
  const [isProcessing, setIsProcessing] = useState(false);
  const [downloadBlob, setDownloadBlob] = useState<Blob | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (files.length > 0) {
      convertPdfToImages(files[0].file, 0.8, 'image/jpeg')
        .then((imgs) => setPages(imgs))
        .catch(console.error);
    } else {
      setPages([]);
    }
  }, [files]);

  // Canvas drawing handlers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#1e3a8a'; // ink blue
    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    if (canvasRef.current) {
      setSignatureDataUrl(canvasRef.current.toDataURL('image/png'));
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setSignatureDataUrl(null);
  };

  const handleApplySignature = async () => {
    if (files.length === 0 || !signatureDataUrl) return;
    setIsProcessing(true);
    setDownloadBlob(null);

    try {
      const pdfBytes = await stampSignatureOnPdf(
        files[0].file,
        signatureDataUrl,
        selectedPage,
        sigPos.x,
        sigPos.y,
        0.25, // signature width 25% of page
        0.1   // signature height 10% of page
      );

      const blob = toPdfBlob(pdfBytes);
      setDownloadBlob(blob);

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (err: any) {
      console.error(err);
      alert('Failed to stamp signature: ' + (err.message || 'Unknown error'));
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
        helperText="or drop a PDF to add your signature"
        files={files}
        onFilesChange={(newFiles) => {
          setFiles(newFiles);
          setDownloadBlob(null);
        }}
        showPreviewList={false}
      />

      {files.length > 0 && (
        <div className="space-y-6">
          {/* File Selected Badge */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between shadow-sm">
            <div>
              <h4 className="text-xs font-bold text-gray-900 truncate">{files[0].name}</h4>
              <p className="text-[11px] text-gray-500">{pages.length} page(s) loaded</p>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Signature Draw Pad */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold uppercase text-gray-600 tracking-wider">
                    1. Draw Signature
                  </h4>
                  <button
                    onClick={clearCanvas}
                    className="text-xs text-gray-500 hover:text-red-600 flex items-center gap-1 font-semibold"
                  >
                    <Eraser className="w-3.5 h-3.5" />
                    <span>Clear</span>
                  </button>
                </div>
                <div className="bg-white border border-gray-300 rounded-xl overflow-hidden shadow-inner flex items-center justify-center">
                  <canvas
                    ref={canvasRef}
                    width={400}
                    height={180}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                    className="cursor-crosshair w-full max-w-[400px] h-[180px] touch-none"
                  />
                </div>
                <p className="text-[11px] text-gray-400 mt-2 text-center">
                  Draw your signature using mouse or finger
                </p>
              </div>

              {signatureDataUrl && (
                <div className="mt-3 p-2 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center justify-center gap-2 text-xs font-semibold text-emerald-700">
                  <Check className="w-4 h-4" />
                  <span>Signature captured!</span>
                </div>
              )}
            </div>

            {/* Position Signature on Page */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
              <h4 className="text-xs font-bold uppercase text-gray-600 tracking-wider mb-2">
                2. Select Page & Position
              </h4>

              {pages.length > 0 ? (
                <div>
                  <div className="mb-2">
                    <label className="text-xs font-semibold text-gray-600 block mb-1">
                      Choose Page:
                    </label>
                    <select
                      value={selectedPage}
                      onChange={(e) => setSelectedPage(parseInt(e.target.value, 10))}
                      className="w-full text-xs font-medium bg-white border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-red-500/20 focus:outline-none"
                    >
                      {pages.map((_, i) => (
                        <option key={i} value={i}>
                          Page {i + 1}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Interactive Placement View */}
                  <div className="relative w-full max-w-[280px] mx-auto aspect-[3/4] bg-white border border-gray-300 rounded-lg overflow-hidden shadow-sm mt-3">
                    <img
                      src={pages[selectedPage]?.dataUrl}
                      alt="Preview"
                      className="w-full h-full object-contain pointer-events-none"
                    />

                    {signatureDataUrl && (
                      <div
                        style={{
                          left: `${sigPos.x * 100}%`,
                          top: `${sigPos.y * 100}%`,
                        }}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 border border-dashed border-blue-500 bg-blue-50/40 rounded p-1 w-24 h-10 pointer-events-none"
                      >
                        <img
                          src={signatureDataUrl}
                          alt="Signature"
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )}

                    {/* Click overlay to position */}
                    <div
                      onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const x = (e.clientX - rect.left) / rect.width;
                        const y = (e.clientY - rect.top) / rect.height;
                        setSigPos({ x, y });
                      }}
                      className="absolute inset-0 cursor-crosshair"
                      title="Click anywhere to reposition signature"
                    />
                  </div>
                  <p className="text-[11px] text-gray-500 text-center mt-2">
                    Click anywhere on the document preview to move signature
                  </p>
                </div>
              ) : (
                <div className="p-8 text-center text-xs text-gray-400">Loading page...</div>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            {!downloadBlob ? (
              <button
                disabled={isProcessing || !signatureDataUrl}
                onClick={handleApplySignature}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#e5322d] hover:bg-[#c92520] text-white font-bold rounded-xl shadow-lg shadow-red-500/25 flex items-center justify-center gap-2 transition-all transform active:scale-95 disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Signing PDF...</span>
                  </>
                ) : (
                  <>
                    <PenSquare className="w-5 h-5" />
                    <span>Stamp Signature & Save</span>
                  </>
                )}
              </button>
            ) : (
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => saveAs(downloadBlob, 'signed_document.pdf')}
                  className="w-full sm:w-auto px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 transition-all transform active:scale-95"
                >
                  <Download className="w-5 h-5" />
                  <span>Download Signed PDF</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
