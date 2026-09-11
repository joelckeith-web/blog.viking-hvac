import type { Metadata } from 'next';
import CareerForm from '@/components/CareerForm';

const PAGE_URL = 'https://careers.viking-hvac.com/senior-hvac-service-technician';

const COPY = {
  metaTitle: 'Senior HVAC Service Technician Careers – Chandler, AZ',
  metaDescription:
    'Viking HVAC seeks a Senior HVAC Service Technician in Chandler, AZ. Requires 5+ years experience and EPA Certification. Base pay, commission, and spiffs.',
  heroBadge: 'Now Hiring — Chandler / Phoenix, AZ',
  heroH1: 'Become a Senior HVAC Service Technician at Viking HVAC',
  heroSub:
    "Join a family-owned team — we've been at this since 2016. You'll work full-time, year-round across the East Valley, with base pay, commission with no ceiling, and spiffs.",
  roleH2: "What You'll Do",
  roleP:
    "As a Senior HVAC Service Technician, you'll diagnose and fix residential and commercial systems across the East Valley. It's full-time, year-round work — a full, steady schedule every week, every season, not a summer gig. You'll serve customers in 29+ cities across the Greater Phoenix area.",
  requirementsH2: 'Requirements',
  requirements: ['5+ years of HVAC experience', 'EPA Certification'],
  earningsH2: "How You're Paid",
  earningsP: 'Pay is built on three parts, with no ceiling on what you can earn through commission.',
  earnings: [
    { title: 'Base Pay', desc: 'Every paycheck starts with base pay.' },
    { title: 'Commission', desc: 'On top of that, commission has no ceiling on what it can add.' },
    { title: 'Spiffs', desc: 'We also run spiffs, another way to earn beyond base pay and commission.' },
  ],
  // Verbatim from the approved hub page's application section.
  applyH2: 'Ready to Level Up?',
  applyP: "If you're currently underpaid, underappreciated, or underchallenged — this is your opportunity.",
};

const IMAGES = {
  teamGroup: 'https://static.wixstatic.com/media/55fcb2_05777930dda2444e84c74810fc631cfd~mv2.jpg/v1/fill/w_1400,h_840,fp_0.49_0.33,q_85,enc_avif,quality_auto/team.jpg',
  truckFleet: 'https://static.wixstatic.com/media/0d007e_f6c715c4e2a6478fbc33aa50450f0b48~mv2.jpg/v1/fill/w_1200,h_700,fp_0.50_0.50,q_85,enc_avif,quality_auto/trucks.jpg',
  teamCulture: 'https://static.wixstatic.com/media/55fcb2_95899138871b490cbe71d0fd844aebb5~mv2.jpg/v1/fill/w_600,h_450,fp_0.50_0.50,q_85,enc_avif,quality_auto/culture.jpg',
};

export const metadata: Metadata = {
  title: { absolute: COPY.metaTitle },
  description: COPY.metaDescription,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: COPY.metaTitle,
    description: COPY.metaDescription,
    type: 'website',
    url: PAGE_URL,
    siteName: 'Viking Heating and Air Conditioning',
  },
  robots: { index: false, follow: false },
};

function Check({ className }: { className: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  );
}

export default function SeniorHvacServiceTechnicianPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-3 bg-white/95 backdrop-blur border-t border-gray-200 md:hidden">
        <a
          href="#apply"
          className="block w-full bg-[#eb1c23] text-white font-bold py-3.5 rounded-lg text-center text-lg"
        >
          Apply Now
        </a>
      </div>

      {/* ============ HERO ============ */}
      <section className="relative min-h-[520px] md:min-h-[620px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={IMAGES.teamGroup} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#001530]/85" />
        </div>
        <div className="relative max-w-5xl mx-auto px-6 py-20 md:py-28 text-center">
          <span className="inline-block bg-[#eb1c23] text-white text-sm font-bold px-5 py-2 rounded-full mb-8 tracking-wide uppercase">
            {COPY.heroBadge}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
            {COPY.heroH1}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
            {COPY.heroSub}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#apply" className="bg-[#eb1c23] hover:bg-[#c41018] text-white font-bold py-4 px-10 rounded-lg text-lg transition-colors">
              Apply Now
            </a>
            <a href="tel:4806895167" className="border-2 border-white text-white font-bold py-4 px-10 rounded-lg text-lg hover:bg-white/10 transition-colors">
              Call (480) 689-5167
            </a>
          </div>
        </div>
      </section>

      {/* ============ THE ROLE + REQUIREMENTS ============ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#002147] mb-5">
                {COPY.roleH2}
              </h2>
              <p className="text-lg text-[#333] mb-10 leading-relaxed">
                {COPY.roleP}
              </p>
              <h3 className="text-2xl font-extrabold text-[#002147] mb-5">
                {COPY.requirementsH2}
              </h3>
              <ul className="text-lg text-[#333] space-y-3">
                {COPY.requirements.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="w-6 h-6 text-[#eb1c23] mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={IMAGES.truckFleet} alt="Viking HVAC service van" className="w-full h-[420px] md:h-[540px] object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ============ HOW YOU EARN ============ */}
      <section className="py-20 md:py-28 bg-[#002147]">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white text-center mb-5">
            {COPY.earningsH2}
          </h2>
          <p className="text-lg text-white/80 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
            {COPY.earningsP}
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {COPY.earnings.map((item) => (
              <div key={item.title} className="rounded-xl bg-white/10 p-7">
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-base text-white/75 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ BENEFITS — red section ============ */}
      <section className="py-20 md:py-24 bg-[#eb1c23]">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white text-center mb-14">
            What We Offer
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 max-w-4xl mx-auto">
            {[
              '401(k) with 3% Match', 'Health Insurance', 'Dental & Vision', 'Life Insurance',
              'Paid Time Off', 'Paid Holidays', 'Fuel Card', 'Take-Home Truck',
              'Tool Credit Account', 'iPad Provided', 'Ongoing Training', 'Referral Bonuses',
            ].map((benefit) => (
              <div key={benefit} className="flex items-center gap-3 bg-white rounded-lg p-4">
                <Check className="w-5 h-5 text-[#eb1c23] flex-shrink-0" />
                <span className="text-base font-bold text-[#002147]">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CULTURE QUOTE ============ */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={IMAGES.teamCulture} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#001530]/90" />
        </div>
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <p className="text-3xl md:text-4xl font-extrabold text-white leading-snug mb-6">
            &ldquo;We believe in family culture, but high standards. We win together or we don&apos;t win at all.&rdquo;
          </p>
          <p className="text-lg text-white/80 font-medium">
            Nicole &amp; Kelly Bridge, Owners
          </p>
        </div>
      </section>

      {/* ============ APPLICATION FORM ============ */}
      <section id="apply" className="py-20 md:py-28 bg-[#002147] scroll-mt-8">
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              {COPY.applyH2}
            </h2>
            <p className="text-xl text-white/80 leading-relaxed">
              {COPY.applyP}
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
            <CareerForm position="Senior HVAC Service Technician" />
          </div>
          <p className="text-center text-white/80 mt-8">
            Looking for a different role?{' '}
            <a href="/careers#positions" className="text-white font-bold underline hover:no-underline">
              See all open positions
            </a>
          </p>
        </div>
      </section>

      {/* ============ COMPANY INFO ============ */}
      <section className="py-10 bg-gray-100">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-base text-[#333]">
            <span className="font-bold text-[#002147]">Viking Heating and Air Conditioning</span>
            <span>3225 N Arizona Ave, Suite C-12, Chandler, AZ 85225</span>
            <a href="tel:4806895167" className="text-[#eb1c23] font-bold hover:underline">(480) 689-5167</a>
            <span>AZ ROC #316534</span>
          </div>
          <p className="text-sm text-[#666] mt-3">
            Family-owned since 2016 &bull; Serving 29+ cities across the Greater Phoenix area
          </p>
        </div>
      </section>

      <div className="pb-20 md:pb-0" />
    </div>
  );
}
