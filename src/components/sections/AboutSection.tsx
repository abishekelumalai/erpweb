'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useSiteContent, getContentValue } from './SiteContentProvider';

export default function AboutSection() {
  const { content } = useSiteContent();

  const badge = getContentValue(content, 'about_badge', 'School Management Software');
  const headline = getContentValue(content, 'about_headline', 'What Is a School Management Software?');
  const eyebrow = getContentValue(content, 'about_eyebrow', 'Simplify Every Part of School Management');
  const paragraph1 = getContentValue(
    content,
    'about_paragraph_1',
    'Managing a school involves hundreds of daily activities — from admissions and attendance to fees, examinations, staff management and parent communication.',
  );
  const paragraph2 = getContentValue(
    content,
    'about_paragraph_2',
    'ChaloSchools school management software brings these processes together in one connected system, helping schools reduce paperwork, minimize repetitive tasks and access accurate information when they need it.',
  );
  const paragraph3 = getContentValue(
    content,
    'about_paragraph_3',
    'With centralized student and school data, automated workflows and real-time insights, your team can spend less time managing administration and more time focusing on education.',
  );

  return (
    <section className="py-12 lg:py-16 bg-card">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Badge className="mb-4 bg-[#026dde]/10 text-primary border-[#026dde]/20 rounded-full">{badge}</Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-heading mb-2">{headline}</h2>
          <p className="text-xs font-semibold text-subtle uppercase tracking-wider mb-6">{eyebrow}</p>
          <div className="space-y-4 text-left sm:text-center">
            <p className="text-lg text-body leading-relaxed">{paragraph1}</p>
            <p className="text-lg text-body leading-relaxed">{paragraph2}</p>
            <p className="text-lg text-body leading-relaxed">{paragraph3}</p>
          </div>
          <Button asChild size="lg" className="mt-8 rounded-full font-semibold bg-primary hover:bg-primary/90 group">
            <Link href="/product">
              Discover ChaloSchools
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
