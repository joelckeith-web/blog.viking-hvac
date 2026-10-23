import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { siteConfig } from '@/lib/site-config';
import { QuoteResultsReveal } from '@/components/landing/QuoteResultsReveal';
import { FINANCING_DISCLAIMER, tierForTons } from '@/lib/quote-tiers';

export const metadata: Metadata = {
  title: 'Your New System Estimate | Viking HVAC',
  robots: { index: false, follow: false },
};

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '600', '700', '800', '900'] });

const REVIEW_COUNT = '480+';

const REVIEWS = [
  {
    quote:
      'Viking HVAC has been excellent for us this year. We lucked out by finding them, but glad we did. Very honest and fair and understanding. Owen is an excellent technician as well. Highly recommend.',
    name: 'Marcellus Strauss',
  },
  {
    quote:
      'Owen and Logan were very courteous, kind, knowledgeable and efficient, and were thoughtful and compliant when asked to remove their shoes.',
    name: 'Penny Thielke',
  },
  {
    quote:
      "I've been using Viking for a while now and they always take great care of me! I had the pleasure of meeting Scott today and he went above and beyond! Will definitely be requesting him in the future.",
    name: 'Julia Klayman',
  },
];

const PROMISES = [
  { title: 'Family-owned since 2016', body: 'Owned and run by Nikki and Kelly Bridge, right here in the Valley. You talk to real people, not a call center.' },
  { title: '10-year labor warranty', body: 'Every new system we install comes with a 10-year labor warranty, so the work is covered long after the install.' },
  { title: 'Financing on approved credit', body: 'Spread the cost of a new system over time through our financing partner, Synchrony.' },
];

function PhoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
    </svg>
  );
}

export default async function QuoteResults({
  searchParams,
}: {
  searchParams: Promise<{ size?: string; sqft?: string }>;
}) {
  const { size, sqft } = await searchParams;
  const tier = tierForTons(size);
  const homeSqft = Number(sqft) > 0 ? Math.round(Number(sqft)).toLocaleString('en-US') : null;

  return (
    <div className={`${poppins.className} flex-1 bg-white text-[#152350]`}>
      {/* Header */}
      <header className="sticky top-0 z-30 h-16 flex items-center justify-between gap-4 px-4 sm:px-6 bg-[#021735] border-b border-white/10">
        <img src="/lp/quote/viking-logo-white.png" alt={siteConfig.companyName} className="h-8 w-auto" />
        <a
          href={`tel:${siteConfig.phoneRaw}`}
          className="inline-flex items-center gap-2 rounded-full bg-[#E1243B] hover:bg-[#B81C30] transition-colors px-5 h-11 text-sm sm:text-base font-extrabold text-white"
        >
          <PhoneIcon /> {siteConfig.phone}
        </a>
      </header>

      {/* Credibility hero */}
      <section className="relative overflow-hidden bg-[#021735] text-white">
        <img src="/lp/quote/team-with-vans.jpg" alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-25" />
        <span aria-hidden="true" className="absolute -top-10 -bottom-10 right-[14%] w-9 bg-[#EB2127] -skew-x-[18deg]" />
        <span aria-hidden="true" className="absolute -top-10 -bottom-10 right-[calc(14%-48px)] w-9 bg-[#004281] -skew-x-[18deg]" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <p className="text-sm font-extrabold text-[#FF5A63] mb-3">THANKS — WE&apos;VE GOT YOUR INFO</p>
          <h1 className="max-w-3xl text-4xl sm:text-5xl font-black leading-[1.15] mb-5">
            Meet the team that will take care of your new system
          </h1>
          <p className="max-w-2xl text-lg text-white/85 leading-relaxed mb-8">
            A Viking specialist will call you shortly. Your estimate is just below.
          </p>
          <div className="flex flex-wrap gap-2 mb-8">
            {['Champion Authorized Dealer', 'Mitsubishi Diamond Contractor', siteConfig.license].map((chip) => (
              <span key={chip} className="rounded-full bg-white text-[#152350] text-sm font-semibold px-4 py-2 shadow-[0_4px_12px_rgba(0,0,0,0.3)]">
                {chip}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl rounded-2xl bg-[#004281] p-5 text-center shadow-[0_10px_26px_rgba(0,0,0,0.35)]">
            {[
              [REVIEW_COUNT, 'Google reviews'],
              ['24/7', 'Emergency service'],
              ['2016', 'Family-owned since'],
              ['10-yr', 'Labor warranty'],
            ].map(([n, label]) => (
              <div key={label}>
                <div className="text-2xl sm:text-3xl font-black leading-tight">{n}</div>
                <div className="text-xs sm:text-sm">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Viking */}
      <section className="bg-[#F7F8FA] px-4 sm:px-6 py-16">
        <div className="max-w-6xl mx-auto grid gap-5 md:grid-cols-3">
          {PROMISES.map((p) => (
            <div key={p.title} className="rounded-2xl border border-[#DDE1E7] bg-white p-8">
              <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#FDE3E5]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E1243B" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12.5 10 17.5 19 7" />
                </svg>
              </span>
              <h2 className="text-xl font-black mb-2">{p.title}</h2>
              <p className="text-[15px] leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="px-4 sm:px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center text-3xl sm:text-4xl font-black mb-2">What Valley homeowners say</h2>
          <p className="text-center mb-10">
            <span className="text-[#F6B400] tracking-widest" aria-hidden="true">★★★★★</span>{' '}
            <b>4.9 stars · {REVIEW_COUNT} Google reviews</b>
          </p>
          <div className="grid gap-5 md:grid-cols-3">
            {REVIEWS.map((r) => (
              <figure key={r.name} className="rounded-2xl border border-[#DDE1E7] bg-[#F7F8FA] p-7">
                <span className="text-[#F6B400] tracking-widest" aria-label="5 stars">★★★★★</span>
                <blockquote className="mt-3 text-[15px] leading-relaxed">&ldquo;{r.quote}&rdquo;</blockquote>
                <figcaption className="mt-4 text-sm font-extrabold">{r.name} · Google review</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Crew photos + contact */}
      <section className="px-4 sm:px-6 pb-16">
        <div className="max-w-6xl mx-auto grid gap-4 sm:grid-cols-3">
          <img src="/lp/quote/ductwork-ladder.jpg" alt="Viking technician working on ductwork" className="aspect-[4/3] w-full rounded-2xl object-cover" />
          <img src="/lp/quote/tech-at-van.jpg" alt="Viking technician beside his service van" className="aspect-[4/3] w-full rounded-2xl object-cover object-top" />
          <img src="/lp/quote/office-on-phone.jpg" alt="Viking office team member on a customer call" className="aspect-[4/3] w-full rounded-2xl object-cover" />
        </div>
        <div className="max-w-6xl mx-auto mt-6 rounded-2xl bg-[#021735] text-white p-6 sm:p-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-black text-xl">{siteConfig.companyName}</p>
            <p className="text-white/80 text-sm">3225 N Arizona Ave, Suite C-12, Chandler, AZ 85225 · Open 24/7 · {siteConfig.license}</p>
          </div>
          <a href={`tel:${siteConfig.phoneRaw}`} className="inline-flex items-center gap-2 rounded-full bg-white text-[#021735] px-6 h-12 font-black shadow-[0_10px_26px_rgba(0,0,0,0.35)]">
            <PhoneIcon /> {siteConfig.phone}
          </a>
        </div>
      </section>

      {/* Results */}
      <section className="bg-[#F7F8FA] px-4 sm:px-6 py-16 sm:py-20">
        <div className="max-w-5xl mx-auto">
          <QuoteResultsReveal phone={siteConfig.phone} phoneRaw={siteConfig.phoneRaw}>
            <p className="text-center text-sm font-extrabold text-[#EB2127] mb-2">YOUR NEW SYSTEM ESTIMATE</p>
            {tier ? (
              <>
                <h2 className="text-center text-3xl sm:text-5xl font-black leading-tight mb-10">
                  {homeSqft ? `For about ${homeSqft} sq ft` : 'For a home your size'}
                </h2>
                <div className="grid overflow-hidden rounded-2xl border-2 border-[#E1243B] bg-white md:grid-cols-2">
                  <img src="/lp/quote/crane-lift-install.jpg" alt={`Viking crew installing a new AC system`} className="h-full min-h-64 w-full object-cover" />
                  <div className="p-8 sm:p-10">
                    <p className="text-sm font-extrabold text-[#EB2127]">RECOMMENDED SIZE</p>
                    <h3 className="text-4xl font-black mb-1">{tier.tons}-ton system</h3>
                    <p className="mb-6">Sized for homes up to {tier.maxSqft.toLocaleString('en-US')} sq ft</p>
                    <div className="rounded-2xl bg-[#021735] text-white p-6 mb-6">
                      <div className="text-5xl font-black leading-none">
                        ${tier.monthly}
                        <span className="text-xl font-bold">/month</span>
                      </div>
                      <p className="mt-2 text-sm text-white/85">about, on approved credit through Synchrony</p>
                    </div>
                    <ul className="space-y-2 text-[15px] mb-6">
                      {['Installed by the Viking crew', '10-year labor warranty on new systems', 'We confirm the right size before anything is ordered'].map((li) => (
                        <li key={li} className="flex gap-3">
                          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FDE3E5] text-[#E1243B] text-sm font-black" aria-hidden="true">✓</span>
                          {li}
                        </li>
                      ))}
                    </ul>
                    <a href={`tel:${siteConfig.phoneRaw}`} className="flex items-center justify-center gap-2 rounded-full bg-[#E1243B] hover:bg-[#B81C30] transition-colors h-14 text-lg font-black text-white">
                      <PhoneIcon /> Call Now · {siteConfig.phone}
                    </a>
                  </div>
                </div>
                <p className="mt-5 text-center text-xs italic text-[#5A6478] max-w-3xl mx-auto">{FINANCING_DISCLAIMER}</p>
              </>
            ) : (
              <div className="rounded-2xl border-2 border-[#E1243B] bg-white p-10 text-center">
                <h2 className="text-3xl font-black mb-3">Let&apos;s size your system together</h2>
                <p className="mb-6">Call us and a Viking specialist will put together the right options for your home.</p>
                <a href={`tel:${siteConfig.phoneRaw}`} className="inline-flex items-center gap-2 rounded-full bg-[#E1243B] px-8 h-14 text-lg font-black text-white">
                  <PhoneIcon /> Call Now · {siteConfig.phone}
                </a>
              </div>
            )}
          </QuoteResultsReveal>
        </div>
      </section>
    </div>
  );
}
