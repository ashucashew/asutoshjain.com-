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
- Substack: `npm run substack -- <slug>` writes `substack/<slug>.html`. Open it, click **Copy article** and paste into a new Substack post.
- From Google Docs: **File → Download → Markdown (.md)** gives you a good starting point.

## Preview locally

```bash
npm install
npm run dev
```

Open http://localhost:4321. The site rebuilds whenever you save a file.

## Cover images

The current covers are placeholder vector illustrations. To swap one for an AI-generated image, create it with any image model (ChatGPT, Gemini, Midjourney…), save it as `public/images/covers/<slug>.png` and update `cover:` in the essay's header.

Prompts for ChatGPT (or any image model). Each one includes the shared style, so you can paste them one at a time. Ask for a **landscape (3:2) image** and save it as `public/images/covers/<slug>.png`.

| Essay | File name |
|---|---|
| Will the US Ever Agree to Slow Down AI? | `ai-arms-race-game-theory.png` |
| Can Data Center Opposition Slow Frontier AI? | `data-center-opposition.png` |
| How We Could Lose Control of AI | `ai-loss-of-control.png` |
| The Case for AGI in the Next Two Decades | `case-for-agi-in-two-decades.png` |
| When Humans Stop Being Needed | `when-humans-stop-being-needed.png` |

The prompt text is in `cover-prompts.md`.

## Custom domain (GoDaddy)

1. Set `customDomain` in `site.config.json` (currently `"asutoshjain.com"`). This adds the `CNAME` file GitHub Pages needs.
2. In GoDaddy: **My Products → your domain → DNS**. Remove the existing `A` record for `@` (the "Parked" one) and add:

   | Type  | Name | Value                  |
   |-------|------|------------------------|
   | A     | @    | 185.199.108.153        |
   | A     | @    | 185.199.109.153        |
   | A     | @    | 185.199.110.153        |
   | A     | @    | 185.199.111.153        |
   | CNAME | www  | `ashucashew.github.io` |

3. In the GitHub repo: **Settings → Pages**. Enter the domain under **Custom domain**, wait for the DNS check, then tick **Enforce HTTPS**.
