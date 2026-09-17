import React, { useState, useEffect } from 'react';
import { Dropzone } from '../components/Dropzone';
import { UploadedFile } from '../types';
import { loadPdfDocument, renderPdfPageToCanvas } from '../utils/pdfRenderUtils';
import { createDocxFromPages, DocxPageContent } from '../utils/docxUtils';
import { saveAs } from 'file-saver';
import confetti from 'canvas-confetti';
import { Language } from '../i18n/translations';
import {
  Download,
  Loader2,
  Sparkles,
  CheckCircle2,
  RefreshCw,
  Eye,
  FileText,
  ShieldCheck,
  Zap,
  ArrowRight,
  AlertCircle
} from 'lucide-react';

interface PdfToWordToolProps {
  currentLang?: Language;
}

const TEXTS: Record<Language, any> = {
  it: {
    selectFile: 'Seleziona file PDF',
    dropHelper: 'o trascina il tuo documento PDF qui',
    readyToConvert: 'Documento caricato e pronto per la conversione in Word',
    changeFile: 'Cambia file',
    convertBtn: 'CONVERTI IN WORD (.DOCX) ORA',
    converting: 'Conversione in corso...',
    extractingPage: 'Estrazione testo da pagina',
    of: 'di',
    generatingDocx: 'Creazione del documento Word modificabile (.docx)...',
    successTitle: 'PDF convertito in Word con successo!',
    successSubtitle: 'Il documento è pronto per essere modificato in Microsoft Word o Google Docs.',
    originalSize: 'PDF Originale',
    newSize: 'Word (.docx)',
    pagesCount: 'Pagine',
    downloadBtn: 'SCARICA DOCUMENTO WORD (.DOCX)',
    convertAnother: 'Converti un altro PDF',
    previewTitle: 'Anteprima Pagine PDF',
    privacyNotice: 'Elaborazione al 100% nel tuo browser. Nessun dato viene inviato a server esterni.',
    errorTitle: 'Impossibile convertire il PDF',
    errorDesc: 'Si è verificato un errore durante la lettura del file PDF. Assicurati che non sia protetto da password.',
    retry: 'Riprova',
  },
  de: {
    selectFile: 'PDF-Datei auswählen',
    dropHelper: 'oder PDF-Dokument hierher ziehen',
    readyToConvert: 'Dokument geladen und bereit zur Word-Konvertierung',
    changeFile: 'Datei ändern',
    convertBtn: 'JETZT IN WORD (.DOCX) UMWANDELN',
    converting: 'Konvertierung läuft...',
    extractingPage: 'Text wird extrahiert aus Seite',
    of: 'von',
    generatingDocx: 'Bearbeitbares Word-Dokument (.docx) wird erstellt...',
    successTitle: 'PDF erfolgreich in Word umgewandelt!',
    successSubtitle: 'Ihr Dokument kann direkt in Microsoft Word oder Google Docs bearbeitet werden.',
    originalSize: 'Original-PDF',
    newSize: 'Word (.docx)',
    pagesCount: 'Seiten',
    downloadBtn: 'WORD-DOKUMENT (.DOCX) HERUNTERLADEN',
    convertAnother: 'Ein weiteres PDF umwandeln',
    previewTitle: 'Vorschau der PDF-Seiten',
    privacyNotice: '100% lokale Verarbeitung im Browser. Es werden keine Daten an Server gesendet.',
    errorTitle: 'PDF konnte nicht umgewandelt werden',
    errorDesc: 'Fehler beim Lesen der PDF-Datei. Stellen Sie sicher, dass sie nicht passwortgeschützt ist.',
    retry: 'Erneut versuchen',
  },
  en: {
    selectFile: 'Select PDF file',
    dropHelper: 'or drop your PDF document here',
    readyToConvert: 'Document loaded and ready for Word conversion',
    changeFile: 'Change file',
    convertBtn: 'CONVERT TO WORD (.DOCX) NOW',
    converting: 'Converting...',
    extractingPage: 'Extracting text from page',
    of: 'of',
    generatingDocx: 'Generating editable Word (.docx) document...',
    successTitle: 'PDF successfully converted to Word!',
    successSubtitle: 'Your document is ready to be edited in Microsoft Word or Google Docs.',
    originalSize: 'Original PDF',
    newSize: 'Word (.docx)',
    pagesCount: 'Pages',
    downloadBtn: 'DOWNLOAD WORD DOCUMENT (.DOCX)',
    convertAnother: 'Convert another PDF',
    previewTitle: 'PDF Pages Preview',
    privacyNotice: '100% private in-browser processing. Zero files are uploaded to external servers.',
    errorTitle: 'Failed to convert PDF',
    errorDesc: 'An error occurred while reading the PDF file. Please ensure it is not password-protected.',
    retry: 'Try again',
  },
};

export const PdfToWordTool: React.FC<PdfToWordToolProps> = ({ currentLang = 'it' }) => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [pagePreviews, setPagePreviews] = useState<string[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isRenderingPreviews, setIsRenderingPreviews] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState<{ current: number; total: number } | null>(null);
  const [docxBlob, setDocxBlob] = useState<Blob | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const t = TEXTS[currentLang] || TEXTS.it;

  // Render initial page previews when a file is uploaded
  useEffect(() => {
    if (files.length === 0) {
      setPagePreviews([]);
      setTotalPages(0);
      setDocxBlob(null);
      setErrorMessage(null);
      return;
    }

    let isMounted = true;
    const generatePreviews = async () => {
      setIsRenderingPreviews(true);
      try {
        const pdf = await loadPdfDocument(files[0].file);
        if (!isMounted) return;
        setTotalPages(pdf.numPages);

        const previewsToRender = Math.min(pdf.numPages, 6);
        const previews: string[] = [];

        for (let i = 1; i <= previewsToRender; i++) {
          const canvas = await renderPdfPageToCanvas(pdf, i, 0.7);
          if (!isMounted) return;
          previews.push(canvas.toDataURL('image/jpeg', 0.8));
        }

        setPagePreviews(previews);
      } catch (err: any) {
        console.error('Error rendering page previews:', err);
      } finally {
        if (isMounted) setIsRenderingPreviews(false);
      }
    };

    generatePreviews();
    return () => {
      isMounted = false;
    };
  }, [files]);

  const handleConvert = async () => {
    if (files.length === 0) return;

    setIsProcessing(true);
    setErrorMessage(null);
    setProgress({ current: 0, total: 1 });

    try {
      const pdf = await loadPdfDocument(files[0].file);
      const count = pdf.numPages;
      const pagesContent: DocxPageContent[] = [];

      for (let i = 1; i <= count; i++) {
        setProgress({ current: i, total: count });
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        
        // Group items into coherent lines based on vertical Y position
        const lines: string[] = [];
        let currentLine = '';
        let lastY: number | null = null;

        for (const item of textContent.items as any[]) {
          const itemY = item.transform ? item.transform[5] : null;
          if (lastY !== null && itemY !== null && Math.abs(itemY - lastY) > 5) {
            if (currentLine.trim()) lines.push(currentLine.trim());
            currentLine = '';
          }
          currentLine += (currentLine ? ' ' : '') + (item.str || '');
          if (itemY !== null) lastY = itemY;
        }

        if (currentLine.trim()) lines.push(currentLine.trim());
        pagesContent.push({ pageNumber: i, lines });
      }

      const generatedBlob = await createDocxFromPages(
        files[0].name.replace(/\.[^/.]+$/, ''),
        pagesContent
      );

      setDocxBlob(generatedBlob);

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {}
    } catch (err: any) {
      console.error('PDF to Word conversion error:', err);
      setErrorMessage(err.message || t.errorDesc);
    } finally {
      setIsProcessing(false);
      setProgress(null);
    }
  };

  const handleDownload = () => {
    if (!docxBlob) return;
    const baseName = files[0]?.name?.replace(/\.[^/.]+$/, '') || 'document';
    saveAs(docxBlob, `mypdftools_${baseName}.docx`);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div className="space-y-6">
      {/* Upload Zone */}
      {files.length === 0 && (
        <Dropzone
          accept="application/pdf"
          multiple={false}
          buttonLabel={t.selectFile}
          helperText={t.dropHelper}
          files={files}
          onFilesChange={(newFiles) => {
            setFiles(newFiles);
            setDocxBlob(null);
            setErrorMessage(null);
          }}
        />
      )}

      {/* Conversion Workspace */}
      {files.length > 0 && !docxBlob && (
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 text-[#185ABD] rounded-2xl flex items-center justify-center border border-blue-100 flex-shrink-0">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900 truncate max-w-[280px] sm:max-w-md">
                  {files[0].name}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {formatFileSize(files[0].size)} {totalPages > 0 && `• ${totalPages} ${t.pagesCount}`}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setFiles([]);
                setDocxBlob(null);
                setErrorMessage(null);
              }}
              disabled={isProcessing}
              className="text-xs font-bold text-slate-500 hover:text-red-600 transition-colors cursor-pointer self-start sm:self-center"
            >
              {t.changeFile}
            </button>
          </div>

          {/* Page Previews */}
          {pagePreviews.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black uppercase tracking-wider text-slate-400">
                  {t.previewTitle}
                </span>
                {totalPages > pagePreviews.length && (
                  <span className="text-[11px] font-bold text-slate-400">
                    Showing first {pagePreviews.length} of {totalPages} pages
                  </span>
                )}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {pagePreviews.map((previewUrl, idx) => (
                  <div
                    key={idx}
                    className="relative bg-slate-50 border border-slate-200 rounded-xl overflow-hidden shadow-xs group aspect-[3/4] flex items-center justify-center p-1"
                  >
                    <img
                      src={previewUrl}
                      alt={`Page ${idx + 1}`}
                      className="max-h-full max-w-full object-contain rounded shadow-xs"
                    />
                    <span className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 bg-slate-900/80 backdrop-blur-xs text-[10px] font-bold text-white rounded">
                      p.{idx + 1}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Error Notice */}
          {errorMessage && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h4 className="text-sm font-bold text-red-800">{t.errorTitle}</h4>
                <p className="text-xs text-red-600 mt-0.5">{errorMessage}</p>
              </div>
            </div>
          )}

          {/* Action Trigger */}
          <div className="pt-2">
            <button
              onClick={handleConvert}
              disabled={isProcessing}
              className="w-full py-4 px-6 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white font-black text-sm rounded-2xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>
                    {progress
                      ? `${t.extractingPage} ${progress.current} ${t.of} ${progress.total}...`
                      : t.converting}
                  </span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>{t.convertBtn}</span>
                  <ArrowRight className="w-4 h-4 ml-1 opacity-70" />
                </>
              )}
            </button>
          </div>

          <p className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>{t.privacyNotice}</span>
          </p>
        </div>
      )}

      {/* Success Hero */}
      {docxBlob && (
        <div className="bg-white border border-emerald-200 rounded-3xl p-8 sm:p-10 shadow-sm text-center space-y-6 animate-fade-in">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto border border-emerald-100 shadow-sm">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="max-w-md mx-auto">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">
              {t.successTitle}
            </h3>
            <p className="text-sm text-slate-500 mt-1.5">{t.successSubtitle}</p>
          </div>

          {/* File Meta Cards */}
          <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3 text-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                {t.originalSize}
              </span>
              <span className="text-sm font-black text-slate-700 mt-0.5 block">
                {formatFileSize(files[0]?.size || 0)}
              </span>
            </div>
            <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-2xl p-3 text-center">
              <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider block">
                {t.newSize}
              </span>
              <span className="text-sm font-black text-emerald-700 mt-0.5 block">
                {formatFileSize(docxBlob.size)}
              </span>
            </div>
          </div>

          {/* Download Button */}
          <div className="pt-2 max-w-md mx-auto space-y-3">
            <button
              onClick={handleDownload}
              className="w-full py-4 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm rounded-2xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <Download className="w-5 h-5" />
              <span>{t.downloadBtn}</span>
            </button>

            <button
              onClick={() => {
                setFiles([]);
                setDocxBlob(null);
                setErrorMessage(null);
              }}
              className="w-full py-3 px-4 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{t.convertAnother}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
