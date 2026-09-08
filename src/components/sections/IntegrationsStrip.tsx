'use client';

import { motion } from 'framer-motion';
import { Fingerprint, Navigation, Calculator, CreditCard, MessageCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useSiteContent, getContentValue } from './SiteContentProvider';

const INTEGRATIONS = [
  { icon: Fingerprint, label: 'Biometric Attendance', description: 'Connect attendance systems for streamlined tracking.', gradient: 'from-[#026dde] to-[#00d4ff]', shadow: 'shadow-[#026dde]/20' },
  { icon: Navigation, label: 'GPS Fleet Tracking', description: 'Monitor school transportation and fleet operations.', gradient: 'from-[#f59e0b] to-[#fbbf24]', shadow: 'shadow-[#f59e0b]/20' },
  { icon: Calculator, label: 'Tally ERP', description: 'Connect financial workflows with your existing accounting processes.', gradient: 'from-[#10b981] to-[#34d399]', shadow: 'shadow-[#10b981]/20' },
  { icon: CreditCard, label: 'Online Payment Gateways', description: 'Make fee payments easier and more convenient.', gradient: 'from-[#8b5cf6] to-[#a78bfa]', shadow: 'shadow-[#8b5cf6]/20' },
  { icon: MessageCircle, label: 'WhatsApp', description: 'Keep parents and school communities informed through familiar communication channels.', gradient: 'from-[#0891b2] to-[#22d3ee]', shadow: 'shadow-[#0891b2]/20' },
];

export default function IntegrationsStrip() {
  const { content } = useSiteContent();

  const badge = getContentValue(content, 'integrations_badge', 'Integrations');
  const headline = getContentValue(content, 'integrations_headline', 'Let Us Connect With the Technology Your School Already Uses');
  const description = getContentValue(content, 'integrations_description', 'ChaloSchools works with essential school technologies to help your teams keep data and workflows connected.');

  return (
    <section className="py-12 lg:py-16 bg-surface-2 border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-3xl mx-auto mb-10">
          <Badge className="mb-4 bg-[#026dde]/10 text-primary border-[#026dde]/20 rounded-full">{badge}</Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-heading mb-4">{headline}</h2>
          <p className="text-lg text-body">{description}</p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {INTEGRATIONS.map((it, i) => (
            <motion.div
              key={it.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="card-shine group bg-card rounded-xl border border-border p-5 hover:border-[#026dde]/30 hover:shadow-md transition-all text-center"
            >
              <div className="relative inline-block mb-3">
                <div className={`w-12 h-12 mx-auto rounded-xl bg-gradient-to-br ${it.gradient} flex items-center justify-center shadow-lg ${it.shadow} text-white group-hover:scale-110 transition-transform duration-300`}>
                  <it.icon className="w-6 h-6" />
                </div>
                <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${it.gradient} opacity-0 group-hover:opacity-20 scale-125 blur-md transition-all duration-300`} />
              </div>
              <h3 className="font-bold text-sm text-heading mb-1.5">{it.label}</h3>
              <p className="text-xs text-subtle leading-relaxed">{it.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
