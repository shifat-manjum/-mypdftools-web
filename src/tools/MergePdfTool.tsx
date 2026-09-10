import React, { useState } from 'react';
import { Dropzone } from '../components/Dropzone';
import { UploadedFile } from '../types';
import { mergePdfFiles, toPdfBlob } from '../utils/pdfUtils';
import { saveAs } from 'file-saver';
import confetti from 'canvas-confetti';
import { Language } from '../i18n/translations';
import { ArrowUp, ArrowDown, Download, Loader2, Layers, CheckCircle2, RefreshCw } from 'lucide-react';

interface MergePdfToolProps {
  currentLang?: Language;
}

const TEXTS: Record<Language, any> = {
  it: {
    selectFiles: 'Seleziona file PDF',
    dropHelper: 'o trascina più file PDF qui',
    filesToMerge: 'File da unire',
    orderNotice: 'I file verranno uniti in questo ordine:',
    minFilesAlert: 'Aggiungi almeno 2 file PDF da unire.',
    mergeBtn: 'Unisci PDF',
    merging: 'Unione dei file in corso...',
    successTitle: 'PDF uniti con successo!',
    downloadBtn: 'SCARICA PDF UNITO',
    startOver: 'Unisci altri file',
    remove: 'Rimuovi',
  },
  en: {
    selectFiles: 'Select PDF files',
    dropHelper: 'or drop multiple PDF files here',
    filesToMerge: 'Files to Merge',
    orderNotice: 'Files will be combined in this order:',
    minFilesAlert: 'Please add at least 2 PDF files to merge.',
    mergeBtn: 'Merge PDF',
    merging: 'Merging files...',
    successTitle: 'PDFs merged successfully!',
    downloadBtn: 'DOWNLOAD MERGED PDF',
    startOver: 'Merge more files',
    remove: 'Remove',
  },
  de: {
    selectFiles: 'PDF-Dateien auswählen',
    dropHelper: 'oder mehrere PDF-Dateien hierher ziehen',
    filesToMerge: 'Dateien zusammenfügen',
    orderNotice: 'Dateien werden in dieser Reihenfolge zusammengefügt:',
    minFilesAlert: 'Bitte fügen Sie mindestens 2 PDF-Dateien hinzu.',
    mergeBtn: 'PDF zusammenfügen',
    merging: 'Dateien werden zusammengefügt...',
    successTitle: 'PDFs erfolgreich zusammengefügt!',
    downloadBtn: 'ZUSAMMENGEFÜGTES PDF HERUNTERLADEN',
    startOver: 'Weitere zusammenfügen',
    remove: 'Entfernen',
  },
};

export const MergePdfTool: React.FC<MergePdfToolProps> = ({ currentLang = 'it' }) => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [mergedBlob, setMergedBlob] = useState<Blob | null>(null);

  const t = TEXTS[currentLang] || TEXTS.it;

  const handleMerge = async () => {
    if (files.length < 2) {
      alert(t.minFilesAlert);
      return;
    }
    setIsProcessing(true);
    setMergedBlob(null);

    try {
      const rawFiles = files.map((f) => f.file);
      const pdfBytes = await mergePdfFiles(rawFiles);
      const blob = toPdfBlob(pdfBytes);
      setMergedBlob(blob);

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {}
    } catch (err: any) {
      console.error(err);
      alert('Error merging PDFs: ' + (err.message || 'Unknown error'));
    } finally {
      setIsProcessing(false);
    }
  };

  const moveFile = (index: number, direction: 'up' | 'down') => {
    const newFiles = [...files];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= files.length) return;
    const temp = newFiles[index];
    newFiles[index] = newFiles[targetIndex];
    newFiles[targetIndex] = temp;
    setFiles(newFiles);
  };

  return (
    <div className="space-y-6">
      <Dropzone
        accept="application/pdf"
        multiple={true}
        buttonLabel={t.selectFiles}
        helperText={t.dropHelper}
        files={files}
        onFilesChange={(newFiles) => {
          setFiles(newFiles);
          setMergedBlob(null);
        }}
        showPreviewList={false}
      />

      {files.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-black text-slate-800">
              {t.filesToMerge} ({files.length})
            </h4>
            <span className="text-xs font-semibold text-slate-400">
              {t.orderNotice}
            </span>
          </div>

          <div className="space-y-2">
            {files.map((item, idx) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs"
              >
                <div className="flex items-center gap-3.5 truncate">
                  <div className="w-9 h-9 rounded-xl bg-red-100 flex items-center justify-center text-red-600 font-black text-xs flex-shrink-0">
                    {idx + 1}
                  </div>
                  <div className="truncate">
                    <p className="text-xs font-bold text-slate-800 truncate">
                      {item.name}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      {(item.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <button
                    disabled={idx === 0}
                    onClick={() => moveFile(idx, 'up')}
                    className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-30 transition-colors cursor-pointer"
                    title="Sposta su"
                  >
                    <ArrowUp className="w-4 h-4 text-slate-700" />
                  </button>
                  <button
                    disabled={idx === files.length - 1}
                    onClick={() => moveFile(idx, 'down')}
                    className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-30 transition-colors cursor-pointer"
                    title="Sposta giù"
                  >
                    <ArrowDown className="w-4 h-4 text-slate-700" />
                  </button>
                  <button
                    onClick={() => setFiles(files.filter((f) => f.id !== item.id))}
                    className="ml-2 text-xs text-slate-400 hover:text-red-600 font-bold px-2 py-1 cursor-pointer"
                  >
                    {t.remove}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4">
            {!mergedBlob ? (
              <div className="flex justify-end">
                <button
                  disabled={isProcessing || files.length < 2}
                  onClick={handleMerge}
                  className="w-full sm:w-auto px-9 py-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-black text-sm rounded-2xl shadow-lg shadow-red-500/25 flex items-center justify-center gap-2.5 transition-all transform active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>{t.merging}</span>
                    </>
                  ) : (
                    <>
                      <Layers className="w-5 h-5" />
                      <span>{t.mergeBtn}</span>
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
                    <p className="text-xs text-emerald-100 mt-0.5">{files.length} PDF uniti con successo</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => saveAs(mergedBlob, 'mypdftools_merged.pdf')}
                    className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-emerald-50 text-emerald-900 font-black text-sm rounded-2xl shadow-xl flex items-center justify-center gap-2.5 transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <Download className="w-5 h-5 text-emerald-600" />
                    <span>{t.downloadBtn}</span>
                  </button>
                  <button
                    onClick={() => {
                      setFiles([]);
                      setMergedBlob(null);
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
