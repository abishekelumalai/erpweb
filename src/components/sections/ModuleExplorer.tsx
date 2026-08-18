'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  CheckCircle2, ArrowRight,
  UserPlus, IndianRupee, ClipboardCheck, CalendarDays, MessageCircle, BarChart3,
  FileText, GraduationCap, Users, Wallet, Package, TrendingUp, Bot, BookOpen, Bus,
} from 'lucide-react';

// Brand gradient palette used site-wide, cycled by index so each module's
// selector pill gets a distinct icon color when inactive.
const GRADIENTS = [
  'from-[#026dde] to-[#00d4ff]',
  'from-[#f59e0b] to-[#fbbf24]',
  'from-[#10b981] to-[#34d399]',
  'from-[#8b5cf6] to-[#a78bfa]',
  'from-[#0891b2] to-[#22d3ee]',
  'from-[#e11d48] to-[#f87171]',
];

const SHADOWS = [
  'shadow-[#026dde]/20',
  'shadow-[#f59e0b]/20',
  'shadow-[#10b981]/20',
  'shadow-[#8b5cf6]/20',
  'shadow-[#0891b2]/20',
  'shadow-[#e11d48]/20',
];

// Icon components can't cross the Server -> Client Component boundary as props
// (React strips function references), so the modules array lives here instead
// of being passed in from product/page.tsx.
// Ordered to match the header nav's "Core Modules" then "Add-on Modules"
// grouping (see navDropdowns.Features in Header.tsx): the 8 core modules
// first, then Parent & Student App / Reports & Analytics (present here but
// not broken out in the nav's Core/Add-on lists), then the 4 add-ons that
// also appear in this 14-module set (Library and Transport are separate
// standalone feature pages, not part of this list).
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
    id: 'library',
    icon: BookOpen,
    accent: '#10b981',
    title: 'Library Management',
    tagline: 'A modern library — digitized and organized.',
    description:
      'Run your school library with barcode scanning, an online catalog, book issuance/returns, fines, and reservations. Students browse and reserve books right from the app.',
    features: [
      'Digital book catalog with search',
      'Barcode-based issuance and return',
      'Online reservation system',
      'Fine and overdue tracking',
      'Inventory management',
      'Reading progress tracking',
    ],
    stat: { value: '0', label: 'Manual issue registers' },
  },
  {
    id: 'transport',
    icon: Bus,
    accent: '#8b5cf6',
    title: 'Transport Management',
    tagline: 'Track every bus in real time, GPS-enabled.',
    description:
      'GPS-enabled bus tracking, route management, and driver information with real-time notifications to parents. Ensure student safety with live tracking on the parent app.',
    features: [
      'Real-time GPS bus tracking',
      'Route planning and optimization',
      'Parent live tracking on app',
      'Driver and attendant management',
      'Pickup/drop notifications',
      'Fleet maintenance tracking',
    ],
    stat: { value: 'Live', label: 'GPS bus tracking' },
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
];

// Click a module name to see its details below — replaces the old layout of
// stacking every module's full section one after another, which made the
// page extremely long to scroll through. Every detail panel is still
// rendered in the page (just visually hidden via CSS, not unmounted), so
// every module stays fully indexable by search engines and readable by
// anyone viewing page source — only the interactive browsing behavior
// changes for a sighted user with JS enabled.
// moduleImages holds admin-uploaded overrides (module id -> data URL), keyed
// exactly like the SiteContent rows `module_image_<id>`. Plain strings are
// safe to pass across the Server -> Client boundary (only icon *components*
// aren't), so the parent server component fetches these and passes them in.
export default function ModuleExplorer({ moduleImages }: { moduleImages?: Record<string, string> }) {
  const [activeId, setActiveId] = useState(modules[0].id);

  return (
    <section className="bg-surface-2 py-10 md:py-14" id="modules">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-heading mb-2">Explore All Modules</h2>
          <p className="text-subtle">Click a module below to see its details.</p>
        </div>

        {/* Module selector */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 md:mb-12">
          {modules.map((mod, i) => {
            const Icon = mod.icon;
            const isActive = mod.id === activeId;
            const gradient = GRADIENTS[i % GRADIENTS.length];
            const shadow = SHADOWS[i % SHADOWS.length];
            return (
              <button
                key={mod.id}
                type="button"
                onClick={() => setActiveId(mod.id)}
                aria-pressed={isActive}
                className={`flex items-center gap-2 pl-2 pr-4 py-1.5 rounded-full text-sm font-semibold border transition-all duration-200 ${
                  isActive
                    ? 'text-white shadow-md border-transparent'
                    : 'bg-card text-body border-border hover:border-[color-mix(in_srgb,var(--brand)_40%,transparent)]'
                }`}
                style={isActive ? { backgroundColor: 'var(--brand)' } : undefined}
              >
                {isActive ? (
                  <Icon className="w-4 h-4" />
                ) : (
                  <span className={`w-5 h-5 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center shrink-0 shadow-sm ${shadow}`}>
                    <Icon className="w-3 h-3 text-white" />
                  </span>
                )}
                {mod.title}
              </button>
            );
          })}
        </div>

        {/* Detail panels — all present in the DOM, only the active one visible */}
        {modules.map((mod, idx) => {
          const IconComp = mod.icon;
          const isActive = mod.id === activeId;
          return (
            <div key={mod.id} id={mod.id} className={isActive ? 'animate-fade-in-up' : 'hidden'}>
              <div className="bg-card rounded-2xl border border-border p-6 md:p-10">
                <div className="mb-8">
                  <Badge
                    variant="secondary"
                    className="mb-4 rounded-full px-3 py-1"
                    style={{ backgroundColor: 'color-mix(in srgb, var(--brand) 10%, transparent)', color: 'var(--brand)', borderColor: 'color-mix(in srgb, var(--brand) 20%, transparent)' }}
                  >
                    <IconComp className="w-3.5 h-3.5 mr-1.5" />
                    Module {idx + 1}
                  </Badge>
                  <h3 className="text-2xl md:text-3xl font-bold text-heading">{mod.title}</h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                  {/* Content */}
                  <div className="flex flex-col">
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

                  {/* Visual Card — a full image when the admin has uploaded
                      one for this module, otherwise the stat/pills card. */}
                  <div className="flex">
                    {moduleImages?.[mod.id] ? (
                      <div className="w-full rounded-2xl border border-border shadow-lg overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={moduleImages[mod.id]}
                          alt={mod.title}
                          className="w-full h-full min-h-[320px] object-cover"
                        />
                      </div>
                    ) : (
                      <Card className="border-border shadow-lg w-full flex flex-col">
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

                          <div
                            className="rounded-xl p-6 text-center"
                            style={{ backgroundColor: 'color-mix(in srgb, var(--brand) 8%, transparent)' }}
                          >
                            <div className="text-4xl md:text-5xl font-bold mb-2" style={{ color: 'var(--brand)' }}>
                              {mod.stat.value}
                            </div>
                            <p className="text-sm text-subtle font-medium">{mod.stat.label}</p>
                          </div>

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
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
