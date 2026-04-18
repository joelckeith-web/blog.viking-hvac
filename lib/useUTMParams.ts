'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

const UTM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
] as const;

const STORAGE_KEY = 'viking_utm_params';

export interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

/**
 * Captures Google Ads / UTM parameters from the landing URL and persists them
 * in sessionStorage so values survive client-side navigation (e.g. the form
 * submit redirect to /thank-you).
 */
export function useUTMParams(): UTMParams {
  const searchParams = useSearchParams();
  const [utmParams, setUtmParams] = useState<UTMParams>({});

  useEffect(() => {
    const params: UTMParams = {};
    let hasNewParams = false;

    for (const key of UTM_KEYS) {
      const value = searchParams.get(key);
      if (value) {
        params[key] = value;
        hasNewParams = true;
      }
    }

    if (hasNewParams) {
      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(params));
      } catch {}
      setUtmParams(params);
      return;
    }

    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) {
        setUtmParams(JSON.parse(stored));
      }
    } catch {}
  }, [searchParams]);

  return utmParams;
}
