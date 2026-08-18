import { PrismaClient } from '@prisma/client';

interface SeedItem {
  key: string;
  value: string;
  section: string;
  label: string;
  type: string;
  order: number;
}

const SEED_DATA: SeedItem[] = [
  // Homepage - Hero Section
  {
    key: 'hero_badge',
    value: 'Trusted by 200+ Indian Schools',
    section: 'Homepage - Hero',
    label: 'Hero Badge Text',
    type: 'text',
    order: 0,
  },
  {
    key: 'hero_headline',
    value:
      'Automate Admissions, Fees, Attendance & Communication — All in One Elegant Platform',
    section: 'Homepage - Hero',
    label: 'Hero Headline',
    type: 'textarea',
    order: 1,
  },
  {
    key: 'hero_description',
    value:
      'The all-in-one school management platform trusted by 1000+ schools. Streamline every operation from admissions to alumni — so you can focus on what matters most: education.',
    section: 'Homepage - Hero',
    label: 'Hero Description',
    type: 'textarea',
    order: 2,
  },
  {
    key: 'hero_cta_primary',
    value: 'Request a Demo',
    section: 'Homepage - Hero',
    label: 'Primary CTA Button',
    type: 'text',
    order: 3,
  },
  {
    key: 'hero_cta_secondary',
    value: 'Watch Demo',
    section: 'Homepage - Hero',
    label: 'Secondary CTA Button',
    type: 'text',
    order: 4,
  },

  // Homepage - Social Proof
  {
    key: 'social_proof_count',
    value: '1000+',
    section: 'Homepage - Social Proof',
    label: 'Trusted Schools Count',
    type: 'text',
    order: 0,
  },
  {
    key: 'social_proof_label',
    value: 'Schools Across India',
    section: 'Homepage - Social Proof',
    label: 'Trusted Schools Label',
    type: 'text',
    order: 1,
  },
  {
    key: 'social_proof_schools',
    value: "DAV Schools, Maharishi Vidya Mandir, Pushpalata Schools, Krishnaswamy Group, Vidhyasagar Global Institutions, Air Force Schools, Vivekanda Vidyalaya Group, Kamala Niketan School",
    section: 'Homepage - Social Proof',
    label: 'Client School Names (comma-separated)',
    type: 'textarea',
    order: 2,
  },

  // Homepage - Final CTA
  {
    key: 'final_cta_badge',
    value: 'Join 1000+ Schools Across India',
    section: 'Homepage - Final CTA',
    label: 'CTA Badge',
    type: 'text',
    order: 0,
  },
  {
    key: 'final_cta_headline',
    value: 'Ready to Transform Your School?',
    section: 'Homepage - Final CTA',
    label: 'CTA Headline',
    type: 'text',
    order: 1,
  },
  {
    key: 'final_cta_description',
    value:
      'Get in touch with our experts for a demo and know what Chalo can do to your regular school administration activities.',
    section: 'Homepage - Final CTA',
    label: 'CTA Description',
    type: 'textarea',
    order: 2,
  },
  {
    key: 'final_cta_primary_btn',
    value: 'Request a Demo',
    section: 'Homepage - Final CTA',
    label: 'Primary Button',
    type: 'text',
    order: 3,
  },
  {
    key: 'final_cta_secondary_btn',
    value: 'Schedule a Callback',
    section: 'Homepage - Final CTA',
    label: 'Secondary Button',
    type: 'text',
    order: 4,
  },

  // Homepage - Problems
  {
    key: 'problems_badge',
    value: 'The Challenges',
    section: 'Homepage - Problems',
    label: 'Section Badge',
    type: 'text',
    order: 0,
  },
  {
    key: 'problems_headline',
    value: 'Is Your Current School Management System Holding You Back?',
    section: 'Homepage - Problems',
    label: 'Section Headline',
    type: 'text',
    order: 1,
  },
  {
    key: 'problems_subtitle',
    value: 'If any of these sound familiar, it\'s time for an upgrade.',
    section: 'Homepage - Problems',
    label: 'Section Subtitle',
    type: 'textarea',
    order: 2,
  },
  {
    key: 'problem_1_title',
    value: 'Scattered Data',
    section: 'Homepage - Problems',
    label: 'Problem 1 Title',
    type: 'text',
    order: 3,
  },
  {
    key: 'problem_1_desc',
    value: 'Student information is spread across multiple systems, making it difficult to access accurate data quickly.',
    section: 'Homepage - Problems',
    label: 'Problem 1 Description',
    type: 'textarea',
    order: 4,
  },
  {
    key: 'problem_2_title',
    value: 'Slow & Outdated Software',
    section: 'Homepage - Problems',
    label: 'Problem 2 Title',
    type: 'text',
    order: 5,
  },
  {
    key: 'problem_2_desc',
    value: 'Your current ERP feels slow, outdated, and requires multiple clicks for simple daily tasks.',
    section: 'Homepage - Problems',
    label: 'Problem 2 Description',
    type: 'textarea',
    order: 6,
  },
  {
    key: 'problem_3_title',
    value: 'Communication Gaps',
    section: 'Homepage - Problems',
    label: 'Problem 3 Title',
    type: 'text',
    order: 7,
  },
  {
    key: 'problem_3_desc',
    value: 'Important announcements, fee reminders, and updates fail to reach parents on time.',
    section: 'Homepage - Problems',
    label: 'Problem 3 Description',
    type: 'textarea',
    order: 8,
  },
  {
    key: 'problem_4_title',
    value: 'Limited Features & Reporting',
    section: 'Homepage - Problems',
    label: 'Problem 4 Title',
    type: 'text',
    order: 9,
  },
  {
    key: 'problem_4_desc',
    value: 'Your existing software lacks modern features like AI automation, mobile apps, online admissions, and real-time dashboards.',
    section: 'Homepage - Problems',
    label: 'Problem 4 Description',
    type: 'textarea',
    order: 10,
  },
  {
    key: 'problem_5_title',
    value: 'Parent Frustration',
    section: 'Homepage - Problems',
    label: 'Problem 5 Title',
    type: 'text',
    order: 11,
  },
  {
    key: 'problem_5_desc',
    value: 'Parents struggle with fragmented communication and the lack of real-time updates on their child\'s attendance, academics, fees, and school activities.',
    section: 'Homepage - Problems',
    label: 'Problem 5 Description',
    type: 'textarea',
    order: 12,
  },
  {
    key: 'problem_6_title',
    value: 'Data Security Risks',
    section: 'Homepage - Problems',
    label: 'Problem 6 Title',
    type: 'text',
    order: 13,
  },
  {
    key: 'problem_6_desc',
    value: 'Protect sensitive student and school data with ChaloSchools\' ISO 27001 Certified platform, ensuring secure, centralized, and compliant data management.',
    section: 'Homepage - Problems',
    label: 'Problem 6 Description',
    type: 'textarea',
    order: 14,
  },

  // Homepage - Features
  {
    key: 'features_badge',
    value: 'Everything You Need in One Platform',
    section: 'Homepage - Features',
    label: 'Section Badge',
    type: 'text',
    order: 0,
  },
  {
    key: 'features_headline',
    value: '14 Powerful Modules, One Dashboard',
    section: 'Homepage - Features',
    label: 'Section Headline',
    type: 'text',
    order: 1,
  },
  {
    key: 'features_subtitle',
    value: 'From admissions to alumni — every tool your school needs, seamlessly integrated and ready to use from day one.',
    section: 'Homepage - Features',
    label: 'Section Subtitle',
    type: 'textarea',
    order: 2,
  },

  // Note: individual feature_N_name/feature_N_desc overrides were removed —
  // they were positional (by card index) and went stale/mismatched when the
  // module grid was reordered and expanded from 11 to 14 cards. The card
  // titles/descriptions now come directly from the `features` array in
  // FeatureHighlights.tsx, which is already correct and complete.

  // Homepage - Solutions
  { key: 'solutions_badge', value: 'Built For Your Board', section: 'Homepage - Solutions', label: 'Section Badge', type: 'text', order: 0 },
  { key: 'solutions_headline', value: 'Tailored Solutions for Every Board', section: 'Homepage - Solutions', label: 'Section Headline', type: 'text', order: 1 },
  { key: 'solutions_subtitle', value: 'Whether you follow CBSE, State Board, ICSE, IB, or Cambridge — ChaloSchools adapts to your curriculum, grading system, and reporting requirements.', section: 'Homepage - Solutions', label: 'Section Subtitle', type: 'textarea', order: 2 },
  { key: 'solution_1_name', value: 'Pre School', section: 'Homepage - Solutions', label: 'Solution 1 Name', type: 'text', order: 3 },
  { key: 'solution_1_desc', value: 'Simplified management for playschools and preschools with activity tracking, parent communication, and fee management designed for early education.', section: 'Homepage - Solutions', label: 'Solution 1 Description', type: 'textarea', order: 4 },
  { key: 'solution_2_name', value: 'State & CBSE Schools', section: 'Homepage - Solutions', label: 'Solution 2 Name', type: 'text', order: 5 },
  { key: 'solution_2_desc', value: 'Full support for CCE, term-based, and annual exam patterns. Automatic report card generation in CBSE and State Board formats.', section: 'Homepage - Solutions', label: 'Solution 2 Description', type: 'textarea', order: 6 },
  { key: 'solution_3_name', value: 'ICSE Schools', section: 'Homepage - Solutions', label: 'Solution 3 Name', type: 'text', order: 7 },
  { key: 'solution_3_desc', value: 'Grade calculation, internal assessment tracking, and ICSE-specific report card formats with all the required fields.', section: 'Homepage - Solutions', label: 'Solution 3 Description', type: 'textarea', order: 8 },
  { key: 'solution_4_name', value: 'IB Schools', section: 'Homepage - Solutions', label: 'Solution 4 Name', type: 'text', order: 9 },
  { key: 'solution_4_desc', value: 'Support for PYP, MYP, and DP programmes with rubric-based assessment, CAS tracking, and extended essay management.', section: 'Homepage - Solutions', label: 'Solution 4 Description', type: 'textarea', order: 10 },
  { key: 'solution_5_name', value: 'Cambridge Schools', section: 'Homepage - Solutions', label: 'Solution 5 Name', type: 'text', order: 11 },
  { key: 'solution_5_desc', value: 'Cambridge Primary, Lower Secondary, IGCSE, and A-Level support with grade thresholds, checkpoint tracking, and Cambridge report cards.', section: 'Homepage - Solutions', label: 'Solution 5 Description', type: 'textarea', order: 12 },
  { key: 'solution_6_name', value: 'Matric / Higher Ed', section: 'Homepage - Solutions', label: 'Solution 6 Name', type: 'text', order: 13 },
  { key: 'solution_6_desc', value: 'Comprehensive management for matriculation schools and higher education institutions with semester-based grading and multi-department support.', section: 'Homepage - Solutions', label: 'Solution 6 Description', type: 'textarea', order: 14 },

  // Demo Video
  {
    key: 'demo_badge',
    value: 'See It In Action',
    section: 'Demo Video',
    label: 'Section Badge',
    type: 'text',
    order: 0,
  },
  {
    key: 'demo_headline',
    value: 'Product Walkthrough',
    section: 'Demo Video',
    label: 'Section Headline',
    type: 'text',
    order: 1,
  },
  {
    key: 'demo_subtitle',
    value: 'Watch how ChaloSchools transforms daily school operations in under 3 minutes.',
    section: 'Demo Video',
    label: 'Section Subtitle',
    type: 'textarea',
    order: 2,
  },
  {
    key: 'demo_video_url',
    value: '',
    section: 'Demo Video',
    label: 'YouTube Video URL',
    type: 'text',
    order: 3,
  },

  // About Page
  {
    key: 'about_mission',
    value:
      'Giving every Indian school access to the same efficient, data-driven administration tools — currently serving 200+ schools and 1.5M+ students across India, with more joining every month.',
    section: 'About',
    label: 'Our Mission',
    type: 'textarea',
    order: 0,
  },
  {
    key: 'about_vision',
    value:
      'To be the most trusted school management platform, making quality education management accessible to every school and empowering excellence in academic performance.',
    section: 'About',
    label: 'Our Vision',
    type: 'textarea',
    order: 1,
  },
  {
    key: 'about_story_1',
    value:
      'ChaloSchools – Schools Automated — is a product of Inspace Edu Solutions Private Limited. It was built from a simple observation: Indian schools spend more time managing paperwork than educating students.',
    section: 'About',
    label: 'Story Paragraph 1',
    type: 'textarea',
    order: 2,
  },
  {
    key: 'about_story_2',
    value:
      'What started as an effort to digitize school operations has grown into a comprehensive platform. Today, ChaloSchools handles all the activities for the operation of a school — from admissions and attendance to fees, transport, library, payroll, and more.',
    section: 'About',
    label: 'Story Paragraph 2',
    type: 'textarea',
    order: 3,
  },
  {
    key: 'about_story_3',
    value:
      "We've built ChaloSchools specifically for Indian schools — supporting Pre School, State & CBSE, IB, Cambridge, Montessori, and Matriculation/Higher Education curricula. Every feature is designed with input from real school leaders, teachers, and parents.",
    section: 'About',
    label: 'Story Paragraph 3',
    type: 'textarea',
    order: 4,
  },
  {
    key: 'about_story_4',
    value:
      'Our passionate team of educators and engineers works tirelessly to ensure that every school, regardless of size or budget, has access to world-class management technology.',
    section: 'About',
    label: 'Story Paragraph 4',
    type: 'textarea',
    order: 5,
  },

  // Contact Page
  {
    key: 'contact_hero_title',
    value: 'Contact Us',
    section: 'Contact',
    label: 'Page Title',
    type: 'text',
    order: 0,
  },
  {
    key: 'contact_hero_subtitle',
    value:
      "Have questions about ChaloSchools? Want a free demo? Our team is ready to help you find the perfect solution for your school.",
    section: 'Contact',
    label: 'Page Subtitle',
    type: 'textarea',
    order: 1,
  },
  {
    key: 'contact_form_title',
    value: 'Send Us a Message',
    section: 'Contact',
    label: 'Form Title',
    type: 'text',
    order: 2,
  },
  {
    key: 'contact_form_subtitle',
    value: "Fill out the form below and we'll get back to you within 24 hours.",
    section: 'Contact',
    label: 'Form Subtitle',
    type: 'text',
    order: 3,
  },
  {
    key: 'contact_office_title',
    value: 'Visit Our Office',
    section: 'Contact',
    label: 'Office Section Title',
    type: 'text',
    order: 4,
  },
  {
    key: 'contact_address',
    value:
      'AA Business Centre, 4th Floor, Old Door No.94/1 & 2, New No.27 and 28, East Park Road, Shenoy Nagar, Chennai 600030, Tamil Nadu, India',
    section: 'Contact',
    label: 'Full Address',
    type: 'textarea',
    order: 5,
  },
  {
    key: 'contact_phone_helpline',
    value: '+91 96777 32728',
    section: 'Contact',
    label: 'Helpline Phone',
    type: 'text',
    order: 6,
  },
  {
    key: 'contact_phone_sales',
    value: '+91 99622 28160',
    section: 'Contact',
    label: 'Sales Phone',
    type: 'text',
    order: 7,
  },
  {
    key: 'contact_phone_landline',
    value: '+91 44 4353 1781',
    section: 'Contact',
    label: 'Landline',
    type: 'text',
    order: 8,
  },
  {
    key: 'contact_email',
    value: 'info@chaloschools.com',
    section: 'Contact',
    label: 'Email',
    type: 'text',
    order: 9,
  },
  {
    key: 'contact_map_url',
    value: 'https://www.google.com/maps?q=AA+Business+Centre+4th+Floor+East+Park+Road+Shenoy+Nagar+Chennai+600030&output=embed',
    section: 'Contact',
    label: 'Google Maps Embed URL',
    type: 'text',
    order: 10,
  },

  // Careers Page
  {
    key: 'careers_hero_title',
    value: 'Join the ChaloSchools Team',
    section: 'Careers',
    label: 'Page Title',
    type: 'text',
    order: 0,
  },
  {
    key: 'careers_hero_subtitle',
    value:
      "Help transform how Indian schools operate. We're looking for passionate people who want to make a real impact on education.",
    section: 'Careers',
    label: 'Page Subtitle',
    type: 'textarea',
    order: 1,
  },
  {
    key: 'careers_cta_title',
    value: 'Interested in Joining Us?',
    section: 'Careers',
    label: 'CTA Title',
    type: 'text',
    order: 2,
  },
  {
    key: 'careers_cta_subtitle',
    value:
      "We're always looking for talented people. Send us your resume and tell us how you can make a difference.",
    section: 'Careers',
    label: 'CTA Subtitle',
    type: 'textarea',
    order: 3,
  },
  {
    key: 'careers_email',
    value: 'careers@chaloschools.com',
    section: 'Careers',
    label: 'Careers Email',
    type: 'text',
    order: 4,
  },

  // Homepage - Trust Stats
  { key: 'trust_stat_1_value', value: '200+', section: 'Homepage - Trust Stats', label: 'Stat 1 Value', type: 'text', order: 0 },
  { key: 'trust_stat_1_label', value: 'Schools Served', section: 'Homepage - Trust Stats', label: 'Stat 1 Label', type: 'text', order: 1 },
  { key: 'trust_stat_2_value', value: '1.5+ Million', section: 'Homepage - Trust Stats', label: 'Stat 2 Value', type: 'text', order: 2 },
  { key: 'trust_stat_2_label', value: 'Students Impacted', section: 'Homepage - Trust Stats', label: 'Stat 2 Label', type: 'text', order: 3 },
  { key: 'trust_stat_3_value', value: '4', section: 'Homepage - Trust Stats', label: 'Stat 3 Value', type: 'text', order: 4 },
  { key: 'trust_stat_3_label', value: 'Countries', section: 'Homepage - Trust Stats', label: 'Stat 3 Label', type: 'text', order: 5 },
  { key: 'trust_stat_4_value', value: '99.9%', section: 'Homepage - Trust Stats', label: 'Stat 4 Value', type: 'text', order: 6 },
  { key: 'trust_stat_4_label', value: 'Platform Uptime', section: 'Homepage - Trust Stats', label: 'Stat 4 Label', type: 'text', order: 7 },

  // Homepage - Why Choose Us
  { key: 'why_choose_badge', value: 'Why Choose Chalo Schools?', section: 'Homepage - Why Choose Us', label: 'Section Badge', type: 'text', order: 0 },
  { key: 'why_choose_headline', value: 'Built for Schools That Want More', section: 'Homepage - Why Choose Us', label: 'Section Headline', type: 'text', order: 1 },
  { key: 'why_choose_subtitle', value: "Here's what makes us different from generic ERP tools.", section: 'Homepage - Why Choose Us', label: 'Section Subtitle', type: 'textarea', order: 2 },
  { key: 'why_choose_1_title', value: 'All-in-one platform', section: 'Homepage - Why Choose Us', label: 'Benefit 1 Title', type: 'text', order: 3 },
  { key: 'why_choose_1_desc', value: 'No need for 5 different tools — manage everything from a single dashboard.', section: 'Homepage - Why Choose Us', label: 'Benefit 1 Description', type: 'textarea', order: 4 },
  { key: 'why_choose_2_title', value: 'Dedicated onboarding & training support', section: 'Homepage - Why Choose Us', label: 'Benefit 2 Title', type: 'text', order: 5 },
  { key: 'why_choose_2_desc', value: 'We handle complete setup and train your staff so you can focus on education.', section: 'Homepage - Why Choose Us', label: 'Benefit 2 Description', type: 'textarea', order: 6 },
  { key: 'why_choose_3_title', value: 'Mobile app for parents, teachers & management', section: 'Homepage - Why Choose Us', label: 'Benefit 3 Title', type: 'text', order: 7 },
  { key: 'why_choose_3_desc', value: 'Stay connected on the go with dedicated apps for every user type.', section: 'Homepage - Why Choose Us', label: 'Benefit 3 Description', type: 'textarea', order: 8 },
  { key: 'why_choose_4_title', value: 'Data security & cloud backup', section: 'Homepage - Why Choose Us', label: 'Benefit 4 Title', type: 'text', order: 9 },
  { key: 'why_choose_4_desc', value: 'Bank-grade encryption with automatic daily backups keeps your data safe.', section: 'Homepage - Why Choose Us', label: 'Benefit 4 Description', type: 'textarea', order: 10 },

  // Homepage - Process Steps
  { key: 'process_badge', value: 'How It Works', section: 'Homepage - Process Steps', label: 'Section Badge', type: 'text', order: 0 },
  { key: 'process_headline', value: 'Get Started in 3 Easy Steps', section: 'Homepage - Process Steps', label: 'Section Headline', type: 'text', order: 1 },
  { key: 'process_subtitle', value: 'From first call to fully operational — we make the transition seamless.', section: 'Homepage - Process Steps', label: 'Section Subtitle', type: 'textarea', order: 2 },
  { key: 'process_step_1_title', value: 'Book a Demo', section: 'Homepage - Process Steps', label: 'Step 1 Title', type: 'text', order: 3 },
  { key: 'process_step_1_desc', value: 'Fill out the form and our team will schedule a personalized demo for your school.', section: 'Homepage - Process Steps', label: 'Step 1 Description', type: 'textarea', order: 4 },
  { key: 'process_step_2_title', value: 'Quick Setup', section: 'Homepage - Process Steps', label: 'Step 2 Title', type: 'text', order: 5 },
  { key: 'process_step_2_desc', value: 'Our team handles complete data migration and customization for your school.', section: 'Homepage - Process Steps', label: 'Step 2 Description', type: 'textarea', order: 6 },
  { key: 'process_step_3_title', value: 'Go Live', section: 'Homepage - Process Steps', label: 'Step 3 Title', type: 'text', order: 7 },
  { key: 'process_step_3_desc', value: 'Start using Chalo Schools with full training and 24/7 support for your team.', section: 'Homepage - Process Steps', label: 'Step 3 Description', type: 'textarea', order: 8 },

  // Homepage section on/off toggles — managed from Admin > Section Visibility,
  // not the generic Site Content editor. 'true' = shown (the default).
  { key: 'visibility_trust_stats', value: 'true', section: 'Homepage - Section Visibility', label: 'Trust Stats', type: 'boolean', order: 0 },
  { key: 'visibility_social_proof', value: 'true', section: 'Homepage - Section Visibility', label: 'Social Proof Bar', type: 'boolean', order: 1 },
  { key: 'visibility_problems', value: 'true', section: 'Homepage - Section Visibility', label: 'Problems / Challenges', type: 'boolean', order: 2 },
  { key: 'visibility_features', value: 'true', section: 'Homepage - Section Visibility', label: 'Feature Highlights', type: 'boolean', order: 3 },
  { key: 'visibility_our_apps', value: 'true', section: 'Homepage - Section Visibility', label: 'Our Apps', type: 'boolean', order: 4 },
  { key: 'visibility_integrations', value: 'true', section: 'Homepage - Section Visibility', label: 'Integrations Strip', type: 'boolean', order: 5 },
  { key: 'visibility_demo_video', value: 'true', section: 'Homepage - Section Visibility', label: 'Demo Video', type: 'boolean', order: 6 },
  { key: 'visibility_why_choose_us', value: 'true', section: 'Homepage - Section Visibility', label: 'Why Choose Us', type: 'boolean', order: 7 },
  { key: 'visibility_security_compliance', value: 'true', section: 'Homepage - Section Visibility', label: 'Security & Compliance', type: 'boolean', order: 8 },
  { key: 'visibility_board_tabs', value: 'true', section: 'Homepage - Section Visibility', label: 'Board-Specific Tabs', type: 'boolean', order: 9 },
  { key: 'visibility_process_steps', value: 'true', section: 'Homepage - Section Visibility', label: 'Process Steps', type: 'boolean', order: 10 },
  { key: 'visibility_testimonials', value: 'true', section: 'Homepage - Section Visibility', label: 'Testimonials', type: 'boolean', order: 11 },
  { key: 'visibility_case_study', value: 'true', section: 'Homepage - Section Visibility', label: 'Case Study Snapshot', type: 'boolean', order: 12 },
  { key: 'visibility_pricing_teaser', value: 'true', section: 'Homepage - Section Visibility', label: 'Pricing Teaser', type: 'boolean', order: 13 },
  { key: 'visibility_faq', value: 'true', section: 'Homepage - Section Visibility', label: 'Homepage FAQ', type: 'boolean', order: 14 },
  { key: 'visibility_blog_strip', value: 'true', section: 'Homepage - Section Visibility', label: 'Blog / Latest News', type: 'boolean', order: 15 },
  { key: 'visibility_final_cta', value: 'true', section: 'Homepage - Section Visibility', label: 'Final CTA', type: 'boolean', order: 16 },
];

export async function seedSiteContent(prisma: PrismaClient): Promise<void> {
  for (const item of SEED_DATA) {
    await prisma.siteContent.upsert({
      where: { key: item.key },
      update: {},
      create: {
        key: item.key,
        value: item.value,
        section: item.section,
        label: item.label,
        type: item.type,
        order: item.order,
      },
    });
  }
}