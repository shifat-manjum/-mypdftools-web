// scripts/generateEnglishRoutes.mjs
import fs from 'fs';
import path from 'path';

const ENGLISH_ROUTES = {
  'merge-pdf': {
    slug: 'merge-pdf',
    toolId: 'merge-pdf',
    lang: 'en',
    domain: 'mypdftools.it',
    h1: 'Merge PDF Online Free — 100% Private (No Uploads)',
    metaTitle: 'Merge PDF Online Free — Combine PDF Files In Your Browser',
    metaDescription: 'Combine multiple PDF files into one in seconds. 100% client-side privacy: your files are processed in browser memory and never uploaded to any server.',
    badge: '100% Private',
    intro: 'Combine two or more PDF documents into a single organized file in seconds. Built with WebAssembly, MyPdfTools merges contracts, invoices, and reports directly in your browser without uploading your sensitive data to third-party cloud servers.',
    steps: [
      { title: '1. Select PDF Files', desc: 'Drag and drop or browse two or more PDF files from your device.' },
      { title: '2. Arrange File Order', desc: 'Drag files or use arrow buttons to place pages in your desired sequence.' },
      { title: '3. Merge & Download', desc: 'Click "Merge PDF" to assemble and download your combined document instantly.' }
    ],
    faqs: [
      { q: 'Are my PDF documents uploaded to external servers?', a: 'No. Processing happens entirely inside your device RAM via WebAssembly. Zero bytes are uploaded to our or any external cloud servers.' },
      { q: 'Is there a limit on file size or number of files?', a: 'No artificial server limits. You can combine as many documents as your device memory allows, completely free of charge.' },
      { q: 'Will the text and image quality be preserved?', a: 'Yes. Original fonts, vector elements, and image resolutions remain identical without compression or quality degradation.' }
    ],
    relatedSlugs: ['split-pdf', 'compress-pdf', 'organize-pdf', 'sign-pdf'],
    canonical: 'https://www.mypdftools.it/merge-pdf',
    hreflang: { it: 'https://www.mypdftools.it/unire-pdf', de: 'https://www.mypdftools.de/pdf-zusammenfuegen', en: 'https://www.mypdftools.it/merge-pdf' }
  },

  'combine-pdf': {
    slug: 'combine-pdf',
    toolId: 'merge-pdf',
    lang: 'en',
    domain: 'mypdftools.it',
    h1: 'Combine PDF Files Online Free',
    metaTitle: 'Combine PDF Files Online Free — Fast & Secure PDF Merger',
    metaDescription: 'Combine PDF documents easily and securely in your web browser. Free, unlimited, and 100% private with no server file uploads.',
    badge: 'Zero Upload',
    intro: 'Effortlessly combine multiple PDFs into one unified file. Enjoy instant processing speed and complete data privacy for your confidential legal, financial, and personal records.',
    steps: [
      { title: '1. Add Documents', desc: 'Choose the PDF files you want to combine together.' },
      { title: '2. Reorder Files', desc: 'Organize files into the order you want them to appear.' },
      { title: '3. Download Combined PDF', desc: 'Save your newly combined PDF immediately.' }
    ],
    faqs: [
      { q: 'Can I combine PDFs on my phone or tablet?', a: 'Yes, MyPdfTools works smoothly on iPhones, iPads, Android phones, and all desktop browsers.' },
      { q: 'Do I need to create an account or sign in?', a: 'No account, registration, or credit card is ever required.' }
    ],
    relatedSlugs: ['merge-pdf', 'split-pdf', 'compress-pdf'],
    canonical: 'https://www.mypdftools.it/combine-pdf',
    hreflang: { it: 'https://www.mypdftools.it/unire-pdf', de: 'https://www.mypdftools.de/pdf-zusammenfuegen', en: 'https://www.mypdftools.it/combine-pdf' }
  },

  'split-pdf': {
    slug: 'split-pdf',
    toolId: 'split-pdf',
    lang: 'en',
    domain: 'mypdftools.it',
    h1: 'Split PDF Online Free — Extract Pages Instantly',
    metaTitle: 'Split PDF Online Free — Extract Specific PDF Pages',
    metaDescription: 'Split large PDF files into separate pages or extract custom page ranges. Completely free, confidential, and runs offline in browser memory.',
    badge: '100% Private',
    intro: 'Extract selected pages or split multi-page documents into individual files. Because processing executes locally in your browser, your contracts, bank statements, and sensitive files never leave your computer.',
    steps: [
      { title: '1. Upload PDF Document', desc: 'Select the multi-page PDF you want to split.' },
      { title: '2. Choose Pages or Ranges', desc: 'Select individual pages or specify custom ranges (e.g. 1-3, 5).' },
      { title: '3. Extract & Save', desc: 'Click "Split PDF" to download your extracted documents as a zip file or PDF.' }
    ],
    faqs: [
      { q: 'Can I extract single pages from a large PDF?', a: 'Yes. You can select individual pages or specify precise custom ranges to extract.' },
      { q: 'Does this tool work offline?', a: 'Yes! You can disconnect your internet connection or install MyPdfTools as a PWA desktop app.' }
    ],
    relatedSlugs: ['merge-pdf', 'delete-pdf-pages', 'extract-pdf-pages', 'organize-pdf'],
    canonical: 'https://www.mypdftools.it/split-pdf',
    hreflang: { it: 'https://www.mypdftools.it/dividere-pdf', de: 'https://www.mypdftools.de/pdf-teilen', en: 'https://www.mypdftools.it/split-pdf' }
  },

  'compress-pdf': {
    slug: 'compress-pdf',
    toolId: 'compress-pdf',
    lang: 'en',
    domain: 'mypdftools.it',
    h1: 'Compress PDF Online — Reduce File Size Without Quality Loss',
    metaTitle: 'Compress PDF Online — Reduce PDF File Size Free',
    metaDescription: 'Reduce PDF file size for easy email attachment while maintaining crystal clear text and image quality. 100% browser-based & secure.',
    badge: 'Optimized Speed',
    intro: 'Shrink oversized PDF documents for effortless emailing and web uploading. Our intelligent compression algorithm removes redundant metadata and optimizes embedded images while preserving text sharpness.',
    steps: [
      { title: '1. Select Large PDF', desc: 'Upload the PDF file you need to make smaller.' },
      { title: '2. Select Compression Level', desc: 'Choose standard or maximum compression according to your needs.' },
      { title: '3. Download Compressed PDF', desc: 'Save your lightweight PDF file ready for quick email sending.' }
    ],
    faqs: [
      { q: 'Will compressing my PDF make text blurry?', a: 'No. Text and vector graphics remain razor-sharp; compression intelligently optimizes image resolutions and strips duplicate overhead data.' },
      { q: 'Is there a limit on how many PDFs I can compress?', a: 'No limits. Compress as many documents as you need at zero cost.' }
    ],
    relatedSlugs: ['reduce-pdf-size', 'merge-pdf', 'pdf-to-jpg'],
    canonical: 'https://www.mypdftools.it/compress-pdf',
    hreflang: { it: 'https://www.mypdftools.it/comprimere-pdf', de: 'https://www.mypdftools.de/pdf-komprimieren', en: 'https://www.mypdftools.it/compress-pdf' }
  },

  'reduce-pdf-size': {
    slug: 'reduce-pdf-size',
    toolId: 'compress-pdf',
    lang: 'en',
    domain: 'mypdftools.it',
    h1: 'Reduce PDF Size Online Free',
    metaTitle: 'Reduce PDF File Size Online Free — Make PDF Smaller',
    metaDescription: 'Make large PDF files smaller for email attachments and portal uploads. Fast, client-side, and completely free.',
    badge: 'Email Ready',
    intro: 'Quickly shrink heavy PDF files down under upload limits (like 5MB or 10MB) without compromising readability. Done 100% inside your browser memory.',
    steps: [
      { title: '1. Select File', desc: 'Select the file that is currently too large to send.' },
      { title: '2. Optimize', desc: 'Our local compression algorithm strips bloat instantly.' },
      { title: '3. Save', desc: 'Download your optimized file.' }
    ],
    faqs: [
      { q: 'Is my data safe during compression?', a: 'Yes! The compression runs locally on your device CPU. No file data is sent to the internet.' }
    ],
    relatedSlugs: ['compress-pdf', 'merge-pdf'],
    canonical: 'https://www.mypdftools.it/reduce-pdf-size',
    hreflang: { it: 'https://www.mypdftools.it/comprimere-pdf', de: 'https://www.mypdftools.de/pdf-komprimieren', en: 'https://www.mypdftools.it/reduce-pdf-size' }
  },

  'jpg-to-pdf': {
    slug: 'jpg-to-pdf',
    toolId: 'jpg-to-pdf',
    lang: 'en',
    domain: 'mypdftools.it',
    h1: 'JPG to PDF Converter Online Free',
    metaTitle: 'JPG to PDF — Convert Images to PDF Online Free',
    metaDescription: 'Convert JPG, PNG, and WebP photos into clean PDF documents in seconds. Adjust orientation and margins. 100% private, zero uploads.',
    badge: 'Instant Converter',
    intro: 'Turn image files, receipts, scanned forms, and photos into a professional, shareable PDF document. Reorder images, customize page orientation (Portrait or Landscape), and set custom margins.',
    steps: [
      { title: '1. Upload Images', desc: 'Select JPG, PNG, or WebP photos from your device.' },
      { title: '2. Adjust Layout', desc: 'Reorder pages, select page orientation, and customize margin spacing.' },
      { title: '3. Convert to PDF', desc: 'Download your newly generated PDF document immediately.' }
    ],
    faqs: [
      { q: 'Can I convert multiple JPGs into a single PDF document?', a: 'Yes. You can add dozens of photos and combine them into one structured PDF.' },
      { q: 'Are PNG and WebP formats supported?', a: 'Yes, JPG, JPEG, PNG, and modern WebP formats are all fully supported.' }
    ],
    relatedSlugs: ['image-to-pdf', 'pdf-to-jpg', 'merge-pdf'],
    canonical: 'https://www.mypdftools.it/jpg-to-pdf',
    hreflang: { it: 'https://www.mypdftools.it/da-jpg-a-pdf', de: 'https://www.mypdftools.de/jpg-in-pdf', en: 'https://www.mypdftools.it/jpg-to-pdf' }
  },

  'image-to-pdf': {
    slug: 'image-to-pdf',
    toolId: 'jpg-to-pdf',
    lang: 'en',
    domain: 'mypdftools.it',
    h1: 'Convert Images to PDF Online Free',
    metaTitle: 'Convert Images to PDF Online Free — Photos to PDF',
    metaDescription: 'Combine multiple images (JPG, PNG, WebP) into a single PDF file instantly. Safe, private, and runs entirely in your browser.',
    badge: '100% Safe',
    intro: 'Transform photos, scanned IDs, and receipts into standardized PDF documents without installing heavy desktop software or uploading sensitive photos to cloud servers.',
    steps: [
      { title: '1. Pick Images', desc: 'Drag and drop your photos into the tool.' },
      { title: '2. Reorder', desc: 'Arrange images in your preferred order.' },
      { title: '3. Convert', desc: 'Save your polished PDF in seconds.' }
    ],
    faqs: [
      { q: 'Will my pictures stay confidential?', a: 'Yes. They are processed entirely in browser RAM and vanish when you close the tab.' }
    ],
    relatedSlugs: ['jpg-to-pdf', 'pdf-to-jpg'],
    canonical: 'https://www.mypdftools.it/image-to-pdf',
    hreflang: { it: 'https://www.mypdftools.it/da-jpg-a-pdf', de: 'https://www.mypdftools.de/jpg-in-pdf', en: 'https://www.mypdftools.it/image-to-pdf' }
  },

  'pdf-to-jpg': {
    slug: 'pdf-to-jpg',
    toolId: 'pdf-to-jpg',
    lang: 'en',
    domain: 'mypdftools.it',
    h1: 'Convert PDF to JPG Online Free — High Quality Images',
    metaTitle: 'PDF to JPG — Convert PDF Pages to Images Online',
    metaDescription: 'Convert every PDF page into crisp, high-resolution JPG images in seconds. No email required, 100% private browser rendering.',
    badge: 'High Resolution',
    intro: 'Render and extract every page of your PDF document into crystal-clear JPG image files. Perfect for embedding presentations into slides, sharing on social media, or archiving.',
    steps: [
      { title: '1. Select PDF File', desc: 'Upload the PDF document you wish to turn into images.' },
      { title: '2. Review Pages', desc: 'Preview your pages in real-time.' },
      { title: '3. Download JPGs', desc: 'Download individual page images or all pages packed in a zip file.' }
    ],
    faqs: [
      { q: 'What is the image output quality?', a: 'Pages are rendered at high DPI with sharp text, accurate colors, and crystal-clear graphics.' },
      { q: 'Can I download all pages at once?', a: 'Yes, click "Download All as ZIP" to get all page images in one organized archive.' }
    ],
    relatedSlugs: ['jpg-to-pdf', 'split-pdf', 'extract-pdf-pages'],
    canonical: 'https://www.mypdftools.it/pdf-to-jpg',
    hreflang: { it: 'https://www.mypdftools.it/da-pdf-a-jpg', de: 'https://www.mypdftools.de/pdf-in-jpg', en: 'https://www.mypdftools.it/pdf-to-jpg' }
  },

  'word-to-pdf': {
    slug: 'word-to-pdf',
    toolId: 'word-to-pdf',
    lang: 'en',
    domain: 'mypdftools.it',
    h1: 'Word to PDF Converter Online Free',
    metaTitle: 'Word to PDF — Convert DOCX & DOC to PDF Online Free',
    metaDescription: 'Convert Microsoft Word documents (DOCX, DOC) to clean PDF format. Retain formatting, fonts, and images. 100% private & secure.',
    badge: 'Office Suite',
    intro: 'Convert Word DOC and DOCX files into universal, tamper-resistant PDF documents. Ensure your resumes, proposals, and contracts look identical on every screen and device.',
    steps: [
      { title: '1. Upload Word Document', desc: 'Select your DOC or DOCX file.' },
      { title: '2. Automatic Conversion', desc: 'Formatting and typography are translated into PDF layout.' },
      { title: '3. Download PDF', desc: 'Save your ready-to-share PDF document.' }
    ],
    faqs: [
      { q: 'Will my formatting and typography change?', a: 'No, margins, tables, headings, and images are accurately preserved.' },
      { q: 'Is it free?', a: 'Yes, completely free with no registration or subscriptions.' }
    ],
    relatedSlugs: ['pdf-to-word', 'excel-to-pdf', 'powerpoint-to-pdf'],
    canonical: 'https://www.mypdftools.it/word-to-pdf',
    hreflang: { it: 'https://www.mypdftools.it/da-word-a-pdf', de: 'https://www.mypdftools.de/word-in-pdf', en: 'https://www.mypdftools.it/word-to-pdf' }
  },

  'pdf-to-word': {
    slug: 'pdf-to-word',
    toolId: 'pdf-to-word',
    lang: 'en',
    domain: 'mypdftools.it',
    h1: 'PDF to Word Converter Online Free — Editable DOCX',
    metaTitle: 'PDF to Word — Convert PDF to Editable DOCX Online',
    metaDescription: 'Convert PDF files into editable Microsoft Word DOCX documents with intact text and layouts. Free, fast, and 100% private.',
    badge: 'Editable DOCX',
    intro: 'Turn static PDF documents back into fully editable Microsoft Word (DOCX) files. Update text, adjust formatting, and copy tables effortlessly.',
    steps: [
      { title: '1. Choose PDF', desc: 'Select the PDF file you need to edit.' },
      { title: '2. Process', desc: 'Content and paragraphs are extracted into Word structure.' },
      { title: '3. Download Word Doc', desc: 'Open and edit the converted DOCX file in Microsoft Word or Google Docs.' }
    ],
    faqs: [
      { q: 'Can I edit the converted file in Microsoft Word or Google Docs?', a: 'Yes, the output is a standard DOCX file compatible with Word, LibreOffice, and Google Docs.' }
    ],
    relatedSlugs: ['word-to-pdf', 'pdf-to-excel', 'pdf-to-markdown'],
    canonical: 'https://www.mypdftools.it/pdf-to-word',
    hreflang: { it: 'https://www.mypdftools.it/da-pdf-a-word', de: 'https://www.mypdftools.de/pdf-in-word', en: 'https://www.mypdftools.it/pdf-to-word' }
  },

  'sign-pdf': {
    slug: 'sign-pdf',
    toolId: 'sign-pdf',
    lang: 'en',
    domain: 'mypdftools.it',
    h1: 'Sign PDF Online Free — Draw, Type, or Upload Signature',
    metaTitle: 'Sign PDF Online Free — Easy Digital Signature Tool',
    metaDescription: 'Sign contracts, NDAs, and agreements directly in your browser. Draw your signature or upload an image. 100% private, files never uploaded.',
    badge: 'Legally Compliant',
    intro: 'Sign agreements, freelance contracts, and tax documents in seconds without printing, scanning, or paying for expensive DocuSign licenses. Draw your signature on touchscreen or mouse, position it precisely on any page, and download the signed PDF immediately.',
    steps: [
      { title: '1. Open Document', desc: 'Upload the contract or PDF agreement you need to sign.' },
      { title: '2. Create Your Signature', desc: 'Draw your signature with mouse/touch or upload a scanned signature image.' },
      { title: '3. Place & Save', desc: 'Position and resize your signature on the signature line and download the signed document.' }
    ],
    faqs: [
      { q: 'Are my confidential contracts uploaded to cloud servers?', a: 'Never. The signature is rendered locally directly onto the PDF canvas in browser memory. Zero third-party exposure.' },
      { q: 'Can I add multiple signatures or date stamps?', a: 'Yes, you can place signatures, initials, dates, and text notes on any page.' }
    ],
    relatedSlugs: ['protect-pdf', 'merge-pdf', 'edit-pdf'],
    canonical: 'https://www.mypdftools.it/sign-pdf',
    hreflang: { it: 'https://www.mypdftools.it/firmare-pdf', de: 'https://www.mypdftools.de/pdf-unterschreiben', en: 'https://www.mypdftools.it/sign-pdf' }
  },

  'edit-pdf': {
    slug: 'edit-pdf',
    toolId: 'edit-pdf',
    lang: 'en',
    domain: 'mypdftools.it',
    h1: 'Edit PDF Online Free in Your Browser',
    metaTitle: 'Edit PDF Online Free — Add Text, Annotate & Draw',
    metaDescription: 'Edit PDF documents directly in your web browser. Add text, shapes, notes, and annotations without installing software. 100% free & private.',
    badge: 'Full Suite',
    intro: 'Add text annotations, highlight important clauses, draw shapes, and fill out forms directly in your browser. Fast, intuitive, and respects your document confidentiality.',
    steps: [
      { title: '1. Open PDF', desc: 'Select the PDF file you want to annotate or edit.' },
      { title: '2. Make Edits', desc: 'Use the toolbar to add text, insert shapes, or draw.' },
      { title: '3. Save Document', desc: 'Export your edited PDF file instantly.' }
    ],
    faqs: [
      { q: 'Do I need Adobe Acrobat to edit PDFs?', a: 'No, MyPdfTools provides essential annotation, signing, and editing tools right in your web browser for free.' }
    ],
    relatedSlugs: ['sign-pdf', 'organize-pdf', 'watermark-pdf'],
    canonical: 'https://www.mypdftools.it/edit-pdf',
    hreflang: { it: 'https://www.mypdftools.it/modificare-pdf', de: 'https://www.mypdftools.de/pdf-bearbeiten', en: 'https://www.mypdftools.it/edit-pdf' }
  },

  'rotate-pdf': {
    slug: 'rotate-pdf',
    toolId: 'rotate-pdf',
    lang: 'en',
    domain: 'mypdftools.it',
    h1: 'Rotate PDF Online & Save Permanently',
    metaTitle: 'Rotate PDF Online — Permanently Rotate & Save PDF Pages',
    metaDescription: 'Rotate upside-down or sideways PDF pages 90, 180, or 270 degrees and save them permanently. Free, fast, and 100% private.',
    badge: 'Permanent Save',
    intro: 'Fix upside-down scans and sideways pages once and for all. Rotate specific pages or all pages at once (90°, 180°, 270°) and save the orientation permanently so it opens properly in every PDF viewer.',
    steps: [
      { title: '1. Select PDF', desc: 'Upload the document with misoriented pages.' },
      { title: '2. Rotate Pages', desc: 'Click rotation icons on individual thumbnails or rotate all pages at once.' },
      { title: '3. Save Permanently', desc: 'Download your correctly oriented PDF file.' }
    ],
    faqs: [
      { q: 'Will the rotation remain permanent when I email the file?', a: 'Yes! Unlike temporary PDF readers, MyPdfTools rewrites the page rotation metadata permanently.' }
    ],
    relatedSlugs: ['organize-pdf', 'delete-pdf-pages', 'split-pdf'],
    canonical: 'https://www.mypdftools.it/rotate-pdf',
    hreflang: { it: 'https://www.mypdftools.it/ruotare-pdf', de: 'https://www.mypdftools.de/pdf-drehen', en: 'https://www.mypdftools.it/rotate-pdf' }
  },

  'organize-pdf': {
    slug: 'organize-pdf',
    toolId: 'organize-pdf',
    lang: 'en',
    domain: 'mypdftools.it',
    h1: 'Organize PDF Pages Online — Reorder, Rotate & Delete',
    metaTitle: 'Organize PDF Pages — Drag, Reorder & Delete Pages Free',
    metaDescription: 'Rearrange PDF page order, delete unwanted pages, and rotate orientation with an intuitive visual thumbnail organizer. 100% private.',
    badge: 'Visual Grid',
    intro: 'Take full control of multi-page documents. Drag and drop visual page thumbnails to reorder them, delete unwanted blank pages, and rotate misaligned sheets with a single click.',
    steps: [
      { title: '1. Load Document', desc: 'Select your PDF to see all page thumbnails.' },
      { title: '2. Rearrange & Clean', desc: 'Drag pages into order, delete unnecessary pages, or rotate.' },
      { title: '3. Download Reorganized PDF', desc: 'Export your clean, structured PDF document.' }
    ],
    faqs: [
      { q: 'Can I remove blank pages from scanned PDFs?', a: 'Yes, simply hover over any page thumbnail and click the trash can icon to delete it.' }
    ],
    relatedSlugs: ['delete-pdf-pages', 'rotate-pdf', 'split-pdf'],
    canonical: 'https://www.mypdftools.it/organize-pdf',
    hreflang: { it: 'https://www.mypdftools.it/organizzare-pdf', de: 'https://www.mypdftools.de/pdf-organisieren', en: 'https://www.mypdftools.it/organize-pdf' }
  },

  'delete-pdf-pages': {
    slug: 'delete-pdf-pages',
    toolId: 'delete-pages',
    lang: 'en',
    domain: 'mypdftools.it',
    h1: 'Delete Pages from PDF Online Free',
    metaTitle: 'Delete PDF Pages Online Free — Remove Unwanted Pages',
    metaDescription: 'Remove unnecessary pages from your PDF file in seconds. Simple visual selection, completely free, and 100% private.',
    badge: 'Quick Cleanup',
    intro: 'Quickly remove sensitive pages, blank sheets, or outdated sections from any PDF document. Free and instant with zero server file storage.',
    steps: [
      { title: '1. Upload PDF', desc: 'Select the document containing pages you want to remove.' },
      { title: '2. Select Pages to Delete', desc: 'Click on the pages you want to discard.' },
      { title: '3. Save Cleaned PDF', desc: 'Download your streamlined PDF file.' }
    ],
    faqs: [
      { q: 'Can I delete multiple pages at once?', a: 'Yes, select all the pages you wish to eliminate and click delete.' }
    ],
    relatedSlugs: ['organize-pdf', 'split-pdf', 'extract-pdf-pages'],
    canonical: 'https://www.mypdftools.it/delete-pdf-pages',
    hreflang: { it: 'https://www.mypdftools.it/eliminare-pagine-pdf', de: 'https://www.mypdftools.de/pdf-seiten-loeschen', en: 'https://www.mypdftools.it/delete-pdf-pages' }
  },

  'protect-pdf': {
    slug: 'protect-pdf',
    toolId: 'protect-pdf',
    lang: 'en',
    domain: 'mypdftools.it',
    h1: 'Password Protect PDF Online — 256-Bit AES Encryption',
    metaTitle: 'Password Protect PDF Online — Free & Secure Encryption',
    metaDescription: 'Secure your confidential PDF files with military-grade 256-bit AES encryption. Set custom open passwords directly in your browser.',
    badge: 'Bank-Grade Security',
    intro: 'Keep confidential tax returns, employee salaries, and sensitive legal agreements protected from unauthorized eyes. Encrypt your document with strong passwords right inside your browser before emailing it.',
    steps: [
      { title: '1. Choose PDF', desc: 'Select the confidential document you want to secure.' },
      { title: '2. Enter Password', desc: 'Type and confirm a strong access password.' },
      { title: '3. Encrypt & Save', desc: 'Download your encrypted PDF file immediately.' }
    ],
    faqs: [
      { q: 'Do you store or see my password?', a: 'Never. Encryption occurs locally in your browser RAM using cryptographic libraries. We never see your password or document.' },
      { q: 'Will the recipient need special software to open it?', a: 'No, any standard PDF viewer (Acrobat, Chrome, Apple Preview) will prompt for the password.' }
    ],
    relatedSlugs: ['unlock-pdf', 'sign-pdf', 'watermark-pdf'],
    canonical: 'https://www.mypdftools.it/protect-pdf',
    hreflang: { it: 'https://www.mypdftools.it/proteggere-pdf', de: 'https://www.mypdftools.de/pdf-schuetzen', en: 'https://www.mypdftools.it/protect-pdf' }
  },

  'unlock-pdf': {
    slug: 'unlock-pdf',
    toolId: 'unlock-pdf',
    lang: 'en',
    domain: 'mypdftools.it',
    h1: 'Unlock Password Protected PDF Online',
    metaTitle: 'Unlock PDF — Remove PDF Password Online Free',
    metaDescription: 'Remove password protection from your PDF files once and for all. Fast, client-side, and 100% private.',
    badge: 'Instant Decryption',
    intro: 'Remove password prompts from your own documents so you can read, print, and share them without having to type the password every time.',
    steps: [
      { title: '1. Select Locked PDF', desc: 'Upload the encrypted document.' },
      { title: '2. Enter Known Password', desc: 'Type the password once to authorize decryption.' },
      { title: '3. Download Unlocked PDF', desc: 'Save the unlocked document with password restrictions removed.' }
    ],
    faqs: [
      { q: 'Can I unlock a PDF without knowing the password?', a: 'No, you must know the correct password to decrypt standard encrypted PDFs.' }
    ],
    relatedSlugs: ['protect-pdf', 'sign-pdf'],
    canonical: 'https://www.mypdftools.it/unlock-pdf',
    hreflang: { it: 'https://www.mypdftools.it/sbloccare-pdf', de: 'https://www.mypdftools.de/pdf-entsperren', en: 'https://www.mypdftools.it/unlock-pdf' }
  },

  'watermark-pdf': {
    slug: 'watermark-pdf',
    toolId: 'watermark',
    lang: 'en',
    domain: 'mypdftools.it',
    h1: 'Add Watermark to PDF Online Free',
    metaTitle: 'Add Watermark to PDF Online Free — Text & Stamp Watermarks',
    metaDescription: 'Apply custom text watermarks ("CONFIDENTIAL", "DRAFT", "COPY") or image stamps to PDF documents in seconds. 100% private.',
    badge: 'Brand Protection',
    intro: 'Protect your intellectual property and mark confidential files. Add custom text watermarks like "CONFIDENTIAL", "DRAFT", or custom logos with adjustable transparency, position, and font size.',
    steps: [
      { title: '1. Select File', desc: 'Upload the PDF document you want to stamp.' },
      { title: '2. Customize Watermark', desc: 'Type your text, adjust opacity, angle, and position.' },
      { title: '3. Apply & Download', desc: 'Save your watermarked PDF immediately.' }
    ],
    faqs: [
      { q: 'Can I change the transparency of the watermark?', a: 'Yes, you can adjust opacity so underlying document text remains completely legible.' }
    ],
    relatedSlugs: ['sign-pdf', 'protect-pdf', 'add-page-numbers-to-pdf'],
    canonical: 'https://www.mypdftools.it/watermark-pdf',
    hreflang: { it: 'https://www.mypdftools.it/filigrana-pdf', de: 'https://www.mypdftools.de/pdf-wasserzeichen', en: 'https://www.mypdftools.it/watermark-pdf' }
  },

  'add-page-numbers-to-pdf': {
    slug: 'add-page-numbers-to-pdf',
    toolId: 'page-numbers',
    lang: 'en',
    domain: 'mypdftools.it',
    h1: 'Add Page Numbers to PDF Online Free',
    metaTitle: 'Add Page Numbers to PDF Online Free — Number PDF Pages',
    metaDescription: 'Insert page numbers into PDF documents easily. Choose font style, format (Page X of Y), and positioning (header/footer). 100% private.',
    badge: 'Custom Layout',
    intro: 'Number multi-page reports, legal briefs, and contracts. Customize page number format ("1", "Page 1 of 10"), font size, alignment, and select whether to number the cover page.',
    steps: [
      { title: '1. Choose PDF', desc: 'Select the document you need to number.' },
      { title: '2. Select Position & Style', desc: 'Pick header or footer position, alignment, and formatting style.' },
      { title: '3. Save Numbered PDF', desc: 'Download your numbered document instantly.' }
    ],
    faqs: [
      { q: 'Can I skip numbering on the first page/cover sheet?', a: 'Yes, you can easily exclude the first page from numbering.' }
    ],
    relatedSlugs: ['organize-pdf', 'merge-pdf', 'watermark-pdf'],
    canonical: 'https://www.mypdftools.it/add-page-numbers-to-pdf',
    hreflang: { it: 'https://www.mypdftools.it/numeri-di-pagina-pdf', de: 'https://www.mypdftools.de/pdf-seitenzahlen', en: 'https://www.mypdftools.it/add-page-numbers-to-pdf' }
  },

  'pdf-to-markdown': {
    slug: 'pdf-to-markdown',
    toolId: 'pdf-to-markdown',
    lang: 'en',
    domain: 'mypdftools.it',
    h1: 'Convert PDF to Markdown Online Free — Perfect for LLMs & Notes',
    metaTitle: 'PDF to Markdown Converter — Extract Clean Markdown (.md)',
    metaDescription: 'Extract text, headings, and lists from PDF files into clean Markdown format. Ideal for Obsidian, Notion, ChatGPT, and Claude prompts.',
    badge: 'AI & Developer Ready',
    intro: 'Turn complex PDF documents into clean, structured Markdown (.md) text. Perfect for copying into ChatGPT, Claude, Obsidian, Notion, and developer documentation workflows.',
    steps: [
      { title: '1. Select PDF', desc: 'Upload the PDF document you want to transcribe.' },
      { title: '2. Automatic Parsing', desc: 'Our engine identifies headings, bullet points, and code blocks.' },
      { title: '3. Copy or Download .md', desc: 'Download your .md file or copy markdown straight to clipboard.' }
    ],
    faqs: [
      { q: 'Can I paste the output directly into AI tools like ChatGPT or Claude?', a: 'Yes! Markdown is the preferred input format for all major LLMs.' }
    ],
    relatedSlugs: ['pdf-to-word', 'pdf-to-jpg'],
    canonical: 'https://www.mypdftools.it/pdf-to-markdown',
    hreflang: { it: 'https://www.mypdftools.it/da-pdf-a-markdown', de: 'https://www.mypdftools.de/pdf-in-markdown', en: 'https://www.mypdftools.it/pdf-to-markdown' }
  },

  /* Practical English Guides & How-To Articles */
  'how-to-merge-pdf-files': {
    slug: 'how-to-merge-pdf-files',
    toolId: 'merge-pdf',
    lang: 'en',
    domain: 'mypdftools.it',
    h1: 'How to Merge PDF Files on Windows, Mac, and Mobile',
    metaTitle: 'How to Merge PDF Files Free — Step-by-Step Guide',
    metaDescription: 'Learn how to combine multiple PDF files into one document for free without uploading files to third-party cloud servers.',
    badge: 'Tutorial Guide',
    intro: 'Need to combine multiple PDF documents into one single file? This step-by-step guide explains how to merge PDFs instantly right inside your browser without paying for expensive software.',
    steps: [
      { title: 'Step 1: Open MyPdfTools Merge Tool', desc: 'Navigate to the free Merge PDF tool.' },
      { title: 'Step 2: Upload and Arrange Documents', desc: 'Add all files and arrange them in the sequence you need.' },
      { title: 'Step 3: Click Merge and Download', desc: 'Save your unified PDF document in seconds.' }
    ],
    faqs: [
      { q: 'Is it safe to merge confidential documents with this guide?', a: 'Yes. MyPdfTools works locally in browser memory so your files are never exposed to remote servers.' }
    ],
    relatedSlugs: ['merge-pdf', 'combine-pdf', 'how-to-compress-pdf-without-losing-quality'],
    canonical: 'https://www.mypdftools.it/how-to-merge-pdf-files',
    hreflang: { it: 'https://www.mypdftools.it/guide/come-unire-due-pdf-gratis', de: 'https://www.mypdftools.de/ratgeber/pdf-dateien-kostenlos-zusammenfuegen', en: 'https://www.mypdftools.it/how-to-merge-pdf-files' }
  },

  'how-to-compress-pdf-without-losing-quality': {
    slug: 'how-to-compress-pdf-without-losing-quality',
    toolId: 'compress-pdf',
    lang: 'en',
    domain: 'mypdftools.it',
    h1: 'How to Compress a PDF Without Losing Quality',
    metaTitle: 'How to Compress PDF Without Losing Quality — Guide',
    metaDescription: 'Step-by-step guide to shrinking PDF file sizes under email limits while keeping text and graphics crisp and readable.',
    badge: 'Tutorial Guide',
    intro: 'Large PDF attachments often bounce when emailed. Learn how to reduce your PDF file size safely without making text blurry or losing image quality.',
    steps: [
      { title: 'Step 1: Choose Your Large File', desc: 'Select the oversized PDF document.' },
      { title: 'Step 2: Optimize Automatically', desc: 'Our engine strips redundant metadata and compresses high-res image bloat.' },
      { title: 'Step 3: Send With Ease', desc: 'Download your optimized file, now ready for any email client.' }
    ],
    faqs: [
      { q: 'Why do PDFs get so large in the first place?', a: 'High-resolution image scans, embedded font files, and duplicate metadata often inflate PDFs to 20MB+.' }
    ],
    relatedSlugs: ['compress-pdf', 'reduce-pdf-size', 'how-to-merge-pdf-files'],
    canonical: 'https://www.mypdftools.it/how-to-compress-pdf-without-losing-quality',
    hreflang: { it: 'https://www.mypdftools.it/guide/come-comprimere-pdf-senza-perdere-qualita', de: 'https://www.mypdftools.de/ratgeber/pdf-verkleinern-ohne-qualitaetsverlust', en: 'https://www.mypdftools.it/how-to-compress-pdf-without-losing-quality' }
  },

  'how-to-sign-a-pdf-document-online': {
    slug: 'how-to-sign-a-pdf-document-online',
    toolId: 'sign-pdf',
    lang: 'en',
    domain: 'mypdftools.it',
    h1: 'How to Sign a PDF Document Online for Free',
    metaTitle: 'How to Sign a PDF Online for Free — Quick Guide',
    metaDescription: 'Learn how to sign contracts, agreements, and forms electronically without printing or scanning.',
    badge: 'Tutorial Guide',
    intro: 'Printing, signing with a pen, and scanning documents is slow and outdated. Learn how to add a clean digital signature to any PDF document in under 60 seconds.',
    steps: [
      { title: 'Step 1: Open Your PDF Agreement', desc: 'Open the document in the Sign PDF tool.' },
      { title: 'Step 2: Draw or Upload Your Signature', desc: 'Sign with your finger on a smartphone/trackpad or draw with your mouse.' },
      { title: 'Step 3: Place and Export', desc: 'Drop your signature onto the signature line and download the signed contract.' }
    ],
    faqs: [
      { q: 'Is an electronic signature legally valid?', a: 'In most jurisdictions (including the US E-SIGN Act and EU eIDAS), electronic signatures on commercial contracts and agreements are recognized.' }
    ],
    relatedSlugs: ['sign-pdf', 'protect-pdf', 'how-to-merge-pdf-files'],
    canonical: 'https://www.mypdftools.it/how-to-sign-a-pdf-document-online',
    hreflang: { it: 'https://www.mypdftools.it/guide/come-firmare-un-pdf-online-gratis', de: 'https://www.mypdftools.de/ratgeber/pdf-digital-unterschreiben-anleitung', en: 'https://www.mypdftools.it/how-to-sign-a-pdf-document-online' }
  }
};

const seoRoutesPath = path.resolve('src/data/seoRoutes.ts');
let seoContent = fs.readFileSync(seoRoutesPath, 'utf8');

// Clean up any previous import or spread
seoContent = seoContent.replace("import { ENGLISH_SEO_ROUTES } from './englishSeoRoutes';\n\n", '');
seoContent = seoContent.replace("import { ENGLISH_SEO_ROUTES } from './englishSeoRoutes';\n", '');
seoContent = seoContent.replace("  ...ENGLISH_SEO_ROUTES,\n", '');

// Convert ENGLISH_ROUTES to string and strip outer braces
const routesString = JSON.stringify(ENGLISH_ROUTES, null, 2).slice(1, -1);

// Find the end of SEO_ROUTES object
const closingIndex = seoContent.indexOf('\n};\n\n\nexport const TOOL_TO_PRIMARY_SLUG');
if (closingIndex !== -1) {
  seoContent = seoContent.slice(0, closingIndex) + ',' + routesString + seoContent.slice(closingIndex);
  fs.writeFileSync(seoRoutesPath, seoContent, 'utf8');
  console.log(`✅ Injected ${Object.keys(ENGLISH_ROUTES).length} English SEO routes directly into src/data/seoRoutes.ts`);
} else {
  console.error('Could not find closing of SEO_ROUTES in seoRoutes.ts');
}


