import type { Metadata } from "next";
import { Inter, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import ThemeProvider from "@/components/ThemeProvider";
import { getThemeInitScript } from "@/lib/theme-config";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { getActiveTheme } from "@/lib/get-active-theme";
import { SITE_URL } from "@/lib/site-url";

const inter = Inter({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });
const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"], weight: ["600", "700", "800"], display: "swap" });
const jetbrainsMono = JetBrains_Mono({ variable: "--font-jetbrains-mono", subsets: ["latin"], weight: ["500"], display: "swap" });

// Force dynamic rendering — site content comes from a SQLite database
// that doesn't exist during `next build` on CI/CD (Render, etc.)
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: {
    default: "ChaloSchools - Complete School ERP Software for Indian Schools",
    template: "%s | ChaloSchools",
  },
  description: "Fresh and New School Management Software – CHALO Schools Automated. Complete School Management Software which handles all the activities for operation of a school.",
  keywords: ["ChaloSchools", "School ERP", "School Management Software", "CBSE School Software", "IB School Software", "Cambridge School Software", "Fee Management", "Attendance Management", "India"],
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "ChaloSchools",
    title: "ChaloSchools - Complete School ERP Software for Indian Schools",
    description: "Fresh and New School Management Software – CHALO Schools Automated. Complete School Management Software which handles all the activities for operation of a school.",
    images: [{ url: "/images/hero-bg.png", width: 1344, height: 768, alt: "ChaloSchools Dashboard" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ChaloSchools - Complete School ERP Software",
    description: "Fresh and New School Management Software – CHALO Schools Automated. Complete School Management Software which handles all the activities for operation of a school.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Inspace Edu Solutions Private Limited",
  legalName: "Inspace Edu Solutions Private Limited",
  alternateName: "CHALO – Schools Automated",
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo.png`,
  description: "Fresh and New School Management Software – CHALO Schools Automated. Complete School Management Software which handles all the activities for operation of a school.",
  foundingDate: "2003",
  numberOfEmployees: {
    "@type": "QuantitativeValue",
    value: 350,
  },
  award: "Frost & Sullivan India School Automation - New Product Innovation Leadership Award, 2017",
  address: {
    "@type": "PostalAddress",
    streetAddress: "AA Business Centre, 4th Floor, Old Door No.94/1 & 2, New No.27 and 28, East Park Road, Shenoy Nagar",
    addressLocality: "Chennai",
    addressRegion: "Tamil Nadu",
    postalCode: "600030",
    addressCountry: "IN",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+91-99622-28160",
      contactType: "sales",
      email: "info@chaloschools.com",
    },
    {
      "@type": "ContactPoint",
      telephone: "+91-44-4353-1781",
      contactType: "customer service",
    },
  ],
  sameAs: [
    "https://www.facebook.com/share/14n1PfEVNpE/",
    "https://twitter.com/chaloschools",
    "https://www.linkedin.com/company/chalo---schools-automated/",
    "https://youtube.com/@chalo-z4v",
    "https://www.instagram.com/chaloschools",
  ],
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  // Resolve the active locale + messages (cookie-driven via src/i18n/request.ts).
  const locale = await getLocale();
  const messages = await getMessages();
  const activeTheme = await getActiveTheme();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: getThemeInitScript(activeTheme) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning className={`${inter.variable} ${manrope.variable} ${jetbrainsMono.variable} font-sans antialiased bg-background text-foreground`}>
        <GoogleAnalytics />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider activeTheme={activeTheme}>
            {children}
            <Toaster />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
