import { Metadata } from 'next';
import ReleaseNotesPageClient from './ReleaseNotesPageClient';
import { db } from '@/lib/db';
import { buildMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'Release Notes',
  description: "See what's new in ChaloSchools. Browse release notes for the latest features, improvements, and bug fixes.",
  path: '/release-notes',
});

export default async function ReleaseNotesPage() {
  const releases = await db.releaseNote.findMany({
    where: { published: true },
    orderBy: { releaseDate: 'desc' },
  });

  return <ReleaseNotesPageClient initialReleases={JSON.parse(JSON.stringify(releases))} />;
}
