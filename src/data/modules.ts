/**
 * Shared module constants for the Chalo Schools platform.
 * Used by: ModuleExplorer, Admin Module Images, Sitemap, Feature pages.
 *
 * IMPORTANT: Keep `id` and `title` in sync across all consumers.
 * If you add/remove a module here, update the admin modules page too.
 */

export interface ModuleDef {
  id: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  stat: { value: string; label: string };
  accent: string;
}

export const MODULES: ModuleDef[] = [
  {
    id: 'admissions',
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
    accent: '#8b5cf6',
    title: 'Timetable Scheduler',
    tagline: 'AI-generated, zero conflicts, instant updates.',
    description:
      'Generate optimal timetables that respect teacher availability, room constraints, and subject load balancing. Handle substitutions in real time with one-click reassignment.',
    features: [
      'AI-powered timetable generation',
      'Teacher availability constraints',
      'Room and lab allocation',
      'Substitution management',
      'Period-wise and day-wise views',
      'Export to PDF/Excel',
    ],
    stat: { value: '0', label: 'Conflicts (always)' },
  },
  {
    id: 'attendance',
    accent: '#10b981',
    title: 'Attendance Tracking',
    tagline: 'Mark, monitor, and act — in real time.',
    description:
      'Biometric, RFID, or app-based attendance for students and staff. Automated alerts for absentees, late arrivals, and patterns that need attention.',
    features: [
      'Biometric & RFID device integration',
      'App-based marking for teachers',
      'Auto SMS/WhatsApp to parents on absence',
      'Period-wise and day-wise tracking',
      'Attendance analytics and trends',
      'Late arrival and early departure alerts',
    ],
    stat: { value: '99.2%', label: 'Marking accuracy' },
  },
  {
    id: 'exams',
    accent: '#e11d48',
    title: 'Academic & Examination',
    tagline: 'From hall tickets to report cards — automated.',
    description:
      'Design exam schedules, assign invigilators, enter marks, compute results, and publish report cards — all within the platform.',
    features: [
      'Exam schedule builder',
      'Mark entry with validation',
      'Automated result computation (GPA/percentage)',
      'Report card generation (CBSE/ICSE/State)',
      'Hall ticket printing',
      'Performance analytics by subject/class',
    ],
    stat: { value: '10K+', label: 'Report cards generated/term' },
  },
  {
    id: 'communication',
    accent: '#0891b2',
    title: 'Communication Management',
    tagline: 'Reach every parent, every time.',
    description:
      'Send circulars, fee reminders, and event updates via SMS, WhatsApp, push notification, and in-app messaging — all from one unified console.',
    features: [
      'Multi-channel: SMS, WhatsApp, Push, In-app',
      'Targeted messaging by class/section/group',
      'Circular and announcement broadcast',
      'Fee reminder automation',
      'Read receipts and delivery tracking',
      'Template library for common messages',
    ],
    stat: { value: '50K+', label: 'Messages sent/month' },
  },
  {
    id: 'reports',
    accent: '#026dde',
    title: 'Reports & Analytics',
    tagline: 'Data-driven decisions for school leaders.',
    description:
      'Visual dashboards for admissions funnels, fee collection, attendance trends, academic performance, and staff productivity — exportable to PDF/Excel.',
    features: [
      'Real-time dashboards',
      'Custom report builder',
      'Admission funnel analytics',
      'Fee collection tracking',
      'Academic performance heatmaps',
      'Export to PDF/Excel/CSV',
    ],
    stat: { value: '30+', label: 'Pre-built reports' },
  },
  {
    id: 'inventory',
    accent: '#f59e0b',
    title: 'Academic Inventory Tracking',
    tagline: 'Track every asset, from books to lab equipment.',
    description:
      'Manage school assets — books, lab equipment, sports gear, furniture — with issue/return workflows, low-stock alerts, and depreciation tracking.',
    features: [
      'Asset register with categories',
      'Issue and return workflows',
      'Low-stock alerts',
      'Depreciation tracking',
      'Vendor management',
      'Barcode/QR scanning support',
    ],
    stat: { value: '5,000+', label: 'Assets tracked' },
  },
  {
    id: 'payroll',
    accent: '#8b5cf6',
    title: 'Payroll Management',
    tagline: 'Salary processing, simplified.',
    description:
      'Configure salary structures, process monthly payroll, generate payslips, and handle statutory compliance (PF, ESI, TDS) — all integrated with attendance and leave data.',
    features: [
      'Configurable salary components',
      'One-click monthly processing',
      'Auto payslip generation',
      'PF, ESI, TDS compliance',
      'Attendance-linked deductions',
      'Bank transfer file generation',
    ],
    stat: { value: '350+', label: 'Staff paid monthly' },
  },
  {
    id: 'library',
    accent: '#10b981',
    title: 'Library Management',
    tagline: 'Every book accounted for.',
    description:
      'Catalogue your library, manage book issues/returns, send overdue reminders, and track reading patterns — with barcode scanning support.',
    features: [
      'Book cataloguing with ISBN lookup',
      'Issue and return tracking',
      'Overdue reminders (SMS/app)',
      'Student reading history',
      'Fine management',
      'Barcode scanning',
    ],
    stat: { value: '12K+', label: 'Books catalogued' },
  },
  {
    id: 'transport',
    accent: '#e11d48',
    title: 'Transport Management',
    tagline: 'Safe, tracked, on time.',
    description:
      'Plan routes, assign vehicles, track buses in real time via GPS, and notify parents on pickup/drop. Manage transport fees and driver details in one place.',
    features: [
      'Route planning and optimization',
      'Real-time GPS tracking',
      'Parent pickup/drop notifications',
      'Vehicle and driver management',
      'Transport fee integration',
      'Attendance at bus stops',
    ],
    stat: { value: '25', label: 'Routes managed' },
  },
  {
    id: 'performance-insights',
    accent: '#0891b2',
    title: 'Inspace Performance Insights',
    tagline: 'AI-powered school health scoring.',
    description:
      'An intelligent layer that scores your school across admissions, finance, academics, and operations — highlighting what needs attention before it becomes a problem.',
    features: [
      'School health score (0–100)',
      'Department-wise performance breakdown',
      'Trend analysis and forecasting',
      'Automated recommendations',
      'Benchmark against similar schools',
      'Monthly insight reports',
    ],
    stat: { value: '87', label: 'Avg school health score' },
  },
  {
    id: 'ai-secretary',
    accent: '#8b5cf6',
    title: 'AI Secretary',
    tagline: 'Your intelligent school assistant.',
    description:
      'An AI-powered conversational assistant for school admins — answer parent queries, draft circulars, summarize reports, and get instant insights from your school data.',
    features: [
      'Natural language queries on school data',
      'Auto-draft circulars and messages',
      'Parent query resolution',
      'Report summarization',
      'Smart scheduling suggestions',
      'Multi-language support',
    ],
    stat: { value: '500+', label: 'Queries resolved/month' },
  },
  {
    id: 'parent-app',
    accent: '#026dde',
    title: 'Parent & Student App',
    tagline: 'Everything parents need, in their pocket.',
    description:
      'A dedicated mobile app for parents — attendance updates, fee payments, exam results, homework, circulars, and direct communication with teachers.',
    features: [
      'Real-time attendance notifications',
      'Online fee payment (UPI/cards)',
      'Report card and progress view',
      'Homework and assignment tracking',
      'Circular and event updates',
      'Teacher chat',
    ],
    stat: { value: '95%', label: 'Parent adoption rate' },
  },
];

/**
 * Simple module ID + title list for admin pages and lighter consumers.
 */
export const MODULE_IDS = MODULES.map((m) => ({ id: m.id, title: m.title }));
