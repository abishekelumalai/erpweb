import { PrismaClient } from '@prisma/client';

interface FAQSeed {
  question: string;
  answer: string;
  category: string;
  order: number;
  published: boolean;
}

const SEED_FAQS: FAQSeed[] = [
  {
    question: 'What is school management software?',
    answer: 'School management software is a digital platform that helps educational institutions manage academic, administrative, financial and communication activities from a centralized system.',
    category: 'General',
    order: 1,
    published: true,
  },
  {
    question: 'What can ChaloSchools manage?',
    answer: 'ChaloSchools supports admissions, student management, attendance, academics, examinations, fees, staff management, payroll, communication, timetable management, transport, library and analytics.',
    category: 'General',
    order: 2,
    published: true,
  },
  {
    question: 'Is ChaloSchools a school ERP?',
    answer: 'Yes. ChaloSchools functions as an integrated school ERP and school management system, connecting multiple school operations through one platform.',
    category: 'General',
    order: 3,
    published: true,
  },
  {
    question: 'Does ChaloSchools have mobile apps?',
    answer: 'Yes. ChaloSchools provides dedicated mobile experiences for parents, teachers and school management.',
    category: 'General',
    order: 4,
    published: true,
  },
  {
    question: 'Can ChaloSchools integrate with biometric attendance systems?',
    answer: 'Yes. ChaloSchools supports biometric attendance integration along with other school technology integrations.',
    category: 'General',
    order: 5,
    published: true,
  },
  {
    question: 'Is ChaloSchools suitable for CBSE and State Board schools?',
    answer: 'Yes. ChaloSchools supports workflows for CBSE, State Board and other school environments.',
    category: 'General',
    order: 6,
    published: true,
  },
  {
    question: 'Can we migrate our existing school data?',
    answer: 'ChaloSchools provides implementation support, including data migration and configuration.',
    category: 'General',
    order: 7,
    published: true,
  },
];

export async function seedFAQs(prisma: PrismaClient): Promise<void> {
  for (const faq of SEED_FAQS) {
    await prisma.fAQ.upsert({
      where: { id: `seed-faq-${faq.order}` },
      update: {
        question: faq.question,
        answer: faq.answer,
        category: faq.category,
        order: faq.order,
        published: faq.published,
      },
      create: {
        id: `seed-faq-${faq.order}`,
        question: faq.question,
        answer: faq.answer,
        category: faq.category,
        order: faq.order,
        published: faq.published,
      },
    });
  }
  console.log(`[Seed] Upserted ${SEED_FAQS.length} FAQs`);
}
