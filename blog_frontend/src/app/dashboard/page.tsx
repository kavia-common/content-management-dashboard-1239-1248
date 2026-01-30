import { apiGet } from "@/lib/api";
import PostList, { type Post } from "@/components/PostList";

type Stats = {
  total: number;
  drafts: number;
  published: number;
  archived: number;
};

async function getStats(): Promise<Stats> {
  const { data } = await apiGet<Stats>("/posts/stats", {
    cache: "no-store",
  });
  return (
    data || {
      total: 0,
      drafts: 0,
      published: 0,
      archived: 0,
    }
  );
}

async function getRecent(): Promise<Post[]> {
  const { data } = await apiGet<Post[]>("/posts?limit=6", {
    cache: "no-store",
  });
  return data || [];
}

export const metadata = {
  title: "Dashboard",
  description: "Content overview and quick stats.",
};

export default async function DashboardPage() {
  const [stats, recent] = await Promise.all([getStats(), getRecent()]);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-sm text-gray-500">Overview of your content at a glance.</p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card">
          <div className="text-xs text-gray-500">Total</div>
          <div className="text-2xl font-semibold">{stats.total}</div>
        </div>
        <div className="card">
          <div className="text-xs text-gray-500">Drafts</div>
          <div className="text-2xl font-semibold">{stats.drafts}</div>
        </div>
        <div className="card">
          <div className="text-xs text-gray-500">Published</div>
          <div className="text-2xl font-semibold">{stats.published}</div>
        </div>
        <div className="card">
          <div className="text-xs text-gray-500">Archived</div>
          <div className="text-2xl font-semibold">{stats.archived}</div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Recent</h2>
        <PostList posts={recent} />
      </section>
    </div>
  );
}
