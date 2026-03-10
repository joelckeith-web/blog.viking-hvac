"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/site-config";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <>
      {/* Top bar — phone + hours */}
      <div className="bg-brand-dark text-white text-sm">
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
          <span className="hidden sm:inline text-gray-300">
            24/7 Emergency Service | {siteConfig.license}
          </span>
          <a
            href={`tel:${siteConfig.phoneRaw}`}
            className="font-semibold hover:text-brand-accent transition-colors"
          >
            {siteConfig.phone}
          </a>
        </div>
      </div>

      {/* Main navigation */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            {/* Logo / Brand */}
            <Link
              href={siteConfig.mainSiteUrl}
              className="flex items-center shrink-0"
            >
              <Image
                src="https://static.wixstatic.com/media/55fcb2_b3884c6dd8534735962c38183c0da45a~mv2.png/v1/fill/w_141,h_57,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/VIKING%20W.png"
                alt="Viking Heating and Air Conditioning"
                width={141}
                height={57}
                className="h-12 w-auto"
                priority
              />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center space-x-1">
              <NavLink href={siteConfig.mainSiteUrl} label="Home" />
              <NavLink href={siteConfig.keyPages.about} label="About Us" />

              {/* Services dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <span className="px-3 py-2 text-brand-text-secondary hover:text-brand-accent font-medium transition-colors inline-flex items-center cursor-pointer">
                  Services
                  <svg
                    className="ml-1 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>

                {servicesOpen && (
                  <div className="absolute top-full left-0 w-56 bg-white shadow-lg rounded-b-lg border-t-2 border-brand-accent py-2 z-50">
                    {siteConfig.services.slice(0, 8).map((service) => (
                      <a
                        key={service.url}
                        href={service.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-4 py-2 text-sm text-brand-text-secondary hover:bg-brand-accent-light hover:text-brand-accent transition-colors"
                      >
                        {service.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              <NavLink href="/" label="Blog" isActive />
              <NavLink href={siteConfig.keyPages.contact} label="Contact" />

              <a
                href={siteConfig.keyPages.contact}
                className="ml-4 btn-primary text-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                Schedule Service
              </a>
            </nav>

            {/* Mobile menu toggle */}
            <button
              className="lg:hidden p-2 text-brand-dark"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white">
            <div className="px-4 py-4 space-y-2">
              <MobileLink href={siteConfig.mainSiteUrl} label="Home" />
              <MobileLink href={siteConfig.keyPages.about} label="About Us" />
              <MobileLink href={siteConfig.services[0].url} label="Services" />
              {siteConfig.services.slice(0, 6).map((service) => (
                <a
                  key={service.url}
                  href={service.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block pl-6 py-2 text-sm text-brand-text-secondary hover:text-brand-accent"
                >
                  {service.name}
                </a>
              ))}
              <MobileLink href="/" label="Blog" isActive />
              <MobileLink href={siteConfig.keyPages.contact} label="Contact" />
              <a
                href={siteConfig.keyPages.contact}
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-4 btn-primary text-center text-sm"
              >
                Schedule Service
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

function NavLink({
  href,
  label,
  isActive = false,
}: {
  href: string;
  label: string;
  isActive?: boolean;
}) {
  const isExternal = href.startsWith("http");
  const className = `px-3 py-2 font-medium transition-colors ${
    isActive
      ? "text-brand-accent"
      : "text-brand-text-secondary hover:text-brand-accent"
  }`;

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {label}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {label}
    </Link>
  );
}

function MobileLink({
  href,
  label,
  isActive = false,
}: {
  href: string;
  label: string;
  isActive?: boolean;
}) {
  const className = `block py-2 font-medium ${
    isActive ? "text-brand-accent" : "text-brand-text-secondary"
  }`;
  const isExternal = href.startsWith("http");

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {label}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {label}
    </Link>
  );
}
