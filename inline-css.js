import fs from 'fs';
import path from 'path';

const distPath = path.join(process.cwd(), 'dist');
const targetFiles = [
  path.join(distPath, 'index.html'),
  path.join(distPath, 'blog/index.html'),
  path.join(distPath, 'menu/index.html')
];

console.log('--- Starting CSS Inliner ---');

const cssFilesToDelete = new Set();

for (const targetFile of targetFiles) {
  if (fs.existsSync(targetFile)) {
    console.log(`Processing HTML file for inlining: ${targetFile}`);
    let html = fs.readFileSync(targetFile, 'utf-8');
    
    // Find all <link ...> tags
    const linkRegex = /<link\s+([^>]+)>/g;
    let match;
    let replaced = false;
    
    // Keep track of Replacements to perform for this file
    const replacements = [];
    
    while ((match = linkRegex.exec(html)) !== null) {
      const fullTag = match[0];
      const attributesStr = match[1];
      
      // Check if this link has rel="stylesheet"
      if (/rel=["']stylesheet["']/.test(attributesStr)) {
        // Find href
        const hrefMatch = /href=["']([^"']+)["']/.test(attributesStr) ? attributesStr.match(/href=["']([^"']+)["']/) : null;
        if (hrefMatch && hrefMatch[1]) {
          const cssPath = hrefMatch[1];
          // Resolve path within the dist directory
          const cleanCssPath = cssPath.replace(/^\.\//, '').replace(/^\//, '');
          const absoluteCssPath = path.join(distPath, cleanCssPath);
          
          if (fs.existsSync(absoluteCssPath)) {
            console.log(`Matching CSS link tag to inline: ${cssPath}`);
            replacements.push({
              tag: fullTag,
              filePath: absoluteCssPath
            });
          } else {
            console.warn(`CSS file referenced in link not found at: ${absoluteCssPath}`);
          }
        }
      }
    }
    
    for (const rep of replacements) {
      try {
        const cssContent = fs.readFileSync(rep.filePath, 'utf-8');
        console.log(`Inlining CSS: ${path.basename(rep.filePath)} into ${path.basename(targetFile)} (${(cssContent.length / 1024).toFixed(2)} KB)`);
        html = html.replace(rep.tag, `<style>${cssContent}</style>`);
        replaced = true;
        cssFilesToDelete.add(rep.filePath);
      } catch (err) {
        console.error(`Failed to inline CSS in ${targetFile}: ${err.message}`);
      }
    }

    // Inject Google Places API Key and Place ID into HTML client-side globals if config is present at build-time.
    // This allows pure-frontend static deployments (like GitHub Pages/Vercel/cPanel) to dynamically load the key.
    const configApiKey = process.env.GOOGLE_PLACES_API_KEY;
    const configPlaceId = process.env.GOOGLE_PLACE_ID;
    
    let injectedConfig = '';
    if (configApiKey && configApiKey.trim() !== '') {
      injectedConfig += `\n  <script>window.GOOGLE_PLACES_API_KEY = ${JSON.stringify(configApiKey.trim())};</script>`;
    }
    if (configPlaceId && configPlaceId.trim() !== '') {
      injectedConfig += `\n  <script>window.GOOGLE_PLACE_ID = ${JSON.stringify(configPlaceId.trim())};</script>`;
    }
    
    if (injectedConfig) {
      if (html.includes('</head>')) {
        html = html.replace('</head>', `${injectedConfig}\n</head>`);
        console.log(`Injected build-time Google config into ${path.basename(targetFile)}`);
      }
    }
    
    if (replaced || injectedConfig) {
      fs.writeFileSync(targetFile, html, 'utf-8');
      if (replaced) {
        console.log(`Successfully inlined all CSS styles into ${path.basename(targetFile)}!`);
      }
    } else {
      console.log(`No CSS files found or matches resolved to inline in ${path.basename(targetFile)}.`);
    }
  } else {
    console.log(`File not found for inlining: ${targetFile}`);
  }
}

// Clean up the standalone CSS files now that ALL HTML pages have been injected
// Keep them to guarantee that any external preload references do not result in a 404!
for (const cssFilePath of cssFilesToDelete) {
  try {
    if (fs.existsSync(cssFilePath)) {
      // fs.unlinkSync(cssFilePath);
      console.log(`Keeping compiled standalone file on disk to prevent preload 404s: ${path.basename(cssFilePath)}`);
    }
  } catch (err) {
    console.error(`Failed to verify CSS file ${cssFilePath}: ${err.message}`);
  }
}

// Create 404.html duplicate as a fallback routing mechanism for GitHub Pages/SPA
const indexPath = path.join(distPath, 'index.html');
if (fs.existsSync(indexPath)) {
  const fallbackPath = path.join(distPath, '404.html');
  try {
    const finalHtml = fs.readFileSync(indexPath, 'utf-8');
    fs.writeFileSync(fallbackPath, finalHtml, 'utf-8');
    console.log('Successfully copied dist/index.html to dist/404.html for SPA routing!');
  } catch (err) {
    console.error(`Failed to create dist/404.html Fallback: ${err.message}`);
  }
} else {
  console.error(`Error: Header inliner could not find index.html at ${indexPath}`);
}

console.log('--- CSS Inliner finished ---');
