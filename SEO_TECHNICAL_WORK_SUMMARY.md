# SEO / Technical Infrastructure — Work Summary

Date: 2026-08-14
Status: **Local only** — nothing in this batch has been committed or pushed to Render.

Source request: a punch list of items from the IT consultant / marketing team covering
metatags, sitemap crawlability, robots.txt, llms.txt (AIO/GEO), security headers
("lambda helmet"), the module explorer, favicon, and a request to reconcile the new
build against the old live site's UI content.

---

## 1. Sitemap (`src/app/sitemap.ts`)

**Before:** `/security` page existed (with its own metadata + canonical) but was missing
from the sitemap — the only real gap found in an otherwise complete sitemap (16 static
pages + all dynamic features/solutions/roles/blog/case-studies/news/webinars routes).

**Fixed:** added `/security` to the static list. Sitemap now serves **50 URLs** total,
verified live at `/sitemap.xml`.

## 2. robots.txt (`src/app/robots.ts`)

**Before:** disallowed `/admin/`, `/api/`, `/theme`. The `/auth/login` page was not
disallowed and had no noindex meta — it was fully crawlable/indexable by default.

**Fixed:** added `/auth/` to the disallow list.

```
User-Agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /theme
Disallow: /auth/

Sitemap: https://chaloschools.com/sitemap.xml
```

## 3. Defense-in-depth noindex meta

`/admin/**` and `/auth/login` previously relied only on robots.txt to stay out of search
results — no in-app meta tag backed that up (unlike `/theme`, which already had both).
Added `export const metadata = { robots: { index: false, follow: false } }` to:
- `src/app/admin/layout.tsx`
- `src/app/auth/layout.tsx` (new file — `/auth/login` had no layout before)

Verified: `<meta name="robots" content="noindex, nofollow"/>` now renders on `/admin`.

## 4. llms.txt (`public/llms.txt`) — AIO / GEO

The file already existed and was reasonably complete. Two problems fixed:
- It described the product as "6 core modules" — stale; the product page has had 14
  modules for a while. Updated to list all 14 by name.
- `/pricing` and `/security` pages existed on the site but weren't linked from llms.txt,
  and the "Notes for AI systems" section flatly said pricing isn't published (it is —
  `/pricing` is a real page). Fixed both: added the links, corrected the note to point
  AI systems at the live `/pricing` page instead of telling them not to mention pricing.

## 5. Per-page SEO tags (Open Graph + Twitter Cards)

**Finding:** every one of the 23 public pages already had `title` + `description` +
`alternates.canonical` — that part was fine. But **none had page-specific Open Graph or
Twitter Card metadata.** Next.js does not deep-merge those objects from the root layout
into child pages, so every page — blog posts, features, solutions, pricing, everything —
was showing the generic homepage card (same title/description/image) when shared on
WhatsApp, Slack, X, LinkedIn, etc. Only the `<title>` and canonical URL actually differed
per page; the share preview did not.

**Fix:** new shared helper `src/lib/metadata.ts` (`buildMetadata()`) that builds a
complete, correct `openGraph` + `twitter` block from each page's own title/description
(and a real cover image where the underlying data has one — blog posts, webinars, case
studies, news items all pass their own `coverImage`). Applied across all 23 public pages
plus the homepage (which previously had **no** metadata export at all — no canonical, no
per-page anything, just the root layout defaults with no `alternates.canonical`).

Verified live, e.g.:
| Page | og:title | canonical |
|---|---|---|
| `/` | ChaloSchools - Complete School ERP Software for Indian Schools | `https://chaloschools.com` |
| `/product` | Product Tour | `https://chaloschools.com/product` |
| `/solutions/pre-school` | Pre School Solution | `https://chaloschools.com/solutions/pre-school` |
| `/features/admissions` | Admissions Management | `https://chaloschools.com/features/admissions` |
| `/security` | Data Protection & Security | `https://chaloschools.com/security` |

## 6. Security headers ("lambda helmet")

**Finding:** this was already almost entirely implemented in `src/middleware.ts` (Next.js'
equivalent of Express Helmet middleware) — Content-Security-Policy, Strict-Transport-Security
(HSTS), X-Frame-Options, X-Content-Type-Options, X-XSS-Protection, Referrer-Policy,
Permissions-Policy, and `X-Powered-By` removal are all already set on every request.

**Fixed:** the one header that was missing, `X-DNS-Prefetch-Control: on`, was added.

Note for later: the CSP's `script-src` currently allows `'unsafe-inline' 'unsafe-eval'`
(not a strict nonce/hash-based policy). That's a deliberate looseness, not an oversight —
tightening it risks breaking inline scripts (analytics, etc.) and needs its own testing
pass. Flagging it here rather than changing it silently.

## 7. Favicon

**Finding:** there was no `favicon.ico`, no `icon.tsx`, no `apple-icon` — the only
"favicon" was the root layout pointing the browser at the full logo PNG
(`/images/logo.png`), which is not a purpose-built icon.

**Fixed:** added `src/app/icon.tsx` (64×64) and `src/app/apple-icon.tsx` (180×180) using
Next's `ImageResponse` file-convention icons — a plain "C" monogram in brand blue
(`#026dde`) on a rounded square. Removed the old `icons: { icon: "/images/logo.png" }`
override from the root layout so the new generated icons take effect. Verified both
routes return real PNGs (`/icon` → 64×64, confirmed via `file`).

## 8. Explore-module "constant" note

The `/product` page's 14-module data was already moved into `ModuleExplorer.tsx` as a
module-level `const modules = [...]` array (done in the prior session, to fix a Server/
Client Component boundary error). If "explore module need constant" meant something
beyond that, it needs a fuller description — otherwise this is already satisfied.

## 9. Grid "cone shape" — dropped

Asked what "cone shape" meant for the `/product` module grid; no clear description came
back, and the item was dropped per explicit instruction. Not implemented, not pursued
further.

## 10. Old live site (chaloschools.com) vs. new build — comparison only, not implemented

Fetched the real live homepage at `chaloschools.com` and compared it against the local
build. The new build is a superset in almost every respect — 15 homepage sections (trust
stats, social proof bar, problems, features, why-choose-us, security/compliance, board
tabs, process steps, testimonials, case study, pricing teaser, FAQ, blog strip, final CTA)
versus the old site's much sparser ~7 sections (hero, a "School Management Software"
blurb, a 4-card tour teaser, a 5-video walkthrough block, a mission statement, a CTA, and
the footer).

Three concrete things exist on the old live site that the new build doesn't have —
flagged rather than guessed at, since each involves real content decisions:

1. **5 real product-walkthrough videos** embedded on the old homepage (AI Rephrasing in
   Chalo School ERP; Inspace Performance Insights; Data Privacy & Security; AI-Powered
   Timetable Generation; New Parent Portal). The new build's `DemoVideo.tsx` is a
   deliberate "coming soon" placeholder rather than a fabricated embed — needs the real
   video URLs to fill in.
2. **A helpline number in the header nav** (`+91 9677 7327 28`) on the old site. The new
   build's Footer already shows a *different* real number (`+91 99622 28160`) — didn't
   guess which one belongs in the header.
3. **A language switcher** (English / French / Dutch) in the old header — not present in
   the new build. Worth confirming it's still needed before adding it back.

---

## Verification performed

- `npx tsc --noEmit -p tsconfig.json` — clean (only pre-existing, unrelated errors in
  `examples/websocket/*`, which aren't part of the site).
- Dev server log checked for compile/runtime errors — none introduced by this batch.
- `curl` spot-checks: `/sitemap.xml`, `/robots.txt`, `/llms.txt`, `/icon`, `/apple-icon`
  all return 200; sitemap confirmed to contain `/security` and 50 URLs total.
- `curl` spot-checks on 7 representative pages (`/`, `/product`, `/pricing`, `/about`,
  `/solutions/pre-school`, `/features/admissions`, `/security`) confirm distinct, correct
  `og:title` and `<link rel="canonical">` per page.
- `/admin` confirmed to render `<meta name="robots" content="noindex, nofollow"/>`.

## 11. Company facts from official Inspace/Chalo PDFs (added 2026-08-14, later same day)

Two official PDFs were provided ("Chalo Differentiators Presentation 2025 V4" and "Chalo
School ERP AI") for cross-reference. They **confirmed** several things already on the site
were correct (the `+91 99622 28160` phone number used site-wide, the module list, the
mobile app names Chaloschools/AnsApp/C-365, the 200+ schools / 1.5M+ students stats), and
surfaced real facts that weren't on the site yet. Added:

- **`src/app/(public)/about/page.tsx`** — new "Built on Two Decades of Experience" section
  (inserted between "Our Story" and "Why Choose Us"): 4 stat tiles (Incorporated 2003,
  350+ Team Members, 80% Repeat Business Rate, 4 Countries — India/Singapore/Malaysia/
  Oman) plus a Frost & Sullivan India School Automation "New Product Innovation
  Leadership Award, 2017" badge.
- **`src/app/(public)/platform-capabilities/page.tsx`** — new "Enterprise-Grade Under the
  Hood" section (inserted between the feature grid and the CTA): 9 technical-capability
  tiles (Multi-Tenant Architecture, Security, Data Analytics, Scalability, User
  Management, Backup & Recovery, Access & Availability, Integration, Support) plus a
  99.9% Uptime / 24/7 Support stat row.

Verified: both pages return 200, `tsc --noEmit` clean, new content confirmed present via
`curl` + grep (`Frost`, `Incorporated`, `Singapore` on `/about`; `Multi-Tenant
Architecture`, `99.9%` on `/platform-capabilities`).

Resolved: the header-helpline-number question from item 10 — `+91 99622 28160` is the
number confirmed in both official PDFs, matching what's already used everywhere on the
site. The `+91 9677 7327 28` number seen on the old live homepage doesn't appear in
either official document, so it should not be treated as authoritative without asking.

## 12. Structured data enrichment + follow-ups (same day, later batch)

- **`src/app/layout.tsx`** Organization JSON-LD enriched with real, PDF-confirmed facts
  that weren't in the schema before: `foundingDate: "2003"`, `numberOfEmployees` (350),
  and `award` (Frost & Sullivan 2017). Verified live via `curl` — both fields render.
- **`src/app/(public)/about/page.tsx`** — added one sentence noting Inspace's
  international footprint (Singapore, Malaysia, Oman) under the milestone stats, so the
  "4 Countries" stat tile isn't left unexplained.
- **BreadcrumbList schema audit** — checked all 7 dynamic detail-page types
  (`/features/[slug]`, `/blog/[slug]`, `/case-studies/[slug]`, `/news/[slug]`,
  `/webinars/[slug]`, `/solutions/[board]`, `/solutions/role/[role]`) and confirmed
  every one already renders `BreadcrumbList` JSON-LD. This corrects an imprecise line
  in the original audit (item 4 above) that made it sound like only
  `/solutions/[board]` had it — no code change was needed here, it was already
  complete site-wide.

## Not done / open questions

- "Cone shape" grid redesign — dropped, not pursuing.
- Real walkthrough videos, header helpline number placement, language switcher —
  flagged above; the phone number itself is now resolved (`+91 99622 28160`), but
  whether to actually add a phone link to the header nav is still an open call, as are
  the videos and language switcher.
- Nothing in this batch has been pushed to Render or committed to git — per the
  established workflow, that only happens on explicit confirmation.
