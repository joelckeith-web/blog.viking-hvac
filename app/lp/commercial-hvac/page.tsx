import type { Metadata } from 'next';
import { siteConfig } from '@/lib/site-config';
import { LandingForm } from '@/components/landing/LandingForm';
import { FAQAccordion } from '@/components/sections/FAQAccordion';
import { vikingImages } from '@/lib/viking-images';

const certifications = [
  { name: 'Champion', label: 'Authorized Dealer' },
  { name: 'Mitsubishi', label: 'Authorized Dealer' },
  { name: 'Mitsubishi', label: 'Diamond Contractor' },
];

export const metadata: Metadata = {
  title: 'Commercial HVAC in Phoenix, AZ | Service & Install | Viking HVAC',
  description:
    'Commercial HVAC service, repair, retrofits, and installation across the Greater Phoenix area. Restaurants, retail, healthcare, manufacturing. Family-owned. Free assessment.',
  robots: { index: false, follow: false },
};

const trustStats = [
  { value: 'Restaurants', label: 'Retail • Healthcare' },
  { value: '24/7', label: 'Emergency Service' },
  { value: 'Service', label: 'Contracts Available' },
  { value: '29+', label: 'Cities Served' },
];

const commercialBenefits = [
  {
    title: 'Minimal Downtime',
    description:
      'Your business can\'t close because the HVAC failed. We schedule around your hours, work fast, and prioritize getting you back to operating temperature quickly.',
  },
  {
    title: 'Industry-Specific Expertise',
    description:
      'Restaurants need precise kitchen ventilation. Healthcare needs HEPA filtration. Manufacturing needs zoned cooling. We understand the requirements for your industry.',
  },
  {
    title: 'Preventative Service Contracts',
    description:
      'Quarterly maintenance plans that catch issues before they shut you down. Predictable budget. Documented compliance. Lower long-term cost.',
  },
  {
    title: 'Energy Efficiency Audits',
    description:
      'Commercial HVAC can be 40-60% of your energy bill. We identify retrofit opportunities — variable-speed drives, economizers, smart controls — that pay back fast.',
  },
  {
    title: 'Compliance & Documentation',
    description:
      'Permits, refrigerant tracking, mechanical inspections — handled. Full documentation for your records, insurance, and any regulatory requirements.',
  },
  {
    title: '24/7 Emergency Response',
    description:
      'Heat, plumbing, refrigeration — when commercial HVAC fails, every hour costs you money. Emergency service available 24/7.',
  },
];

const industriesServed = [
  {
    title: 'Restaurants & Hospitality',
    description:
      'Kitchen ventilation, walk-in refrigeration, dining-room comfort. We understand health-code airflow requirements and the punishing demands of commercial kitchens in 115°F summers.',
  },
  {
    title: 'Retail & Office',
    description:
      'Customer comfort drives sales. We design and maintain HVAC systems that keep your storefront, showroom, or office at the right temperature without runaway energy bills.',
  },
  {
    title: 'Healthcare & Medical',
    description:
      'Precise temperature, humidity, and air quality requirements. We service medical clinics, dental offices, and outpatient facilities with HEPA filtration and pressure-controlled rooms.',
  },
  {
    title: 'Manufacturing & Warehouse',
    description:
      'Spot cooling, zoned systems, large-scale rooftop units. We handle the heavy commercial equipment that keeps Phoenix manufacturing and distribution centers running.',
  },
];

const services = [
  'New rooftop unit (RTU) installation',
  'Commercial AC repair & emergency service',
  'Preventative maintenance contracts',
  'Walk-in cooler & freezer service',
  'Ductwork retrofits & upgrades',
  'Energy efficiency assessments',
  'Smart controls & BMS integration',
  'Indoor air quality solutions',
  'Refrigerant compliance & tracking',
];

const processSteps = [
  {
    step: '1',
    title: 'Site Assessment',
    description:
      'A specialist visits your facility, reviews your current system, energy usage, and operational needs.',
  },
  {
    step: '2',
    title: 'Custom Proposal',
    description:
      'You get a documented scope, transparent pricing, and a clear timeline. No vague quotes or surprise charges.',
  },
  {
    step: '3',
    title: 'Service or Install',
    description:
      'Our commercial techs work around your business hours when possible. Full documentation provided on completion.',
  },
];

const reviews = [
  {
    name: 'Mark D., Restaurant Owner — Mesa',
    text: 'Our walk-in died on a Friday night. Viking had a tech on-site in 90 minutes and we saved a weekend\'s worth of inventory. Now they handle all our preventative work.',
  },
  {
    name: 'Sandra L., Office Manager — Chandler',
    text: 'Multi-tenant office building. Viking took over our HVAC service contract and dropped our maintenance costs by ~30% while improving response times. Highly recommend.',
  },
  {
    name: 'Dr. Patel — Medical Clinic, Gilbert',
    text: 'Healthcare HVAC is complicated — pressure rooms, filtration, the works. Viking understood our requirements and built a maintenance plan that keeps us compliant. Total professionals.',
  },
];

const faqs = [
  {
    question: 'Do you offer service contracts?',
    answer:
      'Yes — we structure preventative maintenance contracts around your specific industry and equipment. Typical plans include quarterly inspections, filter changes, refrigerant checks, and priority emergency response. Contract clients pay less for repairs and have documented compliance.',
  },
  {
    question: 'How fast can you respond to a commercial emergency?',
    answer:
      'For emergency calls, we typically dispatch a tech within 1-2 hours during business hours and within 2-4 hours overnight or on weekends. Service contract clients get priority dispatch.',
  },
  {
    question: 'Do you handle rooftop unit (RTU) installation?',
    answer:
      'Yes. Full RTU service from spec to install — including crane scheduling, electrical coordination, refrigerant lines, controls integration, and commissioning. We handle units up to 25 tons routinely and larger by project.',
  },
  {
    question: 'What industries do you serve?',
    answer:
      'Restaurants, retail, office, healthcare, manufacturing, warehouse, automotive, education, and small commercial. Our techs are trained on the specific HVAC requirements of each industry.',
  },
  {
    question: 'Can you help reduce our energy costs?',
    answer:
      'Yes. Commercial HVAC is often 40-60% of energy spend. Our energy assessments identify retrofit opportunities — variable-speed drives, economizers, smart thermostats, BMS integration — that typically pay back in 1-3 years.',
  },
  {
    question: 'Do you handle refrigerant compliance?',
    answer:
      'Yes. EPA Section 608 compliance, refrigerant tracking, leak detection, and required documentation. We handle the regulatory side so you don\'t have to.',
  },
  {
    question: 'What areas do you serve commercially?',
    answer:
      'All 29+ cities across the Greater Phoenix area — Chandler, Gilbert, Mesa, Phoenix, Scottsdale, Tempe, Queen Creek, Apache Junction, Avondale, Goodyear, Glendale, Peoria, Surprise and surrounding communities.',
  },
  {
    question: 'Are you licensed and insured for commercial work?',
    answer:
      'Arizona ROC #316534, fully insured, family-owned since 2016. Required commercial bonding and certifications for all the industries we serve.',
  },
];

export default function CommercialHVACLP() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section id="top-form" className="relative bg-[#001530] text-white overflow-hidden scroll-mt-20">
        <img
          src={vikingImages.truckFleet}
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
                  Commercial HVAC Specialists
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold leading-[1.1] mb-6">
                Commercial HVAC That Keeps Your Business{' '}
                <span className="text-[#eb1c23]">Running.</span>
              </h1>

              <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8 max-w-lg">
                Service, repair, retrofits, and installation for Phoenix-area restaurants, retail, healthcare, and manufacturing. Family-owned. Industry-specific expertise. Free on-site assessment.
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
                    <p className="font-extrabold text-white text-base md:text-lg leading-tight">
                      {stat.value}
                    </p>
                    <p className="text-gray-400 text-xs mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:mt-0">
              <LandingForm
                serviceLabel="Commercial HVAC"
                messagePlaceholder="Tell us about your facility (e.g., square footage, industry, current issues, service needs)"
                leadSource="lp-commercial-hvac"
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

      {/* ============ INDUSTRIES SERVED ============ */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-[#eb1c23] font-bold text-sm uppercase tracking-widest mb-3">
              Industries We Serve
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#002147] max-w-2xl mx-auto">
              HVAC Built Around Your Business
            </h2>
            <p className="text-gray-700 mt-4 max-w-2xl mx-auto">
              Different industries have very different HVAC requirements. We bring industry-specific expertise so your system actually fits how you operate.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {industriesServed.map((industry) => (
              <div
                key={industry.title}
                className="bg-gray-50 rounded-xl p-6 border-l-4 border-l-[#eb1c23] shadow-sm"
              >
                <h3 className="font-bold text-[#002147] text-lg mb-3">
                  {industry.title}
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {industry.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SERVICES + STATS BLOCK ============ */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#eb1c23] font-bold text-sm uppercase tracking-widest mb-3">
                Full Commercial Services
              </p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#002147] mb-6">
                Everything Your Facility Needs
              </h2>
              <p className="text-gray-700 leading-relaxed mb-8">
                From emergency repair to full system replacement, we handle every commercial HVAC need under one roof.
              </p>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#eb1c23] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-800">{service}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <a
                  href="#top-form"
                  className="inline-flex items-center gap-2 bg-[#eb1c23] hover:bg-[#c41018] text-white font-bold py-3.5 px-7 rounded-lg transition-colors"
                >
                  Request a Free Assessment →
                </a>
              </div>
            </div>

            <div className="bg-[#002147] text-white rounded-2xl overflow-hidden">
              <img
                src={vikingImages.techAtWork}
                alt="Viking HVAC commercial technician"
                className="w-full h-52 md:h-56 object-cover"
              />
              <div className="p-8 md:p-10">
                <h3 className="text-2xl font-extrabold mb-3">Cut HVAC Energy Costs by 20-40%</h3>
                <p className="text-white/80 mb-6 leading-relaxed">
                  Most commercial systems are running 10-20% inefficiently due to neglected maintenance, oversized equipment, or outdated controls. Our energy assessments identify the fixes that pay back fastest.
                </p>
                <div className="space-y-4 mb-8">
                  {[
                    { stat: '40-60%', label: 'of commercial energy bills are HVAC' },
                    { stat: '1-3 yr', label: 'typical payback on efficiency retrofits' },
                    { stat: '90 days', label: 'recommended PM cycle for commercial RTUs' },
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

      {/* ============ BENEFITS GRID ============ */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-[#eb1c23] font-bold text-sm uppercase tracking-widest mb-3">
              Why Choose Viking
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#002147] max-w-2xl mx-auto">
              Commercial HVAC, Done Right.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {commercialBenefits.map((benefit) => (
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
          src={vikingImages.teamGroup}
          alt="The Viking HVAC commercial team"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#002147]/80 via-[#002147]/40 to-transparent" />
        <div className="relative max-w-6xl mx-auto h-full flex items-center px-6">
          <div className="max-w-md">
            <p className="text-[#4CC9F0] font-bold text-sm uppercase tracking-widest mb-2">
              Phoenix-Based Commercial Team
            </p>
            <h3 className="text-white text-2xl md:text-3xl font-extrabold leading-tight">
              Licensed, bonded, and ready to respond.
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
              From Assessment to Solution
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
              Request a Free Assessment
            </a>
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-[#eb1c23] font-bold text-sm uppercase tracking-widest mb-3">
              Phoenix Businesses Trust Viking
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#002147]">
              What Our Commercial Clients Say
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

      {/* ============ FAQ ============ */}
      <FAQAccordion faqs={faqs} title="Commercial HVAC FAQs" />

      {/* ============ FINAL CTA ============ */}
      <section className="bg-[#eb1c23] text-white">
        <div className="max-w-4xl mx-auto px-6 py-16 md:py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            Stop Worrying About Your HVAC.
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Free on-site assessment. Industry-specific expertise. Phoenix-based, family-owned, fully licensed and insured.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#top-form"
              className="inline-block bg-white text-[#eb1c23] font-extrabold py-4 px-8 rounded-lg text-lg hover:bg-gray-50 transition-colors"
            >
              Request Free Assessment
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
