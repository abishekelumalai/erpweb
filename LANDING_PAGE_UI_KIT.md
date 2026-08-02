# Landing Page UI Kit — Portable Reference

A complete, copy-paste-ready reference of every section, component pattern, button style, and animation/effect used on this landing page — written so it can be lifted into a different project. Stack assumption: **Tailwind CSS v4 + framer-motion + CSS custom properties for theme tokens** (`var(--primary)`, `var(--accent)`, `var(--card)`, `var(--border)`, `var(--heading)`, `var(--body)`, `var(--subtle)`). Swap those variables for your own palette and everything below still works.

---

## 1. Landing Page — Section-by-Section Order

The homepage is one long stack of independent section components, in this exact order:

| # | Section | Purpose |
|---|---|---|
| 1 | **Header** | Fixed nav, scroll-aware |
| 2 | **Hero** | Headline, CTA, product mockup, cursor glow |
| 3 | **TrustStats** | 4 animated stat counters (schools, students, etc.) |
| 4 | **SocialProofBar** | "Trusted by X" + infinite logo marquee |
| 5 | **ProblemsSection** | 6 pain-point cards ("old way is broken") |
| 6 | **FeatureHighlights** | Tabbed module/feature grid (Zoho-style — see §4) |
| 7 | **OurApps** | 3 app cards (one per user role) |
| 8 | **IntegrationsStrip** | Small pill row of integration logos/names |
| 9 | **DemoVideo** | Video embed or placeholder with CTA |
| 10 | **WhyChooseUs** | 3 benefit cards + condensed extra-services strip |
| 11 | **BoardTabs** | Tab-switchable content block (`AnimatePresence mode="wait"`) |
| 12 | **ProcessSteps** | "How it works" numbered steps |
| 13 | **TestimonialsSection** | Auto-scrolling review marquee (see §7) |
| 14 | **CaseStudySnapshot** | Single featured case-study card |
| 15 | **PricingTeaser** | Condensed pricing preview, links to full /pricing |
| 16 | **HomepageFAQ** | Accordion FAQ |
| 17 | **BlogStrip** | Latest 3 blog post cards |
| 18 | **FinalCTA** | Closing conversion band with glowing button |
| 19 | **Footer** | See §3 |

Plus two floating elements present on every page (not part of the scroll stack): a **WhatsApp button** and a **chat widget**, both `fixed bottom-*`.

**Standard section wrapper** (used by nearly every section):
```tsx
<section className="py-16 md:py-24 ...">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* content */}
  </div>
</section>
```
Common vertical padding values, by frequency: `py-16 md:py-24` (most common) · `py-20 md:py-28` (hero-style bands) · `py-12 lg:py-16` (compact sections) · `py-14` (stat rows).

---

## 2. Header

Fixed, full-width, transitions to a blurred/elevated state on scroll.

```tsx
<nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
  scrolled ? 'bg-card/80 backdrop-blur-xl shadow-md border-b border-border' : 'bg-card border-b border-border'
}`}>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex items-center justify-between h-16 lg:h-[68px]">
      {/* logo | nav links (ml-auto pushes them flush right) | CTA buttons | mobile menu */}
    </div>
  </div>
</nav>
```

- **Scroll listener**: `window.addEventListener('scroll', () => setScrolled(window.scrollY > 20))`
- **Logo**: `<Image className="theme-logo h-11 w-auto drop-shadow-sm" priority />` — `priority` because it's above the fold; `drop-shadow-sm` for contrast against busy backgrounds; `.theme-logo` auto-inverts to white on dark themes (see §8 theme section).
- **Nav links**: plain `<Link>` with `hover-underline` class (animated underline draws in on hover — see §6).
- **Mega-dropdown** (for nav items with sub-menus): a `<button aria-haspopup aria-expanded>` that opens a `motion.div` panel on hover/focus:
  ```tsx
  <AnimatePresence>{isOpen && (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.98 }}
      transition={{ duration: 0.15 }}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[500px] bg-card rounded-xl shadow-xl border border-border p-6 z-50"
    >
      {/* nested stagger: staggerChildren: 0.04, delayChildren: 0.03 */}
    </motion.div>
  )}</AnimatePresence>
  ```
  Active-tab indicator uses framer-motion **shared layout animation**: `layoutId="nav-active"` with `transition={{ type: 'spring', stiffness: 300, damping: 25 }}` — the little underline/pill glides between tabs instead of jump-cutting.
- **Mobile menu**: shadcn `Sheet` sliding from the right, `w-80`; nested nav groups use a height auto-animate: `initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} transition={{duration:0.28, ease:[0.22,1,0.36,1]}}`.
- **CTA buttons** on the right: a primary pill button + optionally a secondary outline button (see §5 for button anatomy).
- Full accessibility: `role="menu"`/`role="menuitem"` on dropdown contents, Escape-to-close returning focus to the trigger, `focus-visible:ring-2` throughout.

---

## 3. Footer

Two-part layout: a top content area (logo + description + contact, positioned opposite each other) and a bottom bar (socials + copyright).

```tsx
<footer className="footer-surface">   {/* always dark, regardless of the active site theme */}
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="py-16 flex flex-col md:flex-row md:items-start md:justify-between gap-10">
      <div className="space-y-5 max-w-sm">
        {/* logo (NO invert filter here — footer is always dark, so the real colored logo already has contrast) */}
        {/* one-paragraph description */}
      </div>
      <div className="space-y-2.5 shrink-0">
        {/* phone / email / address, each: flex items-center gap-2 text-sm footer-muted hover:text-accent */}
      </div>
    </div>
    <Separator className="footer-divider" />
    <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        {/* social icons: w-9 h-9 rounded-full footer-social flex items-center justify-center hover:bg-accent */}
      </div>
      <p className="text-sm footer-muted">© {year} ... </p>
    </div>
  </div>
</footer>
```

**Why the footer looks different from the rest of the site**: it's deliberately dark on *every* theme (light or dark mode), driven by its own CSS-variable set rather than the shared theme tokens:
```css
.footer-surface { background-color: var(--footer-bg); color: var(--footer-fg); }
.footer-surface .footer-muted { color: var(--footer-muted); }
.footer-surface .footer-divider { background-color: color-mix(in srgb, var(--footer-fg) 12%, transparent); }
.footer-surface .footer-social { background-color: color-mix(in srgb, var(--footer-fg) 10%, transparent); }
```
`--footer-bg` / `--footer-fg` / `--footer-muted` get their own value inside *every* theme block (including light themes) — this is what keeps the footer a consistent dark band no matter which theme is active. If you don't need multi-theme support, just hardcode a dark background/light text instead.

---

## 4. Module/Feature Showcase ("Zoho-style" tabbed grid)

This is `FeatureHighlights.tsx` — a category-filterable grid of feature cards, the single most reusable pattern in the kit for showing "all our modules" with an interactive filter.

**Structure:**
1. A row of pill filter buttons (`All`, `Category A`, `Category B`, ...)
2. A responsive card grid that **animates items in/out** when the filter changes (not just a visibility toggle — items actually reflow with a layout animation)

```tsx
{/* Filter tabs */}
<div className="flex flex-wrap items-center justify-center gap-2 mb-10">
  {CATEGORIES.map((cat) => (
    <button
      onClick={() => setActiveCategory(cat)}
      className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
        isActive
          ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20'
          : 'bg-card text-body border border-border hover:border-primary/40 hover:text-primary'
      }`}
    >{cat}</button>
  ))}
</div>

{/* Filterable grid with layout animation */}
<motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  <AnimatePresence mode="popLayout">
    {visibleItems.map((item, i) => (
      <motion.div
        key={item.label}
        layout
        initial={{ opacity: 0, y: 24, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ delay: i * 0.05, duration: 0.35 }}
      >
        {/* card */}
      </motion.div>
    ))}
  </AnimatePresence>
</motion.div>
```

**Individual card anatomy** (this exact structure is reused for every card grid on the site — features, apps, benefits):
```tsx
<Link className="group card-shine spotlight relative block h-full rounded-2xl bg-card border border-border p-6 overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/10 hover:border-transparent"
      onMouseMove={handleSpotlightMove}>
  {/* colored top accent border that draws in on hover */}
  <span className="absolute inset-x-0 top-0 h-1 rounded-t-2xl origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" style={{ backgroundColor: accentColor }} />

  {/* optional badge */}
  <span className="absolute top-4 right-4 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">Popular</span>

  {/* icon box — see the icon-box pattern in §9 */}
  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-X to-Y flex items-center justify-center text-white mb-4 shadow-sm group-hover:scale-110 group-hover:shadow-lg transition-all duration-300">
    <Icon className="w-6 h-6" />
  </div>

  <h3 className="font-bold text-base text-heading mb-1.5">{title}</h3>
  <p className="text-sm text-subtle leading-relaxed">{description}</p>

  {/* reveal-on-hover link */}
  <div className="mt-4 flex items-center gap-1.5 text-sm font-semibold opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" style={{ color: accentColor }}>
    Explore <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
  </div>
</Link>
```

Card also carries `spotlight` + a mouse handler for the cursor-tracked glow (§6) and `card-shine` for a hover light-sweep (§6).

**Color-by-category convention**: each category gets a fixed `{gradient, accent}` pair, and every card inherits its color from its category — so the whole grid reads as visually grouped by domain even though it's one flat grid. Example:
```ts
const CATEGORY_COLORS = {
  Academics:      { gradient: 'from-[#026dde] to-[#024fb3]', accent: '#026dde' },
  Administration: { gradient: 'from-[#6366f1] to-[#4f46e5]', accent: '#6366f1' },
  Finance:        { gradient: 'from-[#f59e0b] to-[#d97706]', accent: '#f59e0b' },
  Communication:  { gradient: 'from-[#10b981] to-[#059669]', accent: '#10b981' },
  Analytics:      { gradient: 'from-[#0891b2] to-[#0e7490]', accent: '#0891b2' },
  'Add-ons':      { gradient: 'from-[#e11d48] to-[#be123c]', accent: '#e11d48' },
};
```

---

## 5. Buttons / CTA — Every Variant

Built on `class-variance-authority` (cva) so variant + size are independently composable: `<Button variant="outline" size="lg">`.

**Base classes** (all buttons):
```
inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium
transition-all disabled:pointer-events-none disabled:opacity-50
outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]
```

**Variants:**
| Variant | Classes |
|---|---|
| `default` (primary) | `bg-primary text-primary-foreground shadow-xs hover:bg-primary/90` |
| `destructive` | `bg-destructive text-white shadow-xs hover:bg-destructive/90` |
| `outline` | `border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground` |
| `secondary` | `bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80` |
| `ghost` | `hover:bg-accent hover:text-accent-foreground` |
| `link` | `text-primary underline-offset-4 hover:underline` |

**Sizes:** `default` (`h-9 px-4 py-2`) · `sm` (`h-8 px-3`) · `lg` (`h-10 px-6`) · `icon` (`size-9`).

**But the marketing site's actual CTA buttons override this with a bespoke pill style** — this is the real pattern used everywhere on the landing page, not the raw shadcn default:

```tsx
{/* Primary pill CTA — the button used in Header, Hero, FinalCTA, pricing cards */}
<Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full font-semibold
  shadow-lg shadow-primary/25 group transition-all hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5">
  <Sparkles className="w-4 h-4 mr-2" />
  Book Free Demo
  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
</Button>

{/* Secondary pill CTA — outline, glass-like on dark backgrounds */}
<Button variant="outline" className="border border-white/20 bg-white/5 text-white hover:bg-white/10
  rounded-full font-semibold backdrop-blur-sm transition-all hover:-translate-y-0.5">
  <Phone className="w-4 h-4 mr-2" /> Talk to Sales
</Button>

{/* Compact nav-bar CTA (small pill in the header) */}
<Button size="sm" className="text-xs bg-primary hover:bg-primary/90 text-primary-foreground
  font-semibold rounded-full px-4 h-8 shadow-sm shadow-primary/20">
  Book Free Demo <ArrowRight className="w-3 h-3 ml-1" />
</Button>
```

**The "hero-CTA" treatment — every effect stacked on one button** (used on the final conversion CTA, this is the showcase piece):
```tsx
<div className="relative inline-flex">
  {/* ambient glow pulsing behind the button */}
  <motion.span
    className="absolute inset-0 rounded-full bg-accent blur-xl"
    animate={{ scale: [1, 1.18, 1], opacity: [0.35, 0.55, 0.35] }}
    transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
  />
  {/* rotating conic-gradient border ring */}
  <div className="conic-border rounded-full p-[2px] inline-flex relative">
    <Button className="relative overflow-hidden bg-gradient-to-r from-accent to-accent/80 text-white
      rounded-full font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all group">
      {/* diagonal shimmer sweep, loops forever */}
      <span className="absolute inset-0 -translate-x-full animate-[shine-sweep_2.8s_ease-in-out_infinite]
        bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      <Sparkles className="w-4 h-4 mr-2 relative" />
      <span className="relative">Request a Demo</span>
      <ArrowRight className="w-5 h-5 ml-2 relative group-hover:translate-x-1 transition-transform" />
    </Button>
  </div>
</div>
```
Layers, outside to in: ambient blurred glow (`motion.span`, infinite pulse) → rotating conic-gradient ring (`.conic-border`) → the button itself → an infinite diagonal shimmer sweeping across the button face (`shine-sweep` keyframe). All three motion layers should be conditionally skipped under `useReducedMotion()`.

**Animated "pulse ring" CTA** (used for a hero primary button, e.g. "book free demo"):
```tsx
<div className="relative inline-flex">
  <span className="absolute inset-0 rounded-full bg-primary/40 animate-ping pointer-events-none" />
  <span className="absolute -inset-1.5 rounded-full border-2 border-primary/40 pulse-dot pointer-events-none" />
  <Button className="relative ...">Book Free Demo</Button>
</div>
```

---

## 6. Every Hover/Interaction Effect (CSS, drop-in)

All of these are theme-token-driven (`var(--primary)`, `var(--accent)`, `var(--card)`, `var(--border)`) — replace with your own CSS variables or hardcode colors.

```css
/* Card lift on hover — the most common card hover across the whole site */
.card-lift { transition: transform .3s cubic-bezier(.22,1,.36,1), box-shadow .3s ease; }
.card-lift:hover { transform: translateY(-6px); box-shadow: 0 18px 40px -12px color-mix(in srgb, var(--primary) 30%, transparent); }

/* Stronger version — scale + bigger lift + glow ring, for "wow" cards */
.wow-card { transition: transform .35s cubic-bezier(.22,1,.36,1), box-shadow .35s ease; }
.wow-card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 30px 60px -18px color-mix(in srgb, var(--primary) 40%, transparent),
              0 0 0 1px color-mix(in srgb, var(--primary) 30%, transparent);
}

/* 3D tilt on hover (subtle, static — not mouse-tracked) */
.card-3d { transition: transform .3s cubic-bezier(.22,1,.36,1); transform-style: preserve-3d; }
.card-3d:hover { transform: perspective(900px) rotateX(4deg) rotateY(-4deg) translateY(-4px); }

/* "Magnetic" lift + scale, for icon buttons / small interactive chips */
.magnetic-hover { transition: transform .25s ease, box-shadow .25s ease; }
.magnetic-hover:hover { transform: translateY(-4px) scale(1.03); box-shadow: 0 12px 30px -8px color-mix(in srgb, var(--primary) 35%, transparent); }

/* Glassmorphism card */
.glass-card {
  background: color-mix(in srgb, var(--card) 70%, transparent);
  backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
  border: 1px solid color-mix(in srgb, var(--border) 80%, transparent);
  transition: border-color .3s ease, box-shadow .3s ease;
}
.glass-card:hover { border-color: color-mix(in srgb, var(--primary) 45%, transparent); box-shadow: 0 8px 30px -10px color-mix(in srgb, var(--primary) 30%, transparent); }

/* Gradient border reveal on hover (mask-composite trick — no extra DOM element needed) */
.glow-border { position: relative; }
.glow-border::after {
  content:''; position:absolute; inset:0; border-radius:inherit; padding:1px;
  background:linear-gradient(120deg, var(--primary), var(--accent));
  -webkit-mask:linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite:xor; mask-composite:exclude;
  opacity:0; transition:opacity .3s ease;
}
.glow-border:hover::after { opacity:1; }

/* Animated underline that draws in from the left on hover (nav links) */
.hover-underline { position: relative; }
.hover-underline::after { content:''; position:absolute; left:0; bottom:-2px; height:2px; width:0; background:var(--primary); transition:width .3s ease; }
.hover-underline:hover::after { width:100%; }

/* Underline that draws in automatically on mount (not hover) — for headings */
@keyframes underline-draw { from { transform: scaleX(0); } to { transform: scaleX(1); } }
.wow-underline { position: relative; display: inline-block; }
.wow-underline::after {
  content: ''; position: absolute; left: 0; bottom: -6px; height: 3px; width: 100%;
  background: linear-gradient(90deg, var(--primary), var(--accent)); border-radius: 3px;
  transform: scaleX(0); transform-origin: left;
  animation: underline-draw .8s .2s cubic-bezier(.22,1,.36,1) forwards;
}

/* Hover-only strike-through (used to mean "this problem goes away") — invisible at rest */
.problem-strike { position: relative; display: inline-block; }
.problem-strike::after {
  content: ''; position: absolute; left: 0; top: 50%; height: 2px; width: 100%;
  background: currentColor; opacity: 0.55; border-radius: 2px;
  transform: scaleX(0); transform-origin: left; transition: transform .35s cubic-bezier(.22,1,.36,1);
}
.group:hover .problem-strike::after { transform: scaleX(1); }

/* Gradient text reveal on hover */
.gradient-hover {
  background-image: linear-gradient(90deg, var(--primary), var(--accent));
  background-size: 0% 100%; background-repeat: no-repeat; transition: background-size .3s ease;
  -webkit-background-clip: text; background-clip: text;
}
.gradient-hover:hover { background-size: 100% 100%; color: transparent; }

/* Cursor-tracked spotlight glow ("Magic Card" effect) — needs JS to set --mx/--my */
.spotlight { position: relative; overflow: hidden; }
.spotlight::before {
  content:''; position:absolute; inset:0; opacity:0; transition:opacity .3s ease;
  background: radial-gradient(320px circle at var(--mx,50%) var(--my,50%), color-mix(in srgb, var(--primary) 18%, transparent), transparent 60%);
}
.spotlight:hover::before { opacity:1; }
```
```tsx
// JS handler that drives .spotlight — attach to onMouseMove on the same element
function handleSpotlightMove(e: React.MouseEvent<HTMLElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${((e.clientX - rect.left) / rect.width) * 100}%`);
  e.currentTarget.style.setProperty('--my', `${((e.clientY - rect.top) / rect.height) * 100}%`);
}
```

```css
/* Diagonal light sweep across a card on hover ("shine") */
@keyframes shine-sweep { 0% { transform: translateX(-120%) skewX(-20deg); } 100% { transform: translateX(220%) skewX(-20deg); } }
.card-shine { position: relative; overflow: hidden; }
.card-shine::before {
  content:''; position:absolute; top:0; left:0; width:60%; height:100%;
  background:linear-gradient(100deg, transparent, color-mix(in srgb, #fff 35%, transparent), transparent);
  transform:translateX(-120%) skewX(-20deg); pointer-events:none;
}
.card-shine:hover::before { animation: shine-sweep .9s ease; }

/* Rotating conic-gradient border ("border beam") — needs @property registration */
@property --angle { syntax: '<angle>'; initial-value: 0deg; inherits: false; }
@keyframes spin-border { to { --angle: 360deg; } }
.conic-border { position: relative; z-index: 0; }
.conic-border::before {
  content:''; position:absolute; inset:-2px; z-index:-1; border-radius:inherit;
  background:conic-gradient(from var(--angle), var(--primary), var(--accent), var(--primary));
  animation: spin-border 4s linear infinite;
}

/* Click ripple (Material-style) */
@keyframes ripple-out { 0% { opacity:.5; transform:scale(1);} 100% { opacity:0; transform:scale(30);} }
.ripple { position: relative; overflow: hidden; }
.ripple::after { content:''; position:absolute; inset:0; margin:auto; width:8px; height:8px; border-radius:9999px; background:color-mix(in srgb, #fff 60%, transparent); opacity:0; }
.ripple:active::after { animation: ripple-out .5s ease-out; }
```

---

## 7. Scroll & Ambient Animations (framer-motion + CSS keyframes)

**Standard scroll-triggered fade-up** (the single most-used animation on the whole site — every section header and most cards use this):
```tsx
<motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
```

**Staggered card grid entrance:**
```tsx
<motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
  transition={{ delay: i * 0.08 }}>  {/* i = index in the .map() */}
```

**Spring-based entrance** (stat counters, feels punchier than a plain fade):
```tsx
<motion.div initial={{ opacity: 0, y: 30, scale: 0.9 }} whileInView={{ opacity: 1, y: 0, scale: 1 }}
  viewport={{ once: true }} transition={{ delay: i * 0.1, type: 'spring', stiffness: 100 }}>
```

**Number count-up on scroll into view** (no external library — plain rAF + `useInView`):
```tsx
function AnimatedCounter({ value, duration = 2000 }: { value: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out-cubic
      setDisplay(Math.round(eased * value));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value, duration]);
  return <span ref={ref}>{display.toLocaleString()}</span>;
}
```

**Infinite horizontal marquee** (logos, testimonial cards — duplicate the content once for a seamless loop):
```css
@keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
.animate-marquee { animation: marquee 40s linear infinite; }
.animate-marquee:hover { animation-play-state: paused; }
/* slower + reversed variant, for bigger card content moving the opposite direction */
.animate-marquee-slow { animation: marquee 70s linear infinite reverse; }
```
```tsx
<div className="relative w-full overflow-hidden">
  <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
  <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
  <div className="animate-marquee flex items-center gap-6 w-max">
    {[...items, ...items].map((item, i) => <Card key={i} {...item} />)}
  </div>
</div>
```
For uniform card height in a marquee row regardless of content length: put `items-stretch` on the flex row, `h-full` on each card, and `line-clamp-N` on the text — this avoids one long item blowing out the row's height.

**Tab-switch content transition:**
```tsx
<AnimatePresence mode="wait">
  <motion.div key={activeTab} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.25 }}>
    {/* tab content */}
  </motion.div>
</AnimatePresence>
```

**Filterable grid with layout animation** (items reflow smoothly when the filter changes — see §4 for full context):
```tsx
<motion.div layout className="grid ...">
  <AnimatePresence mode="popLayout">
    {filtered.map((item, i) => (
      <motion.div key={item.id} layout initial={{ opacity: 0, y: 24, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
        transition={{ delay: i * 0.05, duration: 0.35 }} />
    ))}
  </AnimatePresence>
</motion.div>
```

**Ambient pulsing glow behind an element** (buttons, play icons):
```tsx
<motion.span
  className="absolute inset-0 rounded-full bg-accent blur-xl"
  animate={{ scale: [1, 1.18, 1], opacity: [0.35, 0.55, 0.35] }}
  transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
/>
```

**Cursor-following ambient color glow** (whole-section mouse-parallax effect):
```tsx
const [spot, setSpot] = useState({ x: 0, y: 0, active: false });
function handleMouseMove(e: React.MouseEvent) {
  const r = sectionRef.current!.getBoundingClientRect();
  setSpot({ x: e.clientX - r.left, y: e.clientY - r.top, active: true });
}
// ...
<div
  className="absolute inset-0 pointer-events-none transition-opacity duration-500 mix-blend-screen"
  style={{
    opacity: spot.active ? 1 : 0,
    background: `radial-gradient(560px circle at ${spot.x}px ${spot.y}px, rgba(0,212,255,0.35), rgba(2,109,222,0.18) 45%, transparent 70%)`,
  }}
/>
```

**Floating decorative orbs with mouse parallax** (hero backgrounds):
```tsx
<motion.div
  animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.1, 1] }}
  transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
  style={{ transform: `translate(${parallax.x * 40}px, ${parallax.y * 40}px)` }}
  className="absolute w-[500px] h-[500px] bg-primary/15 rounded-full blur-[100px]"
/>
```
(`parallax` = `{x, y}` normalized to -0.5..0.5, updated in the same `onMouseMove` handler as the section; different orbs use different multipliers for a depth effect.)

**Word-by-word blur reveal** (hero headline):
```tsx
{text.split(' ').map((word, i) => (
  <motion.span key={i} initial={{ opacity: 0, filter: 'blur(16px)', y: 14 }}
    animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
    transition={{ duration: 0.65, delay: i * 0.13, ease: [0.22, 1, 0.36, 1] }}>
    {word}{' '}
  </motion.span>
))}
```

**Animated gradient heading text** (continuous color sweep through the text):
```css
@keyframes gradient-shift { 0%,100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
.wow-heading {
  background-image: linear-gradient(100deg, var(--heading), var(--primary), var(--accent), var(--heading));
  background-size: 250% auto; -webkit-background-clip: text; background-clip: text; color: transparent;
  animation: gradient-shift 6s ease infinite;
}
```

**Shimmer text** (different flavor — a bright band sweeps across, rest of text stays a flat gradient):
```css
@keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
.text-shimmer {
  background: linear-gradient(90deg, var(--primary) 25%, #00d4ff 50%, var(--primary) 75%);
  background-size: 200% auto; -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  animation: shimmer 3s ease-in-out infinite;
}
```

**Animated moving-gradient background wash** (large ambient section backgrounds):
```css
@keyframes mesh-shift {
  0%   { background-position: 0% 50%;   filter: hue-rotate(0deg); }
  25%  { background-position: 100% 25%; filter: hue-rotate(10deg); }
  50%  { background-position: 75% 95%;  filter: hue-rotate(-6deg); }
  75%  { background-position: 25% 70%;  filter: hue-rotate(6deg); }
  100% { background-position: 0% 50%;   filter: hue-rotate(0deg); }
}
.animate-mesh { background-size: 230% 230%; animation: mesh-shift 9s ease-in-out infinite; }
```

**Aurora background wash** (softer, rotating rather than panning):
```css
@keyframes aurora {
  0%   { transform: translate3d(-8%, -4%, 0) rotate(0deg) scale(1.1); }
  50%  { transform: translate3d(8%, 4%, 0) rotate(8deg) scale(1.25); }
  100% { transform: translate3d(-8%, -4%, 0) rotate(0deg) scale(1.1); }
}
.aurora-bg { position: relative; overflow: hidden; isolation: isolate; }
.aurora-bg::before {
  content: ''; position: absolute; inset: -20%; z-index: -1; pointer-events: none;
  background:
    radial-gradient(40% 40% at 20% 30%, color-mix(in srgb, var(--primary) 22%, transparent), transparent 60%),
    radial-gradient(45% 45% at 80% 20%, color-mix(in srgb, #00d4ff 20%, transparent), transparent 60%),
    radial-gradient(50% 50% at 60% 90%, color-mix(in srgb, var(--accent) 18%, transparent), transparent 60%);
  filter: blur(30px); animation: aurora 18s ease-in-out infinite;
}
```

**Floating decorative blob:**
```css
@keyframes blob-float {
  0%,100% { transform: translate(0,0) scale(1); }
  33%     { transform: translate(20px,-24px) scale(1.08); }
  66%     { transform: translate(-16px,16px) scale(.94); }
}
.wow-blob { position: absolute; border-radius: 9999px; filter: blur(60px); opacity: .5; animation: blob-float 16s ease-in-out infinite; }
```

**Simple utility keyframes** (small, single-purpose):
```css
@keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
.animate-float { animation: float 3s ease-in-out infinite; }
.animate-float-slow { animation: float 7s ease-in-out infinite; }

@keyframes breathe { 0%,100% { transform: scale(1); opacity: .85; } 50% { transform: scale(1.06); opacity: 1; } }
.animate-breathe { animation: breathe 5s ease-in-out infinite; }

@keyframes fade-in-up { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
.animate-fade-in-up { animation: fade-in-up 0.6s ease-out forwards; }

@keyframes pulse-glow { 0%,100%{box-shadow:0 0 0 0 rgba(2,109,222,0.4)} 50%{box-shadow:0 0 0 12px rgba(2,109,222,0)} }
.animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }

@keyframes pulse-dot { 0% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--primary) 55%, transparent); } 70% { box-shadow: 0 0 0 10px transparent; } 100% { box-shadow: 0 0 0 0 transparent; } }
.pulse-dot { animation: pulse-dot 2s ease-out infinite; }

@keyframes cursor-blink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
.animate-cursor::after { content: ''; display: inline-block; width: 2px; height: 1em; margin-left: 2px; background: currentColor; vertical-align: -0.1em; animation: cursor-blink 1s step-end infinite; }

@keyframes typing-bounce { 0%,80%,100% { transform: translateY(0); opacity: .5; } 40% { transform: translateY(-6px); opacity: 1; } }
.typing-dots { display: inline-flex; gap: 4px; align-items: center; }
.typing-dots > span { width: 6px; height: 6px; border-radius: 9999px; background: currentColor; animation: typing-bounce 1.2s infinite ease-in-out; }
.typing-dots > span:nth-child(2) { animation-delay: .15s; }
.typing-dots > span:nth-child(3) { animation-delay: .3s; }

@keyframes stagger-fade { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
.stagger-children > * { opacity:0; transform:translateY(16px); animation: stagger-fade .5s ease forwards; }
.stagger-children > *:nth-child(1){animation-delay:.05s} .stagger-children > *:nth-child(2){animation-delay:.1s}
.stagger-children > *:nth-child(3){animation-delay:.15s} .stagger-children > *:nth-child(4){animation-delay:.2s}

@keyframes page-enter { from { opacity: 0; } to { opacity: 1; } }
.page-enter { animation: page-enter .5s ease both; }

/* Scroll-triggered reveal via IntersectionObserver (non-framer-motion alternative) */
.fade-in-up { opacity:0; transform:translateY(24px); transition:opacity .6s ease, transform .6s cubic-bezier(.22,1,.36,1); }
.fade-in-up.is-visible { opacity:1; transform:translateY(0); }

@keyframes wow-in {
  0%   { opacity: 0; transform: perspective(1000px) translateY(40px) rotateX(8deg) scale(.96); }
  100% { opacity: 1; transform: perspective(1000px) translateY(0) rotateX(0) scale(1); }
}
.wow-reveal { opacity: 0; }
.wow-reveal.is-visible { animation: wow-in .7s cubic-bezier(.22,1,.36,1) forwards; }
```

---

## 8. Theming (optional, if you want light/dark or multi-theme)

- All colors referenced above as `var(--primary)`, `var(--accent)`, `var(--card)`, `var(--border)`, `var(--heading)`, `var(--body)`, `var(--subtle)`, `var(--surface)`, `var(--surface-2)` — define these once per theme in a `[data-theme="x"]` CSS block, swap the `data-theme` attribute on `<html>` to switch themes instantly with zero re-render.
- Logo dark-mode handling: give the logo a `.theme-logo` class, then per dark theme: `[data-theme="dark"] .theme-logo { filter: brightness(0) invert(1); }` — flips a colored logo to white automatically, only on dark themes.
- Brand gradient (hero bands, CTA backgrounds): `.bg-brand-gradient { background-image: linear-gradient(to bottom right, var(--grad-from), var(--grad-via), var(--grad-to)); }` — 3 more theme-driven variables.
- **Always** wrap ambient/looping animations in a reduced-motion guard:
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: .001ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: .001ms !important;
    }
  }
  ```
  ...and in React, gate any JS-driven infinite animation behind `const reduce = useReducedMotion();` (framer-motion hook) so it doesn't even mount for those users.

---

## 9. Icon Box Pattern (used in every card grid)

The one repeated visual motif across features/apps/benefits cards — a colored/gradient rounded box behind a white icon:
```tsx
<div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#026dde] to-[#024fb3] flex items-center justify-center text-white mb-4 shadow-sm group-hover:scale-110 group-hover:shadow-lg transition-all duration-300">
  <Icon className="w-6 h-6" />
</div>
```
Variants: `w-12 h-12` (smaller cards) or `w-14 h-14` (feature cards); `rounded-xl` (square-ish) or `rounded-full` (avatars/social icons, `w-9 h-9` to `w-11 h-11`). Icon library used throughout: **lucide-react** exclusively.

---

*Portable reference — every snippet above is copy-paste-ready. Swap the CSS custom properties (`--primary`, `--accent`, etc.) for your target project's palette and everything still works as-is.*
