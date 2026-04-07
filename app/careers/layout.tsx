import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Careers at Viking HVAC | Now Hiring HVAC Technicians in Phoenix, AZ',
  description:
    'Join the Viking HVAC team in Chandler, AZ. Now hiring Senior HVAC Service Technicians — $75K-$200K/year, take-home truck, full benefits, year-round work. Apply today.',
  openGraph: {
    title: 'Now Hiring HVAC Technicians — Viking HVAC',
    description:
      'Top performers earn $100K+. Take-home truck, full benefits, career growth. Family-owned, high-performance team in the East Valley.',
    type: 'website',
    url: 'https://blog.viking-hvac.com/careers',
    siteName: 'Viking Heating and Air Conditioning',
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
