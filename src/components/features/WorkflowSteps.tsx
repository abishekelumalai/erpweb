import { Badge } from '@/components/ui/badge';
import type { WorkflowSectionData } from '@/data/feature-pages';

export default function WorkflowSteps({ data }: { data: WorkflowSectionData }) {
  return (
    <section className="py-16 md:py-20 bg-card">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 bg-[#026dde]/10 text-primary border-[#026dde]/20 rounded-full">
            Workflow
          </Badge>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-heading mb-3">{data.heading}</h2>
          {data.subheading && <p className="text-subtle text-lg max-w-2xl mx-auto">{data.subheading}</p>}
        </div>
        <div className="relative grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-10">
          {data.steps.map((step, i) => (
            <div key={i} className="relative text-center">
              {i < data.steps.length - 1 && (
                <div className="hidden lg:block absolute top-6 left-[calc(50%+28px)] right-[calc(-50%+28px)] h-0.5 bg-border" aria-hidden="true" />
              )}
              <div className="relative z-10 w-12 h-12 mx-auto rounded-full bg-[#026dde] text-white flex items-center justify-center font-bold text-lg shadow-md mb-3">
                {i + 1}
              </div>
              <h3 className="text-sm font-semibold text-heading mb-1">{step.title}</h3>
              {step.description && <p className="text-xs text-subtle leading-relaxed">{step.description}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
