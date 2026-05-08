# Design System — Rio/OS Documentation

## Product Context
- **What this is:** Documentation site for Rio/OS v2 — the Megam Vertice / Rio/OS distributed cloud-OS lineage continued under `rioos.megam.io`.
- **Who it's for:** Operators, developers, and integrators reading API references, install guides, and operational docs.
- **Sibling site:** `docs.megam.io` (v1 closure record / archive). Same editorial-archive system, different accent.
- **Project type:** Editorial / technical docs — MDX prose, reference tables, and an embedded Redoc API explorer.

## Memorable Thing
The site should feel like a *technical archive of a real distributed system* — quiet, weighty, mint-tinted. It must read as related to `docs.megam.io` (same fonts, same grid, same square corners) while being unmistakably **a different site** at a glance: mint where megam.io is cyan.

## Aesthetic Direction
- **Direction:** Editorial-archive on a dark canvas, single restrained mint accent, serif display voice.
- **Decoration level:** Intentional. Faint scanline grid, one quiet mint radial wash, otherwise type and rules do the work.
- **Mood:** Solemn but specific. Documentation as memorial to a working system, not as marketing collateral.
- **Reference posture:** Inherits the `docs.megam.io` system wholesale. The single deliberate fork is the accent hue.

## Typography

| Role | Font | Notes |
|---|---|---|
| Display (h1-h4, hero) | **Fraunces** (variable, opsz 9-144, wght 400-700) | Optical sizing on. Heavier weights (600) for hero/h1, medium (500) for h2-h4. |
| Body | **General Sans** (Fontshare, weights 400/500/600) | Neutral grotesque, deliberately not Inter. |
| Eyebrow / nav / metadata | **JetBrains Mono** (weights 400/500) | Uppercase + `tracking-meta: 0.12em`. Used for nav, side-nav rails, table headers, footer. |
| Code | **JetBrains Mono** | Inline + Redoc code blocks. |

**Loading:** All three loaded via `@import` at the top of `app/globals.css`. Same loaders as `docs.megam.io`.

**Type scale, tracking, leading:** identical to `docs.megam.io` (see that DESIGN.md for token table). Same fluid clamp values; same `--size-h4`; same `--tracking-hero: -0.02em`. Cross-site visual rhyme is intentional.

## Color

- **Approach:** Restrained. One accent (mint), neutrals on dark canvas, no semantic palette.
- **Canvas:** `--canvas: #0a0a0f`, `--canvas-elevated: #11131a`. Identical to `docs.megam.io` — the canvas is shared system identity.
- **Text:** primary `rgba(255,255,255,0.92)`, secondary `0.6`, muted `0.45`. White-with-alpha so contrast tracks the canvas.
- **Accent:** `--accent-mint: #3df5c5` aliased as `--accent-primary`. The single deliberate fork from `docs.megam.io`'s `#00e5ff` cyan. Mint reads as **living technical system** vs. cyan's **archive**.
- **Rules:** `--rule-faint: rgba(61,245,197,0.2)` for borders/separators; `--rule-strong: rgba(61,245,197,0.6)` for default link underlines.
- **Glow:** `--glow-primary: 0 0 32px rgba(61,245,197,0.35)`. Scoped to `.glow-link` only (currently the wordmark). Universal `a:hover` does NOT glow.
- **Status accent:** `--accent-warn: #ffb000` (amber). Status-only — archive banner, dead-link strikethrough. Not a brand color.
- **Dark mode:** Site is dark-only. No light variant.
- **Dropped tokens (intentional, vs. earlier rioos draft):** `--accent-magenta`, `--accent-green` (lime secondary), `--accent-secondary`, `--glow-strong`. Three accents read as synthwave; one accent reads as documentation.

## Spacing, Layout, Motion, Decorative Treatments

Identical to `docs.megam.io`: 8px base unit, 280px side-nav + `minmax(0, 1fr)` main shell, sticky blurred header, square corners across the system, scanline grid at `opacity: 0.03`, single radial wash at `0.04` opacity, page-enter animation only. See `~/Projects/docs.megam.io/DESIGN.md` for full details. Cross-site identity is the point.

## Component Patterns

- **`.wordmark.glow-link`** — Mono uppercase mint, the only `.glow-link` on the site. Reads `rioos.megam.io`. The wordmark is the only place glow fires.
- **`.docs-nav`, `.side-nav`, `.site-footer-inner`** — All share the mono-eyebrow voice (mono + `size-meta` + `tracking-meta` + uppercase).
- **`.content-page table`** — Headers in mono uppercase mint; cells in body sans; rules in `--rule-faint`.
- **`.archive-banner`** — Sticky amber-tinted banner above the header. Used for archive notices on retired pages, not present on live docs.
- **`.dead-link`** — Line-through with `(archived — inactive)` `::after`. For URLs that no longer resolve.
- **Redoc theme (`app/api_reference/index/redoc-view.tsx`)** — Headings in Fraunces, body in General Sans, code/links in mint. Theme overrides feed Redoc the same tokens as `globals.css`.

## Decisions Log

| Date | Decision | Rationale |
|---|---|---|
| 2026-05-08 | DESIGN.md created; system aligned to `docs.megam.io` | Both sites share an editorial-archive aesthetic; only the accent should diverge. Earlier rioos CSS used Space Grotesk + Inter + multi-accent palette — same AI-slop trap that megam.io abandoned. |
| 2026-05-08 | **Display: Space Grotesk → Fraunces** | Match `docs.megam.io`. Variable serif with optical sizing; gives technical-archive gravity. |
| 2026-05-08 | **Body: Inter → General Sans** | Match `docs.megam.io`. Inter is the convergence trap. |
| 2026-05-08 | **Palette compression: mint-only** | Removed `--accent-magenta`, `--accent-green`, `--accent-secondary`, `--glow-strong`. Single accent matches the megam.io rule. |
| 2026-05-08 | **Accent kept at mint `#3df5c5` (NOT shifted to cyan)** | The whole point of two sites is visual differentiation. Mint reads as living/technical; cyan reads as archive. The hue split is the brand split. |
| 2026-05-08 | **Hover glow scoped to `.glow-link`** | Universal `a:hover` text-shadow caused link flicker on dense pages. Wordmark only. |
| 2026-05-08 | **Radial gradient opacity 0.12 → 0.04, dropped second radial** | Brighter wash anchored the page to "tech demo." Single near-imperceptible wash reads as ambient. |
| 2026-05-08 | **Added `--size-h4` token, retuned tracking** | Match `docs.megam.io`'s scale: `--tracking-hero: -0.02em`, `--tracking-h1: -0.015em`, plus the missing h4 step. |
| 2026-05-08 | **Redoc theme: Space Grotesk → Fraunces, body → General Sans, hover lime → mint** | Redoc was using fonts that don't exist in our `@import` set, and the lime hover (`#a6ff00`) reintroduced the dropped second accent. |

## Rules for Future Edits

1. **Don't shift the accent toward cyan.** The mint/cyan split is the only thing keeping `rioos.megam.io` and `docs.megam.io` visually distinct. Tweaks toward greener or warmer mint are fine; toward cyan is not.
2. **Don't reintroduce a second accent (lime, magenta, secondary mint).** If a second accent is genuinely required for a specific role, propose it in the Decisions Log first with a concrete usage count.
3. **Don't add a second display font.** Fraunces / General Sans / JetBrains Mono is the whole voice — same constraint as megam.io.
4. **Don't put `text-shadow: var(--glow-primary)` on universal selectors.** Scope to `.glow-link` or a similarly intentional class.
5. **Don't add bubble border-radius.** Squared corners, like the sibling site.
6. **Mono-uppercase is reserved for eyebrow/metadata.** Not for body or h1-h4 — that's Fraunces' job.
7. **All borders use `--rule-faint` or `--rule-strong`.** Don't introduce ad-hoc border colors.
8. **Keep Redoc theme tokens in sync with `globals.css`.** If the accent changes, both `app/globals.css` and `app/api_reference/index/redoc-view.tsx` must change in the same commit.
9. **Amber is status-only.** Archive banner + dead-link strikethrough only. Not a brand color, not a button, not a rule.

## Open Questions

- **`next/font` migration?** Currently `@import` from Google Fonts + Fontshare. Self-hosting via `next/font` would eliminate FOUT. Defer until reported, and migrate `docs.megam.io` and `rioos.megam.io` together.
- **Mint at 2560px?** Mint on dark at very large sizes can look pale; verify hero rendering on 4K before declaring the accent locked.
