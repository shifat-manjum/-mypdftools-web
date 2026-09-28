# Chrome Web Store Listing — MyPdfTools Capture

> Last Updated: 2026-09-29  
> Target Version: 1.0.1  
> Package Location: `extension/`  
> Store Status: Ready for Submission  

---

## Store Listing (Copy & Paste to Chrome Developer Dashboard)

### Extension Name [REQUIRED]
```text
MyPdfTools Capture — Full Page Screenshot & PDF
```
*(48 characters / 75 max)*

---

### Short Description [REQUIRED]
```text
Capture clean full-page screenshots, redact sensitive text, and export to PDF or high-res PNG in one click.
```
*(106 characters / 132 max)*

---

### Detailed Description [REQUIRED]
*(Copy and paste the plain text below into the Developer Dashboard)*

```text
Capture entire webpages from top to bottom with one click. Save high-resolution full-page screenshots as clean PDF documents or PNG images with zero watermarks and complete privacy.

Whether you need to capture long research articles, receipt confirmations, emails, dashboard reports, or design inspiration, MyPdfTools Capture scrolls the entire page and stitches everything seamlessly.

KEY FEATURES
• Full Page Capture — Automatically scrolls down the entire webpage and stitches all content from top to bottom without missing lines or white gaps.
• Desktop & Mobile Viewports — Capture standard desktop pages or simulate mobile viewports (390px iPhone width) to test responsive websites.
• Visible Screen Capture — Quickly snap only what is currently visible on your monitor.
• Privacy Redaction Tool — Easily click and drag to blur or black out sensitive personal details, bank numbers, or client emails before saving or sharing.
• 1-Click Clipboard Copy — Copy full-resolution screenshots directly to your clipboard to paste instantly into Slack, WhatsApp, Gmail, Figma, or Word.
• Export to PDF & PNG — Download crisp PNG images or convert full web documents into clean, printable PDFs.
• Studio Preview Workspace — Inspect your capture with interactive zoom controls (25% birds-eye view, Fit to Screen, or 100% pixel-perfect view).
• 100% Private & Local — All screen capture stitching and image processing runs entirely on your computer. Zero server uploads.

HOW TO USE
1. Navigate to any webpage you want to capture.
2. Click the MyPdfTools Capture icon in your toolbar (or press Alt+Shift+P).
3. Select "Full Page (Desktop)" or "Visible Screen Only".
4. Watch the progress indicator as the page smoothly scrolls and captures.
5. In the Preview Studio, inspect your screenshot, redact any sensitive text, and click "Download PNG", "PDF", or "Copy".

PRIVACY & SECURITY
Your privacy is our highest priority. MyPdfTools Capture runs 100% client-side in your browser. We never track your browsing history, we do not collect any personal data, and your screenshots are never transmitted to any external server.

KEYBOARD SHORTCUTS
• Alt + Shift + P — Instant Full Page Screenshot capture.

SUPPORT & FEEDBACK
Need assistance, found an issue, or want to suggest a new feature? 
• Email: khshifatmanjum@gmail.com
• Website: https://www.mypdftools.it
```

---

### Category [REQUIRED]
```text
Productivity
```

---

### Single Purpose [REQUIRED]
```text
Captures full-page screenshots of entire web documents and exports them as high-resolution images or PDF files.
```

---

### Primary Language [REQUIRED]
```text
English
```

---

## Permissions Justification [CRITICAL FOR GOOGLE APPROVAL]

| Permission | Type | Exact Justification for Chrome Web Store Reviewer |
| :--- | :--- | :--- |
| `activeTab` | permissions | Needed to capture visible slices of the active tab only when the user explicitly clicks the extension popup or presses the Alt+Shift+P keyboard shortcut. The extension never monitors inactive tabs. |
| `scripting` | permissions | Required to execute the document scroller script on the active tab to calculate total page height, handle scroll positioning, and capture below-the-fold content. |
| `storage` | permissions | Used exclusively to temporarily pass captured image slices in memory from the background service worker to the local viewer studio tab (`viewer/viewer.html`). No data is sent off the user's computer. |

---

## Privacy & Data Use Disclosure

### Data Collection
- **Does the extension collect user data?** **NO**
- All screen capturing, canvas rendering, redaction, and PDF generation run 100% locally on the user's machine.

| Data Type | Collected? | Transmitted Off-Device? | Purpose | Shared with 3rd Parties? |
| :--- | :--- | :--- | :--- | :--- |
| Personally identifiable info | **No** | No | None | No |
| Health info | **No** | No | None | No |
| Financial info | **No** | No | None | No |
| Authentication info | **No** | No | None | No |
| Personal communications | **No** | No | None | No |
| Location | **No** | No | None | No |
| Web history | **No** | No | None | No |
| User activity | **No** | No | None | No |
| Website content | **No** | No | None | No |

### Data Use Certifications (Check all 3 boxes in Dashboard)
- [x] **I certify that my extension does not sell user data to third parties.**
- [x] **I certify that my extension does not use or transfer user data for purposes unrelated to the extension's core functionality.**
- [x] **I certify that my extension does not use or transfer user data to determine creditworthiness or for lending purposes.**

---

## Privacy Policy URL [REQUIRED]
```text
https://www.mypdftools.it/extension-privacy.html
```
*(Live, public URL hosted on your domain with full GDPR/Chrome Web Store compliance)*

---

## Graphics & Asset Checklist

| Asset | Dimensions | Status | Location / Note |
| :--- | :--- | :--- | :--- |
| **Store Icon** [REQUIRED] | 128×128 PNG | ✅ Ready | `extension/icons/icon-128.png` |
| **Screenshot 1** [REQUIRED] | 1280×800 PNG | ✅ Ready to snap | Full page capture in action with top-right progress animation |
| **Screenshot 2** [RECOMMENDED] | 1280×800 PNG | ✅ Ready to snap | Clean Light Studio preview with 25% overview and PDF/PNG download buttons |
| **Screenshot 3** [RECOMMENDED] | 1280×800 PNG | ✅ Ready to snap | Privacy Redact blur tool hiding sensitive details |
| **Small Promo Tile** [RECOMMENDED] | 440×280 PNG | Optional | For featured placements on Chrome Web Store |
| **Marquee Promo Tile** | 1400×560 PNG | Optional | For top banner rotation on Chrome Web Store |

---

## Developer Contact & Support

- **Publisher Name:** MyPdfTools Team
- **Publisher Email:** `khshifatmanjum@gmail.com`
- **Homepage URL:** `https://www.mypdftools.it`
- **Support URL:** `https://www.mypdftools.it`
- **Distribution:** Public (All regions)

---

## How to Package the Extension for Upload (ZIP)

The Chrome Developer Dashboard requires a single `.zip` file containing only the extension files.

### Windows PowerShell 1-Click ZIP Command:
```powershell
Compress-Archive -Path "extension\*" -DestinationPath "mypdftools-capture-v1.0.0.zip" -Force
```

This creates `mypdftools-capture-v1.0.0.zip` ready to drag and drop into the Chrome Web Store Developer Dashboard.

---

## Version History

| Version | Date | Changes | Status |
| :--- | :--- | :--- | :--- |
| `1.0.0` | 2026-09-29 | Initial release: Full-page auto-scroll capture, deep container detection (Gmail, Dashboards, SPAs), top-right animated Pac-Man HUD, Light Studio preview with 25% default overview, privacy redaction, and 1-click PDF/PNG/Clipboard export. | Ready to Submit |
