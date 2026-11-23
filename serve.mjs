// Tiny local preview server: `npm run dev` rebuilds on change and serves dist/ at http://localhost:4321
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const ROOT = path.dirname(new URL(import.meta.url).pathname);
const DIST = path.join(ROOT, "dist");
const build = () => { try { execSync("node build.mjs", { cwd: ROOT, stdio: "inherit" }); } catch {} };
build();
if (process.argv.includes("--watch")) {
  let t;
  for (const dir of ["essays", "public"]) fs.watch(path.join(ROOT, dir), { recursive: true }, () => { clearTimeout(t); t = setTimeout(build, 150); });
  fs.watch(path.join(ROOT, "build.mjs"), () => { clearTimeout(t); t = setTimeout(build, 150); });
}
const types = { ".html": "text/html", ".css": "text/css", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp", ".xml": "application/xml" };
http.createServer((req, res) => {
  let p = path.join(DIST, decodeURIComponent(req.url.split("?")[0]));
  if (fs.existsSync(p) && fs.statSync(p).isDirectory()) p = path.join(p, "index.html");
  if (!fs.existsSync(p)) { res.writeHead(404, { "content-type": "text/html" }); return res.end(fs.readFileSync(path.join(DIST, "404.html"))); }
  res.writeHead(200, { "content-type": types[path.extname(p)] || "application/octet-stream" });
  fs.createReadStream(p).pipe(res);
}).listen(4321, () => console.log("Preview at http://localhost:4321"));
