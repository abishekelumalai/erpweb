'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, FileCheck, Lock, Scale, ShieldCheck } from 'lucide-react';

const PILLARS = [
  { icon: FileCheck, title: 'Transparency', description: 'Clear on what data is collected and why.' },
  { icon: Lock, title: 'Security', description: 'Safeguards built into the platform, not bolted on.' },
  { icon: Scale, title: 'Accountability', description: 'Audit trails for every access to personal data.' },
];

export default function SecurityCompliance() {
  return (
    <section className="py-12 lg:py-16 bg-card">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-border bg-surface-2 p-8 md:p-12"
        >
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5 mr-1.5" />
                Data Protection &amp; Compliance
              </Badge>
              <h2 className="text-2xl lg:text-3xl font-bold text-heading mb-4">
                Built for India&apos;s DPDP Act, 2023
              </h2>
              <p className="text-body leading-relaxed mb-6">
                India&apos;s DPDP Act, 2023 and DPDP Rules, 2025 establish a comprehensive and rights-driven data protection framework that strengthens transparency, security and accountability. ChaloSchools is built around it from the ground up — plus ISO 27001:2022 certification.
              </p>
              <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-full">
                <Link href="/security">
                  See How We Implement It
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-1 gap-4">
              {PILLARS.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-4 rounded-xl bg-card border border-border p-4"
                >
                  <div className="w-11 h-11 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <p.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-heading">{p.title}</h3>
                    <p className="text-xs text-subtle">{p.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
