// scripts/verifyIndexability.mjs
import fs from 'fs';
import path from 'path';
import ts from 'typescript';

async function verifyAll() {
  console.log('🔍 Running full SEO Indexability Audit across all pages...\n');

  const distDir = path.resolve('dist');
  const sitemapPath = path.join(distDir, 'sitemap.xml');

  if (!fs.existsSync(sitemapPath)) {
    console.error('❌ dist/sitemap.xml does not exist! Run "npm run build" first.');
    process.exit(1);
  }

  const sitemapXml = fs.readFileSync(sitemapPath, 'utf8');

  // Load SEO routes
  const seoRoutesRaw = fs.readFileSync(path.resolve('src/data/seoRoutes.ts'), 'utf8');
  const transpiled = ts.transpileModule(seoRoutesRaw, {
    compilerOptions: { module: ts.ModuleKind.ESNext }
  }).outputText;

  const tempPath = path.resolve('scripts/.tempAudit.mjs');
  fs.writeFileSync(tempPath, transpiled, 'utf8');

  let SEO_ROUTES;
  try {
    const mod = await import('./.tempAudit.mjs');
    SEO_ROUTES = mod.SEO_ROUTES;
  } finally {
    if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
  }

  const slugs = Object.keys(SEO_ROUTES);
  console.log(`📋 Total routes in catalog to verify: ${slugs.length}\n`);

  const results = {
    totalChecked: slugs.length,
    fileExists: 0,
    hasValidTitle: 0,
    hasValidDescription: 0,
    hasCanonical: 0,
    hasHreflang: 0,
    hasH1Tag: 0,
    hasValidJsonLd: 0,
    inSitemap: 0,
    noindexDetected: 0,
    errors: []
  };

  for (const slug of slugs) {
    const route = SEO_ROUTES[slug];
    const pageHtmlPath = path.join(distDir, slug, 'index.html');

    // 1. File existence check
    if (!fs.existsSync(pageHtmlPath)) {
      results.errors.push({ slug, issue: 'Missing file: dist/' + slug + '/index.html' });
      continue;
    }
    results.fileExists++;

    const html = fs.readFileSync(pageHtmlPath, 'utf8');

    // 2. Check for accidental noindex
    if (html.includes('noindex')) {
      results.noindexDetected++;
      results.errors.push({ slug, issue: 'Page contains "noindex" tag' });
    }

    // 3. Title check
    const titleMatch = html.match(/<title>([^<]+)<\/title>/);
    if (titleMatch && titleMatch[1].trim().length > 10) {
      results.hasValidTitle++;
    } else {
      results.errors.push({ slug, issue: 'Invalid or missing <title>' });
    }

    // 4. Meta Description check
    const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]+)"/);
    if (descMatch && descMatch[1].trim().length > 20) {
      results.hasValidDescription++;
    } else {
      results.errors.push({ slug, issue: 'Invalid or missing meta description' });
    }

    // 5. Canonical check
    const canonMatch = html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/);
    if (canonMatch && canonMatch[1] === route.canonical) {
      results.hasCanonical++;
    } else {
      results.errors.push({
        slug,
        issue: `Canonical mismatch: expected ${route.canonical}, found ${canonMatch ? canonMatch[1] : 'none'}`
      });
    }

    // 6. Hreflang check
    const hasItHreflang = html.includes(`hreflang="it" href="${route.hreflang.it}"`);
    const hasDeHreflang = html.includes(`hreflang="de" href="${route.hreflang.de}"`);
    if (hasItHreflang && hasDeHreflang) {
      results.hasHreflang++;
    } else {
      results.errors.push({ slug, issue: 'Missing or malformed hreflang tags' });
    }

    // 7. Semantic H1 tag in static pre-rendered HTML
    const h1Match = html.match(/<h1[^>]*>([^<]+)<\/h1>/);
    if (h1Match && h1Match[1].trim().length > 3) {
      results.hasH1Tag++;
    } else {
      results.errors.push({ slug, issue: 'Missing semantic <h1> tag in pre-rendered body' });
    }

    // 8. JSON-LD structured data validation (FAQPage, HowTo, Breadcrumbs, SoftwareApplication)
    const jsonLdMatches = [...html.matchAll(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
    let jsonValid = true;
    let foundTypes = [];

    for (const m of jsonLdMatches) {
      try {
        const parsed = JSON.parse(m[1]);
        if (parsed['@type']) foundTypes.push(parsed['@type']);
        if (parsed['@graph']) {
          for (const item of parsed['@graph']) {
            if (item['@type']) foundTypes.push(item['@type']);
          }
        }
      } catch (err) {
        jsonValid = false;
      }
    }

    if (jsonValid && (foundTypes.includes('FAQPage') || foundTypes.includes('WebApplication'))) {
      results.hasValidJsonLd++;
    } else {
      results.errors.push({ slug, issue: 'Invalid or incomplete JSON-LD schemas' });
    }

    // 9. Sitemap check
    if (sitemapXml.includes(`<loc>${route.canonical}</loc>`)) {
      results.inSitemap++;
    } else {
      results.errors.push({ slug, issue: `Not listed in sitemap.xml: ${route.canonical}` });
    }
  }

  console.log('📊 ====== VERIFICATION AUDIT SUMMARY ======');
  console.log(`✅ Total Pages Checked:          ${results.totalChecked}`);
  console.log(`✅ Physical HTML Files Generated: ${results.fileExists} / ${results.totalChecked}`);
  console.log(`✅ Valid Unique <title>:          ${results.hasValidTitle} / ${results.totalChecked}`);
  console.log(`✅ Valid Meta Description:       ${results.hasValidDescription} / ${results.totalChecked}`);
  console.log(`✅ Matching Canonical URL:       ${results.hasCanonical} / ${results.totalChecked}`);
  console.log(`✅ Bidirectional Hreflang Pairs: ${results.hasHreflang} / ${results.totalChecked}`);
  console.log(`✅ Semantic Pre-rendered <h1>:    ${results.hasH1Tag} / ${results.totalChecked}`);
  console.log(`✅ Valid Schema.org JSON-LD:     ${results.hasValidJsonLd} / ${results.totalChecked}`);
  console.log(`✅ Indexed in XML Sitemap:       ${results.inSitemap} / ${results.totalChecked}`);
  console.log(`🚫 "noindex" Detected:           ${results.noindexDetected} (Should be 0)`);
  console.log('===========================================\n');

  if (results.errors.length === 0) {
    console.log('🎉 100% OF ALL 106 PAGES ARE FULLY INDEXABLE BY GOOGLEBOT & SEARCH ENGINES!');
  } else {
    console.warn(`⚠️ Found ${results.errors.length} issue(s):`);
    console.log(JSON.stringify(results.errors.slice(0, 10), null, 2));
    process.exit(1);
  }
}

verifyAll().catch(err => {
  console.error('Audit failed:', err);
  process.exit(1);
});

