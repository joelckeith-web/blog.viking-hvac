import Link from "next/link";
import type { BlogPost } from "@/lib/types";

interface PostCardProps {
  post: BlogPost;
}

export default function PostCard({ post }: PostCardProps) {
  const { frontmatter, readingTime } = post;

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[var(--color-primary)] text-white">
            {frontmatter.category}
          </span>
          <span className="text-xs text-gray-500">
            {new Date(frontmatter.publishDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
        <Link href={`/blog/${post.slug}`}>
          <h2 className="text-xl font-bold text-[var(--color-dark)] hover:text-[var(--color-secondary)] mb-2">
            {frontmatter.title}
          </h2>
        </Link>
        <p className="text-gray-600 text-sm mb-4">{frontmatter.metaDescription}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400">{readingTime}</span>
          <Link
            href={`/blog/${post.slug}`}
            className="text-sm font-semibold text-[var(--color-primary)] hover:text-[var(--color-secondary)]"
          >
            Read More &rarr;
          </Link>
        </div>
        {frontmatter.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3 pt-3 border-t border-gray-100">
            {frontmatter.tags.map((tag) => (
              <span key={tag} className="text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
