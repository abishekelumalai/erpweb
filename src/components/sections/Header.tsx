'use client';

import { useState, useEffect, useRef, useId } from 'react';

import Link from 'next/link';

import { usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';

import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';

import { Menu, ChevronDown, ArrowRight } from 'lucide-react';

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

import Image from 'next/image';



interface NavItem {

  label: string;

  href?: string;

}

interface NavSection {

  title?: string;

  items: NavItem[];

}

interface NavDropdownData {

  sections: NavSection[];

}

const navDropdowns: Record<string, NavDropdownData> = {

  Features: {

    sections: [{ items: [

      { label: 'AI Feature Suite (20+)', href: '/platform-capabilities' },

      { label: 'Admissions Management', href: '/features/admissions' },

      { label: 'Fees & Finance', href: '/features/fees' },

      { label: 'Attendance Tracking', href: '/features/attendance' },

      { label: 'Exam & Marks Portal', href: '/features/exams' },

      { label: 'Timetable Scheduler', href: '/features/timetable' },

      { label: 'Parent & Student App', href: '/features/parent-app' },

      { label: 'Staff & HR Module', href: '/features/staff-hr' },

      { label: 'Library Management', href: '/features/library' },

      { label: 'Transport Tracking', href: '/features/transport' },

      { label: 'WhatsApp Notifications', href: '/features/whatsapp' },

      { label: 'Reports & Analytics', href: '/features/reports' },

    ] }],

  },

  Solutions: {

    sections: [

      { title: 'By Board', items: [

        { label: 'Pre School', href: '/solutions/pre-school' },

        { label: 'IB Schools', href: '/solutions/ib' },

        { label: 'Cambridge Schools', href: '/solutions/cambridge' },

        { label: 'Montessori Schools', href: '/solutions/montessori' },

        { label: 'State & CBSE', href: '/solutions/state-cbse' },

        { label: 'Matric / Higher Education', href: '/solutions/matric' },

      ]},

      { title: 'By Role', items: [

        { label: 'School Owners', href: '/solutions/role/school-owners' },

        { label: 'Principals', href: '/solutions/role/principals' },

        { label: 'Teachers', href: '/solutions/role/teachers' },

        { label: 'Parents', href: '/solutions/role/parents' },

        { label: 'Accountants', href: '/solutions/role/accountants' },

      ]},

    ],

  },

  Resources: {

    sections: [{ items: [

      { label: 'Blogs', href: '/blog' },

      { label: 'Webinars', href: '/webinars' },

      { label: 'News & Events', href: '/news' },

      { label: 'Case Studies', href: '/case-studies' },

      { label: 'Help & Documentation', href: '/help' },

      { label: 'Release Notes', href: '/release-notes' },

    ] }],

  },

  Company: {

    sections: [{ items: [

      { label: 'About Us', href: '/about' },

      { label: 'Why ChaloSchools?', href: '/compare' },

      { label: 'Our Team', href: '/about' },

      { label: 'Our Customers', href: '/about' },

      { label: 'Careers', href: '/careers' },

      { label: 'Contact Us', href: '/contact' },

      { label: 'Partner With Us', href: '/contact' },

    ] }],

  },

};

const navItems = ['Features', 'Solutions', 'Resources', 'Company'];

function MegaDropdown({

  label, data, isOpen, onOpen, onClose, active,

}: {

  label: string; data: NavDropdownData; isOpen: boolean; onOpen: () => void; onClose: () => void; active: boolean;

}) {

  const panelId = useId();

  const containerRef = useRef<HTMLDivElement>(null);

  const reduce = useReducedMotion();

  function handleKeyDown(e: React.KeyboardEvent) {

    if (e.key === 'Escape' && isOpen) {

      e.stopPropagation();

      onClose();

      const trigger = containerRef.current?.querySelector<HTMLButtonElement>('button[aria-haspopup]');

      trigger?.focus();

    }

  }

  return (

    <div

      ref={containerRef}

      className="relative"

      onMouseEnter={onOpen}

      onMouseLeave={onClose}

      onKeyDown={handleKeyDown}

    >

      <button

        type="button"

        aria-haspopup="true"

        aria-expanded={isOpen}

        aria-controls={panelId}

        onClick={() => (isOpen ? onClose() : onOpen())}

        onFocus={onOpen}

        className="relative flex items-center gap-1 px-3 py-2 text-sm font-medium text-heading/80 hover:text-primary transition-colors cursor-pointer rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"

      >

        {label} <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />

        {active && (

          <motion.span

            layoutId="nav-active"

            className="absolute left-2 right-2 -bottom-0.5 h-0.5 rounded-full bg-primary"

            transition={{ type: 'spring', stiffness: 300, damping: 25 }}

          />

        )}

      </button>

      <AnimatePresence>{isOpen && (

        <motion.div

          id={panelId}

          role="menu"

          aria-label={label}

          initial={{ opacity: 0, y: 8, scale: 0.98 }}

          animate={{ opacity: 1, y: 0, scale: 1 }}

          exit={{ opacity: 0, y: 8, scale: 0.98 }}

          transition={{ duration: 0.15 }}

          className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[500px] bg-card rounded-xl shadow-xl border border-border p-6 z-50"

        >

          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-card rotate-45 rounded-[2px] border-l border-t border-border" />

          <div className="space-y-4">

            {data.sections.map((section, idx) => (

              <div key={idx}>

                {section.title && <p className="text-xs font-extrabold uppercase tracking-wider text-heading mb-2">{section.title}</p>}

                <motion.div

                  className="grid grid-cols-2 gap-1"

                  initial={reduce ? undefined : 'hidden'}

                  animate={reduce ? undefined : 'visible'}

                  variants={reduce ? undefined : { hidden: {}, visible: { transition: { staggerChildren: 0.04, delayChildren: 0.03 } } }}

                >

                  {section.items.map((item) => (

                    <motion.div

                      key={item.label}

                      variants={reduce ? undefined : { hidden: { opacity: 0, x: -8 }, visible: { opacity: 1, x: 0 } }}

                    >

                      <Link

                        href={item.href || '#'}

                        role="menuitem"

                        className="group/item flex items-center justify-between gap-2 px-3 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-muted rounded-lg transition-all hover:translate-x-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"

                      >

                        <span>{item.label}</span>

                        <ArrowRight className="w-3.5 h-3.5 shrink-0 text-primary opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all" aria-hidden="true" />

                      </Link>

                    </motion.div>

                  ))}

                </motion.div>

              </div>

            ))}

          </div>

        </motion.div>

      )}</AnimatePresence>

    </div>

  );

}

// --- Mobile accordion section (height auto animation) ---

function MobileAccordion({ label, data }: { label: string; data: NavDropdownData }) {

  const [open, setOpen] = useState(false);

  return (

    <div className="border-b border-border/50 last:border-0">

      <button

        type="button"

        onClick={() => setOpen((o) => !o)}

        aria-expanded={open}

        className="w-full flex items-center justify-between px-3 py-2.5 text-xs font-bold uppercase tracking-wider text-muted-foreground"

      >

        {label}

        <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />

      </button>

      <AnimatePresence initial={false}>

        {open && (

          <motion.div

            initial={{ height: 0, opacity: 0 }}

            animate={{ height: 'auto', opacity: 1 }}

            exit={{ height: 0, opacity: 0 }}

            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}

            className="overflow-hidden"

          >

            {data.sections.map((s, idx) => (

              <div key={idx} className="pb-1">

                {s.title && <p className="px-5 py-1.5 text-[11px] font-semibold text-muted-foreground uppercase">{s.title}</p>}

                {s.items.map((item) => (

                  <Link key={item.label} href={item.href || '#'} className="block px-5 py-2.5 text-sm text-foreground hover:text-primary rounded-lg transition-colors">{item.label}</Link>

                ))}

              </div>

            ))}

          </motion.div>

        )}

      </AnimatePresence>

    </div>

  );

}

export default function Header() {

  const [scrolled, setScrolled] = useState(false);

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const pathname = usePathname();

  useEffect(() => {

    const h = () => setScrolled(window.scrollY > 20);

    window.addEventListener('scroll', h);

    return () => window.removeEventListener('scroll', h);

  }, []);

  function handleDropdownOpen(label: string) {

    clearTimeout(closeTimeoutRef.current);

    setActiveDropdown(label);

  }

  function handleDropdownClose() {

    closeTimeoutRef.current = setTimeout(() => setActiveDropdown(null), 200);

  }

  // Which top-level dropdown owns the current route (for the layoutId indicator).

  function isActive(label: string): boolean {

    const data = navDropdowns[label];

    if (!data) return false;

    return data.sections.some((s) => s.items.some((it) => it.href && it.href !== '#' && pathname.startsWith(it.href)));

  }

  return (

    <nav

      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-card/80 backdrop-blur-xl shadow-md border-b border-border' : 'bg-card border-b border-border'}`}

      aria-label="Primary"

    >

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-center justify-between h-16 lg:h-[68px]">

          <Link href="/" className="flex items-center gap-2 shrink-0">

            <Image src="/images/logo.png" alt="ChaloSchools" width={345} height={150} className="theme-logo h-11 w-auto drop-shadow-sm" priority />

          </Link>

          <div className="hidden lg:flex items-center gap-1 ml-auto mr-6">

            <Link href="/" className="relative px-3 py-2 text-sm font-medium text-heading/80 hover:text-primary transition-colors hover-underline">Home</Link>

            <Link href="/product" className="relative px-3 py-2 text-sm font-medium text-heading/80 hover:text-primary transition-colors hover-underline">Modules</Link>

            <Link href="/pricing" className="relative px-3 py-2 text-sm font-medium text-heading/80 hover:text-primary transition-colors hover-underline">Pricing</Link>

            {navItems.map((item) => navDropdowns[item] ? (

              <MegaDropdown

                key={item}

                label={item}

                data={navDropdowns[item]}

                isOpen={activeDropdown === item}

                onOpen={() => handleDropdownOpen(item)}

                onClose={handleDropdownClose}

                active={isActive(item)}

              />

            ) : null)}

          </div>

          <div className="hidden lg:flex items-center gap-2">


            <Button asChild size="sm" className="text-xs bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-full px-4 h-8 shadow-sm shadow-primary/20">

              <Link href="/contact#contact-form">Book an Introductory Demo <ArrowRight className="w-3 h-3 ml-1" /></Link>

            </Button>

          </div>

          <Sheet>

            <SheetTrigger asChild className="lg:hidden"><Button variant="ghost" size="icon" aria-label="Open menu"><Menu className="w-5 h-5" /></Button></SheetTrigger>

            <SheetContent side="right" className="w-80 p-0"><SheetTitle className="sr-only">Menu</SheetTitle>

              <div className="flex flex-col h-full">

                <div className="p-6 border-b border-border">

                  <Link href="/"><Image src="/images/logo.png" alt="ChaloSchools" width={345} height={150} className="theme-logo h-8 w-auto" /></Link>

                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-1">

                  <Link href="/" className="block px-3 py-2.5 text-sm font-semibold text-foreground hover:text-primary rounded-lg transition-colors">Home</Link>

                  <Link href="/product" className="block px-3 py-2.5 text-sm font-semibold text-foreground hover:text-primary rounded-lg transition-colors">Modules</Link>

                  <Link href="/pricing" className="block px-3 py-2.5 text-sm font-semibold text-foreground hover:text-primary rounded-lg transition-colors">Pricing</Link>

                  {Object.entries(navDropdowns).map(([label, data]) => (

                    <MobileAccordion key={label} label={label} data={data} />

                  ))}

                </div>

                <div className="p-4 border-t border-border">

                  <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full">

                    <Link href="/contact#contact-form">Book an Introductory Demo <ArrowRight className="w-4 h-4 ml-2" /></Link>

                  </Button>

                </div>

              </div>

            </SheetContent>

          </Sheet>

        </div>

      </div>

    </nav>

  );

}

