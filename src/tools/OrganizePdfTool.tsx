import React, { useState, useEffect } from 'react';
import { Dropzone } from '../components/Dropzone';
import { UploadedFile } from '../types';
import { organizePdfPages, toPdfBlob } from '../utils/pdfUtils';
import { convertPdfToImages } from '../utils/pdfRenderUtils';
import { saveAs } from 'file-saver';
import confetti from 'canvas-confetti';
import { Language } from '../i18n/translations';
import {
  ArrowLeft,
  ArrowRight,
  Trash2,
  Copy,
  RotateCw,
  Download,
  Loader2,
  Sparkles,
  GripVertical,
  RotateCcw,
  CheckCircle2,
  ShieldCheck,
  RefreshCw,
  ArrowDownUp
} from 'lucide-react';

interface PageItem {
  id: string;
  originalIndex: number;
  dataUrl: string;
  rotation: number;
}

interface OrganizePdfToolProps {
  currentLang?: Language;
}

const TEXTS: Record<Language, any> = {
  it: {
    selectFile: 'Seleziona file PDF',
    dropHelper: 'o trascina il tuo PDF qui per riordinare, ruotare o eliminare pagine',
    pagesFound: 'pagine caricate • Trascina con il mouse per riordinare o usa i pulsanti',
    changeFile: 'Cambia file',
    generatingThumbnails: 'Generazione delle miniature delle pagine in corso...',
    page: 'Pagina',
    orig: 'orig #',
    rotate: 'Ruota 90°',
    duplicate: 'Duplica',
    delete: 'Elimina',
    moveLeft: 'Sposta a sinistra',
    moveRight: 'Sposta a destra',
    saveBtn: 'SALVA PDF RIORDINATO',
    saving: 'Ricostruzione del PDF in corso...',
    downloadBtn: 'SCARICA PDF RIORDINATO',
    organizeFurther: 'Modifica ancora',
    rotateAll: 'Ruota Tutte a Destra',
    resetOrder: 'Ripristina Ordine',
    privacyNotice: 'Nessun file viene inviato a server esterni. L\'elaborazione è al 100% locale nella RAM del tuo browser.',
    minPagesError: 'Un documento PDF deve contenere almeno una pagina.',
    successTitle: 'PDF riorganizzato con successo!',
    successSubtitle: 'Le pagine sono state riordinate e orientate al 100% sul tuo dispositivo.',
  },
  de: {
    selectFile: 'PDF-Datei auswählen',
    dropHelper: 'oder PDF hierher ziehen, um Seiten zu sortieren, drehen oder löschen',
    pagesFound: 'Seiten geladen • Mit der Maus verschieben oder Schaltflächen nutzen',
    changeFile: 'Datei wechseln',
    generatingThumbnails: 'Seitenvorschauen werden generiert...',
    page: 'Seite',
    orig: 'orig #',
    rotate: 'Um 90° drehen',
    duplicate: 'Duplizieren',
    delete: 'Löschen',
    moveLeft: 'Nach links',
    moveRight: 'Nach rechts',
    saveBtn: 'SORTIERTES PDF SPEICHERN',
    saving: 'PDF wird neu aufgebaut...',
    downloadBtn: 'SORTIERTES PDF HERUNTERLADEN',
    organizeFurther: 'Weiter anpassen',
    rotateAll: 'Alle Seiten drehen',
    resetOrder: 'Zurücksetzen',
    privacyNotice: 'Ihre Daten verlassen Ihr Gerät nicht. Alle Rechenoperationen laufen 100% lokal im Browser.',
    minPagesError: 'Ein PDF-Dokument muss mindestens eine Seite enthalten.',
    successTitle: 'PDF erfolgreich neu geordnet!',
    successSubtitle: 'Die Seiten wurden zu 100% lokal in Ihrem Browser sortiert und ausgerichtet.',
  },
  en: {
    selectFile: 'Select PDF file',
    dropHelper: 'or drop a PDF to organize, reorder, rotate, or delete pages',
    pagesFound: 'pages loaded • Drag & drop with mouse or use controls to reorder',
    changeFile: 'Change file',
    generatingThumbnails: 'Generating page thumbnails...',
    page: 'Page',
    orig: 'orig #',
    rotate: 'Rotate 90°',
    duplicate: 'Duplicate',
    delete: 'Delete',
    moveLeft: 'Move left',
    moveRight: 'Move right',
    saveBtn: 'SAVE ORGANIZED PDF',
    saving: 'Rebuilding PDF document...',
    downloadBtn: 'DOWNLOAD ORGANIZED PDF',
    organizeFurther: 'Organize further',
    rotateAll: 'Rotate All Right',
    resetOrder: 'Reset Order',
    privacyNotice: 'Zero files sent to external servers. All processing happens 100% locally in your browser RAM.',
    minPagesError: 'A PDF document must have at least one page.',
    successTitle: 'PDF successfully organized!',
    successSubtitle: 'Pages were reordered and oriented 100% client-side in your browser memory.',
  },
};

export const OrganizePdfTool: React.FC<OrganizePdfToolProps> = ({ currentLang = 'it' }) => {
  const t = TEXTS[currentLang] || TEXTS.it;

  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [pageItems, setPageItems] = useState<PageItem[]>([]);
  const [initialPages, setInitialPages] = useState<PageItem[]>([]);
  const [isRendering, setIsRendering] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [savedBlob, setSavedBlob] = useState<Blob | null>(null);

  // Drag & drop state
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  useEffect(() => {
    if (files.length > 0) {
      setIsRendering(true);
      setPageItems([]);
      setInitialPages([]);
      setSavedBlob(null);

      convertPdfToImages(files[0].file, 0.7, 'image/jpeg')
        .then((imgs) => {
          const items: PageItem[] = imgs.map((img, idx) => ({
            id: `page-${idx}-${Math.random().toString(36).substring(2, 7)}`,
            originalIndex: idx,
            dataUrl: img.dataUrl,
            rotation: 0,
          }));
          setPageItems(items);
          setInitialPages(items);
        })
        .catch(console.error)
        .finally(() => setIsRendering(false));
    }
  }, [files]);

  // Drag and drop reordering
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverIndex !== index) {
      setDragOverIndex(index);
    }
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === targetIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    const updated = [...pageItems];
    const [movedItem] = updated.splice(draggedIndex, 1);
    updated.splice(targetIndex, 0, movedItem);

    setPageItems(updated);
    setSavedBlob(null);
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  // Button move controls
  const movePage = (index: number, direction: 'left' | 'right') => {
    const newItems = [...pageItems];
    const targetIndex = direction === 'left' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= pageItems.length) return;
    const temp = newItems[index];
    newItems[index] = newItems[targetIndex];
    newItems[targetIndex] = temp;
    setPageItems(newItems);
    setSavedBlob(null);
  };

  // Rotate single page 90 degrees clockwise
  const rotatePage = (index: number) => {
    const newItems = [...pageItems];
    newItems[index] = {
      ...newItems[index],
      rotation: (newItems[index].rotation + 90) % 360,
    };
    setPageItems(newItems);
    setSavedBlob(null);
  };

  // Rotate all pages 90 degrees clockwise
  const rotateAllPages = () => {
    setPageItems((prev) =>
      prev.map((item) => ({
        ...item,
        rotation: (item.rotation + 90) % 360,
      }))
    );
    setSavedBlob(null);
  };

  // Reset order to original
  const resetToOriginal = () => {
    setPageItems(initialPages.map((p) => ({ ...p, rotation: 0 })));
    setSavedBlob(null);
  };

  const deletePage = (index: number) => {
    if (pageItems.length <= 1) {
      alert(t.minPagesError);
      return;
    }
    setPageItems(pageItems.filter((_, idx) => idx !== index));
    setSavedBlob(null);
  };

  const duplicatePage = (index: number) => {
    const newItems = [...pageItems];
    const itemToDuplicate = newItems[index];
    newItems.splice(index + 1, 0, {
      ...itemToDuplicate,
      id: `page-${itemToDuplicate.originalIndex}-${Math.random().toString(36).substring(2, 7)}`,
    });
    setPageItems(newItems);
    setSavedBlob(null);
  };

  const handleSave = async () => {
    if (files.length === 0 || pageItems.length === 0) return;
    setIsSaving(true);

    try {
      const indices = pageItems.map((p) => p.originalIndex);
      const rotations = pageItems.map((p) => p.rotation);
      const bytes = await organizePdfPages(files[0].file, indices, rotations);
      const blob = toPdfBlob(bytes);
      setSavedBlob(blob);

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (err: any) {
      console.error(err);
      alert('Failed to organize PDF: ' + (err.message || 'Unknown error'));
    } finally {
      setIsSaving(false);
    }
  };

  const resetAll = () => {
    setFiles([]);
    setPageItems([]);
    setInitialPages([]);
    setSavedBlob(null);
  };

  return (
    <div className="space-y-6">
      {files.length === 0 && (
        <div className="space-y-4">
          <Dropzone
            accept="application/pdf"
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

      {/* Success State */}
      {savedBlob && (
        <div className="bg-white border border-emerald-200/90 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6 animate-in fade-in duration-300">
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

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            <button
              onClick={() => saveAs(savedBlob, `mypdftools_organized_${files[0]?.name || 'document.pdf'}`)}
              className="w-full sm:flex-1 py-4 px-8 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-2xl font-black text-base shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-3 transition-all transform active:scale-[0.99] cursor-pointer"
            >
              <Download className="w-5 h-5" />
              <span>{t.downloadBtn}</span>
            </button>
            <button
              onClick={() => setSavedBlob(null)}
              className="w-full sm:w-auto py-4 px-6 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <ArrowDownUp className="w-4 h-4 text-slate-500" />
              <span>{t.organizeFurther}</span>
            </button>
            <button
              onClick={resetAll}
              className="w-full sm:w-auto py-4 px-6 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <RefreshCw className="w-4 h-4 text-slate-500" />
              <span>{t.changeFile}</span>
            </button>
          </div>
        </div>
      )}

      {/* Editor & Thumbnail Grid */}
      {files.length > 0 && !savedBlob && (
        <div className="space-y-6">
          {/* Top Control Bar */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
            <div>
              <h4 className="text-sm sm:text-base font-black text-slate-900 truncate max-w-[280px] sm:max-w-md">
                {files[0].name}
              </h4>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">
                {pageItems.length} {t.pagesFound}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={rotateAllPages}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                title={t.rotateAll}
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>{t.rotateAll}</span>
              </button>
              <button
                onClick={resetToOriginal}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                title={t.resetOrder}
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{t.resetOrder}</span>
              </button>
              <button
                onClick={resetAll}
                className="text-xs font-bold text-slate-400 hover:text-red-600 px-3 py-1.5 rounded-xl hover:bg-red-50 transition-colors cursor-pointer"
              >
                {t.changeFile}
              </button>
            </div>
          </div>

          {/* Loading Indicator */}
          {isRendering ? (
            <div className="bg-white border border-slate-200 rounded-3xl p-16 text-center text-slate-500 flex flex-col items-center justify-center gap-3">
              <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center border border-red-100">
                <Loader2 className="w-6 h-6 animate-spin text-[#e5322d]" />
              </div>
              <span className="text-sm font-bold text-slate-700">{t.generatingThumbnails}</span>
            </div>
          ) : (
            /* Visual Grid with Drag & Drop */
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5">
              {pageItems.map((item, idx) => {
                const isDraggingThis = draggedIndex === idx;
                const isOverThis = dragOverIndex === idx && draggedIndex !== idx;

                return (
                  <div
                    key={item.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, idx)}
                    onDragOver={(e) => handleDragOver(e, idx)}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, idx)}
                    onDragEnd={handleDragEnd}
                    className={`bg-white border rounded-2xl p-3 shadow-sm flex flex-col items-center relative group select-none transition-all duration-150 cursor-grab active:cursor-grabbing ${
                      isDraggingThis
                        ? 'opacity-40 scale-95 border-dashed border-red-400'
                        : isOverThis
                        ? 'border-2 border-red-500 scale-[1.02] shadow-md ring-2 ring-red-500/20'
                        : 'border-slate-200/90 hover:border-slate-300 hover:shadow-md'
                    }`}
                  >
                    {/* Drag Handle Indicator */}
                    <div className="absolute top-2 left-2 p-1 rounded-md text-slate-300 group-hover:text-slate-500 transition-colors">
                      <GripVertical className="w-3.5 h-3.5" />
                    </div>

                    {/* Quick Rotate Button Top Right */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        rotatePage(idx);
                      }}
                      className="absolute top-2 right-2 p-1.5 rounded-lg bg-white/90 hover:bg-red-50 text-slate-400 hover:text-[#e5322d] border border-slate-200/80 shadow-xs transition-all z-10 cursor-pointer"
                      title={t.rotate}
                    >
                      <RotateCw className="w-3.5 h-3.5" />
                    </button>

                    {/* Thumbnail Image Container */}
                    <div className="w-full aspect-[3/4] bg-slate-50 rounded-xl overflow-hidden flex items-center justify-center p-2 mb-2.5 mt-5 relative border border-slate-100">
                      <img
                        src={item.dataUrl}
                        alt={`Page ${idx + 1}`}
                        style={{
                          transform: `rotate(${item.rotation}deg)`,
                          transition: 'transform 0.2s ease-in-out',
                        }}
                        className="max-w-full max-h-full object-contain pointer-events-none drop-shadow-xs"
                      />
                      {item.rotation !== 0 && (
                        <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-slate-900/75 text-white text-[9px] font-black">
                          {item.rotation}°
                        </span>
                      )}
                    </div>

                    {/* Page Numbers */}
                    <div className="flex items-center justify-between w-full mb-2 px-0.5">
                      <span className="text-xs font-black text-slate-800">
                        {t.page} {idx + 1}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400">
                        ({t.orig}{item.originalIndex + 1})
                      </span>
                    </div>

                    {/* Action Bar */}
                    <div className="flex items-center justify-between w-full pt-2 border-t border-slate-100">
                      {/* Left / Right fallback buttons */}
                      <div className="flex items-center gap-1">
                        <button
                          disabled={idx === 0}
                          onClick={(e) => {
                            e.stopPropagation();
                            movePage(idx, 'left');
                          }}
                          className="p-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed"
                          title={t.moveLeft}
                        >
                          <ArrowLeft className="w-3 h-3" />
                        </button>
                        <button
                          disabled={idx === pageItems.length - 1}
                          onClick={(e) => {
                            e.stopPropagation();
                            movePage(idx, 'right');
                          }}
                          className="p-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed"
                          title={t.moveRight}
                        >
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Duplicate / Delete buttons */}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            duplicatePage(idx);
                          }}
                          className="p-1 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-600 transition-colors cursor-pointer"
                          title={t.duplicate}
                        >
                          <Copy className="w-3 h-3" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deletePage(idx);
                          }}
                          className="p-1 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                          title={t.delete}
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Primary Save Action */}
          <div className="pt-4 flex justify-end">
            <button
              disabled={isSaving || isRendering}
              onClick={handleSave}
              className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-[#e5322d] to-red-600 hover:from-[#c92520] hover:to-red-500 text-white font-black text-base rounded-2xl shadow-lg shadow-red-500/25 flex items-center justify-center gap-3 transition-all transform active:scale-[0.99] disabled:opacity-50 cursor-pointer"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>{t.saving}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>{t.saveBtn}</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
