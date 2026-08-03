'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Database, Clock, MessageSquare, BarChart3, Users, ShieldAlert } from 'lucide-react';
import { useSiteContent, getContentValue } from './SiteContentProvider';

const PROBLEM_ICON_DATA = [
  { icon: Database, className: 'w-6 h-6' },
  { icon: Clock, className: 'w-6 h-6' },
  { icon: MessageSquare, className: 'w-6 h-6' },
  { icon: BarChart3, className: 'w-6 h-6' },
  { icon: Users, className: 'w-6 h-6' },
  { icon: ShieldAlert, className: 'w-6 h-6' },
];

const PROBLEM_GRADIENTS = [
  'from-[#f59e0b] to-[#fbbf24]',
  'from-[#026dde] to-[#00d4ff]',
  'from-[#e11d48] to-[#f87171]',
  'from-[#10b981] to-[#34d399]',
  'from-[#8b5cf6] to-[#a78bfa]',
  'from-[#0891b2] to-[#22d3ee]',
];

const PROBLEM_SHADOWS = [
  'shadow-[#f59e0b]/20',
  'shadow-[#026dde]/20',
  'shadow-[#e11d48]/20',
  'shadow-[#10b981]/20',
  'shadow-[#8b5cf6]/20',
  'shadow-[#0891b2]/20',
];

const FALLBACK_PROBLEMS = [
  { title: 'Fee Defaulters Tracked Manually', description: 'Fee defaulters are chased manually, every single month — with reminders slipping through the cracks and collections falling behind.' },
  { title: 'Attendance & Marks Scattered', description: 'Attendance and marks live across paper registers and Excel sheets, making accurate records slow to compile and easy to lose.' },
  { title: 'Parents Chasing Teachers on WhatsApp', description: 'Parents chase teachers across dozens of WhatsApp groups for updates, and important announcements fail to reach them on time.' },
  { title: 'No Single View for Management', description: 'There is no single view of admissions, finance, and academics — leaving management without the real-time picture they need to decide.' },
  { title: 'Parent Frustration', description: 'Parents struggle with fragmented communication and the lack of real-time updates on their child\'s attendance, academics, fees, and school activities.' },
  { title: 'Data Security Risks', description: 'Protect sensitive student and school data with ChaloSchools\' ISO 27001 Certified platform, ensuring secure, centralized, and compliant data management.' },
];

export default function ProblemsSection() {
  const { content } = useSiteContent();

  const badge = getContentValue(content, 'problems_badge', 'The Challenges');
  const headline = getContentValue(content, 'problems_headline', "Running a School Shouldn't Mean Running After Paperwork");
  const subtitle = getContentValue(content, 'problems_subtitle', 'If any of these sound familiar, it\'s time for an upgrade.');

  const problems = FALLBACK_PROBLEMS.map((p, i) => {
    const IconComp = PROBLEM_ICON_DATA[i].icon;
    return {
      icon: <IconComp className={PROBLEM_ICON_DATA[i].className} />,
      title: getContentValue(content, `problem_${i + 1}_title`, p.title),
      description: getContentValue(content, `problem_${i + 1}_desc`, p.description),
      gradient: PROBLEM_GRADIENTS[i],
      shadow: PROBLEM_SHADOWS[i],
    };
  });

  return (
    <section className="py-12 lg:py-16 bg-surface-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-3xl mx-auto mb-14">
          <Badge className="mb-4 bg-[#026dde]/10 text-primary border-[#026dde]/20 rounded-full">{badge}</Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-heading mb-4">{headline}</h2>
          <p className="text-lg text-body">{subtitle}</p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((p, i) => (
            <motion.div key={p.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              className="bg-card rounded-xl border border-border p-6 hover:shadow-xl hover:shadow-[#026dde]/5 hover:border-[#026dde]/20 hover:-translate-y-1.5 transition-all duration-300 group relative overflow-hidden">
              {/* Subtle gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#026dde]/0 to-transparent group-hover:from-[#026dde]/3 transition-all duration-300 rounded-xl" />
              <div className="relative">
                <div className="relative inline-block mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${p.gradient} flex items-center justify-center shadow-lg ${p.shadow} text-white group-hover:scale-110 transition-transform duration-300`}>{p.icon}</div>
                  <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${p.gradient} opacity-0 group-hover:opacity-20 scale-125 blur-md transition-all duration-300`} />
                </div>
                <h3 className="text-lg font-bold text-heading mb-2">{p.title}</h3>
                <p className="text-sm text-subtle leading-relaxed">{p.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}