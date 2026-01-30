"use client";

import { useMemo, useState, FormEvent } from "react";
import { THEME } from "@/lib/theme";
import { apiPost, apiPut } from "@/lib/api";

type EditorPost = {
  id?: string;
  title: string;
  slug: string;
  content: string;
  tags: string[];
  status: "draft" | "published" | "archived";
};

type Props = {
  initial?: Partial<EditorPost>;
};

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function PostEditor({ initial }: Props) {
  const [title, setTitle] = useState(initial?.title || "");
  const [slug, setSlug] = useState(initial?.slug || "");
  const [content, setContent] = useState(initial?.content || "");
  const [status, setStatus] = useState<EditorPost["status"]>(initial?.status || "draft");
  const [tagsInput, setTagsInput] = useState((initial?.tags || []).join(", "));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState<string | null>(null);

  const computedSlug = useMemo(() => (slug ? slugify(slug) : slugify(title)), [slug, title]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setOk(null);
    const payload: EditorPost = {
      id: initial?.id,
      title,
      slug: computedSlug,
      content,
      status,
      tags: tagsInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };
    const res = initial?.id
      ? await apiPut<{ id: string }>(`/posts/${initial.id}`, payload)
      : await apiPost<{ id: string }>(`/posts`, payload);

    setSaving(false);
    if (res.error) {
      setError(res.error);
    } else {
      setOk("Saved successfully.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" aria-label="Post editor form">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="title" className="block text-xs mb-1" style={{ color: THEME.colors.subtleText }}>
            Title
          </label>
          <input
            id="title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded border px-3 py-2"
            style={{ borderColor: THEME.colors.border }}
            placeholder="My new post"
          />
        </div>
        <div>
          <label htmlFor="slug" className="block text-xs mb-1" style={{ color: THEME.colors.subtleText }}>
            Slug (auto from title if empty)
          </label>
          <input
            id="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full rounded border px-3 py-2"
            style={{ borderColor: THEME.colors.border }}
            placeholder="my-new-post"
          />
          <p className="text-[11px] mt-1" style={{ color: THEME.colors.subtleText }}>
            Result: {computedSlug}
          </p>
        </div>
      </div>

      <div>
        <label htmlFor="tags" className="block text-xs mb-1" style={{ color: THEME.colors.subtleText }}>
          Tags (comma separated)
        </label>
        <input
          id="tags"
          value={tagsInput}
          onChange={(e) => setTagsInput(e.target.value)}
          className="w-full rounded border px-3 py-2"
          style={{ borderColor: THEME.colors.border }}
          placeholder="tech, life, updates"
        />
      </div>

      <div>
        <label htmlFor="status" className="block text-xs mb-1" style={{ color: THEME.colors.subtleText }}>
          Status
        </label>
        <select
          id="status"
          className="w-full rounded border px-3 py-2 bg-white"
          style={{ borderColor: THEME.colors.border }}
          value={status}
          onChange={(e) => setStatus(e.target.value as EditorPost["status"])}
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      <div>
        <label htmlFor="content" className="block text-xs mb-1" style={{ color: THEME.colors.subtleText }}>
          Content (Markdown supported)
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full min-h-64 rounded border px-3 py-2 font-mono text-sm"
          style={{ borderColor: THEME.colors.border }}
          placeholder="# Heading"
        />
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center justify-center rounded px-4 py-2 text-sm font-medium text-white"
          style={{ backgroundColor: THEME.colors.primary }}
        >
          {saving ? "Saving..." : "Save"}
        </button>
        {ok ? (
          <span className="text-sm" style={{ color: THEME.colors.secondary }}>
            {ok}
          </span>
        ) : null}
        {error ? (
          <span className="text-sm" style={{ color: THEME.colors.error }}>
            {error}
          </span>
        ) : null}
      </div>
    </form>
  );
}
