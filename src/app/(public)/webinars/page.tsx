import { Metadata } from 'next';
import WebinarPageClient from './WebinarPageClient';
import { db } from '@/lib/db';

export const metadata: Metadata = {
  title: 'Webinars | ChaloSchools',
  description: 'Watch on-demand webinars about school management best practices, education technology, and upcoming sessions from ChaloSchools.',
  alternates: { canonical: '/webinars' },
};

export default async function WebinarsPage() {
  const webinars = await db.webinar.findMany({
    where: { published: true },
    orderBy: { date: 'desc' },
  });

  return <WebinarPageClient initialWebinars={JSON.parse(JSON.stringify(webinars))} />;
}
