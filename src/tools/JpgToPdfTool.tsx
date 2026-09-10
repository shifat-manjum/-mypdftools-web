import React, { useState } from 'react';
import { Dropzone } from '../components/Dropzone';
import { UploadedFile } from '../types';
import { convertImagesToPdf, ImageToPdfOptions, toPdfBlob } from '../utils/pdfUtils';
import { saveAs } from 'file-saver';
import confetti from 'canvas-confetti';
import { Language } from '../i18n/translations';
import { ArrowLeft, ArrowRight, Download, Loader2, Sparkles, CheckCircle2, RefreshCw } from 'lucide-react';

interface JpgToPdfToolProps {
  currentLang?: Language;
}

const TEXTS: Record<Language, any> = {
  it: {
    selectImages: 'Seleziona immagini JPG / PNG',
    dropHelper: 'o trascina le immagini qui',
    selectedImages: 'Immagini selezionate',
    reorderHelper: 'Usa le frecce per riordinare le pagine',
    page: 'Pagina',
    optionsTitle: 'Opzioni da Immagine a PDF',
    orientation: 'Orientamento',
    orientAuto: 'Auto (adatta all\'immagine)',
    orientPortrait: 'Verticale (Portrait)',
    orientLandscape: 'Orizzontale (Landscape)',
    pageSize: 'Dimensione Pagina',
    sizeA4: 'A4 (Adatta a pagina standard)',
    sizeFit: 'Adatta all\'immagine (Stesse dimensioni)',
    margins: 'Margini',
    marginNone: 'Nessun margine',
    marginSmall: 'Margine piccolo',
    marginBig: 'Margine grande',
    convertBtn: 'Converti in PDF',
    converting: 'Creazione del PDF in corso...',
    successTitle: 'PDF creato con successo!',
    downloadBtn: 'SCARICA IL PDF CONVERTITO',
    startOver: 'Converti altre immagini',
  },
  en: {
    selectImages: 'Select JPG / PNG images',
    dropHelper: 'or drop images here',
    selectedImages: 'Selected Images',
    reorderHelper: 'Use arrows to reorder pages',
    page: 'Page',
    optionsTitle: 'Image to PDF Options',
    orientation: 'Orientation',
    orientAuto: 'Auto (match image)',
    orientPortrait: 'Portrait',
    orientLandscape: 'Landscape',
    pageSize: 'Page Size',
    sizeA4: 'A4 (Fit to standard page)',
    sizeFit: 'Fit image (Same dimensions)',
    margins: 'Margins',
    marginNone: 'No margin',
    marginSmall: 'Small margin',
    marginBig: 'Big margin',
    convertBtn: 'Convert to PDF',
    converting: 'Creating PDF document...',
    successTitle: 'PDF created successfully!',
    downloadBtn: 'DOWNLOAD CONVERTED PDF',
    startOver: 'Convert more images',
  },
  de: {
    selectImages: 'JPG / PNG Bilder auswählen',
    dropHelper: 'oder Bilder hierher ziehen',
    selectedImages: 'Ausgewählte Bilder',
    reorderHelper: 'Pfeile zum Umsortieren nutzen',
    page: 'Seite',
    optionsTitle: 'Bild-zu-PDF Optionen',
    orientation: 'Ausrichtung',
    orientAuto: 'Automatisch (an Bild anpassen)',
    orientPortrait: 'Hochformat',
    orientLandscape: 'Querformat',
    pageSize: 'Seitengröße',
    sizeA4: 'A4 (Standardseite)',
    sizeFit: 'An Bild anpassen',
    margins: 'Ränder',
    marginNone: 'Kein Rand',
    marginSmall: 'Kleiner Rand',
    marginBig: 'Großer Rand',
    convertBtn: 'In PDF umwandeln',
    converting: 'PDF wird erstellt...',
    successTitle: 'PDF erfolgreich erstellt!',
    downloadBtn: 'KONVERTIERTES PDF HERUNTERLADEN',
    startOver: 'Weitere Bilder umwandeln',
  },
};

export const JpgToPdfTool: React.FC<JpgToPdfToolProps> = ({ currentLang = 'it' }) => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [options, setOptions] = useState<ImageToPdfOptions>({
    orientation: 'auto',
    pageSize: 'a4',
    margin: 'none',
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [downloadReady, setDownloadReady] = useState(false);
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);

  const t = TEXTS[currentLang] || TEXTS.it;

  const handleConvert = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);
    setDownloadReady(false);

    try {
      const rawFiles = files.map((f) => f.file);
      const pdfBytes = await convertImagesToPdf(rawFiles, options);
      const blob = toPdfBlob(pdfBytes);
      setPdfBlob(blob);
      setDownloadReady(true);

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {}
    } catch (err: any) {
      console.error(err);
      alert('Error converting images to PDF: ' + (err.message || 'Unknown error'));
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (pdfBlob) {
      saveAs(pdfBlob, 'mypdftools_converted.pdf');
    }
  };

  const moveFile = (index: number, direction: 'left' | 'right') => {
    const newFiles = [...files];
    const targetIndex = direction === 'left' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= files.length) return;
    const temp = newFiles[index];
    newFiles[index] = newFiles[targetIndex];
    newFiles[targetIndex] = temp;
    setFiles(newFiles);
  };

  return (
    <div className="space-y-6">
      {/* Upload Zone */}
      {files.length === 0 && (
        <Dropzone
          accept="image/jpeg,image/png,image/webp"
          multiple={true}
          buttonLabel={t.selectImages}
          helperText={t.dropHelper}
          files={files}
          onFilesChange={(newFiles) => {
            setFiles(newFiles);
            setDownloadReady(false);
          }}
          showPreviewList={false}
        />
      )}

      {files.length > 0 && (
        <div className="space-y-6">
          {/* Images Grid with Reorder Controls */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-black text-slate-800">
                {t.selectedImages} ({files.length})
              </h4>
              <span className="text-xs font-semibold text-slate-400">
                {t.reorderHelper}
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
              {files.map((item, idx) => (
                <div
                  key={item.id}
                  className="bg-white border border-slate-200/90 rounded-2xl p-2.5 shadow-xs flex flex-col items-center group hover:shadow-md transition-all"
                >
                  <div className="w-full aspect-[3/4] bg-slate-50 rounded-xl overflow-hidden flex items-center justify-center mb-2 border border-slate-100">
                    {item.previewUrl && (
                      <img
                        src={item.previewUrl}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <span className="text-[10px] font-black text-slate-400">
                    {t.page} {idx + 1}
                  </span>
                  <p className="text-xs font-bold text-slate-700 truncate w-full text-center mt-0.5">
                    {item.name}
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    <button
                      disabled={idx === 0}
                      onClick={() => moveFile(idx, 'left')}
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-30 cursor-pointer"
                      title="Sposta prima"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </button>
                    <button
                      disabled={idx === files.length - 1}
                      onClick={() => moveFile(idx, 'right')}
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-30 cursor-pointer"
                      title="Sposta dopo"
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Settings Bar */}
          <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-5 shadow-xs">
            <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider mb-3">
              {t.optionsTitle}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {t.orientation}
                </label>
                <select
                  value={options.orientation}
                  onChange={(e) =>
                    setOptions({ ...options, orientation: e.target.value as any })
                  }
                  className="w-full text-xs font-semibold bg-white border border-slate-200 rounded-xl p-3 text-slate-800 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
                >
                  <option value="auto">{t.orientAuto}</option>
                  <option value="portrait">{t.orientPortrait}</option>
                  <option value="landscape">{t.orientLandscape}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {t.pageSize}
                </label>
                <select
                  value={options.pageSize}
                  onChange={(e) =>
                    setOptions({ ...options, pageSize: e.target.value as any })
                  }
                  className="w-full text-xs font-semibold bg-white border border-slate-200 rounded-xl p-3 text-slate-800 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
                >
                  <option value="a4">{t.sizeA4}</option>
                  <option value="fit">{t.sizeFit}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {t.margins}
                </label>
                <select
                  value={options.margin}
                  onChange={(e) =>
                    setOptions({ ...options, margin: e.target.value as any })
                  }
                  className="w-full text-xs font-semibold bg-white border border-slate-200 rounded-xl p-3 text-slate-800 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
                >
                  <option value="none">{t.marginNone}</option>
                  <option value="small">{t.marginSmall}</option>
                  <option value="big">{t.marginBig}</option>
                </select>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-2">
            {!downloadReady ? (
              <div className="flex justify-end">
                <button
                  disabled={isProcessing}
                  onClick={handleConvert}
                  className="w-full sm:w-auto px-9 py-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-black text-sm rounded-2xl shadow-lg shadow-red-500/25 flex items-center justify-center gap-2.5 transition-all transform active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>{t.converting}</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 text-amber-300" />
                      <span>{t.convertBtn}</span>
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-emerald-500 via-teal-600 to-emerald-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-emerald-600/20 flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-8 h-8 text-emerald-200 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black">{t.successTitle}</h3>
                    <p className="text-xs text-emerald-100 mt-0.5">{files.length} {t.selectedImages} unite in un unico PDF</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={handleDownload}
                    className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-emerald-50 text-emerald-900 font-black text-sm rounded-2xl shadow-xl flex items-center justify-center gap-2.5 transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <Download className="w-5 h-5 text-emerald-600" />
                    <span>{t.downloadBtn}</span>
                  </button>
                  <button
                    onClick={() => {
                      setFiles([]);
                      setDownloadReady(false);
                    }}
                    className="w-full sm:w-auto px-4 py-4 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-2xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>{t.startOver}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
