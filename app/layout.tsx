import type { Metadata } from "next";
import Script from "next/script";
import { headers } from "next/headers";
import "@/styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LocalBusinessSchema, WebSiteSchema } from "@/components/SchemaMarkup";
import {
  GoogleTagManagerHead,
  GoogleTagManagerNoScript,
} from "@/components/global/GoogleTagManager";
import { siteConfig } from "@/lib/site-config";

const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

export const metadata: Metadata = {
  title: {
    default: `Blog | ${siteConfig.shortName}`,
    template: `%s | ${siteConfig.shortName} Blog`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.blogUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.blogUrl,
    siteName: `${siteConfig.shortName} Blog`,
    title: `Blog | ${siteConfig.shortName}`,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const h = await headers();
  const host = h.get("host") || "";
  const isLp = host.startsWith("lp.");

  return (
    <html lang="en">
      <head>
        <LocalBusinessSchema />
        <WebSiteSchema />
        {isLp && <GoogleTagManagerHead />}
        {!isLp && META_PIXEL_ID && (
          <Script id="meta-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${META_PIXEL_ID}');
              fbq('track', 'PageView');
            `}
          </Script>
        )}
        {!isLp && META_PIXEL_ID && (
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: 'none' }}
              src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
        )}
      </head>
      <body className="min-h-screen flex flex-col">
        {isLp && <GoogleTagManagerNoScript />}
        {!isLp && <Header />}
        <main className="flex-1">{children}</main>
        {!isLp && <Footer />}
      </body>
    </html>
  );
}
