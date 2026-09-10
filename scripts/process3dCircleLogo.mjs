import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import pngToIco from 'png-to-ico';

async function processLogo() {
  const inputPath = 'C:/Users/LAPTOP LEGEND/.gemini/antigravity/brain/2bbe3b3f-0a34-4497-933b-61942770c47d/pdf_3d_circle_logo_1789074997406.jpg';
  
  const meta = await sharp(inputPath).metadata();
  console.log('Original image dimensions:', meta.width, meta.height);

  const size = meta.width; // 1024
  const cx = size / 2;
  const cy = size / 2;

  // Let's measure the circle boundary:
  // In the 1024x1024 image, the circle has a slight outer margin and soft shadow.
  // The outer rim extends to approx radius ~350px from center.
  // Let's create an exact circular mask at the outer edge of the metallic rim.
  // We can measure the exact circle by inspecting pixels along a vertical ray from center to top.
  const raw = await sharp(inputPath).raw().toBuffer({ resolveWithObject: true });
  const { data, info } = raw;

  // Scan downwards from y=50 to cy at x=cx to find where the dark rim starts
  let topY = 0;
  for (let y = 50; y < cy; y++) {
    const idx = (y * info.width + Math.floor(cx)) * info.channels;
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];
    // Background is near white (~250-255)
    if (r < 235 || g < 235 || b < 235) {
      topY = y;
      break;
    }
  }

  // Scan upwards from y=size-50 to cy at x=cx
  let bottomY = size;
  for (let y = size - 50; y > cy; y--) {
    const idx = (y * info.width + Math.floor(cx)) * info.channels;
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];
    if (r < 235 || g < 235 || b < 235) {
      bottomY = y;
      break;
    }
  }

  console.log(`Detected circle top: ${topY}, bottom: ${bottomY}`);
  const detectedCenterY = (topY + bottomY) / 2;
  const diameter = bottomY - topY;
  const radius = (diameter / 2) + 2; // slight feather margin

  console.log(`Computed diameter: ${diameter}, radius: ${radius}, centerY: ${detectedCenterY}`);

  // Create smooth anti-aliased SVG circular mask
  const cropBox = {
    left: Math.max(0, Math.floor(cx - radius - 10)),
    top: Math.max(0, Math.floor(detectedCenterY - radius - 10)),
    width: Math.floor((radius + 10) * 2),
    height: Math.floor((radius + 10) * 2)
  };

  const maskSvg = Buffer.from(`
    <svg width="${cropBox.width}" height="${cropBox.height}">
      <circle cx="${cropBox.width / 2}" cy="${cropBox.height / 2}" r="${radius}" fill="white" />
    </svg>
  `);

  // Crop to square bounding box around circle, apply mask for 100% transparent background
  const cropped = await sharp(inputPath)
    .extract(cropBox)
    .toBuffer();

  const maskedCircleBuffer = await sharp(cropped)
    .composite([{ input: maskSvg, blend: 'dest-in' }])
    .png()
    .toBuffer();

  // Save master transparent circular logo
  const masterPath = path.resolve('public/logo-circle.png');
  await sharp(maskedCircleBuffer)
    .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(masterPath);
  console.log('✅ Generated public/logo-circle.png (512x512 with transparent background)');

  // Generate all standard favicon sizes
  const sizes = [16, 32, 48, 96, 180, 192, 512];
  const pngPaths = {};

  for (const s of sizes) {
    const target = path.resolve(`public/favicon-${s}x${s}.png`);
    await sharp(maskedCircleBuffer)
      .resize(s, s, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(target);
    pngPaths[s] = target;
  }

  // Favicon.png & Apple Touch Icon
  fs.copyFileSync(pngPaths[48], path.resolve('public/favicon.png'));
  fs.copyFileSync(pngPaths[180], path.resolve('public/apple-touch-icon.png'));

  // Multi-resolution ICO (16, 32, 48)
  const icoBuffer = await pngToIco([pngPaths[16], pngPaths[32], pngPaths[48]]);
  fs.writeFileSync(path.resolve('public/favicon.ico'), icoBuffer);
  console.log('✅ Generated public/favicon.ico with transparent background');

  // Update favicon.svg
  const b64 = fs.readFileSync(pngPaths[96]).toString('base64');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" fill="none">
  <image href="data:image/png;base64,${b64}" width="96" height="96" />
</svg>`;
  fs.writeFileSync(path.resolve('public/favicon.svg'), svg, 'utf8');
  console.log('✅ Generated public/favicon.svg');
}

processLogo().catch(console.error);
