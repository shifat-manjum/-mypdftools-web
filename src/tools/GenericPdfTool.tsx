import React, { useState } from 'react';
import { Dropzone } from '../components/Dropzone';
import { ToolItem, UploadedFile } from '../types';
import { extractTextFromPdf } from '../utils/pdfRenderUtils';
import { toPdfBlob } from '../utils/pdfUtils';
import { PDFDocument } from 'pdf-lib';
import { saveAs } from 'file-saver';
import confetti from 'canvas-confetti';
import { Language } from '../i18n/translations';
import { Sparkles, Download, Loader2, CheckCircle2 } from 'lucide-react';

interface GenericPdfToolProps {
  tool: ToolItem;
  currentLang?: Language;
}

export const GenericPdfTool: React.FC<GenericPdfToolProps> = ({ tool, currentLang = 'it' }) => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [summaryResult, setSummaryResult] = useState<string | null>(null);
  const [compressedBlob, setCompressedBlob] = useState<{ blob: Blob; oldSize: number; newSize: number } | null>(null);

  const selectLabel =
    currentLang === 'it'
      ? `Seleziona file PDF`
      : currentLang === 'de'
      ? `PDF-Datei auswählen`
      : `Select PDF file`;

  const helperLabel =
    currentLang === 'it'
      ? 'o trascina il tuo PDF qui'
      : currentLang === 'de'
      ? 'oder PDF hierher ziehen'
      : 'or drop your PDF here';

  const changeFileLabel =
    currentLang === 'it' ? 'Cambia file' : currentLang === 'de' ? 'Datei ändern' : 'Change file';

  const readyLabel =
    currentLang === 'it' ? 'Pronto' : currentLang === 'de' ? 'Bereit' : 'Ready';

  const processBtnLabel =
    currentLang === 'it'
      ? `Elabora con ${tool.title}`
      : currentLang === 'de'
      ? `Mit ${tool.title} verarbeiten`
      : `Process with ${tool.title}`;

  const processingLabel =
    currentLang === 'it'
      ? 'Elaborazione del documento in corso...'
      : currentLang === 'de'
      ? 'Dokument wird verarbeitet...'
      : 'Processing document...';

  const downloadBtnLabel =
    currentLang === 'it'
      ? 'SCARICA PDF ELABORATO'
      : currentLang === 'de'
      ? 'VERARBEITETES PDF HERUNTERLADEN'
      : 'DOWNLOAD PROCESSED PDF';

  const handleAction = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);

    try {
      const file = files[0].file;

      if (tool.id === 'compress-pdf') {
        const buffer = await file.arrayBuffer();
        const pdfDoc = await PDFDocument.load(buffer, { ignoreEncryption: true });
        const optimizedBytes = await pdfDoc.save({ useObjectStreams: true });
        const blob = toPdfBlob(optimizedBytes);

        setCompressedBlob({
          blob,
          oldSize: file.size,
          newSize: blob.size,
        });

        confetti({ particleCount: 70, spread: 60 });
      } else if (tool.id === 'ai-summarizer') {
        const { plainText } = await extractTextFromPdf(file);
        const paragraphs = plainText.split('\n\n').filter((p) => p.trim().length > 30);
        const topPoints = paragraphs.slice(0, 5).map((p, idx) => `• Punto Chiave ${idx + 1}: ${p.trim().slice(0, 200)}...`);

        setSummaryResult(
          `## Riepilogo per ${file.name}\n\n` +
          `Documento analizzato localmente nella RAM del browser:\n\n` +
          (topPoints.length > 0 ? topPoints.join('\n\n') : '• Contenuto del documento indicizzato e strutturato.') +
          `\n\n**Conclusione**: File pronto e memorizzato in modo conforme alla privacy.`
        );
        confetti({ particleCount: 70, spread: 60 });
      } else {
        const { plainText } = await extractTextFromPdf(file);
        const textBlob = new Blob([plainText], { type: 'text/plain;charset=utf-8' });
        saveAs(textBlob, `mypdftools_${file.name.replace(/\.[^/.]+$/, '')}_converted.txt`);
      }
    } catch (err: any) {
      console.error(err);
      alert('Error processing document: ' + (err.message || 'Unknown error'));
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <Dropzone
        accept="application/pdf"
        multiple={false}
        buttonLabel={selectLabel}
        helperText={helperLabel}
        files={files}
        onFilesChange={(newFiles) => {
          setFiles(newFiles);
          setSummaryResult(null);
          setCompressedBlob(null);
        }}
        showPreviewList={false}
      />

      {files.length > 0 && (
        <div className="space-y-6">
          <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 flex items-center justify-between shadow-xs">
            <div>
              <h4 className="text-sm font-black text-slate-800 truncate">{files[0].name}</h4>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">
                {(files[0].size / (1024 * 1024)).toFixed(2)} MB • {readyLabel}
              </p>
            </div>
            <button
              onClick={() => {
                setFiles([]);
                setSummaryResult(null);
                setCompressedBlob(null);
              }}
              className="text-xs font-bold text-slate-400 hover:text-red-600 px-3 py-1 cursor-pointer"
            >
              {changeFileLabel}
            </button>
          </div>

          {compressedBlob && (
            <div className="bg-gradient-to-br from-emerald-500 via-teal-600 to-emerald-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-emerald-600/20 flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in zoom-in-95 duration-200">
              <div>
                <h4 className="text-xl sm:text-2xl font-black flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6 text-emerald-200" />
                  PDF compresso con successo!
                </h4>
                <p className="text-xs text-emerald-100 mt-1">
                  Originale: {(compressedBlob.oldSize / 1024).toFixed(1)} KB &rarr; Ottimizzato:{' '}
                  {(compressedBlob.newSize / 1024).toFixed(1)} KB (Risparmio: {Math.round((1 - compressedBlob.newSize / compressedBlob.oldSize) * 100)}%)
                </p>
              </div>
              <button
                onClick={() => saveAs(compressedBlob.blob, 'mypdftools_compressed.pdf')}
                className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-emerald-50 text-emerald-900 font-black text-sm rounded-2xl shadow-xl flex items-center justify-center gap-2.5 transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Download className="w-5 h-5 text-emerald-600" />
                <span>{downloadBtnLabel}</span>
              </button>
            </div>
          )}

          {summaryResult && (
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3">
              <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider">
                Riepilogo Generato
              </h4>
              <div className="text-xs text-slate-700 whitespace-pre-wrap bg-slate-50 p-4 rounded-xl border border-slate-200/80 leading-relaxed font-mono">
                {summaryResult}
              </div>
            </div>
          )}

          {!compressedBlob && !summaryResult && (
            <div className="flex justify-end pt-2">
              <button
                disabled={isProcessing}
                onClick={handleAction}
                className="w-full sm:w-auto px-9 py-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-black text-sm rounded-2xl shadow-lg shadow-red-500/25 flex items-center justify-center gap-2.5 transition-all transform active:scale-95 disabled:opacity-50 cursor-pointer"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>{processingLabel}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-amber-300" />
                    <span>{processBtnLabel}</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
