import { Metadata } from 'next';
import ReleaseNotesPageClient from './ReleaseNotesPageClient';
import { db } from '@/lib/db';

export const metadata: Metadata = {
  title: 'Release Notes | ChaloSchools',
  description: "See what's new in ChaloSchools. Browse release notes for the latest features, improvements, and bug fixes.",
  alternates: { canonical: '/release-notes' },
};

export default async function ReleaseNotesPage() {
  const releases = await db.releaseNote.findMany({
    where: { published: true },
    orderBy: { releaseDate: 'desc' },
  });

  return <ReleaseNotesPageClient initialReleases={JSON.parse(JSON.stringify(releases))} />;
}
