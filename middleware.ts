import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const { pathname } = request.nextUrl;

  // careers.viking-hvac.com → serve /careers content at root
  if (hostname.startsWith('careers.')) {
    // Root of careers subdomain → rewrite to /careers page
    if (pathname === '/') {
      return NextResponse.rewrite(new URL('/careers', request.url));
    }

    // /thank-you on careers subdomain → rewrite to /careers/thank-you
    if (pathname === '/thank-you') {
      return NextResponse.rewrite(new URL('/careers/thank-you', request.url));
    }

    // API routes should pass through as-is
    if (pathname.startsWith('/api/')) {
      return NextResponse.next();
    }

    // Block access to blog content from careers subdomain
    if (pathname.startsWith('/blog') || pathname === '/sitemap.xml') {
      return NextResponse.rewrite(new URL('/careers', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|images/).*)'],
};
