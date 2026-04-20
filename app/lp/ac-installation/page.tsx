import type { Metadata } from 'next';
import { siteConfig } from '@/lib/site-config';
import { LandingForm } from '@/components/landing/LandingForm';
import { FAQAccordion } from '@/components/sections/FAQAccordion';
import { vikingImages } from '@/lib/viking-images';

export const metadata: Metadata = {
  title: 'AC Installation in Phoenix, AZ | Free Quote | Viking HVAC',
  description:
    'New AC installation across Chandler, Gilbert, Mesa, Phoenix and 25+ East Valley cities. Champion Authorized Dealer and Mitsubishi Diamond Contractor. Family-owned. Free in-home consultation.',
  robots: { index: false, follow: false },
};

const trustStats = [
  { value: '350+', label: '5-Star Reviews' },
  { value: 'Champion', label: 'Authorized Dealer' },
  { value: 'Mitsubishi', label: 'Diamond Contractor' },
  { value: 'Financing', label: 'Available' },
];

const certifications = [
  { name: 'Champion', label: 'Authorized Dealer' },
  { name: 'Mitsubishi', label: 'Authorized Dealer' },
  { name: 'Mitsubishi', label: 'Diamond Contractor' },
];

const installBenefits = [
  {
    title: 'High-Efficiency Systems',
    description:
      'Modern AC units use up to 30-50% less energy than systems from 10+ years ago. Lower bills from day one in 110°+ Arizona heat.',
  },
  {
    title: 'Sized for Your Home',
    description:
      'Proper load calculation, not guesswork. We size every system for your square footage, insulation, sun exposure, and Arizona\'s extreme cooling demands.',
  },
  {
    title: 'Top Brands We Trust',
    description:
      'Champion Authorized Dealer, Mitsubishi Diamond Contractor. Carrier, Lennox, Goodman also available. We recommend the right system for your budget and home — not the one with the biggest commission.',
  },
  {
    title: 'Flexible Financing',
    description:
      'Affordable monthly payments make upgrading easy. We\'ll walk you through current financing options during your free consultation.',
  },
  {
    title: 'Same-Week Install',
    description:
      'Most residential installations completed in 1 day. We pull permits, install the system, test everything, and walk you through operation.',
  },
  {
    title: 'Manufacturer + Workmanship Warranty',
    description:
      'Every install is backed by manufacturer warranty PLUS our own workmanship guarantee. Your investment is protected.',
  },
];

const reasonsToInstall = [
  'Your home has no central AC (or only window units)',
  'Your AC is 12+ years old and struggling in summer',
  'Repair costs exceed 50% of a new system',
  'Your system uses R-22 (Freon) refrigerant',
  'Energy bills keep rising despite maintenance',
  'Uneven cooling across your home',
  'AC runs constantly but can\'t keep up with the heat',
  'You\'re building or renovating and adding HVAC',
];

const installTypes = [
  {
    title: 'Central Air Replacement',
    description:
      'Replacing an aging system with a new high-efficiency unit. We handle full removal, properly sized new equipment, refrigerant lines, electrical, and thermostat. Most replacements done in one day.',
  },
  {
    title: 'New Construction & First-Time Install',
    description:
      'Adding central AC to a home that has never had it, or a new build. Includes load calculation, ductwork design, equipment selection, and full system commissioning.',
  },
  {
    title: 'Ductless Mini-Split Systems',
    description:
      'Perfect for room additions, garages, casitas, or homes without ductwork. Mitsubishi-certified installs with multi-zone controls — cool individual rooms instead of the whole house.',
  },
  {
    title: 'Heat Pump Systems',
    description:
      'One system that cools AND heats. Highly efficient in mild AZ winters and powerful enough for 115°F summers. Often the smartest long-term choice for Phoenix homes.',
  },
];

const processSteps = [
  {
    step: '1',
    title: 'Request Your Free Quote',
    description:
      'Fill out the form or call. Tell us about your home (size, current system, any pain points).',
  },
  {
    step: '2',
    title: 'Free In-Home Consultation',
    description:
      'A specialist evaluates your home, ductwork, and cooling needs. You get a custom recommendation with transparent pricing and financing options.',
  },
  {
    step: '3',
    title: 'Professional Installation',
    description:
      'Our crew installs your new system, often in one day. We test everything, pull permits, and walk you through your new equipment.',
  },
];

const reviews = [
  {
    name: 'Patricia & Tom S., Gilbert',
    text: 'Our 18-year-old system finally died. Viking gave us 3 options at different price points and no pressure. We picked the mid-tier Champion system and they had it installed the next day. Bills dropped immediately.',
  },
  {
    name: 'Marcus J., Mesa',
    text: 'New build needed AC and Viking handled the whole install — load calc, ductwork, the works. Very professional, on time, and the system is whisper quiet.',
  },
  {
    name: 'Linda K., Chandler',
    text: 'Mitsubishi mini-split for our casita. Viking was the only company that took the time to actually walk the property and design the right multi-zone setup. Totally worth it.',
  },
];

const faqs = [
  {
    question: 'How much does new AC installation cost in Phoenix?',
    answer:
      'AC installation costs vary based on home size, system type, brand, and installation complexity. Standard residential central AC systems typically range from several thousand to over $10,000 installed. Ductless mini-splits and high-efficiency variable-speed systems can be more. We give you exact pricing with no hidden fees during your free consultation.',
  },
  {
    question: 'How long does installation take?',
    answer:
      'Most standard central AC replacements are completed in one day. New construction installs or projects requiring new ductwork may take 1-3 days. We give you a clear timeline at the consultation.',
  },
  {
    question: 'What\'s the best AC brand for Arizona?',
    answer:
      'It depends on your priorities — efficiency, budget, longevity, or warranty. As a Champion Authorized Dealer and Mitsubishi Diamond Contractor, we install Champion and Mitsubishi as our primary lines, plus Carrier, Lennox, Goodman, and Rheem. For Arizona heat we generally recommend higher SEER2 units (16+) with variable-speed compressors. We\'ll match the right brand to your home and budget.',
  },
  {
    question: 'Do you offer financing?',
    answer:
      'Yes — flexible financing options that make new-system investment manageable. We discuss all available plans during your free consultation so you can pick what works for your budget.',
  },
  {
    question: 'Will a new AC really lower my bills?',
    answer:
      'Yes. Modern high-efficiency systems (16+ SEER2) use 30-50% less energy than units from 10-15 years ago. In Arizona where summer cooling can hit $500+/month, the savings are significant — often hundreds per year.',
  },
  {
    question: 'Do you handle permits?',
    answer:
      'Yes. We pull all required permits with your local jurisdiction. Proper permitting protects your warranty and avoids issues if you sell your home later. Included at no extra cost.',
  },
  {
    question: 'What about my old system?',
    answer:
      'We handle everything — disconnection, refrigerant recovery per EPA regulations, removal, and responsible disposal. You don\'t lift a finger.',
  },
  {
    question: 'Are you licensed and insured?',
    answer:
      'Arizona ROC #316534, fully insured, family-owned since 2016. All techs background-checked and trained on the latest HVAC systems.',
  },
];

export default function ACInstallationLP() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section id="top-form" className="relative bg-[#001530] text-white overflow-hidden scroll-mt-20">
        <img
          src={vikingImages.acUnit}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#001530] via-[#001530]/95 to-[#002147]/75" />

        <div className="relative max-w-6xl mx-auto px-6 pt-16 pb-12 md:pt-24 md:pb-20">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#eb1c23] rounded-full px-4 py-1.5 mb-6">
                <span className="text-sm font-bold text-white uppercase tracking-wide">
                  AC Installation Specialists
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold leading-[1.1] mb-6">
                New AC for Your Phoenix Home.{' '}
                <span className="text-[#eb1c23]">Free Quote Today.</span>
              </h1>

              <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8 max-w-lg">
                Whether you&apos;re replacing an aging system or installing AC for the first time, we install Champion, Mitsubishi, Carrier, and Lennox systems sized for Arizona&apos;s extreme heat. Free in-home consultation. Financing available.
              </p>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
                <a
                  href={`tel:${siteConfig.phoneRaw}`}
                  className="inline-flex items-center gap-2 bg-[#eb1c23] hover:bg-[#c41018] transition-colors rounded-xl px-6 py-3.5 text-white font-bold text-lg"
                >
                  Call {siteConfig.phone}
                </a>
                <span className="text-gray-300 text-sm">
                  Or fill out the form for a callback
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-8">
                {certifications.map((c, i) => (
                  <span
                    key={`${c.name}-${c.label}-${i}`}
                    className="inline-flex items-center gap-1.5 bg-white/10 border border-white/15 rounded-full px-3 py-1 text-xs text-white/90"
                  >
                    <span className="font-bold text-white">{c.name}</span>
                    <span className="text-white/70">{c.label}</span>
                  </span>
                ))}
              </div>

              <div className="hidden md:grid grid-cols-4 gap-4 pt-6 border-t border-white/10">
                {trustStats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="font-extrabold text-white text-xl leading-tight">
                      {stat.value}
                    </p>
                    <p className="text-gray-400 text-xs mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:mt-0">
              <LandingForm
                serviceLabel="AC Installation"
                messagePlaceholder="Tell us about your home (e.g., square footage, current system age, or 'no AC currently')"
                leadSource="lp-ac-installation"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============ MOBILE TRUST BAR ============ */}
      <section className="md:hidden bg-[#eb1c23] py-4">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 gap-3 text-white">
            {trustStats.map((stat) => (
              <div
                key={stat.label}
                className="flex items-center gap-3 bg-white rounded-lg px-3 py-2.5"
              >
                <div>
                  <p className="font-extrabold text-[#002147] text-sm leading-tight">
                    {stat.value}
                  </p>
                  <p className="text-gray-600 text-xs">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ REASONS TO INSTALL ============ */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#eb1c23] font-bold text-sm uppercase tracking-widest mb-3">
                Is It Time?
              </p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#002147] mb-6">
                Common Reasons Phoenix Homeowners Install a New AC
              </h2>
              <p className="text-gray-700 leading-relaxed mb-8">
                Whether you&apos;re replacing a struggling system or adding AC for the first time, these are the signs it&apos;s time.
              </p>
              <ul className="space-y-3">
                {reasonsToInstall.map((reason) => (
                  <li key={reason} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#eb1c23] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-800">{reason}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <a
                  href="#top-form"
                  className="inline-flex items-center gap-2 bg-[#eb1c23] hover:bg-[#c41018] text-white font-bold py-3.5 px-7 rounded-lg transition-colors"
                >
                  Get a Free Quote →
                </a>
              </div>
            </div>

            <div className="bg-[#002147] text-white rounded-2xl overflow-hidden">
              <img
                src={vikingImages.techService}
                alt="Viking HVAC installation technician"
                className="w-full h-52 md:h-56 object-cover"
              />
              <div className="p-8 md:p-10">
                <h3 className="text-2xl font-extrabold mb-3">Save Up To $1,500/Year</h3>
                <p className="text-white/80 mb-6 leading-relaxed">
                  Modern high-efficiency AC systems use 30-50% less energy than 10+ year-old units. In Arizona where summer cooling hits $500+/month, that&apos;s real money back in your pocket.
                </p>
                <div className="space-y-4 mb-8">
                  {[
                    { stat: '30-50%', label: 'energy reduction vs. older systems' },
                    { stat: '12-15yr', label: 'typical AC system lifespan (18+ with maintenance)' },
                    { stat: '1 day', label: 'most installations completed in one day' },
                  ].map((item) => (
                    <div key={item.label} className="border-b border-white/10 pb-3 last:border-b-0">
                      <p className="text-3xl font-extrabold text-[#eb1c23]">{item.stat}</p>
                      <p className="text-white/80 text-sm mt-1">{item.label}</p>
                    </div>
                  ))}
                </div>
                <a
                  href={`tel:${siteConfig.phoneRaw}`}
                  className="block w-full bg-[#eb1c23] hover:bg-[#c41018] text-white font-bold py-4 rounded-lg text-center text-lg transition-colors"
                >
                  Call {siteConfig.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ INSTALL TYPES ============ */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-[#eb1c23] font-bold text-sm uppercase tracking-widest mb-3">
              Installation Options
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#002147] max-w-2xl mx-auto">
              AC Solutions for Every Home
            </h2>
            <p className="text-gray-700 mt-4 max-w-2xl mx-auto">
              Whether you&apos;re in a Chandler ranch, Gilbert two-story, or Mesa custom home, we tailor every installation to your property.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {installTypes.map((type) => (
              <div
                key={type.title}
                className="bg-white rounded-xl p-6 border-l-4 border-l-[#eb1c23] shadow-sm"
              >
                <h3 className="font-bold text-[#002147] text-lg mb-3">
                  {type.title}
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {type.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ BENEFITS GRID ============ */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-[#eb1c23] font-bold text-sm uppercase tracking-widest mb-3">
              Why Choose Viking
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#002147] max-w-2xl mx-auto">
              Smart Installation. Honest Pricing. Built to Last.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {installBenefits.map((benefit) => (
              <div
                key={benefit.title}
                className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:shadow-lg hover:border-[#eb1c23]/30 transition-all"
              >
                <div className="w-12 h-12 rounded-lg bg-red-50 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-[#eb1c23]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-bold text-[#002147] text-lg mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TEAM IMAGE BAND ============ */}
      <section className="relative h-64 md:h-80 overflow-hidden">
        <img
          src={vikingImages.teamCulture}
          alt="The Viking HVAC team culture"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#002147]/80 via-[#002147]/40 to-transparent" />
        <div className="relative max-w-6xl mx-auto h-full flex items-center px-6">
          <div className="max-w-md">
            <p className="text-[#4CC9F0] font-bold text-sm uppercase tracking-widest mb-2">
              Our Team, Your Install
            </p>
            <h3 className="text-white text-2xl md:text-3xl font-extrabold leading-tight">
              Trained, certified, and proud of the work.
            </h3>
          </div>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-[#eb1c23] font-bold text-sm uppercase tracking-widest mb-3">
              Simple 3-Step Process
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#002147]">
              How to Get Your New AC System
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {processSteps.map((step) => (
              <div key={step.step} className="text-center">
                <div className="w-14 h-14 rounded-full bg-[#eb1c23] text-white font-extrabold text-xl flex items-center justify-center mx-auto mb-5">
                  {step.step}
                </div>
                <h3 className="font-bold text-[#002147] text-lg mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="#top-form"
              className="inline-block bg-[#eb1c23] hover:bg-[#c41018] text-white font-bold py-4 px-10 rounded-lg text-lg transition-colors"
            >
              Get My Free Quote Now
            </a>
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-[#eb1c23] font-bold text-sm uppercase tracking-widest mb-3">
              350+ 5-Star Reviews
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#002147]">
              Phoenix Homeowners Love Their New AC
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <div
                key={review.name}
                className="bg-gray-50 rounded-xl p-6 border border-gray-100"
              >
                <div className="flex items-center gap-0.5 mb-3">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">★</span>
                  ))}
                </div>
                <p className="text-gray-800 text-sm leading-relaxed mb-4">
                  &ldquo;{review.text}&rdquo;
                </p>
                <p className="font-bold text-sm text-[#002147]">
                  {review.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ BRANDS ============ */}
      <section className="py-10 bg-gray-50 border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-center text-gray-500 font-bold text-sm uppercase tracking-widest mb-6">
            Premium Brands We Install
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
            {['Champion', 'Mitsubishi', 'Carrier', 'Lennox', 'Goodman', 'Rheem'].map((brand) => (
              <span
                key={brand}
                className="font-bold text-gray-600 text-lg md:text-xl"
              >
                {brand}
              </span>
            ))}
          </div>
          <p className="text-center text-gray-500 text-xs mt-5">
            Champion Authorized Dealer • Mitsubishi Authorized Dealer • Mitsubishi Diamond Contractor
          </p>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <FAQAccordion faqs={faqs} title="AC Installation FAQs" />

      {/* ============ FINAL CTA ============ */}
      <section className="bg-[#eb1c23] text-white">
        <div className="max-w-4xl mx-auto px-6 py-16 md:py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            Ready for a New, Efficient AC?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Get a free, no-obligation in-home quote from a Viking specialist. Financing available. Same-week installation.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#top-form"
              className="inline-block bg-white text-[#eb1c23] font-extrabold py-4 px-8 rounded-lg text-lg hover:bg-gray-50 transition-colors"
            >
              Get My Free Quote
            </a>
            <a
              href={`tel:${siteConfig.phoneRaw}`}
              className="inline-flex items-center gap-2 border-2 border-white text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-white hover:text-[#eb1c23] transition-colors"
            >
              Call {siteConfig.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
