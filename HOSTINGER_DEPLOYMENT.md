# How to Launch FreeConvert on Hostinger & Monetize with Google AdSense

This guide walks you step-by-step through buying your domain on Hostinger, uploading your FreeConvert website, and setting up Google AdSense to start earning money from visitors.

---

## Step 1: Get Your Domain & Hosting on Hostinger

1. Go to [Hostinger.com](https://www.hostinger.com).
2. Choose **Web Hosting** (the *Premium* or *Business* plan comes with a **FREE Domain Name** for 1 year).
3. Search for your domain name, for example:
   - `freeconvertpdf.com`
   - `freeconvert.app`
   - `freeconvert.tools`
   - `freeconvert.online`
4. Complete registration and open your **Hostinger hPanel**.

---

## Step 2: Build the Production Files

In your project folder (`d:\pdf project`), run:

```bash
npm run build
```

This compiles all React code, Tailwind styles, and PDF engines into the **`dist/`** folder.

---

## Step 3: Upload to Hostinger

### Option A: Via Hostinger File Manager (Easiest — Takes 2 Minutes)
1. In your **Hostinger hPanel**, click **Websites** &rarr; click **Manage** next to your domain.
2. In the left menu, search for **File Manager**.
3. Open the **`public_html`** directory.
4. Delete default `default.php` placeholder file if present.
5. Upload all the files and folders located inside your **`d:\pdf project\dist`** folder into `public_html`:
   - `index.html`
   - `pdf.worker.min.js`
   - `assets/` (folder containing the compiled CSS & JS)
6. **Done!** Visit `https://yourdomain.com` in your browser. Your site is live!

---

## Step 4: Configure HTTPS (Free SSL)
In Hostinger hPanel:
1. Navigate to **Security** &rarr; **SSL**.
2. Ensure **Lifetime Free SSL** is active so your site displays the secure padlock `https://`.

---

## Step 5: How to Apply for Google AdSense & Show Ads

Once your site is live on your domain:

1. **Sign Up for Google AdSense**:
   - Go to [Google AdSense](https://adsense.google.com).
   - Sign in with your Google account and enter your website URL (e.g. `https://yourdomain.com`).
2. **Add the AdSense verification code**:
   - Google will give you a script tag like:
     ```html
     <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossorigin="anonymous"></script>
     ```
   - Paste this inside your `index.html` within the `<head>` tags.
3. **Wait for Approval**:
   - Google usually reviews sites in 2 to 7 days. Because your site has rich text, FAQ guides, and a clean Privacy Policy, approval chances are very high!
4. **Turn on Ads in FreeConvert**:
   - Open `src/config/ads.ts`.
   - Change `enabled: false` to `enabled: true`.
   - Paste your `adClient: 'ca-pub-XXXXXXXXXXXXXXXX'`.
   - Re-run `npm run build` and upload the updated files.
   - **Your site will now display live ads and pay you directly into your bank account!**

