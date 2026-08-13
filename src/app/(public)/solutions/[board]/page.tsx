import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { solutions, getSolutionBySlug } from '@/data/site-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  CheckCircle2, ArrowRight, GraduationCap, Building2,
  ClipboardCheck, Users, MessageCircle, BarChart3, Wallet,
} from 'lucide-react';

// Same brand gradient palette used site-wide (ProblemsSection, TrustStats),
// cycled per feature so this grid's icon boxes aren't all identical.
const FEATURE_ICONS = [CheckCircle2, Users, Wallet, ClipboardCheck, MessageCircle, BarChart3];
const FEATURE_GRADIENTS = [
  'from-[#026dde] to-[#00d4ff]',
  'from-[#f59e0b] to-[#fbbf24]',
  'from-[#10b981] to-[#34d399]',
  'from-[#8b5cf6] to-[#a78bfa]',
  'from-[#0891b2] to-[#22d3ee]',
  'from-[#e11d48] to-[#f87171]',
];
const FEATURE_SHADOWS = [
  'shadow-[#026dde]/20',
  'shadow-[#f59e0b]/20',
  'shadow-[#10b981]/20',
  'shadow-[#8b5cf6]/20',
  'shadow-[#0891b2]/20',
  'shadow-[#e11d48]/20',
];

interface PageProps {
  params: Promise<{ board: string }>;
}

export async function generateStaticParams() {
  return solutions.map((s) => ({ board: s.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { board } = await params;
  const solution = getSolutionBySlug(board);
  if (!solution) return { title: 'Solution Not Found' };
  return {
    title: `${solution.boardName} Solution`,
    description: solution.description,
    alternates: { canonical: `/solutions/${board}` },
  };
}

export default async function SolutionDetailPage({ params }: PageProps) {
  const { board } = await params;
  const solution = getSolutionBySlug(board);

  if (!solution) notFound();

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://chaloschools.com' },
      { '@type': 'ListItem', position: 2, name: 'Solutions', item: 'https://chaloschools.com' },
      { '@type': 'ListItem', position: 3, name: solution.boardName, item: `https://chaloschools.com/solutions/${board}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {/* Hero Section */}
      <section className="relative bg-brand-gradient py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-80 h-80 bg-[#f59e0b] rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-card/20 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm font-medium bg-card/10 text-white border-white/20">
            <GraduationCap className="w-4 h-4 mr-2" />
            {solution.boardName}
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            {solution.headline}
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            {solution.description}
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-16 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {solution.stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-subtle text-sm md:text-base font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-heading mb-4">
              Tailored Features for {solution.boardName}
            </h2>
            <p className="text-subtle text-lg max-w-2xl mx-auto">
              Every feature is customized to meet the specific requirements of {solution.boardName.toLowerCase()} schools.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
            {solution.features.map((feature, index) => {
              const gradient = FEATURE_GRADIENTS[index % FEATURE_GRADIENTS.length];
              const shadow = FEATURE_SHADOWS[index % FEATURE_SHADOWS.length];
              const FeatureIcon = FEATURE_ICONS[index % FEATURE_ICONS.length];
              return (
                <Card
                  key={index}
                  className="group card-lift card-shine border border-border hover:border-[#026dde]/30 transition-all duration-300"
                >
                  <CardContent className="pt-6">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 shadow-lg ${shadow} text-white`}>
                      <FeatureIcon className="w-5 h-5" />
                    </div>
                    <p className="text-heading font-medium leading-relaxed">{feature}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 md:py-16 bg-surface-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-heading mb-6">
                Why {solution.boardName} Schools Choose Us
              </h2>
              <p className="text-subtle text-lg mb-8 leading-relaxed">
                We understand the unique challenges and compliance requirements of {solution.boardName.toLowerCase()} schools. Our platform is designed to simplify every aspect of school management.
              </p>
              <ul className="space-y-4">
                {[
                  'Board-specific compliance and reporting',
                  'Customizable grading and assessment formats',
                  'Parent communication in regional languages',
                  'Dedicated onboarding and training',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#026dde] flex items-center justify-center mt-0.5 shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-heading font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="w-full aspect-[4/3] max-w-lg mx-auto rounded-2xl bg-gradient-to-br from-[#026dde]/5 to-[#026dde]/15 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <Building2 className="w-20 h-20 text-primary mx-auto" />
                  <p className="text-primary font-semibold text-xl">{solution.boardName}</p>
                  <p className="text-subtle text-sm">Complete Management Solution</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-heading mb-4">
            Get Started with {solution.boardName} Solution
          </h2>
          <p className="text-subtle text-lg mb-8 max-w-2xl mx-auto">
            Join hundreds of {solution.boardName.toLowerCase()} schools already using ChaloSchools to streamline operations.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-[#f59e0b] hover:bg-[#d97706] text-white font-semibold px-8 py-6 text-base rounded-lg shadow-lg hover:shadow-xl transition-all"
              asChild
            >
              <Link href="/contact#contact-form">
                Request a Demo
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-[#026dde] text-primary hover:bg-[#026dde] hover:text-white font-semibold px-8 py-6 text-base rounded-lg transition-all"
              asChild
            >
              <Link href="/features/admissions">
                <GraduationCap className="w-5 h-5 mr-2" />
                Explore Features
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
