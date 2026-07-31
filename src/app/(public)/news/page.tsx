import { Metadata } from 'next';
import NewsPageClient from './NewsPageClient';
import { db } from '@/lib/db';

export const metadata: Metadata = {
  title: 'News & Events | ChaloSchools',
  description: 'Latest news, events, and updates from ChaloSchools. Stay informed about product launches, school partnerships, and education industry events.',
  alternates: { canonical: '/news' },
};

export default async function NewsPage() {
  const newsEvents = await db.newsEvent.findMany({
    where: { published: true },
    orderBy: { eventDate: 'desc' },
  });

  return <NewsPageClient initialNewsEvents={JSON.parse(JSON.stringify(newsEvents))} />;
}
