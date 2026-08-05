'use client';

import { motion } from 'framer-motion';
import { useSiteContent, getContentValue } from './SiteContentProvider';
import { GraduationCap } from 'lucide-react';

const FALLBACK_SCHOOLS = 'DAV Schools, Maharishi Vidya Mandir, Pushpalata Schools, Krishnaswamy Group, Vidhyasagar Global Institutions, Air Force Schools, Vivekanda Vidyalaya Group, Kamala Niketan School';

function getInitials(name: string): string {
  return name
    .split(/[\s']/)
    .filter(Boolean)
    .map(w => w[0].toUpperCase())
    .slice(0, 2)
    .join('');
}

export default function SocialProofBar() {
  const { content } = useSiteContent();
  const schoolsRaw = getContentValue(content, 'social_proof_schools', FALLBACK_SCHOOLS);
  const trustedSchools = schoolsRaw.split(',').map(s => s.trim()).filter(Boolean);

  // Duplicate the list for seamless infinite marquee
  const doubledSchools = [...trustedSchools, ...trustedSchools];

  return (
    <section className="py-14 bg-card">
      {/* Decorative line */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#026dde]/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
          {/* Left: Prominent counter */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="shrink-0 text-center sm:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#026dde]/8 border border-[#026dde]/15 mb-2">
              <GraduationCap className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">Trusted by</span>
            </div>
            <p className="text-4xl font-extrabold text-primary leading-tight">{getContentValue(content, 'trust_stat_1_value', '200+')}</p>
            <p className="text-sm font-medium text-subtle mt-0.5">Schools Across India</p>
          </motion.div>

          <div className="hidden sm:block h-14 w-px bg-gradient-to-b from-transparent via-gray-200 to-transparent" />

          {/* Right: Scrolling marquee of school pills */}
          <div className="flex-1 relative w-full overflow-hidden">
            {/* Gradient masks on edges */}
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            <div className="animate-marquee flex items-center gap-3 w-max">
              {doubledSchools.map((school, i) => {
                return (
                  <div
                    key={`${school}-${i}`}
                    className="inline-flex items-center gap-2.5 shrink-0 px-3.5 py-2 rounded-full border border-[#026dde]/12 bg-[#026dde]/[0.03] hover:border-[#026dde]/25 hover:bg-[#026dde]/[0.06] transition-colors"
                  >
                    <span className="w-7 h-7 rounded-md bg-[#026dde]/10 flex items-center justify-center text-[10px] font-bold text-primary leading-none">
                      {getInitials(school)}
                    </span>
                    <span className="text-xs font-medium text-body whitespace-nowrap">{school}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
