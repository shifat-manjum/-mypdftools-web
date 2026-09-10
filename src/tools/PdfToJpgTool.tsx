import React, { useState } from 'react';
import { Dropzone } from '../components/Dropzone';
import { UploadedFile } from '../types';
import { convertPdfToImages, RenderedPageImage } from '../utils/pdfRenderUtils';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import confetti from 'canvas-confetti';
import { Language } from '../i18n/translations';
import { Download, Loader2, Sparkles, Image as ImageIcon, Archive, RefreshCw, AlertCircle, CheckCircle2 } from 'lucide-react';

interface PdfToJpgToolProps {
  currentLang?: Language;
}

const TEXTS: Record<Language, any> = {
  it: {
    selectFile: 'Seleziona file PDF',
    dropHelper: 'o trascina il tuo documento PDF qui',
    readyToConvert: 'Pronto per la conversione',
    changeFile: 'Cambia file',
    outputOptions: 'Opzioni di Esportazione',
    imageFormat: 'Formato Immagine',
    formatJpg: 'JPG (Formato web ottimizzato)',
    formatPng: 'PNG (Massima nitidezza e testo nitido)',
    resolution: 'Risoluzione / Qualità',
    resStandard: 'Standard (100 DPI)',
    resHigh: 'Alta Qualità (150 DPI - Consigliata)',
    resUltra: 'Ultra HD (200 DPI)',
    convertBtn: 'Converti in JPG',
    rendering: 'Rendering pagina',
    of: 'di',
    processing: 'Elaborazione del PDF in corso...',
    successTitle: 'Conversione completata con successo!',
    successSubtitle: 'Tutte le pagine sono state convertite in immagini ad alta risoluzione.',
    downloadAllZip: 'SCARICA TUTTE LE IMMAGINI (ZIP)',
    downloadPage: 'Scarica',
    page: 'Pagina',
    convertAnother: 'Converti un altro PDF',
    errorTitle: 'Impossibile convertire il PDF',
    retry: 'Riprova',
  },
  en: {
    selectFile: 'Select PDF file',
    dropHelper: 'or drop your PDF document here',
    readyToConvert: 'Ready to convert',
    changeFile: 'Change file',
    outputOptions: 'Output Options',
    imageFormat: 'Image Format',
    formatJpg: 'JPG (Optimized web standard)',
    formatPng: 'PNG (Lossless with sharp text)',
    resolution: 'Resolution / Quality',
    resStandard: 'Standard (100 DPI)',
    resHigh: 'High Quality (150 DPI - Recommended)',
    resUltra: 'Ultra HD (200 DPI)',
    convertBtn: 'Convert to JPG',
    rendering: 'Rendering page',
    of: 'of',
    processing: 'Processing PDF...',
    successTitle: 'Successfully converted!',
    successSubtitle: 'All pages have been converted to high-resolution images.',
    downloadAllZip: 'DOWNLOAD ALL IMAGES (ZIP)',
    downloadPage: 'Download',
    page: 'Page',
    convertAnother: 'Convert another PDF',
    errorTitle: 'Failed to convert PDF',
    retry: 'Try again',
  },
  de: {
    selectFile: 'PDF-Datei auswählen',
    dropHelper: 'oder PDF-Dokument hierher ziehen',
    readyToConvert: 'Bereit zur Konvertierung',
    changeFile: 'Datei ändern',
    outputOptions: 'Ausgabe-Optionen',
    imageFormat: 'Bildformat',
    formatJpg: 'JPG (Web-optimiertes Standardformat)',
    formatPng: 'PNG (Verlustfrei mit scharfem Text)',
    resolution: 'Auflösung / Qualität',
    resStandard: 'Standard (100 DPI)',
    resHigh: 'Hohe Qualität (150 DPI - Empfohlen)',
    resUltra: 'Ultra HD (200 DPI)',
    convertBtn: 'In JPG umwandeln',
    rendering: 'Seite wird gerendert',
    of: 'von',
    processing: 'PDF wird verarbeitet...',
    successTitle: 'Erfolgreich umgewandelt!',
    successSubtitle: 'Alle Seiten wurden in hochauflösende Bilder konvertiert.',
    downloadAllZip: 'ALLE BILDER HERUNTERLADEN (ZIP)',
    downloadPage: 'Herunterladen',
    page: 'Seite',
    convertAnother: 'Ein weiteres PDF umwandeln',
    errorTitle: 'PDF konnte nicht umgewandelt werden',
    retry: 'Erneut versuchen',
  },
};

export const PdfToJpgTool: React.FC<PdfToJpgToolProps> = ({ currentLang = 'it' }) => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [renderedImages, setRenderedImages] = useState<RenderedPageImage[]>([]);
  const [format, setFormat] = useState<'image/jpeg' | 'image/png'>('image/jpeg');
  const [scale, setScale] = useState<number>(1.5);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [progress, setProgress] = useState<{ current: number; total: number } | null>(null);

  const t = TEXTS[currentLang] || TEXTS.it;

  const handleConvert = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);
    setErrorMessage(null);
    setRenderedImages([]);
    setProgress({ current: 0, total: 1 });

    try {
      const pdfFile = files[0].file;
      const images = await convertPdfToImages(
        pdfFile,
        scale,
        format,
        (current, total) => {
          setProgress({ current, total });
        }
      );

      if (!images || images.length === 0) {
        throw new Error('No pages found in this PDF document.');
      }

      setRenderedImages(images);

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {}
    } catch (err: any) {
      console.error('PDF to image conversion error:', err);
      setErrorMessage(err.message || 'Error parsing or rendering the PDF file.');
    } finally {
      setIsProcessing(false);
      setProgress(null);
    }
  };

  const handleDownloadSingle = (img: RenderedPageImage) => {
    const ext = format === 'image/png' ? 'png' : 'jpg';
    saveAs(img.blob, `mypdftools_${files[0]?.name?.replace(/\.[^/.]+$/, '') || 'document'}_p${img.pageNumber}.${ext}`);
  };

  const handleDownloadAllZip = async () => {
    if (renderedImages.length === 0) return;
    const zip = new JSZip();
    const ext = format === 'image/png' ? 'png' : 'jpg';
    const baseName = files[0]?.name?.replace(/\.[^/.]+$/, '') || 'document';

    renderedImages.forEach((img) => {
      zip.file(`${baseName}_p${img.pageNumber}.${ext}`, img.blob);
    });

    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, `mypdftools_${baseName}_images.zip`);
  };

  return (
    <div className="space-y-6">
      {/* Upload Zone when no file selected */}
      {files.length === 0 && (
        <Dropzone
          accept="application/pdf"
          multiple={false}
          buttonLabel={t.selectFile}
          helperText={t.dropHelper}
          files={files}
          onFilesChange={(newFiles) => {
            setFiles(newFiles);
            setRenderedImages([]);
            setErrorMessage(null);
          }}
          showPreviewList={false}
        />
      )}

      {/* File Selected Configuration & Action */}
      {files.length > 0 && renderedImages.length === 0 && (
        <div className="space-y-6">
          {/* File Selected Badge */}
          <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 sm:p-5 flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-3.5 truncate">
              <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center text-red-600 flex-shrink-0 shadow-xs">
                <ImageIcon className="w-6 h-6" />
              </div>
              <div className="truncate">
                <h4 className="text-sm font-black text-slate-900 truncate">
                  {files[0].name}
                </h4>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  {(files[0].size / (1024 * 1024)).toFixed(2)} MB • {t.readyToConvert}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setFiles([]);
                setRenderedImages([]);
                setErrorMessage(null);
              }}
              className="text-xs font-black text-slate-400 hover:text-red-600 px-3 py-1.5 transition-colors cursor-pointer"
            >
              {t.changeFile}
            </button>
          </div>

          {/* Conversion Options */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
            <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider mb-3">
              {t.outputOptions}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {t.imageFormat}
                </label>
                <select
                  value={format}
                  onChange={(e) => setFormat(e.target.value as any)}
                  className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
                >
                  <option value="image/jpeg">{t.formatJpg}</option>
                  <option value="image/png">{t.formatPng}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {t.resolution}
                </label>
                <select
                  value={scale}
                  onChange={(e) => setScale(parseFloat(e.target.value))}
                  className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
                >
                  <option value="1.0">{t.resStandard}</option>
                  <option value="1.5">{t.resHigh}</option>
                  <option value="2.0">{t.resUltra}</option>
                </select>
              </div>
            </div>
          </div>

          {/* Error Message if conversion failed */}
          {errorMessage && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center justify-between gap-3 text-red-800">
              <div className="flex items-center gap-2.5">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <span className="text-xs font-bold">{t.errorTitle}: {errorMessage}</span>
              </div>
              <button
                onClick={handleConvert}
                className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg cursor-pointer flex-shrink-0"
              >
                {t.retry}
              </button>
            </div>
          )}

          {/* Convert Action Button */}
          <div className="flex justify-end pt-2">
            <button
              disabled={isProcessing}
              onClick={handleConvert}
              className="w-full sm:w-auto px-9 py-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-black text-sm rounded-2xl shadow-lg shadow-red-500/25 flex items-center justify-center gap-2.5 transition-all transform active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>
                    {progress
                      ? `${t.rendering} ${progress.current} ${t.of} ${progress.total}...`
                      : t.processing}
                  </span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 text-amber-300" />
                  <span>{t.convertBtn} ({format === 'image/png' ? 'PNG' : 'JPG'})</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Conversion Success & Download Section */}
      {renderedImages.length > 0 && (
        <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
          {/* Prominent Success Hero Card */}
          <div className="bg-gradient-to-br from-emerald-500 via-teal-600 to-emerald-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-emerald-600/20 relative overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
              <div className="text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold mb-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-200" />
                  <span>{t.successTitle}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
                  {renderedImages.length} {t.page} {renderedImages.length > 1 ? 'immagini pronte' : 'immagine pronta'}
                </h3>
                <p className="text-emerald-100 text-xs sm:text-sm mt-1 max-w-lg">
                  {t.successSubtitle}
                </p>
              </div>

              {/* Big Download ZIP Button */}
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                <button
                  onClick={handleDownloadAllZip}
                  className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-emerald-50 text-emerald-900 font-black text-sm rounded-2xl shadow-xl flex items-center justify-center gap-2.5 transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <Archive className="w-5 h-5 text-emerald-600" />
                  <span>{t.downloadAllZip}</span>
                </button>
                <button
                  onClick={() => {
                    setFiles([]);
                    setRenderedImages([]);
                    setErrorMessage(null);
                  }}
                  className="w-full sm:w-auto px-4 py-4 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-2xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>{t.convertAnother}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Individual Pages Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {renderedImages.map((img) => (
              <div
                key={img.pageNumber}
                className="bg-white border border-slate-200 rounded-2xl p-3 shadow-xs flex flex-col items-center group hover:shadow-md transition-all hover:border-emerald-500/40"
              >
                <div className="w-full aspect-[3/4] bg-slate-100 rounded-xl overflow-hidden mb-3 border border-slate-100">
                  <img
                    src={img.dataUrl}
                    alt={`${t.page} ${img.pageNumber}`}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-xs font-black text-slate-800 mb-2">
                  {t.page} {img.pageNumber}
                </span>
                <button
                  onClick={() => handleDownloadSingle(img)}
                  className="w-full py-2 px-3 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 text-xs font-black rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{t.downloadPage} JPG</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
