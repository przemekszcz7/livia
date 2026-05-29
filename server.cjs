var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_fs = __toESM(require("fs"), 1);
var import_compression = __toESM(require("compression"), 1);
var import_vite = require("vite");
var import_dotenv = __toESM(require("dotenv"), 1);
import_dotenv.default.config();
async function startServer() {
  const app = (0, import_express.default)();
  const PORT = 3e3;
  app.use((0, import_compression.default)());
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });
  app.get("/api/reviews", (req, res) => {
    const STATIC_REVIEWS = [
      {
        author_name: "Wiktor Blizniuk",
        rating: 5,
        relative_time_description: "",
        profile_photo_url: "",
        text: "Bardzo smaczna i \u015Bwie\u017Ca ryba, wszystko dobrze przygotowane. Du\u017Cy wyb\xF3r ryb \u2014 w\u0119dzonych oraz z pieca, ka\u017Cdy znajdzie co\u015B dla siebie. Ceny zar\xF3wno za ryby, jak i piwo bardzo przyst\u0119pne. Obs\u0142uga uprzejma i mi\u0142a, atmosfera spokojna i przyjemna.",
        source: "Facebook"
      },
      {
        author_name: "Beata Kuli\u0144ska",
        rating: 5,
        relative_time_description: "",
        profile_photo_url: "",
        text: "Ryby w\u0119dzone,sma\u017Cone pyszne ,jako\u015B\u0107 i \u015Bwie\u017Co\u015B\u0107 bardzo dobra ,starannie przygotowane z pasj\u0105 i zaanga\u017Cowaniem .\nMi\u0142a i przyjazna go\u015Bcinna atmosfera ,warto tu zajrze\u0107 a potem z przyjemno\u015Bci\u0105 wraca\u0107 ,bo zostaje smaczne mi\u0142e wspomnienie .\nBrawo dla w\u0142a\u015Bcicieli za prawdziw\u0105 ,szczer\u0105 kuchni\u0119. Beata Kulinska",
        source: "Google"
      },
      {
        author_name: "Joanna Przybylska",
        rating: 5,
        relative_time_description: "",
        profile_photo_url: "",
        text: "Rodzinna atmosfera, wida\u0107 i czu\u0107, \u017Ce sma\u017Calnia jest od pokole\u0144! W\u0142a\u015Brecele bardzo pomocni, doradza pomog\u0105! Wida\u0107, \u017Ce znaj\u0105 si\u0119 na rzeczy. Obs\u0142uga przemi\u0142a i slu\u017Caca pomoc\u0105 znaj\u0105ca si\u0119 na rzeczy. Polecam sma\u017Calnia na ka\u017Cda kiesze\u0144 i na ka\u017Cdego smakosza ryb! Paprykarz przepyszny, go\u0142abki z ryby w sosie pomidorowym pycha, i burger rybny pikabello, polecam z czystym sumieniem! Brak zdj\u0119\u0107 bo znikn\u0119\u0142o wszystko z talerzy. Czas oczekiwania jest naprawd\u0119 szybki, szybszy ni\u017C w nie jednym fast foodzie! Warto czeka\u0107!",
        source: "Google"
      },
      {
        author_name: "Anita Staszewska",
        rating: 5,
        relative_time_description: "",
        profile_photo_url: "",
        text: "Bardzo polecam \u201CLivia\u201D Sma\u017Calnia i w\u0119dzarnia ryb,szasz\u0142yk \u201Cryby u Ciszk\xF3w\u201D TRADYCJ\u0104 OD POKOLE\u0143\u2026 \u2014 \u015Bwie\u017Ce ryby, \u015Bwietnie doprawione i bardzo smaczne. Fishburger naprawd\u0119 rewelacyjny, soczysty i dobrze skomponowany, a go\u0142\u0105bki rybne to co\u015B wyj\u0105tkowego i wartego spr\xF3bowania. W\u0119dzone ryby pachn\u0105 i smakuj\u0105 jak prawdziwe domowe wyroby. Do tego mi\u0142a obs\u0142uga i fajny nadmorski klimat. Zdecydowanie jedno z tych miejsc, do kt\xF3rych chce si\u0119 wraca\u0107 podczas pobytu w Niechorzu.",
        source: "Google"
      }
    ];
    res.json({
      rating: 4.8,
      user_ratings_total: "190+",
      reviews: STATIC_REVIEWS,
      isLive: true
    });
  });
  const distImagesPath = import_path.default.join(process.cwd(), "dist", "images");
  const publicImagesPath = import_path.default.join(process.cwd(), "public", "images");
  app.use("/images", import_express.default.static(distImagesPath, {
    maxAge: 31536e6,
    // 1 year in milliseconds
    etag: true,
    setHeaders: (res) => {
      res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    }
  }));
  app.use("/images", import_express.default.static(publicImagesPath, {
    maxAge: 31536e6,
    // 1 year in milliseconds
    etag: true,
    setHeaders: (res) => {
      res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    }
  }));
  const isDev = process.env.NODE_ENV !== "production";
  if (isDev) {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    const indexPath = import_path.default.join(distPath, "index.html");
    let preloadHeaders = [];
    try {
      if (import_fs.default.existsSync(indexPath)) {
        const htmlContent = import_fs.default.readFileSync(indexPath, "utf-8");
        const jsMatches = [
          ...htmlContent.matchAll(/src=["'](\/assets\/[^"']+\.js)["']/g),
          ...htmlContent.matchAll(/href=["'](\/assets\/[^"']+\.js)["']/g)
        ];
        const preloads = Array.from(new Set(jsMatches.map((m) => m[1])));
        preloadHeaders = preloads.filter((url) => url.endsWith(".js")).map((url) => `<${url}>; rel=modulepreload; as=script`);
        console.log("Programmatic Link modulepreloads prepared:", preloadHeaders);
      }
    } catch (err) {
      console.error("Failed to parse index.html for preloading:", err.message);
    }
    app.use("/assets", import_express.default.static(import_path.default.join(distPath, "assets"), {
      maxAge: 31536e6,
      immutable: true,
      etag: true,
      setHeaders: (res) => {
        res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
      }
    }));
    app.use(import_express.default.static(distPath, {
      maxAge: 31536e6,
      // 1 year in milliseconds
      etag: true,
      setHeaders: (res, filePath) => {
        if (filePath.endsWith(".html")) {
          res.setHeader("Cache-Control", "public, max-age=0, must-revalidate");
          if (preloadHeaders.length > 0) {
            res.setHeader("Link", preloadHeaders.join(", "));
          }
        } else {
          res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
        }
      }
    }));
    app.get("/blog", (req, res) => {
      const blogIndexPath = import_path.default.join(distPath, "blog", "index.html");
      const headers = { "Cache-Control": "public, max-age=0, must-revalidate" };
      if (preloadHeaders.length > 0) headers["Link"] = preloadHeaders.join(", ");
      res.sendFile(import_fs.default.existsSync(blogIndexPath) ? blogIndexPath : indexPath, { headers });
    });
    app.get("/blog/*", (req, res) => {
      const blogIndexPath = import_path.default.join(distPath, "blog", "index.html");
      const headers = { "Cache-Control": "public, max-age=0, must-revalidate" };
      if (preloadHeaders.length > 0) headers["Link"] = preloadHeaders.join(", ");
      res.sendFile(import_fs.default.existsSync(blogIndexPath) ? blogIndexPath : indexPath, { headers });
    });
    app.get("/menu", (req, res) => {
      const menuIndexPath = import_path.default.join(distPath, "menu", "index.html");
      const headers = { "Cache-Control": "public, max-age=0, must-revalidate" };
      if (preloadHeaders.length > 0) headers["Link"] = preloadHeaders.join(", ");
      res.sendFile(import_fs.default.existsSync(menuIndexPath) ? menuIndexPath : indexPath, { headers });
    });
    app.get("/menu/*", (req, res) => {
      const menuIndexPath = import_path.default.join(distPath, "menu", "index.html");
      const headers = { "Cache-Control": "public, max-age=0, must-revalidate" };
      if (preloadHeaders.length > 0) headers["Link"] = preloadHeaders.join(", ");
      res.sendFile(import_fs.default.existsSync(menuIndexPath) ? menuIndexPath : indexPath, { headers });
    });
    app.get("*", (req, res, next) => {
      const ext = import_path.default.extname(req.path);
      if (ext && ext !== ".html") {
        return res.status(404).send("Not Found");
      }
      const headers = {
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
//# sourceMappingURL=server.cjs.map
