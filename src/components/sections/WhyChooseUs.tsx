'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { LayoutDashboard, Building2, Layers } from 'lucide-react';
import { useSiteContent, getContentValue } from './SiteContentProvider';

const ICONS = [LayoutDashboard, Building2, Layers];
const COLORS = [
  'from-[#026dde] to-[#024fb3]',
  'from-[#f59e0b] to-[#d97706]',
  'from-[#026dde] to-[#024fb3]',
];

const FALLBACK_BENEFITS = [
  { title: 'One Platform', description: 'ERP + AI + Managed IT + Cybersecurity + Compliance + 24/7 Support — everything under one roof.' },
  { title: 'Fortune-Grade IT', description: 'Backed by Inspace Technologies, now built specifically for K-12 schools.' },
  { title: 'Zero Gaps', description: 'The only school tech partner that owns every layer of your digital stack.' },
];

export default function WhyChooseUs() {
  const { content } = useSiteContent();

  const badge = getContentValue(content, 'why_choose_badge', 'Why Chalo Is Different');
  const headline = getContentValue(content, 'why_choose_headline', 'Where Technology & Knowledge Converge');
  const subtitle = getContentValue(content, 'why_choose_subtitle', 'Elevating school automation — end to end.');

  const benefits = FALLBACK_BENEFITS.map((b, i) => ({
    title: getContentValue(content, `why_choose_${i + 1}_title`, b.title),
    description: getContentValue(content, `why_choose_${i + 1}_desc`, b.description),
  }));

  return (
    <section className="py-12 lg:py-16 bg-surface-2 aurora-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-3xl mx-auto mb-14">
          <Badge className="mb-4 bg-[#026dde]/10 text-primary border-[#026dde]/20 rounded-full">{badge}</Badge>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4"><span className="wow-heading wow-underline">{headline}</span></h2>
          <p className="text-lg text-body">{subtitle}</p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {benefits.map((b, i) => {
            const Icon = ICONS[i];
            return (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="wow-card card-shine bg-card rounded-xl border border-border p-6 hover:border-[#026dde]/30 text-center relative overflow-hidden group"
              >
                {/* Subtle gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-transparent group-hover:from-[#026dde]/3 group-hover:to-[#f59e0b]/3 transition-all duration-300 rounded-xl" />
                <div className="relative">
                  <div className={`w-14 h-14 mx-auto rounded-xl bg-gradient-to-br ${COLORS[i]} flex items-center justify-center text-white mb-4 shadow-sm group-hover:scale-110 group-hover:shadow-lg transition-all duration-300`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-heading mb-2">{b.title}</h3>
                  <p className="text-sm text-subtle leading-relaxed">{b.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
