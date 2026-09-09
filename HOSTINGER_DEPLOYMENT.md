# How to Launch MyPdfTools on Hostinger & Rank on Google Search

This guide walks you step-by-step through buying your domain on Hostinger (`mypdftools.it` / `mypdftools.de`), uploading your **MyPdfTools** production files, setting up Google Search Console for ranking, and monetizing with Google AdSense.

---

## Step 1: Get Your Domain & Hosting on Hostinger

1. Go to [Hostinger.com](https://www.hostinger.com) (or [Hostinger.it](https://www.hostinger.it) / [Hostinger.de](https://www.hostinger.de)).
2. Choose **Web Hosting** (the *Premium* or *Business* plan includes a **FREE Domain Name** for 1 year).
3. Search for and register your domain name:
   - Primary: `mypdftools.it` (Italian focus)
   - Secondary / Alias: `mypdftools.de` (German market)
4. Finish checkout and access your **Hostinger hPanel**.

> [!TIP]
> If you own both `mypdftools.it` and `mypdftools.de`, you can host both on the same Hostinger account. You can set `mypdftools.de` to point to the same folder or redirect it with the German language URL!

---

## Step 2: Build the Production Files

Your project has already been compiled into `dist/`. Whenever you make new changes in your project folder (`d:\pdf project`), simply run:

```bash
npm run build
```

This generates all optimized assets into the **`d:\pdf project\dist`** folder:
- `.htaccess` (Pre-configured for LiteSpeed/Apache SPA routing, Gzip/Brotli compression, and cache headers)
- `robots.txt` (Permits Googlebot and links directly to your sitemap)
- `sitemap.xml` (Lists all tools and multi-lingual alternate URLs for Google)
- `index.html` (Includes Open Graph, Twitter Cards, and schema.org structured JSON-LD data)
- `pdf.worker.min.js` (Local PDF engine for zero-server client processing)
- `assets/` (Minified CSS and JavaScript bundle)

---

## Step 3: Upload to Hostinger File Manager

1. In your **Hostinger hPanel**, click **Websites** &rarr; click **Manage** next to your domain.
2. In the left sidebar or search bar, open **File Manager** (Files &rarr; File Manager).
3. Open the **`public_html`** folder.
4. Delete any default placeholder files (such as `default.php`).
5. **Upload the contents of `d:\pdf project\dist\`** directly into `public_html`:
   - `.htaccess` *(Make sure "Show Hidden Files" is checked in Hostinger File Manager settings)*
   - `robots.txt`
   - `sitemap.xml`
   - `index.html`
   - `pdf.worker.min.js`
   - `assets/` folder
6. **That's it!** Visit `https://www.mypdftools.it` in your browser. Your site is 100% operational!

---

## Step 4: Configure Free SSL (HTTPS)

1. In **hPanel**, go to **Security** &rarr; **SSL**.
2. Make sure **Lifetime Free SSL** is installed and active for your domain.
3. Toggle on **Enforce HTTPS** (our `.htaccess` also automatically forces HTTPS).

---

## Step 5: Submit to Google Search Console (Get Ranked on Google)

To start ranking when users search for *"MyPdfTools"*, *"unisci pdf gratis"*, *"pdf in jpg"*, or *"pdf teilen"*:

1. Open [Google Search Console](https://search.google.com/search-console).
2. Sign in with your Google account.
3. Click **Add Property** and enter your domain:
   - URL prefix: `https://www.mypdftools.it/`
4. **Verification**: Choose **HTML tag** or **Upload HTML file** (or verify via Hostinger DNS TXT record).
5. Once verified, go to **Sitemaps** in the left menu.
6. Enter `sitemap.xml` in the "Add a new sitemap" box and click **Submit**.
7. Go to **URL Inspection**, enter `https://www.mypdftools.it/`, and click **Request Indexing**.
   - Googlebot will crawl your page, read the JSON-LD schema, and begin indexing your tools for search results in Italy, Germany, and globally.

---

## Step 6: Activate Google AdSense & Monetize

Once your site is live and attracting visitors:

1. Go to [Google AdSense](https://adsense.google.com) and register your domain `mypdftools.it`.
2. AdSense will provide your publisher ID: `ca-pub-XXXXXXXXXXXXXXXX`.
3. Open `src/config/ads.ts` in your codebase:
   ```typescript
   export const ADS_CONFIG = {
     enabled: true, // Change to true
     adClient: 'ca-pub-XXXXXXXXXXXXXXXX', // Your publisher ID
     slots: {
       homeBanner: 'XXXXXXXXXX',
       toolTop: 'XXXXXXXXXX',
       toolBottom: 'XXXXXXXXXX',
       sidebar: 'XXXXXXXXXX',
     },
   };
   ```
4. Also add the AdSense script tag to `index.html` within `<head>`:
   ```html
   <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossorigin="anonymous"></script>
   ```
5. Run `npm run build` and re-upload the updated files to `public_html`.
6. Live ads will now display around the PDF tools, generating revenue directly to your bank account!

