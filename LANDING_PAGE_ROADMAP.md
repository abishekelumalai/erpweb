# ChaloSchools — Landing Page Roadmap

## Context
This is a Next.js 15 (App Router) + Prisma/SQLite site (`chalowebsite-main/`). The homepage and core marketing sections (Hero, TrustStats, WhyChooseUs, Features, FAQ, Testimonials, Contact) already exist with real content — see `worklog.md` / git history for what's shipped. This doc is a prioritized backlog of what's still missing to make the landing page/marketing site complete, written so it can be handed to a coding agent (Kiro) and executed task-by-task without needing this project's full prior context.

**Audited as of now — confirmed missing/present so tasks below don't duplicate existing work:**
- `src/app/sitemap.ts` and `src/app/robots.ts` already exist and work — only need updates, not creation.
- No `/privacy`, `/terms`, `/pricing`, `/product` or `/take-a-tour` routes exist.
- No analytics/tracking (`gtag`, GTM, Meta Pixel) wired anywhere.
- No custom `not-found.tsx` — Next.js default 404 is used.
- No i18n config in `next.config.*` — English only.
- Admin panel, contact form, and lead-capture (`/admin/leads`) are already built and working — not in scope here.

Do the tasks in order within each tier; tiers are ordered by value/effort ratio, highest first.

---

## Tier 1 — High value, low effort

### 1. Privacy Policy & Terms of Service pages
Missing legal pages are a real trust/credibility gap for a live B2B SaaS site collecting lead data (name, phone, email, school details) via the contact form.
- Create `src/app/privacy/page.tsx` and `src/app/terms/page.tsx` — standard static content pages using the same `Header`/`Footer` shell as other static pages (see `src/app/about/page.tsx` for the pattern).
- Cover: what data is collected via the contact form, how it's used/stored, no third-party sale of data, cookie usage (note: currently no cookies are set except the admin session), contact email for privacy requests.
- Add both routes to `Footer.tsx` links (check if placeholder links already exist there pointing to `#` or similar) and to `src/app/sitemap.ts`.

### 2. Branded 404 page
- Add `src/app/not-found.tsx` — reuse `Header`/`Footer`, friendly message, search/nav suggestions, CTA back to homepage or contact.

### 3. Analytics & conversion tracking
Currently there is zero visibility into landing page traffic or conversion rate — no way to know if any of the redesign work is working.
- Add Google Analytics 4 (or GA4 + Meta Pixel if the user has both) via `next/script` in `src/app/layout.tsx`, gated behind an env var (`NEXT_PUBLIC_GA_ID`) so it's a no-op in dev/local.
- Fire a conversion event on successful contact form submission (`src/components/sections/ContactForm.tsx`, on the success branch of the submit handler) — e.g. `gtag('event', 'generate_lead', {...})`.
- **Ask the user for their GA4 Measurement ID / Meta Pixel ID before implementing** — do not fabricate one.

### 4. Sitemap completeness
- Update `src/app/sitemap.ts` to include the new `/privacy` and `/terms` routes once built (Task 1).
- If blog posts / case studies have individual slugs in the DB, add a dynamic section that queries `db.blog.findMany()` / `db.caseStudy.findMany()` for published slugs, matching the existing `features`/`solutions` static-array pattern already in the file.

### 5. FAQPage structured data
The homepage already renders a real FAQ section (`src/components/sections/FAQSection.tsx` or similar) but the JSON-LD in `layout.tsx` only has `Organization` schema.
- Add `FAQPage` JSON-LD schema to the homepage using the same FAQ data already fetched for the visible section — this is a well-known SEO win (can produce rich snippets in Google search results) and the content already exists, so it's just a serialization task.

---

## Tier 2 — Medium effort, strong conversion impact

### 6. Product / "Take a Tour" page
This was the single biggest structural gap found when comparing against the real chaloschools.com site — it has a dedicated product walkthrough page that this rebuild never got.
- New route `src/app/product/page.tsx` (or `/take-a-tour`).
- Reuse the visual language already established in `src/components/sections/HeroProductWindow.tsx` (the 6-module "browser chrome" mockups: Admissions, Fee Management, Attendance, Timetable, Parent App, Reports) — expand each into its own full section on this page with more detail/copy per module, rather than just a rotating hero preview.
- Add a nav link from the header (`Header.tsx` "Features" or "Solutions" dropdown, or a standalone top-level link) and from the Hero's CTA area.

### 7. Case studies / success stories with real metrics
- `src/app/case-studies/` already exists as a content type in the admin (confirmed via `/admin/case-studies`) — check whether it currently has real published entries or is empty like Testimonials/FAQs were before the last round of seeding.
- If empty: write 2-4 real case studies using the same real client names already used in `SocialProofBar.tsx` (DAV Schools, Maharishi Vidya Mandir, Pushpalata Schools, etc.) — before/after metrics, specific module adoption, quotes. **Ask the user for real data/permission before publishing specific school names with quantified claims** — don't fabricate metrics for named real schools.

### 8. Comparison page ("Chalo vs. Excel/Spreadsheets vs. Generic ERP")
Common high-converting B2B SaaS landing page pattern, especially relevant here since the contact form already asks "Current Software" (Excel/WhatsApp/Other ERP/None) — this page directly targets those exact personas.
- New route, e.g. `src/app/compare/page.tsx`, with a comparison table styled consistently with existing `Card`/`Table` components.

### 9. WhatsApp Business CTA
Indian school administrators skew heavily toward WhatsApp for quick vendor contact over email forms. A floating WhatsApp CTA button (bottom-right, common pattern) alongside the existing "Request a Demo" flow could measurably lift response rate.
- Simple floating action button component, links to `https://wa.me/<number>?text=...`. **Ask the user for the WhatsApp Business number before implementing.**

---

## Tier 3 — Larger initiatives (scope with the user before starting)

### 10. Multi-language support (Hindi + regional languages)
Largest scope item. Needs `next-intl` or similar, translated copy for every marketing section, and a language switcher in the header. Only worth doing if there's confirmed demand — don't start without checking.

### 11. Accessibility audit
- Run Lighthouse/axe against the homepage, hero carousel, and mega-dropdown nav specifically (the mega-dropdown and `HeroProductWindow` auto-rotating carousel are the newest/most custom interactive pieces and haven't had an a11y pass — check keyboard navigation, focus trapping, `aria-live` on the carousel for screen readers beyond the existing `prefers-reduced-motion` handling).
- Fix color contrast, missing alt text, and focus-visible states found.

### 12. Performance pass
- Run Lighthouse on production build (`npm run build && npm start`, not dev mode — Turbopack dev numbers aren't representative).
- Check image sizes/formats (several hero/section images may benefit from AVIF/WebP via `next/image`'s automatic optimization — verify it's actually configured, not bypassed).
- Audit bundle size for `framer-motion` usage across sections — confirm it's tree-shaken and not duplicated.

---

## Notes for whoever executes this
- Match existing patterns exactly — this codebase has a consistent style (Tailwind + shadcn/ui components in `src/components/ui/`, brand colors `#026dde` primary / `#f59e0b` accent, `Manrope` display font + `Inter` body font via `next/font` in `src/app/layout.tsx`).
- Don't fabricate stats, client names, or testimonials — every piece of "real" content on this site so far was sourced from the actual live chaloschools.com site or explicitly confirmed with the user. Ask before inventing numbers.
- After any change, verify with `npm run dev` that the affected pages return 200 and check the terminal/browser console for errors before considering a task done.
