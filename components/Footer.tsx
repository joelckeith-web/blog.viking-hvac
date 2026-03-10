import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export default function Footer() {
  return (
    <footer className="site-footer">
      {/* Geo bar */}
      <div className="bg-[#004281] py-5">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-sm font-bold text-white mb-1">
            Serving {siteConfig.primaryCity} &amp; the Greater Phoenix Area
          </h3>
          <p className="text-xs text-white/50 leading-relaxed">
            {siteConfig.companyName} provides expert HVAC services to{" "}
            {siteConfig.serviceAreas.slice(0, 10).join(", ")}, and surrounding communities.
          </p>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <span className="text-lg font-bold text-white">
            VIKING <span className="text-[#eb1c23]">HVAC</span>
          </span>
          <p className="text-xs text-white/50 mt-1 italic">&ldquo;{siteConfig.tagline}&rdquo;</p>
          <div className="mt-3 text-sm text-white/70 space-y-0.5">
            <p>{siteConfig.address.street}</p>
            <p>{siteConfig.address.city}, {siteConfig.address.stateAbbr} {siteConfig.address.zip}</p>
          </div>
          <a href={`tel:${siteConfig.phoneRaw}`} className="phone-link block mt-2">
            {siteConfig.phone}
          </a>
          <p className="text-xs text-white/40 mt-0.5">24/7 Emergency Service</p>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Services</h4>
          <div className="w-6 h-0.5 bg-[#eb1c23] mb-3" />
          <ul className="space-y-1.5">
            {siteConfig.services.slice(0, 7).map((s) => (
              <li key={s.slug}>
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-xs">{s.name}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Areas */}
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Service Areas</h4>
          <div className="w-6 h-0.5 bg-[#eb1c23] mb-3" />
          <ul className="space-y-1.5">
            {siteConfig.serviceAreas.slice(0, 8).map((a) => (
              <li key={a} className="text-xs text-white/60">{a}, AZ</li>
            ))}
            <li className="text-xs text-white/40 italic">+ {siteConfig.serviceAreas.length - 8} more</li>
          </ul>
        </div>

        {/* Links */}
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Links</h4>
          <div className="w-6 h-0.5 bg-[#eb1c23] mb-3" />
          <ul className="space-y-1.5">
            <li><a href={siteConfig.keyPages.about} target="_blank" rel="noopener noreferrer" className="text-xs">About Us</a></li>
            <li><a href={siteConfig.keyPages.contact} target="_blank" rel="noopener noreferrer" className="text-xs">Contact</a></li>
            <li><a href={siteConfig.keyPages.financing} target="_blank" rel="noopener noreferrer" className="text-xs">Financing</a></li>
            <li><a href={siteConfig.keyPages.pricing} target="_blank" rel="noopener noreferrer" className="text-xs">Pricing &amp; Coupons</a></li>
            <li><Link href="/" className="text-xs">Blog Home</Link></li>
          </ul>
          <a
            href={siteConfig.keyPages.contact}
            className="cta-button text-xs mt-4 block text-center !py-2 !px-4"
            target="_blank"
            rel="noopener noreferrer"
          >
            Schedule Service
          </a>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col md:flex-row justify-between items-center text-[0.65rem] text-white/35 gap-1">
          <p>&copy; {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.</p>
          <p>{siteConfig.license} | American Standard Authorized Dealer</p>
        </div>
      </div>
    </footer>
  );
}
