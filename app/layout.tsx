import type { Metadata } from "next";
import "@/styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SchemaMarkup from "@/components/SchemaMarkup";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.shortName} Blog | HVAC Tips for ${siteConfig.primaryCity} & the East Valley`,
    template: `%s | ${siteConfig.shortName} Blog`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.blogUrl),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.blogUrl,
    siteName: `${siteConfig.shortName} Blog`,
    title: `${siteConfig.shortName} Blog`,
    description: siteConfig.description,
  },
  alternates: {
    canonical: siteConfig.blogUrl,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <SchemaMarkup pageType="home" />
      </head>
      <body className="bg-[var(--color-light)] min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
