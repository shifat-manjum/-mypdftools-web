// scripts/checkLive.mjs
async function testUrl(url) {
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)' } });
    console.log(`\n🌐 Checking Live: ${url}`);
    console.log(`Status: ${res.status} ${res.statusText}`);
    const text = await res.text();
    console.log(`Payload Size: ${text.length} bytes`);
    console.log(`Contains <h1>: ${text.includes('<h1')}`);
    console.log(`Contains FAQPage schema: ${text.includes('FAQPage')}`);
    console.log(`Contains HowTo schema: ${text.includes('HowTo')}`);
    console.log(`Contains Breadcrumbs: ${text.includes('BreadcrumbList')}`);
    console.log(`Contains noindex: ${text.includes('noindex') ? '❌ YES' : '✅ NO'}`);
  } catch (err) {
    console.error(`Error fetching ${url}:`, err.message);
  }
}

async function main() {
  await testUrl('https://www.mypdftools.it/unire-pdf');
  await testUrl('https://www.mypdftools.de/pdf-zusammenfuegen');
  await testUrl('https://www.mypdftools.it/sitemap.xml');
}

main();
