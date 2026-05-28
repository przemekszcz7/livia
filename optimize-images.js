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

// Download favicon
const faviconPath = path.join(process.cwd(), 'public', 'favicon.jpg');
try {
  console.log('Downloading favicon...');
  const res = await fetch('https://i.ibb.co/LddzVcQQ/favicon.jpg');
  if (res.ok) {
    const buffer = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(faviconPath, buffer);
    console.log(' ✅ Favicon saved successfully inside public/favicon.jpg');
  } else {
    console.warn('❌ Failed to download favicon');
  }
} catch (err) {
  console.error('❌ Failed to save favicon:', err.message);
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
