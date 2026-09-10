import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import pngToIco from 'png-to-ico';

async function generate() {
  const svgPath = path.resolve('public/favicon.svg');
  const svgBuffer = fs.readFileSync(svgPath);

  const sizes = [16, 32, 48, 96, 180, 192, 512];
  const pngPaths = {};

  for (const size of sizes) {
    const outputPath = path.resolve(`public/favicon-${size}x${size}.png`);
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(outputPath);
    pngPaths[size] = outputPath;
    console.log(`Generated public/favicon-${size}x${size}.png`);
  }

  // Apple touch icon
  fs.copyFileSync(pngPaths[180], path.resolve('public/apple-touch-icon.png'));
  console.log('Generated public/apple-touch-icon.png');

  // Standard favicon.png & favicon-48x48.png
  fs.copyFileSync(pngPaths[48], path.resolve('public/favicon.png'));
  console.log('Generated public/favicon.png');

  // Multi-resolution ICO: 16x16, 32x32, 48x48
  const icoBuffer = await pngToIco([pngPaths[16], pngPaths[32], pngPaths[48]]);
  fs.writeFileSync(path.resolve('public/favicon.ico'), icoBuffer);
  console.log('Generated public/favicon.ico (16, 32, 48)');

  // Web App Manifest
  const manifest = {
    name: "MyPdfTools",
    short_name: "MyPdfTools",
    description: "100% Client-Side Private PDF Tools",
    icons: [
      {
        src: "/favicon-192x192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/favicon-512x512.png",
        sizes: "512x512",
        type: "image/png"
      }
    ],
    theme_color: "#10b981",
    background_color: "#f8fafc",
    display: "standalone",
    start_url: "/"
  };
  fs.writeFileSync(path.resolve('public/site.webmanifest'), JSON.stringify(manifest, null, 2));
  console.log('Generated public/site.webmanifest');
}

generate().catch(console.error);

