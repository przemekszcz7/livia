import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Add a simple health check API endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Integrate Vite middleware or serve static files with optimized Cache-Control headers
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    const indexPath = path.join(distPath, "index.html");
    
    // Find compiled Vite JS files to programmatically craft a Link preload header
    let preloadHeaders: string[] = [];
    try {
      if (fs.existsSync(indexPath)) {
        const htmlContent = fs.readFileSync(indexPath, "utf-8");
        // Match absolute script/link references inside dist/index.html to find hashed JS bundles
        const jsMatches = [
          ...htmlContent.matchAll(/src=["'](\/assets\/[^"']+\.js)["']/g),
          ...htmlContent.matchAll(/href=["'](\/assets\/[^"']+\.js)["']/g)
        ];
        
        const preloads = Array.from(new Set(jsMatches.map(m => m[1])));
        preloadHeaders = preloads
          .filter(url => url.endsWith(".js"))
          .map(url => `<${url}>; rel=modulepreload; as=script`);
        
        console.log("Programmatic Link modulepreloads prepared:", preloadHeaders);
      }
    } catch (err: any) {
      console.error("Failed to parse index.html for preloading:", err.message);
    }
    
    // Serve static files with efficient Cache-Control headers for long-term browser caching
    app.use(express.static(distPath, {
      maxAge: "1y", // default fallback of 1 year for static assets
      etag: true,
      setHeaders: (res, filePath) => {
        if (filePath.endsWith(".html")) {
          // HTML entry points should always revalidate to get latest builds immediately
          res.setHeader("Cache-Control", "public, max-age=0, must-revalidate");
          if (preloadHeaders.length > 0) {
            res.setHeader("Link", preloadHeaders.join(", "));
          }
        } else {
          // All other static assets (JS, CSS, images, fonts, sitemap, robots.txt) can be cached for 1 year
          res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
        }
      }
    }));

    // Fallback all other routes to single-page application index.html
    app.get("*", (req, res) => {
      const headers: Record<string, string> = {
        "Cache-Control": "public, max-age=0, must-revalidate"
      };
      if (preloadHeaders.length > 0) {
        headers["Link"] = preloadHeaders.join(", ");
      }
      res.sendFile(indexPath, { headers });
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
