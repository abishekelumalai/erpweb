'use client';

import { motion } from 'framer-motion';
import { Fingerprint, Navigation, Calculator, CreditCard, MessageCircle } from 'lucide-react';

const INTEGRATIONS = [
  { icon: Fingerprint, label: 'Biometric Attendance' },
  { icon: Navigation, label: 'GPS Fleet Tracking' },
  { icon: Calculator, label: 'Tally ERP' },
  { icon: CreditCard, label: 'Online Payment Gateway' },
  { icon: MessageCircle, label: 'WhatsApp' },
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
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-card border border-border shadow-sm hover:border-[#026dde]/30 hover:shadow-md transition-all"
            >
              <it.icon className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-heading">{it.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
