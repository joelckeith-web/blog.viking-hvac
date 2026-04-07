import CareerForm from '@/components/CareerForm';

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

      {/* Hero */}
      <section className="bg-[var(--color-brand-dark)] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-brand-dark-secondary)] to-[var(--color-brand-dark)] opacity-90" />
        <div className="relative max-w-5xl mx-auto px-4 py-16 md:py-24 text-center">
          <div className="inline-block bg-[var(--color-brand-accent)] text-white text-sm font-bold px-4 py-1.5 rounded-full mb-6 tracking-wide uppercase">
            Now Hiring
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
            Build Your Career with<br />
            <span className="text-[var(--color-brand-accent)]">Viking HVAC</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Join a fast-growing, family-oriented team in the East Valley. Top performers earn $100K+/year with full benefits, a take-home truck, and a real career path.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#apply"
              className="bg-[var(--color-brand-accent)] hover:bg-[var(--color-brand-accent-hover)] text-white font-bold py-4 px-8 rounded-lg transition-colors text-lg"
            >
              Apply Now
            </a>
            <a
              href="#positions"
              className="border-2 border-white/30 hover:border-white/60 text-white font-semibold py-4 px-8 rounded-lg transition-colors text-lg"
            >
              View Open Positions
            </a>
          </div>
        </div>
      </section>

      {/* Why Viking */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-bold text-[var(--color-brand-dark)] text-center mb-4">
            Why Techs Choose Viking
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            We&apos;re not corporate. We&apos;re not chaotic. We&apos;re building a high-performance team where your skills are valued and your growth matters.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: '💰',
                title: '$100K+ Earning Potential',
                desc: 'Competitive hourly + commission + spiffs + monthly contests. Top performers here earn well over six figures.',
              },
              {
                icon: '🚛',
                title: 'Take-Home Truck',
                desc: 'Your own company truck, tool credit account, and iPad provided from day one.',
              },
              {
                icon: '📅',
                title: 'Year-Round Work',
                desc: 'Full schedule every week, every season. We are not hiring for the summer only — this is a career.',
              },
              {
                icon: '📈',
                title: 'Career Growth Path',
                desc: 'Clear path to Lead Tech and Field Supervisor. Ongoing training and professional development.',
              },
              {
                icon: '👨‍👩‍👧‍👦',
                title: 'Family Culture',
                desc: 'Ownership is involved and invested. Your ideas are heard. You are treated like a professional, not a number.',
              },
              {
                icon: '🛡️',
                title: 'Full Benefits Package',
                desc: '401(k) with 3% match, health, dental, vision, life insurance, PTO, paid holidays, and more.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="text-lg font-bold text-[var(--color-brand-dark)] mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You'll Do */}
      <section className="py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-bold text-[var(--color-brand-dark)] text-center mb-12">
            What You&apos;ll Be Doing
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                title: 'Residential & Commercial Service',
                desc: 'Diagnose and repair HVAC systems across the East Valley — both residential and commercial.',
              },
              {
                title: 'Advanced Diagnostics',
                desc: 'Real troubleshooting, not just parts swapping. We value techs who take pride in their diagnostic ability.',
              },
              {
                title: '5-Star Customer Experience',
                desc: 'Communicate repair options clearly to homeowners. No dispatch chaos, no selling junk customers don\'t need.',
              },
              {
                title: 'Team That Has Your Back',
                desc: 'Work alongside a team that actually supports you. Systems built to set you up for success.',
              },
            ].map((item) => (
              <div key={item.title} className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-[var(--color-brand-accent)] rounded-lg flex items-center justify-center mt-1">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-[var(--color-brand-dark)] mb-1">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="positions" className="py-16 md:py-20 bg-gray-50 scroll-mt-8">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-bold text-[var(--color-brand-dark)] text-center mb-12">
            Open Positions
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* Senior HVAC Service Tech - Primary */}
            <div className="bg-white rounded-xl border-2 border-[var(--color-brand-accent)] shadow-lg p-6 relative md:col-span-1">
              <div className="absolute -top-3 left-6 bg-[var(--color-brand-accent)] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                Urgently Hiring
              </div>
              <h3 className="text-lg font-bold text-[var(--color-brand-dark)] mt-2 mb-2">Senior HVAC Service Technician</h3>
              <p className="text-[var(--color-brand-accent)] font-bold text-xl mb-3">$75K – $200K/yr</p>
              <ul className="text-sm text-gray-600 space-y-1.5 mb-4">
                <li>• Full-time, year-round</li>
                <li>• Hourly + commission + spiffs</li>
                <li>• 3+ years experience required</li>
                <li>• EPA Certification required</li>
                <li>• Chandler / Phoenix, AZ</li>
              </ul>
              <a
                href="#apply"
                className="block w-full bg-[var(--color-brand-accent)] hover:bg-[var(--color-brand-accent-hover)] text-white font-bold py-2.5 rounded-lg text-center transition-colors text-sm"
              >
                Apply Now
              </a>
            </div>

            {/* HVAC Install Tech */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-lg font-bold text-[var(--color-brand-dark)] mb-2">HVAC Install Technician</h3>
              <p className="text-[var(--color-brand-dark)] font-bold text-xl mb-3">Competitive Pay</p>
              <ul className="text-sm text-gray-600 space-y-1.5 mb-4">
                <li>• Full-time, year-round</li>
                <li>• Installation focus</li>
                <li>• Experience preferred</li>
                <li>• Full benefits package</li>
                <li>• Chandler / Phoenix, AZ</li>
              </ul>
              <a
                href="#apply"
                className="block w-full border-2 border-[var(--color-brand-dark)] hover:bg-[var(--color-brand-dark)] hover:text-white text-[var(--color-brand-dark)] font-bold py-2.5 rounded-lg text-center transition-colors text-sm"
              >
                Apply Now
              </a>
            </div>

            {/* Sales Rep */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-lg font-bold text-[var(--color-brand-dark)] mb-2">Sales Representative</h3>
              <p className="text-[var(--color-brand-dark)] font-bold text-xl mb-3">Competitive Pay</p>
              <ul className="text-sm text-gray-600 space-y-1.5 mb-4">
                <li>• Full-time</li>
                <li>• Commission structure</li>
                <li>• HVAC knowledge a plus</li>
                <li>• Full benefits package</li>
                <li>• Chandler / Phoenix, AZ</li>
              </ul>
              <a
                href="#apply"
                className="block w-full border-2 border-[var(--color-brand-dark)] hover:bg-[var(--color-brand-dark)] hover:text-white text-[var(--color-brand-dark)] font-bold py-2.5 rounded-lg text-center transition-colors text-sm"
              >
                Apply Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-bold text-[var(--color-brand-dark)] text-center mb-12">
            What We Offer
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
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
                className="flex items-center gap-2 bg-gray-50 rounded-lg p-3"
              >
                <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm font-medium text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply" className="py-16 md:py-20 bg-[var(--color-brand-dark)] scroll-mt-8">
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
      <section className="py-12 bg-gray-50">
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
          <p className="text-xs text-gray-400 mt-4">
            Family-owned since 2016 &bull; Serving 29+ cities across the Greater Phoenix area
          </p>
        </div>
      </section>

      {/* Minimal Footer — bottom padding for sticky mobile CTA */}
      <div className="pb-20 md:pb-0" />
    </div>
  );
}
