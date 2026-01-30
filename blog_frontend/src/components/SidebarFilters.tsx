"use client";

import { useEffect, useState } from "react";
import { THEME } from "@/lib/theme";

export type Filters = {
  q?: string;
  status?: "draft" | "published" | "archived" | "";
  tag?: string;
};

type Props = {
  initial?: Filters;
  tags?: string[];
  onChange?: (filters: Filters) => void;
};

export default function SidebarFilters({ initial, tags = [], onChange }: Props) {
  const [q, setQ] = useState(initial?.q || "");
  const [status, setStatus] = useState<Filters["status"]>(initial?.status || "");
  const [tag, setTag] = useState(initial?.tag || "");

  useEffect(() => {
    onChange?.({ q, status, tag });
  }, [q, status, tag, onChange]);

  return (
    <aside
      className="w-full sm:w-64 flex-shrink-0 border rounded-lg p-4 h-max bg-white"
      style={{ borderColor: THEME.colors.border }}
      aria-label="Filters"
    >
      <h2 className="text-sm font-semibold mb-3" style={{ color: THEME.colors.text }}>
        Filters
      </h2>

      <div className="space-y-4">
        <div>
          <label htmlFor="search" className="block text-xs mb-1" style={{ color: THEME.colors.subtleText }}>
            Search
          </label>
          <input
            id="search"
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search posts..."
            className="w-full rounded border px-3 py-2 text-sm"
            style={{ borderColor: THEME.colors.border }}
          />
        </div>

        <div>
          <label htmlFor="status" className="block text-xs mb-1" style={{ color: THEME.colors.subtleText }}>
            Status
          </label>
          <select
            id="status"
            className="w-full rounded border px-3 py-2 text-sm bg-white"
            style={{ borderColor: THEME.colors.border }}
            value={status}
            onChange={(e) => setStatus(e.target.value as Filters["status"])}
          >
            <option value="">Any</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        <div>
          <label htmlFor="tag" className="block text-xs mb-1" style={{ color: THEME.colors.subtleText }}>
            Tag
          </label>
          <select
            id="tag"
            className="w-full rounded border px-3 py-2 text-sm bg-white"
            style={{ borderColor: THEME.colors.border }}
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          >
            <option value="">Any</option>
            {tags.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>
    </aside>
  );
}
