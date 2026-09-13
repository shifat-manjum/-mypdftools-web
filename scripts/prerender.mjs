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
            Unisci, dividi, comprimi, converti, firma e organizza i tuoi PDF senza mai inviare i tuoi file riservati su Internet. 100% Gratuito e sicuro.
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
      </main>

      <!-- Static Prerendered Footer -->
      <footer class="bg-white/90 backdrop-blur-xl border-t border-slate-200/80 py-10 text-center text-xs text-slate-500">
        <div class="max-w-[1650px] mx-auto px-4 sm:px-6 lg:px-10 space-y-6">
          <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p class="text-xs text-slate-500 font-medium">
              &copy; ${new Date().getFullYear()} MyPdfTools (mypdftools.it &bull; mypdftools.de). Tutti i diritti riservati.
            </p>
            <div class="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-600">
              <a href="/unire-pdf" class="hover:text-emerald-600">Unisci PDF</a>
              <a href="/dividere-pdf" class="hover:text-emerald-600">Dividi PDF</a>
              <a href="/comprimere-pdf" class="hover:text-emerald-600">Comprimi PDF</a>
              <a href="/da-jpg-a-pdf" class="hover:text-emerald-600">JPG in PDF</a>
              <a href="mailto:khshifat@gmail.com" class="hover:text-emerald-600 font-bold">Contatto: khshifat@gmail.com</a>
              <a href="https://github.com/shifat-manjum" target="_blank" rel="noopener noreferrer" class="hover:text-emerald-600">Sviluppatore (Shifat Manjum)</a>
            </div>
          </div>
        </div>
      </footer>
    </div>`;
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

  const routeKeys = Object.keys(SEO_ROUTES);
  console.log(`📦 Found ${routeKeys.length} SEO routes to prerender into static HTML.`);

  let generatedCount = 0;

  for (const slug of routeKeys) {
    const route = SEO_ROUTES[slug];
    const isIt = route.lang === 'it';
    const lang = route.lang;

    // 1. Structured Data Schemas
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

    // 2. Semantic pre-rendered HTML content inside #root
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
            <a href="mailto:khshifat@gmail.com" class="hover:text-emerald-600 font-bold">Contact: khshifat@gmail.com</a>
            <a href="https://github.com/shifat-manjum" target="_blank" rel="noopener noreferrer" class="hover:text-emerald-600">Developer (Shifat Manjum)</a>
          </div>
        </footer>
      </div>
    `;

    // 3. Assemble complete pre-rendered page
    let pageHtml = baseHtml;

    // Update html lang
    pageHtml = pageHtml.replace(/<html lang="[^"]*"/, `<html lang="${lang}"`);

    // Replace <title>
    pageHtml = pageHtml.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(route.metaTitle)}</title>`);

    // Replace meta title & description
    pageHtml = pageHtml.replace(/<meta name="title" content="[^"]*"/, `<meta name="title" content="${escapeHtml(route.metaTitle)}"`);
    pageHtml = pageHtml.replace(/<meta name="description" content="[^"]*"/, `<meta name="description" content="${escapeHtml(route.metaDescription)}"`);

    // Replace canonical
    pageHtml = pageHtml.replace(/<link rel="canonical" href="[^"]*"/, `<link rel="canonical" href="${route.canonical}"`);

    // Replace OpenGraph title & desc
    pageHtml = pageHtml.replace(/<meta property="og:title" content="[^"]*"/, `<meta property="og:title" content="${escapeHtml(route.metaTitle)}"`);
    pageHtml = pageHtml.replace(/<meta property="og:description" content="[^"]*"/, `<meta property="og:description" content="${escapeHtml(route.metaDescription)}"`);
    pageHtml = pageHtml.replace(/<meta property="og:url" content="[^"]*"/, `<meta property="og:url" content="${route.canonical}"`);

    // Update hreflang tags
    const hreflangTags = `
    <link rel="alternate" hreflang="it" href="${route.hreflang.it}" />
    <link rel="alternate" hreflang="de" href="${route.hreflang.de}" />
    ${route.hreflang.en ? `<link rel="alternate" hreflang="en" href="${route.hreflang.en}" />` : ''}
    <link rel="alternate" hreflang="x-default" href="${route.hreflang.en || route.hreflang.it}" />`;

    // Replace the old hreflang block or inject before </head>
    pageHtml = pageHtml.replace(/<!-- Multi-Language Hreflang [\s\S]*?<!-- Open Graph/, `${hreflangTags}\n\n    <!-- Open Graph`);

    // Inject JSON-LD right before </head>
    pageHtml = pageHtml.replace('</head>', `${jsonLdBlock}\n  </head>`);

    // Inject semantic pre-rendered HTML inside <div id="root"></div>
    pageHtml = pageHtml.replace('<div id="root"></div>', `<div id="root">${semanticHtml}</div>`);

    // Write file to dist/<slug>/index.html
    const targetDir = path.join(distDir, slug);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    fs.writeFileSync(path.join(targetDir, 'index.html'), pageHtml, 'utf8');
    generatedCount++;
  }

  console.log(`✅ Pre-rendered ${generatedCount} static HTML pages successfully!`);

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
      itUrls.push(urlEntry); // Included in general sitemap for mypdftools.it
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

  console.log(`✅ sitemap-it.xml created with ${itUrls.length} Italian & Global URLs!`);
  console.log(`✅ sitemap-de.xml created with ${deUrls.length} German URLs!`);
  console.log(`✅ sitemap-en.xml created with ${enUrls.length} English URLs!`);

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
  console.log('✅ robots.txt updated with English sitemap.');
}

runPrerender().catch((err) => {
  console.error('Fatal prerender error:', err);
  process.exit(1);
});
