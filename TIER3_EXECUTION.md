# Tier 3 — Execution Notes & Checklist

Status of the three Tier 3 items after this pass. Code changes are **done**; the items marked **[YOU]** need your machine (dev/build server, real browser, screen reader).

---

## 10. Multi-language support (Hindi) — SCAFFOLDED ✅

`next-intl@4.3.4` was already a dependency. Wired using the **cookie-driven, no-URL-prefix** pattern so it does not collide with the security logic in `src/middleware.ts` (CSP, SQLi blocking, rate limiting) and needs no `[locale]` route restructure.

**Files added**

- `src/i18n/config.ts` — locales (`en`, `hi`), names, cookie name.
- `src/i18n/request.ts` — resolves locale from `NEXT_LOCALE` cookie for every request.
- `src/i18n/actions.ts` — `setLocale()` server action (sets cookie + revalidates).
- `messages/en.json`, `messages/hi.json` — message catalogs (19 keys each, parity verified).
- `src/components/LanguageSwitcher.tsx` — header dropdown (English / हिन्दी).

**Files changed**

- `next.config.ts` — wrapped with `createNextIntlPlugin('./src/i18n/request.ts')`.
- `src/app/layout.tsx` — now async; wraps app in `NextIntlClientProvider`, sets `<html lang>`.
- `src/components/sections/HeroSection.tsx` — **reference pattern**: uses `useTranslations('Hero')`.
- `src/components/sections/Header.tsx` — renders `<LanguageSwitcher />` in the desktop CTA area.

**To finish the rollout (repeat the Hero pattern per section):**

1. In a section component: `const t = useTranslations('<Section>')`, replace literal copy with `t('key')`.
2. Add the matching keys under a `"<Section>"` object in **both** `messages/en.json` and `messages/hi.json`.
3. Sections still hardcoded in English: TrustStats, WhyChooseUs, FeatureHighlights, ProblemsSection, ProcessSteps, FAQ, Testimonials, Footer, ContactForm, CTAs, and the full `Header` nav labels (`Nav.*` keys already exist in the catalogs for when you wire the header text).
4. Keep en/hi key parity — run the parity check (both files should have identical key sets).

**[YOU] Verify:** `npm run dev`, load `/`, use the header language switcher → Hero copy flips to Hindi and the choice persists on reload (cookie).

---

## 11. Accessibility — FIXED IN CODE ✅

### Mega-dropdown (`src/components/sections/Header.tsx`)

Before: trigger was a `<span>` (not focusable), hover-only, no ARIA.

- Trigger is now a real `<button>` with `aria-haspopup`, `aria-expanded`, `aria-controls`.
- Opens on hover **and** keyboard focus **and** click; `Escape` closes and returns focus to the trigger.
- Panel has `role="menu"` + `role="menuitem"` links; decorative icons `aria-hidden`.
- `focus-visible` rings added to trigger and items. `nav` has `aria-label="Primary"`.
- Mobile hamburger button now has `aria-label="Open menu"`.

### Hero carousel (`src/components/sections/HeroSlideshow.tsx`)

Before: auto-rotated every 5s with no pause, no reduced-motion respect, no SR announcement.

- Respects `prefers-reduced-motion` — no auto-advance, crossfade instead of slide.
- **Pause/Play** button (keyboard-operable); auto-pauses on hover/focus.
- `aria-live="polite"` region + `role="status"` announcing "Slide N of 6:

