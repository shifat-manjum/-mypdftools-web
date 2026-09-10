// scripts/testAllSitemapUrls.mjs
import fs from 'fs';
import path from 'path';

const GOOGLEBOT_UA = 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)';

async function testAll() {
  console.log('Testing HTTP response of ALL URLs in sitemap.xml against live production...\n');
  const sitemapXml = fs.readFileSync(path.resolve('dist/sitemap.xml'), 'utf8');
  const urls = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);

  console.log(`Total URLs to test: ${urls.length}`);

  let okCount = 0;
  const errors = [];

  // Batch requests with concurrency of 10
  const concurrency = 10;
  for (let i = 0; i < urls.length; i += concurrency) {
    const batch = urls.slice(i, i + concurrency);
    const promises = batch.map(async (url) => {
      try {
        const res = await fetch(url, {
          headers: { 'User-Agent': GOOGLEBOT_UA },
          redirect: 'manual'
        });
        if (res.status === 200) {
          okCount++;
        } else {
          errors.push({ url, status: res.status, location: res.headers.get('location') });
        }
      } catch (err) {
        errors.push({ url, status: 0, error: err.message });
      }
    });
    await Promise.all(promises);
  }

  console.log(`\nHTTP 200 OK: ${okCount} / ${urls.length}`);
  if (errors.length > 0) {
    console.error(`❌ Errors:`, errors);
  } else {
    console.log(`🎉 ALL ${urls.length} SITEMAP URLS RETURN HTTP 200 OK IN PRODUCTION WITHOUT REDIRECTS!`);
  }
}

testAll().catch(console.error);

