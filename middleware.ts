import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const LP_PRIMARY_SLUG = '/ac-repair';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const { pathname } = request.nextUrl;

  // ── careers.viking-hvac.com ─────────────────────────────────
  if (hostname.startsWith('careers.')) {
    if (pathname === '/') {
      return NextResponse.rewrite(new URL('/careers', request.url));
    }
    if (pathname === '/thank-you') {
      return NextResponse.rewrite(new URL('/careers/thank-you', request.url));
    }
    if (pathname.startsWith('/api/')) {
      return NextResponse.next();
    }
    if (pathname.startsWith('/blog') || pathname.startsWith('/lp') || pathname === '/sitemap.xml') {
      return NextResponse.rewrite(new URL('/careers', request.url));
    }
    return NextResponse.next();
  }

  // ── lp.viking-hvac.com ──────────────────────────────────────
  if (hostname.startsWith('lp.')) {
    if (pathname.startsWith('/api/')) {
      return NextResponse.next();
    }
    // Static asset / Next internals already excluded by matcher.
    if (pathname.startsWith('/blog') || pathname.startsWith('/careers')) {
      return NextResponse.redirect(new URL(LP_PRIMARY_SLUG, request.url));
    }
    if (pathname === '/') {
      return NextResponse.rewrite(new URL(`/lp${LP_PRIMARY_SLUG}`, request.url));
    }
    // Already prefixed (rare — direct hit) → pass through.
    if (pathname.startsWith('/lp/') || pathname === '/lp') {
      return NextResponse.next();
    }
    // Strip-prefix rewrite: lp.viking-hvac.com/ac-repair → /lp/ac-repair internally.
    return NextResponse.rewrite(new URL(`/lp${pathname}`, request.url));
  }

  // ── Default (blog.viking-hvac.com / www / apex) ────────────
  // Block /lp/* on non-lp subdomains so internal routes don't leak to SEO.
  if (pathname.startsWith('/lp/') || pathname === '/lp') {
    return NextResponse.rewrite(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|images/).*)'],
};
