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

async function runPrerender() {
  console.log('🚀 Starting SSG Prerender & XML Sitemap Generation...');

  const distDir = path.resolve('dist');
  const indexHtmlPath = path.join(distDir, 'index.html');

  if (!fs.existsSync(indexHtmlPath)) {
    console.error('❌ dist/index.html not found! Run "vite build" first.');
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(indexHtmlPath, 'utf8');

  // Extract SEO_ROUTES from src/data/seoRoutes.ts
  const seoRoutesFile = fs.readFileSync(path.resolve('src/data/seoRoutes.ts'), 'utf8');

  const tempScriptPath = path.resolve('scripts/.tempSeoRoutes.mjs');
  const transpileResult = ts.transpileModule(seoRoutesFile, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 }
  });

  fs.writeFileSync(tempScriptPath, transpileResult.outputText, 'utf8');

  let SEO_ROUTES = {};
  try {
    const imported = await import('./.tempSeoRoutes.mjs');
    SEO_ROUTES = imported.SEO_ROUTES;
  } catch (err) {
    console.error('Failed to import SEO_ROUTES:', err);
    process.exit(1);
  } finally {
    if (fs.existsSync(tempScriptPath)) fs.unlinkSync(tempScriptPath);
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
        <footer class="w-full bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
          <p>© ${new Date().getFullYear()} MyPdfTools (mypdftools.it • mypdftools.de). All rights reserved.</p>
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
    <link rel="alternate" hreflang="x-default" href="${route.hreflang.it}" />`;

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

  // 4. Generate Master XML Sitemap with Bidirectional Hreflang
  console.log('🗺️ Generating comprehensive XML Sitemap...');
  const sitemapUrls = [];

  // Homepages
  sitemapUrls.push(`
  <url>
    <loc>https://www.mypdftools.it/</loc>
    <xhtml:link rel="alternate" hreflang="it" href="https://www.mypdftools.it/" />
    <xhtml:link rel="alternate" hreflang="de" href="https://www.mypdftools.de/" />
    <xhtml:link rel="alternate" hreflang="x-default" href="https://www.mypdftools.it/" />
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.mypdftools.de/</loc>
    <xhtml:link rel="alternate" hreflang="it" href="https://www.mypdftools.it/" />
    <xhtml:link rel="alternate" hreflang="de" href="https://www.mypdftools.de/" />
    <xhtml:link rel="alternate" hreflang="x-default" href="https://www.mypdftools.it/" />
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`);

  // Each distinct route
  for (const slug of routeKeys) {
    const r = SEO_ROUTES[slug];
    const isPriority = !slug.includes('/') && ['unire-pdf', 'pdf-zusammenfuegen', 'da-jpg-a-pdf', 'jpg-in-pdf', 'comprimere-pdf', 'pdf-komprimieren', 'da-word-a-pdf', 'word-in-pdf'].includes(slug);
    const priority = isPriority ? '0.95' : slug.includes('/') ? '0.80' : '0.88';

    sitemapUrls.push(`
  <url>
    <loc>${r.canonical}</loc>
    <xhtml:link rel="alternate" hreflang="it" href="${r.hreflang.it}" />
    <xhtml:link rel="alternate" hreflang="de" href="${r.hreflang.de}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${r.hreflang.it}" />
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`);
  }

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${sitemapUrls.join('')}
</urlset>
`;

  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapXml, 'utf8');
  fs.writeFileSync(path.resolve('public/sitemap.xml'), sitemapXml, 'utf8');
  console.log(`✅ Sitemap created with ${sitemapUrls.length} fully annotated URLs!`);

  // 5. Generate / Update robots.txt
  const robotsTxt = `User-agent: *
Allow: /

# Sitemap definitions for Google Search Console & Bing Webmaster
Sitemap: https://www.mypdftools.it/sitemap.xml
Sitemap: https://www.mypdftools.de/sitemap.xml

# LLM Crawler Guidance
# llms.txt: https://www.mypdftools.it/llms.txt
`;
  fs.writeFileSync(path.join(distDir, 'robots.txt'), robotsTxt, 'utf8');
  fs.writeFileSync(path.resolve('public/robots.txt'), robotsTxt, 'utf8');
  console.log('✅ robots.txt updated.');
}

runPrerender().catch((err) => {
  console.error('Fatal prerender error:', err);
  process.exit(1);
});
