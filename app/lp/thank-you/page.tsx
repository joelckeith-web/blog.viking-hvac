import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Thank You — Viking HVAC',
  description:
    'Thanks for contacting Viking HVAC. A specialist will reach out shortly to schedule your free consultation.',
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <main className="min-h-[70vh] bg-gray-50 flex items-center justify-center px-4 py-16">
      <div className="bg-white rounded-2xl shadow-xl max-w-xl w-full p-8 md:p-12 text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
          <svg
            className="w-12 h-12 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-[#002147] mb-4">
          Quote Request Received!
        </h1>

        <p className="text-lg text-gray-700 leading-relaxed mb-8">
          Thanks for reaching out. A {siteConfig.shortName} specialist will contact you shortly to confirm your details and schedule your free consultation.
        </p>

        <div className="bg-red-50 rounded-xl p-6 mb-8">
          <p className="text-sm text-gray-700 mb-2">
            Need to speak with us right now?
          </p>
          <a
            href={`tel:${siteConfig.phoneRaw}`}
            className="inline-flex items-center gap-2 font-extrabold text-2xl md:text-3xl text-[#eb1c23] hover:text-[#c41018] transition-colors"
          >
            {siteConfig.phone}
          </a>
          <p className="text-xs text-gray-600 mt-3">
            24/7 emergency service. Family-owned. Serving 29+ Phoenix-area cities.
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[#004281] hover:text-[#002147] font-bold"
        >
          ← Back
        </Link>
      </div>
    </main>
  );
}
