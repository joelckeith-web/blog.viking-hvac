import { getAllPosts } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import { siteConfig } from "@/lib/site-config";

export default async function HomePage() {
  const posts = await getAllPosts();

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Hero */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-[var(--color-dark)] mb-4">
          {siteConfig.shortName} Blog
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Expert HVAC tips, maintenance guides, and weather-triggered insights for{" "}
          {siteConfig.primaryCity} and the Phoenix East Valley. Stay comfortable year-round with{" "}
          {siteConfig.companyName}.
        </p>
      </section>

      {/* Posts Grid */}
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold text-gray-400 mb-4">Coming Soon</h2>
          <p className="text-gray-500">
            Our first weather-triggered blog posts are on the way. Check back soon for expert HVAC
            tips tailored to {siteConfig.primaryCity}&apos;s weather.
          </p>
          <a
            href={siteConfig.keyPages.contact}
            className="cta-button mt-6"
            target="_blank"
            rel="noopener noreferrer"
          >
            Need HVAC Service Now? Contact Us
          </a>
        </div>
      )}
    </div>
  );
}
