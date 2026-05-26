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
async function startServer() {
  const app = (0, import_express.default)();
  const PORT = 3e3;
  app.use((0, import_compression.default)());
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });
  const imagesPath = import_fs.default.existsSync(import_path.default.join(process.cwd(), "dist", "images")) ? import_path.default.join(process.cwd(), "dist", "images") : import_path.default.join(process.cwd(), "public", "images");
  app.use("/images", import_express.default.static(imagesPath, {
    maxAge: "1d",
    etag: true
  }));
  if (process.env.NODE_ENV !== "production") {
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
    app.use(import_express.default.static(distPath, {
      maxAge: "1y",
      // default fallback of 1 year for static assets
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
    app.get("*", (req, res) => {
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
