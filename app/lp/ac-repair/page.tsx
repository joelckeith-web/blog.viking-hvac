import type { Metadata } from 'next';
import { siteConfig } from '@/lib/site-config';
import { LandingForm } from '@/components/landing/LandingForm';
import { FAQAccordion } from '@/components/sections/FAQAccordion';

export const metadata: Metadata = {
  title: 'AC Repair in Chandler & Phoenix, AZ | Same-Day Service | Viking HVAC',
  description:
    'Fast, honest AC repair across the Greater Phoenix area. Same-day service when possible. Family-owned, 240+ 5-star reviews, AZ ROC #316534. Free quote.',
  robots: { index: false, follow: false },
};

const trustStats = [
  { value: '240+', label: '5-Star Reviews' },
  { value: 'Same-Day', label: 'Service Available' },
  { value: '24/7', label: 'Emergency Repair' },
  { value: '29+', label: 'Cities Served' },
];

const repairBenefits = [
  {
    title: 'Same-Day Repair',
    description:
      'When your AC goes out in Phoenix heat, every hour matters. We promise same-day repair when possible — no waiting days for a tech.',
  },
  {
    title: 'Honest, Fair Pricing',
    description:
      'No falsified repairs. No upsells you don\'t need. We diagnose the real problem and give you straight pricing before any work starts.',
  },
  {
    title: 'All Brands, All Systems',
    description:
      'Trane, Carrier, Lennox, Goodman, Rheem, Mitsubishi — our techs are trained on every major residential AC brand and refrigerant type.',
  },
  {
    title: 'Built for Arizona Heat',
    description:
      'We troubleshoot for the conditions your system actually faces — 115°F summers, dust storms, monsoons. Generic repairs miss the AZ-specific stuff.',
  },
  {
    title: 'No Hassle. No Drama.',
    description:
      'Empathetic, on-time techs who treat your home with respect. We explain what\'s wrong in plain English and let you decide.',
  },
  {
    title: '100% Satisfaction Guarantee',
    description:
      'Every repair backed by our V.I.K.I.N.G. promise. If you\'re not satisfied, we make it right.',
  },
];

const commonProblems = [
  'AC blowing warm air or not cooling enough',
  'AC won\'t turn on or won\'t shut off',
  'Strange noises (banging, clicking, screeching)',
  'Frozen evaporator coils',
  'Water leaking inside or around the unit',
  'High humidity even with AC running',
  'Burning or musty smells from vents',
  'Sky-high energy bills with normal use',
  'AC short-cycling (turning on/off rapidly)',
];

const processSteps = [
  {
    step: '1',
    title: 'Tell Us What\'s Wrong',
    description:
      'Fill out the form or call. Share the symptoms — we\'ll triage and dispatch a tech, often same-day.',
  },
  {
    step: '2',
    title: 'On-Site Diagnostic',
    description:
      'Our tech arrives in a Viking truck, runs a full diagnostic, and gives you transparent pricing before any repair starts.',
  },
  {
    step: '3',
    title: 'Repair & Test',
    description:
      'We fix the issue, test the system end-to-end, and walk you through what we did. Most repairs done in one visit.',
  },
];

const reviews = [
  {
    name: 'Jessica M., Chandler',
    text: 'Our AC died on a 113° day. Viking had a tech out within 4 hours, diagnosed a bad capacitor, and had us cool again before bedtime. Honest pricing, friendly tech.',
  },
  {
    name: 'Robert T., Gilbert',
    text: 'Called three companies. Viking was the only one who didn\'t try to sell me a whole new system. Fixed the actual problem for a fraction of what others quoted.',
  },
  {
    name: 'Maria & David S., Mesa',
    text: 'Family-owned and you can tell. The tech took the time to explain what was wrong and showed us the part. No pressure, no nonsense. Will use them again.',
  },
];

const faqs = [
  {
    question: 'How fast can you get a tech to my home?',
    answer:
      'In most cases we can dispatch a tech the same day, especially during summer when demand is high but our team scales up to meet it. For 24/7 emergency repair, call (480) 689-5167 directly.',
  },
  {
    question: 'How much does AC repair cost?',
    answer:
      'AC repair pricing varies based on the issue. Common repairs (capacitor, contactor, fan motor) typically run a few hundred dollars. Bigger issues like compressor or coil replacement cost more. We always give you transparent pricing BEFORE any work starts — no surprises.',
  },
  {
    question: 'Should I repair my AC or replace it?',
    answer:
      'Generally: if your system is under 10 years old and the repair is less than 50% of replacement cost, repair makes sense. If it\'s 12+ years old, uses R-22 (Freon), or repairs are stacking up, replacement may save money long-term. We\'ll give you both options honestly.',
  },
  {
    question: 'Do you service all AC brands?',
    answer:
      'Yes — Trane, Carrier, Lennox, Goodman, Rheem, Mitsubishi, Bryant, Amana, Daikin, and more. Our techs are trained on every major residential brand. We also handle commercial systems.',
  },
  {
    question: 'What areas do you serve?',
    answer:
      'We serve 29+ cities across the Greater Phoenix area including Chandler, Gilbert, Mesa, Phoenix, Scottsdale, Tempe, Queen Creek, Apache Junction, Ahwatukee, Avondale, Buckeye, Goodyear, Glendale, Peoria, Surprise, and surrounding communities.',
  },
  {
    question: 'Do you offer 24/7 emergency repair?',
    answer:
      'Yes. AC failures don\'t wait for business hours, especially in Arizona summers. Call (480) 689-5167 anytime for emergency service.',
  },
  {
    question: 'Are you licensed and insured?',
    answer:
      'Yes — Arizona ROC #316534, fully insured, family-owned since 2016. All techs are background-checked and trained on the latest HVAC systems.',
  },
];

export default function ACRepairLP() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section id="top-form" className="relative bg-[#001530] text-white overflow-hidden scroll-mt-20">
        <div className="absolute inset-0 bg-gradient-to-r from-[#001530] via-[#001530]/95 to-[#002147]/80" />

        <div className="relative max-w-6xl mx-auto px-6 pt-16 pb-12 md:pt-24 md:pb-20">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
            {/* Left — Value proposition */}
            <div>
              <div className="inline-flex items-center gap-2 bg-[#eb1c23] rounded-full px-4 py-1.5 mb-6">
                <span className="text-sm font-bold text-white uppercase tracking-wide">
                  Same-Day AC Repair
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold leading-[1.1] mb-6">
                AC Broken in the Phoenix Heat?{' '}
                <span className="text-[#eb1c23]">We Fix It Today.</span>
              </h1>

              <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8 max-w-lg">
                Honest, family-owned HVAC repair across Chandler, Gilbert, Mesa, Phoenix, and 25+ other East Valley cities. 240+ 5-star reviews. No falsified repairs. Just real diagnostics and fair pricing.
              </p>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
                <a
                  href={`tel:${siteConfig.phoneRaw}`}
                  className="inline-flex items-center gap-2 bg-[#eb1c23] hover:bg-[#c41018] transition-colors rounded-xl px-6 py-3.5 text-white font-bold text-lg"
                >
                  📞 {siteConfig.phone}
                </a>
                <span className="text-gray-400 text-sm">
                  Or fill out the form for a callback
                </span>
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

            {/* Right — Lead capture form */}
            <div className="lg:mt-0">
              <LandingForm
                serviceLabel="AC Repair"
                messagePlaceholder="What's your AC doing? (e.g., not cooling, leaking water, strange noise)"
                leadSource="lp-ac-repair"
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

      {/* ============ COMMON PROBLEMS ============ */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#eb1c23] font-bold text-sm uppercase tracking-widest mb-3">
                Sound Familiar?
              </p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#002147] mb-6">
                AC Problems We Fix Every Day
              </h2>
              <p className="text-gray-700 leading-relaxed mb-8">
                If your AC is doing any of these, call us. Most issues are far cheaper to fix than to ignore — especially in Arizona heat where a struggling system can fail completely in days.
              </p>
              <ul className="space-y-3">
                {commonProblems.map((problem) => (
                  <li key={problem} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#eb1c23] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-800">{problem}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <a
                  href="#top-form"
                  className="inline-flex items-center gap-2 bg-[#eb1c23] hover:bg-[#c41018] text-white font-bold py-3.5 px-7 rounded-lg transition-colors"
                >
                  Get a Free Diagnostic →
                </a>
              </div>
            </div>

            <div className="bg-[#002147] text-white rounded-2xl p-8 md:p-10">
              <h3 className="text-2xl font-extrabold mb-3">Why Wait?</h3>
              <p className="text-white/80 mb-6 leading-relaxed">
                A small AC issue can become a full system failure in 24-48 hours during 110°+ heat. Catching it early saves you money and a sweltering night without AC.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  { stat: '90%', label: 'of AC failures show warning signs first' },
                  { stat: '$1,200+', label: 'average savings vs. emergency replacement' },
                  { stat: '<24h', label: 'typical Viking response time' },
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
                📞 Call {siteConfig.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============ BENEFITS GRID ============ */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-[#eb1c23] font-bold text-sm uppercase tracking-widest mb-3">
              Why Choose Viking
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#002147] max-w-2xl mx-auto">
              The Honest, Family-Owned Way to Fix Your AC
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repairBenefits.map((benefit) => (
              <div
                key={benefit.title}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:border-[#eb1c23]/30 transition-all"
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

      {/* ============ HOW IT WORKS ============ */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-[#eb1c23] font-bold text-sm uppercase tracking-widest mb-3">
              Simple 3-Step Process
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#002147]">
              How We Get You Cool Again
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

      {/* ============ SERVICE AREA ============ */}
      <section className="py-14 md:py-16 bg-[#002147] text-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-[#eb1c23] font-bold text-sm uppercase tracking-widest mb-3">
            📍 Service Area
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            Serving 29+ Cities Across the Greater Phoenix Area
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8 leading-relaxed">
            From Chandler to Surprise, Mesa to Buckeye — if you&apos;re in the Valley, we&apos;re your AC repair team.
          </p>
          <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
            {siteConfig.serviceAreas.map((city) => (
              <span
                key={city}
                className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm"
              >
                {city}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-[#eb1c23] font-bold text-sm uppercase tracking-widest mb-3">
              240+ 5-Star Reviews
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#002147]">
              Real Phoenix Homeowners. Real Repairs.
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
      <FAQAccordion faqs={faqs} title="AC Repair FAQs" />

      {/* ============ FINAL CTA ============ */}
      <section className="bg-[#eb1c23] text-white">
        <div className="max-w-4xl mx-auto px-6 py-16 md:py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            Don&apos;t Suffer Through Another 110° Day.
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Get your AC fixed today. Same-day service when possible. Family-owned. Fair pricing. No drama.
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
              📞 Call {siteConfig.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
