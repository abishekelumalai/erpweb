'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle2, Lock, AlertCircle } from 'lucide-react';
import { trackConversion } from '@/components/GoogleAnalytics';

function generateCaptcha() {
  const a = Math.floor(Math.random() * 20) + 1;
  const b = Math.floor(Math.random() * 10) + 1;
  return { a, b, answer: a + b };
}

export default function HeroContactForm() {
  const [captcha, setCaptcha] = useState({ a: 0, b: 0, answer: 0 });
  const [captchaInput, setCaptchaInput] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    institution: '',
    phone: '',
    email: '',
    numberOfStudents: '',
    city: '',
  });

  useEffect(() => {
    setCaptcha(generateCaptcha());
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSelectChange(name: string, value: string) {
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');

    if (!formData.institution.trim() || !formData.phone.trim() || !formData.email.trim() || !formData.city.trim()) {
      setError('Please fill in all required fields.');
      return;
    }

    if (parseInt(captchaInput) !== captcha.answer) {
      setError('Incorrect answer. Please try again.');
      setCaptcha(generateCaptcha());
      setCaptchaInput('');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.institution,
          email: formData.email,
          phone: formData.phone,
          institution: formData.institution,
          numberOfStudents: formData.numberOfStudents,
          city: formData.city,
          currentSoftware: '',
          message: 'Submitted via homepage hero form',
          honeypot: '',
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmitted(true);
        trackConversion('generate_lead', {
          event_category: 'hero_form',
          event_label: formData.institution,
          value: 1,
          currency: 'INR',
        });
      } else if (res.status === 429) {
        setError('Too many submissions. Please wait a moment.');
      } else {
        setError(data.message || 'Something went wrong. Please try again.');
      }
    } catch {
      setError('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="bg-card rounded-2xl shadow-2xl p-6 md:p-8 border border-border">
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-4">
            <CheckCircle2 className="w-7 h-7 text-green-600" />
          </div>
          <h3 className="text-lg font-bold text-heading mb-2">Thank You!</h3>
          <p className="text-sm text-subtle max-w-xs">
            Our team will contact you within 24 hours to schedule your free demo.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-2xl shadow-2xl p-6 md:p-8 border border-border relative">
      {/* Top accent bar */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-[#026dde] rounded-b-full" />

      <h2 className="text-xl font-bold text-heading mb-1">Get a Free Demo</h2>
      <p className="text-sm text-subtle mb-5">See how Chalo Schools can transform your institution</p>

      <form onSubmit={handleSubmit} className="space-y-3.5">
        {error && (
          <div className="flex items-start gap-2 p-2.5 rounded-lg bg-red-50 border border-red-100 text-red-600 text-xs">
            <AlertCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <div className="space-y-1.5">
          <Label htmlFor="hero-institution" className="text-xs font-semibold text-body">Name of Institution *</Label>
          <Input
            id="hero-institution"
            name="institution"
            placeholder="e.g. Sunrise Public School"
            value={formData.institution}
            onChange={handleChange}
            required
            className="h-10 text-sm bg-surface-2 border-border focus:border-[#026dde]"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="hero-phone" className="text-xs font-semibold text-body">Contact Number *</Label>
            <Input
              id="hero-phone"
              name="phone"
              type="tel"
              placeholder="+91 98765 43210"
              value={formData.phone}
              onChange={handleChange}
              required
              className="h-10 text-sm bg-surface-2 border-border focus:border-[#026dde]"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="hero-email" className="text-xs font-semibold text-body">Email *</Label>
            <Input
              id="hero-email"
              name="email"
              type="email"
              placeholder="school@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="h-10 text-sm bg-surface-2 border-border focus:border-[#026dde]"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-body">Number of Students</Label>
            <Select value={formData.numberOfStudents} onValueChange={(v) => handleSelectChange('numberOfStudents', v)}>
              <SelectTrigger className="h-10 text-sm bg-surface-2 border-border">
                <SelectValue placeholder="Select range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Under 500">Under 500</SelectItem>
                <SelectItem value="500–1000">500–1000</SelectItem>
                <SelectItem value="1000–2000">1000–2000</SelectItem>
                <SelectItem value="2000+">2000+</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="hero-city" className="text-xs font-semibold text-body">City *</Label>
            <Input
              id="hero-city"
              name="city"
              placeholder="Your city"
              value={formData.city}
              onChange={handleChange}
              required
              className="h-10 text-sm bg-surface-2 border-border focus:border-[#026dde]"
            />
          </div>
        </div>

        {/* Captcha */}
        <div className="flex items-center gap-3 p-3 rounded-lg bg-surface-2 border border-border">
          <span className="text-xs text-subtle font-medium whitespace-nowrap">Verify you&apos;re human:</span>
          <span className="text-sm font-bold text-heading whitespace-nowrap">{captcha.a} + {captcha.b}</span>
          <span className="text-sm text-subtle">=</span>
          <Input
            type="number"
            value={captchaInput}
            onChange={(e) => setCaptchaInput(e.target.value)}
            placeholder="?"
            className="w-16 h-8 text-sm text-center bg-card border-border"
            required
          />
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-[#026dde] hover:bg-[#0258b8] text-white font-semibold h-11 text-sm rounded-lg shadow-md hover:shadow-lg transition-all"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Submitting...
            </span>
          ) : (
            'Get Free Demo'
          )}
        </Button>

        <div className="flex items-center justify-center gap-1.5 pt-1">
          <Lock className="w-3 h-3 text-subtle" />
          <span className="text-[11px] text-subtle">Your information is secure. No spam, ever.</span>
        </div>
      </form>
    </div>
  );
}
