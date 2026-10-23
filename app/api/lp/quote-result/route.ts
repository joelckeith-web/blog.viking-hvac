import { NextRequest, NextResponse } from 'next/server';
import { HOME_SIZE_TONS, SYSTEM_CATEGORIES, tierForSqft } from '@/lib/quote-tiers';

// Looks up one Typeform response and says which results page it gets.
// The Typeform plan can't redirect on completion, so the embed sends us the
// response id on submit and we route from the answers here.

const FORM_ID = 'F95ggz7H';
const FIELD_SERVICE = 'e14651f1-9870-47c5-84cb-ae8d538b7372';
const CHOICE_NEW_SYSTEM = '4aa58116-d1e6-46a6-8c64-457b9afa924e';
const FIELD_PROPERTY = '6b9dcbf0-de1b-4986-ab71-bc57d95b03ba';
const CHOICE_RESIDENTIAL = 'c5930bef-ae8b-4c00-bca1-ea0d2b0bbfbb';
const FIELD_SYSTEM = 'viking-system-type';
const FIELD_HOME_SIZE = 'viking-home-size';
const FIELD_TERMS = 'viking-terms';
const CHOICE_ACCEPT = 'terms-accept';
// Square-foot number question from the form version before the terms gate.
const FIELD_SQFT_LEGACY = 'b4d39411-dfd8-4164-a9ec-a05a71fe304a';

interface TypeformAnswer {
  field: { ref: string };
  choice?: { ref?: string };
  number?: number;
}

async function fetchResponse(responseId: string, token: string) {
  const url = `https://api.typeform.com/forms/${FORM_ID}/responses?included_response_ids=${encodeURIComponent(responseId)}`;
  // Responses can take a few seconds to become readable after submit.
  for (let attempt = 0; attempt < 6; attempt++) {
    const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` }, cache: 'no-store' });
    if (res.ok) {
      const data = (await res.json()) as { items?: { answers?: TypeformAnswer[] }[] };
      const item = data.items?.[0];
      if (item) return item;
    } else if (res.status !== 404) {
      return null;
    }
    await new Promise((r) => setTimeout(r, 1000));
  }
  return null;
}

export async function GET(request: NextRequest) {
  const responseId = request.nextUrl.searchParams.get('rid') ?? '';
  if (!/^[A-Za-z0-9]{6,64}$/.test(responseId)) {
    return NextResponse.json({ error: 'bad response id' }, { status: 400 });
  }
  const token = process.env.TYPEFORM_TOKEN;
  if (!token) {
    return NextResponse.json({ error: 'not configured' }, { status: 503 });
  }

  const item = await fetchResponse(responseId, token);
  if (!item) {
    return NextResponse.json({ results: false });
  }

  const answers = item.answers ?? [];
  const byRef = (ref: string) => answers.find((a) => a.field.ref === ref);
  const isNewSystem = byRef(FIELD_SERVICE)?.choice?.ref === CHOICE_NEW_SYSTEM;
  const isResidential = byRef(FIELD_PROPERTY)?.choice?.ref === CHOICE_RESIDENTIAL;
  if (!isNewSystem || !isResidential) {
    return NextResponse.json({ results: false });
  }

  const terms = byRef(FIELD_TERMS);
  if (terms) {
    // Current form: pricing only after "I accept".
    if (terms.choice?.ref !== CHOICE_ACCEPT) return NextResponse.json({ results: false });
    const sizeRef = byRef(FIELD_HOME_SIZE)?.choice?.ref ?? '';
    const systemRef = byRef(FIELD_SYSTEM)?.choice?.ref ?? '';
    return NextResponse.json({
      results: true,
      size: HOME_SIZE_TONS[sizeRef] ?? null,
      category: SYSTEM_CATEGORIES[systemRef]?.slug ?? null,
    });
  }

  // Earlier form version (no terms gate): route on the typed square footage.
  const tier = tierForSqft(byRef(FIELD_SQFT_LEGACY)?.number ?? 0);
  return NextResponse.json({ results: !!tier, size: tier?.tons ?? null, category: null });
}
