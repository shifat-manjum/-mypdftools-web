import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

async function generateOgImage() {
  const width = 1200;
  const height = 630;

  const svg = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#09141a" />
        <stop offset="40%" stop-color="#0f172a" />
        <stop offset="100%" stop-color="#062e24" />
      </linearGradient>
      
      <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#10b981" />
        <stop offset="100%" stop-color="#059669" />
      </linearGradient>

      <linearGradient id="logoBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#10b981" />
        <stop offset="100%" stop-color="#047857" />
      </linearGradient>

      <linearGradient id="pdfBadge" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#ef4444" />
        <stop offset="100%" stop-color="#dc2626" />
      </linearGradient>

      <radialGradient id="glow" cx="20%" cy="30%" r="50%">
        <stop offset="0%" stop-color="#10b981" stop-opacity="0.25" />
        <stop offset="100%" stop-color="#000000" stop-opacity="0" />
      </radialGradient>
      
      <radialGradient id="glow2" cx="85%" cy="80%" r="60%">
        <stop offset="0%" stop-color="#059669" stop-opacity="0.2" />
        <stop offset="100%" stop-color="#000000" stop-opacity="0" />
      </radialGradient>
    </defs>

    <!-- Background -->
    <rect width="${width}" height="${height}" fill="url(#bgGrad)" />
    <rect width="${width}" height="${height}" fill="url(#glow)" />
    <rect width="${width}" height="${height}" fill="url(#glow2)" />

    <!-- Top Accent Bar -->
    <rect x="0" y="0" width="${width}" height="6" fill="url(#accentGrad)" />

    <!-- Container content -->
    <g transform="translate(100, 100)">
      
      <!-- Logo Squircle (160x160) -->
      <g transform="translate(0, 40)">
        <rect width="150" height="150" rx="36" fill="url(#logoBg)" filter="drop-shadow(0 20px 25px rgba(0,0,0,0.5))" />
        
        <!-- White document sheet -->
        <path d="M42 30C42 26.5 45 23 49 23H87L110 46V120C110 124 107 127 103 127H49C45 127 42 124 42 120V30Z" fill="#FFFFFF" />
        
        <!-- Fold flap -->
        <path d="M87 23V41C87 43.5 89.5 46 92 46H110L87 23Z" fill="#CBD5E1" />
        
        <!-- Red PDF Badge -->
        <rect x="31" y="65" width="88" height="40" rx="10" fill="url(#pdfBadge)" />
        <text x="75" y="94" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="26" font-weight="900" letter-spacing="1" text-anchor="middle">PDF</text>
      </g>

      <!-- Brand and Titles -->
      <g transform="translate(190, 40)">
        <!-- Brand Badge -->
        <rect x="0" y="0" width="165" height="34" rx="17" fill="#064e3b" stroke="#10b981" stroke-width="1.5" />
        <text x="82" y="22" fill="#34d399" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="700" letter-spacing="1.5" text-anchor="middle">MYPDFTOOLS</text>

        <!-- Main Title -->
        <text x="0" y="85" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="52" font-weight="800" letter-spacing="-0.5">Strumenti PDF Gratuiti e Privati</text>
        
        <!-- Subtitle -->
        <text x="0" y="130" fill="#94a3b8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="24" font-weight="500">
          Elaborazione 100% Client-Side • Zero Upload • Privacy Totale
        </text>

        <!-- Feature Pills -->
        <g transform="translate(0, 180)">
          <!-- Pill 1 -->
          <g transform="translate(0, 0)">
            <rect width="180" height="46" rx="23" fill="#1e293b" stroke="#334155" stroke-width="1" />
            <circle cx="26" cy="23" r="6" fill="#10b981" />
            <text x="44" y="29" fill="#f1f5f9" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="600">Unisci &amp; Dividi</text>
          </g>

          <!-- Pill 2 -->
          <g transform="translate(195, 0)">
            <rect width="190" height="46" rx="23" fill="#1e293b" stroke="#334155" stroke-width="1" />
            <circle cx="26" cy="23" r="6" fill="#10b981" />
            <text x="44" y="29" fill="#f1f5f9" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="600">Comprimi PDF</text>
          </g>

          <!-- Pill 3 -->
          <g transform="translate(400, 0)">
            <rect width="190" height="46" rx="23" fill="#1e293b" stroke="#334155" stroke-width="1" />
            <circle cx="26" cy="23" r="6" fill="#10b981" />
            <text x="44" y="29" fill="#f1f5f9" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="600">Converti Immagini</text>
          </g>

          <!-- Pill 4 -->
          <g transform="translate(605, 0)">
            <rect width="190" height="46" rx="23" fill="#1e293b" stroke="#334155" stroke-width="1" />
            <circle cx="26" cy="23" r="6" fill="#10b981" />
            <text x="44" y="29" fill="#f1f5f9" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="600">Firma Digitale</text>
          </g>
        </g>
      </g>

      <!-- Bottom Status Bar inside container -->
      <g transform="translate(0, 370)">
        <line x1="0" y1="0" x2="1000" y2="0" stroke="#334155" stroke-width="1" stroke-opacity="0.6" />
        <text x="0" y="38" fill="#64748b" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="500">
          🌐 mypdftools.it | mypdftools.de — Nessun dato lascia mai il tuo computer
        </text>
      </g>

    </g>
  </svg>
  `;

  const outputPath = path.resolve('public/og-image.png');
  await sharp(Buffer.from(svg))
    .png({ quality: 95 })
    .toFile(outputPath);

  console.log('✅ Generated public/og-image.png (1200x630)');
}

generateOgImage().catch(console.error);
