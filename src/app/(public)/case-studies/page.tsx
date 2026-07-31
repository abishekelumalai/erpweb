import { Metadata } from 'next';
import CaseStudyPageClient from './CaseStudyPageClient';
import { db } from '@/lib/db';

export const metadata: Metadata = {
  title: 'Case Studies | ChaloSchools',
  description: 'See how schools across India transform their operations with ChaloSchools. Real stories, real results from CBSE, ICSE, and state board schools.',
  alternates: { canonical: '/case-studies' },
};

export default async function CaseStudiesPage() {
  const caseStudies = await db.caseStudy.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
  });

  return <CaseStudyPageClient initialCaseStudies={JSON.parse(JSON.stringify(caseStudies))} />;
}
