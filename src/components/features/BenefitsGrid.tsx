import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';
import type { BenefitsSectionData } from '@/data/feature-pages';

const GRADIENTS = [
  'from-[#026dde] to-[#00d4ff]',
  'from-[#f59e0b] to-[#fbbf24]',
  'from-[#10b981] to-[#34d399]',
  'from-[#8b5cf6] to-[#a78bfa]',
  'from-[#0891b2] to-[#22d3ee]',
  'from-[#e11d48] to-[#f87171]',
];

const SHADOWS = [
  'shadow-[#026dde]/20',
  'shadow-[#f59e0b]/20',
  'shadow-[#10b981]/20',
  'shadow-[#8b5cf6]/20',
  'shadow-[#0891b2]/20',
  'shadow-[#e11d48]/20',
];

export default function BenefitsGrid({ data }: { data: BenefitsSectionData }) {
  return (
    <section className="py-16 md:py-20 bg-surface-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-heading mb-4">{data.heading}</h2>
          {data.subheading && <p className="text-subtle text-lg max-w-2xl mx-auto">{data.subheading}</p>}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.items.map((item, index) => (
            <Card
              key={index}
              className="group card-lift card-shine border border-border hover:border-[#026dde]/30 transition-all duration-300"
            >
              <CardContent className="pt-6">
                <div
                  className={`w-10 h-10 rounded-lg bg-gradient-to-br ${GRADIENTS[index % GRADIENTS.length]} flex items-center justify-center mb-4 shadow-lg ${SHADOWS[index % SHADOWS.length]} text-white group-hover:scale-110 transition-transform duration-300`}
                >
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="text-heading font-semibold mb-1.5">{item.title}</h3>
                <p className="text-sm text-subtle leading-relaxed">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
