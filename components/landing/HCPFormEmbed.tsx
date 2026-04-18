'use client';

import { useEffect, useRef } from 'react';

interface HCPFormEmbedProps {
  /** The Housecall Pro public booking URL or embed src. */
  src: string;
  /** Optional iframe height (px). */
  height?: number;
  /** Heading shown above the embed. */
  serviceLabel: string;
}

/**
 * Housecall Pro booking widget embed.
 *
 * When NEXT_PUBLIC_HCP_FORM_URL is set, LandingForm renders this in place of
 * the SMTP-backed form. HCP captures the lead directly in the client's HCP
 * account so jobs auto-attribute to the LP source.
 *
 * Two embed shapes are supported via the `src` value:
 *   1) Full booking URL (https://book.housecallpro.com/book/...) — rendered
 *      as an iframe.
 *   2) HCP "Online Booking" script tag URL — falls back to iframe rendering
 *      since most HCP customers expose the iframe URL directly.
 */
export function HCPFormEmbed({
  src,
  height = 720,
  serviceLabel,
}: HCPFormEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Reserved for future: load HCP's official booking SDK script if Joel prefers
  // their drop-in widget to a raw iframe. Today HCP supports both — iframe is
  // the simpler integration and works inside our LP layout without conflict.
  useEffect(() => {
    // No-op for now; here for forward compatibility.
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="bg-[#004281] px-6 py-4 text-center">
        <p className="text-white font-bold text-lg">
          Book Your Free {serviceLabel} Estimate
        </p>
        <p className="text-white/80 text-sm mt-1">
          Pick a time that works for you. Powered by Housecall Pro.
        </p>
      </div>
      <div ref={containerRef} className="bg-white">
        <iframe
          src={src}
          width="100%"
          height={height}
          frameBorder={0}
          title={`${serviceLabel} — Book Online`}
          className="block w-full"
          allow="payment"
        />
      </div>
    </div>
  );
}
