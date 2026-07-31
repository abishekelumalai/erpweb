'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { MessageCircle, Phone, ArrowRight } from 'lucide-react';

export default function WhatsAppCTA() {
  return (
    <section className="py-16 lg:py-20 bg-surface-2 border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left space-y-3">
            <h2 className="text-2xl lg:text-3xl font-bold text-heading">Need Help Choosing the Right Plan?</h2>
            <p className="text-subtle text-lg max-w-xl">Chat with our team on WhatsApp or call us directly. We&apos;ll help you find the perfect solution — in English, Hindi, or Tamil.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <Button size="lg" className="bg-[#25D366] hover:bg-[#1da851] text-white rounded-full font-semibold px-8 h-12 shadow-lg shadow-green-100 group">
              <MessageCircle className="w-5 h-5 mr-2" />Chat on WhatsApp <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" className="rounded-full px-8 h-12 border-[#026dde] text-primary hover:bg-[#026dde] hover:text-white">
              <Phone className="w-4 h-4 mr-2" />+91 9677 7327 28
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
