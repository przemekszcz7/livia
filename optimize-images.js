import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const IMAGES_MAP = {
  paprykarz: "https://i.ibb.co/Q3kM5CSs/paprykarz.jpg",
  lososzpieca: "https://i.ibb.co/ksQ03Jzv/lososzpieca.jpg",
  golabki: "https://i.ibb.co/5WjSnT21/golabki.jpg",
  halibut: "https://i.ibb.co/k21V53FP/halibut.jpg",
  dorszlivorno: "https://i.ibb.co/svvsngFq/dorszlivorno.jpg",
  burger: "https://i.ibb.co/LD73r6yF/burger.jpg",
  krempomidor: "https://i.ibb.co/7tPypt11/krempomidor.jpg",
  witryna: "https://i.ibb.co/h1WJdCbh/witryna.jpg",
  wedzarnia: "https://i.ibb.co/TMM0Fzfk/wedzarnia.jpg",
  sledz: "https://i.ibb.co/VY1D0bZj/sledz.jpg",
  smazone: "https://i.ibb.co/xKTDzW3c/smazone.jpg",
  smazone2: "https://i.ibb.co/1GxHwCmF/smazone2.jpg"
};

const imagesDir = path.join(process.cwd(), 'public', 'images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

console.log('--- Starting Image Optimizer & WebP Converter ---');

// Download and optimize favicon into various standards-compliant formats and sizes
const originalFaviconUrl = 'https://i.ibb.co/LddzVcQQ/favicon.jpg';
try {
  console.log('Downloading favicon...');
  const res = await fetch(originalFaviconUrl);
  if (res.ok) {
    const buffer = Buffer.from(await res.arrayBuffer());
    
    // 1. Save original as favicon.jpg (fallback)
    fs.writeFileSync(path.join(process.cwd(), 'public', 'favicon.jpg'), buffer);
    console.log(' ✅ Original favicon saved successfully as public/favicon.jpg');

    // 2. Generate standard 1:1 ratio square sizes using Sharp
    // Search engines (especially Google) REQUIRE some multiples of 48px (48x48, 96x96, 144x144, 192x192)
    const sizes = {
      'favicon-32x32.png': 32,
      'favicon-48x48.png': 48, // Google's preferred base size
      'favicon-96x96.png': 96,
      'favicon-144x144.png': 144,
      'favicon-192x192.png': 192,
      'apple-touch-icon.png': 180, // Apple Devices iOS touch icon
      'favicon.png': 96 // Default generic fallback PNG
    };

    for (const [filename, size] of Object.entries(sizes)) {
      const outputPath = path.join(process.cwd(), 'public', filename);
      await sharp(buffer)
        .resize(size, size, {
          fit: 'cover',
          position: 'center'
        })
        .png({ compressionLevel: 9, quality: 85 })
        .toFile(outputPath);
      console.log(` ✅ Generated square favicon: public/${filename} (${size}x${size} px)`);
    }

    // 3. Generate canonical favicon.ico (which browsers and search engine bots crawl by default at root)
    // We render it as a perfectly crisp, optimized 48x48 PNG with .ico extension
    const icoPath = path.join(process.cwd(), 'public', 'favicon.ico');
    await sharp(buffer)
      .resize(48, 48, { fit: 'cover', position: 'center' })
      .png({ compressionLevel: 9, quality: 85 })
      .toFile(icoPath);
    console.log(' ✅ Generated root favicon.ico (48x48 pixel PNG format)');

  } else {
    console.warn('❌ Failed to download original favicon file');
  }
} catch (err) {
  console.error('❌ Failed to process and resize favicons:', err.message);
}

for (const [name, url] of Object.entries(IMAGES_MAP)) {
  const outputPathWebp = path.join(imagesDir, `${name}.webp`);
  const outputPathJpg = path.join(imagesDir, `${name}.jpg`);

  try {
    console.log(`Downloading and processing ${name} from ${url}...`);
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const buffer = Buffer.from(await res.arrayBuffer());

    // Convert to WebP: resize to max-width 800px, quality 75
    await sharp(buffer)
      .resize({ width: 800, withoutEnlargement: true })
      .webp({ quality: 75 })
      .toFile(outputPathWebp);

    // Convert to optimized JPG as fallback: resize to max-width 800px, quality 75
    await sharp(buffer)
      .resize({ width: 800, withoutEnlargement: true })
      .jpeg({ quality: 75, mozjpeg: true })
      .toFile(outputPathJpg);

    console.log(` ✅ Optimized and saved ${name} as WebP (~15-40 KB) and JPG.`);
  } catch (err) {
    console.error(`❌ Failed to optimize image ${name}: ${err.message}`);
  }
}

console.log('--- Image Optimizer finished ---');
