'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import type { TabsSectionData } from '@/data/feature-pages';

export default function TabsPanel({ data }: { data: TabsSectionData }) {
  const [active, setActive] = useState(data.tabs[0]?.id);
  const current = data.tabs.find((t) => t.id === active) || data.tabs[0];
  if (!current) return null;

  return (
    <section className="py-16 md:py-20 bg-surface-2">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-heading mb-3">{data.heading}</h2>
          {data.subheading && <p className="text-subtle text-lg max-w-2xl mx-auto">{data.subheading}</p>}
        </div>
        <div role="tablist" className="flex flex-wrap justify-center gap-2 mb-10">
          {data.tabs.map((tab) => (
            <Button
              key={tab.id}
              role="tab"
              id={`${data.id}-tab-${tab.id}`}
              aria-selected={active === tab.id}
              aria-controls={`${data.id}-panel-${tab.id}`}
              variant={active === tab.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActive(tab.id)}
              className={`rounded-full ${active === tab.id ? 'bg-[#026dde] hover:bg-[#024fb3] text-white border-[#026dde]' : 'text-body hover:text-primary hover:border-[#026dde] border-border bg-card'}`}
            >
              {tab.label}
            </Button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            className="max-w-3xl mx-auto"
          >
            <div
              role="tabpanel"
              id={`${data.id}-panel-${current.id}`}
              aria-labelledby={`${data.id}-tab-${current.id}`}
              className="bg-card rounded-xl border border-border p-8 shadow-sm"
            >
              {current.title && <h3 className="text-xl font-bold text-heading mb-2">{current.title}</h3>}
              <p className="text-subtle leading-relaxed">{current.description}</p>
              {current.points && current.points.length > 0 && (
                <div className="grid sm:grid-cols-2 gap-3 mt-6">
                  {current.points.map((p) => (
                    <div key={p} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-heading">{p}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
