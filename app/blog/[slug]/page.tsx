import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { getPostBySlug, getAllPostSlugs } from "@/lib/posts";
import SchemaMarkup from "@/components/SchemaMarkup";
import { siteConfig } from "@/lib/site-config";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.frontmatter.metaTitle || post.frontmatter.title,
    description: post.frontmatter.metaDescription,
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.metaDescription,
      type: "article",
      publishedTime: post.frontmatter.publishDate,
      authors: [siteConfig.companyName],
      tags: post.frontmatter.tags,
    },
    alternates: {
      canonical: `${siteConfig.blogUrl}/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <SchemaMarkup post={post} pageType="post" />

      {/* Post hero — navy banner matching Viking site style */}
      <section className="section-navy py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="badge-category">{post.frontmatter.category.replace(/-/g, " ")}</span>
            {post.frontmatter.weatherTriggered && (
              <span className="badge-weather">
                Weather Alert
              </span>
            )}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
            {post.frontmatter.title}
          </h1>
          <div className="divider-red" />
          <div className="flex items-center justify-center gap-4 text-sm text-white/60 mt-4">
            <time dateTime={post.frontmatter.publishDate}>
              {new Date(post.frontmatter.publishDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span>•</span>
            <span>{post.readingTime}</span>
            <span>•</span>
            <span>{post.frontmatter.author}</span>
          </div>
        </div>
      </section>

      {/* Post content */}
      <section className="section-white py-12">
        <article className="max-w-3xl mx-auto px-4">
          <div className="prose prose-lg max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw, rehypeSlug]}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          {/* Tags */}
          {post.frontmatter.tags.length > 0 && (
            <div className="mt-10 pt-6 border-t border-gray-200">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.frontmatter.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-[#f0f4f8] text-[#004281] px-3 py-1.5 rounded font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </article>
      </section>

      {/* CTA Banner — matches Viking site CTA sections */}
      <section className="section-navy py-14 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Need HVAC Service in {siteConfig.primaryCity}?
          </h2>
          <div className="divider-red" />
          <p className="text-white/70 mt-4 mb-6 text-lg">
            {siteConfig.companyName} is available 24/7 for emergency service.
            Call us today — {siteConfig.tagline.toLowerCase()}.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={`tel:${siteConfig.phoneRaw}`} className="cta-button text-lg">
              Call {siteConfig.phone}
            </a>
            <a
              href={siteConfig.keyPages.contact}
              className="cta-button-outline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Schedule Online
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
