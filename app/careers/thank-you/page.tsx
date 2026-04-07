import type { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Application Received — Viking HVAC Careers',
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  return (
    <div className="min-h-screen bg-[var(--color-brand-dark)] flex items-center justify-center px-4">
      {/* Meta Pixel Lead Event */}
      {pixelId && (
        <Script id="meta-pixel-lead" strategy="afterInteractive">
          {`
            if (typeof fbq === 'function') {
              fbq('track', 'Lead');
            }
          `}
        </Script>
      )}

      <div className="max-w-lg mx-auto text-center">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-brand-dark)] mb-3">
            Application Received!
          </h1>

          <p className="text-gray-600 mb-6 leading-relaxed">
            Thank you for your interest in joining the Viking HVAC team. We&apos;ll review your application and reach out within 48 hours.
          </p>

          <div className="bg-gray-50 rounded-xl p-5 mb-6">
            <p className="text-sm font-semibold text-[var(--color-brand-dark)] mb-2">Questions in the meantime?</p>
            <p className="text-sm text-gray-600">
              Call us at{' '}
              <a href="tel:4806895167" className="text-[var(--color-brand-accent)] font-semibold hover:underline">
                (480) 689-5167
              </a>
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Viking Heating and Air Conditioning<br />
              3225 N Arizona Ave, Suite C-12, Chandler, AZ 85225
            </p>
          </div>

          <a
            href="https://www.viking-hvac.com"
            className="text-[var(--color-brand-dark)] font-medium text-sm hover:underline"
          >
            Visit viking-hvac.com &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}
