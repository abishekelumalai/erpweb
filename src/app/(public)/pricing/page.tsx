import { Metadata } from 'next';

import { buildMetadataWithOverrides } from '@/lib/metadata';

import Link from 'next/link';

import { Button } from '@/components/ui/button';

import { Badge } from '@/components/ui/badge';

import {

  CheckCircle2, ArrowRight, Sparkles, ShieldCheck, GraduationCap,

  Smartphone, HeadphonesIcon,

} from 'lucide-react';

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadataWithOverrides({
    pageKey: 'pricing',
    title: 'School Management Software Pricing',
    description:
      'Explore ChaloSchools school management software pricing with flexible per-student plans, school ERP features, free onboarding, data migration, training and support.',
    path: '/pricing',
  });
}

const tiers = [

  {

    name: 'Basic',

    tagline: 'For small schools getting started',

    highlight: false,

    features: [

      'Admissions management',

      'Fees & finance',

      'Attendance tracking',

      'Parent & staff mobile apps',

      'Standard reports',

      'Email & chat support',

      'Helpdesk support',

    ],

  },

  {

    name: 'Growth',

    tagline: 'Most popular for growing schools',

    highlight: true,

    features: [

      'Everything in Basic, plus:',

      'Academics, exams & marks portal',

      'Timetable scheduler',

      'Parent app with full engagement',

      'Academic inventory tracking',

      'Transport tracking',

      'Helpdesk support',

      'Advanced reports & analytics',

    ],

  },

  {

    name: 'Enterprise',

    tagline: 'For multi-branch schools & trusts',

    highlight: false,

    features: [

      'Everything in Growth, plus:',

      'Staff, HR & payroll',

      'Transport management',

      'Academic inventory tracking',

      'Multi-branch management',

      'Library management',

      'Helpdesk support',

      'Dedicated account manager & priority support',

    ],

  },

];

const includedInEveryPlan = [

  { icon: GraduationCap, title: 'Free Onboarding & Data Migration', description: 'Move your existing school data to ChaloSchools with support from our implementation team.', gradient: 'from-[#026dde] to-[#00d4ff]', shadow: 'shadow-[#026dde]/20' },

  { icon: HeadphonesIcon, title: 'Free Staff Training', description: 'Help administrators, teachers and staff get started with guided training.', gradient: 'from-[#f59e0b] to-[#fbbf24]', shadow: 'shadow-[#f59e0b]/20' },

  { icon: Smartphone, title: 'Mobile Apps', description: 'Connect parents, teachers and school management through dedicated mobile applications.', gradient: 'from-[#10b981] to-[#34d399]', shadow: 'shadow-[#10b981]/20' },

  { icon: ShieldCheck, title: 'Data Security & Cloud Backup', description: 'Protect important school and student information with secure data management and cloud backup.', gradient: 'from-[#8b5cf6] to-[#a78bfa]', shadow: 'shadow-[#8b5cf6]/20' },

];

const faqs = [

  {

    q: 'Is ChaloSchools priced per student or per school?',

    a: 'ChaloSchools uses per-student, per-year pricing, allowing your school management software cost to scale with your student strength.',

  },

  {

    q: 'Are there setup or onboarding charges?',

    a: 'No. Onboarding, data migration and staff training are included free with every plan.',

  },

  {

    q: 'Can we upgrade our school management software plan later?',

    a: "Yes. You can move from Basic to Growth or Enterprise as your school's requirements increase. There is no long-term lock-in.",

  },

  {

    q: 'Do multi-branch schools and education trusts get custom pricing?',

    a: 'Yes. Multi-branch schools, school groups and education trusts can request customized pricing based on their number of branches, students and requirements.',

  },

  {

    q: 'What affects school ERP software pricing?',

    a: 'Your school ERP pricing depends on factors such as student strength, required modules, number of branches and specific school requirements. Our team can recommend the most suitable plan for your institution.',

  },

];

export default function PricingPage() {

  return (

    <>

      {/* Hero */}

      <section className="relative bg-brand-gradient py-20 md:py-28 overflow-hidden">

        <div className="absolute inset-0 opacity-10">

          <div className="absolute top-10 left-1/4 w-72 h-72 bg-accent rounded-full blur-3xl" />

          <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-card/20 rounded-full blur-3xl" />

        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          <div className="inline-flex items-center gap-2 bg-card/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">

            <Sparkles className="w-4 h-4 text-accent" />

            <span className="text-sm text-white/80">Pricing</span>

          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">

            Pricing That Scales With Your School

          </h1>

          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">

            No hidden costs. No long-term lock-in. Pay per student, per year.

          </p>

        </div>

      </section>

      {/* Pricing Tiers */}

      <section className="py-12 md:py-16 bg-card">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">

            {tiers.map((tier) => (

              <div key={tier.name} className="relative">

                {tier.highlight && (

                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 bg-primary text-primary-foreground border-0 rounded-full px-4">

                    Most Popular

                  </Badge>

                )}

                <div

                  className={`relative flex flex-col h-full rounded-2xl border p-8 transition-all card-lift card-shine ${

                    tier.highlight

                      ? 'border-primary shadow-xl shadow-primary/10 bg-card scale-[1.02]'

                      : 'border-border bg-card hover:border-primary/30 hover:shadow-lg'

                  }`}

                >

                <h3 className="text-2xl font-bold text-heading">{tier.name}</h3>

                <p className="text-sm text-subtle mt-1 mb-6">{tier.tagline}</p>

                <ul className="space-y-3 flex-1">

                  {tier.features.map((f) => (

                    <li key={f} className="flex items-start gap-2.5">

                      <CheckCircle2 className="w-5 h-5 shrink-0 text-primary mt-0.5" />

                      <span className="text-sm text-body">{f}</span>

                    </li>

                  ))}

                </ul>

                <Button

                  asChild

                  className={`mt-8 w-full rounded-full font-semibold ${

                    tier.highlight

                      ? 'bg-primary hover:bg-primary/90 text-primary-foreground'

                      : 'bg-card border border-primary text-primary hover:bg-primary hover:text-primary-foreground'

                  }`}

                >

                  <Link href="/contact#contact-form">

                    Get a Custom Quote <ArrowRight className="w-4 h-4 ml-1.5" />

                  </Link>

                </Button>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* What's included in every plan */}

      <section className="py-16 md:py-20 bg-surface-2">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-12">

            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-heading mb-3">

              What&apos;s Included With Every School ERP Plan?

            </h2>

            <p className="text-body text-lg max-w-2xl mx-auto">

              Every ChaloSchools plan includes the essential services your school needs for a smooth transition to digital school management.

            </p>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {includedInEveryPlan.map(({ icon: Icon, title, description, gradient, shadow }) => (

              <div key={title} className="flex flex-col items-center text-center gap-3 bg-card rounded-xl border border-border p-6">

                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg ${shadow} text-white`}>

                  <Icon className="w-6 h-6" />

                </div>

                <h3 className="text-sm font-bold text-heading">{title}</h3>

                <p className="text-xs text-subtle leading-relaxed">{description}</p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* FAQ */}

      <section className="py-16 md:py-20 bg-card">

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-10">

            <Badge variant="secondary" className="mb-3 bg-[#026dde]/10 text-primary border-[#026dde]/20">

              Pricing FAQ

            </Badge>

            <h2 className="text-2xl md:text-3xl font-bold text-heading">

              Questions About Pricing?

            </h2>

          </div>

          <div className="space-y-4">

            {faqs.map((faq) => (

              <details key={faq.q} className="group bg-card rounded-xl border border-border p-5 open:shadow-sm">

                <summary className="flex items-center justify-between gap-3 cursor-pointer list-none">

                  <h3 className="text-base font-semibold text-heading">{faq.q}</h3>

                  <ArrowRight className="w-4 h-4 shrink-0 text-primary transition-transform group-open:rotate-90" />

                </summary>

                <p className="text-sm text-subtle leading-relaxed mt-3">{faq.a}</p>

              </details>

            ))}

          </div>

        </div>

      </section>

      {/* CTA */}

      <section className="bg-brand-gradient py-16 md:py-20">

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">

            School ERP Software Built to Grow With Your School

          </h2>

          <p className="text-white/70 text-lg mb-4 max-w-2xl mx-auto">

            Whether you are a small school starting your digital transformation, a growing institution expanding its operations, or a multi-campus education group, ChaloSchools provides a scalable school management system that grows with you.

          </p>

          <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">

            Manage your school&apos;s academic, administrative, financial and communication needs from one connected platform.

          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">

            <Button

              size="lg"

              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-6 text-base rounded-lg shadow-lg hover:shadow-xl transition-all"

              asChild

            >

              <Link href="/contact#contact-form">

                Get a Custom Quote <ArrowRight className="w-5 h-5 ml-2" />

              </Link>

            </Button>

            <Button

              size="lg"

              variant="outline"

              className="border-white/30 bg-transparent text-white hover:bg-card/10 font-semibold px-8 py-6 text-base rounded-lg transition-all"

              asChild

            >

              <Link href="/contact">Talk to Sales</Link>

            </Button>

          </div>

          <p className="text-white/50 text-sm mt-6 max-w-xl mx-auto">

            Tell us about your school, student strength, board, number of branches and requirements. Our team will help you choose the right school ERP software plan for your institution.

          </p>

        </div>

      </section>

    </>

  );

}

