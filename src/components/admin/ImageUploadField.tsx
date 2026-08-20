'use client';

import { useRef, useState } from 'react';
import { toast } from 'sonner';
import { Loader2, Upload, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { compressImage } from '@/lib/compress-image';

const MAX_SOURCE_FILE_MB = 15;

interface ImageUploadFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  urlPlaceholder?: string;
}

export default function ImageUploadField({ id, label, value, onChange, urlPlaceholder }: ImageUploadFieldProps) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  async function handleFileSelected(file: File) {
    if (!file.type.startsWith('image/')) {
      toast.error('Please choose an image file');
      return;
    }
    if (file.size > MAX_SOURCE_FILE_MB * 1024 * 1024) {
      toast.error(`Image is too large — please choose a file under ${MAX_SOURCE_FILE_MB}MB`);
      return;
    }
    setUploading(true);
    try {
      const dataUrl = await compressImage(file);
      onChange(dataUrl);
      toast.success('Image uploaded');
    } catch {
      toast.error('Failed to process image — please try another file');
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>

      {value && (
        <div className="relative w-full max-w-xs h-36 rounded-lg border border-border overflow-hidden bg-muted/40">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt={label} className="w-full h-full object-cover" />
          <Button
            type="button"
            size="icon"
            variant="secondary"
            className="absolute top-2 right-2 size-7"
            onClick={() => onChange('')}
          >
            <X className="size-3.5" />
          </Button>
        </div>
      )}

      <div className="flex items-center gap-2">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFileSelected(file);
            e.target.value = '';
          }}
        />
        <Button
          type="button"
          size="sm"
          variant="outline"
          disabled={uploading}
          onClick={() => fileInputRef.current?.click()}
        >
          {uploading ? <Loader2 className="size-3.5 animate-spin" /> : <Upload className="size-3.5" />}
          {value ? 'Replace image' : 'Upload image'}
        </Button>
        <span className="text-xs text-muted-foreground">or paste a URL below</span>
      </div>

      <Input
        id={id}
        placeholder={urlPlaceholder || 'https://example.com/image.jpg'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
