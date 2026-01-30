"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import SidebarFilters, { type Filters } from "@/components/SidebarFilters";
import PostList, { type Post } from "@/components/PostList";
import { apiGet } from "@/lib/api";

export default function HomeClient() {
  const [filters, setFilters] = useState<Filters>({});
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [loading, setLoading] = useState(false);

  const query = useMemo(() => {
    const params = new URLSearchParams();
    if (filters.q) params.set("q", filters.q);
    if (filters.status) params.set("status", filters.status);
    if (filters.tag) params.set("tag", filters.tag);
    const qs = params.toString();
    return qs ? `?${qs}` : "";
  }, [filters]);

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await apiGet<Post[]>(`/posts${query}`, { cache: "no-store" });
    setPosts(data || []);
    setLoading(false);
  }, [query]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div className="grid gap-6 sm:grid-cols-[16rem_1fr]">
      <SidebarFilters
        initial={filters}
        tags={["tech", "life", "design"]}
        onChange={setFilters}
      />
      <section className="space-y-4">
        <header>
          <h1 className="text-2xl font-semibold">Latest Posts</h1>
          <p className="text-sm text-gray-500">Browse and manage your content.</p>
        </header>
        {loading && <div className="text-sm text-gray-500">Loading…</div>}
        {posts !== null && <PostList posts={posts} />}
      </section>
    </div>
  );
}
