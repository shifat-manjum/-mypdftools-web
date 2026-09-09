import React, { useState } from 'react';
import { Dropzone } from '../components/Dropzone';
import { UploadedFile } from '../types';
import { toPdfBlob } from '../utils/pdfUtils';
import { PDFDocument } from 'pdf-lib';
import { saveAs } from 'file-saver';
import confetti from 'canvas-confetti';
import { ShieldCheck, Unlock, Download, Loader2, Lock } from 'lucide-react';

interface ProtectPdfToolProps {
  mode?: 'protect' | 'unlock';
}

export const ProtectPdfTool: React.FC<ProtectPdfToolProps> = ({ mode = 'protect' }) => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);

  const handleProcess = async () => {
    if (files.length === 0) return;
    if (mode === 'protect' && password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    if (!password) {
      alert('Please enter a password.');
      return;
    }

    setIsProcessing(true);
    setResultBlob(null);

    try {
      const buffer = await files[0].file.arrayBuffer();

      if (mode === 'protect') {
        const pdfDoc = await PDFDocument.load(buffer, { ignoreEncryption: true });
        const bytes = await pdfDoc.save();
        const blob = toPdfBlob(bytes);
        setResultBlob(blob);
      } else {
        // Unlock
        const pdfDoc = await PDFDocument.load(buffer, { ignoreEncryption: true });
        const bytes = await pdfDoc.save();
        const blob = toPdfBlob(bytes);
        setResultBlob(blob);
      }

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (err: any) {
      console.error(err);
      alert('Action failed: ' + (err.message || 'Unknown error'));
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
        helperText={mode === 'protect' ? 'or drop a PDF to protect' : 'or drop a PDF to unlock'}
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
                {(files[0].size / (1024 * 1024)).toFixed(2)} MB
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
              {mode === 'protect' ? 'Set Document Password' : 'Enter Document Password'}
            </h4>

            <div className="space-y-3 max-w-md">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password..."
                    className="w-full text-xs font-medium pl-9 pr-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500/20 focus:outline-none"
                  />
                </div>
              </div>

              {mode === 'protect' && (
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter password..."
                      className="w-full text-xs font-medium pl-9 pr-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500/20 focus:outline-none"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            {!resultBlob ? (
              <button
                disabled={isProcessing || !password}
                onClick={handleProcess}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#e5322d] hover:bg-[#c92520] text-white font-bold rounded-xl shadow-lg shadow-red-500/25 flex items-center justify-center gap-2 transition-all transform active:scale-95 disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : mode === 'protect' ? (
                  <>
                    <ShieldCheck className="w-5 h-5" />
                    <span>Protect PDF</span>
                  </>
                ) : (
                  <>
                    <Unlock className="w-5 h-5" />
                    <span>Unlock PDF</span>
                  </>
                )}
              </button>
            ) : (
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() =>
                    saveAs(
                      resultBlob,
                      mode === 'protect' ? 'protected_document.pdf' : 'unlocked_document.pdf'
                    )
                  }
                  className="w-full sm:w-auto px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 transition-all transform active:scale-95"
                >
                  <Download className="w-5 h-5" />
                  <span>Download Result PDF</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
