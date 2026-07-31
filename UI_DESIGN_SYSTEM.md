# UI Design System Reference — ChaloSchools

A concrete inventory of the UI conventions actually implemented in this codebase (Next.js 15 + Tailwind + shadcn/ui + framer-motion), based on a full survey of `src/`. Every pattern below is backed by real file references, not aspirational/generic guidance.

---

## 0. Recently Added — Homepage Motion Pass

A round of "wow factor" additions to the homepage, layered on top of the existing animation system rather than introducing a new one — everything below reuses CSS primitives that already existed in `globals.css` (mostly unused until now) or extends the existing mouse-parallax state in the hero.

- **Hero border-beam** (`HeroSlideshow.tsx`) — the product-mockup bezel now uses a new `.conic-border-blue` class instead of the shared `.conic-border`: a rotating conic-gradient ring (`var(--primary) → #00d4ff → var(--primary)`, 4s linear spin) around the monitor frame. Split out as its own class specifically so it never picks up the theme's amber `--accent` color the shared `.conic-border` uses (that one's still used as-is on the `FinalCTA` button).
- **Hero cursor-reactive glow** (`HeroSection.tsx`) — replaced the old static dot-grid background with a soft radial color wash that follows the pointer: a `spotlight` state (`{x, y, active}`) is updated in the existing `handleMouseMove` handler (the same one that already drove the floating-orb parallax) and rendered as `radial-gradient(560px circle at ${spotlight.x}px ${spotlight.y}px, rgba(0,212,255,0.35), rgba(2,109,222,0.18) 45%, transparent 70%)` with `mix-blend-screen`. Fades in/out via `opacity` + `transition-opacity duration-500`, skipped entirely under `useReducedMotion()`.
- **Cursor-tracked spotlight cards** — `FeatureHighlights.tsx` (the 14 module cards) and `OurApps.tsx` (the 3 app cards) both gained a `handleSpotlightMove` mouse handler that writes `--mx`/`--my` CSS custom properties onto the card element, driving the pre-existing (previously unused outside `motion.tsx`) `.spotlight` class — a radial glow that follows the cursor while hovering, Magic-Card style.
- **Testimonials shine-sweep** — `TestimonialsSection.tsx` cards gained the `.card-shine` class (already used on `FeatureHighlights` cards) for a diagonal light sweep on hover.
- **Testimonials converted to a marquee** — was a static 3-column grid, now an auto-scrolling row (`.animate-marquee-slow`, a 70s-duration variant of the schools-marquee keyframe, `reverse` direction so it visibly moves the opposite way from the schools marquee above it). List is duplicated once for a seamless loop, pauses on hover, respects reduced-motion. Cards are clamped to `line-clamp-5` on the review text and the row uses `items-stretch` so every card renders the same height regardless of quote length (a plain flex stretch was tried first but let one long quote blow out the whole row's height — line-clamp fixed that).
- **ProblemsSection hover strike-through** — pain-point titles get a `.problem-strike` line that draws across the text on hover only (`transform: scaleX(0→1)`, stays invisible at rest so it never hurts readability of the "problem" copy).
- **DemoVideo pulse** — the placeholder play button gets a pulsing ring behind it (`motion.span`, `scale: [1, 1.6, 1]`, `opacity: [0.5, 0, 0.5]`, 2.2s loop).
- **FinalCTA ambient glow** — a soft blurred amber circle (`motion.span`, `scale: [1, 1.18, 1]`, 2.4s loop) now sits behind the primary "Request a Demo" button, underneath its existing conic-border + shimmer-sweep treatment.
- **FeatureHighlights stagger** — card entrance delay bumped from `i * 0.03` to `i * 0.05` so the 14-card grid visibly cascades in rather than popping in almost simultaneously.

New CSS added to `globals.css` as part of this pass: `.conic-border-blue` / `.conic-border-blue::before` (~line 1202), `.animate-marquee-slow` (~line 993), `.problem-strike` / `.problem-strike::after` (~line 1294) — all included in the existing `prefers-reduced-motion` media query alongside their siblings.

**Turned out to already exist** (checked before implementing, so as not to duplicate): the stat counters in `TrustStats.tsx` already count up from 0 on scroll via a hand-rolled `StatValue` component, and the schools marquee in `SocialProofBar.tsx` already paused on hover. Neither needed changes.

---

## 1. Animations (framer-motion)

**Note:** `src/lib/motion.tsx` defines a set of reusable animation primitives (`FadeIn`, `Stagger`, `StaggerItem`, `GlassCard`, `TiltCard`, `AnimatedCounter`, `Marquee`) with shared timing presets, but **none of them are actually imported anywhere else in the project** — every section hand-rolls its own equivalent motion props inline instead. Worth cleaning up or actually adopting.

```ts
// src/lib/motion.tsx — defined but unused elsewhere
export const spring = { type: 'spring', stiffness: 260, damping: 22 };
export const springSoft = { type: 'spring', stiffness: 200, damping: 25 };
export const springSnappy = { type: 'spring', stiffness: 300, damping: 18 };
export const ease = [0.22, 1, 0.36, 1] as const; // cubic ease-out
```

### Dominant pattern: scroll-triggered fade-up
Used in `FeatureHighlights.tsx`, `WhyChooseUs.tsx`, `TrustStats.tsx`, and most section components:
```tsx
<motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
```

### Other confirmed patterns
- **Spring entrance + stagger delay**: `transition={{ delay: i * 0.1, type: 'spring', stiffness: 100 }}` (`TrustStats.tsx`)
- **AnimatePresence + layout animations** for filtered grids: `mode="popLayout"`, `motion.div layout`, `initial={{opacity:0,y:24,scale:0.95}}` (`FeatureHighlights.tsx`)
- **Carousel slide transitions**: `AnimatePresence mode="wait"`, slide from `x: 80` → `x: -80`, `duration: 0.5, ease: 'easeInOut'` (`HeroSlideshow.tsx`)
- **Word-by-word blur reveal** (hero-only, bespoke `WordReveal`): `initial={{opacity:0, filter:'blur(16px)', y:14}}`, staggered `delay + i*0.13`, `duration:0.65` (`HeroSection.tsx`)
- **Typing/deleting text loop**: plain `setTimeout` state machine (not framer-motion) + CSS `.animate-cursor` blink (`HeroSection.tsx`)
- **Infinite floating orbs**: `animate={{x:[0,30,0], y:[0,-20,0], scale:[1,1.1,1]}}`, `transition={{duration:8, repeat:Infinity, ease:'easeInOut'}}`, staggered delays 0/1/2s per orb, plus mouse-driven parallax via inline `style={{transform}}` (`HeroSection.tsx`)
- **Scroll progress bar**: `useScroll()` + `useSpring(scrollYProgress, {stiffness:120, damping:30, restDelta:0.001})` driving a fixed gradient bar's `scaleX` (`PageChrome.tsx`)
- **Back-to-top button**: spring `{stiffness:300, damping:22}`, `whileHover={{scale:1.1}}`, `whileTap={{scale:0.95}}` (`PageChrome.tsx`)
- **FloatingWhatsApp button**: `initial={{opacity:0,scale:0.5,y:20}}`, spring `{stiffness:260,damping:20}`, `whileHover`/`whileTap` scale, plus a non-motion CSS `animate-ping` ring + `.pulse-dot`
- **ChatBot toggle + panel**: button spring `{stiffness:280,damping:22}`; panel spring `{stiffness:260,damping:22}`, `initial:{opacity:0,scale:0.9,y:20}`
- **Header mega-dropdown**: `AnimatePresence`, panel `initial={{opacity:0,y:8,scale:0.98}}`, `transition={{duration:0.15}}`; nested stagger `{staggerChildren:0.04, delayChildren:0.03}`; active-tab indicator uses **shared layout animation** (`layoutId="nav-active"`, spring `{stiffness:300,damping:25}`)
- **Header mobile accordion**: height auto-animate `initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}}`, `duration:0.28, ease:[0.22,1,0.36,1]`

**AnimatePresence** is used in exactly 6 files: `ChatBot.tsx`, `PageChrome.tsx`, `BoardTabs.tsx`, `FeatureHighlights.tsx`, `Header.tsx` (×2), `HeroSlideshow.tsx`.

**Division of labor**: `motion.*` is reserved for scroll-in entrances, exit/mount transitions needing `AnimatePresence`, shared-layout (`layoutId`) indicators, and infinite orb/parallax loops. Hover states on cards/buttons/links are almost always plain Tailwind (`transition-all duration-300 hover:...`) or the custom CSS utility classes in §3, not `whileHover`.

**Reduced motion**: Every motion-heavy client component (`HeroSection`, `Header`, `FloatingWhatsApp`, `ChatBot`, `PageChrome`, `TrustStats`, `HeroSlideshow`) calls `useReducedMotion()` and branches to an opacity-only fallback. `globals.css` also has a blanket `@media (prefers-reduced-motion: reduce)` block collapsing all animation/transition durations to `.001ms`.

**CSS-only keyframe animations** (`globals.css`): `float`, `fade-in-up`, `pulse-glow`, `marquee` (40s linear, pauses on hover), `mesh-shift`, `breathe`, `spin-border`, `text-reveal`, `gradient-shift`, `typing-bounce`, `stagger-fade`, `page-enter`, `cursor-blink`, `pulse-dot`, `shine-sweep`, `aurora`, `wow-in`, `blob-float`, `underline-draw`, `shimmer` — exposed via utility classes like `.animate-float`, `.animate-mesh`, `.animate-breathe`, `.animate-gradient-text`, `.text-shimmer`, `.animate-marquee`.

---

## 2. Floating / Fixed / Sticky Elements

| Component | Position | z-index | Notes |
|---|---|---|---|
| `Header.tsx` (nav) | `fixed top-0 left-0 right-0` | `z-50` | Adds `bg-card/80 backdrop-blur-xl shadow-md` once `window.scrollY > 20` |
| `PageChrome.tsx` scroll progress bar | `fixed top-0 left-0 right-0` | `z-[60]` (highest) | 0.5px gradient bar, `scaleX` driven by scroll |
| `PageChrome.tsx` back-to-top button | `fixed bottom-6 left-6` | `z-50` | Appears after `scrollY > 500` |
| `FloatingWhatsApp.tsx` | `fixed bottom-6 right-6` | `z-50` | Delayed 2000ms via `setTimeout` before mount |
| `ChatBot.tsx` toggle button | `fixed bottom-24 right-6` | `z-50` | Stacked above WhatsApp button |
| `ChatBot.tsx` chat panel | `fixed bottom-24 right-6` | `z-50` | `w-[360px] max-w-[calc(100vw-2rem)] h-[520px] max-h-[calc(100vh-6rem)]` |
| `Header.tsx` mega-dropdown panel | `absolute top-full left-1/2 -translate-x-1/2` | `z-50` | |
| `ThemeSwitcher.tsx` popover menu | `absolute right-0` | `z-50` | |
| `.feature-tooltip-wrap` (globals.css) | `absolute` | `z-40` | Hover/focus tooltip on feature cards |
| `SocialProofBar.tsx` edge fades | `absolute left-0`/`right-0` | `z-10` | White gradient masks over the logo marquee |

Both floating action buttons (WhatsApp, ChatBot) are stacked bottom-right at `z-50`, offset vertically (`bottom-6` vs `bottom-24`) to avoid colliding. Nothing in `src/` uses CSS `sticky` positioning — the header uses `fixed`, not `sticky`.

---

## 3. Visual Effects

**Glassmorphism / backdrop-blur** (12 occurrences):
- Header when scrolled: `bg-card/80 backdrop-blur-xl`
- Hero badge: `bg-card/5 ... backdrop-blur-md`
- Hero secondary CTA: `bg-white/5 ... backdrop-blur-sm`
- `.glass-card` utility: `background: color-mix(in srgb, var(--card) 70%, transparent); backdrop-filter: blur(12px);` with hover border/shadow tied to `var(--primary)`

**Gradients:**
- `.bg-brand-gradient` — `linear-gradient(to bottom right, var(--grad-from), var(--grad-via), var(--grad-to))`, theme-aware. Used in 26+ files (every page hero band, `FinalCTA`, etc).
- Gradient text: `text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#026dde]` (hero headline highlight)
- `.wow-heading` — animated gradient heading text using `gradient-shift 6s`, used e.g. in `WhyChooseUs.tsx`
- `.text-shimmer` — separate shimmer-text keyframe utility
- Icon-box gradients are unique per category/stat/app (`FeatureHighlights.tsx` `CATEGORY_COLORS`, `TrustStats.tsx` `statGradients`, `OurApps.tsx`)

**Box-shadow / glow:**
- Brand-colored shadows: `shadow-lg shadow-primary/20`, `shadow-primary/25`, per-stat `shadow-[#026dde]/20`
- `.card-lift` — `box-shadow: 0 18px 40px -12px color-mix(in srgb, var(--primary) 30%, transparent)` + `translateY(-6px)` on hover
- `.wow-card` (stronger) — `translateY(-10px) scale(1.02)` + double shadow (color glow + 1px ring)
- `.magnetic-hover`, `.glow-border` (animated gradient border via mask), `.spotlight` (radial gradient tracking mouse position), `.conic-border` (rotating conic-gradient border via `@property --angle`)
- `.animate-pulse-glow` — ring pulse box-shadow keyframe

**Decorative blur orbs:** Hero uses inline `blur-[100px]`/`blur-[80px]` orb divs rather than Tailwind's `blur-3xl`; also a `.wow-blob` utility (`filter: blur(60px)`) elsewhere, and a `-inset-4 ... blur-2xl` glow behind the hero slideshow.

**Border treatments:** Standard card border is `border border-border`; brand-tinted hover borders like `hover:border-[#026dde]/30` or `hover:border-primary/40`; gradient borders via `::before`/`::after` mask trick.

**Hover states:** `hover:shadow-xl` (22×), `hover:shadow-lg` (18×), `hover:-translate-y-1`/`0.5` combos, `hover:scale-110`/`hover:scale-105` on icon boxes. `group-hover:` chaining is pervasive — the icon-scale + arrow-slide-in pattern shows up throughout feature/module cards.

**Rounded-corner conventions** (by frequency):

| Class | Count | Typical use |
|---|---|---|
| `rounded-full` | 144 | pills, badges, avatar/icon circles, buttons |
| `rounded-lg` | 104 | inputs, small buttons, list items |
| `rounded-xl` | 46 | icon-wrapper boxes (`w-12/14 h-12/14`), cards |
| `rounded-2xl` | 22 | primary content cards, dropdown panels, chat panel |
| `rounded-md` | 10 | small controls |
| `rounded-3xl` | 2 | decorative glow container |

---

## 4. Layout Conventions

**Standard section wrapper** — identical across 19+ section components and every page:
```tsx
<section className="py-16 md:py-24 ...">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    ...
  </div>
</section>
```

**Section vertical padding**, most common combos:
| Padding | Occurrences |
|---|---|
| `py-16 md:py-24` | 31 (most common) |
| `py-20 md:py-28` | 12 (page hero bands) |
| `py-12 lg:py-16` | 9 |
| `py-16 md:py-20` | 7 |
| `py-12 md:py-16` | 4 |

**Grid vs flex**: grids for card collections (`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6`); flex for nav bars, button groups, badge rows, icon+text rows (`flex items-center gap-2`).

**Common grid-cols patterns:**
- `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` / `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4` — feature/module card grids
- `grid-cols-2 lg:grid-cols-3` / `grid-cols-1 lg:grid-cols-2` — two-column content/benefit layouts
- `grid-cols-2 lg:grid-cols-4` — stat counters (2-up mobile, 4-up desktop)
- Hero's custom split: `grid lg:grid-cols-[1fr_480px] gap-8 lg:gap-12`

---

## 5. Spacing / Padding System

**`gap-*`** (frequency): `gap-2` (84) · `gap-3` (81) · `gap-4` (57) · `gap-1` (53) · `gap-6` (24) · `gap-8` (15) · `gap-12` (7). Small gaps dominate inline icon+text/button rows; `gap-6`/`gap-8` for card grids.

**`space-y-*`** (frequency): `space-y-2` (126, default for stacked form fields/list items) · `space-y-4` (51) · `space-y-6` (33) · `space-y-1` (16) · `space-y-3` (10).

**Card/box padding**: `p-6` (29, standard card padding) · `p-4` (18, compact cards) · `p-8` (13, larger feature cards) · `px-4 py-2` (13) / `px-3 py-2` (16) for buttons/badges · `px-8 py-6`/`py-12`/`py-16` for large CTA banners.

**Icon wrapper boxes** consistently use `w-12 h-12` or `w-14 h-14` with `rounded-xl`/`rounded-2xl`/`rounded-full` and `flex items-center justify-center` (see §9).

---

## 6. Theme System

**Files:**
- `src/lib/themes.ts` — theme catalog + TypeScript types (server-safe, no `'use client'`, so both server and client code can import it)
- `src/app/globals.css` — `:root` defaults + 24 `[data-theme="..."]` override blocks
- `src/components/ThemeProvider.tsx` — applies `data-theme` to `<html>` client-side; `activeTheme` is passed down as a prop, resolved server-side
- `src/lib/theme-config.ts` — `getThemeInitScript()` inlines a `<script>` in `<head>` to set `data-theme` before paint (avoids FOUC), plus the hardcoded fallback `ACTIVE_THEME`
- `src/lib/get-active-theme.ts` — resolves the live theme from the database (`SiteContent` key `active_theme`), falling back to `ACTIVE_THEME`
- `src/app/theme/page.tsx` — admin-only live preview/swatch picker with an "Apply to live site" action
- `src/components/ThemeSwitcher.tsx` — theme picker UI. **On the public site, `setTheme` is a no-op** — theme is backend-controlled only, visitors cannot change it themselves.

**25 themes** (`ThemeId` union): 13 light — `light, slate, pastel, arctic, mint, lavender, rose, sandstone, sky, sage, cloud, ivory, blush`; 12 dark — `midnight, dark, obsidian, forest, purple, crimson, ocean, carbon, dracula, nord, emeraldnight, sunsetdark`. Each theme is `{ id, name, mode, swatch: [bg, brand, accent] }`.

**Semantic tokens defined per-theme** (in `:root` and every `[data-theme]` block):
`--background`, `--foreground`, `--card`, `--card-foreground`, `--popover`, `--popover-foreground`, `--primary`, `--primary-foreground`, `--secondary`, `--secondary-foreground`, `--muted`, `--muted-foreground`, `--accent`, `--accent-foreground`, `--destructive`, `--border`, `--input`, `--ring`, `--surface`, `--surface-2`, `--brand`, `--brand-2`, `--heading`, `--body`, `--subtle`, `--hero-from`, `--hero-to`, `--footer-bg`, `--footer-fg`, `--footer-muted`, `--grad-from`, `--grad-via`, `--grad-to`, `--radius`. (`--chart-1..5` and `--sidebar*` are root-only, not themed per-variant.)

**Component-facing semantic classes** built on these tokens (by file-usage count): `bg-card` (50 files) · `text-heading` (44) · `text-subtle` (45) · `text-body` (30) · `bg-surface-2` (30) · `bg-brand-gradient` (26). Footer-specific classes (`footer-muted`, `footer-surface`, `footer-social`, `footer-divider`) read `var(--footer-*)` directly as literal CSS rather than through Tailwind's `@theme` layer, since the footer is intentionally dark on every theme (including light ones).

**Dark-theme logo handling**: a `.theme-logo` class applies `filter: brightness(0) invert(1)` under the 12 dark `[data-theme]` selectors so the logo renders white — but only on dark themes. (The footer logo previously had this filter hardcoded unconditionally, always showing a flat white silhouette regardless of theme; that's since been fixed to show the real colored logo.)

**Theme-aware effects**: scrollbar thumb, text selection, and most glow/gradient utilities (`.card-lift`, `.glass-card`, `.glow-border`, `.spotlight`, `.wow-card`) use `color-mix(in srgb, var(--primary) X%, transparent)`, so hover glows automatically match whichever theme is active.

---

## 7. Component Library (shadcn/ui)

**All 36 primitives scaffolded** in `src/components/ui/`: `accordion, alert-dialog, alert, aspect-ratio, avatar, badge, breadcrumb, button, calendar, card, carousel, chart, checkbox, collapsible, command, context-menu, dialog, drawer, dropdown-menu, form, hover-card, input-otp, input, label, menubar, navigation-menu, pagination, popover, progress, radio-group, resizable, scroll-area, select, separator, sheet, sidebar, skeleton, slider, sonner, switch, table, tabs, textarea, toast, toaster, toggle-group, toggle, tooltip`.

**Actually used in `src/components/sections` + `src/app`** (17 of 36): `accordion, alert-dialog, badge, breadcrumb, button, card, collapsible, dialog, input, label, select, separator, sheet, sonner, switch, table, textarea`.

**Scaffolded but unused outside `ui/` itself** (~19): `alert, aspect-ratio, avatar, calendar, carousel, chart, checkbox, command, context-menu, drawer, dropdown-menu, form, hover-card, input-otp, menubar, navigation-menu, pagination, popover, progress, radio-group, resizable, scroll-area, sidebar, skeleton, slider, tabs, toast, toaster, toggle-group, toggle, tooltip`. Available if a future feature needs them, but currently dead weight in the bundle-conscious sense.

---

## 8. Typography

**Fonts** (`src/app/layout.tsx`):
```ts
const inter = Inter({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });
const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"], weight: ["600","700","800"], display: "swap" });
const jetbrainsMono = JetBrains_Mono({ variable: "--font-jetbrains-mono", subsets: ["latin"], weight: ["500"], display: "swap" });
```
Applied to `<body>` as `font-sans antialiased` — Inter is the default body font. `--font-display` (→ Manrope) is used sparingly: only the hero `<h1>` uses `font-display` explicitly (`text-4xl sm:text-5xl lg:text-[3.75rem] font-extrabold`). Everything else inherits Inter.

**Heading size conventions** (by frequency):
| Scale | Occurrences | Typical use |
|---|---|---|
| `text-2xl md:text-3xl lg:text-4xl` | 26 | Most common section heading scale |
| `text-3xl sm:text-4xl md:text-5xl` | 12 | Page hero headings |
| `text-2xl md:text-3xl` | 11 | |
| `text-3xl lg:text-4xl` | 10 | Section headings |
| `text-4xl sm:text-5xl` | 7 | |
| `text-4xl sm:text-5xl lg:text-[3.75rem]` | 1 (hero only) | Homepage H1, the one outlier custom scale |

---

## 9. Iconography

**Library**: `lucide-react` exclusively — imported in 85 files. No other icon package in use.

**Signature pattern — colored icon box**: a gradient/tinted rounded box wrapping a white lucide icon, `flex items-center justify-center`, frequently with `group-hover:scale-110` and a matching shadow tint:
```tsx
// Solid-tint version (CaseStudySnapshot.tsx)
<div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">

// Gradient version with hover scale (FeatureHighlights.tsx)
<div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${catColor.gradient} flex items-center justify-center text-white mb-4 shadow-sm group-hover:scale-110 group-hover:shadow-lg transition-all duration-300`}>

// Stat card version (TrustStats.tsx)
<div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${statGradients[i]} flex items-center justify-center shadow-lg ${statShadows[i]} group-hover:scale-110 transition-transform duration-300`}>
```

**Circular variant** (`rounded-full`) for avatar-like icons: testimonial avatars (`w-11 h-11 rounded-full bg-gradient-to-br ...`), footer social icons (`w-9 h-9 rounded-full footer-social`), form success-state checkmarks (`w-16/14 h-16/14 rounded-full bg-green-100`).

**Icon sizing**: `w-6 h-6` for primary feature icons inside wrapper boxes; `w-4/w-5 h-4/h-5` for inline/button icons; `w-3.5 h-3.5` / `w-3 h-3` for compact nav/badge icons.

---

*Compiled from a full-codebase survey of `src/`. Reflects the state of the UI system as implemented — including one flagged inconsistency (unused `src/lib/motion.tsx` primitives) and one recently-fixed one (footer logo invert filter).*
