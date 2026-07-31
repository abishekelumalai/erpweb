'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const tiers = [
  { name: 'Basic', tagline: 'Core admissions, fees & attendance', highlight: false },
  { name: 'Growth', tagline: 'Adds academics, parent app & WhatsApp', highlight: true },
  { name: 'Enterprise', tagline: 'Full suite, multi-branch & priority support', highlight: false },
];

export default function PricingTeaser() {
  return (
    <section className="py-16 md:py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <Badge className="mb-4 bg-[#026dde]/10 text-primary border-[#026dde]/20 rounded-full">Pricing</Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-heading mb-3">Simple, Transparent Pricing</h2>
          <p className="text-lg text-body">
            Pay per student, per year — no hidden costs, no long-term lock-in. Choose the plan that fits your school.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative flex flex-col rounded-2xl border p-6 text-center ${
                tier.highlight
                  ? 'border-primary shadow-lg shadow-primary/10 bg-card'
                  : 'border-border bg-card'
              }`}
            >
              {tier.highlight && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground border-0 rounded-full px-4">
                  Most Popular
                </Badge>
              )}
              <CheckCircle2 className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="text-xl font-bold text-heading">{tier.name}</h3>
              <p className="text-sm text-subtle mt-2">{tier.tagline}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full font-semibold px-8">
            <Link href="/pricing">
              View Full Pricing <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
