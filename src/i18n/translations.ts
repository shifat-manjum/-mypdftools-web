export type Language = 'it' | 'en' | 'de';

export interface Translations {
  nav: {
    mergePdf: string;
    splitPdf: string;
    compressPdf: string;
    convertPdf: string;
    allTools: string;
    convertToPdf: string;
    convertFromPdf: string;
    login: string;
    signUp: string;
    privateBadge: string;
    privateShort: string;
  };
  hero: {
    badge: string;
    titleStart: string;
    titleHighlight: string;
    subtitle: string;
    privacyButton: string;
    worksOffline: string;
  };
  categories: {
    all: string;
    workflows: string;
    organize: string;
    optimize: string;
    convert: string;
    edit: string;
    security: string;
    intelligence: string;
  };
  searchPlaceholder: string;
  noToolsFound: string;
  clearFilters: string;
  openTool: string;
  instantBrowserTool: string;
  standardTool: string;
  createWorkflowTitle: string;
  createWorkflowDesc: string;
  createWorkflowBtn: string;
  trustSection: {
    badge: string;
    title: string;
    desc: string;
    zeroUploadsTitle: string;
    zeroUploadsDesc: string;
    instantSpeedTitle: string;
    instantSpeedDesc: string;
    offlineReadyTitle: string;
    offlineReadyDesc: string;
    readGuaranteeBtn: string;
  };
  footer: {
    rights: string;
    privacyGuarantee: string;
    disclaimer: string;
  };
  tools: Record<string, { title: string; description: string }>;
}

export const TRANSLATIONS: Record<Language, Translations> = {
  it: {
    nav: {
      mergePdf: 'Unisci PDF',
      splitPdf: 'Dividi PDF',
      compressPdf: 'Comprimi PDF',
      convertPdf: 'Converti PDF',
      allTools: 'Tutti i Tool PDF',
      convertToPdf: 'CONVERTI IN PDF',
      convertFromPdf: 'CONVERTI DA PDF',
      login: 'Accedi',
      signUp: 'Registrati',
      privateBadge: '100% Privato (Nessun Upload)',
      privateShort: 'Privato',
    },
    hero: {
      badge: 'Zero Upload sui Server • Elaborazione 100% Privata nel Browser',
      titleStart: 'Tutti gli strumenti per i tuoi PDF.',
      titleHighlight: 'Completamente Privato.',
      subtitle: 'Unisci, dividi, comprimi, converti, firma e organizza i tuoi PDF senza mai inviare i tuoi file riservati su Internet. 100% Gratuito e sicuro.',
      privacyButton: 'Vedi la Garanzia di Privacy',
      worksOffline: 'Funziona offline senza connessione internet',
    },
    categories: {
      all: 'Tutti',
      workflows: 'Flussi di lavoro',
      organize: 'Organizza PDF',
      optimize: 'Ottimizza PDF',
      convert: 'Converti PDF',
      edit: 'Modifica PDF',
      security: 'Sicurezza PDF',
      intelligence: 'AI & Intelligence',
    },
    searchPlaceholder: 'Cerca strumenti (es. JPG, unisci, dividi)...',
    noToolsFound: 'Nessuno strumento trovato corrispondente a',
    clearFilters: 'Cancella filtri',
    openTool: 'Apri',
    instantBrowserTool: 'Tool istantaneo nel browser',
    standardTool: 'Strumento sicuro',
    createWorkflowTitle: 'Crea un flusso di lavoro',
    createWorkflowDesc: 'Crea sequenze personalizzate con i tuoi strumenti preferiti per automatizzare le tue operazioni quotidiane.',
    createWorkflowBtn: 'Crea flusso',
    trustSection: {
      badge: 'La suite PDF più sicura del web',
      title: 'Perché gli utenti si affidano a MyPdfTools per i documenti riservati',
      desc: 'La maggior parte dei siti carica dichiarazioni fiscali, contratti e buste paga su server cloud remoti. MyPdfTools elabora ogni singolo file esclusivamente nella memoria locale del tuo browser.',
      zeroUploadsTitle: 'Zero Caricamenti su Server',
      zeroUploadsDesc: 'I tuoi file non vengono mai inviati a server esterni né salvati su alcun cloud.',
      instantSpeedTitle: 'Velocità Istantanea',
      instantSpeedDesc: 'Nessuna attesa di upload per file da 50MB. Le conversioni avvengono subito nella RAM.',
      offlineReadyTitle: 'Funziona Offline',
      offlineReadyDesc: 'Fai una prova: disconnetti il Wi-Fi e gli strumenti continueranno a funzionare regolarmente!',
      readGuaranteeBtn: 'Leggi la Garanzia di Privacy completa',
    },
    footer: {
      rights: 'Tutti i diritti riservati. Architettura 100% Client-Side.',
      privacyGuarantee: 'Garanzia di Privacy',
      disclaimer: 'MyPdfTools garantisce che nessun documento viene caricato, salvato o elaborato sui nostri server. Tutte le operazioni avvengono nel sandbox locale del browser.',
    },
    tools: {
      'merge-pdf': {
        title: 'Unisci PDF',
        description: 'Combina più PDF nell\'ordine desiderato con lo strumento di unione più rapido e sicuro.',
      },
      'split-pdf': {
        title: 'Dividi PDF',
        description: 'Estrai intervalli di pagine o separa ogni pagina in singoli file PDF indipendenti.',
      },
      'compress-pdf': {
        title: 'Comprimi PDF',
        description: 'Riduci le dimensioni del file ottimizzando al massimo la qualità visiva del PDF.',
      },
      'pdf-to-word': {
        title: 'Da PDF a Word',
        description: 'Converti facilmente i tuoi file PDF in documenti DOC e DOCX modificabili.',
      },
      'pdf-to-powerpoint': {
        title: 'Da PDF a PowerPoint',
        description: 'Trasforma i tuoi documenti PDF in presentazioni PPT e PPTX facili da modificare.',
      },
      'pdf-to-excel': {
        title: 'Da PDF a Excel',
        description: 'Estrai tabelle e dati direttamente dai PDF in fogli di calcolo Excel in pochi secondi.',
      },
      'word-to-pdf': {
        title: 'Da Word a PDF',
        description: 'Converti i tuoi file DOC e DOCX in PDF perfetti per la lettura e la stampa.',
      },
      'powerpoint-to-pdf': {
        title: 'Da PowerPoint a PDF',
        description: 'Rendi le tue presentazioni PPT e PPTX facili da visualizzare convertendole in PDF.',
      },
      'excel-to-pdf': {
        title: 'Da Excel a PDF',
        description: 'Converti i fogli di lavoro Excel in file PDF formattati e protetti.',
      },
      'edit-pdf': {
        title: 'Modifica PDF',
        description: 'Aggiungi testo, forme, immagini e note a mano libera al tuo documento PDF.',
      },
      'pdf-to-jpg': {
        title: 'Da PDF a JPG',
        description: 'Converti ogni pagina del PDF in immagini JPG o PNG ad alta risoluzione.',
      },
      'jpg-to-pdf': {
        title: 'Da JPG a PDF',
        description: 'Converti immagini JPG, PNG e WebP in PDF. Regola orientamento, margini e dimensioni.',
      },
      'sign-pdf': {
        title: 'Firma PDF',
        description: 'Firma digitalmente i tuoi contratti e moduli disegnando la tua firma a mano libera.',
      },
      'watermark': {
        title: 'Filigrana PDF',
        description: 'Applica un testo di filigrana personalizzato su tutte le pagine con trasparenza e rotazione.',
      },
      'rotate-pdf': {
        title: 'Ruota PDF',
        description: 'Ruota le pagine dei tuoi PDF di 90°, 180° o 270° con anteprima visuale immediata.',
      },
      'html-to-pdf': {
        title: 'Da HTML a PDF',
        description: 'Converti pagine web e codice HTML in documenti PDF pronti per la consultazione.',
      },
      'unlock-pdf': {
        title: 'Sblocca PDF',
        description: 'Rimuovi le password e le restrizioni di sicurezza dai documenti PDF autorizzati.',
      },
      'protect-pdf': {
        title: 'Proteggi PDF',
        description: 'Proteggi i tuoi file PDF con password crittografata per impedire accessi non autorizzati.',
      },
      'organize-pdf': {
        title: 'Organizza PDF',
        description: 'Riordina, duplica o elimina pagine dal tuo documento con una griglia visiva interattiva.',
      },
      'pdf-to-pdfa': {
        title: 'Da PDF a PDF/A',
        description: 'Trasforma il tuo PDF nello standard ISO PDF/A per l\'archiviazione a lungo termine.',
      },
      'repair-pdf': {
        title: 'Ripara PDF',
        description: 'Recupera dati e correggi errori strutturali da documenti PDF danneggiati.',
      },
      'page-numbers': {
        title: 'Numeri di Pagina',
        description: 'Aggiungi numerazione progressiva alle pagine del PDF con posizione e formato personalizzabili.',
      },
      'scan-to-pdf': {
        title: 'Scansiona in PDF',
        description: 'Acquisisci scansioni dal tuo dispositivo mobile e trasformale subito in PDF.',
      },
      'ocr-pdf': {
        title: 'OCR PDF',
        description: 'Converti PDF scansionati in documenti con testo ricercabile e selezionabile.',
      },
      'compare-pdf': {
        title: 'Confronta PDF',
        description: 'Confronta due versioni di un documento fianco a fianco per individuare le differenze.',
      },
      'redact-pdf': {
        title: 'Redigi PDF',
        description: 'Oscura in modo permanente dati sensibili, codici fiscali e informazioni riservate.',
      },
      'crop-pdf': {
        title: 'Ritaglia PDF',
        description: 'Ritaglia i margini o aree specifiche delle pagine del tuo documento PDF.',
      },
      'pdf-forms': {
        title: 'Moduli PDF',
        description: 'Compila moduli interattivi o crea campi modulo compilabili direttamente nel PDF.',
      },
      'ai-summarizer': {
        title: 'AI Riassunto',
        description: 'Genera riassunti concisi ed estrai i punti salienti del documento in pochi istanti.',
      },
      'translate-pdf': {
        title: 'Traduci PDF',
        description: 'Traduci il testo dei documenti PDF preservando impaginazione e formattazione.',
      },
      'pdf-to-markdown': {
        title: 'Da PDF a Markdown',
        description: 'Converti il contenuto del PDF in formato Markdown (.md) pulito e strutturato per note e LLM.',
      },
    },
  },

  en: {
    nav: {
      mergePdf: 'Merge PDF',
      splitPdf: 'Split PDF',
      compressPdf: 'Compress PDF',
      convertPdf: 'Convert PDF',
      allTools: 'All PDF Tools',
      convertToPdf: 'CONVERT TO PDF',
      convertFromPdf: 'CONVERT FROM PDF',
      login: 'Login',
      signUp: 'Sign up',
      privateBadge: '100% Private (No Uploads)',
      privateShort: 'Private',
    },
    hero: {
      badge: 'Zero Server Uploads • 100% Private In-Browser Processing',
      titleStart: 'Every tool you need for PDFs.',
      titleHighlight: 'Completely Private.',
      subtitle: 'Merge, split, compress, convert, sign, and organize your PDFs without ever sending your sensitive files across the internet. 100% Free and secure.',
      privacyButton: 'See our Privacy Guarantee',
      worksOffline: 'Works offline without internet',
    },
    categories: {
      all: 'All',
      workflows: 'Workflows',
      organize: 'Organize PDF',
      optimize: 'Optimize PDF',
      convert: 'Convert PDF',
      edit: 'Edit PDF',
      security: 'PDF Security',
      intelligence: 'PDF Intelligence',
    },
    searchPlaceholder: 'Search tools (e.g. JPG, merge, split)...',
    noToolsFound: 'No tools found matching',
    clearFilters: 'Clear filters',
    openTool: 'Open',
    instantBrowserTool: 'Instant browser tool',
    standardTool: 'Secure tool',
    createWorkflowTitle: 'Create a workflow',
    createWorkflowDesc: 'Create custom workflows with your favorite tools, automate tasks, and reuse them anytime.',
    createWorkflowBtn: 'Create workflow',
    trustSection: {
      badge: 'The Safest PDF Suite on the Web',
      title: 'Why users trust MyPdfTools with their confidential documents',
      desc: 'Most PDF sites upload your personal tax forms, resumes, and bank statements to remote cloud servers. MyPdfTools converts every document entirely inside your browser\'s private sandbox.',
      zeroUploadsTitle: 'Zero Server Uploads',
      zeroUploadsDesc: 'Your files are never transmitted to our servers or any cloud storage.',
      instantSpeedTitle: 'Instant Speed',
      instantSpeedDesc: 'No waiting for 50MB files to upload. Conversions happen in your computer\'s RAM.',
      offlineReadyTitle: 'Offline Ready',
      offlineReadyDesc: 'Test it yourself: disconnect your Wi-Fi and the tools still work!',
      readGuaranteeBtn: 'Read our full Privacy Guarantee',
    },
    footer: {
      rights: 'All rights reserved. 100% Client-Side Architecture.',
      privacyGuarantee: 'Privacy Guarantee',
      disclaimer: 'MyPdfTools guarantees that no documents are uploaded, stored, or processed on our servers. All operations execute strictly in your local browser sandbox.',
    },
    tools: {
      'merge-pdf': {
        title: 'Merge PDF',
        description: 'Combine PDFs in the order you want with the easiest and safest PDF merger available.',
      },
      'split-pdf': {
        title: 'Split PDF',
        description: 'Separate one page or a whole set for easy conversion into independent PDF files.',
      },
      'compress-pdf': {
        title: 'Compress PDF',
        description: 'Reduce file size while optimizing for maximal PDF quality.',
      },
      'pdf-to-word': {
        title: 'PDF to Word',
        description: 'Easily convert your PDF files into easy to edit DOC and DOCX documents.',
      },
      'pdf-to-powerpoint': {
        title: 'PDF to PowerPoint',
        description: 'Turn your PDF files into easy to edit PPT and PPTX slideshows.',
      },
      'pdf-to-excel': {
        title: 'PDF to Excel',
        description: 'Pull data straight from PDFs into Excel spreadsheets in a few short seconds.',
      },
      'word-to-pdf': {
        title: 'Word to PDF',
        description: 'Make DOC and DOCX files easy to read by converting them to PDF.',
      },
      'powerpoint-to-pdf': {
        title: 'PowerPoint to PDF',
        description: 'Make PPT and PPTX slideshows easy to view by converting them to PDF.',
      },
      'excel-to-pdf': {
        title: 'Excel to PDF',
        description: 'Make EXCEL spreadsheets easy to read by converting them to PDF.',
      },
      'edit-pdf': {
        title: 'Edit PDF',
        description: 'Add text, images, shapes or freehand annotations to a PDF document.',
      },
      'pdf-to-jpg': {
        title: 'PDF to JPG',
        description: 'Convert each PDF page into a JPG or extract all images contained in a PDF.',
      },
      'jpg-to-pdf': {
        title: 'JPG to PDF',
        description: 'Convert JPG images to PDF in seconds. Easily adjust orientation and margins.',
      },
      'sign-pdf': {
        title: 'Sign PDF',
        description: 'Sign yourself or request electronic signatures from others.',
      },
      'watermark': {
        title: 'Watermark',
        description: 'Stamp an image or text over your PDF in seconds. Choose typography, transparency and position.',
      },
      'rotate-pdf': {
        title: 'Rotate PDF',
        description: 'Rotate your PDFs the way you need them. You can even rotate multiple PDFs at once!',
      },
      'html-to-pdf': {
        title: 'HTML to PDF',
        description: 'Convert webpages in HTML to PDF with a single click.',
      },
      'unlock-pdf': {
        title: 'Unlock PDF',
        description: 'Remove PDF password security, giving you the freedom to use your PDFs as you want.',
      },
      'protect-pdf': {
        title: 'Protect PDF',
        description: 'Protect PDF files with a password. Encrypt PDF documents to prevent unauthorized access.',
      },
      'organize-pdf': {
        title: 'Organize PDF',
        description: 'Sort pages of your PDF file however you like. Delete or duplicate PDF pages.',
      },
      'pdf-to-pdfa': {
        title: 'PDF to PDF/A',
        description: 'Transform your PDF to PDF/A, the ISO-standardized version for long-term archiving.',
      },
      'repair-pdf': {
        title: 'Repair PDF',
        description: 'Repair a damaged PDF and recover data from corrupt PDF files.',
      },
      'page-numbers': {
        title: 'Page Numbers',
        description: 'Add page numbers into PDFs with ease. Choose your positions, dimensions, typography.',
      },
      'scan-to-pdf': {
        title: 'Scan to PDF',
        description: 'Capture document scans from your mobile device and send them instantly to your browser.',
      },
      'ocr-pdf': {
        title: 'OCR PDF',
        description: 'Easily convert scanned PDF into searchable and selectable documents.',
      },
      'compare-pdf': {
        title: 'Compare PDF',
        description: 'Show a side-by-side document comparison and easily spot changes between versions.',
      },
      'redact-pdf': {
        title: 'Redact PDF',
        description: 'Redact text and graphics to permanently remove sensitive information from a PDF.',
      },
      'crop-pdf': {
        title: 'Crop PDF',
        description: 'Crop margins of PDF documents or select specific areas.',
      },
      'pdf-forms': {
        title: 'PDF Forms',
        description: 'Fill interactive PDF forms or build fillable form fields directly.',
      },
      'ai-summarizer': {
        title: 'AI Summarizer',
        description: 'Quickly generate concise summaries from articles, paragraphs, and essays.',
      },
      'translate-pdf': {
        title: 'Translate PDF',
        description: 'Easily translate PDF files powered by AI while keeping layout intact.',
      },
      'pdf-to-markdown': {
        title: 'PDF to Markdown',
        description: 'Easily turn PDFs into Markdown files. Perfect for notes, docs, and LLMs.',
      },
    },
  },

  de: {
    nav: {
      mergePdf: 'PDF zusammenfügen',
      splitPdf: 'PDF teilen',
      compressPdf: 'PDF komprimieren',
      convertPdf: 'PDF umwandeln',
      allTools: 'Alle PDF-Tools',
      convertToPdf: 'IN PDF UMWANDELN',
      convertFromPdf: 'AUS PDF UMWANDELN',
      login: 'Anmelden',
      signUp: 'Registrieren',
      privateBadge: '100% Privat (Kein Upload)',
      privateShort: 'Privat',
    },
    hero: {
      badge: 'Kein Server-Upload • 100% Private Verarbeitung im Browser',
      titleStart: 'Alle Werkzeuge für Ihre PDFs.',
      titleHighlight: 'Vollkommen Privat.',
      subtitle: 'Zusammenfügen, teilen, komprimieren, konvertieren und unterschreiben Sie PDFs, ohne Ihre sensiblen Daten über das Internet zu senden. 100% kostenlos und sicher.',
      privacyButton: 'Datenschutzgarantie ansehen',
      worksOffline: 'Funktioniert offline ohne Internetverbindung',
    },
    categories: {
      all: 'Alle',
      workflows: 'Workflows',
      organize: 'PDF organisieren',
      optimize: 'PDF optimieren',
      convert: 'PDF umwandeln',
      edit: 'PDF bearbeiten',
      security: 'PDF Sicherheit',
      intelligence: 'PDF Intelligence',
    },
    searchPlaceholder: 'Tools suchen (z.B. JPG, zusammenfügen, teilen)...',
    noToolsFound: 'Keine Tools gefunden für',
    clearFilters: 'Filter zurücksetzen',
    openTool: 'Öffnen',
    instantBrowserTool: 'Sofortiges Browser-Tool',
    standardTool: 'Sicheres Tool',
    createWorkflowTitle: 'Workflow erstellen',
    createWorkflowDesc: 'Erstellen Sie benutzerdefinierte Abläufe mit Ihren Lieblingswerkzeugen für wiederkehrende Aufgaben.',
    createWorkflowBtn: 'Workflow erstellen',
    trustSection: {
      badge: 'Die sicherste PDF-Suite im Web',
      title: 'Warum Nutzer MyPdfTools für vertrauliche Dokumente vertrauen',
      desc: 'Die meisten Online-Dienste laden Steuererklärungen, Verträge und Gehaltsabrechnungen auf Cloud-Server hoch. MyPdfTools verarbeitet jedes Dokument komplett im privaten Speicher Ihres Browsers.',
      zeroUploadsTitle: 'Kein Server-Upload',
      zeroUploadsDesc: 'Ihre Dateien werden niemals an externe Server übertragen oder in Clouds gespeichert.',
      instantSpeedTitle: 'Sofortige Geschwindigkeit',
      instantSpeedDesc: 'Keine Wartezeiten beim Hochladen großer 50MB-Dateien. Alles läuft lokal im Arbeitsspeicher.',
      offlineReadyTitle: 'Offline nutzbar',
      offlineReadyDesc: 'Testen Sie es selbst: Trennen Sie Ihr WLAN und die Konvertierung funktioniert trotzdem!',
      readGuaranteeBtn: 'Vollständige Datenschutzgarantie lesen',
    },
    footer: {
      rights: 'Alle Rechte vorbehalten. 100% Client-Side Architektur.',
      privacyGuarantee: 'Datenschutzgarantie',
      disclaimer: 'MyPdfTools garantiert, dass keine Dokumente auf unseren Servern gespeichert oder verarbeitet werden. Alle Vorgänge laufen ausschließlich in Ihrer lokalen Browser-Sandbox ab.',
    },
    tools: {
      'merge-pdf': {
        title: 'PDF zusammenfügen',
        description: 'Fügen Sie mehrere PDFs in gewünschter Reihenfolge schnell und sicher zusammen.',
      },
      'split-pdf': {
        title: 'PDF teilen',
        description: 'Trennen Sie einzelne Seiten oder Seitenbereiche in eigenständige PDF-Dateien.',
      },
      'compress-pdf': {
        title: 'PDF komprimieren',
        description: 'Reduzieren Sie die Dateigröße bei maximaler visueller PDF-Qualität.',
      },
      'pdf-to-word': {
        title: 'PDF in Word',
        description: 'Konvertieren Sie PDF-Dateien in bearbeitbare DOC- und DOCX-Dokumente.',
      },
      'pdf-to-powerpoint': {
        title: 'PDF in PowerPoint',
        description: 'Wandeln Sie PDFs in bearbeitbare PPT- und PPTX-Präsentationen um.',
      },
      'pdf-to-excel': {
        title: 'PDF in Excel',
        description: 'Extrahieren Sie Tabellendaten aus PDFs sekundenschnell in Excel-Dateien.',
      },
      'word-to-pdf': {
        title: 'Word in PDF',
        description: 'Konvertieren Sie DOC- und DOCX-Dateien in saubere PDFs.',
      },
      'powerpoint-to-pdf': {
        title: 'PowerPoint in PDF',
        description: 'Wandeln Sie Präsentationen in einfach lesbare PDFs um.',
      },
      'excel-to-pdf': {
        title: 'Excel in PDF',
        description: 'Wandeln Sie Excel-Tabellen in geschützte PDFs um.',
      },
      'edit-pdf': {
        title: 'PDF bearbeiten',
        description: 'Fügen Sie Text, Formen, Bilder und Freihand-Notizen zu PDFs hinzu.',
      },
      'pdf-to-jpg': {
        title: 'PDF in JPG',
        description: 'Konvertieren Sie PDF-Seiten in hochauflösende JPG- oder PNG-Bilder.',
      },
      'jpg-to-pdf': {
        title: 'JPG in PDF',
        description: 'Wandeln Sie JPG-, PNG- und WebP-Bilder blitzschnell in PDFs um.',
      },
      'sign-pdf': {
        title: 'PDF unterschreiben',
        description: 'Unterzeichnen Sie Dokumente und Verträge direkt mit digitaler Handschrift.',
      },
      'watermark': {
        title: 'Wasserzeichen',
        description: 'Fügen Sie Wasserzeichen mit anpassbarer Deckkraft und Drehung hinzu.',
      },
      'rotate-pdf': {
        title: 'PDF drehen',
        description: 'Drehen Sie PDF-Seiten um 90°, 180° oder 270° mit visueller Live-Vorschau.',
      },
      'html-to-pdf': {
        title: 'HTML in PDF',
        description: 'Konvertieren Sie Webseiten und HTML-Code mit einem Klick in PDF.',
      },
      'unlock-pdf': {
        title: 'PDF entsperren',
        description: 'Entfernen Sie Passwörter und Einschränkungen von geschützten PDFs.',
      },
      'protect-pdf': {
        title: 'PDF schützen',
        description: 'Schützen Sie PDFs mit Kennwort und starker Verschlüsselung.',
      },
      'organize-pdf': {
        title: 'PDF organisieren',
        description: 'Seiten per Drag-and-Drop neu anordnen, duplizieren oder löschen.',
      },
      'pdf-to-pdfa': {
        title: 'PDF in PDF/A',
        description: 'Konvertieren Sie PDFs in das ISO-Standardformat für Langzeitarchivierung.',
      },
      'repair-pdf': {
        title: 'PDF reparieren',
        description: 'Reparieren Sie beschädigte PDF-Dateien und stellen Sie Daten wieder her.',
      },
      'page-numbers': {
        title: 'Seitenzahlen',
        description: 'Fügen Sie Seitenzahlen mit frei wählbarer Position und Formatierung ein.',
      },
      'scan-to-pdf': {
        title: 'Scan in PDF',
        description: 'Erfassen Sie Dokumentenscans von Ihrem Mobilgerät direkt im Browser.',
      },
      'ocr-pdf': {
        title: 'OCR PDF',
        description: 'Verwandeln Sie gescannte PDFs in durchsuchbare Textdokumente.',
      },
      'compare-pdf': {
        title: 'PDF vergleichen',
        description: 'Vergleichen Sie zwei Dokumentenversionen übersichtlich nebeneinander.',
      },
      'redact-pdf': {
        title: 'PDF schwärzen',
        description: 'Entfernen Sie sensible persönliche Informationen dauerhaft aus dem PDF.',
      },
      'crop-pdf': {
        title: 'PDF zuschneiden',
        description: 'Schneiden Sie Ränder oder bestimmte Bereiche Ihrer PDF-Seiten zu.',
      },
      'pdf-forms': {
        title: 'PDF Formulare',
        description: 'Interaktive Formulare direkt im Browser ausfüllen oder erstellen.',
      },
      'ai-summarizer': {
        title: 'KI Zusammenfassung',
        description: 'Erstellen Sie prägnante Zusammenfassungen und Kernpunkte per KI.',
      },
      'translate-pdf': {
        title: 'PDF übersetzen',
        description: 'Übersetzen Sie PDFs KI-gestützt unter Beibehaltung des Layouts.',
      },
      'pdf-to-markdown': {
        title: 'PDF in Markdown',
        description: 'Wandeln Sie PDFs in sauberes Markdown für Notizen und KI-Modelle um.',
      },
    },
  },
};

