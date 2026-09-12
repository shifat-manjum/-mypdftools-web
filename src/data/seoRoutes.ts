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
  'da-powerpoint-a-pdf': {
    "slug": "da-powerpoint-a-pdf",
    "toolId": "powerpoint-to-pdf",
    "lang": "it",
    "domain": "mypdftools.it",
    "h1": "Convertire PowerPoint in PDF Online",
    "metaTitle": "Convertire PowerPoint in PDF Online Gratis — Da PPT a PDF",
    "metaDescription": "Converti le tue presentazioni PowerPoint (PPTX, PPT) in documenti PDF pronti per la stampa e condivisione. Gratuito e 100% privato.",
    "badge": "Presentazioni",
    "intro": "Mantieni intatti layout, font e grafici delle tue presentazioni convertendole da PowerPoint a PDF direttamente nel tuo browser senza installare software.",
    "steps": [
        {
            "title": "1. Scegli la Presentazione",
            "desc": "Carica il file .pptx o .ppt dal tuo computer o smartphone."
        },
        {
            "title": "2. Conversione Istantanea",
            "desc": "Le diapositive vengono renderizzate in pagine PDF con formattazione preservata."
        },
        {
            "title": "3. Scarica il PDF",
            "desc": "Salva il documento PDF pronto per l'invio o la presentazione."
        }
    ],
    "faqs": [
        {
            "q": "I caratteri personalizzati vengono preservati?",
            "a": "Sì, la conversione incorpora o rasterizza gli elementi visivi garantendo che chiunque apra il PDF visualizzi esattamente la stessa diapositiva."
        },
        {
            "q": "I file PPTX vengono caricati su internet?",
            "a": "No, l'elaborazione avviene sul tuo dispositivo."
        }
    ],
    "relatedSlugs": [
        "da-word-a-pdf",
        "da-excel-a-pdf",
        "da-pdf-a-powerpoint",
        "comprimere-pdf"
    ],
    "canonical": "https://www.mypdftools.it/da-powerpoint-a-pdf",
    "hreflang": {
        "it": "https://www.mypdftools.it/da-powerpoint-a-pdf",
        "de": "https://www.mypdftools.de/powerpoint-in-pdf"
    }
},

  'da-pdf-a-powerpoint': {
    "slug": "da-pdf-a-powerpoint",
    "toolId": "pdf-to-powerpoint",
    "lang": "it",
    "domain": "mypdftools.it",
    "h1": "Convertire PDF in PowerPoint Gratis",
    "metaTitle": "Convertire PDF in PowerPoint Online — Da PDF a PPTX",
    "metaDescription": "Trasforma documenti e presentazioni PDF in diapositive PowerPoint PPTX modificabili. 100% sicuro e senza registrazione.",
    "badge": "PPTX",
    "intro": "Estrai slide e contenuti dal tuo PDF per riutilizzarli in presentazioni PowerPoint. Veloce, preciso e rispettoso della tua privacy.",
    "steps": [
        {
            "title": "1. Carica il PDF",
            "desc": "Seleziona il file PDF contenente le slide da convertire."
        },
        {
            "title": "2. Elaborazione Diapositive",
            "desc": "Ogni pagina del PDF viene mappata in una slide PowerPoint."
        },
        {
            "title": "3. Scarica PPTX",
            "desc": "Apri il file generato in PowerPoint, Google Presentazioni o Keynote."
        }
    ],
    "faqs": [
        {
            "q": "Posso modificare il testo una volta convertito in PPTX?",
            "a": "Le pagine vengono convertite ad alta risoluzione mantenendo fedelmente la grafica delle slide originali."
        }
    ],
    "relatedSlugs": [
        "da-powerpoint-a-pdf",
        "da-pdf-a-word",
        "da-pdf-a-jpg"
    ],
    "canonical": "https://www.mypdftools.it/da-pdf-a-powerpoint",
    "hreflang": {
        "it": "https://www.mypdftools.it/da-pdf-a-powerpoint",
        "de": "https://www.mypdftools.de/pdf-in-powerpoint"
    }
},

  'da-png-a-pdf': {
    "slug": "da-png-a-pdf",
    "toolId": "jpg-to-pdf",
    "lang": "it",
    "domain": "mypdftools.it",
    "h1": "Convertire PNG in PDF Online Gratis",
    "metaTitle": "Convertire PNG in PDF Gratis — Crea PDF da Immagini PNG",
    "metaDescription": "Trasforma immagini trasparenti o foto PNG in file PDF singoli o multipagina. Nessun upload, 100% sicuro nel browser.",
    "badge": "PNG",
    "intro": "Crea documenti PDF professionali a partire dalle tue immagini PNG, loghi con trasparenza o grafici, mantenendo la massima nitidezza.",
    "steps": [
        {
            "title": "1. Seleziona i File PNG",
            "desc": "Trascina una o più immagini PNG."
        },
        {
            "title": "2. Organizza le Pagine",
            "desc": "Imposta margini e orientamento delle pagine."
        },
        {
            "title": "3. Genera PDF",
            "desc": "Scarica subito il documento PDF unificato."
        }
    ],
    "faqs": [
        {
            "q": "La trasparenza delle immagini PNG viene mantenuta?",
            "a": "Sì, i PNG vengono inseriti con sfondo bianco pulito conforme allo standard di stampa PDF."
        }
    ],
    "relatedSlugs": [
        "da-jpg-a-pdf",
        "convertire-foto-in-pdf",
        "da-pdf-a-jpg"
    ],
    "canonical": "https://www.mypdftools.it/da-png-a-pdf",
    "hreflang": {
        "it": "https://www.mypdftools.it/da-png-a-pdf",
        "de": "https://www.mypdftools.de/png-in-pdf"
    }
},

  'da-pdf-a-png': {
    "slug": "da-pdf-a-png",
    "toolId": "pdf-to-jpg",
    "lang": "it",
    "domain": "mypdftools.it",
    "h1": "Convertire PDF in PNG ad Alta Definizione",
    "metaTitle": "Convertire PDF in PNG Gratis — Salva Pagine PDF in PNG",
    "metaDescription": "Estrai le pagine dei tuoi PDF salvandole come immagini PNG ad alta definizione. Elaborazione in locale senza caricamento su server.",
    "badge": "PNG HD",
    "intro": "Ottieni immagini PNG nitide e pronte per il web o la stampa da qualsiasi pagina PDF senza perdita di leggibilità del testo.",
    "steps": [
        {
            "title": "1. Scegli il File PDF",
            "desc": "Carica il documento PDF da cui estrarre le immagini."
        },
        {
            "title": "2. Rendering HD",
            "desc": "Il motore WebAssembly renderizza ciascuna pagina a risoluzione nitida."
        },
        {
            "title": "3. Scarica Immagini PNG",
            "desc": "Salva le singole immagini PNG o l'archivio completo."
        }
    ],
    "faqs": [
        {
            "q": "Perché scegliere PNG rispetto a JPG per i PDF?",
            "a": "PNG offre compressione senza perdita (lossless), perfetta per testi, grafici e diagrammi ad alto contrasto."
        }
    ],
    "relatedSlugs": [
        "da-pdf-a-jpg",
        "da-png-a-pdf",
        "estrarre-pagine-pdf"
    ],
    "canonical": "https://www.mypdftools.it/da-pdf-a-png",
    "hreflang": {
        "it": "https://www.mypdftools.it/da-pdf-a-png",
        "de": "https://www.mypdftools.de/pdf-in-png"
    }
},

  'da-pdf-a-testo': {
    "slug": "da-pdf-a-testo",
    "toolId": "pdf-to-markdown",
    "lang": "it",
    "domain": "mypdftools.it",
    "h1": "Estrarre Testo da PDF Online Gratis",
    "metaTitle": "Estrarre Testo da PDF Online — Da PDF a TXT e Testo Copiabile",
    "metaDescription": "Converti PDF in testo puro o Markdown copiabile. Estrai paragrafi, tabelle e annotazioni senza riscrivere a mano.",
    "badge": "Testo TXT",
    "intro": "Copia e riutilizza i testi contenuti nei tuoi documenti PDF in pochi click, senza riscritture manuali e con perfetta formattazione.",
    "steps": [
        {
            "title": "1. Carica il PDF",
            "desc": "Seleziona il PDF con il testo da estrarre."
        },
        {
            "title": "2. Estrazione Automatica",
            "desc": "Il testo viene decodificato e strutturato in tempo reale."
        },
        {
            "title": "3. Copia o Scarica",
            "desc": "Copia il testo negli appunti o scaricalo come file di testo."
        }
    ],
    "faqs": [
        {
            "q": "Funziona con PDF protetti da selezione testo?",
            "a": "Se il testo è incorporato nel PDF, il motore di decodifica lo estrae regolarmente."
        }
    ],
    "relatedSlugs": [
        "da-pdf-a-markdown",
        "da-pdf-a-word",
        "modificare-pdf"
    ],
    "canonical": "https://www.mypdftools.it/da-pdf-a-testo",
    "hreflang": {
        "it": "https://www.mypdftools.it/da-pdf-a-testo",
        "de": "https://www.mypdftools.de/pdf-in-text"
    }
},

  'ocr-pdf-online': {
    "slug": "ocr-pdf-online",
    "toolId": "pdf-to-markdown",
    "lang": "it",
    "domain": "mypdftools.it",
    "h1": "OCR PDF Online Gratis — Riconoscimento Testo",
    "metaTitle": "OCR PDF Online Gratis — Riconoscimento Testo da Scansioni PDF",
    "metaDescription": "Riconosci ed estrai il testo da scansioni e documenti PDF digitalizzati con la tecnologia OCR in-browser. Zero upload privato.",
    "badge": "OCR",
    "intro": "Hai un documento scannerizzato non selezionabile? Usa lo strumento OCR per riconoscere caratteri e parole e renderle copiabili ed editabili.",
    "steps": [
        {
            "title": "1. Carica la Scansione",
            "desc": "Carica il PDF scansionato o la foto del testo."
        },
        {
            "title": "2. Elaborazione OCR",
            "desc": "L'algoritmo scansiona i pixel e identifica le parole."
        },
        {
            "title": "3. Ottieni il Testo",
            "desc": "Copia il testo estratto per incollarlo in Word o documenti."
        }
    ],
    "faqs": [
        {
            "q": "I miei documenti scansionati vengono salvati?",
            "a": "Assolutamente no. Il riconoscimento ottico avviene localmente sul tuo browser."
        }
    ],
    "relatedSlugs": [
        "da-pdf-a-testo",
        "da-pdf-a-markdown",
        "da-pdf-a-word"
    ],
    "canonical": "https://www.mypdftools.it/ocr-pdf-online",
    "hreflang": {
        "it": "https://www.mypdftools.it/ocr-pdf-online",
        "de": "https://www.mypdftools.de/ocr-pdf-online-kostenlos"
    }
},

  'ritagliare-pdf': {
    "slug": "ritagliare-pdf",
    "toolId": "organize-pdf",
    "lang": "it",
    "domain": "mypdftools.it",
    "h1": "Ritagliare PDF Online — Modifica Margini e Dimensioni",
    "metaTitle": "Ritagliare PDF Online Gratis — Riduci Margini e Pagine PDF",
    "metaDescription": "Ritaglia le pagine del tuo PDF ed elimina margini bianchi in eccesso. Ottimizza documenti per tablet, e-reader e stampa.",
    "badge": "Ritaglia",
    "intro": "Rimuovi i bordi bianchi inutili o focalizza l'attenzione solo sul contenuto essenziale delle tue pagine PDF.",
    "steps": [
        {
            "title": "1. Carica il File",
            "desc": "Seleziona il PDF da rifinire."
        },
        {
            "title": "2. Regola i Margini",
            "desc": "Scegli l'area visibile da mantenere per ciascuna pagina."
        },
        {
            "title": "3. Scarica il PDF Ritagliato",
            "desc": "Ottieni un file pulito e perfettamente calibrato."
        }
    ],
    "faqs": [
        {
            "q": "Il ritaglio riduce la qualità del testo?",
            "a": "No, il contenuto vettoriale originale rimane intatto; vengono semplicemente ridefiniti i confini della pagina."
        }
    ],
    "relatedSlugs": [
        "organizzare-pdf",
        "eliminare-pagine-pdf",
        "ruotare-pdf"
    ],
    "canonical": "https://www.mypdftools.it/ritagliare-pdf",
    "hreflang": {
        "it": "https://www.mypdftools.it/ritagliare-pdf",
        "de": "https://www.mypdftools.de/pdf-zuschneiden"
    }
},

  'appiattire-pdf': {
    "slug": "appiattire-pdf",
    "toolId": "generic-tool",
    "lang": "it",
    "domain": "mypdftools.it",
    "h1": "Appiattire PDF Online (Flatten PDF)",
    "metaTitle": "Appiattire PDF Online Gratis — Rendi Moduli e Firme Non Modificabili",
    "metaDescription": "Appiattisci moduli compilabili, annotazioni e firme nei file PDF per renderli sicuri, definitivi e stampabili ovunque.",
    "badge": "Flatten",
    "intro": "Proteggi i tuoi dati compilati: l'appiattimento fonde campi modulo, annotazioni e firme digitali nel livello grafico base del PDF.",
    "steps": [
        {
            "title": "1. Carica il PDF con Moduli",
            "desc": "Seleziona il modulo compilato o firmato."
        },
        {
            "title": "2. Fusione dei Livelli",
            "desc": "I campi interattivi vengono trasformati in grafica statica fissa."
        },
        {
            "title": "3. Salva Documento Definitivo",
            "desc": "Scarica il PDF pronto per l'archiviazione sicura."
        }
    ],
    "faqs": [
        {
            "q": "Cosa significa appiattire un PDF?",
            "a": "Significa unire campi modulo interattivi e annotazioni direttamente nel foglio, impedendo a chiunque di alterarli."
        }
    ],
    "relatedSlugs": [
        "firmare-pdf",
        "proteggere-pdf",
        "modificare-pdf"
    ],
    "canonical": "https://www.mypdftools.it/appiattire-pdf",
    "hreflang": {
        "it": "https://www.mypdftools.it/appiattire-pdf",
        "de": "https://www.mypdftools.de/pdf-abflachen"
    }
},

  'oscurare-pdf': {
    "slug": "oscurare-pdf",
    "toolId": "generic-tool",
    "lang": "it",
    "domain": "mypdftools.it",
    "h1": "Oscurare Dati Sensibili su PDF (Redact PDF)",
    "metaTitle": "Oscurare PDF Online — Cancella Dati Sensibili e Privacy da PDF",
    "metaDescription": "Cancella in modo permanente dati personali, IBAN, codici fiscali e nomi da documenti PDF prima di condividerli.",
    "badge": "Privacy GDPR",
    "intro": "Nascondi dati confidenziali nei tuoi documenti ufficiali. La rimozione è irreversibile e garantisce la piena conformità al GDPR.",
    "steps": [
        {
            "title": "1. Carica il Documento",
            "desc": "Seleziona il PDF contenente informazioni da censurare."
        },
        {
            "title": "2. Copri i Dati",
            "desc": "Applica bande nere o rimuovi le sezioni sensibili."
        },
        {
            "title": "3. Esporta PDF Protetto",
            "desc": "Scarica il documento anonimizzato in tutta sicurezza."
        }
    ],
    "faqs": [
        {
            "q": "È possibile recuperare il testo sottostante le bande nere?",
            "a": "No, con l'oscuramento corretto il testo sottostante viene rimosso dal file sorgente."
        }
    ],
    "relatedSlugs": [
        "proteggere-pdf",
        "appiattire-pdf",
        "modificare-pdf"
    ],
    "canonical": "https://www.mypdftools.it/oscurare-pdf",
    "hreflang": {
        "it": "https://www.mypdftools.it/oscurare-pdf",
        "de": "https://www.mypdftools.de/pdf-schwaerzen"
    }
},

  'riparare-pdf': {
    "slug": "riparare-pdf",
    "toolId": "generic-tool",
    "lang": "it",
    "domain": "mypdftools.it",
    "h1": "Riparare PDF Corrotto o Danneggiato Online",
    "metaTitle": "Riparare PDF Corrotto Online Gratis — Ripristina File PDF Danneggiati",
    "metaDescription": "Ripara file PDF danneggiati o illeggibili che restituiscono errori all'apertura. Recupera pagine e testo in pochi secondi.",
    "badge": "Ripristino",
    "intro": "Il tuo PDF non si apre o segnala errore di sintassi? Ricostruisci la tabella degli indici XREF e ripristina la struttura del documento.",
    "steps": [
        {
            "title": "1. Seleziona il PDF Danneggiato",
            "desc": "Carica il file corrotto che non riesci ad aprire."
        },
        {
            "title": "2. Diagnosi e Ricostruzione",
            "desc": "Il motore analizza il flusso dei byte e ricostruisce gli oggetti intatti."
        },
        {
            "title": "3. Scarica PDF Risolto",
            "desc": "Salva una copia pulita e conforme agli standard PDF."
        }
    ],
    "faqs": [
        {
            "q": "È possibile riparare qualsiasi file danneggiato?",
            "a": "Se i dati essenziali del documento non sono stati sovrascritti, la maggior parte dei PDF con intestazioni o indici rovinati viene recuperata con successo."
        }
    ],
    "relatedSlugs": [
        "sbloccare-pdf",
        "organizzare-pdf",
        "unire-pdf"
    ],
    "canonical": "https://www.mypdftools.it/riparare-pdf",
    "hreflang": {
        "it": "https://www.mypdftools.it/riparare-pdf",
        "de": "https://www.mypdftools.de/pdf-reparieren"
    }
},

  'confrontare-pdf': {
    "slug": "confrontare-pdf",
    "toolId": "generic-tool",
    "lang": "it",
    "domain": "mypdftools.it",
    "h1": "Confrontare Due PDF Online — Trova Differenze",
    "metaTitle": "Confrontare PDF Online Gratis — Evidenzia Modifiche tra Versioni",
    "metaDescription": "Confronta due versioni di un documento PDF per rilevare istantaneamente modifiche al testo, clausole rimosse o variazioni grafiche.",
    "badge": "Diff Check",
    "intro": "Verifica contratti e bozze fianco a fianco per individuare qualsiasi differenza prima di firmare o approvare una revisione.",
    "steps": [
        {
            "title": "1. Carica Entrambe le Versioni",
            "desc": "Inserisci il documento originale e quello revisionato."
        },
        {
            "title": "2. Analisi Differenze",
            "desc": "Il sistema evidenzia variazioni di testo e impaginazione."
        },
        {
            "title": "3. Revisione Dettagliata",
            "desc": "Esamina il report delle modifiche rilevate."
        }
    ],
    "faqs": [
        {
            "q": "Vengono evidenziate anche le modifiche ai numeri e date?",
            "a": "Sì, qualsiasi discrepanza testuale o grafica viene immediatamente segnalata."
        }
    ],
    "relatedSlugs": [
        "modificare-pdf",
        "unire-pdf",
        "firmare-pdf"
    ],
    "canonical": "https://www.mypdftools.it/confrontare-pdf",
    "hreflang": {
        "it": "https://www.mypdftools.it/confrontare-pdf",
        "de": "https://www.mypdftools.de/pdf-vergleichen"
    }
},

  'pdf-bianco-nero': {
    "slug": "pdf-bianco-nero",
    "toolId": "generic-tool",
    "lang": "it",
    "domain": "mypdftools.it",
    "h1": "Convertire PDF in Bianco e Nero (Scala di Grigi)",
    "metaTitle": "PDF in Bianco e Nero Online — Converti in Scala di Grigi",
    "metaDescription": "Converti documenti PDF a colori in bianco e nero o scala di grigi per risparmiare inchiostro toner e ridurre la dimensione del file.",
    "badge": "Greyscale",
    "intro": "Prepara i tuoi file per la stampa economica: trasforma tutte le immagini e i testi colorati in una raffinata scala di grigi monocromatica.",
    "steps": [
        {
            "title": "1. Carica il PDF a Colori",
            "desc": "Seleziona il documento da convertire in toni di grigio."
        },
        {
            "title": "2. Conversione Cromatica",
            "desc": "I canali RGB e CMYK vengono mappati in scala di grigi ottimizzata."
        },
        {
            "title": "3. Scarica Documento Monocromatico",
            "desc": "Salva il PDF pronto per la stampa ad alta efficienza."
        }
    ],
    "faqs": [
        {
            "q": "La conversione riduce anche la dimensione del file?",
            "a": "Sì, le immagini convertite in scala di grigi contengono un solo canale cromatico, riducendo spesso il peso complessivo."
        }
    ],
    "relatedSlugs": [
        "comprimere-pdf",
        "ridurre-dimensione-pdf",
        "da-pdf-a-jpg"
    ],
    "canonical": "https://www.mypdftools.it/pdf-bianco-nero",
    "hreflang": {
        "it": "https://www.mypdftools.it/pdf-bianco-nero",
        "de": "https://www.mypdftools.de/pdf-schwarz-weiss"
    }
},

  'unire-due-pdf': {
    "slug": "unire-due-pdf",
    "toolId": "merge-pdf",
    "lang": "it",
    "domain": "mypdftools.it",
    "h1": "Unire Due PDF in Uno Solo Online",
    "metaTitle": "Unire Due PDF Online Gratis — Combina 2 File PDF Facilmente",
    "metaDescription": "Devi combinare due file PDF in un unico documento continuo? Unisci fronte e retro o due sezioni in pochi secondi senza registrazione.",
    "badge": "Veloce",
    "intro": "La soluzione più semplice per unire due file PDF separati in un solo documento ordinato. Nessuna installazione richiesta, 100% gratuito.",
    "steps": [
        {
            "title": "1. Carica i Due PDF",
            "desc": "Trascina il primo e il secondo documento."
        },
        {
            "title": "2. Controlla l'Ordine",
            "desc": "Assicurati che il primo file appaia prima del secondo."
        },
        {
            "title": "3. Unisci e Salva",
            "desc": "Clicca su unisci per ottenere il file completo."
        }
    ],
    "faqs": [
        {
            "q": "Posso invertire l'ordine dei due PDF?",
            "a": "Certamente, trascina o sposta le miniature prima di procedere al salvataggio."
        }
    ],
    "relatedSlugs": [
        "unire-pdf",
        "dividere-pdf",
        "comprimere-pdf"
    ],
    "canonical": "https://www.mypdftools.it/unire-due-pdf",
    "hreflang": {
        "it": "https://www.mypdftools.it/unire-due-pdf",
        "de": "https://www.mypdftools.de/zwei-pdf-zusammenfuegen"
    }
},

  'unire-fatture-pdf': {
    "slug": "unire-fatture-pdf",
    "toolId": "merge-pdf",
    "lang": "it",
    "domain": "mypdftools.it",
    "h1": "Unire Fatture e Ricevute PDF per Contabilità",
    "metaTitle": "Unire Fatture PDF Online — Raggruppa Documenti per Commercialista",
    "metaDescription": "Unisci le tue fatture elettroniche di cortesia e scontrini PDF in un unico fascicolo mensile o trimestrale per il tuo commercialista.",
    "badge": "Contabilità",
    "intro": "Semplifica la gestione fiscale: raggruppa fatture, note spese ed estratti conto in un comodo PDF riepilogativo con massima riservatezza.",
    "steps": [
        {
            "title": "1. Seleziona le Fatture",
            "desc": "Carica tutti i documenti fiscali del periodo."
        },
        {
            "title": "2. Ordina Cronologicamente",
            "desc": "Disponi le ricevute per data o numero progressivo."
        },
        {
            "title": "3. Scarica Fascicolo Unico",
            "desc": "Invia al commercialista un unico file ordinato e compatto."
        }
    ],
    "faqs": [
        {
            "q": "I dati fiscali e i codici IBAN sono al sicuro?",
            "a": "Sì, l'elaborazione avviene sul tuo dispositivo e i documenti non transitano su server terzi."
        }
    ],
    "relatedSlugs": [
        "unire-pdf",
        "comprimere-pdf-per-email",
        "numeri-di-pagina-pdf"
    ],
    "canonical": "https://www.mypdftools.it/unire-fatture-pdf",
    "hreflang": {
        "it": "https://www.mypdftools.it/unire-fatture-pdf",
        "de": "https://www.mypdftools.de/rechnungen-pdf-zusammenfuegen"
    }
},

  'unire-pdf-smartphone': {
    "slug": "unire-pdf-smartphone",
    "toolId": "merge-pdf",
    "lang": "it",
    "domain": "mypdftools.it",
    "h1": "Unire PDF da Smartphone Android e iPhone",
    "metaTitle": "Unire PDF da Cellulare Online — Gratis su iPhone e Android",
    "metaDescription": "Combina documenti PDF direttamente dal tuo telefono senza scaricare app pesanti. Funziona su Safari, Chrome e tutti i browser mobili.",
    "badge": "Mobile",
    "intro": "Unire PDF mentre sei in mobilità non è mai stato così immediato. Apri il browser del tuo smartphone, scegli i file e scarica il risultato.",
    "steps": [
        {
            "title": "1. Tocca per Scegliere i File",
            "desc": "Seleziona i documenti dall'app File di iPhone o da Download di Android."
        },
        {
            "title": "2. Riordina con un Tocco",
            "desc": "Organizza le pagine nella sequenza corretta."
        },
        {
            "title": "3. Salva sul Telefono",
            "desc": "Scarica e condividi subito via WhatsApp, Telegram o email."
        }
    ],
    "faqs": [
        {
            "q": "Devo scaricare un'applicazione da App Store o Play Store?",
            "a": "No, MyPdfTools funziona direttamente nel tuo browser web preferito."
        }
    ],
    "relatedSlugs": [
        "unire-pdf",
        "da-jpg-a-pdf",
        "firmare-pdf"
    ],
    "canonical": "https://www.mypdftools.it/unire-pdf-smartphone",
    "hreflang": {
        "it": "https://www.mypdftools.it/unire-pdf-smartphone",
        "de": "https://www.mypdftools.de/pdf-am-handy-zusammenfuegen"
    }
},

  'comprimere-pdf-per-email': {
    "slug": "comprimere-pdf-per-email",
    "toolId": "compress-pdf",
    "lang": "it",
    "domain": "mypdftools.it",
    "h1": "Comprimere PDF per Allegati Email",
    "metaTitle": "Comprimere PDF per Email — Riduci Dimensioni per Inviare Allegati",
    "metaDescription": "Il tuo PDF supera il limite di 10 MB o 25 MB del provider email? Riduci il peso del file mantenendo il testo chiaro e leggibile.",
    "badge": "Email Ready",
    "intro": "Risolvi il problema degli allegati respinti per dimensioni eccessive su Gmail, Outlook o PEC comprimendo il documento in pochi secondi.",
    "steps": [
        {
            "title": "1. Carica il File Troppo Pesante",
            "desc": "Inserisci il documento che non riesci ad allegare."
        },
        {
            "title": "2. Ottimizzazione Immediata",
            "desc": "Immagini e metadati superflui vengono snelliti."
        },
        {
            "title": "3. Invia via Email",
            "desc": "Scarica il file leggero pronto per essere recapitato al primo tentativo."
        }
    ],
    "faqs": [
        {
            "q": "Qual è il limite tipico di allegati per le email?",
            "a": "I principali provider come Gmail e Outlook impongono solitamente una soglia massima tra i 20 MB e i 25 MB."
        }
    ],
    "relatedSlugs": [
        "comprimere-pdf",
        "ridurre-dimensione-pdf",
        "comprimere-pdf-sotto-2mb"
    ],
    "canonical": "https://www.mypdftools.it/comprimere-pdf-per-email",
    "hreflang": {
        "it": "https://www.mypdftools.it/comprimere-pdf-per-email",
        "de": "https://www.mypdftools.de/pdf-komprimieren-fuer-email"
    }
},

  'comprimere-pdf-sotto-2mb': {
    "slug": "comprimere-pdf-sotto-2mb",
    "toolId": "compress-pdf",
    "lang": "it",
    "domain": "mypdftools.it",
    "h1": "Comprimere PDF sotto i 2 MB Online Gratis",
    "metaTitle": "Comprimere PDF sotto 2MB — Riduci File per Portali e Concorsi",
    "metaDescription": "Molti siti web e portali pubblici richiedono documenti sotto i 2 MB. Riduci la dimensione del tuo file PDF con facilità e precisione.",
    "badge": "< 2 MB",
    "intro": "Soddisfa i requisiti di upload dei portali universitari, bancari e amministrativi comprimendo il tuo PDF al di sotto della soglia di 2 MB.",
    "steps": [
        {
            "title": "1. Seleziona il Documento",
            "desc": "Carica il PDF che supera la soglia di 2 megabyte."
        },
        {
            "title": "2. Compressione Avanzata",
            "desc": "I vettori e le illustrazioni vengono ottimizzati."
        },
        {
            "title": "3. Verifica Dimensione e Salva",
            "desc": "Scarica il PDF pronto per il caricamento sul portale."
        }
    ],
    "faqs": [
        {
            "q": "Come faccio a sapere quanti MB pesa il file finale?",
            "a": "La dimensione esatta viene mostrata immediatamente al termine della procedura di download."
        }
    ],
    "relatedSlugs": [
        "comprimere-pdf",
        "ridurre-pdf-per-concorsi",
        "comprimere-pdf-per-email"
    ],
    "canonical": "https://www.mypdftools.it/comprimere-pdf-sotto-2mb",
    "hreflang": {
        "it": "https://www.mypdftools.it/comprimere-pdf-sotto-2mb",
        "de": "https://www.mypdftools.de/pdf-unter-2mb-verkleinern"
    }
},

  'ridurre-pdf-per-concorsi': {
    "slug": "ridurre-pdf-per-concorsi",
    "toolId": "compress-pdf",
    "lang": "it",
    "domain": "mypdftools.it",
    "h1": "Ridurre Dimensioni PDF per Concorsi Pubblici e Bandi",
    "metaTitle": "Ridurre PDF per Concorsi e Bandi Pubblici — Sotto i Limiti di Upload",
    "metaDescription": "Prepara i tuoi documenti e titoli per portali della Pubblica Amministrazione (inPA, università). Comprimi PDF senza sacrificare la leggibilità.",
    "badge": "Bandi & PA",
    "intro": "Non rischiare l'esclusione da una graduatoria o bando pubblico a causa di file troppo pesanti. Ottimizza diplomi e certificati in totale privacy.",
    "steps": [
        {
            "title": "1. Inserisci i Certificati",
            "desc": "Carica le scansioni dei tuoi attestati e curriculum."
        },
        {
            "title": "2. Ottimizzazione Conforme",
            "desc": "Riduzione del peso mantenendo timbri e firme perfettamente nitidi."
        },
        {
            "title": "3. Carica sul Bando",
            "desc": "Scarica il file a norma e procedi con la domanda."
        }
    ],
    "faqs": [
        {
            "q": "I timbri e i testi piccoli rimangono leggibili?",
            "a": "Sì, la compressione preserva il contrasto essenziale per la verifica da parte delle commissioni d'esame."
        }
    ],
    "relatedSlugs": [
        "comprimere-pdf-sotto-2mb",
        "comprimere-pdf",
        "unire-pdf"
    ],
    "canonical": "https://www.mypdftools.it/ridurre-pdf-per-concorsi",
    "hreflang": {
        "it": "https://www.mypdftools.it/ridurre-pdf-per-concorsi",
        "de": "https://www.mypdftools.de/pdf-fuer-bewerbung-verkleinern"
    }
},

  'firmare-pdf-digitalmente-gratis': {
    "slug": "firmare-pdf-digitalmente-gratis",
    "toolId": "sign-pdf",
    "lang": "it",
    "domain": "mypdftools.it",
    "h1": "Firmare PDF Digitalmente Online Gratis",
    "metaTitle": "Firmare PDF Digitalmente Gratis — Aggiungi Firma Senza Stampare",
    "metaDescription": "Apponi la tua firma autografa o digita il tuo nome su contratti, liberatorie e moduli PDF. Rapido, sicuro e a costo zero.",
    "badge": "Firma Facile",
    "intro": "Dimentica stampanti e scanner. Disegna la tua firma sullo schermo del tuo computer o smartphone e applicala al documento in pochi istanti.",
    "steps": [
        {
            "title": "1. Apri il Documento",
            "desc": "Carica il contratto o modulo da firmare."
        },
        {
            "title": "2. Crea o Disegna la Firma",
            "desc": "Usa il mouse o il dito touch per tracciare la tua firma."
        },
        {
            "title": "3. Posiziona e Scarica",
            "desc": "Trascina la firma sullo spazio apposito e salva il PDF firmato."
        }
    ],
    "faqs": [
        {
            "q": "La mia firma viene archiviata sui vostri server?",
            "a": "Assolutamente no. La firma viene impressa localmente nella memoria del tuo browser."
        }
    ],
    "relatedSlugs": [
        "firmare-pdf",
        "firmare-contratto-pdf",
        "modificare-pdf"
    ],
    "canonical": "https://www.mypdftools.it/firmare-pdf-digitalmente-gratis",
    "hreflang": {
        "it": "https://www.mypdftools.it/firmare-pdf-digitalmente-gratis",
        "de": "https://www.mypdftools.de/pdf-digital-unterschreiben-kostenlos"
    }
},

  'firmare-contratto-pdf': {
    "slug": "firmare-contratto-pdf",
    "toolId": "sign-pdf",
    "lang": "it",
    "domain": "mypdftools.it",
    "h1": "Firmare Contratti PDF Online in Modo Sicuro",
    "metaTitle": "Firmare Contratti PDF Online — Firma Digitale per Accordi e Contratti",
    "metaDescription": "Firma accordi di locazione, contratti di lavoro e preventivi in PDF senza condividere dati sensibili con terze parti.",
    "badge": "Contratti",
    "intro": "Concludi accordi e contratti professionali in tempo reale con la massima garanzia di riservatezza per te e i tuoi clienti.",
    "steps": [
        {
            "title": "1. Carica il Contratto",
            "desc": "Seleziona l'accordo commerciale o di lavoro in formato PDF."
        },
        {
            "title": "2. Apponi Firma e Data",
            "desc": "Inserisci firma autografa e indicazione temporale sulla riga predisposta."
        },
        {
            "title": "3. Invia la Copia Firmata",
            "desc": "Scarica il documento definitivo da trasmettere alla controparte."
        }
    ],
    "faqs": [
        {
            "q": "Ha valore legale?",
            "a": "La firma elettronica semplice è ampiamente impiegata per accordi commerciali, conferme d'ordine e contratti privati secondo il regolamento eIDAS."
        }
    ],
    "relatedSlugs": [
        "firmare-pdf-digitalmente-gratis",
        "firmare-pdf",
        "proteggere-pdf"
    ],
    "canonical": "https://www.mypdftools.it/firmare-contratto-pdf",
    "hreflang": {
        "it": "https://www.mypdftools.it/firmare-contratto-pdf",
        "de": "https://www.mypdftools.de/vertrag-pdf-unterschreiben"
    }
},

  'scansioni-in-pdf': {
    "slug": "scansioni-in-pdf",
    "toolId": "jpg-to-pdf",
    "lang": "it",
    "domain": "mypdftools.it",
    "h1": "Convertire Scansioni in Documenti PDF",
    "metaTitle": "Convertire Scansioni in PDF Gratis — Raggruppa Fogli Scannerizzati",
    "metaDescription": "Hai fogli o documenti scansionati come singole immagini? Uniscili in un unico file PDF ordinato e pronto per la stampa o l'invio.",
    "badge": "Scansioni",
    "intro": "Trasforma scansioni cartacee disordinate in un fascicolo PDF leggibile ed elegante con margini uniformi e perfetta rotazione.",
    "steps": [
        {
            "title": "1. Carica i Fogli Scannerizzati",
            "desc": "Trascina tutte le scansioni (JPG, PNG)."
        },
        {
            "title": "2. Organizza la Sequenza",
            "desc": "Verifica la successione delle pagine."
        },
        {
            "title": "3. Salva Documento PDF",
            "desc": "Scarica il file completo in alta risoluzione."
        }
    ],
    "faqs": [
        {
            "q": "Posso ruotare le scansioni capovolte?",
            "a": "Sì, puoi ruotare facilmente le singole pagine prima di completare la generazione del PDF."
        }
    ],
    "relatedSlugs": [
        "da-jpg-a-pdf",
        "convertire-foto-in-pdf",
        "unire-pdf"
    ],
    "canonical": "https://www.mypdftools.it/scansioni-in-pdf",
    "hreflang": {
        "it": "https://www.mypdftools.it/scansioni-in-pdf",
        "de": "https://www.mypdftools.de/scans-in-pdf-umwandeln"
    }
},

  'screenshot-in-pdf': {
    "slug": "screenshot-in-pdf",
    "toolId": "jpg-to-pdf",
    "lang": "it",
    "domain": "mypdftools.it",
    "h1": "Convertire Screenshot in PDF Online",
    "metaTitle": "Convertire Screenshot in PDF Gratis — Crea PDF da Catture Schermo",
    "metaDescription": "Trasforma screenshot del PC o dello smartphone in un comodo PDF. Perfetto per guide, tutorial o prove di transazioni bancarie.",
    "badge": "Screenshot",
    "intro": "Crea velocemente report e documentazioni unendo le tue schermate in un PDF coerente e facile da consultare su qualsiasi schermo.",
    "steps": [
        {
            "title": "1. Seleziona gli Screenshot",
            "desc": "Carica le catture schermo salvate sul tuo dispositivo."
        },
        {
            "title": "2. Ordina gli Scatti",
            "desc": "Organizza i passaggi nella sequenza desiderata."
        },
        {
            "title": "3. Genera PDF",
            "desc": "Salva il PDF finale con layout ottimizzato."
        }
    ],
    "faqs": [
        {
            "q": "Gli screenshot perdono nitidezza?",
            "a": "No, i pixel degli screenshot rimangono nitidi e leggibili al 100%."
        }
    ],
    "relatedSlugs": [
        "da-jpg-a-pdf",
        "da-png-a-pdf",
        "unire-pdf"
    ],
    "canonical": "https://www.mypdftools.it/screenshot-in-pdf",
    "hreflang": {
        "it": "https://www.mypdftools.it/screenshot-in-pdf",
        "de": "https://www.mypdftools.de/screenshot-in-pdf-umwandeln"
    }
},

  'ricevute-in-pdf': {
    "slug": "ricevute-in-pdf",
    "toolId": "jpg-to-pdf",
    "lang": "it",
    "domain": "mypdftools.it",
    "h1": "Convertire Scontrini e Ricevute in PDF",
    "metaTitle": "Convertire Ricevute in PDF Gratis — Crea Note Spese PDF da Foto",
    "metaDescription": "Fotografa ricevute, pedaggi e scontrini con il tuo telefono e trasformali istantaneamente in un PDF per il rimborso spese aziendale.",
    "badge": "Note Spese",
    "intro": "Evita di smarrire giustificativi cartacei: converti subito le foto degli scontrini in un pratico foglio PDF da allegare alla tua nota spese.",
    "steps": [
        {
            "title": "1. Carica le Foto degli Scontrini",
            "desc": "Seleziona le foto delle ricevute scattate dal cellulare."
        },
        {
            "title": "2. Regola Margini",
            "desc": "Allinea i bordi per una presentazione pulita."
        },
        {
            "title": "3. Scarica Nota Spese PDF",
            "desc": "Ottieni il file pronto per l'amministrazione."
        }
    ],
    "faqs": [
        {
            "q": "Posso aggiungere più ricevute su un singolo documento?",
            "a": "Certamente, puoi combinare tutti gli scontrini del viaggio o del mese in una sola volta."
        }
    ],
    "relatedSlugs": [
        "da-jpg-a-pdf",
        "unire-fatture-pdf",
        "comprimere-pdf"
    ],
    "canonical": "https://www.mypdftools.it/ricevute-in-pdf",
    "hreflang": {
        "it": "https://www.mypdftools.it/ricevute-in-pdf",
        "de": "https://www.mypdftools.de/belege-in-pdf-umwandeln"
    }
},

  'guide/come-firmare-un-pdf-senza-stampare': {
    "slug": "guide/come-firmare-un-pdf-senza-stampare",
    "toolId": "sign-pdf",
    "lang": "it",
    "domain": "mypdftools.it",
    "h1": "Come Firmare un PDF Senza Stampare né Scansionare",
    "metaTitle": "Come Firmare un PDF Senza Stampare — Guida Pratica 2026",
    "metaDescription": "La guida completa passo dopo passo per firmare digitalmente qualsiasi documento PDF da computer o cellulare in 60 secondi.",
    "badge": "Guida Passo Passo",
    "intro": "Stampare un foglio solo per firmarlo a penna e poi doverlo riscansire è un inutile spreco di tempo e carta. Ecco come apporre la tua firma originale direttamente dallo schermo in 3 semplici passaggi.",
    "steps": [
        {
            "title": "Passo 1: Apri il Tool di Firma",
            "desc": "Accedi allo strumento gratuito di firma PDF su MyPdfTools."
        },
        {
            "title": "Passo 2: Traccia la tua Firma",
            "desc": "Disegna la firma con il mouse, con la penna touch o semplicemente con il dito dal cellulare."
        },
        {
            "title": "Passo 3: Posiziona e Salva",
            "desc": "Trascina la firma nel riquadro apposito, ridimensionala se necessario e scarica il PDF ultimato."
        }
    ],
    "faqs": [
        {
            "q": "Serve installare programmi come Adobe Acrobat Reader?",
            "a": "No, tutto il procedimento avviene online all'interno del tuo browser abituale senza plugin esterni."
        },
        {
            "q": "I miei dati rimangono privati?",
            "a": "Sì, la firma non lascia mai il tuo dispositivo e non viene registrata su alcun database esterno."
        }
    ],
    "relatedSlugs": [
        "firmare-pdf",
        "firmare-contratto-pdf",
        "firmare-pdf-digitalmente-gratis"
    ],
    "canonical": "https://www.mypdftools.it/guide/come-firmare-un-pdf-senza-stampare",
    "hreflang": {
        "it": "https://www.mypdftools.it/guide/come-firmare-un-pdf-senza-stampare",
        "de": "https://www.mypdftools.de/ratgeber/pdf-ohne-ausdrucken-unterschreiben"
    }
},

  'guide/come-proteggere-un-pdf-con-password': {
    "slug": "guide/come-proteggere-un-pdf-con-password",
    "toolId": "protect-pdf",
    "lang": "it",
    "domain": "mypdftools.it",
    "h1": "Come Proteggere un PDF con Password e Crittografia",
    "metaTitle": "Come Proteggere un PDF con Password — Guida alla Sicurezza",
    "metaDescription": "Scopri come crittografare i tuoi file PDF sensibili con password sicura a 128 o 256 bit per impedire accessi non autorizzati.",
    "badge": "Guida Sicurezza",
    "intro": "Inviare documenti contenenti dati bancari, cartelle cliniche o accordi riservati richiede la massima cautela. Questa guida illustra come applicare una cifratura robusta ai tuoi file PDF.",
    "steps": [
        {
            "title": "Passo 1: Carica il PDF",
            "desc": "Seleziona il documento da mettere in sicurezza."
        },
        {
            "title": "Passo 2: Imposta una Password Robusta",
            "desc": "Digita una combinazione di lettere maiuscole, minuscole, numeri e simboli."
        },
        {
            "title": "Passo 3: Scarica il PDF Cifrato",
            "desc": "Il documento richiederà la chiave d'accesso ogni volta che verrà aperto."
        }
    ],
    "faqs": [
        {
            "q": "Chi può aprire il file dopo la cifratura?",
            "a": "Soltanto chi è a conoscenza della password corretta potrà visualizzare il contenuto."
        }
    ],
    "relatedSlugs": [
        "proteggere-pdf",
        "sbloccare-pdf",
        "oscurare-pdf"
    ],
    "canonical": "https://www.mypdftools.it/guide/come-proteggere-un-pdf-con-password",
    "hreflang": {
        "it": "https://www.mypdftools.it/guide/come-proteggere-un-pdf-con-password",
        "de": "https://www.mypdftools.de/ratgeber/pdf-mit-passwort-schuetzen"
    }
},

  'guide/come-estrarre-pagine-da-un-pdf': {
    "slug": "guide/come-estrarre-pagine-da-un-pdf",
    "toolId": "extract-pages",
    "lang": "it",
    "domain": "mypdftools.it",
    "h1": "Come Estrarre Pagine da un PDF e Salvarle Separatamente",
    "metaTitle": "Come Estrarre Pagine da un PDF — Guida Completa e Semplice",
    "metaDescription": "Hai bisogno solo di alcune pagine di un lungo documento PDF? Ecco la procedura per estrarre e salvare solo i fogli che ti interessano.",
    "badge": "Guida Pratica",
    "intro": "Spesso un manuale o un contratto contiene decine di pagine, ma a te ne serve solo una o due. Scopri come isolare i fogli rilevanti senza perdere formattazione.",
    "steps": [
        {
            "title": "Passo 1: Apri il PDF",
            "desc": "Carica il documento multipagina nello strumento di estrazione."
        },
        {
            "title": "Passo 2: Clicca sulle Pagine Desiderate",
            "desc": "Seleziona graficamente le pagine da isolare o digita l'intervallo numerico."
        },
        {
            "title": "Passo 3: Esporta il Nuovo Documento",
            "desc": "Scarica all'istante il PDF snello contenente solo le pagine selezionate."
        }
    ],
    "faqs": [
        {
            "q": "Il PDF originale viene modificato o cancellato?",
            "a": "No, il tuo file sorgente resta intatto sul tuo computer; viene generato un nuovo file indipendente."
        }
    ],
    "relatedSlugs": [
        "estrarre-pagine-pdf",
        "dividere-pdf",
        "eliminare-pagine-pdf"
    ],
    "canonical": "https://www.mypdftools.it/guide/come-estrarre-pagine-da-un-pdf",
    "hreflang": {
        "it": "https://www.mypdftools.it/guide/come-estrarre-pagine-da-un-pdf",
        "de": "https://www.mypdftools.de/ratgeber/einzelne-seiten-aus-pdf-speichern"
    }
},

  'guide/come-convertire-word-in-pdf-gratis': {
    "slug": "guide/come-convertire-word-in-pdf-gratis",
    "toolId": "word-to-pdf",
    "lang": "it",
    "domain": "mypdftools.it",
    "h1": "Come Convertire un File Word in PDF Senza Microsoft Office",
    "metaTitle": "Come Convertire Word in PDF Gratis — Guida Senza Office",
    "metaDescription": "Non hai Word installato sul tuo computer? Ecco come trasformare qualsiasi file DOC e DOCX in un PDF perfetto senza pagare licenze.",
    "badge": "Guida Office",
    "intro": "Inviare un documento in formato Word può comportare problemi di visualizzazione se il destinatario usa versioni diverse di Office o smartphone. Convertirlo in PDF garantisce che il layout rimanga identico.",
    "steps": [
        {
            "title": "Passo 1: Seleziona il Documento Word",
            "desc": "Carica il file .docx o .doc."
        },
        {
            "title": "Passo 2: Elaborazione Automatica",
            "desc": "La formattazione e gli stili vengono tradotti nello standard PDF."
        },
        {
            "title": "Passo 3: Scarica il PDF Pronto",
            "desc": "Invia o stampa il tuo documento senza sorprese."
        }
    ],
    "faqs": [
        {
            "q": "Le immagini e le tabelle mantengono la posizione esatta?",
            "a": "Sì, la conversione preserva l'impaginazione impostata nel documento originale."
        }
    ],
    "relatedSlugs": [
        "da-word-a-pdf",
        "da-pdf-a-word",
        "da-excel-a-pdf"
    ],
    "canonical": "https://www.mypdftools.it/guide/come-convertire-word-in-pdf-gratis",
    "hreflang": {
        "it": "https://www.mypdftools.it/guide/come-convertire-word-in-pdf-gratis",
        "de": "https://www.mypdftools.de/ratgeber/word-in-pdf-umwandeln-kostenlos"
    }
},

  'guide/come-ruotare-e-salvare-un-pdf': {
    "slug": "guide/come-ruotare-e-salvare-un-pdf",
    "toolId": "rotate-pdf",
    "lang": "it",
    "domain": "mypdftools.it",
    "h1": "Come Ruotare un PDF e Salvarlo Definitivamente",
    "metaTitle": "Come Ruotare un PDF e Salvarlo — Guida Rotazione Permanente",
    "metaDescription": "Hai una pagina PDF al contrario o storta? Ecco come ruotarla di 90° o 180° e salvare la nuova visualizzazione in modo permanente.",
    "badge": "Guida Rotazione",
    "intro": "A volte un lettore PDF ruota una pagina solo temporaneamente, ma al successivo riavvio torna storta. Questa guida ti insegna come salvare la rotazione in modo irreversibile e corretto.",
    "steps": [
        {
            "title": "Passo 1: Carica il PDF",
            "desc": "Apri il file con le pagine ruotate in modo scorretto."
        },
        {
            "title": "Passo 2: Clicca su Ruota",
            "desc": "Gira le singole pagine o l'intero documento di 90° in senso orario o antiorario."
        },
        {
            "title": "Passo 3: Salva Definitivamente",
            "desc": "Scarica il nuovo file: si aprirà sempre nel verso corretto su qualsiasi programma."
        }
    ],
    "faqs": [
        {
            "q": "Posso ruotare solo una singola pagina lasciando le altre invariate?",
            "a": "Assolutamente sì, puoi selezionare selettivamente solo le pagine che necessitano di correzione."
        }
    ],
    "relatedSlugs": [
        "ruotare-pdf",
        "organizzare-pdf",
        "eliminare-pagine-pdf"
    ],
    "canonical": "https://www.mypdftools.it/guide/come-ruotare-e-salvare-un-pdf",
    "hreflang": {
        "it": "https://www.mypdftools.it/guide/come-ruotare-e-salvare-un-pdf",
        "de": "https://www.mypdftools.de/ratgeber/pdf-dauerhaft-drehen-und-speichern"
    }
},

  'powerpoint-in-pdf': {
    "slug": "powerpoint-in-pdf",
    "toolId": "powerpoint-to-pdf",
    "lang": "de",
    "domain": "mypdftools.de",
    "h1": "PowerPoint in PDF umwandeln online kostenlos",
    "metaTitle": "PowerPoint in PDF umwandeln — PPT & PPTX zu PDF Konverter",
    "metaDescription": "Konvertieren Sie PowerPoint-Präsentationen (PPTX, PPT) direkt im Browser in PDF. 100% kostenlos und ohne Server-Upload.",
    "badge": "Präsentationen",
    "intro": "Sichern Sie das Layout Ihrer Vortragsfolien: Konvertieren Sie PowerPoint-Präsentationen in saubere PDFs für zuverlässiges Drucken und Versenden.",
    "steps": [
        {
            "title": "Schritt 1: Präsentation wählen",
            "desc": "Laden Sie Ihre PPTX- oder PPT-Datei hoch."
        },
        {
            "title": "Schritt 2: Automatische Umwandlung",
            "desc": "Folien werden originalgetreu in PDF-Seiten übertragen."
        },
        {
            "title": "Schritt 3: PDF herunterladen",
            "desc": "Speichern Sie das fertige PDF-Dokument auf Ihrem Rechner."
        }
    ],
    "faqs": [
        {
            "q": "Bleiben Schriftarten und Formatierungen erhalten?",
            "a": "Ja, die visuelle Darstellung der Folien wird präzise in das PDF-Format übernommen."
        }
    ],
    "relatedSlugs": [
        "word-in-pdf",
        "excel-in-pdf",
        "pdf-in-powerpoint"
    ],
    "canonical": "https://www.mypdftools.de/powerpoint-in-pdf",
    "hreflang": {
        "it": "https://www.mypdftools.it/da-powerpoint-a-pdf",
        "de": "https://www.mypdftools.de/powerpoint-in-pdf"
    }
},

  'pdf-in-powerpoint': {
    "slug": "pdf-in-powerpoint",
    "toolId": "pdf-to-powerpoint",
    "lang": "de",
    "domain": "mypdftools.de",
    "h1": "PDF in PowerPoint umwandeln kostenlos",
    "metaTitle": "PDF in PowerPoint umwandeln — PDF zu PPTX Präsentation",
    "metaDescription": "Verwandeln Sie PDF-Dokumente und Foliensätze zurück in bearbeitbare PowerPoint PPTX-Dateien. Schnell, sicher und privat.",
    "badge": "PPTX",
    "intro": "Extrahieren Sie Folieninhalte aus Ihren PDFs, um sie direkt in PowerPoint, Keynote oder Google Präsentationen weiterzubearbeiten.",
    "steps": [
        {
            "title": "Schritt 1: PDF öffnen",
            "desc": "Wählen Sie das PDF mit den Folien aus."
        },
        {
            "title": "Schritt 2: Folien-Erstellung",
            "desc": "Jede PDF-Seite wird in eine hochauflösende Folie überführt."
        },
        {
            "title": "Schritt 3: PPTX sichern",
            "desc": "Laden Sie die fertige Präsentation herunter."
        }
    ],
    "faqs": [
        {
            "q": "Werden sensible Folien auf Server hochgeladen?",
            "a": "Nein, die Verarbeitung erfolgt komplett lokal in Ihrem Browser."
        }
    ],
    "relatedSlugs": [
        "powerpoint-in-pdf",
        "pdf-in-word",
        "pdf-in-jpg"
    ],
    "canonical": "https://www.mypdftools.de/pdf-in-powerpoint",
    "hreflang": {
        "it": "https://www.mypdftools.it/da-pdf-a-powerpoint",
        "de": "https://www.mypdftools.de/pdf-in-powerpoint"
    }
},

  'png-in-pdf': {
    "slug": "png-in-pdf",
    "toolId": "jpg-to-pdf",
    "lang": "de",
    "domain": "mypdftools.de",
    "h1": "PNG in PDF umwandeln online kostenlos",
    "metaTitle": "PNG in PDF umwandeln — Bilder als PDF speichern",
    "metaDescription": "Wandeln Sie PNG-Bilder und Grafiken in kompakte PDF-Dokumente um. Mehrere Bilder zusammenfügen, kein Upload nötig.",
    "badge": "PNG",
    "intro": "Erstellen Sie professionelle PDF-Dokumente aus Ihren PNG-Grafiken, Screenshots oder Logos mit optimaler Bildqualität.",
    "steps": [
        {
            "title": "Schritt 1: PNG-Dateien auswählen",
            "desc": "Ziehen Sie ein oder mehrere PNG-Bilder in den Bereich."
        },
        {
            "title": "Schritt 2: Seiten einrichten",
            "desc": "Bestimmen Sie Reihenfolge, Ausrichtung und Ränder."
        },
        {
            "title": "Schritt 3: PDF herunterladen",
            "desc": "Erhalten Sie sofort Ihr neues PDF-Dokument."
        }
    ],
    "faqs": [
        {
            "q": "Bleibt die Bildschärfe von Texten in PNGs erhalten?",
            "a": "Ja, PNG-Bilder werden verlustfrei eingebettet."
        }
    ],
    "relatedSlugs": [
        "jpg-in-pdf",
        "fotos-in-pdf-umwandeln",
        "pdf-in-png"
    ],
    "canonical": "https://www.mypdftools.de/png-in-pdf",
    "hreflang": {
        "it": "https://www.mypdftools.it/da-png-a-pdf",
        "de": "https://www.mypdftools.de/png-in-pdf"
    }
},

  'pdf-in-png': {
    "slug": "pdf-in-png",
    "toolId": "pdf-to-jpg",
    "lang": "de",
    "domain": "mypdftools.de",
    "h1": "PDF in PNG umwandeln in hoher Auflösung",
    "metaTitle": "PDF in PNG umwandeln — PDF-Seiten als scharfe PNG-Bilder",
    "metaDescription": "Konvertieren Sie PDF-Seiten in scharfe PNG-Grafiken. Ideal für Webgrafiken, Präsentationen und Dokumentationen.",
    "badge": "PNG HD",
    "intro": "Exportieren Sie Seiten aus PDF-Dokumenten als hochauflösende PNG-Dateien mit gestochen scharfem Text und sauberen Kontrasten.",
    "steps": [
        {
            "title": "Schritt 1: PDF hochladen",
            "desc": "Wählen Sie das gewünschte Dokument aus."
        },
        {
            "title": "Schritt 2: HD-Rendering",
            "desc": "Die Seiten werden verlustfrei in Grafikdaten gerendert."
        },
        {
            "title": "Schritt 3: PNGs herunterladen",
            "desc": "Speichern Sie einzelne Bilder oder alle Seiten auf einmal."
        }
    ],
    "faqs": [
        {
            "q": "Warum PNG statt JPG für PDF-Seiten?",
            "a": "PNG komprimiert Text und geometrische Formen verlustfrei ohne unschöne JPG-Artefakte."
        }
    ],
    "relatedSlugs": [
        "pdf-in-jpg",
        "png-in-pdf",
        "pdf-seiten-extrahieren"
    ],
    "canonical": "https://www.mypdftools.de/pdf-in-png",
    "hreflang": {
        "it": "https://www.mypdftools.it/da-pdf-a-png",
        "de": "https://www.mypdftools.de/pdf-in-png"
    }
},

  'pdf-in-text': {
    "slug": "pdf-in-text",
    "toolId": "pdf-to-markdown",
    "lang": "de",
    "domain": "mypdftools.de",
    "h1": "Text aus PDF extrahieren online kostenlos",
    "metaTitle": "Text aus PDF extrahieren — PDF in TXT & Text umwandeln",
    "metaDescription": "Kopieren Sie reinen Text aus PDF-Dokumenten ohne mühsames Abtippen. Funktioniert sicher und lokal im Browser.",
    "badge": "Text TXT",
    "intro": "Extrahieren Sie Absätze, Tabellendaten und Notizen aus PDFs in wenigen Augenblicken zur Weiterverarbeitung in Textprogrammen.",
    "steps": [
        {
            "title": "Schritt 1: PDF öffnen",
            "desc": "Wählen Sie die PDF-Datei mit dem Text aus."
        },
        {
            "title": "Schritt 2: Textextraktion",
            "desc": "Die Textdaten werden in Echtzeit ausgelesen."
        },
        {
            "title": "Schritt 3: Kopieren oder Speichern",
            "desc": "Kopieren Sie den Text in die Zwischenablage."
        }
    ],
    "faqs": [
        {
            "q": "Werden Zeilenumbrüche beibehalten?",
            "a": "Ja, die logische Absatzstruktur bleibt weitestgehend erhalten."
        }
    ],
    "relatedSlugs": [
        "pdf-in-markdown",
        "pdf-in-word",
        "pdf-bearbeiten"
    ],
    "canonical": "https://www.mypdftools.de/pdf-in-text",
    "hreflang": {
        "it": "https://www.mypdftools.it/da-pdf-a-testo",
        "de": "https://www.mypdftools.de/pdf-in-text"
    }
},

  'ocr-pdf-online-kostenlos': {
    "slug": "ocr-pdf-online-kostenlos",
    "toolId": "pdf-to-markdown",
    "lang": "de",
    "domain": "mypdftools.de",
    "h1": "OCR PDF online kostenlos — Texterkennung für Scans",
    "metaTitle": "OCR PDF online kostenlos — Texterkennung für gescannte PDFs",
    "metaDescription": "Erkennen Sie Text in gescannten Dokumenten und Bild-PDFs mit lokaler OCR-Technologie. 100% datenschutzkonform.",
    "badge": "OCR",
    "intro": "Haben Sie einen Scan, in dem sich kein Text markieren lässt? Nutzen Sie optische Zeichenerkennung, um den Inhalt durchsuchbar zu machen.",
    "steps": [
        {
            "title": "Schritt 1: Scan auswählen",
            "desc": "Laden Sie das eingescannte PDF hoch."
        },
        {
            "title": "Schritt 2: OCR-Analyse",
            "desc": "Schriftzeichen werden automatisch erkannt."
        },
        {
            "title": "Schritt 3: Text verwenden",
            "desc": "Kopieren oder speichern Sie den erkannten Text."
        }
    ],
    "faqs": [
        {
            "q": "Verlassen meine Scans mein Gerät?",
            "a": "Nein, die Texterkennung erfolgt datenschutzsicher direkt auf Ihrem Endgerät."
        }
    ],
    "relatedSlugs": [
        "pdf-in-text",
        "pdf-in-markdown",
        "pdf-in-word"
    ],
    "canonical": "https://www.mypdftools.de/ocr-pdf-online-kostenlos",
    "hreflang": {
        "it": "https://www.mypdftools.it/ocr-pdf-online",
        "de": "https://www.mypdftools.de/ocr-pdf-online-kostenlos"
    }
},

  'pdf-zuschneiden': {
    "slug": "pdf-zuschneiden",
    "toolId": "organize-pdf",
    "lang": "de",
    "domain": "mypdftools.de",
    "h1": "PDF zuschneiden online — Ränder und Seiten anpassen",
    "metaTitle": "PDF zuschneiden online kostenlos — Ränder verkleinern",
    "metaDescription": "Schneiden Sie weiße Ränder und überflüssige Randbereiche aus PDF-Dateien heraus. Perfekt für E-Reader und Ausdrucke.",
    "badge": "Zuschneiden",
    "intro": "Entfernen Sie störende breite Ränder, um Dokumente auf Tablets, Smartphones oder Bildschirmen optimal lesbar zu machen.",
    "steps": [
        {
            "title": "Schritt 1: PDF laden",
            "desc": "Wählen Sie das zuzuschneidende Dokument."
        },
        {
            "title": "Schritt 2: Rahmen definieren",
            "desc": "Legen Sie den sichtbaren Bereich fest."
        },
        {
            "title": "Schritt 3: Zugeschnittenes PDF sichern",
            "desc": "Laden Sie das optimierte Dokument herunter."
        }
    ],
    "faqs": [
        {
            "q": "Werden Texte beim Zuschneiden unscharf?",
            "a": "Nein, die Vektordaten bleiben absolut unverändert."
        }
    ],
    "relatedSlugs": [
        "pdf-organisieren",
        "pdf-seiten-loeschen",
        "pdf-drehen"
    ],
    "canonical": "https://www.mypdftools.de/pdf-zuschneiden",
    "hreflang": {
        "it": "https://www.mypdftools.it/ritagliare-pdf",
        "de": "https://www.mypdftools.de/pdf-zuschneiden"
    }
},

  'pdf-abflachen': {
    "slug": "pdf-abflachen",
    "toolId": "generic-tool",
    "lang": "de",
    "domain": "mypdftools.de",
    "h1": "PDF abflachen online (Flatten PDF)",
    "metaTitle": "PDF abflachen online kostenlos — Formulare & Unterschriften fixieren",
    "metaDescription": "Fixieren Sie ausgefüllte Formularfelder, Anmerkungen und Unterschriften in PDFs, sodass sie nicht mehr veränderbar sind.",
    "badge": "Flatten",
    "intro": "Sichern Sie ausgefüllte Anträge: Durch das Abflachen werden interaktive Formularfelder dauerhaft in die Grafikebene integriert.",
    "steps": [
        {
            "title": "Schritt 1: Formular-PDF öffnen",
            "desc": "Laden Sie das ausgefüllte Dokument hoch."
        },
        {
            "title": "Schritt 2: Ebenen verschmelzen",
            "desc": "Felder und Unterschriften werden fest eingebrannt."
        },
        {
            "title": "Schritt 3: Sicheres PDF sichern",
            "desc": "Speichern Sie das unveränderbare Dokument ab."
        }
    ],
    "faqs": [
        {
            "q": "Was bewirkt das Abflachen genau?",
            "a": "Es verhindert, dass andere Personen Eingaben in Formularen nachträglich überschreiben können."
        }
    ],
    "relatedSlugs": [
        "pdf-unterschreiben",
        "pdf-schuetzen",
        "pdf-bearbeiten"
    ],
    "canonical": "https://www.mypdftools.de/pdf-abflachen",
    "hreflang": {
        "it": "https://www.mypdftools.it/appiattire-pdf",
        "de": "https://www.mypdftools.de/pdf-abflachen"
    }
},

  'pdf-schwaerzen': {
    "slug": "pdf-schwaerzen",
    "toolId": "generic-tool",
    "lang": "de",
    "domain": "mypdftools.de",
    "h1": "PDF schwärzen online — Sensible Daten unkenntlich machen",
    "metaTitle": "PDF schwärzen online — DSGVO-konform sensible Daten löschen",
    "metaDescription": "Entfernen Sie persönliche Daten, Kontonummern und vertrauliche Informationen dauerhaft aus PDF-Dateien vor der Weitergabe.",
    "badge": "DSGVO Schutz",
    "intro": "Schwärzen Sie vertrauliche Passagen in Verträgen und Dokumenten absolut sicher und unwiderruflich direkt in Ihrem Browser.",
    "steps": [
        {
            "title": "Schritt 1: Dokument öffnen",
            "desc": "Laden Sie das vertrauliche PDF hoch."
        },
        {
            "title": "Schritt 2: Bereiche schwärzen",
            "desc": "Markieren Sie schützenswerte Namen und Nummern."
        },
        {
            "title": "Schritt 3: Anonymisiertes PDF sichern",
            "desc": "Laden Sie die bereinigte Version herunter."
        }
    ],
    "faqs": [
        {
            "q": "Lässt sich geschwärzter Text wiederherstellen?",
            "a": "Nein, die zugrunde liegenden Textdaten werden vollständig aus der Datei getilgt."
        }
    ],
    "relatedSlugs": [
        "pdf-schuetzen",
        "pdf-abflachen",
        "pdf-bearbeiten"
    ],
    "canonical": "https://www.mypdftools.de/pdf-schwaerzen",
    "hreflang": {
        "it": "https://www.mypdftools.it/oscurare-pdf",
        "de": "https://www.mypdftools.de/pdf-schwaerzen"
    }
},

  'pdf-reparieren': {
    "slug": "pdf-reparieren",
    "toolId": "generic-tool",
    "lang": "de",
    "domain": "mypdftools.de",
    "h1": "Beschädigte PDF-Datei reparieren online",
    "metaTitle": "PDF reparieren online kostenlos — Defekte PDF-Dateien retten",
    "metaDescription": "Können Sie Ihr PDF nicht mehr öffnen? Reparieren Sie defekte Header, beschädigte XREF-Tabellen und retten Sie Ihre Dokumente.",
    "badge": "Rettung",
    "intro": "Fehlermeldung beim Öffnen? Rekonstruieren Sie beschädigte PDF-Strukturen und stellen Sie Seiten und Inhalte schnell wieder her.",
    "steps": [
        {
            "title": "Schritt 1: Defektes PDF wählen",
            "desc": "Laden Sie die Datei hoch, die Fehler meldet."
        },
        {
            "title": "Schritt 2: Struktur-Reparatur",
            "desc": "Intakte Objekte und Seiten werden neu indexiert."
        },
        {
            "title": "Schritt 3: Gerettetes PDF öffnen",
            "desc": "Speichern Sie die reparierte Version."
        }
    ],
    "faqs": [
        {
            "q": "Können alle beschädigten PDFs gerettet werden?",
            "a": "Solange die eigentlichen Text- und Bildblöcke nicht überschrieben wurden, ist die Erfolgsquote sehr hoch."
        }
    ],
    "relatedSlugs": [
        "pdf-entsperren",
        "pdf-organisieren",
        "pdf-zusammenfuegen"
    ],
    "canonical": "https://www.mypdftools.de/pdf-reparieren",
    "hreflang": {
        "it": "https://www.mypdftools.it/riparare-pdf",
        "de": "https://www.mypdftools.de/pdf-reparieren"
    }
},

  'pdf-vergleichen': {
    "slug": "pdf-vergleichen",
    "toolId": "generic-tool",
    "lang": "de",
    "domain": "mypdftools.de",
    "h1": "Zwei PDF-Dateien vergleichen online",
    "metaTitle": "Zwei PDF-Dateien vergleichen online — Unterschiede hervorheben",
    "metaDescription": "Finden Sie Unterschiede zwischen zwei Versionen eines PDF-Dokuments. Erkennen Sie Änderungen an Texten und Klauseln sofort.",
    "badge": "Diff Check",
    "intro": "Prüfen Sie Vertragsentwürfe und Revisionsstände im Detail. Erkennen Sie auf einen Blick, welche Passagen geändert oder gestrichen wurden.",
    "steps": [
        {
            "title": "Schritt 1: Beide Versionen laden",
            "desc": "Legen Sie Original und Überarbeitung fest."
        },
        {
            "title": "Schritt 2: Abweichungen analysieren",
            "desc": "Abweichungen werden farblich markiert."
        },
        {
            "title": "Schritt 3: Prüfergebnis einsehen",
            "desc": "Beurteilen Sie die Änderungen vor der Freigabe."
        }
    ],
    "faqs": [
        {
            "q": "Werden auch Zahlen- und Preisänderungen erfasst?",
            "a": "Ja, jede noch so kleine typografische Abweichung wird aufgedeckt."
        }
    ],
    "relatedSlugs": [
        "pdf-bearbeiten",
        "pdf-zusammenfuegen",
        "pdf-unterschreiben"
    ],
    "canonical": "https://www.mypdftools.de/pdf-vergleichen",
    "hreflang": {
        "it": "https://www.mypdftools.it/confrontare-pdf",
        "de": "https://www.mypdftools.de/pdf-vergleichen"
    }
},

  'pdf-schwarz-weiss': {
    "slug": "pdf-schwarz-weiss",
    "toolId": "generic-tool",
    "lang": "de",
    "domain": "mypdftools.de",
    "h1": "PDF in Schwarz-Weiß (Graustufen) umwandeln",
    "metaTitle": "PDF in Schwarz-Weiß umwandeln — Graustufen für sparsamen Druck",
    "metaDescription": "Konvertieren Sie farbige PDFs in Graustufen. Sparen Sie teure Druckertinte und reduzieren Sie die Dateigröße.",
    "badge": "Graustufen",
    "intro": "Bereiten Sie Skripte und Dokumente für den kostengünstigen Laserdruck vor, indem Sie alle Farben in saubere Graustufen überführen.",
    "steps": [
        {
            "title": "Schritt 1: Farbiges PDF laden",
            "desc": "Wählen Sie das umzuwandelnde Dokument."
        },
        {
            "title": "Schritt 2: Farbraum anpassen",
            "desc": "RGB- und CMYK-Bilder werden in Grautöne umgerechnet."
        },
        {
            "title": "Schritt 3: Schwarz-Weiß-PDF sichern",
            "desc": "Laden Sie die druckfertige Datei herunter."
        }
    ],
    "faqs": [
        {
            "q": "Sinkt dadurch auch das Dateivolumen?",
            "a": "Häufig ja, da bei Graustufenbildern weniger Farbkanäle gespeichert werden müssen."
        }
    ],
    "relatedSlugs": [
        "pdf-komprimieren",
        "pdf-verkleinern",
        "pdf-in-jpg"
    ],
    "canonical": "https://www.mypdftools.de/pdf-schwarz-weiss",
    "hreflang": {
        "it": "https://www.mypdftools.it/pdf-bianco-nero",
        "de": "https://www.mypdftools.de/pdf-schwarz-weiss"
    }
},

  'zwei-pdf-zusammenfuegen': {
    "slug": "zwei-pdf-zusammenfuegen",
    "toolId": "merge-pdf",
    "lang": "de",
    "domain": "mypdftools.de",
    "h1": "Zwei PDF-Dateien zusammenfügen online",
    "metaTitle": "Zwei PDF-Dateien zusammenfügen — 2 PDFs zu einer Datei verbinden",
    "metaDescription": "Verbinden Sie zwei einzelne PDF-Dateien sekundenschnell zu einem Dokument. Kostenlos, unbegrenzt und ohne Registrierung.",
    "badge": "Schnell",
    "intro": "Müssen Sie Vorder- und Rückseite oder Anschreiben und Zeugnisse verbinden? Fügen Sie zwei PDFs mit wenigen Klicks zusammen.",
    "steps": [
        {
            "title": "Schritt 1: Beide PDFs hochladen",
            "desc": "Wählen Sie Datei 1 und Datei 2 aus."
        },
        {
            "title": "Schritt 2: Reihenfolge prüfen",
            "desc": "Legen Sie fest, welches Dokument zuerst steht."
        },
        {
            "title": "Schritt 3: Fertiges PDF sichern",
            "desc": "Laden Sie die zusammengefügte Datei herunter."
        }
    ],
    "faqs": [
        {
            "q": "Kostet das Tool etwas?",
            "a": "Nein, MyPdfTools ist zu 100% kostenfrei nutzbar."
        }
    ],
    "relatedSlugs": [
        "pdf-zusammenfuegen",
        "pdf-teilen",
        "pdf-komprimieren"
    ],
    "canonical": "https://www.mypdftools.de/zwei-pdf-zusammenfuegen",
    "hreflang": {
        "it": "https://www.mypdftools.it/unire-due-pdf",
        "de": "https://www.mypdftools.de/zwei-pdf-zusammenfuegen"
    }
},

  'rechnungen-pdf-zusammenfuegen': {
    "slug": "rechnungen-pdf-zusammenfuegen",
    "toolId": "merge-pdf",
    "lang": "de",
    "domain": "mypdftools.de",
    "h1": "PDF-Rechnungen und Belege zusammenfügen für Buchhaltung",
    "metaTitle": "Rechnungen PDF zusammenfügen — Belege für Steuerberater ordnen",
    "metaDescription": "Fassen Sie Monatsrechnungen, Quittungen und Kontoauszüge zu einem einzigen PDF zusammen. Sicher und diskret für Steuer und Buchhaltung.",
    "badge": "Buchhaltung",
    "intro": "Bringen Sie Ordnung in Ihre Steuerunterlagen: Fügen Sie alle Eingangsrechnungen eines Monats in einer chronologischen PDF-Datei zusammen.",
    "steps": [
        {
            "title": "Schritt 1: Belege auswählen",
            "desc": "Laden Sie Ihre Rechnungs-PDFs hoch."
        },
        {
            "title": "Schritt 2: Nach Datum sortieren",
            "desc": "Bringen Sie die Belege in die richtige Reihenfolge."
        },
        {
            "title": "Schritt 3: Sammel-PDF erstellen",
            "desc": "Senden Sie die kompakte Datei an Ihren Steuerberater."
        }
    ],
    "faqs": [
        {
            "q": "Bleiben Finanzdaten geheim?",
            "a": "Ja, kein einziges Dokument wird auf einen Webserver übertragen."
        }
    ],
    "relatedSlugs": [
        "pdf-zusammenfuegen",
        "pdf-komprimieren-fuer-email",
        "pdf-seitenzahlen"
    ],
    "canonical": "https://www.mypdftools.de/rechnungen-pdf-zusammenfuegen",
    "hreflang": {
        "it": "https://www.mypdftools.it/unire-fatture-pdf",
        "de": "https://www.mypdftools.de/rechnungen-pdf-zusammenfuegen"
    }
},

  'pdf-am-handy-zusammenfuegen': {
    "slug": "pdf-am-handy-zusammenfuegen",
    "toolId": "merge-pdf",
    "lang": "de",
    "domain": "mypdftools.de",
    "h1": "PDF-Dateien am Smartphone zusammenfügen (Android & iPhone)",
    "metaTitle": "PDF am Handy zusammenfügen — Online auf iPhone & Android",
    "metaDescription": "Verbinden Sie PDF-Dokumente direkt auf dem Smartphone ohne App-Download. Funktioniert in Safari, Chrome und Firefox mobil.",
    "badge": "Mobil",
    "intro": "Unterwegs schnell Unterlagen zusammenfügen? Öffnen Sie einfach Ihren Smartphone-Browser, wählen Sie die Dokumente und laden Sie das fertige PDF.",
    "steps": [
        {
            "title": "Schritt 1: Dateien am Handy antippen",
            "desc": "Wählen Sie PDFs aus Dateien (iOS) oder Downloads (Android)."
        },
        {
            "title": "Schritt 2: Anordnung anpassen",
            "desc": "Verschieben Sie Seiten bequem per Touch."
        },
        {
            "title": "Schritt 3: Aufs Handy laden",
            "desc": "Teilen Sie das Ergebnis direkt per WhatsApp oder Mail."
        }
    ],
    "faqs": [
        {
            "q": "Muss ich eine App installieren?",
            "a": "Nein, Sie sparen Speicherplatz, da das Tool direkt im Webbrowser läuft."
        }
    ],
    "relatedSlugs": [
        "pdf-zusammenfuegen",
        "jpg-in-pdf",
        "pdf-unterschreiben"
    ],
    "canonical": "https://www.mypdftools.de/pdf-am-handy-zusammenfuegen",
    "hreflang": {
        "it": "https://www.mypdftools.it/unire-pdf-smartphone",
        "de": "https://www.mypdftools.de/pdf-am-handy-zusammenfuegen"
    }
},

  'pdf-komprimieren-fuer-email': {
    "slug": "pdf-komprimieren-fuer-email",
    "toolId": "compress-pdf",
    "lang": "de",
    "domain": "mypdftools.de",
    "h1": "PDF verkleinern für E-Mail-Anhänge",
    "metaTitle": "PDF für E-Mail komprimieren — Zu große Anhänge verkleinern",
    "metaDescription": "Ihr PDF ist größer als 10 MB oder 25 MB und wird vom Mailserver abgewiesen? Verkleinern Sie die Datei schnell und scharf.",
    "badge": "E-Mail Ready",
    "intro": "Vermeiden Sie Fehlermeldungen beim Mailversand: Reduzieren Sie die Dateigröße auf ein handliches Maß, ohne dass Texte unleserlich werden.",
    "steps": [
        {
            "title": "Schritt 1: Großes PDF hochladen",
            "desc": "Wählen Sie das abgewiesene Dokument."
        },
        {
            "title": "Schritt 2: Automatische Reduktion",
            "desc": "Bilddaten und Metadaten werden optimiert."
        },
        {
            "title": "Schritt 3: Mühelos per Mail senden",
            "desc": "Laden Sie das kleine PDF herunter."
        }
    ],
    "faqs": [
        {
            "q": "Was ist die maximale Anhanggröße?",
            "a": "Die meisten Mail-Dienste wie GMX, Web.de oder Gmail begrenzen Anhänge auf 20 bis 25 MB."
        }
    ],
    "relatedSlugs": [
        "pdf-komprimieren",
        "pdf-verkleinern",
        "pdf-unter-2mb-verkleinern"
    ],
    "canonical": "https://www.mypdftools.de/pdf-komprimieren-fuer-email",
    "hreflang": {
        "it": "https://www.mypdftools.it/comprimere-pdf-per-email",
        "de": "https://www.mypdftools.de/pdf-komprimieren-fuer-email"
    }
},

  'pdf-unter-2mb-verkleinern': {
    "slug": "pdf-unter-2mb-verkleinern",
    "toolId": "compress-pdf",
    "lang": "de",
    "domain": "mypdftools.de",
    "h1": "PDF unter 2 MB verkleinern online kostenlos",
    "metaTitle": "PDF unter 2 MB komprimieren — Dateigröße für Portale senken",
    "metaDescription": "Viele behördliche und universitäre Upload-Portale verlangen PDFs unter 2 MB. Komprimieren Sie Ihre Datei zuverlässig unter das Limit.",
    "badge": "< 2 MB",
    "intro": "Erfüllen Sie strikte Dateigrößen-Vorgaben: Passen Sie Ihr PDF an, damit der Upload in Online-Bewerbungen und Portalen reibungslos klappt.",
    "steps": [
        {
            "title": "Schritt 1: PDF laden",
            "desc": "Wählen Sie die Datei über 2 MB."
        },
        {
            "title": "Schritt 2: Optimierung ausführen",
            "desc": "Das Datenvolumen wird drastisch eingedämmt."
        },
        {
            "title": "Schritt 3: Unter 2 MB sichern",
            "desc": "Laden Sie die passende Datei herunter."
        }
    ],
    "faqs": [
        {
            "q": "Sieht man den Unterschied in der Textschärfe?",
            "a": "Nein, Schriften und Texte bleiben glasklar lesbar."
        }
    ],
    "relatedSlugs": [
        "pdf-komprimieren",
        "pdf-fuer-bewerbung-verkleinern",
        "pdf-komprimieren-fuer-email"
    ],
    "canonical": "https://www.mypdftools.de/pdf-unter-2mb-verkleinern",
    "hreflang": {
        "it": "https://www.mypdftools.it/comprimere-pdf-sotto-2mb",
        "de": "https://www.mypdftools.de/pdf-unter-2mb-verkleinern"
    }
},

  'pdf-fuer-bewerbung-verkleinern': {
    "slug": "pdf-fuer-bewerbung-verkleinern",
    "toolId": "compress-pdf",
    "lang": "de",
    "domain": "mypdftools.de",
    "h1": "PDF für Bewerbungsportal verkleinern",
    "metaTitle": "PDF für Bewerbung verkleinern — Zeugnisse & Lebenslauf optimieren",
    "metaDescription": "Optimieren Sie Ihre Bewerbungsunterlagen für Karriereportale. Verkleinern Sie Zeugnisse, Anschreiben und Lebenslauf auf Portallimits.",
    "badge": "Bewerbung",
    "intro": "Verhindern Sie Upload-Abbrüche bei Ihrer Traumstelle: Bringen Sie Ihre Zeugnissammlung auf die vorgeschriebene Dateigröße.",
    "steps": [
        {
            "title": "Schritt 1: Bewerbungsmappe öffnen",
            "desc": "Laden Sie Ihre zusammengestellten Unterlagen hoch."
        },
        {
            "title": "Schritt 2: Komprimieren",
            "desc": "Scans werden auf lesbare 150 DPI optimiert."
        },
        {
            "title": "Schritt 3: Erfolgreich bewerben",
            "desc": "Laden Sie die kompakte Mappe herunter."
        }
    ],
    "faqs": [
        {
            "q": "Bleibt mein Bewerbungsfoto ansehnlich?",
            "a": "Ja, Porträtfotos behalten eine natürliche und saubere Farbdarstellung."
        }
    ],
    "relatedSlugs": [
        "pdf-unter-2mb-verkleinern",
        "pdf-komprimieren",
        "pdf-zusammenfuegen"
    ],
    "canonical": "https://www.mypdftools.de/pdf-fuer-bewerbung-verkleinern",
    "hreflang": {
        "it": "https://www.mypdftools.it/ridurre-pdf-per-concorsi",
        "de": "https://www.mypdftools.de/pdf-fuer-bewerbung-verkleinern"
    }
},

  'pdf-digital-unterschreiben-kostenlos': {
    "slug": "pdf-digital-unterschreiben-kostenlos",
    "toolId": "sign-pdf",
    "lang": "de",
    "domain": "mypdftools.de",
    "h1": "PDF digital unterschreiben online kostenlos",
    "metaTitle": "PDF digital unterschreiben kostenlos — Signatur online erstellen",
    "metaDescription": "Setzen Sie Ihre handschriftliche Unterschrift in PDF-Dokumente ohne Drucker oder Scanner. Schnell, sicher und kostenlos.",
    "badge": "Signatur",
    "intro": "Unterschreiben Sie Verträge, Anträge und Kündigungen direkt am Bildschirm mit der Maus oder dem Finger auf Ihrem Touchscreen.",
    "steps": [
        {
            "title": "Schritt 1: PDF hochladen",
            "desc": "Öffnen Sie das zu unterschreibende Dokument."
        },
        {
            "title": "Schritt 2: Unterschrift zeichnen",
            "desc": "Erstellen Sie Ihre Signatur mit Stift, Finger oder Maus."
        },
        {
            "title": "Schritt 3: Signiertes PDF sichern",
            "desc": "Platzieren Sie die Unterschrift und speichern Sie das Dokument."
        }
    ],
    "faqs": [
        {
            "q": "Wird meine Unterschrift auf Servern gespeichert?",
            "a": "Auf keinen Fall. Die Signatur verbleibt ausschließlich in Ihrem lokalen Browserspeicher."
        }
    ],
    "relatedSlugs": [
        "pdf-unterschreiben",
        "vertrag-pdf-unterschreiben",
        "pdf-bearbeiten"
    ],
    "canonical": "https://www.mypdftools.de/pdf-digital-unterschreiben-kostenlos",
    "hreflang": {
        "it": "https://www.mypdftools.it/firmare-pdf-digitalmente-gratis",
        "de": "https://www.mypdftools.de/pdf-digital-unterschreiben-kostenlos"
    }
},

  'vertrag-pdf-unterschreiben': {
    "slug": "vertrag-pdf-unterschreiben",
    "toolId": "sign-pdf",
    "lang": "de",
    "domain": "mypdftools.de",
    "h1": "Vertrag als PDF unterschreiben online",
    "metaTitle": "Vertrag als PDF unterschreiben — Mietvertrag & Arbeitsvertrag digital signieren",
    "metaDescription": "Signieren Sie Mietverträge, Arbeitsverträge und Vereinbarungen digital ohne Ausdrucken. Maximaler Datenschutz für Ihre Daten.",
    "badge": "Verträge",
    "intro": "Schließen Sie geschäftliche oder private Vereinbarungen zeitsparend ab. Setzen Sie Datum und Unterschrift direkt in das PDF.",
    "steps": [
        {
            "title": "Schritt 1: Vertrag öffnen",
            "desc": "Laden Sie das PDF-Vertragsdokument hoch."
        },
        {
            "title": "Schritt 2: Unterschrift einfügen",
            "desc": "Zeichnen Sie Ihre Signatur auf die Signaturlinie."
        },
        {
            "title": "Schritt 3: Gegenzeichnung versenden",
            "desc": "Speichern Sie das fertige PDF zur Weiterleitung."
        }
    ],
    "faqs": [
        {
            "q": "Gilt die einfache digitale Signatur für Verträge?",
            "a": "Für die allermeisten Verträge des täglichen Lebens (Miete, Dienstleistung, Kauf) ist sie nach EU-Recht vollkommen ausreichend."
        }
    ],
    "relatedSlugs": [
        "pdf-digital-unterschreiben-kostenlos",
        "pdf-unterschreiben",
        "pdf-schuetzen"
    ],
    "canonical": "https://www.mypdftools.de/vertrag-pdf-unterschreiben",
    "hreflang": {
        "it": "https://www.mypdftools.it/firmare-contratto-pdf",
        "de": "https://www.mypdftools.de/vertrag-pdf-unterschreiben"
    }
},

  'scans-in-pdf-umwandeln': {
    "slug": "scans-in-pdf-umwandeln",
    "toolId": "jpg-to-pdf",
    "lang": "de",
    "domain": "mypdftools.de",
    "h1": "Gescannte Dokumente in PDF umwandeln",
    "metaTitle": "Scans in PDF umwandeln kostenlos — Gescannte Seiten verbinden",
    "metaDescription": "Fügen Sie eingescannte Seiten und Rechnungen zu einem einheitlichen, sauberen PDF-Dokument zusammen. Schnell und einfach.",
    "badge": "Scans",
    "intro": "Liegen Ihre Scans als einzelne Bilddateien vor? Bündeln Sie alle Seiten in einer ordentlichen PDF-Datei für Ablage und Versand.",
    "steps": [
        {
            "title": "Schritt 1: Scans hochladen",
            "desc": "Wählen Sie alle Bilddateien aus."
        },
        {
            "title": "Schritt 2: Seitenfolge kontrollieren",
            "desc": "Sortieren Sie die Dokumente chronologisch."
        },
        {
            "title": "Schritt 3: PDF erzeugen",
            "desc": "Laden Sie das fertige Dokument herunter."
        }
    ],
    "faqs": [
        {
            "q": "Kann ich schiefe Scans drehen?",
            "a": "Ja, drehen Sie einzelne Seiten vor dem Erstellen einfach um 90 Grad."
        }
    ],
    "relatedSlugs": [
        "jpg-in-pdf",
        "fotos-in-pdf-umwandeln",
        "pdf-zusammenfuegen"
    ],
    "canonical": "https://www.mypdftools.de/scans-in-pdf-umwandeln",
    "hreflang": {
        "it": "https://www.mypdftools.it/scansioni-in-pdf",
        "de": "https://www.mypdftools.de/scans-in-pdf-umwandeln"
    }
},

  'screenshot-in-pdf-umwandeln': {
    "slug": "screenshot-in-pdf-umwandeln",
    "toolId": "jpg-to-pdf",
    "lang": "de",
    "domain": "mypdftools.de",
    "h1": "Screenshot in PDF umwandeln online",
    "metaTitle": "Screenshot in PDF umwandeln — Bildschirmfotos als PDF speichern",
    "metaDescription": "Wandeln Sie Screenshots von PC oder Smartphone in ein ordentliches PDF-Dokument um. Ideal für Dokumentationen und Nachweise.",
    "badge": "Screenshot",
    "intro": "Fassen Sie mehrere Bildschirmausschnitte in einem einzigen, lesefreundlichen PDF zusammen.",
    "steps": [
        {
            "title": "Schritt 1: Screenshots wählen",
            "desc": "Laden Sie Ihre Bildschirmfotos hoch."
        },
        {
            "title": "Schritt 2: Anordnung festlegen",
            "desc": "Ordnen Sie die Schritte in der richtigen Abfolge."
        },
        {
            "title": "Schritt 3: PDF speichern",
            "desc": "Laden Sie das übersichtliche PDF herunter."
        }
    ],
    "faqs": [
        {
            "q": "Verändert sich die Auflösung der Screenshots?",
            "a": "Nein, Grafiken und Schriften bleiben 1:1 scharf."
        }
    ],
    "relatedSlugs": [
        "jpg-in-pdf",
        "png-in-pdf",
        "pdf-zusammenfuegen"
    ],
    "canonical": "https://www.mypdftools.de/screenshot-in-pdf-umwandeln",
    "hreflang": {
        "it": "https://www.mypdftools.it/screenshot-in-pdf",
        "de": "https://www.mypdftools.de/screenshot-in-pdf-umwandeln"
    }
},

  'belege-in-pdf-umwandeln': {
    "slug": "belege-in-pdf-umwandeln",
    "toolId": "jpg-to-pdf",
    "lang": "de",
    "domain": "mypdftools.de",
    "h1": "Kassenzettel und Belege in PDF umwandeln",
    "metaTitle": "Belege in PDF umwandeln — Quittungen für Spesenabrechnung",
    "metaDescription": "Fotografieren Sie Tankbelege, Bewirtungsquittungen und Fahrkarten und wandeln Sie diese direkt in ein PDF für die Spesenabrechnung um.",
    "badge": "Spesen",
    "intro": "Schluss mit losem Papierkram: Konvertieren Sie Belegfotos sofort in ein sauberes PDF für Arbeitgeber oder Buchhaltung.",
    "steps": [
        {
            "title": "Schritt 1: Fotos der Quittungen hochladen",
            "desc": "Wählen Sie die Aufnahmen aus Ihrer Fotogalerie."
        },
        {
            "title": "Schritt 2: Randbeschnitt anpassen",
            "desc": "Richten Sie die Dokumente ordentlich aus."
        },
        {
            "title": "Schritt 3: Spesen-PDF sichern",
            "desc": "Laden Sie das fertige Dokument herunter."
        }
    ],
    "faqs": [
        {
            "q": "Kann ich mehrere Belege auf einmal umwandeln?",
            "a": "Ja, laden Sie einfach alle Belege gemeinsam hoch."
        }
    ],
    "relatedSlugs": [
        "jpg-in-pdf",
        "rechnungen-pdf-zusammenfuegen",
        "pdf-komprimieren"
    ],
    "canonical": "https://www.mypdftools.de/belege-in-pdf-umwandeln",
    "hreflang": {
        "it": "https://www.mypdftools.it/ricevute-in-pdf",
        "de": "https://www.mypdftools.de/belege-in-pdf-umwandeln"
    }
},

  'ratgeber/pdf-ohne-ausdrucken-unterschreiben': {
    "slug": "ratgeber/pdf-ohne-ausdrucken-unterschreiben",
    "toolId": "sign-pdf",
    "lang": "de",
    "domain": "mypdftools.de",
    "h1": "PDF ohne Ausdrucken unterschreiben — Die Schritt-für-Schritt Anleitung",
    "metaTitle": "PDF ohne Ausdrucken unterschreiben — Papierlos am PC & Smartphone",
    "metaDescription": "So signieren Sie PDF-Dokumente in 60 Sekunden ohne Drucker, Papier oder teure Software. Schnelle Anleitung für jedermann.",
    "badge": "Ratgeber",
    "intro": "Ein Dokument erst auszudrucken, mit Kuli zu unterschreiben und wieder einzuscannen kostet Nerven und Tinte. Mit modernen Browser-Tools signieren Sie direkt am Bildschirm.",
    "steps": [
        {
            "title": "Schritt 1: Signatur-Tool öffnen",
            "desc": "Starten Sie das kostenfreie Unterschriften-Tool in MyPdfTools."
        },
        {
            "title": "Schritt 2: Signatur erstellen",
            "desc": "Zeichnen Sie Ihre Unterschrift bequem per Maus oder Touch."
        },
        {
            "title": "Schritt 3: Platzieren und herunterladen",
            "desc": "Ziehen Sie die Signatur an die passende Stelle und speichern Sie das Dokument."
        }
    ],
    "faqs": [
        {
            "q": "Ist dafür eine spezielle Software erforderlich?",
            "a": "Nein, das funktioniert rein webbasiert in jedem modernen Browser."
        }
    ],
    "relatedSlugs": [
        "pdf-unterschreiben",
        "vertrag-pdf-unterschreiben",
        "pdf-digital-unterschreiben-kostenlos"
    ],
    "canonical": "https://www.mypdftools.de/ratgeber/pdf-ohne-ausdrucken-unterschreiben",
    "hreflang": {
        "it": "https://www.mypdftools.it/guide/come-firmare-un-pdf-senza-stampare",
        "de": "https://www.mypdftools.de/ratgeber/pdf-ohne-ausdrucken-unterschreiben"
    }
},

  'ratgeber/pdf-mit-passwort-schuetzen': {
    "slug": "ratgeber/pdf-mit-passwort-schuetzen",
    "toolId": "protect-pdf",
    "lang": "de",
    "domain": "mypdftools.de",
    "h1": "PDF mit Passwort schützen — So verschlüsseln Sie sensible Dokumente",
    "metaTitle": "PDF mit Passwort schützen — Anleitung zur sicheren Verschlüsselung",
    "metaDescription": "Schützen Sie Gehaltsabrechnungen, Steuerunterlagen und Verträge vor neugierigen Blicken mit 128/256-Bit-Verschlüsselung.",
    "badge": "Ratgeber",
    "intro": "Wer vertrauliche Unterlagen per Mail versendet, sollte diese absichern. Erfahren Sie, wie Sie ein PDF in Sekunden mit einem Passwort sperren.",
    "steps": [
        {
            "title": "Schritt 1: PDF auswählen",
            "desc": "Laden Sie die schützenswerte Datei hoch."
        },
        {
            "title": "Schritt 2: Starkes Kennwort vergeben",
            "desc": "Wählen Sie eine sichere Kombination aus Buchstaben, Zahlen und Sonderzeichen."
        },
        {
            "title": "Schritt 3: Geschütztes PDF herunterladen",
            "desc": "Ab sofort öffnet sich die Datei nur noch nach Passworteingabe."
        }
    ],
    "faqs": [
        {
            "q": "Kann das Passwort zurückgesetzt werden?",
            "a": "Nein, bewahren Sie das Kennwort sicher auf, da die Verschlüsselung mathematisch unumkehrbar ist."
        }
    ],
    "relatedSlugs": [
        "pdf-schuetzen",
        "pdf-entsperren",
        "pdf-schwaerzen"
    ],
    "canonical": "https://www.mypdftools.de/ratgeber/pdf-mit-passwort-schuetzen",
    "hreflang": {
        "it": "https://www.mypdftools.it/guide/come-proteggere-un-pdf-con-password",
        "de": "https://www.mypdftools.de/ratgeber/pdf-mit-passwort-schuetzen"
    }
},

  'ratgeber/einzelne-seiten-aus-pdf-speichern': {
    "slug": "ratgeber/einzelne-seiten-aus-pdf-speichern",
    "toolId": "extract-pages",
    "lang": "de",
    "domain": "mypdftools.de",
    "h1": "Einzelne Seiten aus einem PDF speichern und trennen",
    "metaTitle": "Einzelne Seiten aus PDF speichern — PDF-Seiten extrahieren",
    "metaDescription": "Sie brauchen nur Seite 3 und 5 aus einem 50-seitigen Dokument? So extrahieren Sie gezielt bestimmte Seiten in ein neues PDF.",
    "badge": "Ratgeber",
    "intro": "Große Dokumente lassen sich oft schwer verschicken, wenn der Empfänger nur einen Teilbereich benötigt. Extrahieren Sie mühelos einzelne Seiten.",
    "steps": [
        {
            "title": "Schritt 1: Dokument laden",
            "desc": "Öffnen Sie das PDF im Extrahier-Tool."
        },
        {
            "title": "Schritt 2: Seiten anklicken",
            "desc": "Wählen Sie visuell die Seiten aus, die Sie behalten möchten."
        },
        {
            "title": "Schritt 3: Neues PDF erstellen",
            "desc": "Laden Sie das schlanke PDF herunter."
        }
    ],
    "faqs": [
        {
            "q": "Bleibt das Original-PDF unverändert?",
            "a": "Ja, Ihre Originaldatei auf der Festplatte bleibt vollkommen intakt."
        }
    ],
    "relatedSlugs": [
        "pdf-seiten-extrahieren",
        "pdf-teilen",
        "pdf-seiten-loeschen"
    ],
    "canonical": "https://www.mypdftools.de/ratgeber/einzelne-seiten-aus-pdf-speichern",
    "hreflang": {
        "it": "https://www.mypdftools.it/guide/come-estrarre-pagine-da-un-pdf",
        "de": "https://www.mypdftools.de/ratgeber/einzelne-seiten-aus-pdf-speichern"
    }
},

  'ratgeber/word-in-pdf-umwandeln-kostenlos': {
    "slug": "ratgeber/word-in-pdf-umwandeln-kostenlos",
    "toolId": "word-to-pdf",
    "lang": "de",
    "domain": "mypdftools.de",
    "h1": "Word in PDF umwandeln ohne Microsoft Office",
    "metaTitle": "Word in PDF umwandeln kostenlos — DOCX in PDF ohne Office",
    "metaDescription": "Sie haben kein Word oder Microsoft 365 auf Ihrem Computer installiert? So konvertieren Sie DOCX-Dateien kostenlos und formatgetreu in PDF.",
    "badge": "Ratgeber",
    "intro": "Wer Bewerbungen oder Rechnungen als Word-Datei verschickt, riskiert verrutschte Zeilen beim Empfänger. Erfahren Sie, wie Sie DOCX ohne Office umwandeln.",
    "steps": [
        {
            "title": "Schritt 1: Word-Dokument hochladen",
            "desc": "Laden Sie Ihre .docx- oder .doc-Datei hoch."
        },
        {
            "title": "Schritt 2: Automatische Formatierung",
            "desc": "Schriften und Tabellen werden in das PDF-Format übertragen."
        },
        {
            "title": "Schritt 3: PDF herunterladen",
            "desc": "Speichern Sie das druck- und versandfertige PDF."
        }
    ],
    "faqs": [
        {
            "q": "Verschieben sich Tabellen oder Abbildungen?",
            "a": "Nein, das Seitenlayout bleibt genau so erhalten, wie es im Word-Dokument angelegt wurde."
        }
    ],
    "relatedSlugs": [
        "word-in-pdf",
        "pdf-in-word",
        "excel-in-pdf"
    ],
    "canonical": "https://www.mypdftools.de/ratgeber/word-in-pdf-umwandeln-kostenlos",
    "hreflang": {
        "it": "https://www.mypdftools.it/guide/come-convertire-word-in-pdf-gratis",
        "de": "https://www.mypdftools.de/ratgeber/word-in-pdf-umwandeln-kostenlos"
    }
},

  'ratgeber/pdf-dauerhaft-drehen-und-speichern': {
    "slug": "ratgeber/pdf-dauerhaft-drehen-und-speichern",
    "toolId": "rotate-pdf",
    "lang": "de",
    "domain": "mypdftools.de",
    "h1": "PDF dauerhaft drehen und speichern — Nie wieder kopfüber lesen",
    "metaTitle": "PDF dauerhaft drehen und speichern — Falsch ausgerichtete Seiten korrigieren",
    "metaDescription": "Häufig dreht der PDF-Reader die Seite nur temporär. So speichern Sie die richtige Ausrichtung (90°/180°) permanent ab.",
    "badge": "Ratgeber",
    "intro": "Gescannte Dokumente liegen oft quer oder auf dem Kopf. Mit dieser Kurzanleitung fixieren Sie die richtige Leserichtung ein für alle Mal.",
    "steps": [
        {
            "title": "Schritt 1: PDF öffnen",
            "desc": "Laden Sie das verdrehte Dokument hoch."
        },
        {
            "title": "Schritt 2: Seiten ausrichten",
            "desc": "Drehen Sie einzelne oder alle Seiten mit den Drehpfeilen."
        },
        {
            "title": "Schritt 3: Permanent abspeichern",
            "desc": "Laden Sie das korrigierte PDF herunter — es öffnet sich künftig immer richtig."
        }
    ],
    "faqs": [
        {
            "q": "Kann ich nur Seite 2 drehen und den Rest belassen?",
            "a": "Ja, jede Seite kann individuell im gewünschten Winkel ausgerichtet werden."
        }
    ],
    "relatedSlugs": [
        "pdf-drehen",
        "pdf-organisieren",
        "pdf-seiten-loeschen"
    ],
    "canonical": "https://www.mypdftools.de/ratgeber/pdf-dauerhaft-drehen-und-speichern",
    "hreflang": {
        "it": "https://www.mypdftools.it/guide/come-ruotare-e-salvare-un-pdf",
        "de": "https://www.mypdftools.de/ratgeber/pdf-dauerhaft-drehen-und-speichern"
    }
},
  "merge-pdf": {
    "slug": "merge-pdf",
    "toolId": "merge-pdf",
    "lang": "en",
    "domain": "mypdftools.it",
    "h1": "Merge PDF Online Free — 100% Private (No Uploads)",
    "metaTitle": "Merge PDF Online Free — Combine PDF Files In Your Browser",
    "metaDescription": "Combine multiple PDF files into one in seconds. 100% client-side privacy: your files are processed in browser memory and never uploaded to any server.",
    "badge": "100% Private",
    "intro": "Combine two or more PDF documents into a single organized file in seconds. Built with WebAssembly, MyPdfTools merges contracts, invoices, and reports directly in your browser without uploading your sensitive data to third-party cloud servers.",
    "steps": [
      {
        "title": "1. Select PDF Files",
        "desc": "Drag and drop or browse two or more PDF files from your device."
      },
      {
        "title": "2. Arrange File Order",
        "desc": "Drag files or use arrow buttons to place pages in your desired sequence."
      },
      {
        "title": "3. Merge & Download",
        "desc": "Click \"Merge PDF\" to assemble and download your combined document instantly."
      }
    ],
    "faqs": [
      {
        "q": "Are my PDF documents uploaded to external servers?",
        "a": "No. Processing happens entirely inside your device RAM via WebAssembly. Zero bytes are uploaded to our or any external cloud servers."
      },
      {
        "q": "Is there a limit on file size or number of files?",
        "a": "No artificial server limits. You can combine as many documents as your device memory allows, completely free of charge."
      },
      {
        "q": "Will the text and image quality be preserved?",
        "a": "Yes. Original fonts, vector elements, and image resolutions remain identical without compression or quality degradation."
      }
    ],
    "relatedSlugs": [
      "split-pdf",
      "compress-pdf",
      "organize-pdf",
      "sign-pdf"
    ],
    "canonical": "https://www.mypdftools.it/merge-pdf",
    "hreflang": {
      "it": "https://www.mypdftools.it/unire-pdf",
      "de": "https://www.mypdftools.de/pdf-zusammenfuegen",
      "en": "https://www.mypdftools.it/merge-pdf"
    }
  },
  "combine-pdf": {
    "slug": "combine-pdf",
    "toolId": "merge-pdf",
    "lang": "en",
    "domain": "mypdftools.it",
    "h1": "Combine PDF Files Online Free",
    "metaTitle": "Combine PDF Files Online Free — Fast & Secure PDF Merger",
    "metaDescription": "Combine PDF documents easily and securely in your web browser. Free, unlimited, and 100% private with no server file uploads.",
    "badge": "Zero Upload",
    "intro": "Effortlessly combine multiple PDFs into one unified file. Enjoy instant processing speed and complete data privacy for your confidential legal, financial, and personal records.",
    "steps": [
      {
        "title": "1. Add Documents",
        "desc": "Choose the PDF files you want to combine together."
      },
      {
        "title": "2. Reorder Files",
        "desc": "Organize files into the order you want them to appear."
      },
      {
        "title": "3. Download Combined PDF",
        "desc": "Save your newly combined PDF immediately."
      }
    ],
    "faqs": [
      {
        "q": "Can I combine PDFs on my phone or tablet?",
        "a": "Yes, MyPdfTools works smoothly on iPhones, iPads, Android phones, and all desktop browsers."
      },
      {
        "q": "Do I need to create an account or sign in?",
        "a": "No account, registration, or credit card is ever required."
      }
    ],
    "relatedSlugs": [
      "merge-pdf",
      "split-pdf",
      "compress-pdf"
    ],
    "canonical": "https://www.mypdftools.it/combine-pdf",
    "hreflang": {
      "it": "https://www.mypdftools.it/unire-pdf",
      "de": "https://www.mypdftools.de/pdf-zusammenfuegen",
      "en": "https://www.mypdftools.it/combine-pdf"
    }
  },
  "split-pdf": {
    "slug": "split-pdf",
    "toolId": "split-pdf",
    "lang": "en",
    "domain": "mypdftools.it",
    "h1": "Split PDF Online Free — Extract Pages Instantly",
    "metaTitle": "Split PDF Online Free — Extract Specific PDF Pages",
    "metaDescription": "Split large PDF files into separate pages or extract custom page ranges. Completely free, confidential, and runs offline in browser memory.",
    "badge": "100% Private",
    "intro": "Extract selected pages or split multi-page documents into individual files. Because processing executes locally in your browser, your contracts, bank statements, and sensitive files never leave your computer.",
    "steps": [
      {
        "title": "1. Upload PDF Document",
        "desc": "Select the multi-page PDF you want to split."
      },
      {
        "title": "2. Choose Pages or Ranges",
        "desc": "Select individual pages or specify custom ranges (e.g. 1-3, 5)."
      },
      {
        "title": "3. Extract & Save",
        "desc": "Click \"Split PDF\" to download your extracted documents as a zip file or PDF."
      }
    ],
    "faqs": [
      {
        "q": "Can I extract single pages from a large PDF?",
        "a": "Yes. You can select individual pages or specify precise custom ranges to extract."
      },
      {
        "q": "Does this tool work offline?",
        "a": "Yes! You can disconnect your internet connection or install MyPdfTools as a PWA desktop app."
      }
    ],
    "relatedSlugs": [
      "merge-pdf",
      "delete-pdf-pages",
      "extract-pdf-pages",
      "organize-pdf"
    ],
    "canonical": "https://www.mypdftools.it/split-pdf",
    "hreflang": {
      "it": "https://www.mypdftools.it/dividere-pdf",
      "de": "https://www.mypdftools.de/pdf-teilen",
      "en": "https://www.mypdftools.it/split-pdf"
    }
  },
  "compress-pdf": {
    "slug": "compress-pdf",
    "toolId": "compress-pdf",
    "lang": "en",
    "domain": "mypdftools.it",
    "h1": "Compress PDF Online — Reduce File Size Without Quality Loss",
    "metaTitle": "Compress PDF Online — Reduce PDF File Size Free",
    "metaDescription": "Reduce PDF file size for easy email attachment while maintaining crystal clear text and image quality. 100% browser-based & secure.",
    "badge": "Optimized Speed",
    "intro": "Shrink oversized PDF documents for effortless emailing and web uploading. Our intelligent compression algorithm removes redundant metadata and optimizes embedded images while preserving text sharpness.",
    "steps": [
      {
        "title": "1. Select Large PDF",
        "desc": "Upload the PDF file you need to make smaller."
      },
      {
        "title": "2. Select Compression Level",
        "desc": "Choose standard or maximum compression according to your needs."
      },
      {
        "title": "3. Download Compressed PDF",
        "desc": "Save your lightweight PDF file ready for quick email sending."
      }
    ],
    "faqs": [
      {
        "q": "Will compressing my PDF make text blurry?",
        "a": "No. Text and vector graphics remain razor-sharp; compression intelligently optimizes image resolutions and strips duplicate overhead data."
      },
      {
        "q": "Is there a limit on how many PDFs I can compress?",
        "a": "No limits. Compress as many documents as you need at zero cost."
      }
    ],
    "relatedSlugs": [
      "reduce-pdf-size",
      "merge-pdf",
      "pdf-to-jpg"
    ],
    "canonical": "https://www.mypdftools.it/compress-pdf",
    "hreflang": {
      "it": "https://www.mypdftools.it/comprimere-pdf",
      "de": "https://www.mypdftools.de/pdf-komprimieren",
      "en": "https://www.mypdftools.it/compress-pdf"
    }
  },
  "reduce-pdf-size": {
    "slug": "reduce-pdf-size",
    "toolId": "compress-pdf",
    "lang": "en",
    "domain": "mypdftools.it",
    "h1": "Reduce PDF Size Online Free",
    "metaTitle": "Reduce PDF File Size Online Free — Make PDF Smaller",
    "metaDescription": "Make large PDF files smaller for email attachments and portal uploads. Fast, client-side, and completely free.",
    "badge": "Email Ready",
    "intro": "Quickly shrink heavy PDF files down under upload limits (like 5MB or 10MB) without compromising readability. Done 100% inside your browser memory.",
    "steps": [
      {
        "title": "1. Select File",
        "desc": "Select the file that is currently too large to send."
      },
      {
        "title": "2. Optimize",
        "desc": "Our local compression algorithm strips bloat instantly."
      },
      {
        "title": "3. Save",
        "desc": "Download your optimized file."
      }
    ],
    "faqs": [
      {
        "q": "Is my data safe during compression?",
        "a": "Yes! The compression runs locally on your device CPU. No file data is sent to the internet."
      }
    ],
    "relatedSlugs": [
      "compress-pdf",
      "merge-pdf"
    ],
    "canonical": "https://www.mypdftools.it/reduce-pdf-size",
    "hreflang": {
      "it": "https://www.mypdftools.it/comprimere-pdf",
      "de": "https://www.mypdftools.de/pdf-komprimieren",
      "en": "https://www.mypdftools.it/reduce-pdf-size"
    }
  },
  "jpg-to-pdf": {
    "slug": "jpg-to-pdf",
    "toolId": "jpg-to-pdf",
    "lang": "en",
    "domain": "mypdftools.it",
    "h1": "JPG to PDF Converter Online Free",
    "metaTitle": "JPG to PDF — Convert Images to PDF Online Free",
    "metaDescription": "Convert JPG, PNG, and WebP photos into clean PDF documents in seconds. Adjust orientation and margins. 100% private, zero uploads.",
    "badge": "Instant Converter",
    "intro": "Turn image files, receipts, scanned forms, and photos into a professional, shareable PDF document. Reorder images, customize page orientation (Portrait or Landscape), and set custom margins.",
    "steps": [
      {
        "title": "1. Upload Images",
        "desc": "Select JPG, PNG, or WebP photos from your device."
      },
      {
        "title": "2. Adjust Layout",
        "desc": "Reorder pages, select page orientation, and customize margin spacing."
      },
      {
        "title": "3. Convert to PDF",
        "desc": "Download your newly generated PDF document immediately."
      }
    ],
    "faqs": [
      {
        "q": "Can I convert multiple JPGs into a single PDF document?",
        "a": "Yes. You can add dozens of photos and combine them into one structured PDF."
      },
      {
        "q": "Are PNG and WebP formats supported?",
        "a": "Yes, JPG, JPEG, PNG, and modern WebP formats are all fully supported."
      }
    ],
    "relatedSlugs": [
      "image-to-pdf",
      "pdf-to-jpg",
      "merge-pdf"
    ],
    "canonical": "https://www.mypdftools.it/jpg-to-pdf",
    "hreflang": {
      "it": "https://www.mypdftools.it/da-jpg-a-pdf",
      "de": "https://www.mypdftools.de/jpg-in-pdf",
      "en": "https://www.mypdftools.it/jpg-to-pdf"
    }
  },
  "image-to-pdf": {
    "slug": "image-to-pdf",
    "toolId": "jpg-to-pdf",
    "lang": "en",
    "domain": "mypdftools.it",
    "h1": "Convert Images to PDF Online Free",
    "metaTitle": "Convert Images to PDF Online Free — Photos to PDF",
    "metaDescription": "Combine multiple images (JPG, PNG, WebP) into a single PDF file instantly. Safe, private, and runs entirely in your browser.",
    "badge": "100% Safe",
    "intro": "Transform photos, scanned IDs, and receipts into standardized PDF documents without installing heavy desktop software or uploading sensitive photos to cloud servers.",
    "steps": [
      {
        "title": "1. Pick Images",
        "desc": "Drag and drop your photos into the tool."
      },
      {
        "title": "2. Reorder",
        "desc": "Arrange images in your preferred order."
      },
      {
        "title": "3. Convert",
        "desc": "Save your polished PDF in seconds."
      }
    ],
    "faqs": [
      {
        "q": "Will my pictures stay confidential?",
        "a": "Yes. They are processed entirely in browser RAM and vanish when you close the tab."
      }
    ],
    "relatedSlugs": [
      "jpg-to-pdf",
      "pdf-to-jpg"
    ],
    "canonical": "https://www.mypdftools.it/image-to-pdf",
    "hreflang": {
      "it": "https://www.mypdftools.it/da-jpg-a-pdf",
      "de": "https://www.mypdftools.de/jpg-in-pdf",
      "en": "https://www.mypdftools.it/image-to-pdf"
    }
  },
  "pdf-to-jpg": {
    "slug": "pdf-to-jpg",
    "toolId": "pdf-to-jpg",
    "lang": "en",
    "domain": "mypdftools.it",
    "h1": "Convert PDF to JPG Online Free — High Quality Images",
    "metaTitle": "PDF to JPG — Convert PDF Pages to Images Online",
    "metaDescription": "Convert every PDF page into crisp, high-resolution JPG images in seconds. No email required, 100% private browser rendering.",
    "badge": "High Resolution",
    "intro": "Render and extract every page of your PDF document into crystal-clear JPG image files. Perfect for embedding presentations into slides, sharing on social media, or archiving.",
    "steps": [
      {
        "title": "1. Select PDF File",
        "desc": "Upload the PDF document you wish to turn into images."
      },
      {
        "title": "2. Review Pages",
        "desc": "Preview your pages in real-time."
      },
      {
        "title": "3. Download JPGs",
        "desc": "Download individual page images or all pages packed in a zip file."
      }
    ],
    "faqs": [
      {
        "q": "What is the image output quality?",
        "a": "Pages are rendered at high DPI with sharp text, accurate colors, and crystal-clear graphics."
      },
      {
        "q": "Can I download all pages at once?",
        "a": "Yes, click \"Download All as ZIP\" to get all page images in one organized archive."
      }
    ],
    "relatedSlugs": [
      "jpg-to-pdf",
      "split-pdf",
      "extract-pdf-pages"
    ],
    "canonical": "https://www.mypdftools.it/pdf-to-jpg",
    "hreflang": {
      "it": "https://www.mypdftools.it/da-pdf-a-jpg",
      "de": "https://www.mypdftools.de/pdf-in-jpg",
      "en": "https://www.mypdftools.it/pdf-to-jpg"
    }
  },
  "word-to-pdf": {
    "slug": "word-to-pdf",
    "toolId": "word-to-pdf",
    "lang": "en",
    "domain": "mypdftools.it",
    "h1": "Word to PDF Converter Online Free",
    "metaTitle": "Word to PDF — Convert DOCX & DOC to PDF Online Free",
    "metaDescription": "Convert Microsoft Word documents (DOCX, DOC) to clean PDF format. Retain formatting, fonts, and images. 100% private & secure.",
    "badge": "Office Suite",
    "intro": "Convert Word DOC and DOCX files into universal, tamper-resistant PDF documents. Ensure your resumes, proposals, and contracts look identical on every screen and device.",
    "steps": [
      {
        "title": "1. Upload Word Document",
        "desc": "Select your DOC or DOCX file."
      },
      {
        "title": "2. Automatic Conversion",
        "desc": "Formatting and typography are translated into PDF layout."
      },
      {
        "title": "3. Download PDF",
        "desc": "Save your ready-to-share PDF document."
      }
    ],
    "faqs": [
      {
        "q": "Will my formatting and typography change?",
        "a": "No, margins, tables, headings, and images are accurately preserved."
      },
      {
        "q": "Is it free?",
        "a": "Yes, completely free with no registration or subscriptions."
      }
    ],
    "relatedSlugs": [
      "pdf-to-word",
      "excel-to-pdf",
      "powerpoint-to-pdf"
    ],
    "canonical": "https://www.mypdftools.it/word-to-pdf",
    "hreflang": {
      "it": "https://www.mypdftools.it/da-word-a-pdf",
      "de": "https://www.mypdftools.de/word-in-pdf",
      "en": "https://www.mypdftools.it/word-to-pdf"
    }
  },
  "pdf-to-word": {
    "slug": "pdf-to-word",
    "toolId": "pdf-to-word",
    "lang": "en",
    "domain": "mypdftools.it",
    "h1": "PDF to Word Converter Online Free — Editable DOCX",
    "metaTitle": "PDF to Word — Convert PDF to Editable DOCX Online",
    "metaDescription": "Convert PDF files into editable Microsoft Word DOCX documents with intact text and layouts. Free, fast, and 100% private.",
    "badge": "Editable DOCX",
    "intro": "Turn static PDF documents back into fully editable Microsoft Word (DOCX) files. Update text, adjust formatting, and copy tables effortlessly.",
    "steps": [
      {
        "title": "1. Choose PDF",
        "desc": "Select the PDF file you need to edit."
      },
      {
        "title": "2. Process",
        "desc": "Content and paragraphs are extracted into Word structure."
      },
      {
        "title": "3. Download Word Doc",
        "desc": "Open and edit the converted DOCX file in Microsoft Word or Google Docs."
      }
    ],
    "faqs": [
      {
        "q": "Can I edit the converted file in Microsoft Word or Google Docs?",
        "a": "Yes, the output is a standard DOCX file compatible with Word, LibreOffice, and Google Docs."
      }
    ],
    "relatedSlugs": [
      "word-to-pdf",
      "pdf-to-excel",
      "pdf-to-markdown"
    ],
    "canonical": "https://www.mypdftools.it/pdf-to-word",
    "hreflang": {
      "it": "https://www.mypdftools.it/da-pdf-a-word",
      "de": "https://www.mypdftools.de/pdf-in-word",
      "en": "https://www.mypdftools.it/pdf-to-word"
    }
  },
  "sign-pdf": {
    "slug": "sign-pdf",
    "toolId": "sign-pdf",
    "lang": "en",
    "domain": "mypdftools.it",
    "h1": "Sign PDF Online Free — Draw, Type, or Upload Signature",
    "metaTitle": "Sign PDF Online Free — Easy Digital Signature Tool",
    "metaDescription": "Sign contracts, NDAs, and agreements directly in your browser. Draw your signature or upload an image. 100% private, files never uploaded.",
    "badge": "Legally Compliant",
    "intro": "Sign agreements, freelance contracts, and tax documents in seconds without printing, scanning, or paying for expensive DocuSign licenses. Draw your signature on touchscreen or mouse, position it precisely on any page, and download the signed PDF immediately.",
    "steps": [
      {
        "title": "1. Open Document",
        "desc": "Upload the contract or PDF agreement you need to sign."
      },
      {
        "title": "2. Create Your Signature",
        "desc": "Draw your signature with mouse/touch or upload a scanned signature image."
      },
      {
        "title": "3. Place & Save",
        "desc": "Position and resize your signature on the signature line and download the signed document."
      }
    ],
    "faqs": [
      {
        "q": "Are my confidential contracts uploaded to cloud servers?",
        "a": "Never. The signature is rendered locally directly onto the PDF canvas in browser memory. Zero third-party exposure."
      },
      {
        "q": "Can I add multiple signatures or date stamps?",
        "a": "Yes, you can place signatures, initials, dates, and text notes on any page."
      }
    ],
    "relatedSlugs": [
      "protect-pdf",
      "merge-pdf",
      "edit-pdf"
    ],
    "canonical": "https://www.mypdftools.it/sign-pdf",
    "hreflang": {
      "it": "https://www.mypdftools.it/firmare-pdf",
      "de": "https://www.mypdftools.de/pdf-unterschreiben",
      "en": "https://www.mypdftools.it/sign-pdf"
    }
  },
  "edit-pdf": {
    "slug": "edit-pdf",
    "toolId": "edit-pdf",
    "lang": "en",
    "domain": "mypdftools.it",
    "h1": "Edit PDF Online Free in Your Browser",
    "metaTitle": "Edit PDF Online Free — Add Text, Annotate & Draw",
    "metaDescription": "Edit PDF documents directly in your web browser. Add text, shapes, notes, and annotations without installing software. 100% free & private.",
    "badge": "Full Suite",
    "intro": "Add text annotations, highlight important clauses, draw shapes, and fill out forms directly in your browser. Fast, intuitive, and respects your document confidentiality.",
    "steps": [
      {
        "title": "1. Open PDF",
        "desc": "Select the PDF file you want to annotate or edit."
      },
      {
        "title": "2. Make Edits",
        "desc": "Use the toolbar to add text, insert shapes, or draw."
      },
      {
        "title": "3. Save Document",
        "desc": "Export your edited PDF file instantly."
      }
    ],
    "faqs": [
      {
        "q": "Do I need Adobe Acrobat to edit PDFs?",
        "a": "No, MyPdfTools provides essential annotation, signing, and editing tools right in your web browser for free."
      }
    ],
    "relatedSlugs": [
      "sign-pdf",
      "organize-pdf",
      "watermark-pdf"
    ],
    "canonical": "https://www.mypdftools.it/edit-pdf",
    "hreflang": {
      "it": "https://www.mypdftools.it/modificare-pdf",
      "de": "https://www.mypdftools.de/pdf-bearbeiten",
      "en": "https://www.mypdftools.it/edit-pdf"
    }
  },
  "rotate-pdf": {
    "slug": "rotate-pdf",
    "toolId": "rotate-pdf",
    "lang": "en",
    "domain": "mypdftools.it",
    "h1": "Rotate PDF Online & Save Permanently",
    "metaTitle": "Rotate PDF Online — Permanently Rotate & Save PDF Pages",
    "metaDescription": "Rotate upside-down or sideways PDF pages 90, 180, or 270 degrees and save them permanently. Free, fast, and 100% private.",
    "badge": "Permanent Save",
    "intro": "Fix upside-down scans and sideways pages once and for all. Rotate specific pages or all pages at once (90°, 180°, 270°) and save the orientation permanently so it opens properly in every PDF viewer.",
    "steps": [
      {
        "title": "1. Select PDF",
        "desc": "Upload the document with misoriented pages."
      },
      {
        "title": "2. Rotate Pages",
        "desc": "Click rotation icons on individual thumbnails or rotate all pages at once."
      },
      {
        "title": "3. Save Permanently",
        "desc": "Download your correctly oriented PDF file."
      }
    ],
    "faqs": [
      {
        "q": "Will the rotation remain permanent when I email the file?",
        "a": "Yes! Unlike temporary PDF readers, MyPdfTools rewrites the page rotation metadata permanently."
      }
    ],
    "relatedSlugs": [
      "organize-pdf",
      "delete-pdf-pages",
      "split-pdf"
    ],
    "canonical": "https://www.mypdftools.it/rotate-pdf",
    "hreflang": {
      "it": "https://www.mypdftools.it/ruotare-pdf",
      "de": "https://www.mypdftools.de/pdf-drehen",
      "en": "https://www.mypdftools.it/rotate-pdf"
    }
  },
  "organize-pdf": {
    "slug": "organize-pdf",
    "toolId": "organize-pdf",
    "lang": "en",
    "domain": "mypdftools.it",
    "h1": "Organize PDF Pages Online — Reorder, Rotate & Delete",
    "metaTitle": "Organize PDF Pages — Drag, Reorder & Delete Pages Free",
    "metaDescription": "Rearrange PDF page order, delete unwanted pages, and rotate orientation with an intuitive visual thumbnail organizer. 100% private.",
    "badge": "Visual Grid",
    "intro": "Take full control of multi-page documents. Drag and drop visual page thumbnails to reorder them, delete unwanted blank pages, and rotate misaligned sheets with a single click.",
    "steps": [
      {
        "title": "1. Load Document",
        "desc": "Select your PDF to see all page thumbnails."
      },
      {
        "title": "2. Rearrange & Clean",
        "desc": "Drag pages into order, delete unnecessary pages, or rotate."
      },
      {
        "title": "3. Download Reorganized PDF",
        "desc": "Export your clean, structured PDF document."
      }
    ],
    "faqs": [
      {
        "q": "Can I remove blank pages from scanned PDFs?",
        "a": "Yes, simply hover over any page thumbnail and click the trash can icon to delete it."
      }
    ],
    "relatedSlugs": [
      "delete-pdf-pages",
      "rotate-pdf",
      "split-pdf"
    ],
    "canonical": "https://www.mypdftools.it/organize-pdf",
    "hreflang": {
      "it": "https://www.mypdftools.it/organizzare-pdf",
      "de": "https://www.mypdftools.de/pdf-organisieren",
      "en": "https://www.mypdftools.it/organize-pdf"
    }
  },
  "delete-pdf-pages": {
    "slug": "delete-pdf-pages",
    "toolId": "delete-pages",
    "lang": "en",
    "domain": "mypdftools.it",
    "h1": "Delete Pages from PDF Online Free",
    "metaTitle": "Delete PDF Pages Online Free — Remove Unwanted Pages",
    "metaDescription": "Remove unnecessary pages from your PDF file in seconds. Simple visual selection, completely free, and 100% private.",
    "badge": "Quick Cleanup",
    "intro": "Quickly remove sensitive pages, blank sheets, or outdated sections from any PDF document. Free and instant with zero server file storage.",
    "steps": [
      {
        "title": "1. Upload PDF",
        "desc": "Select the document containing pages you want to remove."
      },
      {
        "title": "2. Select Pages to Delete",
        "desc": "Click on the pages you want to discard."
      },
      {
        "title": "3. Save Cleaned PDF",
        "desc": "Download your streamlined PDF file."
      }
    ],
    "faqs": [
      {
        "q": "Can I delete multiple pages at once?",
        "a": "Yes, select all the pages you wish to eliminate and click delete."
      }
    ],
    "relatedSlugs": [
      "organize-pdf",
      "split-pdf",
      "extract-pdf-pages"
    ],
    "canonical": "https://www.mypdftools.it/delete-pdf-pages",
    "hreflang": {
      "it": "https://www.mypdftools.it/eliminare-pagine-pdf",
      "de": "https://www.mypdftools.de/pdf-seiten-loeschen",
      "en": "https://www.mypdftools.it/delete-pdf-pages"
    }
  },
  "protect-pdf": {
    "slug": "protect-pdf",
    "toolId": "protect-pdf",
    "lang": "en",
    "domain": "mypdftools.it",
    "h1": "Password Protect PDF Online — 256-Bit AES Encryption",
    "metaTitle": "Password Protect PDF Online — Free & Secure Encryption",
    "metaDescription": "Secure your confidential PDF files with military-grade 256-bit AES encryption. Set custom open passwords directly in your browser.",
    "badge": "Bank-Grade Security",
    "intro": "Keep confidential tax returns, employee salaries, and sensitive legal agreements protected from unauthorized eyes. Encrypt your document with strong passwords right inside your browser before emailing it.",
    "steps": [
      {
        "title": "1. Choose PDF",
        "desc": "Select the confidential document you want to secure."
      },
      {
        "title": "2. Enter Password",
        "desc": "Type and confirm a strong access password."
      },
      {
        "title": "3. Encrypt & Save",
        "desc": "Download your encrypted PDF file immediately."
      }
    ],
    "faqs": [
      {
        "q": "Do you store or see my password?",
        "a": "Never. Encryption occurs locally in your browser RAM using cryptographic libraries. We never see your password or document."
      },
      {
        "q": "Will the recipient need special software to open it?",
        "a": "No, any standard PDF viewer (Acrobat, Chrome, Apple Preview) will prompt for the password."
      }
    ],
    "relatedSlugs": [
      "unlock-pdf",
      "sign-pdf",
      "watermark-pdf"
    ],
    "canonical": "https://www.mypdftools.it/protect-pdf",
    "hreflang": {
      "it": "https://www.mypdftools.it/proteggere-pdf",
      "de": "https://www.mypdftools.de/pdf-schuetzen",
      "en": "https://www.mypdftools.it/protect-pdf"
    }
  },
  "unlock-pdf": {
    "slug": "unlock-pdf",
    "toolId": "unlock-pdf",
    "lang": "en",
    "domain": "mypdftools.it",
    "h1": "Unlock Password Protected PDF Online",
    "metaTitle": "Unlock PDF — Remove PDF Password Online Free",
    "metaDescription": "Remove password protection from your PDF files once and for all. Fast, client-side, and 100% private.",
    "badge": "Instant Decryption",
    "intro": "Remove password prompts from your own documents so you can read, print, and share them without having to type the password every time.",
    "steps": [
      {
        "title": "1. Select Locked PDF",
        "desc": "Upload the encrypted document."
      },
      {
        "title": "2. Enter Known Password",
        "desc": "Type the password once to authorize decryption."
      },
      {
        "title": "3. Download Unlocked PDF",
        "desc": "Save the unlocked document with password restrictions removed."
      }
    ],
    "faqs": [
      {
        "q": "Can I unlock a PDF without knowing the password?",
        "a": "No, you must know the correct password to decrypt standard encrypted PDFs."
      }
    ],
    "relatedSlugs": [
      "protect-pdf",
      "sign-pdf"
    ],
    "canonical": "https://www.mypdftools.it/unlock-pdf",
    "hreflang": {
      "it": "https://www.mypdftools.it/sbloccare-pdf",
      "de": "https://www.mypdftools.de/pdf-entsperren",
      "en": "https://www.mypdftools.it/unlock-pdf"
    }
  },
  "watermark-pdf": {
    "slug": "watermark-pdf",
    "toolId": "watermark",
    "lang": "en",
    "domain": "mypdftools.it",
    "h1": "Add Watermark to PDF Online Free",
    "metaTitle": "Add Watermark to PDF Online Free — Text & Stamp Watermarks",
    "metaDescription": "Apply custom text watermarks (\"CONFIDENTIAL\", \"DRAFT\", \"COPY\") or image stamps to PDF documents in seconds. 100% private.",
    "badge": "Brand Protection",
    "intro": "Protect your intellectual property and mark confidential files. Add custom text watermarks like \"CONFIDENTIAL\", \"DRAFT\", or custom logos with adjustable transparency, position, and font size.",
    "steps": [
      {
        "title": "1. Select File",
        "desc": "Upload the PDF document you want to stamp."
      },
      {
        "title": "2. Customize Watermark",
        "desc": "Type your text, adjust opacity, angle, and position."
      },
      {
        "title": "3. Apply & Download",
        "desc": "Save your watermarked PDF immediately."
      }
    ],
    "faqs": [
      {
        "q": "Can I change the transparency of the watermark?",
        "a": "Yes, you can adjust opacity so underlying document text remains completely legible."
      }
    ],
    "relatedSlugs": [
      "sign-pdf",
      "protect-pdf",
      "add-page-numbers-to-pdf"
    ],
    "canonical": "https://www.mypdftools.it/watermark-pdf",
    "hreflang": {
      "it": "https://www.mypdftools.it/filigrana-pdf",
      "de": "https://www.mypdftools.de/pdf-wasserzeichen",
      "en": "https://www.mypdftools.it/watermark-pdf"
    }
  },
  "add-page-numbers-to-pdf": {
    "slug": "add-page-numbers-to-pdf",
    "toolId": "page-numbers",
    "lang": "en",
    "domain": "mypdftools.it",
    "h1": "Add Page Numbers to PDF Online Free",
    "metaTitle": "Add Page Numbers to PDF Online Free — Number PDF Pages",
    "metaDescription": "Insert page numbers into PDF documents easily. Choose font style, format (Page X of Y), and positioning (header/footer). 100% private.",
    "badge": "Custom Layout",
    "intro": "Number multi-page reports, legal briefs, and contracts. Customize page number format (\"1\", \"Page 1 of 10\"), font size, alignment, and select whether to number the cover page.",
    "steps": [
      {
        "title": "1. Choose PDF",
        "desc": "Select the document you need to number."
      },
      {
        "title": "2. Select Position & Style",
        "desc": "Pick header or footer position, alignment, and formatting style."
      },
      {
        "title": "3. Save Numbered PDF",
        "desc": "Download your numbered document instantly."
      }
    ],
    "faqs": [
      {
        "q": "Can I skip numbering on the first page/cover sheet?",
        "a": "Yes, you can easily exclude the first page from numbering."
      }
    ],
    "relatedSlugs": [
      "organize-pdf",
      "merge-pdf",
      "watermark-pdf"
    ],
    "canonical": "https://www.mypdftools.it/add-page-numbers-to-pdf",
    "hreflang": {
      "it": "https://www.mypdftools.it/numeri-di-pagina-pdf",
      "de": "https://www.mypdftools.de/pdf-seitenzahlen",
      "en": "https://www.mypdftools.it/add-page-numbers-to-pdf"
    }
  },
  "pdf-to-markdown": {
    "slug": "pdf-to-markdown",
    "toolId": "pdf-to-markdown",
    "lang": "en",
    "domain": "mypdftools.it",
    "h1": "Convert PDF to Markdown Online Free — Perfect for LLMs & Notes",
    "metaTitle": "PDF to Markdown Converter — Extract Clean Markdown (.md)",
    "metaDescription": "Extract text, headings, and lists from PDF files into clean Markdown format. Ideal for Obsidian, Notion, ChatGPT, and Claude prompts.",
    "badge": "AI & Developer Ready",
    "intro": "Turn complex PDF documents into clean, structured Markdown (.md) text. Perfect for copying into ChatGPT, Claude, Obsidian, Notion, and developer documentation workflows.",
    "steps": [
      {
        "title": "1. Select PDF",
        "desc": "Upload the PDF document you want to transcribe."
      },
      {
        "title": "2. Automatic Parsing",
        "desc": "Our engine identifies headings, bullet points, and code blocks."
      },
      {
        "title": "3. Copy or Download .md",
        "desc": "Download your .md file or copy markdown straight to clipboard."
      }
    ],
    "faqs": [
      {
        "q": "Can I paste the output directly into AI tools like ChatGPT or Claude?",
        "a": "Yes! Markdown is the preferred input format for all major LLMs."
      }
    ],
    "relatedSlugs": [
      "pdf-to-word",
      "pdf-to-jpg"
    ],
    "canonical": "https://www.mypdftools.it/pdf-to-markdown",
    "hreflang": {
      "it": "https://www.mypdftools.it/da-pdf-a-markdown",
      "de": "https://www.mypdftools.de/pdf-in-markdown",
      "en": "https://www.mypdftools.it/pdf-to-markdown"
    }
  },
  "how-to-merge-pdf-files": {
    "slug": "how-to-merge-pdf-files",
    "toolId": "merge-pdf",
    "lang": "en",
    "domain": "mypdftools.it",
    "h1": "How to Merge PDF Files on Windows, Mac, and Mobile",
    "metaTitle": "How to Merge PDF Files Free — Step-by-Step Guide",
    "metaDescription": "Learn how to combine multiple PDF files into one document for free without uploading files to third-party cloud servers.",
    "badge": "Tutorial Guide",
    "intro": "Need to combine multiple PDF documents into one single file? This step-by-step guide explains how to merge PDFs instantly right inside your browser without paying for expensive software.",
    "steps": [
      {
        "title": "Step 1: Open MyPdfTools Merge Tool",
        "desc": "Navigate to the free Merge PDF tool."
      },
      {
        "title": "Step 2: Upload and Arrange Documents",
        "desc": "Add all files and arrange them in the sequence you need."
      },
      {
        "title": "Step 3: Click Merge and Download",
        "desc": "Save your unified PDF document in seconds."
      }
    ],
    "faqs": [
      {
        "q": "Is it safe to merge confidential documents with this guide?",
        "a": "Yes. MyPdfTools works locally in browser memory so your files are never exposed to remote servers."
      }
    ],
    "relatedSlugs": [
      "merge-pdf",
      "combine-pdf",
      "how-to-compress-pdf-without-losing-quality"
    ],
    "canonical": "https://www.mypdftools.it/how-to-merge-pdf-files",
    "hreflang": {
      "it": "https://www.mypdftools.it/guide/come-unire-due-pdf-gratis",
      "de": "https://www.mypdftools.de/ratgeber/pdf-dateien-kostenlos-zusammenfuegen",
      "en": "https://www.mypdftools.it/how-to-merge-pdf-files"
    }
  },
  "how-to-compress-pdf-without-losing-quality": {
    "slug": "how-to-compress-pdf-without-losing-quality",
    "toolId": "compress-pdf",
    "lang": "en",
    "domain": "mypdftools.it",
    "h1": "How to Compress a PDF Without Losing Quality",
    "metaTitle": "How to Compress PDF Without Losing Quality — Guide",
    "metaDescription": "Step-by-step guide to shrinking PDF file sizes under email limits while keeping text and graphics crisp and readable.",
    "badge": "Tutorial Guide",
    "intro": "Large PDF attachments often bounce when emailed. Learn how to reduce your PDF file size safely without making text blurry or losing image quality.",
    "steps": [
      {
        "title": "Step 1: Choose Your Large File",
        "desc": "Select the oversized PDF document."
      },
      {
        "title": "Step 2: Optimize Automatically",
        "desc": "Our engine strips redundant metadata and compresses high-res image bloat."
      },
      {
        "title": "Step 3: Send With Ease",
        "desc": "Download your optimized file, now ready for any email client."
      }
    ],
    "faqs": [
      {
        "q": "Why do PDFs get so large in the first place?",
        "a": "High-resolution image scans, embedded font files, and duplicate metadata often inflate PDFs to 20MB+."
      }
    ],
    "relatedSlugs": [
      "compress-pdf",
      "reduce-pdf-size",
      "how-to-merge-pdf-files"
    ],
    "canonical": "https://www.mypdftools.it/how-to-compress-pdf-without-losing-quality",
    "hreflang": {
      "it": "https://www.mypdftools.it/guide/come-comprimere-pdf-senza-perdere-qualita",
      "de": "https://www.mypdftools.de/ratgeber/pdf-verkleinern-ohne-qualitaetsverlust",
      "en": "https://www.mypdftools.it/how-to-compress-pdf-without-losing-quality"
    }
  },
  "how-to-sign-a-pdf-document-online": {
    "slug": "how-to-sign-a-pdf-document-online",
    "toolId": "sign-pdf",
    "lang": "en",
    "domain": "mypdftools.it",
    "h1": "How to Sign a PDF Document Online for Free",
    "metaTitle": "How to Sign a PDF Online for Free — Quick Guide",
    "metaDescription": "Learn how to sign contracts, agreements, and forms electronically without printing or scanning.",
    "badge": "Tutorial Guide",
    "intro": "Printing, signing with a pen, and scanning documents is slow and outdated. Learn how to add a clean digital signature to any PDF document in under 60 seconds.",
    "steps": [
      {
        "title": "Step 1: Open Your PDF Agreement",
        "desc": "Open the document in the Sign PDF tool."
      },
      {
        "title": "Step 2: Draw or Upload Your Signature",
        "desc": "Sign with your finger on a smartphone/trackpad or draw with your mouse."
      },
      {
        "title": "Step 3: Place and Export",
        "desc": "Drop your signature onto the signature line and download the signed contract."
      }
    ],
    "faqs": [
      {
        "q": "Is an electronic signature legally valid?",
        "a": "In most jurisdictions (including the US E-SIGN Act and EU eIDAS), electronic signatures on commercial contracts and agreements are recognized."
      }
    ],
    "relatedSlugs": [
      "sign-pdf",
      "protect-pdf",
      "how-to-merge-pdf-files"
    ],
    "canonical": "https://www.mypdftools.it/how-to-sign-a-pdf-document-online",
    "hreflang": {
      "it": "https://www.mypdftools.it/guide/come-firmare-un-pdf-online-gratis",
      "de": "https://www.mypdftools.de/ratgeber/pdf-digital-unterschreiben-anleitung",
      "en": "https://www.mypdftools.it/how-to-sign-a-pdf-document-online"
    }
  }

};


export const TOOL_TO_PRIMARY_SLUG: Record<string, { it: string; de: string; en?: string }> = {
  'jpg-to-pdf': { it: 'da-jpg-a-pdf', de: 'jpg-in-pdf', en: 'jpg-to-pdf' },
  'pdf-to-jpg': { it: 'da-pdf-a-jpg', de: 'pdf-in-jpg', en: 'pdf-to-jpg' },
  'word-to-pdf': { it: 'da-word-a-pdf', de: 'word-in-pdf', en: 'word-to-pdf' },
  'pdf-to-word': { it: 'da-pdf-a-word', de: 'pdf-in-word', en: 'pdf-to-word' },
  'excel-to-pdf': { it: 'da-excel-a-pdf', de: 'excel-in-pdf', en: 'excel-to-pdf' },
  'pdf-to-excel': { it: 'da-pdf-a-excel', de: 'pdf-in-excel', en: 'pdf-to-excel' },
  'powerpoint-to-pdf': { it: 'da-powerpoint-a-pdf', de: 'powerpoint-in-pdf', en: 'powerpoint-to-pdf' },
  'pdf-to-powerpoint': { it: 'da-pdf-a-powerpoint', de: 'pdf-in-powerpoint', en: 'pdf-to-powerpoint' },
  'merge-pdf': { it: 'unire-pdf', de: 'pdf-zusammenfuegen', en: 'merge-pdf' },
  'split-pdf': { it: 'dividere-pdf', de: 'pdf-teilen', en: 'split-pdf' },
  'compress-pdf': { it: 'comprimere-pdf', de: 'pdf-komprimieren', en: 'compress-pdf' },
  'sign-pdf': { it: 'firmare-pdf', de: 'pdf-unterschreiben', en: 'sign-pdf' },
  'edit-pdf': { it: 'modificare-pdf', de: 'pdf-bearbeiten', en: 'edit-pdf' },
  'rotate-pdf': { it: 'ruotare-pdf', de: 'pdf-drehen', en: 'rotate-pdf' },
  'organize-pdf': { it: 'organizzare-pdf', de: 'pdf-organisieren', en: 'organize-pdf' },
  'delete-pages': { it: 'eliminare-pagine-pdf', de: 'pdf-seiten-loeschen', en: 'delete-pdf-pages' },
  'extract-pages': { it: 'estrarre-pagine-pdf', de: 'pdf-seiten-extrahieren', en: 'extract-pdf-pages' },
  'protect-pdf': { it: 'proteggere-pdf', de: 'pdf-schuetzen', en: 'protect-pdf' },
  'unlock-pdf': { it: 'sbloccare-pdf', de: 'pdf-entsperren', en: 'unlock-pdf' },
  'watermark': { it: 'filigrana-pdf', de: 'pdf-wasserzeichen', en: 'watermark-pdf' },
  'page-numbers': { it: 'numeri-di-pagina-pdf', de: 'pdf-seitenzahlen', en: 'add-page-numbers-to-pdf' },
  'pdf-to-markdown': { it: 'da-pdf-a-markdown', de: 'pdf-in-markdown', en: 'pdf-to-markdown' },
};

export const getSeoRoute = (path: string): SeoRouteData | undefined => {
  const clean = path.replace(/^\/+/, '').replace(/\/+$/, '').replace(/^#\/?/, '');
  return SEO_ROUTES[clean];
};

