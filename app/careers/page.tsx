import CareerForm from '@/components/CareerForm';

const IMAGES = {
  teamGroup: 'https://static.wixstatic.com/media/55fcb2_05777930dda2444e84c74810fc631cfd~mv2.jpg/v1/fill/w_1400,h_840,fp_0.49_0.33,q_85,enc_avif,quality_auto/team.jpg',
  truckFleet: 'https://static.wixstatic.com/media/0d007e_f6c715c4e2a6478fbc33aa50450f0b48~mv2.jpg/v1/fill/w_1200,h_700,fp_0.50_0.50,q_85,enc_avif,quality_auto/trucks.jpg',
  techService: 'https://static.wixstatic.com/media/55fcb2_c602ca9b298846f3b791a7995342fbc0~mv2.jpg/v1/fill/w_600,h_450,fp_0.50_0.50,q_85,enc_avif,quality_auto/service.jpg',
  techAtWork: 'https://static.wixstatic.com/media/55fcb2_92425132ecf84b08aff2b23f8a76a641~mv2.jpg/v1/fill/w_600,h_450,fp_0.50_0.50,q_85,enc_avif,quality_auto/tech.jpg',
  teamCulture: 'https://static.wixstatic.com/media/55fcb2_95899138871b490cbe71d0fd844aebb5~mv2.jpg/v1/fill/w_600,h_450,fp_0.50_0.50,q_85,enc_avif,quality_auto/culture.jpg',
  acUnit: 'https://static.wixstatic.com/media/0d007e_686b2f30ff8143aba948dfdcfa62ef2f~mv2.jpg/v1/fill/w_600,h_450,fp_0.50_0.50,q_85,enc_avif,quality_auto/ac.jpg',
};

export default function CareersPage() {
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
          {/* Heavy overlay so text is always legible */}
          <div className="absolute inset-0 bg-[#001530]/85" />
        </div>
        <div className="relative max-w-5xl mx-auto px-6 py-20 md:py-28 text-center">
          <span className="inline-block bg-[#eb1c23] text-white text-sm font-bold px-5 py-2 rounded-full mb-8 tracking-wide uppercase">
            Now Hiring — Chandler / Phoenix, AZ
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
            Build Your Career with<br />
            <span className="text-[#eb1c23]">Viking HVAC</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
            Top performers earn $100K+/year with full benefits, a take-home truck, and a real career path. Family-oriented team in the East Valley.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#apply" className="bg-[#eb1c23] hover:bg-[#c41018] text-white font-bold py-4 px-10 rounded-lg text-lg transition-colors">
              Apply Now
            </a>
            <a href="#positions" className="border-2 border-white text-white font-bold py-4 px-10 rounded-lg text-lg hover:bg-white/10 transition-colors">
              View Open Positions
            </a>
          </div>
        </div>
      </section>

      {/* ============ STATS BAR ============ */}
      <section className="bg-[#eb1c23] py-8">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-3xl md:text-4xl font-extrabold">$100K+</div>
              <div className="text-base font-medium text-white/90 mt-1">Top Performer Earnings</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-extrabold">29+</div>
              <div className="text-base font-medium text-white/90 mt-1">Cities Served</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-extrabold">365</div>
              <div className="text-base font-medium text-white/90 mt-1">Days of Work / Year</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-extrabold">2016</div>
              <div className="text-base font-medium text-white/90 mt-1">Family-Owned Since</div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ WHY VIKING — split layout ============ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#002147] mb-5">
                Why Techs Choose Viking
              </h2>
              <p className="text-lg text-[#333] mb-10 leading-relaxed">
                We&apos;re not corporate. We&apos;re not chaotic. We&apos;re building a high-performance team where your skills are valued and your growth matters.
              </p>
              <div className="space-y-7">
                {[
                  { title: '$100K+ Earning Potential', desc: 'Competitive hourly + commission + spiffs + monthly contests. Top performers here earn well over six figures.' },
                  { title: 'Take-Home Truck & Tools', desc: 'Your own company truck, tool credit account, and iPad provided from day one.' },
                  { title: 'Year-Round Work', desc: 'Full schedule every week, every season. We are not hiring for the summer only — this is a career.' },
                  { title: 'Career Growth Path', desc: 'Clear path to Lead Tech and Field Supervisor. Ongoing training and professional development.' },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="flex-shrink-0 w-9 h-9 bg-[#eb1c23] rounded-full flex items-center justify-center mt-0.5">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#002147]">{item.title}</h3>
                      <p className="text-base text-[#444] leading-relaxed mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={IMAGES.truckFleet} alt="Viking HVAC truck fleet" className="w-full h-[420px] md:h-[540px] object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ============ WHAT YOU'LL DO — dark section with images ============ */}
      <section className="py-20 md:py-28 bg-[#002147]">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white text-center mb-5">
            What You&apos;ll Be Doing
          </h2>
          <p className="text-lg text-white/80 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
            Residential and commercial HVAC service across the Greater Phoenix area, backed by a team that sets you up for success.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Service & Repair', desc: 'Residential and commercial HVAC systems across the East Valley.', img: IMAGES.techService },
              { title: 'Advanced Diagnostics', desc: 'Real troubleshooting — not just parts swapping.', img: IMAGES.acUnit },
              { title: 'Customer Experience', desc: 'Communicate repair options clearly. No upselling junk.', img: IMAGES.techAtWork },
              { title: 'Team Support', desc: 'Work alongside a team that actually has your back.', img: IMAGES.teamCulture },
            ].map((item) => (
              <div key={item.title} className="group rounded-xl overflow-hidden bg-white/10">
                <div className="h-48 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-base text-white/75 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ OPEN POSITIONS ============ */}
      <section id="positions" className="py-20 md:py-28 bg-gray-100 scroll-mt-8">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#002147] text-center mb-14">
            Open Positions
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* Senior HVAC Service Tech */}
            <div className="rounded-xl border-2 border-[#eb1c23] shadow-lg p-7 relative bg-white">
              <div className="absolute -top-3 left-6 bg-[#eb1c23] text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wide">
                Urgently Hiring
              </div>
              <h3 className="text-xl font-bold text-[#002147] mt-3 mb-2">Senior HVAC Service Technician</h3>
              <p className="text-[#eb1c23] font-extrabold text-2xl mb-4">$75K - $200K/yr</p>
              <ul className="text-base text-[#333] space-y-2.5 mb-6">
                {['Full-time, year-round', 'Hourly + commission + spiffs', '3+ years experience required', 'EPA Certification required', 'Chandler / Phoenix, AZ'].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <svg className="w-5 h-5 text-[#eb1c23] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <a href="#apply" className="block w-full bg-[#eb1c23] hover:bg-[#c41018] text-white font-bold py-3.5 rounded-lg text-center text-lg transition-colors">
                Apply Now
              </a>
            </div>

            {/* HVAC Install Tech */}
            <div className="rounded-xl border border-gray-200 shadow-sm p-7 bg-white">
              <h3 className="text-xl font-bold text-[#002147] mb-2">HVAC Install Technician</h3>
              <p className="text-[#002147] font-extrabold text-2xl mb-4">Competitive Pay</p>
              <ul className="text-base text-[#333] space-y-2.5 mb-6">
                {['Full-time, year-round', 'Installation focus', 'Experience preferred', 'Full benefits package', 'Chandler / Phoenix, AZ'].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <svg className="w-5 h-5 text-[#004281] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <a href="#apply" className="block w-full border-2 border-[#002147] hover:bg-[#002147] hover:text-white text-[#002147] font-bold py-3.5 rounded-lg text-center text-lg transition-colors">
                Apply Now
              </a>
            </div>

            {/* Sales Rep */}
            <div className="rounded-xl border border-gray-200 shadow-sm p-7 bg-white">
              <h3 className="text-xl font-bold text-[#002147] mb-2">Sales Representative</h3>
              <p className="text-[#002147] font-extrabold text-2xl mb-4">Competitive Pay</p>
              <ul className="text-base text-[#333] space-y-2.5 mb-6">
                {['Full-time', 'Commission structure', 'HVAC knowledge a plus', 'Full benefits package', 'Chandler / Phoenix, AZ'].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <svg className="w-5 h-5 text-[#004281] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <a href="#apply" className="block w-full border-2 border-[#002147] hover:bg-[#002147] hover:text-white text-[#002147] font-bold py-3.5 rounded-lg text-center text-lg transition-colors">
                Apply Now
              </a>
            </div>
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
                <svg className="w-5 h-5 text-[#eb1c23] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
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
              Ready to Level Up?
            </h2>
            <p className="text-xl text-white/80 leading-relaxed">
              If you&apos;re currently underpaid, underappreciated, or underchallenged — this is your opportunity.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
            <CareerForm />
          </div>
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
