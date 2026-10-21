'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { siteConfig } from '@/lib/site-config';

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    dataLayer?: Record<string, unknown>[];
    vikingTypeformSubmit?: (event: { responseId?: string }) => void;
  }
}

interface TypeformEmbedProps {
  /** Typeform form ID (the part after /to/ in the share link). */
  formId: string;
  /** Name sent with the Meta Lead event so these leads can be told apart. */
  leadName: string;
  /** Widget height (px). */
  height?: number;
}

/**
 * Typeform widget embed that reports submissions to the Meta Pixel.
 *
 * Typeform's own pixel integration and redirect endings are paid-plan
 * features, so the Lead event is fired here from the embed SDK's onSubmit
 * callback instead. The pixel itself is loaded site-wide in app/layout.tsx.
 *
 * Sandbox mode (submissions are not saved by Typeform) is on everywhere
 * except production, and on production with ?test=1, so test runs never
 * land in Viking's responses.
 */
export function TypeformEmbed({ formId, leadName, height = 620 }: TypeformEmbedProps) {
  const [submitted, setSubmitted] = useState(false);
  // Decided after mount (needs the query string); the widget and the embed
  // script render only once it is set, so the script never sees a stale div.
  const [sandbox, setSandbox] = useState<boolean | null>(null);

  useEffect(() => {
    const isSandbox =
      process.env.NEXT_PUBLIC_VERCEL_ENV !== 'production' ||
      new URLSearchParams(window.location.search).get('test') === '1';
    setSandbox(isSandbox);

    window.vikingTypeformSubmit = ({ responseId }) => {
      if (typeof window.fbq === 'function') {
        // Test runs send a custom event so they prove the pixel path without
        // counting as a Lead in Viking's ad results.
        if (isSandbox) {
          window.fbq('trackCustom', 'TypeformTestSubmit', { content_name: leadName });
        } else {
          window.fbq(
            'track',
            'Lead',
            { content_name: leadName },
            responseId ? { eventID: responseId } : undefined
          );
        }
      }
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: isSandbox ? 'typeform_test_submit' : 'typeform_submit', form_id: formId });
      setSubmitted(true);
    };

    return () => {
      delete window.vikingTypeformSubmit;
    };
  }, [formId, leadName]);

  if (submitted) {
    return (
      // Distinct keys: Typeform injects its iframe into the widget div, which
      // React doesn't track, so the form tree must be torn down, not reused.
      <div key="thanks" className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
          <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#002147] mb-4">
          Quote Request Received!
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-8">
          Thanks for reaching out. A {siteConfig.shortName} specialist will contact you shortly to confirm your details.
        </p>
        <div className="bg-red-50 rounded-xl p-6">
          <p className="text-sm text-gray-700 mb-2">Need to speak with us right now?</p>
          <a
            href={`tel:${siteConfig.phoneRaw}`}
            className="inline-flex items-center gap-2 font-extrabold text-2xl md:text-3xl text-[#eb1c23] hover:text-[#c41018] transition-colors"
          >
            {siteConfig.phone}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div key="form" className="bg-white rounded-2xl shadow-xl overflow-hidden">
      {sandbox !== null && (
        <>
          <div
            data-tf-widget={formId}
            data-tf-on-submit="vikingTypeformSubmit"
            data-tf-opacity="100"
            data-tf-inline-on-mobile
            data-tf-iframe-props={`title=${siteConfig.shortName} Quote Request`}
            data-tf-medium="snippet"
            {...(sandbox ? { 'data-tf-enable-sandbox': true } : {})}
            style={{ width: '100%', height }}
          />
          <Script src="https://embed.typeform.com/next/embed.js" strategy="afterInteractive" />
        </>
      )}
    </div>
  );
}
