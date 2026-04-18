import type { Metadata } from 'next';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Free Quote — Viking Heating and Air Conditioning',
  description:
    'Get a fast, free HVAC quote from Viking Heating and Air Conditioning — Chandler, AZ. Family-owned. 240+ 5-star reviews. 24/7 emergency service.',
  metadataBase: new URL('https://lp.viking-hvac.com'),
  alternates: { canonical: '/' },
  robots: { index: false, follow: false },
};

export default function LandingPagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentYear = new Date().getFullYear();

  return (
    <>
      {children}

      <footer className="bg-[#001530] text-white border-t border-white/10">
        <div className="max-w-5xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-gray-400 text-xs">
            &copy; {currentYear} {siteConfig.legalName}. All rights reserved. {siteConfig.license}
          </p>
          <nav className="flex flex-wrap items-center justify-center gap-4 text-xs">
            <a
              href={`${siteConfig.mainSiteUrl}/privacy-policy`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href={`${siteConfig.mainSiteUrl}/terms-of-service`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Terms of Service
            </a>
            <a
              href={siteConfig.mainSiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Visit {siteConfig.shortName}
            </a>
          </nav>
        </div>
      </footer>
    </>
  );
}
