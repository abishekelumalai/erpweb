import { X, Check } from 'lucide-react';
import type { TableSectionData } from '@/data/feature-pages';

export default function TableSection({ data }: { data: TableSectionData }) {
  const isCompare = data.variant === 'compare';

  return (
    <section className="py-16 md:py-20 bg-card">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-heading mb-3">{data.heading}</h2>
          {data.subheading && <p className="text-subtle text-lg max-w-2xl mx-auto">{data.subheading}</p>}
        </div>
        <div className="rounded-xl border border-border overflow-hidden">
          <div className="grid grid-cols-2 bg-surface-2 border-b border-border">
            <div className="px-4 sm:px-6 py-3 text-sm font-semibold text-subtle">{data.leftHeader}</div>
            <div className="px-4 sm:px-6 py-3 text-sm font-semibold text-primary">{data.rightHeader}</div>
          </div>
          {data.rows.map((row, i) => (
            <div key={i} className={`grid grid-cols-2 ${i % 2 === 1 ? 'bg-surface-2/40' : ''}`}>
              <div className="px-4 sm:px-6 py-4 flex items-start gap-2.5 border-r border-border">
                {isCompare && <X className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />}
                <span className="text-sm text-subtle leading-relaxed">{row.left}</span>
              </div>
              <div className="px-4 sm:px-6 py-4 flex items-start gap-2.5">
                {isCompare && <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />}
                <span className="text-sm text-heading font-medium leading-relaxed">{row.right}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
