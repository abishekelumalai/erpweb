'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { toast } from 'sonner';
import {
  Loader2, ImageIcon, Upload, Trash2,
  UserPlus, IndianRupee, ClipboardCheck, CalendarDays, MessageCircle, BarChart3,
  FileText, GraduationCap, Users, Wallet, Package, TrendingUp, Bot, BookOpen, Bus,
  type LucideIcon,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { compressImage } from '@/lib/compress-image';
import { MODULE_IDS } from '@/data/modules';

interface ModuleDef {
  id: string;
  title: string;
  icon: LucideIcon;
}

// Icons keyed by id, layered onto the shared id/title list from
// @/data/modules (that's what the SiteContent key `module_image_<id>` and
// the public /product page join on) — icons can't live in that shared data
// file since it's also imported by server components.
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

const MODULES: ModuleDef[] = MODULE_IDS.map((m) => ({ ...m, icon: ICON_MAP[m.id] }));

export default function ModuleImagesPage() {
  const [images, setImages] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const fetchImages = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/site-content');
      if (!res.ok) throw new Error('Failed to fetch');
      const data: { key: string; value: string }[] = await res.json();
      const map: Record<string, string> = {};
      for (const row of data) {
        if (row.key.startsWith('module_image_') && row.value) {
          map[row.key.replace('module_image_', '')] = row.value;
        }
      }
      setImages(map);
    } catch {
      toast.error('Failed to load module images');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  async function handleFileSelected(moduleId: string, file: File) {
    if (!file.type.startsWith('image/')) {
      toast.error('Please choose an image file');
      return;
    }
    setBusyId(moduleId);
    try {
      const dataUrl = await compressImage(file);
      const res = await fetch('/api/admin/site-content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: `module_image_${moduleId}`, value: dataUrl }),
      });
      if (!res.ok) throw new Error('Failed to save');
      setImages((prev) => ({ ...prev, [moduleId]: dataUrl }));
      toast.success('Image updated');
    } catch {
      toast.error('Failed to upload image — please try again');
    } finally {
      setBusyId(null);
    }
  }

  async function handleRemove(moduleId: string) {
    setBusyId(moduleId);
    try {
      const res = await fetch('/api/admin/site-content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: `module_image_${moduleId}`, value: '' }),
      });
      if (!res.ok) throw new Error('Failed to save');
      setImages((prev) => {
        const next = { ...prev };
        delete next[moduleId];
        return next;
      });
      toast.success('Reverted to default icon');
    } catch {
      toast.error('Failed to remove image — please try again');
    } finally {
      setBusyId(null);
    }
  }

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
          <ImageIcon className="size-6" />
          Module Images
        </h1>
        <p className="text-muted-foreground">
          Upload a custom image for any module on the /product page — it replaces the default icon in that module&apos;s card. Leave a module without an image and it keeps showing its default icon.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">All Modules</CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {MODULES.map((mod) => {
              const Icon = mod.icon;
              const image = images[mod.id];
              const isBusy = busyId === mod.id;
              return (
                <div key={mod.id} className="flex items-center gap-4 rounded-xl border border-border p-4">
                  <div className="w-16 h-16 shrink-0 rounded-lg border border-border overflow-hidden flex items-center justify-center bg-muted/40">
                    {image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={image} alt={mod.title} className="w-full h-full object-cover" />
                    ) : (
                      <Icon className="w-7 h-7 text-muted-foreground" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold truncate">{mod.title}</p>
                    <p className="text-xs text-muted-foreground mb-2">{image ? 'Custom image' : 'Default icon'}</p>
                    <div className="flex items-center gap-2">
                      <input
                        ref={(el) => { fileInputRefs.current[mod.id] = el; }}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileSelected(mod.id, file);
                          e.target.value = '';
                        }}
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={isBusy}
                        onClick={() => fileInputRefs.current[mod.id]?.click()}
                      >
                        {isBusy ? <Loader2 className="size-3.5 animate-spin" /> : <Upload className="size-3.5" />}
                        Upload
                      </Button>
                      {image && (
                        <Button
                          size="sm"
                          variant="ghost"
                          disabled={isBusy}
                          onClick={() => handleRemove(mod.id)}
                        >
                          <Trash2 className="size-3.5" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
