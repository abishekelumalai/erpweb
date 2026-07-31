# UI/UX Cleanup — Changes Made & Follow-ups

## Context
This is a Next.js 15 (App Router) + Prisma/SQLite site (`chalowebsite-main/`). A UI/UX audit was run across the homepage sections (everything except Header/Footer/Hero, which were handled separately) and a batch of fixes was applied directly to the code. Everything below is **already implemented** — this file is a record of what changed, plus a short list of things intentionally left open for a follow-up pass.

**First thing to do:** run `npm run dev` and load the homepage — confirm it compiles clean and every section still renders (deleted files can occasionally leave a dangling import if something was missed). No dev server was running to verify against when this doc was written, so treat that as step zero.

---

## Deleted — dead code (confirmed unused via grep before removal)

- `src/components/sections/WhyChooseSection.tsx`
- `src/components/sections/TrustedBySection.tsx`
- `src/components/sections/StatsSection.tsx`
- `src/components/sections/PricingTeaser.tsx`
- `src/components/sections/CaseStudy.tsx` (a different, unused component — not the same as the real case-studies feature under `src/app/(public)/case-studies/`, which is untouched)
- `src/components/sections/DemoVideo.tsx`
- `src/components/sections/FeatureTabsSection.tsx`
- `src/components/sections/ModulesSection.tsx`
- `src/components/sections/BlogSection.tsx`
- `src/components/sections/HeroProductWindow.tsx` — became orphaned after the hero section was rewritten separately (outside this cleanup pass); no longer imported anywhere.

These were superseded duplicates of components that are actually in use — none of them were imported by `src/tel:+919962228160app/page.tsx` or anything else. If Kiro's build fails on a missing import, search for the deleted filename — it means something referenced it that grep missed.

---

## Fixed

- **`src/components/sections/FeatureHighlights.tsx`** — the feature-tile icon had a `group-hover:scale-110` class but its parent div was never marked `group`, so hovering a tile did nothing. Added `group` to the parent.
- **`src/components/sections/BoardTabs.tsx`** — the board-switcher buttons had no tab semantics for screen readers. Added `role="tablist"`/`role="tab"`, `aria-selected`, `aria-controls`/`id` linking each tab to its panel, and `aria-hidden="true"` on the decorative emoji so screen readers don't announce "child" / "globe showing Europe-Africa" before the label.
- **`src/app/globals.css`** — the scrolling school-logo marquee (`SocialProofBar`) ran continuously with no way to pause it to read a name. Added `.animate-marquee:hover { animation-play-state: paused; }`.
- **`src/components/sections/TestimonialsSection.tsx`** — avatar initials were computed with `name.split(' ').map(n => n[0]).join('')`, which breaks on names with leading/trailing/double spaces (real CMS-entered data, not compile-time-safe). Added a guarded `getInitials()` helper with a `'?'` fallback.
- **`src/components/sections/SocialProofBar.tsx`** — the "1000+ Schools" counter was a hardcoded literal, separate from the identical stat in `TrustStats.tsx` which *is* CMS-editable. If an admin updated the school count via the CMS, this counter would silently go stale. Now reads the same `trust_stat_1_value` CMS key.
- **`src/components/ChatBot.tsx`** — the "book a free demo" link used a plain `<a href="/contact">` (full page reload, loses chat state) instead of `next/link`. Switched to `<Link href="/contact#contact-form">`.
- **`src/components/sections/HomepageFAQ.tsx`** — if the FAQ list is empty, the section used to `return null` and silently vanish (looks like a rendering bug). Now shows a "FAQs Coming Soon" empty state, matching the pattern already used in `TestimonialsSection.tsx`.
- **`src/components/sections/ProcessSteps.tsx`** — the "Step 1/2/3" label used `text-gray-400`, low contrast against the white background. Darkened to `text-gray-500` to match label weight used elsewhere in the same file.
- **`src/components/sections/FinalCTA.tsx`** — both bottom CTA buttons ("Request a Demo" and "Schedule a Callback") linked to the exact same `/contact#contact-form` destination — misleading, since picking "Schedule a Callback" landed on the identical form. Changed the second button to a direct `tel:+919962228160` call link labeled "Talk to Sales", matching the same pattern already used in the header.
- **`src/components/sections/ProblemsSection.tsx`** and **`src/components/sections/WhyChooseUs.tsx`** — both card grids jumped straight from 1 column to 2/3/4 columns only at the `md` (768px) breakpoint, with no intermediate step — on a ~640–767px viewport (large phone landscape / small tablet) cards rendered full-width, wasting horizontal space. Added a `sm:grid-cols-2` step to both, consistent with how `FeatureHighlights.tsx` already handles its grid.

---

## Intentionally left open — needs a decision, not just code

- **`src/components/sections/BoardTabs.tsx`** (see the code comment at the top of the file) — the board tabs shown are Pre School / State & CBSE / IB / Cambridge / Montessori / Matric, but there's a note that the real chaloschools.com site's board list is CBSE / Matriculation / IGCSE / ICSE / State Board. Nobody has confirmed which list is correct for this rebuild — don't silently change it, ask the user first.
- **`src/components/ChatBot.tsx`** — the FAQ auto-reply matcher (`findBestMatch`, uses `.includes()` substring matching on canned Q&A keys) can misfire on oddly-phrased user questions because short generic keys can accidentally match inside longer unrelated queries. This is a correctness issue in the matching logic, not a styling/UX issue, so it wasn't touched in this pass — worth a dedicated fix (e.g. word-boundary matching or scoring by longest-key-match-wins) if the chatbot's accuracy becomes a problem.

---

## Notes for whoever executes/reviews this
- Brand pattern already established across the codebase: primary `#026dde`, accent `#f59e0b`, `rounded-full` buttons, `rounded-xl`/`rounded-2xl` cards, `ring-1 ring-gray-100` borders, Tailwind + shadcn/ui components in `src/components/ui/`.
- All content flows through the CMS pattern (`getContentValue(content, key, fallback)` from `SiteContentProvider`) — if adding new copy, follow that pattern rather than hardcoding strings, to stay consistent with the rest of the page.
