// Rich, custom-section feature pages. These sit alongside the simpler
// `features` array in site-data.ts and take priority on /features/[slug]
// when a slug has a matching entry here (see getRichFeatureBySlug).

export interface CtaLink {
  label: string;
  href: string;
  variant?: 'primary' | 'outline';
}

export interface FeatureHero {
  eyebrow?: string;
  title: string; // may contain a "|" to split into a two-part styled headline
  description: string;
  ctas: CtaLink[];
  tagline?: string;
}

interface SectionBase {
  id: string;
}

export interface ProblemsSectionData extends SectionBase {
  kind: 'problems';
  badge?: string;
  heading: string;
  subheading?: string;
  items: { title: string; description: string }[];
}

export interface TextSectionData extends SectionBase {
  kind: 'text';
  heading: string;
  paragraphs: string[];
  links?: CtaLink[];
}

export interface BenefitsSectionData extends SectionBase {
  kind: 'benefits';
  heading: string;
  subheading?: string;
  items: { title: string; description: string }[];
}

export interface WorkflowSectionData extends SectionBase {
  kind: 'workflow';
  heading: string;
  subheading?: string;
  steps: { title: string; description?: string }[];
}

export interface TabsSectionData extends SectionBase {
  kind: 'tabs';
  heading: string;
  subheading?: string;
  tabs: { id: string; label: string; title?: string; description: string; points?: string[] }[];
}

export interface TableSectionData extends SectionBase {
  kind: 'table';
  heading: string;
  subheading?: string;
  variant: 'compare' | 'info';
  leftHeader: string;
  rightHeader: string;
  rows: { left: string; right: string }[];
}

export interface ConnectedSectionData extends SectionBase {
  kind: 'connected';
  heading: string;
  paragraphs: string[];
  links?: CtaLink[];
  chips?: string[];
}

export type FeatureSection =
  | ProblemsSectionData
  | TextSectionData
  | BenefitsSectionData
  | WorkflowSectionData
  | TabsSectionData
  | TableSectionData
  | ConnectedSectionData;

export interface RichFeaturePage {
  slug: string;
  shortTitle: string;
  metaTitle: string;
  metaDescription: string;
  hero: FeatureHero;
  sections: FeatureSection[];
  faqs: { q: string; a: string }[];
  cta: {
    heading: string;
    description: string;
    buttons: CtaLink[];
  };
}

export const richFeaturePages: RichFeaturePage[] = [
  {
    slug: 'timetable',
    shortTitle: 'Timetable Management',
    metaTitle: 'School Timetable Management Software | ChaloSchools',
    metaDescription:
      'Create conflict-free school timetables with ChaloSchools. Manage teachers, subjects, classrooms, periods, substitutions, and schedules with AI-powered timetable management.',
    hero: {
      title: 'AI-Powered School Timetable Management Software',
      description:
        'ChaloSchools helps schools automate timetable planning, manage periods and classrooms, handle teacher substitutions, and keep teachers and parents updated when schedules change.',
      ctas: [{ label: 'Book a Free Demo', href: '/contact#contact-form' }],
    },
    sections: [
      {
        id: 'challenges',
        kind: 'problems',
        badge: 'Sound Familiar',
        heading: 'Challenges in Managing School Timetables',
        items: [
          { title: "Creating a School Timetable Shouldn't Take Days", description: 'A school timetable has to bring together teachers, subjects, classes, sections, classrooms, laboratories, and period timings. When these schedules are created manually, even a small change can create conflicts across the entire timetable.' },
          { title: 'Too Much Time Spent on Manual Scheduling', description: 'Building and adjusting timetables using spreadsheets or paper-based schedules can take considerable administrative time, especially when managing multiple classes and sections.' },
          { title: 'Teacher & Subject Conflicts', description: 'Assigning the same teacher to two classes at the same time or placing subjects in unsuitable periods can create scheduling problems that are difficult to identify manually.' },
          { title: 'Uneven Teacher Workloads', description: 'Without a clear view of teaching schedules, some teachers may end up with heavily packed schedules while others have fewer periods.' },
          { title: 'Classroom & Lab Conflicts', description: 'Shared classrooms, laboratories, and other specialized spaces need careful coordination. A single overlapping allocation can disrupt multiple classes.' },
          { title: 'Changes Can Disrupt the Entire Schedule', description: 'Teacher absences, examinations, school events, room changes, and other unexpected situations can require frequent timetable adjustments.' },
          { title: 'Managing Multiple Sections & Shifts', description: 'Schools with multiple sections or shifts have more schedules to coordinate, making manual timetable planning increasingly complicated.' },
          { title: 'Keeping Everyone Updated', description: 'Once a timetable changes, administrators also need to ensure that teachers, students, and parents are working with the latest schedule.' },
        ],
      },
      {
        id: 'solution',
        kind: 'text',
        heading: 'The Smarter Way to Build a Timetable',
        paragraphs: [
          'Creating a school timetable manually can take days. Administrators have to work around teacher availability, subject requirements, classroom capacity, multiple sections, and overlapping schedules. Even a small change can create a chain of conflicts.',
          'ChaloSchools uses AI-powered timetable generation to handle these scheduling constraints automatically. Instead of repeatedly adjusting rows and columns in spreadsheets, your academic team can generate a structured timetable and make changes when required.',
          'From planning to daily schedule management, everything stays in one place.',
        ],
      },
      {
        id: 'benefits',
        kind: 'benefits',
        heading: 'Simplify Timetable Planning Across Your School',
        subheading: 'Generate optimized timetables without spending hours manually assigning every subject and period. The system considers defined scheduling requirements while building the timetable.',
        items: [
          { title: 'Detect Scheduling Conflicts', description: 'Identify clashes involving teachers, rooms, subjects, and periods before they disrupt the school day. Make timetable planning more reliable and easier to manage.' },
          { title: 'Balance Teacher Workloads', description: 'Plan teaching schedules while considering teacher workload and preferences. Give administrators better visibility into how teaching periods are distributed.' },
          { title: 'Manage Rooms & Labs', description: 'Coordinate classrooms, laboratories, and other learning spaces alongside the timetable. Reduce the chances of assigning the same room to multiple classes at the same time.' },
          { title: 'Handle Teacher Absences', description: 'When a teacher is unavailable, substitution management helps assign another teacher to the affected class without requiring administrators to rebuild the entire timetable.' },
          { title: 'Support Multiple Sections & Shifts', description: 'Manage schedules across different classes, sections, and school shifts from a centralized timetable system.' },
          { title: 'Share Schedules Easily', description: 'Keep teachers and parents informed about timetable information and schedule changes without depending entirely on printed timetable sheets.' },
        ],
      },
      {
        id: 'connected-student-info',
        kind: 'connected',
        heading: "A Timetable Connected to Your School's Student Information",
        paragraphs: [
          "ChaloSchools brings timetable management into the wider school management software, allowing academic schedules to work alongside your school's student and administrative information.",
          'With a centralized student database management system, schools can maintain organized information about students, classes, and sections while using the timetable module to manage their academic schedules.',
        ],
        chips: ['Students', 'Classes and sections', 'Teachers', 'Subjects', 'Periods', 'Classrooms', 'Academic schedules', 'Substitutions'],
      },
      {
        id: 'why-choose',
        kind: 'benefits',
        heading: 'Why Choose ChaloSchools for Timetable Management?',
        items: [
          { title: 'AI Instead of Spreadsheet-Based Scheduling', description: 'Move beyond manually creating timetables in spreadsheets and repeatedly adjusting them to resolve conflicts.' },
          { title: 'Built Into Complete School Management Software', description: 'Manage timetables alongside student, teacher, academic, administrative, and other school operations.' },
          { title: 'Designed for Indian Schools', description: 'Support the practical scheduling requirements of schools managing multiple classes, sections, teachers, rooms, and shifts.' },
          { title: 'Connected Student Information', description: 'Use timetable information alongside your student database management system and student record management system instead of maintaining disconnected records.' },
          { title: 'Faster Schedule Changes', description: 'Make changes to the timetable when teachers, rooms, or school activities require adjustments.' },
        ],
      },
    ],
    faqs: [
      { q: 'What is school timetable management software?', a: 'School timetable management software helps schools create, organize, and maintain academic schedules digitally. It can manage periods, subjects, teachers, classrooms, sections, and timetable changes from a centralized system.' },
      { q: 'How does AI timetable generation help schools?', a: 'AI-powered timetable generation reduces the manual effort involved in assigning subjects, teachers, periods, and rooms. It considers defined scheduling constraints and helps create a timetable while reducing potential conflicts.' },
      { q: 'Can teachers view their timetables?', a: 'Yes. Teachers can access their timetable information to view their assigned classes, subjects, and periods.' },
      { q: 'Can students and parents access the timetable?', a: 'Yes. Timetable schedules can be shared with teachers and parents so they can stay informed about the relevant academic schedule.' },
      { q: 'Is timetable management part of the school management software?', a: 'Yes. Timetable management is part of the broader ChaloSchools school management software, allowing schools to manage scheduling alongside other academic and administrative operations.' },
    ],
    cta: {
      heading: 'Build Your School Timetable in Minutes, Not Days',
      description: 'Stop spending hours manually arranging periods, teachers, classrooms, and subjects. Use AI-powered timetable management to create better schedules, reduce conflicts, manage substitutions, and keep your school day organized.',
      buttons: [
        { label: 'Book a Free Demo', href: '/contact#contact-form' },
        { label: 'See ChaloSchools in Action', href: '/product', variant: 'outline' },
      ],
    },
  },
  {
    slug: 'academic-inventory-management',
    shortTitle: 'Academic Inventory Tracking',
    metaTitle: 'School Inventory Management Software | Academic Inventory Tracking | ChaloSchools',
    metaDescription:
      "Manage school's assets, including furniture, lab equipment, and athletic gear with the academic inventory module of ChaloSchools.",
    hero: {
      eyebrow: 'The Academic Inventory Tracking',
      title: 'Find Where Every School Asset Is | No Need to Open a Register',
      description:
        'Academic inventory module in ChaloSchools provides your school with a single location to log, issue, and monitor everything it owns, including lab equipment, sports kits, and classroom furniture, as part of a complete school management system rather than a separate spreadsheet that is seldom updated.',
      ctas: [
        { label: 'Book a Free Demo', href: '/contact#contact-form' },
        { label: 'See All Modules', href: '/product', variant: 'outline' },
      ],
      tagline: 'Work Across Departments. Barcode Ready. Stockouts Tracked.',
    },
    sections: [
      {
        id: 'overview',
        kind: 'text',
        heading: 'What Is an Academic Inventory Management System?',
        paragraphs: [
          'Most schools still discover a missing item when someone searches for it — a microscope signed out two terms ago, a set of footballs "someone in PT probably has," a projector relocated from room 12 to the staff room without ever being logged. The school never had a single location to record everything. None of this is because the staff is careless.',
          'That is precisely fixed by the academic inventory module in ChaloSchools. Every laboratory item, sporting good, piece of furniture, and departmental resource is recorded once and tracked for its entire life at school — who owns it, where it has been moved, and when it has to be replaced.',
          'It is located inside your school management software along with admissions, fees, and attendance.',
        ],
      },
      {
        id: 'challenges',
        kind: 'problems',
        badge: 'Sound Familiar',
        heading: 'Where Inventory Typically Breaks Down',
        items: [
          { title: 'The Register That Nobody Updates', description: 'A physical stock register is accurate on the first day and outdated by the third week.' },
          { title: 'Nobody Recalls Who Took What', description: 'Items are issued by lab assistants and employees on trust and without any documentation of who is using them.' },
          { title: 'Stock-Outs at the Worst Time', description: 'When sports day or chemistry practicals approach, half of the necessary supplies are either absent or unsuitable.' },
          { title: 'Audit Takes Days', description: 'Physically counting everything against paper records, department by department, is known as annual asset verification.' },
        ],
      },
      {
        id: 'core-features',
        kind: 'benefits',
        heading: 'The Real Purpose of the Academic Inventory Module',
        items: [
          { title: 'The Digital Stock Register', description: 'Each item, including lab equipment, sporting goods, furniture, AV equipment, and departmental supplies, is recorded with quantity, condition, and location. Eliminate the need to chase a physical register between departments.' },
          { title: 'QR-Based / Barcode Tracking', description: 'Instead of manually entering information, store employees can scan products in and out by tagging assets with barcodes or QR codes. Helpful for yearly verification, issue, and return.' },
          { title: 'Issues & Return Log', description: 'The date and name are recorded when a department or a teacher takes an item from the store. Nothing remains borrowed because the record closes automatically when it is returned.' },
          { title: 'Reorder and Low Stock Alerts', description: 'Set the minimum quantity for consumables like stationery, sports items, and laboratory chemicals, and get notified before the stock runs out rather than after a class has already been impacted.' },
          { title: 'Purchase and Vendor Records', description: 'Avoid a separate finance discussion when making replacement and repurchase decisions. Keep purchase orders, vendor information, and invoice details attached to the item itself.' },
          { title: 'Visibility by Department', description: 'View stock, allocation, and movement breakdown by department, like science, sports, computer lab, and administration, instead of a single undivided list.' },
        ],
      },
      {
        id: 'workflow',
        kind: 'workflow',
        heading: 'From Adding an Item to Retiring It',
        steps: [
          { title: 'Add the Item', description: "Record the asset's category, quantity, purchase information, and store location. Attach a barcode or QR code if the school uses one." },
          { title: 'Issue It Out', description: 'The system records who owns it and when — issued immediately by the store, or requested by staff.' },
          { title: 'Track', description: 'See live status — in store, issued, under repair, or written off — without running to the storeroom to verify.' },
          { title: 'Retire, Reorder, Return', description: 'Mark the item returned, flag it for repair, or retire it once no longer functional. Reorder alerts activate when stock falls below your set threshold.' },
        ],
      },
      {
        id: 'departments',
        kind: 'tabs',
        heading: 'Each Department Has Its Own Stock. This Takes Care of All of Them.',
        tabs: [
          { id: 'science', label: 'Science Labs', description: 'Keep track of glassware, chemicals, equipment, and safety gear according to batch and condition. Before the next practical session, find out what has to be replenished.' },
          { id: 'sports', label: 'Sports Department', description: 'Log sports kits, clothing, and equipment given to teams or PT personnel, and receive notifications when items wear out or go missing after competitions.' },
          { id: 'it', label: 'IT & Computer Labs', description: 'Use asset tags to keep track of systems, projectors, routers, and peripherals, along with the lab or classroom in which each is currently located.' },
          { id: 'furniture', label: 'Fixtures & Furniture', description: 'Maintain records of desks, benches, seats, and cabinets in each classroom. Helpful when planning new purchases or reallocating during renovations.' },
          { id: 'consumables', label: 'Consumables & Stationery', description: 'Maintain day-to-day consumables that employees and departments receive, along with reorder alerts to prevent the front office from being caught off guard.' },
          { id: 'maintenance', label: 'Maintenance & Housekeeping', description: 'Keep track of AMC-covered assets, cleaning supplies, maintenance equipment, and service and repair records.' },
        ],
      },
      {
        id: 'before-after',
        kind: 'table',
        heading: 'What Happens Once Inventory Moves Off Paper',
        variant: 'compare',
        leftHeader: 'No Digital Inventory',
        rightHeader: 'With ChaloSchools Inventory Management',
        rows: [
          { left: 'A register that is correct on day one and outdated by day three', right: 'One digital record that is updated as soon as something moves' },
          { left: 'No documentation of who took what or when', right: 'Each supplied item is automatically linked to a name and a date' },
          { left: 'Mid-class or mid-event shortages found', right: 'Alerts about low stock before it becomes an issue' },
          { left: 'Annual audit means counting every item manually', right: 'Auditing means checking inventory against pre-existing records' },
          { left: 'Vendor and purchase information dispersed throughout files', right: 'The item itself retains its purchase history' },
          { left: 'Every department reports its own inventory separately', right: 'Visibility by department from a single dashboard' },
        ],
      },
      {
        id: 'internal-links',
        kind: 'connected',
        heading: 'Not a Standalone Tool. Part of Your School ERP',
        paragraphs: [
          'Within ChaloSchools, academic inventory is not used in isolation. Stock reports feed into the same Reports & Analytics dashboard that your management team already uses, issue logs link back to staff profiles in Staff Management, and purchases link to your fee and finance records. This is how using inventory software differs from using a school administration system, in which inventory is just another integrated feature.',
        ],
        links: [
          { label: 'Explore Fees & Finance', href: '/features/fees' },
          { label: 'Explore Staff Management', href: '/features/staff-hr' },
          { label: 'Explore Reports & Analytics', href: '/features/reports' },
        ],
      },
    ],
    faqs: [
      { q: 'Is this a part of school ERP or a separate inventory app?', a: "It is not an independent application. Rather, it is integrated into ChaloSchools' school management system. The same platform that your school utilizes for admissions, tuition, and attendance is also used for purchases, issues, and stock reports." },
      { q: 'Can we track items by department separately?', a: 'Yes, each department head can see only what is relevant to them by filtering stock, issuance records, and reports by department, including Science, Sports, Computer Lab, Administration, and others.' },
      { q: 'Does it support barcode or QR-based tracking?', a: 'Although it is not required, assets can be marked with barcodes or QR codes for quicker issue, return, and audit. Schools that prefer manual entry can also handle inventory without tagging.' },
      { q: 'Is academic inventory tracking included in the standard ChaloSchools plan, or is it an add-on?', a: 'Academic Inventory Tracking is one of the core modules available within the ChaloSchools school ERP platform. Reach out to our team for plan-specific details.' },
    ],
    cta: {
      heading: 'Stop Managing School Inventory on Paper. Bring It to Your School ERP.',
      description: "Get connected with ChaloSchools to see how academic inventory tracking integrates with the rest of your school's operations.",
      buttons: [
        { label: 'Book a Free Demo', href: '/contact#contact-form' },
        { label: 'Talk to Sales', href: '/contact', variant: 'outline' },
      ],
    },
  },
  {
    slug: 'exams',
    shortTitle: 'Academics & Examination',
    metaTitle: 'Exam Management Software for Schools | ChaloSchools',
    metaDescription:
      'Manage school exams with ChaloSchools. Schedule examinations, enter marks, calculate grades, create report cards, publish results, and track student performance.',
    hero: {
      title: 'Exam Management Software for Schools',
      description:
        "Take your school's examination process from exam scheduling to final report cards without juggling spreadsheets, registers, and separate files. ChaloSchools brings exam management, marks, grades, report cards, results, and academic performance into your school's existing school management software.",
      ctas: [{ label: 'Book a Free Demo', href: '/contact#contact-form' }],
      tagline: 'Plan. Assess. Publish. All from One Academic Platform.',
    },
    sections: [
      {
        id: 'challenges',
        kind: 'problems',
        badge: 'Behind Every Exam',
        heading: 'Exams Involve More Than Just Marks',
        subheading: 'Schedule → Assign → Assess → Enter Marks → Calculate → Review → Publish. When each step is handled separately, small mistakes create extra work for teachers and administrators.',
        items: [
          { title: 'Too Many Spreadsheets', description: 'Marks collected from different teachers need to be consolidated manually.' },
          { title: 'Scheduling Conflicts', description: 'Multiple classes, subjects, sections, and examination dates make planning complicated.' },
          { title: 'Repeated Data Entry', description: 'Student and subject information may have to be entered again for different exams.' },
          { title: 'Calculation Errors', description: 'Totals, grades, percentages, and result formats can require repeated checking.' },
          { title: 'Report Cards Take Time', description: 'Preparing individual student reports becomes a major task during result periods.' },
          { title: 'Results Are Difficult to Distribute', description: 'Printed reports and manual communication slow down access to results.' },
          { title: 'Performance Stays Fragmented', description: 'Exam results sitting in separate files make it harder to understand progress over time.' },
        ],
      },
      {
        id: 'organized-workflow',
        kind: 'tabs',
        heading: 'Your Examination Workflow, Organized in One Place',
        subheading: 'ChaloSchools brings the key stages of examination management together. No need to move examination data from one system to another.',
        tabs: [
          { id: 'before', label: 'Before the Exam', description: 'Create exam schedules, assign subjects, organize classes, and manage exam dates.' },
          { id: 'during', label: 'During Assessment', description: 'Enter marks, record assessment scores, review entries, and track completion.' },
          { id: 'after', label: 'After the Exam', description: 'Calculate grades, generate report cards, publish results, and analyze performance.' },
        ],
      },
      {
        id: 'benefits',
        kind: 'benefits',
        heading: 'Everything You Need for Exam Management',
        items: [
          { title: 'Exam Scheduling', description: 'Set up examination schedules across classes, sections, subjects, and academic terms.' },
          { title: 'Digital Mark Entry', description: 'Teachers can enter marks directly into the system instead of maintaining separate paper sheets or spreadsheets.' },
          { title: 'Grade & Result Calculation', description: 'Reduce manual calculations by processing marks, grades, totals, and result information within the platform.' },
          { title: 'Report Card Generation', description: 'Bring subject marks and academic information together to create student report cards with less administrative effort.' },
          { title: 'Result Publication', description: "Make finalized results available digitally so students and parents don't have to depend entirely on printed result sheets." },
          { title: 'Performance Analysis', description: 'Look beyond individual marks with academic information that helps teachers and administrators review student performance.' },
          { title: 'Board-Based Academic Formats', description: 'Support examination workflows aligned with CBSE, ICSE, and State Board requirements.' },
          { title: 'Examination History', description: "Keep previous examination information available alongside the student's academic records." },
        ],
      },
      {
        id: 'student-record-table',
        kind: 'table',
        heading: 'A Single Student Record Across the Academic Year',
        subheading: "Your exam data shouldn't exist in isolation. ChaloSchools associates examination information with the student's existing record in your student database management system.",
        variant: 'info',
        leftHeader: 'Student Profile',
        rightHeader: 'What It Includes',
        rows: [
          { left: 'Class & Section', right: 'Current academic placement' },
          { left: 'Subjects', right: 'Enrolled subjects for the term' },
          { left: 'Attendance', right: 'Attendance history' },
          { left: 'Examination Marks', right: 'Recorded assessment scores' },
          { left: 'Grades', right: 'Calculated grade outcomes' },
          { left: 'Report Cards', right: 'Generated academic reports' },
          { left: 'Academic History', right: 'Records carried across years' },
        ],
      },
      {
        id: 'beyond-exams',
        kind: 'connected',
        heading: 'Academic Management Beyond the Examination Hall',
        paragraphs: [
          "Examinations are only one part of your school's academic operations. ChaloSchools brings exam information into the same environment used for the rest of your school.",
          'For schools evaluating classroom management software, this broader academic connection means classroom information and assessment records do not have to remain in separate systems.',
        ],
        chips: ['Student records', 'Attendance', 'Timetables', 'Classes and sections', 'Teachers', 'Subjects', 'Parent communication', 'Academic activities'],
      },
      {
        id: 'built-for-boards',
        kind: 'text',
        heading: 'Built for Different School Academic Structures',
        paragraphs: [
          'Whether your school follows CBSE, ICSE, or a State Board curriculum, examination management needs to fit the way your school already operates. ChaloSchools supports academic workflows that can accommodate multiple classes, multiple sections, different subjects, multiple examinations, different grading structures, and academic-year records.',
        ],
      },
      {
        id: 'why-choose',
        kind: 'benefits',
        heading: 'Why Choose ChaloSchools for Examination Management',
        items: [
          { title: 'One Platform', description: 'Examination information sits alongside the rest of your school operations.' },
          { title: 'Less Repetitive Work', description: 'Reduce manual entry, calculations, and report preparation.' },
          { title: 'Teacher-Friendly Mark Entry', description: 'Give teachers a dedicated workflow for recording assessment results.' },
          { title: 'Accessible Student Records', description: "Keep examination information associated with each student's academic history." },
          { title: 'Digital Results', description: 'Make finalized results easier to share with students and parents.' },
          { title: 'Scalable for Growing Schools', description: 'Handle examination records across classes, sections, and academic years.' },
        ],
      },
    ],
    faqs: [
      { q: 'What is exam management software?', a: 'Exam management software helps schools organize examination schedules, student assessments, marks, grades, report cards, results, and related academic records digitally.' },
      { q: 'Can teachers enter examination marks online?', a: 'Yes. Teachers can use the digital mark-entry workflow to record student assessment results within the platform.' },
      { q: 'Does ChaloSchools support CBSE and ICSE schools?', a: 'ChaloSchools supports examination workflows for CBSE, ICSE, and State Board requirements.' },
      { q: 'Can parents access student results?', a: 'Schools can publish finalized results digitally, allowing students and parents to access available academic result information through the platform.' },
      { q: 'Is examination management included in school management software?', a: 'Yes. Examination management is part of the wider school management system, allowing schools to manage exams alongside other academic and administrative functions.' },
    ],
    cta: {
      heading: 'Your Exams. Your Records. Your Academic History.',
      description: 'From the first examination schedule to the final report card, ChaloSchools keeps the process organized. Schedule exams. Record marks. Review performance. Generate report cards. Publish results. All within your school management software.',
      buttons: [
        { label: 'Book a Free Demo', href: '/contact#contact-form' },
        { label: 'See ChaloSchools in Action', href: '/product', variant: 'outline' },
      ],
    },
  },
  {
    slug: 'attendance',
    shortTitle: 'Attendance Management',
    metaTitle: 'Attendance Management Software for Schools | ChaloSchools',
    metaDescription:
      'Simplify student attendance with ChaloSchools attendance management software. Track attendance, absences, late arrivals, staff leave, reports, and parent alerts in one system.',
    hero: {
      title: 'Attendance Management Software Module for Smarter Schools',
      description:
        'ChaloSchools helps schools simplify daily attendance, monitor student presence, track absences and late arrivals, and maintain reliable attendance records from one centralized platform.',
      ctas: [
        { label: 'Book a Free Demo', href: '/contact#contact-form' },
        { label: 'Talk to Sales', href: '/contact', variant: 'outline' },
      ],
      tagline: 'Make Every Attendance Record Accurate, Timely, and Easy to Manage',
    },
    sections: [
      {
        id: 'challenges',
        kind: 'problems',
        badge: 'Sound Familiar',
        heading: "Managing Attendance Shouldn't Be a Daily Struggle",
        subheading: 'Taking attendance is a small part of the school day, but managing the information behind it can become a time-consuming administrative task.',
        items: [
          { title: 'Manual Attendance Takes Valuable Time', description: 'Teachers spend time recording attendance, correcting entries, and maintaining records that administrators later need to consolidate.' },
          { title: 'Absences Are Easy to Miss', description: 'Without a centralized system, identifying frequent absences, consecutive leave, or irregular attendance can require checking multiple records.' },
          { title: 'Late Arrivals Need Better Visibility', description: 'Late arrivals can affect punctuality tracking when recorded separately or handled through manual registers.' },
          { title: 'Attendance Data Gets Scattered', description: 'When attendance records are maintained across registers, spreadsheets, or disconnected systems, getting a complete view becomes difficult.' },
          { title: 'Parents Need Timely Information', description: 'When a student is absent or attendance changes, schools need an efficient way to keep parents informed.' },
          { title: 'Reports Take Too Much Manual Work', description: 'Preparing attendance summaries for classes, students, periods, or academic records can consume administrative time when data is not centralized.' },
        ],
      },
      {
        id: 'solution',
        kind: 'text',
        heading: 'A Smarter Way to Manage School Attendance',
        paragraphs: [
          'Attendance should not be limited to marking students as present or absent. ChaloSchools brings attendance records into your wider school management system, allowing schools to manage daily attendance alongside student information, classes, teachers, academic activities, and other school operations.',
          'Teachers can record attendance while administrators get a broader view of attendance patterns and records without depending on separate registers or spreadsheets.',
        ],
      },
      {
        id: 'benefits',
        kind: 'benefits',
        heading: 'Everything You Need for Attendance Management',
        items: [
          { title: 'Quick Attendance Recording', description: 'Give teachers a simple way to record student attendance without spending unnecessary time on repetitive administrative work.' },
          { title: 'Student Attendance Tracking', description: 'Maintain organized attendance records for individual students and classes throughout the academic year.' },
          { title: 'Day-Wise Attendance', description: 'Track attendance based on the school day and maintain a clear history of student presence and absence.' },
          { title: 'Subject-Wise Attendance', description: 'Where required, maintain attendance at the subject level so schools can monitor participation across different classes.' },
          { title: 'Absence & Leave Tracking', description: 'Keep attendance and leave information together to make it easier to understand why a student was unavailable.' },
          { title: 'Late Arrival Tracking', description: 'Record late arrivals and maintain better visibility into student punctuality.' },
          { title: 'Attendance History', description: 'View previous attendance information without searching through physical registers or separate files.' },
          { title: 'Attendance Reports', description: 'Generate useful attendance information for administrators, teachers, and school records from centralized data.' },
          { title: 'Parent Visibility', description: 'Keep parents informed about attendance-related updates through the communication channels available within your school platform.' },
        ],
      },
      {
        id: 'insights',
        kind: 'benefits',
        heading: 'Turn Attendance Data Into Useful School Insights',
        subheading: 'Instead of looking at individual registers, your attendance management system can provide a centralized view of attendance information across students, classes, and academic periods.',
        items: [
          { title: 'Identify Attendance Patterns', description: 'Understand repeated absences, frequent late arrivals, and changes in attendance over time.' },
          { title: 'Monitor Class Attendance', description: 'Get a clearer picture of attendance across different classes and sections.' },
          { title: "Review Individual Records", description: "Access a student's attendance history when teachers or administrators need a more complete view." },
          { title: 'Support Better Follow-Up', description: 'Use attendance information to identify students who may require additional attention or communication.' },
        ],
      },
      {
        id: 'connected',
        kind: 'connected',
        heading: 'More Than an Attendance Register',
        paragraphs: [
          'A modern school management system should help schools manage what happens before, during, and after attendance is recorded. This connected approach reduces the need to maintain separate attendance records and helps schools keep student information organized within one platform.',
        ],
        chips: ['Student information', 'Classes and sections', 'Teacher information', 'Academic records', 'Leave information', 'Parent communication', 'School reports'],
      },
      {
        id: 'why-choose',
        kind: 'benefits',
        heading: 'Why Choose ChaloSchools for Attendance Management?',
        items: [
          { title: 'Built for School Operations', description: 'ChaloSchools is designed around the everyday requirements of schools rather than generic employee time-tracking workflows.' },
          { title: 'Centralized Attendance Records', description: 'Keep attendance information organized within your wider school platform instead of maintaining separate registers and spreadsheets.' },
          { title: 'Easy for Teachers', description: 'Make daily attendance recording straightforward so teachers can spend less time on administrative work.' },
          { title: 'Better Administrative Visibility', description: 'Give administrators access to attendance information across students, classes, and sections from a centralized system.' },
          { title: 'Connected Student Information', description: 'Attendance works alongside the rest of your student information, helping schools maintain more consistent records.' },
          { title: 'Ready for Growing Schools', description: 'Manage attendance across multiple classes and sections without creating separate manual systems for each group.' },
        ],
      },
    ],
    faqs: [
      { q: 'What is attendance management software?', a: 'Attendance management software is a module in ChaloSchools that helps schools record, organize, monitor, and report student attendance digitally instead of depending entirely on manual registers or spreadsheets.' },
      { q: 'Can teachers mark student attendance?', a: 'Yes. The attendance module can provide teachers with a centralized way to record attendance for the students and classes they manage.' },
      { q: 'Can schools track student absences and late arrivals?', a: 'Schools can use attendance records to maintain visibility into student absences and punctuality, making follow-up easier for teachers and administrators.' },
      { q: 'Can parents receive attendance-related information?', a: "Attendance information can be connected with the school's communication workflows so relevant updates can be shared with parents." },
      { q: 'Is attendance part of the school management system?', a: "Yes. ChaloSchools includes attendance as part of its broader school management system, allowing attendance information to work alongside other school operations." },
    ],
    cta: {
      heading: 'Keep Attendance Simple. Keep Records Reliable.',
      description: 'Move beyond registers and scattered spreadsheets with an attendance management system designed for school operations. Manage attendance, maintain student records, monitor patterns, and keep your school information connected through ChaloSchools.',
      buttons: [
        { label: 'Book a Free Demo', href: '/contact#contact-form' },
        { label: 'See ChaloSchools in Action', href: '/product', variant: 'outline' },
      ],
    },
  },
  {
    slug: 'communication',
    shortTitle: 'Communication',
    metaTitle: 'School Communication Software | Parent & Student Messaging | ChaloSchools',
    metaDescription:
      'Improve school communication with ChaloSchools. Send announcements, parent alerts, SMS notifications, reminders, and targeted messages from your school management system.',
    hero: {
      title: 'School Communication Software for Better School-Parent Communication',
      description:
        "School communication shouldn't rely on scattered messages, calls, and paper notices. ChaloSchools helps schools share announcements, reminders, alerts, and updates with the right people through one school management software platform.",
      ctas: [{ label: 'Book a Free Demo', href: '/contact#contact-form' }],
      tagline: 'Keep Teachers, Parents, Students, and Staff on the Same Page',
    },
    sections: [
      {
        id: 'challenges',
        kind: 'problems',
        badge: 'Sound Familiar',
        heading: 'School Communication Gets Complicated Fast',
        subheading: 'Holiday notices. Exam reminders. Attendance alerts. Fee reminders. Events. Meetings. Emergency announcements. When these messages are handled through different channels, keeping everyone informed becomes difficult.',
        items: [
          { title: 'Important Notices Get Buried', description: 'Messages sent through informal channels can be missed among unrelated conversations.' },
          { title: 'The Same Update Is Repeated', description: 'Staff may spend time sending identical information to different groups.' },
          { title: 'Wrong Audiences Receive Messages', description: 'Not every announcement is relevant to every student, parent, teacher, or staff member.' },
          { title: 'Parents Miss Time-Sensitive Information', description: 'Exam dates, school events, attendance updates, and urgent notices may not reach families quickly.' },
          { title: 'Staff Communication Becomes Scattered', description: 'Internal instructions can get lost across multiple communication channels.' },
          { title: 'No Clear Communication History', description: 'Schools may struggle to know what information was shared and when.' },
          { title: 'Manual Reminders Consume Time', description: 'Routine notifications often require repeated calls, messages, or follow-ups.' },
        ],
      },
      {
        id: 'audience-table',
        kind: 'table',
        heading: 'One Communication Layer for the Whole School',
        subheading: 'Different people need different information. ChaloSchools lets schools structure communication around who needs to know what.',
        variant: 'info',
        leftHeader: 'Sender',
        rightHeader: 'Typical Communication → Audience',
        rows: [
          { left: 'School Admin', right: 'Announcements, notices, alerts → Parents, Students, Staff' },
          { left: 'Teacher', right: 'Class updates, reminders → Students, Parents' },
          { left: 'Academic Team', right: 'Exam & academic notices → Students, Parents, Teachers' },
          { left: 'Accounts Team', right: 'Fee reminders → Parents' },
          { left: 'Management', right: 'School-wide announcements → Entire School' },
          { left: 'HR / Admin', right: 'Staff notices → Employees' },
        ],
      },
      {
        id: 'benefits',
        kind: 'benefits',
        heading: 'Everything You Need for Everyday School Communication',
        items: [
          { title: 'School Announcements', description: 'Publish important school-wide notices without relying entirely on printed circulars or individual messages.' },
          { title: 'Targeted Communication', description: 'Send information to specific classes, sections, parent groups, teachers, staff departments, or other selected audiences.' },
          { title: 'SMS & Mobile Alerts', description: 'Extend important school communication to mobile devices through supported SMS and notification channels.' },
          { title: 'Event & Activity Reminders', description: 'Keep families and staff informed about upcoming meetings, events, examinations, holidays, and other school activities.' },
          { title: 'Academic Updates', description: 'Share information related to examinations, results, assignments, schedules, and other academic activities.' },
          { title: 'Fee Reminders', description: 'Send relevant fee-related reminders to parents without requiring staff to contact families individually.' },
          { title: 'Urgent Notifications', description: 'Deliver important announcements quickly when the school needs to communicate a time-sensitive update.' },
          { title: 'Internal Staff Communication', description: 'Give administrators and staff a dedicated way to exchange school-related information without mixing it with personal communication.' },
        ],
      },
      {
        id: 'notification-examples',
        kind: 'table',
        heading: 'Communication Across Everyday School Activities',
        subheading: 'Your communication system becomes more useful when it works alongside the rest of your school management system. The exact notification triggers and channels can depend on the school\'s configuration.',
        variant: 'info',
        leftHeader: 'Activity',
        rightHeader: 'Example Notification',
        rows: [
          { left: 'Attendance', right: '"Your child was marked absent today."' },
          { left: 'Examinations', right: '"Term examination schedule has been published."' },
          { left: 'Fees', right: '"Your upcoming fee payment is due."' },
          { left: 'Timetable', right: '"Tomorrow\'s class schedule has been updated."' },
          { left: 'Events', right: '"Parent-teacher meeting scheduled for Saturday."' },
          { left: 'Holidays', right: '"The school will remain closed on Monday."' },
          { left: 'Emergency', right: '"School closing time has changed due to an unforeseen situation."' },
        ],
      },
      {
        id: 'comparison',
        kind: 'table',
        heading: 'Manual Calls vs Structured School Communication',
        subheading: "The goal isn't to replace every communication channel. It's to give the school a reliable communication layer for routine and important information.",
        variant: 'compare',
        leftHeader: 'Traditional Approach',
        rightHeader: 'ChaloSchools Approach',
        rows: [
          { left: 'Individual phone calls', right: 'Group-based communication' },
          { left: 'Printed circulars', right: 'Digital announcements' },
          { left: 'Repeated WhatsApp messages', right: 'Audience-specific updates' },
          { left: 'Manual reminders', right: 'Scheduled / event-based communication' },
          { left: 'Separate contact lists', right: 'School records as the communication base' },
          { left: 'Difficult to track', right: 'Communication history in one platform' },
        ],
      },
      {
        id: 'flow',
        kind: 'workflow',
        heading: 'From School Notice to Parent Notification',
        subheading: 'A simple communication flow',
        steps: [
          { title: 'Create', description: 'Write the announcement or notification.' },
          { title: 'Select', description: 'Choose the relevant class, section, group, staff category, or school-wide audience.' },
          { title: 'Review', description: 'Check the message and intended recipients.' },
          { title: 'Send', description: 'Deliver through the available communication channel.' },
          { title: 'Track', description: "Keep the communication within the school's digital workflow for future reference." },
        ],
      },
      {
        id: 'why-choose',
        kind: 'benefits',
        heading: 'Why Add Communication to Your School Management System?',
        items: [
          { title: 'One School-Wide Communication Layer', description: 'Bring parent, student, teacher, and staff communication into the same school platform.' },
          { title: 'Audience-Based Messaging', description: 'Avoid sending every announcement to everyone.' },
          { title: 'Less Repetitive Work', description: 'Reduce manual calls, repeated messages, and individual follow-ups for routine information.' },
          { title: 'Faster Information Sharing', description: 'Get important announcements to the intended audience without unnecessary delays.' },
          { title: 'Better Parent Engagement', description: 'Keep families informed about the activities and updates that affect their children.' },
          { title: 'Part of Your Existing School Platform', description: 'Communication works alongside the other modules in your school management system rather than functioning as a completely separate application.' },
        ],
      },
    ],
    faqs: [
      { q: 'What is school communication software?', a: 'School communication software helps educational institutions share announcements, notifications, reminders, alerts, and other information with parents, students, teachers, and staff through organized digital channels.' },
      { q: 'Can schools send messages to specific classes or groups?', a: 'Yes. Audience-based communication allows schools to send relevant information to selected classes, sections, groups, staff categories, or the wider school community.' },
      { q: 'Can parents receive school notifications?', a: 'Yes. Schools can use the communication system to share relevant updates with parents through supported notification and messaging channels.' },
      { q: 'Can schools send SMS notifications?', a: "SMS communication can be supported through compatible SMS services and integrations, depending on the school's setup." },
      { q: 'Is communication part of school management software?', a: "Yes. Communication can function as a module within a broader school management software platform, allowing schools to communicate using information and workflows already maintained in their school management system." },
    ],
    cta: {
      heading: 'Keep Your School Connected, One Message at a Time',
      description: 'ChaloSchools gives administrators, teachers, parents, and students a structured way to stay informed while keeping communication tied to everyday school operations. Create. Target. Notify. Keep everyone informed.',
      buttons: [
        { label: 'Book a Free Demo', href: '/contact#contact-form' },
        { label: 'See ChaloSchools in Action', href: '/product', variant: 'outline' },
      ],
    },
  },
  {
    slug: 'fees',
    shortTitle: 'Fee Management',
    metaTitle: 'School Fee Management Software | ChaloSchools',
    metaDescription:
      'Simplify school fee management with ChaloSchools. Manage fee structures, online payments, installments, concessions, reminders, receipts, dues and finance reports.',
    hero: {
      title: 'Fee Management System for Smarter School Fee Collection',
      description:
        "Simplify fee collection with Chalo's fee management system. Manage fee structures, payments, pending dues, receipts, and reports — all in one easy-to-use platform. Reduce manual work and manage your school more efficiently with a complete school management software.",
      ctas: [
        { label: 'Get a Free Demo', href: '/contact#contact-form' },
        { label: 'Explore Features', href: '/product', variant: 'outline' },
      ],
    },
    sections: [
      {
        id: 'challenges',
        kind: 'problems',
        badge: 'Sound Familiar',
        heading: "Managing School Fees Shouldn't Be This Complicated",
        subheading: 'From collecting payments to following up on dues, manual fee management creates unnecessary work for school administrators.',
        items: [
          { title: 'Manual Receipts & Reconciliation', description: 'Recording payments and matching receipts manually takes time and increases the risk of errors.' },
          { title: 'Delayed Fee Reminders', description: 'Following up with parents about pending fees manually can lead to delays and missed collections.' },
          { title: 'No Clear View of Dues', description: "Without real-time tracking, it's difficult to know how much has been collected and what is still outstanding." },
          { title: 'Complex Installments & Concessions', description: 'Managing different installment plans, scholarships, and concessions can make fee calculations harder to track.' },
          { title: 'Time-Consuming Follow-Ups', description: 'Staff spend valuable hours contacting parents and tracking defaulters instead of focusing on more important school operations.' },
          { title: 'Scattered Financial Records', description: 'Managing fee data across spreadsheets, registers, and receipts makes reporting and auditing more difficult.' },
        ],
      },
      {
        id: 'benefits',
        kind: 'benefits',
        heading: 'Everything You Need to Simplify School Fee Management',
        subheading: 'From setting up fee structures to collecting payments and tracking outstanding dues, ChaloSchools helps schools manage the complete fee cycle with less manual work and better financial visibility.',
        items: [
          { title: 'Online Fee Collection', description: 'Let parents pay school fees online through convenient digital payment options. Reduce queues at the accounts office and make fee collection faster and more convenient for both parents and staff.' },
          { title: 'Fee Receipts & Payment Records', description: 'Generate fee receipts for completed transactions and maintain organized payment records. Give parents a clear record of their payments while making transaction tracking easier for the accounts team.' },
          { title: 'Fee Defaulter Tracking', description: 'Get a clear view of students with pending or overdue fees. Track outstanding amounts and identify defaulters quickly so your team can follow up without checking multiple records.' },
          { title: 'Automated Fee Reminders', description: 'Keep parents informed about upcoming and overdue payments with timely fee reminders. Reduce repetitive follow-ups and help improve on-time fee collection.' },
          { title: 'Advance & Partial Fee Payments', description: 'Handle different payment requirements with support for installment-based and advance fee payments, where applicable. Keep track of amounts paid and remaining balances accurately.' },
          { title: 'Fines & Late Fee Management', description: "Apply applicable fines or late charges to overdue payments according to your school's fee policies, helping maintain consistent and transparent fee collection." },
          { title: 'Detailed Fee & Finance Reports', description: 'Get useful insights into fee collections, pending dues, student-wise payments, class-wise collections, payment transactions, and other financial information to support better decision-making.' },
          { title: 'Centralized Financial Records', description: 'Keep fee-related information, payment history, receipts, concessions, and outstanding balances organized in one system. Authorized staff can access what they need without relying on scattered records.' },
          { title: 'Better Control for School Administrators', description: 'Give administrators and accounts teams greater visibility into collections and outstanding fees while keeping fee-related activities organized and easier to monitor.' },
        ],
      },
      {
        id: 'core-features',
        kind: 'benefits',
        heading: 'Complete Fee Management for Schools',
        subheading: 'From setting up the fee structure to tracking collections, ChaloSchools helps your school manage the complete fee cycle.',
        items: [
          { title: 'Create Flexible Fee Structures', description: "Set up fee structures — tuition, admission, term, examination, transport, activity, hostel, and other school-specific charges — for different classes, sections, academic years, or student categories, without relying on spreadsheets." },
          { title: 'Manage Installments, Concessions & Scholarships', description: 'Configure installment-based fee schedules and manage concessions, scholarships, discounts, adjustments, and outstanding balances directly within the fee module, giving your accounts team a clear view of what each student owes and has paid.' },
          { title: 'Accept Fees Online', description: 'Support convenient digital payment methods such as UPI, cards, and net banking. Parents can view fee details and make payments without visiting the school for every transaction, reducing queues and making collections easier to track.' },
          { title: 'Generate Digital Fee Receipts', description: 'Stop relying on manually written or printed receipts. Once a payment is recorded, the system generates a digital receipt with the relevant payment details for a consistent transaction record.' },
          { title: 'Automate Fee Payment Reminders', description: 'Send timely reminders for upcoming or overdue payments through supported communication channels such as SMS and WhatsApp, reducing repetitive follow-ups and improving on-time collections.' },
          { title: 'Track Fee Defaulters in Real Time', description: 'The fee dashboard gives your authorized staff a clear view of total fees collected, pending fees, overdue fees, student-wise dues, class-wise collections, and collection progress.' },
          { title: 'Financial Reports for Better School Management', description: 'Generate reports covering daily collections, student-wise and class-wise fee details, pending and defaulter reports, concessions, scholarships, and payment transaction records.' },
        ],
      },
      {
        id: 'why-choose',
        kind: 'benefits',
        heading: 'Why Schools Choose ChaloSchools for Fee Management?',
        items: [
          { title: 'Less Manual Work', description: 'Automate repetitive fee collection, receipt generation, reminders, and reporting tasks.' },
          { title: 'Faster Collections', description: 'Give parents convenient online payment options and reduce delays in fee collection.' },
          { title: 'Better Visibility', description: "Know your school's collection status, pending dues, and defaulters at a glance." },
          { title: 'Fewer Errors', description: 'Keep student and fee information organized in a centralized system instead of maintaining multiple spreadsheets.' },
          { title: 'Easier Parent Payments', description: 'Let parents access fee information and make payments online without unnecessary visits to the school.' },
          { title: 'Better Financial Control', description: 'Give administrators and accounts teams the reports they need to monitor collections and outstanding amounts.' },
        ],
      },
    ],
    faqs: [
      { q: 'What is school fee management software?', a: 'School fee management software is a module within school management software that helps schools manage fee structures, installments, concessions, payments, receipts, pending dues, reminders, and collection reports from a centralized system.' },
      { q: 'Can parents pay school fees online?', a: 'Yes. ChaloSchools supports online fee payments through supported digital payment methods such as UPI, cards, and net banking, making it easier for parents to pay fees without visiting the school.' },
      { q: 'Can we create different fee structures for different classes?', a: 'Yes. Schools can configure fee structures according to their academic and administrative requirements, including different fee components, classes, student categories, and payment schedules.' },
      { q: 'Can schools manage installments and concessions?', a: 'Yes. Schools can manage installment schedules, concessions, scholarships, discounts, and adjustments while keeping track of the amount due and amount collected.' },
      { q: 'Can we track students with pending fees?', a: 'Yes. The Fees & Finance module provides visibility into pending and overdue fees, helping schools identify defaulters and follow up on outstanding payments.' },
      { q: 'Can the system generate fee receipts?', a: 'Yes. Fee receipts can be generated for recorded payments, giving schools and parents a clear record of each transaction.' },
      { q: 'Can we send reminders for pending fees?', a: 'Yes. Schools can automate fee-related reminders through supported communication channels such as SMS and WhatsApp to keep parents informed about upcoming or overdue payments.' },
      { q: 'Is Fees & Finance a standalone software?', a: "No. ChaloSchools' Fees & Finance is a module within the complete school management software. It works alongside other school operations so that student, communication, and fee-related information can be managed through one integrated system." },
    ],
    cta: {
      heading: 'Ready to Simplify School Fee Collection?',
      description: 'Move away from manual fee registers, spreadsheets, and repetitive payment follow-ups. See how ChaloSchools can help your school manage fees, collections, reminders, and financial reporting from one platform.',
      buttons: [{ label: 'Book a Free Demo', href: '/contact#contact-form' }],
    },
  },
  {
    slug: 'payroll-management',
    shortTitle: 'Payroll Management',
    metaTitle: 'HR & Payroll Software for Schools | Employee Payroll Management – ChaloSchools',
    metaDescription:
      "ChaloSchools' HR and payroll software handles salary structures, PF/ESI/TDS, leave and payslips — inside one school management system.",
    hero: {
      eyebrow: 'Payroll Management',
      title: 'Payroll Day Does Not Have to Be an Emergency | Payroll Management System',
      description:
        "Each employee category has different payment terms. ChaloSchools' payroll management system handles salary structures, deductions, and legal compliance.",
      ctas: [
        { label: 'Book a Free Demo', href: '/contact#contact-form' },
        { label: 'See All Modules', href: '/product', variant: 'outline' },
      ],
      tagline: 'Self-Service Payslips. PF/ESI/TDS Ready. Multiple Pay Structures.',
    },
    sections: [
      {
        id: 'overview',
        kind: 'text',
        heading: 'Where Does School Payroll Usually Break Down?',
        paragraphs: [
          'Ask any school accountant what the final week of a month looks like — a spreadsheet formula that broke a month ago and nobody has fixed, a leave register that is one week behind schedule, attendance records from three departments, and a deadline that stays the same no matter how messy the inputs are. This is not because the person handling payroll is incapable; school payroll simply involves more moving elements than in most other organizations.',
          "ChaloSchools is built around that reality. Payroll doesn't need to be a monthly project because salary structures, attendance, leave approvals, and statutory deductions are brought together in one ERP — calculated consistently every month for all staff categories.",
        ],
      },
      {
        id: 'challenges',
        kind: 'problems',
        badge: 'The Problems',
        heading: 'Where School Payroll Actually Breaks Down',
        items: [
          { title: 'Different Staff, Different Rules', description: 'Managing the distinct compensation systems of teaching, non-teaching, contract, and part-time employees using a spreadsheet is difficult.' },
          { title: 'Payroll and Attendance Do Not Communicate', description: 'Salary is calculated in one location while leave and attendance are tracked in another — both must be manually reconciled each month.' },
          { title: 'Compliance Calculated by Hand', description: 'ESI, PF, professional tax, and TDS are all calculated by hand. One incorrect slab results in a correction cycle nobody has time for.' },
          { title: 'Payslips on Request', description: 'There is no place for employees to download payslips themselves — they need to email the accounts office every month.' },
        ],
      },
      {
        id: 'workflow',
        kind: 'workflow',
        heading: 'Four Steps From Attendance to Payslips',
        steps: [
          { title: 'Structure Setup', description: 'Define pay structures — basic pay, allowances, deductions, and pay frequency — once for every staff category, and assign employees to the right structure.' },
          { title: 'Attendance Feed', description: "Unpaid leave and absences recorded in the ERP's attendance module carry over automatically to each employee's payroll." },
          { title: 'Review & Approve', description: 'Accounts personnel review the resulting payroll run, with statutory deductions already computed, before it goes for approval.' },
          { title: 'Disburse & Publish Payslips', description: 'After approval, salary disbursement reports are prepared for the bank and digital payslips are released for each employee to view.' },
        ],
      },
      {
        id: 'core-features',
        kind: 'benefits',
        heading: 'The Actual Functions of the HR & Payroll Module',
        items: [
          { title: 'Adaptable Salary Structures', description: 'Establish distinct pay structures with allowances, deductions, and pay frequency for teaching, non-teaching, administrative, and contractual staff — defined once and reused each month.' },
          { title: 'Payroll Linked to Attendance and Leave', description: 'Salary calculations pull directly from existing attendance and leave records, so loss-of-pay days, authorised leave, and overtime are reflected automatically rather than entered manually.' },
          { title: 'Built-In Statutory Compliance', description: 'PF, ESI, professional tax, and TDS are calculated against each employee\'s applicable slab, with the reports required for filing generated alongside the payroll run.' },
          { title: 'Digital Payslips', description: 'Payslips are generated automatically once approved and made available to each employee individually — no need to wait for the office to email them.' },
          { title: 'Advances, Loans & Arrears', description: 'Record staff loans and salary advances once and the system handles the monthly schedule. Arrears are calculated automatically against the effective date of a pay revision.' },
          { title: 'Role-Based Approval Workflow', description: 'Payroll goes through a predetermined approval process — created by accounts, reviewed by the principal or admin head — so nothing goes out without proper sign-off.' },
        ],
      },
      {
        id: 'staff-categories',
        kind: 'tabs',
        heading: 'Handles Payroll of Every Staff Category',
        tabs: [
          { id: 'teaching', label: 'Teaching Staff', description: 'Manage pay scales based on experience and designation, including leave encashment and increment cycles that follow the academic calendar rather than a general annual cycle.' },
          { id: 'non-teaching', label: 'Non-Teaching & Support Staff', description: 'Oversee hourly, daily, or fixed-salary structures independently of teaching pay scales, using attendance-linked computations that correspond to how these positions are actually tracked.' },
          { id: 'contract', label: 'Contractual & Part-Time Hires', description: 'Establish shorter-term compensation structures with their own conditions instead of forcing contract workers into a system meant for long-term staff.' },
          { id: 'management', label: 'Management & Administration', description: 'Keep track of office and leadership remuneration structures, including elements like performance-linked compensation or non-applicable fixed allowances.' },
        ],
      },
      {
        id: 'comparison',
        kind: 'table',
        heading: 'Spreadsheet vs. School Management System. See the Difference.',
        variant: 'compare',
        leftHeader: 'Without a Dedicated Payroll System',
        rightHeader: 'With ChaloSchools',
        rows: [
          { left: 'Each staff category requires a separate manual calculation sheet', right: 'One system, with a distinct configurable structure for each category' },
          { left: 'Each month, attendance and leave are manually compared to payroll', right: 'Payroll automatically incorporates attendance and leave data' },
          { left: 'PF, ESI, professional tax, and TDS calculated manually, slab by slab', right: "Automatic computation of statutory deductions based on each employee's relevant slab" },
          { left: 'Employees email or contact the accounts office for previous payslips', right: 'Employees can download their own payslips at any moment' },
          { left: 'Salary revisions require recalculating arrears from the beginning', right: 'Arrears are computed automatically starting on the date of the revision' },
          { left: 'Payroll approval happens over email threads or in person', right: 'An integrated approval process before every payroll run is completed' },
        ],
      },
      {
        id: 'internal-links',
        kind: 'connected',
        heading: 'Not a Standalone Payroll Tool. Part of Your School ERP',
        paragraphs: [
          "Within ChaloSchools, payroll is integrated into all aspects of the school's operations. Staff Management provides attendance and leave data, Fees & Finance provides salary disbursement information, and each payroll report feeds into the same Reports & Analytics dashboard your management team already uses. That is the real difference between a school management software, where payroll is one more integrated function, and a separate payroll product.",
        ],
        links: [
          { label: 'Explore Staff Management', href: '/features/staff-hr' },
          { label: 'Explore Fees & Finance', href: '/features/fees' },
        ],
      },
    ],
    faqs: [
      { q: "Is this a part of ChaloSchools' school management software or separate payroll software?", a: "It is part of ChaloSchools' school management system, not a standalone program. Payroll is processed directly from the platform's existing staff, leave, and attendance records; no additional data entry is required." },
      { q: 'How does leave affect salary calculation?', a: 'Approved leave and loss-of-pay days entered in the attendance module are automatically carried to payroll, so deductions match what was actually recorded rather than a manual estimate.' },
      { q: 'Is HR & Payroll Management included in the standard ChaloSchools plan, or is it an add-on?', a: 'HR & Payroll Management is a core feature of the ChaloSchools school management platform. Contact our team for information specific to your plan.' },
    ],
    cta: {
      heading: 'Quit Making Payroll From Scratch Each Month',
      description: "See how ChaloSchools' HR and payroll software integrates salary structures, attendance, and legal compliance.",
      buttons: [
        { label: 'Book a Free Demo', href: '/contact#contact-form' },
        { label: 'Talk to Sales', href: '/contact', variant: 'outline' },
      ],
    },
  },
  {
    slug: 'staff-hr',
    shortTitle: 'Staff Management',
    metaTitle: 'School Staff & Payroll Management System | ChaloSchools',
    metaDescription:
      "Manage teaching and non-teaching staff, employee records, attendance, leave and payroll with Chalo Schools' integrated staff management module.",
    hero: {
      title: 'Staff Management Software for Schools',
      description:
        "Simplify staff administration with ChaloSchools' built-in staff management system. Manage employee records, staff attendance, leave, payroll information and day-to-day administrative tasks from the same school management software your institution already uses.",
      ctas: [{ label: 'Book a Demo', href: '/contact#contact-form' }],
      tagline: 'Manage Your School Staff, Attendance, Leave and Payroll in One Place',
    },
    sections: [
      {
        id: 'challenges',
        kind: 'problems',
        badge: 'Common Challenges',
        heading: 'Common Challenges in Employee Management',
        items: [
          { title: 'Employee Records Scattered Across Files and Spreadsheets', description: 'Staff information is often spread across Excel sheets, files, and registers, making it difficult to maintain an accurate employee database and quickly find the information you need.' },
          { title: 'Manual Attendance, Leave & Payroll Calculations', description: 'Tracking staff attendance, leave, and payroll manually takes valuable administrative time and increases the risk of errors.' },
          { title: 'No Centralized Staff Management System', description: 'Managing recruitment, onboarding, documents, appraisals, and employee information across separate processes makes staff administration harder than it needs to be.' },
          { title: 'Disconnected HR Processes', description: 'When employee management, attendance, leave, and payroll are handled separately, administrators spend more time switching between tools and maintaining duplicate records.' },
        ],
      },
      {
        id: 'benefits',
        kind: 'benefits',
        heading: 'Everything You Need for Efficient Staff Management',
        subheading: 'Simplify everyday HR tasks, reduce paperwork, and keep your school staff management organized and efficient.',
        items: [
          { title: 'Centralized Employee Database', description: 'Keep your school\'s employee information organized in a centralized module. Store and access important staff details, manage profiles, roles, and departments without relying on scattered spreadsheets or paper records.' },
          { title: 'Staff Attendance Management', description: 'Track staff attendance efficiently and maintain accurate attendance records for teachers and non-teaching employees, reducing the manual effort involved in maintaining staff registers.' },
          { title: 'Leave Management', description: 'Manage staff leave requests and records from within the school management system, giving administrators a clear view of staff availability and leave history.' },
          { title: 'Payroll Management', description: 'Bring essential payroll management into your school\'s administrative workflow, organizing employee information and payroll-related records alongside other school operations.' },
          { title: 'Role-Based Staff Access', description: 'Give staff members access according to their responsibilities. Schools can control which areas of the platform different employees can access while working efficiently.' },
          { title: 'Teacher and Non-Teaching Staff Management', description: 'Manage your entire workforce — teachers, administrative staff, support staff, department heads, and other employees — from one platform.' },
        ],
      },
      {
        id: 'built-for-schools',
        kind: 'connected',
        heading: 'Employee Management Built for Schools',
        paragraphs: [
          'ChaloSchools brings essential staff management capabilities directly into its complete school management system, so administrators can handle employee-related tasks alongside their everyday school operations.',
          'Teachers, academic staff, administrators, and support employees work within a school environment where staff management connects closely with attendance, timetables, departments, and other school operations. Instead of buying a separate employee management application, schools can manage staff as part of their wider school ERP environment.',
        ],
      },
      {
        id: 'why-choose',
        kind: 'benefits',
        heading: 'Why Schools Choose Integrated Staff Management?',
        subheading: 'Give administrators better visibility, smoother workflows, and greater control over workforce management.',
        items: [
          { title: 'One Platform', description: 'Manage staff information alongside other school operations.' },
          { title: 'Centralized Employee Records', description: 'Keep important employee information organized and accessible.' },
          { title: 'Less Paperwork', description: 'Reduce dependency on manual registers and spreadsheets.' },
          { title: 'Simplified Administration', description: 'Make routine staff management tasks easier for school administrators.' },
          { title: 'Connected School Operations', description: 'Keep staff management within the same platform used for other school processes.' },
          { title: 'Better Visibility', description: 'Give authorized administrators a clearer view of staff information and administrative records.' },
        ],
      },
    ],
    faqs: [
      { q: 'Does ChaloSchools have employee management software?', a: 'Yes. ChaloSchools includes staff and employee management capabilities as a module within its school management platform. Schools can use it to organize employee information and manage important staff-related administrative processes.' },
      { q: 'Does ChaloSchools provide payroll software?', a: "ChaloSchools includes HR and payroll-related functionality as part of its integrated school management platform. The payroll capabilities are designed for school administration and are part of ChaloSchools rather than a standalone HR product." },
      { q: 'Can I use ChaloSchools as an employee database software?', a: 'Yes. The staff management module provides a centralized place for schools to organize employee information, helping administrators manage staff records more efficiently.' },
      { q: 'Can we manage both teaching and non-teaching staff?', a: "Yes. ChaloSchools' staff management module allows schools to manage both teaching and non-teaching employees within the same school management system, helping administrators keep staff information and related records organized in one place." },
    ],
    cta: {
      heading: 'Ready to Experience Staff & Payroll?',
      description: 'Give your administrators a simpler way to manage employees while keeping staff management connected to the rest of your school operations. Explore ChaloSchools and manage your school from one powerful platform.',
      buttons: [
        { label: 'Book a Demo', href: '/contact#contact-form' },
        { label: 'View Solutions', href: '/solutions/state-cbse', variant: 'outline' },
      ],
    },
  },
  {
    slug: 'student-management',
    shortTitle: 'Student Management',
    metaTitle: 'Student Management Software for Schools | ChaloSchools',
    metaDescription:
      'Manage student records with ChaloSchools student management software. Organize student profiles, academic records, attendance, documents, history, and reports in one school platform.',
    hero: {
      title: 'Student Management Software for Schools',
      description:
        'ChaloSchools brings student profiles, academic information, attendance, documents, class details, and student history together, within your school management software.',
      ctas: [{ label: 'Book a Free Demo', href: '/contact#contact-form' }],
      tagline: 'Keep Every Student Record Organized From Admission to Graduation',
    },
    sections: [
      {
        id: 'challenges',
        kind: 'problems',
        badge: 'Common Challenges',
        heading: 'Student Records Get Complicated as Schools Grow',
        subheading: 'Every student has more than a name and admission number. Over the years, schools manage academic details, attendance, class changes, parent information, documents, activities, remarks, examination records, and much more.',
        items: [
          { title: 'Student Information Is Scattered', description: 'Important details may exist across registers, spreadsheets, files, and different departments.' },
          { title: 'Finding a Record Takes Time', description: "Staff may need to search through multiple sources to locate a student's latest information." },
          { title: 'Student Profiles Are Difficult to Maintain', description: 'Changes in classes, sections, contact details, or academic information need to be updated consistently.' },
          { title: 'Records Get Duplicated', description: 'Re-entering the same student information across different systems increases administrative work.' },
          { title: 'Difficulty Accessing Historical Information', description: 'It may be difficult accessing previous academic records, transfers, and graduated student information.' },
          { title: 'Student Information Stays Disconnected', description: 'Attendance, examinations, fees, timetable, and communication may exist separately from the main student record.' },
          { title: 'Reports Require Manual Preparation', description: 'Administrators often spend unnecessary time collecting student information before creating reports.' },
          { title: 'Growing Student Numbers Increase the Workload', description: 'Managing hundreds or thousands of student records becomes increasingly difficult without a structured system.' },
        ],
      },
      {
        id: 'profile-table',
        kind: 'table',
        heading: 'One Student Profile, More Detailed Data',
        subheading: "More than just basic personal information should be included in a student's record. ChaloSchools provides an organized space for schools to maintain each student's data.",
        variant: 'info',
        leftHeader: 'Student Information',
        rightHeader: 'What Schools Can Manage',
        rows: [
          { left: 'Personal Details', right: 'Name, admission information and profile details' },
          { left: 'Parent / Guardian', right: 'Parent and guardian information' },
          { left: 'Academic Details', right: 'Class, section, subjects, and academic history' },
          { left: 'Attendance', right: 'Attendance records and history' },
          { left: 'Examination', right: 'Marks, grades and examination results' },
          { left: 'Documents', right: 'Relevant student documents and records' },
          { left: 'Activities', right: 'Assigned activities and school-related information' },
          { left: 'Remarks', right: 'Teacher or administrative remarks' },
          { left: 'Fees', right: 'Relevant fee information' },
          { left: 'Communication', right: 'Important school and parent updates' },
        ],
      },
      {
        id: 'benefits',
        kind: 'benefits',
        heading: 'Everything You Need for Student Management',
        items: [
          { title: 'Student Profile Management', description: 'Keep essential student data in a well-organized online profile that only authorized school personnel can view.' },
          { title: 'Class & Section Management', description: 'Students can be viewed and arranged based on their current class, section, academic year, or any other structure established by the institution.' },
          { title: 'Parent & Guardian Information', description: "For easier access and communication, keep relevant parent and guardian information linked to the student's profile." },
          { title: 'Academic Information', description: 'Keep student-related academic data, including class, subject, exam, and other academic records.' },
          { title: 'Attendance Records', description: 'Get attendance data without keeping a separate student attendance log outside of the primary system.' },
          { title: 'Examination Records', description: "Maintain the examination history, grades, marks, and outcomes linked to the student's academic profile." },
          { title: 'Document Management', description: 'Digitally store student records so authorized people can access the necessary information when needed.' },
          { title: 'Student Search and Filters', description: 'Instead of reviewing each file individually, use search and filtering options to find student records.' },
          { title: 'Student Reports', description: 'Create informative student reports using the data stored on the platform.' },
          { title: 'Academic History', description: 'As students transition between classes and academic years, keep prior student data accessible.' },
        ],
      },
      {
        id: 'workflow',
        kind: 'workflow',
        heading: 'Easy Find — No Need to Search Through Files',
        steps: [
          { title: 'Search Student' },
          { title: 'Open Profile' },
          { title: 'Review Information' },
          { title: 'Check Records', description: 'Academic / attendance / exam records' },
          { title: 'Take Action', description: 'Or generate a report' },
        ],
      },
      {
        id: 'role-views',
        kind: 'tabs',
        heading: 'Different Users Require Different Views of Student Information',
        subheading: 'Information access can be managed based on school permissions and user responsibilities.',
        tabs: [
          { id: 'administrators', label: 'For Administrators', description: 'What administrators can do with student records.', points: ['Manage student profiles', 'Search student records', 'Review class and section information', 'Access historical records', 'Generate student-related reports'] },
          { id: 'teachers', label: 'For Teachers', description: 'What teachers can do with student records.', points: ['View relevant student information', 'Access class and section details', 'Review attendance and academic information', 'Add or review permitted remarks', 'Support student progress monitoring'] },
          { id: 'parents', label: 'For Parents', description: 'What parents can do with student records.', points: ['Access relevant information about their child', 'Stay informed about academic activities', 'Receive school communication', 'Follow attendance and examination updates through available school channels'] },
        ],
      },
      {
        id: 'continuity',
        kind: 'connected',
        heading: 'Student Records Stay Beyond an Academic Year',
        paragraphs: [
          'When the academic year changes, student information should not be lost. ChaloSchools can assist in preserving continuity, giving administrators a more complete view of a student\'s journey through the school.',
        ],
        chips: ['Previous classes', 'Academic years', 'Examination records', 'Attendance history', 'Student documents', 'Parent information', 'Activities and remarks', 'Student performance information'],
      },
      {
        id: 'why-choose',
        kind: 'benefits',
        heading: 'Why Choose ChaloSchools for Student Management?',
        subheading: 'Built around the way schools actually work.',
        items: [
          { title: 'Designed with School Workflows in Mind', description: 'Student information is organized with classes, sections, academic years, teachers, and regular school activities.' },
          { title: 'A Better Understanding of Each Student', description: "Staff can understand a student's academic and administrative history as our module brings relevant information together." },
          { title: 'Reduced Spreadsheet Dependencies', description: 'For routine student information management, move away from scattered Excel files and paper-based records.' },
          { title: 'Beneficial for All Departments', description: 'Instead of keeping separate records for each department, it gives authorized teams a common student information base.' },
          { title: 'Encourages School Growth', description: 'Keeps student information well structured and organized as the number of students, classes, and sections increases.' },
          { title: 'Part of a Complete School Platform', description: "Student management is integrated into the larger ChaloSchools school management system, rather than operating as an isolated system." },
        ],
      },
    ],
    faqs: [
      { q: 'What is student management software?', a: "Student management software helps schools create, organize, maintain, and access students' personal details, class information, academic records, attendance, documents, exam information, and student history." },
      { q: 'What is a student record management system?', a: 'Instead of relying on individual paper files and spreadsheets, a student record management system gives schools an organized way to store and access records online.' },
      { q: 'Is student management part of school management software?', a: 'Yes. ChaloSchools offers student management as part of the larger school management software, enabling student data to be integrated with other school functions.' },
    ],
    cta: {
      heading: 'From Student Information to Better School Operations',
      description: "Your students produce information throughout their academic journey. ChaloSchools' structured student management system supports teachers, administrators, and school operations. Create student records. Arrange information. Monitor progress. Access history. Everything within your school management software.",
      buttons: [
        { label: 'Book Your Demo', href: '/contact#contact-form' },
        { label: 'Talk to Sales', href: '/contact', variant: 'outline' },
      ],
    },
  },
  {
    slug: 'admissions',
    shortTitle: 'Admissions Management',
    metaTitle: 'Admission Management System for Schools | ChaloSchools',
    metaDescription:
      'Streamline school admissions with ChaloSchools. Manage enquiries, online applications, document verification, seat allocation and admission status from one school management software.',
    hero: {
      title: 'Turn Every Admission Enquiry Into a Seamless Enrolment | 0 Paperwork',
      description:
        'Simplify school admissions from enquiry to enrolment. No scattered records. No missed follow-ups. Just a simpler way to manage admissions.',
      ctas: [{ label: 'Book a Demo', href: '/contact#contact-form' }],
    },
    sections: [
      {
        id: 'challenges',
        kind: 'problems',
        badge: 'Sound Familiar',
        heading: 'Is Managing School Admissions Becoming a Challenge?',
        subheading: 'Handling admissions manually can quickly become complicated as enquiries and applications increase. Disconnected records, repeated follow-ups and paperwork can make it difficult for your team to stay organized.',
        items: [
          { title: 'Manual Enquiry Tracking', description: 'Enquiries are tracked in registers or spreadsheets instead of a centralized system.' },
          { title: 'Lost Follow-Ups', description: 'Follow-ups with prospective parents get missed as enquiry volume grows.' },
          { title: 'No Online Application Option', description: 'Parents have no way to submit applications online.' },
          { title: 'Time-Consuming Paperwork', description: 'Manual data entry adds unnecessary administrative work.' },
          { title: 'Document Verification Is Difficult', description: 'Collecting and verifying admission documents manually slows the process down.' },
          { title: 'No Clear Status Visibility', description: 'There is no clear view into application and admission status at any given point.' },
          { title: 'Scattered Applicant Information', description: 'Applicant information is spread across different records instead of one place.' },
        ],
      },
      {
        id: 'benefits',
        kind: 'benefits',
        heading: 'Manage Every Stage of the Admission Journey From One Place',
        subheading: 'A modern admission management system should do more than collect application forms.',
        items: [
          { title: 'Capture Every Admission Enquiry', description: 'Keep prospective student enquiries organized instead of relying on notebooks, spreadsheets or separate records, and follow up at the right time.' },
          { title: 'Accept Applications Online', description: 'Give parents the convenience of submitting applications online through customizable forms that collect only what your school needs.' },
          { title: 'Collect and Verify Documents', description: 'Allow applicants to upload required documents digitally and manage the verification process without handling piles of physical paperwork.' },
          { title: 'Track Admission Progress', description: 'Get a clear view of where every applicant stands — from enquiry through processing and admission — so your team always knows the next step.' },
          { title: 'Manage Seat Allocation', description: "Keep track of available seats and allocate students according to your school's admission process, class-wise or grade-wise." },
          { title: 'Keep Parents Updated', description: 'Use automated SMS and email communication to keep parents informed about application updates, requirements and important admission activities.' },
        ],
      },
      {
        id: 'workflow',
        kind: 'workflow',
        heading: 'From First Enquiry to Student Record',
        subheading: 'A simpler admission workflow for modern schools',
        steps: [
          { title: 'Enquiry', description: 'Capture prospective student enquiries and keep their information organized.' },
          { title: 'Application', description: 'Parents complete the online admission form and submit the required information.' },
          { title: 'Document Submission', description: "Applicants upload the necessary documents for the school's review." },
          { title: 'Verification', description: 'The admission team reviews and verifies submitted information and documents.' },
          { title: 'Seat Allocation', description: 'Allocate students to the appropriate class or grade based on availability and school requirements.' },
          { title: 'Enrollment', description: "Move successfully admitted students into the school's student management workflow." },
        ],
      },
      {
        id: 'why-choose',
        kind: 'benefits',
        heading: 'Why Choose ChaloSchools for Admission Management?',
        items: [
          { title: 'Reduce Manual Admission Work', description: 'Replace repetitive paperwork and scattered spreadsheets with a centralized digital admission process.' },
          { title: 'Never Lose Track of an Enquiry', description: 'Keep admission enquiries organized and follow their progress from the first interaction to enrollment.' },
          { title: 'Give Parents a Better Application Experience', description: 'Online forms and digital document submission make it easier for parents to apply without repeatedly visiting the school.' },
          { title: 'Improve Administrative Visibility', description: 'A centralized admission dashboard gives school management better visibility into applications, pending actions and admission progress.' },
          { title: 'Keep Admission Data Connected', description: "Because admissions are part of ChaloSchools' school management system, information becomes part of the broader student management workflow instead of remaining in a separate application." },
          { title: 'Make Better Admission Decisions', description: 'Organized admission data gives administrators a clearer picture of enquiries, applications and admissions throughout the academic cycle.' },
        ],
      },
      {
        id: 'built-for-schools',
        kind: 'benefits',
        heading: 'Built for the Way Schools Actually Manage Admissions',
        subheading: 'Every school has its own admission process. ChaloSchools provides the flexibility to adapt the digital workflow to your institution.',
        items: [
          { title: 'Custom Application Forms', description: 'Collect the student and parent information your school actually needs.' },
          { title: 'Digital Document Collection', description: 'Reduce physical paperwork by collecting applicant documents online.' },
          { title: 'Admission Status Tracking', description: 'Monitor applications and identify pending actions without searching through multiple files.' },
          { title: 'Centralized Records', description: 'Keep admission-related information organized and accessible to authorized users.' },
          { title: 'Parent Communication', description: 'Send timely updates through integrated SMS and email communication.' },
          { title: 'Connected School Operations', description: 'Manage admissions as part of a complete school management software platform rather than a standalone tool.' },
        ],
      },
    ],
    faqs: [
      { q: 'Does ChaloSchools offer an admission management system?', a: 'Yes. ChaloSchools includes an admission management system as part of its complete school management platform. Schools can manage enquiries, online applications, documents, admission status and other admission activities from a centralized system.' },
      { q: 'Can parents apply for admission online?', a: 'Yes. ChaloSchools enables schools to provide customizable online application forms that parents can complete and submit digitally. Applicants can also upload the required documents as part of the application process.' },
      { q: 'How does ChaloSchools help manage admission enquiries?', a: 'ChaloSchools helps schools capture and organize admission enquiries and track their progress through the admission pipeline, giving administrators better visibility and reducing the possibility of missed follow-ups.' },
      { q: 'How does admission management integrate with school management software?', a: "When admissions are managed within a school management software platform, applicant information can be connected with the school's broader student management processes, reducing the need to maintain duplicate records across multiple systems." },
    ],
    cta: {
      heading: 'Ready to Simplify Your School Admissions?',
      description: 'From enquiries and applications to document verification and enrolment, ChaloSchools helps your team manage admissions through one connected platform. Bring your school\'s admission process online with ChaloSchools.',
      buttons: [{ label: 'Book a Free Demo', href: '/contact#contact-form' }],
    },
  },
];

export function getRichFeatureBySlug(slug: string): RichFeaturePage | undefined {
  return richFeaturePages.find((p) => p.slug === slug);
}
