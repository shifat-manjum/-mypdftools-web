import React, { useState } from 'react';
import { Dropzone } from '../components/Dropzone';
import { UploadedFile } from '../types';
import { extractTextFromPdf } from '../utils/pdfRenderUtils';
import { saveAs } from 'file-saver';
import confetti from 'canvas-confetti';
import { FileCode, Download, Loader2, Copy, Check } from 'lucide-react';

export const PdfToMarkdownTool: React.FC = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [markdown, setMarkdown] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleExtract = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);
    setMarkdown('');

    try {
      const result = await extractTextFromPdf(files[0].file);
      setMarkdown(result.markdown);

      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch (err: any) {
      console.error(err);
      alert('Failed to extract text from PDF: ' + (err.message || 'Unknown error'));
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
    const name = files[0]?.name.replace(/\.[^/.]+$/, '') || 'document';
    saveAs(blob, `${name}.md`);
  };

  return (
    <div className="space-y-6">
      <Dropzone
        accept="application/pdf"
        multiple={false}
        buttonLabel="Select PDF file"
        helperText="or drop a PDF to extract Markdown"
        files={files}
        onFilesChange={(newFiles) => {
          setFiles(newFiles);
          setMarkdown('');
        }}
        showPreviewList={false}
      />

      {files.length > 0 && (
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between shadow-sm">
            <div>
              <h4 className="text-xs font-bold text-gray-900 truncate">{files[0].name}</h4>
              <p className="text-[11px] text-gray-500">
                {(files[0].size / (1024 * 1024)).toFixed(2)} MB • Ready for extraction
              </p>
            </div>
            <button
              onClick={() => {
                setFiles([]);
                setMarkdown('');
              }}
              className="text-xs font-semibold text-gray-400 hover:text-red-500"
            >
              Change file
            </button>
          </div>

          {!markdown ? (
            <div className="flex justify-end">
              <button
                disabled={isProcessing}
                onClick={handleExtract}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#e5322d] hover:bg-[#c92520] text-white font-bold rounded-xl shadow-lg shadow-red-500/25 flex items-center justify-center gap-2 transition-all transform active:scale-95 disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Extracting content...</span>
                  </>
                ) : (
                  <>
                    <FileCode className="w-5 h-5" />
                    <span>Convert to Markdown</span>
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-700">
                  Markdown Content Preview
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied!' : 'Copy'}</span>
                  </button>
                  <button
                    onClick={handleDownload}
                    className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-sm transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download .md</span>
                  </button>
                </div>
              </div>

              <div className="bg-gray-900 text-gray-100 font-mono text-xs p-4 rounded-xl max-h-96 overflow-y-auto whitespace-pre-wrap selection:bg-red-500 selection:text-white border border-gray-800">
                {markdown}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

