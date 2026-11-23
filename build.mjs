// Builds the site: essays/*.md -> dist/
// Run with: npm run build   (or `npm run dev` to rebuild on save and serve locally)
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import MarkdownIt from "markdown-it";
import footnote from "markdown-it-footnote";

const ROOT = path.dirname(new URL(import.meta.url).pathname);
const OUT = path.join(ROOT, "dist");
const config = JSON.parse(fs.readFileSync(path.join(ROOT, "site.config.json"), "utf8"));
const siteUrl = (config.customDomain ? `https://${config.customDomain}` : config.url).replace(/\/$/, "");

const md = new MarkdownIt({ html: true, linkify: true, typographer: true }).use(footnote);
// Open external links in a new tab.
const defaultLinkOpen = md.renderer.rules.link_open || ((t, i, o, e, s) => s.renderToken(t, i, o));
md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
  const href = tokens[idx].attrGet("href") || "";
  if (/^https?:\/\//.test(href)) {
    tokens[idx].attrSet("target", "_blank");
    tokens[idx].attrSet("rel", "noopener");
  }
  return defaultLinkOpen(tokens, idx, options, env, self);
};
md.renderer.rules.footnote_block_open = () =>
  '<section class="footnotes"><h2>Notes</h2><ol class="footnotes-list">\n';

const esc = (s = "") =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const fmtDate = (d) =>
  new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });

// ---------- load essays ----------
const essayDir = path.join(ROOT, "essays");
const essays = fs
  .readdirSync(essayDir)
  .filter((f) => f.endsWith(".md"))
  .map((file) => {
    const { data, content } = matter(fs.readFileSync(path.join(essayDir, file), "utf8"));
    const slug = file.replace(/\.md$/, "");
    const body = content.split(/\n\[\^\d+\]:/)[0]; // don't count footnotes toward read time
    const words = body.replace(/<[^>]+>|\(https?:[^)]+\)/g, " ").split(/\s+/).filter(Boolean).length;
    return {
      slug,
      ...data,
      url: `/essays/${slug}/`,
      readMins: Math.max(1, Math.round(words / 230)),
      html: md.render(content),
    };
  })
  .filter((e) => !e.hidden)
  .sort((a, b) => new Date(b.date) - new Date(a.date));

// ---------- templates ----------
const layout = ({ title, description, body, image, pathname = "/", type = "website" }) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${siteUrl}${pathname}">
<meta property="og:type" content="${type}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${siteUrl}${pathname}">
${image ? `<meta property="og:image" content="${siteUrl}${image}">\n<meta name="twitter:card" content="summary_large_image">` : ""}
<link rel="alternate" type="application/rss+xml" title="${esc(config.title)}" href="/feed.xml">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;1,8..60,400&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/styles.css">
</head>
<body>
<header class="site-header">
  <div class="wrap header-inner">
    <a class="brand" href="/">${esc(config.title)}</a>
    <nav>
      <a href="/">Essays</a>
      <a href="/feed.xml">RSS</a>
    </nav>
  </div>
</header>
<main>
${body}
</main>
<footer class="site-footer">
  <div class="wrap footer-inner">
    <span>© ${new Date().getFullYear()} ${esc(config.author)}</span>
    <span class="footer-links">${config.links.map((l) => `<a href="${esc(l.href)}" target="_blank" rel="noopener">${esc(l.label)}</a>`).join("")}<a href="/feed.xml">RSS</a></span>
  </div>
</footer>
</body>
</html>
`;

const meta = (e) =>
  `<time datetime="${new Date(e.date).toISOString().slice(0, 10)}">${fmtDate(e.date)}</time><span class="dot">·</span><span>${e.readMins} min read</span>${
    e.draft ? '<span class="badge">Draft</span>' : ""
  }`;

const card = (e) => `
  <article class="card">
    <a class="card-link" href="${e.url}" aria-label="${esc(e.title)}">
      <div class="card-image"><img src="${e.cover}" alt="${esc(e.coverAlt || "")}" loading="lazy"></div>
      <div class="card-body">
        <h2 class="card-title">${esc(e.title)}</h2>
        <p class="card-subtitle">${esc(e.subtitle || "")}</p>
        <div class="meta">${meta(e)}</div>
        <span class="read-more">Read essay <span aria-hidden="true">→</span></span>
      </div>
    </a>
  </article>`;

const homeBody = `
<section class="wrap intro">
  <h1>Essays</h1>
</section>
<section class="wrap essay-list">
${essays.map(card).join("\n")}
</section>`;

const essayBody = (e, i) => {
  const newer = essays[i - 1];
  const older = essays[i + 1];
  return `
<article class="essay">
  <header class="wrap-narrow essay-header">
    <h1>${esc(e.title)}</h1>
    ${e.subtitle ? `<p class="essay-subtitle">${esc(e.subtitle)}</p>` : ""}
    <div class="meta"><span>${esc(config.author)}</span><span class="dot">·</span>${meta(e)}</div>
  </header>
  <figure class="wrap essay-cover"><img src="${e.cover}" alt="${esc(e.coverAlt || "")}"></figure>
  ${e.draft ? `<div class="wrap-narrow"><p class="draft-note">This essay is a working draft. Expect it to change.</p></div>` : ""}
  <div class="wrap-narrow prose">
${e.html}
  </div>
  <nav class="wrap-narrow essay-nav">
    ${older ? `<a href="${older.url}"><small>Previous</small>${esc(older.title)}</a>` : "<span></span>"}
    ${newer ? `<a class="next" href="${newer.url}"><small>Next</small>${esc(newer.title)}</a>` : "<span></span>"}
  </nav>
</article>`;
};

// ---------- write output ----------
fs.rmSync(OUT, { recursive: true, force: true });
fs.cpSync(path.join(ROOT, "public"), OUT, { recursive: true });
const write = (rel, content) => {
  const p = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, content);
};

write("index.html", layout({ title: config.title, description: config.tagline, body: homeBody, image: essays[0]?.cover }));
essays.forEach((e, i) =>
  write(
    `essays/${e.slug}/index.html`,
    layout({
      title: `${e.title} · ${config.title}`,
      description: e.subtitle || "",
      body: essayBody(e, i),
      image: e.cover,
      pathname: e.url,
      type: "article",
    })
  )
);
write(
  "404.html",
  layout({
    title: `Not found · ${config.title}`,
    description: "Page not found",
    body: `<section class="wrap intro"><h1>Page not found</h1><p><a href="/">Back to all essays →</a></p></section>`,
  })
);
write(
  "feed.xml",
  `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel>
<title>${esc(config.title)}</title><link>${siteUrl}/</link><description>${esc(config.tagline)}</description>
${essays
  .map(
    (e) =>
      `<item><title>${esc(e.title)}</title><link>${siteUrl}${e.url}</link><guid>${siteUrl}${e.url}</guid><pubDate>${new Date(e.date).toUTCString()}</pubDate><description>${esc(e.subtitle || "")}</description></item>`
  )
  .join("\n")}
</channel></rss>
`
);
if (config.customDomain) write("CNAME", config.customDomain + "\n");
write(".nojekyll", "");

console.log(`Built ${essays.length} essays -> dist/`);
