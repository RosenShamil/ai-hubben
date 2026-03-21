"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Check,
  ArrowLeft,
  Upload,
  Loader2,
  Youtube,
  Eye,
} from "lucide-react";
import type { Post } from "@/lib/posts";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\u00e5/g, "a")
    .replace(/\u00e4/g, "a")
    .replace(/\u00f6/g, "o")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("sv-SE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function renderPreviewInline(text: string): React.ReactNode {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  if (parts.length === 1) return text;
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-semibold">
        {part}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

function renderPreview(content: string): React.ReactNode[] {
  const blocks = content.split("\n\n");
  const elements: React.ReactNode[] = [];

  blocks.forEach((block, i) => {
    const trimmed = block.trim();
    if (!trimmed) return;

    const lines = trimmed.split("\n");
    const allListItems = lines.every((l) => l.trim().startsWith("- "));

    if (allListItems) {
      elements.push(
        <ul key={i} className="my-3 list-disc space-y-1 pl-5 text-[0.875rem] leading-[1.7] text-foreground/80">
          {lines.map((l, li) => (
            <li key={li}>{renderPreviewInline(l.trim().slice(2))}</li>
          ))}
        </ul>
      );
    } else if (trimmed.startsWith("### ")) {
      elements.push(
        <h3 key={i} className="mt-6 mb-2 text-[1rem] font-semibold">
          {renderPreviewInline(trimmed.slice(4))}
        </h3>
      );
    } else if (trimmed.startsWith("## ")) {
      elements.push(
        <h2
          key={i}
          className="mt-8 mb-2 text-[1.25rem] tracking-[-0.02em]"
          style={{ fontFamily: "var(--font-bodoni), serif", fontWeight: 400 }}
        >
          {renderPreviewInline(trimmed.slice(3))}
        </h2>
      );
    } else {
      elements.push(
        <p key={i} className="my-3 text-[0.875rem] leading-[1.7] text-foreground/80">
          {renderPreviewInline(trimmed)}
        </p>
      );
    }
  });

  return elements;
}

const emptyForm = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  cover_image: "",
  youtube_url: "",
  published: false,
  published_at: "",
};

export default function AdminNyheterPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);

  const showToast = useCallback(
    (type: "success" | "error", message: string) => {
      setToast({ type, message });
      setTimeout(() => setToast(null), 3000);
    },
    []
  );

  const fetchPosts = useCallback(async () => {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      showToast("error", "Kunde inte hamta artiklar");
      return;
    }
    setPosts(data ?? []);
    setLoading(false);
  }, [showToast]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  function openCreate() {
    setForm(emptyForm);
    setEditingId(null);
    setSlugManuallyEdited(false);
    setShowPreview(false);
    setEditorOpen(true);
  }

  function openEdit(post: Post) {
    setForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt ?? "",
      content: post.content ?? "",
      cover_image: post.cover_image ?? "",
      youtube_url: post.youtube_url ?? "",
      published: post.published,
      published_at: post.published_at
        ? new Date(post.published_at).toISOString().slice(0, 16)
        : "",
    });
    setEditingId(post.id);
    setSlugManuallyEdited(true);
    setShowPreview(false);
    setEditorOpen(true);
  }

  function handleTitleChange(value: string) {
    const newForm = { ...form, title: value };
    if (!slugManuallyEdited) {
      newForm.slug = slugify(value);
    }
    setForm(newForm);
  }

  function handleSlugChange(value: string) {
    setSlugManuallyEdited(true);
    setForm({ ...form, slug: slugify(value) });
  }

  function handlePublishedToggle(checked: boolean) {
    const newForm = { ...form, published: checked };
    if (checked && !form.published_at) {
      newForm.published_at = new Date().toISOString().slice(0, 16);
    }
    setForm(newForm);
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);

    const ext = file.name.split(".").pop();
    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { error } = await supabase.storage.from("posts").upload(path, file);

    if (error) {
      showToast("error", "Uppladdning misslyckades: " + error.message);
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage.from("posts").getPublicUrl(path);
    setForm({ ...form, cover_image: urlData.publicUrl });
    setUploading(false);
    showToast("success", "Bilden uppladdad");
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim() || !form.slug.trim()) {
      showToast("error", "Titel och slug kravs");
      return;
    }
    setSaving(true);

    const payload = {
      title: form.title.trim(),
      slug: form.slug.trim(),
      excerpt: form.excerpt.trim() || null,
      content: form.content.trim() || null,
      cover_image: form.cover_image.trim() || null,
      youtube_url: form.youtube_url.trim() || null,
      published: form.published,
      published_at: form.published_at
        ? new Date(form.published_at).toISOString()
        : null,
    };

    if (editingId) {
      const { error } = await supabase
        .from("posts")
        .update(payload)
        .eq("id", editingId);
      if (error) {
        showToast("error", "Kunde inte uppdatera: " + error.message);
      } else {
        showToast("success", "Artikeln uppdaterad");
      }
    } else {
      const { error } = await supabase.from("posts").insert(payload);
      if (error) {
        showToast("error", "Kunde inte skapa: " + error.message);
      } else {
        showToast("success", "Artikeln skapad");
      }
    }

    setSaving(false);
    setEditorOpen(false);
    fetchPosts();
  }

  async function handleDelete(id: string) {
    const { error } = await supabase.from("posts").delete().eq("id", id);
    if (error) {
      showToast("error", "Kunde inte ta bort: " + error.message);
    } else {
      showToast("success", "Artikeln borttagen");
    }
    setDeleteConfirm(null);
    fetchPosts();
  }

  // Editor view
  if (editorOpen) {
    return (
      <div className="mx-auto max-w-[900px]">
        {/* Toast */}
        {toast && (
          <div
            className={`fixed right-4 top-4 z-[100] flex items-center gap-2 rounded-lg border px-4 py-3 text-[0.8125rem] shadow-lg ${
              toast.type === "success"
                ? "border-green-200 bg-green-50 text-green-800 dark:border-green-900 dark:bg-green-950 dark:text-green-200"
                : "border-red-200 bg-red-50 text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-200"
            }`}
          >
            <Check size={14} />
            {toast.message}
          </div>
        )}

        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => setEditorOpen(false)}
            className="flex items-center gap-2 text-[0.8125rem] text-muted-foreground transition-colors hover:text-foreground"
            style={{ fontFamily: "var(--font-geist-mono), monospace" }}
          >
            <ArrowLeft size={14} />
            Tillbaka
          </button>
          <h1
            className="text-[1.5rem] tracking-[-0.03em]"
            style={{
              fontFamily: "var(--font-bodoni), serif",
              fontWeight: 400,
            }}
          >
            {editingId ? "Redigera artikel" : "Ny artikel"}
          </h1>
        </div>

        <form onSubmit={handleSave} className="space-y-5">
          {/* Title */}
          <div>
            <label
              className="mb-1.5 block text-[0.625rem] font-medium uppercase tracking-[0.1em] text-muted-foreground"
              style={{ fontFamily: "var(--font-geist-mono), monospace" }}
            >
              Titel *
            </label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Artikelns titel"
              className="w-full rounded-md border border-border bg-background px-4 py-3 text-[1.25rem] tracking-[-0.02em] outline-none transition-colors focus:border-foreground"
              style={{
                fontFamily: "var(--font-bodoni), serif",
                fontWeight: 400,
              }}
            />
          </div>

          {/* Slug */}
          <div>
            <label
              className="mb-1.5 block text-[0.625rem] font-medium uppercase tracking-[0.1em] text-muted-foreground"
              style={{ fontFamily: "var(--font-geist-mono), monospace" }}
            >
              Slug *
            </label>
            <div className="flex items-center gap-2">
              <span className="text-[0.8125rem] text-muted-foreground">/nyheter/</span>
              <input
                type="text"
                required
                value={form.slug}
                onChange={(e) => handleSlugChange(e.target.value)}
                placeholder="artikel-slug"
                className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-[0.875rem] outline-none transition-colors focus:border-foreground"
                style={{ fontFamily: "var(--font-geist-mono), monospace" }}
              />
            </div>
          </div>

          {/* Excerpt */}
          <div>
            <label
              className="mb-1.5 block text-[0.625rem] font-medium uppercase tracking-[0.1em] text-muted-foreground"
              style={{ fontFamily: "var(--font-geist-mono), monospace" }}
            >
              Sammanfattning
            </label>
            <textarea
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              rows={2}
              placeholder="Kort sammanfattning som visas i listan"
              className="w-full resize-none rounded-md border border-border bg-background px-3 py-2 text-[0.875rem] outline-none transition-colors focus:border-foreground"
            />
          </div>

          {/* Content */}
          <div>
            <label
              className="mb-1.5 block text-[0.625rem] font-medium uppercase tracking-[0.1em] text-muted-foreground"
              style={{ fontFamily: "var(--font-geist-mono), monospace" }}
            >
              Innehall
            </label>
            <textarea
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              rows={15}
              placeholder="Skriv artikelns innehall har. Anvand ## for rubriker, ### for underrubriker, - for punktlistor, **text** for fetstil."
              className="w-full resize-y rounded-md border border-border bg-background px-3 py-2 text-[0.875rem] leading-[1.7] outline-none transition-colors focus:border-foreground"
              style={{ fontFamily: "var(--font-geist-mono), monospace" }}
            />
          </div>

          {/* Cover image */}
          <div>
            <label
              className="mb-1.5 block text-[0.625rem] font-medium uppercase tracking-[0.1em] text-muted-foreground"
              style={{ fontFamily: "var(--font-geist-mono), monospace" }}
            >
              Omslagsbild
            </label>
            {form.cover_image ? (
              <div className="space-y-2">
                <div className="relative overflow-hidden rounded-md border border-border">
                  <img
                    src={form.cover_image}
                    alt="Forhandsvisning"
                    className="h-[200px] w-full object-cover"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setForm({ ...form, cover_image: "" })}
                  className="flex items-center gap-1.5 text-[0.75rem] text-muted-foreground transition-colors hover:text-destructive"
                >
                  <X size={12} />
                  Ta bort bild
                </button>
              </div>
            ) : (
              <label className="flex cursor-pointer items-center gap-2 rounded-md border border-dashed border-border bg-background px-3 py-3 text-[0.8125rem] text-muted-foreground transition-colors hover:border-foreground hover:text-foreground">
                {uploading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Upload size={16} />
                )}
                {uploading
                  ? "Laddar upp..."
                  : "Ladda upp omslagsbild (JPG, PNG, WebP)"}
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                />
              </label>
            )}
          </div>

          {/* YouTube URL */}
          <div>
            <label
              className="mb-1.5 flex items-center gap-1.5 text-[0.625rem] font-medium uppercase tracking-[0.1em] text-muted-foreground"
              style={{ fontFamily: "var(--font-geist-mono), monospace" }}
            >
              <Youtube size={12} />
              YouTube-lank
            </label>
            <input
              type="url"
              value={form.youtube_url}
              onChange={(e) =>
                setForm({ ...form, youtube_url: e.target.value })
              }
              placeholder="https://www.youtube.com/watch?v=..."
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-[0.875rem] outline-none transition-colors focus:border-foreground"
            />
          </div>

          {/* Published toggle + date */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-6">
            <div className="flex items-center gap-3">
              <label
                className="text-[0.625rem] font-medium uppercase tracking-[0.1em] text-muted-foreground"
                style={{ fontFamily: "var(--font-geist-mono), monospace" }}
              >
                Publicerad
              </label>
              <button
                type="button"
                onClick={() => handlePublishedToggle(!form.published)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ${
                  form.published ? "bg-green-600" : "bg-neutral-300 dark:bg-neutral-700"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-sm ring-0 transition-transform duration-200 ${
                    form.published ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {form.published && (
              <div className="flex-1">
                <label
                  className="mb-1.5 block text-[0.625rem] font-medium uppercase tracking-[0.1em] text-muted-foreground"
                  style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                >
                  Publiceringsdatum
                </label>
                <input
                  type="datetime-local"
                  value={form.published_at}
                  onChange={(e) =>
                    setForm({ ...form, published_at: e.target.value })
                  }
                  className="rounded-md border border-border bg-background px-3 py-2 text-[0.875rem] outline-none transition-colors focus:border-foreground"
                />
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 border-t border-border pt-5">
            <button
              type="button"
              onClick={() => setEditorOpen(false)}
              className="rounded-md border border-border px-4 py-2 text-[0.8125rem] transition-colors hover:bg-secondary"
            >
              Avbryt
            </button>
            <button
              type="submit"
              disabled={saving}
              className="rounded-md bg-primary px-5 py-2 text-[0.8125rem] font-medium text-primary-foreground transition-all hover:opacity-90 disabled:opacity-50"
              style={{
                fontFamily: "var(--font-geist-mono), monospace",
                boxShadow:
                  "0px 2px 1px 0px rgba(255,255,255,0.15) inset, 0px -2px 1px 0px rgba(0,0,0,0.05) inset",
              }}
            >
              {saving
                ? "Sparar..."
                : editingId
                  ? "Uppdatera"
                  : "Skapa artikel"}
            </button>
            <button
              type="button"
              onClick={() => setShowPreview(!showPreview)}
              className="ml-auto flex items-center gap-1.5 rounded-md border border-border px-4 py-2 text-[0.8125rem] transition-colors hover:bg-secondary"
            >
              <Eye size={14} />
              {showPreview ? "Dolj forhandsvisning" : "Forhandsvisning"}
            </button>
          </div>
        </form>

        {/* Preview */}
        {showPreview && (
          <div className="mt-8 rounded-lg border border-border bg-card p-6 md:p-10">
            <p
              className="mb-4 text-[0.625rem] font-medium uppercase tracking-[0.1em] text-muted-foreground"
              style={{ fontFamily: "var(--font-geist-mono), monospace" }}
            >
              Forhandsvisning
            </p>
            {form.cover_image && (
              <div className="mb-6 overflow-hidden rounded-md">
                <img
                  src={form.cover_image}
                  alt=""
                  className="h-auto w-full object-cover"
                />
              </div>
            )}
            <h2
              className="text-[1.75rem] leading-[1.15] tracking-[-0.03em] md:text-[2.25rem]"
              style={{
                fontFamily: "var(--font-bodoni), serif",
                fontWeight: 400,
              }}
            >
              {form.title || "Artikelns titel"}
            </h2>
            {form.published_at && (
              <p
                className="mt-3 text-[0.8125rem] text-muted-foreground"
                style={{ fontFamily: "var(--font-geist-mono), monospace" }}
              >
                {formatDate(form.published_at)}
              </p>
            )}
            {form.content && (
              <div className="mt-6">{renderPreview(form.content)}</div>
            )}
          </div>
        )}
      </div>
    );
  }

  // List view
  return (
    <div className="mx-auto max-w-[1200px]">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed right-4 top-4 z-[100] flex items-center gap-2 rounded-lg border px-4 py-3 text-[0.8125rem] shadow-lg ${
            toast.type === "success"
              ? "border-green-200 bg-green-50 text-green-800 dark:border-green-900 dark:bg-green-950 dark:text-green-200"
              : "border-red-200 bg-red-50 text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-200"
          }`}
        >
          <Check size={14} />
          {toast.message}
        </div>
      )}

      {/* Header */}
      <div className="mb-6 flex items-end justify-between">
        <div>
          <p
            className="text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-muted-foreground"
            style={{ fontFamily: "var(--font-geist-mono), monospace" }}
          >
            Hantera
          </p>
          <h1
            className="mt-2 text-[2rem] tracking-[-0.04em]"
            style={{
              fontFamily: "var(--font-bodoni), serif",
              fontWeight: 400,
            }}
          >
            Nyheter
          </h1>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-[0.8125rem] font-medium text-primary-foreground transition-all hover:opacity-90 active:scale-[0.98]"
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            boxShadow:
              "0px 2px 1px 0px rgba(255,255,255,0.15) inset, 0px -2px 1px 0px rgba(0,0,0,0.05) inset",
          }}
        >
          <Plus size={16} />
          Ny artikel
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-border bg-card">
        <table className="w-full text-[0.8125rem]">
          <thead>
            <tr className="border-b border-border">
              {["Titel", "Status", "Datum", "Atgarder"].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left font-medium uppercase tracking-[0.1em] text-muted-foreground"
                  style={{
                    fontFamily: "var(--font-geist-mono), monospace",
                    fontSize: "0.625rem",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-8 text-center text-muted-foreground"
                >
                  Laddar...
                </td>
              </tr>
            ) : posts.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-8 text-center text-muted-foreground"
                >
                  Inga artiklar skapade
                </td>
              </tr>
            ) : (
              posts.map((post, i) => (
                <tr
                  key={post.id}
                  className={`border-b border-border last:border-0 transition-colors hover:bg-secondary/50 ${
                    i % 2 === 0 ? "" : "bg-secondary/20"
                  }`}
                >
                  <td className="px-4 py-3">
                    <div>
                      <span className="font-medium">{post.title}</span>
                      <span
                        className="ml-2 text-[0.6875rem] text-muted-foreground"
                        style={{
                          fontFamily: "var(--font-geist-mono), monospace",
                        }}
                      >
                        /{post.slug}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {post.published ? (
                      <span
                        className="inline-block rounded-full bg-green-100 px-2.5 py-0.5 text-[0.6875rem] font-medium text-green-700 dark:bg-green-950 dark:text-green-300"
                        style={{
                          fontFamily: "var(--font-geist-mono), monospace",
                        }}
                      >
                        Publicerad
                      </span>
                    ) : (
                      <span
                        className="inline-block rounded-full bg-amber-100 px-2.5 py-0.5 text-[0.6875rem] font-medium text-amber-700 dark:bg-amber-950 dark:text-amber-300"
                        style={{
                          fontFamily: "var(--font-geist-mono), monospace",
                        }}
                      >
                        Utkast
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {post.published_at
                      ? formatDate(post.published_at)
                      : formatDate(post.created_at)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => openEdit(post)}
                        className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                        title="Redigera"
                      >
                        <Pencil size={14} />
                      </button>
                      {deleteConfirm === post.id ? (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleDelete(post.id)}
                            className="rounded-md p-1.5 text-destructive transition-colors hover:bg-destructive/10"
                            title="Bekrafta"
                          >
                            <Check size={14} />
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(null)}
                            className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-secondary"
                            title="Avbryt"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirm(post.id)}
                          className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                          title="Ta bort"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
