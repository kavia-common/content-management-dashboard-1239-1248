import type { Metadata } from "next";
import { apiGet } from "@/lib/api";

type Post = {
  id: string;
  slug: string;
  title: string;
  content: string;
  tags?: string[];
  updatedAt?: string;
  createdAt?: string;
};

type Params = { slug: string };
type PageProps = { params: Promise<Params> };

async function getPost(slug: string): Promise<Post | null> {
  const { data } = await apiGet<Post>(`/posts/${slug}`, {
    cache: "no-store",
  });
  return data || null;
}

/**
 * Generate static params for /posts/[slug] to support static export builds.
 * This function fetches all available slugs from the backend.
 */
/**
 * PUBLIC_INTERFACE
 * Pre-generate static params for dynamic post routes.
 * Returns empty array if backend is unreachable during build, allowing export to proceed.
 */
export async function generateStaticParams(): Promise<Params[]> {
  try {
    const { data, error } = await apiGet<Array<{ slug: string }>>("/posts/slugs", {
      cache: "no-store",
    });
    if (error || !data) return [];
    return data.map((s) => ({ slug: s.slug }));
  } catch {
    // On build-time failure, return no dynamic paths; pages can still be navigated via client.
    return [];
  }
}

/**
 * Generate per-post metadata for SEO.
 */
export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { slug } = await props.params;
  const post = await getPost(slug);
  return {
    title: post ? post.title : "Post",
    description: post?.content?.slice(0, 160) || "Blog post",
    alternates: {
      canonical: `/posts/${slug}`,
    },
    openGraph: {
      title: post?.title || "Post",
      description: post?.content?.slice(0, 200) || "Blog post",
      type: "article",
    },
  };
}

/**
 * PUBLIC_INTERFACE
 * Page component for rendering a blog post by slug.
 */
export default async function PostPage(props: PageProps) {
  const { slug } = await props.params;
  const post = await getPost(slug);
  if (!post) {
    return (
      <div className="card">
        <h1 className="text-xl font-semibold">Post not found</h1>
      </div>
    );
  }

  return (
    <article className="prose max-w-none">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">{post.title}</h1>
        <div className="mt-2 text-sm text-gray-500">
          {post.updatedAt ? new Date(post.updatedAt).toLocaleString() : null}
        </div>
        <div className="mt-2 flex gap-2 flex-wrap">
          {(post.tags || []).map((t) => (
            <span key={t} className="badge">#{t}</span>
          ))}
        </div>
      </header>
      <section>
        <pre className="whitespace-pre-wrap font-sans text-[15px] leading-7">
{post.content}
        </pre>
      </section>
    </article>
  );
}
