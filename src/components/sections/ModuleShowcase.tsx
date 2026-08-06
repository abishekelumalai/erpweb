'use client';

import { motion } from 'framer-motion';
import {
  UserPlus, IndianRupee, ClipboardCheck, CalendarDays, FileBarChart,
  GraduationCap, Users, MessageCircle, BookOpen, Bus, Wallet, Bot,
} from 'lucide-react';

interface ScatterTile {
  icon: typeof UserPlus;
  label: string;
  gradient: string;
  top: string;
  left: string;
  rotate: number;
  size: number;
}

// Positioned by hand around the center text in a loose scattered ring —
// only the modules that fit ChaloSchools' real 14-module lineup.
const TILES: ScatterTile[] = [
  { icon: UserPlus, label: 'Admissions', gradient: 'from-[#026dde] to-[#024fb3]', top: '6%', left: '10%', rotate: -12, size: 92 },
  { icon: IndianRupee, label: 'Fees', gradient: 'from-[#f59e0b] to-[#d97706]', top: '4%', left: '68%', rotate: 9, size: 84 },
  { icon: ClipboardCheck, label: 'Attendance', gradient: 'from-[#10b981] to-[#059669]', top: '14%', left: '86%', rotate: -8, size: 78 },
  { icon: CalendarDays, label: 'Timetable', gradient: 'from-[#8b5cf6] to-[#7c3aed]', top: '68%', left: '4%', rotate: 10, size: 80 },
  { icon: FileBarChart, label: 'Exams', gradient: 'from-[#026dde] to-[#0891b2]', top: '78%', left: '20%', rotate: -14, size: 90 },
  { icon: GraduationCap, label: 'Students', gradient: 'from-[#f59e0b] to-[#ea580c]', top: '82%', left: '62%', rotate: 8, size: 86 },
  { icon: Users, label: 'Staff', gradient: 'from-[#6366f1] to-[#4f46e5]', top: '70%', left: '84%', rotate: -6, size: 78 },
  { icon: MessageCircle, label: 'Comms', gradient: 'from-[#10b981] to-[#34d399]', top: '24%', left: '2%', rotate: 13, size: 72 },
  { icon: BookOpen, label: 'Library', gradient: 'from-[#026dde] to-[#024fb3]', top: '38%', left: '90%', rotate: -10, size: 76 },
  { icon: Bus, label: 'Transport', gradient: 'from-[#f59e0b] to-[#d97706]', top: '4%', left: '38%', rotate: 6, size: 70 },
  { icon: Wallet, label: 'Payroll', gradient: 'from-[#e11d48] to-[#be123c]', top: '88%', left: '42%', rotate: -9, size: 76 },
  { icon: Bot, label: 'AI Secretary', gradient: 'from-[#e11d48] to-[#f87171]', top: '48%', left: '94%', rotate: 11, size: 74 },
];

export default function ModuleShowcase() {
  return (
    <section className="relative bg-brand-gradient py-24 md:py-32 overflow-hidden">
      {/* Scattered module tiles — hidden on small screens to avoid clutter */}
      <div className="absolute inset-0 hidden lg:block pointer-events-none">
        {TILES.map((t, i) => (
          <motion.div
            key={t.label}
            initial={{ opacity: 0, scale: 0.6, rotate: t.rotate * 2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: t.rotate }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ rotate: 0, scale: 1.12, zIndex: 20 }}
            className="absolute pointer-events-auto cursor-default"
            style={{ top: t.top, left: t.left, width: t.size, height: t.size }}
          >
            <div
              className={`w-full h-full rounded-2xl bg-gradient-to-br ${t.gradient} shadow-2xl border border-white/10 flex flex-col items-center justify-center gap-1.5 backdrop-blur-sm transition-shadow duration-300 hover:shadow-[0_0_40px_-8px_rgba(255,255,255,0.35)]`}
            >
              <t.icon className="text-white" style={{ width: t.size * 0.32, height: t.size * 0.32 }} />
              <span className="text-white/90 text-[10px] font-semibold tracking-wide">{t.label}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Center content */}
      <div className="relative max-w-3xl mx-auto px-4 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-white/50 text-xs font-semibold tracking-[0.2em] uppercase mb-4"
        >
          Defining the core of school automation
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-none mb-6"
        >
          THE MODULES
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.18 }}
          className="text-white/70 text-base md:text-lg max-w-xl mx-auto mb-10"
        >
          Every tool your school needs — admissions to alumni — built into one platform, not stitched together from ten.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.26 }}
          className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-white/40 text-[11px] font-mono tracking-wider uppercase"
        >
          <span>200+_Schools_Served</span>
          <span className="hidden sm:inline text-white/20">/</span>
          <span>14_Modules_Built</span>
          <span className="hidden sm:inline text-white/20">/</span>
          <span>ISO_27001_Certified</span>
        </motion.div>
      </div>
    </section>
  );
}
