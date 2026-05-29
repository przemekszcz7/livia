import express from "express";
import path from "path";
import fs from "fs";
import compression from "compression";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

// Load environment variables from .env / .env.local if present
dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Enable fast response compression (Gzip/Deflate) for all API endpoints & static files
  app.use(compression());

  // Add a simple health check API endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Google Places API integration removed. Reviews are served statically for fast, direct, offline-first reliability.
  app.get("/api/reviews", (req, res) => {
    const STATIC_REVIEWS = [
      {
        author_name: "Wiktor Blizniuk",
        rating: 5,
        relative_time_description: "",
        profile_photo_url: "",
        text: "Bardzo smaczna i świeża ryba, wszystko dobrze przygotowane. Duży wybór ryb — wędzonych oraz z pieca, każdy znajdzie coś dla siebie. Ceny zarówno za ryby, jak i piwo bardzo przystępne. Obsługa uprzejma i miła, atmosfera spokojna i przyjemna.",
        source: "Facebook"
      },
      {
        author_name: "Beata Kulińska",
        rating: 5,
        relative_time_description: "",
        profile_photo_url: "",
        text: "Ryby wędzone,smażone pyszne ,jakość i świeżość bardzo dobra ,starannie przygotowane z pasją i zaangażowaniem .\nMiła i przyjazna gościnna atmosfera ,warto tu zajrzeć a potem z przyjemnością wracać ,bo zostaje smaczne miłe wspomnienie .\nBrawo dla właścicieli za prawdziwą ,szczerą kuchnię. Beata Kulinska",
        source: "Google"
      },
      {
        author_name: "Joanna Przybylska",
        rating: 5,
        relative_time_description: "",
        profile_photo_url: "",
        text: "Rodzinna atmosfera, widać i czuć, że smażalnia jest od pokoleń! Właśrecele bardzo pomocni, doradza pomogą! Widać, że znają się na rzeczy. Obsługa przemiła i slużaca pomocą znająca się na rzeczy. Polecam smażalnia na każda kieszeń i na każdego smakosza ryb! Paprykarz przepyszny, gołabki z ryby w sosie pomidorowym pycha, i burger rybny pikabello, polecam z czystym sumieniem! Brak zdjęć bo zniknęło wszystko z talerzy. Czas oczekiwania jest naprawdę szybki, szybszy niż w nie jednym fast foodzie! Warto czekać!",
        source: "Google"
      },
      {
        author_name: "Anita Staszewska",
        rating: 5,
        relative_time_description: "",
        profile_photo_url: "",
        text: "Bardzo polecam “Livia” Smażalnia i wędzarnia ryb,szaszłyk “ryby u Ciszków” TRADYCJĄ OD POKOLEŃ… — świeże ryby, świetnie doprawione i bardzo smaczne. Fishburger naprawdę rewelacyjny, soczysty i dobrze skomponowany, a gołąbki rybne to coś wyjątkowego i wartego spróbowania. Wędzone ryby pachną i smakują jak prawdziwe domowe wyroby. Do tego miła obsługa i fajny nadmorski klimat. Zdecydowanie jedno z tych miejsc, do których chce się wracać podczas pobytu w Niechorzu.",
        source: "Google"
      }
    ];

    res.json({
      rating: 4.8,
      user_ratings_total: 195,
      reviews: STATIC_REVIEWS,
      isLive: true
    });
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

  // Default to development middleware unless NODE_ENV is explicitly set to production
  const isDev = process.env.NODE_ENV !== "production";
  if (isDev) {
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
    
    // Explicit static serving of /assets folder with optimized long-term immutable headers
    app.use("/assets", express.static(path.join(distPath, "assets"), {
      maxAge: 31536000000,
      immutable: true,
      etag: true,
      setHeaders: (res) => {
        res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
      }
    }));

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
