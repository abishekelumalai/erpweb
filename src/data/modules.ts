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
  /** Optional closing sentence shown after the feature list, before the Learn More link. */
  outro?: string;
  stat: { value: string; label: string };
  accent: string;
}

export const MODULES: ModuleDef[] = [
  {
    id: 'admissions',
    accent: '#026dde',
    title: 'Admissions Management',
    tagline: 'Make every admission step easier to manage.',
    description:
      'Bring enquiries, applications, documents and enrollment together within your ChaloSchools school management system. The integrated admission management module helps your admissions team organize the complete journey, from the first enquiry to student enrollment, without relying on disconnected spreadsheets and paperwork.',
    features: [
      'Create customized online admission forms',
      'Capture and organize prospective student enquiries',
      'Collect and verify applicant documents',
      'Track applications through different admission stages',
      'Manage interviews, follow-ups and enrollment',
      'Monitor admission activity and conversion trends',
    ],
    outro: 'Manage your complete admission workflow as part of an integrated school management software platform.',
    stat: { value: '342', label: 'Applications processed/week' },
  },
  {
    id: 'student',
    accent: '#f59e0b',
    title: 'Student Management',
    tagline: "Keep every student's information organized in one place.",
    description:
      "Create a centralized student record within your ChaloSchools school management software. The student management module connects personal information, academic history, documents and family details, giving administrators a reliable view of each student's journey throughout the school.",
    features: [
      'Maintain detailed student profiles and contact information',
      'Organize academic records across school years',
      'Store certificates and important student documents',
      'Maintain parent, guardian and sibling information',
      'Manage student promotion and progression',
      'Quickly search and access student information',
    ],
    outro: 'Manage student information as part of a complete school ERP, with a centralized student database management system and student record management system.',
    stat: { value: '2,450', label: 'Student profiles managed' },
  },
  {
    id: 'staff',
    accent: '#026dde',
    title: 'Staff Management',
    tagline: "Manage your school's people, roles and responsibilities with confidence.",
    description:
      'Centralize staff information and day-to-day workforce administration within your ChaloSchools school management system. The staff management module gives school administrators an organized way to maintain employee records, manage access, monitor attendance and handle leave-related activities.',
    features: [
      'Maintain centralized staff profiles and documents',
      'Organize departments, roles and responsibilities',
      'Control access based on staff roles',
      'Track staff attendance and leave',
      'Manage leave requests and approvals',
      'Maintain appraisal and performance information',
    ],
    outro: 'Manage employee records and workforce activities as part of your complete school management platform.',
    stat: { value: '45', label: 'Staff members tracked' },
  },
  {
    id: 'fees',
    accent: '#f59e0b',
    title: 'Fees & Finance',
    tagline: 'Bring collections, payments and dues under control.',
    description:
      'Simplify financial administration through the fee management module of your ChaloSchools school ERP software. Set up flexible fee structures, monitor collections, manage concessions and give parents convenient payment options while keeping financial information accessible to authorized administrators.',
    features: [
      'Configure fees for different classes and categories',
      'Set instalments and customized payment schedules',
      'Track collections, pending dues and overdue payments',
      'Manage concessions and scholarships',
      'Enable online fee payment options',
      'Generate receipts and financial reports',
    ],
    stat: { value: '₹18.4L', label: 'Collected per month (avg school)' },
  },
  {
    id: 'timetable',
    accent: '#8b5cf6',
    title: 'Timetable Scheduler',
    tagline: 'Build practical school schedules with fewer conflicts.',
    description:
      'Plan classes, subjects, teachers and sections through the timetable module within ChaloSchools. As part of the overall school management software, the scheduler helps administrators create organized timetables while considering teacher availability, workload and classroom requirements.',
    features: [
      'Create timetables for classes and sections',
      'Identify scheduling conflicts before publishing',
      'Balance teacher workloads across periods',
      'Manage multiple shifts and sections',
      'Handle teacher substitutions when required',
      'Share timetables digitally or export them for printing',
    ],
    outro: 'Create and manage school schedules through an integrated timetable module within your school ERP.',
    stat: { value: '0', label: 'Scheduling conflicts' },
  },
  {
    id: 'attendance',
    accent: '#10b981',
    title: 'Attendance Tracking',
    tagline: 'Make daily attendance faster, clearer and more reliable.',
    description:
      'Track student and staff attendance through the attendance module of ChaloSchools school management system. Schools can record attendance digitally, connect supported attendance devices and give parents timely updates about student absences.',
    features: [
      'Record class-wise student attendance',
      'Support biometric and RFID integrations',
      'Track attendance across different periods',
      'Manage staff leave and attendance',
      'Notify parents about student absences',
      'Review attendance patterns and trends',
    ],
    outro: 'Manage daily attendance as part of your complete school management software, with centralized records and attendance insights.',
    stat: { value: '96.8%', label: 'Average attendance rate' },
  },
  {
    id: 'exams',
    accent: '#8b5cf6',
    title: 'Academic & Examination',
    tagline: 'Connect academic activities, assessments and results.',
    description:
      "Manage the examination and academic workflow through ChaloSchools' integrated academic module. From assessment planning and marks entry to grading and report cards, schools can manage academic information within the same school management software used for their other operations.",
    features: [
      'Plan examinations and assessment schedules',
      'Enter marks and assessment results digitally',
      'Automate grade calculations',
      'Generate student report cards',
      'Publish results through connected parent and student apps',
      'Analyze performance by student, class and subject',
    ],
    stat: { value: '360°', label: 'Result analytics per student' },
  },
  {
    id: 'communication',
    accent: '#10b981',
    title: 'Communication Management',
    tagline: 'Keep parents, teachers and school teams connected.',
    description:
      "Make school communication more organized with ChaloSchools' communication module. Instead of depending on multiple disconnected channels, schools can use their school management platform to share announcements, reminders, alerts and important updates with the right groups.",
    features: [
      'Send class-wise and school-wide announcements',
      'Connect WhatsApp and SMS communication',
      'Share important alerts and reminders',
      'Keep parents updated about school activities',
      'Enable parent-teacher communication',
      'Monitor message delivery and engagement',
    ],
    stat: { value: '1,842', label: 'Parents reached instantly' },
  },
  {
    id: 'reports',
    accent: '#026dde',
    title: 'Reports & Analytics',
    tagline: 'Turn school data into meaningful management insights.',
    description:
      'Bring operational and academic information together through the reporting and analytics capabilities of ChaloSchools. Management teams can view information from different areas of their school management system to identify trends, monitor performance and make informed decisions.',
    features: [
      'Access ready-to-use management reports',
      'Create reports based on specific requirements',
      'View key information through management dashboards',
      'Compare performance across academic periods',
      'Export reports for meetings and analysis',
      'Monitor operational and academic indicators',
    ],
    stat: { value: '50+', label: 'Pre-built report templates' },
  },
  {
    id: 'inventory',
    accent: '#026dde',
    title: 'Academic Inventory Tracking',
    tagline: 'Keep track of every resource your school depends on.',
    description:
      'Manage academic assets and inventory within your ChaloSchools school ERP. From laboratory equipment and sports materials to furniture and departmental resources, schools can maintain better visibility over what they have, where it is being used and what needs attention.',
    features: [
      'Maintain digital inventory records',
      'Monitor stock across departments',
      'Track asset allocation and movement',
      'Identify low-stock items',
      'Maintain purchase and vendor information',
      'Use barcode or QR-based identification',
    ],
    stat: { value: '0', label: 'Stockouts this term' },
  },
  {
    id: 'payroll',
    accent: '#f59e0b',
    title: 'Payroll Management',
    tagline: 'Simplify the administrative work behind every salary cycle.',
    description:
      "Connect employee information, attendance and payroll activities through ChaloSchools' payroll module. As part of the wider school management system, it helps schools reduce repetitive calculations and maintain organized salary and statutory information.",
    features: [
      'Calculate monthly salaries systematically',
      'Connect attendance information with payroll',
      'Manage PF, ESI and TDS information',
      'Generate digital payslips',
      'Track loans, advances and deductions',
      'Prepare payroll information for payment processing',
    ],
    stat: { value: '0', label: 'Manual calculation errors' },
  },
  {
    id: 'library',
    accent: '#10b981',
    title: 'Library Management',
    tagline: 'Give your school library a simpler digital workflow.',
    description:
      'Organize books, circulation and library records through the library module in ChaloSchools. The school management software brings library operations into the same connected environment, making it easier to search books, manage issues and returns and monitor availability.',
    features: [
      'Maintain a searchable digital book catalog',
      'Record book issues and returns',
      'Support barcode-based circulation',
      'Manage reservations and availability',
      'Track overdue books and fines',
      'Monitor library inventory and usage',
    ],
    stat: { value: '0', label: 'Manual issue registers' },
  },
  {
    id: 'transport',
    accent: '#8b5cf6',
    title: 'Transport Management',
    tagline: 'Make school transportation easier to monitor and manage.',
    description:
      "Manage vehicles, routes, drivers and student transportation through ChaloSchools' transport module. Integrated into the overall school management system, it gives administrators greater visibility while helping parents stay informed about transportation activities.",
    features: [
      'Monitor school buses through GPS tracking',
      'Plan and organize transportation routes',
      'Maintain driver and vehicle information',
      'Manage pickup and drop locations',
      'Send transportation updates to parents',
      'Track vehicle maintenance requirements',
    ],
    stat: { value: 'Live', label: 'GPS bus tracking' },
  },
  {
    id: 'performance-insights',
    accent: '#0891b2',
    title: 'Inspace Performance Insights',
    tagline: "See what your school's data is really telling you.",
    description:
      'Go beyond individual reports with Inspace Performance Insights, an analytics capability within the ChaloSchools school management platform. It brings information from different school operations together so leadership teams can identify patterns, measure progress and make data-driven decisions.',
    features: [
      'Combine insights from multiple school modules',
      'Analyze academic performance trends',
      'Monitor attendance and fee-related indicators',
      'Compare performance across classes and periods',
      'Track school-specific KPIs',
      'Prepare insights for management reviews',
    ],
    stat: { value: '360°', label: 'School-wide visibility' },
  },
  {
    id: 'ai-secretary',
    accent: '#e11d48',
    title: 'AI Secretary',
    tagline: 'Get answers from your school data without digging through reports.',
    description:
      "AI Secretary adds an intelligent layer to your ChaloSchools school management system, helping school leaders access important information through simple questions. Instead of searching across different reports and modules, administrators can ask about attendance, fees, admissions and other school activities and receive relevant insights quickly.",
    features: [
      'Ask questions about school data in natural language',
      'Get quick answers across key management areas',
      'Receive daily and weekly school activity summaries',
      'Identify unusual patterns and important changes',
      'Access insights directly through the management app',
      'Support faster, data-informed administrative decisions',
    ],
    outro: "Use intelligent assistance alongside your school ERP to access information and insights from across your school's operations.",
    stat: { value: '24/7', label: 'Always-on assistant' },
  },
  {
    id: 'parent-app',
    accent: '#026dde',
    title: 'Parent & Student App',
    tagline: "Put everyday school information right in parents' hands.",
    description:
      'Extend your ChaloSchools school management platform beyond the school office with a dedicated mobile experience for parents and students. From attendance and examination results to fee payments, transport updates and teacher communication, families can access important school information from one convenient app.',
    features: [
      'View student attendance and academic progress',
      'Track school bus location and transportation updates',
      'Access examination results and progress reports',
      'Pay school fees and download payment receipts',
      'Communicate directly with teachers',
      'Receive homework, circular and school notifications',
      'Stay updated with events and school activities',
    ],
    outro: 'Keep families connected to your school management system with real-time information, communication and essential student services.',
    stat: { value: '1,842', label: 'Active parents connected' },
  },
];

/**
 * Simple module ID + title list for admin pages and lighter consumers.
 */
export const MODULE_IDS = MODULES.map((m) => ({ id: m.id, title: m.title }));
