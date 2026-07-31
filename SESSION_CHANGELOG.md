# ChaloSchools — Session Changelog

**Date:** Thursday, 30 July 2026
**Project:** ChaloSchools website — `C:\Users\ITPL1\Desktop\chalowebsite\chalowebsite-main`
**Stack:** Next.js 16 (App Router) · React 19 · Prisma (SQLite) · Tailwind CSS v4 · Radix UI · Framer Motion · next-intl

This log covers four bodies of work completed in one session: Tier 3 roadmap items, a dark-mode fix, the full website content plan, and a site-wide animation build.

---

## 1. Tier 3 roadmap — accessibility, performance, i18n

- **Accessibility (code fixes):**
  - `Header.tsx` mega-dropdown — real `<button>` trigger with `aria-haspopup`/`aria-expanded`/`aria-controls`, keyboard + focus + `Escape` support, `role="menu"`.
  - `HeroSlideshow.tsx` carousel — `prefers-reduced-motion` respect, pause/play control, `aria-live` announcements, carousel semantics, `aria-current` dots.
- **Performance (`next.config.ts`):** AVIF/WebP image formats, 30-day `minimumCacheTTL`, `optimizePackageImports` for framer-motion + lucide-react.
- **i18n scaffold:** `next-intl` (cookie-based, no route restructure) — `src/i18n/{config,request,actions}.ts`, `messages/en.json` + `messages/hi.json`, `LanguageSwitcher.tsx`, provider in `layout.tsx`, Hero wired as reference pattern.
- **Doc:** `TIER3_EXECUTION.md` — checklist for the Lighthouse + screen-reader passes that require a local machine.

## 2. Dark-mode fix

- `product/page.tsx` — replaced hardcoded `bg-white` with theme token `bg-card` in the "What is ChaloSchools?" section and FAQ cards (were invisible/unreadable in dark mode). Site-wide sweep confirmed no other real offenders.

## 3. Content plan (Chalo_Schools_Website_Content_Plan.docx) — sections A–G

**Decisions on record:** 500+ Schools · 2 Lakh+ Students · 10,000+ Teachers · keep "India's #1" (no Tamil Nadu pivot) · Pricing quote-only (no ₹).

- **Feature pages (11)** + **Solution-by-board pages (6)** — copy rewritten in `src/data/site-data.ts`. Per-solution stats reconciled to non-conflicting qualitative values.
- **Homepage** — Trust stats (`TrustStats.tsx`) → 500+/2 Lakh+/10,000+/99.9%; Hero badge (EN+HI) → 500+; Problems section rewritten to the doc's 4 problems.
- **Pricing page** — new `/pricing` (quote-only, 3 tiers, FAQs); wired into Header (desktop+mobile), Footer, sitemap.
- **By-Role pages (5)** — new `roles[]` data + `/solutions/role/[role]` route; Header "By Role" links fixed; added to sitemap.
- **4 new homepage sections** — `DemoVideo`, `CaseStudySnapshot`, `PricingTeaser`, `BlogStrip` (DB-wired, graceful hide / asset-aware).
- **Resources pages (6)** + **Company pages (7)** — hero copy applied (About kept merged).
- **Feature template enhanced** — `problems[]` + `faqs[]` added to `FeatureData` and rendered (Hero → Problem → Benefits → Features → FAQ → CTA).
- **Database:** 17 `SiteContent` rows updated in `prisma/db/custom.db` to doc values (backup: `custom.db.bak_20260730_125507`).
- **Doc:** `CONTENT_GAP_ANALYSIS.md` — full progress tracker.

## 4. Site-wide animation build (Framer Motion + CSS)

- **Foundation:**
  - `globals.css` — 12 new `@keyframes`, hover utilities (`card-lift`, `card-3d`, `magnetic-hover`, `glass-card`, `glow-border`, `hover-underline`, `gradient-hover`, `spotlight`, `card-shine`, `conic-border`, `ripple`), themed scrollbar + `::selection`, `@property --angle`, full `prefers-reduced-motion` guard.
  - `src/lib/motion.tsx` — reusable primitives: `FadeIn`, `Stagger`/`StaggerItem`, `AnimatedCounter`, `Marquee`, `GlassCard`, `TiltCard` + spring/timing presets. All respect reduced-motion.
- **Hero** (`HeroSection.tsx`) — gradient mesh bg, mouse-parallax orbs, word-by-word blur reveal, typing loop, pulsing CTA ring, animated gradient line.
- **Navigation** (`Header.tsx`) — scroll-blur, staggered dropdown items, mobile accordion (height-auto), `layoutId` active indicator.
- **Floating widgets** (`FloatingWhatsApp.tsx`, `ChatBot.tsx`) — spring entrance, concentric pulse rings, `AnimatePresence` open/close, scale hover/tap.
- **Cards** (feature/solution/pricing pages + `FeatureHighlights.tsx`) — `card-lift` + `card-shine`.
- **CTA** (`FinalCTA.tsx`) — rotating conic-gradient border, floating particles, shimmer sweep button; badge fixed to 500+.
- **Stat counters** (`TrustStats.tsx`) — numbers count up (rAF, cubic ease-out, 2s) on scroll-into-view; parser handles "500+", "2 Lakh+", "10,000+" (comma re-added), "99.9%".
- **Page chrome** (`PageChrome.tsx`, mounted in `(public)/layout.tsx`) — scroll-progress top bar (spring), back-to-top button (spring entrance after 500px, bottom-left to avoid the right-side widgets).
- **Form success** (`ContactForm.tsx`) — spring-popping checkmark + fade-in on the "Thank You" state.
- **Mesh tuning** — hero gradient mesh made visible (4-color radial blobs, mix-blend-screen, opacity ~0.72); headline blur reveal + CTA pulse rings intensified.

## 5. Cleanup / bug fixes

- **De-bloated 8+ files** inflated by session-tab auto-saves (e.g. `Header.tsx` 382 KB → 12 KB, `site-data.ts` 196 KB → ~24 KB).
- **Fixed duplicate `getRoleBySlug` / `RoleData`** that broke the build (rebuilt `site-data.ts` deterministically, one of each).
- **Deleted** unused `CTASection.tsx` (0 imports; stale content).

---

## Still open (needs the user / a local run)

- **Assets/data (no-fabricate):** demo video URL (`NEXT_PUBLIC_DEMO_VIDEO_URL`), brochure PDF, real case-study metrics, published blog posts, webinar content.
- **Machine-only verification:** `npm run dev` for a build/render check; Lighthouse (`npm run build && npm start`); screen-reader / axe a11y pass; toggle OS reduce-motion to confirm animations disable.
- **Optional animation items not done:** full-screen page loader (deliberately skipped — hurts perceived perf on a force-dynamic app), true form↔success AnimatePresence crossfade (checkmark spring done instead), SVG path-draw dividers.

## Known gotcha for this project

Session-tab auto-saves repeatedly re-bloat open files with blank lines and can even duplicate export blocks. If a file balloons or the build reports a "defined multiple times" error, normalize/rebuild the file deterministically (a `normalize_whitespace_bloated_file` helper was used during this session).
