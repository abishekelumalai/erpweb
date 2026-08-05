'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PlayCircle, ArrowRight } from 'lucide-react';

// Set NEXT_PUBLIC_DEMO_VIDEO_URL to a YouTube/Vimeo *embed* URL
// (e.g. https://www.youtube.com/embed/XXXX) to show the real video.
// Until then, a tasteful placeholder + "Book a Live Demo" CTA is shown —
// we never embed a fabricated/placeholder video.
const VIDEO_URL = process.env.NEXT_PUBLIC_DEMO_VIDEO_URL;

export default function DemoVideo() {
  const reduce = useReducedMotion();
  return (
    <section className="py-12 md:py-16 bg-surface-2">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-10"
        >
          <Badge className="mb-4 bg-[#026dde]/10 text-primary border-[#026dde]/20 rounded-full">Product Tour</Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-heading mb-3">See ChaloSchools in Action</h2>
          <p className="text-lg text-body">
            A quick walkthrough of the platform — admissions, fees, attendance, and communication in one place.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-2xl overflow-hidden border border-border shadow-xl bg-card aspect-video"
        >
          {VIDEO_URL ? (
            <iframe
              src={VIDEO_URL}
              title="ChaloSchools product walkthrough"
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-[#026dde]/10 via-card to-[#f59e0b]/10 text-center px-6">
              <div className="relative flex items-center justify-center">
                {!reduce && (
                  <motion.span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full bg-primary/25"
                    animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                  />
                )}
                <PlayCircle className="relative w-16 h-16 text-primary" />
              </div>
              <p className="text-lg font-semibold text-heading">Product walkthrough coming soon</p>
              <p className="text-sm text-subtle max-w-md">
                Prefer a personalized tour? Book a live demo and we&apos;ll walk your team through
                exactly what ChaloSchools does for your school.
              </p>
              <Button asChild className="mt-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full font-semibold">
                <Link href="/contact#contact-form">
                  Book a Live Demo <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          )}
        </motion.div>

        {VIDEO_URL && (
          <div className="text-center mt-8">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full font-semibold px-8">
              <Link href="/contact#contact-form">
                Book a Live Demo for Your School <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
