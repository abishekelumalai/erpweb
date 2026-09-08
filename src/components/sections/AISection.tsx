'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, TrendingUp, Bot, Sparkles } from 'lucide-react';
import { useSiteContent, getContentValue } from './SiteContentProvider';

const AI_FEATURES = [
  { icon: CalendarDays, title: 'AI-Powered Timetable', description: 'Create efficient, conflict-free schedules while simplifying teacher and class allocation.', gradient: 'from-[#026dde] to-[#00d4ff]', shadow: 'shadow-[#026dde]/20' },
  { icon: TrendingUp, title: 'Performance Insights', description: 'Turn school data into meaningful insights across academics and operations.', gradient: 'from-[#0891b2] to-[#22d3ee]', shadow: 'shadow-[#0891b2]/20' },
  { icon: Bot, title: 'AI Secretary', description: 'Get an intelligent assistant designed specifically to support school management.', gradient: 'from-[#8b5cf6] to-[#a78bfa]', shadow: 'shadow-[#8b5cf6]/20' },
];

export default function AISection() {
  const { content } = useSiteContent();

  const headline = getContentValue(content, 'ai_headline', 'Bring AI Into Everyday School Management');
  const description = getContentValue(
    content,
    'ai_description',
    'ChaloSchools combines school management with intelligent tools that help your team work faster and make more informed decisions.',
  );

  return (
    <section className="py-12 lg:py-16 bg-surface-2 aurora-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-3xl mx-auto mb-12">
          <Badge className="mb-4 bg-[#8b5cf6]/10 text-[#8b5cf6] border-[#8b5cf6]/20 rounded-full">
            <Sparkles className="w-3.5 h-3.5 mr-1.5" />
            AI-Powered
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-heading mb-4">{headline}</h2>
          <p className="text-lg text-body">{description}</p>
        </motion.div>
        <div className="grid sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {AI_FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="card-shine group bg-card rounded-xl border border-border p-6 hover:border-[#8b5cf6]/30 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 text-center relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-transparent group-hover:from-[#8b5cf6]/3 group-hover:to-[#026dde]/3 transition-all duration-300 rounded-xl" />
              <div className="relative">
                <div className="relative inline-block mb-4">
                  <div className={`w-14 h-14 mx-auto rounded-xl bg-gradient-to-br ${f.gradient} flex items-center justify-center shadow-lg ${f.shadow} text-white group-hover:scale-110 transition-transform duration-300`}>
                    <f.icon className="w-6 h-6" />
                  </div>
                  <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${f.gradient} opacity-0 group-hover:opacity-20 scale-125 blur-md transition-all duration-300`} />
                </div>
                <h3 className="font-bold text-heading mb-2">{f.title}</h3>
                <p className="text-sm text-subtle leading-relaxed">{f.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
