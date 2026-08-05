import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ArrowRight, ShieldCheck, EyeOff, Users, Fingerprint, Lock, ClipboardCheck,
  Scale, FileCheck, Eraser, MessageSquareWarning, Sparkles,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Data Protection & Security | ChaloSchools',
  description:
    "How ChaloSchools implements India's DPDP Act, 2023 and DPDP Rules, 2025 — data masking, role-based access, encryption, and audit-ready compliance, backed by ISO 27001:2022 certification.",
  alternates: { canonical: '/security' },
};

const implementation = [
  {
    icon: EyeOff,
    title: 'Data Masking by Default',
    description: 'Personal data of students and staff is masked by default. Only authorised roles see what they need to — nothing more.',
  },
  {
    icon: Users,
    title: 'Role-Based Access Control',
    description: 'Every user — teacher, parent, accountant, or admin — sees only the data relevant to their role.',
  },
  {
    icon: Fingerprint,
    title: 'OTP-Verified Changes',
    description: 'Sensitive data changes require OTP verification, creating a clear, tamper-evident audit trail.',
  },
  {
    icon: Lock,
    title: 'Bank-Grade Encryption',
    description: 'AES-256 encryption at rest and in transit, with daily encrypted backups.',
  },
  {
    icon: ClipboardCheck,
    title: 'Audit-Ready Compliance',
    description: 'DPDP Act, GoI IT Act 2000, and ISO 27001 controls — audit-ready always, not just before inspections.',
  },
  {
    icon: ShieldCheck,
    title: "Children's Data, Protected",
    description: 'Built around verifiable parental consent principles for processing the personal data of minors.',
  },
];

const pillars = [
  { icon: FileCheck, title: 'Transparency', description: 'Clear, accessible information on what data is collected and why.' },
  { icon: Lock, title: 'Security', description: 'Technical and organisational safeguards built into the platform, not bolted on.' },
  { icon: Scale, title: 'Accountability', description: 'Named responsibility and audit trails for every access to personal data.' },
];

const rights = [
  { icon: FileCheck, title: 'Right to Access', description: 'Parents and staff can request a clear record of what personal data is held about them.' },
  { icon: Users, title: 'Right to Correction', description: 'Inaccurate or outdated personal data can be corrected on request.' },
  { icon: Eraser, title: 'Right to Erasure', description: 'Personal data can be deleted once it is no longer needed for the purpose it was collected.' },
  { icon: MessageSquareWarning, title: 'Right to Grievance Redressal', description: 'A clear channel to raise and resolve data protection concerns.' },
];

export default function SecurityPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-brand-gradient py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-1/4 w-72 h-72 bg-[#f59e0b] rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-card/20 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-card/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-[#f59e0b]" />
            <span className="text-sm text-white/80">Data Protection &amp; Compliance</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Built for India&apos;s DPDP Act, 2023
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            India&apos;s DPDP Act, 2023 and DPDP Rules, 2025 establish a comprehensive and rights-driven data protection framework that strengthens transparency, security and accountability.
          </p>
        </div>
      </section>

      {/* What it means for schools */}
      <section className="py-12 md:py-16 bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-heading mb-6 text-center">
            What the DPDP Act Means for Schools
          </h2>
          <p className="text-subtle text-lg leading-relaxed mb-4">
            Every school handling admissions, fees, attendance, and academic records is a <strong className="text-heading">Data Fiduciary</strong> under the DPDP Act — responsible for the personal data of students, many of whom are minors, and staff. The Act and its 2025 Rules require verifiable parental consent for children&apos;s data, purpose limitation, data minimisation, security safeguards, breach notification, and a clear grievance redressal process.
          </p>
          <p className="text-subtle text-lg leading-relaxed">
            ChaloSchools is built so schools meet these obligations by default — not as an afterthought bolted on after a compliance scare.
          </p>

          <div className="grid sm:grid-cols-3 gap-6 mt-12">
            {pillars.map((p) => (
              <div key={p.title} className="text-center">
                <div className="w-14 h-14 mx-auto rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <p.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-heading mb-1.5">{p.title}</h3>
                <p className="text-sm text-subtle leading-relaxed">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How ChaloSchools implements it */}
      <section className="py-12 md:py-16 bg-surface-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <Badge className="mb-4 bg-[#026dde]/10 text-primary border-[#026dde]/20 rounded-full">In Practice</Badge>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-heading mb-4">
              How ChaloSchools Implements It
            </h2>
            <p className="text-subtle text-lg max-w-2xl mx-auto">
              Concrete, platform-level controls — not just a policy document.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {implementation.map((item) => (
              <Card key={item.title} className="border-border hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-heading mb-2">{item.title}</h3>
                  <p className="text-sm text-subtle leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ISO 27001 callout */}
      <section className="py-12 bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center gap-6 rounded-2xl border border-border bg-surface-2 p-8">
            <div className="w-16 h-16 shrink-0 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div className="text-center sm:text-left">
              <h3 className="font-bold text-lg text-heading mb-1">ISO 27001:2022 Certified</h3>
              <p className="text-sm text-subtle leading-relaxed">
                ChaloSchools is built by an ISO 27001:2022 certified company — the international standard for information security management — on top of DPDP Act-aligned data handling.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Data rights */}
      <section className="py-12 md:py-16 bg-surface-2">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-heading mb-4">
              Data Rights, Respected
            </h2>
            <p className="text-subtle text-lg max-w-2xl mx-auto">
              A rights-driven framework means real rights for the people whose data it is.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {rights.map((r) => (
              <div key={r.title} className="flex items-start gap-4 rounded-xl border border-border bg-card p-5">
                <div className="w-10 h-10 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <r.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-heading mb-1">{r.title}</h3>
                  <p className="text-sm text-subtle leading-relaxed">{r.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-heading mb-4">
            Questions About Compliance?
          </h2>
          <p className="text-subtle text-lg mb-8 max-w-2xl mx-auto">
            Talk to our team about how ChaloSchools helps your school meet DPDP Act obligations from day one.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-[#f59e0b] hover:bg-[#d97706] text-white font-semibold px-8 py-6 text-base rounded-lg shadow-lg hover:shadow-xl transition-all"
              asChild
            >
              <Link href="/contact">
                Book an Introductory Demo
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-[#026dde] text-primary hover:bg-[#026dde] hover:text-white font-semibold px-8 py-6 text-base rounded-lg transition-all"
              asChild
            >
              <Link href="/product">
                Explore All Modules
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
