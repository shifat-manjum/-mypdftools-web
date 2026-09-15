import React, { useState, useRef, useEffect } from 'react';
import { Dropzone } from '../components/Dropzone';
import { UploadedFile } from '../types';
import { PDFDocument } from 'pdf-lib';
import { toPdfBlob } from '../utils/pdfUtils';
import html2canvas from 'html2canvas';
import { renderAsync } from 'docx-preview';
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
  Printer,
  ZoomIn,
  ZoomOut,
  FileText,
  ShieldCheck,
  Zap,
  ArrowRight,
  AlertTriangle
} from 'lucide-react';

interface WordToPdfToolProps {
  currentLang?: Language;
}

const TEXTS: Record<Language, any> = {
  it: {
    selectFile: 'Seleziona documento Word (.docx)',
    dropHelper: 'o trascina il tuo file DOCX o DOC qui',
    readyToConvert: 'Documento caricato e pronto per la conversione',
    changeFile: 'Cambia file',
    convertBtn: 'CONVERTI IN PDF ORA',
    converting: 'Conversione in corso...',
    renderingDoc: 'Analisi e rendering del documento Word...',
    renderingPage: 'Elaborazione pagina',
    of: 'di',
    generatingPdf: 'Creazione del file PDF ad alta risoluzione...',
    successTitle: 'Word convertito in PDF con successo!',
    successSubtitle: 'La conversione è avvenuta al 100% nella memoria del tuo browser.',
    originalSize: 'Documento Word',
    newSize: 'PDF Generato',
    pagesCount: 'Pagine',
    downloadBtn: 'SCARICA PDF CONVERTITO',
    convertAnother: 'Converti un altro documento',
    vectorPrintBtn: 'Stampa / Salva in PDF Vettoriale',
    vectorPrintTooltip: 'Usa il driver di stampa del browser per un testo vettoriale al 100% perfetto',
    zoomIn: 'Ingrandisci',
    zoomOut: 'Riduci',
    previewTitle: 'Anteprima Documento Word',
    privacyNotice: 'I tuoi documenti rimangono privati. Nessun file viene inviato a server esterni.',
    docNote: 'Nota per file .doc: Se possiedi un vecchio file in formato .doc (Word 97-2003), per una resa grafica ottimale aprilo e salvalo come .docx prima della conversione.',
    errorRendering: 'Impossibile leggere il documento Word. Assicurati che il file sia un .docx valido e non protetto da password.',
  },
  de: {
    selectFile: 'Word-Dokument (.docx) auswählen',
    dropHelper: 'oder DOCX- oder DOC-Datei hierher ziehen',
    readyToConvert: 'Dokument geladen und bereit zur Konvertierung',
    changeFile: 'Datei wechseln',
    convertBtn: 'JETZT IN PDF UMWANDELN',
    converting: 'Konvertierung läuft...',
    renderingDoc: 'Word-Dokument wird analysiert und dargestellt...',
    renderingPage: 'Verarbeite Seite',
    of: 'von',
    generatingPdf: 'Hochauflösende PDF-Datei wird erstellt...',
    successTitle: 'Word erfolgreich in PDF umgewandelt!',
    successSubtitle: 'Die Umwandlung erfolgte zu 100% lokal im Speicher Ihres Browsers.',
    originalSize: 'Word-Dokument',
    newSize: 'Erzeugtes PDF',
    pagesCount: 'Seiten',
    downloadBtn: 'KONVERTIERTES PDF HERUNTERLADEN',
    convertAnother: 'Anderes Dokument konvertieren',
    vectorPrintBtn: 'Drucken / Als Vektor-PDF speichern',
    vectorPrintTooltip: 'Nutzt den Browser-Drucker für 100% gestochen scharfen Vektortext',
    zoomIn: 'Vergrößern',
    zoomOut: 'Verkleinern',
    previewTitle: 'Vorschau des Word-Dokuments',
    privacyNotice: 'Ihre Dokumente bleiben streng privat. Keine Daten werden an externe Server gesendet.',
    docNote: 'Hinweis für ältere .doc-Dateien: Speichern Sie Word 97-2003 (.doc) Dokumente am besten kurz als .docx für optimale Darstellung.',
    errorRendering: 'Das Word-Dokument konnte nicht gelesen werden. Bitte prüfen Sie, ob es sich um eine gültige .docx-Datei ohne Kennwortschutz handelt.',
  },
  en: {
    selectFile: 'Select Word Document (.docx)',
    dropHelper: 'or drop your DOCX or DOC file here',
    readyToConvert: 'Document loaded and ready to convert',
    changeFile: 'Change file',
    convertBtn: 'CONVERT TO PDF NOW',
    converting: 'Converting to PDF...',
    renderingDoc: 'Parsing and rendering Word document...',
    renderingPage: 'Processing page',
    of: 'of',
    generatingPdf: 'Generating high-resolution PDF...',
    successTitle: 'Word successfully converted to PDF!',
    successSubtitle: 'Conversion completed 100% client-side in your browser memory.',
    originalSize: 'Word Document',
    newSize: 'Generated PDF',
    pagesCount: 'Pages',
    downloadBtn: 'DOWNLOAD CONVERTED PDF',
    convertAnother: 'Convert another document',
    vectorPrintBtn: 'Print / Save Vector PDF',
    vectorPrintTooltip: 'Use browser print engine for 100% crisp vector typography',
    zoomIn: 'Zoom in',
    zoomOut: 'Zoom out',
    previewTitle: 'Word Document Preview',
    privacyNotice: 'Your documents stay private. Zero data is sent to external servers.',
    docNote: 'Note for legacy .doc files: For optimal formatting, save legacy Word 97-2003 (.doc) files as .docx before converting.',
    errorRendering: 'Could not read Word document. Please ensure it is a valid .docx file and not password-protected.',
  },
};

export const WordToPdfTool: React.FC<WordToPdfToolProps> = ({ currentLang = 'it' }) => {
  const t = TEXTS[currentLang] || TEXTS.it;

  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isRenderingPreview, setIsRenderingPreview] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const [conversionProgress, setConversionProgress] = useState<{ current: number; total: number } | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1.0);
  const [pageCount, setPageCount] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Result state
  const [resultPdf, setResultPdf] = useState<{
    blob: Blob;
    url: string;
    originalSize: number;
    newSize: number;
    filename: string;
  } | null>(null);

  const previewContainerRef = useRef<HTMLDivElement>(null);

  // When a file is uploaded, render it via docx-preview
  useEffect(() => {
    if (files.length === 0) {
      setPageCount(0);
      setErrorMessage(null);
      setResultPdf(null);
      if (previewContainerRef.current) {
        previewContainerRef.current.innerHTML = '';
      }
      return;
    }

    const file = files[0].file;
    setIsRenderingPreview(true);
    setErrorMessage(null);
    setResultPdf(null);

    const renderWordDocument = async () => {
      try {
        const arrayBuffer = await file.arrayBuffer();

        if (previewContainerRef.current) {
          previewContainerRef.current.innerHTML = '';

          await renderAsync(arrayBuffer, previewContainerRef.current, undefined, {
            inWrapper: true,
            ignoreWidth: false,
            ignoreHeight: false,
            breakPages: true,
            renderHeaders: true,
            renderFooters: true,
            useBase64URL: true,
            experimental: true,
          });

          // Count pages from rendered sections
          const sections = previewContainerRef.current.querySelectorAll('section.docx');
          setPageCount(sections.length > 0 ? sections.length : 1);
        }
      } catch (err: any) {
        console.error('Failed to preview Word document:', err);
        setErrorMessage(t.errorRendering);
      } finally {
        setIsRenderingPreview(false);
      }
    };

    renderWordDocument();
  }, [files]);

  // Convert rendered document to PDF
  const handleConvertToPdf = async () => {
    if (!previewContainerRef.current || files.length === 0) return;

    setIsConverting(true);
    setErrorMessage(null);

    try {
      const container = previewContainerRef.current;
      const sections = container.querySelectorAll('section.docx');
      const elementsToCapture = sections.length > 0 ? Array.from(sections) : [container];
      const totalPages = elementsToCapture.length;

      setConversionProgress({ current: 0, total: totalPages });

      const pdfDoc = await PDFDocument.create();

      for (let i = 0; i < totalPages; i++) {
        const el = elementsToCapture[i] as HTMLElement;

        // Render each page at 2x scale for sharp text and images
        const canvas = await html2canvas(el, {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff',
          windowWidth: el.scrollWidth || 794,
          windowHeight: el.scrollHeight || 1123,
        });

        const imgData = canvas.toDataURL('image/jpeg', 0.95);
        const imgBytes = await fetch(imgData).then((res) => res.arrayBuffer());
        const embeddedImage = await pdfDoc.embedJpg(imgBytes);

        // Standard A4 dimensions in PDF points (72 DPI): 595.28 x 841.89
        const elWidth = el.offsetWidth || 794;
        const elHeight = el.offsetHeight || 1123;
        const pdfWidth = 595.28;
        const pdfHeight = (elHeight / elWidth) * pdfWidth;

        const page = pdfDoc.addPage([pdfWidth, pdfHeight]);
        page.drawImage(embeddedImage, {
          x: 0,
          y: 0,
          width: pdfWidth,
          height: pdfHeight,
        });

        setConversionProgress({ current: i + 1, total: totalPages });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = toPdfBlob(pdfBytes);
      const url = URL.createObjectURL(blob);

      const baseName = files[0].name.replace(/\.[^/.]+$/, '');
      const downloadFilename = `mypdftools_${baseName}.pdf`;

      setResultPdf({
        blob,
        url,
        originalSize: files[0].size,
        newSize: blob.size,
        filename: downloadFilename,
      });

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (err: any) {
      console.error('Error converting Word to PDF:', err);
      setErrorMessage(err.message || 'Error converting document');
    } finally {
      setIsConverting(false);
      setConversionProgress(null);
    }
  };

  // Trigger high-fidelity vector print dialog
  const handleVectorPrint = () => {
    if (!previewContainerRef.current) return;
    window.print();
  };

  const handleDownload = () => {
    if (!resultPdf) return;
    saveAs(resultPdf.blob, resultPdf.filename);
  };

  const resetAll = () => {
    setFiles([]);
    setResultPdf(null);
    setErrorMessage(null);
    setPageCount(0);
    setZoomLevel(1.0);
  };

  return (
    <div className="space-y-8">
      {/* Upload Zone */}
      {files.length === 0 && (
        <div className="space-y-4">
          <Dropzone
            accept=".docx,.doc,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword"
            multiple={false}
            buttonLabel={t.selectFile}
            helperText={t.dropHelper}
            files={files}
            onFilesChange={setFiles}
            showPreviewList={false}
          />
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>{t.privacyNotice}</span>
          </div>
        </div>
      )}

      {/* Error Alert */}
      {errorMessage && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-2xl flex items-start gap-3 text-sm">
          <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-bold">{errorMessage}</p>
            <p className="text-xs text-red-600 mt-1">{t.docNote}</p>
          </div>
          <button
            onClick={resetAll}
            className="text-xs font-bold text-red-700 hover:text-red-900 underline cursor-pointer"
          >
            {t.changeFile}
          </button>
        </div>
      )}

      {/* Success View */}
      {resultPdf && (
        <div className="bg-white border border-emerald-200/90 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8 animate-in fade-in duration-300">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-emerald-100/80 rounded-2xl flex items-center justify-center border border-emerald-200 shadow-xs">
              <CheckCircle2 className="w-8 h-8 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {t.successTitle}
              </h3>
              <p className="text-sm font-medium text-slate-500 mt-1">
                {t.successSubtitle}
              </p>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t.originalSize}</p>
              <p className="text-lg font-black text-slate-700 mt-1">
                {(resultPdf.originalSize / (1024 * 1024)).toFixed(2)} MB
              </p>
              <p className="text-[11px] text-slate-500 font-medium truncate mt-0.5">{files[0]?.name}</p>
            </div>
            <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-4">
              <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider">{t.newSize}</p>
              <p className="text-lg font-black text-emerald-700 mt-1">
                {(resultPdf.newSize / (1024 * 1024)).toFixed(2)} MB
              </p>
              <p className="text-[11px] text-emerald-600 font-medium truncate mt-0.5">{resultPdf.filename}</p>
            </div>
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t.pagesCount}</p>
              <p className="text-lg font-black text-slate-700 mt-1">{pageCount}</p>
              <p className="text-[11px] text-slate-500 font-medium mt-0.5">A4 Standard</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            <button
              onClick={handleDownload}
              className="w-full sm:flex-1 py-4 px-8 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-2xl font-black text-base shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-3 transition-all transform active:scale-[0.99] cursor-pointer"
            >
              <Download className="w-5 h-5" />
              <span>{t.downloadBtn}</span>
            </button>
            <button
              onClick={handleVectorPrint}
              title={t.vectorPrintTooltip}
              className="w-full sm:w-auto py-4 px-6 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4 text-slate-500" />
              <span>{t.vectorPrintBtn}</span>
            </button>
            <button
              onClick={resetAll}
              className="w-full sm:w-auto py-4 px-6 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <RefreshCw className="w-4 h-4 text-slate-500" />
              <span>{t.convertAnother}</span>
            </button>
          </div>
        </div>
      )}

      {/* Document Loaded & Preview Mode (Before Conversion) */}
      {files.length > 0 && !resultPdf && (
        <div className="space-y-6">
          {/* File Toolbar */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center text-[#185ABD]">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-black text-slate-900 truncate max-w-[280px] sm:max-w-md">
                  {files[0].name}
                </h4>
                <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5 font-medium">
                  <span>{(files[0].size / (1024 * 1024)).toFixed(2)} MB</span>
                  {pageCount > 0 && (
                    <>
                      <span>•</span>
                      <span>{pageCount} {t.pagesCount}</span>
                    </>
                  )}
                  <span>•</span>
                  <span className="text-emerald-600 font-bold">{t.readyToConvert}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Zoom Controls */}
              <div className="flex items-center bg-slate-100 rounded-xl p-1 text-slate-600">
                <button
                  onClick={() => setZoomLevel((z) => Math.max(0.6, z - 0.1))}
                  title={t.zoomOut}
                  className="p-1.5 hover:bg-white rounded-lg transition-colors cursor-pointer"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="text-xs font-bold px-2">{Math.round(zoomLevel * 100)}%</span>
                <button
                  onClick={() => setZoomLevel((z) => Math.min(1.4, z + 0.1))}
                  title={t.zoomIn}
                  className="p-1.5 hover:bg-white rounded-lg transition-colors cursor-pointer"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={resetAll}
                className="text-xs font-bold text-slate-500 hover:text-red-600 px-3 py-2 rounded-xl hover:bg-red-50 transition-colors cursor-pointer"
              >
                {t.changeFile}
              </button>
            </div>
          </div>

          {/* Conversion Progress Bar */}
          {isConverting && (
            <div className="bg-white border border-blue-200 rounded-2xl p-6 shadow-sm space-y-3 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5 text-blue-700 font-bold text-sm">
                  <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                  <span>
                    {conversionProgress
                      ? `${t.renderingPage} ${conversionProgress.current} ${t.of} ${conversionProgress.total}`
                      : t.converting}
                  </span>
                </div>
                {conversionProgress && (
                  <span className="text-xs font-bold text-slate-500">
                    {Math.round((conversionProgress.current / conversionProgress.total) * 100)}%
                  </span>
                )}
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-blue-600 h-full transition-all duration-300 rounded-full"
                  style={{
                    width: conversionProgress
                      ? `${(conversionProgress.current / conversionProgress.total) * 100}%`
                      : '30%',
                  }}
                />
              </div>
              <p className="text-xs text-slate-400 font-medium">{t.generatingPdf}</p>
            </div>
          )}

          {/* Document Preview Pane */}
          <div className="bg-slate-100/80 border border-slate-200/90 rounded-3xl p-4 sm:p-8 relative min-h-[420px] overflow-hidden flex flex-col items-center shadow-inner">
            {isRenderingPreview && (
              <div className="absolute inset-0 bg-white/80 backdrop-blur-xs flex flex-col items-center justify-center z-10">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin mb-3" />
                <p className="text-sm font-bold text-slate-700">{t.renderingDoc}</p>
              </div>
            )}

            <div
              className="w-full flex justify-center transition-transform origin-top"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              <div
                ref={previewContainerRef}
                className="word-preview-wrapper bg-white shadow-xl rounded-sm max-w-full overflow-x-auto"
                style={{ minHeight: '500px' }}
              />
            </div>
          </div>

          {/* Primary Action Button */}
          <div className="pt-2">
            <button
              onClick={handleConvertToPdf}
              disabled={isConverting || isRenderingPreview}
              className={`w-full py-4.5 px-8 rounded-2xl font-black text-base flex items-center justify-center gap-3 transition-all cursor-pointer shadow-lg ${
                isConverting || isRenderingPreview
                  ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-blue-600/25 active:scale-[0.99]'
              }`}
            >
              {isConverting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>{t.converting}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>{t.convertBtn}</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
