'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import {
  LayoutDashboard, Database, MessageCircle, BarChart3, Cloud,
  Server, ShieldCheck, Network, ClipboardCheck, Lightbulb, Headset,
} from 'lucide-react';
import { useSiteContent, getContentValue } from './SiteContentProvider';

const ICONS = [LayoutDashboard, Database, MessageCircle, BarChart3, Cloud, Headset];
const COLORS = [
  'from-[#026dde] to-[#00d4ff]',
  'from-[#f59e0b] to-[#fbbf24]',
  'from-[#10b981] to-[#34d399]',
  'from-[#8b5cf6] to-[#a78bfa]',
  'from-[#0891b2] to-[#22d3ee]',
  'from-[#e11d48] to-[#f87171]',
];

// From the Inspace Technologies "Beyond Software — Managed Services &
// Infrastructure" brochure page — real service lines, condensed.
const MANAGED_SERVICES = [
  {
    icon: Server,
    title: 'Managed IT Infrastructure',
    description: 'Servers, storage, smart classrooms, CCTV and computing infrastructure with dedicated IT support.',
    gradient: 'from-[#026dde] to-[#00d4ff]',
    shadow: 'shadow-[#026dde]/20',
  },
  {
    icon: ShieldCheck,
    title: 'Cybersecurity Audit',
    description: 'Vulnerability assessments, penetration testing and risk remediation to protect sensitive school data.',
    gradient: 'from-[#e11d48] to-[#f87171]',
    shadow: 'shadow-[#e11d48]/20',
  },
  {
    icon: Network,
    title: 'Network Design & Deployment',
    description: 'Reliable wired and wireless school network infrastructure designed for campuses of every size.',
    gradient: 'from-[#0891b2] to-[#22d3ee]',
    shadow: 'shadow-[#0891b2]/20',
  },
  {
    icon: ClipboardCheck,
    title: 'Compliance Audit & Advisory',
    description: 'Support for data protection, information security and applicable IT compliance requirements.',
    gradient: 'from-[#10b981] to-[#34d399]',
    shadow: 'shadow-[#10b981]/20',
  },
  {
    icon: Lightbulb,
    title: 'IT Strategy Consulting',
    description: 'Vendor-neutral technology planning and digital transformation guidance for modern schools.',
    gradient: 'from-[#f59e0b] to-[#fbbf24]',
    shadow: 'shadow-[#f59e0b]/20',
  },
  {
    icon: Headset,
    title: '24/7 Helpdesk & AMC',
    description: 'SLA-backed remote and on-site support with dedicated account management to keep school operations running.',
    gradient: 'from-[#8b5cf6] to-[#a78bfa]',
    shadow: 'shadow-[#8b5cf6]/20',
  },
];

const FALLBACK_BENEFITS = [
  { title: 'Simplify Daily Operations', description: 'Bring multiple school processes together and reduce repetitive administrative work.' },
  { title: 'One Source of School Data', description: 'Keep student, academic, financial and administrative information organized in one centralized system.' },
  { title: 'Improve Communication', description: 'Keep parents, teachers, students and management connected with timely updates.' },
  { title: 'Make Data-Driven Decisions', description: 'Use reports and analytics to understand school performance and identify areas that need attention.' },
  { title: 'Access From Anywhere', description: 'Cloud-based access and dedicated mobile apps keep your school connected beyond the campus.' },
  { title: 'Get Dedicated Support', description: 'From implementation and training to ongoing assistance, our team helps your school adopt the platform with confidence.' },
];

export default function WhyChooseUs() {
  const { content } = useSiteContent();

  const badge = getContentValue(content, 'why_choose_badge', 'Benefits');
  const headline = getContentValue(content, 'why_choose_headline', 'Why Choose ChaloSchools?');
  const subtitle = getContentValue(content, 'why_choose_subtitle', '');

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
          {subtitle && <p className="text-lg text-body">{subtitle}</p>}
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
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
            <Badge className="mb-4 bg-[#f59e0b]/10 text-[#d97706] border-[#f59e0b]/20 rounded-full">IT Services</Badge>
            <h3 className="text-2xl lg:text-3xl font-bold text-heading mb-2">Managed IT Services and School Technology Infrastructure</h3>
            <p className="text-body">
              ChaloSchools goes beyond school management software with end-to-end managed IT services for schools — covering infrastructure, cybersecurity, networking, compliance and technical support.
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
                className="card-shine group bg-card rounded-xl border border-border p-5 hover:border-[#f59e0b]/30 hover:shadow-md transition-all"
              >
                <div className="relative inline-block mb-3">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${s.gradient} flex items-center justify-center shadow-lg ${s.shadow} text-white group-hover:scale-110 transition-transform duration-300`}>
                    <s.icon className="w-5 h-5" />
                  </div>
                  <div className={`absolute inset-0 rounded-lg bg-gradient-to-br ${s.gradient} opacity-0 group-hover:opacity-20 scale-125 blur-md transition-all duration-300`} />
                </div>
                <h4 className="font-bold text-sm text-heading mb-1.5">{s.title}</h4>
                <p className="text-xs text-subtle leading-relaxed">{s.description}</p>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-sm font-semibold text-heading mt-6">
            One Technology Partner. Zero Gaps.
          </p>
          <p className="text-center text-xs text-subtle mt-1">
            From school ERP and AI analytics to IT infrastructure, cybersecurity, networking and 24/7 support, ChaloSchools provides a complete technology ecosystem for modern schools.
          </p>
        </div>
      </div>
    </section>
  );
}
