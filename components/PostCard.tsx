import Link from "next/link";
import type { BlogPost } from "@/lib/types";

interface PostCardProps {
  post: BlogPost;
}

export default function PostCard({ post }: PostCardProps) {
  const { frontmatter, readingTime } = post;

  return (
    <article className="blog-card flex flex-col">
      {/* Card header — navy with Viking branding (matches their existing blog cards) */}
      <div className="bg-[#004281] px-5 py-6 text-center">
        <span className="text-white text-xl font-bold tracking-tight">
          VIKING <span className="text-[#eb1c23]">HVAC</span>
        </span>
        <p className="text-white/50 text-xs mt-1 uppercase tracking-widest">
          {frontmatter.category.replace(/-/g, " ")}
        </p>
      </div>

      {/* Card body */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center gap-2 mb-3">
          <span className="badge-category">{frontmatter.category.replace(/-/g, " ")}</span>
          <span className="text-xs text-gray-400">
            {new Date(frontmatter.publishDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>

        <Link href={`/blog/${post.slug}`}>
          <h2 className="text-base font-bold text-[#002147] leading-snug hover:text-[#eb1c23] transition-colors mb-2">
            {frontmatter.title}
          </h2>
        </Link>

        <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-grow">
          {frontmatter.metaDescription}
        </p>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <span className="text-xs text-gray-400">{readingTime}</span>
          <Link
            href={`/blog/${post.slug}`}
            className="text-sm font-bold text-[#004281] hover:text-[#eb1c23] transition-colors uppercase tracking-wide"
          >
            Read More →
          </Link>
        </div>
      </div>
    </article>
  );
}
