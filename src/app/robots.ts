import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/', '/theme'],
    },
    sitemap: 'https://chaloschools.com/sitemap.xml',
  };
}
