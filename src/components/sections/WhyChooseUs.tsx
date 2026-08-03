'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import {
  LayoutDashboard, Building2, Layers,
  Server, ShieldCheck, Network, ClipboardCheck, Lightbulb, Headset,
} from 'lucide-react';
import { useSiteContent, getContentValue } from './SiteContentProvider';

const ICONS = [LayoutDashboard, Building2, Layers];
const COLORS = [
  'from-[#026dde] to-[#024fb3]',
  'from-[#f59e0b] to-[#d97706]',
  'from-[#026dde] to-[#024fb3]',
];

// From the Inspace Technologies "Beyond Software — Managed Services &
// Infrastructure" brochure page — real service lines, condensed.
const MANAGED_SERVICES = [
  {
    icon: Server,
    title: 'Managed IT Infrastructure',
    description: 'Design, deploy & manage servers, storage, smart classrooms, CCTV & compute — school-grade reliability with zero in-house IT overhead and a dedicated virtual IT manager.',
  },
  {
    icon: ShieldCheck,
    title: 'Cybersecurity Audit',
    description: 'Penetration testing, vulnerability scans & risk remediation. Your student data stays yours.',
  },
  {
    icon: Network,
    title: 'Network Design & Deployment',
    description: 'Campus-wide wired & wireless networks, built for 200 to 20,000+ seat schools without compromise.',
  },
  {
    icon: ClipboardCheck,
    title: 'Compliance Audit & Advisory',
    description: 'DPDP Act, GoI IT Act 2000, ISO 27001 — audit-ready always, not just before inspections.',
  },
  {
    icon: Lightbulb,
    title: 'IT Strategy Consulting',
    description: 'Vendor-neutral roadmap and digital transformation guidance. Strategy first, tools second.',
  },
  {
    icon: Headset,
    title: '24/7 Helpdesk & AMC',
    description: 'SLA-backed support with a named account manager — on-site and remote, so school never stops for an IT issue.',
  },
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

        {/* Beyond Software — Managed Services & Infrastructure (Inspace Technologies) */}
        <div className="mt-16 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <Badge className="mb-4 bg-[#f59e0b]/10 text-[#d97706] border-[#f59e0b]/20 rounded-full">Beyond Software</Badge>
            <h3 className="text-2xl lg:text-3xl font-bold text-heading mb-2">Managed Services &amp; Infrastructure</h3>
            <p className="text-body">
              Powered by Inspace Technologies — India&apos;s only full-stack school technology company. From school ERP to data centre, we own it all.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {MANAGED_SERVICES.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="card-shine bg-card rounded-xl border border-border p-5 hover:border-[#f59e0b]/30 hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-[#f59e0b]/10 flex items-center justify-center mb-3">
                  <s.icon className="w-5 h-5 text-[#d97706]" />
                </div>
                <h4 className="font-bold text-sm text-heading mb-1.5">{s.title}</h4>
                <p className="text-xs text-subtle leading-relaxed">{s.description}</p>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-xs text-subtle mt-6">
            One partner · Zero gaps · Full accountability — ERP, AI Analytics, Managed IT, Cybersecurity, Networking, Compliance, Consulting &amp; 24/7 Support.
          </p>
        </div>
      </div>
    </section>
  );
}
