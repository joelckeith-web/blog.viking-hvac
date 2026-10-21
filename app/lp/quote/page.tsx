import type { Metadata } from 'next';
import { siteConfig } from '@/lib/site-config';
import { TypeformEmbed } from '@/components/landing/TypeformEmbed';
import { vikingImages } from '@/lib/viking-images';

export const metadata: Metadata = {
  title: 'Free HVAC Quote | Viking HVAC',
  description:
    'Get a free HVAC quote from Viking Heating and Air Conditioning. Answer a few quick questions and our team will reach out. Family-owned, AZ ROC #316534.',
  robots: { index: false, follow: false },
};

// Typeform "Viking Lead Funnel" — target of the Meta lead ads.
const TYPEFORM_ID = 'F95ggz7H';

export default function QuoteLP() {
  return (
    <section className="relative bg-[#001530] text-white overflow-hidden">
      <img
        src={vikingImages.truckFleet}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#001530] via-[#001530]/95 to-[#002147]/75" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 pt-12 pb-14 md:pt-16 md:pb-20">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-extrabold leading-[1.1] mb-4">
            Get Your Free <span className="text-[#eb1c23]">HVAC Quote</span>
          </h1>
          <p className="text-lg text-gray-300 leading-relaxed mb-6">
            Answer a few quick questions and our team will reach out.
          </p>
          <a
            href={`tel:${siteConfig.phoneRaw}`}
            className="inline-flex items-center gap-2 bg-[#eb1c23] hover:bg-[#c41018] transition-colors rounded-xl px-6 py-3 text-white font-bold text-lg"
          >
            Or call {siteConfig.phone}
          </a>
        </div>

        <TypeformEmbed formId={TYPEFORM_ID} leadName="Viking Lead Funnel (Typeform)" />
      </div>
    </section>
  );
}
