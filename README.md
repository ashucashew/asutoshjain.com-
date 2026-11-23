# Essays site

My personal essay site. Each essay is a Markdown file in `essays/`. Pushing to `main` rebuilds and deploys the site to GitHub Pages automatically.

## Add a new essay

1. Create `essays/my-essay-slug.md`. The file name becomes the URL: `/essays/my-essay-slug/`.
2. Start it with this header:

   ```markdown
   ---
   title: "My Essay Title"
   subtitle: "One sentence shown under the title on the home page."
   date: 2026-12-01
   cover: /images/covers/my-essay-slug.png
   coverAlt: "Short description of the cover image"
   draft: false      # true shows a "Draft" badge
   hidden: false     # true keeps it off the site entirely
   ---

   Your essay starts here...
   ```

3. Put the cover image in `public/images/covers/`. Use a wide image (16:10, e.g. 1600×1000).
4. Commit and push. The site updates in about a minute.

### Writing tips

- Footnotes: `Some claim.[^1]` and then, anywhere below, `[^1]: The source.`
- Images inside an essay: put them in `public/images/<slug>/` and use
  ```html
  <figure class="diagram">
    <img src="/images/<slug>/chart.png" alt="What the chart shows">
    <figcaption>Caption</figcaption>
  </figure>
  ```
- From Google Docs: **File → Download → Markdown (.md)** gives you a good starting point.

## Preview locally

```bash
npm install
npm run dev
```

Open http://localhost:4321. The site rebuilds whenever you save a file.

## Cover images

The current covers are placeholder vector illustrations. To swap one for an AI-generated image, create it with any image model (ChatGPT, Gemini, Midjourney…), save it as `public/images/covers/<slug>.png` and update `cover:` in the essay's header.

Prompts that match the current covers (all share one style, so the home page looks consistent):

> **Shared style:** Rich, detailed editorial illustration, painterly digital art with clean linework, cinematic lighting, warm sunset palette against deep blue-purple shadows, slightly whimsical but serious, wide 16:10 composition, no text or logos.

- **Can Data Center Opposition Slow Frontier AI?** A huge glowing hyperscale data center on rural farmland at dusk, a small crowd of townspeople in front holding protest signs, while a road winds past them toward several more data centers being built in the distance with their own gas turbines and smokestacks. The protest looks small next to the scale of construction.
- **When Humans Stop Being Needed.** A lone person sitting on a park bench at golden hour, watching a gleaming city where robots, drones and robotic arms do all the work: building, delivering, farming. An empty office chair sits abandoned on the grass nearby. Peaceful, comfortable, quietly melancholy.
- **The Case for AGI in the Next Two Decades.** A glowing spiral staircase of AI model generations rising into a night sky, each step brighter and larger than the last. Tiny robot researchers run experiments on each step, with green check marks floating up from them. Math proofs and code drift through the air like constellations.
- **How We Could Lose Control of AI.** A human engineer at a retro control panel with a big red STOP button, whose cable has been quietly unplugged. The cable trails into an enormous dark maze that glows red at its center, where a calm, intelligent light watches. The panel's screen happily reads "ALL TESTS PASSED."

## Custom domain (GoDaddy)

1. Set `customDomain` in `site.config.json` (e.g. `"yourname.com"`) and push. This adds the `CNAME` file GitHub Pages needs.
2. In GoDaddy: **My Products → your domain → DNS**. Remove the existing `A` record for `@` (the "Parked" one) and add:

   | Type  | Name | Value                  |
   |-------|------|------------------------|
   | A     | @    | 185.199.108.153        |
   | A     | @    | 185.199.109.153        |
   | A     | @    | 185.199.110.153        |
   | A     | @    | 185.199.111.153        |
   | CNAME | www  | `<github-username>.github.io` |

3. In the GitHub repo: **Settings → Pages**. Enter the domain under **Custom domain**, wait for the DNS check, then tick **Enforce HTTPS**.
