import Script from 'next/script';

/**
 * Google Tag Manager head + noscript pair.
 *
 * Reads NEXT_PUBLIC_GTM_ID at build time. If the env var is missing or still
 * set to a placeholder, GTM is silently skipped so dev/preview builds don't
 * ship a broken container reference.
 *
 * Place <GoogleTagManagerHead /> inside <head> and
 * <GoogleTagManagerNoScript /> as the first element inside <body>.
 */

function isValidGtmId(value: string | undefined): value is string {
  return Boolean(value) && !value!.startsWith('[') && value !== 'GTM-XXXXXXX';
}

export function GoogleTagManagerHead() {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  if (!isValidGtmId(gtmId)) return null;

  return (
    <Script
      id="gtm-head"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');
        `.trim(),
      }}
    />
  );
}

export function GoogleTagManagerNoScript() {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  if (!isValidGtmId(gtmId)) return null;

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
      />
    </noscript>
  );
}
