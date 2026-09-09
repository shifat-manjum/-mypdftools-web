# MyPdfTools — Privacy-First PDF Suite

A modern, high-performance web application recreating and improving upon the classic PDF tools suite. Built for **www.mypdftools.it** and **www.mypdftools.de**, featuring **100% Client-Side In-Browser Processing (Zero Server Uploads)**, multi-language support (Italian default, English, German), and an ultra-clean floating UI inspired by the Zentixx project.

---

## ✨ Key Features

- **🛡️ 100% Client-Side Privacy**: Built with `pdf-lib` and Mozilla's `pdfjs-dist`. Files never leave the user's computer or browser RAM. Safe for confidential tax records, bank statements, and IDs.
- **🌍 3 Language Options**: Full localization in **Italian (Default)**, **English**, and **German** with an instant switcher in the navbar.
- **🎨 Elevated Zentixx UI**: Deep floating box shadows (`shadow-[0_10px_30px_-5px_rgba(0,0,0,0.07)]` and hover `shadow-[0_25px_50px_-12px_rgba(16,185,129,0.18)]`), subtle ambient glowing background gradients, and smooth 3D hover interactions.
- **⚡ SEO Landing Pages**: Dedicated routes for each tool (`/#/jpg-to-pdf`, `/#/pdf-to-jpg`, etc.) with tutorials and FAQ schemas to capture search engine traffic.
- **💰 Monetization Ready**: Pre-built slots for Google AdSense with configurable publisher settings.

---

## 🚀 Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

- Local URL: [http://localhost:3000](http://localhost:3000)
- Mobile Network URL: `http://192.168.0.110:3000`

---

## 📦 Production Build

```bash
npm run build
```

The output is bundled in `dist/` ready to upload to Hostinger or any static host.
