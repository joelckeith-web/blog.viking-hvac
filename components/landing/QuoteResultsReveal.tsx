'use client';

import { useEffect, useRef, useState } from 'react';

interface QuoteResultsRevealProps {
  phone: string;
  phoneRaw: string;
  children: React.ReactNode;
}

/**
 * Scrolls the visitor down to their estimate a moment after the page loads,
 * then holds the estimate dimmed behind a Call Now prompt until they either
 * call or choose to see the numbers first.
 */
export function QuoteResultsReveal({ phone, phoneRaw, children }: QuoteResultsRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [overlay, setOverlay] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const t = window.setTimeout(() => {
      ref.current?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
      window.setTimeout(() => setOverlay(true), reduce ? 0 : 700);
    }, 1800);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <div id="results" ref={ref} className="relative scroll-mt-16">
      <div
        aria-hidden={overlay}
        className={`transition-[filter,opacity] duration-500 ${overlay ? 'grayscale opacity-40 pointer-events-none select-none' : ''}`}
      >
        {children}
      </div>

      {overlay && (
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <div
            role="dialog"
            aria-modal="false"
            aria-labelledby="call-now-title"
            className="w-full max-w-lg rounded-2xl bg-white text-[#152350] text-center shadow-[0_24px_60px_rgba(2,23,53,0.35)] border-[3px] border-[#E1243B] p-8 sm:p-10"
          >
            <p className="text-sm font-extrabold text-[#EB2127] mb-2">YOUR ESTIMATE IS READY</p>
            <h2 id="call-now-title" className="text-3xl sm:text-4xl font-black leading-tight mb-3">
              Talk to a Viking specialist now
            </h2>
            <p className="text-base leading-relaxed mb-7">
              We&apos;ll confirm the right size for your home, walk you through your options and answer any questions.
            </p>
            <a
              href={`tel:${phoneRaw}`}
              className="flex items-center justify-center gap-3 rounded-full bg-[#E1243B] hover:bg-[#B81C30] transition-colors min-h-14 px-6 text-lg sm:text-xl font-black text-white shadow-[0_10px_24px_rgba(225,36,59,0.35)]"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
              </svg>
              Call Now · {phone}
            </a>
            <button
              type="button"
              onClick={() => setOverlay(false)}
              className="mt-5 text-sm font-bold text-[#152350] underline underline-offset-4 hover:text-[#E1243B]"
            >
              See my estimate first
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
