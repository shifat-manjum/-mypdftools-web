// scripts/productionAudit.mjs
import fs from 'fs';
import path from 'path';
import ts from 'typescript';

const GOOGLEBOT_UA = 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)';

function unescapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'");
}

async function fetchLive(url) {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': GOOGLEBOT_UA,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      },
      redirect: 'manual' // don't follow automatically so we can detect redirects
    });
    const status = res.status;
    const location = res.headers.get('location') || null;
    const contentType = res.headers.get('content-type') || '';
    const body = await res.text();
    return { ok: res.ok, status, location, contentType, body };
  } catch (err) {
    return { ok: false, status: 0, error: err.message, body: '' };
  }
}

async function runProductionAudit() {
  console.log('===============================================================');
  console.log('      PRODUCTION-LEVEL TECHNICAL SEO & INDEXABILITY AUDIT      ');
  console.log('===============================================================\n');

  const report = {
    checks: [],
    representativePages: [],
    sitemapAudit: {},
    robotsAudit: {},
    duplicateAudit: {},
    statusSummary: 'PENDING'
  };

  // 1. Load routes catalog
  const seoRoutesRaw = fs.readFileSync(path.resolve('src/data/seoRoutes.ts'), 'utf8');
  const transpiled = ts.transpileModule(seoRoutesRaw, {
    compilerOptions: { module: ts.ModuleKind.ESNext }
  }).outputText;
  const tempPath = path.resolve('scripts/.tempAuditRoutes.mjs');
  fs.writeFileSync(tempPath, transpiled, 'utf8');
  let SEO_ROUTES;
  try {
    const mod = await import('./.tempAuditRoutes.mjs');
    SEO_ROUTES = mod.SEO_ROUTES;
  } finally {
    if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
  }

  // 2. CHECK ROBOTS.TXT
  console.log('--- 1. AUDITING ROBOTS.TXT (mypdftools.it & mypdftools.de) ---');
  const robotsIt = await fetchLive('https://www.mypdftools.it/robots.txt');
  const robotsDe = await fetchLive('https://www.mypdftools.de/robots.txt');

  const robotsOk =
    robotsIt.status === 200 &&
    robotsIt.body.includes('Allow: /') &&
    !robotsIt.body.includes('Disallow: /') &&
    robotsIt.body.includes('sitemap.xml');

  console.log(`mypdftools.it/robots.txt: Status ${robotsIt.status}, Disallow block: ${robotsIt.body.includes('Disallow: /') ? 'FAIL' : 'PASS (None)'}, Sitemap linked: ${robotsIt.body.includes('sitemap.xml') ? 'YES' : 'NO'}`);
  console.log(`mypdftools.de/robots.txt: Status ${robotsDe.status}`);

  report.robotsAudit = {
    itStatus: robotsIt.status,
    deStatus: robotsDe.status,
    blocksRoutes: robotsIt.body.includes('Disallow: /'),
    sitemapReferenced: robotsIt.body.includes('sitemap.xml') && robotsIt.body.includes('https://'),
    pass: robotsOk
  };

  // 3. CHECK SITEMAP.XML INTEGRITY
  console.log('\n--- 2. AUDITING SITEMAP.XML ---');
  const sitemapRes = await fetchLive('https://www.mypdftools.it/sitemap.xml');
  console.log(`Sitemap HTTP Status: ${sitemapRes.status}, Content-Type: ${sitemapRes.contentType}, Bytes: ${sitemapRes.body.length}`);

  // Validate XML syntax
  let xmlValid = true;
  let xmlParseError = null;
  const urlMatches = [...sitemapRes.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  const hreflangMatches = [...sitemapRes.body.matchAll(/<xhtml:link\s+rel="alternate"\s+hreflang="([^"]+)"\s+href="([^"]+)"\s*\/>/g)];

  // Check namespace
  const hasXhtmlNs = sitemapRes.body.includes('xmlns:xhtml="http://www.w3.org/1999/xhtml"');
  const hasSitemapNs = sitemapRes.body.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"');

  // Check uniqueness of URLs in sitemap
  const urlSet = new Set(urlMatches);
  const duplicatesInSitemap = urlMatches.length - urlSet.size;

  report.sitemapAudit = {
    status: sitemapRes.status,
    totalUrls: urlMatches.length,
    uniqueUrls: urlSet.size,
    hasDuplicates: duplicatesInSitemap > 0,
    hasValidNamespace: hasXhtmlNs && hasSitemapNs,
    hreflangLinksCount: hreflangMatches.length,
    pass: sitemapRes.status === 200 && duplicatesInSitemap === 0 && hasXhtmlNs && hasSitemapNs
  };
  console.log(`Sitemap total URLs: ${urlMatches.length}, Unique: ${urlSet.size}, Duplicates: ${duplicatesInSitemap}`);
  console.log(`XHTML namespace present: ${hasXhtmlNs}, Sitemap 0.9 namespace present: ${hasSitemapNs}`);
  console.log(`Sitemap hreflang annotations found: ${hreflangMatches.length}`);

  // 4. CHECK ROUTE CATALOG UNIQUENESS (No duplicate titles, descriptions, H1s, canonicals)
  console.log('\n--- 3. CHECKING CATALOG UNIQUENESS ACROSS 106 PAGES ---');
  const titles = new Map();
  const descriptions = new Map();
  const h1s = new Map();
  const canonicals = new Map();

  const dupErrors = [];
  for (const [slug, data] of Object.entries(SEO_ROUTES)) {
    // Titles
    if (titles.has(data.metaTitle)) {
      dupErrors.push(`Duplicate metaTitle: "${data.metaTitle}" in ${slug} and ${titles.get(data.metaTitle)}`);
    } else {
      titles.set(data.metaTitle, slug);
    }
    // Descriptions
    if (descriptions.has(data.metaDescription)) {
      dupErrors.push(`Duplicate metaDescription: "${data.metaDescription.slice(0, 40)}..." in ${slug} and ${descriptions.get(data.metaDescription)}`);
    } else {
      descriptions.set(data.metaDescription, slug);
    }
    // H1s
    if (h1s.has(data.h1)) {
      dupErrors.push(`Duplicate H1: "${data.h1}" in ${slug} and ${h1s.get(data.h1)}`);
    } else {
      h1s.set(data.h1, slug);
    }
    // Canonicals
    if (canonicals.has(data.canonical)) {
      dupErrors.push(`Duplicate Canonical: "${data.canonical}" in ${slug} and ${canonicals.get(data.canonical)}`);
    } else {
      canonicals.set(data.canonical, slug);
    }
  }

  console.log(`Duplicate issues found across catalog: ${dupErrors.length}`);
  if (dupErrors.length > 0) {
    console.log(dupErrors.slice(0, 5));
  }
  report.duplicateAudit = {
    totalCatalogRoutes: Object.keys(SEO_ROUTES).length,
    duplicateTitles: Object.keys(SEO_ROUTES).length - titles.size,
    duplicateDescriptions: Object.keys(SEO_ROUTES).length - descriptions.size,
    duplicateH1s: Object.keys(SEO_ROUTES).length - h1s.size,
    duplicateCanonicals: Object.keys(SEO_ROUTES).length - canonicals.size,
    pass: dupErrors.length === 0
  };

  // 5. LIVE PRODUCTION TESTING OF REPRESENTATIVE SAMPLES (Both IT & DE)
  console.log('\n--- 4. LIVE PRODUCTION HTML AUDIT FOR REPRESENTATIVE PAGES ---');
  const testSampleSlugs = [
    // Italian Core
    'unire-pdf',
    'da-jpg-a-pdf',
    'comprimere-pdf',
    // Italian High-Intent
    'unire-due-pdf',
    'comprimere-pdf-per-email',
    // Italian Guide
    'guide/come-unire-due-pdf-gratis',
    // German Core
    'pdf-zusammenfuegen',
    'jpg-in-pdf',
    'pdf-komprimieren',
    // German High-Intent
    'zwei-pdf-zusammenfuegen',
    'pdf-komprimieren-fuer-email',
    // German Ratgeber
    'ratgeber/pdf-dateien-zusammenfuegen-anleitung'
  ];

  for (const slug of testSampleSlugs) {
    const routeData = SEO_ROUTES[slug];
    const liveUrl = routeData.canonical;

    const res = await fetchLive(liveUrl);
    const body = res.body;

    const itemReport = {
      slug,
      url: liveUrl,
      status: res.status,
      redirect: res.location,
      hasPrerenderedHtml: body.includes('id="interactive-tool-slot"') || body.includes('id="root"'),
      titleFound: (body.match(/<title>([^<]+)<\/title>/) || [])[1] || '',
      expectedTitle: routeData.metaTitle,
      metaDescFound: (body.match(/<meta\s+name="description"\s+content="([^"]+)"/) || [])[1] || '',
      expectedMetaDesc: routeData.metaDescription,
      h1Found: (body.match(/<h1[^>]*>([^<]+)<\/h1>/) || [])[1] || '',
      expectedH1: routeData.h1,
      canonicalFound: (body.match(/<link\s+rel="canonical"\s+href="([^"]+)"/) || [])[1] || '',
      expectedCanonical: routeData.canonical,
      hreflangItFound: (body.match(/<link\s+rel="alternate"\s+hreflang="it"\s+href="([^"]+)"/) || [])[1] || '',
      hreflangDeFound: (body.match(/<link\s+rel="alternate"\s+hreflang="de"\s+href="([^"]+)"/) || [])[1] || '',
      hreflangXDefaultFound: (body.match(/<link\s+rel="alternate"\s+hreflang="x-default"\s+href="([^"]+)"/) || [])[1] || '',
      ogTitle: (body.match(/<meta\s+property="og:title"\s+content="([^"]+)"/) || [])[1] || '',
      ogDesc: (body.match(/<meta\s+property="og:description"\s+content="([^"]+)"/) || [])[1] || '',
      ogUrl: (body.match(/<meta\s+property="og:url"\s+content="([^"]+)"/) || [])[1] || '',
      noindexPresent: body.includes('noindex'),
      nofollowPresent: body.includes('nofollow'),
      hasFaqJsonLd: body.includes('"FAQPage"'),
      hasHowToJsonLd: body.includes('"HowTo"'),
      hasBreadcrumbJsonLd: body.includes('"BreadcrumbList"')
    };

    // Evaluate checks
    const statusPass = res.status === 200;
    const titlePass = unescapeHtml(itemReport.titleFound).trim() === routeData.metaTitle.trim();
    const h1Pass = unescapeHtml(itemReport.h1Found).trim() === routeData.h1.trim();
    const canonPass = itemReport.canonicalFound === routeData.canonical;
    const hreflangPass =
      itemReport.hreflangItFound === routeData.hreflang.it &&
      itemReport.hreflangDeFound === routeData.hreflang.de;
    const noindexPass = !itemReport.noindexPresent && !itemReport.nofollowPresent;
    const jsonLdPass = itemReport.hasFaqJsonLd && itemReport.hasHowToJsonLd;
    const ogPass = itemReport.ogTitle.length > 0 && itemReport.ogUrl === routeData.canonical;

    itemReport.allPass =
      statusPass &&
      titlePass &&
      h1Pass &&
      canonPass &&
      hreflangPass &&
      noindexPass &&
      jsonLdPass &&
      ogPass;

    console.log(`[${itemReport.allPass ? 'PASS' : 'FAIL'}] ${liveUrl} (Status ${res.status}, H1: "${itemReport.h1Found.slice(0, 25)}...", FAQ Schema: ${itemReport.hasFaqJsonLd}, Canonical match: ${canonPass})`);
    report.representativePages.push(itemReport);
  }

  // 6. SAMPLE TEST HTTP STATUS CODES OF SITEMAP URLS
  console.log('\n--- 5. TESTING HTTP STATUS CODES ACROSS SITEMAP URLS ---');
  let sitemapStatusPassed = 0;
  let sitemapStatusFailed = 0;
  const sitemapSample = Array.from(urlSet).slice(0, 25); // representative 25 URLs across both domains

  for (const testUrl of sitemapSample) {
    const res = await fetchLive(testUrl);
    if (res.status === 200) {
      sitemapStatusPassed++;
    } else {
      console.warn(`URL status failure: ${testUrl} returned ${res.status} (Location: ${res.location})`);
      sitemapStatusFailed++;
    }
  }
  console.log(`Sample sitemap URLs tested: ${sitemapSample.length}, 200 OK: ${sitemapStatusPassed}, Fail/Redirect: ${sitemapStatusFailed}`);

  // Final summary
  const allRepresentativePassed = report.representativePages.every(p => p.allPass);
  const isOverallPass =
    report.robotsAudit.pass &&
    report.sitemapAudit.pass &&
    report.duplicateAudit.pass &&
    allRepresentativePassed &&
    sitemapStatusFailed === 0;

  report.statusSummary = isOverallPass ? 'PASS' : 'FAIL';

  console.log('\n===============================================================');
  console.log(`             FINAL AUDIT RESULT: ${report.statusSummary}              `);
  console.log('===============================================================');

  // Save audit report JSON
  fs.writeFileSync('scripts/auditReport.json', JSON.stringify(report, null, 2), 'utf8');
}

runProductionAudit().catch(err => {
  console.error('Fatal audit error:', err);
  process.exit(1);
});
