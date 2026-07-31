import { Metadata } from 'next';

import Link from 'next/link';

import { notFound } from 'next/navigation';

import { features, getFeatureBySlug } from '@/data/site-data';

import { Button } from '@/components/ui/button';

import { Card, CardContent } from '@/components/ui/card';

import { Badge } from '@/components/ui/badge';

import {

  CheckCircle2, ArrowRight, MonitorPlay, AlertCircle, HelpCircle,

} from 'lucide-react';

interface PageProps {

  params: Promise<{ slug: string }>;

}

export async function generateStaticParams() {

  return features.map((f) => ({ slug: f.slug }));

}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {

  const { slug } = await params;

  const feature = getFeatureBySlug(slug);

  if (!feature) return { title: 'Feature Not Found' };

  return {

    title: `${feature.title} | ChaloSchools`,

    description: feature.description,

    alternates: { canonical: `/features/${slug}` },

  };

}

export default async function FeatureDetailPage({ params }: PageProps) {

  const { slug } = await params;

  const feature = getFeatureBySlug(slug);

  if (!feature) notFound();

  const Icon = feature.icon;

  const breadcrumbJsonLd = {

    '@context': 'https://schema.org',

    '@type': 'BreadcrumbList',

    itemListElement: [

      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://chaloschools.com' },

      { '@type': 'ListItem', position: 2, name: 'Features', item: 'https://chaloschools.com/product' },

      { '@type': 'ListItem', position: 3, name: feature.title, item: `https://chaloschools.com/features/${slug}` },

    ],

  };

  return (

    <>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* Hero Section */}

      <section className="relative bg-brand-gradient py-20 md:py-28 overflow-hidden">

        <div className="absolute inset-0 opacity-10">

          <div className="absolute top-10 left-10 w-72 h-72 bg-[#f59e0b] rounded-full blur-3xl" />

          <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#026dde] rounded-full blur-3xl" />

        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm font-medium">

            <Icon className="w-4 h-4 mr-2" style={{ color: feature.color }} />

            {feature.shortTitle}

          </Badge>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">

            {feature.headline}

          </h1>

          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">

            {feature.description}

          </p>

        </div>

      </section>

      {/* Problem Statement */}

      {feature.problems && feature.problems.length > 0 && (

        <section className="py-16 md:py-20 bg-surface-2">

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="text-center mb-10">

              <Badge variant="secondary" className="mb-4 bg-red-500/10 text-red-600 border-red-500/20">

                <AlertCircle className="w-4 h-4 mr-2" />

                The Problem

              </Badge>

              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-heading">

                Sound Familiar?

              </h2>

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              {feature.problems.map((problem, i) => (

                <div key={i} className="flex items-start gap-3 rounded-xl border border-border bg-card p-5">

                  <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center shrink-0">

                    <AlertCircle className="w-4 h-4 text-red-500" />

                  </div>

                  <p className="text-sm text-body leading-relaxed">{problem}</p>

                </div>

              ))}

            </div>

          </div>

        </section>

      )}

      {/* Benefits Grid */}

      <section className="py-16 md:py-24 bg-card">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-12 md:mb-16">

            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-heading mb-4">

              Key Benefits

            </h2>

            <p className="text-subtle text-lg max-w-2xl mx-auto">

              Discover how {feature.shortTitle.toLowerCase()} transforms school operations and saves valuable time.

            </p>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {feature.benefits.map((benefit, index) => (

              <Card

                key={index}

                className="group card-lift card-shine border border-border hover:border-[#026dde]/30 transition-all duration-300"

              >

                <CardContent className="pt-6">

                  <div

                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"

                    style={{ backgroundColor: `${feature.color}15` }}

                  >

                    <CheckCircle2 className="w-5 h-5" style={{ color: feature.color }} />

                  </div>

                  <p className="text-heading font-medium leading-relaxed">{benefit}</p>

                </CardContent>

              </Card>

            ))}

          </div>

        </div>

      </section>

      {/* Features List */}

      <section className="py-16 md:py-24 bg-surface-2">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            <div>

              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-heading mb-6">

                Everything You Need, Built In

              </h2>

              <p className="text-subtle text-lg mb-8 leading-relaxed">

                Our {feature.shortTitle.toLowerCase()} module comes packed with powerful capabilities designed for Indian schools.

              </p>

              <ul className="space-y-4">

                {feature.features.map((f, index) => (

                  <li key={index} className="flex items-start gap-3">

                    <div

                      className="w-6 h-6 rounded-full flex items-center justify-center mt-0.5 shrink-0"

                      style={{ backgroundColor: feature.color }}

                    >

                      <CheckCircle2 className="w-3.5 h-3.5 text-white" />

                    </div>

                    <span className="text-heading font-medium">{f}</span>

                  </li>

                ))}

              </ul>

            </div>

            <div className="relative">

              <div

                className="w-full aspect-square max-w-md mx-auto rounded-2xl flex items-center justify-center"

                style={{ backgroundColor: `${feature.color}08` }}

              >

                <div

                  className="w-3/4 h-3/4 rounded-2xl flex items-center justify-center"

                  style={{ backgroundColor: `${feature.color}12` }}

                >

                  <Icon className="w-24 h-24 md:w-32 md:h-32" style={{ color: feature.color }} />

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* FAQ */}

      {feature.faqs && feature.faqs.length > 0 && (

        <section className="py-16 md:py-20 bg-surface-2">

          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="text-center mb-10">

              <Badge variant="secondary" className="mb-3 bg-[#026dde]/10 text-primary border-[#026dde]/20">

                <HelpCircle className="w-4 h-4 mr-2" />

                FAQ

              </Badge>

              <h2 className="text-2xl md:text-3xl font-bold text-heading">

                Questions About {feature.shortTitle}?

              </h2>

            </div>

            <div className="space-y-4">

              {feature.faqs.map((faq, i) => (

                <details key={i} className="group bg-card rounded-xl border border-border p-5 open:shadow-sm">

                  <summary className="flex items-center justify-between gap-3 cursor-pointer list-none">

                    <h3 className="text-base font-semibold text-heading">{faq.q}</h3>

                    <ArrowRight className="w-4 h-4 shrink-0 text-primary transition-transform group-open:rotate-90" />

                  </summary>

                  <p className="text-sm text-subtle leading-relaxed mt-3">{faq.a}</p>

                </details>

              ))}

            </div>

          </div>

        </section>

      )}

      {/* CTA Section */}

      <section className="py-16 md:py-24 bg-card">

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-heading mb-4">

            Ready to Experience {feature.shortTitle}?

          </h2>

          <p className="text-subtle text-lg mb-8 max-w-2xl mx-auto">

            Book a free demo and see how {feature.shortTitle.toLowerCase()} can transform your school operations.

          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">

            <Button

              size="lg"

              className="bg-[#f59e0b] hover:bg-[#d97706] text-white font-semibold px-8 py-6 text-base rounded-lg shadow-lg hover:shadow-xl transition-all"

              asChild

            >

              <Link href="/contact#contact-form">

                Book a Free Demo

                <ArrowRight className="w-5 h-5 ml-2" />

              </Link>

            </Button>

            <Button

              variant="outline"

              size="lg"

              className="border-[#026dde] text-primary hover:bg-[#026dde] hover:text-white font-semibold px-8 py-6 text-base rounded-lg transition-all"

              asChild

            >

              <Link href="/solutions/state-cbse">

                <MonitorPlay className="w-5 h-5 mr-2" />

                View Solutions

              </Link>

            </Button>

          </div>

        </div>

      </section>

    </>

  );

}

