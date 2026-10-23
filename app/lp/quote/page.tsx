import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { siteConfig } from '@/lib/site-config';
import { TypeformEmbed } from '@/components/landing/TypeformEmbed';

export const metadata: Metadata = {
  title: 'Free HVAC Quote | Viking HVAC',
  description:
    'Get a free HVAC quote from Viking Heating and Air Conditioning. Answer a few quick questions and our team will reach out. Family-owned, AZ ROC #316534.',
  robots: { index: false, follow: false },
};

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700', '900'] });

// Typeform "Viking Lead Funnel" — target of the Meta lead ads.
const TYPEFORM_ID = 'F95ggz7H';

export default function QuoteLP() {
  return (
    <section className={`${poppins.className} flex-1 flex flex-col bg-[#021735] text-white`}>
      <header className="h-16 shrink-0 flex items-center justify-between gap-4 px-4 sm:px-6 bg-[#021735] border-b border-white/10">
        <img src="/lp/quote/viking-logo-white.png" alt={siteConfig.companyName} className="h-8 w-auto" />
        <a
          href={`tel:${siteConfig.phoneRaw}`}
          className="inline-flex items-center rounded-full bg-[#E1243B] hover:bg-[#B81C30] transition-colors px-5 h-11 text-sm sm:text-base font-extrabold text-white"
        >
          Call {siteConfig.phone}
        </a>
      </header>

      {/* The form is the page: it fills the screen under the header. */}
      <div style={{ height: 'calc(100dvh - 4rem)' }}>
        <TypeformEmbed
          formId={TYPEFORM_ID}
          leadName="Viking Lead Funnel (Typeform)"
          fullPage
          resultsPath="results"
        />
      </div>
    </section>
  );
}
