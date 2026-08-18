import { Metadata } from 'next';
import WebinarPageClient from './WebinarPageClient';
import { db } from '@/lib/db';
import { buildMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'Webinars',
  description: 'Watch on-demand webinars about school management best practices, education technology, and upcoming sessions from ChaloSchools.',
  path: '/webinars',
});

export default async function WebinarsPage() {
  const webinars = await db.webinar.findMany({
    where: { published: true },
    orderBy: { date: 'desc' },
  });

  return <WebinarPageClient initialWebinars={JSON.parse(JSON.stringify(webinars))} />;
}
