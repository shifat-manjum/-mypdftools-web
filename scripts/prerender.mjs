// scripts/prerender.mjs
import fs from 'fs';
import path from 'path';
import ts from 'typescript';

function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function generateHomepageHtml({ tools, translations, toolToSlug }) {
  const t = translations;

  const toolCardsHtml = tools.map((tool) => {
    const localized = t.tools?.[tool.id];
    const title = localized?.title || tool.title;
    const desc = localized?.description || tool.description;
    const slug = toolToSlug?.[tool.id]?.it || tool.id;
    const href = slug.startsWith('/') ? slug : `/${slug}`;

    return `
      <div class="min-h-[220px]">
        <a href="${href}" class="group relative bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/90 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.07),0_4px_10px_-2px_rgba(0,0,0,0.04)] hover:shadow-[0_25px_50px_-12px_rgba(16,185,129,0.22),0_15px_30px_-8px_rgba(0,0,0,0.12)] hover:-translate-y-2 hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between text-left h-full ring-1 ring-slate-900/5 hover:ring-emerald-500/20 block cursor-pointer">
          <div>
            <div class="flex items-start justify-between mb-4">
              <div class="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-sm ${tool.iconBg || 'bg-emerald-50 text-emerald-600'}">
                <span class="font-black text-base">${escapeHtml(tool.title.slice(0, 2).toUpperCase())}</span>
              </div>
              ${tool.badge ? `<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 border border-emerald-200 uppercase tracking-wide shadow-2xs">${escapeHtml(tool.badge)}</span>` : ''}
            </div>
            <h2 class="text-lg font-black text-slate-900 group-hover:text-emerald-600 transition-colors leading-snug tracking-tight">
              ${escapeHtml(title)}
            </h2>
            <p class="mt-2.5 text-[13px] text-slate-500 line-clamp-3 leading-relaxed font-normal">
              ${escapeHtml(desc)}
            </p>
          </div>
          <div class="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
            <span class="text-[11px] font-bold text-emerald-600">100% Client-Side</span>
            <span class="text-xs font-black text-emerald-600 group-hover:translate-x-1 transition-transform">&rarr;</span>
          </div>
        </a>
      </div>`;
  }).join('\n');

  return `
    <div class="min-h-screen flex flex-col bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9]/70 to-[#ecfdf5]/30">
      <!-- Static Prerendered Semantic Navigation -->
      <header class="w-full bg-white/95 backdrop-blur-md border-b border-slate-200 py-3.5 px-4 sm:px-6 sticky top-0 z-40">
        <div class="max-w-[1650px] mx-auto flex items-center justify-between">
          <a href="/" class="flex items-center gap-2.5 text-slate-900 font-black text-xl">
            <span class="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center font-black shadow-md shadow-emerald-500/20">P</span>
            <span class="tracking-tight">MyPdf<span class="text-emerald-600">Tools</span></span>
          </a>
          <nav class="hidden md:flex items-center gap-2" aria-label="Main Navigation">
            <a href="/unire-pdf" class="text-xs font-bold text-slate-700 hover:text-emerald-600 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors">Unisci PDF</a>
            <a href="/dividere-pdf" class="text-xs font-bold text-slate-700 hover:text-emerald-600 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors">Dividi PDF</a>
            <a href="/comprimere-pdf" class="text-xs font-bold text-slate-700 hover:text-emerald-600 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors">Comprimi PDF</a>
            <a href="/da-jpg-a-pdf" class="text-xs font-bold text-slate-700 hover:text-emerald-600 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors">Da JPG a PDF</a>
            <a href="/da-word-a-pdf" class="text-xs font-bold text-slate-700 hover:text-emerald-600 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors">Da Word a PDF</a>
          </nav>
          <div class="flex items-center gap-3">
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black">
              <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>100% Privato</span>
            </span>
          </div>
        </div>
      </header>

      <!-- Hero Section -->
      <main class="flex-1 w-full pb-16">
        <section class="pt-12 pb-10 text-center px-4 max-w-5xl mx-auto">
          <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-emerald-200/80 text-emerald-800 text-xs font-black mb-5 shadow-xs">
            <span class="flex h-2 w-2 relative">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Zero Upload sui Server • Elaborazione 100% Privata nel Browser</span>
          </div>

          <h1 class="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Tutti gli strumenti per i tuoi PDF.{' '}
            <span class="bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 bg-clip-text text-transparent block sm:inline">
              Completamente Privato.
            </span>
          </h1>

          <p class="mt-4 text-sm sm:text-base md:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium">
            Unisci, dividi, comprimi, converti, firma e organizza i tuoi PDF senza mai inviare i tuoi file riservati su Internet. 100% Gratuito, conforme al GDPR e sicuro.
          </p>

          <div class="mt-7 flex flex-wrap items-center justify-center gap-3">
            <a href="#trust-guarantee" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white/90 hover:bg-white text-slate-800 text-xs font-black border border-slate-200/90 shadow-sm transition-all">
              <span>Vedi la Garanzia di Privacy</span>
            </a>
            <span class="text-xs text-slate-400 font-medium hidden sm:inline">&bull;</span>
            <div class="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 bg-white/60 px-3 py-1.5 rounded-full border border-slate-200/50">
              <span>Funziona offline senza connessione internet</span>
            </div>
          </div>
        </section>

        <!-- Category Navigation & Filter Bar -->
        <div id="tools-catalog" class="max-w-[1650px] mx-auto px-4 sm:px-6 lg:px-10 mb-8 scroll-mt-24">
          <div class="flex flex-wrap items-center justify-between gap-4 bg-white/80 backdrop-blur-md p-3 rounded-2xl border border-slate-200/80 shadow-xs">
            <div class="flex flex-wrap items-center gap-1.5">
              <span class="px-4 py-2 rounded-xl text-xs font-black bg-emerald-600 text-white shadow-sm cursor-pointer">Tutti</span>
              <a href="/unire-pdf" class="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-emerald-600 hover:bg-slate-100 transition-colors">Organizza</a>
              <a href="/comprimere-pdf" class="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-emerald-600 hover:bg-slate-100 transition-colors">Ottimizza</a>
              <a href="/da-jpg-a-pdf" class="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-emerald-600 hover:bg-slate-100 transition-colors">Converti</a>
              <a href="/modificare-pdf" class="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-emerald-600 hover:bg-slate-100 transition-colors">Modifica</a>
              <a href="/proteggere-pdf" class="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-emerald-600 hover:bg-slate-100 transition-colors">Sicurezza</a>
            </div>
            <div class="text-xs text-slate-500 font-bold px-3">
              ${tools.length} Strumenti PDF Disponibili
            </div>
          </div>
        </div>

        <!-- Pre-rendered Tools Grid -->
        <section class="max-w-[1650px] mx-auto px-4 sm:px-6 lg:px-10">
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 sm:gap-6">
            ${toolCardsHtml}

            <!-- Create a workflow Card -->
            <div class="bg-gradient-to-br from-white/90 via-emerald-50/50 to-teal-50/70 backdrop-blur-md rounded-2xl p-6 border border-emerald-200/80 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.07)] hover:shadow-[0_20px_40px_-10px_rgba(16,185,129,0.2)] hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between text-left group ring-1 ring-emerald-500/10 min-h-[220px]">
              <div>
                <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white mb-4 shadow-sm font-black text-lg">
                  ⚡
                </div>
                <h2 class="text-lg font-black text-slate-900 leading-snug">
                  Crea un flusso di lavoro
                </h2>
                <p class="mt-2.5 text-[13px] text-slate-600 leading-relaxed font-medium">
                  Concatena più strumenti (ad es. Unisci &rarr; Comprimi) in un unico passaggio super rapido.
                </p>
              </div>
              <a href="/unire-pdf" class="mt-5 inline-flex items-center gap-1.5 text-xs font-black text-emerald-700 group-hover:text-emerald-900 transition-colors">
                <span>Inizia Subito</span>
                <span>&rarr;</span>
              </a>
            </div>
          </div>
        </section>

        <!-- Privacy & Trust Proof Section -->
        <section id="trust-guarantee" class="max-w-[1500px] mx-auto mt-16 px-4 sm:px-6 lg:px-10">
          <div class="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white rounded-3xl p-8 sm:p-12 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] border border-slate-700/60 ring-1 ring-white/10 relative overflow-hidden">
            <div class="max-w-2xl mx-auto text-center space-y-3 relative z-10">
              <div class="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-black shadow-xs">
                <span>100% Privacy &amp; Sicurezza</span>
              </div>
              <h2 class="text-2xl sm:text-3xl font-black text-white tracking-tight">
                I tuoi file rimangono tuoi al 100%. Senza eccezioni.
              </h2>
              <p class="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                A differenza di altri servizi online, noi non carichiamo i tuoi file su nessun server. L'elaborazione avviene direttamente nella memoria del tuo browser.
              </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 text-center relative z-10">
              <div class="p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md">
                <h3 class="text-sm font-black text-white mb-2">Zero Upload sui Server</h3>
                <p class="text-xs text-slate-300 font-medium leading-relaxed">I file non lasciano mai il tuo dispositivo. Nessun rischio di fuga di dati riservati.</p>
              </div>
              <div class="p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md">
                <h3 class="text-sm font-black text-white mb-2">Velocità Istantanea</h3>
                <p class="text-xs text-slate-300 font-medium leading-relaxed">Nessuna attesa di upload o download. Le operazioni avvengono alla massima velocità del tuo hardware.</p>
              </div>
              <div class="p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md">
                <h3 class="text-sm font-black text-white mb-2">Funziona Offline</h3>
                <p class="text-xs text-slate-300 font-medium leading-relaxed">Una volta caricata la pagina, puoi disconnetterti da internet e continuare a usare tutti gli strumenti.</p>
              </div>
            </div>
          </div>
        </section>

        <!-- In-Depth Editorial Articles & Publisher Content (Required for Google AdSense Quality Compliance) -->
        <section class="max-w-[1500px] mx-auto mt-20 px-4 sm:px-6 lg:px-10 space-y-16">
          <div class="text-center max-w-3xl mx-auto space-y-3">
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-black uppercase tracking-wider">
              Guide Editoriali &amp; Standard di Settore
            </span>
            <h2 class="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Tutto Quello che Devi Sapere sulla Gestione Sicura dei Documenti PDF
            </h2>
            <p class="text-sm text-slate-600 font-medium">
              Approfondimenti tecnici curati dal team di MyPdfTools sulla conformità normativa GDPR, l'architettura WebAssembly client-side e le migliori pratiche di ottimizzazione documentale.
            </p>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Article 1 -->
            <article class="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow space-y-4 text-left">
              <div class="flex items-center gap-2 text-xs font-black text-emerald-600 uppercase tracking-wide">
                <span>Normativa &amp; Privacy</span>
                <span>&bull;</span>
                <span>Tempo di lettura: 4 min</span>
              </div>
              <h3 class="text-xl font-black text-slate-900 leading-snug">
                La Sicurezza nei Documenti PDF: Riservatezza dei Dati e Conformità GDPR per Imprese e Professionisti
              </h3>
              <div class="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-3 font-normal">
                <p>
                  Nel contesto lavorativo moderno, i file PDF rappresentano il formato universale per contratti commerciali, dichiarazioni fiscali (come il Modello 730 o Unico), buste paga, cartelle cliniche e documenti d'identità. Tuttavia, la maggior parte degli utenti ignora che utilizzare i tradizionali convertitori PDF gratuiti online comporta il caricamento di questi file altamente riservati su server cloud remoti, spesso situati al di fuori dell'Unione Europea.
                </p>
                <p>
                  Secondo l'<strong>Articolo 32 del Regolamento Generale sulla Protezione dei Dati (GDPR UE 2016/679)</strong>, il titolare del trattamento è obbligato a mettere in atto misure tecniche e organizzative adeguate per garantire un livello di sicurezza commisurato al rischio. L'invio non autorizzato di documenti aziendali o personali a server terzi sconosciuti costituisce una potenziale violazione dei dati (data breach) con sanzioni rilevanti.
                </p>
                <p>
                  <strong>MyPdfTools adotta il principio del «Privacy by Design» (Art. 25 GDPR)</strong>: i file non vengono mai inviati a nessun server. L'elaborazione avviene interamente sul dispositivo locale dell'utente, eliminando alla radice ogni rischio di intercettazione, archiviazione non autorizzata o accesso illecito da parte di terzi.
                </p>
              </div>
            </article>

            <!-- Article 2 -->
            <article class="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow space-y-4 text-left">
              <div class="flex items-center gap-2 text-xs font-black text-emerald-600 uppercase tracking-wide">
                <span>Architettura Web</span>
                <span>&bull;</span>
                <span>Tempo di lettura: 3 min</span>
              </div>
              <h3 class="text-xl font-black text-slate-900 leading-snug">
                Architettura 100% Client-Side nel Browser: Come WebAssembly e HTML5 Proteggono i Tuoi File
              </h3>
              <div class="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-3 font-normal">
                <p>
                  Per anni, le operazioni avanzate su file PDF (come l'unione di documenti multipagina, la compressione degli stream di oggetti o la rasterizzazione di immagini ad alta risoluzione) hanno richiesto potenti librerie software eseguite su server dedicati (ad esempio basati su Ghostscript o Poppler). Questo modello tradizionale imponeva agli utenti di attendere lenti tempi di upload e download.
                </p>
                <p>
                  Con l'avvento di <strong>WebAssembly (Wasm)</strong> e delle moderne API HTML5 Canvas, i browser moderni (Chrome, Safari, Firefox, Edge) sono ora in grado di eseguire codice compilato ad altissime prestazioni direttamente all'interno della sandbox protetta del client.
                </p>
                <p>
                  Quando selezioni uno strumento su MyPdfTools, il motore di elaborazione legge i byte del documento direttamente dalla memoria RAM del tuo dispositivo. I calcoli matematici, la ricomposizione delle tabelle dei riferimenti incrociati (xref) e la compressione Flate avvengono istantaneamente a livello locale. Puoi persino disattivare la connessione Wi-Fi o mettere il computer in modalità aereo: MyPdfTools continuerà a elaborare i tuoi documenti senza alcuna interruzione.
                </p>
              </div>
            </article>

            <!-- Article 3 -->
            <article class="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow space-y-4 text-left">
              <div class="flex items-center gap-2 text-xs font-black text-emerald-600 uppercase tracking-wide">
                <span>Ottimizzazione &amp; PEC</span>
                <span>&bull;</span>
                <span>Tempo di lettura: 4 min</span>
              </div>
              <h3 class="text-xl font-black text-slate-900 leading-snug">
                Guida alla Compressione Intelligente: Ridurre le Dimensioni dei PDF Senza Perdere Qualità
              </h3>
              <div class="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-3 font-normal">
                <p>
                  In Italia e in Germania, l'invio telematico di atti giudiziari (Processo Civile Telematico - PCT), fatture elettroniche, bandi di gara pubblici o allegati via Posta Elettronica Certificata (PEC) impone rigidi limiti di peso (spesso compresi tra 30 MB e 50 MB per messaggio). Documenti scansionati con risoluzioni eccessive o contenenti metadati ridondanti rischiano di bloccare la trasmissione.
                </p>
                <p>
                  Una compressione PDF efficace richiede un equilibrio perfetto tra due tecniche:
                </p>
                <ul class="list-disc pl-5 space-y-1">
                  <li><strong>Ottimizzazione Lossless dei Flussi:</strong> Rimozione di metadati inutilizzati (come cronologia di revisione, anteprime incorporate obsolete e formati XML duplicati) e ricompressione delle tabelle vettoriali mantenendo il testo nitido al 100%.</li>
                  <li><strong>Ricampionamento Intelligente delle Immagini:</strong> Regolazione della densità di pixel (DPI) delle immagini raster incorporate a 150-200 DPI, ideale per la lettura su schermo e la stampa nitida da ufficio.</li>
                </ul>
                <p>
                  Utilizzando lo strumento di compressione locale di MyPdfTools, puoi ridurre drasticamente le dimensioni dei tuoi PDF nel rispetto dei requisiti di conformità tecnica degli enti pubblici e dei gestori PEC.
                </p>
              </div>
            </article>

            <!-- Article 4 -->
            <article class="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow space-y-4 text-left">
              <div class="flex items-center gap-2 text-xs font-black text-emerald-600 uppercase tracking-wide">
                <span>Standard Documentali</span>
                <span>&bull;</span>
                <span>Tempo di lettura: 3 min</span>
              </div>
              <h3 class="text-xl font-black text-slate-900 leading-snug">
                Conversione Documentale ad Alta Fedeltà: Da Immagini (JPG, PNG) e Office a PDF Standard
              </h3>
              <div class="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-3 font-normal">
                <p>
                  La conservazione documentale a lungo termine richiede formati stabili, conformi alle specifiche internazionali ISO. Convertire fotografie scattate da smartphone o ricevute scannerizzate in formato PDF non deve comportare distorsioni delle proporzioni né perdita di leggibilità dei caratteri tipografici.
                </p>
                <p>
                  Il convertitore da <em>JPG a PDF</em> di MyPdfTools calcola automaticamente le proporzioni native di ciascuna immagine, consentendo all'utente di scegliere tra l'adattamento ai formati standard (come l'A4 internazionale con margini di sicurezza) o il mantenimento della risoluzione originale dell'immagine.
                </p>
                <p>
                  Inoltre, la conversione da formati Office garantisce che font, impaginazione e interlinea vengano preservati fedelmente, producendo documenti pronti per la condivisione istituzionale, la firma con Carta d'Identità Elettronica (CIE/SPID) o l'archiviazione notarile.
                </p>
              </div>
            </article>
          </div>
        </section>

        <!-- FAQ Section (Essential for Search Quality & AdSense Value) -->
        <section class="max-w-[1500px] mx-auto mt-20 px-4 sm:px-6 lg:px-10 space-y-8">
          <div class="text-center max-w-2xl mx-auto space-y-2">
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase">
              Risposte Immediate
            </span>
            <h2 class="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Domande Frequenti su MyPdfTools
            </h2>
            <p class="text-xs sm:text-sm text-slate-500 font-medium">
              Tutto quello che c'è da sapere sulla sicurezza, i costi e il funzionamento della nostra piattaforma.
            </p>
          </div>

          <div class="max-w-4xl mx-auto space-y-4">
            <details class="bg-white rounded-2xl border border-slate-200/90 p-5 group shadow-xs">
              <summary class="font-bold text-slate-900 cursor-pointer text-sm sm:text-base flex items-center justify-between">
                <span>I miei file PDF o le mie informazioni personali vengono caricati su Internet?</span>
                <span class="text-emerald-600 text-lg group-open:rotate-180 transition-transform">&darr;</span>
              </summary>
              <p class="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal pt-3 border-t border-slate-100">
                Assolutamente no. A differenza di quasi tutti gli altri servizi concorrenti, MyPdfTools opera al 100% all'interno del tuo browser web tramite codice WebAssembly locale. Nessun file, immagine o dato confidenziale lascia mai la memoria RAM del tuo dispositivo.
              </p>
            </details>

            <details class="bg-white rounded-2xl border border-slate-200/90 p-5 group shadow-xs">
              <summary class="font-bold text-slate-900 cursor-pointer text-sm sm:text-base flex items-center justify-between">
                <span>Il servizio è completamente gratuito? Ci sono costi nascosti o abbonamenti?</span>
                <span class="text-emerald-600 text-lg group-open:rotate-180 transition-transform">&darr;</span>
              </summary>
              <p class="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal pt-3 border-t border-slate-100">
                MyPdfTools è gratuito al 100%. Non richiediamo registrazioni, carte di credito, né limitiamo il numero di file o pagine che puoi convertire. La piattaforma è supportata da annunci pubblicitari non invasivi e trasparenti.
              </p>
            </details>

            <details class="bg-white rounded-2xl border border-slate-200/90 p-5 group shadow-xs">
              <summary class="font-bold text-slate-900 cursor-pointer text-sm sm:text-base flex items-center justify-between">
                <span>Posso usare MyPdfTools per documenti legali, sanitari o fiscali riservati?</span>
                <span class="text-emerald-600 text-lg group-open:rotate-180 transition-transform">&darr;</span>
              </summary>
              <p class="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal pt-3 border-t border-slate-100">
                Sì, è proprio per questo scopo che MyPdfTools è stato creato. Poiché nessun file viene inviato sui server, professionisti come commercialisti, medici, avvocati e consulenti possono elaborare documenti contenenti dati sensibili in piena conformità con il GDPR (UE 2016/679).
              </p>
            </details>

            <details class="bg-white rounded-2xl border border-slate-200/90 p-5 group shadow-xs">
              <summary class="font-bold text-slate-900 cursor-pointer text-sm sm:text-base flex items-center justify-between">
                <span>Come posso verificare che la piattaforma funzioni davvero senza connessione?</span>
                <span class="text-emerald-600 text-lg group-open:rotate-180 transition-transform">&darr;</span>
              </summary>
              <p class="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal pt-3 border-t border-slate-100">
                Fai questa semplice prova: apri una pagina qualsiasi (ad esempio <a href="/unire-pdf" class="text-emerald-600 font-bold underline">Unisci PDF</a>), disconnetti il Wi-Fi o stacca il cavo di rete del computer, e trascina i tuoi file. Vedrai che l'operazione verrà completata all'istante anche da offline!
              </p>
            </details>

            <details class="bg-white rounded-2xl border border-slate-200/90 p-5 group shadow-xs">
              <summary class="font-bold text-slate-900 cursor-pointer text-sm sm:text-base flex items-center justify-between">
                <span>Come unire più file PDF in un unico documento?</span>
                <span class="text-emerald-600 text-lg group-open:rotate-180 transition-transform">&darr;</span>
              </summary>
              <p class="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal pt-3 border-t border-slate-100">
                Accedi allo strumento <a href="/unire-pdf" class="text-emerald-600 font-bold underline">Unisci PDF</a>, trascina i tuoi documenti nell'area di rilascio, ordina le pagine trascinando le miniature nella sequenza preferita e fai clic su "Unisci PDF". Il nuovo documento verrà generato e scaricato all'istante.
              </p>
            </details>

            <details class="bg-white rounded-2xl border border-slate-200/90 p-5 group shadow-xs">
              <summary class="font-bold text-slate-900 cursor-pointer text-sm sm:text-base flex items-center justify-between">
                <span>Esiste un limite alla dimensione massima dei file caricabili?</span>
                <span class="text-emerald-600 text-lg group-open:rotate-180 transition-transform">&darr;</span>
              </summary>
              <p class="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal pt-3 border-t border-slate-100">
                Non c'è alcun limite artificiale imposto da noi. L'unico limite è dato dalla memoria RAM disponibile sul tuo computer o smartphone, il che consente di elaborare anche file di centinaia di megabyte senza blocchi.
              </p>
            </details>

            <details class="bg-white rounded-2xl border border-slate-200/90 p-5 group shadow-xs">
              <summary class="font-bold text-slate-900 cursor-pointer text-sm sm:text-base flex items-center justify-between">
                <span>Chi sviluppa e gestisce la piattaforma MyPdfTools?</span>
                <span class="text-emerald-600 text-lg group-open:rotate-180 transition-transform">&darr;</span>
              </summary>
              <p class="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal pt-3 border-t border-slate-100">
                La piattaforma è fondata e attivamente curata da <strong>Shifat Manjum</strong> (fondatore di Zentixx). Puoi trovare maggiori dettagli nella pagina <a href="/chi-siamo" class="text-emerald-600 font-bold underline">Chi Siamo</a> o scriverci direttamente tramite la pagina <a href="/contatti" class="text-emerald-600 font-bold underline">Contatti</a>.
              </p>
            </details>

            <details class="bg-white rounded-2xl border border-slate-200/90 p-5 group shadow-xs">
              <summary class="font-bold text-slate-900 cursor-pointer text-sm sm:text-base flex items-center justify-between">
                <span>Come vengono trattati i cookie e i dati pubblicitari su questo sito?</span>
                <span class="text-emerald-600 text-lg group-open:rotate-180 transition-transform">&darr;</span>
              </summary>
              <p class="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal pt-3 border-t border-slate-100">
                Non utilizziamo cookie di profilazione proprietari. Per sostenere i costi di sviluppo e hosting, ospitiamo annunci pubblicitari tramite Google AdSense, che potrebbe utilizzare cookie tecnici o pubblicitari conformi alle normative europee. Per ogni dettaglio o per gestire le preferenze, consulta la nostra <a href="/cookie-policy" class="text-emerald-600 font-bold underline">Cookie Policy</a> e l'<a href="/privacy-policy" class="text-emerald-600 font-bold underline">Informativa sulla Privacy</a>.
              </p>
            </details>
          </div>
        </section>
      </main>

      <!-- Static Prerendered Footer with Crawlable Links -->
      <footer class="bg-white/95 backdrop-blur-xl border-t border-slate-200/90 py-12 text-center text-xs text-slate-500">
        <div class="max-w-[1650px] mx-auto px-4 sm:px-6 lg:px-10 space-y-8">
          <div class="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <a href="/" class="flex items-center gap-2.5 text-slate-900 font-black text-lg">
              <span class="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center font-black">P</span>
              <span>MyPdf<span class="text-emerald-600">Tools</span></span>
            </a>
            <div class="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs font-bold text-slate-700">
              <a href="/unire-pdf" class="hover:text-emerald-600 transition-colors">Unisci PDF</a>
              <a href="/dividere-pdf" class="hover:text-emerald-600 transition-colors">Dividi PDF</a>
              <a href="/comprimere-pdf" class="hover:text-emerald-600 transition-colors">Comprimi PDF</a>
              <a href="/da-jpg-a-pdf" class="hover:text-emerald-600 transition-colors">JPG in PDF</a>
              <a href="/da-word-a-pdf" class="hover:text-emerald-600 transition-colors">Word in PDF</a>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p class="text-xs text-slate-500 font-medium">
              &copy; ${new Date().getFullYear()} MyPdfTools (mypdftools.it &bull; mypdftools.de). Piattaforma gratuita per l'elaborazione di documenti PDF 100% in locale.
            </p>
            <div class="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-700">
              <a href="/privacy-policy" class="hover:text-emerald-600">Privacy Policy</a>
              <a href="/terms-of-service" class="hover:text-emerald-600">Termini di Servizio</a>
              <a href="/cookie-policy" class="hover:text-emerald-600">Cookie Policy</a>
              <a href="/chi-siamo" class="hover:text-emerald-600 font-bold">Chi Siamo</a>
              <a href="/contatti" class="hover:text-emerald-600 font-bold">Contatti</a>
              <a href="mailto:khshifat@gmail.com" class="hover:text-emerald-600 font-bold">khshifat@gmail.com</a>
            </div>
          </div>
        </div>
      </footer>
    </div>`;
}

function generateCompliancePageHtml({ type, lang, canonical, alternateIt, alternateDe, alternateEn, baseHtml }) {
  const isIt = lang === 'it';
  const isDe = lang === 'de';

  let title = '';
  let metaDesc = '';
  let h1 = '';
  let breadcrumbTitle = '';
  let contentHtml = '';

  if (type === 'privacy') {
    title = isIt
      ? 'Informativa sulla Privacy (GDPR UE 2016/679) — MyPdfTools'
      : isDe
      ? 'Datenschutzerklärung (EU-DSGVO) — MyPdfTools'
      : 'Privacy Policy (EU GDPR 2016/679) — MyPdfTools';
    metaDesc = isIt
      ? 'Informativa privacy di MyPdfTools. Elaborazione documenti 100% client-side nel browser. Zero salvataggio su server, conformità GDPR UE 2016/679.'
      : isDe
      ? 'Datenschutzerklärung von MyPdfTools. 100% lokale Verarbeitung im Browser. Keine Server-Uploads, vollständige DSGVO-Konformität.'
      : 'Privacy Policy of MyPdfTools. 100% client-side processing in your browser. Zero server uploads, full EU GDPR compliance.';
    h1 = isIt ? 'Informativa sulla Privacy' : isDe ? 'Datenschutzerklärung' : 'Privacy Policy';
    breadcrumbTitle = h1;

    contentHtml = `
      <div class="space-y-6 text-sm text-slate-700 leading-relaxed font-normal">
        <div class="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-900 font-medium">
          <strong>${isIt ? 'Garanzia di Riservatezza Assoluta:' : isDe ? 'Garantierte Privatsphäre:' : 'Absolute Privacy Guarantee:'}</strong>
          ${isIt
            ? 'MyPdfTools non carica né memorizza alcun documento sui propri server. Tutte le conversioni e modifiche avvengono all\'interno della memoria RAM del tuo browser tramite WebAssembly.'
            : isDe
            ? 'MyPdfTools lädt keine Dokumente auf externe Server hoch. Alle Berechnungen erfolgen ausschließlich im lokalen Arbeitsspeicher Ihres Browsers.'
            : 'MyPdfTools never uploads or stores your documents on any server. All processing takes place entirely within your browser\'s local RAM.'}
        </div>

        <section class="space-y-3">
          <h2 class="text-lg font-black text-slate-900">${isIt ? '1. Titolare del Trattamento dei Dati' : isDe ? '1. Verantwortlicher für die Datenverarbeitung' : '1. Data Controller'}</h2>
          <p>
            ${isIt
              ? 'Il Titolare del trattamento per la piattaforma MyPdfTools (mypdftools.it e mypdftools.de) è <strong>Shifat Manjum</strong> (fondatore di Zentixx). Per qualsiasi richiesta o informazione relativa alla privacy, è possibile inviare un\'email diretta a: <a href="mailto:khshifat@gmail.com" class="text-emerald-600 font-bold underline">khshifat@gmail.com</a>.'
              : isDe
              ? 'Verantwortlicher für MyPdfTools (mypdftools.de und mypdftools.it) ist <strong>Shifat Manjum</strong> (Gründer von Zentixx). Kontakt per E-Mail: <a href="mailto:khshifat@gmail.com" class="text-emerald-600 font-bold underline">khshifat@gmail.com</a>.'
              : 'The Data Controller for MyPdfTools (mypdftools.it & mypdftools.de) is <strong>Shifat Manjum</strong> (founder of Zentixx). Official contact email: <a href="mailto:khshifat@gmail.com" class="text-emerald-600 font-bold underline">khshifat@gmail.com</a>.'}
          </p>
        </section>

        <section class="space-y-3">
          <h2 class="text-lg font-black text-slate-900">${isIt ? '2. Architettura Zero-Upload e Dati Documentali' : isDe ? '2. Zero-Upload Architektur & Dokumentdaten' : '2. Zero-Upload Architecture & Document Data'}</h2>
          <p>
            ${isIt
              ? 'I file PDF, immagini o documenti di testo selezionati dall\'utente vengono letti unicamente dalla memoria locale del browser web tramite HTML5 File API e WebAssembly. Nessun payload contenente i tuoi file viene trasmesso attraverso la rete Internet verso server proprietari o di terze parti.'
              : isDe
              ? 'Ausgewählte PDF-Dateien und Bilder werden ausschließlich über moderne HTML5 File APIs und WebAssembly lokal verarbeitet. Es erfolgt zu keinem Zeitpunkt eine Übertragung Ihrer Dokumente über das Internet.'
              : 'User selected PDF files and documents are processed entirely inside the browser using HTML5 File APIs and WebAssembly. No file content is ever transmitted across the internet to any server.'}
          </p>
        </section>

        <section class="space-y-3">
          <h2 class="text-lg font-black text-slate-900">${isIt ? '3. Partner Pubblicitari e Cookie di Terze Parti (Google AdSense)' : isDe ? '3. Werbepartner & Drittanbieter-Cookies (Google AdSense)' : '3. Advertising Partners & Third-Party Cookies (Google AdSense)'}</h2>
          <p>
            ${isIt
              ? 'Per mantenere il servizio completamente gratuito, questo sito web collabora con Google LLC (Google AdSense) per mostrare annunci pubblicitari. I fornitori terzi, tra cui Google, utilizzano cookie per pubblicare annunci in base alle precedenti visite dell\'utente su questo o su altri siti web. L\'utilizzo dei cookie per la pubblicità consente a Google e ai suoi partner di pubblicare annunci pertinenti.'
              : isDe
              ? 'Zur Finanzierung des kostenlosen Angebots nutzt diese Website Google AdSense. Google und Drittanbieter verwenden Cookies, um Anzeigen basierend auf früheren Besuchen der Nutzer zu schalten.'
              : 'To keep this service 100% free, we partner with Google LLC (Google AdSense) to serve advertisements. Google uses cookies to serve ads based on prior visits to this website or other sites.'}
          </p>
          <p>
            ${isIt
              ? 'Gli utenti possono disattivare la pubblicità personalizzata consultando le <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" class="text-emerald-600 font-bold underline">Impostazioni annunci di Google</a> o visitando il portale <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer" class="text-emerald-600 font-bold underline">www.aboutads.info</a>.'
              : isDe
              ? 'Nutzer können personalisierte Werbung in den <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" class="text-emerald-600 font-bold underline">Google-Anzeigeneinstellungen</a> oder über <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer" class="text-emerald-600 font-bold underline">www.aboutads.info</a> deaktivieren.'
              : 'Users may opt out of personalized advertising by visiting <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" class="text-emerald-600 font-bold underline">Google Ads Settings</a> or <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer" class="text-emerald-600 font-bold underline">www.aboutads.info</a>.'}
          </p>
        </section>

        <section class="space-y-3">
          <h2 class="text-lg font-black text-slate-900">${isIt ? '4. Diritti dell\'Interessato (GDPR Artt. 15-22)' : isDe ? '4. Ihre Rechte nach DSGVO (Art. 15-22)' : '4. User Rights under EU GDPR (Art. 15-22)'}</h2>
          <p>
            ${isIt
              ? 'Gli utenti residenti nello Spazio Economico Europeo godono dei diritti di accesso, rettifica, cancellazione (diritto all\'oblio), limitazione e opposizione al trattamento. Per esercitare tali diritti, contattare: <a href="mailto:khshifat@gmail.com" class="text-emerald-600 font-bold underline">khshifat@gmail.com</a>.'
              : isDe
              ? 'Nutzer in der EU haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Datenverarbeitung. Kontaktieren Sie dazu: <a href="mailto:khshifat@gmail.com" class="text-emerald-600 font-bold underline">khshifat@gmail.com</a>.'
              : 'Users in the European Economic Area have the right to access, rectify, delete, and restrict the processing of their data. Inquiries can be sent to: <a href="mailto:khshifat@gmail.com" class="text-emerald-600 font-bold underline">khshifat@gmail.com</a>.'}
          </p>
        </section>
      </div>`;
  } else if (type === 'terms') {
    title = isIt
      ? 'Termini e Condizioni di Utilizzo — MyPdfTools'
      : isDe
      ? 'Nutzungsbedingungen (AGB) — MyPdfTools'
      : 'Terms and Conditions of Service — MyPdfTools';
    metaDesc = isIt
      ? 'Termini e condizioni di utilizzo della suite MyPdfTools. Licenza d\'uso gratuita, proprietà intellettuale protetta e limitazioni di responsabilità.'
      : isDe
      ? 'Allgemeine Nutzungsbedingungen von MyPdfTools. Kostenlose Nutzungslizenz, Urheberrecht und Haftungsausschluss.'
      : 'Terms and conditions of service for MyPdfTools. Free usage license, intellectual property, and liability limitations.';
    h1 = isIt ? 'Termini di Servizio' : isDe ? 'Nutzungsbedingungen' : 'Terms of Service';
    breadcrumbTitle = h1;

    contentHtml = `
      <div class="space-y-6 text-sm text-slate-700 leading-relaxed font-normal">
        <section class="space-y-3">
          <h2 class="text-lg font-black text-slate-900">${isIt ? '1. Oggetto e Ambito di Applicazione' : isDe ? '1. Gegenstand und Geltungsbereich' : '1. Scope of Service'}</h2>
          <p>
            ${isIt
              ? 'I presenti Termini regolano l\'utilizzo della piattaforma web MyPdfTools accessibile agli indirizzi www.mypdftools.it e www.mypdftools.de. Utilizzando gli strumenti disponibili, l\'utente accetta integralmente i presenti termini.'
              : isDe
              ? 'Diese Bedingungen regeln die Nutzung der Plattform MyPdfTools unter www.mypdftools.de und www.mypdftools.it. Durch die Nutzung der Dienste erklären Sie sich mit diesen Bedingungen einverstanden.'
              : 'These Terms govern the use of the MyPdfTools web platform accessible via www.mypdftools.it and www.mypdftools.de. By accessing the site, you agree to these Terms.'}
          </p>
        </section>

        <section class="space-y-3">
          <h2 class="text-lg font-black text-slate-900">${isIt ? '2. Proprietà Intellettuale sui File' : isDe ? '2. Geistiges Eigentum an Ihren Dateien' : '2. Intellectual Property Rights'}</h2>
          <p>
            ${isIt
              ? 'L\'utente mantiene la piena ed esclusiva proprietà di tutti i documenti elaborati tramite MyPdfTools. La piattaforma non rivendica alcun diritto, licenza o proprietà intellettuale sui contenuti elaborati, né salva copie degli stessi.'
              : isDe
              ? 'Sie behalten alle Rechte an Ihren verarbeiteten Dokumenten. MyPdfTools beansprucht keinerlei Eigentums- oder Nutzungsrechte an Ihren Dateien.'
              : 'You retain 100% full and exclusive ownership of all documents processed with MyPdfTools. We claim zero rights or ownership over your content.'}
          </p>
        </section>

        <section class="space-y-3">
          <h2 class="text-lg font-black text-slate-900">${isIt ? '3. Limitazione di Responsabilità' : isDe ? '3. Haftungsausschluss' : '3. Limitation of Liability'}</h2>
          <p>
            ${isIt
              ? 'Il servizio viene offerto "così com\'è" a titolo gratuito. Sebbene il software sia stato ampiamente testato per garantire la massima accuratezza e integrità dei file, MyPdfTools non risponde di eventuali perdite di dati o danni derivanti da un utilizzo improprio.'
              : isDe
              ? 'Die Plattform wird kostenlos und ohne Gewährleistung bereitgestellt. Wir haften nicht für Datenverluste, die durch unsachgemäße Bedienung entstehen.'
              : 'The service is provided free of charge on an "as is" basis. MyPdfTools shall not be liable for any direct or indirect loss resulting from software use.'}
          </p>
        </section>
      </div>`;
  } else if (type === 'cookies') {
    title = isIt
      ? 'Informativa Estesa sui Cookie — MyPdfTools'
      : isDe
      ? 'Cookie-Richtlinie — MyPdfTools'
      : 'Cookie Policy — MyPdfTools';
    metaDesc = isIt
      ? 'Informativa sui cookie di MyPdfTools. Uso del LocalStorage tecnico, gestione dei cookie pubblicitari Google AdSense e modalità di disattivazione.'
      : isDe
      ? 'Cookie-Richtlinie von MyPdfTools. Informationen zu lokalem Speicher und Werbe-Cookies von Drittanbietern.'
      : 'Cookie policy for MyPdfTools. Explains local storage usage, advertising cookies, and opt-out preferences.';
    h1 = isIt ? 'Informativa sui Cookie' : isDe ? 'Cookie-Richtlinie' : 'Cookie Policy';
    breadcrumbTitle = h1;

    contentHtml = `
      <div class="space-y-6 text-sm text-slate-700 leading-relaxed font-normal">
        <section class="space-y-3">
          <h2 class="text-lg font-black text-slate-900">${isIt ? '1. Cookie Tecnici e Archiviazione Locale' : isDe ? '1. Technische Cookies & LocalStorage' : '1. Technical Cookies & LocalStorage'}</h2>
          <p>
            ${isIt
              ? 'MyPdfTools utilizza la memoria locale (HTML5 LocalStorage) esclusivamente per memorizzare le preferenze dell\'utente, come la lingua selezionata (Italiano, Tedesco o Inglese). Questi dati non vengono inviati a server esterni.'
              : isDe
              ? 'Wir nutzen den Browserspeicher (LocalStorage) lediglich zur Speicherung Ihrer bevorzugten Spracheinstellung. Es werden keine Nutzerprofile erstellt.'
              : 'MyPdfTools uses browser LocalStorage strictly to remember your interface preferences (such as selected language). No profiling data is collected.'}
          </p>
        </section>

        <section class="space-y-3">
          <h2 class="text-lg font-black text-slate-900">${isIt ? '2. Cookie Pubblicitari (Google AdSense)' : isDe ? '2. Werbe-Cookies von Google AdSense' : '2. Advertising Cookies (Google AdSense)'}</h2>
          <p>
            ${isIt
              ? 'Questo sito ospita banner pubblicitari erogati da Google AdSense. Google e i suoi partner utilizzano cookie (inclusi i cookie DoubleClick) per pubblicare annunci pertinenti in base alla navigazione. Puoi controllare o bloccare tali cookie in qualunque momento tramite le impostazioni del tuo browser.'
              : isDe
              ? 'Google AdSense verwendet Cookies, um Anzeigen basierend auf Ihren früheren Besuchen einzublenden. Sie können diese Cookies jederzeit in Ihren Browsereinstellungen deaktivieren.'
              : 'Google AdSense uses cookies to serve ads based on your web browsing history. You can control or block these cookies anytime in your browser settings.'}
          </p>
        </section>
      </div>`;
  } else if (type === 'about') {
    title = isIt
      ? 'Chi Siamo & Missione — MyPdfTools'
      : isDe
      ? 'Über uns & Unsere Mission — MyPdfTools'
      : 'About Us & Mission — MyPdfTools';
    metaDesc = isIt
      ? 'Informazioni su MyPdfTools: la piattaforma creata da Shifat Manjum per garantire strumenti PDF 100% privati, sicuri e gratuiti senza caricamenti cloud.'
      : isDe
      ? 'Über MyPdfTools: Gegründet von Shifat Manjum für kompromisslose Privatsphäre bei der PDF-Bearbeitung ohne Cloud-Upload.'
      : 'About MyPdfTools: Created by Shifat Manjum to provide 100% private, client-side PDF manipulation with zero cloud uploads.';
    h1 = isIt ? 'Informazioni su MyPdfTools' : isDe ? 'Über MyPdfTools' : 'About MyPdfTools';
    breadcrumbTitle = isIt ? 'Chi Siamo' : isDe ? 'Über uns' : 'About Us';

    contentHtml = `
      <div class="space-y-8 text-sm text-slate-700 leading-relaxed font-normal">
        <section class="space-y-3">
          <h2 class="text-xl font-black text-slate-900">${isIt ? 'La Nostra Missione: Restituire la Riservatezza agli Utenti' : isDe ? 'Unsere Mission: Maximale Privatsphäre' : 'Our Mission: Restoring Document Privacy'}</h2>
          <p>
            ${isIt
              ? 'MyPdfTools è nata per sfidare il modello tradizionale dei convertitori online, che obbligano gli utenti a cedere i propri file riservati a server sconosciuti in cambio di una conversione gratuita. Abbiamo reingegnerizzato gli strumenti PDF per operare al 100% all\'interno del tuo dispositivo.'
              : isDe
              ? 'MyPdfTools wurde geschaffen, um eine sichere Alternative zu traditionellen Cloud-Konvertern zu bieten. Unsere Software verarbeitet Dokumente ausschließlich im Browser des Nutzers.'
              : 'MyPdfTools was created to challenge the risky model of cloud converters that require uploading sensitive documents. We engineered every single tool to execute 100% locally on your device.'}
          </p>
        </section>

        <section class="p-6 bg-slate-900 text-white rounded-3xl space-y-3">
          <h3 class="text-base font-black text-white">${isIt ? 'Fondatore & Team di Sviluppo' : isDe ? 'Gründer & Entwickler' : 'Founder & Lead Developer'}</h3>
          <p class="text-xs sm:text-sm text-slate-300">
            <strong>Shifat Manjum</strong> &bull; Product Architect & Founder di Zentixx.<br>
            ${isIt
              ? '«Come molti professionisti, mi sono trovato spesso a dover convertire documenti fiscali e contratti su siti online, con la costante preoccupazione di dove finissero i miei file. Ho creato MyPdfTools per eliminare per sempre questo timore: niente upload, nessun server intermediario, solo pura elaborazione locale.»'
              : isDe
              ? '„Ich habe MyPdfTools entwickelt, um vertrauliche Dokumente ohne Risiko und ohne Server-Uploads direkt im Browser zu bearbeiten.“'
              : '“I built MyPdfTools to eliminate the anxiety of uploading sensitive contracts and tax documents to remote servers: zero uploads, pure local browser computation.”'}
          </p>
          <div class="pt-2 text-xs text-emerald-400 font-bold">
            Email: <a href="mailto:khshifat@gmail.com" class="underline hover:text-white">khshifat@gmail.com</a> &bull; GitHub: <a href="https://github.com/shifat-manjum" target="_blank" rel="noopener noreferrer" class="underline hover:text-white">github.com/shifat-manjum</a>
          </div>
        </section>
      </div>`;
  } else if (type === 'contact') {
    title = isIt
      ? 'Contatti & Assistenza — MyPdfTools'
      : isDe
      ? 'Kontakt & Support — MyPdfTools'
      : 'Contact & Support — MyPdfTools';
    metaDesc = isIt
      ? 'Contatta il team di MyPdfTools. Assistenza tecnica, richieste di partnership o segnalazioni di conformità GDPR. Risposta entro 24 ore.'
      : isDe
      ? 'Kontaktieren Sie MyPdfTools. Support, Feedback und Datenschutzanfragen. Schnelle Antwort innerhalb von 24 Stunden.'
      : 'Get in touch with the MyPdfTools team. Support, feedback, and compliance inquiries. Typically responded to within 24 hours.';
    h1 = isIt ? 'Contattaci' : isDe ? 'Kontakt' : 'Contact Us';
    breadcrumbTitle = h1;

    contentHtml = `
      <div class="space-y-6 text-sm text-slate-700 leading-relaxed font-normal">
        <section class="space-y-3">
          <h2 class="text-lg font-black text-slate-900">${isIt ? 'Canale di Comunicazione Diretto' : isDe ? 'Offizieller Kontaktweg' : 'Official Communication Channel'}</h2>
          <p>
            ${isIt
              ? 'Per assistenza tecnica, segnalazione di bug, richieste di funzionalità aggiuntive o domande sulla conformità GDPR, siamo a tua disposizione:'
              : isDe
              ? 'Für Support, Fehlerberichte, Feature-Wünsche oder Datenschutzfragen stehen wir Ihnen gerne zur Verfügung:'
              : 'For technical support, bug reports, feature requests, or privacy inquiries, please contact us directly:'}
          </p>
          <div class="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <div class="text-xs text-slate-500 font-bold uppercase tracking-wider">${isIt ? 'Indirizzo Email Ufficiale' : isDe ? 'Offizielle E-Mail-Adresse' : 'Official Email Address'}</div>
            <div class="text-lg sm:text-xl font-black text-emerald-600">
              <a href="mailto:khshifat@gmail.com" class="hover:underline">khshifat@gmail.com</a>
            </div>
            <p class="text-xs text-slate-500">
              ${isIt ? 'Tempi medi di risposta: entro 24 ore lavorative.' : isDe ? 'Durchschnittliche Antwortzeit: innerhalb von 24 Stunden.' : 'Average response time: within 24 business hours.'}
            </p>
          </div>
        </section>

        <section class="space-y-2 text-xs text-slate-500">
          <p><strong>Piattaforme Web:</strong> www.mypdftools.it (Italia) &bull; www.mypdftools.de (Germania)</p>
          <p><strong>Sviluppatore Responsabile:</strong> Shifat Manjum (Zentixx)</p>
        </section>
      </div>`;
  }

  const semanticHtml = `
    <div class="min-h-screen flex flex-col bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9]/70 to-[#ecfdf5]/30">
      <header class="w-full bg-white/95 border-b border-slate-200 py-4 px-6 sticky top-0 z-40">
        <div class="max-w-4xl mx-auto flex items-center justify-between">
          <a href="/" class="flex items-center gap-2 text-slate-900 font-black text-lg">
            <span class="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center font-black">P</span>
            <span>MyPdf<span class="text-emerald-600">Tools</span></span>
          </a>
          <nav aria-label="Breadcrumb">
            <ol class="flex items-center gap-2 text-xs font-bold text-slate-500">
              <li><a href="/" class="hover:text-emerald-600">Home</a></li>
              <li>/</li>
              <li class="text-emerald-600 font-black" aria-current="page">${escapeHtml(breadcrumbTitle)}</li>
            </ol>
          </nav>
        </div>
      </header>

      <main class="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-12 w-full space-y-8">
        <header class="border-b border-slate-200 pb-6 space-y-2 text-left">
          <div class="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black">
            <span>Trasparenza &amp; Conformità</span>
          </div>
          <h1 class="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">${escapeHtml(h1)}</h1>
          <p class="text-xs sm:text-sm text-slate-500 font-medium">${escapeHtml(metaDesc)}</p>
        </header>

        <article class="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm text-left">
          ${contentHtml}
        </article>

        <div class="pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs font-bold text-slate-600">
          <a href="/" class="text-emerald-600 hover:underline">&larr; ${isIt ? 'Torna alla Home Page' : isDe ? 'Zurück zur Startseite' : 'Back to Home'}</a>
          <div class="flex items-center gap-4">
            <a href="/privacy-policy" class="hover:text-emerald-600">Privacy</a>
            <a href="/terms-of-service" class="hover:text-emerald-600">Termini</a>
            <a href="/cookie-policy" class="hover:text-emerald-600">Cookie</a>
            <a href="/chi-siamo" class="hover:text-emerald-600">Chi Siamo</a>
            <a href="/contatti" class="hover:text-emerald-600">Contatti</a>
          </div>
        </div>
      </main>

      <footer class="w-full bg-white border-t border-slate-200 py-8 text-center text-xs text-slate-500">
        <div class="max-w-4xl mx-auto px-4 space-y-3">
          <p>&copy; ${new Date().getFullYear()} MyPdfTools (mypdftools.it &bull; mypdftools.de). Tutti i diritti riservati.</p>
          <div class="flex flex-wrap items-center justify-center gap-4 font-semibold text-slate-600">
            <a href="/" class="hover:text-emerald-600">Home</a>
            <a href="mailto:khshifat@gmail.com" class="hover:text-emerald-600 font-bold">khshifat@gmail.com</a>
            <a href="https://github.com/shifat-manjum" target="_blank" rel="noopener noreferrer" class="hover:text-emerald-600">Shifat Manjum (Zentixx)</a>
          </div>
        </div>
      </footer>
    </div>`;

  let pageHtml = baseHtml;
  pageHtml = pageHtml.replace(/<html lang="[^"]*"/, `<html lang="${lang}"`);
  pageHtml = pageHtml.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)}</title>`);
  pageHtml = pageHtml.replace(/<meta name="title" content="[^"]*"/, `<meta name="title" content="${escapeHtml(title)}"`);
  pageHtml = pageHtml.replace(/<meta name="description" content="[^"]*"/, `<meta name="description" content="${escapeHtml(metaDesc)}"`);
  pageHtml = pageHtml.replace(/<link rel="canonical" href="[^"]*"/, `<link rel="canonical" href="${canonical}"`);
  pageHtml = pageHtml.replace(/<meta property="og:title" content="[^"]*"/, `<meta property="og:title" content="${escapeHtml(title)}"`);
  pageHtml = pageHtml.replace(/<meta property="og:description" content="[^"]*"/, `<meta property="og:description" content="${escapeHtml(metaDesc)}"`);
  pageHtml = pageHtml.replace(/<meta property="og:url" content="[^"]*"/, `<meta property="og:url" content="${canonical}"`);

  const hreflangTags = `
    <link rel="alternate" hreflang="it" href="${alternateIt}" />
    <link rel="alternate" hreflang="de" href="${alternateDe}" />
    <link rel="alternate" hreflang="en" href="${alternateEn}" />
    <link rel="alternate" hreflang="x-default" href="${alternateEn || alternateIt}" />`;

  pageHtml = pageHtml.replace(/<!-- Multi-Language Hreflang [\s\S]*?<!-- Open Graph/, `${hreflangTags}\n\n    <!-- Open Graph`);

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `https://${new URL(canonical).hostname}/` },
      { '@type': 'ListItem', position: 2, name: h1, item: canonical }
    ]
  };

  const schemaBlock = `<script type="application/ld+json">${JSON.stringify(breadcrumbSchema)}</script>`;
  pageHtml = pageHtml.replace('</head>', `${schemaBlock}\n  </head>`);

  // Inject semantic pre-rendered HTML into #root
  pageHtml = pageHtml.replace('<div id="root"><!-- SSR_INJECT --></div>', `<div id="root">${semanticHtml}</div>`);

  return pageHtml;
}

async function runPrerender() {
  console.log('🚀 Starting SSG Prerender & XML Sitemap Generation...');

  const distDir = path.resolve('dist');
  const indexHtmlPath = path.join(distDir, 'index.html');

  if (!fs.existsSync(indexHtmlPath)) {
    console.error('❌ dist/index.html not found! Run "vite build" first.');
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(indexHtmlPath, 'utf8');

  // Extract SEO_ROUTES and TOOL_TO_PRIMARY_SLUG from src/data/seoRoutes.ts
  const seoRoutesFile = fs.readFileSync(path.resolve('src/data/seoRoutes.ts'), 'utf8');
  const tempScriptPath = path.resolve('scripts/.tempSeoRoutes.mjs');
  const transpileResult = ts.transpileModule(seoRoutesFile, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 }
  });
  fs.writeFileSync(tempScriptPath, transpileResult.outputText, 'utf8');

  // Extract TOOLS from src/data/tools.ts
  const toolsFile = fs.readFileSync(path.resolve('src/data/tools.ts'), 'utf8');
  const tempToolsPath = path.resolve('scripts/.tempTools.mjs');
  const transpileTools = ts.transpileModule(toolsFile, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 }
  });
  fs.writeFileSync(tempToolsPath, transpileTools.outputText, 'utf8');

  // Extract TRANSLATIONS from src/i18n/translations.ts
  const transFile = fs.readFileSync(path.resolve('src/i18n/translations.ts'), 'utf8');
  const tempTransPath = path.resolve('scripts/.tempTrans.mjs');
  const transpileTrans = ts.transpileModule(transFile, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 }
  });
  fs.writeFileSync(tempTransPath, transpileTrans.outputText, 'utf8');

  let SEO_ROUTES = {};
  let TOOL_TO_PRIMARY_SLUG = {};
  let TOOLS = [];
  let TRANSLATIONS = {};

  try {
    const importedSeo = await import('./.tempSeoRoutes.mjs');
    SEO_ROUTES = importedSeo.SEO_ROUTES;
    TOOL_TO_PRIMARY_SLUG = importedSeo.TOOL_TO_PRIMARY_SLUG || {};

    const importedTools = await import('./.tempTools.mjs');
    TOOLS = importedTools.TOOLS || [];

    const importedTrans = await import('./.tempTrans.mjs');
    TRANSLATIONS = importedTrans.TRANSLATIONS || {};
  } catch (err) {
    console.error('Failed to import data files:', err);
    process.exit(1);
  } finally {
    if (fs.existsSync(tempScriptPath)) fs.unlinkSync(tempScriptPath);
    if (fs.existsSync(tempToolsPath)) fs.unlinkSync(tempToolsPath);
    if (fs.existsSync(tempTransPath)) fs.unlinkSync(tempTransPath);
  }

  // 1. Pre-render Homepage into dist/index.html
  console.log('🏠 Pre-rendering Homepage with rich editorial publisher guides & FAQs...');
  const homepageContent = generateHomepageHtml({
    tools: TOOLS,
    translations: TRANSLATIONS,
    toolToSlug: TOOL_TO_PRIMARY_SLUG
  });

  const renderedHomeHtml = baseHtml.replace(
    '<div id="root"><!-- SSR_INJECT --></div>',
    `<div id="root">${homepageContent}</div>`
  );
  fs.writeFileSync(indexHtmlPath, renderedHomeHtml, 'utf8');
  console.log('✅ dist/index.html updated with rich pre-rendered content!');

  // 2. Pre-render Legal & Compliance Pages
  console.log('⚖️ Pre-rendering Legal & Compliance Pages (Privacy, Terms, Cookies, About, Contact)...');
  const compliancePages = [
    // Italian Pages
    { slug: 'privacy-policy', type: 'privacy', lang: 'it', canonical: 'https://www.mypdftools.it/privacy-policy', it: 'https://www.mypdftools.it/privacy-policy', de: 'https://www.mypdftools.de/datenschutz', en: 'https://www.mypdftools.it/privacy' },
    { slug: 'terms-of-service', type: 'terms', lang: 'it', canonical: 'https://www.mypdftools.it/terms-of-service', it: 'https://www.mypdftools.it/terms-of-service', de: 'https://www.mypdftools.de/nutzungsbedingungen', en: 'https://www.mypdftools.it/terms' },
    { slug: 'cookie-policy', type: 'cookies', lang: 'it', canonical: 'https://www.mypdftools.it/cookie-policy', it: 'https://www.mypdftools.it/cookie-policy', de: 'https://www.mypdftools.de/cookie-policy', en: 'https://www.mypdftools.it/cookies' },
    { slug: 'chi-siamo', type: 'about', lang: 'it', canonical: 'https://www.mypdftools.it/chi-siamo', it: 'https://www.mypdftools.it/chi-siamo', de: 'https://www.mypdftools.de/ueber-uns', en: 'https://www.mypdftools.it/about' },
    { slug: 'contatti', type: 'contact', lang: 'it', canonical: 'https://www.mypdftools.it/contatti', it: 'https://www.mypdftools.it/contatti', de: 'https://www.mypdftools.de/kontakt', en: 'https://www.mypdftools.it/contact' },

    // German Pages
    { slug: 'datenschutz', type: 'privacy', lang: 'de', canonical: 'https://www.mypdftools.de/datenschutz', it: 'https://www.mypdftools.it/privacy-policy', de: 'https://www.mypdftools.de/datenschutz', en: 'https://www.mypdftools.it/privacy' },
    { slug: 'nutzungsbedingungen', type: 'terms', lang: 'de', canonical: 'https://www.mypdftools.de/nutzungsbedingungen', it: 'https://www.mypdftools.it/terms-of-service', de: 'https://www.mypdftools.de/nutzungsbedingungen', en: 'https://www.mypdftools.it/terms' },
    { slug: 'ueber-uns', type: 'about', lang: 'de', canonical: 'https://www.mypdftools.de/ueber-uns', it: 'https://www.mypdftools.it/chi-siamo', de: 'https://www.mypdftools.de/ueber-uns', en: 'https://www.mypdftools.it/about' },
    { slug: 'kontakt', type: 'contact', lang: 'de', canonical: 'https://www.mypdftools.de/kontakt', it: 'https://www.mypdftools.it/contatti', de: 'https://www.mypdftools.de/kontakt', en: 'https://www.mypdftools.it/contact' },

    // English Pages
    { slug: 'privacy', type: 'privacy', lang: 'en', canonical: 'https://www.mypdftools.it/privacy', it: 'https://www.mypdftools.it/privacy-policy', de: 'https://www.mypdftools.de/datenschutz', en: 'https://www.mypdftools.it/privacy' },
    { slug: 'terms', type: 'terms', lang: 'en', canonical: 'https://www.mypdftools.it/terms', it: 'https://www.mypdftools.it/terms-of-service', de: 'https://www.mypdftools.de/nutzungsbedingungen', en: 'https://www.mypdftools.it/terms' },
    { slug: 'cookies', type: 'cookies', lang: 'en', canonical: 'https://www.mypdftools.it/cookies', it: 'https://www.mypdftools.it/cookie-policy', de: 'https://www.mypdftools.de/cookie-policy', en: 'https://www.mypdftools.it/cookies' },
    { slug: 'about', type: 'about', lang: 'en', canonical: 'https://www.mypdftools.it/about', it: 'https://www.mypdftools.it/chi-siamo', de: 'https://www.mypdftools.de/ueber-uns', en: 'https://www.mypdftools.it/about' },
    { slug: 'contact', type: 'contact', lang: 'en', canonical: 'https://www.mypdftools.it/contact', it: 'https://www.mypdftools.it/contatti', de: 'https://www.mypdftools.de/kontakt', en: 'https://www.mypdftools.it/contact' },
  ];

  for (const cp of compliancePages) {
    const pageHtml = generateCompliancePageHtml({
      type: cp.type,
      lang: cp.lang,
      canonical: cp.canonical,
      alternateIt: cp.it,
      alternateDe: cp.de,
      alternateEn: cp.en,
      baseHtml
    });

    const targetDir = path.join(distDir, cp.slug);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    fs.writeFileSync(path.join(targetDir, 'index.html'), pageHtml, 'utf8');
  }
  console.log(`✅ Generated ${compliancePages.length} legal & compliance pages in dist/!`);

  // 3. Pre-render Tool Routes
  const routeKeys = Object.keys(SEO_ROUTES);
  console.log(`📦 Found ${routeKeys.length} SEO routes to prerender into static HTML.`);

  let generatedCount = 0;

  for (const slug of routeKeys) {
    const route = SEO_ROUTES[slug];
    const isIt = route.lang === 'it';
    const lang = route.lang;

    // Structured Data Schemas
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: route.faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: f.a,
        },
      })),
    };

    const howToSchema = {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: route.h1,
      description: route.metaDescription,
      step: route.steps.map((s, idx) => ({
        '@type': 'HowToStep',
        position: idx + 1,
        name: s.title,
        text: s.desc,
      })),
    };

    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: `https://www.${route.domain}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: route.h1,
          item: route.canonical,
        },
      ],
    };

    const softwareSchema = {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: route.h1,
      operatingSystem: 'Any (Web Browser)',
      applicationCategory: 'BusinessApplication',
      offers: {
        '@type': 'Offer',
        price: '0.00',
        priceCurrency: 'EUR',
      },
    };

    const jsonLdBlock = `
    <!-- Pre-rendered JSON-LD Schemas -->
    <script type="application/ld+json">${JSON.stringify(faqSchema)}</script>
    <script type="application/ld+json">${JSON.stringify(howToSchema)}</script>
    <script type="application/ld+json">${JSON.stringify(breadcrumbSchema)}</script>
    <script type="application/ld+json">${JSON.stringify(softwareSchema)}</script>
    `;

    // Semantic pre-rendered HTML content inside #root
    const relatedLinksHtml = (route.relatedSlugs || [])
      .map((relSlug) => {
        const relRoute = SEO_ROUTES[relSlug];
        const relTitle = relRoute ? relRoute.h1 : relSlug;
        return `<a href="/${relSlug}" class="p-4 bg-white rounded-xl border border-slate-200 shadow-sm hover:border-emerald-500 block font-bold text-slate-800 hover:text-emerald-700">${escapeHtml(relTitle)}</a>`;
      })
      .join('\n');

    const stepsHtml = route.steps
      .map(
        (st) => `
        <li class="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
          <strong class="text-sm font-black text-slate-900 block mb-1">${escapeHtml(st.title)}</strong>
          <span class="text-xs text-slate-600 font-medium">${escapeHtml(st.desc)}</span>
        </li>`
      )
      .join('\n');

    const faqsHtml = route.faqs
      .map(
        (fq) => `
        <details class="bg-white rounded-2xl border border-slate-200/80 p-5 group shadow-xs">
          <summary class="font-bold text-slate-900 cursor-pointer text-sm">${escapeHtml(fq.q)}</summary>
          <p class="mt-3 text-xs text-slate-600 leading-relaxed font-medium pt-3 border-t border-slate-100">${escapeHtml(fq.a)}</p>
        </details>`
      )
      .join('\n');

    const semanticHtml = `
      <div class="min-h-screen flex flex-col bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9]/70 to-[#ecfdf5]/30">
        <!-- Static Prerendered Semantic Navigation -->
        <header class="w-full bg-white/95 border-b border-slate-200 py-4 px-6">
          <div class="max-w-6xl mx-auto flex items-center justify-between">
            <a href="/" class="flex items-center gap-2 text-slate-900 font-black text-lg">
              <span class="w-8 h-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center font-black">P</span>
              <span>MyPdfTools</span>
            </a>
            <nav aria-label="Breadcrumb">
              <ol class="flex items-center gap-2 text-xs font-bold text-slate-500">
                <li><a href="/" class="hover:text-emerald-600">Home</a></li>
                <li>/</li>
                <li class="text-emerald-600 font-black" aria-current="page">${escapeHtml(route.h1)}</li>
              </ol>
            </nav>
          </div>
        </header>

        <!-- Static Prerendered Tool Header & Content -->
        <main class="flex-1 max-w-5xl mx-auto px-4 sm:px-6 py-10 w-full space-y-12">
          <section class="text-center space-y-3">
            ${route.badge ? `<span class="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-black rounded-full">${escapeHtml(route.badge)}</span>` : ''}
            <h1 class="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">${escapeHtml(route.h1)}</h1>
            <p class="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto font-medium">${escapeHtml(route.intro)}</p>
          </section>

          <!-- Interactive Tool Anchor (React mounts here immediately) -->
          <div id="interactive-tool-slot" data-tool-id="${escapeHtml(route.toolId)}" data-lang="${escapeHtml(lang)}">
            <noscript>
              <div class="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center">
                <p class="text-sm font-bold text-emerald-900">${isIt ? 'Per utilizzare la suite interattiva di elaborazione PDF 100% in locale, abilita JavaScript.' : 'Bitte aktivieren Sie JavaScript, um das interaktive lokale PDF-Tool im Browser zu nutzen.'}</p>
              </div>
            </noscript>
          </div>

          <!-- Trust & Privacy Proof -->
          <section class="p-6 bg-slate-900 text-white rounded-3xl text-center space-y-2">
            <h2 class="text-lg font-black text-white">${isIt ? '100% Privato & Sicuro nel tuo Browser' : '100% Sicher & Lokal im Browser'}</h2>
            <p class="text-xs text-slate-300 max-w-xl mx-auto">${isIt ? 'Nessun file viene mai inviato sui server. I documenti restano nella RAM del tuo dispositivo.' : 'Keine Dateien werden auf fremde Server geladen. Alle Dokumente bleiben sicher in Ihrem Gerätespeicher.'}</p>
          </section>

          <!-- Step-by-Step How-To Guide -->
          <section class="space-y-4">
            <h2 class="text-xl font-black text-slate-900">${isIt ? 'Come Funziona — Guida in 3 Passaggi' : 'So funktioniert es — Anleitung in 3 Schritten'}</h2>
            <ol class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              ${stepsHtml}
            </ol>
          </section>

          <!-- FAQ Accordions -->
          <section class="space-y-4">
            <h2 class="text-xl font-black text-slate-900">${isIt ? 'Domande Frequenti (FAQ)' : 'Häufig gestellte Fragen (FAQ)'}</h2>
            <div class="space-y-3">
              ${faqsHtml}
            </div>
          </section>

          <!-- Internal Linking Grid -->
          <section class="space-y-4 pt-6 border-t border-slate-200">
            <h2 class="text-lg font-black text-slate-900">${isIt ? 'Strumenti Correlati Consigliati' : 'Empfohlene verwandte PDF-Tools'}</h2>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              ${relatedLinksHtml}
            </div>
          </section>
        </main>

        <!-- Static Prerendered Footer -->
        <footer class="w-full bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500 space-y-2">
          <p>© ${new Date().getFullYear()} MyPdfTools (mypdftools.it • mypdftools.de). All rights reserved.</p>
          <div class="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-600">
            <a href="/" class="hover:text-emerald-600">Home</a>
            <a href="/privacy-policy" class="hover:text-emerald-600">Privacy Policy</a>
            <a href="/terms-of-service" class="hover:text-emerald-600">Termini</a>
            <a href="/cookie-policy" class="hover:text-emerald-600">Cookie</a>
            <a href="/chi-siamo" class="hover:text-emerald-600">Chi Siamo</a>
            <a href="/contatti" class="hover:text-emerald-600">Contatti</a>
            <a href="mailto:khshifat@gmail.com" class="hover:text-emerald-600 font-bold">khshifat@gmail.com</a>
          </div>
        </footer>
      </div>
    `;

    // Assemble complete pre-rendered page
    let pageHtml = baseHtml;
    pageHtml = pageHtml.replace(/<html lang="[^"]*"/, `<html lang="${lang}"`);
    pageHtml = pageHtml.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(route.metaTitle)}</title>`);
    pageHtml = pageHtml.replace(/<meta name="title" content="[^"]*"/, `<meta name="title" content="${escapeHtml(route.metaTitle)}"`);
    pageHtml = pageHtml.replace(/<meta name="description" content="[^"]*"/, `<meta name="description" content="${escapeHtml(route.metaDescription)}"`);
    pageHtml = pageHtml.replace(/<link rel="canonical" href="[^"]*"/, `<link rel="canonical" href="${route.canonical}"`);
    pageHtml = pageHtml.replace(/<meta property="og:title" content="[^"]*"/, `<meta property="og:title" content="${escapeHtml(route.metaTitle)}"`);
    pageHtml = pageHtml.replace(/<meta property="og:description" content="[^"]*"/, `<meta property="og:description" content="${escapeHtml(route.metaDescription)}"`);
    pageHtml = pageHtml.replace(/<meta property="og:url" content="[^"]*"/, `<meta property="og:url" content="${route.canonical}"`);

    const hreflangTags = `
    <link rel="alternate" hreflang="it" href="${route.hreflang.it}" />
    <link rel="alternate" hreflang="de" href="${route.hreflang.de}" />
    ${route.hreflang.en ? `<link rel="alternate" hreflang="en" href="${route.hreflang.en}" />` : ''}
    <link rel="alternate" hreflang="x-default" href="${route.hreflang.en || route.hreflang.it}" />`;

    pageHtml = pageHtml.replace(/<!-- Multi-Language Hreflang [\s\S]*?<!-- Open Graph/, `${hreflangTags}\n\n    <!-- Open Graph`);
    pageHtml = pageHtml.replace('</head>', `${jsonLdBlock}\n  </head>`);

    // Inject semantic pre-rendered HTML inside <div id="root">
    pageHtml = pageHtml.replace('<div id="root"><!-- SSR_INJECT --></div>', `<div id="root">${semanticHtml}</div>`);

    // Write file to dist/<slug>/index.html
    const targetDir = path.join(distDir, slug);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    fs.writeFileSync(path.join(targetDir, 'index.html'), pageHtml, 'utf8');
    generatedCount++;
  }

  console.log(`✅ Pre-rendered ${generatedCount} static tool pages successfully!`);

  // 4. Generate Domain-Specific XML Sitemaps with Bidirectional Hreflang
  console.log('🗺️ Generating domain-specific XML Sitemaps for .it, .de, and English / US...');
  const today = new Date().toISOString().split('T')[0];

  const itUrls = [`
  <url>
    <loc>https://www.mypdftools.it/</loc>
    <xhtml:link rel="alternate" hreflang="it" href="https://www.mypdftools.it/" />
    <xhtml:link rel="alternate" hreflang="de" href="https://www.mypdftools.de/" />
    <xhtml:link rel="alternate" hreflang="en" href="https://www.mypdftools.it/merge-pdf" />
    <xhtml:link rel="alternate" hreflang="x-default" href="https://www.mypdftools.it/" />
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`];

  const deUrls = [`
  <url>
    <loc>https://www.mypdftools.de/</loc>
    <xhtml:link rel="alternate" hreflang="it" href="https://www.mypdftools.it/" />
    <xhtml:link rel="alternate" hreflang="de" href="https://www.mypdftools.de/" />
    <xhtml:link rel="alternate" hreflang="en" href="https://www.mypdftools.it/merge-pdf" />
    <xhtml:link rel="alternate" hreflang="x-default" href="https://www.mypdftools.it/" />
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`];

  const enUrls = [`
  <url>
    <loc>https://www.mypdftools.it/merge-pdf</loc>
    <xhtml:link rel="alternate" hreflang="it" href="https://www.mypdftools.it/unire-pdf" />
    <xhtml:link rel="alternate" hreflang="de" href="https://www.mypdftools.de/pdf-zusammenfuegen" />
    <xhtml:link rel="alternate" hreflang="en" href="https://www.mypdftools.it/merge-pdf" />
    <xhtml:link rel="alternate" hreflang="x-default" href="https://www.mypdftools.it/merge-pdf" />
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`];

  // Add compliance pages to sitemaps
  for (const cp of compliancePages) {
    const urlEntry = `
  <url>
    <loc>${cp.canonical}</loc>
    <xhtml:link rel="alternate" hreflang="it" href="${cp.it}" />
    <xhtml:link rel="alternate" hreflang="de" href="${cp.de}" />
    <xhtml:link rel="alternate" hreflang="en" href="${cp.en}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${cp.en}" />
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.70</priority>
  </url>`;

    if (cp.canonical.includes('mypdftools.de')) {
      deUrls.push(urlEntry);
    } else if (cp.lang === 'en') {
      enUrls.push(urlEntry);
      itUrls.push(urlEntry);
    } else {
      itUrls.push(urlEntry);
    }
  }

  // Distribute routes to their respective domain sitemaps
  for (const slug of routeKeys) {
    const r = SEO_ROUTES[slug];
    const isPriority = !slug.includes('/') && ['unire-pdf', 'pdf-zusammenfuegen', 'merge-pdf', 'da-jpg-a-pdf', 'jpg-in-pdf', 'jpg-to-pdf', 'comprimere-pdf', 'pdf-komprimieren', 'compress-pdf', 'da-word-a-pdf', 'word-in-pdf', 'word-to-pdf'].includes(slug);
    const priority = isPriority ? '0.95' : slug.includes('/') ? '0.80' : '0.88';

    const enUrl = r.hreflang.en || (r.lang === 'en' ? r.canonical : 'https://www.mypdftools.it/merge-pdf');

    const urlEntry = `
  <url>
    <loc>${r.canonical}</loc>
    <xhtml:link rel="alternate" hreflang="it" href="${r.hreflang.it}" />
    <xhtml:link rel="alternate" hreflang="de" href="${r.hreflang.de}" />
    ${enUrl ? `<xhtml:link rel="alternate" hreflang="en" href="${enUrl}" />` : ''}
    <xhtml:link rel="alternate" hreflang="x-default" href="${enUrl || r.hreflang.it}" />
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`;

    if (r.domain === 'mypdftools.de' || r.lang === 'de') {
      deUrls.push(urlEntry);
    } else if (r.lang === 'en') {
      enUrls.push(urlEntry);
      itUrls.push(urlEntry);
    } else {
      itUrls.push(urlEntry);
    }
  }

  const sitemapItXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${itUrls.join('')}
</urlset>
`;

  const sitemapDeXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${deUrls.join('')}
</urlset>
`;

  const sitemapEnXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${enUrls.join('')}
</urlset>
`;

  // Write sitemap files
  fs.writeFileSync(path.join(distDir, 'sitemap-it.xml'), sitemapItXml, 'utf8');
  fs.writeFileSync(path.resolve('public/sitemap-it.xml'), sitemapItXml, 'utf8');

  fs.writeFileSync(path.join(distDir, 'sitemap-de.xml'), sitemapDeXml, 'utf8');
  fs.writeFileSync(path.resolve('public/sitemap-de.xml'), sitemapDeXml, 'utf8');

  fs.writeFileSync(path.join(distDir, 'sitemap-en.xml'), sitemapEnXml, 'utf8');
  fs.writeFileSync(path.resolve('public/sitemap-en.xml'), sitemapEnXml, 'utf8');

  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapItXml, 'utf8');
  fs.writeFileSync(path.resolve('public/sitemap.xml'), sitemapItXml, 'utf8');

  console.log(`✅ sitemap-it.xml created with ${itUrls.length} URLs!`);
  console.log(`✅ sitemap-de.xml created with ${deUrls.length} URLs!`);
  console.log(`✅ sitemap-en.xml created with ${enUrls.length} URLs!`);

  // 5. Generate / Update robots.txt
  const robotsTxt = `User-agent: *
Allow: /

# Sitemap definitions for Google Search Console & Bing Webmaster
Sitemap: https://www.mypdftools.it/sitemap.xml
Sitemap: https://www.mypdftools.it/sitemap-en.xml
Sitemap: https://www.mypdftools.de/sitemap.xml

# LLM Crawler Guidance
# llms.txt: https://www.mypdftools.it/llms.txt
`;
  fs.writeFileSync(path.join(distDir, 'robots.txt'), robotsTxt, 'utf8');
  fs.writeFileSync(path.resolve('public/robots.txt'), robotsTxt, 'utf8');
  console.log('✅ robots.txt updated with complete sitemaps.');
}

runPrerender().catch((err) => {
  console.error('Fatal prerender error:', err);
  process.exit(1);
});
