import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { roles, getRoleBySlug } from '@/data/site-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  CheckCircle2, ArrowRight, UserCircle2, GraduationCap,
} from 'lucide-react';

interface PageProps {
  params: Promise<{ role: string }>;
}

export async function generateStaticParams() {
  return roles.map((r) => ({ role: r.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { role } = await params;
  const data = getRoleBySlug(role);
  if (!data) return { title: 'Solution Not Found' };
  return {
    title: `ChaloSchools for ${data.roleName} | ChaloSchools`,
    description: data.description,
    alternates: { canonical: `/solutions/role/${role}` },
  };
}

export default async function RoleSolutionPage({ params }: PageProps) {
  const { role } = await params;
  const data = getRoleBySlug(role);

  if (!data) notFound();

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://chaloschools.com' },
      { '@type': 'ListItem', position: 2, name: 'Solutions', item: 'https://chaloschools.com' },
      { '@type': 'ListItem', position: 3, name: data.roleName, item: `https://chaloschools.com/solutions/role/${role}` },
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
            <UserCircle2 className="w-4 h-4 mr-2" />
            For {data.roleName}
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            {data.headline}
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            {data.description}
          </p>
        </div>
      </section>

      {/* Why It Matters Section */}
      <section className="py-16 md:py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-heading mb-4">
              Why It Matters for {data.roleName}
            </h2>
            <p className="text-subtle text-lg max-w-2xl mx-auto">
              ChaloSchools is built to make life easier for {data.roleName.toLowerCase()} — here&apos;s how.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.points.map((point, index) => (
              <Card
                key={index}
                className="group border border-border hover:border-[#026dde]/30 hover:shadow-lg transition-all duration-300"
              >
                <CardContent className="pt-6 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#026dde]/10 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-heading font-medium leading-relaxed">{point}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-surface-2">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-heading mb-4">
            See How It Works for {data.roleName}
          </h2>
          <p className="text-subtle text-lg mb-8 max-w-2xl mx-auto">
            Book a free demo and we&apos;ll walk you through exactly what ChaloSchools does for {data.roleName.toLowerCase()}.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-[#f59e0b] hover:bg-[#d97706] text-white font-semibold px-8 py-6 text-base rounded-lg shadow-lg hover:shadow-xl transition-all"
              asChild
            >
              <Link href="/contact#contact-form">
                Book an Introductory Demo
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-[#026dde] text-primary hover:bg-[#026dde] hover:text-white font-semibold px-8 py-6 text-base rounded-lg transition-all"
              asChild
            >
              <Link href="/product">
                <GraduationCap className="w-5 h-5 mr-2" />
                Explore the Product
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
