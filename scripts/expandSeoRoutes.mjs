// scripts/expandSeoRoutes.mjs
import fs from 'fs';
import path from 'path';

const additionalRoutes = {
  /* ==========================================================================
     ITALIAN ADDITIONAL ROUTES (mypdftools.it)
     ========================================================================== */
  'da-powerpoint-a-pdf': {
    slug: 'da-powerpoint-a-pdf',
    toolId: 'powerpoint-to-pdf',
    lang: 'it',
    domain: 'mypdftools.it',
    h1: 'Convertire PowerPoint in PDF Online',
    metaTitle: 'Convertire PowerPoint in PDF Online Gratis — Da PPT a PDF',
    metaDescription: 'Converti le tue presentazioni PowerPoint (PPTX, PPT) in documenti PDF pronti per la stampa e condivisione. Gratuito e 100% privato.',
    badge: 'Presentazioni',
    intro: 'Mantieni intatti layout, font e grafici delle tue presentazioni convertendole da PowerPoint a PDF direttamente nel tuo browser senza installare software.',
    steps: [
      { title: '1. Scegli la Presentazione', desc: 'Carica il file .pptx o .ppt dal tuo computer o smartphone.' },
      { title: '2. Conversione Istantanea', desc: 'Le diapositive vengono renderizzate in pagine PDF con formattazione preservata.' },
      { title: '3. Scarica il PDF', desc: 'Salva il documento PDF pronto per l\'invio o la presentazione.' },
    ],
    faqs: [
      { q: 'I caratteri personalizzati vengono preservati?', a: 'Sì, la conversione incorpora o rasterizza gli elementi visivi garantendo che chiunque apra il PDF visualizzi esattamente la stessa diapositiva.' },
      { q: 'I file PPTX vengono caricati su internet?', a: 'No, l\'elaborazione avviene sul tuo dispositivo.' },
    ],
    relatedSlugs: ['da-word-a-pdf', 'da-excel-a-pdf', 'da-pdf-a-powerpoint', 'comprimere-pdf'],
    canonical: 'https://www.mypdftools.it/da-powerpoint-a-pdf',
    hreflang: { it: 'https://www.mypdftools.it/da-powerpoint-a-pdf', de: 'https://www.mypdftools.de/powerpoint-in-pdf' },
  },

  'da-pdf-a-powerpoint': {
    slug: 'da-pdf-a-powerpoint',
    toolId: 'pdf-to-powerpoint',
    lang: 'it',
    domain: 'mypdftools.it',
    h1: 'Convertire PDF in PowerPoint Gratis',
    metaTitle: 'Convertire PDF in PowerPoint Online — Da PDF a PPTX',
    metaDescription: 'Trasforma documenti e presentazioni PDF in diapositive PowerPoint PPTX modificabili. 100% sicuro e senza registrazione.',
    badge: 'PPTX',
    intro: 'Estrai slide e contenuti dal tuo PDF per riutilizzarli in presentazioni PowerPoint. Veloce, preciso e rispettoso della tua privacy.',
    steps: [
      { title: '1. Carica il PDF', desc: 'Seleziona il file PDF contenente le slide da convertire.' },
      { title: '2. Elaborazione Diapositive', desc: 'Ogni pagina del PDF viene mappata in una slide PowerPoint.' },
      { title: '3. Scarica PPTX', desc: 'Apri il file generato in PowerPoint, Google Presentazioni o Keynote.' },
    ],
    faqs: [
      { q: 'Posso modificare il testo una volta convertito in PPTX?', a: 'Le pagine vengono convertite ad alta risoluzione mantenendo fedelmente la grafica delle slide originali.' },
    ],
    relatedSlugs: ['da-powerpoint-a-pdf', 'da-pdf-a-word', 'da-pdf-a-jpg'],
    canonical: 'https://www.mypdftools.it/da-pdf-a-powerpoint',
    hreflang: { it: 'https://www.mypdftools.it/da-pdf-a-powerpoint', de: 'https://www.mypdftools.de/pdf-in-powerpoint' },
  },

  'da-png-a-pdf': {
    slug: 'da-png-a-pdf',
    toolId: 'jpg-to-pdf',
    lang: 'it',
    domain: 'mypdftools.it',
    h1: 'Convertire PNG in PDF Online Gratis',
    metaTitle: 'Convertire PNG in PDF Gratis — Crea PDF da Immagini PNG',
    metaDescription: 'Trasforma immagini trasparenti o foto PNG in file PDF singoli o multipagina. Nessun upload, 100% sicuro nel browser.',
    badge: 'PNG',
    intro: 'Crea documenti PDF professionali a partire dalle tue immagini PNG, loghi con trasparenza o grafici, mantenendo la massima nitidezza.',
    steps: [
      { title: '1. Seleziona i File PNG', desc: 'Trascina una o più immagini PNG.' },
      { title: '2. Organizza le Pagine', desc: 'Imposta margini e orientamento delle pagine.' },
      { title: '3. Genera PDF', desc: 'Scarica subito il documento PDF unificato.' },
    ],
    faqs: [
      { q: 'La trasparenza delle immagini PNG viene mantenuta?', a: 'Sì, i PNG vengono inseriti con sfondo bianco pulito conforme allo standard di stampa PDF.' },
    ],
    relatedSlugs: ['da-jpg-a-pdf', 'convertire-foto-in-pdf', 'da-pdf-a-jpg'],
    canonical: 'https://www.mypdftools.it/da-png-a-pdf',
    hreflang: { it: 'https://www.mypdftools.it/da-png-a-pdf', de: 'https://www.mypdftools.de/png-in-pdf' },
  },

  'da-pdf-a-png': {
    slug: 'da-pdf-a-png',
    toolId: 'pdf-to-jpg',
    lang: 'it',
    domain: 'mypdftools.it',
    h1: 'Convertire PDF in PNG ad Alta Definizione',
    metaTitle: 'Convertire PDF in PNG Gratis — Salva Pagine PDF in PNG',
    metaDescription: 'Estrai le pagine dei tuoi PDF salvandole come immagini PNG ad alta definizione. Elaborazione in locale senza caricamento su server.',
    badge: 'PNG HD',
    intro: 'Ottieni immagini PNG nitide e pronte per il web o la stampa da qualsiasi pagina PDF senza perdita di leggibilità del testo.',
    steps: [
      { title: '1. Scegli il File PDF', desc: 'Carica il documento PDF da cui estrarre le immagini.' },
      { title: '2. Rendering HD', desc: 'Il motore WebAssembly renderizza ciascuna pagina a risoluzione nitida.' },
      { title: '3. Scarica Immagini PNG', desc: 'Salva le singole immagini PNG o l\'archivio completo.' },
    ],
    faqs: [
      { q: 'Perché scegliere PNG rispetto a JPG per i PDF?', a: 'PNG offre compressione senza perdita (lossless), perfetta per testi, grafici e diagrammi ad alto contrasto.' },
    ],
    relatedSlugs: ['da-pdf-a-jpg', 'da-png-a-pdf', 'estrarre-pagine-pdf'],
    canonical: 'https://www.mypdftools.it/da-pdf-a-png',
    hreflang: { it: 'https://www.mypdftools.it/da-pdf-a-png', de: 'https://www.mypdftools.de/pdf-in-png' },
  },

  'da-pdf-a-testo': {
    slug: 'da-pdf-a-testo',
    toolId: 'pdf-to-markdown',
    lang: 'it',
    domain: 'mypdftools.it',
    h1: 'Estrarre Testo da PDF Online Gratis',
    metaTitle: 'Estrarre Testo da PDF Online — Da PDF a TXT e Testo Copiabile',
    metaDescription: 'Converti PDF in testo puro o Markdown copiabile. Estrai paragrafi, tabelle e annotazioni senza riscrivere a mano.',
    badge: 'Testo TXT',
    intro: 'Copia e riutilizza i testi contenuti nei tuoi documenti PDF in pochi click, senza riscritture manuali e con perfetta formattazione.',
    steps: [
      { title: '1. Carica il PDF', desc: 'Seleziona il PDF con il testo da estrarre.' },
      { title: '2. Estrazione Automatica', desc: 'Il testo viene decodificato e strutturato in tempo reale.' },
      { title: '3. Copia o Scarica', desc: 'Copia il testo negli appunti o scaricalo come file di testo.' },
    ],
    faqs: [
      { q: 'Funziona con PDF protetti da selezione testo?', a: 'Se il testo è incorporato nel PDF, il motore di decodifica lo estrae regolarmente.' },
    ],
    relatedSlugs: ['da-pdf-a-markdown', 'da-pdf-a-word', 'modificare-pdf'],
    canonical: 'https://www.mypdftools.it/da-pdf-a-testo',
    hreflang: { it: 'https://www.mypdftools.it/da-pdf-a-testo', de: 'https://www.mypdftools.de/pdf-in-text' },
  },

  'ocr-pdf-online': {
    slug: 'ocr-pdf-online',
    toolId: 'pdf-to-markdown',
    lang: 'it',
    domain: 'mypdftools.it',
    h1: 'OCR PDF Online Gratis — Riconoscimento Testo',
    metaTitle: 'OCR PDF Online Gratis — Riconoscimento Testo da Scansioni PDF',
    metaDescription: 'Riconosci ed estrai il testo da scansioni e documenti PDF digitalizzati con la tecnologia OCR in-browser. Zero upload privato.',
    badge: 'OCR',
    intro: 'Hai un documento scannerizzato non selezionabile? Usa lo strumento OCR per riconoscere caratteri e parole e renderle copiabili ed editabili.',
    steps: [
      { title: '1. Carica la Scansione', desc: 'Carica il PDF scansionato o la foto del testo.' },
      { title: '2. Elaborazione OCR', desc: 'L\'algoritmo scansiona i pixel e identifica le parole.' },
      { title: '3. Ottieni il Testo', desc: 'Copia il testo estratto per incollarlo in Word o documenti.' },
    ],
    faqs: [
      { q: 'I miei documenti scansionati vengono salvati?', a: 'Assolutamente no. Il riconoscimento ottico avviene localmente sul tuo browser.' },
    ],
    relatedSlugs: ['da-pdf-a-testo', 'da-pdf-a-markdown', 'da-pdf-a-word'],
    canonical: 'https://www.mypdftools.it/ocr-pdf-online',
    hreflang: { it: 'https://www.mypdftools.it/ocr-pdf-online', de: 'https://www.mypdftools.de/ocr-pdf-online-kostenlos' },
  },

  'ritagliare-pdf': {
    slug: 'ritagliare-pdf',
    toolId: 'organize-pdf',
    lang: 'it',
    domain: 'mypdftools.it',
    h1: 'Ritagliare PDF Online — Modifica Margini e Dimensioni',
    metaTitle: 'Ritagliare PDF Online Gratis — Riduci Margini e Pagine PDF',
    metaDescription: 'Ritaglia le pagine del tuo PDF ed elimina margini bianchi in eccesso. Ottimizza documenti per tablet, e-reader e stampa.',
    badge: 'Ritaglia',
    intro: 'Rimuovi i bordi bianchi inutili o focalizza l\'attenzione solo sul contenuto essenziale delle tue pagine PDF.',
    steps: [
      { title: '1. Carica il File', desc: 'Seleziona il PDF da rifinire.' },
      { title: '2. Regola i Margini', desc: 'Scegli l\'area visibile da mantenere per ciascuna pagina.' },
      { title: '3. Scarica il PDF Ritagliato', desc: 'Ottieni un file pulito e perfettamente calibrato.' },
    ],
    faqs: [
      { q: 'Il ritaglio riduce la qualità del testo?', a: 'No, il contenuto vettoriale originale rimane intatto; vengono semplicemente ridefiniti i confini della pagina.' },
    ],
    relatedSlugs: ['organizzare-pdf', 'eliminare-pagine-pdf', 'ruotare-pdf'],
    canonical: 'https://www.mypdftools.it/ritagliare-pdf',
    hreflang: { it: 'https://www.mypdftools.it/ritagliare-pdf', de: 'https://www.mypdftools.de/pdf-zuschneiden' },
  },

  'appiattire-pdf': {
    slug: 'appiattire-pdf',
    toolId: 'generic-tool',
    lang: 'it',
    domain: 'mypdftools.it',
    h1: 'Appiattire PDF Online (Flatten PDF)',
    metaTitle: 'Appiattire PDF Online Gratis — Rendi Moduli e Firme Non Modificabili',
    metaDescription: 'Appiattisci moduli compilabili, annotazioni e firme nei file PDF per renderli sicuri, definitivi e stampabili ovunque.',
    badge: 'Flatten',
    intro: 'Proteggi i tuoi dati compilati: l\'appiattimento fonde campi modulo, annotazioni e firme digitali nel livello grafico base del PDF.',
    steps: [
      { title: '1. Carica il PDF con Moduli', desc: 'Seleziona il modulo compilato o firmato.' },
      { title: '2. Fusione dei Livelli', desc: 'I campi interattivi vengono trasformati in grafica statica fissa.' },
      { title: '3. Salva Documento Definitivo', desc: 'Scarica il PDF pronto per l\'archiviazione sicura.' },
    ],
    faqs: [
      { q: 'Cosa significa appiattire un PDF?', a: 'Significa unire campi modulo interattivi e annotazioni direttamente nel foglio, impedendo a chiunque di alterarli.' },
    ],
    relatedSlugs: ['firmare-pdf', 'proteggere-pdf', 'modificare-pdf'],
    canonical: 'https://www.mypdftools.it/appiattire-pdf',
    hreflang: { it: 'https://www.mypdftools.it/appiattire-pdf', de: 'https://www.mypdftools.de/pdf-abflachen' },
  },

  'oscurare-pdf': {
    slug: 'oscurare-pdf',
    toolId: 'generic-tool',
    lang: 'it',
    domain: 'mypdftools.it',
    h1: 'Oscurare Dati Sensibili su PDF (Redact PDF)',
    metaTitle: 'Oscurare PDF Online — Cancella Dati Sensibili e Privacy da PDF',
    metaDescription: 'Cancella in modo permanente dati personali, IBAN, codici fiscali e nomi da documenti PDF prima di condividerli.',
    badge: 'Privacy GDPR',
    intro: 'Nascondi dati confidenziali nei tuoi documenti ufficiali. La rimozione è irreversibile e garantisce la piena conformità al GDPR.',
    steps: [
      { title: '1. Carica il Documento', desc: 'Seleziona il PDF contenente informazioni da censurare.' },
      { title: '2. Copri i Dati', desc: 'Applica bande nere o rimuovi le sezioni sensibili.' },
      { title: '3. Esporta PDF Protetto', desc: 'Scarica il documento anonimizzato in tutta sicurezza.' },
    ],
    faqs: [
      { q: 'È possibile recuperare il testo sottostante le bande nere?', a: 'No, con l\'oscuramento corretto il testo sottostante viene rimosso dal file sorgente.' },
    ],
    relatedSlugs: ['proteggere-pdf', 'appiattire-pdf', 'modificare-pdf'],
    canonical: 'https://www.mypdftools.it/oscurare-pdf',
    hreflang: { it: 'https://www.mypdftools.it/oscurare-pdf', de: 'https://www.mypdftools.de/pdf-schwaerzen' },
  },

  'riparare-pdf': {
    slug: 'riparare-pdf',
    toolId: 'generic-tool',
    lang: 'it',
    domain: 'mypdftools.it',
    h1: 'Riparare PDF Corrotto o Danneggiato Online',
    metaTitle: 'Riparare PDF Corrotto Online Gratis — Ripristina File PDF Danneggiati',
    metaDescription: 'Ripara file PDF danneggiati o illeggibili che restituiscono errori all\'apertura. Recupera pagine e testo in pochi secondi.',
    badge: 'Ripristino',
    intro: 'Il tuo PDF non si apre o segnala errore di sintassi? Ricostruisci la tabella degli indici XREF e ripristina la struttura del documento.',
    steps: [
      { title: '1. Seleziona il PDF Danneggiato', desc: 'Carica il file corrotto che non riesci ad aprire.' },
      { title: '2. Diagnosi e Ricostruzione', desc: 'Il motore analizza il flusso dei byte e ricostruisce gli oggetti intatti.' },
      { title: '3. Scarica PDF Risolto', desc: 'Salva una copia pulita e conforme agli standard PDF.' },
    ],
    faqs: [
      { q: 'È possibile riparare qualsiasi file danneggiato?', a: 'Se i dati essenziali del documento non sono stati sovrascritti, la maggior parte dei PDF con intestazioni o indici rovinati viene recuperata con successo.' },
    ],
    relatedSlugs: ['sbloccare-pdf', 'organizzare-pdf', 'unire-pdf'],
    canonical: 'https://www.mypdftools.it/riparare-pdf',
    hreflang: { it: 'https://www.mypdftools.it/riparare-pdf', de: 'https://www.mypdftools.de/pdf-reparieren' },
  },

  'confrontare-pdf': {
    slug: 'confrontare-pdf',
    toolId: 'generic-tool',
    lang: 'it',
    domain: 'mypdftools.it',
    h1: 'Confrontare Due PDF Online — Trova Differenze',
    metaTitle: 'Confrontare PDF Online Gratis — Evidenzia Modifiche tra Versioni',
    metaDescription: 'Confronta due versioni di un documento PDF per rilevare istantaneamente modifiche al testo, clausole rimosse o variazioni grafiche.',
    badge: 'Diff Check',
    intro: 'Verifica contratti e bozze fianco a fianco per individuare qualsiasi differenza prima di firmare o approvare una revisione.',
    steps: [
      { title: '1. Carica Entrambe le Versioni', desc: 'Inserisci il documento originale e quello revisionato.' },
      { title: '2. Analisi Differenze', desc: 'Il sistema evidenzia variazioni di testo e impaginazione.' },
      { title: '3. Revisione Dettagliata', desc: 'Esamina il report delle modifiche rilevate.' },
    ],
    faqs: [
      { q: 'Vengono evidenziate anche le modifiche ai numeri e date?', a: 'Sì, qualsiasi discrepanza testuale o grafica viene immediatamente segnalata.' },
    ],
    relatedSlugs: ['modificare-pdf', 'unire-pdf', 'firmare-pdf'],
    canonical: 'https://www.mypdftools.it/confrontare-pdf',
    hreflang: { it: 'https://www.mypdftools.it/confrontare-pdf', de: 'https://www.mypdftools.de/pdf-vergleichen' },
  },

  'pdf-bianco-nero': {
    slug: 'pdf-bianco-nero',
    toolId: 'generic-tool',
    lang: 'it',
    domain: 'mypdftools.it',
    h1: 'Convertire PDF in Bianco e Nero (Scala di Grigi)',
    metaTitle: 'PDF in Bianco e Nero Online — Converti in Scala di Grigi',
    metaDescription: 'Converti documenti PDF a colori in bianco e nero o scala di grigi per risparmiare inchiostro toner e ridurre la dimensione del file.',
    badge: 'Greyscale',
    intro: 'Prepara i tuoi file per la stampa economica: trasforma tutte le immagini e i testi colorati in una raffinata scala di grigi monocromatica.',
    steps: [
      { title: '1. Carica il PDF a Colori', desc: 'Seleziona il documento da convertire in toni di grigio.' },
      { title: '2. Conversione Cromatica', desc: 'I canali RGB e CMYK vengono mappati in scala di grigi ottimizzata.' },
      { title: '3. Scarica Documento Monocromatico', desc: 'Salva il PDF pronto per la stampa ad alta efficienza.' },
    ],
    faqs: [
      { q: 'La conversione riduce anche la dimensione del file?', a: 'Sì, le immagini convertite in scala di grigi contengono un solo canale cromatico, riducendo spesso il peso complessivo.' },
    ],
    relatedSlugs: ['comprimere-pdf', 'ridurre-dimensione-pdf', 'da-pdf-a-jpg'],
    canonical: 'https://www.mypdftools.it/pdf-bianco-nero',
    hreflang: { it: 'https://www.mypdftools.it/pdf-bianco-nero', de: 'https://www.mypdftools.de/pdf-schwarz-weiss' },
  },

  'unire-due-pdf': {
    slug: 'unire-due-pdf',
    toolId: 'merge-pdf',
    lang: 'it',
    domain: 'mypdftools.it',
    h1: 'Unire Due PDF in Uno Solo Online',
    metaTitle: 'Unire Due PDF Online Gratis — Combina 2 File PDF Facilmente',
    metaDescription: 'Devi combinare due file PDF in un unico documento continuo? Unisci fronte e retro o due sezioni in pochi secondi senza registrazione.',
    badge: 'Veloce',
    intro: 'La soluzione più semplice per unire due file PDF separati in un solo documento ordinato. Nessuna installazione richiesta, 100% gratuito.',
    steps: [
      { title: '1. Carica i Due PDF', desc: 'Trascina il primo e il secondo documento.' },
      { title: '2. Controlla l\'Ordine', desc: 'Assicurati che il primo file appaia prima del secondo.' },
      { title: '3. Unisci e Salva', desc: 'Clicca su unisci per ottenere il file completo.' },
    ],
    faqs: [
      { q: 'Posso invertire l\'ordine dei due PDF?', a: 'Certamente, trascina o sposta le miniature prima di procedere al salvataggio.' },
    ],
    relatedSlugs: ['unire-pdf', 'dividere-pdf', 'comprimere-pdf'],
    canonical: 'https://www.mypdftools.it/unire-due-pdf',
    hreflang: { it: 'https://www.mypdftools.it/unire-due-pdf', de: 'https://www.mypdftools.de/zwei-pdf-zusammenfuegen' },
  },

  'unire-fatture-pdf': {
    slug: 'unire-fatture-pdf',
    toolId: 'merge-pdf',
    lang: 'it',
    domain: 'mypdftools.it',
    h1: 'Unire Fatture e Ricevute PDF per Contabilità',
    metaTitle: 'Unire Fatture PDF Online — Raggruppa Documenti per Commercialista',
    metaDescription: 'Unisci le tue fatture elettroniche di cortesia e scontrini PDF in un unico fascicolo mensile o trimestrale per il tuo commercialista.',
    badge: 'Contabilità',
    intro: 'Semplifica la gestione fiscale: raggruppa fatture, note spese ed estratti conto in un comodo PDF riepilogativo con massima riservatezza.',
    steps: [
      { title: '1. Seleziona le Fatture', desc: 'Carica tutti i documenti fiscali del periodo.' },
      { title: '2. Ordina Cronologicamente', desc: 'Disponi le ricevute per data o numero progressivo.' },
      { title: '3. Scarica Fascicolo Unico', desc: 'Invia al commercialista un unico file ordinato e compatto.' },
    ],
    faqs: [
      { q: 'I dati fiscali e i codici IBAN sono al sicuro?', a: 'Sì, l\'elaborazione avviene sul tuo dispositivo e i documenti non transitano su server terzi.' },
    ],
    relatedSlugs: ['unire-pdf', 'comprimere-pdf-per-email', 'numeri-di-pagina-pdf'],
    canonical: 'https://www.mypdftools.it/unire-fatture-pdf',
    hreflang: { it: 'https://www.mypdftools.it/unire-fatture-pdf', de: 'https://www.mypdftools.de/rechnungen-pdf-zusammenfuegen' },
  },

  'unire-pdf-smartphone': {
    slug: 'unire-pdf-smartphone',
    toolId: 'merge-pdf',
    lang: 'it',
    domain: 'mypdftools.it',
    h1: 'Unire PDF da Smartphone Android e iPhone',
    metaTitle: 'Unire PDF da Cellulare Online — Gratis su iPhone e Android',
    metaDescription: 'Combina documenti PDF direttamente dal tuo telefono senza scaricare app pesanti. Funziona su Safari, Chrome e tutti i browser mobili.',
    badge: 'Mobile',
    intro: 'Unire PDF mentre sei in mobilità non è mai stato così immediato. Apri il browser del tuo smartphone, scegli i file e scarica il risultato.',
    steps: [
      { title: '1. Tocca per Scegliere i File', desc: 'Seleziona i documenti dall\'app File di iPhone o da Download di Android.' },
      { title: '2. Riordina con un Tocco', desc: 'Organizza le pagine nella sequenza corretta.' },
      { title: '3. Salva sul Telefono', desc: 'Scarica e condividi subito via WhatsApp, Telegram o email.' },
    ],
    faqs: [
      { q: 'Devo scaricare un\'applicazione da App Store o Play Store?', a: 'No, MyPdfTools funziona direttamente nel tuo browser web preferito.' },
    ],
    relatedSlugs: ['unire-pdf', 'da-jpg-a-pdf', 'firmare-pdf'],
    canonical: 'https://www.mypdftools.it/unire-pdf-smartphone',
    hreflang: { it: 'https://www.mypdftools.it/unire-pdf-smartphone', de: 'https://www.mypdftools.de/pdf-am-handy-zusammenfuegen' },
  },

  'comprimere-pdf-per-email': {
    slug: 'comprimere-pdf-per-email',
    toolId: 'compress-pdf',
    lang: 'it',
    domain: 'mypdftools.it',
    h1: 'Comprimere PDF per Allegati Email',
    metaTitle: 'Comprimere PDF per Email — Riduci Dimensioni per Inviare Allegati',
    metaDescription: 'Il tuo PDF supera il limite di 10 MB o 25 MB del provider email? Riduci il peso del file mantenendo il testo chiaro e leggibile.',
    badge: 'Email Ready',
    intro: 'Risolvi il problema degli allegati respinti per dimensioni eccessive su Gmail, Outlook o PEC comprimendo il documento in pochi secondi.',
    steps: [
      { title: '1. Carica il File Troppo Pesante', desc: 'Inserisci il documento che non riesci ad allegare.' },
      { title: '2. Ottimizzazione Immediata', desc: 'Immagini e metadati superflui vengono snelliti.' },
      { title: '3. Invia via Email', desc: 'Scarica il file leggero pronto per essere recapitato al primo tentativo.' },
    ],
    faqs: [
      { q: 'Qual è il limite tipico di allegati per le email?', a: 'I principali provider come Gmail e Outlook impongono solitamente una soglia massima tra i 20 MB e i 25 MB.' },
    ],
    relatedSlugs: ['comprimere-pdf', 'ridurre-dimensione-pdf', 'comprimere-pdf-sotto-2mb'],
    canonical: 'https://www.mypdftools.it/comprimere-pdf-per-email',
    hreflang: { it: 'https://www.mypdftools.it/comprimere-pdf-per-email', de: 'https://www.mypdftools.de/pdf-komprimieren-fuer-email' },
  },

  'comprimere-pdf-sotto-2mb': {
    slug: 'comprimere-pdf-sotto-2mb',
    toolId: 'compress-pdf',
    lang: 'it',
    domain: 'mypdftools.it',
    h1: 'Comprimere PDF sotto i 2 MB Online Gratis',
    metaTitle: 'Comprimere PDF sotto 2MB — Riduci File per Portali e Concorsi',
    metaDescription: 'Molti siti web e portali pubblici richiedono documenti sotto i 2 MB. Riduci la dimensione del tuo file PDF con facilità e precisione.',
    badge: '< 2 MB',
    intro: 'Soddisfa i requisiti di upload dei portali universitari, bancari e amministrativi comprimendo il tuo PDF al di sotto della soglia di 2 MB.',
    steps: [
      { title: '1. Seleziona il Documento', desc: 'Carica il PDF che supera la soglia di 2 megabyte.' },
      { title: '2. Compressione Avanzata', desc: 'I vettori e le illustrazioni vengono ottimizzati.' },
      { title: '3. Verifica Dimensione e Salva', desc: 'Scarica il PDF pronto per il caricamento sul portale.' },
    ],
    faqs: [
      { q: 'Come faccio a sapere quanti MB pesa il file finale?', a: 'La dimensione esatta viene mostrata immediatamente al termine della procedura di download.' },
    ],
    relatedSlugs: ['comprimere-pdf', 'ridurre-pdf-per-concorsi', 'comprimere-pdf-per-email'],
    canonical: 'https://www.mypdftools.it/comprimere-pdf-sotto-2mb',
    hreflang: { it: 'https://www.mypdftools.it/comprimere-pdf-sotto-2mb', de: 'https://www.mypdftools.de/pdf-unter-2mb-verkleinern' },
  },

  'ridurre-pdf-per-concorsi': {
    slug: 'ridurre-pdf-per-concorsi',
    toolId: 'compress-pdf',
    lang: 'it',
    domain: 'mypdftools.it',
    h1: 'Ridurre Dimensioni PDF per Concorsi Pubblici e Bandi',
    metaTitle: 'Ridurre PDF per Concorsi e Bandi Pubblici — Sotto i Limiti di Upload',
    metaDescription: 'Prepara i tuoi documenti e titoli per portali della Pubblica Amministrazione (inPA, università). Comprimi PDF senza sacrificare la leggibilità.',
    badge: 'Bandi & PA',
    intro: 'Non rischiare l\'esclusione da una graduatoria o bando pubblico a causa di file troppo pesanti. Ottimizza diplomi e certificati in totale privacy.',
    steps: [
      { title: '1. Inserisci i Certificati', desc: 'Carica le scansioni dei tuoi attestati e curriculum.' },
      { title: '2. Ottimizzazione Conforme', desc: 'Riduzione del peso mantenendo timbri e firme perfettamente nitidi.' },
      { title: '3. Carica sul Bando', desc: 'Scarica il file a norma e procedi con la domanda.' },
    ],
    faqs: [
      { q: 'I timbri e i testi piccoli rimangono leggibili?', a: 'Sì, la compressione preserva il contrasto essenziale per la verifica da parte delle commissioni d\'esame.' },
    ],
    relatedSlugs: ['comprimere-pdf-sotto-2mb', 'comprimere-pdf', 'unire-pdf'],
    canonical: 'https://www.mypdftools.it/ridurre-pdf-per-concorsi',
    hreflang: { it: 'https://www.mypdftools.it/ridurre-pdf-per-concorsi', de: 'https://www.mypdftools.de/pdf-fuer-bewerbung-verkleinern' },
  },

  'firmare-pdf-digitalmente-gratis': {
    slug: 'firmare-pdf-digitalmente-gratis',
    toolId: 'sign-pdf',
    lang: 'it',
    domain: 'mypdftools.it',
    h1: 'Firmare PDF Digitalmente Online Gratis',
    metaTitle: 'Firmare PDF Digitalmente Gratis — Aggiungi Firma Senza Stampare',
    metaDescription: 'Apponi la tua firma autografa o digita il tuo nome su contratti, liberatorie e moduli PDF. Rapido, sicuro e a costo zero.',
    badge: 'Firma Facile',
    intro: 'Dimentica stampanti e scanner. Disegna la tua firma sullo schermo del tuo computer o smartphone e applicala al documento in pochi istanti.',
    steps: [
      { title: '1. Apri il Documento', desc: 'Carica il contratto o modulo da firmare.' },
      { title: '2. Crea o Disegna la Firma', desc: 'Usa il mouse o il dito touch per tracciare la tua firma.' },
      { title: '3. Posiziona e Scarica', desc: 'Trascina la firma sullo spazio apposito e salva il PDF firmato.' },
    ],
    faqs: [
      { q: 'La mia firma viene archiviata sui vostri server?', a: 'Assolutamente no. La firma viene impressa localmente nella memoria del tuo browser.' },
    ],
    relatedSlugs: ['firmare-pdf', 'firmare-contratto-pdf', 'modificare-pdf'],
    canonical: 'https://www.mypdftools.it/firmare-pdf-digitalmente-gratis',
    hreflang: { it: 'https://www.mypdftools.it/firmare-pdf-digitalmente-gratis', de: 'https://www.mypdftools.de/pdf-digital-unterschreiben-kostenlos' },
  },

  'firmare-contratto-pdf': {
    slug: 'firmare-contratto-pdf',
    toolId: 'sign-pdf',
    lang: 'it',
    domain: 'mypdftools.it',
    h1: 'Firmare Contratti PDF Online in Modo Sicuro',
    metaTitle: 'Firmare Contratti PDF Online — Firma Digitale per Accordi e Contratti',
    metaDescription: 'Firma accordi di locazione, contratti di lavoro e preventivi in PDF senza condividere dati sensibili con terze parti.',
    badge: 'Contratti',
    intro: 'Concludi accordi e contratti professionali in tempo reale con la massima garanzia di riservatezza per te e i tuoi clienti.',
    steps: [
      { title: '1. Carica il Contratto', desc: 'Seleziona l\'accordo commerciale o di lavoro in formato PDF.' },
      { title: '2. Apponi Firma e Data', desc: 'Inserisci firma autografa e indicazione temporale sulla riga predisposta.' },
      { title: '3. Invia la Copia Firmata', desc: 'Scarica il documento definitivo da trasmettere alla controparte.' },
    ],
    faqs: [
      { q: 'Ha valore legale?', a: 'La firma elettronica semplice è ampiamente impiegata per accordi commerciali, conferme d\'ordine e contratti privati secondo il regolamento eIDAS.' },
    ],
    relatedSlugs: ['firmare-pdf-digitalmente-gratis', 'firmare-pdf', 'proteggere-pdf'],
    canonical: 'https://www.mypdftools.it/firmare-contratto-pdf',
    hreflang: { it: 'https://www.mypdftools.it/firmare-contratto-pdf', de: 'https://www.mypdftools.de/vertrag-pdf-unterschreiben' },
  },

  'scansioni-in-pdf': {
    slug: 'scansioni-in-pdf',
    toolId: 'jpg-to-pdf',
    lang: 'it',
    domain: 'mypdftools.it',
    h1: 'Convertire Scansioni in Documenti PDF',
    metaTitle: 'Convertire Scansioni in PDF Gratis — Raggruppa Fogli Scannerizzati',
    metaDescription: 'Hai fogli o documenti scansionati come singole immagini? Uniscili in un unico file PDF ordinato e pronto per la stampa o l\'invio.',
    badge: 'Scansioni',
    intro: 'Trasforma scansioni cartacee disordinate in un fascicolo PDF leggibile ed elegante con margini uniformi e perfetta rotazione.',
    steps: [
      { title: '1. Carica i Fogli Scannerizzati', desc: 'Trascina tutte le scansioni (JPG, PNG).' },
      { title: '2. Organizza la Sequenza', desc: 'Verifica la successione delle pagine.' },
      { title: '3. Salva Documento PDF', desc: 'Scarica il file completo in alta risoluzione.' },
    ],
    faqs: [
      { q: 'Posso ruotare le scansioni capovolte?', a: 'Sì, puoi ruotare facilmente le singole pagine prima di completare la generazione del PDF.' },
    ],
    relatedSlugs: ['da-jpg-a-pdf', 'convertire-foto-in-pdf', 'unire-pdf'],
    canonical: 'https://www.mypdftools.it/scansioni-in-pdf',
    hreflang: { it: 'https://www.mypdftools.it/scansioni-in-pdf', de: 'https://www.mypdftools.de/scans-in-pdf-umwandeln' },
  },

  'screenshot-in-pdf': {
    slug: 'screenshot-in-pdf',
    toolId: 'jpg-to-pdf',
    lang: 'it',
    domain: 'mypdftools.it',
    h1: 'Convertire Screenshot in PDF Online',
    metaTitle: 'Convertire Screenshot in PDF Gratis — Crea PDF da Catture Schermo',
    metaDescription: 'Trasforma screenshot del PC o dello smartphone in un comodo PDF. Perfetto per guide, tutorial o prove di transazioni bancarie.',
    badge: 'Screenshot',
    intro: 'Crea velocemente report e documentazioni unendo le tue schermate in un PDF coerente e facile da consultare su qualsiasi schermo.',
    steps: [
      { title: '1. Seleziona gli Screenshot', desc: 'Carica le catture schermo salvate sul tuo dispositivo.' },
      { title: '2. Ordina gli Scatti', desc: 'Organizza i passaggi nella sequenza desiderata.' },
      { title: '3. Genera PDF', desc: 'Salva il PDF finale con layout ottimizzato.' },
    ],
    faqs: [
      { q: 'Gli screenshot perdono nitidezza?', a: 'No, i pixel degli screenshot rimangono nitidi e leggibili al 100%.' },
    ],
    relatedSlugs: ['da-jpg-a-pdf', 'da-png-a-pdf', 'unire-pdf'],
    canonical: 'https://www.mypdftools.it/screenshot-in-pdf',
    hreflang: { it: 'https://www.mypdftools.it/screenshot-in-pdf', de: 'https://www.mypdftools.de/screenshot-in-pdf-umwandeln' },
  },

  'ricevute-in-pdf': {
    slug: 'ricevute-in-pdf',
    toolId: 'jpg-to-pdf',
    lang: 'it',
    domain: 'mypdftools.it',
    h1: 'Convertire Scontrini e Ricevute in PDF',
    metaTitle: 'Convertire Ricevute in PDF Gratis — Crea Note Spese PDF da Foto',
    metaDescription: 'Fotografa ricevute, pedaggi e scontrini con il tuo telefono e trasformali istantaneamente in un PDF per il rimborso spese aziendale.',
    badge: 'Note Spese',
    intro: 'Evita di smarrire giustificativi cartacei: converti subito le foto degli scontrini in un pratico foglio PDF da allegare alla tua nota spese.',
    steps: [
      { title: '1. Carica le Foto degli Scontrini', desc: 'Seleziona le foto delle ricevute scattate dal cellulare.' },
      { title: '2. Regola Margini', desc: 'Allinea i bordi per una presentazione pulita.' },
      { title: '3. Scarica Nota Spese PDF', desc: 'Ottieni il file pronto per l\'amministrazione.' },
    ],
    faqs: [
      { q: 'Posso aggiungere più ricevute su un singolo documento?', a: 'Certamente, puoi combinare tutti gli scontrini del viaggio o del mese in una sola volta.' },
    ],
    relatedSlugs: ['da-jpg-a-pdf', 'unire-fatture-pdf', 'comprimere-pdf'],
    canonical: 'https://www.mypdftools.it/ricevute-in-pdf',
    hreflang: { it: 'https://www.mypdftools.it/ricevute-in-pdf', de: 'https://www.mypdftools.de/belege-in-pdf-umwandeln' },
  },

  'guide/come-firmare-un-pdf-senza-stampare': {
    slug: 'guide/come-firmare-un-pdf-senza-stampare',
    toolId: 'sign-pdf',
    lang: 'it',
    domain: 'mypdftools.it',
    h1: 'Come Firmare un PDF Senza Stampare né Scansionare',
    metaTitle: 'Come Firmare un PDF Senza Stampare — Guida Pratica 2026',
    metaDescription: 'La guida completa passo dopo passo per firmare digitalmente qualsiasi documento PDF da computer o cellulare in 60 secondi.',
    badge: 'Guida Passo Passo',
    intro: 'Stampare un foglio solo per firmarlo a penna e poi doverlo riscansire è un inutile spreco di tempo e carta. Ecco come apporre la tua firma originale direttamente dallo schermo in 3 semplici passaggi.',
    steps: [
      { title: 'Passo 1: Apri il Tool di Firma', desc: 'Accedi allo strumento gratuito di firma PDF su MyPdfTools.' },
      { title: 'Passo 2: Traccia la tua Firma', desc: 'Disegna la firma con il mouse, con la penna touch o semplicemente con il dito dal cellulare.' },
      { title: 'Passo 3: Posiziona e Salva', desc: 'Trascina la firma nel riquadro apposito, ridimensionala se necessario e scarica il PDF ultimato.' },
    ],
    faqs: [
      { q: 'Serve installare programmi come Adobe Acrobat Reader?', a: 'No, tutto il procedimento avviene online all\'interno del tuo browser abituale senza plugin esterni.' },
      { q: 'I miei dati rimangono privati?', a: 'Sì, la firma non lascia mai il tuo dispositivo e non viene registrata su alcun database esterno.' },
    ],
    relatedSlugs: ['firmare-pdf', 'firmare-contratto-pdf', 'firmare-pdf-digitalmente-gratis'],
    canonical: 'https://www.mypdftools.it/guide/come-firmare-un-pdf-senza-stampare',
    hreflang: { it: 'https://www.mypdftools.it/guide/come-firmare-un-pdf-senza-stampare', de: 'https://www.mypdftools.de/ratgeber/pdf-ohne-ausdrucken-unterschreiben' },
  },

  'guide/come-proteggere-un-pdf-con-password': {
    slug: 'guide/come-proteggere-un-pdf-con-password',
    toolId: 'protect-pdf',
    lang: 'it',
    domain: 'mypdftools.it',
    h1: 'Come Proteggere un PDF con Password e Crittografia',
    metaTitle: 'Come Proteggere un PDF con Password — Guida alla Sicurezza',
    metaDescription: 'Scopri come crittografare i tuoi file PDF sensibili con password sicura a 128 o 256 bit per impedire accessi non autorizzati.',
    badge: 'Guida Sicurezza',
    intro: 'Inviare documenti contenenti dati bancari, cartelle cliniche o accordi riservati richiede la massima cautela. Questa guida illustra come applicare una cifratura robusta ai tuoi file PDF.',
    steps: [
      { title: 'Passo 1: Carica il PDF', desc: 'Seleziona il documento da mettere in sicurezza.' },
      { title: 'Passo 2: Imposta una Password Robusta', desc: 'Digita una combinazione di lettere maiuscole, minuscole, numeri e simboli.' },
      { title: 'Passo 3: Scarica il PDF Cifrato', desc: 'Il documento richiederà la chiave d\'accesso ogni volta che verrà aperto.' },
    ],
    faqs: [
      { q: 'Chi può aprire il file dopo la cifratura?', a: 'Soltanto chi è a conoscenza della password corretta potrà visualizzare il contenuto.' },
    ],
    relatedSlugs: ['proteggere-pdf', 'sbloccare-pdf', 'oscurare-pdf'],
    canonical: 'https://www.mypdftools.it/guide/come-proteggere-un-pdf-con-password',
    hreflang: { it: 'https://www.mypdftools.it/guide/come-proteggere-un-pdf-con-password', de: 'https://www.mypdftools.de/ratgeber/pdf-mit-passwort-schuetzen' },
  },

  'guide/come-estrarre-pagine-da-un-pdf': {
    slug: 'guide/come-estrarre-pagine-da-un-pdf',
    toolId: 'extract-pages',
    lang: 'it',
    domain: 'mypdftools.it',
    h1: 'Come Estrarre Pagine da un PDF e Salvarle Separatamente',
    metaTitle: 'Come Estrarre Pagine da un PDF — Guida Completa e Semplice',
    metaDescription: 'Hai bisogno solo di alcune pagine di un lungo documento PDF? Ecco la procedura per estrarre e salvare solo i fogli che ti interessano.',
    badge: 'Guida Pratica',
    intro: 'Spesso un manuale o un contratto contiene decine di pagine, ma a te ne serve solo una o due. Scopri come isolare i fogli rilevanti senza perdere formattazione.',
    steps: [
      { title: 'Passo 1: Apri il PDF', desc: 'Carica il documento multipagina nello strumento di estrazione.' },
      { title: 'Passo 2: Clicca sulle Pagine Desiderate', desc: 'Seleziona graficamente le pagine da isolare o digita l\'intervallo numerico.' },
      { title: 'Passo 3: Esporta il Nuovo Documento', desc: 'Scarica all\'istante il PDF snello contenente solo le pagine selezionate.' },
    ],
    faqs: [
      { q: 'Il PDF originale viene modificato o cancellato?', a: 'No, il tuo file sorgente resta intatto sul tuo computer; viene generato un nuovo file indipendente.' },
    ],
    relatedSlugs: ['estrarre-pagine-pdf', 'dividere-pdf', 'eliminare-pagine-pdf'],
    canonical: 'https://www.mypdftools.it/guide/come-estrarre-pagine-da-un-pdf',
    hreflang: { it: 'https://www.mypdftools.it/guide/come-estrarre-pagine-da-un-pdf', de: 'https://www.mypdftools.de/ratgeber/einzelne-seiten-aus-pdf-speichern' },
  },

  'guide/come-convertire-word-in-pdf-gratis': {
    slug: 'guide/come-convertire-word-in-pdf-gratis',
    toolId: 'word-to-pdf',
    lang: 'it',
    domain: 'mypdftools.it',
    h1: 'Come Convertire un File Word in PDF Senza Microsoft Office',
    metaTitle: 'Come Convertire Word in PDF Gratis — Guida Senza Office',
    metaDescription: 'Non hai Word installato sul tuo computer? Ecco come trasformare qualsiasi file DOC e DOCX in un PDF perfetto senza pagare licenze.',
    badge: 'Guida Office',
    intro: 'Inviare un documento in formato Word può comportare problemi di visualizzazione se il destinatario usa versioni diverse di Office o smartphone. Convertirlo in PDF garantisce che il layout rimanga identico.',
    steps: [
      { title: 'Passo 1: Seleziona il Documento Word', desc: 'Carica il file .docx o .doc.' },
      { title: 'Passo 2: Elaborazione Automatica', desc: 'La formattazione e gli stili vengono tradotti nello standard PDF.' },
      { title: 'Passo 3: Scarica il PDF Pronto', desc: 'Invia o stampa il tuo documento senza sorprese.' },
    ],
    faqs: [
      { q: 'Le immagini e le tabelle mantengono la posizione esatta?', a: 'Sì, la conversione preserva l\'impaginazione impostata nel documento originale.' },
    ],
    relatedSlugs: ['da-word-a-pdf', 'da-pdf-a-word', 'da-excel-a-pdf'],
    canonical: 'https://www.mypdftools.it/guide/come-convertire-word-in-pdf-gratis',
    hreflang: { it: 'https://www.mypdftools.it/guide/come-convertire-word-in-pdf-gratis', de: 'https://www.mypdftools.de/ratgeber/word-in-pdf-umwandeln-kostenlos' },
  },

  'guide/come-ruotare-e-salvare-un-pdf': {
    slug: 'guide/come-ruotare-e-salvare-un-pdf',
    toolId: 'rotate-pdf',
    lang: 'it',
    domain: 'mypdftools.it',
    h1: 'Come Ruotare un PDF e Salvarlo Definitivamente',
    metaTitle: 'Come Ruotare un PDF e Salvarlo — Guida Rotazione Permanente',
    metaDescription: 'Hai una pagina PDF al contrario o storta? Ecco come ruotarla di 90° o 180° e salvare la nuova visualizzazione in modo permanente.',
    badge: 'Guida Rotazione',
    intro: 'A volte un lettore PDF ruota una pagina solo temporaneamente, ma al successivo riavvio torna storta. Questa guida ti insegna come salvare la rotazione in modo irreversibile e corretto.',
    steps: [
      { title: 'Passo 1: Carica il PDF', desc: 'Apri il file con le pagine ruotate in modo scorretto.' },
      { title: 'Passo 2: Clicca su Ruota', desc: 'Gira le singole pagine o l\'intero documento di 90° in senso orario o antiorario.' },
      { title: 'Passo 3: Salva Definitivamente', desc: 'Scarica il nuovo file: si aprirà sempre nel verso corretto su qualsiasi programma.' },
    ],
    faqs: [
      { q: 'Posso ruotare solo una singola pagina lasciando le altre invariate?', a: 'Assolutamente sì, puoi selezionare selettivamente solo le pagine che necessitano di correzione.' },
    ],
    relatedSlugs: ['ruotare-pdf', 'organizzare-pdf', 'eliminare-pagine-pdf'],
    canonical: 'https://www.mypdftools.it/guide/come-ruotare-e-salvare-un-pdf',
    hreflang: { it: 'https://www.mypdftools.it/guide/come-ruotare-e-salvare-un-pdf', de: 'https://www.mypdftools.de/ratgeber/pdf-dauerhaft-drehen-und-speichern' },
  },

  /* ==========================================================================
     GERMAN ADDITIONAL ROUTES (mypdftools.de)
     ========================================================================== */
  'powerpoint-in-pdf': {
    slug: 'powerpoint-in-pdf',
    toolId: 'powerpoint-to-pdf',
    lang: 'de',
    domain: 'mypdftools.de',
    h1: 'PowerPoint in PDF umwandeln online kostenlos',
    metaTitle: 'PowerPoint in PDF umwandeln — PPT & PPTX zu PDF Konverter',
    metaDescription: 'Konvertieren Sie PowerPoint-Präsentationen (PPTX, PPT) direkt im Browser in PDF. 100% kostenlos und ohne Server-Upload.',
    badge: 'Präsentationen',
    intro: 'Sichern Sie das Layout Ihrer Vortragsfolien: Konvertieren Sie PowerPoint-Präsentationen in saubere PDFs für zuverlässiges Drucken und Versenden.',
    steps: [
      { title: 'Schritt 1: Präsentation wählen', desc: 'Laden Sie Ihre PPTX- oder PPT-Datei hoch.' },
      { title: 'Schritt 2: Automatische Umwandlung', desc: 'Folien werden originalgetreu in PDF-Seiten übertragen.' },
      { title: 'Schritt 3: PDF herunterladen', desc: 'Speichern Sie das fertige PDF-Dokument auf Ihrem Rechner.' },
    ],
    faqs: [
      { q: 'Bleiben Schriftarten und Formatierungen erhalten?', a: 'Ja, die visuelle Darstellung der Folien wird präzise in das PDF-Format übernommen.' },
    ],
    relatedSlugs: ['word-in-pdf', 'excel-in-pdf', 'pdf-in-powerpoint'],
    canonical: 'https://www.mypdftools.de/powerpoint-in-pdf',
    hreflang: { it: 'https://www.mypdftools.it/da-powerpoint-a-pdf', de: 'https://www.mypdftools.de/powerpoint-in-pdf' },
  },

  'pdf-in-powerpoint': {
    slug: 'pdf-in-powerpoint',
    toolId: 'pdf-to-powerpoint',
    lang: 'de',
    domain: 'mypdftools.de',
    h1: 'PDF in PowerPoint umwandeln kostenlos',
    metaTitle: 'PDF in PowerPoint umwandeln — PDF zu PPTX Präsentation',
    metaDescription: 'Verwandeln Sie PDF-Dokumente und Foliensätze zurück in bearbeitbare PowerPoint PPTX-Dateien. Schnell, sicher und privat.',
    badge: 'PPTX',
    intro: 'Extrahieren Sie Folieninhalte aus Ihren PDFs, um sie direkt in PowerPoint, Keynote oder Google Präsentationen weiterzubearbeiten.',
    steps: [
      { title: 'Schritt 1: PDF öffnen', desc: 'Wählen Sie das PDF mit den Folien aus.' },
      { title: 'Schritt 2: Folien-Erstellung', desc: 'Jede PDF-Seite wird in eine hochauflösende Folie überführt.' },
      { title: 'Schritt 3: PPTX sichern', desc: 'Laden Sie die fertige Präsentation herunter.' },
    ],
    faqs: [
      { q: 'Werden sensible Folien auf Server hochgeladen?', a: 'Nein, die Verarbeitung erfolgt komplett lokal in Ihrem Browser.' },
    ],
    relatedSlugs: ['powerpoint-in-pdf', 'pdf-in-word', 'pdf-in-jpg'],
    canonical: 'https://www.mypdftools.de/pdf-in-powerpoint',
    hreflang: { it: 'https://www.mypdftools.it/da-pdf-a-powerpoint', de: 'https://www.mypdftools.de/pdf-in-powerpoint' },
  },

  'png-in-pdf': {
    slug: 'png-in-pdf',
    toolId: 'jpg-to-pdf',
    lang: 'de',
    domain: 'mypdftools.de',
    h1: 'PNG in PDF umwandeln online kostenlos',
    metaTitle: 'PNG in PDF umwandeln — Bilder als PDF speichern',
    metaDescription: 'Wandeln Sie PNG-Bilder und Grafiken in kompakte PDF-Dokumente um. Mehrere Bilder zusammenfügen, kein Upload nötig.',
    badge: 'PNG',
    intro: 'Erstellen Sie professionelle PDF-Dokumente aus Ihren PNG-Grafiken, Screenshots oder Logos mit optimaler Bildqualität.',
    steps: [
      { title: 'Schritt 1: PNG-Dateien auswählen', desc: 'Ziehen Sie ein oder mehrere PNG-Bilder in den Bereich.' },
      { title: 'Schritt 2: Seiten einrichten', desc: 'Bestimmen Sie Reihenfolge, Ausrichtung und Ränder.' },
      { title: 'Schritt 3: PDF herunterladen', desc: 'Erhalten Sie sofort Ihr neues PDF-Dokument.' },
    ],
    faqs: [
      { q: 'Bleibt die Bildschärfe von Texten in PNGs erhalten?', a: 'Ja, PNG-Bilder werden verlustfrei eingebettet.' },
    ],
    relatedSlugs: ['jpg-in-pdf', 'fotos-in-pdf-umwandeln', 'pdf-in-png'],
    canonical: 'https://www.mypdftools.de/png-in-pdf',
    hreflang: { it: 'https://www.mypdftools.it/da-png-a-pdf', de: 'https://www.mypdftools.de/png-in-pdf' },
  },

  'pdf-in-png': {
    slug: 'pdf-in-png',
    toolId: 'pdf-to-jpg',
    lang: 'de',
    domain: 'mypdftools.de',
    h1: 'PDF in PNG umwandeln in hoher Auflösung',
    metaTitle: 'PDF in PNG umwandeln — PDF-Seiten als scharfe PNG-Bilder',
    metaDescription: 'Konvertieren Sie PDF-Seiten in scharfe PNG-Grafiken. Ideal für Webgrafiken, Präsentationen und Dokumentationen.',
    badge: 'PNG HD',
    intro: 'Exportieren Sie Seiten aus PDF-Dokumenten als hochauflösende PNG-Dateien mit gestochen scharfem Text und sauberen Kontrasten.',
    steps: [
      { title: 'Schritt 1: PDF hochladen', desc: 'Wählen Sie das gewünschte Dokument aus.' },
      { title: 'Schritt 2: HD-Rendering', desc: 'Die Seiten werden verlustfrei in Grafikdaten gerendert.' },
      { title: 'Schritt 3: PNGs herunterladen', desc: 'Speichern Sie einzelne Bilder oder alle Seiten auf einmal.' },
    ],
    faqs: [
      { q: 'Warum PNG statt JPG für PDF-Seiten?', a: 'PNG komprimiert Text und geometrische Formen verlustfrei ohne unschöne JPG-Artefakte.' },
    ],
    relatedSlugs: ['pdf-in-jpg', 'png-in-pdf', 'pdf-seiten-extrahieren'],
    canonical: 'https://www.mypdftools.de/pdf-in-png',
    hreflang: { it: 'https://www.mypdftools.it/da-pdf-a-png', de: 'https://www.mypdftools.de/pdf-in-png' },
  },

  'pdf-in-text': {
    slug: 'pdf-in-text',
    toolId: 'pdf-to-markdown',
    lang: 'de',
    domain: 'mypdftools.de',
    h1: 'Text aus PDF extrahieren online kostenlos',
    metaTitle: 'Text aus PDF extrahieren — PDF in TXT & Text umwandeln',
    metaDescription: 'Kopieren Sie reinen Text aus PDF-Dokumenten ohne mühsames Abtippen. Funktioniert sicher und lokal im Browser.',
    badge: 'Text TXT',
    intro: 'Extrahieren Sie Absätze, Tabellendaten und Notizen aus PDFs in wenigen Augenblicken zur Weiterverarbeitung in Textprogrammen.',
    steps: [
      { title: 'Schritt 1: PDF öffnen', desc: 'Wählen Sie die PDF-Datei mit dem Text aus.' },
      { title: 'Schritt 2: Textextraktion', desc: 'Die Textdaten werden in Echtzeit ausgelesen.' },
      { title: 'Schritt 3: Kopieren oder Speichern', desc: 'Kopieren Sie den Text in die Zwischenablage.' },
    ],
    faqs: [
      { q: 'Werden Zeilenumbrüche beibehalten?', a: 'Ja, die logische Absatzstruktur bleibt weitestgehend erhalten.' },
    ],
    relatedSlugs: ['pdf-in-markdown', 'pdf-in-word', 'pdf-bearbeiten'],
    canonical: 'https://www.mypdftools.de/pdf-in-text',
    hreflang: { it: 'https://www.mypdftools.it/da-pdf-a-testo', de: 'https://www.mypdftools.de/pdf-in-text' },
  },

  'ocr-pdf-online-kostenlos': {
    slug: 'ocr-pdf-online-kostenlos',
    toolId: 'pdf-to-markdown',
    lang: 'de',
    domain: 'mypdftools.de',
    h1: 'OCR PDF online kostenlos — Texterkennung für Scans',
    metaTitle: 'OCR PDF online kostenlos — Texterkennung für gescannte PDFs',
    metaDescription: 'Erkennen Sie Text in gescannten Dokumenten und Bild-PDFs mit lokaler OCR-Technologie. 100% datenschutzkonform.',
    badge: 'OCR',
    intro: 'Haben Sie einen Scan, in dem sich kein Text markieren lässt? Nutzen Sie optische Zeichenerkennung, um den Inhalt durchsuchbar zu machen.',
    steps: [
      { title: 'Schritt 1: Scan auswählen', desc: 'Laden Sie das eingescannte PDF hoch.' },
      { title: 'Schritt 2: OCR-Analyse', desc: 'Schriftzeichen werden automatisch erkannt.' },
      { title: 'Schritt 3: Text verwenden', desc: 'Kopieren oder speichern Sie den erkannten Text.' },
    ],
    faqs: [
      { q: 'Verlassen meine Scans mein Gerät?', a: 'Nein, die Texterkennung erfolgt datenschutzsicher direkt auf Ihrem Endgerät.' },
    ],
    relatedSlugs: ['pdf-in-text', 'pdf-in-markdown', 'pdf-in-word'],
    canonical: 'https://www.mypdftools.de/ocr-pdf-online-kostenlos',
    hreflang: { it: 'https://www.mypdftools.it/ocr-pdf-online', de: 'https://www.mypdftools.de/ocr-pdf-online-kostenlos' },
  },

  'pdf-zuschneiden': {
    slug: 'pdf-zuschneiden',
    toolId: 'organize-pdf',
    lang: 'de',
    domain: 'mypdftools.de',
    h1: 'PDF zuschneiden online — Ränder und Seiten anpassen',
    metaTitle: 'PDF zuschneiden online kostenlos — Ränder verkleinern',
    metaDescription: 'Schneiden Sie weiße Ränder und überflüssige Randbereiche aus PDF-Dateien heraus. Perfekt für E-Reader und Ausdrucke.',
    badge: 'Zuschneiden',
    intro: 'Entfernen Sie störende breite Ränder, um Dokumente auf Tablets, Smartphones oder Bildschirmen optimal lesbar zu machen.',
    steps: [
      { title: 'Schritt 1: PDF laden', desc: 'Wählen Sie das zuzuschneidende Dokument.' },
      { title: 'Schritt 2: Rahmen definieren', desc: 'Legen Sie den sichtbaren Bereich fest.' },
      { title: 'Schritt 3: Zugeschnittenes PDF sichern', desc: 'Laden Sie das optimierte Dokument herunter.' },
    ],
    faqs: [
      { q: 'Werden Texte beim Zuschneiden unscharf?', a: 'Nein, die Vektordaten bleiben absolut unverändert.' },
    ],
    relatedSlugs: ['pdf-organisieren', 'pdf-seiten-loeschen', 'pdf-drehen'],
    canonical: 'https://www.mypdftools.de/pdf-zuschneiden',
    hreflang: { it: 'https://www.mypdftools.it/ritagliare-pdf', de: 'https://www.mypdftools.de/pdf-zuschneiden' },
  },

  'pdf-abflachen': {
    slug: 'pdf-abflachen',
    toolId: 'generic-tool',
    lang: 'de',
    domain: 'mypdftools.de',
    h1: 'PDF abflachen online (Flatten PDF)',
    metaTitle: 'PDF abflachen online kostenlos — Formulare & Unterschriften fixieren',
    metaDescription: 'Fixieren Sie ausgefüllte Formularfelder, Anmerkungen und Unterschriften in PDFs, sodass sie nicht mehr veränderbar sind.',
    badge: 'Flatten',
    intro: 'Sichern Sie ausgefüllte Anträge: Durch das Abflachen werden interaktive Formularfelder dauerhaft in die Grafikebene integriert.',
    steps: [
      { title: 'Schritt 1: Formular-PDF öffnen', desc: 'Laden Sie das ausgefüllte Dokument hoch.' },
      { title: 'Schritt 2: Ebenen verschmelzen', desc: 'Felder und Unterschriften werden fest eingebrannt.' },
      { title: 'Schritt 3: Sicheres PDF sichern', desc: 'Speichern Sie das unveränderbare Dokument ab.' },
    ],
    faqs: [
      { q: 'Was bewirkt das Abflachen genau?', a: 'Es verhindert, dass andere Personen Eingaben in Formularen nachträglich überschreiben können.' },
    ],
    relatedSlugs: ['pdf-unterschreiben', 'pdf-schuetzen', 'pdf-bearbeiten'],
    canonical: 'https://www.mypdftools.de/pdf-abflachen',
    hreflang: { it: 'https://www.mypdftools.it/appiattire-pdf', de: 'https://www.mypdftools.de/pdf-abflachen' },
  },

  'pdf-schwaerzen': {
    slug: 'pdf-schwaerzen',
    toolId: 'generic-tool',
    lang: 'de',
    domain: 'mypdftools.de',
    h1: 'PDF schwärzen online — Sensible Daten unkenntlich machen',
    metaTitle: 'PDF schwärzen online — DSGVO-konform sensible Daten löschen',
    metaDescription: 'Entfernen Sie persönliche Daten, Kontonummern und vertrauliche Informationen dauerhaft aus PDF-Dateien vor der Weitergabe.',
    badge: 'DSGVO Schutz',
    intro: 'Schwärzen Sie vertrauliche Passagen in Verträgen und Dokumenten absolut sicher und unwiderruflich direkt in Ihrem Browser.',
    steps: [
      { title: 'Schritt 1: Dokument öffnen', desc: 'Laden Sie das vertrauliche PDF hoch.' },
      { title: 'Schritt 2: Bereiche schwärzen', desc: 'Markieren Sie schützenswerte Namen und Nummern.' },
      { title: 'Schritt 3: Anonymisiertes PDF sichern', desc: 'Laden Sie die bereinigte Version herunter.' },
    ],
    faqs: [
      { q: 'Lässt sich geschwärzter Text wiederherstellen?', a: 'Nein, die zugrunde liegenden Textdaten werden vollständig aus der Datei getilgt.' },
    ],
    relatedSlugs: ['pdf-schuetzen', 'pdf-abflachen', 'pdf-bearbeiten'],
    canonical: 'https://www.mypdftools.de/pdf-schwaerzen',
    hreflang: { it: 'https://www.mypdftools.it/oscurare-pdf', de: 'https://www.mypdftools.de/pdf-schwaerzen' },
  },

  'pdf-reparieren': {
    slug: 'pdf-reparieren',
    toolId: 'generic-tool',
    lang: 'de',
    domain: 'mypdftools.de',
    h1: 'Beschädigte PDF-Datei reparieren online',
    metaTitle: 'PDF reparieren online kostenlos — Defekte PDF-Dateien retten',
    metaDescription: 'Können Sie Ihr PDF nicht mehr öffnen? Reparieren Sie defekte Header, beschädigte XREF-Tabellen und retten Sie Ihre Dokumente.',
    badge: 'Rettung',
    intro: 'Fehlermeldung beim Öffnen? Rekonstruieren Sie beschädigte PDF-Strukturen und stellen Sie Seiten und Inhalte schnell wieder her.',
    steps: [
      { title: 'Schritt 1: Defektes PDF wählen', desc: 'Laden Sie die Datei hoch, die Fehler meldet.' },
      { title: 'Schritt 2: Struktur-Reparatur', desc: 'Intakte Objekte und Seiten werden neu indexiert.' },
      { title: 'Schritt 3: Gerettetes PDF öffnen', desc: 'Speichern Sie die reparierte Version.' },
    ],
    faqs: [
      { q: 'Können alle beschädigten PDFs gerettet werden?', a: 'Solange die eigentlichen Text- und Bildblöcke nicht überschrieben wurden, ist die Erfolgsquote sehr hoch.' },
    ],
    relatedSlugs: ['pdf-entsperren', 'pdf-organisieren', 'pdf-zusammenfuegen'],
    canonical: 'https://www.mypdftools.de/pdf-reparieren',
    hreflang: { it: 'https://www.mypdftools.it/riparare-pdf', de: 'https://www.mypdftools.de/pdf-reparieren' },
  },

  'pdf-vergleichen': {
    slug: 'pdf-vergleichen',
    toolId: 'generic-tool',
    lang: 'de',
    domain: 'mypdftools.de',
    h1: 'Zwei PDF-Dateien vergleichen online',
    metaTitle: 'Zwei PDF-Dateien vergleichen online — Unterschiede hervorheben',
    metaDescription: 'Finden Sie Unterschiede zwischen zwei Versionen eines PDF-Dokuments. Erkennen Sie Änderungen an Texten und Klauseln sofort.',
    badge: 'Diff Check',
    intro: 'Prüfen Sie Vertragsentwürfe und Revisionsstände im Detail. Erkennen Sie auf einen Blick, welche Passagen geändert oder gestrichen wurden.',
    steps: [
      { title: 'Schritt 1: Beide Versionen laden', desc: 'Legen Sie Original und Überarbeitung fest.' },
      { title: 'Schritt 2: Abweichungen analysieren', desc: 'Abweichungen werden farblich markiert.' },
      { title: 'Schritt 3: Prüfergebnis einsehen', desc: 'Beurteilen Sie die Änderungen vor der Freigabe.' },
    ],
    faqs: [
      { q: 'Werden auch Zahlen- und Preisänderungen erfasst?', a: 'Ja, jede noch so kleine typografische Abweichung wird aufgedeckt.' },
    ],
    relatedSlugs: ['pdf-bearbeiten', 'pdf-zusammenfuegen', 'pdf-unterschreiben'],
    canonical: 'https://www.mypdftools.de/pdf-vergleichen',
    hreflang: { it: 'https://www.mypdftools.it/confrontare-pdf', de: 'https://www.mypdftools.de/pdf-vergleichen' },
  },

  'pdf-schwarz-weiss': {
    slug: 'pdf-schwarz-weiss',
    toolId: 'generic-tool',
    lang: 'de',
    domain: 'mypdftools.de',
    h1: 'PDF in Schwarz-Weiß (Graustufen) umwandeln',
    metaTitle: 'PDF in Schwarz-Weiß umwandeln — Graustufen für sparsamen Druck',
    metaDescription: 'Konvertieren Sie farbige PDFs in Graustufen. Sparen Sie teure Druckertinte und reduzieren Sie die Dateigröße.',
    badge: 'Graustufen',
    intro: 'Bereiten Sie Skripte und Dokumente für den kostengünstigen Laserdruck vor, indem Sie alle Farben in saubere Graustufen überführen.',
    steps: [
      { title: 'Schritt 1: Farbiges PDF laden', desc: 'Wählen Sie das umzuwandelnde Dokument.' },
      { title: 'Schritt 2: Farbraum anpassen', desc: 'RGB- und CMYK-Bilder werden in Grautöne umgerechnet.' },
      { title: 'Schritt 3: Schwarz-Weiß-PDF sichern', desc: 'Laden Sie die druckfertige Datei herunter.' },
    ],
    faqs: [
      { q: 'Sinkt dadurch auch das Dateivolumen?', a: 'Häufig ja, da bei Graustufenbildern weniger Farbkanäle gespeichert werden müssen.' },
    ],
    relatedSlugs: ['pdf-komprimieren', 'pdf-verkleinern', 'pdf-in-jpg'],
    canonical: 'https://www.mypdftools.de/pdf-schwarz-weiss',
    hreflang: { it: 'https://www.mypdftools.it/pdf-bianco-nero', de: 'https://www.mypdftools.de/pdf-schwarz-weiss' },
  },

  'zwei-pdf-zusammenfuegen': {
    slug: 'zwei-pdf-zusammenfuegen',
    toolId: 'merge-pdf',
    lang: 'de',
    domain: 'mypdftools.de',
    h1: 'Zwei PDF-Dateien zusammenfügen online',
    metaTitle: 'Zwei PDF-Dateien zusammenfügen — 2 PDFs zu einer Datei verbinden',
    metaDescription: 'Verbinden Sie zwei einzelne PDF-Dateien sekundenschnell zu einem Dokument. Kostenlos, unbegrenzt und ohne Registrierung.',
    badge: 'Schnell',
    intro: 'Müssen Sie Vorder- und Rückseite oder Anschreiben und Zeugnisse verbinden? Fügen Sie zwei PDFs mit wenigen Klicks zusammen.',
    steps: [
      { title: 'Schritt 1: Beide PDFs hochladen', desc: 'Wählen Sie Datei 1 und Datei 2 aus.' },
      { title: 'Schritt 2: Reihenfolge prüfen', desc: 'Legen Sie fest, welches Dokument zuerst steht.' },
      { title: 'Schritt 3: Fertiges PDF sichern', desc: 'Laden Sie die zusammengefügte Datei herunter.' },
    ],
    faqs: [
      { q: 'Kostet das Tool etwas?', a: 'Nein, MyPdfTools ist zu 100% kostenfrei nutzbar.' },
    ],
    relatedSlugs: ['pdf-zusammenfuegen', 'pdf-teilen', 'pdf-komprimieren'],
    canonical: 'https://www.mypdftools.de/zwei-pdf-zusammenfuegen',
    hreflang: { it: 'https://www.mypdftools.it/unire-due-pdf', de: 'https://www.mypdftools.de/zwei-pdf-zusammenfuegen' },
  },

  'rechnungen-pdf-zusammenfuegen': {
    slug: 'rechnungen-pdf-zusammenfuegen',
    toolId: 'merge-pdf',
    lang: 'de',
    domain: 'mypdftools.de',
    h1: 'PDF-Rechnungen und Belege zusammenfügen für Buchhaltung',
    metaTitle: 'Rechnungen PDF zusammenfügen — Belege für Steuerberater ordnen',
    metaDescription: 'Fassen Sie Monatsrechnungen, Quittungen und Kontoauszüge zu einem einzigen PDF zusammen. Sicher und diskret für Steuer und Buchhaltung.',
    badge: 'Buchhaltung',
    intro: 'Bringen Sie Ordnung in Ihre Steuerunterlagen: Fügen Sie alle Eingangsrechnungen eines Monats in einer chronologischen PDF-Datei zusammen.',
    steps: [
      { title: 'Schritt 1: Belege auswählen', desc: 'Laden Sie Ihre Rechnungs-PDFs hoch.' },
      { title: 'Schritt 2: Nach Datum sortieren', desc: 'Bringen Sie die Belege in die richtige Reihenfolge.' },
      { title: 'Schritt 3: Sammel-PDF erstellen', desc: 'Senden Sie die kompakte Datei an Ihren Steuerberater.' },
    ],
    faqs: [
      { q: 'Bleiben Finanzdaten geheim?', a: 'Ja, kein einziges Dokument wird auf einen Webserver übertragen.' },
    ],
    relatedSlugs: ['pdf-zusammenfuegen', 'pdf-komprimieren-fuer-email', 'pdf-seitenzahlen'],
    canonical: 'https://www.mypdftools.de/rechnungen-pdf-zusammenfuegen',
    hreflang: { it: 'https://www.mypdftools.it/unire-fatture-pdf', de: 'https://www.mypdftools.de/rechnungen-pdf-zusammenfuegen' },
  },

  'pdf-am-handy-zusammenfuegen': {
    slug: 'pdf-am-handy-zusammenfuegen',
    toolId: 'merge-pdf',
    lang: 'de',
    domain: 'mypdftools.de',
    h1: 'PDF-Dateien am Smartphone zusammenfügen (Android & iPhone)',
    metaTitle: 'PDF am Handy zusammenfügen — Online auf iPhone & Android',
    metaDescription: 'Verbinden Sie PDF-Dokumente direkt auf dem Smartphone ohne App-Download. Funktioniert in Safari, Chrome und Firefox mobil.',
    badge: 'Mobil',
    intro: 'Unterwegs schnell Unterlagen zusammenfügen? Öffnen Sie einfach Ihren Smartphone-Browser, wählen Sie die Dokumente und laden Sie das fertige PDF.',
    steps: [
      { title: 'Schritt 1: Dateien am Handy antippen', desc: 'Wählen Sie PDFs aus Dateien (iOS) oder Downloads (Android).' },
      { title: 'Schritt 2: Anordnung anpassen', desc: 'Verschieben Sie Seiten bequem per Touch.' },
      { title: 'Schritt 3: Aufs Handy laden', desc: 'Teilen Sie das Ergebnis direkt per WhatsApp oder Mail.' },
    ],
    faqs: [
      { q: 'Muss ich eine App installieren?', a: 'Nein, Sie sparen Speicherplatz, da das Tool direkt im Webbrowser läuft.' },
    ],
    relatedSlugs: ['pdf-zusammenfuegen', 'jpg-in-pdf', 'pdf-unterschreiben'],
    canonical: 'https://www.mypdftools.de/pdf-am-handy-zusammenfuegen',
    hreflang: { it: 'https://www.mypdftools.it/unire-pdf-smartphone', de: 'https://www.mypdftools.de/pdf-am-handy-zusammenfuegen' },
  },

  'pdf-komprimieren-fuer-email': {
    slug: 'pdf-komprimieren-fuer-email',
    toolId: 'compress-pdf',
    lang: 'de',
    domain: 'mypdftools.de',
    h1: 'PDF verkleinern für E-Mail-Anhänge',
    metaTitle: 'PDF für E-Mail komprimieren — Zu große Anhänge verkleinern',
    metaDescription: 'Ihr PDF ist größer als 10 MB oder 25 MB und wird vom Mailserver abgewiesen? Verkleinern Sie die Datei schnell und scharf.',
    badge: 'E-Mail Ready',
    intro: 'Vermeiden Sie Fehlermeldungen beim Mailversand: Reduzieren Sie die Dateigröße auf ein handliches Maß, ohne dass Texte unleserlich werden.',
    steps: [
      { title: 'Schritt 1: Großes PDF hochladen', desc: 'Wählen Sie das abgewiesene Dokument.' },
      { title: 'Schritt 2: Automatische Reduktion', desc: 'Bilddaten und Metadaten werden optimiert.' },
      { title: 'Schritt 3: Mühelos per Mail senden', desc: 'Laden Sie das kleine PDF herunter.' },
    ],
    faqs: [
      { q: 'Was ist die maximale Anhanggröße?', a: 'Die meisten Mail-Dienste wie GMX, Web.de oder Gmail begrenzen Anhänge auf 20 bis 25 MB.' },
    ],
    relatedSlugs: ['pdf-komprimieren', 'pdf-verkleinern', 'pdf-unter-2mb-verkleinern'],
    canonical: 'https://www.mypdftools.de/pdf-komprimieren-fuer-email',
    hreflang: { it: 'https://www.mypdftools.it/comprimere-pdf-per-email', de: 'https://www.mypdftools.de/pdf-komprimieren-fuer-email' },
  },

  'pdf-unter-2mb-verkleinern': {
    slug: 'pdf-unter-2mb-verkleinern',
    toolId: 'compress-pdf',
    lang: 'de',
    domain: 'mypdftools.de',
    h1: 'PDF unter 2 MB verkleinern online kostenlos',
    metaTitle: 'PDF unter 2 MB komprimieren — Dateigröße für Portale senken',
    metaDescription: 'Viele behördliche und universitäre Upload-Portale verlangen PDFs unter 2 MB. Komprimieren Sie Ihre Datei zuverlässig unter das Limit.',
    badge: '< 2 MB',
    intro: 'Erfüllen Sie strikte Dateigrößen-Vorgaben: Passen Sie Ihr PDF an, damit der Upload in Online-Bewerbungen und Portalen reibungslos klappt.',
    steps: [
      { title: 'Schritt 1: PDF laden', desc: 'Wählen Sie die Datei über 2 MB.' },
      { title: 'Schritt 2: Optimierung ausführen', desc: 'Das Datenvolumen wird drastisch eingedämmt.' },
      { title: 'Schritt 3: Unter 2 MB sichern', desc: 'Laden Sie die passende Datei herunter.' },
    ],
    faqs: [
      { q: 'Sieht man den Unterschied in der Textschärfe?', a: 'Nein, Schriften und Texte bleiben glasklar lesbar.' },
    ],
    relatedSlugs: ['pdf-komprimieren', 'pdf-fuer-bewerbung-verkleinern', 'pdf-komprimieren-fuer-email'],
    canonical: 'https://www.mypdftools.de/pdf-unter-2mb-verkleinern',
    hreflang: { it: 'https://www.mypdftools.it/comprimere-pdf-sotto-2mb', de: 'https://www.mypdftools.de/pdf-unter-2mb-verkleinern' },
  },

  'pdf-fuer-bewerbung-verkleinern': {
    slug: 'pdf-fuer-bewerbung-verkleinern',
    toolId: 'compress-pdf',
    lang: 'de',
    domain: 'mypdftools.de',
    h1: 'PDF für Bewerbungsportal verkleinern',
    metaTitle: 'PDF für Bewerbung verkleinern — Zeugnisse & Lebenslauf optimieren',
    metaDescription: 'Optimieren Sie Ihre Bewerbungsunterlagen für Karriereportale. Verkleinern Sie Zeugnisse, Anschreiben und Lebenslauf auf Portallimits.',
    badge: 'Bewerbung',
    intro: 'Verhindern Sie Upload-Abbrüche bei Ihrer Traumstelle: Bringen Sie Ihre Zeugnissammlung auf die vorgeschriebene Dateigröße.',
    steps: [
      { title: 'Schritt 1: Bewerbungsmappe öffnen', desc: 'Laden Sie Ihre zusammengestellten Unterlagen hoch.' },
      { title: 'Schritt 2: Komprimieren', desc: 'Scans werden auf lesbare 150 DPI optimiert.' },
      { title: 'Schritt 3: Erfolgreich bewerben', desc: 'Laden Sie die kompakte Mappe herunter.' },
    ],
    faqs: [
      { q: 'Bleibt mein Bewerbungsfoto ansehnlich?', a: 'Ja, Porträtfotos behalten eine natürliche und saubere Farbdarstellung.' },
    ],
    relatedSlugs: ['pdf-unter-2mb-verkleinern', 'pdf-komprimieren', 'pdf-zusammenfuegen'],
    canonical: 'https://www.mypdftools.de/pdf-fuer-bewerbung-verkleinern',
    hreflang: { it: 'https://www.mypdftools.it/ridurre-pdf-per-concorsi', de: 'https://www.mypdftools.de/pdf-fuer-bewerbung-verkleinern' },
  },

  'pdf-digital-unterschreiben-kostenlos': {
    slug: 'pdf-digital-unterschreiben-kostenlos',
    toolId: 'sign-pdf',
    lang: 'de',
    domain: 'mypdftools.de',
    h1: 'PDF digital unterschreiben online kostenlos',
    metaTitle: 'PDF digital unterschreiben kostenlos — Signatur online erstellen',
    metaDescription: 'Setzen Sie Ihre handschriftliche Unterschrift in PDF-Dokumente ohne Drucker oder Scanner. Schnell, sicher und kostenlos.',
    badge: 'Signatur',
    intro: 'Unterschreiben Sie Verträge, Anträge und Kündigungen direkt am Bildschirm mit der Maus oder dem Finger auf Ihrem Touchscreen.',
    steps: [
      { title: 'Schritt 1: PDF hochladen', desc: 'Öffnen Sie das zu unterschreibende Dokument.' },
      { title: 'Schritt 2: Unterschrift zeichnen', desc: 'Erstellen Sie Ihre Signatur mit Stift, Finger oder Maus.' },
      { title: 'Schritt 3: Signiertes PDF sichern', desc: 'Platzieren Sie die Unterschrift und speichern Sie das Dokument.' },
    ],
    faqs: [
      { q: 'Wird meine Unterschrift auf Servern gespeichert?', a: 'Auf keinen Fall. Die Signatur verbleibt ausschließlich in Ihrem lokalen Browserspeicher.' },
    ],
    relatedSlugs: ['pdf-unterschreiben', 'vertrag-pdf-unterschreiben', 'pdf-bearbeiten'],
    canonical: 'https://www.mypdftools.de/pdf-digital-unterschreiben-kostenlos',
    hreflang: { it: 'https://www.mypdftools.it/firmare-pdf-digitalmente-gratis', de: 'https://www.mypdftools.de/pdf-digital-unterschreiben-kostenlos' },
  },

  'vertrag-pdf-unterschreiben': {
    slug: 'vertrag-pdf-unterschreiben',
    toolId: 'sign-pdf',
    lang: 'de',
    domain: 'mypdftools.de',
    h1: 'Vertrag als PDF unterschreiben online',
    metaTitle: 'Vertrag als PDF unterschreiben — Mietvertrag & Arbeitsvertrag digital signieren',
    metaDescription: 'Signieren Sie Mietverträge, Arbeitsverträge und Vereinbarungen digital ohne Ausdrucken. Maximaler Datenschutz für Ihre Daten.',
    badge: 'Verträge',
    intro: 'Schließen Sie geschäftliche oder private Vereinbarungen zeitsparend ab. Setzen Sie Datum und Unterschrift direkt in das PDF.',
    steps: [
      { title: 'Schritt 1: Vertrag öffnen', desc: 'Laden Sie das PDF-Vertragsdokument hoch.' },
      { title: 'Schritt 2: Unterschrift einfügen', desc: 'Zeichnen Sie Ihre Signatur auf die Signaturlinie.' },
      { title: 'Schritt 3: Gegenzeichnung versenden', desc: 'Speichern Sie das fertige PDF zur Weiterleitung.' },
    ],
    faqs: [
      { q: 'Gilt die einfache digitale Signatur für Verträge?', a: 'Für die allermeisten Verträge des täglichen Lebens (Miete, Dienstleistung, Kauf) ist sie nach EU-Recht vollkommen ausreichend.' },
    ],
    relatedSlugs: ['pdf-digital-unterschreiben-kostenlos', 'pdf-unterschreiben', 'pdf-schuetzen'],
    canonical: 'https://www.mypdftools.de/vertrag-pdf-unterschreiben',
    hreflang: { it: 'https://www.mypdftools.it/firmare-contratto-pdf', de: 'https://www.mypdftools.de/vertrag-pdf-unterschreiben' },
  },

  'scans-in-pdf-umwandeln': {
    slug: 'scans-in-pdf-umwandeln',
    toolId: 'jpg-to-pdf',
    lang: 'de',
    domain: 'mypdftools.de',
    h1: 'Gescannte Dokumente in PDF umwandeln',
    metaTitle: 'Scans in PDF umwandeln kostenlos — Gescannte Seiten verbinden',
    metaDescription: 'Fügen Sie eingescannte Seiten und Rechnungen zu einem einheitlichen, sauberen PDF-Dokument zusammen. Schnell und einfach.',
    badge: 'Scans',
    intro: 'Liegen Ihre Scans als einzelne Bilddateien vor? Bündeln Sie alle Seiten in einer ordentlichen PDF-Datei für Ablage und Versand.',
    steps: [
      { title: 'Schritt 1: Scans hochladen', desc: 'Wählen Sie alle Bilddateien aus.' },
      { title: 'Schritt 2: Seitenfolge kontrollieren', desc: 'Sortieren Sie die Dokumente chronologisch.' },
      { title: 'Schritt 3: PDF erzeugen', desc: 'Laden Sie das fertige Dokument herunter.' },
    ],
    faqs: [
      { q: 'Kann ich schiefe Scans drehen?', a: 'Ja, drehen Sie einzelne Seiten vor dem Erstellen einfach um 90 Grad.' },
    ],
    relatedSlugs: ['jpg-in-pdf', 'fotos-in-pdf-umwandeln', 'pdf-zusammenfuegen'],
    canonical: 'https://www.mypdftools.de/scans-in-pdf-umwandeln',
    hreflang: { it: 'https://www.mypdftools.it/scansioni-in-pdf', de: 'https://www.mypdftools.de/scans-in-pdf-umwandeln' },
  },

  'screenshot-in-pdf-umwandeln': {
    slug: 'screenshot-in-pdf-umwandeln',
    toolId: 'jpg-to-pdf',
    lang: 'de',
    domain: 'mypdftools.de',
    h1: 'Screenshot in PDF umwandeln online',
    metaTitle: 'Screenshot in PDF umwandeln — Bildschirmfotos als PDF speichern',
    metaDescription: 'Wandeln Sie Screenshots von PC oder Smartphone in ein ordentliches PDF-Dokument um. Ideal für Dokumentationen und Nachweise.',
    badge: 'Screenshot',
    intro: 'Fassen Sie mehrere Bildschirmausschnitte in einem einzigen, lesefreundlichen PDF zusammen.',
    steps: [
      { title: 'Schritt 1: Screenshots wählen', desc: 'Laden Sie Ihre Bildschirmfotos hoch.' },
      { title: 'Schritt 2: Anordnung festlegen', desc: 'Ordnen Sie die Schritte in der richtigen Abfolge.' },
      { title: 'Schritt 3: PDF speichern', desc: 'Laden Sie das übersichtliche PDF herunter.' },
    ],
    faqs: [
      { q: 'Verändert sich die Auflösung der Screenshots?', a: 'Nein, Grafiken und Schriften bleiben 1:1 scharf.' },
    ],
    relatedSlugs: ['jpg-in-pdf', 'png-in-pdf', 'pdf-zusammenfuegen'],
    canonical: 'https://www.mypdftools.de/screenshot-in-pdf-umwandeln',
    hreflang: { it: 'https://www.mypdftools.it/screenshot-in-pdf', de: 'https://www.mypdftools.de/screenshot-in-pdf-umwandeln' },
  },

  'belege-in-pdf-umwandeln': {
    slug: 'belege-in-pdf-umwandeln',
    toolId: 'jpg-to-pdf',
    lang: 'de',
    domain: 'mypdftools.de',
    h1: 'Kassenzettel und Belege in PDF umwandeln',
    metaTitle: 'Belege in PDF umwandeln — Quittungen für Spesenabrechnung',
    metaDescription: 'Fotografieren Sie Tankbelege, Bewirtungsquittungen und Fahrkarten und wandeln Sie diese direkt in ein PDF für die Spesenabrechnung um.',
    badge: 'Spesen',
    intro: 'Schluss mit losem Papierkram: Konvertieren Sie Belegfotos sofort in ein sauberes PDF für Arbeitgeber oder Buchhaltung.',
    steps: [
      { title: 'Schritt 1: Fotos der Quittungen hochladen', desc: 'Wählen Sie die Aufnahmen aus Ihrer Fotogalerie.' },
      { title: 'Schritt 2: Randbeschnitt anpassen', desc: 'Richten Sie die Dokumente ordentlich aus.' },
      { title: 'Schritt 3: Spesen-PDF sichern', desc: 'Laden Sie das fertige Dokument herunter.' },
    ],
    faqs: [
      { q: 'Kann ich mehrere Belege auf einmal umwandeln?', a: 'Ja, laden Sie einfach alle Belege gemeinsam hoch.' },
    ],
    relatedSlugs: ['jpg-in-pdf', 'rechnungen-pdf-zusammenfuegen', 'pdf-komprimieren'],
    canonical: 'https://www.mypdftools.de/belege-in-pdf-umwandeln',
    hreflang: { it: 'https://www.mypdftools.it/ricevute-in-pdf', de: 'https://www.mypdftools.de/belege-in-pdf-umwandeln' },
  },

  'ratgeber/pdf-ohne-ausdrucken-unterschreiben': {
    slug: 'ratgeber/pdf-ohne-ausdrucken-unterschreiben',
    toolId: 'sign-pdf',
    lang: 'de',
    domain: 'mypdftools.de',
    h1: 'PDF ohne Ausdrucken unterschreiben — Die Schritt-für-Schritt Anleitung',
    metaTitle: 'PDF ohne Ausdrucken unterschreiben — Papierlos am PC & Smartphone',
    metaDescription: 'So signieren Sie PDF-Dokumente in 60 Sekunden ohne Drucker, Papier oder teure Software. Schnelle Anleitung für jedermann.',
    badge: 'Ratgeber',
    intro: 'Ein Dokument erst auszudrucken, mit Kuli zu unterschreiben und wieder einzuscannen kostet Nerven und Tinte. Mit modernen Browser-Tools signieren Sie direkt am Bildschirm.',
    steps: [
      { title: 'Schritt 1: Signatur-Tool öffnen', desc: 'Starten Sie das kostenfreie Unterschriften-Tool in MyPdfTools.' },
      { title: 'Schritt 2: Signatur erstellen', desc: 'Zeichnen Sie Ihre Unterschrift bequem per Maus oder Touch.' },
      { title: 'Schritt 3: Platzieren und herunterladen', desc: 'Ziehen Sie die Signatur an die passende Stelle und speichern Sie das Dokument.' },
    ],
    faqs: [
      { q: 'Ist dafür eine spezielle Software erforderlich?', a: 'Nein, das funktioniert rein webbasiert in jedem modernen Browser.' },
    ],
    relatedSlugs: ['pdf-unterschreiben', 'vertrag-pdf-unterschreiben', 'pdf-digital-unterschreiben-kostenlos'],
    canonical: 'https://www.mypdftools.de/ratgeber/pdf-ohne-ausdrucken-unterschreiben',
    hreflang: { it: 'https://www.mypdftools.it/guide/come-firmare-un-pdf-senza-stampare', de: 'https://www.mypdftools.de/ratgeber/pdf-ohne-ausdrucken-unterschreiben' },
  },

  'ratgeber/pdf-mit-passwort-schuetzen': {
    slug: 'ratgeber/pdf-mit-passwort-schuetzen',
    toolId: 'protect-pdf',
    lang: 'de',
    domain: 'mypdftools.de',
    h1: 'PDF mit Passwort schützen — So verschlüsseln Sie sensible Dokumente',
    metaTitle: 'PDF mit Passwort schützen — Anleitung zur sicheren Verschlüsselung',
    metaDescription: 'Schützen Sie Gehaltsabrechnungen, Steuerunterlagen und Verträge vor neugierigen Blicken mit 128/256-Bit-Verschlüsselung.',
    badge: 'Ratgeber',
    intro: 'Wer vertrauliche Unterlagen per Mail versendet, sollte diese absichern. Erfahren Sie, wie Sie ein PDF in Sekunden mit einem Passwort sperren.',
    steps: [
      { title: 'Schritt 1: PDF auswählen', desc: 'Laden Sie die schützenswerte Datei hoch.' },
      { title: 'Schritt 2: Starkes Kennwort vergeben', desc: 'Wählen Sie eine sichere Kombination aus Buchstaben, Zahlen und Sonderzeichen.' },
      { title: 'Schritt 3: Geschütztes PDF herunterladen', desc: 'Ab sofort öffnet sich die Datei nur noch nach Passworteingabe.' },
    ],
    faqs: [
      { q: 'Kann das Passwort zurückgesetzt werden?', a: 'Nein, bewahren Sie das Kennwort sicher auf, da die Verschlüsselung mathematisch unumkehrbar ist.' },
    ],
    relatedSlugs: ['pdf-schuetzen', 'pdf-entsperren', 'pdf-schwaerzen'],
    canonical: 'https://www.mypdftools.de/ratgeber/pdf-mit-passwort-schuetzen',
    hreflang: { it: 'https://www.mypdftools.it/guide/come-proteggere-un-pdf-con-password', de: 'https://www.mypdftools.de/ratgeber/pdf-mit-passwort-schuetzen' },
  },

  'ratgeber/einzelne-seiten-aus-pdf-speichern': {
    slug: 'ratgeber/einzelne-seiten-aus-pdf-speichern',
    toolId: 'extract-pages',
    lang: 'de',
    domain: 'mypdftools.de',
    h1: 'Einzelne Seiten aus einem PDF speichern und trennen',
    metaTitle: 'Einzelne Seiten aus PDF speichern — PDF-Seiten extrahieren',
    metaDescription: 'Sie brauchen nur Seite 3 und 5 aus einem 50-seitigen Dokument? So extrahieren Sie gezielt bestimmte Seiten in ein neues PDF.',
    badge: 'Ratgeber',
    intro: 'Große Dokumente lassen sich oft schwer verschicken, wenn der Empfänger nur einen Teilbereich benötigt. Extrahieren Sie mühelos einzelne Seiten.',
    steps: [
      { title: 'Schritt 1: Dokument laden', desc: 'Öffnen Sie das PDF im Extrahier-Tool.' },
      { title: 'Schritt 2: Seiten anklicken', desc: 'Wählen Sie visuell die Seiten aus, die Sie behalten möchten.' },
      { title: 'Schritt 3: Neues PDF erstellen', desc: 'Laden Sie das schlanke PDF herunter.' },
    ],
    faqs: [
      { q: 'Bleibt das Original-PDF unverändert?', a: 'Ja, Ihre Originaldatei auf der Festplatte bleibt vollkommen intakt.' },
    ],
    relatedSlugs: ['pdf-seiten-extrahieren', 'pdf-teilen', 'pdf-seiten-loeschen'],
    canonical: 'https://www.mypdftools.de/ratgeber/einzelne-seiten-aus-pdf-speichern',
    hreflang: { it: 'https://www.mypdftools.it/guide/come-estrarre-pagine-da-un-pdf', de: 'https://www.mypdftools.de/ratgeber/einzelne-seiten-aus-pdf-speichern' },
  },

  'ratgeber/word-in-pdf-umwandeln-kostenlos': {
    slug: 'ratgeber/word-in-pdf-umwandeln-kostenlos',
    toolId: 'word-to-pdf',
    lang: 'de',
    domain: 'mypdftools.de',
    h1: 'Word in PDF umwandeln ohne Microsoft Office',
    metaTitle: 'Word in PDF umwandeln kostenlos — DOCX in PDF ohne Office',
    metaDescription: 'Sie haben kein Word oder Microsoft 365 auf Ihrem Computer installiert? So konvertieren Sie DOCX-Dateien kostenlos und formatgetreu in PDF.',
    badge: 'Ratgeber',
    intro: 'Wer Bewerbungen oder Rechnungen als Word-Datei verschickt, riskiert verrutschte Zeilen beim Empfänger. Erfahren Sie, wie Sie DOCX ohne Office umwandeln.',
    steps: [
      { title: 'Schritt 1: Word-Dokument hochladen', desc: 'Laden Sie Ihre .docx- oder .doc-Datei hoch.' },
      { title: 'Schritt 2: Automatische Formatierung', desc: 'Schriften und Tabellen werden in das PDF-Format übertragen.' },
      { title: 'Schritt 3: PDF herunterladen', desc: 'Speichern Sie das druck- und versandfertige PDF.' },
    ],
    faqs: [
      { q: 'Verschieben sich Tabellen oder Abbildungen?', a: 'Nein, das Seitenlayout bleibt genau so erhalten, wie es im Word-Dokument angelegt wurde.' },
    ],
    relatedSlugs: ['word-in-pdf', 'pdf-in-word', 'excel-in-pdf'],
    canonical: 'https://www.mypdftools.de/ratgeber/word-in-pdf-umwandeln-kostenlos',
    hreflang: { it: 'https://www.mypdftools.it/guide/come-convertire-word-in-pdf-gratis', de: 'https://www.mypdftools.de/ratgeber/word-in-pdf-umwandeln-kostenlos' },
  },

  'ratgeber/pdf-dauerhaft-drehen-und-speichern': {
    slug: 'ratgeber/pdf-dauerhaft-drehen-und-speichern',
    toolId: 'rotate-pdf',
    lang: 'de',
    domain: 'mypdftools.de',
    h1: 'PDF dauerhaft drehen und speichern — Nie wieder kopfüber lesen',
    metaTitle: 'PDF dauerhaft drehen und speichern — Falsch ausgerichtete Seiten korrigieren',
    metaDescription: 'Häufig dreht der PDF-Reader die Seite nur temporär. So speichern Sie die richtige Ausrichtung (90°/180°) permanent ab.',
    badge: 'Ratgeber',
    intro: 'Gescannte Dokumente liegen oft quer oder auf dem Kopf. Mit dieser Kurzanleitung fixieren Sie die richtige Leserichtung ein für alle Mal.',
    steps: [
      { title: 'Schritt 1: PDF öffnen', desc: 'Laden Sie das verdrehte Dokument hoch.' },
      { title: 'Schritt 2: Seiten ausrichten', desc: 'Drehen Sie einzelne oder alle Seiten mit den Drehpfeilen.' },
      { title: 'Schritt 3: Permanent abspeichern', desc: 'Laden Sie das korrigierte PDF herunter — es öffnet sich künftig immer richtig.' },
    ],
    faqs: [
      { q: 'Kann ich nur Seite 2 drehen und den Rest belassen?', a: 'Ja, jede Seite kann individuell im gewünschten Winkel ausgerichtet werden.' },
    ],
    relatedSlugs: ['pdf-drehen', 'pdf-organisieren', 'pdf-seiten-loeschen'],
    canonical: 'https://www.mypdftools.de/ratgeber/pdf-dauerhaft-drehen-und-speichern',
    hreflang: { it: 'https://www.mypdftools.it/guide/come-ruotare-e-salvare-un-pdf', de: 'https://www.mypdftools.de/ratgeber/pdf-dauerhaft-drehen-und-speichern' },
  },
};

// Update src/data/seoRoutes.ts
const seoRoutesPath = path.resolve('src/data/seoRoutes.ts');
let content = fs.readFileSync(seoRoutesPath, 'utf8');

// Find the last closing brace of SEO_ROUTES
let closingBraceIdx = content.lastIndexOf('};\r\n\r\nexport const getSeoRoute');
if (closingBraceIdx === -1) {
  closingBraceIdx = content.lastIndexOf('};\n\nexport const getSeoRoute');
}
if (closingBraceIdx === -1) {
  closingBraceIdx = content.lastIndexOf('};\r\n\r\nexport const TOOL_TO_PRIMARY_SLUG');
}
if (closingBraceIdx === -1) {
  closingBraceIdx = content.lastIndexOf('};\n\nexport const TOOL_TO_PRIMARY_SLUG');
}

if (closingBraceIdx === -1) {
  console.error('Could not find anchor to insert routes');
  process.exit(1);
}

// Format additional routes as TypeScript code
let additionalCode = '';
for (const [key, val] of Object.entries(additionalRoutes)) {
  additionalCode += `  '${key}': ${JSON.stringify(val, null, 4)},\n\n`;
}

let updatedContent = content.slice(0, closingBraceIdx) + additionalCode + content.slice(closingBraceIdx);

const primarySlugMap = `
export const TOOL_TO_PRIMARY_SLUG: Record<string, { it: string; de: string }> = {
  'jpg-to-pdf': { it: 'da-jpg-a-pdf', de: 'jpg-in-pdf' },
  'pdf-to-jpg': { it: 'da-pdf-a-jpg', de: 'pdf-in-jpg' },
  'word-to-pdf': { it: 'da-word-a-pdf', de: 'word-in-pdf' },
  'pdf-to-word': { it: 'da-pdf-a-word', de: 'pdf-in-word' },
  'excel-to-pdf': { it: 'da-excel-a-pdf', de: 'excel-in-pdf' },
  'pdf-to-excel': { it: 'da-pdf-a-excel', de: 'pdf-in-excel' },
  'powerpoint-to-pdf': { it: 'da-powerpoint-a-pdf', de: 'powerpoint-in-pdf' },
  'pdf-to-powerpoint': { it: 'da-pdf-a-powerpoint', de: 'pdf-in-powerpoint' },
  'merge-pdf': { it: 'unire-pdf', de: 'pdf-zusammenfuegen' },
  'split-pdf': { it: 'dividere-pdf', de: 'pdf-teilen' },
  'compress-pdf': { it: 'comprimere-pdf', de: 'pdf-komprimieren' },
  'sign-pdf': { it: 'firmare-pdf', de: 'pdf-unterschreiben' },
  'edit-pdf': { it: 'modificare-pdf', de: 'pdf-bearbeiten' },
  'rotate-pdf': { it: 'ruotare-pdf', de: 'pdf-drehen' },
  'organize-pdf': { it: 'organizzare-pdf', de: 'pdf-organisieren' },
  'delete-pages': { it: 'eliminare-pagine-pdf', de: 'pdf-seiten-loeschen' },
  'extract-pages': { it: 'estrarre-pagine-pdf', de: 'pdf-seiten-extrahieren' },
  'protect-pdf': { it: 'proteggere-pdf', de: 'pdf-schuetzen' },
  'unlock-pdf': { it: 'sbloccare-pdf', de: 'pdf-entsperren' },
  'watermark': { it: 'filigrana-pdf', de: 'pdf-wasserzeichen' },
  'page-numbers': { it: 'numeri-di-pagina-pdf', de: 'pdf-seitenzahlen' },
  'pdf-to-markdown': { it: 'da-pdf-a-markdown', de: 'pdf-in-markdown' },
};
`;

if (!updatedContent.includes('TOOL_TO_PRIMARY_SLUG')) {
  updatedContent = updatedContent.replace(
    'export const getSeoRoute',
    primarySlugMap + '\nexport const getSeoRoute'
  );
}

fs.writeFileSync(seoRoutesPath, updatedContent, 'utf8');
console.log('Successfully expanded SEO routes!');

