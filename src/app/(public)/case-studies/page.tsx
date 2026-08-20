import { Metadata } from 'next';
import CaseStudyPageClient from './CaseStudyPageClient';
import { db } from '@/lib/db';
import { buildMetadataWithOverrides } from '@/lib/metadata';

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadataWithOverrides({
    pageKey: 'case-studies',
    title: 'Case Studies',
    description: 'See how schools across India transform their operations with ChaloSchools. Real stories, real results from CBSE, ICSE, and state board schools.',
    path: '/case-studies',
  });
}

export default async function CaseStudiesPage() {
  const caseStudies = await db.caseStudy.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
  });

  return <CaseStudyPageClient initialCaseStudies={JSON.parse(JSON.stringify(caseStudies))} />;
}
