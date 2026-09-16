import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, HelpCircle } from 'lucide-react';
import { SITE_URL } from '@/lib/site-url';
import type { RichFeaturePage } from '@/data/feature-pages';
import RichFeatureHero from './RichFeatureHero';
import FeatureSectionRenderer from './FeatureSectionRenderer';

export default function RichFeaturePageView({ data, slug }: { data: RichFeaturePage; slug: string }) {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Features', item: `${SITE_URL}/product` },
      { '@type': 'ListItem', position: 3, name: data.shortTitle, item: `${SITE_URL}/features/${slug}` },
    ],
  };

  const faqJsonLd = data.faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  } : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {faqJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />}

      <RichFeatureHero hero={data.hero} shortTitle={data.shortTitle} />

      {data.sections.map((section) => (
        <FeatureSectionRenderer key={section.id} section={section} />
      ))}

      {data.faqs.length > 0 && (
        <section className="py-16 md:py-20 bg-surface-2">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <Badge variant="secondary" className="mb-3 bg-[#026dde]/10 text-primary border-[#026dde]/20">
                <HelpCircle className="w-4 h-4 mr-2" />
                FAQ
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold text-heading">Questions About {data.shortTitle}?</h2>
            </div>
            <div className="space-y-4">
              {data.faqs.map((faq, i) => (
                <details key={i} className="group bg-card rounded-xl border border-border p-5 open:shadow-sm">
                  <summary className="flex items-center justify-between gap-3 cursor-pointer list-none">
                    <h3 className="text-base font-semibold text-heading">{faq.q}</h3>
                    <ArrowRight className="w-4 h-4 shrink-0 text-primary transition-transform group-open:rotate-90" />
                  </summary>
                  <p className="text-sm text-subtle leading-relaxed mt-3">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-12 md:py-16 bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-heading mb-4">{data.cta.heading}</h2>
          <p className="text-subtle text-lg mb-8 max-w-2xl mx-auto">{data.cta.description}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {data.cta.buttons.map((btn) => (
              <Button
                key={btn.label}
                size="lg"
                variant={btn.variant === 'outline' ? 'outline' : 'default'}
                className={
                  btn.variant === 'outline'
                    ? 'border-[#026dde] text-primary hover:bg-[#026dde] hover:text-white font-semibold px-8 py-6 text-base rounded-lg transition-all'
                    : 'bg-[#f59e0b] hover:bg-[#d97706] text-white font-semibold px-8 py-6 text-base rounded-lg shadow-lg hover:shadow-xl transition-all'
                }
                asChild
              >
                <Link href={btn.href}>
                  {btn.label}
                  {btn.variant !== 'outline' && <ArrowRight className="w-5 h-5 ml-2" />}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
