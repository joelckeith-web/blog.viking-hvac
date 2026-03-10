import { siteConfig } from "@/lib/site-config";
import type { BlogPost } from "@/lib/types";

interface SchemaMarkupProps {
  post?: BlogPost;
  pageType?: "home" | "blog" | "post";
}

export default function SchemaMarkup({ post, pageType = "home" }: SchemaMarkupProps) {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "HVACBusiness",
    name: siteConfig.companyName,
    legalName: siteConfig.legalName,
    description: siteConfig.description,
    url: siteConfig.mainSiteUrl,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    foundingDate: `${siteConfig.foundedYear}`,
    slogan: siteConfig.tagline,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.stateAbbr,
      postalCode: siteConfig.address.zip,
      addressCountry: siteConfig.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 33.3522,
      longitude: -111.8404,
    },
    openingHoursSpecification: siteConfig.openingHoursSpecification,
    sameAs: siteConfig.sameAs,
    areaServed: siteConfig.serviceAreas.map((city) => ({
      "@type": "City",
      name: city,
      containedInPlace: {
        "@type": "State",
        name: "Arizona",
      },
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "HVAC Services",
      itemListElement: siteConfig.services.map((service) => ({
        "@type": "OfferCatalog",
        name: service.name,
        url: service.url,
      })),
    },
  };

  const blogPosting =
    post && post.frontmatter
      ? {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.frontmatter.title,
          description: post.frontmatter.metaDescription,
          datePublished: post.frontmatter.publishDate,
          dateModified: post.frontmatter.publishDate,
          author: {
            "@type": "Organization",
            name: siteConfig.companyName,
            url: siteConfig.mainSiteUrl,
          },
          publisher: {
            "@type": "Organization",
            name: siteConfig.companyName,
            url: siteConfig.mainSiteUrl,
          },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `${siteConfig.blogUrl}/blog/${post.slug}`,
          },
          about: {
            "@type": "Thing",
            name: post.frontmatter.category,
          },
          keywords: post.frontmatter.tags.join(", "),
          wordCount: post.content.split(/\s+/).length,
          articleSection: post.frontmatter.category,
        }
      : null;

  // FAQPage schema from frontmatter
  const faqPage =
    post?.frontmatter?.schema?.faqItems?.length
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: post.frontmatter.schema.faqItems.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null;

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${siteConfig.shortName} Blog`,
    url: siteConfig.blogUrl,
    publisher: {
      "@type": "Organization",
      name: siteConfig.companyName,
      url: siteConfig.mainSiteUrl,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
      {blogPosting && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPosting) }}
        />
      )}
      {faqPage && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
        />
      )}
    </>
  );
}
