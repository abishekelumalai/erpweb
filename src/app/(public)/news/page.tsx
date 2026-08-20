import { Metadata } from 'next';
import NewsPageClient from './NewsPageClient';
import { db } from '@/lib/db';
import { buildMetadataWithOverrides } from '@/lib/metadata';

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadataWithOverrides({
    pageKey: 'news',
    title: 'News & Events',
    description: 'Latest news, events, and updates from ChaloSchools. Stay informed about product launches, school partnerships, and education industry events.',
    path: '/news',
  });
}

export default async function NewsPage() {
  const newsEvents = await db.newsEvent.findMany({
    where: { published: true },
    orderBy: { eventDate: 'desc' },
  });

  return <NewsPageClient initialNewsEvents={JSON.parse(JSON.stringify(newsEvents))} />;
}
