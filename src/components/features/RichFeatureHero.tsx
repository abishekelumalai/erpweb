import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import type { FeatureHero } from '@/data/feature-pages';

export default function RichFeatureHero({ hero, shortTitle }: { hero: FeatureHero; shortTitle: string }) {
  const [primaryTitle, secondaryTitle] = hero.title.split('|').map((s) => s.trim());

  return (
    <section className="relative bg-brand-gradient py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-[#f59e0b] rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#026dde] rounded-full blur-3xl" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {hero.eyebrow && (
          <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm font-medium">
            {hero.eyebrow}
          </Badge>
        )}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
          {primaryTitle}
          {secondaryTitle && (
            <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white/70 font-semibold mt-2">
              {secondaryTitle}
            </span>
          )}
        </h1>
        <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed mb-8">
          {hero.description}
        </p>
        {hero.ctas.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            {hero.ctas.map((cta) => (
              <Button
                key={cta.label}
                size="lg"
                variant={cta.variant === 'outline' ? 'outline' : 'default'}
                className={
                  cta.variant === 'outline'
                    ? 'border-white/30 text-white hover:bg-white/10 font-semibold px-8 py-6 text-base rounded-lg transition-all'
                    : 'bg-[#f59e0b] hover:bg-[#d97706] text-white font-semibold px-8 py-6 text-base rounded-lg shadow-lg hover:shadow-xl transition-all'
                }
                asChild
              >
                <Link href={cta.href}>
                  {cta.label}
                  {cta.variant !== 'outline' && <ArrowRight className="w-5 h-5 ml-2" />}
                </Link>
              </Button>
            ))}
          </div>
        )}
        {hero.tagline && (
          <p className="text-sm text-white/50 font-medium tracking-wide" aria-label={`${shortTitle} highlights`}>
            {hero.tagline}
          </p>
        )}
      </div>
    </section>
  );
}
