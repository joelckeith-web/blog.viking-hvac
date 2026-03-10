import { siteConfig } from "@/lib/site-config";
import type { BlogPost, FaqItem } from "@/lib/types";

/**
 * JSON-LD structured data components for SEO.
 * Implements Article, FAQPage, HVACBusiness (with sameAs Entity Bridge),
 * BreadcrumbList, and WebSite schemas.
 */

/** Article schema for blog posts */
export function ArticleSchema({ post }: { post: BlogPost }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
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
    ...(post.frontmatter.featuredImage
      ? { image: post.frontmatter.featuredImage }
      : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/** FAQPage schema from blog post FAQ items */
export function FaqSchema({ items }: { items: FaqItem[] }) {
  if (!items || items.length === 0) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * HVACBusiness schema — included on every page.
 *
 * ENTITY BRIDGE: The `sameAs` array links this blog subdomain to the
 * verified business profiles (Google Maps CID, Facebook, LinkedIn, etc.).
 * This tells Google "this subdomain IS Viking HVAC" and transfers
 * entity authority to the blog.
 */
export function LocalBusinessSchema() {
  const schema = {
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
    sameAs: siteConfig.sameAs,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/** BreadcrumbList schema */
export function BreadcrumbSchema({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/** WebSite schema with search action */
export function WebSiteSchema() {
  const schema = {
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
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * Default export — backward-compatible wrapper that renders
 * the appropriate schemas based on pageType.
 */
export default function SchemaMarkup({
  post,
  pageType = "home",
}: {
  post?: BlogPost;
  pageType?: "home" | "blog" | "post";
}) {
  return (
    <>
      <LocalBusinessSchema />
      <WebSiteSchema />
      {pageType === "home" && (
        <BreadcrumbSchema
          items={[
            { name: "Home", url: siteConfig.mainSiteUrl },
            { name: "Blog", url: siteConfig.blogUrl },
          ]}
        />
      )}
      {post && pageType === "post" && (
        <>
          <ArticleSchema post={post} />
          <FaqSchema items={post.frontmatter.schema?.faqItems || []} />
          <BreadcrumbSchema
            items={[
              { name: "Home", url: siteConfig.mainSiteUrl },
              { name: "Blog", url: siteConfig.blogUrl },
              {
                name: post.frontmatter.title,
                url: `${siteConfig.blogUrl}/blog/${post.slug}`,
              },
            ]}
          />
        </>
      )}
    </>
  );
}
