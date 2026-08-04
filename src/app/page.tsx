import Header from '@/components/sections/Header';

import HeroSection from '@/components/sections/HeroSection';

import TrustStats from '@/components/sections/TrustStats';

import SocialProofBar from '@/components/sections/SocialProofBar';

import ProblemsSection from '@/components/sections/ProblemsSection';

import FeatureHighlights from '@/components/sections/FeatureHighlights';

import OurApps from '@/components/sections/OurApps';

import IntegrationsStrip from '@/components/sections/IntegrationsStrip';

import WhyChooseUs from '@/components/sections/WhyChooseUs';

import SecurityCompliance from '@/components/sections/SecurityCompliance';

import BoardTabs from '@/components/sections/BoardTabs';

import ProcessSteps from '@/components/sections/ProcessSteps';

import TestimonialsSection from '@/components/sections/TestimonialsSection';

import HomepageFAQ from '@/components/sections/HomepageFAQ';

import DemoVideo from '@/components/sections/DemoVideo';

import CaseStudySnapshot from '@/components/sections/CaseStudySnapshot';

import PricingTeaser from '@/components/sections/PricingTeaser';

import BlogStrip from '@/components/sections/BlogStrip';

import FinalCTA from '@/components/sections/FinalCTA';

import Footer from '@/components/sections/Footer';

import SiteContentProvider from '@/components/sections/SiteContentProvider';

import FAQStructuredData from '@/components/FAQStructuredData';

import SoftwareApplicationStructuredData from '@/components/SoftwareApplicationStructuredData';

import FloatingWhatsApp from '@/components/FloatingWhatsApp';

import ChatBot from '@/components/ChatBot';

import { db } from '@/lib/db';

// Safely parse the CaseStudy.stats JSON string into [{label, value}].

function parseCaseStudyStats(raw: string | null): { label: string; value: string }[] {

  if (!raw) return [];

  try {

    const parsed = JSON.parse(raw);

    if (Array.isArray(parsed)) {

      return parsed

        .filter((s) => s && typeof s.label === 'string' && typeof s.value === 'string')

        .map((s) => ({ label: s.label, value: s.value }));

    }

  } catch {

    // ignore malformed stats — section will render without stat callouts

  }

  return [];

}

export default async function Home() {

  const [testimonials, faqs, latestPosts, featuredCaseStudy, visibilityRows] = await Promise.all([

    db.testimonial.findMany({

      where: { published: true },

      orderBy: { order: 'asc' },

      select: { id: true, name: true, role: true, school: true, content: true, rating: true },

    }),

    db.fAQ.findMany({

      where: { published: true },

      orderBy: { order: 'asc' },

      select: { id: true, question: true, answer: true, category: true },

    }),

    db.blogPost.findMany({

      where: { published: true },

      orderBy: [{ publishedAt: 'desc' }, { createdAt: 'desc' }],

      take: 3,

      select: { id: true, title: true, slug: true, excerpt: true, category: true, coverImage: true, publishedAt: true },

    }),

    db.caseStudy.findFirst({

      where: { published: true },

      orderBy: { createdAt: 'desc' },

      select: { slug: true, title: true, excerpt: true, schoolName: true, location: true, board: true, stats: true },

    }),

    db.siteContent.findMany({

      where: { key: { startsWith: 'visibility_' } },

      select: { key: true, value: true },

    }),

  ]);

  const caseStudy = featuredCaseStudy

    ? { ...featuredCaseStudy, stats: parseCaseStudyStats(featuredCaseStudy.stats) }

    : null;

  // Missing row = never toggled off = visible by default.

  const isVisible = (key: string) => visibilityRows.find((r) => r.key === `visibility_${key}`)?.value !== 'false';

  return (

    <div className="min-h-screen flex flex-col">

      <Header />

      <FAQStructuredData faqs={faqs} />

      <SoftwareApplicationStructuredData testimonials={testimonials} />

      <SiteContentProvider>

        <main className="flex-1">

          {/* 1. Hero Section */}

          <HeroSection />

          {/* 2. Trust Stats */}

          {isVisible('trust_stats') && <TrustStats />}

          {/* 3. Social Proof Bar */}

          {isVisible('social_proof') && <SocialProofBar />}

          {/* 4. Key Problems / Challenges */}

          {isVisible('problems') && <ProblemsSection />}

          {/* 5. Feature Highlights */}

          {isVisible('features') && <FeatureHighlights />}

          {/* 5b. Our Apps */}

          {isVisible('our_apps') && <OurApps />}

          {/* 5c. Integrations */}

          {isVisible('integrations') && <IntegrationsStrip />}

          {/* 6. Product Demo Video */}

          {isVisible('demo_video') && <DemoVideo />}

          {/* 7. Why Choose Us */}

          {isVisible('why_choose_us') && <WhyChooseUs />}

          {/* Security & Compliance (DPDP Act) */}

          {isVisible('security_compliance') && <SecurityCompliance />}

          {/* 8. Board-Specific Tabs */}

          {isVisible('board_tabs') && <BoardTabs />}

          {/* 9. Process Steps */}

          {isVisible('process_steps') && <ProcessSteps />}

          {/* 10. Testimonials */}

          {isVisible('testimonials') && <TestimonialsSection testimonials={testimonials} />}

          {/* 11. Case Study Snapshot (hidden if none published) */}

          {isVisible('case_study') && <CaseStudySnapshot caseStudy={caseStudy} />}

          {/* 12. Pricing Teaser */}

          {isVisible('pricing_teaser') && <PricingTeaser />}

          {/* 13. FAQ */}

          {isVisible('faq') && <HomepageFAQ faqs={faqs} />}

          {/* 14. Blog / Latest News (hidden if no posts) */}

          {isVisible('blog_strip') && <BlogStrip posts={latestPosts} />}

          {/* 15. Final CTA */}

          {isVisible('final_cta') && <FinalCTA />}

        </main>

      </SiteContentProvider>

      {/* Footer */}

      <Footer />

      <FloatingWhatsApp />

      <ChatBot />

    </div>

  );

}

