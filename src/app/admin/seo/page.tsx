'use client';

import { useEffect, useState, useCallback } from 'react';
import { toast } from 'sonner';
import { Loader2, Search, Save, RotateCcw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

interface PageDef {
  key: string;
  path: string;
  label: string;
  defaultTitle: string;
  defaultDescription: string;
}

// Same pageKey values used in each page's generateMetadata() call — must
// match exactly, that's what the SiteContent keys `seo_title_<key>` /
// `seo_description_<key>` join on. Covers every page with one fixed title —
// blog posts, case studies, etc. already get their SEO title/description
// from their own content (edited on their own admin pages), so they aren't
// listed here separately.
const PAGES: PageDef[] = [
  { key: 'home', path: '/', label: 'Homepage', defaultTitle: 'ChaloSchools - Complete School ERP Software for Indian Schools', defaultDescription: 'Fresh and New School Management Software – CHALO Schools Automated. Complete School Management Software which handles all the activities for operation of a school.' },
  { key: 'product', path: '/product', label: 'Product Tour', defaultTitle: 'Product Tour', defaultDescription: 'Take a tour of ChaloSchools — explore all our modules, from Admissions and Fee Management to Payroll, Inventory, and our AI Secretary.' },
  { key: 'pricing', path: '/pricing', label: 'Pricing', defaultTitle: 'Pricing', defaultDescription: 'Simple, transparent pricing for schools of every size — view plans and what\'s included. Pay per student, per year. No hidden costs, no long-term lock-in.' },
  { key: 'about', path: '/about', label: 'About Us', defaultTitle: 'About Us', defaultDescription: 'Learn about ChaloSchools – CHALO Schools Automated, built by Inspace Edu Solutions Private Limited. We serve 200+ schools and 1.5+ Million students across India with a complete school management ERP.' },
  { key: 'security', path: '/security', label: 'Data Protection & Security', defaultTitle: 'Data Protection & Security', defaultDescription: "How ChaloSchools implements India's DPDP Act, 2023 and DPDP Rules, 2025 — data masking, role-based access, encryption, and audit-ready compliance, backed by ISO 27001:2022 certification." },
  { key: 'platform-capabilities', path: '/platform-capabilities', label: 'Platform Capabilities', defaultTitle: 'Platform Capabilities', defaultDescription: '20+ industry-first, AI-powered capabilities built into ChaloSchools — from AI Rephrase and Voice Broadcast to KYP verification and Enterprise Cloud infrastructure.' },
  { key: 'careers', path: '/careers', label: 'Careers', defaultTitle: 'Careers', defaultDescription: 'Join the ChaloSchools team and help transform Indian schools with technology. Explore open positions in engineering, sales, product, and more.' },
  { key: 'case-studies', path: '/case-studies', label: 'Case Studies (list)', defaultTitle: 'Case Studies', defaultDescription: 'See how schools across India transform their operations with ChaloSchools. Real stories, real results from CBSE, ICSE, and state board schools.' },
  { key: 'blog', path: '/blog', label: 'Blog (list)', defaultTitle: 'Blog & Insights', defaultDescription: 'Stay updated with the latest trends in school management, education technology, and best practices from ChaloSchools.' },
  { key: 'news', path: '/news', label: 'News & Events (list)', defaultTitle: 'News & Events', defaultDescription: 'Latest news, events, and updates from ChaloSchools. Stay informed about product launches, school partnerships, and education industry events.' },
  { key: 'webinars', path: '/webinars', label: 'Webinars (list)', defaultTitle: 'Webinars', defaultDescription: 'Watch on-demand webinars about school management best practices, education technology, and upcoming sessions from ChaloSchools.' },
  { key: 'help', path: '/help', label: 'Help & Documentation', defaultTitle: 'Help & Documentation', defaultDescription: 'Find guides, tutorials, and documentation to help you get the most out of ChaloSchools school management system.' },
  { key: 'release-notes', path: '/release-notes', label: 'Release Notes', defaultTitle: 'Release Notes', defaultDescription: "See what's new in ChaloSchools. Browse release notes for the latest features, improvements, and bug fixes." },
  { key: 'privacy', path: '/privacy', label: 'Privacy Policy', defaultTitle: 'Privacy Policy', defaultDescription: 'Learn how ChaloSchools collects, uses, and protects your personal information. We are committed to safeguarding the privacy of our users.' },
  { key: 'contact', path: '/contact', label: 'Contact Us', defaultTitle: 'Contact Us', defaultDescription: 'Get in touch with ChaloSchools. Book a free demo, request a callback, or reach our support team. We\'re here to help your school succeed.' },
  { key: 'terms', path: '/terms', label: 'Terms of Service', defaultTitle: 'Terms of Service', defaultDescription: 'Read the Terms of Service for ChaloSchools. These terms govern your use of our website and services.' },
  { key: 'compare', path: '/compare', label: 'Compare', defaultTitle: 'ChaloSchools vs Alternatives | Compare School Management Software', defaultDescription: 'Compare ChaloSchools with Excel spreadsheets, WhatsApp groups, and generic ERP systems. See why schools choose a purpose-built school management platform.' },
];

const TITLE_MAX = 60;
const DESC_MAX = 160;

export default function SeoPage() {
  const [values, setValues] = useState<Record<string, { title: string; description: string }>>({});
  const [loading, setLoading] = useState(true);
  const [savingKey, setSavingKey] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const fetchValues = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/site-content');
      if (!res.ok) throw new Error('Failed to fetch');
      const data: { key: string; value: string }[] = await res.json();
      const map: Record<string, { title: string; description: string }> = {};
      for (const p of PAGES) {
        const title = data.find((r) => r.key === `seo_title_${p.key}`)?.value || '';
        const description = data.find((r) => r.key === `seo_description_${p.key}`)?.value || '';
        map[p.key] = { title, description };
      }
      setValues(map);
    } catch {
      toast.error('Failed to load SEO tags');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchValues();
  }, [fetchValues]);

  async function saveField(key: string, field: 'title' | 'description', value: string) {
    const siteContentKey = field === 'title' ? `seo_title_${key}` : `seo_description_${key}`;
    const res = await fetch('/api/admin/site-content', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: siteContentKey, value }),
    });
    if (!res.ok) throw new Error('Failed to save');
  }

  async function handleSave(page: PageDef) {
    setSavingKey(page.key);
    try {
      const current = values[page.key] ?? { title: '', description: '' };
      await Promise.all([
        saveField(page.key, 'title', current.title),
        saveField(page.key, 'description', current.description),
      ]);
      toast.success(`Saved — ${page.label}`);
    } catch {
      toast.error('Failed to save — please try again');
    } finally {
      setSavingKey(null);
    }
  }

  async function handleReset(page: PageDef) {
    setSavingKey(page.key);
    try {
      await Promise.all([
        saveField(page.key, 'title', ''),
        saveField(page.key, 'description', ''),
      ]);
      setValues((prev) => ({ ...prev, [page.key]: { title: '', description: '' } }));
      toast.success(`Reverted to default — ${page.label}`);
    } catch {
      toast.error('Failed to reset — please try again');
    } finally {
      setSavingKey(null);
    }
  }

  const filteredPages = PAGES.filter(
    (p) =>
      p.label.toLowerCase().includes(search.toLowerCase()) ||
      p.path.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Search className="size-6" />
          SEO Meta Tags
        </h1>
        <p className="text-muted-foreground">
          Edit the search-result title and description for each page — no code changes needed. Leave a field blank and that page keeps its current default. These control what shows in Google search results, the browser tab, and link previews on WhatsApp/LinkedIn/etc.
        </p>
      </div>

      <Input
        placeholder="Search pages..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-sm"
      />

      <div className="space-y-4">
        {filteredPages.map((page) => {
          const current = values[page.key] ?? { title: '', description: '' };
          const isBusy = savingKey === page.key;
          const hasOverride = !!(current.title || current.description);
          return (
            <Card key={page.key}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base">{page.label}</CardTitle>
                    <p className="text-xs text-muted-foreground font-mono mt-0.5">{page.path}</p>
                  </div>
                  {hasOverride && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">Customized</span>
                  )}
                </div>
              </CardHeader>
              <Separator />
              <CardContent className="pt-4 space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor={`title-${page.key}`}>Title tag</Label>
                  <Input
                    id={`title-${page.key}`}
                    placeholder={page.defaultTitle}
                    value={current.title}
                    onChange={(e) => setValues((prev) => ({ ...prev, [page.key]: { ...current, title: e.target.value } }))}
                  />
                  <p className={`text-xs ${current.title.length > TITLE_MAX ? 'text-destructive' : 'text-muted-foreground'}`}>
                    {current.title.length || 0}/{TITLE_MAX} characters {current.title.length > TITLE_MAX && '— longer titles get cut off in Google search results'}
                  </p>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor={`desc-${page.key}`}>Meta description</Label>
                  <Textarea
                    id={`desc-${page.key}`}
                    placeholder={page.defaultDescription}
                    value={current.description}
                    onChange={(e) => setValues((prev) => ({ ...prev, [page.key]: { ...current, description: e.target.value } }))}
                    rows={2}
                  />
                  <p className={`text-xs ${current.description.length > DESC_MAX ? 'text-destructive' : 'text-muted-foreground'}`}>
                    {current.description.length || 0}/{DESC_MAX} characters {current.description.length > DESC_MAX && '— longer descriptions get cut off in Google search results'}
                  </p>
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <Button size="sm" disabled={isBusy} onClick={() => handleSave(page)}>
                    {isBusy ? <Loader2 className="size-3.5 animate-spin" /> : <Save className="size-3.5" />}
                    Save
                  </Button>
                  {hasOverride && (
                    <Button size="sm" variant="ghost" disabled={isBusy} onClick={() => handleReset(page)}>
                      <RotateCcw className="size-3.5" />
                      Reset to default
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
