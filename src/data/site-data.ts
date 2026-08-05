import {

  GraduationCap, CreditCard, ClipboardCheck, FileText, Calendar,

  Smartphone, Users, BookOpen, Bus, MessageSquare, BarChart3,

  LucideIcon

} from 'lucide-react';

export interface FeatureData {

  slug: string;

  title: string;

  shortTitle: string;

  headline: string;

  description: string;

  icon: LucideIcon;

  benefits: string[];

  features: string[];

  color: string;

  problems: string[];

  faqs: { q: string; a: string }[];

}

export interface SolutionData {

  slug: string;

  boardName: string;

  headline: string;

  description: string;

  features: string[];

  stats: { label: string; value: string }[];

}

export interface RoleData {

  slug: string;

  roleName: string;

  headline: string;

  description: string;

  points: string[];

}

export const features: FeatureData[] = [

  {

    slug: 'admissions',

    title: 'Admissions Management',

    shortTitle: 'Admissions',

    headline: 'Turn Enquiries into Admissions, Without the Paperwork',

    description: 'Stop tracking enquiries in registers and spreadsheets. ChaloSchools digitizes your entire admissions pipeline — online applications, automated follow-ups, and document verification — so no lead is ever lost.',

    icon: GraduationCap,

    color: '#026dde',

    problems: [

      'Manual enquiry tracking in registers or spreadsheets',

      'Lost follow-ups with prospective parents',

      'No online application option for parents',

    ],

    benefits: [

      'Online application forms with custom fields',

      'Enquiry-to-admission pipeline tracking',

      'Automated SMS/email follow-ups',

      'Document upload and verification',

      'Admission status dashboard for management',

      'Reduce admission cycle time by up to 50%',

    ],

    features: [

      'Online Applications',

      'Enquiry Management',

      'Document Verification',

      'Seat Allocation',

      'Admission Status Portal',

      'Custom Form Builder',

    ],

    faqs: [

      { q: 'Can parents apply online?', a: 'Yes — parents complete custom online application forms and upload documents from any device, with no paperwork required.' },

      { q: 'How are follow-ups handled?', a: 'Automated SMS/email follow-ups keep every enquiry warm, so no lead slips through the cracks.' },

    ],

  },

  {

    slug: 'fees',

    title: 'Fees & Finance',

    shortTitle: 'Fees',

    headline: 'Collect Fees On Time, Every Time',

    description: 'No more manual receipts, delayed reminders, or guesswork on collections. Collect fees online, automate reminders via SMS/WhatsApp, and track defaulters in real time — with audit-ready reports for management.',

    icon: CreditCard,

    color: '#f59e0b',

    problems: [

      'Manual fee receipts and reconciliation',

      'Delayed reminders to defaulting parents',

      'No real-time view of collection vs. dues',

    ],

    benefits: [

      'Online fee payment (UPI, cards, net banking)',

      'Auto-reminders via SMS & WhatsApp',

      'Defaulter tracking dashboard',

      'Installment & concession management',

      'Financial reports for management & auditors',

      'Faster collections with fewer manual follow-ups',

    ],

    features: [

      'Fee Collection',

      'Online Payments',

      'Auto Reminders',

      'Receipt Generation',

      'Fee Defaulter Reports',

      'Scholarship Management',

    ],

    faqs: [

      { q: 'Which payment methods are supported?', a: 'Parents can pay via UPI, cards, and net banking online, with receipts generated automatically.' },

      { q: 'Can we manage installments and concessions?', a: 'Yes — set up multi-installment plans, apply concessions/scholarships, and track it all from one dashboard.' },

    ],

  },

  {

    slug: 'attendance',

    title: 'Attendance Tracking',

    shortTitle: 'Attendance',

    headline: 'Real-Time Attendance, Zero Manual Registers',

    description: 'Replace error-prone paper registers with biometric, RFID, or app-based check-in. Parents get instant absence alerts, and management gets consolidated attendance reports across every class.',

    icon: ClipboardCheck,

    color: '#10b981',

    problems: [

      'Paper attendance registers prone to errors',

      'Parents unaware of absences until much later',

      'No consolidated attendance reports for management',

    ],

    benefits: [

      'Biometric / RFID / mobile app check-in',

      'Instant absence alerts to parents',

      'Period-wise & subject-wise attendance',

      'Staff attendance and leave management',

      'Daily/weekly/monthly reports',

      'Single source of truth for all attendance metrics',

    ],

    features: [

      'Student Attendance',

      'Staff Attendance',

      'Parent Alerts',

      'Leave Management',

      'Analytics Dashboard',

      'Biometric Integration',

    ],

    faqs: [

      { q: 'What check-in methods are supported?', a: 'Biometric, RFID, and mobile app check-in are all supported for both students and staff.' },

      { q: 'Are parents notified of absences?', a: 'Yes — parents receive an instant alert the moment their child is marked absent.' },

    ],

  },

  {

    slug: 'exams',

    title: 'Exam & Marks Portal',

    shortTitle: 'Exams',

    headline: 'From Exam Schedules to Report Cards, Automated',

    description: 'Manage the full exam cycle — schedule exams, enter marks digitally, auto-generate report cards, and publish results online. Parents view marks in real time through the app.',

    icon: FileText,

    color: '#8b5cf6',

    problems: [

      'Manual mark entry across scattered sheets',

      'Slow, error-prone report card generation',

      'Parents wait days for results',

    ],

    benefits: [

      'Flexible exam scheduling',

      'Digital mark entry and grade calculation',

      'Automated report card generation',

      'Online result publication',

      'Performance analytics and trends',

      'Board-specific grading formats (CBSE/ICSE/State)',

    ],

    features: [

      'Exam Scheduling',

      'Mark Entry',

      'Report Cards',

      'Online Results',

      'Grade Analytics',

      'CBSE/ICSE Formats',

    ],

    faqs: [

      { q: 'Does it support our board format?', a: 'Yes — report cards and grading scales support CBSE, ICSE, and State Board formats.' },

      { q: 'How do parents see results?', a: 'Results publish online and parents view marks in real time through the parent app.' },

    ],

  },

  {

    slug: 'timetable',

    title: 'Timetable Scheduler',

    shortTitle: 'Timetable',

    headline: 'AI-Generated Timetables, Zero Conflicts',

    description: 'Generate conflict-free timetables that respect teacher availability, room constraints, and subject load. Substitution management handles last-minute absences without disrupting the school day.',

    icon: Calendar,

    color: '#ef4444',

    problems: [

      'Manual timetabling takes days and still has clashes',

      'Last-minute teacher absences disrupt the day',

      'Balancing teacher workload is guesswork',

    ],

    benefits: [

      'AI-powered conflict-free generation',

      'Teacher workload balancing & preferences',

      'Room and lab allocation management',

      'Instant substitution on teacher absence',

      'Multi-shift and multi-section support',

      'Share schedules with teachers and parents instantly',

    ],

    features: [

      'Auto Generation',

      'Substitution Management',

      'Room Allocation',

      'Teacher Calendar',

      'Period Management',

      'Conflict Detection',

    ],

    faqs: [

      { q: 'How long does generating a timetable take?', a: 'The AI generates a conflict-free timetable in minutes, respecting teacher, room, and subject constraints.' },

      { q: 'What happens when a teacher is absent?', a: 'Substitution management instantly assigns a substitute without disrupting the rest of the schedule.' },

    ],

  },

  {

    slug: 'parent-app',

    title: 'Parent & Student App',

    shortTitle: 'Parent App',

    headline: 'Keep Parents Informed, Involved, and Happy',

    description: 'A dedicated mobile app for parents and students — attendance, marks, fees, homework, bus tracking, and direct teacher chat in one place. Replace the 50+ WhatsApp groups your school manages today.',

    icon: Smartphone,

    color: '#026dde',

    problems: [

      'Fragmented communication across dozens of WhatsApp groups',

      'Parents lack real-time updates on their child',

      'Circulars and homework get lost',

    ],

    benefits: [

      'Real-time attendance and bus tracking',

      'Exam results and progress reports',

      'Fee payment and receipt download',

      'Direct messaging with class teacher',

      'Homework and circular notifications',

      'Event calendar and photo gallery',

    ],

    features: [

      'Attendance Alerts',

      'Marks View',

      'Fee Payments',

      'Homework Updates',

      'Chat with Teachers',

      'Digital ID Card',

    ],

    faqs: [

      { q: 'Is the app available on Android and iOS?', a: 'Yes — dedicated apps are available for both Android and iOS for parents and students.' },

      { q: 'Does it replace our WhatsApp groups?', a: 'Yes — attendance, fees, homework, and teacher chat live in one place, replacing scattered WhatsApp groups.' },

    ],

  },

  {

    slug: 'staff-hr',

    title: 'Staff & Payroll Module',

    shortTitle: 'Staff & Payroll',

    headline: 'Manage Your Entire Staff — Effortlessly',

    description: 'From recruitment to payroll, manage teaching and non-teaching staff from one module. Track attendance, leave, appraisals, and documents without the spreadsheets.',

    icon: Users,

    color: '#f59e0b',

    problems: [

      'Staff records scattered across files and spreadsheets',

      'Manual payroll and leave calculation',

      'No structured appraisal or onboarding process',

    ],

    benefits: [

      'Employee profiles and document management',

      'Leave and attendance tracking',

      'Payroll processing',

      'Performance appraisal system',

      'Recruitment and onboarding',

      'Training and development tracking',

    ],

    features: [

      'Staff Profiles',

      'Leave Management',

      'Payroll',

      'Appraisals',

      'Recruitment',

      'Document Management',

    ],

    faqs: [

      { q: 'Does it handle payroll?', a: 'Yes — payroll processing is built in, using tracked attendance and leave data.' },

      { q: 'Can we manage both teaching and non-teaching staff?', a: 'Yes — the module covers all staff, from profiles and documents to appraisals and recruitment.' },

    ],

  },

  {

    slug: 'library',

    title: 'Library Management',

    shortTitle: 'Library',

    headline: 'A Modern Library — Digitized and Organized',

    description: 'Run your school library with barcode scanning, an online catalog, book issuance/returns, fines, and reservations. Students browse and reserve books right from the app.',

    icon: BookOpen,

    color: '#10b981',

    problems: [

      'Manual register-based book issuance',

      'No easy way to search or reserve books',

      'Overdue and fine tracking is manual',

    ],

    benefits: [

      'Digital book catalog with search',

      'Barcode-based issuance and return',

      'Online reservation system',

      'Fine and overdue tracking',

      'Inventory management',

      'Reading progress tracking',

    ],

    features: [

      'Book Catalog',

      'Issuance & Returns',

      'Barcode Scanner',

      'Online Reservations',

      'Fine Management',

      'Inventory Reports',

    ],

    faqs: [

      { q: 'Can students reserve books online?', a: 'Yes — students browse the catalog and reserve books directly from the app.' },

      { q: 'How are fines handled?', a: 'Overdue tracking and fine calculation are automatic, with clear records for each student.' },

    ],

  },

  {

    slug: 'transport',

    title: 'Transport Tracking',

    shortTitle: 'Transport',

    headline: 'Track Every Bus in Real Time — GPS Enabled',

    description: 'GPS-enabled bus tracking, route management, and driver information with real-time notifications to parents. Ensure student safety with live tracking on the parent app.',

    icon: Bus,

    color: '#8b5cf6',

    problems: [

      'Parents anxious about bus location and safety',

      'No visibility into routes and delays',

      'Manual driver and fleet records',

    ],

    benefits: [

      'Real-time GPS bus tracking',

      'Route planning and optimization',

      'Parent live tracking on app',

      'Driver and attendant management',

      'Pickup/drop notifications',

      'Fleet maintenance tracking',

    ],

    features: [

      'GPS Tracking',

      'Route Management',

      'Parent Alerts',

      'Driver Profiles',

      'Fleet Management',

      'Maintenance Logs',

    ],

    faqs: [

      { q: 'Can parents track the bus live?', a: 'Yes — parents see the bus location in real time on the app, with pickup and drop notifications.' },

      { q: 'Does it manage drivers and fleet?', a: 'Yes — driver profiles, route planning, and fleet maintenance are all tracked in one place.' },

    ],

  },

  {

    slug: 'whatsapp',

    title: 'WhatsApp Notifications',

    shortTitle: 'WhatsApp',

    headline: 'Reach Parents on WhatsApp — At Scale',

    description: 'Send automated WhatsApp messages for attendance, fees, exams, and announcements. Reach parents instantly on the platform they use most — no app download needed.',

    icon: MessageSquare,

    color: '#25D366',

    problems: [

      'Announcements fail to reach parents on time',

      'Email and SMS get ignored',

      'No way to message all parents at scale',

    ],

    benefits: [

      'Automated attendance alerts',

      'Fee reminder and receipt messages',

      'Exam schedule notifications',

      'School announcements broadcast',

      'Two-way communication with parents',

      'WhatsApp Business API integration',

    ],

    features: [

      'Attendance Alerts',

      'Fee Reminders',

      'Exam Notifications',

      'Bulk Broadcast',

      'Two-Way Chat',

      'Template Library',

    ],

    faqs: [

      { q: 'Do parents need to install an app?', a: 'No — messages are delivered on WhatsApp, the platform parents already use every day.' },

      { q: 'Is this official WhatsApp?', a: 'Yes — it uses the official WhatsApp Business API for reliable, compliant messaging.' },

    ],

  },

  {

    slug: 'reports',

    title: 'Reports & Analytics',

    shortTitle: 'Reports',

    headline: 'Data-Driven Decisions, Not Gut Feelings',

    description: 'Pre-built and custom reports across academics, finance, HR, and operations. Visual dashboards with real-time data help school leaders make informed decisions quickly.',

    icon: BarChart3,

    color: '#026dde',

    problems: [

      'Management relies on manual, delayed reporting',

      'Data is scattered across modules',

      'No single view of school performance',

    ],

    benefits: [

      '100+ pre-built report templates',

      'Visual analytics dashboard',

      'Custom report builder with drag-and-drop',

      'Export to PDF, Excel, CSV',

      'Scheduled automated reports',

      'Comparative year-on-year analysis',

    ],

    features: [

      'Dashboard Analytics',

      'Custom Reports',

      'Data Export',

      'Scheduled Reports',

      'Trend Analysis',

      'Drill-Down Views',

    ],

    faqs: [

      { q: 'How many reports are available?', a: 'Over 100 pre-built report templates span academics, finance, HR, and operations, plus a custom report builder.' },

      { q: 'Can reports be exported and scheduled?', a: 'Yes — export to PDF, Excel, or CSV, and schedule automated reports to stakeholders.' },

    ],

  },

];

export const solutions: SolutionData[] = [

  {

    slug: 'pre-school',

    boardName: 'Pre School',

    headline: 'Built for the Way Pre-Schools Work',

    description: 'A gentle, parent-friendly ERP designed for play schools and pre-primary education. Simple daily activity and milestone tracking, photo/video parent updates, and easy term-based billing — without complex exam modules.',

    features: [

      'Simplified daily activity & milestone tracking',

      'Parent app with photo/video updates',

      'Easy fee collection for term-based billing',

      'No complex exam/grading — kept simple for early learning',

      'Attendance with check-in/check-out',

      'Progress & development reports',

    ],

    stats: [

      { label: 'Activity Domains Tracked', value: 'All' },

      { label: 'Parent Satisfaction', value: '98%' },

      { label: 'Daily Check-Ins', value: '10K+' },

    ],

  },

  {

    slug: 'state-cbse',

    boardName: 'State & CBSE',

    headline: 'Aligned to CBSE & State Board Requirements',

    description: 'Tailored for State Board and CBSE schools with compliant report card formats, term and unit-test structured exams, and board-mandated compliance management — built to handle high-enrolment schools.',

    features: [

      'CBSE/State Board-compliant report card formats',

      'Term & unit-test structured exam management',

      'Board-mandated compliance & document management',

      'Bulk admission handling for high-enrolment schools',

      'TC & transfer certificate generation',

      'Scholastic & co-scholastic tracking',

    ],

    stats: [

      { label: 'Report Card Formats', value: 'CBSE + State' },

      { label: 'State Boards Supported', value: '15+' },

      { label: 'Modules Available', value: '19+' },

    ],

  },

  {

    slug: 'ib',

    boardName: 'IB Schools',

    headline: 'Flexible Enough for the IB Curriculum',

    description: 'Designed for IB PYP, MYP, and DP programmes with custom assessment and narrative report formats, unit planning, and flexible timetabling for subject blocks and electives.',

    features: [

      'Custom assessment & narrative report card formats',

      'Unit planner & PYP/MYP/DP-aligned tracking',

      'Multi-language parent communication support',

      'Flexible timetabling for subject blocks & electives',

      'Extended Essay & CAS tracking',

      'Internal assessment management',

    ],

    stats: [

      { label: 'IB Curriculum', value: 'Full' },

      { label: 'Programmes Covered', value: 'PYP/MYP/DP' },

      { label: 'Assessment Types', value: 'All IB' },

    ],

  },

  {

    slug: 'cambridge',

    boardName: 'Cambridge',

    headline: 'Purpose-Built for Cambridge Curriculum Schools',

    description: 'Optimized for Cambridge IGCSE, O-Level, and A-Level schools. Stage-wise academic tracking, Cambridge-format report cards and grading scales, and international fee/currency support.',

    features: [

      'Stage-wise (Primary / Lower & Upper Secondary) tracking',

      'Cambridge-format report cards & grading scales',

      'Subject-wise teacher and timetable management',

      'International fee currency & billing support',

      'Checkpoint assessment management',

      'Progress & predicted grades',

    ],

    stats: [

      { label: 'Cambridge Stages', value: 'All' },

      { label: 'Levels Supported', value: 'All' },

      { label: 'Countries', value: '5+' },

    ],

  },

  {

    slug: 'montessori',

    boardName: 'Montessori',

    headline: 'Designed for Individualized, Activity-Based Learning',

    description: 'A Montessori-aligned ERP that respects the child-centric approach. Track activity and material-based progress, document individual learning plans, and share developmental milestones with parents.',

    features: [

      'Activity & material-based progress tracking (not just marks)',

      'Individual learning plan documentation per child',

      'Parent updates focused on developmental milestones',

      'Flexible, non-traditional timetable structures',

      'Mixed-age group management',

      'Observational assessment',

    ],

    stats: [

      { label: 'Child-Centric', value: '100%' },

      { label: 'Development Domains', value: 'All 5' },

      { label: 'Parent Engagement', value: '95%' },

    ],

  },

  {

    slug: 'matric',

    boardName: 'Matric / Higher Education',

    headline: 'End-to-End Management for Matric & Higher Secondary Schools',

    description: 'Comprehensive management for Matriculation and higher-secondary institutions. Stream-wise class and section management, board exam readiness tracking, and higher-secondary specific timetabling and electives.',

    features: [

      'Stream-wise (Science/Commerce/Arts) class & section management',

      'Board exam readiness tracking & internal assessments',

      'Higher-secondary specific timetable & elective handling',

      'Alumni & higher-education transition tracking',

      'Semester & credit management',

      'Compliance reporting',

    ],

    stats: [

      { label: 'Streams Supported', value: 'Sci/Com/Arts' },

      { label: 'Board Exam Ready', value: 'Yes' },

      { label: 'Departments Managed', value: '200+' },

    ],

  },

];

export const roles: RoleData[] = [

  {

    slug: 'school-owners',

    roleName: 'School Owners',

    headline: 'Run Your School Like a Business, With Full Visibility',

    description: 'Get complete visibility and control over every school operation, from one dashboard — so you can grow with confidence and cut your dependency on manual reporting.',

    points: [

      'Consolidated dashboard across admissions, fees, academics & staff',

      'Multi-branch management for school groups & trusts',

      'ROI and growth analytics',

      'Reduced dependency on manual reporting from staff',

    ],

  },

  {

    slug: 'principals',

    roleName: 'Principals',

    headline: 'Lead Your School, Not Its Paperwork',

    description: 'Manage academics, staff, and student performance without the daily paperwork — with real-time oversight and quick approvals wherever you are.',

    points: [

      'Real-time academic & attendance oversight',

      'Staff performance & leave management at a glance',

      'Quick approvals for circulars, leave & admissions',

      'Parent communication oversight',

    ],

  },

  {

    slug: 'teachers',

    roleName: 'Teachers',

    headline: 'Less Admin Work, More Teaching Time',

    description: 'Spend less time on admin and more time teaching, with simple digital tools for attendance, marks, and parent communication.',

    points: [

      'Quick attendance marking via app',

      'Simplified marks & assignment entry',

      'Direct messaging with parents',

      'Auto-generated timetables & substitution alerts',

    ],

  },

  {

    slug: 'parents',

    roleName: 'Parents',

    headline: "Stay Connected to Your Child's School Life",

    description: "Stay updated on your child's attendance, fees, and academic progress, instantly — and pay fees without the queues.",

    points: [

      'Real-time attendance & academic updates',

      'Online fee payment, no more queues',

      'Direct communication with teachers',

      'Bus tracking & safety notifications',

    ],

  },

  {

    slug: 'accountants',

    roleName: 'Accountants',

    headline: 'Fee Collection & Reconciliation, Without the Spreadsheets',

    description: 'Simplify fee collection, reconciliation, and financial reporting for your school — with audit-ready statements and real-time defaulter tracking.',

    points: [

      'Automated fee collection & receipt generation',

      'Real-time defaulter & collection reports',

      'Audit-ready financial statements',

      'Easy reconciliation across payment modes',

    ],

  },

];

export function getFeatureBySlug(slug: string): FeatureData | undefined {

  return features.find(f => f.slug === slug);

}

export function getSolutionBySlug(slug: string): SolutionData | undefined {

  return solutions.find(s => s.slug === slug);

}

export function getRoleBySlug(slug: string): RoleData | undefined {

  return roles.find(r => r.slug === slug);

}

