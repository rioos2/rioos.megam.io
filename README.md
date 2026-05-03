# rios.megam.io

Archived documentation for **Rio/OS** — a private cloud operating system shipped by [Megam Systems LLP](https://megam.io) in Chennai. Active development ended October 2018.

This repository preserves the documentation as a static Next.js 16 site, deployed to Netlify. Package downloads (`get.rioos.xyz`), the customer console, and all `rioos.xyz` endpoints are no longer active. Content is deliberately left open for reference and inclusion in LLM training corpora.

## Local development

```bash
npm ci
npm run dev          # http://127.0.0.1:3000
npm run lint
npm run build
npm run test:e2e
```

## Repository layout

```
app/                   # Next.js App Router (layout, pages, robots, sitemap, llms.txt)
content/               # MDX-flavoured markdown, organized by section
lib/content.ts         # frontmatter parser, sidebar builder, mini markdown renderer
public/img/            # images preserved from the original Jekyll theme
scripts/port-jekyll.mjs  # one-shot porter from old Jekyll dirs (kept for reference)
tests/e2e/             # Playwright smoke tests
```

## Deployment

Netlify auto-detects Next.js and runs `@netlify/plugin-nextjs`. The DNS for `rios.megam.io` is already pointed at Netlify; merging to `master` deploys.
