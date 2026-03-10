import { getAllPosts } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import { siteConfig } from "@/lib/site-config";

export default async function HomePage() {
  const posts = await getAllPosts();

  return (
    <>
      {/* Hero — matches Viking site navy hero sections */}
      <section className="section-navy py-16 md:py-20 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-white/60 text-sm uppercase tracking-[0.2em] mb-4">
            {siteConfig.companyName}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Helpful HVAC<br />Tips &amp; Tricks
          </h1>
          <div className="divider-red" />
          <p className="text-white/70 text-lg max-w-2xl mx-auto mt-4">
            Weather-triggered insights, maintenance guides, and expert advice for{" "}
            {siteConfig.primaryCity} and the Greater Phoenix area.
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="section-white py-14">
        <div className="max-w-7xl mx-auto px-4">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {posts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold text-gray-300 mb-4">Coming Soon</h2>
              <p className="text-gray-500 max-w-lg mx-auto mb-6">
                Our first weather-triggered blog posts are on the way. Check back soon for expert
                HVAC tips tailored to {siteConfig.primaryCity}&apos;s weather conditions.
              </p>
              <a
                href={siteConfig.keyPages.contact}
                className="cta-button"
                target="_blank"
                rel="noopener noreferrer"
              >
                Need HVAC Service Now?
              </a>
            </div>
          )}
        </div>
      </section>

      {/* CTA banner — navy section like Viking site */}
      <section className="section-navy py-14 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Need HVAC Service in {siteConfig.primaryCity}?
          </h2>
          <div className="divider-red" />
          <p className="text-white/70 mt-4 mb-6 text-lg">
            {siteConfig.companyName} offers 24/7 emergency service for the Greater Phoenix area.
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
