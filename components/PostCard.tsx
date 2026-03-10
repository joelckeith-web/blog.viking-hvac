import Link from "next/link";
import type { BlogPost } from "@/lib/types";

interface PostCardProps {
  post: BlogPost;
}

export default function PostCard({ post }: PostCardProps) {
  const { frontmatter, readingTime } = post;

  return (
    <Link href={`/blog/${post.slug}`} className="block">
      <article className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all hover:-translate-y-0.5 h-full flex flex-col">
        {/* Top accent bar */}
        <div className="h-1 bg-[#004281]" />

        <div className="p-5 flex flex-col flex-grow">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-block bg-[#004281] text-white px-2.5 py-0.5 rounded text-[0.65rem] font-bold uppercase tracking-wide">
              {frontmatter.category.replace(/-/g, " ")}
            </span>
            <span className="text-xs text-gray-400">
              {new Date(frontmatter.publishDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>

          <h2 className="text-base font-bold text-[#002147] leading-snug mb-2 hover:text-[#eb1c23] transition-colors">
            {frontmatter.title}
          </h2>

          <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-grow">
            {frontmatter.metaDescription}
          </p>

          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <span className="text-xs text-gray-400">{readingTime}</span>
            <span className="text-xs font-bold text-[#004281] uppercase tracking-wide hover:text-[#eb1c23]">
              Read More →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
