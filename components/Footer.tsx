import { siteConfig } from "@/lib/site-config";

export default function Footer() {
  return (
    <footer className="bg-[var(--color-dark)] text-white">
      {/* Geo Footer */}
      <div className="bg-[var(--color-primary)] py-6">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-lg font-semibold mb-3">
            Proudly Serving {siteConfig.primaryCity} &amp; the Phoenix East Valley
          </h3>
          <p className="text-sm text-white/80 leading-relaxed">
            {siteConfig.companyName} provides expert HVAC services to homeowners and businesses in{" "}
            {siteConfig.serviceAreas.join(", ")}, and surrounding communities including{" "}
            {siteConfig.neighborhoods.join(", ")}.
          </p>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Company Info */}
        <div>
          <h4 className="text-lg font-bold mb-4 text-[var(--color-secondary)]">
            {siteConfig.shortName}
          </h4>
          <p className="text-sm text-white/70 mb-2">{siteConfig.tagline}</p>
          <p className="text-sm text-white/70">{siteConfig.address.street}</p>
          <p className="text-sm text-white/70">
            {siteConfig.address.city}, {siteConfig.address.stateAbbr} {siteConfig.address.zip}
          </p>
          <a
            href={`tel:${siteConfig.phoneRaw}`}
            className="text-[var(--color-secondary)] font-bold text-lg mt-2 block"
          >
            {siteConfig.phone}
          </a>
          <p className="text-sm text-white/50 mt-1">24/7 Emergency Service Available</p>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-lg font-bold mb-4 text-[var(--color-secondary)]">Our Services</h4>
          <ul className="space-y-2">
            {siteConfig.services.slice(0, 8).map((service) => (
              <li key={service.slug}>
                <a
                  href={service.url}
                  className="text-sm text-white/70 hover:text-[var(--color-secondary)]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {service.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Service Areas */}
        <div>
          <h4 className="text-lg font-bold mb-4 text-[var(--color-secondary)]">Service Areas</h4>
          <ul className="space-y-2">
            {siteConfig.serviceAreas.map((area) => (
              <li key={area} className="text-sm text-white/70">
                {area}, AZ
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 py-4">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm text-white/50">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.
          </p>
          <p className="mt-2 md:mt-0">{siteConfig.license} | American Standard Authorized Dealer</p>
        </div>
      </div>
    </footer>
  );
}
