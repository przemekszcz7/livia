import fs from 'fs';
import path from 'path';

const distPath = path.join(process.cwd(), 'dist');
const indexPath = path.join(distPath, 'index.html');

console.log('--- Starting CSS Inliner ---');

if (fs.existsSync(indexPath)) {
  let html = fs.readFileSync(indexPath, 'utf-8');
  
  // Find all <link ...> tags
  const linkRegex = /<link\s+([^>]+)>/g;
  let match;
  let replaced = false;
  
  // Keep track of Replacements to perform at the end (to avoid messing up regex indices)
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
      console.log(`Inlining CSS: ${path.basename(rep.filePath)} (${(cssContent.length / 1024).toFixed(2)} KB)`);
      html = html.replace(rep.tag, `<style>${cssContent}</style>`);
      replaced = true;
      
      // Delete the standalone CSS file so there is no extra network request or idle asset
      fs.unlinkSync(rep.filePath);
      console.log(`Cleaned up original file: ${path.basename(rep.filePath)}`);
    } catch (err) {
      console.error(`Failed to inline CSS: ${err.message}`);
    }
  }
  
  if (replaced) {
    fs.writeFileSync(indexPath, html, 'utf-8');
    console.log('Successfully inlined all CSS styles into dist/index.html!');
  } else {
    console.log('No CSS files found or matches resolved to inline.');
  }
} else {
  console.error(`Error: Header inliner could not find index.html at ${indexPath}`);
}
console.log('--- CSS Inliner finished ---');
