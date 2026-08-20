import { Metadata } from 'next';
import HelpPageClient from './HelpPageClient';
import { db } from '@/lib/db';
import { buildMetadataWithOverrides } from '@/lib/metadata';

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadataWithOverrides({
    pageKey: 'help',
    title: 'Help & Documentation',
    description: 'Find guides, tutorials, and documentation to help you get the most out of ChaloSchools school management system.',
    path: '/help',
  });
}

export default async function HelpPage() {
  const docs = await db.helpDoc.findMany({
    where: { published: true },
    orderBy: { order: 'asc' },
  });

  return <HelpPageClient initialDocs={JSON.parse(JSON.stringify(docs))} />;
}
