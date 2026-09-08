'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  CheckCircle2, ArrowRight,
  UserPlus, IndianRupee, ClipboardCheck, CalendarDays, MessageCircle, BarChart3,
  FileText, GraduationCap, Users, Wallet, Package, TrendingUp, Bot, BookOpen, Bus,
  type LucideIcon,
} from 'lucide-react';
import { MODULES } from '@/data/modules';

// Brand gradient palette used site-wide, cycled by index so each module's
// selector pill gets a distinct icon color when inactive.
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

// Staff and Payroll share the staff-hr detail page (HR + payroll workflows
// live together there) — every other module id has its own /features/[slug] page.
const FEATURE_SLUG_OVERRIDES: Record<string, string | null> = {
  staff: 'staff-hr',
  payroll: 'staff-hr',
};

function getFeatureHref(moduleId: string): string | null {
  if (moduleId in FEATURE_SLUG_OVERRIDES) return FEATURE_SLUG_OVERRIDES[moduleId] ? `/features/${FEATURE_SLUG_OVERRIDES[moduleId]}` : null;
  return `/features/${moduleId}`;
}

// Icon components can't cross the Server -> Client Component boundary as props
// (React strips function references), so icons are attached here, keyed by
// id, instead of being passed in from product/page.tsx. The rest of each
// module's content (title, description, features, stat) is shared with the
// admin modules page and lives in @/data/modules.
// Ordered to match the header nav's "Core Modules" then "Add-on Modules"
// grouping (see navDropdowns.Features in Header.tsx): the 8 core modules
// first, then Parent & Student App / Reports & Analytics (present here but
// not broken out in the nav's Core/Add-on lists), then the 4 add-ons that
// also appear in this 14-module set (Library and Transport are separate
// standalone feature pages, not part of this list).
const ICON_MAP: Record<string, LucideIcon> = {
  admissions: UserPlus,
  student: GraduationCap,
  staff: Users,
  fees: IndianRupee,
  timetable: CalendarDays,
  attendance: ClipboardCheck,
  exams: FileText,
  communication: MessageCircle,
  reports: BarChart3,
  inventory: Package,
  payroll: Wallet,
  library: BookOpen,
  transport: Bus,
  'performance-insights': TrendingUp,
  'ai-secretary': Bot,
  'parent-app': MessageCircle,
};

const modules = MODULES.map((m) => ({ ...m, icon: ICON_MAP[m.id] }));

// Click a module name to see its details below — replaces the old layout of
// stacking every module's full section one after another, which made the
// page extremely long to scroll through. Every detail panel is still
// rendered in the page (just visually hidden via CSS, not unmounted), so
// every module stays fully indexable by search engines and readable by
// anyone viewing page source — only the interactive browsing behavior
// changes for a sighted user with JS enabled.
// moduleImages holds admin-uploaded overrides (module id -> data URL), keyed
// exactly like the SiteContent rows `module_image_<id>`. Plain strings are
// safe to pass across the Server -> Client boundary (only icon *components*
// aren't), so the parent server component fetches these and passes them in.
export default function ModuleExplorer({ moduleImages }: { moduleImages?: Record<string, string> }) {
  const [activeId, setActiveId] = useState(modules[0].id);

  return (
    <section className="bg-surface-2 py-10 md:py-14" id="modules">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-heading mb-2">Explore All School Software Modules</h2>
          <p className="text-subtle">Discover powerful modules designed to simplify school administration, automate everyday processes and give your school better visibility across academic and operational activities.</p>
        </div>

        {/* Module selector — 3-row pyramid layout (roughly a 3:2:1 split of
            the 16 modules):
            Row 1: 6 items
            Row 2: 5 items
            Row 3: 5 items (remaining)
            Each row is centered, creating a widening-then-narrowing pyramid effect.
        */}
        <div className="flex flex-col items-center gap-2.5 mb-10 md:mb-12">
          {(() => {
            const rows = [6, 5, 5];
            let idx = 0;
            return rows.map((rowSize, rowIdx) => {
              const rowModules = modules.slice(idx, idx + rowSize);
              const rowStart = idx;
              idx += rowSize;
              if (rowModules.length === 0) return null;
              return (
                <div key={rowIdx} className="flex flex-wrap items-center justify-center gap-2">
                  {rowModules.map((mod, localIdx) => {
                    const i = rowStart + localIdx;
                    const Icon = mod.icon;
                    const isActive = mod.id === activeId;
                    const gradient = GRADIENTS[i % GRADIENTS.length];
                    const shadow = SHADOWS[i % SHADOWS.length];
                    return (
                      <button
                        key={mod.id}
                        type="button"
                        onClick={() => setActiveId(mod.id)}
                        aria-pressed={isActive}
                        className={`flex items-center gap-2 pl-2 pr-4 py-1.5 rounded-full text-sm font-semibold border transition-all duration-200 ${
                          isActive
                            ? 'text-white shadow-md border-transparent'
                            : 'bg-card text-body border-border hover:border-[color-mix(in_srgb,var(--brand)_40%,transparent)]'
                        }`}
                        style={isActive ? { backgroundColor: 'var(--brand)' } : undefined}
                      >
                        {isActive ? (
                          <Icon className="w-4 h-4" />
                        ) : (
                          <span className={`w-5 h-5 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center shrink-0 shadow-sm ${shadow}`}>
                            <Icon className="w-3 h-3 text-white" />
                          </span>
                        )}
                        {mod.title}
                      </button>
                    );
                  })}
                </div>
              );
            });
          })()}
        </div>

        {/* Detail panels — all present in the DOM, only the active one visible */}
        {modules.map((mod, idx) => {
          const IconComp = mod.icon;
          const isActive = mod.id === activeId;
          return (
            <div key={mod.id} id={mod.id} className={isActive ? 'animate-fade-in-up' : 'hidden'}>
              <div className="bg-card rounded-2xl border border-border p-6 md:p-10">
                <div className="mb-8">
                  <Badge
                    variant="secondary"
                    className="mb-4 rounded-full px-3 py-1"
                    style={{ backgroundColor: 'color-mix(in srgb, var(--brand) 10%, transparent)', color: 'var(--brand)', borderColor: 'color-mix(in srgb, var(--brand) 20%, transparent)' }}
                  >
                    <IconComp className="w-3.5 h-3.5 mr-1.5" />
                    Module {idx + 1}
                  </Badge>
                  <h3 className="text-2xl md:text-3xl font-bold text-heading">{mod.title}</h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                  {/* Content */}
                  <div className="flex flex-col">
                    <p className="text-lg font-medium mb-4" style={{ color: 'var(--brand)' }}>
                      {mod.tagline}
                    </p>
                    <p className="text-subtle leading-relaxed mb-8">
                      {mod.description}
                    </p>
                    <ul className="space-y-3 mb-8">
                      {mod.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" style={{ color: 'var(--brand)' }} />
                          <span className="text-sm text-body">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    {mod.outro && (
                      <p className="text-sm text-subtle leading-relaxed mb-6">{mod.outro}</p>
                    )}
                    {getFeatureHref(mod.id) && (
                      <Button
                        className="font-semibold rounded-lg self-start"
                        style={{ backgroundColor: 'var(--brand)' }}
                        asChild
                      >
                        <Link href={getFeatureHref(mod.id)!}>
                          Learn More
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                    )}
                  </div>

                  {/* Visual Card — a full image when the admin has uploaded
                      one for this module, otherwise the stat/pills card. */}
                  <div className="flex">
                    {moduleImages?.[mod.id] ? (
                      <div className="w-full rounded-2xl border border-border shadow-lg overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={moduleImages[mod.id]}
                          alt={mod.title}
                          className="w-full h-full min-h-[320px] object-cover"
                        />
                      </div>
                    ) : (
                      <Card className="border-border shadow-lg w-full flex flex-col">
                        <CardContent className="pt-6 flex flex-col justify-center flex-1">
                          <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                              <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center"
                                style={{ backgroundColor: 'color-mix(in srgb, var(--brand) 12%, transparent)' }}
                              >
                                <IconComp className="w-6 h-6" style={{ color: 'var(--brand)' }} />
                              </div>
                              <div>
                                <p className="font-semibold text-heading">{mod.title}</p>
                                <p className="text-xs text-subtle">ChaloSchools Module</p>
                              </div>
                            </div>
                          </div>

                          <div
                            className="rounded-xl p-6 text-center"
                            style={{ backgroundColor: 'color-mix(in srgb, var(--brand) 8%, transparent)' }}
                          >
                            <div className="text-4xl md:text-5xl font-bold mb-2" style={{ color: 'var(--brand)' }}>
                              {mod.stat.value}
                            </div>
                            <p className="text-sm text-subtle font-medium">{mod.stat.label}</p>
                          </div>

                          <div className="mt-6 flex flex-wrap gap-2">
                            {mod.features.slice(0, 3).map((f) => (
                              <span
                                key={f}
                                className="text-[11px] font-medium px-2.5 py-1 rounded-full border"
                                style={{ color: 'var(--brand)', borderColor: 'color-mix(in srgb, var(--brand) 30%, transparent)', backgroundColor: 'color-mix(in srgb, var(--brand) 6%, transparent)' }}
                              >
                                {f}
                              </span>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
