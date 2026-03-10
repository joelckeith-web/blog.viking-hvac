import { getAllPosts } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import { siteConfig } from "@/lib/site-config";
import Link from "next/link";

export default async function HomePage() {
  const posts = await getAllPosts();

  return (
    <>
      {/* Hero — compact, clean, matching Viking site */}
      <section className="bg-[#004281] py-10 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Helpful HVAC Tips &amp; Tricks
          </h1>
          <div className="w-16 h-[3px] bg-[#eb1c23] mx-auto my-3" />
          <p className="text-white/70 text-base max-w-xl mx-auto">
            Expert advice and weather-triggered insights for{" "}
            {siteConfig.primaryCity} and the Greater Phoenix area.
          </p>
        </div>
      </section>

      {/* Posts */}
      <section className="bg-white py-10">
        <div className="max-w-6xl mx-auto px-4">
          {posts.length > 0 ? (
            <>
              {/* Featured / latest post — full width */}
              <div className="mb-8">
                <FeaturedPost post={posts[0]} />
              </div>

              {/* Remaining posts in grid */}
              {posts.length > 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {posts.slice(1).map((post) => (
                    <PostCard key={post.slug} post={post} />
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <h2 className="text-xl font-bold text-gray-400 mb-3">Coming Soon</h2>
              <p className="text-gray-500 max-w-md mx-auto mb-6 text-sm">
                Weather-triggered blog posts are on the way. Expert HVAC tips tailored to{" "}
                {siteConfig.primaryCity}&apos;s conditions.
              </p>
              <a
                href={siteConfig.keyPages.contact}
                className="cta-button text-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                Need Service Now? Contact Us
              </a>
            </div>
          )}
        </div>
      </section>

      {/* CTA — compact */}
      <section className="bg-[#004281] py-10 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
            Need HVAC Service?
          </h2>
          <p className="text-white/70 text-sm mb-5">
            24/7 emergency service for the Greater Phoenix area. Call today.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href={`tel:${siteConfig.phoneRaw}`} className="cta-button text-sm">
              Call {siteConfig.phone}
            </a>
            <a
              href={siteConfig.keyPages.contact}
              className="cta-button-outline text-sm"
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

/* Featured post — full width card for the latest/only post */
import type { BlogPost } from "@/lib/types";

function FeaturedPost({ post }: { post: BlogPost }) {
  const { frontmatter, readingTime } = post;

  return (
    <Link href={`/blog/${post.slug}`} className="block">
      <article className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow md:flex">
        {/* Left accent */}
        <div className="bg-[#004281] md:w-2 shrink-0 hidden md:block" />

        <div className="p-6 md:p-8 flex-grow">
          <div className="flex items-center gap-3 mb-3">
            <span className="inline-block bg-[#004281] text-white px-3 py-1 rounded text-xs font-bold uppercase tracking-wide">
              {frontmatter.category.replace(/-/g, " ")}
            </span>
            {frontmatter.weatherTriggered && (
              <span className="inline-block bg-[#eb1c23] text-white px-3 py-1 rounded text-xs font-bold uppercase tracking-wide">
                Weather Alert
              </span>
            )}
            <span className="text-xs text-gray-400">
              {new Date(frontmatter.publishDate).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>

          <h2 className="text-xl md:text-2xl font-bold text-[#002147] mb-2 hover:text-[#eb1c23] transition-colors">
            {frontmatter.title}
          </h2>

          <p className="text-gray-600 text-sm leading-relaxed mb-4 max-w-2xl">
            {frontmatter.metaDescription}
          </p>

          <div className="flex items-center gap-4 text-xs text-gray-400">
            <span>{readingTime}</span>
            <span>•</span>
            <span>{frontmatter.author}</span>
            <span className="ml-auto text-[#004281] font-bold uppercase tracking-wide text-sm hover:text-[#eb1c23]">
              Read Article →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
