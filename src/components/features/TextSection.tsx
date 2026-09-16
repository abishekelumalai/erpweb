import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { TextSectionData } from '@/data/feature-pages';

export default function TextSection({ data }: { data: TextSectionData }) {
  return (
    <section className="py-16 md:py-20 bg-card">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-heading mb-6">{data.heading}</h2>
        <div className="space-y-4">
          {data.paragraphs.map((p, i) => (
            <p key={i} className="text-subtle text-lg leading-relaxed">
              {p}
            </p>
          ))}
        </div>
        {data.links && data.links.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
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
