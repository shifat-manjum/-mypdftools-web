export interface SeoFaq {
  q: string;
  a: string;
}

export interface SeoStep {
  title: string;
  desc: string;
}

export interface SeoRouteData {
  slug: string; // e.g. 'unire-pdf' (without leading slash for easy path building)
  toolId: string; // matches ToolItem id e.g. 'merge-pdf'
  lang: 'it' | 'de' | 'en';
  domain: 'mypdftools.it' | 'mypdftools.de';
  h1: string;
  metaTitle: string;
  metaDescription: string;
  badge?: string;
  intro: string;
  steps: SeoStep[];
  faqs: SeoFaq[];
  relatedSlugs: string[];
  canonical: string;
  hreflang: {
    it: string;
    de: string;
    en?: string;
  };
}

export const SEO_ROUTES: Record<string, SeoRouteData> = {
  /* ==========================================================================
     ITALIAN ROUTES (mypdftools.it) — Core Tools & High-Search Intents
     ========================================================================== */
  'unire-pdf': {
    slug: 'unire-pdf',
    toolId: 'merge-pdf',
    lang: 'it',
    domain: 'mypdftools.it',
    h1: 'Unire PDF Online Gratis',
    metaTitle: 'Unire PDF Online Gratis — Combina File PDF Senza Upload',
    metaDescription: 'Unisci due o più file PDF nell\'ordine desiderato al 100% nel tuo browser. Elaborazione locale privata, nessun file inviato sui server. Veloce e gratuito.',
    badge: '100% Privato',
    intro: 'Unisci documenti PDF multipli in un unico file compatto in pochi istanti. Con la tecnologia client-side di MyPdfTools, i tuoi contratti, fatture ed elaborati non lasciano mai la memoria del tuo computer o smartphone.',
    steps: [
      { title: '1. Seleziona i Documenti', desc: 'Trascina o carica due o più file PDF dal tuo dispositivo.' },
      { title: '2. Ordina le Pagine', desc: 'Usa le frecce per posizionare i documenti nella sequenza desiderata.' },
      { title: '3. Unisci e Scarica', desc: 'Clicca su "Unisci PDF" per assemblare il nuovo documento istantaneamente.' },
    ],
    faqs: [
      { q: 'I miei documenti vengono inviati su server esterni?', a: 'No. L\'unione dei PDF avviene interamente nella RAM del tuo browser tramite WebAssembly. Zero upload, privacy garantita al 100%.' },
      { q: 'C\'è un limite al numero di file che posso unire?', a: 'Non c\'è alcun limite imposto dal server. Puoi combinare tutti i documenti supportati dalla memoria del tuo dispositivo.' },
      { q: 'La qualità del testo e delle immagini viene ridotta?', a: 'No, i vettori, le immagini e la formattazione originale rimangono identici senza alcuna perdita qualitativa.' },
    ],
    relatedSlugs: ['dividere-pdf', 'comprimere-pdf', 'organizzare-pdf', 'firmare-pdf'],
    canonical: 'https://www.mypdftools.it/unire-pdf',
    hreflang: { it: 'https://www.mypdftools.it/unire-pdf', de: 'https://www.mypdftools.de/pdf-zusammenfuegen' },
  },

  'dividere-pdf': {
    slug: 'dividere-pdf',
    toolId: 'split-pdf',
    lang: 'it',
    domain: 'mypdftools.it',
    h1: 'Dividere PDF ed Estrarre Pagine Online',
    metaTitle: 'Dividere PDF Online Gratis — Estrai Pagine Senza Registrazione',
    metaDescription: 'Separa pagine singole o estrai intervalli di pagine da file PDF in pochi clic. Nessun upload di file, privacy sicura nel tuo browser.',
    badge: 'Zero Upload',
    intro: 'Estrai pagine specifiche o spezza un documento PDF voluminoso in più file indipendenti. Ideale per estrarre capitoli di libri, singole ricevute o sezioni contrattuali.',
    steps: [
      { title: '1. Carica il PDF', desc: 'Seleziona il documento da cui desideri estrarre le pagine.' },
      { title: '2. Specifica l\'Intervallo', desc: 'Inserisci le pagine (es. 1-3, 5, 8-10) oppure dividi ogni singola pagina.' },
      { title: '3. Scarica i Nuovi File', desc: 'Salva il PDF estratto o scarica tutte le pagine in un pratico archivio ZIP.' },
    ],
    faqs: [
      { q: 'Come posso estrarre solo pagine non consecutive?', a: 'Usa la virgola e il trattino nel campo di selezione pagine, ad esempio: "1-3, 5, 9".' },
      { q: 'Il file originale viene modificato o eliminato?', a: 'No, il file originale sul tuo computer non viene toccato. Viene creato un nuovo documento contenente solo le pagine scelte.' },
      { q: 'È sicuro per documenti riservati o fiscali?', a: 'Assolutamente sì. Nessun dato viene caricato su server esterni.' },
    ],
    relatedSlugs: ['unire-pdf', 'estrarre-pagine-pdf', 'eliminare-pagine-pdf', 'organizzare-pdf'],
    canonical: 'https://www.mypdftools.it/dividere-pdf',
    hreflang: { it: 'https://www.mypdftools.it/dividere-pdf', de: 'https://www.mypdftools.de/pdf-teilen' },
  },

  'comprimere-pdf': {
    slug: 'comprimere-pdf',
    toolId: 'compress-pdf',
    lang: 'it',
    domain: 'mypdftools.it',
    h1: 'Comprimere PDF Online — Riduci Dimensioni File',
    metaTitle: 'Comprimere PDF Online Gratis — Riduci Dimensioni Senza Perdere Qualità',
    metaDescription: 'Riduci la dimensione dei file PDF mantenendo la massima qualità visiva. Ideale per invio email o allegati PEC. 100% privato nel browser.',
    badge: 'Ottimizzato Email e PEC',
    intro: 'Riduci il peso dei tuoi documenti PDF senza compromettere la leggibilità del testo e la nitidezza delle immagini. Risolvi il problema dei limiti di dimensione per allegati email e portali pubblici.',
    steps: [
      { title: '1. Carica il Documento', desc: 'Seleziona il file PDF pesante da ottimizzare.' },
      { title: '2. Compressione Automatica', desc: 'L\'algoritmo ottimizza font, flussi di dati e immagini interne.' },
      { title: '3. Salva PDF Leggero', desc: 'Scarica subito il PDF compresso pronto per l\'invio.' },
    ],
    faqs: [
      { q: 'Di quanto viene ridotto il file PDF?', a: 'La riduzione dipende dai contenuti interni. I documenti scansionati o ricchi di immagini possono ridursi fino all\'80%.' },
      { q: 'Il testo rimane leggibile e stampabile?', a: 'Sì, la compressione bilancia la compattezza con la definizione visiva.' },
    ],
    relatedSlugs: ['ridurre-dimensione-pdf', 'unire-pdf', 'da-pdf-a-jpg'],
    canonical: 'https://www.mypdftools.it/comprimere-pdf',
    hreflang: { it: 'https://www.mypdftools.it/comprimere-pdf', de: 'https://www.mypdftools.de/pdf-komprimieren' },
  },

  'ridurre-dimensione-pdf': {
    slug: 'ridurre-dimensione-pdf',
    toolId: 'compress-pdf',
    lang: 'it',
    domain: 'mypdftools.it',
    h1: 'Ridurre la Dimensione di un PDF Online',
    metaTitle: 'Ridurre Dimensione PDF Online Gratis — Ottimizza Peso File',
    metaDescription: 'Riduci i megabyte del tuo PDF in pochi secondi. Funziona direttamente nel tuo browser senza dover installare programmi.',
    intro: 'Ottimizza file PDF ingombranti per caricarli su portali concorsuali, INPS, Agenzia delle Entrate o trasmetterli via PEC.',
    steps: [
      { title: '1. Carica File', desc: 'Seleziona il PDF da alleggerire.' },
      { title: '2. Elaborazione Istantanea', desc: 'Il motore riduce il peso rimuovendo metadati ridondanti.' },
      { title: '3. Download Rapido', desc: 'Scarica il file alleggerito.' },
    ],
    faqs: [
      { q: 'Posso comprimere PDF contenenti dati sensibili?', a: 'Sì, grazie all\'esecuzione al 100% in-browser.' },
    ],
    relatedSlugs: ['comprimere-pdf', 'unire-pdf'],
    canonical: 'https://www.mypdftools.it/ridurre-dimensione-pdf',
    hreflang: { it: 'https://www.mypdftools.it/ridurre-dimensione-pdf', de: 'https://www.mypdftools.de/pdf-verkleinern' },
  },

  'da-jpg-a-pdf': {
    slug: 'da-jpg-a-pdf',
    toolId: 'jpg-to-pdf',
    lang: 'it',
    domain: 'mypdftools.it',
    h1: 'Convertire da JPG a PDF Online',
    metaTitle: 'Da JPG a PDF Online Gratis — Converti Immagini in Documenti PDF',
    metaDescription: 'Converti immagini JPG, PNG e WebP in file PDF in pochi secondi. Personalizza margini, orientamento e formato pagina A4. Senza upload.',
    badge: 'Supporta JPG, PNG, WebP',
    intro: 'Trasforma foto, scansioni e screenshot in documenti PDF dall\'aspetto professionale. Puoi unire più immagini in un unico documento continuo e regolare margini e orientamento.',
    steps: [
      { title: '1. Seleziona Immagini', desc: 'Carica una o più foto (JPG, PNG, WebP) dal tuo computer o smartphone.' },
      { title: '2. Configura Layout', desc: 'Scegli orientamento (verticale, orizzontale o auto) e dimensioni margini.' },
      { title: '3. Converti e Salva', desc: 'Genera istantaneamente il PDF stampabile ad alta risoluzione.' },
    ],
    faqs: [
      { q: 'Posso combinare più immagini in un solo PDF?', a: 'Certamente! Puoi caricare decine di foto e riordinarle liberamente prima di creare il PDF.' },
      { q: 'Le immagini perdono qualità durante la conversione?', a: 'No, i pixel e la saturazione dei colori vengono conservati intatti.' },
    ],
    relatedSlugs: ['convertire-foto-in-pdf', 'da-pdf-a-jpg', 'unire-pdf'],
    canonical: 'https://www.mypdftools.it/da-jpg-a-pdf',
    hreflang: { it: 'https://www.mypdftools.it/da-jpg-a-pdf', de: 'https://www.mypdftools.de/jpg-in-pdf' },
  },

  'convertire-foto-in-pdf': {
    slug: 'convertire-foto-in-pdf',
    toolId: 'jpg-to-pdf',
    lang: 'it',
    domain: 'mypdftools.it',
    h1: 'Convertire Foto in PDF dal Telefono o Computer',
    metaTitle: 'Convertire Foto in PDF Gratis Online — Veloce e Senza Limiti',
    metaDescription: 'Unisci le foto del tuo smartphone in un unico file PDF ordinato. Gratuito, senza registrazione e senza inviare immagini su internet.',
    intro: 'Unisci le fotografie di documenti, scontrini, appunti o compiti scolastici in un unico file PDF chiaro e facile da spedire.',
    steps: [
      { title: '1. Scatta o Seleziona Foto', desc: 'Carica le immagini direttamente dalla galleria.' },
      { title: '2. Ordina le Pagine', desc: 'Disponi le foto nell\'ordine cronologico desiderato.' },
      { title: '3. Scarica PDF', desc: 'Ottieni il file PDF unificato pronto per la stampa o l\'invio.' },
    ],
    faqs: [
      { q: 'Funziona su iPhone e Android?', a: 'Sì, funziona direttamente su qualsiasi browser mobile senza installare app.' },
    ],
    relatedSlugs: ['da-jpg-a-pdf', 'da-pdf-a-jpg'],
    canonical: 'https://www.mypdftools.it/convertire-foto-in-pdf',
    hreflang: { it: 'https://www.mypdftools.it/convertire-foto-in-pdf', de: 'https://www.mypdftools.de/fotos-in-pdf-umwandeln' },
  },

  'da-pdf-a-jpg': {
    slug: 'da-pdf-a-jpg',
    toolId: 'pdf-to-jpg',
    lang: 'it',
    domain: 'mypdftools.it',
    h1: 'Convertire PDF in JPG Online ad Alta Risoluzione',
    metaTitle: 'Da PDF a JPG Gratis — Converti Pagine PDF in Immagini JPG/PNG',
    metaDescription: 'Estrai immagini da PDF o trasforma ogni pagina in JPG/PNG ad alta definizione. Scarica singolarmente o in archivio ZIP. 100% sicuro.',
    badge: 'Download Singolo o ZIP',
    intro: 'Converti le pagine di un documento PDF in immagini JPG o PNG nitide e pronte per la pubblicazione su social network, presentazioni o siti web.',
    steps: [
      { title: '1. Scegli il File PDF', desc: 'Carica il documento da convertire in immagini.' },
      { title: '2. Scegli Risoluzione', desc: 'Imposta il formato (JPG o PNG) e la risoluzione (100 DPI o 150/200 DPI).' },
      { title: '3. Scarica Immagini', desc: 'Salva singole immagini o scarica l\'intero archivio ZIP completo.' },
    ],
    faqs: [
      { q: 'Come scarico tutte le pagine insieme?', a: 'Basta cliccare sul pulsante verde "Scarica Tutto in ZIP" per ricevere un archivio contenente tutte le pagine numerate.' },
      { q: 'I documenti legali rimangono protetti?', a: 'Sì, il rendering avviene interamente all\'interno del tuo browser grazie a Mozilla PDF.js.' },
    ],
    relatedSlugs: ['da-jpg-a-pdf', 'dividere-pdf', 'estrarre-pagine-pdf'],
    canonical: 'https://www.mypdftools.it/da-pdf-a-jpg',
    hreflang: { it: 'https://www.mypdftools.it/da-pdf-a-jpg', de: 'https://www.mypdftools.de/pdf-in-jpg' },
  },

  'da-word-a-pdf': {
    slug: 'da-word-a-pdf',
    toolId: 'word-to-pdf',
    lang: 'it',
    domain: 'mypdftools.it',
    h1: 'Convertire da Word a PDF Online',
    metaTitle: 'Da Word a PDF Gratis — Converti Documenti DOCX e DOC in PDF',
    metaDescription: 'Converti file Microsoft Word DOCX e DOC in documenti PDF con layout, font e formattazione intatti. Gratuito e senza account.',
    badge: 'Microsoft Word Compatibile',
    intro: 'Trasforma documenti DOCX e DOC in PDF standardizzati per proteggere la formattazione e garantire che chiunque possa visualizzarli su qualsiasi dispositivo.',
    steps: [
      { title: '1. Carica File Word', desc: 'Seleziona il documento DOCX o DOC dal tuo computer.' },
      { title: '2. Conversione Istantanea', desc: 'Il documento viene strutturato nel formato PDF vettoriale.' },
      { title: '3. Scarica PDF', desc: 'Salva il nuovo PDF pronto per la condivisione.' },
    ],
    faqs: [
      { q: 'I caratteri e l\'impaginazione rimangono uguali?', a: 'Sì, l\'allineamento, le intestazioni, le tabelle e i font vengono preservati fedelmente.' },
    ],
    relatedSlugs: ['da-pdf-a-word', 'da-excel-a-pdf', 'unire-pdf'],
    canonical: 'https://www.mypdftools.it/da-word-a-pdf',
    hreflang: { it: 'https://www.mypdftools.it/da-word-a-pdf', de: 'https://www.mypdftools.de/word-in-pdf' },
  },

  'da-pdf-a-word': {
    slug: 'da-pdf-a-word',
    toolId: 'pdf-to-word',
    lang: 'it',
    domain: 'mypdftools.it',
    h1: 'Convertire da PDF a Word Online Editabile',
    metaTitle: 'Da PDF a Word Gratis — Converti PDF in Documenti DOCX Modificabili',
    metaDescription: 'Trasforma documenti PDF in file Word modificabili (DOCX). Modifica testi, tabelle e paragrafi facilmente. Zero costi, 100% privato.',
    badge: 'DOCX Modificabile',
    intro: 'Estrai il testo e la struttura dai tuoi PDF e trasformali in file Word (.docx) pronti per essere modificati, revisionati e aggiornati.',
    steps: [
      { title: '1. Scegli PDF', desc: 'Carica il documento PDF che desideri convertire in Word.' },
      { title: '2. Estrazione Testo', desc: 'Il parser analizza testi, paragrafi ed elenchi.' },
      { title: '3. Scarica DOCX', desc: 'Apri e modifica il documento direttamente in Microsoft Word o LibreOffice.' },
    ],
    faqs: [
      { q: 'Posso modificare il testo dopo la conversione?', a: 'Sì, il documento DOCX risultante è modificabile in qualsiasi software di videoscrittura.' },
    ],
    relatedSlugs: ['da-word-a-pdf', 'da-pdf-a-markdown', 'modificare-pdf'],
    canonical: 'https://www.mypdftools.it/da-pdf-a-word',
    hreflang: { it: 'https://www.mypdftools.it/da-pdf-a-word', de: 'https://www.mypdftools.de/pdf-in-word' },
  },

  'da-excel-a-pdf': {
    slug: 'da-excel-a-pdf',
    toolId: 'excel-to-pdf',
    lang: 'it',
    domain: 'mypdftools.it',
    h1: 'Convertire da Excel a PDF Online',
    metaTitle: 'Da Excel a PDF Gratis — Converti Fogli XLSX e XLS in PDF',
    metaDescription: 'Converti fogli di calcolo Excel in tabelle PDF ordinate e pronte per la stampa. Nessuna registrazione, elaborazione rapida.',
    badge: 'Microsoft Excel Compatibile',
    intro: 'Trasforma fogli di lavoro XLSX in documenti PDF puliti con colonne ben impaginate e margini adatti alla stampa.',
    steps: [
      { title: '1. Carica Excel', desc: 'Seleziona il foglio XLSX o XLS.' },
      { title: '2. Conversione Tabelle', desc: 'I dati vengono adattati alla larghezza di pagina.' },
      { title: '3. Scarica PDF', desc: 'Salva il PDF pronto da presentare.' },
    ],
    faqs: [
      { q: 'Le formule rimangono visibili?', a: 'Il PDF mostrerà i valori e i risultati delle formule con formattazione numerica corretta.' },
    ],
    relatedSlugs: ['da-pdf-a-excel', 'da-word-a-pdf', 'unire-pdf'],
    canonical: 'https://www.mypdftools.it/da-excel-a-pdf',
    hreflang: { it: 'https://www.mypdftools.it/da-excel-a-pdf', de: 'https://www.mypdftools.de/excel-in-pdf' },
  },

  'da-pdf-a-excel': {
    slug: 'da-pdf-a-excel',
    toolId: 'pdf-to-excel',
    lang: 'it',
    domain: 'mypdftools.it',
    h1: 'Convertire da PDF a Excel Online',
    metaTitle: 'Da PDF a Excel Gratis — Estrai Tabelle PDF in Fogli XLSX',
    metaDescription: 'Estrai tabelle e dati numerici da file PDF direttamente in fogli di calcolo Microsoft Excel XLSX. Facile, veloce e sicuro.',
    badge: 'Estrazione Tabelle',
    intro: 'Recupera bilanci, fatture e rendiconti bloccati nei PDF convertendoli in fogli di calcolo Excel con celle e colonne operative.',
    steps: [
      { title: '1. Carica PDF', desc: 'Carica il documento contenente tabelle e dati.' },
      { title: '2. Estrazione Dati', desc: 'Il motore rileva righe, colonne e intestazioni.' },
      { title: '3. Scarica XLSX', desc: 'Apri i tuoi dati in Excel per formule e grafici.' },
    ],
    faqs: [
      { q: 'I numeri rimangono formattati come cifre?', a: 'Sì, i valori numerici vengono riconosciuti per consentire somme e calcoli immediati.' },
    ],
    relatedSlugs: ['da-excel-a-pdf', 'da-pdf-a-word'],
    canonical: 'https://www.mypdftools.it/da-pdf-a-excel',
    hreflang: { it: 'https://www.mypdftools.it/da-pdf-a-excel', de: 'https://www.mypdftools.de/pdf-in-excel' },
  },

  'firmare-pdf': {
    slug: 'firmare-pdf',
    toolId: 'sign-pdf',
    lang: 'it',
    domain: 'mypdftools.it',
    h1: 'Firmare PDF Online Gratis — Firma Elettronica Senza Stampare',
    metaTitle: 'Firmare PDF Online Gratis — Firma Digitale Disegnata e Sigilli',
    metaDescription: 'Firma contratti, accordi e moduli PDF online senza stampare né scansionare. Disegna la tua firma a mano libera su PC o cellulare.',
    badge: 'Zero Carta',
    intro: 'Apponi la tua firma autografa o compila date e iniziali su qualsiasi documento contrattuale o dichiarazione. Elimina lo spreco di carta e stampanti.',
    steps: [
      { title: '1. Carica Contratto', desc: 'Seleziona il PDF che necessita della tua firma.' },
      { title: '2. Disegna Firma', desc: 'Disegna la firma con il mouse o con il dito su smartphone.' },
      { title: '3. Posiziona e Salva', desc: 'Applica la firma nella posizione esatta e scarica il documento firmato.' },
    ],
    faqs: [
      { q: 'La mia firma viene memorizzata sui vostri server?', a: 'No, la firma esiste esclusivamente nella sessione corrente del tuo browser.' },
      { q: 'È valida per contratti e liberatorie?', a: 'Sì, costituisce firma elettronica semplice ampiamente accettata per pratiche commerciali e private.' },
    ],
    relatedSlugs: ['modificare-pdf', 'proteggere-pdf', 'unire-pdf'],
    canonical: 'https://www.mypdftools.it/firmare-pdf',
    hreflang: { it: 'https://www.mypdftools.it/firmare-pdf', de: 'https://www.mypdftools.de/pdf-unterschreiben' },
  },

  'modificare-pdf': {
    slug: 'modificare-pdf',
    toolId: 'edit-pdf',
    lang: 'it',
    domain: 'mypdftools.it',
    h1: 'Modificare PDF Online — Aggiungi Testi e Forme',
    metaTitle: 'Modificare PDF Online Gratis — Editor PDF Diretto nel Browser',
    metaDescription: 'Aggiungi note, testi, forme e annotazioni sui tuoi documenti PDF. Non serve scaricare software complessi.',
    badge: 'Editor Intuitivo',
    intro: 'Compila moduli, correggi annotazioni o aggiungi caselle di testo sui tuoi file PDF con facilità.',
    steps: [
      { title: '1. Apri Documento', desc: 'Carica il PDF da modificare nell\'editor.' },
      { title: '2. Inserisci Modifiche', desc: 'Scrivi testi, disegna frecce o evidenzia passaggi.' },
      { title: '3. Esporta PDF', desc: 'Scarica il documento revisionato.' },
    ],
    faqs: [
      { q: 'Posso cancellare o coprire del testo esistente?', a: 'Sì, puoi posizionare rettangoli di copertura o inserire nuovi blocchi di testo.' },
    ],
    relatedSlugs: ['firmare-pdf', 'filigrana-pdf', 'numeri-di-pagina-pdf'],
    canonical: 'https://www.mypdftools.it/modificare-pdf',
    hreflang: { it: 'https://www.mypdftools.it/modificare-pdf', de: 'https://www.mypdftools.de/pdf-bearbeiten' },
  },

  'ruotare-pdf': {
    slug: 'ruotare-pdf',
    toolId: 'rotate-pdf',
    lang: 'it',
    domain: 'mypdftools.it',
    h1: 'Ruotare PDF Online — Ruota Pagine di 90°, 180° o 270°',
    metaTitle: 'Ruotare PDF Online Gratis — Ruota Singole Pagine o Tutto il File',
    metaDescription: 'Correggi l\'orientamento delle pagine PDF capovolte o storte. Ruota in senso orario o antiorario e salva definitivamente.',
    intro: 'Correggi documenti scansionati al rovescio o con orientamento orizzontale errato con un solo clic.',
    steps: [
      { title: '1. Carica File', desc: 'Seleziona il PDF con pagine orientate male.' },
      { title: '2. Ruota', desc: 'Gira singole pagine o tutte le pagine contemporaneamente.' },
      { title: '3. Salva Orientamento', desc: 'Scarica il file con l\'orientamento definitivo corretto.' },
    ],
    faqs: [
      { q: 'Posso ruotare solo una singola pagina e non tutto il file?', a: 'Certamente! Puoi ruotare ciascuna miniatura individualmente.' },
    ],
    relatedSlugs: ['organizzare-pdf', 'dividere-pdf', 'unire-pdf'],
    canonical: 'https://www.mypdftools.it/ruotare-pdf',
    hreflang: { it: 'https://www.mypdftools.it/ruotare-pdf', de: 'https://www.mypdftools.de/pdf-drehen' },
  },

  'organizzare-pdf': {
    slug: 'organizzare-pdf',
    toolId: 'organize-pdf',
    lang: 'it',
    domain: 'mypdftools.it',
    h1: 'Organizzare Pagine PDF — Riordina, Elimina e Sposta',
    metaTitle: 'Organizzare PDF Online Gratis — Riordina ed Elimina Pagine PDF',
    metaDescription: 'Trascina le miniature delle pagine per riordinare la sequenza del tuo PDF. Cancella pagine superflue o duplicale visivamente.',
    intro: 'Visualizza tutte le pagine del tuo documento in una comoda griglia interattiva per riorganizzarle secondo le tue esigenze.',
    steps: [
      { title: '1. Carica PDF', desc: 'Visualizza subito l\'anteprima di tutte le pagine.' },
      { title: '2. Trascina e Sposta', desc: 'Cambia l\'ordine delle pagine trascinandole nella griglia.' },
      { title: '3. Salva Ordine', desc: 'Scarica il documento riorganizzato.' },
    ],
    faqs: [
      { q: 'Posso eliminare pagine direttamente da qui?', a: 'Sì, clicca sull\'icona del cestino sopra ogni miniatura per rimuoverla.' },
    ],
    relatedSlugs: ['eliminare-pagine-pdf', 'estrarre-pagine-pdf', 'ruotare-pdf'],
    canonical: 'https://www.mypdftools.it/organizzare-pdf',
    hreflang: { it: 'https://www.mypdftools.it/organizzare-pdf', de: 'https://www.mypdftools.de/pdf-organisieren' },
  },

  'eliminare-pagine-pdf': {
    slug: 'eliminare-pagine-pdf',
    toolId: 'organize-pdf',
    lang: 'it',
    domain: 'mypdftools.it',
    h1: 'Eliminare Pagine da un PDF Online',
    metaTitle: 'Eliminare Pagine PDF Gratis Online — Cancella Pagine Inutili',
    metaDescription: 'Rimuovi pagine bianche o fogli superflui da qualsiasi documento PDF. Veloce, preciso e sicuro al 100%.',
    intro: 'Rimuovi rapidamente pagine vuote, copertine non necessarie o allegati privati prima di inoltrare il tuo documento PDF.',
    steps: [
      { title: '1. Carica Documento', desc: 'Carica il file contenente le pagine da cancellare.' },
      { title: '2. Seleziona da Rimuovere', desc: 'Clicca sull\'icona elimina sopra ciascuna pagina indesiderata.' },
      { title: '3. Salva PDF Pulito', desc: 'Scarica il documento privato delle pagine eliminate.' },
    ],
    faqs: [
      { q: 'Posso eliminare più pagine contemporaneamente?', a: 'Sì, puoi rimuovere tutte le pagine che desideri prima di esportare.' },
    ],
    relatedSlugs: ['organizzare-pdf', 'dividere-pdf', 'estrarre-pagine-pdf'],
    canonical: 'https://www.mypdftools.it/eliminare-pagine-pdf',
    hreflang: { it: 'https://www.mypdftools.it/eliminare-pagine-pdf', de: 'https://www.mypdftools.de/pdf-seiten-loeschen' },
  },

  'estrarre-pagine-pdf': {
    slug: 'estrarre-pagine-pdf',
    toolId: 'split-pdf',
    lang: 'it',
    domain: 'mypdftools.it',
    h1: 'Estrarre Pagine da un PDF Online',
    metaTitle: 'Estrarre Pagine PDF Online Gratis — Salva Pagine Scelte in Nuovo PDF',
    metaDescription: 'Isola pagine specifiche da un PDF grande e salvale come un documento autonomo. Gratis e senza limiti.',
    intro: 'Prendi solo le pagine che ti servono da cataloghi, dispense universitarie o fascicoli legali e genera un PDF dedicato.',
    steps: [
      { title: '1. Apri PDF', desc: 'Carica il file madre da cui estrarre.' },
      { title: '2. Scegli Pagine', desc: 'Indica i numeri delle pagine da estrarre.' },
      { title: '3. Genera Estratto', desc: 'Scarica subito il nuovo PDF concentrato.' },
    ],
    faqs: [
      { q: 'L\'ordine delle pagine estratte può essere variato?', a: 'Sì, puoi specificare l\'ordine esatto delle pagine desiderate.' },
    ],
    relatedSlugs: ['dividere-pdf', 'eliminare-pagine-pdf', 'unire-pdf'],
    canonical: 'https://www.mypdftools.it/estrarre-pagine-pdf',
    hreflang: { it: 'https://www.mypdftools.it/estrarre-pagine-pdf', de: 'https://www.mypdftools.de/pdf-seiten-extrahieren' },
  },

  'proteggere-pdf': {
    slug: 'proteggere-pdf',
    toolId: 'protect-pdf',
    lang: 'it',
    domain: 'mypdftools.it',
    h1: 'Proteggere PDF con Password Online',
    metaTitle: 'Proteggere PDF con Password — Crittografa Documenti PDF Online',
    metaDescription: 'Imposta una password sicura per proteggere i tuoi documenti PDF da accessi non autorizzati. Crittografia direttamente sul tuo dispositivo.',
    badge: 'Crittografia Forte',
    intro: 'Applica una password di sicurezza robusta per impedire l\'apertura o la modifica non autorizzata dei tuoi documenti riservati.',
    steps: [
      { title: '1. Carica PDF', desc: 'Seleziona il file che desideri crittografare.' },
      { title: '2. Inserisci Password', desc: 'Digita e conferma la password di protezione.' },
      { title: '3. Scarica Protetto', desc: 'Salva il PDF crittografato e sicuro.' },
    ],
    faqs: [
      { q: 'Cosa succede se perdo la password?', a: 'La crittografia è robusta: conserva la password con cura, poiché senza di essa il file non potrà essere aperto.' },
    ],
    relatedSlugs: ['sbloccare-pdf', 'firmare-pdf', 'filigrana-pdf'],
    canonical: 'https://www.mypdftools.it/proteggere-pdf',
    hreflang: { it: 'https://www.mypdftools.it/proteggere-pdf', de: 'https://www.mypdftools.de/pdf-schuetzen' },
  },

  'sbloccare-pdf': {
    slug: 'sbloccare-pdf',
    toolId: 'unlock-pdf',
    lang: 'it',
    domain: 'mypdftools.it',
    h1: 'Sbloccare PDF e Rimuovere Password Online',
    metaTitle: 'Sbloccare PDF Online Gratis — Rimuovi Password da File PDF',
    metaDescription: 'Rimuovi la protezione con password dai tuoi documenti PDF per aprirli, stamparli e modificarli liberamente senza doverla reinserire.',
    badge: 'Rimozione Password',
    intro: 'Rimuovi la richiesta di password da file di tua proprietà per poterli consultare e stampare comodamente senza blocchi.',
    steps: [
      { title: '1. Carica File Protetto', desc: 'Seleziona il PDF cifrato.' },
      { title: '2. Inserisci Chiave', desc: 'Digita la password attuale per decifrare.' },
      { title: '3. Scarica Libero', desc: 'Ottieni una copia del PDF priva di restrizioni.' },
    ],
    faqs: [
      { q: 'Posso sbloccare qualsiasi file di cui conosco la password?', a: 'Sì, una volta inserita la chiave valida il documento viene salvato decifrato.' },
    ],
    relatedSlugs: ['proteggere-pdf', 'comprimere-pdf', 'unire-pdf'],
    canonical: 'https://www.mypdftools.it/sbloccare-pdf',
    hreflang: { it: 'https://www.mypdftools.it/sbloccare-pdf', de: 'https://www.mypdftools.de/pdf-entsperren' },
  },

  'filigrana-pdf': {
    slug: 'filigrana-pdf',
    toolId: 'watermark',
    lang: 'it',
    domain: 'mypdftools.it',
    h1: 'Aggiungere Filigrana a PDF Online',
    metaTitle: 'Filigrana PDF Gratis — Applica Timbri e Watermark Personalizzati',
    metaDescription: 'Applica testi di sicurezza (es. BOZZA, RISERVATO, COPIA) o loghi aziendali trasparenti sopra ogni pagina del tuo PDF.',
    badge: 'Testo o Logo Immagine',
    intro: 'Proteggi il copyright dei tuoi documenti o contrassegna bozze e contratti con watermark personalizzati regolando trasparenza e posizione.',
    steps: [
      { title: '1. Scegli Documento', desc: 'Carica il PDF su cui applicare la filigrana.' },
      { title: '2. Personalizza Timbro', desc: 'Digita il testo o carica il logo, scegliendo posizione e trasparenza.' },
      { title: '3. Scarica Protetto', desc: 'Salva il PDF timbrato su tutte le pagine.' },
    ],
    faqs: [
      { q: 'Posso scegliere la trasparenza del testo?', a: 'Sì, puoi regolare l\'opacità per non oscurare i contenuti sottostanti.' },
    ],
    relatedSlugs: ['numeri-di-pagina-pdf', 'firmare-pdf', 'proteggere-pdf'],
    canonical: 'https://www.mypdftools.it/filigrana-pdf',
    hreflang: { it: 'https://www.mypdftools.it/filigrana-pdf', de: 'https://www.mypdftools.de/pdf-wasserzeichen' },
  },

  'numeri-di-pagina-pdf': {
    slug: 'numeri-di-pagina-pdf',
    toolId: 'page-numbers',
    lang: 'it',
    domain: 'mypdftools.it',
    h1: 'Numeri di Pagina PDF Online — Inserisci Paginazione',
    metaTitle: 'Numeri di Pagina PDF Gratis — Aggiungi Paginazione Personalizzata',
    metaDescription: 'Numera le pagine dei tuoi PDF automaticamente. Scegli posizione, carattere e formato (es. Pagina 1 di N). Veloce e preciso.',
    intro: 'Aggiungi numeri di pagina coerenti a fascicoli legali, tesine universitarie o cataloghi prima della rilegatura e della stampa.',
    steps: [
      { title: '1. Carica File', desc: 'Seleziona il PDF da impaginare.' },
      { title: '2. Configura Numerazione', desc: 'Seleziona la posizione (in alto, in basso, a destra o al centro).' },
      { title: '3. Scarica Paginato', desc: 'Salva il documento completo di numerazione.' },
    ],
    faqs: [
      { q: 'Posso saltare la prima pagina (copertina)?', a: 'Sì, puoi impostare l\'inizio della numerazione dalla pagina 2 o successiva.' },
    ],
    relatedSlugs: ['filigrana-pdf', 'unire-pdf', 'modificare-pdf'],
    canonical: 'https://www.mypdftools.it/numeri-di-pagina-pdf',
    hreflang: { it: 'https://www.mypdftools.it/numeri-di-pagina-pdf', de: 'https://www.mypdftools.de/pdf-seitenzahlen' },
  },

  'da-pdf-a-markdown': {
    slug: 'da-pdf-a-markdown',
    toolId: 'pdf-to-markdown',
    lang: 'it',
    domain: 'mypdftools.it',
    h1: 'Convertire da PDF a Markdown Online per AI e Note',
    metaTitle: 'Da PDF a Markdown Gratis — Estrai Testo e Tabelle per ChatGPT e LLM',
    metaDescription: 'Trasforma documenti PDF in file Markdown puliti (.md) ideali per Obsidian, Notion, LLM e prompt di intelligenza artificiale.',
    badge: 'AI & LLM Ready',
    intro: 'Estrai testi formattati, titoli e tabelle da articoli e PDF complessi in Markdown pulito, perfetto da fornire in pasto a modelli di intelligenza artificiale o annotare su Obsidian.',
    steps: [
      { title: '1. Carica PDF', desc: 'Carica il file da convertire in Markdown.' },
      { title: '2. Parsing Istantaneo', desc: 'I paragrafi, titoli e liste vengono convertiti in sintassi .md.' },
      { title: '3. Copia o Scarica', desc: 'Scarica il file .md o copia direttamente il testo negli appunti.' },
    ],
    faqs: [
      { q: 'Mantiene i titoli e le liste puntate?', a: 'Sì, converte i livelli di intestazione (#, ##) e gli elenchi in Markdown standard.' },
    ],
    relatedSlugs: ['da-pdf-a-word', 'da-pdf-a-jpg'],
    canonical: 'https://www.mypdftools.it/da-pdf-a-markdown',
    hreflang: { it: 'https://www.mypdftools.it/da-pdf-a-markdown', de: 'https://www.mypdftools.de/pdf-in-markdown' },
  },

  /* ==========================================================================
     GERMAN ROUTES (mypdftools.de) — Core Tools & High-Search Intents
     ========================================================================== */
  'pdf-zusammenfuegen': {
    slug: 'pdf-zusammenfuegen',
    toolId: 'merge-pdf',
    lang: 'de',
    domain: 'mypdftools.de',
    h1: 'PDF zusammenfügen — Kostenlos & 100% Sicher Online',
    metaTitle: 'PDF zusammenfügen online — Mehrere PDF-Dateien verbinden (Kein Upload)',
    metaDescription: 'Mehrere PDFs in Sekundenschnelle zu einer Datei zusammenfügen. 100% lokale Verarbeitung im Browser. Keine Registrierung, kein Daten-Upload.',
    badge: '100% Datenschutz',
    intro: 'Fügen Sie mehrere PDF-Dokumente schnell und unkompliziert zu einer einzigen, übersichtlichen PDF-Datei zusammen. Da alle Berechnungen direkt im Arbeitsspeicher Ihres Endgeräts stattfinden, verlassen Ihre vertraulichen Daten zu keinem Zeitpunkt Ihren Browser.',
    steps: [
      { title: '1. PDFs auswählen', desc: 'Laden Sie zwei oder mehr PDF-Dateien per Klick oder Drag & Drop hoch.' },
      { title: '2. Reihenfolge anpassen', desc: 'Sortieren Sie die Dokumente über die Pfeiltasten in die gewünschte Abfolge.' },
      { title: '3. Zusammenfügen & Speichern', desc: 'Klicken Sie auf "PDF zusammenfügen" und laden Sie das Ergebnis sofort herunter.' },
    ],
    faqs: [
      { q: 'Werden meine Daten auf Server im Internet übertragen?', a: 'Nein! MyPdfTools verarbeitet alle Dateien zu 100% lokal in Ihrem Browser via WebAssembly. Es findet keinerlei Server-Upload statt.' },
      { q: 'Gibt es eine Beschränkung der Dateianzahl oder Dateigröße?', a: 'Nein, es gibt keine künstlichen Limits. Sie können so viele Dokumente verbinden, wie Ihr Browser-Arbeitsspeicher bewältigen kann.' },
      { q: 'Bleibt die Text- und Druckqualität erhalten?', a: 'Ja, Vektorgrafiken, Schriften und eingebettete Bilder werden verlustfrei übernommen.' },
    ],
    relatedSlugs: ['pdf-teilen', 'pdf-komprimieren', 'pdf-organisieren', 'pdf-unterschreiben'],
    canonical: 'https://www.mypdftools.de/pdf-zusammenfuegen',
    hreflang: { it: 'https://www.mypdftools.it/unire-pdf', de: 'https://www.mypdftools.de/pdf-zusammenfuegen' },
  },

  'pdf-teilen': {
    slug: 'pdf-teilen',
    toolId: 'split-pdf',
    lang: 'de',
    domain: 'mypdftools.de',
    h1: 'PDF teilen & Seiten trennen online',
    metaTitle: 'PDF teilen online — Einzelne Seiten aus PDF trennen & speichern',
    metaDescription: 'Trennen Sie Seitenbereiche aus PDF-Dokumenten oder speichern Sie jede Seite einzeln. Kostenlos, ohne Registrierung und sicher im Browser.',
    badge: 'Ohne Upload',
    intro: 'Extrahieren Sie einzelne Seiten oder zerlegen Sie umfangreiche PDF-Dateien in kompakte Einzeldokumente – ideal für Rechnungen, Verträge oder Buchkapitel.',
    steps: [
      { title: '1. PDF hochladen', desc: 'Wählen Sie das zu teilende Dokument von Ihrem PC oder Smartphone.' },
      { title: '2. Seitenbereich angeben', desc: 'Geben Sie gewünschte Seitenzahlen ein (z. B. 1-3, 5) oder wählen Sie Einzelseiten.' },
      { title: '3. Getrennte PDFs sichern', desc: 'Laden Sie das extrahierte Dokument oder ein ZIP-Archiv aller Einzelseiten herunter.' },
    ],
    faqs: [
      { q: 'Wie trenne ich nicht zusammenhängende Seiten?', a: 'Verwenden Sie Kommas und Bindestriche, wie beispielsweise: "1-4, 7, 10-12".' },
      { q: 'Wird meine Originaldatei gelöscht oder überschrieben?', a: 'Nein, Ihre Ausgangsdatei bleibt unberührt. Es wird ein neues separates Dokument erstellt.' },
    ],
    relatedSlugs: ['pdf-zusammenfuegen', 'pdf-seiten-extrahieren', 'pdf-seiten-loeschen'],
    canonical: 'https://www.mypdftools.de/pdf-teilen',
    hreflang: { it: 'https://www.mypdftools.it/dividere-pdf', de: 'https://www.mypdftools.de/pdf-teilen' },
  },

  'pdf-komprimieren': {
    slug: 'pdf-komprimieren',
    toolId: 'compress-pdf',
    lang: 'de',
    domain: 'mypdftools.de',
    h1: 'PDF komprimieren — Dateigröße reduzieren',
    metaTitle: 'PDF komprimieren online — Dateigröße kostenlos verringern',
    metaDescription: 'Reduzieren Sie die Dateigröße Ihrer PDFs für den E-Mail-Versand und Bewerbungen bei bester Qualität. 100% vertraulich ohne Cloud-Speicherung.',
    badge: 'E-Mail & Bewerbungsoptimiert',
    intro: 'Verringern Sie die Megabyte-Größe sperriger PDF-Dateien. Beseitigen Sie Fehlermeldungen wegen zu großer E-Mail-Anhänge in Sekunden.',
    steps: [
      { title: '1. Dokument wählen', desc: 'Wählen Sie die zu große PDF-Datei aus.' },
      { title: '2. Automatische Optimierung', desc: 'Bilder und interne Strukturen werden intelligent komprimiert.' },
      { title: '3. Kompaktes PDF sichern', desc: 'Laden Sie die verkleinerte PDF-Datei direkt herunter.' },
    ],
    faqs: [
      { q: 'Bleiben Texte scharf und lesbar?', a: 'Ja, Schriften bleiben gestochen scharf, während unsichtbare redundante Daten komprimiert werden.' },
    ],
    relatedSlugs: ['pdf-verkleinern', 'pdf-dateigroesse-reduzieren', 'pdf-zusammenfuegen'],
    canonical: 'https://www.mypdftools.de/pdf-komprimieren',
    hreflang: { it: 'https://www.mypdftools.it/comprimere-pdf', de: 'https://www.mypdftools.de/pdf-komprimieren' },
  },

  'pdf-verkleinern': {
    slug: 'pdf-verkleinern',
    toolId: 'compress-pdf',
    lang: 'de',
    domain: 'mypdftools.de',
    h1: 'PDF verkleinern online kostenlos',
    metaTitle: 'PDF verkleinern online — PDF MB verringern ohne Qualitätsverlust',
    metaDescription: 'PDFs verkleinern für Uploads auf Behördenportalen und E-Mail-Postfächern. Schnell, kostenlos und ohne Software-Installation.',
    intro: 'Machen Sie Ihre PDF-Dateien passend für starre Upload-Grenzen auf Portalen von Universitäten, Behörden und Arbeitgebern.',
    steps: [
      { title: '1. Datei auswählen', desc: 'Laden Sie das schwere PDF-Dokument in das Feld.' },
      { title: '2. Sofortige Reduzierung', desc: 'Der lokale Kompressor verkleinert das Datenvolumen.' },
      { title: '3. Herunterladen', desc: 'Speichern Sie das fertige schlanke Dokument.' },
    ],
    faqs: [
      { q: 'Ist das Verkleinern für vertrauliche Steuerunterlagen geeignet?', a: 'Ja, da MyPdfTools komplett lokal im Browser rechnet und keine Dateien auf fremde Server lädt.' },
    ],
    relatedSlugs: ['pdf-komprimieren', 'pdf-dateigroesse-reduzieren', 'pdf-zusammenfuegen'],
    canonical: 'https://www.mypdftools.de/pdf-verkleinern',
    hreflang: { it: 'https://www.mypdftools.it/ridurre-dimensione-pdf', de: 'https://www.mypdftools.de/pdf-verkleinern' },
  },

  'jpg-in-pdf': {
    slug: 'jpg-in-pdf',
    toolId: 'jpg-to-pdf',
    lang: 'de',
    domain: 'mypdftools.de',
    h1: 'JPG in PDF umwandeln online',
    metaTitle: 'JPG in PDF umwandeln kostenlos — Bilder zu PDF konvertieren',
    metaDescription: 'Wandeln Sie JPG-, PNG- und WebP-Bilder in Sekunden in saubere PDF-Dokumente um. Seitenränder und Ausrichtung frei anpassbar.',
    badge: 'Unterstützt JPG, PNG, WebP',
    intro: 'Erstellen Sie aus Fotos, Belegen und Grafiken ein druckfertiges A4-PDF. Verbinden Sie mehrere Fotos zu einem einzigen Gesamtdokument.',
    steps: [
      { title: '1. Bilder auswählen', desc: 'Wählen Sie ein oder mehrere JPG-, PNG- oder WebP-Fotos.' },
      { title: '2. Layout einstellen', desc: 'Passen Sie Seitenausrichtung und Ränder an.' },
      { title: '3. Konvertieren & Speichern', desc: 'Erhalten Sie das fertige PDF sofort ohne Wartezeit.' },
    ],
    faqs: [
      { q: 'Kann ich mehrere Bilder in einer PDF zusammenfassen?', a: 'Ja, Sie können beliebig viele Bilder auswählen und über Pfeiltasten ordnen.' },
    ],
    relatedSlugs: ['fotos-in-pdf-umwandeln', 'pdf-in-jpg', 'pdf-zusammenfuegen'],
    canonical: 'https://www.mypdftools.de/jpg-in-pdf',
    hreflang: { it: 'https://www.mypdftools.it/da-jpg-a-pdf', de: 'https://www.mypdftools.de/jpg-in-pdf' },
  },

  'fotos-in-pdf-umwandeln': {
    slug: 'fotos-in-pdf-umwandeln',
    toolId: 'jpg-to-pdf',
    lang: 'de',
    domain: 'mypdftools.de',
    h1: 'Fotos in PDF umwandeln am Smartphone & PC',
    metaTitle: 'Fotos in PDF umwandeln online kostenlos — Direkt im Browser',
    metaDescription: 'Handy-Fotos von Dokumenten, Quittungen und Zeugnissen sofort in ein praktisches PDF zusammenfassen. Kostenlos ohne App.',
    intro: 'Fotografierte Dokumente, handschriftliche Notizen oder Personalausweise schnell in ein einheitliches PDF übertragen.',
    steps: [
      { title: '1. Fotos hochladen', desc: 'Wählen Sie Fotos direkt aus der Fotogalerie.' },
      { title: '2. Seiten reihen', desc: 'Bringen Sie die Fotos in die chronologische Reihenfolge.' },
      { title: '3. PDF generieren', desc: 'Speichern Sie das fertige PDF für den Versand.' },
    ],
    faqs: [
      { q: 'Funktioniert das auf iOS und Android?', a: 'Ja, ganz ohne App-Installation in jedem gängigen Mobilbrowser.' },
    ],
    relatedSlugs: ['jpg-in-pdf', 'pdf-in-jpg'],
    canonical: 'https://www.mypdftools.de/fotos-in-pdf-umwandeln',
    hreflang: { it: 'https://www.mypdftools.it/convertire-foto-in-pdf', de: 'https://www.mypdftools.de/fotos-in-pdf-umwandeln' },
  },

  'pdf-in-jpg': {
    slug: 'pdf-in-jpg',
    toolId: 'pdf-to-jpg',
    lang: 'de',
    domain: 'mypdftools.de',
    h1: 'PDF in JPG umwandeln in hoher Auflösung',
    metaTitle: 'PDF in JPG umwandeln kostenlos — PDF Seiten als Bilder speichern',
    metaDescription: 'Wandeln Sie PDF-Seiten in hochauflösende JPG- oder PNG-Bilder um. Als Einzelseite oder alle Seiten im ZIP-Paket sichern.',
    badge: 'Einzelbild oder ZIP',
    intro: 'Konvertieren Sie PDF-Seiten in scharfe Bilddateien zur problemlosen Einbindung in Präsentationen, Webseiten oder Word-Dokumente.',
    steps: [
      { title: '1. PDF-Dokument wählen', desc: 'Laden Sie die umzuwandelnde PDF-Datei hoch.' },
      { title: '2. Bildformat festlegen', desc: 'Wählen Sie JPG oder PNG sowie die gewünschte Bildauflösung (100–200 DPI).' },
      { title: '3. Bilder sichern', desc: 'Laden Sie einzelne Seiten oder das komplette ZIP-Paket herunter.' },
    ],
    faqs: [
      { q: 'Wie speichere ich alle Seiten auf einmal?', a: 'Klicken Sie auf den grünen Button "Alles als ZIP herunterladen", um alle Seiten durchnummeriert zu erhalten.' },
    ],
    relatedSlugs: ['jpg-in-pdf', 'pdf-teilen', 'pdf-seiten-extrahieren'],
    canonical: 'https://www.mypdftools.de/pdf-in-jpg',
    hreflang: { it: 'https://www.mypdftools.it/da-pdf-a-jpg', de: 'https://www.mypdftools.de/pdf-in-jpg' },
  },

  'word-in-pdf': {
    slug: 'word-in-pdf',
    toolId: 'word-to-pdf',
    lang: 'de',
    domain: 'mypdftools.de',
    h1: 'Word in PDF umwandeln online',
    metaTitle: 'Word in PDF umwandeln kostenlos — DOCX & DOC zu PDF konvertieren',
    metaDescription: 'Konvertieren Sie Microsoft Word Dokumente (DOCX, DOC) zuverlässig in unveränderbare PDF-Dateien. Layout & Schriften bleiben 100% erhalten.',
    badge: 'Microsoft Word Kompatibel',
    intro: 'Wandeln Sie Word-Dateien in universelle PDFs um, damit Empfänger das Dokument auf jedem Gerät exakt so sehen, wie Sie es gestaltet haben.',
    steps: [
      { title: '1. Word-Datei wählen', desc: 'Laden Sie Ihr DOCX- oder DOC-Dokument hoch.' },
      { title: '2. Automatische Konvertierung', desc: 'Das Dokument wird in ein sauberes PDF überführt.' },
      { title: '3. PDF herunterladen', desc: 'Sichern Sie die druckfertige PDF-Datei.' },
    ],
    faqs: [
      { q: 'Bleibt die Formatierung erhalten?', a: 'Ja, Absätze, Schriftstile, Tabellen und Grafiken bleiben formgetreu bestehen.' },
    ],
    relatedSlugs: ['pdf-in-word', 'excel-in-pdf', 'pdf-zusammenfuegen'],
    canonical: 'https://www.mypdftools.de/word-in-pdf',
    hreflang: { it: 'https://www.mypdftools.it/da-word-a-pdf', de: 'https://www.mypdftools.de/word-in-pdf' },
  },

  'pdf-in-word': {
    slug: 'pdf-in-word',
    toolId: 'pdf-to-word',
    lang: 'de',
    domain: 'mypdftools.de',
    h1: 'PDF in Word umwandeln & bearbeiten',
    metaTitle: 'PDF in Word umwandeln kostenlos — Editierbare DOCX Dateien erstellen',
    metaDescription: 'Konvertieren Sie PDF-Dateien in bearbeitbare Word-Dokumente (DOCX). Texte, Tabellen und Absätze direkt in MS Word bearbeiten.',
    badge: 'Bearbeitbares DOCX',
    intro: 'Extrahieren Sie Texte und Tabellenstrukturen aus starren PDF-Dokumenten, um sie in Microsoft Word oder LibreOffice flexibel zu aktualisieren.',
    steps: [
      { title: '1. PDF auswählen', desc: 'Laden Sie das umzuwandelnde PDF hoch.' },
      { title: '2. Texterkennung', desc: 'Die Text- und Tabellenstruktur wird analysiert.' },
      { title: '3. DOCX herunterladen', desc: 'Öffnen und bearbeiten Sie die Word-Datei.' },
    ],
    faqs: [
      { q: 'Kann ich den Text nach der Umwandlung verändern?', a: 'Ja, Sie erhalten ein vollwertiges DOCX-Dokument zur freien Bearbeitung.' },
    ],
    relatedSlugs: ['word-in-pdf', 'pdf-in-markdown', 'pdf-bearbeiten'],
    canonical: 'https://www.mypdftools.de/pdf-in-word',
    hreflang: { it: 'https://www.mypdftools.it/da-pdf-a-word', de: 'https://www.mypdftools.de/pdf-in-word' },
  },

  'excel-in-pdf': {
    slug: 'excel-in-pdf',
    toolId: 'excel-to-pdf',
    lang: 'de',
    domain: 'mypdftools.de',
    h1: 'Excel in PDF umwandeln online',
    metaTitle: 'Excel in PDF umwandeln kostenlos — XLSX Tabellen zu PDF',
    metaDescription: 'Verwandeln Sie Excel-Tabellen (XLSX, XLS) in saubere, druckfertige PDF-Dateien. Spalten und Zahlen bleiben perfekt ausgerichtet.',
    badge: 'Microsoft Excel Kompatibel',
    intro: 'Exportieren Sie Kalkulationen, Bilanzen und Übersichten in ein professionelles PDF-Dokument, das nicht versehentlich verändert werden kann.',
    steps: [
      { title: '1. Excel-Tabelle wählen', desc: 'Laden Sie Ihre XLSX- oder XLS-Datei hoch.' },
      { title: '2. Umwandlung', desc: 'Die Tabellenbreite wird optimal auf die Seite angepasst.' },
      { title: '3. PDF speichern', desc: 'Laden Sie das druckfertige PDF herunter.' },
    ],
    faqs: [
      { q: 'Werden Zahlenformate beibehalten?', a: 'Ja, Währungen, Dezimalstellen und Datumsangaben bleiben exakt erhalten.' },
    ],
    relatedSlugs: ['pdf-in-excel', 'word-in-pdf'],
    canonical: 'https://www.mypdftools.de/excel-in-pdf',
    hreflang: { it: 'https://www.mypdftools.it/da-excel-a-pdf', de: 'https://www.mypdftools.de/excel-in-pdf' },
  },

  'pdf-in-excel': {
    slug: 'pdf-in-excel',
    toolId: 'pdf-to-excel',
    lang: 'de',
    domain: 'mypdftools.de',
    h1: 'PDF in Excel umwandeln & Tabellen extrahieren',
    metaTitle: 'PDF in Excel umwandeln kostenlos — Tabellen in XLSX übertragen',
    metaDescription: 'Extrahieren Sie Tabellen aus PDF-Dokumenten direkt in bearbeitbare Microsoft Excel Tabellenblätter (XLSX).',
    badge: 'Tabellen-Extraktion',
    intro: 'Befreien Sie Finanzdaten, Rechnungsaufstellungen und Statistiken aus gesperrten PDFs zur Weiterverarbeitung in Excel.',
    steps: [
      { title: '1. PDF hochladen', desc: 'Wählen Sie das tabellarische PDF-Dokument.' },
      { title: '2. Tabellenanalyse', desc: 'Zeilen, Spalten und Zahlen werden ausgelesen.' },
      { title: '3. XLSX sichern', desc: 'Nutzen Sie Formeln und Diagramme in Excel.' },
    ],
    faqs: [
      { q: 'Werden Zahlen als echte Werte erkannt?', a: 'Ja, sodass Sie sofort Summen und Berechnungen durchführen können.' },
    ],
    relatedSlugs: ['excel-in-pdf', 'pdf-in-word'],
    canonical: 'https://www.mypdftools.de/pdf-in-excel',
    hreflang: { it: 'https://www.mypdftools.it/da-pdf-a-excel', de: 'https://www.mypdftools.de/pdf-in-excel' },
  },

  'pdf-unterschreiben': {
    slug: 'pdf-unterschreiben',
    toolId: 'sign-pdf',
    lang: 'de',
    domain: 'mypdftools.de',
    h1: 'PDF unterschreiben online — Elektronische Signatur',
    metaTitle: 'PDF unterschreiben kostenlos — Digitale Unterschrift ohne Drucken',
    metaDescription: 'Verträge, Mietverträge und Formulare direkt online signieren. Zeichnen Sie Ihre Unterschrift mit der Maus oder dem Finger auf dem Handy.',
    badge: 'Ohne Drucker & Scanner',
    intro: 'Vermeiden Sie lästiges Ausdrucken, manuelles Unterschreiben und Neueinscannen. Signieren Sie Ihre PDF-Dokumente in Sekunden direkt am Bildschirm.',
    steps: [
      { title: '1. PDF öffnen', desc: 'Laden Sie den zu signierenden Vertrag hoch.' },
      { title: '2. Signatur zeichnen', desc: 'Zeichnen Sie Ihre Unterschrift oder tippen Sie Ihren Namen.' },
      { title: '3. Platzieren & Sichern', desc: 'Platzieren Sie die Unterschrift auf der Zeile und laden Sie das PDF herunter.' },
    ],
    faqs: [
      { q: 'Wird meine Unterschrift online gespeichert?', a: 'Nein, Ihre Unterschrift verbleibt ausschließlich in Ihrem lokalen Browser-Speicher.' },
    ],
    relatedSlugs: ['pdf-bearbeiten', 'pdf-schuetzen', 'pdf-zusammenfuegen'],
    canonical: 'https://www.mypdftools.de/pdf-unterschreiben',
    hreflang: { it: 'https://www.mypdftools.it/firmare-pdf', de: 'https://www.mypdftools.de/pdf-unterschreiben' },
  },

  'pdf-bearbeiten': {
    slug: 'pdf-bearbeiten',
    toolId: 'edit-pdf',
    lang: 'de',
    domain: 'mypdftools.de',
    h1: 'PDF bearbeiten online — Texte & Notizen hinzufügen',
    metaTitle: 'PDF bearbeiten kostenlos online — PDF Editor direkt im Browser',
    metaDescription: 'Fügen Sie Texte, Markierungen, Pfeile und Anmerkungen zu Ihren PDF-Dokumenten hinzu. Ohne Installation von Programmen.',
    badge: 'Einfacher PDF-Editor',
    intro: 'Füllen Sie Formulare aus, ergänzen Sie Kommentare oder zeichnen Sie Hervorhebungen direkt in Ihrem Dokument.',
    steps: [
      { title: '1. PDF hochladen', desc: 'Öffnen Sie das Dokument im Browser-Editor.' },
      { title: '2. Inhalte anfügen', desc: 'Platzieren Sie Textfelder oder geometrische Formen.' },
      { title: '3. Fertiges PDF sichern', desc: 'Laden Sie die aktualisierte Version herunter.' },
    ],
    faqs: [
      { q: 'Kann ich Textfelder beliebig verschieben?', a: 'Ja, Sie können Schriftgröße, Farbe und Position frei anpassen.' },
    ],
    relatedSlugs: ['pdf-unterschreiben', 'pdf-wasserzeichen', 'pdf-seitenzahlen'],
    canonical: 'https://www.mypdftools.de/pdf-bearbeiten',
    hreflang: { it: 'https://www.mypdftools.it/modificare-pdf', de: 'https://www.mypdftools.de/pdf-bearbeiten' },
  },

  'pdf-drehen': {
    slug: 'pdf-drehen',
    toolId: 'rotate-pdf',
    lang: 'de',
    domain: 'mypdftools.de',
    h1: 'PDF drehen online — Seiten um 90° oder 180° rotieren',
    metaTitle: 'PDF drehen online kostenlos — Seiten dauerhaft rotieren',
    metaDescription: 'Bringen Sie falsch herum gescannte PDF-Seiten dauerhaft in die richtige Ausrichtung. Im oder gegen den Uhrzeigersinn drehen.',
    intro: 'Korrigieren Sie auf dem Kopf stehende oder querformatige Seiten mit einem einzigen Klick und speichern Sie die Ausrichtung dauerhaft.',
    steps: [
      { title: '1. Datei auswählen', desc: 'Laden Sie das PDF mit fehlerhafter Drehung hoch.' },
      { title: '2. Ausrichtung korrigieren', desc: 'Drehen Sie einzelne Seiten oder das Gesamtdokument.' },
      { title: '3. Dauerhaft sichern', desc: 'Speichern Sie das richtig ausgerichtete PDF.' },
    ],
    faqs: [
      { q: 'Bleibt die Drehung auch beim späteren Ausdrucken bestehen?', a: 'Ja, die Rotation wird dauerhaft in der PDF-Struktur gespeichert.' },
    ],
    relatedSlugs: ['pdf-organisieren', 'pdf-teilen', 'pdf-zusammenfuegen'],
    canonical: 'https://www.mypdftools.de/pdf-drehen',
    hreflang: { it: 'https://www.mypdftools.it/ruotare-pdf', de: 'https://www.mypdftools.de/pdf-drehen' },
  },

  'pdf-organisieren': {
    slug: 'pdf-organisieren',
    toolId: 'organize-pdf',
    lang: 'de',
    domain: 'mypdftools.de',
    h1: 'PDF organisieren — Seiten sortieren, verschieben & löschen',
    metaTitle: 'PDF organisieren kostenlos — Seitenreihenfolge visuell ändern',
    metaDescription: 'Ordnen Sie PDF-Seiten bequem per Drag & Drop neu an. Löschen Sie überflüssige Seiten oder duplizieren Sie wichtige Abschnitte.',
    intro: 'Verschaffen Sie sich in der visuellen Kachelansicht den perfekten Überblick und bringen Sie Dokumente in die optimale Reihenfolge.',
    steps: [
      { title: '1. Dokument hochladen', desc: 'Sehen Sie alle Seiten auf einen Blick.' },
      { title: '2. Per Drag & Drop verschieben', desc: 'Ziehen Sie die Seiten an die gewünschte Position.' },
      { title: '3. Neues PDF erstellen', desc: 'Speichern Sie das neu geordnete Dokument.' },
    ],
    faqs: [
      { q: 'Kann ich leere Seiten direkt löschen?', a: 'Ja, klicken Sie einfach auf den Papierkorb über der jeweiligen Seite.' },
    ],
    relatedSlugs: ['pdf-seiten-loeschen', 'pdf-seiten-extrahieren', 'pdf-drehen'],
    canonical: 'https://www.mypdftools.de/pdf-organisieren',
    hreflang: { it: 'https://www.mypdftools.it/organizzare-pdf', de: 'https://www.mypdftools.de/pdf-organisieren' },
  },

  'pdf-seiten-loeschen': {
    slug: 'pdf-seiten-loeschen',
    toolId: 'organize-pdf',
    lang: 'de',
    domain: 'mypdftools.de',
    h1: 'Seiten aus PDF löschen online',
    metaTitle: 'PDF Seiten löschen kostenlos — Überflüssige Seiten entfernen',
    metaDescription: 'Löschen Sie leere Seiten oder irrelevante Anhänge aus jedem PDF-Dokument. Schnell, sauber und ohne Wasserzeichen.',
    intro: 'Entfernen Sie unerwünschte Einzelseiten aus Verträgen, Skripten oder Belegen, bevor Sie das PDF weiterleiten.',
    steps: [
      { title: '1. PDF hochladen', desc: 'Laden Sie das Dokument hoch.' },
      { title: '2. Seiten zum Löschen wählen', desc: 'Markieren und entfernen Sie die unerwünschten Seiten.' },
      { title: '3. Bereinigtes PDF sichern', desc: 'Laden Sie das schlanke PDF herunter.' },
    ],
    faqs: [
      { q: 'Können gelöschte Seiten im neuen PDF wiederhergestellt werden?', a: 'Nein, das erstellte PDF enthält die gelöschten Seiten nicht mehr.' },
    ],
    relatedSlugs: ['pdf-organisieren', 'pdf-teilen', 'pdf-seiten-extrahieren'],
    canonical: 'https://www.mypdftools.de/pdf-seiten-loeschen',
    hreflang: { it: 'https://www.mypdftools.it/eliminare-pagine-pdf', de: 'https://www.mypdftools.de/pdf-seiten-loeschen' },
  },

  'pdf-seiten-extrahieren': {
    slug: 'pdf-seiten-extrahieren',
    toolId: 'split-pdf',
    lang: 'de',
    domain: 'mypdftools.de',
    h1: 'Seiten aus PDF extrahieren online',
    metaTitle: 'PDF Seiten extrahieren kostenlos — Bestimmte Seiten als PDF speichern',
    metaDescription: 'Extrahieren Sie gezielt bestimmte Seiten aus einem Dokument und erstellen Sie daraus ein kompaktes neues PDF.',
    intro: 'Extrahieren Sie nur die relevanten Seiten aus Katalogen, Gesetzestexten oder Handbüchern.',
    steps: [
      { title: '1. PDF öffnen', desc: 'Wählen Sie die Ausgangsdatei.' },
      { title: '2. Seitenzahlen festlegen', desc: 'Geben Sie die Nummern der gewünschten Seiten ein.' },
      { title: '3. Extrakt downloaden', desc: 'Erhalten Sie das neue fokussierte Dokument.' },
    ],
    faqs: [
      { q: 'Kann ich die Reihenfolge der extrahierten Seiten ändern?', a: 'Ja, indem Sie die gewünschte Seitenabfolge angeben.' },
    ],
    relatedSlugs: ['pdf-teilen', 'pdf-seiten-loeschen', 'pdf-zusammenfuegen'],
    canonical: 'https://www.mypdftools.de/pdf-seiten-extrahieren',
    hreflang: { it: 'https://www.mypdftools.it/estrarre-pagine-pdf', de: 'https://www.mypdftools.de/pdf-seiten-extrahieren' },
  },

  'pdf-schuetzen': {
    slug: 'pdf-schuetzen',
    toolId: 'protect-pdf',
    lang: 'de',
    domain: 'mypdftools.de',
    h1: 'PDF mit Passwort schützen — Verschlüsselung online',
    metaTitle: 'PDF mit Passwort schützen online — PDF verschlüsseln (DSGVO-sicher)',
    metaDescription: 'Schützen Sie vertrauliche PDF-Dokumente mit einem starken Passwort vor unbefugtem Zugriff. 100% lokal im Browser verschlüsselt.',
    badge: 'Starke Verschlüsselung',
    intro: 'Verschlüsseln Sie sensible Gehaltsabrechnungen, Steuerdaten oder juristische Akten mit einem sicheren Passwort vor dem E-Mail-Versand.',
    steps: [
      { title: '1. PDF wählen', desc: 'Laden Sie das zu schützende Dokument hoch.' },
      { title: '2. Passwort vergeben', desc: 'Geben Sie ein sicheres Passwort ein und bestätigen Sie es.' },
      { title: '3. Geschütztes PDF speichern', desc: 'Laden Sie die verschlüsselte Datei herunter.' },
    ],
    faqs: [
      { q: 'Kann das Dokument ohne Passwort geöffnet werden?', a: 'Nein, das Passwort wird zum Entschlüsseln zwingend benötigt.' },
    ],
    relatedSlugs: ['pdf-entsperren', 'pdf-unterschreiben', 'pdf-wasserzeichen'],
    canonical: 'https://www.mypdftools.de/pdf-schuetzen',
    hreflang: { it: 'https://www.mypdftools.it/proteggere-pdf', de: 'https://www.mypdftools.de/pdf-schuetzen' },
  },

  'pdf-entsperren': {
    slug: 'pdf-entsperren',
    toolId: 'unlock-pdf',
    lang: 'de',
    domain: 'mypdftools.de',
    h1: 'PDF Passwort entfernen — Dokument entsperren',
    metaTitle: 'PDF entsperren online kostenlos — Passwort dauerhaft entfernen',
    metaDescription: 'Entfernen Sie die Passwortabfrage von eigenen PDF-Dateien, um diese dauerhaft frei drucken, öffnen und bearbeiten zu können.',
    badge: 'Passwort-Entfernung',
    intro: 'Befreien Sie Ihre eigenen Dokumente von ständigen Kennwortabfragen, wenn Sie diese archivieren oder unkompliziert weitergeben möchten.',
    steps: [
      { title: '1. Gesichertes PDF hochladen', desc: 'Wählen Sie die passwortgeschützte Datei.' },
      { title: '2. Passwort eingeben', desc: 'Geben Sie das aktuelle Passwort zur Freigabe ein.' },
      { title: '3. Ungeschütztes PDF sichern', desc: 'Laden Sie die ungesperrte Version herunter.' },
    ],
    faqs: [
      { q: 'Wird das Passwort danach noch abgefragt?', a: 'Nein, das neue Dokument ist dauerhaft entsperrt.' },
    ],
    relatedSlugs: ['pdf-schuetzen', 'pdf-komprimieren', 'pdf-zusammenfuegen'],
    canonical: 'https://www.mypdftools.de/pdf-entsperren',
    hreflang: { it: 'https://www.mypdftools.it/sbloccare-pdf', de: 'https://www.mypdftools.de/pdf-entsperren' },
  },

  'pdf-wasserzeichen': {
    slug: 'pdf-wasserzeichen',
    toolId: 'watermark',
    lang: 'de',
    domain: 'mypdftools.de',
    h1: 'Wasserzeichen in PDF einfügen online',
    metaTitle: 'PDF Wasserzeichen kostenlos — Text & Logo als Stempel einfügen',
    metaDescription: 'Fügen Sie Wasserzeichen wie "ENTWURF", "VERTRAULICH" oder Firmenlogos in Ihre PDFs ein. Transparenz und Position frei wählbar.',
    badge: 'Text oder Bild-Logo',
    intro: 'Schützen Sie Ihr geistiges Eigentum oder kennzeichnen Sie Vorabversionen mit einem eleganten halbtransparenten Wasserzeichen.',
    steps: [
      { title: '1. Dokument auswählen', desc: 'Laden Sie das PDF hoch.' },
      { title: '2. Stempel konfigurieren', desc: 'Geben Sie Text oder Logo ein und wählen Sie Transparenz und Position.' },
      { title: '3. Gestempeltes PDF laden', desc: 'Laden Sie das geschützte Dokument herunter.' },
    ],
    faqs: [
      { q: 'Kann das Wasserzeichen hinter den Text gelegt werden?', a: 'Ja, über den Transparenzregler bleibt der Haupttext immer einwandfrei lesbar.' },
    ],
    relatedSlugs: ['pdf-seitenzahlen', 'pdf-unterschreiben', 'pdf-schuetzen'],
    canonical: 'https://www.mypdftools.de/pdf-wasserzeichen',
    hreflang: { it: 'https://www.mypdftools.it/filigrana-pdf', de: 'https://www.mypdftools.de/pdf-wasserzeichen' },
  },

  'pdf-seitenzahlen': {
    slug: 'pdf-seitenzahlen',
    toolId: 'page-numbers',
    lang: 'de',
    domain: 'mypdftools.de',
    h1: 'Seitenzahlen in PDF einfügen online',
    metaTitle: 'PDF Seitenzahlen kostenlos einfügen — Dokumente durchnummerieren',
    metaDescription: 'Fügen Sie Seitennummerierungen oben oder unten auf jeder PDF-Seite ein. Wählen Sie Position, Schriftart und Format frei aus.',
    intro: 'Bringen Sie professionelle Seitennummern in Abschlussarbeiten, Berichte oder Gerichtsakten vor dem Ausdruck ein.',
    steps: [
      { title: '1. PDF hochladen', desc: 'Wählen Sie die zu nummerierende Datei.' },
      { title: '2. Platzierung wählen', desc: 'Wählen Sie Kopf- oder Fußzeile sowie links, mittig oder rechts.' },
      { title: '3. Nummeriertes PDF sichern', desc: 'Laden Sie das durchnummerierte PDF herunter.' },
    ],
    faqs: [
      { q: 'Kann das Deckblatt von der Nummerierung ausgenommen werden?', a: 'Ja, die Nummerierung kann ab Seite 2 beginnen.' },
    ],
    relatedSlugs: ['pdf-wasserzeichen', 'pdf-zusammenfuegen', 'pdf-bearbeiten'],
    canonical: 'https://www.mypdftools.de/pdf-seitenzahlen',
    hreflang: { it: 'https://www.mypdftools.it/numeri-di-pagina-pdf', de: 'https://www.mypdftools.de/pdf-seitenzahlen' },
  },

  'pdf-in-markdown': {
    slug: 'pdf-in-markdown',
    toolId: 'pdf-to-markdown',
    lang: 'de',
    domain: 'mypdftools.de',
    h1: 'PDF in Markdown umwandeln für KI & Notizen',
    metaTitle: 'PDF in Markdown umwandeln kostenlos — Text & Tabellen für ChatGPT',
    metaDescription: 'Konvertieren Sie PDF-Inhalte in sauberes Markdown (.md) für Obsidian, Notion und KI-Modelle wie ChatGPT und Claude.',
    badge: 'KI & LLM optimiert',
    intro: 'Verwandeln Sie Fachartikel und PDF-Berichte in sauberes Markdown mit Überschriften und Tabellen für KI-Analysen und Wissensdatenbanken.',
    steps: [
      { title: '1. PDF hochladen', desc: 'Wählen Sie das Dokument zur Konvertierung.' },
      { title: '2. Markdown Parsing', desc: 'Überschriften und Tabellen werden strukturiert.' },
      { title: '3. Kopieren oder Downloaden', desc: 'Kopieren Sie den Markdown-Code direkt in die Zwischenablage.' },
    ],
    faqs: [
      { q: 'Werden Tabellen als Markdown-Tabellen formatiert?', a: 'Ja, strukturierte Daten werden in Standard-Markdown-Tabellensyntax übertragen.' },
    ],
    relatedSlugs: ['pdf-in-word', 'pdf-in-jpg'],
    canonical: 'https://www.mypdftools.de/pdf-in-markdown',
    hreflang: { it: 'https://www.mypdftools.it/da-pdf-a-markdown', de: 'https://www.mypdftools.de/pdf-in-markdown' },
  },

  /* ==========================================================================
     ITALIAN GUIDES (/guide/)
     ========================================================================== */
  'guide/come-unire-due-pdf-gratis': {
    slug: 'guide/come-unire-due-pdf-gratis',
    toolId: 'merge-pdf',
    lang: 'it',
    domain: 'mypdftools.it',
    h1: 'Come Unire Due o Più File PDF Gratis Senza Programmi',
    metaTitle: 'Come Unire Due File PDF Gratis Online — Guida Completa 2026',
    metaDescription: 'Scopri come unire due o più documenti PDF in un unico file senza installare software e senza inviare file su server esterni. Facile e veloce.',
    badge: 'Guida Pratica',
    intro: 'Spesso ci si ritrova con scansioni separate di documenti, fatture o contratti che devono essere presentati in un unico allegato. Questa guida spiega come combinare più PDF gratis sul tuo computer o cellulare in totale sicurezza.',
    steps: [
      { title: 'Passo 1: Accedi allo Strumento Unisci PDF', desc: 'Apri lo strumento dedicato "Unisci PDF" su MyPdfTools.' },
      { title: 'Passo 2: Trascina i tuoi File', desc: 'Seleziona contemporaneamente i due o più file PDF dal tuo computer o smartphone.' },
      { title: 'Passo 3: Regola la Sequenza e Scarica', desc: 'Controlla l\'ordine delle pagine e clicca su Unisci per scaricare il documento unificato.' },
    ],
    faqs: [
      { q: 'È necessario installare Acrobat o altri programmi?', a: 'No, la procedura avviene al 100% all\'interno del tuo browser internet.' },
      { q: 'Come faccio su smartphone Android o iPhone?', a: 'Basta aprire il sito dal browser dello smartphone (Safari o Chrome) e selezionare i documenti dai file recenti.' },
    ],
    relatedSlugs: ['unire-pdf', 'comprimere-pdf', 'organizzare-pdf'],
    canonical: 'https://www.mypdftools.it/guide/come-unire-due-pdf-gratis',
    hreflang: { it: 'https://www.mypdftools.it/guide/come-unire-due-pdf-gratis', de: 'https://www.mypdftools.de/ratgeber/pdf-dateien-zusammenfuegen-anleitung' },
  },

  'guide/come-comprimere-pdf-senza-perdere-qualita': {
    slug: 'guide/come-comprimere-pdf-senza-perdere-qualita',
    toolId: 'compress-pdf',
    lang: 'it',
    domain: 'mypdftools.it',
    h1: 'Come Comprimere un PDF Senza Perdere Qualità per Email e PEC',
    metaTitle: 'Come Comprimere un PDF Senza Perdere Qualità — Guida Pratica',
    metaDescription: 'La guida definitiva per ridurre il peso di un file PDF mantenendo il testo nitido e le immagini chiare per concorsi, INPS o PEC.',
    badge: 'Guida Pratica',
    intro: 'Quando un file PDF supera i 5 MB o i 10 MB, molti server di posta elettronica o portali della Pubblica Amministrazione rifiutano l\'invio. Scopri come alleggerirlo preservando ogni dettaglio importante.',
    steps: [
      { title: 'Passo 1: Carica il PDF Pesante', desc: 'Apri lo strumento Comprimi PDF di MyPdfTools e carica il documento.' },
      { title: 'Passo 2: Ottimizzazione Locale', desc: 'L\'algoritmo elimina dati duplicati e comprime le immagini mantenendo la risoluzione di lettura.' },
      { title: 'Passo 3: Salva e Invia', desc: 'Scarica il file compresso e allegalo senza problemi alla tua email o PEC.' },
    ],
    faqs: [
      { q: 'Cosa rende un PDF così pesante?', a: 'Solitamente le immagini non compresse ad altissima risoluzione inserite dalle scansioni.' },
      { q: 'La firma digitale o il testo rimangono validi?', a: 'Sì, la struttura vettoriale del testo viene mantenuta intatta.' },
    ],
    relatedSlugs: ['comprimere-pdf', 'ridurre-dimensione-pdf', 'unire-pdf'],
    canonical: 'https://www.mypdftools.it/guide/come-comprimere-pdf-senza-perdere-qualita',
    hreflang: { it: 'https://www.mypdftools.it/guide/come-comprimere-pdf-senza-perdere-qualita', de: 'https://www.mypdftools.de/ratgeber/pdf-verkleinern-ohne-qualitaetsverlust' },
  },

  'guide/come-convertire-immagini-in-pdf-senza-programmi': {
    slug: 'guide/come-convertire-immagini-in-pdf-senza-programmi',
    toolId: 'jpg-to-pdf',
    lang: 'it',
    domain: 'mypdftools.it',
    h1: 'Come Convertire Immagini e Foto in PDF Senza Programmi',
    metaTitle: 'Come Convertire Immagini in PDF Gratis — Guida Passo-Passo',
    metaDescription: 'Trasforma foto scattate con lo smartphone (JPG, PNG) in un unico documento PDF pronto da stampare o inviare.',
    badge: 'Guida Pratica',
    intro: 'Hai scattato foto alle pagine di un contratto o a ricevute fiscali e devi presentarle in formato PDF? Ecco il metodo più veloce ed ecologico senza installare nulla.',
    steps: [
      { title: 'Passo 1: Seleziona le Foto', desc: 'Carica le immagini direttamente dalla galleria dello smartphone o dal computer.' },
      { title: 'Passo 2: Imposta Margini e Orientamento', desc: 'Scegli il formato pagina A4 e i margini desiderati.' },
      { title: 'Passo 3: Scarica il PDF Unico', desc: 'Ottieni istantaneamente il documento combinato.' },
    ],
    faqs: [
      { q: 'Le immagini rimangono private?', a: 'Sì, la conversione avviene sul dispositivo, nessuna immagine viene caricata sul web.' },
    ],
    relatedSlugs: ['da-jpg-a-pdf', 'convertire-foto-in-pdf', 'da-pdf-a-jpg'],
    canonical: 'https://www.mypdftools.it/guide/come-convertire-immagini-in-pdf-senza-programmi',
    hreflang: { it: 'https://www.mypdftools.it/guide/come-convertire-immagini-in-pdf-senza-programmi', de: 'https://www.mypdftools.de/ratgeber/bilder-in-pdf-umwandeln-kostenlos' },
  },

  /* ==========================================================================
     GERMAN RATGEBER (/ratgeber/)
     ========================================================================== */
  'ratgeber/pdf-dateien-zusammenfuegen-anleitung': {
    slug: 'ratgeber/pdf-dateien-zusammenfuegen-anleitung',
    toolId: 'merge-pdf',
    lang: 'de',
    domain: 'mypdftools.de',
    h1: 'PDF-Dateien zusammenfügen — Schritt-für-Schritt Anleitung',
    metaTitle: 'PDF zusammenfügen Anleitung — Mehrere Dokumente kostenlos verbinden',
    metaDescription: 'Einfache Anleitung zum Verbinden mehrerer PDF-Dateien ohne Software-Installation. Schnell, sicher und 100% kostenlos.',
    badge: 'Ratgeber',
    intro: 'Ob Bewerbungsunterlagen, Zeugnisse oder Verträge: Häufig müssen mehrere Einzeldokumente zu einer Gesamtdokumentation vereint werden. Hier erfahren Sie, wie das in 3 einfachen Schritten funktioniert.',
    steps: [
      { title: 'Schritt 1: Dateien hochladen', desc: 'Wählen Sie alle gewünschten PDFs per Klick oder Drag & Drop aus.' },
      { title: 'Schritt 2: Reihenfolge kontrollieren', desc: 'Sortieren Sie Anschreiben, Lebenslauf und Zeugnisse in die richtige Abfolge.' },
      { title: 'Schritt 3: Zusammenfügen & Speichern', desc: 'Klicken Sie auf "Zusammenfügen" und sichern Sie das fertige Gesamt-PDF.' },
    ],
    faqs: [
      { q: 'Muss ich Adobe Acrobat installieren?', a: 'Nein, MyPdfTools funktioniert direkt im Webbrowser ganz ohne Programme.' },
      { q: 'Können Dritte meine Dokumente einsehen?', a: 'Nein, die Verarbeitung findet lokal in Ihrem Arbeitsspeicher statt.' },
    ],
    relatedSlugs: ['pdf-zusammenfuegen', 'pdf-komprimieren', 'pdf-organisieren'],
    canonical: 'https://www.mypdftools.de/ratgeber/pdf-dateien-zusammenfuegen-anleitung',
    hreflang: { it: 'https://www.mypdftools.it/guide/come-unire-due-pdf-gratis', de: 'https://www.mypdftools.de/ratgeber/pdf-dateien-zusammenfuegen-anleitung' },
  },

  'ratgeber/pdf-verkleinern-ohne-qualitaetsverlust': {
    slug: 'ratgeber/pdf-verkleinern-ohne-qualitaetsverlust',
    toolId: 'compress-pdf',
    lang: 'de',
    domain: 'mypdftools.de',
    h1: 'PDF verkleinern ohne Qualitätsverlust für Bewerbung & E-Mail',
    metaTitle: 'PDF verkleinern ohne Qualitätsverlust — Der praktische Ratgeber',
    metaDescription: 'So reduzieren Sie die Dateigröße von PDF-Dateien zuverlässig unter 2 MB oder 5 MB, ohne dass Texte unscharf werden.',
    badge: 'Ratgeber',
    intro: 'Bewerbungsportale begrenzen Datei-Uploads häufig auf 2 MB bis 5 MB. Erfahren Sie, wie Sie das Datenvolumen drastisch reduzieren, ohne dass Zeugnisse oder Fotos unscharf wirken.',
    steps: [
      { title: 'Schritt 1: PDF öffnen', desc: 'Laden Sie das zu große Dokument in das Komprimierungs-Tool.' },
      { title: 'Schritt 2: Automatische Reduzierung', desc: 'Überflüssige Metadaten werden entfernt und Bildauflösungen harmonisiert.' },
      { title: 'Schritt 3: Fertiges PDF sichern', desc: 'Laden Sie die verkleinerte Datei herunter und versenden Sie sie problemlos.' },
    ],
    faqs: [
      { q: 'Warum sind manche PDFs so groß?', a: 'Häufig liegt es an Scannern, die jede Seite mit 300–600 DPI unkomprimiert als Riesenbild abspeichern.' },
    ],
    relatedSlugs: ['pdf-komprimieren', 'pdf-verkleinern', 'pdf-zusammenfuegen'],
    canonical: 'https://www.mypdftools.de/ratgeber/pdf-verkleinern-ohne-qualitaetsverlust',
    hreflang: { it: 'https://www.mypdftools.it/guide/come-comprimere-pdf-senza-perdere-qualita', de: 'https://www.mypdftools.de/ratgeber/pdf-verkleinern-ohne-qualitaetsverlust' },
  },

  'ratgeber/bilder-in-pdf-umwandeln-kostenlos': {
    slug: 'ratgeber/bilder-in-pdf-umwandeln-kostenlos',
    toolId: 'jpg-to-pdf',
    lang: 'de',
    domain: 'mypdftools.de',
    h1: 'Bilder in PDF umwandeln kostenlos — Anleitung für PC & Smartphone',
    metaTitle: 'Bilder in PDF umwandeln kostenlos — Fotos zu PDF Anleitung',
    metaDescription: 'So fassen Sie Handyfotos und Scans (JPG, PNG) zu einem sauberen PDF zusammen. Einfache Anleitung ohne teure Software.',
    badge: 'Ratgeber',
    intro: 'Haben Sie Unterlagen mit dem Smartphone abfotografiert und müssen diese nun als PDF-Datei einreichen? Hier erfahren Sie, wie Sie Bilder in Sekunden umwandeln.',
    steps: [
      { title: 'Schritt 1: Bilder hochladen', desc: 'Wählen Sie die Aufnahmen aus Ihrer Galerie oder vom Desktop.' },
      { title: 'Schritt 2: Reihenfolge anpassen', desc: 'Ordnen Sie die Seiten chronologisch über die Pfeile.' },
      { title: 'Schritt 3: PDF herunterladen', desc: 'Erhalten Sie ein einzelnes kompaktes PDF-Dokument.' },
    ],
    faqs: [
      { q: 'Werden Bilder komprimiert?', a: 'Ja, sie werden optimal in das PDF eingebettet, sodass die Datei leicht versendbar bleibt.' },
    ],
    relatedSlugs: ['jpg-in-pdf', 'fotos-in-pdf-umwandeln', 'pdf-in-jpg'],
    canonical: 'https://www.mypdftools.de/ratgeber/bilder-in-pdf-umwandeln-kostenlos',
    hreflang: { it: 'https://www.mypdftools.it/guide/come-convertire-immagini-in-pdf-senza-programmi', de: 'https://www.mypdftools.de/ratgeber/bilder-in-pdf-umwandeln-kostenlos' },
  },
};

export const getSeoRoute = (path: string): SeoRouteData | undefined => {
  const clean = path.replace(/^\/+/, '').replace(/\/+$/, '').replace(/^#\/?/, '');
  return SEO_ROUTES[clean];
};

