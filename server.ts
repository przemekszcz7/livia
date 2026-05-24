import express from "express";
import path from "path";
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
    
    // Serve static files with efficient Cache-Control headers for long-term browser caching
    app.use(express.static(distPath, {
      maxAge: "1y", // default fallback of 1 year for static assets
      etag: true,
      setHeaders: (res, filePath) => {
        if (filePath.endsWith(".html")) {
          // HTML entry points should always revalidate to get latest builds immediately
          res.setHeader("Cache-Control", "public, max-age=0, must-revalidate");
        } else {
          // All other static assets (JS, CSS, images, fonts, sitemap, robots.txt) can be cached for 1 year
          res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
        }
      }
    }));

    // Fallback all other routes to single-page application index.html
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"), {
        headers: {
          "Cache-Control": "public, max-age=0, must-revalidate"
        }
      });
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
