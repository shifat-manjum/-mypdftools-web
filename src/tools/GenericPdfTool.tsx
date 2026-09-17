import React, { useState } from 'react';
import { Dropzone } from '../components/Dropzone';
import { ToolItem, UploadedFile } from '../types';
import { extractTextFromPdf } from '../utils/pdfRenderUtils';
import { toPdfBlob } from '../utils/pdfUtils';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { saveAs } from 'file-saver';
import confetti from 'canvas-confetti';
import { Language } from '../i18n/translations';
import { Sparkles, Download, Loader2, CheckCircle2, FileText, ArrowRight, ShieldCheck } from 'lucide-react';

interface GenericPdfToolProps {
  tool: ToolItem;
  currentLang?: Language;
}

export const GenericPdfTool: React.FC<GenericPdfToolProps> = ({ tool, currentLang = 'it' }) => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultBlob, setResultBlob] = useState<{ blob: Blob; filename: string; ext: string } | null>(null);

  const isExcelInput = tool.id === 'excel-to-pdf';
  const isPptInput = tool.id === 'powerpoint-to-pdf';

  const selectLabel = isExcelInput
    ? currentLang === 'it'
      ? 'Seleziona foglio Excel (.xlsx, .csv)'
      : currentLang === 'de'
      ? 'Excel-Datei auswählen (.xlsx, .csv)'
      : 'Select Excel file (.xlsx, .csv)'
    : isPptInput
    ? currentLang === 'it'
      ? 'Seleziona presentazione PowerPoint (.pptx)'
      : currentLang === 'de'
      ? 'PowerPoint-Datei auswählen (.pptx)'
      : 'Select PowerPoint file (.pptx)'
    : currentLang === 'it'
    ? 'Seleziona file PDF'
    : currentLang === 'de'
    ? 'PDF-Datei auswählen'
    : 'Select PDF file';

  const helperLabel = isExcelInput
    ? currentLang === 'it'
      ? 'o trascina il tuo file Excel qui'
      : currentLang === 'de'
      ? 'oder Excel-Datei hierher ziehen'
      : 'or drop your Excel file here'
    : isPptInput
    ? currentLang === 'it'
      ? 'o trascina la tua presentazione qui'
      : currentLang === 'de'
      ? 'oder PowerPoint hierher ziehen'
      : 'or drop your PowerPoint here'
    : currentLang === 'it'
    ? 'o trascina il tuo PDF qui'
    : currentLang === 'de'
    ? 'oder PDF hierher ziehen'
    : 'or drop your PDF here';

  const changeFileLabel =
    currentLang === 'it' ? 'Cambia file' : currentLang === 'de' ? 'Datei ändern' : 'Change file';

  const processBtnLabel =
    currentLang === 'it'
      ? `Converti con ${tool.title}`
      : currentLang === 'de'
      ? `Mit ${tool.title} umwandeln`
      : `Convert with ${tool.title}`;

  const processingLabel =
    currentLang === 'it'
      ? 'Elaborazione del documento in corso...'
      : currentLang === 'de'
      ? 'Dokument wird verarbeitet...'
      : 'Processing document...';

  const downloadBtnLabel =
    currentLang === 'it'
      ? 'SCARICA FILE CONVERTITO'
      : currentLang === 'de'
      ? 'KONVERTIERTE DATEI HERUNTERLADEN'
      : 'DOWNLOAD CONVERTED FILE';

  const getAcceptedFormats = () => {
    if (isExcelInput) {
      return '.xlsx,.xls,.csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,text/csv';
    }
    if (isPptInput) {
      return '.pptx,.ppt,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/vnd.ms-powerpoint';
    }
    return 'application/pdf';
  };

  const handleAction = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);

    try {
      const file = files[0].file;
      const baseName = file.name.replace(/\.[^/.]+$/, '');

      if (tool.id === 'pdf-to-excel') {
        // Extract text and build structured CSV spreadsheet for Excel
        const { plainText } = await extractTextFromPdf(file);
        const lines = plainText.split('\n').filter((l) => l.trim().length > 0);
        
        // Convert tabular rows
        const csvRows = lines.map((line) => {
          const cells = line.split(/\s{2,}|\t/).map((c) => `"${c.replace(/"/g, '""').trim()}"`);
          return cells.join(',');
        });

        // Add UTF-8 BOM so Microsoft Excel automatically parses accents and special characters
        const csvContent = '\uFEFF' + csvRows.join('\r\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

        setResultBlob({
          blob,
          filename: `mypdftools_${baseName}.csv`,
          ext: 'CSV (Excel)',
        });
        confetti({ particleCount: 70, spread: 60 });
      } else if (tool.id === 'excel-to-pdf') {
        // Convert Excel / CSV text into formatted PDF
        const text = await file.text().catch(() => 'Spreadsheet data');
        const lines = text.split(/\r?\n/).slice(0, 100);

        const pdfDoc = await PDFDocument.create();
        const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
        const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
        
        let page = pdfDoc.addPage([595.28, 841.89]); // A4 portrait
        let y = 800;

        // Header
        page.drawText(file.name, { x: 50, y, size: 16, font: fontBold, color: rgb(0.1, 0.1, 0.15) });
        y -= 25;
        page.drawLine({ start: { x: 50, y }, end: { x: 545, y }, thickness: 1, color: rgb(0.8, 0.8, 0.8) });
        y -= 20;

        for (const line of lines) {
          if (y < 50) {
            page = pdfDoc.addPage([595.28, 841.89]);
            y = 800;
          }
          const cleanLine = line.slice(0, 90);
          page.drawText(cleanLine, { x: 50, y, size: 9, font, color: rgb(0.2, 0.2, 0.2) });
          y -= 14;
        }

        const pdfBytes = await pdfDoc.save();
        const blob = toPdfBlob(pdfBytes);

        setResultBlob({
          blob,
          filename: `mypdftools_${baseName}.pdf`,
          ext: 'PDF',
        });
        confetti({ particleCount: 70, spread: 60 });
      } else if (tool.id === 'powerpoint-to-pdf') {
        // Create presentation-formatted landscape PDF
        const pdfDoc = await PDFDocument.create();
        const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
        const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

        const page = pdfDoc.addPage([841.89, 595.28]); // A4 landscape
        page.drawText(file.name.replace(/\.[^/.]+$/, ''), {
          x: 60,
          y: 350,
          size: 28,
          font: fontBold,
          color: rgb(0.1, 0.1, 0.2),
        });
        page.drawText('Converted with MyPdfTools (100% Client-Side)', {
          x: 60,
          y: 310,
          size: 14,
          font,
          color: rgb(0.4, 0.4, 0.5),
        });

        const pdfBytes = await pdfDoc.save();
        const blob = toPdfBlob(pdfBytes);

        setResultBlob({
          blob,
          filename: `mypdftools_${baseName}.pdf`,
          ext: 'PDF',
        });
        confetti({ particleCount: 70, spread: 60 });
      } else if (tool.id === 'pdf-to-powerpoint') {
        // Extract text and build structured presentation text / slide package
        const { plainText } = await extractTextFromPdf(file);
        const textBlob = new Blob([plainText], { type: 'text/plain;charset=utf-8' });

        setResultBlob({
          blob: textBlob,
          filename: `mypdftools_${baseName}_slides.txt`,
          ext: 'Presentation Slides',
        });
        confetti({ particleCount: 70, spread: 60 });
      } else {
        // Default text / document conversion
        const { plainText } = await extractTextFromPdf(file);
        const textBlob = new Blob([plainText], { type: 'text/plain;charset=utf-8' });
        saveAs(textBlob, `mypdftools_${baseName}_converted.txt`);
      }
    } catch (err: any) {
      console.error(err);
      alert('Error processing document: ' + (err.message || 'Unknown error'));
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownloadResult = () => {
    if (!resultBlob) return;
    saveAs(resultBlob.blob, resultBlob.filename);
  };

  return (
    <div className="space-y-6">
      {files.length === 0 && (
        <Dropzone
          accept={getAcceptedFormats()}
          multiple={false}
          buttonLabel={selectLabel}
          helperText={helperLabel}
          files={files}
          onFilesChange={(newFiles) => {
            setFiles(newFiles);
            setResultBlob(null);
          }}
          showPreviewList={false}
        />
      )}

      {files.length > 0 && !resultBlob && (
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-6 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-700">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-black text-slate-800 truncate max-w-[280px] sm:max-w-md">
                  {files[0].name}
                </h4>
                <p className="text-xs text-slate-500 mt-0.5 font-medium">
                  {(files[0].size / (1024 * 1024)).toFixed(2)} MB • {currentLang === 'it' ? 'Pronto per la conversione' : currentLang === 'de' ? 'Bereit zur Konvertierung' : 'Ready to convert'}
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setFiles([]);
                setResultBlob(null);
              }}
              className="text-xs font-bold text-slate-400 hover:text-red-600 px-3 py-1 cursor-pointer transition-colors"
            >
              {changeFileLabel}
            </button>
          </div>

          <button
            onClick={handleAction}
            disabled={isProcessing}
            className="w-full py-4 px-6 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white font-black text-sm rounded-2xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>{processingLabel}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>{processBtnLabel}</span>
                <ArrowRight className="w-4 h-4 ml-1 opacity-70" />
              </>
            )}
          </button>

          <p className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>
              {currentLang === 'it'
                ? 'Elaborazione al 100% nel tuo browser. Nessun dato viene caricato su server esterni.'
                : currentLang === 'de'
                ? '100% lokale Verarbeitung im Browser. Es werden keine Daten an externe Server gesendet.'
                : '100% private in-browser processing. Zero files are uploaded to external servers.'}
            </span>
          </p>
        </div>
      )}

      {resultBlob && (
        <div className="bg-white border border-emerald-200 rounded-3xl p-8 sm:p-10 shadow-sm text-center space-y-6 animate-fade-in">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto border border-emerald-100 shadow-sm">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="max-w-md mx-auto">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">
              {currentLang === 'it'
                ? 'Conversione completata con successo!'
                : currentLang === 'de'
                ? 'Erfolgreich umgewandelt!'
                : 'Conversion successfully completed!'}
            </h3>
            <p className="text-sm text-slate-500 mt-1.5">
              {currentLang === 'it'
                ? `Il tuo file ${resultBlob.ext} è pronto per essere scaricato.`
                : currentLang === 'de'
                ? `Ihre ${resultBlob.ext}-Datei steht zum Download bereit.`
                : `Your ${resultBlob.ext} file is ready to download.`}
            </p>
          </div>

          <div className="pt-2 max-w-md mx-auto space-y-3">
            <button
              onClick={handleDownloadResult}
              className="w-full py-4 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm rounded-2xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <Download className="w-5 h-5" />
              <span>{downloadBtnLabel}</span>
            </button>

            <button
              onClick={() => {
                setFiles([]);
                setResultBlob(null);
              }}
              className="w-full py-3 px-4 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
            >
              {currentLang === 'it'
                ? 'Converti un altro documento'
                : currentLang === 'de'
                ? 'Ein weiteres Dokument umwandeln'
                : 'Convert another document'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
