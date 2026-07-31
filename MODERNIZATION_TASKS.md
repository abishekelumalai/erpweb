# ChaloSchools — Homepage & Contact Form Modernization

## Context
The current site's homepage and contact form use fabricated placeholder content (fake stats, fake school logos, generic feature copy) and a thin lead form (name/email/phone/subject/message). The real live site has a modern landing page at `chaloschools.com/school-management-software-in-india/` with real testimonials, real trust stats, real client names, real FAQ content, and a better-qualified lead form. Goal: rework the homepage to mirror that modern structure/content and upgrade the contact form to capture the same lead-qualification data — using the real content below instead of invented placeholders.

Scope decisions already made (do not re-litigate):
- Demo video stays a single embeddable slot — no fake multi-video carousel (no real video files/rights available).
- Build **one** unified contact form — not two separate "Book Demo" / "Enquiry" forms.
- Keep existing honeypot + rate-limit bot protection — no Google reCAPTCHA (no site key available).

The database is currently empty for all CMS content (SiteContent, Testimonial, FAQ tables all have 0 rows), so all fallback/seed content can be freely rewritten without risk of clobbering real admin edits.

The Chalo logo already links to `/` via `Header.tsx` — no change needed, just re-verify after other changes land.

---

## Task 1 — Database schema change
File: `prisma/schema.prisma`

Extend the `ContactSubmission` model:
- Add `institution String` (required)
- Add `numberOfStudents String?`
- Add `city String?`
- Add `currentSoftware String?`
- Change `message String` → `message String?` (modern form doesn't require free text)

Run `npx prisma db push --skip-generate` after editing.

---

## Task 2 — Contact form overhaul

**`src/components/sections/ContactForm.tsx`** — replace fields with:
- Full Name (required)
- Name of Institution (required)
- Contact Number
- Email (required)
- Number of Students — `Select`: "Under 500" / "500–1000" / "1000–2000" / "2000+"
- City (required)
- Current Software — `Select`, optional: "Excel/Spreadsheets" / "WhatsApp Groups" / "Other ERP Software" / "No Software"
- Message — optional, smaller textarea, label "Anything else you'd like us to know?"

Keep the existing honeypot field and client-side validation pattern. Reuse `@/components/ui/select` (already used in `src/app/admin/faqs/new/page.tsx` and similar admin pages).

**`src/app/api/contact/route.ts`** — extract/validate new fields: name, email, institution, city required; phone/numberOfStudents/currentSoftware/message optional. Pass through to email + storage.

**`src/lib/email.ts`** — extend `ContactFormData` interface with `institution`, `numberOfStudents`, `city`, `currentSoftware`; update `formatContactEmail` HTML/text templates to include them; update `storeContactSubmission`'s `db.contactSubmission.create` call.

No change needed to `src/lib/sanitize.ts` — `sanitizeObject`/`containsSqlInjection` already handle arbitrary string fields generically.

---

## Task 3 — Homepage section-by-section refresh

All copy flows through the existing CMS pattern (`getContentValue(content, key, fallback)` from `SiteContentProvider`) — update fallback constants in each component **and** the corresponding entries in `src/lib/seed-site-content.ts` so admin-panel defaults match.

### 3a. HeroSection.tsx
Badge → "Trusted by 1000+ Indian Schools". Headline/description tone toward: "Automate Admissions, Fees, Attendance & Communication — all in one elegant platform."

### 3b. New `TrustStats.tsx` (insert right after Hero)
4-stat row:
- 1000+ Schools
- 2M+ Students
- 10M+ Fee Transactions
- 4.8/5 Rating

New CMS keys under section "Homepage - Trust Stats".

### 3c. SocialProofBar.tsx
Replace the fake school list (`FALLBACK_SCHOOLS`, `SCHOOL_LOGO_MAP`) with the real 8 client names:
- DAV Schools
- Maharishi Vidya Mandir
- Pushpalata Schools
- Krishnaswamy Group
- Vidhyasagar Global Institutions
- Air Force Schools
- Vivekanda Vidyalaya Group
- Kamala Niketan School

No real logo files exist for these — they'll render via the component's existing initials-badge fallback (data change only, no code change needed there).

### 3d. ProblemsSection.tsx — "The Challenges"
Badge → "The Challenges". Headline → "Is Your Current School Management System Holding You Back?" Replace the 6 `FALLBACK_PROBLEMS` with:
1. **Scattered Data** — Student information is spread across multiple systems, making it difficult to access accurate data quickly.
2. **Slow & Outdated Software** — Your current ERP feels slow, outdated, and requires multiple clicks for simple daily tasks.
3. **Communication Gaps** — Important announcements, fee reminders, and updates fail to reach parents on time.
4. **Limited Features & Reporting** — Your existing software lacks modern features like AI automation, mobile apps, online admissions, and real-time dashboards.
5. **Parent Frustration** — Parents struggle with fragmented communication and the lack of real-time updates on their child's attendance, academics, fees, and school activities.
6. **Data Security Risks** — Protect sensitive student and school data with ChaloSchools' ISO 27001 Certified platform, ensuring secure, centralized, and compliant data management.

### 3e. FeatureHighlights.tsx — "The Solution"
Reframe badge/headline to "Everything You Need in One Platform". Keep the existing 11 feature tiles/slugs (no routing changes to `/features/[slug]`) — just refresh a few descriptions toward the real product copy tone.

### 3f. New `WhyChooseUs.tsx` (insert after FeatureHighlights)
4 benefit cards:
1. **All-in-one platform** — No need for 5 different tools — manage everything from a single dashboard.
2. **Dedicated onboarding & training support** — We handle complete setup and train your staff so you can focus on education.
3. **Mobile app for parents, teachers & management** — Stay connected on the go with dedicated apps for every user type.
4. **Data security & cloud backup** — Bank-grade encryption with automatic daily backups keeps your data safe.

New CMS section "Homepage - Why Choose Us".

### 3g. BoardTabs.tsx
No change.

### 3h. DemoVideo.tsx
Keep single-video architecture as-is. Refresh badge/headline copy only ("See It In Action").

### 3i. New `ProcessSteps.tsx` (insert before Testimonials) — "Get Started in 3 Easy Steps"
1. **Book Free Demo** — Fill out the form and our team will schedule a personalized demo for your school.
2. **Quick Setup** — Our team handles complete data migration and customization for your school.
3. **Go Live** — Start using Chalo Schools with full training and 24/7 support for your team.

New CMS section "Homepage - Process Steps".

### 3j. TestimonialsSection.tsx
No code change — already fetches from `/api/testimonials` with a correct empty state. Just needs seed data (Task 4).

### 3k. New homepage FAQ block
`src/app/page.tsx` is a client component, so it can't do the server-side `db.fAQ.findMany()` that `contact/page.tsx` uses. Add a new self-fetching wrapper component (same fetch-on-mount pattern as `TestimonialsSection.tsx`) that calls `/api/faqs` and reuses `FAQSection.tsx`'s accordion markup/styling. Insert before `FinalCTA`.

### 3l. FinalCTA.tsx
Add trust line under the CTA buttons: "No credit card required · Free setup & training".

### 3m. Header.tsx
Add a "Talk to Sales" phone link (`tel:+919962228160`) next to the "Book Free Demo" button in the desktop nav, matching the reference page's nav.

### 3n. Wire into `src/app/page.tsx`
Insert the new components (`TrustStats`, `WhyChooseUs`, `ProcessSteps`, homepage FAQ wrapper) into the existing render order alongside the current sections.

---

## Task 4 — Seed real content

### New `src/lib/seed-testimonials.ts`
Upsert 5 real testimonials (`rating: 5`, `published: true`):

1. **Group Captain G Senthil Kumar** — Station Adjutant/Senior Education Officer, Air Force School, Chennai — "The association of Inspace Edu Solutions Pvt Ltd with Air Force School, Avadi, commenced in the year 2017 with a project to develop end-to-end software..."
2. **Chairman** — C.E.O.A. Matric Hr. Sec. School, Madurai — "We were not sure of a success in migrating our schools chain to a new software, yet we had taken a chance with Chalo..."
3. **Correspondent** — Pushpalata Vidya Mandir, Tirunelveli — "Inspace Edu Solutions Pvt. Ltd. provides exuberant and magnificent support and guidance in Chalo App for our Vidyalaya..."
4. **Mrs. Pushpalatha Pooranan** — Principal, Dr. Nalli Kuppuswami Vivekananda Vidyalaya Junior College, Chennai — "We have been using Chalo App & Student management system for the past 3 years."
5. **Dr. A. H. Rizvi** — President, Rizvi Springfield High School, Mumbai — "We at Rizvi Springfield High School had using Chalo – School Automated Software developed and installed..."

(Note: source quotes were truncated where scraped — verify/complete full quote text with the client before publishing, or keep the excerpt if that's all that's available.)

### New `src/lib/seed-faqs.ts`
Upsert 7 real FAQ entries (`published: true`):

1. **How long does it take to set up Chalo Schools?** — Most schools go live in under 30 days. Our onboarding team handles the entire data migration from your existing tool or spreadsheets.
2. **Do parents need a separate app?** — Yes — the free Chalo Parent App (iOS + Android) gives parents a single place to see attendance, fees, homework, and school communication.
3. **Is my school's data secure?** — Absolutely. Chalo Schools uses bank-grade AES-256 encryption, daily encrypted backups, and is fully compliant with India's DPDP Act.
4. **Can we migrate from our existing ERP or Excel sheets?** — Yes. Our team migrates all your student, staff, fee and academic data at zero additional cost.
5. **Does Chalo Schools support CBSE, ICSE and state boards?** — Yes — CBSE, ICSE, IB, IGCSE, and every major state board are supported out of the box.
6. **What is the pricing model?** — Chalo Schools is billed annually on a per-student basis, with modules you can enable or disable.
7. **What kind of support do you offer?** — 24/7 human support via WhatsApp, phone and in-app chat. Average first response time is under 4 minutes.

### Wire auto-seed-if-empty
In `src/app/api/admin/testimonials/route.ts` and `src/app/api/admin/faqs/route.ts` GET handlers, mirror the existing pattern in `src/app/api/admin/site-content/route.ts` (seed only if the table is empty). Makes the real content resilient to future DB resets.

### Update `src/lib/seed-site-content.ts`
Update `SEED_DATA` values for Hero, Social Proof, Problems, Features, Final CTA to match Task 3 copy; add new sections' keys for Trust Stats, Why Choose Us, and Process Steps.

---

## Verification checklist
1. `npx prisma db push --skip-generate` succeeds; dev server hot-reloads with no compile errors.
2. `curl localhost:3000/` returns 200 and includes the new section content (trust stats numbers, real school names, real testimonial names).
3. Hit `/api/testimonials` and `/api/faqs` once to trigger auto-seed; confirm via a Prisma count script that rows exist.
4. `curl -X POST localhost:3000/api/contact` with the new field set (institution, city, numberOfStudents, currentSoftware) returns success; confirm via Prisma query that the submission row has the new columns populated.
5. Load `http://localhost:3000` in a browser and visually check every new/updated section renders correctly (no layout breaks), then click the Chalo logo from `/contact` to confirm it returns to `/`.
