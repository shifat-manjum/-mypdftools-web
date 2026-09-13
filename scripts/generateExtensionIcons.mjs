import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const iconsDir = path.resolve('extension/icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

const svgIcon = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#059669" />
      <stop offset="100%" stop-color="#0f172a" />
    </linearGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#34d399" />
      <stop offset="100%" stop-color="#10b981" />
    </linearGradient>
  </defs>
  <!-- Background rounded rectangle -->
  <rect width="512" height="512" rx="112" fill="url(#bg)" />
  
  <!-- Outer viewport frame (desktop monitor screen) -->
  <rect x="76" y="86" width="360" height="250" rx="24" fill="none" stroke="url(#accent)" stroke-width="26" />
  
  <!-- Screen scan line (screenshot in progress) -->
  <line x1="76" y1="210" x2="436" y2="210" stroke="#6ee7b7" stroke-width="12" stroke-dasharray="16 12" />
  
  <!-- Stand & Base -->
  <path d="M216 336 L216 396 L156 426 L356 426 L296 396 L296 336 Z" fill="url(#accent)" opacity="0.9" />
  
  <!-- Camera lens circle in center -->
  <circle cx="256" cy="210" r="48" fill="#0f172a" stroke="#34d399" stroke-width="16" />
  <circle cx="256" cy="210" r="18" fill="#10b981" />
  <circle cx="270" cy="196" r="6" fill="#ffffff" />
  
  <!-- PDF Badge in top right -->
  <rect x="330" y="56" width="130" height="60" rx="16" fill="#ef4444" stroke="#ffffff" stroke-width="8" />
  <text x="395" y="100" fill="#ffffff" font-size="34" font-family="Arial, Helvetica, sans-serif" font-weight="900" text-anchor="middle">PDF</text>
</svg>
`;

async function generate() {
  const sizes = [16, 48, 128];
  const svgBuffer = Buffer.from(svgIcon);

  for (const size of sizes) {
    const outPath = path.join(iconsDir, `icon-${size}.png`);
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(outPath);
    console.log(`✅ Generated: ${outPath} (${size}x${size})`);
  }
}

generate().catch(console.error);

