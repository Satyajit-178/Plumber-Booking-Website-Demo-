import React, { useState, useEffect, useRef } from 'react';
import {
  Phone,
  Wrench,
  Droplets,
  Waves,
  Flame,
  Bath,
  Siren,
  Clock,
  ShieldCheck,
  BadgeDollarSign,
  Award,
  Star,
  ArrowRight,
  CheckCircle2,
  MapPin,
  Mail,
  CalendarClock,
  SlidersHorizontal,
  AlertCircle,
} from 'lucide-react';
import {
  DEFAULT_SITE_CONFIG,
  SiteConfig,
  PlumbingIconType,
  resolvePlaceholders,
} from './data/siteConfig';
import { ServiceAreaMap } from './components/ServiceAreaMap';
import { CmsDrawer } from './components/CmsDrawer';

const STORAGE_KEY = 'proplumb_site_cms_config_v1';

function renderPlumbingIcon(icon: PlumbingIconType, className = 'w-6 h-6') {
  switch (icon) {
    case 'siren':
      return <Siren className={className} />;
    case 'droplet':
      return <Droplets className={className} />;
    case 'waves':
      return <Waves className={className} />;
    case 'flame':
      return <Flame className={className} />;
    case 'bath':
      return <Bath className={className} />;
    case 'wrench':
      return <Wrench className={className} />;
    case 'clock':
      return <Clock className={className} />;
    case 'shield-check':
      return <ShieldCheck className={className} />;
    case 'badge-dollar':
      return <BadgeDollarSign className={className} />;
    case 'award':
      return <Award className={className} />;
    default:
      return <Wrench className={className} />;
  }
}

export default function App() {
  const [config, setConfig] = useState<SiteConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    return DEFAULT_SITE_CONFIG;
  });

  const [isCmsOpen, setIsCmsOpen] = useState(false);
  const [heroImgError, setHeroImgError] = useState(false);
  const [whyImgError, setWhyImgError] = useState(false);

  // Quote Form State
  const [fullName, setFullName] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [selectedService, setSelectedService] = useState(
    DEFAULT_SITE_CONFIG.servicesSection.items[0].title
  );
  const [urgency, setUrgency] = useState<'emergency' | 'today' | 'scheduled'>(
    'today'
  );
  const [message, setMessage] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [submittedQuote, setSubmittedQuote] = useState<{
    referenceId: string;
    name: string;
    phone: string;
    service: string;
    urgencyLabel: string;
  } | null>(null);

  const nameInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    } catch {
      // Ignore storage errors
    }
  }, [config]);

  const handleResetConfig = () => {
    setConfig(DEFAULT_SITE_CONFIG);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  };

  const scrollToSection = (sectionId: string, focusForm = false) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    if (focusForm) {
      setTimeout(() => {
        nameInputRef.current?.focus();
      }, 450);
    }
  };

  const handleSelectServiceForQuote = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
    setSubmittedQuote(null);
    scrollToSection('contact', true);
  };

  const handleSelectAreaForQuote = (areaName: string) => {
    setMessage((prev) =>
      prev.includes(areaName)
        ? prev
        : `Location: ${areaName}. ${prev}`.trim()
    );
    setSubmittedQuote(null);
    scrollToSection('contact', true);
  };

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const trimmedName = fullName.trim();
    const digitsOnly = phoneInput.replace(/\D/g, '');

    if (trimmedName.length < 2) {
      setFormError('Please enter your name so our dispatcher knows who to ask for.');
      return;
    }

    if (digitsOnly.length < 7) {
      setFormError('Please enter a valid 10-digit phone number for your quote callback.');
      return;
    }

    const urgencyMap = {
      emergency: 'Immediate 24/7 Emergency Dispatch',
      today: 'Same-Day Service Window',
      scheduled: 'Flexible Scheduled Estimate',
    };

    const refNum = `PLM-${Math.floor(100000 + Math.random() * 900000)}`;
    setSubmittedQuote({
      referenceId: refNum,
      name: trimmedName,
      phone: phoneInput.trim(),
      service: selectedService,
      urgencyLabel: urgencyMap[urgency],
    });
  };

  const telHref = `tel:${config.business.phoneTel}`;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 pb-14 md:pb-0">
      {/* =====================================================================
          1. STICKY HEADER (Clean 3-Zone Top Bar with Call Now action)
          ===================================================================== */}
      <header className="sticky top-0 z-40 h-14 sm:h-16 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-colors">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element brand wordmark */}
          <a
            href="#top"
            className="text-lg sm:text-xl font-extrabold tracking-tight text-[#0B3C6F] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#FF7A00] rounded-sm"
          >
            {config.business.name}
          </a>

          {/* Zone 2: 4 concise single-line navigation links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-7 text-sm font-semibold text-slate-700"
          >
            <a
              href="#services"
              className="hover:text-[#0B3C6F] underline-offset-4 hover:underline transition-colors whitespace-nowrap shrink-0"
            >
              Services
            </a>
            <a
              href="#why-us"
              className="hover:text-[#0B3C6F] underline-offset-4 hover:underline transition-colors whitespace-nowrap shrink-0"
            >
              Why Us
            </a>
            <a
              href="#reviews"
              className="hover:text-[#0B3C6F] underline-offset-4 hover:underline transition-colors whitespace-nowrap shrink-0"
            >
              Reviews
            </a>
            <a
              href="#contact"
              className="hover:text-[#0B3C6F] underline-offset-4 hover:underline transition-colors whitespace-nowrap shrink-0"
            >
              Contact
            </a>
          </nav>

          {/* Zone 3: 1 primary action ("Call Now" button only, no phone number) */}
          <div className="flex items-center shrink-0">
            <a
              href={telHref}
              className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg bg-[#FF7A00] hover:bg-[#e66e00] text-white font-bold text-xs sm:text-sm shadow-xs transition-transform active:scale-[0.99] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B3C6F]"
              aria-label="Call Now"
            >
              <Phone className="w-4 h-4 shrink-0" />
              <span>Call Now</span>
            </a>
          </div>
        </div>
      </header>

      <main id="top" className="flex-1">
        {/* ===================================================================
            2. HERO SECTION
            =================================================================== */}
        <section className="relative overflow-hidden bg-[#0B3C6F] text-white">
          {/* Background Plumber at Work Image + Measured Dark Blue Scrim */}
          <div className="absolute inset-0 z-0">
            {!heroImgError && config.hero.backgroundImage ? (
              <img
                src={config.hero.backgroundImage}
                alt={config.hero.backgroundAlt}
                referrerPolicy="no-referrer"
                onError={() => setHeroImgError(true)}
                className="w-full h-full object-cover object-center"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#0B3C6F] via-[#082B50] to-slate-950" />
            )}
            {/* Measured contrast scrim ensuring > 4.5:1 legibility across all viewports */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#062342]/95 via-[#0B3C6F]/88 to-[#0B3C6F]/70" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#062342]/90 via-transparent to-[#062342]/40" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28">
            <div className="max-w-3xl">
              {/* Tagline & Service Area Kicker (Unboxed clean typography) */}
              <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-semibold text-amber-300 tracking-wide">
                <span>{config.business.tagline}</span>
                <span aria-hidden="true" className="text-slate-300">
                  ·
                </span>
                <span className="text-slate-100">
                  Serving {config.business.cityState}
                </span>
              </div>

              {/* Large Display Headline */}
              <h1
                className="mt-4 font-extrabold text-white tracking-tight leading-[1.1] text-balance"
                style={{ fontSize: 'clamp(2.25rem, 4.5vw, 3.75rem)' }}
              >
                {resolvePlaceholders(config.hero.headline, config)}
              </h1>

              {/* Subheading */}
              <p className="mt-5 text-base sm:text-lg lg:text-xl text-slate-100 leading-relaxed max-w-2xl font-normal">
                {resolvePlaceholders(config.hero.subheadingTemplate, config)}
              </p>

              {/* Two Primary Action Buttons ("Call Now" button without phone number inside) */}
              <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4">
                <a
                  href={telHref}
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-[#FF7A00] hover:bg-[#e66e00] text-white font-bold text-base sm:text-lg shadow-lg shadow-slate-950/25 transition-transform active:scale-[0.99] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  aria-label="Call Now"
                >
                  <Phone className="w-5 h-5 shrink-0" />
                  <span>Call Now</span>
                </a>

                <button
                  type="button"
                  onClick={() => scrollToSection('contact', true)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl border-2 border-white/85 hover:border-white bg-white/10 hover:bg-white/20 text-white font-bold text-base sm:text-lg backdrop-blur-xs transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF7A00]"
                >
                  <span>{config.hero.secondaryCtaText}</span>
                  <ArrowRight className="w-5 h-5 shrink-0" />
                </button>
              </div>

              {/* Trust Badges Below (Unboxed clean inline layout with separators) */}
              <div className="mt-10 pt-8 border-t border-white/15 flex flex-wrap items-center gap-y-3 gap-x-6 text-sm font-medium text-slate-100">
                {config.hero.trustBadges.map((badge, index) => (
                  <React.Fragment key={badge}>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#FF7A00] shrink-0" />
                      <span>{badge}</span>
                    </div>
                    {index < config.hero.trustBadges.length - 1 && (
                      <span
                        aria-hidden="true"
                        className="hidden sm:inline text-white/30"
                      >
                        ·
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            3. SERVICES (Grid of 6 Cards with Plumbing Icons)
            =================================================================== */}
        <section
          id="services"
          className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-16"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <p className="text-xs sm:text-sm font-bold text-[#0B3C6F] tracking-wide">
                {config.servicesSection.kicker}
              </p>
              <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
                {resolvePlaceholders(config.servicesSection.heading, config)}
              </h2>
              <p className="mt-3 text-base text-slate-600 leading-relaxed">
                {resolvePlaceholders(config.servicesSection.subheading, config)}
              </p>
            </div>

            <div className="shrink-0">
              <a
                href={telHref}
                className="inline-flex items-center gap-2 text-sm font-bold text-[#0B3C6F] hover:text-[#FF7A00] transition-colors whitespace-nowrap"
              >
                <Phone className="w-4 h-4 text-[#FF7A00] shrink-0" />
                <span>Need urgent help? Call {config.business.phoneDisplay}</span>
              </a>
            </div>
          </div>

          {/* 6-Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {config.servicesSection.items.map((service) => (
              <div
                key={service.id}
                className="group bg-white rounded-xl border border-slate-200/90 p-6 sm:p-7 flex flex-col justify-between transition-transform duration-150 hover:-translate-y-0.5 hover:border-[#0B3C6F]/40"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#0B3C6F]/8 text-[#0B3C6F] group-hover:bg-[#0B3C6F] group-hover:text-white transition-colors flex items-center justify-center shrink-0">
                      {renderPlumbingIcon(service.icon, 'w-6 h-6')}
                    </div>
                    <span className="font-mono-tabular text-xs font-semibold text-slate-400">
                      {service.number}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                    {service.title}
                  </h3>

                  <p className="mt-2.5 text-sm sm:text-base text-slate-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  <span className="text-xs font-medium text-slate-500">
                    {service.responseNote}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleSelectServiceForQuote(service.title)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#0B3C6F] group-hover:text-[#FF7A00] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>Request Quote</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===================================================================
            4. WHY CHOOSE US (4 Benefits with Icons + Stats Row)
            =================================================================== */}
        <section
          id="why-us"
          className="py-16 sm:py-24 bg-white border-y border-slate-200/80 scroll-mt-16"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
              {/* Left 7 Columns: Heading + 4 Benefits Grid */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-bold text-[#0B3C6F] tracking-wide">
                    {config.whyChooseUs.kicker}
                  </p>
                  <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
                    {resolvePlaceholders(config.whyChooseUs.heading, config)}
                  </h2>
                  <p className="mt-3 text-base text-slate-600 leading-relaxed max-w-2xl">
                    {resolvePlaceholders(config.whyChooseUs.subheading, config)}
                  </p>
                </div>

                {/* 4 Benefits Grid */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {config.whyChooseUs.benefits.map((benefit) => (
                    <div
                      key={benefit.id}
                      className="p-5 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between"
                    >
                      <div>
                        <div className="w-10 h-10 rounded-lg bg-[#0B3C6F] text-white flex items-center justify-center mb-4">
                          {renderPlumbingIcon(benefit.icon, 'w-5 h-5')}
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-slate-900">
                          {benefit.title}
                        </h3>
                        <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                          {resolvePlaceholders(benefit.description, config)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right 5 Columns: Technician at Work Visual Showcase */}
              <div className="lg:col-span-5 flex flex-col">
                <div className="relative flex-1 min-h-[320px] rounded-xl overflow-hidden bg-[#0B3C6F] border border-slate-200">
                  {!whyImgError && config.whyChooseUs.featureImage ? (
                    <img
                      src={config.whyChooseUs.featureImage}
                      alt={config.whyChooseUs.featureImageAlt}
                      referrerPolicy="no-referrer"
                      onError={() => setWhyImgError(true)}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center text-white bg-gradient-to-br from-[#0B3C6F] to-slate-900">
                      <ShieldCheck className="w-12 h-12 text-[#FF7A00] mb-3" />
                      <p className="text-base font-bold">
                        {config.business.name} — Licensed &amp; Insured
                      </p>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent flex flex-col justify-end p-6">
                    <p className="text-sm text-white font-medium leading-relaxed">
                      {resolvePlaceholders(
                        config.whyChooseUs.featureCaption,
                        config
                      )}
                    </p>
                    <div className="mt-3 pt-3 border-t border-white/20 flex items-center justify-between text-xs text-slate-200">
                      <span>{config.business.licenseNumber}</span>
                      <a
                        href={telHref}
                        className="font-mono-tabular font-bold text-[#FF7A00] hover:underline"
                      >
                        {config.business.phoneDisplay}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Full-Width Stats Row Below Split ("10+ Years Experience", "5,000+ Jobs Done", "4.9★ Rating") */}
            <div className="mt-12 pt-10 border-t border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-6">
              {config.whyChooseUs.stats.map((stat) => (
                <div
                  key={stat.id}
                  className="p-6 rounded-xl bg-[#0B3C6F] text-white flex flex-col justify-between"
                >
                  <div className="flex items-baseline gap-2.5">
                    <span className="font-mono-tabular text-3xl sm:text-4xl font-extrabold text-[#FF7A00] tracking-tight">
                      {stat.value}
                    </span>
                    <span className="text-lg sm:text-xl font-bold text-white">
                      {stat.label}
                    </span>
                  </div>
                  <p className="mt-2 text-xs sm:text-sm text-slate-200">
                    {resolvePlaceholders(stat.sublabel, config)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================================================================
            5. HOW IT WORKS (3 Simple Steps)
            =================================================================== */}
        <section
          id="how-it-works"
          className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-16"
        >
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <p className="text-xs sm:text-sm font-bold text-[#0B3C6F] tracking-wide">
              {config.howItWorks.kicker}
            </p>
            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
              {config.howItWorks.heading}
            </h2>
            <p className="mt-3 text-base text-slate-600">
              {config.howItWorks.subheading}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {config.howItWorks.steps.map((step) => (
              <div
                key={step.stepNumber}
                className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 flex flex-col justify-between relative"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-[#FF7A00] text-white font-mono-tabular font-extrabold text-base shadow-xs">
                      {step.stepNumber}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">
                      Step {step.stepNumber} of 03
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Direct Action Bar under steps ("Call Now" button without phone number inside) */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={telHref}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#FF7A00] hover:bg-[#e66e00] text-white font-bold text-sm sm:text-base shadow-xs transition-colors whitespace-nowrap shrink-0"
              aria-label={`Call ${config.business.phoneDisplay}`}
            >
              <Phone className="w-4 h-4 shrink-0" />
              <span>Call Now</span>
            </a>
            <button
              type="button"
              onClick={() => scrollToSection('contact', true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-slate-300 hover:border-[#0B3C6F] bg-white text-slate-800 hover:text-[#0B3C6F] font-bold text-sm sm:text-base transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Or Request Your Free Quote Online</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>
          </div>
        </section>

        {/* ===================================================================
            6. CUSTOMER REVIEWS (3 Testimonial Cards with Star Ratings)
            =================================================================== */}
        <section
          id="reviews"
          className="py-16 sm:py-24 bg-white border-y border-slate-200/80 scroll-mt-16"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div className="max-w-2xl">
                <p className="text-xs sm:text-sm font-bold text-[#0B3C6F] tracking-wide">
                  {config.reviewsSection.kicker}
                </p>
                <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
                  {resolvePlaceholders(config.reviewsSection.heading, config)}
                </h2>
                <p className="mt-3 text-base text-slate-600">
                  {resolvePlaceholders(config.reviewsSection.subheading, config)}
                </p>
              </div>

              {/* Overall Rating Summary */}
              <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl shrink-0">
                <div className="flex items-center text-[#FF7A00]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <div className="text-xs text-slate-700">
                  <span className="font-mono-tabular font-bold text-slate-900">
                    4.9 / 5.0
                  </span>
                  <span aria-hidden="true" className="mx-1.5">
                    ·
                  </span>
                  <span>Based on 640+ Local Reviews</span>
                </div>
              </div>
            </div>

            {/* 3 Testimonial Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {config.reviewsSection.items.map((review) => (
                <article
                  key={review.id}
                  className="bg-slate-50 rounded-xl border border-slate-200/90 p-6 sm:p-7 flex flex-col justify-between"
                >
                  <div>
                    {/* Star Row + Time Ago */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div
                        className="flex items-center gap-1 text-[#FF7A00]"
                        aria-label={`${review.rating} out of 5 stars`}
                      >
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                      <span className="text-xs text-slate-500">
                        {review.timeAgo}
                      </span>
                    </div>

                    {/* Concrete Service Outcome Kicker */}
                    <p className="text-xs font-semibold text-[#0B3C6F] mb-2">
                      {review.servicePerformed}
                    </p>

                    {/* Review Body */}
                    <blockquote className="text-sm sm:text-base text-slate-700 leading-relaxed">
                      &ldquo;{review.reviewText}&rdquo;
                    </blockquote>
                  </div>

                  {/* Customer Attribution */}
                  <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900 text-sm">
                      {review.customerName}
                    </span>
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <span>
                        {resolvePlaceholders(review.neighborhood, config)}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="text-emerald-700 font-medium">
                        Verified Customer
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ===================================================================
            7. SERVICE AREAS (Neighborhood Selectors + Interactive Map)
            =================================================================== */}
        <section
          id="service-areas"
          className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-16"
        >
          <div className="max-w-2xl mb-10">
            <p className="text-xs sm:text-sm font-bold text-[#0B3C6F] tracking-wide">
              {config.serviceAreasSection.kicker}
            </p>
            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
              {resolvePlaceholders(config.serviceAreasSection.heading, config)}
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              {resolvePlaceholders(
                config.serviceAreasSection.subheading,
                config
              )}
            </p>
          </div>

          <ServiceAreaMap
            config={config}
            onSelectAreaForQuote={handleSelectAreaForQuote}
          />
        </section>

        {/* ===================================================================
            8. CONTACT / QUOTE FORM
            =================================================================== */}
        <section
          id="contact"
          className="py-16 sm:py-24 bg-white border-t border-slate-200 scroll-mt-16"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              {/* Left 7 Columns: Quote Request Form */}
              <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 lg:p-10">
                <div className="mb-6">
                  <p className="text-xs sm:text-sm font-bold text-[#0B3C6F] tracking-wide">
                    Fast, No-Obligation Estimate
                  </p>
                  <h2 className="mt-1.5 text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    Request Your Free Plumbing Quote
                  </h2>
                  <p className="mt-2 text-sm sm:text-base text-slate-600">
                    Fill out the form below and our local dispatcher in{' '}
                    {config.business.cityState} will call you back within 15
                    minutes.
                  </p>
                </div>

                {submittedQuote ? (
                  <div
                    role="status"
                    aria-live="polite"
                    className="bg-white border border-emerald-300 rounded-xl p-6 sm:p-8 space-y-5"
                  >
                    <div className="flex items-start gap-3.5">
                      <CheckCircle2 className="w-7 h-7 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                          <span>Quote Request Received</span>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono-tabular font-semibold text-slate-800">
                            Ref #{submittedQuote.referenceId}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mt-1">
                          Thank you, {submittedQuote.name}!
                        </h3>
                        <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">
                          We have assigned your{' '}
                          <strong className="text-slate-900">
                            {submittedQuote.service}
                          </strong>{' '}
                          request ({submittedQuote.urgencyLabel}) to our on-call
                          coordinator. We will call you at{' '}
                          <strong className="font-mono-tabular text-slate-900">
                            {submittedQuote.phone}
                          </strong>{' '}
                          shortly.
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                      <a
                        href={telHref}
                        className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#FF7A00] hover:bg-[#e66e00] text-white font-bold text-sm transition-colors whitespace-nowrap"
                        aria-label={`Call ${config.business.phoneDisplay}`}
                      >
                        <Phone className="w-4 h-4 shrink-0" />
                        <span>Call Now</span>
                      </a>
                      <button
                        type="button"
                        onClick={() => {
                          setSubmittedQuote(null);
                          setFullName('');
                          setPhoneInput('');
                          setMessage('');
                        }}
                        className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
                      >
                        Submit Another Request
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleQuoteSubmit} className="space-y-5" noValidate>
                    {formError && (
                      <div
                        role="alert"
                        className="p-3.5 rounded-lg bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm font-medium flex items-center gap-2.5"
                      >
                        <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                        <span>{formError}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="quote-name"
                          className="block text-xs sm:text-sm font-semibold text-slate-800 mb-1.5"
                        >
                          Your Name <span className="text-red-600">*</span>
                        </label>
                        <input
                          ref={nameInputRef}
                          id="quote-name"
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Michael Carter"
                          className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm sm:text-base focus:outline-2 focus:outline-[#0B3C6F]"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="quote-phone"
                          className="block text-xs sm:text-sm font-semibold text-slate-800 mb-1.5"
                        >
                          Phone Number <span className="text-red-600">*</span>
                        </label>
                        <input
                          id="quote-phone"
                          type="tel"
                          required
                          value={phoneInput}
                          onChange={(e) => setPhoneInput(e.target.value)}
                          placeholder="(555) 234-5678"
                          className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 font-mono-tabular text-sm sm:text-base focus:outline-2 focus:outline-[#0B3C6F]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="quote-service"
                          className="block text-xs sm:text-sm font-semibold text-slate-800 mb-1.5"
                        >
                          Service Needed
                        </label>
                        <select
                          id="quote-service"
                          value={selectedService}
                          onChange={(e) => setSelectedService(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm sm:text-base focus:outline-2 focus:outline-[#0B3C6F]"
                        >
                          {config.servicesSection.items.map((s) => (
                            <option key={s.id} value={s.title}>
                              {s.title}
                            </option>
                          ))}
                          <option value="Commercial Plumbing Inquiry">
                            Commercial Plumbing Inquiry
                          </option>
                          <option value="Other / General Inspection">
                            Other / General Inspection
                          </option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs sm:text-sm font-semibold text-slate-800 mb-1.5">
                          How Soon Do You Need Us?
                        </label>
                        <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-200/75 rounded-xl">
                          {(
                            [
                              { id: 'emergency', label: 'Emergency' },
                              { id: 'today', label: 'Today' },
                              { id: 'scheduled', label: 'This Week' },
                            ] as const
                          ).map((opt) => (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => setUrgency(opt.id)}
                              className={`py-2 px-2 rounded-lg text-xs font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                                urgency === opt.id
                                  ? 'bg-[#0B3C6F] text-white shadow-xs'
                                  : 'text-slate-700 hover:text-slate-950'
                              }`}
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="quote-message"
                        className="block text-xs sm:text-sm font-semibold text-slate-800 mb-1.5"
                      >
                        Describe the Issue or Location Details
                      </label>
                      <textarea
                        id="quote-message"
                        rows={3}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tell us briefly what is leaking, clogged, or needs installation..."
                        className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm sm:text-base focus:outline-2 focus:outline-[#0B3C6F]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 px-6 rounded-xl bg-[#FF7A00] hover:bg-[#e66e00] text-white font-extrabold text-base sm:text-lg shadow-md transition-transform active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>Request Free Quote</span>
                      <ArrowRight className="w-5 h-5 shrink-0" />
                    </button>

                    <p className="text-xs text-slate-500 text-center">
                      100% Free Estimate · No Obligation · Your information is
                      never shared
                    </p>
                  </form>
                )}
              </div>

              {/* Right 5 Columns: Direct Contact Information, Hours & Address */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-[#0B3C6F] text-white rounded-2xl p-6 sm:p-8 space-y-6">
                  <div>
                    <p className="text-xs font-semibold text-amber-300 tracking-wide">
                      Speak Directly With a Plumber
                    </p>
                    <h3 className="mt-1 text-xl sm:text-2xl font-extrabold">
                      24/7 Direct Dispatch Line
                    </h3>
                    <p className="mt-2 text-sm text-slate-200 leading-relaxed">
                      Skip the wait—tap below to call our live local dispatch
                      desk in {config.business.cityState}.
                    </p>
                  </div>

                  {/* Direct tap to call block - Displays the phone number here so visitors who want the number have it clearly */}
                  <a
                    href={telHref}
                    className="flex items-center justify-between gap-4 p-4 rounded-xl bg-[#FF7A00] hover:bg-[#e66e00] text-white transition-colors shadow-sm"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-11 h-11 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
                        <Phone className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-xs font-medium text-white/90 block">
                          Tap to Call (24/7 Dispatch)
                        </span>
                        <span className="font-mono-tabular text-xl sm:text-2xl font-extrabold tracking-tight">
                          {config.business.phoneDisplay}
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 shrink-0" />
                  </a>

                  <div className="pt-4 border-t border-white/15 space-y-4 text-sm">
                    <div className="flex items-start gap-3.5">
                      <Mail className="w-5 h-5 text-[#FF7A00] shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-slate-300">Email Estimates</p>
                        <a
                          href={`mailto:${config.business.email}`}
                          className="font-semibold text-white hover:text-amber-300 transition-colors break-all"
                        >
                          {config.business.email}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5">
                      <CalendarClock className="w-5 h-5 text-[#FF7A00] shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-slate-300">Business Hours</p>
                        <p className="font-semibold text-white">
                          {config.business.hoursRegular}
                        </p>
                        <p className="text-xs text-amber-300 mt-0.5">
                          {config.business.hoursEmergency}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5">
                      <MapPin className="w-5 h-5 text-[#FF7A00] shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-slate-300">
                          Local Dispatch Office
                        </p>
                        <p className="font-semibold text-white">
                          {resolvePlaceholders(config.business.address, config)}
                        </p>
                        <p className="text-xs text-slate-300 mt-0.5 font-mono-tabular">
                          {config.business.licenseNumber}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            9. FINAL CALL-TO-ACTION BANNER ("Call Now" button without phone number inside)
            =================================================================== */}
        <section className="bg-[#0B3C6F] border-t border-white/10 py-14 sm:py-20 px-4 sm:px-6 lg:px-8 text-white">
          <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
            <div className="max-w-2xl">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-balance">
                {resolvePlaceholders(config.finalCta.heading, config)}
              </h2>
              <p className="mt-3 text-base sm:text-lg text-slate-200">
                {resolvePlaceholders(config.finalCta.subheading, config)}
              </p>
            </div>

            <div className="shrink-0 w-full sm:w-auto">
              <a
                href={telHref}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-9 py-4 sm:py-5 rounded-xl bg-[#FF7A00] hover:bg-[#e66e00] text-white font-extrabold text-lg sm:text-xl shadow-lg transition-transform active:scale-[0.99] whitespace-nowrap"
                aria-label={`Call ${config.business.phoneDisplay}`}
              >
                <Phone className="w-6 h-6 shrink-0" />
                <span>Call Now</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* =====================================================================
          10. FOOTER
          ===================================================================== */}
      <footer className="bg-slate-950 text-slate-300 py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-10 border-b border-slate-800">
          {/* Col 1: Brand, Tagline & License */}
          <div className="lg:col-span-4 space-y-3">
            <a
              href="#top"
              className="text-xl font-extrabold text-white tracking-tight inline-block"
            >
              {config.business.name}
            </a>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              {config.business.tagline}. Proudly serving homeowners and
              businesses across {config.business.cityState} with upfront flat-rate
              pricing.
            </p>
            <p className="text-xs font-mono-tabular text-slate-400 pt-1">
              {config.business.licenseNumber}
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-3 space-y-2.5">
            <h3 className="text-xs font-bold text-white tracking-wider uppercase">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#services"
                  className="hover:text-white transition-colors"
                >
                  Plumbing Services
                </a>
              </li>
              <li>
                <a
                  href="#why-us"
                  className="hover:text-white transition-colors"
                >
                  Why Choose Us
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  className="hover:text-white transition-colors"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a
                  href="#reviews"
                  className="hover:text-white transition-colors"
                >
                  Customer Reviews
                </a>
              </li>
              <li>
                <a
                  href="#service-areas"
                  className="hover:text-white transition-colors"
                >
                  Service Areas ({config.business.cityState})
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-white transition-colors"
                >
                  Request a Free Quote
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Contact & Service Area */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="text-xs font-bold text-white tracking-wider uppercase">
              Contact &amp; Dispatch
            </h3>
            <div className="space-y-2 text-sm">
              <p>
                <span className="text-slate-400">24/7 Phone: </span>
                <a
                  href={telHref}
                  className="font-mono-tabular font-bold text-[#FF7A00] hover:underline"
                >
                  {config.business.phoneDisplay}
                </a>
              </p>
              <p>
                <span className="text-slate-400">Email: </span>
                <a
                  href={`mailto:${config.business.email}`}
                  className="text-white hover:underline"
                >
                  {config.business.email}
                </a>
              </p>
              <p>
                <span className="text-slate-400">Service Area: </span>
                <span className="text-white">{config.business.cityState}</span>
              </p>
              <p>
                <span className="text-slate-400">Address: </span>
                <span className="text-slate-300">
                  {resolvePlaceholders(config.business.address, config)}
                </span>
              </p>
            </div>

            {/* Client CMS Trigger Button */}
            <div className="pt-3">
              <button
                type="button"
                onClick={() => setIsCmsOpen(true)}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-slate-200 border border-slate-700 transition-colors cursor-pointer"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#FF7A00]" />
                <span>Customize Site Content (CMS)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Row */}
        <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            &copy; {new Date().getFullYear()} {config.business.name}. All rights
            reserved.
          </p>
          <div className="flex items-center gap-3">
            <span>Licensed &amp; Insured in {config.business.cityState}</span>
            <span aria-hidden="true">·</span>
            <a href={telHref} className="font-mono-tabular hover:text-white">
              {config.business.phoneDisplay}
            </a>
          </div>
        </div>
      </footer>

      {/* =====================================================================
          MOBILE STICKY BOTTOM TAP-TO-CALL BAR ("Call Now" button without phone number inside)
          ===================================================================== */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden h-14 bg-[#0B3C6F] border-t border-white/15 px-3 flex items-center justify-between gap-2.5 shadow-lg">
        <a
          href={telHref}
          className="flex-1 h-10 rounded-lg bg-[#FF7A00] active:bg-[#e66e00] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-xs whitespace-nowrap"
          aria-label="Call Now"
        >
          <Phone className="w-4 h-4 shrink-0" />
          <span>Call Now</span>
        </a>
        <button
          type="button"
          onClick={() => scrollToSection('contact', true)}
          className="h-10 px-3.5 rounded-lg bg-white/10 active:bg-white/20 text-white font-semibold text-xs border border-white/25 whitespace-nowrap shrink-0 cursor-pointer"
        >
          Free Quote
        </button>
      </div>

      {/* =====================================================================
          CENTRALIZED CONTENT EDITOR DRAWER (CMS)
          ===================================================================== */}
      <CmsDrawer
        isOpen={isCmsOpen}
        onClose={() => setIsCmsOpen(false)}
        config={config}
        onUpdateConfig={setConfig}
        onResetConfig={handleResetConfig}
      />
    </div>
  );
}
