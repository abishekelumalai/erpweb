import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Heart, Zap, GraduationCap, Globe, Users, ArrowRight, Send, Briefcase,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Careers | ChaloSchools',
  description:
    'Join the ChaloSchools team and help transform Indian schools with technology. Explore open positions in engineering, sales, product, and more.',
  alternates: { canonical: '/careers' },
};

const cultureValues = [
  {
    icon: Heart,
    title: 'Impact First',
    description: 'Every line of code and every customer call directly impacts the future of Indian education.',
  },
  {
    icon: Zap,
    title: 'Move Fast',
    description: 'We ship features weekly, iterate based on real feedback, and never settle for "good enough".',
  },
  {
    icon: GraduationCap,
    title: 'Learn Always',
    description: 'Free books, conference budgets, and weekly learning sessions. Growth is non-negotiable.',
  },
  {
    icon: Globe,
    title: 'Think Big',
    description: 'We\'re building for 10,000+ schools. Our ambitions are matched by our execution.',
  },
  {
    icon: Users,
    title: 'Own It',
    description: 'Flat hierarchy, high autonomy. If you see a problem, you fix it — no permission needed.',
  },
  {
    icon: Heart,
    title: 'Supportive Culture',
    description: 'Flexible hours, remote-friendly, mental health days. We take care of our people.',
  },
];

export default function CareersPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-brand-gradient py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-1/3 w-72 h-72 bg-[#f59e0b] rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-1/3 w-96 h-96 bg-card/20 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm font-medium bg-card/10 text-white border-white/20">
            <Briefcase className="w-4 h-4 mr-2" />
            We&apos;re Hiring
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Join the ChaloSchools Team
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Help transform how Indian schools operate. We&apos;re looking for passionate people who want to make a real impact on education.
          </p>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-12 md:py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-heading mb-4">
              Life at ChaloSchools
            </h2>
            <p className="text-subtle text-lg max-w-2xl mx-auto">
              We&apos;re a mission-driven team that values impact, speed, and growth. Here&apos;s what makes us special.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cultureValues.map((item) => {
              const IconComp = item.icon;
              return (
                <Card
                  key={item.title}
                  className="group border border-border hover:border-[#026dde]/30 hover:shadow-lg transition-all duration-300"
                >
                  <CardContent className="pt-6">
                    <div className="w-10 h-10 rounded-lg bg-[#026dde]/10 flex items-center justify-center mb-4">
                      <IconComp className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-heading mb-2">
                      {item.title}
                    </h3>
                    <p className="text-subtle text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Perks Banner */}
      <section className="py-12 md:py-16 bg-surface-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {[
              '🏥 Health Insurance',
              '🏠 Remote Friendly',
              '🎉 Team Outings',
              '📱 Work Devices',
            ].map((perk) => (
              <span
                key={perk}
                className="text-sm md:text-base font-medium text-heading flex items-center gap-2"
              >
                {perk}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* How to Apply */}
      <section className="py-12 md:py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-heading mb-6">
              How to Apply
            </h2>
            <p className="text-subtle text-lg mb-10 leading-relaxed">
              Our hiring process is simple and transparent. We value skills and passion over fancy degrees.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { step: '01', title: 'Apply', desc: 'Fill out the form or email us your resume and a brief note.' },
                { step: '02', title: 'Screen', desc: 'A quick 30-min call to understand your background and interests.' },
                { step: '03', title: 'Interview', desc: 'A technical/role-specific round with the team you\'ll work with.' },
                { step: '04', title: 'Offer', desc: 'If it\'s a match, we\'ll send an offer within 3 business days.' },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="w-14 h-14 rounded-full bg-[#026dde] text-white font-bold text-lg flex items-center justify-center mx-auto mb-3">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-semibold text-heading mb-2">{item.title}</h3>
                  <p className="text-sm text-subtle leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16 bg-surface-2">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-heading mb-4">
            Interested in Joining Us?
          </h2>
          <p className="text-subtle text-lg mb-8 max-w-2xl mx-auto">
            We&apos;re always looking for talented people. Send us your resume and tell us how you can make a difference.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-[#f59e0b] hover:bg-[#d97706] text-white font-semibold px-8 py-6 text-base rounded-lg shadow-lg hover:shadow-xl transition-all"
              asChild
            >
              <a href="mailto:careers@chaloschools.com">
                <Send className="w-5 h-5 mr-2" />
                Email Your Resume
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-[#026dde] text-primary hover:bg-[#026dde] hover:text-white font-semibold px-8 py-6 text-base rounded-lg transition-all"
              asChild
            >
              <Link href="/contact">
                <ArrowRight className="w-5 h-5 mr-2" />
                Contact Us
              </Link>
            </Button>
          </div>
          <p className="text-sm text-subtle mt-4">
            Email: <a href="mailto:careers@chaloschools.com" className="text-primary hover:underline font-medium">careers@chaloschools.com</a>
          </p>
        </div>
      </section>
    </>
  );
}
