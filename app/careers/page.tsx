import Image from 'next/image';
import CareerForm from '@/components/CareerForm';

// Viking team/work images from wixstatic (their main site assets)
const IMAGES = {
  teamGroup: 'https://static.wixstatic.com/media/55fcb2_05777930dda2444e84c74810fc631cfd~mv2.jpg/v1/fill/w_1200,h_720,fp_0.49_0.33,q_85,enc_avif,quality_auto/team.jpg',
  techAtWork: 'https://static.wixstatic.com/media/55fcb2_92425132ecf84b08aff2b23f8a76a641~mv2.jpg/v1/fill/w_800,h_600,fp_0.50_0.50,q_85,enc_avif,quality_auto/tech.jpg',
  truckFleet: 'https://static.wixstatic.com/media/0d007e_f6c715c4e2a6478fbc33aa50450f0b48~mv2.jpg/v1/fill/w_1200,h_600,fp_0.50_0.50,q_85,enc_avif,quality_auto/trucks.jpg',
  techService: 'https://static.wixstatic.com/media/55fcb2_c602ca9b298846f3b791a7995342fbc0~mv2.jpg/v1/fill/w_800,h_600,fp_0.50_0.50,q_85,enc_avif,quality_auto/service.jpg',
  teamCulture: 'https://static.wixstatic.com/media/55fcb2_95899138871b490cbe71d0fd844aebb5~mv2.jpg/v1/fill/w_800,h_600,fp_0.50_0.50,q_85,enc_avif,quality_auto/culture.jpg',
  acUnit: 'https://static.wixstatic.com/media/0d007e_686b2f30ff8143aba948dfdcfa62ef2f~mv2.jpg/v1/fill/w_800,h_600,fp_0.50_0.50,q_85,enc_avif,quality_auto/ac.jpg',
};

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-3 bg-white/95 backdrop-blur border-t border-gray-200 md:hidden">
        <a
          href="#apply"
          className="block w-full bg-[var(--color-brand-accent)] hover:bg-[var(--color-brand-accent-hover)] text-white font-bold py-3 rounded-lg text-center transition-colors text-lg"
        >
          Apply Now
        </a>
      </div>

      {/* Hero with Background Image */}
      <section className="relative min-h-[500px] md:min-h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={IMAGES.teamGroup}
            alt="Viking HVAC team"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-brand-dark-secondary)]/95 via-[var(--color-brand-dark)]/85 to-[var(--color-brand-dark)]/70" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 py-20 md:py-28">
          <div className="max-w-2xl">
            <div className="inline-block bg-[var(--color-brand-accent)] text-white text-sm font-bold px-4 py-1.5 rounded-full mb-6 tracking-wide uppercase">
              Now Hiring — Chandler / Phoenix, AZ
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight">
              Build Your Career with{' '}
              <span className="text-[var(--color-brand-accent)]">Viking HVAC</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed">
              Join a fast-growing, family-oriented team in the East Valley. Top performers earn $100K+/year with full benefits, a take-home truck, and a real career path.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#apply"
                className="bg-[var(--color-brand-accent)] hover:bg-[var(--color-brand-accent-hover)] text-white font-bold py-4 px-8 rounded-lg transition-colors text-lg text-center"
              >
                Apply Now
              </a>
              <a
                href="#positions"
                className="border-2 border-white/40 hover:border-white/70 text-white font-semibold py-4 px-8 rounded-lg transition-colors text-lg text-center"
              >
                View Open Positions
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-[var(--color-brand-accent)] py-6">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
            <div>
              <div className="text-2xl md:text-3xl font-bold">$100K+</div>
              <div className="text-sm text-white/80">Top Performer Earnings</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold">29+</div>
              <div className="text-sm text-white/80">Cities Served</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold">365</div>
              <div className="text-sm text-white/80">Days of Work / Year</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold">Since 2016</div>
              <div className="text-sm text-white/80">Family-Owned</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Viking — with image split */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-4xl font-bold text-[var(--color-brand-dark)] mb-4">
                Why Techs Choose Viking
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                We&apos;re not corporate. We&apos;re not chaotic. We&apos;re building a high-performance team where your skills are valued and your growth matters.
              </p>
              <div className="space-y-5">
                {[
                  {
                    title: '$100K+ Earning Potential',
                    desc: 'Competitive hourly + commission + spiffs + monthly contests. Top performers here earn well over six figures.',
                  },
                  {
                    title: 'Take-Home Truck & Tools',
                    desc: 'Your own company truck, tool credit account, and iPad provided from day one.',
                  },
                  {
                    title: 'Year-Round Work',
                    desc: 'Full schedule every week, every season. We are not hiring for the summer only — this is a career.',
                  },
                  {
                    title: 'Career Growth Path',
                    desc: 'Clear path to Lead Tech and Field Supervisor. Ongoing training and professional development.',
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-[var(--color-brand-accent)] rounded-full flex items-center justify-center mt-0.5">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-[var(--color-brand-dark)]">{item.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={IMAGES.truckFleet}
                alt="Viking HVAC truck fleet"
                className="w-full h-[400px] md:h-[500px] object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                <p className="text-white font-semibold text-lg">Your truck. Your tools. Your career.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Do — dark section with images */}
      <section className="py-16 md:py-24 bg-[var(--color-brand-dark-secondary)]">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-bold text-white text-center mb-4">
            What You&apos;ll Be Doing
          </h2>
          <p className="text-gray-400 text-center max-w-2xl mx-auto mb-12">
            Residential and commercial HVAC service across the Greater Phoenix area, backed by a team that sets you up for success.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Service & Repair',
                desc: 'Residential and commercial HVAC systems across the East Valley.',
                img: IMAGES.techService,
              },
              {
                title: 'Advanced Diagnostics',
                desc: 'Real troubleshooting — not just parts swapping.',
                img: IMAGES.acUnit,
              },
              {
                title: 'Customer Experience',
                desc: 'Communicate repair options clearly. No upselling junk.',
                img: IMAGES.techAtWork,
              },
              {
                title: 'Team Support',
                desc: 'Work alongside a team that actually has your back.',
                img: IMAGES.teamCulture,
              },
            ].map((item) => (
              <div key={item.title} className="group rounded-xl overflow-hidden bg-white/5 border border-white/10">
                <div className="h-44 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-white mb-1">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="positions" className="py-16 md:py-24 bg-white scroll-mt-8">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-bold text-[var(--color-brand-dark)] text-center mb-12">
            Open Positions
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* Senior HVAC Service Tech */}
            <div className="rounded-xl border-2 border-[var(--color-brand-accent)] shadow-lg p-6 relative bg-white">
              <div className="absolute -top-3 left-6 bg-[var(--color-brand-accent)] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                Urgently Hiring
              </div>
              <h3 className="text-lg font-bold text-[var(--color-brand-dark)] mt-2 mb-2">Senior HVAC Service Technician</h3>
              <p className="text-[var(--color-brand-accent)] font-bold text-xl mb-3">$75K - $200K/yr</p>
              <ul className="text-sm text-gray-700 space-y-2 mb-5">
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-[var(--color-brand-accent)] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                  Full-time, year-round
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-[var(--color-brand-accent)] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                  Hourly + commission + spiffs
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-[var(--color-brand-accent)] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                  3+ years experience required
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-[var(--color-brand-accent)] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                  EPA Certification required
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-[var(--color-brand-accent)] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                  Chandler / Phoenix, AZ
                </li>
              </ul>
              <a
                href="#apply"
                className="block w-full bg-[var(--color-brand-accent)] hover:bg-[var(--color-brand-accent-hover)] text-white font-bold py-3 rounded-lg text-center transition-colors"
              >
                Apply Now
              </a>
            </div>

            {/* HVAC Install Tech */}
            <div className="rounded-xl border border-gray-200 shadow-sm p-6 bg-white">
              <h3 className="text-lg font-bold text-[var(--color-brand-dark)] mb-2">HVAC Install Technician</h3>
              <p className="text-[var(--color-brand-dark)] font-bold text-xl mb-3">Competitive Pay</p>
              <ul className="text-sm text-gray-700 space-y-2 mb-5">
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-[var(--color-brand-dark)] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                  Full-time, year-round
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-[var(--color-brand-dark)] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                  Installation focus
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-[var(--color-brand-dark)] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                  Experience preferred
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-[var(--color-brand-dark)] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                  Full benefits package
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-[var(--color-brand-dark)] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                  Chandler / Phoenix, AZ
                </li>
              </ul>
              <a
                href="#apply"
                className="block w-full border-2 border-[var(--color-brand-dark)] hover:bg-[var(--color-brand-dark)] hover:text-white text-[var(--color-brand-dark)] font-bold py-3 rounded-lg text-center transition-colors"
              >
                Apply Now
              </a>
            </div>

            {/* Sales Rep */}
            <div className="rounded-xl border border-gray-200 shadow-sm p-6 bg-white">
              <h3 className="text-lg font-bold text-[var(--color-brand-dark)] mb-2">Sales Representative</h3>
              <p className="text-[var(--color-brand-dark)] font-bold text-xl mb-3">Competitive Pay</p>
              <ul className="text-sm text-gray-700 space-y-2 mb-5">
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-[var(--color-brand-dark)] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                  Full-time
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-[var(--color-brand-dark)] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                  Commission structure
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-[var(--color-brand-dark)] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                  HVAC knowledge a plus
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-[var(--color-brand-dark)] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                  Full benefits package
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-[var(--color-brand-dark)] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                  Chandler / Phoenix, AZ
                </li>
              </ul>
              <a
                href="#apply"
                className="block w-full border-2 border-[var(--color-brand-dark)] hover:bg-[var(--color-brand-dark)] hover:text-white text-[var(--color-brand-dark)] font-bold py-3 rounded-lg text-center transition-colors"
              >
                Apply Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits — red accent section */}
      <section className="py-16 md:py-20 bg-[var(--color-brand-accent)]">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-bold text-white text-center mb-12">
            What We Offer
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              '401(k) with 3% Match',
              'Health Insurance',
              'Dental & Vision',
              'Life Insurance',
              'Paid Time Off',
              'Paid Holidays',
              'Fuel Card',
              'Take-Home Truck',
              'Tool Credit Account',
              'iPad Provided',
              'Ongoing Training',
              'Referral Bonuses',
            ].map((benefit) => (
              <div
                key={benefit}
                className="flex items-center gap-2.5 bg-white/15 backdrop-blur rounded-lg p-3.5"
              >
                <svg className="w-4 h-4 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm font-semibold text-white">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Culture quote — image break */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={IMAGES.teamCulture}
            alt="Viking HVAC team culture"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[var(--color-brand-dark)]/80" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <p className="text-2xl md:text-3xl font-bold text-white leading-snug mb-4">
            &ldquo;We believe in family culture, but high standards. We win together or we don&apos;t win at all.&rdquo;
          </p>
          <p className="text-gray-300">
            Nicole &amp; Kelly Bridge, Owners
          </p>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply" className="py-16 md:py-24 bg-[var(--color-brand-dark)] scroll-mt-8">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-3">
              Ready to Level Up?
            </h2>
            <p className="text-gray-300 text-lg">
              If you&apos;re currently underpaid, underappreciated, or underchallenged — this is your opportunity.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-10">
            <CareerForm />
          </div>
        </div>
      </section>

      {/* Company Info */}
      <section className="py-10 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-sm text-gray-600">
            <div>
              <span className="font-bold text-[var(--color-brand-dark)]">Viking Heating and Air Conditioning</span>
            </div>
            <div>3225 N Arizona Ave, Suite C-12, Chandler, AZ 85225</div>
            <div>
              <a href="tel:4806895167" className="text-[var(--color-brand-accent)] font-semibold hover:underline">
                (480) 689-5167
              </a>
            </div>
            <div>AZ ROC #316534</div>
          </div>
          <p className="text-xs text-gray-400 mt-3">
            Family-owned since 2016 &bull; Serving 29+ cities across the Greater Phoenix area
          </p>
        </div>
      </section>

      {/* Bottom padding for sticky mobile CTA */}
      <div className="pb-20 md:pb-0" />
    </div>
  );
}
