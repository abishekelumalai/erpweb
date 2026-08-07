import { Metadata } from 'next';

import Link from 'next/link';

import { Button } from '@/components/ui/button';

import { Card, CardContent } from '@/components/ui/card';

import { Badge } from '@/components/ui/badge';

import {

  UserPlus, IndianRupee, ClipboardCheck, CalendarDays, MessageCircle, BarChart3,

  ArrowRight, CheckCircle2, Sparkles, Shield, Zap,
  FileText, GraduationCap, Users, Wallet, Package,
  Fingerprint, Navigation, Calculator, CreditCard, TrendingUp, Bot, Link2,

} from 'lucide-react';

export const metadata: Metadata = {

  title: 'Product Tour',

  description:

    'Take a tour of ChaloSchools — explore all 14 modules, from Admissions and Fee Management to Payroll, Inventory, and our AI Secretary.',

  alternates: { canonical: '/product' },

};

const productFaqs = [

  {

    question: 'What modules does ChaloSchools include?',

    answer: 'ChaloSchools includes 8 standard modules — Admission Management, Student Management, Staff Management, Fee Management, AI-Powered Timetable & Scheduling, Attendance Management, Academic & Examination, and Communication Management — plus add-on modules for Academic Inventory Tracking, Payroll, Library Management, Transport Management, Inspace Performance Insights, and an AI Secretary for school management.',

  },

  {

    question: 'Is ChaloSchools suitable for CBSE, ICSE, IB, or Cambridge schools?',

    answer: 'Yes. ChaloSchools supports Pre School, State & CBSE, IB, Cambridge, Montessori, and Matriculation/Higher Education boards and curricula, with board-specific reporting and workflows.',

  },

  {

    question: 'Does ChaloSchools have a mobile app?',

    answer: 'Yes — ChaloSchools includes three dedicated apps: Chaloschools for parents, AnsApp for teachers, and C-365 for school management, each built for its specific role.',

  },

  {

    question: 'Is student and staff data secure with ChaloSchools?',

    answer: 'ChaloSchools is ISO 27001:2022 certified and follows DPDP Act 2023 data protection principles, with role-based access, OTP-verified changes, and personal data masked by default for unauthorised roles.',

  },

  {

    question: 'How does ChaloSchools handle setup and training?',

    answer: 'ChaloSchools includes free setup and training as part of onboarding — the team handles data migration and configuration so schools can go live without needing in-house technical staff.',

  },

];

const modules = [

  {

    id: 'admissions',

    icon: UserPlus,

    accent: '#026dde',

    title: 'Admissions Management',

    tagline: 'From enquiry to enrolment — fully automated.',

    description:

      'Digitize your entire admissions pipeline. Accept online applications, track enquiries, manage document verification, schedule interviews, and convert leads into enrolled students — all from a single dashboard.',

    features: [

      'Online application forms with custom fields',

      'Document upload and verification workflow',

      'Automated status notifications via SMS/WhatsApp',

      'Enquiry-to-admission conversion tracking',

      'Sibling linking and waitlist management',

      'Bulk admission processing for new academic year',

    ],

    stat: { value: '342', label: 'Applications processed/week' },

  },

  {

    id: 'fees',

    icon: IndianRupee,

    accent: '#f59e0b',

    title: 'Fees & Finance',

    tagline: 'Collect fees on time, every time.',

    description:

      'Flexible fee structures for every board type. Set up instalments, apply concessions, send automated reminders, and accept online payments. Real-time dashboards show collection rates and pending dues at a glance.',

    features: [

      'Multi-instalment fee plans with custom due dates',

      'Online payment gateway integration (Razorpay, etc.)',

      'Automated fee reminders via SMS and WhatsApp',

      'Concession and scholarship management',

      'Transport, hostel, and activity fee modules',

      'Detailed financial reports and GST-ready receipts',

    ],

    stat: { value: '₹18.4L', label: 'Collected per month (avg school)' },

  },

  {

    id: 'attendance',

    icon: ClipboardCheck,

    accent: '#10b981',

    title: 'Attendance Tracking',

    tagline: 'Mark, track, and notify — in seconds.',

    description:

      'Take daily attendance for students and staff with a single tap. Biometric and RFID integration supported. Parents receive instant notifications when their child is marked absent.',

    features: [

      'One-tap class-wise attendance marking',

      'Biometric and RFID device integration',

      'Instant parent notification on absence',



      'Leave management for staff with approval workflow',

      'Attendance analytics with trend reports',

    ],

    stat: { value: '96.8%', label: 'Average attendance rate' },

  },

  {

    id: 'timetable',

    icon: CalendarDays,

    accent: '#8b5cf6',

    title: 'Timetable Scheduler',

    tagline: 'AI-generated, zero conflicts, instant updates.',

    description:

      'Generate optimal timetables that respect teacher availability, room constraints, and subject load balancing. Substitution management handles last-minute absences without disrupting the school day.',

    features: [

      'AI-powered conflict-free timetable generation',

      'Teacher workload balancing and preferences',



      'Instant substitution assignment on teacher absence',

      'Multi-shift and multi-section support',

      'Export to PDF, print, or digital display boards',

    ],

    stat: { value: '0', label: 'Scheduling conflicts' },

  },

  {

    id: 'parent-app',

    icon: MessageCircle,

    accent: '#026dde',

    title: 'Parent & Student App',

    tagline: 'Keep parents informed, involved, and happy.',

    description:

      'A dedicated mobile app for parents and students. View attendance, track bus location, check exam results, pay fees, communicate with teachers — all in one place. Reduce the 50+ WhatsApp groups your school currently manages.',

    features: [

      'Real-time attendance and bus tracking',

      'Exam results and progress reports',

      'Fee payment and receipt download',

      'Direct messaging with class teacher',

      'Homework and circular notifications',

      'Event calendar and photo gallery',

    ],

    stat: { value: '1,842', label: 'Active parents connected' },

  },

  {

    id: 'reports',

    icon: BarChart3,

    accent: '#026dde',

    title: 'Reports & Analytics',

    tagline: 'Data-driven decisions, not gut feelings.',

    description:

      'Pre-built and custom reports across every module — fee collection, attendance trends, academic performance, staff metrics. Exportable dashboards that school management committees actually want to read.',

    features: [

      '50+ pre-built reports across all modules',



      'Real-time dashboards for management',

      'Exportable to Excel, PDF, and CSV',

      'Scheduled email reports to stakeholders',

      'Year-over-year comparison and trend analysis',

    ],

    stat: { value: '50+', label: 'Pre-built report templates' },

  },
  {
    id: 'exams',
    icon: FileText,
    accent: '#8b5cf6',
    title: 'Academic & Examination',
    tagline: 'From exam schedules to report cards, automated.',
    description:
      'Manage the full exam cycle — schedule exams, enter marks digitally, auto-generate report cards, and publish results online. Parents view marks in real time through the app.',
    features: [
      'Flexible exam scheduling',
      'Digital mark entry and grade calculation',
      'Automated report card generation',
      'Online result publication',
      'Performance analytics and trends',
      'Board-specific grading formats (CBSE/ICSE/State)',
    ],
    stat: { value: '360°', label: 'Result analytics per student' },
  },
  {
    id: 'student',
    icon: GraduationCap,
    accent: '#f59e0b',
    title: 'Student Management',
    tagline: "Every student's full record, always a click away.",
    description:
      'A single, searchable profile for every student — academic history, attendance, fees, and documents in one place. No more digging through physical files or scattered spreadsheets.',
    features: [
      'Centralized student profiles with photo ID',
      'Academic history across all years',
      'Emergency contacts and medical notes',
      'Document storage (birth certificate, transfer certificate, etc.)',
      'Sibling linking across admissions',
      'Bulk promotion to the next academic year',
    ],
    stat: { value: '2,450', label: 'Student profiles managed' },
  },
  {
    id: 'staff',
    icon: Users,
    accent: '#026dde',
    title: 'Staff Management',
    tagline: 'Manage your entire team from one place.',
    description:
      'Complete staff records, roles, and access control — from recruitment to appraisals. Track attendance, leave, and documents without spreadsheets.',
    features: [
      'Centralized staff records and documents',
      'Role-based access control',
      'Staff attendance and leave management',
      'Leave approval workflow',
      'Appraisal and performance tracking',
      'Staff directory with contact details',
    ],
    stat: { value: '45', label: 'Staff members tracked' },
  },
  {
    id: 'payroll',
    icon: Wallet,
    accent: '#f59e0b',
    title: 'Payroll Management',
    tagline: 'Automated salary processing, zero manual errors.',
    description:
      'Automated salary processing and statutory compliance — PF, ESI, and TDS calculated automatically. Generate payslips in seconds, not days.',
    features: [
      'Automated salary calculation',
      'PF, ESI, and TDS compliance',
      'Digital payslip generation',
      'Loan and advance tracking',
      'Attendance-linked salary deductions',
      'Bank-ready payment files',
    ],
    stat: { value: '0', label: 'Manual calculation errors' },
  },
  {
    id: 'inventory',
    icon: Package,
    accent: '#026dde',
    title: 'Academic Inventory Tracking',
    tagline: 'Track every academic asset, in real time.',
    description:
      'Track lab equipment, sports gear, furniture, and academic stock in real time — know what you have, where it is, and when it needs replenishing.',
    features: [
      'Real-time stock tracking across departments',
      'Low-stock alerts and reorder reminders',
      'Asset assignment and check-in/check-out',
      'Purchase and vendor history',
      'Depreciation tracking for equipment',
      'Barcode/QR-based inventory scanning',
    ],
    stat: { value: '0', label: 'Stockouts this term' },
  },
  {
    id: 'communication',
    icon: MessageCircle,
    accent: '#10b981',
    title: 'Communication Management',
    tagline: 'Reach every parent, every time — WhatsApp, SMS & voice.',
    description:
      'Send announcements, fee reminders, and emergency alerts instantly across WhatsApp, SMS, and voice broadcast — with delivery and read receipts so nothing gets missed.',
    features: [
      'WhatsApp Business API integration',
      'Bulk SMS and voice broadcast',
      'Delivery and read-receipt tracking',
      'Class-wise or school-wide announcements',
      'Automated fee and event reminders',
      'Two-way parent-teacher messaging',
    ],
    stat: { value: '1,842', label: 'Parents reached instantly' },
  },
  {
    id: 'performance-insights',
    icon: TrendingUp,
    accent: '#0891b2',
    title: 'Inspace Performance Insights',
    tagline: 'Deep, school-wide analytics — beyond basic reports.',
    description:
      'Go past standard report cards with cross-module analytics — track academic trends, attendance patterns, fee collection health, and staff performance from a single insights dashboard.',
    features: [
      'Cross-module performance dashboards',
      'Academic trend analysis by class and subject',
      'Attendance and fee collection health scores',
      'Staff performance benchmarking',
      'Custom KPI tracking',
      'Exportable insights for management reviews',
    ],
    stat: { value: '360°', label: 'School-wide visibility' },
  },
  {
    id: 'ai-secretary',
    icon: Bot,
    accent: '#e11d48',
    title: 'AI Secretary',
    tagline: 'An AI assistant built exclusively for school management.',
    description:
      "Ask questions in plain language and get instant answers pulled from your school's own data — attendance, fees, admissions, and more — without digging through reports.",
    features: [
      'Natural-language queries across school data',
      'Instant answers on attendance, fees & admissions',
      'Automated daily/weekly summary briefings',
      'Smart alerts for anomalies (e.g. attendance drops)',
      'Available inside the management app',
      "Continuously learns from your school's data",
    ],
    stat: { value: '24/7', label: 'Always-on assistant' },
  },
];

export default function ProductPage() {

  return (

    <>

      {/* Hero Section */}

      <section className="relative bg-brand-gradient py-20 md:py-28 overflow-hidden">

        <div className="absolute inset-0 opacity-10">

          <div className="absolute top-10 left-1/4 w-72 h-72 bg-accent rounded-full blur-3xl" />

          <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-card/20 rounded-full blur-3xl" />

        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          <div className="inline-flex items-center gap-2 bg-card/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">

            <Sparkles className="w-4 h-4 text-accent" />

            <span className="text-sm text-white/80">Product Tour</span>

          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">

            Everything Your School Needs,<br className="hidden md:block" /> In One Platform

          </h1>

          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed mb-10">

            ChaloSchools handles all the activities for the operation of a school — from admissions to analytics. Explore our core modules below.

          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">

            <Button

              size="lg"

              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-6 text-base rounded-lg shadow-lg hover:shadow-xl transition-all"

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

              className="border-white/30 bg-transparent text-white hover:bg-card/10 font-semibold px-8 py-6 text-base rounded-lg transition-all"

              asChild

            >

              <Link href="/contact">

                Talk to Sales

              </Link>

            </Button>

          </div>

        </div>

      </section>

      {/* Highlights Bar */}

      <section className="bg-surface-2 border-y border-border">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">

            <div className="flex items-center justify-center gap-3">

              <div className="w-10 h-10 rounded-lg bg-[#026dde]/10 flex items-center justify-center">

                <Shield className="w-5 h-5 text-primary" />

              </div>

              <span className="text-sm font-medium text-heading">ISO 27001:2022 Certified</span>

            </div>

            <div className="flex items-center justify-center gap-3">

              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">

                <Zap className="w-5 h-5 text-accent" />

              </div>

              <span className="text-sm font-medium text-heading">14 Modules</span>

            </div>

            <div className="flex items-center justify-center gap-3">

              <div className="w-10 h-10 rounded-lg bg-[#8b5cf6]/10 flex items-center justify-center">

                <Link2 className="w-5 h-5 text-[#8b5cf6]" />

              </div>

              <span className="text-sm font-medium text-heading">5 Integrations</span>

            </div>

            <div className="flex items-center justify-center gap-3">

              <div className="w-10 h-10 rounded-lg bg-[#10b981]/10 flex items-center justify-center">

                <CheckCircle2 className="w-5 h-5 text-[#10b981]" />

              </div>

              <span className="text-sm font-medium text-heading">All Boards Supported</span>

            </div>

          </div>

        </div>

      </section>

      {/* What is ChaloSchools — direct, citable definition */}

      <section className="bg-card py-14 md:py-16">

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          <h2 className="text-2xl md:text-3xl font-bold text-heading mb-4">What is ChaloSchools?</h2>

          <p className="text-lg text-body leading-relaxed">

            ChaloSchools is a school management ERP built for K-12 schools in India. It replaces spreadsheets,

            WhatsApp groups, and paper registers with one platform covering admissions, fee collection, attendance,

            timetable scheduling, staff and HR, and parent communication — used by 200+ schools serving 1.5+ Million students,

            with dedicated apps for parents, teachers, and school management.

          </p>

        </div>

      </section>

      {/* Module Sections */}

      {modules.map((mod, idx) => {

        const IconComp = mod.icon;

        const isEven = idx % 2 === 0;

        return (

          <section

            key={mod.id}

            id={mod.id}

            className={`pt-8 pb-8 md:pt-10 md:pb-12 ${idx === 0 ? 'pt-6 md:pt-8' : ''} ${isEven ? 'bg-card' : 'bg-surface-2'}`}

          >

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

              {/* Section header (badge + title span the full width, above both columns) */}

              <div className="mb-8 lg:mb-10">

                <Badge

                  variant="secondary"

                  className="mb-4 rounded-full px-3 py-1"

                  style={{ backgroundColor: 'color-mix(in srgb, var(--brand) 10%, transparent)', color: 'var(--brand)', borderColor: 'color-mix(in srgb, var(--brand) 20%, transparent)' }}

                >

                  <IconComp className="w-3.5 h-3.5 mr-1.5" />

                  Module {idx + 1} of {modules.length}

                </Badge>

                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-heading">

                  {mod.title}

                </h2>

              </div>

              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start ${!isEven ? 'lg:flex-row-reverse' : ''}`}>

                {/* Content */}

                <div className={`flex flex-col ${!isEven ? 'lg:order-2' : ''}`}>

                  <p className="text-lg font-medium mb-4" style={{ color: 'var(--brand)' }}>

                    {mod.tagline}

                  </p>

                  <p className="text-subtle leading-relaxed mb-8">

                    {mod.description}

                  </p>

                  <ul className="space-y-3 mb-8">

                    {mod.features.map((feature) => (

                      <li key={feature} className="flex items-start gap-3">

                        <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" style={{ color: 'var(--brand)' }} />

                        <span className="text-sm text-body">{feature}</span>

                      </li>

                    ))}

                  </ul>

                  <Button

                    className="font-semibold rounded-lg self-start"

                    style={{ backgroundColor: 'var(--brand)' }}

                    asChild

                  >

                    <Link href={`/features/${mod.id}`}>

                      Learn More

                      <ArrowRight className="w-4 h-4 ml-2" />

                    </Link>

                  </Button>

                </div>

                {/* Visual Card */}

                <div className={`flex ${!isEven ? 'lg:order-1' : ''}`}>

                  <Card className="border-border shadow-lg hover:shadow-xl transition-shadow w-full flex flex-col">

                    <CardContent className="pt-6 flex flex-col justify-center flex-1">

                      <div className="flex items-center justify-between mb-6">

                        <div className="flex items-center gap-3">

                          <div

                            className="w-12 h-12 rounded-xl flex items-center justify-center"

                            style={{ backgroundColor: 'color-mix(in srgb, var(--brand) 12%, transparent)' }}

                          >

                            <IconComp className="w-6 h-6" style={{ color: 'var(--brand)' }} />

                          </div>

                          <div>

                            <p className="font-semibold text-heading">{mod.title}</p>

                            <p className="text-xs text-subtle">ChaloSchools Module</p>

                          </div>

                        </div>

                      </div>

                      {/* Stat highlight */}

                      <div

                        className="rounded-xl p-6 text-center"

                        style={{ backgroundColor: 'color-mix(in srgb, var(--brand) 8%, transparent)' }}

                      >

                        <div

                          className="text-4xl md:text-5xl font-bold mb-2"

                          style={{ color: 'var(--brand)' }}

                        >

                          {mod.stat.value}

                        </div>

                        <p className="text-sm text-subtle font-medium">{mod.stat.label}</p>

                      </div>

                      {/* Feature pills */}

                      <div className="mt-6 flex flex-wrap gap-2">

                        {mod.features.slice(0, 3).map((f) => (

                          <span

                            key={f}

                            className="text-[11px] font-medium px-2.5 py-1 rounded-full border"

                            style={{ color: 'var(--brand)', borderColor: 'color-mix(in srgb, var(--brand) 30%, transparent)', backgroundColor: 'color-mix(in srgb, var(--brand) 6%, transparent)' }}

                          >

                            {f}

                          </span>

                        ))}

                      </div>

                    </CardContent>

                  </Card>

                </div>

              </div>

            </div>

          </section>

        );

      })}

      {/* Integrations */}
      <section className="py-10 bg-surface-2 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-semibold text-subtle uppercase tracking-wider mb-6">Seamless Integrations</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              { icon: Fingerprint, label: 'Biometric Attendance' },
              { icon: Navigation, label: 'GPS Fleet Tracking' },
              { icon: Calculator, label: 'Tally ERP' },
              { icon: CreditCard, label: 'Online Payment Gateway' },
              { icon: MessageCircle, label: 'WhatsApp' },
            ].map((it) => (
              <div
                key={it.label}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-card border border-border shadow-sm hover:border-primary/30 hover:shadow-md transition-all"
              >
                <it.icon className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-heading">{it.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product FAQ */}

      <section className="py-12 md:py-16 bg-surface-2">

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

          <h2 className="text-2xl md:text-3xl font-bold text-heading text-center mb-10">Frequently Asked Questions</h2>

          <div className="space-y-3">

            {productFaqs.map((faq) => (

              <details key={faq.question} className="group bg-card rounded-xl border border-border p-5 open:shadow-sm">

                <summary className="flex items-center justify-between cursor-pointer font-semibold text-heading list-none">

                  {faq.question}

                  <ArrowRight className="w-4 h-4 shrink-0 text-primary transition-transform group-open:rotate-90" />

                </summary>

                <p className="mt-3 text-sm text-body leading-relaxed">{faq.answer}</p>

              </details>

            ))}

          </div>

        </div>

      </section>

      <script

        type="application/ld+json"

        dangerouslySetInnerHTML={{

          __html: JSON.stringify({

            '@context': 'https://schema.org',

            '@type': 'FAQPage',

            mainEntity: productFaqs.map((faq) => ({

              '@type': 'Question',

              name: faq.question,

              acceptedAnswer: { '@type': 'Answer', text: faq.answer },

            })),

          }),

        }}

      />

      {/* CTA Section */}

      <section className="py-12 md:py-16 bg-brand-gradient">

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">

            Ready to See It in Action?

          </h2>

          <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">

            Book a personalized demo and see how ChaloSchools fits your school&apos;s specific needs. No commitment, no pressure.

          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">

            <Button

              size="lg"

              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-6 text-base rounded-lg shadow-lg hover:shadow-xl transition-all"

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

              className="border-white/30 bg-transparent text-white hover:bg-card/10 font-semibold px-8 py-6 text-base rounded-lg transition-all"

              asChild

            >

              <Link href="/compare">

                Compare With Alternatives

                <ArrowRight className="w-5 h-5 ml-2" />

              </Link>

            </Button>

          </div>

        </div>

      </section>

    </>

  );

}

