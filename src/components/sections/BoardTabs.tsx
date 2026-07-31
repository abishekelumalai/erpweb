'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const boards = [
  { id: 'preschool', label: 'Pre School', emoji: '🧒', title: 'Built for Early Learning Centers', description: 'Simplified workflows for preschools — child progress tracking, parent photo updates, fee collection, and health records.', features: ['Day-wise attendance with parent alerts', 'Photo & video updates via WhatsApp', 'Simplified fee plans & receipts', 'Child health & immunization tracking', 'Pickup/drop-off verification'] },
  { id: 'cbse', label: 'State & CBSE', emoji: '📋', title: 'CBSE & State Board Ready', description: 'Aligned with CBSE/State Board guidelines — CCE-based report cards, UDISE reporting, TC generation, and board exam management.', features: ['CCE & term-based assessment', 'UDISE & Shaala Siddhi reporting', 'Transfer Certificate generation', 'Board exam hall ticket & marks entry', 'Subject-wise & grade-wise analytics'] },
  { id: 'ib', label: 'IB Schools', emoji: '🌍', title: 'Designed for IB World Schools', description: 'Full support for IB PYP, MYP, and DP — criterion-based grading, ATL skills tracking, CAS management.', features: ['Criterion-based assessment & rubrics', 'ATL (Approaches to Learning) tracking', 'CAS portfolio & hours management', 'Extended essay & TOK supervision', 'Multi-language report generation'] },
  { id: 'cambridge', label: 'Cambridge', emoji: '🎓', title: 'Cambridge Curriculum Support', description: 'Tailored for Cambridge IGCSE, O-Level, A-Level — progress tracking, staged assessments.', features: ['Cambridge checkpoint assessments', 'Staged & linear grading support', 'ICE & AICE diploma tracking', 'International standard report cards', 'Predicted grades & teacher references'] },
  { id: 'montessori', label: 'Montessori', emoji: '🌿', title: 'Montessori-Friendly Platform', description: 'Respecting the Montessori philosophy — observational assessments, mixed-age group tracking.', features: ['Observational assessment records', 'Mixed-age group management', 'Holistic development tracking', 'Material & activity logging', 'Parent-teacher conference scheduling'] },
  { id: 'matric', label: 'Matric / Higher Ed', emoji: '📊', title: 'For Matriculation & Higher Secondary', description: 'Complete support for Matric, Higher Secondary — semester systems, credit tracking, university preparation.', features: ['Semester & credit-based system', 'Internal & university exam tracking', 'GPA & CGPA calculation', 'Placement & internship management', 'Alumni network & tracking'] },
];

export default function BoardTabs() {
  const [active, setActive] = useState('cbse');
  const current = boards.find((b) => b.id === active) || boards[1];
  return (
    <section className="py-12 lg:py-16 bg-surface-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-3xl mx-auto mb-12">
          <Badge className="mb-4 bg-[#026dde]/10 text-primary border-[#026dde]/20 rounded-full">By Board</Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-heading mb-4">Tailored for Every Board & Curriculum</h2>
          <p className="text-lg text-body">ChaloSchools adapts to your curriculum, not the other way around.</p>
        </motion.div>
        <div role="tablist" aria-label="School board or curriculum" className="flex flex-wrap justify-center gap-2 mb-12">
          {boards.map((b) => (
            <Button
              key={b.id}
              role="tab"
              id={`board-tab-${b.id}`}
              aria-selected={active === b.id}
              aria-controls={`board-panel-${b.id}`}
              variant={active === b.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActive(b.id)}
              className={`rounded-full gap-1.5 ${active === b.id ? 'bg-[#026dde] hover:bg-[#024fb3] text-white border-[#026dde]' : 'text-body hover:text-primary hover:border-[#026dde] border-border bg-card'}`}>
              <span aria-hidden="true">{b.emoji}</span>{b.label}
            </Button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.25 }} className="max-w-3xl mx-auto">
            <div role="tabpanel" id={`board-panel-${active}`} aria-labelledby={`board-tab-${active}`} className="bg-card rounded-xl border border-border p-8 shadow-sm">
              <h3 className="text-2xl font-bold text-heading mb-2">{current.title}</h3>
              <p className="text-subtle mb-6">{current.description}</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {current.features.map((f) => <div key={f} className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" /><span className="text-sm text-heading">{f}</span></div>)}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
