"use client";

import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/lib/site-config";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="site-header">
      {/* Top utility bar — phone + hours */}
      <div className="bg-[#002147] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center text-sm">
          <a href={`tel:${siteConfig.phoneRaw}`} className="phone-link text-sm flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            {siteConfig.phone}
          </a>
          <span className="hidden md:block text-white/70">
            24/7 Emergency Service | Licensed &amp; Insured | {siteConfig.license}
          </span>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo / Brand */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-white">
                VIKING <span className="text-[#eb1c23]">HVAC</span>
              </span>
              <span className="text-[0.65rem] text-white/60 tracking-widest uppercase">
                Blog
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link href="/" className="text-sm font-semibold uppercase tracking-wide">
              Blog Home
            </Link>
            <a
              href={siteConfig.services[0].url}
              className="text-sm font-semibold uppercase tracking-wide"
              target="_blank"
              rel="noopener noreferrer"
            >
              Air Conditioning
            </a>
            <a
              href={siteConfig.services[1].url}
              className="text-sm font-semibold uppercase tracking-wide"
              target="_blank"
              rel="noopener noreferrer"
            >
              Heating
            </a>
            <a
              href={siteConfig.services[3].url}
              className="text-sm font-semibold uppercase tracking-wide"
              target="_blank"
              rel="noopener noreferrer"
            >
              Repairs
            </a>
            <a
              href={siteConfig.mainSiteUrl}
              className="text-sm font-semibold uppercase tracking-wide"
              target="_blank"
              rel="noopener noreferrer"
            >
              Main Site
            </a>
            <a
              href={siteConfig.keyPages.contact}
              className="cta-button text-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              Schedule Service
            </a>
          </nav>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <nav className="lg:hidden pb-6 flex flex-col gap-4 border-t border-white/10 pt-4">
            <Link
              href="/"
              className="text-sm font-semibold uppercase tracking-wide"
              onClick={() => setMobileMenuOpen(false)}
            >
              Blog Home
            </Link>
            <a href={siteConfig.services[0].url} className="text-sm font-semibold uppercase tracking-wide" target="_blank" rel="noopener noreferrer">
              Air Conditioning
            </a>
            <a href={siteConfig.services[1].url} className="text-sm font-semibold uppercase tracking-wide" target="_blank" rel="noopener noreferrer">
              Heating
            </a>
            <a href={siteConfig.services[3].url} className="text-sm font-semibold uppercase tracking-wide" target="_blank" rel="noopener noreferrer">
              Repairs
            </a>
            <a href={siteConfig.mainSiteUrl} className="text-sm font-semibold uppercase tracking-wide" target="_blank" rel="noopener noreferrer">
              Main Site
            </a>
            <a
              href={siteConfig.keyPages.contact}
              className="cta-button text-center text-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              Schedule Service
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
