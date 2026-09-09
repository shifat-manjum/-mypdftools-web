export interface ToolSeoData {
  metaTitle: string;
  metaDescription: string;
  h1: string;
  steps: { title: string; desc: string }[];
  faqs: { q: string; a: string }[];
  privacyHighlight: string;
}

export const SEO_DATA: Record<string, ToolSeoData> = {
  'jpg-to-pdf': {
    metaTitle: 'Free JPG to PDF Converter — 100% Private (No Uploads) | FreeConvert',
    metaDescription: 'Convert JPG, PNG, and WebP images to PDF online for free. Adjust orientation, margins, and page sizes. Your images never leave your browser.',
    h1: 'Convert JPG to PDF Online for Free',
    steps: [
      { title: '1. Select or Drop Images', desc: 'Choose one or multiple JPG, PNG, or WebP images from your computer or phone.' },
      { title: '2. Customize Page Settings', desc: 'Choose page orientation (portrait, landscape, or auto-fit), margin spacing, and page sizing (A4 or fit to image).' },
      { title: '3. Convert & Download', desc: 'Click "Convert to PDF" and your PDF will compile instantly in your browser without uploading to any server.' },
    ],
    faqs: [
      { q: 'Is it safe to convert private photos and IDs here?', a: 'Yes! Unlike other converters, FreeConvert uses client-side WebAssembly technology. Your files are converted in your computer memory and are never uploaded to our servers.' },
      { q: 'Can I combine multiple JPG files into a single PDF?', a: 'Yes, you can upload as many images as you want and arrange them in any order using the arrow buttons.' },
      { q: 'What image formats are supported?', a: 'FreeConvert supports JPG, JPEG, PNG, and WebP formats.' },
    ],
    privacyHighlight: 'Zero bytes uploaded. All image compression and PDF assembly execute locally in your web browser.',
  },

  'pdf-to-jpg': {
    metaTitle: 'Free PDF to JPG Converter — High Resolution & Private | FreeConvert',
    metaDescription: 'Convert PDF pages into high-resolution JPG or PNG images for free. Download individual pages or all pages as a ZIP archive without uploading files.',
    h1: 'Convert PDF to JPG Images Online',
    steps: [
      { title: '1. Choose your PDF file', desc: 'Upload the PDF document you want to convert into images.' },
      { title: '2. Select Format & Quality', desc: 'Choose between JPG or PNG, and set your desired resolution (Standard 100 DPI or High Quality 150/200 DPI).' },
      { title: '3. Download Images', desc: 'Preview your converted pages, download individual page images, or download all pages zipped together.' },
    ],
    faqs: [
      { q: 'Are my confidential documents uploaded to a cloud server?', a: 'Never. Mozilla PDF.js renders the pages directly onto HTML5 canvases inside your browser. No third party ever sees your document.' },
      { q: 'What resolution are the extracted images?', a: 'You can choose between Standard (100 DPI) for compact file size or High Definition (150-200 DPI) for crisp, readable text.' },
      { q: 'Can I download all pages at once?', a: 'Yes, click "Download All as ZIP" to get a clean archive containing every page as a high-res image.' },
    ],
    privacyHighlight: 'Processed with Mozilla PDF.js inside your browser sandbox. 100% private.',
  },

  'merge-pdf': {
    metaTitle: 'Merge PDF Files Online for Free — Fast & 100% Secure | FreeConvert',
    metaDescription: 'Combine multiple PDF documents into a single file in seconds. Order your pages freely with zero server uploads and zero file size limits.',
    h1: 'Merge PDF Files Online',
    steps: [
      { title: '1. Select PDF Documents', desc: 'Add 2 or more PDF files from your device.' },
      { title: '2. Reorder Files', desc: 'Use the up/down arrows to arrange the files in your desired sequence.' },
      { title: '3. Merge & Save', desc: 'Click "Merge PDF" to combine all pages into one unified document.' },
    ],
    faqs: [
      { q: 'Is there a limit on how many PDFs I can merge?', a: 'No, because merging happens locally on your computer, you can merge as many files as your device memory allows.' },
      { q: 'Will the quality of my PDFs be altered?', a: 'No, vector text, shapes, and embedded images are preserved with byte-for-byte fidelity.' },
    ],
    privacyHighlight: 'Direct local compilation. No upload queues, no waiting, and zero risk of data interception.',
  },

  'split-pdf': {
    metaTitle: 'Split PDF Online — Extract Pages for Free | FreeConvert',
    metaDescription: 'Extract individual pages or custom page ranges from any PDF document. Fast, free, and completely private.',
    h1: 'Split PDF Pages Online',
    steps: [
      { title: '1. Upload PDF', desc: 'Drop the PDF you wish to extract pages from.' },
      { title: '2. Specify Range or Extract All', desc: 'Type custom page ranges (e.g. 1-3, 5) or choose to separate every page into individual PDFs.' },
      { title: '3. Download Output', desc: 'Save your extracted PDF or download a ZIP archive containing every single page.' },
    ],
    faqs: [
      { q: 'How do I specify multiple page ranges?', a: 'Use commas and hyphens, for example: 1-3, 5, 7-10.' },
      { q: 'Does this remove the original file?', a: 'No, the split operation generates a new file. Your original PDF remains untouched.' },
    ],
    privacyHighlight: 'Private browser extraction. Safe for tax returns, legal contracts, and medical records.',
  },

  'sign-pdf': {
    metaTitle: 'Sign PDF Online for Free — Draw & Stamp Digital Signatures | FreeConvert',
    metaDescription: 'Sign contracts, NDAs, and forms online with zero account required. Draw your signature or touchscreen sign and stamp directly on your PDF.',
    h1: 'Sign PDF Documents Online Free',
    steps: [
      { title: '1. Select PDF to Sign', desc: 'Choose the agreement or document you need to sign.' },
      { title: '2. Draw Your Signature', desc: 'Use your mouse or touchscreen to draw a clean digital signature.' },
      { title: '3. Position & Stamp', desc: 'Select the page, click to place your signature exactly where you want it, and save.' },
    ],
    faqs: [
      { q: 'Do I need to create an account or provide an email?', a: 'No! FreeConvert requires no login, no registration, and no credit card.' },
      { q: 'Is my signature saved online?', a: 'No, your signature exists only in your current browser session and is never stored on any server.' },
    ],
    privacyHighlight: 'Your handwritten signature and private documents never leave your local computer.',
  },
};

