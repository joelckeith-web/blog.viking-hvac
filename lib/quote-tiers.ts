/**
 * New-system sizing + monthly estimates for the quote funnel.
 *
 * Source: Mike (Viking) via Valerie, 2026-10-22. One approximate monthly
 * payment per system size on approved Synchrony credit. Mike's square-foot
 * ranges overlap, so each tier covers homes up to its range's top number —
 * the same cutoffs the Typeform endings use.
 */
export interface QuoteTier {
  /** Largest home (sq ft) this size covers. */
  maxSqft: number;
  /** System size in tons, as shown ("2.5"). */
  tons: string;
  /** Approximate monthly payment in USD. */
  monthly: number;
}

export const QUOTE_TIERS: readonly QuoteTier[] = [
  { maxSqft: 1000, tons: '2', monthly: 120 },
  { maxSqft: 1250, tons: '2.5', monthly: 122 },
  { maxSqft: 1500, tons: '3', monthly: 126 },
  { maxSqft: 1750, tons: '3.5', monthly: 138 },
  { maxSqft: 2000, tons: '4', monthly: 141 },
  { maxSqft: 2500, tons: '5', monthly: 147 },
];

/** Tier for a home size, or null above the chart (those get a custom quote). */
export function tierForSqft(sqft: number): QuoteTier | null {
  if (!Number.isFinite(sqft) || sqft <= 0) return null;
  return QUOTE_TIERS.find((t) => sqft <= t.maxSqft) ?? null;
}

export function tierForTons(tons: string | undefined): QuoteTier | null {
  return QUOTE_TIERS.find((t) => t.tons === tons) ?? null;
}

/** Approved financing disclaimer (Viking-approved marketing email, July 2026). */
export const FINANCING_DISCLAIMER =
  'Approximate monthly payments shown for illustration, on approved credit through our financing partner (Synchrony). Your actual payment depends on the system you choose, loan term, and credit approval.';
