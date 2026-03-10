"use client";

import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/lib/site-config";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-[var(--color-primary)] text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        {/* Top bar */}
        <div className="flex justify-between items-center py-2 text-sm border-b border-white/20">
          <a href={`tel:${siteConfig.phoneRaw}`} className="hover:text-[var(--color-secondary)]">
            {siteConfig.phone} — 24/7 Emergency Service
          </a>
          <span className="hidden md:block">{siteConfig.businessHours}</span>
        </div>

        {/* Main nav */}
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-xl font-bold hover:text-[var(--color-secondary)]">
            {siteConfig.shortName} <span className="text-sm font-normal">Blog</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="hover:text-[var(--color-secondary)]">
              Blog Home
            </Link>
            <a
              href={siteConfig.mainSiteUrl}
              className="hover:text-[var(--color-secondary)]"
              target="_blank"
              rel="noopener noreferrer"
            >
              Main Site
            </a>
            <a
              href={siteConfig.services[0].url}
              className="hover:text-[var(--color-secondary)]"
              target="_blank"
              rel="noopener noreferrer"
            >
              AC Service
            </a>
            <a
              href={siteConfig.services[1].url}
              className="hover:text-[var(--color-secondary)]"
              target="_blank"
              rel="noopener noreferrer"
            >
              Heating
            </a>
            <a
              href={siteConfig.keyPages.contact}
              className="cta-button text-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contact Us
            </a>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          <nav className="md:hidden pb-4 flex flex-col gap-3">
            <Link href="/" className="hover:text-[var(--color-secondary)]" onClick={() => setMobileMenuOpen(false)}>
              Blog Home
            </Link>
            <a href={siteConfig.mainSiteUrl} className="hover:text-[var(--color-secondary)]" target="_blank" rel="noopener noreferrer">
              Main Site
            </a>
            <a href={siteConfig.services[0].url} className="hover:text-[var(--color-secondary)]" target="_blank" rel="noopener noreferrer">
              AC Service
            </a>
            <a href={siteConfig.services[1].url} className="hover:text-[var(--color-secondary)]" target="_blank" rel="noopener noreferrer">
              Heating
            </a>
            <a href={siteConfig.keyPages.contact} className="cta-button text-center" target="_blank" rel="noopener noreferrer">
              Contact Us
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
