import { Badge } from '@/components/ui/badge';
import { AlertCircle, AlertTriangle, XCircle, Clock } from 'lucide-react';
import type { ProblemsSectionData } from '@/data/feature-pages';

const ICONS = [AlertCircle, AlertTriangle, XCircle, Clock];

const ICON_STYLES = [
  'bg-red-500/10 text-red-500',
  'bg-orange-500/10 text-orange-500',
  'bg-rose-500/10 text-rose-500',
  'bg-amber-500/10 text-amber-500',
];

export default function ProblemsGrid({ data }: { data: ProblemsSectionData }) {
  return (
    <section className="py-16 md:py-20 bg-surface-2">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <Badge variant="secondary" className="mb-4 bg-red-500/10 text-red-600 border-red-500/20">
            <AlertCircle className="w-4 h-4 mr-2" />
            {data.badge || 'The Problem'}
          </Badge>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-heading mb-3">{data.heading}</h2>
          {data.subheading && <p className="text-subtle text-lg max-w-2xl mx-auto">{data.subheading}</p>}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {data.items.map((item, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <div key={i} className="flex items-start gap-3 rounded-xl border border-border bg-card p-5">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${ICON_STYLES[i % ICON_STYLES.length]}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-heading mb-1">{item.title}</h3>
                  <p className="text-sm text-subtle leading-relaxed">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
