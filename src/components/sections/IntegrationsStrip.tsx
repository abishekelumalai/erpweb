'use client';

import { motion } from 'framer-motion';
import { Fingerprint, Navigation, Calculator, CreditCard, MessageCircle } from 'lucide-react';

const INTEGRATIONS = [
  { icon: Fingerprint, label: 'Biometric Attendance', gradient: 'from-[#026dde] to-[#00d4ff]', shadow: 'shadow-[#026dde]/30' },
  { icon: Navigation, label: 'GPS Fleet Tracking', gradient: 'from-[#f59e0b] to-[#fbbf24]', shadow: 'shadow-[#f59e0b]/30' },
  { icon: Calculator, label: 'Tally ERP', gradient: 'from-[#10b981] to-[#34d399]', shadow: 'shadow-[#10b981]/30' },
  { icon: CreditCard, label: 'Online Payment Gateway', gradient: 'from-[#8b5cf6] to-[#a78bfa]', shadow: 'shadow-[#8b5cf6]/30' },
  { icon: MessageCircle, label: 'WhatsApp', gradient: 'from-[#0891b2] to-[#22d3ee]', shadow: 'shadow-[#0891b2]/30' },
];

export default function IntegrationsStrip() {
  return (
    <section className="py-10 bg-surface-2 border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold text-subtle uppercase tracking-wider mb-6">Seamless Integrations</p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {INTEGRATIONS.map((it, i) => (
            <motion.div
              key={it.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="flex items-center gap-2.5 pl-2 pr-4 py-2 rounded-full bg-card border border-border shadow-sm hover:shadow-md transition-all"
            >
              <span className={`w-6 h-6 rounded-full bg-gradient-to-br ${it.gradient} flex items-center justify-center shrink-0 shadow-sm ${it.shadow}`}>
                <it.icon className="w-3.5 h-3.5 text-white" />
              </span>
              <span className="text-sm font-medium text-heading">{it.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
