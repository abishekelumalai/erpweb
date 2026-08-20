import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/site-url';
import { db } from '@/lib/db';

const DEFAULT_OG_IMAGE = { url: '/images/hero-bg.png', width: 1344, height: 768 };

interface PageMetadataInput {
  title: string;
  description: string;
  path: string;
  /** Relative to metadataBase, e.g. '/images/blog/my-post.png'. Falls back to the site default. */
  image?: string;
}

// Every page gets its own Open Graph + Twitter Card tags matching its real
// title/description, instead of every shared link (blog posts, features,
// solutions, etc.) showing the generic homepage card. Next.js does not
// deep-merge openGraph/twitter across nested metadata, so each page must
// set the full block itself rather than relying on the root layout's.
export function buildMetadata({ title, description, path, image }: PageMetadataInput): Metadata {
  const url = `${SITE_URL}${path}`;
  const ogImage = image ? { url: image, width: 1344, height: 768, alt: title } : { ...DEFAULT_OG_IMAGE, alt: title };

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      locale: 'en_IN',
      url,
      siteName: 'ChaloSchools',
      title,
      description,
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

interface PageMetadataInputWithKey extends PageMetadataInput {
  /** Stable id used for the SiteContent override keys `seo_title_<pageKey>` /
   * `seo_description_<pageKey>` — edited via the /admin/seo page. Must match
   * the `key` used there exactly. */
  pageKey: string;
}

// Same as buildMetadata(), but checks for a marketing-editable override in
// SiteContent first (set via /admin/seo) and falls back to the developer
// defaults passed in when no override exists or it's been cleared back to
// empty. Callers must be async (generateMetadata, not a static `metadata`
// export) since this reads from the database.
export async function buildMetadataWithOverrides({ pageKey, title, description, path, image }: PageMetadataInputWithKey): Promise<Metadata> {
  let overrideTitle: string | undefined;
  let overrideDescription: string | undefined;

  try {
    const rows = await db.siteContent.findMany({
      where: { key: { in: [`seo_title_${pageKey}`, `seo_description_${pageKey}`] } },
      select: { key: true, value: true },
    });
    overrideTitle = rows.find((r) => r.key === `seo_title_${pageKey}`)?.value || undefined;
    overrideDescription = rows.find((r) => r.key === `seo_description_${pageKey}`)?.value || undefined;
  } catch {
    // DB unavailable at build time — fall back to defaults, same as every
    // other DB-backed page on this site.
  }

  return buildMetadata({
    title: overrideTitle ?? title,
    description: overrideDescription ?? description,
    path,
    image,
  });
}
