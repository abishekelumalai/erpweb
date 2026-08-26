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

/**
 * Simple module ID + title list for admin pages and lighter consumers.
 */
export const MODULE_IDS = MODULES.map((m) => ({ id: m.id, title: m.title }));
