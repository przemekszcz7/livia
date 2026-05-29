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

  // Google Places API proxy / fallbacks for rich SEO and reviews
  app.get("/api/reviews", async (req, res) => {
    const FALLBACK_REVIEWS = [
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

    const apiKey = process.env.GOOGLE_PLACES_API_KEY || "AIzaSyANzPe5dAD46dreNcCBGsEg6Rm0P57LGG8";
    const placeId = process.env.GOOGLE_PLACE_ID || "ChIJDdlSqnB2AEcRwHXXkdm_Wvs"; // Default Place ID for Livia

    console.log("Reviews API request received:");
    console.log("- Key present:", !!apiKey, apiKey ? `(length: ${apiKey.trim().length}, starts with: ${apiKey.trim().substring(0, 4)}...)` : "");
    console.log("- Place ID:", placeId);

    const isPlaceholderKey = !apiKey || 
      apiKey.trim() === "" || 
      apiKey.toLowerCase().includes("your") || 
      apiKey.toLowerCase().includes("api_key") || 
      apiKey.toLowerCase().includes("placeholder") || 
      apiKey.toLowerCase().includes("my_");

    if (isPlaceholderKey) {
      console.log("Using cached fallback reviews. Reason: NO_VALID_API_KEY_CONFIGURED");
      return res.json({
        rating: 4.9,
        user_ratings_total: 157,
        reviews: FALLBACK_REVIEWS,
        isLive: false,
        debugError: "Nie skonfigurowano klucza API (GOOGLE_PLACES_API_KEY). Wprowadź poprawny klucz w ustawieniach."
      });
    }

    try {
      console.log("Fetching live Google reviews for Place ID:", placeId);
      const googleUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating,user_ratings_total&key=${apiKey.trim()}&language=pl`;
      
      const response = await fetch(googleUrl);
      const data: any = await response.json();

      console.log("Google Places API Response Status:", data.status);
      if (data.error_message) {
        console.log("Google Places API Error Message:", data.error_message);
      }

      if (data.status === "OK" && data.result) {
        const googleReviews = (data.result.reviews || []).map((rev: any) => ({
          author_name: rev.author_name,
          rating: rev.rating || 5,
          relative_time_description: rev.relative_time_description || "Niedawno",
          profile_photo_url: rev.profile_photo_url || "",
          text: rev.text || "",
          source: "Google"
        }));

        console.log(`Successfully fetched ${googleReviews.length} real Google reviews.`);

        return res.json({
          rating: data.result.rating || 4.9,
          user_ratings_total: data.result.user_ratings_total || 157,
          reviews: googleReviews,
          isLive: true
        });
      } else {
        console.log(`Google Places API returned non-OK status: ${data.status}. Falling back gracefully to pre-cached optimized reviews.`);
        
        let customDebugError = `Google Maps API zwróciło status: "${data.status}". ${data.error_message || "Upewnij się, że klucz jest poprawny, a usługa Places API i rozliczenia (billing) są włączone dla Twojego projektu."}`;
        
        if (data.error_message && data.error_message.toLowerCase().includes("referer restrictions")) {
          customDebugError = `Twój klucz API Google posiada restrykcje typu "HTTP referer (witryny internetowe)". Google Places API wywoływane bezpośrednio przez nasz bezpieczny serwer (Node/Express) nie akceptuje takich kluczy. Aby to naprawić, przejdź do Google Cloud Console, wejdź w zakładkę "Dane uwierzytelniające", wybierz swój klucz i w sekcji "Ograniczenia aplikacji" zmień typ na "Brak" (Unrestricted) lub stwórz dedykowany wolny klucz dla usług serwerowych.`;
        }

        return res.json({
          rating: 4.9,
          user_ratings_total: 157,
          reviews: FALLBACK_REVIEWS,
          isLive: false,
          googleStatus: data.status,
          googleErrorMessage: data.error_message,
          debugError: customDebugError
        });
      }
    } catch (err: any) {
      console.log("Failed to pull live Google Reviews:", err.message);
      return res.json({
        rating: 4.9,
        user_ratings_total: 157,
        reviews: FALLBACK_REVIEWS,
        isLive: false,
        debugError: `Błąd sieci podczas łączenia z Google API: ${err.message}`
      });
    }
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
