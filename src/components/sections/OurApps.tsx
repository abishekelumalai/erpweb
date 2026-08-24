'use client';

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { Smartphone, GraduationCap, ShieldCheck, Apple, PlayCircle } from 'lucide-react';

// Tracks the cursor position over a card as CSS custom properties, driving
// the .spotlight radial-glow effect defined in globals.css.
function handleSpotlightMove(e: React.MouseEvent<HTMLElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${((e.clientX - rect.left) / rect.width) * 100}%`);
  e.currentTarget.style.setProperty('--my', `${((e.clientY - rect.top) / rect.height) * 100}%`);
}

const APPS = [
  {
    icon: GraduationCap,
    role: 'Parent App',
    name: 'Chaloschools',
    desc: 'Attendance, fees, results & communication — all in your pocket.',
    color: 'from-[#026dde] to-[#024fb3]',
  },
  {
    icon: Smartphone,
    role: 'Teachers App',
    name: 'AnsApp',
    desc: 'Mark attendance, enter grades, and message parents on the go.',
    color: 'from-[#f59e0b] to-[#d97706]',
  },
  {
    icon: ShieldCheck,
    role: 'Management App',
    name: 'C-365',
    desc: 'Real-time dashboards and approvals for school leadership, anywhere.',
    color: 'from-[#10b981] to-[#059669]',
  },
];

function AppCard({ app, i }: { app: (typeof APPS)[number]; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.08 }}
      onMouseMove={handleSpotlightMove}
      className="spotlight bg-surface-2 rounded-2xl border border-border p-6 hover:shadow-lg hover:border-blue-100 transition-all"
    >
      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${app.color} flex items-center justify-center text-white mb-4 shadow-sm`}>
        <app.icon className="w-6 h-6" />
      </div>
      <p className="text-xs font-semibold text-subtle uppercase tracking-wider mb-1">{app.role}</p>
      <h3 className="text-lg font-bold text-heading mb-2">{app.name}</h3>
      <p className="text-sm text-subtle leading-relaxed mb-4">{app.desc}</p>
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#212121] text-white text-xs font-medium">
          <Apple className="w-3.5 h-3.5" />
          App Store
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#212121] text-white text-xs font-medium">
          <PlayCircle className="w-3.5 h-3.5" />
          Google Play
        </span>
      </div>
    </motion.div>
  );
}

function AppsGrid() {
  return (
    <div className="grid sm:grid-cols-3 gap-6">
      {APPS.map((app, i) => <AppCard key={app.name} app={app} i={i} />)}
    </div>
  );
}

function Dot({ progress, index, count }: { progress: MotionValue<number>; index: number; count: number }) {
  const seg = 1 / count;
  const scale = useTransform(progress, [Math.max(0, index * seg - seg * 0.5), index * seg, Math.min(1, index * seg + seg * 0.5)], [0.6, 1, 0.6]);
  const opacity = useTransform(progress, [Math.max(0, index * seg - seg * 0.5), index * seg, Math.min(1, index * seg + seg * 0.5)], [0.35, 1, 0.35]);
  return <motion.span style={{ scale, opacity }} className="w-2.5 h-2.5 rounded-full bg-[#026dde]" />;
}

// Desktop-only pinned horizontal showcase: the section sticks to the viewport
// while the user scrolls, and the 3 app slides translate horizontally in
// lock-step with scroll progress — a scroll-scrubbed "slide jack" built on
// Framer Motion (this codebase's one animation library) rather than adding
// GSAP/ScrollTrigger as a second dependency for a one-off effect.
function PinnedShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });
  // x is a translateX on the track itself, so percentages resolve against the
  // track's own (APPS.length * 100%) width — divide by APPS.length to land
  // on exactly (APPS.length - 1) single-slide widths of travel.
  const x = useTransform(scrollYProgress, [0, 1], ['0%', `-${((APPS.length - 1) / APPS.length) * 100}%`]);

  return (
    <div ref={containerRef} className="hidden md:block relative" style={{ height: `${APPS.length * 100}vh` }}>
      <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-hidden flex items-center">
        <motion.div className="flex h-full shrink-0" style={{ x, width: `${APPS.length * 100}%` }}>
          {APPS.map((app) => (
            <div
              key={app.name}
              className="h-full shrink-0 flex items-center justify-center px-6 lg:px-16"
              style={{ width: `${100 / APPS.length}%` }}
            >
              <div className="max-w-3xl w-full grid lg:grid-cols-[auto_1fr] items-center gap-10">
                <div className={`w-28 h-28 lg:w-36 lg:h-36 mx-auto rounded-3xl bg-gradient-to-br ${app.color} flex items-center justify-center text-white shadow-2xl`}>
                  <app.icon className="w-14 h-14 lg:w-16 lg:h-16" />
                </div>
                <div className="text-center lg:text-left">
                  <p className="text-sm font-semibold text-subtle uppercase tracking-wider mb-2">{app.role}</p>
                  <h3 className="text-3xl lg:text-4xl font-bold text-heading mb-3">{app.name}</h3>
                  <p className="text-lg text-body leading-relaxed mb-6 max-w-md mx-auto lg:mx-0">{app.desc}</p>
                  <div className="flex items-center justify-center lg:justify-start gap-3">
                    <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#212121] text-white text-sm font-medium">
                      <Apple className="w-4 h-4" />
                      App Store
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#212121] text-white text-sm font-medium">
                      <PlayCircle className="w-4 h-4" />
                      Google Play
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Progress dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-10">
          {APPS.map((app, i) => (
            <Dot key={app.name} progress={scrollYProgress} index={i} count={APPS.length} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function OurApps() {
  const reduce = useReducedMotion();

  return (
    <section id="our-apps" className="bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 lg:pt-16">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-3xl mx-auto mb-10">
          <Badge className="mb-4 bg-[#026dde]/10 text-primary border-[#026dde]/20 rounded-full">Our Apps</Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-heading mb-4">A Dedicated App for Every Role</h2>
          <p className="text-lg text-body">One platform, three purpose-built apps — for parents, teachers, and school management.</p>
        </motion.div>
      </div>

      {/* Mobile / reduced-motion: plain grid, no scroll-jacking */}
      <div className={`${reduce ? '' : 'md:hidden'} max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 lg:pb-16`}>
        <AppsGrid />
      </div>

      {/* Desktop, motion-enabled: pinned horizontal showcase */}
      {!reduce && <PinnedShowcase />}
    </section>
  );
}
