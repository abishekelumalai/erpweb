import { Badge } from '@/components/ui/badge';
import { Clock, FileText, Users, Layers, RefreshCw, Search } from 'lucide-react';
import type { ProblemsSectionData } from '@/data/feature-pages';

// Same rotating icon + gradient language as the homepage's own "problems"
// section (see ProblemsSection.tsx) — contextual icons on brand gradients,
// never a repeated alert/warning glyph that reads as a site error.
const ICONS = [Clock, FileText, Users, Layers, RefreshCw, Search];

const GRADIENTS = [
  'from-[#f59e0b] to-[#fbbf24]',
  'from-[#026dde] to-[#00d4ff]',
  'from-[#8b5cf6] to-[#a78bfa]',
  'from-[#10b981] to-[#34d399]',
  'from-[#0891b2] to-[#22d3ee]',
  'from-[#e11d48] to-[#f87171]',
];

export default function ProblemsGrid({ data }: { data: ProblemsSectionData }) {
  return (
    <section className="py-16 md:py-20 bg-surface-2">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <Badge className="mb-4 bg-[#026dde]/10 text-primary border-[#026dde]/20 rounded-full">
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
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${GRADIENTS[i % GRADIENTS.length]} flex items-center justify-center shrink-0 text-white shadow-sm`}>
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
