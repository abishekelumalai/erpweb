'use client';

import { Button } from '@/components/ui/button';

import { Badge } from '@/components/ui/badge';

import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

import { motion, useReducedMotion } from 'framer-motion';

import Link from 'next/link';

import { useTranslations } from 'next-intl';

import { useEffect, useRef, useState } from 'react';

import HeroSlideshow from './HeroSlideshow';

// --- Word-by-word reveal: blur 10px -> 0, staggered ---

function WordReveal({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {

  const reduce = useReducedMotion();

  const words = text.split(' ');

  if (reduce) return <span className={className}>{text}</span>;

  return (

    <span className={className}>

      {words.map((w, i) => (

        <motion.span

          key={`${w}-${i}`}

          className="inline-block"

          initial={{ opacity: 0, filter: 'blur(16px)', y: 14 }}

          animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}

          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: delay + i * 0.13 }}

        >

          {w}

          {i < words.length - 1 ? '\u00A0' : ''}

        </motion.span>

      ))}

    </span>

  );

}

// --- Typing/deleting loop over a set of phrases ---

function TypingLoop({ phrases, className }: { phrases: string[]; className?: string }) {

  const reduce = useReducedMotion();

  const [idx, setIdx] = useState(0);

  const [sub, setSub] = useState(0);

  const [deleting, setDeleting] = useState(false);

  useEffect(() => {

    if (reduce) return;

    const current = phrases[idx % phrases.length];

    if (!deleting && sub === current.length) {

      const t = setTimeout(() => setDeleting(true), 1600);

      return () => clearTimeout(t);

    }

    if (deleting && sub === 0) {

      setDeleting(false);

      setIdx((i) => (i + 1) % phrases.length);

      return;

    }

    const t = setTimeout(() => setSub((s) => s + (deleting ? -1 : 1)), deleting ? 45 : 80);

    return () => clearTimeout(t);

  }, [sub, deleting, idx, phrases, reduce]);

  if (reduce) return <span className={className}>{phrases[0]}</span>;

  return (

    <span className={`${className ?? ''} animate-cursor`}>

      {phrases[idx % phrases.length].substring(0, sub)}

    </span>

  );

}

export default function HeroSection() {

  // Reference i18n pattern: pull copy from messages/{locale}.json under "Hero".

  const t = useTranslations('Hero');

  const reduce = useReducedMotion();

  const heroRef = useRef<HTMLElement>(null);

  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, active: false });

  // Mouse parallax for floating orbs (depth factors applied per-orb below).

  function handleMouseMove(e: React.MouseEvent) {

    if (reduce || !heroRef.current) return;

    const r = heroRef.current.getBoundingClientRect();

    const x = (e.clientX - r.left) / r.width - 0.5;

    const y = (e.clientY - r.top) / r.height - 0.5;

    setParallax({ x, y });

    setSpotlight({ x: e.clientX - r.left, y: e.clientY - r.top, active: true });

  }

  return (

    <section

      ref={heroRef}

      onMouseMove={handleMouseMove}

      onMouseLeave={() => { setParallax({ x: 0, y: 0 }); setSpotlight((s) => ({ ...s, active: false })); }}

      className="relative flex items-center overflow-hidden bg-brand-gradient pt-16 pb-0"

    >

      {/* Base image + brand gradient */}

      <div className="absolute inset-0 bg-[url('/images/hero-bg.png')] bg-cover bg-center opacity-15" />

      <div className="absolute inset-0 bg-brand-gradient" />

      {/* Animated gradient mesh background — above the brand overlay so it reads clearly */}

      <div

        className="absolute inset-0 animate-mesh opacity-[0.72] mix-blend-screen pointer-events-none"

        style={{

          backgroundImage:

            'radial-gradient(62% 62% at 20% 30%, #00d4ffaa, transparent 62%),' +

            'radial-gradient(58% 58% at 80% 25%, #026ddebb, transparent 62%),' +

            'radial-gradient(62% 62% at 65% 80%, #38bdf899, transparent 62%),' +

            'radial-gradient(52% 52% at 30% 75%, #7c3aed88, transparent 62%)',

        }}

      />

      {/* Floating orbs with mouse parallax (depth factors: 40 / -30 / 20) */}

      <motion.div

        animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.1, 1] }}

        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}

        style={{ transform: `translate(${parallax.x * 40}px, ${parallax.y * 40}px)` }}

        className="absolute top-10 right-1/4 w-[500px] h-[500px] bg-[#026dde]/15 rounded-full blur-[100px]"

      />

      <motion.div

        animate={{ x: [0, -20, 0], y: [0, 30, 0], scale: [1, 1.2, 1] }}

        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}

        style={{ transform: `translate(${parallax.x * -30}px, ${parallax.y * -30}px)` }}

        className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-[#7c3aed]/8 rounded-full blur-[100px]"

      />

      <motion.div

        animate={{ x: [0, 15, 0], y: [0, -15, 0] }}

        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}

        style={{ transform: `translate(${parallax.x * 20}px, ${parallax.y * 20}px)` }}

        className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-[#00d4ff]/5 rounded-full blur-[80px]"

      />

      {/* Cursor-reactive color glow — a soft brand-color wash that follows the pointer, motion.dev-style */}
      {!reduce && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500 mix-blend-screen"
          style={{
            opacity: spotlight.active ? 1 : 0,
            background: `radial-gradient(560px circle at ${spotlight.x}px ${spotlight.y}px, rgba(0,212,255,0.35), rgba(2,109,222,0.18) 45%, transparent 70%)`,
          }}
        />
      )}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 w-full">

        <div className="grid lg:grid-cols-[1fr_480px] gap-8 lg:gap-12 items-center">

          {/* Left content */}

          <motion.div

            initial={{ opacity: 0, y: 30 }}

            animate={{ opacity: 1, y: 0 }}

            transition={{ duration: 0.8 }}

            className="space-y-6"

          >

            <div className="space-y-5">

              <motion.div

                initial={{ opacity: 0, scale: 0.9 }}

                animate={{ opacity: 1, scale: 1 }}

                transition={{ duration: 0.5, delay: 0.2 }}

              >

                <Badge className="px-4 py-2 text-sm font-medium bg-card/5 text-white border-white/10 hover:bg-card/10 rounded-full backdrop-blur-md shadow-lg shadow-black/10">

                  <span className="w-2 h-2 rounded-full bg-[#10b981] mr-2 animate-pulse" />

                  {t('badge')}

                </Badge>

              </motion.div>

              {/* Word-by-word blur reveal headline */}

              <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.75rem] font-extrabold leading-[1.05] tracking-tight text-white">

                <WordReveal text={t('titleLine1Pre')} delay={0.2} />{' '}

                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#026dde]">{t('titleHighlight')}</span><br />

                <WordReveal text={t('titleLine2')} delay={0.45} /><br />

                <WordReveal text={t('titleLine3')} delay={0.6} />

              </h1>

              {/* Animated gradient line: scaleX 0->1 + light sweep */}

              <motion.div

                initial={{ scaleX: 0 }}

                animate={{ scaleX: 1 }}

                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.7 }}

                style={{ transformOrigin: 'left' }}

                className="relative h-0.5 w-32 rounded-full bg-gradient-to-r from-[#00d4ff] to-[#026dde] overflow-hidden"

              >

                <span className="absolute inset-0 animate-[shine-sweep_2.5s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/70 to-transparent" />

              </motion.div>

              <p className="text-lg lg:text-xl text-white/60 max-w-md leading-relaxed">

                {t('subtitle')}

              </p>

              {/* Typing loop of key value props */}

              <p className="text-base text-[#00d4ff] font-medium min-h-[1.5em]">

                <TypingLoop phrases={['Admissions & Fees', 'Attendance & Exams', 'Parent Communication', 'Reports & Analytics']} />

              </p>

            </div>

            <div className="flex flex-col sm:flex-row gap-3">

              {/* Primary CTA with pulsing rings behind it */}

              <div className="relative inline-flex">

                {!reduce && (

                  <>

                    <span className="absolute inset-0 rounded-full bg-primary/40 animate-ping pointer-events-none" aria-hidden="true" />

                    <span className="absolute -inset-1.5 rounded-full border-2 border-primary/40 pulse-dot pointer-events-none" aria-hidden="true" />

                  </>

                )}

                <Button

                  asChild

                  size="lg"

                  className="relative text-base px-8 h-13 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full font-semibold shadow-lg shadow-primary/25 group transition-all hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"

                >

                  <Link href="/contact#contact-form">

                    <Sparkles className="w-4 h-4 mr-2" />

                    {t('ctaPrimary')}

                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />

                  </Link>

                </Button>

              </div>
            </div>

            {/* Trust indicators */}

            <div className="flex flex-wrap items-center gap-5">

              <div className="flex items-center gap-2">

                <CheckCircle2 className="w-4 h-4 text-[#10b981]" />

                <span className="text-sm text-white/50">{t('trustNoCard')}</span>

              </div>

              <div className="flex items-center gap-2">

                <CheckCircle2 className="w-4 h-4 text-[#10b981]" />

                <span className="text-sm text-white/50">{t('trustFreeSetup')}</span>

              </div>

            </div>

          </motion.div>

          {/* Right - ERP Slideshow with glow effect + parallax */}

          <motion.div

            initial={{ opacity: 0, y: 40, scale: 0.95 }}

            animate={{ opacity: 1, y: 0, scale: 1 }}

            transition={{ duration: 0.8, delay: 0.3 }}

            style={{ transform: `translate(${parallax.x * -12}px, ${parallax.y * -12}px)` }}

            className="relative w-full max-w-[460px] mx-auto lg:ml-0 lg:mr-4"

          >

            {/* Glow behind slideshow */}

            <div className="absolute -inset-4 bg-gradient-to-br from-[#026dde]/20 via-[#00d4ff]/10 to-[#7c3aed]/10 rounded-3xl blur-2xl" />

            <div className="relative">

              <HeroSlideshow />

            </div>

          </motion.div>

        </div>

      </div>

      {/* Bottom edge line */}

      <div className="absolute bottom-0 left-0 right-0 h-px bg-card/10" />

    </section>

  );

}

