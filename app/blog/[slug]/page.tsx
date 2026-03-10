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
      <article className="max-w-4xl mx-auto px-4 py-12">
        {/* Post Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="weather-badge">{post.frontmatter.category}</span>
            {post.frontmatter.weatherTriggered && (
              <span className="text-xs text-gray-500 bg-yellow-50 px-2 py-1 rounded">
                Weather-Triggered: {post.frontmatter.weatherMode} | {post.frontmatter.weatherWeek}
              </span>
            )}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-dark)] mb-4">
            {post.frontmatter.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <time dateTime={post.frontmatter.publishDate}>
              {new Date(post.frontmatter.publishDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span>&bull;</span>
            <span>{post.readingTime}</span>
            <span>&bull;</span>
            <span>{post.frontmatter.author}</span>
          </div>
        </header>

        {/* Post Content */}
        <div className="prose prose-lg max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeSlug]}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        {/* CTA Banner */}
        <div className="mt-12 bg-[var(--color-primary)] text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">Need HVAC Service in {siteConfig.primaryCity}?</h2>
          <p className="text-white/80 mb-4">
            {siteConfig.companyName} is available 24/7 for emergency service.{" "}
            {siteConfig.tagline}.
          </p>
          <a
            href={`tel:${siteConfig.phoneRaw}`}
            className="cta-button text-lg"
          >
            Call {siteConfig.phone}
          </a>
        </div>

        {/* Tags */}
        {post.frontmatter.tags.length > 0 && (
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-500 mb-2">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.frontmatter.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </article>
    </>
  );
}
