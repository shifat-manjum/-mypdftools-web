import React, { useState } from 'react';
import { Dropzone } from '../components/Dropzone';
import { ToolItem, UploadedFile } from '../types';
import { extractTextFromPdf } from '../utils/pdfRenderUtils';
import { toPdfBlob } from '../utils/pdfUtils';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import confetti from 'canvas-confetti';
import { Language } from '../i18n/translations';
import { Sparkles, Download, Loader2, CheckCircle2, FileText, ArrowRight, ShieldCheck } from 'lucide-react';

function sanitizeWinAnsi(str: string): string {
  // Replace non-WinAnsi characters so StandardFonts.Helvetica never throws encoding errors
  return str
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[\u2013\u2014]/g, '-')
    .replace(/[^\x20-\x7E\xA0-\xFF]/g, ' ')
    .trim();
}

async function parseXlsxToRows(file: File): Promise<string[][]> {
  if (file.name.toLowerCase().endsWith('.csv') || file.type === 'text/csv') {
    const text = await file.text();
    return text
      .split(/\r?\n/)
      .filter((l) => l.trim().length > 0)
      .map((l) => l.split(/[,;\t]/).map((c) => c.replace(/^"|"$/g, '').trim()));
  }

  try {
    const zip = await JSZip.loadAsync(file);
    const sharedStrings: string[] = [];

    const sharedStringsFile = zip.file('xl/sharedStrings.xml');
    if (sharedStringsFile) {
      const sharedXml = await sharedStringsFile.async('string');
      const parser = new DOMParser();
      const doc = parser.parseFromString(sharedXml, 'application/xml');
      const siNodes = doc.getElementsByTagName('si');
      for (let i = 0; i < siNodes.length; i++) {
        const tNodes = siNodes[i].getElementsByTagName('t');
        let val = '';
        for (let j = 0; j < tNodes.length; j++) {
          val += tNodes[j].textContent || '';
        }
        sharedStrings.push(val);
      }
    }

    const rows: string[][] = [];
    const sheetFiles = Object.keys(zip.files)
      .filter((name) => /^xl\/worksheets\/sheet\d+\.xml$/i.test(name))
      .sort();

    for (const sheetPath of sheetFiles) {
      const sheetFile = zip.file(sheetPath);
      if (!sheetFile) continue;
      const sheetXml = await sheetFile.async('string');
      const parser = new DOMParser();
      const doc = parser.parseFromString(sheetXml, 'application/xml');
      const rowNodes = doc.getElementsByTagName('row');

      for (let r = 0; r < rowNodes.length; r++) {
        const cellNodes = rowNodes[r].getElementsByTagName('c');
        const rowValues: string[] = [];
        for (let c = 0; c < cellNodes.length; c++) {
          const cell = cellNodes[c];
          const type = cell.getAttribute('t');
          const vNode = cell.getElementsByTagName('v')[0];
          const isNode = cell.getElementsByTagName('is')[0];
          let cellText = '';

          if (type === 's' && vNode?.textContent) {
            const idx = parseInt(vNode.textContent, 10);
            cellText = sharedStrings[idx] ?? vNode.textContent;
          } else if (type === 'inlineStr' && isNode) {
            cellText = isNode.textContent || '';
          } else if (vNode?.textContent) {
            cellText = vNode.textContent;
          }

          if (cellText.trim()) {
            rowValues.push(cellText.trim());
          }
        }
        if (rowValues.length > 0) {
          rows.push(rowValues);
        }
      }
    }

    if (rows.length > 0) return rows;
  } catch (e) {
    console.warn('Fallback from XLSX zip parser:', e);
  }

  const rawText = await file.text().catch(() => '');
  return rawText
    .split(/\r?\n/)
    .map((l) => [sanitizeWinAnsi(l)])
    .filter((r) => r[0].length > 0);
}

async function parsePptxToSlides(file: File): Promise<string[][]> {
  try {
    const zip = await JSZip.loadAsync(file);
    const slideFiles = Object.keys(zip.files)
      .filter((name) => /^ppt\/slides\/slide\d+\.xml$/i.test(name))
      .sort((a, b) => {
        const numA = parseInt(a.match(/\d+/)?.[0] || '0', 10);
        const numB = parseInt(b.match(/\d+/)?.[0] || '0', 10);
        return numA - numB;
      });

    const slides: string[][] = [];
    for (const slidePath of slideFiles) {
      const slideFile = zip.file(slidePath);
      if (!slideFile) continue;
      const slideXml = await slideFile.async('string');
      const parser = new DOMParser();
      const doc = parser.parseFromString(slideXml, 'application/xml');
      const pNodes = doc.getElementsByTagName('a:p');
      const lines: string[] = [];

      for (let i = 0; i < pNodes.length; i++) {
        const tNodes = pNodes[i].getElementsByTagName('a:t');
        let line = '';
        for (let j = 0; j < tNodes.length; j++) {
          line += tNodes[j].textContent || '';
        }
        if (line.trim()) lines.push(line.trim());
      }
      slides.push(lines.length > 0 ? lines : [`Slide ${slides.length + 1}`]);
    }

    if (slides.length > 0) return slides;
  } catch (e) {
    console.warn('Fallback from PPTX zip parser:', e);
  }
  return [[file.name.replace(/\.[^/.]+$/, '')]];
}

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
        // Parse .xlsx or .csv into structured rows and render formatted PDF table
        const rows = await parseXlsxToRows(file);

        const pdfDoc = await PDFDocument.create();
        const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
        const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
        
        let page = pdfDoc.addPage([595.28, 841.89]); // A4 portrait
        let y = 795;

        // Header
        page.drawText(sanitizeWinAnsi(file.name) || 'Spreadsheet', {
          x: 40,
          y,
          size: 14,
          font: fontBold,
          color: rgb(0.06, 0.1, 0.16),
        });
        y -= 18;
        page.drawLine({ start: { x: 40, y }, end: { x: 555, y }, thickness: 1, color: rgb(0.82, 0.85, 0.88) });
        y -= 18;

        for (let rIdx = 0; rIdx < rows.length; rIdx++) {
          if (y < 50) {
            page = pdfDoc.addPage([595.28, 841.89]);
            y = 795;
          }
          const row = rows[rIdx];
          const formattedRow = sanitizeWinAnsi(row.join('   |   ')).slice(0, 95);
          if (formattedRow) {
            page.drawText(formattedRow, {
              x: 40,
              y,
              size: rIdx === 0 ? 10 : 9,
              font: rIdx === 0 ? fontBold : font,
              color: rIdx === 0 ? rgb(0.05, 0.35, 0.25) : rgb(0.2, 0.22, 0.25),
            });
            y -= 15;
          }
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
        // Extract slides from .pptx and render landscape PDF pages
        const slides = await parsePptxToSlides(file);
        const pdfDoc = await PDFDocument.create();
        const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
        const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

        for (let sIdx = 0; sIdx < slides.length; sIdx++) {
          const slideLines = slides[sIdx];
          const page = pdfDoc.addPage([841.89, 595.28]); // A4 landscape
          let y = 520;

          page.drawText(`Slide ${sIdx + 1}`, {
            x: 50,
            y: 555,
            size: 10,
            font: fontBold,
            color: rgb(0.06, 0.58, 0.41),
          });

          for (let lIdx = 0; lIdx < slideLines.length; lIdx++) {
            if (y < 60) break;
            const clean = sanitizeWinAnsi(slideLines[lIdx]).slice(0, 95);
            if (!clean) continue;
            page.drawText(clean, {
              x: 50,
              y,
              size: lIdx === 0 ? 22 : 13,
              font: lIdx === 0 ? fontBold : font,
              color: lIdx === 0 ? rgb(0.1, 0.12, 0.18) : rgb(0.25, 0.28, 0.32),
            });
            y -= lIdx === 0 ? 34 : 20;
          }
        }

        const pdfBytes = await pdfDoc.save();
        const blob = toPdfBlob(pdfBytes);

        setResultBlob({
          blob,
          filename: `mypdftools_${baseName}.pdf`,
          ext: 'PDF',
        });
        confetti({ particleCount: 70, spread: 60 });
      } else if (tool.id === 'pdf-to-powerpoint') {
        // Extract text and build structured presentation slide deck
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
