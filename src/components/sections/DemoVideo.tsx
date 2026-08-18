'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PlayCircle, ArrowRight } from 'lucide-react';

interface WalkthroughVideo {
  id: string;
  title: string;
  src: string;
  poster: string;
}

// Real product walkthrough videos, self-hosted in /public/videos rather than
// hotlinked from chaloschools.com — this build is on track to eventually
// replace that domain, so linking to its assets directly would risk breaking
// this section at the moment of cutover.
const VIDEOS: WalkthroughVideo[] = [
  { id: 'ai-rephrasing', title: 'AI Rephrasing in Chalo School ERP', src: '/videos/ai-rephrasing.mp4', poster: '/images/videos/ai-rephrasing.jpg' },
  { id: 'performance-insights', title: 'Inspace Performance Insights Platform for K12 Schools', src: '/videos/performance-insights.mp4', poster: '/images/videos/performance-insights.jpg' },
  { id: 'data-privacy-security', title: 'Enhancing Trust through Data Privacy and Security', src: '/videos/data-privacy-security.mp4', poster: '/images/videos/data-privacy-security.webp' },
  { id: 'ai-timetable-generation', title: 'AI Powered Timetable Generation', src: '/videos/ai-timetable-generation.mp4', poster: '/images/videos/ai-timetable-generation.webp' },
  { id: 'new-parent-portal', title: 'New Parent Portal', src: '/videos/new-parent-portal.mp4', poster: '/images/videos/new-parent-portal.webp' },
];

export default function DemoVideo() {
  const [activeId, setActiveId] = useState(VIDEOS[0].id);
  const active = VIDEOS.find((v) => v.id === activeId) ?? VIDEOS[0];

  return (
    <section className="py-12 md:py-16 bg-surface-2">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-10"
        >
          <Badge className="mb-4 bg-[#026dde]/10 text-primary border-[#026dde]/20 rounded-full">Our Walkthrough</Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-heading mb-3">See ChaloSchools in Action</h2>
          <p className="text-lg text-body">
            Real product walkthroughs — AI features, timetable generation, data security, and the parent experience.
          </p>
        </motion.div>

        <motion.div
          key={active.id}
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-2xl overflow-hidden border border-border shadow-xl bg-card aspect-video mb-6"
        >
          <video
            key={active.id}
            controls
            poster={active.poster}
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={active.src} type="video/mp4" />
          </video>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-10">
          {VIDEOS.map((v) => {
            const isActive = v.id === activeId;
            return (
              <button
                key={v.id}
                type="button"
                onClick={() => setActiveId(v.id)}
                aria-pressed={isActive}
                className={`group relative rounded-xl overflow-hidden border-2 aspect-video transition-all ${
                  isActive ? 'border-primary' : 'border-border hover:border-primary/50'
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={v.poster} alt={v.title} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                <div className={`absolute inset-0 flex items-center justify-center transition-colors ${isActive ? 'bg-black/20' : 'bg-black/35 group-hover:bg-black/25'}`}>
                  <PlayCircle className="w-7 h-7 sm:w-8 sm:h-8 text-white drop-shadow" />
                </div>
                <p className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 to-transparent text-white text-[10px] sm:text-[11px] font-medium p-2 text-left leading-tight">
                  {v.title}
                </p>
              </button>
            );
          })}
        </div>

        <div className="text-center">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full font-semibold px-8">
            <Link href="/contact#contact-form">
              Book a Live Demo for Your School <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
