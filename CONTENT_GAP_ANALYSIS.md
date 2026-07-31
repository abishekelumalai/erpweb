# ChaloSchools — Content Plan vs. Live Site: Gap Analysis

**Source doc:** `Chalo_Schools_Website_Content_Plan.docx` **Decisions on record:** 500+ Schools · **2 Lakh+ Students** · 10,000+ Teachers · **keep "India's #1"** (no Tamil Nadu pivot) · **Pricing = quote-only** (no ₹). **Date:** 30 Jul 2026 · **Last updated:** 30 Jul 2026 (all copy sections B–G applied)

Legend: 🟥 conflict · 🟧 missing (build new) · 🟨 rewrite copy · 🟩 already matches · ✅ DONE · ⏳ needs your asset/data

---

## ✅ Progress summary (what's shipped)

| Area | Status | Notes |
| --- | --- | --- |
| Feature pages copy (11) | ✅ Done | Rewritten in `site-data.ts` to doc copy. |
| Solutions by-board copy (6) | ✅ Done | "Why Chalo Fits" bullets updated in `site-data.ts`. |
| Conflicting solution stats | ✅ Done | 7 raw school-count claims → qualitative, non-summing stats. |
| Homepage stats | ✅ Done | 500+/2 Lakh+/10,000+/99.9% in `TrustStats.tsx`; SocialProofBar fallback fixed. |
| Homepage Hero badge | ✅ Done | "Trusted by 500+ Indian Schools" (EN + HI). "India's #1" kept. |
| Homepage Problems | ✅ Done | New headline + doc's 4 problem bullets in `ProblemsSection.tsx`. |
| Pricing page | ✅ Done | `/pricing` built (quote-only). Wired into Header + Footer + sitemap. |
| By-Role solution pages (5) | ✅ Done | `roles[]` + `/solutions/role/[role]`; Header links point to real pages; in sitemap. |
| Homepage: Demo Video | ✅ Built ⏳ asset | `DemoVideo.tsx` — placeholder + CTA until `NEXT_PUBLIC_DEMO_VIDEO_URL` set. |
| Homepage: Case Study snapshot | ✅ Built ⏳ data | `CaseStudySnapshot.tsx` — renders published DB case study; auto-hides if none. |
| Homepage: Pricing teaser | ✅ Done | `PricingTeaser.tsx` → `/pricing`, no numbers. |
| Homepage: Blog strip | ✅ Built ⏳ data | `BlogStrip.tsx` — 3 latest published posts; auto-hides if none. |
| Resources page copy (6) | ✅ Done | Hero headlines + descriptions applied to all 6 client components. |
| Company page copy (7) | ✅ Done | About headline applied; Team/Customers/Partner kept merged into `/about`. |

**All copy sections of the content plan (B–G) are now applied.**

**Still needs you (assets/data, per no-fabricate rule):** demo video URL (EN+Tamil), brochure PDF, real case-study metrics, published blog posts, webinar content.

**⚠️ DB override reminder:** homepage stats/problems read the DB first via `getContentValue`. Code fallbacks are updated, but if the DB holds `trust_stat_*` / `problem_*` values they win at runtime — update/clear them in the **admin content panel**. Same applies to the Contact page hero (`heroTitle`) which is DB-driven.

---

## ⚠️ Cross-cutting conflicts — RESOLVED

| # | Item | Live site was | Decision | Status |
| --- | --- | --- | --- | --- |
| C1 | Schools count | `200+` | `500+` (doc) | ✅ applied |
| C2 | Students | `1.5M+` | `2 Lakh+` (doc confirmed) | ✅ applied |
| C3 | Teachers | *(none)* | `10,000+` (doc) | ✅ added |
| C4 | Positioning | "India's #1" | **Keep "India's #1"** (no TN pivot) | ✅ kept |
| C5 | Uptime/Countries | `99.9%`, `4 Countries` | Keep Uptime, drop Countries | ✅ applied |
| — | Pricing ₹ figure | — | **Quote-only, no numbers** | ✅ applied |

---

## A. Homepage (12 doc sections)

| Doc section | Live component | Status |
| --- | --- | --- |
| 1. Hero | `HeroSection.tsx` (+ i18n) | ✅ badge/stats (kept "India's #1") |
| 2. Social Proof Bar | `SocialProofBar.tsx` | ✅ counter fallback fixed to 500+ |
| 3. Key Problems | `ProblemsSection.tsx` | ✅ headline + 4 doc bullets |
| 4. Feature Highlights | `FeatureHighlights.tsx` | 🟩 exists |
| 5. Board Tabs | `BoardTabs.tsx` | 🟩 matches doc |
| 6. Product Demo Video | `DemoVideo.tsx` | ✅ built ⏳ needs video URL |
| 7. Testimonials | `TestimonialsSection.tsx` (DB) | 🟩 |
| 8. Case Study Snapshot | `CaseStudySnapshot.tsx` | ✅ built ⏳ needs published case study |
| 9. Pricing Teaser | `PricingTeaser.tsx` | ✅ done |
| 10. WhatsApp/Support CTA | `FloatingWhatsApp.tsx` | 🟩 exists (doc's "English/Tamil" copy optional) |
| 11. Blog / Latest News | `BlogStrip.tsx` | ✅ built ⏳ needs published posts |
| 12. Final CTA + Footer | `FinalCTA.tsx` + `Footer.tsx` | 🟩 (doc's "Download Brochure" ⏳ needs PDF) |

---

## B. Feature pages (11) — ✅ DONE

All 11 rewritten in `src/data/site-data.ts` (`headline`, `description`, `benefits[]`) to match the doc's Hero + Problem + Capabilities.

`admissions` · `fees` · `attendance` · `exams` · `timetable` · `parent-app` · `staff-hr` · `library` · `transport` · `whatsapp` · `reports` — all ✅

**Optional future enhancement:** add dedicated `problems[]` + per-page `faqs[]` fields to `FeatureData` + template (doc template has explicit Problem & FAQ blocks). Not blocking.

---

## C. Solutions — By Board (6) — ✅ DONE

All 6 boards' "Why Chalo Fits" bullets + headline/description updated in `site-data.ts` `solutions[]`. Per-solution `stats` reconciled: raw school-count claims replaced with qualitative stats so they don't contradict the "500+ total".

---

## D. Solutions — By Role (5) — ✅ DONE

Added `RoleData` + `roles[]` + `getRoleBySlug()` to `site-data.ts`, and a `/solutions/role/[role]` dynamic route mirroring the board pattern. Header "By Role" links now point to the real pages; role pages added to sitemap.

School Owners · Principals · Teachers · Parents · Accountants — all ✅

---

## E. Pricing page — ✅ DONE (quote-only)

`/pricing` built: 3 tiers (Basic / **Growth = Most Popular** / Enterprise), "included in every plan", 4 FAQs, all CTAs = "Get a Custom Quote" (no ₹). Linked from Header (desktop + mobile), Footer (Company group), and sitemap.

---

## F. Resources pages (6) — ✅ DONE

Hero headline + description applied to each page's client component (DB-driven content untouched).

| Doc page | Route | New headline | Status |
| --- | --- | --- | --- |
| Blogs | `/blog` | "Ideas & Insights for School Leaders" | ✅ |
| Webinars | `/webinars` | "Learn From Education & EdTech Experts" | ✅ (⏳ needs webinar content) |
| News & Events | `/news` | "What's New at ChaloSchools" | ✅ |
| Case Studies | `/case-studies` | "Real Schools. Real Results." | ✅ (⏳ needs real case studies) |
| Help & Documentation | `/help` | "Everything You Need to Get the Most Out of ChaloSchools" | ✅ |
| Release Notes | `/release-notes` | "What's New in ChaloSchools" | ✅ |

---

## G. Company pages (7) — ✅ DONE

| Doc page | Route | Status |
| --- | --- | --- |
| About Us / Why Chalo | `/about` | ✅ headline → "Built in India, for Indian Schools" |
| Our Journey / Team | `/about` (section: "Our Leadership") | ✅ kept merged (no separate route) |
| Our Customers | `/about` (section) | ✅ kept merged |
| Testimonials | DB / homepage | 🟩 no change needed |
| Careers | `/careers` | ✅ kept "Join the ChaloSchools Team" (doc gave no headline) |
| Contact Us | `/contact` | 🟩 hero is DB-driven (`heroTitle`) — left editable, not hardcoded |
| Partner With Us | `/contact` (link) | ✅ kept as link (no separate route) |

**Decision:** `/about` intentionally kept **merged** (Story / Team / Customers / Why-Chalo as sections) rather than split into separate routes — the page already presents these as distinct sections. Split can be revisited later if desired.

---

## Remaining work (optional / needs you)

1. **DB content values** — set `trust_stat_*` / `problem_*` (and Contact `heroTitle`) in the admin panel so live content shows without relying on code fallbacks.
2. **Asset-blocked** (need you): demo video URL, brochure PDF, real case-study metrics, published blog posts, webinar content.
3. **Optional:** split `/about` into standalone Team / Customers / Partner routes; add `problems[]`+`faqs[]` to feature pages.

## Things NOT done without your input (per roadmap "don't fabricate")

- ✅ Honored: kept "India's #1", quote-only pricing, no invented case-study metrics or school counts.
- Pending your data: real case studies, webinar content, demo video, brochure.

