'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import {
  UserPlus, IndianRupee, ClipboardCheck, CalendarDays, MessageCircle, BarChart3,
  Pause, Play,
} from 'lucide-react';

interface SlideInfo {
  key: string;
  title: string;
  icon: typeof UserPlus;
  image: string;
}

const SLIDES: SlideInfo[] = [
  { key: 'admissions', title: 'Admissions', icon: UserPlus, image: '/images/slides/admissions.png' },
  { key: 'fees', title: 'Fee Management', icon: IndianRupee, image: '/images/slides/fees.png' },
  { key: 'attendance', title: 'Attendance', icon: ClipboardCheck, image: '/images/slides/attendance.png' },
  { key: 'timetable', title: 'Timetable', icon: CalendarDays, image: '/images/slides/timetable.png' },
  { key: 'parent', title: 'Parent App', icon: MessageCircle, image: '/images/slides/parent.png' },
  { key: 'reports', title: 'Reports', icon: BarChart3, image: '/images/slides/reports.png' },
];

// Accent color per slide, reused by the phone/tablet mini-mockups so they
// visually stay in sync with whichever module the monitor is showing.
const SLIDE_ACCENTS = ['#026dde', '#f59e0b', '#10b981', '#8b5cf6', '#026dde', '#f59e0b'];

const INTERVAL_MS = 5000;

export default function HeroSlideshow() {
  const [index, setIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const [paused, setPaused] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Auto-advance only when not paused and the user hasn't requested reduced motion.
  // prefers-reduced-motion users get a static, manually-controlled carousel.
  useEffect(() => {
    if (paused || prefersReducedMotion) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), INTERVAL_MS);
    return () => clearInterval(t);
  }, [paused, prefersReducedMotion]);

  const slide = SLIDES[index];
  const autoRotating = !paused && !prefersReducedMotion;

  function handleImageError(key: string) {
    setImageErrors((prev) => new Set(prev).add(key));
  }

  function goTo(i: number) {
    setIndex((i + SLIDES.length) % SLIDES.length);
  }

  // Arrow-key navigation when the carousel (or a child) has focus.
  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      goTo(index + 1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goTo(index - 1);
    }
  }

  return (
    <section
      className="relative"
      aria-roledescription="carousel"
      aria-label="ChaloSchools ERP module preview"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onKeyDown={handleKeyDown}
    >
      {/* Monitor frame */}
      <div className="relative">
        {/* Screen bezel */}
        <div className="bg-[#1a1a1a] rounded-xl p-2 shadow-2xl">
          {/* Screen */}
          <div
            className="relative bg-card rounded-lg overflow-hidden aspect-[16/10]"
            aria-live={autoRotating ? 'off' : 'polite'}
            aria-atomic="true"
          >
            {/* Screen-reader-only status announcing the current slide */}
            <p className="sr-only" role="status">
              {`Slide ${index + 1} of ${SLIDES.length}: ${slide.title}`}
            </p>
            {/* Slide content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.key}
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 80 }}
                animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
                exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -80 }}
                transition={{ duration: prefersReducedMotion ? 0.2 : 0.5, ease: 'easeInOut' }}
                role="group"
                aria-roledescription="slide"
                aria-label={`${slide.title} (${index + 1} of ${SLIDES.length})`}
                className="absolute inset-0"
              >
                {!imageErrors.has(slide.key) ? (
                  <Image
                    src={slide.image}
                    alt={`${slide.title} - ChaloSchools ERP Module`}
                    fill
                    className={slide.key === 'admissions' ? 'object-contain object-top bg-card' : 'object-cover object-top'}
                    onError={() => handleImageError(slide.key)}
                    sizes="480px"
                  />
                ) : (
                  /* Fallback: styled placeholder screen */
                  <FallbackScreen slideKey={slide.key} />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Monitor stand */}
        <div className="flex justify-center">
          <div className="w-20 h-4 bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a] rounded-b-lg" />
        </div>
        <div className="flex justify-center -mt-0.5">
          <div className="w-32 h-2 bg-[#2a2a2a] rounded-full shadow-md" />
        </div>

        {/* Tablet mockup — illustrative placeholder, straight (no tilt),
            peeking out from the monitor's bottom-left corner. */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.8 }}
          animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="hidden md:block absolute -bottom-8 -left-10 w-[130px] z-10"
        >
          <div className="bg-[#1a1a1a] rounded-[1rem] p-1.5 shadow-2xl border border-black/20">
            <div className="relative bg-card rounded-[0.7rem] overflow-hidden aspect-[3/4]">
              {/* Camera dot */}
              <div className="h-3 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[#1a1a1a]" />
              </div>
              {/* Generic dashboard UI blocks — crossfades in sync with the monitor's active slide */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={slide.key}
                  initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="px-2.5 pt-1 space-y-1.5"
                >
                  <div className="flex items-center gap-1 mb-1">
                    <slide.icon className="w-3 h-3" style={{ color: SLIDE_ACCENTS[index] }} />
                    <div className="h-1.5 w-12 bg-heading/20 rounded-full" />
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {[0, 1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="rounded-md p-1.5 aspect-square flex flex-col justify-center items-center"
                        style={{ backgroundColor: `${SLIDE_ACCENTS[index]}1a` }}
                      >
                        <div className="h-2 w-6 rounded-full" style={{ backgroundColor: `${SLIDE_ACCENTS[index]}66` }} />
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Phone mockup — illustrative placeholder (generic UI blocks, not a real
            screenshot) showing the product also works on mobile, straight (no
            tilt), overlapping the monitor's bottom-right corner. Swap for a
            real app screenshot when available. */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.8 }}
          animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="hidden sm:block absolute -bottom-6 -right-4 md:-right-8 w-[92px] z-10"
        >
          <div className="bg-[#1a1a1a] rounded-[1.1rem] p-1.5 shadow-2xl border border-black/20">
            <div className="relative bg-card rounded-[0.85rem] overflow-hidden aspect-[9/19]">
              {/* Notch */}
              <div className="h-3 flex items-center justify-center">
                <div className="w-8 h-1.5 bg-[#1a1a1a] rounded-full" />
              </div>
              {/* Generic app UI blocks — crossfades in sync with the monitor's active slide */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={slide.key}
                  initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="px-2 pt-1 space-y-1.5"
                >
                  <div className="flex items-center gap-1 mb-1.5">
                    <div className="w-4 h-4 rounded-full shrink-0 flex items-center justify-center" style={{ backgroundColor: SLIDE_ACCENTS[index] }}>
                      <slide.icon className="w-2.5 h-2.5 text-white" />
                    </div>
                    <div className="h-1.5 w-10 bg-heading/20 rounded-full" />
                  </div>
                  <div className="rounded-md p-1.5" style={{ backgroundColor: `${SLIDE_ACCENTS[index]}1a` }}>
                    <div className="h-1.5 w-full rounded-full mb-1" style={{ backgroundColor: `${SLIDE_ACCENTS[index]}4d` }} />
                    <div className="h-1.5 w-2/3 rounded-full" style={{ backgroundColor: `${SLIDE_ACCENTS[index]}33` }} />
                  </div>
                  <div className="rounded-md bg-emerald-500/10 p-1.5">
                    <div className="h-1.5 w-3/4 bg-emerald-500/30 rounded-full" />
                  </div>
                  <div className="rounded-md bg-amber-500/10 p-1.5">
                    <div className="h-1.5 w-1/2 bg-amber-500/30 rounded-full" />
                  </div>
                </motion.div>
              </AnimatePresence>
              {/* Home indicator */}
              <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-1.5 pt-2">
                <div className="w-6 h-0.5 bg-heading/20 rounded-full" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Controls: dot indicators + pause/play */}
      <div className="flex items-center justify-center gap-3 mt-5">
        {/* Dot indicators */}
        <div className="flex items-center gap-1.5" role="tablist" aria-label="Choose a module to preview">
          {SLIDES.map((s, i) => (
            <button
              key={s.key}
              type="button"
              role="tab"
              aria-label={`Show ${s.title}`}
              aria-selected={i === index}
              aria-current={i === index ? 'true' : undefined}
              onClick={() => goTo(i)}
              className={`h-1.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1a1a] ${i === index ? 'w-6 bg-white' : 'w-1.5 bg-white/30 hover:bg-white/50'}`}
            />
          ))}
        </div>

        {/* Pause / play toggle — hidden for reduced-motion users (nothing auto-plays) */}
        {!prefersReducedMotion && (
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? 'Play slideshow' : 'Pause slideshow'}
            aria-pressed={paused}
            className="ml-1 grid place-items-center w-6 h-6 rounded-full bg-white/10 text-white/70 hover:bg-white/20 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1a1a]"
          >
            {paused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
          </button>
        )}
      </div>
    </section>
  );
}

/* Fallback placeholder screens when images aren't available */
function FallbackScreen({ slideKey }: { slideKey: string }) {
  switch (slideKey) {
    case 'admissions':
      return (
        <div className="p-4 h-full bg-gray-50">
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs font-bold text-gray-800">Admissions Dashboard</div>
            <div className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-medium">342 This Week</div>
          </div>
          <div className="space-y-2">
            {['Aarav Sharma - Grade 4', 'Diya Patel - Grade 1', 'Kabir Nair - Grade 7', 'Ishita Rao - Grade 2', 'Priya Menon - Grade 5'].map((s, i) => (
              <div key={i} className="flex items-center justify-between p-2 bg-card rounded-md border border-border shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-[8px] font-bold text-blue-600">{s.split(' ').map(n => n[0]).slice(0, 2).join('')}</div>
                  <span className="text-[10px] font-medium text-gray-700">{s}</span>
                </div>
                <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-full ${i % 3 === 0 ? 'bg-green-100 text-green-700' : i % 3 === 1 ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>
                  {i % 3 === 0 ? 'Verified' : i % 3 === 1 ? 'Pending' : 'New'}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    case 'fees':
      return (
        <div className="p-4 h-full bg-gray-50">
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs font-bold text-gray-800">Fee Collection</div>
            <div className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-medium">₹18.4L This Month</div>
          </div>
          <div className="space-y-3">
            {[{ label: 'Tuition Fee', pct: 92 }, { label: 'Transport Fee', pct: 78 }, { label: 'Lab & Library', pct: 64 }, { label: 'Activity Fee', pct: 85 }, { label: 'Hostel Fee', pct: 71 }].map((f) => (
              <div key={f.label}>
                <div className="flex justify-between mb-1">
                  <span className="text-[10px] font-medium text-body">{f.label}</span>
                  <span className="text-[9px] font-bold text-subtle">{f.pct}%</span>
                </div>
                <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-500" style={{ width: `${f.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    case 'attendance':
      return (
        <div className="p-4 h-full bg-gray-50">
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs font-bold text-gray-800">Attendance Overview</div>
            <div className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-medium">96.8% Today</div>
          </div>
          <div className="space-y-2">
            {[{ g: 'Grade 3-A', p: 38, t: 40 }, { g: 'Grade 5-B', p: 33, t: 36 }, { g: 'Grade 8-C', p: 29, t: 32 }, { g: 'Grade 10-A', p: 41, t: 42 }, { g: 'Grade 12-B', p: 35, t: 36 }].map((r) => (
              <div key={r.g} className="flex items-center justify-between p-2 bg-card rounded-md border border-border shadow-sm">
                <span className="text-[10px] font-medium text-gray-700">{r.g}</span>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-1.5 rounded-full bg-gray-200 overflow-hidden">
                    <div className="h-full rounded-full bg-emerald-500" style={{ width: `${(r.p / r.t) * 100}%` }} />
                  </div>
                  <span className="text-[9px] font-bold text-emerald-600">{r.p}/{r.t}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    case 'timetable':
      return (
        <div className="p-4 h-full bg-gray-50">
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs font-bold text-gray-800">Smart Timetable</div>
            <div className="text-[10px] px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 font-medium">AI Generated</div>
          </div>
          <div className="grid grid-cols-5 gap-1 mb-2">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map(d => (
              <div key={d} className="text-center text-[8px] font-bold text-gray-400 uppercase">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-5 gap-1">
            {['Math', 'Sci', 'Eng', 'Hindi', 'Art', 'Eng', 'Math', 'Sci', 'PE', 'Math', 'Sci', 'Hindi', 'Math', 'Eng', 'Sci', 'Art', 'PE', 'Hindi', 'Eng', 'Math'].map((subj, i) => (
              <div key={i} className="aspect-square rounded bg-purple-50 border border-purple-100 flex items-center justify-center">
                <span className="text-[8px] font-semibold text-purple-600">{subj}</span>
              </div>
            ))}
          </div>
        </div>
      );
    case 'parent':
      return (
        <div className="p-4 h-full bg-gray-50">
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs font-bold text-gray-800">Parent Communication</div>
            <div className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-medium">1,842 Active</div>
          </div>
          <div className="space-y-2">
            {[
              { from: 'teacher', text: 'Homework: Complete Ch.5 exercises by tomorrow.' },
              { from: 'parent', text: 'Noted, will ensure it\'s done.' },
              { from: 'teacher', text: 'Aarav scored 92% in Science! Great work 🎉' },
              { from: 'parent', text: 'Thank you so much!' },
              { from: 'teacher', text: 'PTM this Saturday at 10 AM. Please confirm.' },
            ].map((m, i) => (
              <div key={i} className={`max-w-[75%] px-2.5 py-1.5 rounded-lg text-[9px] leading-snug ${
                m.from === 'teacher'
                  ? 'bg-blue-500 text-white rounded-tl-sm'
                  : 'bg-card border border-border text-gray-700 rounded-tr-sm ml-auto'
              }`}>
                {m.text}
              </div>
            ))}
          </div>
        </div>
      );
    case 'reports':
      return (
        <div className="p-4 h-full bg-gray-50">
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs font-bold text-gray-800">Analytics Dashboard</div>
            <div className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-medium">Real-Time</div>
          </div>
          <div className="flex items-end gap-1.5 h-24 mb-2">
            {[62, 78, 54, 88, 71, 95, 67, 82, 73, 90].map((v, i) => (
              <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-blue-500 to-blue-300" style={{ height: `${v}%` }} />
            ))}
          </div>
          <div className="grid grid-cols-3 gap-2 mt-3">
            {[{ label: 'Collection', val: '₹18.4L' }, { label: 'Students', val: '2,450' }, { label: 'Attendance', val: '96.8%' }].map(s => (
              <div key={s.label} className="bg-card rounded-md border border-border p-2 text-center shadow-sm">
                <div className="text-[10px] font-bold text-gray-800">{s.val}</div>
                <div className="text-[8px] text-gray-400">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      );
    default:
      return <div className="h-full bg-gray-100" />;
  }
}
