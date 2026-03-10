import { siteConfig } from "@/lib/site-config";

export default function Footer() {
  return (
    <footer className="site-footer">
      {/* Geo-anchor bar */}
      <div className="bg-[#004281] py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-lg font-bold text-white mb-2">
            Serving {siteConfig.primaryCity} &amp; the Greater Phoenix Area
          </h3>
          <div className="divider-red !mx-0 !mt-2 !mb-4" />
          <p className="text-sm text-white/70 leading-relaxed max-w-4xl">
            {siteConfig.companyName} provides expert residential and commercial HVAC services to{" "}
            {siteConfig.serviceAreas.slice(0, 12).join(", ")}, and surrounding communities
            including {siteConfig.neighborhoods.slice(0, 8).join(", ")}.
          </p>
        </div>
      </div>

      {/* Main footer columns */}
      <div className="max-w-7xl mx-auto px-4 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Company info */}
        <div>
          <div className="mb-4">
            <span className="text-xl font-bold text-white">
              VIKING <span className="text-[#eb1c23]">HVAC</span>
            </span>
          </div>
          <p className="text-sm text-white/60 mb-3 italic">&ldquo;{siteConfig.tagline}&rdquo;</p>
          <p className="text-sm text-white/70">{siteConfig.address.street}</p>
          <p className="text-sm text-white/70">
            {siteConfig.address.city}, {siteConfig.address.stateAbbr} {siteConfig.address.zip}
          </p>
          <a
            href={`tel:${siteConfig.phoneRaw}`}
            className="phone-link text-lg mt-3 block"
          >
            {siteConfig.phone}
          </a>
          <p className="text-xs text-white/40 mt-1">24/7 Emergency Service</p>

          {/* Social icons */}
          <div className="flex gap-3 mt-4">
            <a href={siteConfig.sameAs[1]} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-8 h-8 rounded bg-white/10 flex items-center justify-center hover:bg-[#eb1c23] transition-colors">
              <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
            </a>
            <a href={siteConfig.sameAs[2]} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-8 h-8 rounded bg-white/10 flex items-center justify-center hover:bg-[#eb1c23] transition-colors">
              <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a href={siteConfig.sameAs[4]} target="_blank" rel="noopener noreferrer" aria-label="Yelp" className="w-8 h-8 rounded bg-white/10 flex items-center justify-center hover:bg-[#eb1c23] transition-colors">
              <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24"><path d="M20.16 12.594l-4.995 1.433c-.96.276-1.74-.8-1.176-1.63l2.905-4.308a1.072 1.072 0 011.596-.206 7.918 7.918 0 011.96 3.202c.237.726-.29 1.509-1.29 1.509zm-8.344 5.323c.07 1.001-.91 1.726-1.482 1.098a7.87 7.87 0 01-1.818-3.313c-.182-.74.465-1.412 1.124-1.164l4.402 1.652c.96.36.96 1.727-.226 1.727zM7.658 11.18c.96-.276 1.176-1.63.324-2.04L3.8 6.984a1.072 1.072 0 00-1.483.617 7.918 7.918 0 00.05 3.77c.237.726 1.11.946 1.87.67l3.421-.861zm.81-4.24L11.68 2.1c.5-.798-.11-1.83-1.01-1.56a7.87 7.87 0 00-3.5 2.1c-.488.6-.176 1.476.594 1.542l.704.058z"/></svg>
            </a>
          </div>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
            Our Services
          </h4>
          <div className="w-8 h-0.5 bg-[#eb1c23] mb-4" />
          <ul className="space-y-2.5">
            {siteConfig.services.slice(0, 8).map((service) => (
              <li key={service.slug}>
                <a
                  href={service.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm"
                >
                  {service.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Service Areas */}
        <div>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
            Service Areas
          </h4>
          <div className="w-8 h-0.5 bg-[#eb1c23] mb-4" />
          <ul className="space-y-2.5">
            {siteConfig.serviceAreas.slice(0, 10).map((area) => (
              <li key={area} className="text-sm text-white/70">
                {area}, AZ
              </li>
            ))}
            <li className="text-sm text-white/50 italic">
              + {siteConfig.serviceAreas.length - 10} more areas
            </li>
          </ul>
        </div>

        {/* Quick Links + CTA */}
        <div>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
            Quick Links
          </h4>
          <div className="w-8 h-0.5 bg-[#eb1c23] mb-4" />
          <ul className="space-y-2.5 mb-6">
            <li><a href={siteConfig.keyPages.about} target="_blank" rel="noopener noreferrer" className="text-sm">About Us</a></li>
            <li><a href={siteConfig.keyPages.contact} target="_blank" rel="noopener noreferrer" className="text-sm">Contact</a></li>
            <li><a href={siteConfig.keyPages.financing} target="_blank" rel="noopener noreferrer" className="text-sm">Financing</a></li>
            <li><a href={siteConfig.keyPages.pricing} target="_blank" rel="noopener noreferrer" className="text-sm">Pricing &amp; Coupons</a></li>
            <li><a href={siteConfig.keyPages.repairOrReplace} target="_blank" rel="noopener noreferrer" className="text-sm">Repair or Replace Guide</a></li>
            <li><Link href="/" className="text-sm">Blog Home</Link></li>
          </ul>

          <a
            href={siteConfig.keyPages.contact}
            className="cta-button text-sm block text-center"
            target="_blank"
            rel="noopener noreferrer"
          >
            Schedule Service
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col md:flex-row justify-between items-center text-xs text-white/40 gap-2">
          <p>&copy; {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.</p>
          <p>{siteConfig.license} | American Standard Authorized Dealer | Family-Owned Since {siteConfig.foundedYear}</p>
        </div>
      </div>
    </footer>
  );
}

// Need Link import for internal blog link
import Link from "next/link";
