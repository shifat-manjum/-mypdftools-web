import React, { useState } from 'react';
import { Dropzone } from '../components/Dropzone';
import { UploadedFile } from '../types';
import { compressPdf, CompressionLevel, CompressProgress, CompressResult } from '../utils/pdfCompressUtils';
import { saveAs } from 'file-saver';
import confetti from 'canvas-confetti';
import { Language } from '../i18n/translations';
import { 
  Download, 
  Loader2, 
  Sparkles, 
  CheckCircle2, 
  RefreshCw, 
  ShieldCheck, 
  Zap, 
  Minimize2, 
  Layers,
  ArrowRight,
  TrendingDown
} from 'lucide-react';

interface CompressPdfToolProps {
  currentLang?: Language;
}

const TEXTS: Record<Language, any> = {
  it: {
    selectFile: 'Seleziona file PDF',
    dropHelper: 'o trascina il tuo documento PDF qui',
    readyToCompress: 'Pronto per la compressione',
    changeFile: 'Cambia file',
    compressionLevelTitle: 'Scegli il Livello di Compressione',
    recommendedTitle: 'Compressione Consigliata',
    recommendedDesc: 'Ottimo equilibrio tra qualità nitida e forte riduzione di peso (Consigliata)',
    recommendedBadge: 'Consigliata',
    extremeTitle: 'Compressione Estrema',
    extremeDesc: 'Massima riduzione delle dimensioni, ideale per allegati email e limiti di upload',
    extremeBadge: 'Più Leggera',
    lowTitle: 'Bassa Compressione',
    lowDesc: 'Altissima fedeltà delle immagini, compressione leggera e non invasiva',
    lowBadge: 'Massima Qualità',
    compressBtn: 'Comprimi PDF Adesso',
    compressing: 'Compressione del PDF in corso...',
    pageOf: 'Elaborazione pagina',
    of: 'di',
    successTitle: 'PDF compresso con successo!',
    successSubtitle: 'Il documento è stato ottimizzato al 100% nella memoria del tuo browser.',
    originalSize: 'Dimensione Originale',
    newSize: 'Nuova Dimensione',
    savedLabel: 'Risparmiato',
    downloadBtn: 'SCARICA IL PDF COMPRESSO',
    compressAnother: 'Comprimi un altro PDF',
    clientSideNotice: 'Nessun file viene inviato sui server. Privacy totale garantita.',
  },
  de: {
    selectFile: 'PDF-Datei auswählen',
    dropHelper: 'oder PDF hier ablegen, um es zu komprimieren',
    readyToCompress: 'Bereit zur Komprimierung',
    changeFile: 'Datei wechseln',
    compressionLevelTitle: 'Wählen Sie die Komprimierungsstufe',
    recommendedTitle: 'Empfohlene Komprimierung',
    recommendedDesc: 'Optimale Balance: scharfer Text & spürbar kleinere Dateigröße (Empfohlen)',
    recommendedBadge: 'Empfohlen',
    extremeTitle: 'Extreme Komprimierung',
    extremeDesc: 'Maximale Verkleinerung, perfekt für E-Mail-Anhänge und Upload-Limits',
    extremeBadge: 'Kleinste Datei',
    lowTitle: 'Geringe Komprimierung',
    lowDesc: 'Sehr hohe Bildqualität mit leichter, verlustfreier Datenoptimierung',
    lowBadge: 'Höchste Qualität',
    compressBtn: 'PDF jetzt komprimieren',
    compressing: 'PDF wird komprimiert...',
    pageOf: 'Verarbeite Seite',
    of: 'von',
    successTitle: 'PDF erfolgreich komprimiert!',
    successSubtitle: 'Ihr Dokument wurde zu 100% lokal im Browser optimiert.',
    originalSize: 'Originalgröße',
    newSize: 'Neue Größe',
    savedLabel: 'Eingespart',
    downloadBtn: 'KOMPRIMIERTES PDF HERUNTERLADEN',
    compressAnother: 'Weiteres PDF komprimieren',
    clientSideNotice: 'Keine Server-Uploads. Ihre Daten bleiben 100% privat auf Ihrem Gerät.',
  },
  en: {
    selectFile: 'Select PDF file',
    dropHelper: 'or drop your PDF document here to compress',
    readyToCompress: 'Ready to compress',
    changeFile: 'Change file',
    compressionLevelTitle: 'Choose Compression Level',
    recommendedTitle: 'Recommended Compression',
    recommendedDesc: 'Best balance: crisp readable text & strong file size reduction',
    recommendedBadge: 'Recommended',
    extremeTitle: 'Extreme Compression',
    extremeDesc: 'Maximum size reduction, best for email attachments and portal upload limits',
    extremeBadge: 'Smallest Size',
    lowTitle: 'Low Compression',
    lowDesc: 'Maximum visual fidelity, slight non-destructive size reduction',
    lowBadge: 'High Quality',
    compressBtn: 'Compress PDF Now',
    compressing: 'Compressing PDF document...',
    pageOf: 'Processing page',
    of: 'of',
    successTitle: 'PDF compressed successfully!',
    successSubtitle: 'Your document was optimized 100% client-side inside your browser memory.',
    originalSize: 'Original Size',
    newSize: 'New Size',
    savedLabel: 'Saved',
    downloadBtn: 'DOWNLOAD COMPRESSED PDF',
    compressAnother: 'Compress another PDF',
    clientSideNotice: 'Zero server uploads. 100% private and secure on your device.',
  },
};

export const CompressPdfTool: React.FC<CompressPdfToolProps> = ({
  currentLang = 'it',
}) => {
  const t = TEXTS[currentLang] || TEXTS.it;

  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [level, setLevel] = useState<CompressionLevel>('recommended');
  const [isCompressing, setIsCompressing] = useState(false);
  const [progress, setProgress] = useState<CompressProgress | null>(null);
  const [result, setResult] = useState<CompressResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleFilesAdded = (files: UploadedFile[]) => {
    if (files.length > 0) {
      setUploadedFile(files[0]);
      setResult(null);
      setErrorMessage(null);
    }
  };

  const handleStartCompression = async () => {
    if (!uploadedFile) return;

    setIsCompressing(true);
    setErrorMessage(null);
    setProgress({ currentPage: 1, totalPages: 1, percent: 5 });

    try {
      const res = await compressPdf(uploadedFile.file, level, (p) => {
        setProgress(p);
      });

      setResult(res);

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {
        // Confetti optional
      }
    } catch (err: any) {
      console.error('Compression error:', err);
      setErrorMessage(err?.message || 'An error occurred during compression.');
    } finally {
      setIsCompressing(false);
    }
  };

  const handleDownload = () => {
    if (!result || !uploadedFile) return;
    const originalName = uploadedFile.file.name;
    const baseName = originalName.replace(/\.pdf$/i, '');
    const finalName = `${baseName}-compressed.pdf`;
    saveAs(result.blob, finalName);
  };

  const handleReset = () => {
    setUploadedFile(null);
    setResult(null);
    setProgress(null);
    setErrorMessage(null);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* 1. Initial State: Dropzone */}
      {!uploadedFile && !result && (
        <div className="space-y-4">
          <Dropzone
            accept=".pdf"
            multiple={false}
            buttonLabel={t.selectFile}
            helperText={t.dropHelper}
            files={uploadedFile ? [uploadedFile] : []}
            onFilesChange={(files) => {
              if (files.length > 0) {
                setUploadedFile(files[0]);
                setResult(null);
                setErrorMessage(null);
              }
            }}
            showPreviewList={false}
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center pt-2">
            <div className="p-3 bg-slate-50/80 rounded-2xl border border-slate-200/80">
              <span className="text-xs font-black text-slate-800 block">⚡ Zero Uploads</span>
              <span className="text-[11px] text-slate-500 font-medium">{t.clientSideNotice}</span>
            </div>
            <div className="p-3 bg-slate-50/80 rounded-2xl border border-slate-200/80">
              <span className="text-xs font-black text-slate-800 block">🎯 Smart Presets</span>
              <span className="text-[11px] text-slate-500 font-medium">Consigliata, Estrema, Bassa</span>
            </div>
            <div className="p-3 bg-slate-50/80 rounded-2xl border border-slate-200/80">
              <span className="text-xs font-black text-slate-800 block">🔒 Privacy Garantita</span>
              <span className="text-[11px] text-slate-500 font-medium">Nessuna traccia nei server</span>
            </div>
          </div>
        </div>
      )}

      {/* 2. File Selected: Configure Compression Level */}
      {uploadedFile && !result && (
        <div className="space-y-6">
          {/* File Selected Badge */}
          <div className="bg-gradient-to-r from-emerald-50/60 to-slate-50 p-4 sm:p-5 rounded-2xl border border-emerald-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/20 flex-shrink-0">
                <Minimize2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 block">
                  {t.readyToCompress}
                </span>
                <h3 className="text-sm sm:text-base font-black text-slate-900 truncate max-w-md">
                  {uploadedFile.file.name}
                </h3>
                <span className="text-xs text-slate-500 font-bold">
                  {formatFileSize(uploadedFile.file.size)}
                </span>
              </div>
            </div>

            <button
              onClick={handleReset}
              disabled={isCompressing}
              className="px-3 py-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors cursor-pointer self-start sm:self-auto"
            >
              {t.changeFile}
            </button>
          </div>

          {/* Preset Selector Cards */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-emerald-600" />
              <span>{t.compressionLevelTitle}</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {/* Recommended Compression Card */}
              <div
                onClick={() => !isCompressing && setLevel('recommended')}
                className={`p-5 rounded-2xl border-2 cursor-pointer transition-all relative ${
                  level === 'recommended'
                    ? 'border-emerald-600 bg-emerald-50/40 shadow-md shadow-emerald-600/10'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-black">
                    <Zap className="w-4 h-4" />
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-600 text-white uppercase tracking-wider">
                    {t.recommendedBadge}
                  </span>
                </div>
                <h5 className="text-sm font-black text-slate-900 mb-1">
                  {t.recommendedTitle}
                </h5>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  {t.recommendedDesc}
                </p>
              </div>

              {/* Extreme Compression Card */}
              <div
                onClick={() => !isCompressing && setLevel('extreme')}
                className={`p-5 rounded-2xl border-2 cursor-pointer transition-all relative ${
                  level === 'extreme'
                    ? 'border-emerald-600 bg-emerald-50/40 shadow-md shadow-emerald-600/10'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-black">
                    <TrendingDown className="w-4 h-4" />
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-purple-100 text-purple-800 uppercase tracking-wider">
                    {t.extremeBadge}
                  </span>
                </div>
                <h5 className="text-sm font-black text-slate-900 mb-1">
                  {t.extremeTitle}
                </h5>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  {t.extremeDesc}
                </p>
              </div>

              {/* Low Compression Card */}
              <div
                onClick={() => !isCompressing && setLevel('low')}
                className={`p-5 rounded-2xl border-2 cursor-pointer transition-all relative ${
                  level === 'low'
                    ? 'border-emerald-600 bg-emerald-50/40 shadow-md shadow-emerald-600/10'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-black">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-100 text-amber-800 uppercase tracking-wider">
                    {t.lowBadge}
                  </span>
                </div>
                <h5 className="text-sm font-black text-slate-900 mb-1">
                  {t.lowTitle}
                </h5>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  {t.lowDesc}
                </p>
              </div>
            </div>
          </div>

          {/* Compression Progress Bar */}
          {isCompressing && progress && (
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 text-emerald-600 animate-spin" />
                  <span>
                    {t.pageOf} {progress.currentPage} {t.of} {progress.totalPages}
                  </span>
                </span>
                <span className="font-mono text-emerald-700 font-black">{progress.percent}%</span>
              </div>
              <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-200 ease-out"
                  style={{ width: `${progress.percent}%` }}
                />
              </div>
              <span className="text-[11px] text-slate-400 font-medium block text-center">
                {t.compressing}
              </span>
            </div>
          )}

          {errorMessage && (
            <div className="p-4 bg-red-50 text-red-700 rounded-xl border border-red-200 text-xs font-bold">
              {errorMessage}
            </div>
          )}

          {/* Action Trigger Button */}
          {!isCompressing && (
            <button
              onClick={handleStartCompression}
              className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-sm sm:text-base rounded-2xl shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Minimize2 className="w-5 h-5" />
              <span>{t.compressBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      )}

      {/* 3. Completed State: Results & Download */}
      {result && uploadedFile && (
        <div className="bg-gradient-to-br from-emerald-50/70 via-white to-slate-50 p-6 sm:p-8 rounded-3xl border border-emerald-200 shadow-xl space-y-6 animate-in zoom-in-95 duration-200">
          <div className="text-center space-y-1.5">
            <div className="w-16 h-16 rounded-3xl bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-600/30 mb-3">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {t.successTitle}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              {t.successSubtitle}
            </p>
          </div>

          {/* Stats Bar: Original vs Compressed */}
          <div className="grid grid-cols-3 gap-3 p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs text-center">
            <div>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                {t.originalSize}
              </span>
              <span className="text-sm sm:text-base font-bold text-slate-500 line-through">
                {formatFileSize(result.originalSize)}
              </span>
            </div>

            <div className="border-x border-slate-200/80 px-2">
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-emerald-600 block mb-0.5">
                {t.savedLabel}
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs sm:text-sm font-black">
                -{result.savedPercent}%
              </span>
            </div>

            <div>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                {t.newSize}
              </span>
              <span className="text-base sm:text-lg font-black text-emerald-700">
                {formatFileSize(result.compressedSize)}
              </span>
            </div>
          </div>

          {/* Download & Reset Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={handleDownload}
              className="flex-1 w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm rounded-2xl shadow-md shadow-emerald-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-5 h-5" />
              <span>{t.downloadBtn}</span>
            </button>

            <button
              onClick={handleReset}
              className="w-full sm:w-auto px-5 py-4 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold text-sm rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
            >
              <RefreshCw className="w-4 h-4" />
              <span>{t.compressAnother}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
