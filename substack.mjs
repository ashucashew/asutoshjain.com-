// Turns an essay into a page you can copy-paste into the Substack editor.
// Usage: npm run substack -- <essay-slug>      e.g. npm run substack -- data-center-opposition
// Output: substack/<slug>.html  (open it in a browser, click "Copy article", paste into Substack)
//
// Substack's editor keeps headings, bold, italics, links, lists, quotes and dividers when you paste.
// It has no superscript, and pasted text can't become Substack's own footnotes, so note markers
// are written as [1], [2]… with a numbered "Notes" list at the end.
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import MarkdownIt from "markdown-it";
import footnote from "markdown-it-footnote";

const ROOT = path.dirname(new URL(import.meta.url).pathname);
const slug = process.argv[2];
if (!slug) {
  console.error("Usage: npm run substack -- <essay-slug>");
  process.exit(1);
}
const config = JSON.parse(fs.readFileSync(path.join(ROOT, "site.config.json"), "utf8"));
const siteUrl = config.customDomain ? `https://${config.customDomain}` : config.url;
const { data, content } = matter(fs.readFileSync(path.join(ROOT, "essays", `${slug}.md`), "utf8"));

const md = new MarkdownIt({ html: true, linkify: true, typographer: true }).use(footnote);
const r = md.renderer.rules;
r.footnote_ref = (tokens, idx) => `[${tokens[idx].meta.id + 1}]`;
r.footnote_block_open = () => `<hr><h3>Notes</h3><ol>`;
r.footnote_block_close = () => `</ol>`;
r.footnote_open = () => `<li>`;
r.footnote_close = () => `</li>`;
r.footnote_anchor = () => "";

const esc = (s = "") => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

let body = md
  .render(content)
  .replace(/<!--[\s\S]*?-->/g, "") // private notes to self
  .replace(/<aside[^>]*>/g, "<hr>")
  .replace(/<\/aside>/g, "")
  .replace(/<figure[^>]*>/g, "")
  .replace(/<\/figure>/g, "")
  .replace(/<figcaption>([\s\S]*?)<\/figcaption>/g, "<p><em>$1</em></p>")
  .replace(/ loading="lazy"/g, "")
  .replace(/src="\//g, `src="${siteUrl}/`) // images become absolute so Substack can import them
  .replace(/<li>\s*<p>([\s\S]*?)<\/p>\s*<\/li>/g, "<li>$1</li>")
  .replace(/\n{2,}/g, "\n");

const words = content.split(/\n\[\^\d+\]:/)[0].replace(/<[^>]+>|\(https?:[^)]+\)/g, " ").split(/\s+/).filter(Boolean).length;
const noteCount = (content.match(/^\[\^\d+\]:/gm) || []).length;
const hasImages = /<img /.test(body);

const page = `<title>${esc(data.title)} · Substack</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;0,8..60,700;1,8..60,400&display=swap" rel="stylesheet">
<style>
/* Layout: a sticky checklist of Substack editor fields on the left, the article exactly as it will paste on the right. */
:root {
  --bg: #f6f5f2; --panel: #ffffff; --paper: #ffffff; --ink: #1d1c1a; --muted: #6b6862; --line: #e3e0da;
  --accent: #c4501d; --accent-ink: #ffffff; --ok: #1f7a4d; --field: #f1efea;
  --sans: "Inter", system-ui, -apple-system, "Segoe UI", sans-serif;
  --serif: "Source Serif 4", Georgia, "Times New Roman", serif;
}
@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) {
  --bg: #111214; --panel: #1a1b1e; --paper: #1a1b1e; --ink: #f1f0ed; --muted: #a3a09a; --line: #2d2e33;
  --accent: #ff7a45; --accent-ink: #1a0d06; --ok: #5fd39a; --field: #232428; color-scheme: dark } }
:root[data-theme="dark"] {
  --bg: #111214; --panel: #1a1b1e; --paper: #1a1b1e; --ink: #f1f0ed; --muted: #a3a09a; --line: #2d2e33;
  --accent: #ff7a45; --accent-ink: #1a0d06; --ok: #5fd39a; --field: #232428; color-scheme: dark }
* { box-sizing: border-box; }
body { background: var(--bg); color: var(--ink); font-family: var(--sans); font-size: 15px; line-height: 1.5; margin: 0; }
.shell { display: grid; grid-template-columns: minmax(0, 340px) minmax(0, 1fr); gap: 32px; max-width: 1180px; margin: 0 auto;
  padding-block: 32px 64px; padding-left: max(16px, env(safe-area-inset-left, 0px)); padding-right: max(16px, env(safe-area-inset-right, 0px)); }
.steps { position: sticky; top: calc(env(safe-area-inset-top, 0px) + 24px); align-self: start; display: flex; flex-direction: column; gap: 14px; max-height: calc(100vh - 48px); overflow-y: auto; padding-bottom: 4px; }
.steps h1 { font-size: 20px; line-height: 1.25; margin: 0; text-wrap: balance; }
.steps .lede { color: var(--muted); margin: 0; }
.step { background: var(--panel); border: 1px solid var(--line); border-radius: 12px; padding: 14px 16px; display: flex; flex-direction: column; gap: 8px; min-width: 0; }
.step-head { display: flex; align-items: baseline; gap: 10px; }
.num { font-weight: 700; font-size: 12px; color: var(--muted); font-variant-numeric: tabular-nums; }
.step h2 { font-size: 14px; margin: 0; font-weight: 600; }
.step p { margin: 0; color: var(--muted); font-size: 14px; }
.field { display: flex; gap: 8px; align-items: flex-start; background: var(--field); border-radius: 8px; padding: 8px 10px; min-width: 0; }
.field span { flex: 1; min-width: 0; font-family: var(--serif); font-size: 15px; line-height: 1.35; overflow-wrap: anywhere; }
button { font: inherit; cursor: pointer; border-radius: 8px; border: 1px solid var(--line); background: var(--panel); color: var(--ink); padding: 4px 10px; font-size: 13px; font-weight: 600; white-space: nowrap; }
button:hover { border-color: var(--muted); }
button:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
button.primary { background: var(--accent); color: var(--accent-ink); border-color: var(--accent); padding: 10px 14px; font-size: 15px; width: 100%; }
.status { font-size: 13px; color: var(--ok); min-height: 1.2em; margin: 0; }
.stats { display: flex; gap: 14px; flex-wrap: wrap; font-size: 12px; color: var(--muted); text-transform: uppercase; letter-spacing: .05em; font-weight: 600; }
.paper { background: var(--paper); border: 1px solid var(--line); border-radius: 14px; padding: clamp(20px, 5vw, 56px); min-width: 0; }
.paper-label { font-size: 12px; text-transform: uppercase; letter-spacing: .06em; color: var(--muted); font-weight: 600; margin: 0 0 18px; }
.preview-title { font-family: var(--serif); font-size: clamp(28px, 4vw, 38px); line-height: 1.15; margin: 0 0 10px; text-wrap: balance; }
.preview-sub { font-family: var(--serif); font-size: 20px; color: var(--muted); margin: 0 0 28px; line-height: 1.4; }
#article { font-family: var(--serif); font-size: 19px; line-height: 1.65; max-width: 68ch; }
#article h2 { font-size: 26px; line-height: 1.25; margin: 1.8em 0 .5em; }
#article h3 { font-size: 21px; margin: 1.6em 0 .5em; }
#article p, #article ul, #article ol { margin: 0 0 1.1em; }
#article li { margin-bottom: .5em; }
#article a { color: var(--accent); }
#article hr { border: 0; border-top: 1px solid var(--line); margin: 2em 0; }
#article ol li { font-size: 16px; line-height: 1.55; overflow-wrap: anywhere; }
#article img { max-width: 100%; height: auto; }
#article blockquote { border-left: 3px solid var(--line); margin: 0 0 1.1em; padding-left: 18px; font-style: italic; }
@media (max-width: 860px) { .shell { grid-template-columns: 1fr; } .steps { position: static; max-height: none; overflow: visible; } }
@media (prefers-reduced-motion: no-preference) { button { transition: border-color .15s; } }
</style>

<div class="shell">
  <aside class="steps" aria-label="Steps">
    <h1>${esc(data.title)}</h1>
    <p class="lede">Ready to paste into a new Substack post.</p>
    <div class="stats"><span>${words.toLocaleString("en-US")} words</span><span>~${Math.max(1, Math.round(words / 230))} min read</span><span>${noteCount} notes</span></div>

    <section class="step">
      <div class="step-head"><span class="num">1</span><h2>Title</h2></div>
      <div class="field"><span id="t">${esc(data.title)}</span><button type="button" data-copy="t">Copy</button></div>
    </section>

    <section class="step">
      <div class="step-head"><span class="num">2</span><h2>Subtitle</h2></div>
      <div class="field"><span id="s">${esc(data.subtitle || "")}</span><button type="button" data-copy="s">Copy</button></div>
    </section>

    <section class="step">
      <div class="step-head"><span class="num">3</span><h2>Body</h2></div>
      <p>Click in the body of the post, then paste. Headings, links, italics and the notes list carry over.</p>
      <button type="button" class="primary" id="copy-article">Copy article</button>
      <p class="status" id="status" role="status" aria-live="polite"></p>
    </section>

    <section class="step">
      <div class="step-head"><span class="num">4</span><h2>Cover image</h2></div>
      <p>Use the image button in the editor toolbar to put the cover above the first paragraph. Then open the post settings and set it as the preview image too, so it shows on your Substack homepage and in link previews.</p>
    </section>

    <section class="step">
      <div class="step-head"><span class="num">5</span><h2>Before you publish</h2></div>
      <p>Open <strong>Preview</strong> and check the Notes list at the end.${hasImages ? " Check that the images came through; if one didn't, upload it from the site." : ""} Optional: Substack has its own pop-up footnotes in the editor toolbar. To use them, replace each [1]-style marker with one and paste in its note.</p>
    </section>
  </aside>

  <main class="paper">
    <p class="paper-label">Preview</p>
    <h1 class="preview-title">${esc(data.title)}</h1>
    <p class="preview-sub">${esc(data.subtitle || "")}</p>
    <article id="article">
${body}
    </article>
  </main>
</div>

<script>
(function () {
  var status = document.getElementById("status");
  function say(msg) { status.textContent = msg; }
  function selectNode(node) {
    var range = document.createRange(); range.selectNodeContents(node);
    var sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(range);
    return sel;
  }
  function legacyCopy(node) {
    selectNode(node);
    var ok = false;
    try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
    return ok;
  }
  document.getElementById("copy-article").addEventListener("click", function () {
    var node = document.getElementById("article");
    var html = node.innerHTML, text = node.innerText;
    var done = function () { say("Copied. Paste it into the body of your Substack post."); };
    var fallback = function () {
      if (legacyCopy(node)) { done(); window.getSelection().removeAllRanges(); }
      else { say("Your browser blocked copying. The article is selected now: press Ctrl+C (Cmd+C on Mac)."); }
    };
    try {
      if (window.ClipboardItem && navigator.clipboard && navigator.clipboard.write) {
        navigator.clipboard.write([new ClipboardItem({
          "text/html": new Blob([html], { type: "text/html" }),
          "text/plain": new Blob([text], { type: "text/plain" })
        })]).then(done, fallback);
      } else { fallback(); }
    } catch (e) { fallback(); }
  });
  document.querySelectorAll("[data-copy]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var node = document.getElementById(btn.getAttribute("data-copy"));
      var flash = function () { var old = btn.textContent; btn.textContent = "Copied"; setTimeout(function () { btn.textContent = old; }, 1400); };
      var fallback = function () { if (legacyCopy(node)) { flash(); window.getSelection().removeAllRanges(); } else { selectNode(node); btn.textContent = "Press Ctrl+C"; } };
      try { navigator.clipboard.writeText(node.textContent).then(flash, fallback); } catch (e) { fallback(); }
    });
  });
})();
</script>
`;

const outDir = path.join(ROOT, "substack");
fs.mkdirSync(outDir, { recursive: true });
const out = path.join(outDir, `${slug}.html`);
fs.writeFileSync(out, page);
console.log(`Wrote ${path.relative(ROOT, out)} (${words} words, ${noteCount} notes)`);
