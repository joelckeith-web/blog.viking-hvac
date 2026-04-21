'use client';

import { Suspense, useState } from 'react';
import { useForm } from 'react-hook-form';
import { siteConfig } from '@/lib/site-config';
import { useAttribution } from '@/lib/useAttribution';
import { RecaptchaWidget } from '@/components/forms/RecaptchaWidget';
import { HCPFormEmbed } from '@/components/landing/HCPFormEmbed';

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

interface LandingFormData {
  name: string;
  phone: string;
  email: string;
  address: string;
  zipCode: string;
  message: string;
  marketingConsent: boolean;
  _hp?: string; // honeypot — must be empty
}

interface LandingFormProps {
  /** Pre-selected service context shown above the form. */
  serviceLabel: string;
  /** Placeholder text for the message field. */
  messagePlaceholder?: string;
  /** Hidden field value sent with form submission. */
  leadSource: string;
}

/**
 * Top-level lead form for landing pages.
 *
 * Provider switch (controlled by env vars, no code change required when the
 * client switches to Housecall Pro):
 *
 *   • NEXT_PUBLIC_HCP_FORM_URL set  → renders the HCP booking iframe; leads
 *     flow directly into Housecall Pro and skip our SMTP path entirely.
 *   • NEXT_PUBLIC_HCP_FORM_URL unset → renders the SMTP-backed React form
 *     (current default for Viking HVAC) which POSTs to /api/lp-lead.
 */
export function LandingForm(props: LandingFormProps) {
  const hcpUrl = process.env.NEXT_PUBLIC_HCP_FORM_URL;

  if (hcpUrl) {
    return <HCPFormEmbed src={hcpUrl} serviceLabel={props.serviceLabel} />;
  }

  return (
    <Suspense>
      <SmtpLandingFormInner {...props} />
    </Suspense>
  );
}

function SmtpLandingFormInner({
  serviceLabel,
  messagePlaceholder = 'Briefly describe your situation (optional)',
  leadSource,
}: LandingFormProps) {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [recaptchaError, setRecaptchaError] = useState<string | null>(null);
  const attribution = useAttribution();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LandingFormData>({
    defaultValues: { marketingConsent: true },
  });

  const onSubmit = async (data: LandingFormData) => {
    setSubmitError(null);
    setRecaptchaError(null);

    if (!recaptchaToken) {
      setRecaptchaError(
        'Please complete the CAPTCHA challenge before submitting.'
      );
      return;
    }

    try {
      const res = await fetch('/api/lp-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          service: serviceLabel,
          leadSource,
          recaptchaToken,
          // Campaign parameters
          utmSource: attribution.utm_source,
          utmMedium: attribution.utm_medium,
          utmCampaign: attribution.utm_campaign,
          utmTerm: attribution.utm_term,
          utmContent: attribution.utm_content,
          // Ad-platform click IDs (for Ads / Meta / etc. conversion attribution)
          gclid: attribution.gclid,
          gbraid: attribution.gbraid,
          wbraid: attribution.wbraid,
          fbclid: attribution.fbclid,
          msclkid: attribution.msclkid,
          liFatId: attribution.li_fat_id,
          ttclid: attribution.ttclid,
          // First-touch context
          landingPage: attribution.landing_page,
          referrer: attribution.referrer,
          firstTouchTs: attribution.first_touch_ts,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to submit form');
      }

      // Push form_submission event to GTM dataLayer for conversion tracking.
      window.dataLayer?.push({
        event: 'form_submission',
        form_name: leadSource,
        form_service: serviceLabel,
      });

      // Redirect to the in-repo thank-you page (stays on lp.viking-hvac.com).
      // Conversion tags for Google Ads / Meta must fire on /lp/thank-you.
      window.location.href = '/lp/thank-you';
    } catch {
      setSubmitError(
        'Something went wrong. Please try again or call us directly.'
      );
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="bg-[#004281] px-6 py-4 text-center">
        <p className="text-white font-bold text-lg">
          Get Your Free {serviceLabel} Quote
        </p>
        <p className="text-white/80 text-sm mt-1">
          No obligation. Fast response.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
        <input type="hidden" value={leadSource} name="leadSource" />

        {/* Attribution hidden fields — populated on mount by useAttribution.
            These mirror what we POST in the JSON body so the data is visible
            in the rendered DOM as well (useful for GTM, diagnostics, and
            any server-side form scrapers). */}
        <input type="hidden" name="utm_source"    value={attribution.utm_source    ?? ''} readOnly />
        <input type="hidden" name="utm_medium"    value={attribution.utm_medium    ?? ''} readOnly />
        <input type="hidden" name="utm_campaign"  value={attribution.utm_campaign  ?? ''} readOnly />
        <input type="hidden" name="utm_term"      value={attribution.utm_term      ?? ''} readOnly />
        <input type="hidden" name="utm_content"   value={attribution.utm_content   ?? ''} readOnly />
        <input type="hidden" name="gclid"         value={attribution.gclid         ?? ''} readOnly />
        <input type="hidden" name="gbraid"        value={attribution.gbraid        ?? ''} readOnly />
        <input type="hidden" name="wbraid"        value={attribution.wbraid        ?? ''} readOnly />
        <input type="hidden" name="fbclid"        value={attribution.fbclid        ?? ''} readOnly />
        <input type="hidden" name="msclkid"       value={attribution.msclkid       ?? ''} readOnly />
        <input type="hidden" name="li_fat_id"     value={attribution.li_fat_id     ?? ''} readOnly />
        <input type="hidden" name="ttclid"        value={attribution.ttclid        ?? ''} readOnly />
        <input type="hidden" name="landing_page"  value={attribution.landing_page  ?? ''} readOnly />
        <input type="hidden" name="referrer"      value={attribution.referrer      ?? ''} readOnly />
        <input type="hidden" name="first_touch_ts" value={attribution.first_touch_ts ?? ''} readOnly />

        {/* Honeypot — bots fill it, humans don't see it */}
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register('_hp')}
          className="hidden"
          aria-hidden="true"
        />

        <div>
          <input
            type="text"
            {...register('name', { required: 'Name is required' })}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-base text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#eb1c23] focus:border-transparent placeholder:text-gray-400"
            placeholder="Full Name *"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <input
            type="tel"
            {...register('phone', { required: 'Phone is required' })}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-base text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#eb1c23] focus:border-transparent placeholder:text-gray-400"
            placeholder="Phone Number *"
          />
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <input
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Enter a valid email',
              },
            })}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-base text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#eb1c23] focus:border-transparent placeholder:text-gray-400"
            placeholder="Email Address *"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            {...register('address', { required: 'Service address is required' })}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-base text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#eb1c23] focus:border-transparent placeholder:text-gray-400"
            placeholder="Service Address *"
            autoComplete="street-address"
          />
          {errors.address && (
            <p className="text-red-500 text-xs mt-1">
              {errors.address.message}
            </p>
          )}
        </div>

        <div>
          <input
            type="text"
            {...register('zipCode', { required: 'ZIP code is required' })}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-base text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#eb1c23] focus:border-transparent placeholder:text-gray-400"
            placeholder="ZIP Code *"
            autoComplete="postal-code"
            inputMode="numeric"
          />
          {errors.zipCode && (
            <p className="text-red-500 text-xs mt-1">
              {errors.zipCode.message}
            </p>
          )}
        </div>

        <div>
          <textarea
            rows={3}
            {...register('message')}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-base text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#eb1c23] focus:border-transparent resize-none placeholder:text-gray-400"
            placeholder={messagePlaceholder}
          />
        </div>

        {/* Marketing consent — pre-checked and required (TCPA) */}
        <div>
          <label className="flex items-start gap-2 cursor-pointer">
            <input
              type="checkbox"
              {...register('marketingConsent', {
                validate: (v) =>
                  v === true ||
                  'You must agree to our marketing terms to submit.',
              })}
              className="mt-0.5 h-4 w-4 shrink-0 rounded border-gray-300 accent-[#eb1c23] cursor-pointer"
            />
            <span className="text-[11px] text-gray-600 leading-snug">
              <strong className="text-[#002147]">Yes, keep me updated</strong> — I
              agree to receive marketing emails and texts from {siteConfig.shortName}.
              Msg &amp; data rates may apply; reply STOP to opt out.
            </span>
          </label>
          {errors.marketingConsent && (
            <p className="text-red-500 text-xs mt-1">
              {errors.marketingConsent.message}
            </p>
          )}
        </div>

        {/* Google reCAPTCHA v2 checkbox */}
        <div>
          <RecaptchaWidget
            theme="light"
            onVerify={(token) => {
              setRecaptchaToken(token);
              setRecaptchaError(null);
            }}
            onError={() => {
              setRecaptchaToken(null);
              setRecaptchaError(
                'CAPTCHA failed. Please complete the challenge again.'
              );
            }}
          />
          {recaptchaError && (
            <p className="text-red-500 text-xs mt-1">{recaptchaError}</p>
          )}
        </div>

        {submitError && (
          <p className="text-red-600 text-sm text-center">{submitError}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#eb1c23] hover:bg-[#c41018] text-white font-bold py-4 px-6 rounded-lg text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Sending…' : 'Get My Free Quote'}
        </button>

        <p className="text-xs text-gray-500 text-center pt-1">
          🔒 No spam. Your info is private.
        </p>

        <a
          href={`tel:${siteConfig.phoneRaw}`}
          className="flex items-center justify-center gap-2 text-gray-600 hover:text-[#eb1c23] text-sm pt-2 border-t border-gray-100"
        >
          Or call {siteConfig.phone}
        </a>
      </form>
    </div>
  );
}
