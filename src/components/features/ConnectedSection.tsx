import Link from 'next/link';
import { Network, ArrowRight } from 'lucide-react';
import type { ConnectedSectionData } from '@/data/feature-pages';

export default function ConnectedSection({ data }: { data: ConnectedSectionData }) {
  return (
    <section className="py-16 md:py-20 bg-surface-2">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="w-12 h-12 rounded-xl bg-[#026dde]/10 flex items-center justify-center mx-auto mb-5">
          <Network className="w-6 h-6 text-primary" />
        </div>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-heading mb-5">{data.heading}</h2>
        <div className="space-y-4 mb-6">
          {data.paragraphs.map((p, i) => (
            <p key={i} className="text-subtle text-lg leading-relaxed">
              {p}
            </p>
          ))}
        </div>
        {data.chips && data.chips.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {data.chips.map((chip) => (
              <span
                key={chip}
                className="inline-flex items-center px-3 py-1.5 rounded-full bg-card border border-border text-sm font-medium text-heading"
              >
                {chip}
              </span>
            ))}
          </div>
        )}
        {data.links && data.links.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-3">
            {data.links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
              >
                {link.label}
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
