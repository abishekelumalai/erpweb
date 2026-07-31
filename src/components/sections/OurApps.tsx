'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Smartphone, GraduationCap, ShieldCheck, Apple, PlayCircle } from 'lucide-react';

// Tracks the cursor position over a card as CSS custom properties, driving
// the .spotlight radial-glow effect defined in globals.css.
function handleSpotlightMove(e: React.MouseEvent<HTMLElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${((e.clientX - rect.left) / rect.width) * 100}%`);
  e.currentTarget.style.setProperty('--my', `${((e.clientY - rect.top) / rect.height) * 100}%`);
}

const APPS = [
  {
    icon: GraduationCap,
    role: 'Parent App',
    name: 'Chaloschools',
    desc: 'Attendance, fees, results & communication — all in your pocket.',
    color: 'from-[#026dde] to-[#024fb3]',
  },
  {
    icon: Smartphone,
    role: 'Teachers App',
    name: 'AnsApp',
    desc: 'Mark attendance, enter grades, and message parents on the go.',
    color: 'from-[#f59e0b] to-[#d97706]',
  },
  {
    icon: ShieldCheck,
    role: 'Management App',
    name: 'C-365',
    desc: 'Real-time dashboards and approvals for school leadership, anywhere.',
    color: 'from-[#10b981] to-[#059669]',
  },
];

export default function OurApps() {
  return (
    <section className="py-12 lg:py-16 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-3xl mx-auto mb-10">
          <Badge className="mb-4 bg-[#026dde]/10 text-primary border-[#026dde]/20 rounded-full">Our Apps</Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-heading mb-4">A Dedicated App for Every Role</h2>
          <p className="text-lg text-body">One platform, three purpose-built apps — for parents, teachers, and school management.</p>
        </motion.div>
        <div className="grid sm:grid-cols-3 gap-6">
          {APPS.map((app, i) => (
            <motion.div
              key={app.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              onMouseMove={handleSpotlightMove}
              className="spotlight bg-surface-2 rounded-2xl border border-border p-6 hover:shadow-lg hover:border-blue-100 transition-all"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${app.color} flex items-center justify-center text-white mb-4 shadow-sm`}>
                <app.icon className="w-6 h-6" />
              </div>
              <p className="text-xs font-semibold text-subtle uppercase tracking-wider mb-1">{app.role}</p>
              <h3 className="text-lg font-bold text-heading mb-2">{app.name}</h3>
              <p className="text-sm text-subtle leading-relaxed mb-4">{app.desc}</p>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#212121] text-white text-xs font-medium">
                  <Apple className="w-3.5 h-3.5" />
                  App Store
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#212121] text-white text-xs font-medium">
                  <PlayCircle className="w-3.5 h-3.5" />
                  Google Play
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
