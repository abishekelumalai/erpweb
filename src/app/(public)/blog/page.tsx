import { Metadata } from 'next';
import BlogPageClient from './BlogPageClient';
import { db } from '@/lib/db';
import { buildMetadataWithOverrides } from '@/lib/metadata';

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadataWithOverrides({
    pageKey: 'blog',
    title: 'Blog & Insights',
    description: 'Stay updated with the latest trends in school management, education technology, and best practices from ChaloSchools.',
    path: '/blog',
  });
}

export default async function BlogPage() {
  const blogs = await db.blogPost.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true, title: true, slug: true, excerpt: true, category: true,
      author: true, coverImage: true, publishedAt: true, createdAt: true,
    },
  });

  return <BlogPageClient initialBlogs={JSON.parse(JSON.stringify(blogs))} />;
}
