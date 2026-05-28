import express from "express";
import path from "path";
import fs from "fs";
import compression from "compression";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Enable fast response compression (Gzip/Deflate) for all API endpoints & static files
  app.use(compression());

  // Add a simple health check API endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Explicitly serve /images directory from both dist and public. Express static will fall through if not found.
  const distImagesPath = path.join(process.cwd(), "dist", "images");
  const publicImagesPath = path.join(process.cwd(), "public", "images");

  app.use("/images", express.static(distImagesPath, {
    maxAge: 31536000000, // 1 year in milliseconds
    etag: true,
    setHeaders: (res) => {
      res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    }
  }));

  app.use("/images", express.static(publicImagesPath, {
    maxAge: 31536000000, // 1 year in milliseconds
    etag: true,
    setHeaders: (res) => {
      res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    }
  }));

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
    
    // Explicit middleware for /assets to guarantee immutable long-term caching
    app.use("/assets", (req, res, next) => {
      res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
      next();
    });

    // Serve static files with efficient Cache-Control headers for long-term browser caching
    app.use(express.static(distPath, {
      maxAge: 31536000000, // 1 year in milliseconds
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

    // Explicit routes for Blog and Menu subpages to serve their compiled index.html
    app.get("/blog", (req, res) => {
      const blogIndexPath = path.join(distPath, "blog", "index.html");
      const headers: Record<string, string> = { "Cache-Control": "public, max-age=0, must-revalidate" };
      if (preloadHeaders.length > 0) headers["Link"] = preloadHeaders.join(", ");
      res.sendFile(fs.existsSync(blogIndexPath) ? blogIndexPath : indexPath, { headers });
    });

    app.get("/blog/*", (req, res) => {
      const blogIndexPath = path.join(distPath, "blog", "index.html");
      const headers: Record<string, string> = { "Cache-Control": "public, max-age=0, must-revalidate" };
      if (preloadHeaders.length > 0) headers["Link"] = preloadHeaders.join(", ");
      res.sendFile(fs.existsSync(blogIndexPath) ? blogIndexPath : indexPath, { headers });
    });

    app.get("/menu", (req, res) => {
      const menuIndexPath = path.join(distPath, "menu", "index.html");
      const headers: Record<string, string> = { "Cache-Control": "public, max-age=0, must-revalidate" };
      if (preloadHeaders.length > 0) headers["Link"] = preloadHeaders.join(", ");
      res.sendFile(fs.existsSync(menuIndexPath) ? menuIndexPath : indexPath, { headers });
    });

    app.get("/menu/*", (req, res) => {
      const menuIndexPath = path.join(distPath, "menu", "index.html");
      const headers: Record<string, string> = { "Cache-Control": "public, max-age=0, must-revalidate" };
      if (preloadHeaders.length > 0) headers["Link"] = preloadHeaders.join(", ");
      res.sendFile(fs.existsSync(menuIndexPath) ? menuIndexPath : indexPath, { headers });
    });

    // Fallback all other routes to single-page application index.html
    app.get("*", (req, res, next) => {
      // If the request targets a missing static file with an extension, don't serve index.html
      const ext = path.extname(req.path);
      if (ext && ext !== ".html") {
        return res.status(404).send("Not Found");
      }

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
