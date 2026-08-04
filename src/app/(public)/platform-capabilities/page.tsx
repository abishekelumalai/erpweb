import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  UserPlus, LineChart, Wand2, Mic, CalendarClock, Landmark, Lock, EyeOff,
  IdCard, Palette, ClipboardList, BadgeCheck, LayoutDashboard, Bot, Fingerprint,
  Link2, Cloud, Wallet, FolderOpen, Smartphone, Sparkles, ArrowRight,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Platform Capabilities | ChaloSchools',
  description:
    '20+ industry-first, AI-powered capabilities built into ChaloSchools — from AI Rephrase and Voice Broadcast to KYP verification and Enterprise Cloud infrastructure.',
  alternates: { canonical: '/platform-capabilities' },
};

const FEATURES = [
  { icon: UserPlus, accent: '#026dde', title: 'Digital Admissions', desc: '100% paperless. Mobile-first. Enrolments close faster — errors close to zero.' },
  { icon: LineChart, accent: '#f59e0b', title: 'AI Result Analytics', desc: '360° insights across students, teachers & exams. Spot gaps before they widen.' },
  { icon: Wand2, accent: '#026dde', title: 'AI Rephrase', desc: 'Every message to parents — GPT-polished, consistent, professional. Always.' },
  { icon: Mic, accent: '#f59e0b', title: 'Voice Broadcast', desc: 'One voice. Thousands of parents. Record or upload a message and broadcast instantly to all parents and staff — in your language, at the right moment.' },
  { icon: CalendarClock, accent: '#026dde', title: 'Smart Timetable', desc: 'Conflict-free schedules. Auto-substitutions. No more spreadsheet marathons.' },
  { icon: Landmark, accent: '#f59e0b', title: 'Fee Reconciliation', desc: 'Student ID-mapped. Bank-synced. Zero revenue leakage. 100% receipt rate.' },
  { icon: Lock, accent: '#026dde', title: 'Secure Data Vault', desc: 'OTP-verified changes. Role-based access. GoI IT Act 2000 compliant.' },
  { icon: EyeOff, accent: '#f59e0b', title: 'Data Privacy & Masking', desc: 'Personal data of students and staff is masked by default. Only authorised roles see what they need to — built in line with DPDP Act 2023 data protection principles.' },
  { icon: IdCard, accent: '#026dde', title: 'Profile Management', desc: 'Every student & staff — searchable, lifelong, always a click away.' },
  { icon: Palette, accent: '#f59e0b', title: 'Multiple Predefined Themes', desc: 'Choose from multiple predefined themes across web, app and admin panels.' },
  { icon: ClipboardList, accent: '#026dde', title: 'Parent Feedback', desc: 'Structured. Actionable. Capture parent sentiment. Close the loop before it becomes a complaint.' },
  { icon: BadgeCheck, accent: '#f59e0b', title: 'Student & Staff ID Card Generation', desc: 'Instant, print-ready ID cards for every student and staff member. Accurate data, consistent format — generated in seconds, not days.' },
  { icon: LayoutDashboard, accent: '#026dde', title: 'Actionable Dashboard for Every User', desc: 'No more data overload. Every role — from management to admin to teachers — sees exactly what matters to them, with clear next steps built in.' },
  { icon: Bot, accent: '#f59e0b', title: 'Chatbot for Parents', desc: 'Answers at midnight. No calls, no waiting. Parents get instant responses related to school information — 24/7.' },
  { icon: Fingerprint, accent: '#026dde', title: 'Know Your Parent (KYP)', desc: 'OTP-based profile verification. Verified identities, trusted community — KYP ensures every student profile is authenticated, keeping your school safe and records clean.' },
  { icon: Link2, accent: '#f59e0b', title: 'Seamless Integrations', desc: 'Biometric · GPS · Tally · WhatsApp · Payment — one unified nerve centre.' },
  { icon: Cloud, accent: '#026dde', title: 'Enterprise Cloud', desc: 'ISO 27001:2022. Multi-tenant isolation. Point-in-time recovery. 99.9% uptime.' },
  { icon: Wallet, accent: '#f59e0b', title: '24/7 Fee Payments', desc: 'Multi-gateway. Duplicate-proof. Parents pay anytime — you collect always.' },
  { icon: FolderOpen, accent: '#026dde', title: 'Document Hub', desc: 'Instant digital records. No file cabinets. Admin turnaround: days to seconds.' },
  { icon: Smartphone, accent: '#f59e0b', title: 'Personal Mobile App', desc: 'Exam wishes. Occasion nudges. Community at scale — with a human touch.' },
];

export default function PlatformCapabilitiesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-brand-gradient py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-1/4 w-72 h-72 bg-[#f59e0b] rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-card/20 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-card/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-[#f59e0b]" />
            <span className="text-sm text-white/80">Platform Capabilities</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            AI-Powered <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f59e0b] to-[#ef4444]">Feature Suite</span>
          </h1>
          <p className="text-lg md:text-xl text-[#f59e0b] font-semibold mb-4">20+ Industry-First Capabilities</p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed mb-10">
            Every capability below ships standard with ChaloSchools — no separate add-on pricing, no bolted-on third-party tools.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="bg-[#f59e0b] hover:bg-[#d97706] text-white font-semibold px-8 py-6 text-base rounded-lg shadow-lg hover:shadow-xl transition-all" asChild>
              <Link href="/contact#contact-form">
                Book an Introductory Demo
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 bg-transparent text-white hover:bg-card/10 font-semibold px-8 py-6 text-base rounded-lg transition-all" asChild>
              <Link href="/product">See the Modules</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Feature grid */}
      <section className="py-16 md:py-24 bg-card">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="group flex items-start gap-5 bg-card rounded-2xl border border-border p-6 hover:shadow-lg hover:border-blue-100 transition-all"
              >
                <div
                  className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: `${f.accent}12`, color: f.accent }}
                >
                  <f.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-heading mb-1">{f.title}</h3>
                  <p className="text-sm text-subtle leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-brand-gradient">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
            See Every Capability in Action
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
            Book a personalized demo and we&apos;ll walk through exactly which capabilities matter most for your school.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="bg-[#f59e0b] hover:bg-[#d97706] text-white font-semibold px-8 py-6 text-base rounded-lg shadow-lg hover:shadow-xl transition-all" asChild>
              <Link href="/contact">
                Book an Introductory Demo
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 bg-transparent text-white hover:bg-card/10 font-semibold px-8 py-6 text-base rounded-lg transition-all" asChild>
              <Link href="/product">
                Explore the Modules
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
