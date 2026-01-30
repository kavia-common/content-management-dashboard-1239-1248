import Link from "next/link";
import { THEME } from "@/lib/theme";

export type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  tags?: string[];
  status?: "draft" | "published" | "archived";
  updatedAt?: string;
};

export function PostCard({ post }: { post: Post }) {
  return (
    <article
      className="rounded-lg border bg-white p-4 transition-shadow hover:shadow-sm"
      style={{ borderColor: THEME.colors.border }}
    >
      <header className="mb-2">
        <Link href={`/posts/${post.slug}`} className="group">
          <h3
            className="text-lg font-semibold group-hover:underline"
            style={{ color: THEME.colors.text }}
          >
            {post.title}
          </h3>
        </Link>
        {post.excerpt ? (
          <p className="text-sm mt-1" style={{ color: THEME.colors.subtleText }}>
            {post.excerpt}
          </p>
        ) : null}
      </header>
      <footer className="flex items-center justify-between mt-3">
        <div className="flex gap-2 flex-wrap">
          {(post.tags || []).map((t) => (
            <span
              key={t}
              className="text-[11px] px-2 py-0.5 rounded-full border"
              style={{ borderColor: THEME.colors.border, color: THEME.colors.subtleText }}
            >
              #{t}
            </span>
          ))}
        </div>
        <div className="text-xs" style={{ color: THEME.colors.subtleText }}>
          {post.updatedAt ? new Date(post.updatedAt).toLocaleDateString() : null}
        </div>
      </footer>
    </article>
  );
}

export default function PostList({ posts }: { posts: Post[] }) {
  if (!posts?.length) {
    return (
      <div
        className="rounded-lg border p-8 text-center text-sm bg-white"
        style={{ borderColor: THEME.colors.border, color: THEME.colors.subtleText }}
      >
        No posts found.
      </div>
    );
  }
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((p) => (
        <PostCard key={p.id} post={p} />
      ))}
    </div>
  );
}
