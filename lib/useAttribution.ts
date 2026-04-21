'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

/**
 * Attribution parameters captured from the landing URL.
 *
 * Click IDs (gclid / fbclid / etc.) are emitted by ad platforms on the final
 * destination URL and are required to tie a conversion back to the exact ad,
 * campaign, and creative. UTM parameters cover the campaign-level breakdown
 * we configure ourselves. `landing_page` and `referrer` round out the first-
 * touch picture for any non-paid traffic that doesn't carry a click ID.
 *
 * First-touch wins: once a visitor arrives with attribution, we persist the
 * record in localStorage for 90 days so that if they browse to other pages
 * (or come back later) before converting, the original source is what flows
 * into the lead email — not whatever they clicked on last.
 */

const UTM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
] as const;

const CLICK_ID_KEYS = [
  'gclid',   // Google Ads
  'gbraid',  // Google Ads iOS campaigns (no IDFA)
  'wbraid',  // Google Ads web-to-app
  'fbclid',  // Meta (Facebook + Instagram)
  'msclkid', // Microsoft Ads
  'li_fat_id', // LinkedIn
  'ttclid',  // TikTok
] as const;

const STORAGE_KEY = 'viking_attribution';
const TTL_DAYS = 90;

export interface AttributionParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
  fbclid?: string;
  msclkid?: string;
  li_fat_id?: string;
  ttclid?: string;
  landing_page?: string;
  referrer?: string;
  first_touch_ts?: string;
}

interface StoredRecord extends AttributionParams {
  _savedAt: number;
}

function isExpired(savedAt: number): boolean {
  return Date.now() - savedAt > TTL_DAYS * 24 * 60 * 60 * 1000;
}

function readStored(): StoredRecord | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredRecord;
    if (!parsed?._savedAt || isExpired(parsed._savedAt)) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function stripInternal(record: StoredRecord): AttributionParams {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _savedAt, ...rest } = record;
  return rest;
}

/**
 * Captures UTM tags, ad-platform click IDs, referrer, and landing page from
 * the URL on first touch and persists them in localStorage (90-day TTL).
 * Returns the current first-touch attribution record for the visitor.
 *
 * If the visitor arrives fresh with new tracking params, those become the
 * first-touch record. Subsequent visits without params read from storage so
 * a lead that converts on a later session still carries original attribution.
 */
export function useAttribution(): AttributionParams {
  const searchParams = useSearchParams();
  const [attribution, setAttribution] = useState<AttributionParams>({});

  useEffect(() => {
    const fresh: AttributionParams = {};
    let hasAnyParam = false;

    for (const key of UTM_KEYS) {
      const value = searchParams.get(key);
      if (value) {
        fresh[key] = value;
        hasAnyParam = true;
      }
    }

    for (const key of CLICK_ID_KEYS) {
      const value = searchParams.get(key);
      if (value) {
        fresh[key] = value;
        hasAnyParam = true;
      }
    }

    const existing = readStored();

    if (hasAnyParam) {
      // First-touch wins: only persist fresh attribution if nothing valid
      // exists yet. If a record already exists, keep it and surface the
      // stored values (not the URL's) to the caller.
      if (!existing) {
        const record: StoredRecord = {
          ...fresh,
          landing_page:
            typeof window !== 'undefined' ? window.location.href : undefined,
          referrer:
            typeof document !== 'undefined' ? document.referrer : undefined,
          first_touch_ts: new Date().toISOString(),
          _savedAt: Date.now(),
        };
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
        } catch {}
        setAttribution(stripInternal(record));
        return;
      }
      setAttribution(stripInternal(existing));
      return;
    }

    // No URL params — use existing stored record or capture a minimal
    // direct/organic first-touch record so we at least know the landing page.
    if (existing) {
      setAttribution(stripInternal(existing));
      return;
    }

    if (typeof window !== 'undefined') {
      const record: StoredRecord = {
        landing_page: window.location.href,
        referrer: document.referrer || undefined,
        first_touch_ts: new Date().toISOString(),
        _savedAt: Date.now(),
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
      } catch {}
      setAttribution(stripInternal(record));
    }
  }, [searchParams]);

  return attribution;
}
