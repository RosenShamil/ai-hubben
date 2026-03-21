"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Check,
  ExternalLink,
  FileText,
  Shield,
  BookOpen,
  BarChart3,
  FileSpreadsheet,
  File,
  Upload,
  Loader2,
  Youtube,
} from "lucide-react";
import type { Document } from "@/lib/documents";

type CategoryValue = Document["category"];

const DOCUMENT_CATEGORIES: { value: CategoryValue; label: string }[] = [
  { value: "riktlinje", label: "Riktlinje" },
  { value: "policy", label: "Policy" },
  { value: "guide", label: "Guide" },
  { value: "rapport", label: "Rapport" },
  { value: "mall", label: "Mall" },
  { value: "video", label: "Video" },
  { value: "ovrigt", label: "Övrigt" },
];

const CATEGORY_LABEL: Record<string, string> = {
  riktlinje: "Riktlinje",
  policy: "Policy",
  guide: "Guide",
  rapport: "Rapport",
  mall: "Mall",
  video: "Video",
  ovrigt: "Övrigt",
};

const CATEGORY_COLOR: Record<string, string> = {
  riktlinje:
    "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  policy:
    "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
  guide:
    "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300",
  rapport:
    "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300",
  mall: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  video: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
  ovrigt:
    "bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300",
};

const CATEGORY_ICON: Record<string, typeof FileText> = {
  riktlinje: FileText,
  policy: Shield,
  guide: BookOpen,
  rapport: BarChart3,
  mall: FileSpreadsheet,
  ovrigt: File,
};

const emptyForm = {
  title: "",
  description: "",
  category: "riktlinje" as CategoryValue,
  file_url: "",
  youtube_url: "",
};

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("sv-SE", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function AdminDokumentPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const showToast = useCallback(
    (type: "success" | "error", message: string) => {
      setToast({ type, message });
      setTimeout(() => setToast(null), 3000);
    },
    []
  );

  const fetchDocs = useCallback(async () => {
    const { data, error } = await supabase
      .from("documents")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      showToast("error", "Kunde inte hämta dokument");
      return;
    }
    setDocuments(data ?? []);
    setLoading(false);
  }, [showToast]);

  useEffect(() => {
    fetchDocs();
  }, [fetchDocs]);

  function openCreate() {
    setForm(emptyForm);
    setEditingId(null);
    setModalOpen(true);
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);

    const ext = file.name.split(".").pop();
    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { error } = await supabase.storage
      .from("documents")
      .upload(path, file);

    if (error) {
      showToast("error", "Uppladdning misslyckades: " + error.message);
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage
      .from("documents")
      .getPublicUrl(path);

    setForm({ ...form, file_url: urlData.publicUrl });
    setUploading(false);
    showToast("success", "Filen uppladdad");
  }

  function openEdit(doc: Document) {
    setForm({
      title: doc.title,
      description: doc.description ?? "",
      category: doc.category,
      file_url: doc.file_url ?? "",
      youtube_url: doc.youtube_url ?? "",
    });
    setEditingId(doc.id);
    setModalOpen(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const payload = {
      title: form.title.trim(),
      description: form.description.trim() || null,
      category: form.category,
      file_url: form.file_url.trim() || null,
      youtube_url: form.youtube_url.trim() || null,
    };

    if (editingId) {
      const { error } = await supabase
        .from("documents")
        .update(payload)
        .eq("id", editingId);
      if (error) {
        showToast("error", "Kunde inte uppdatera: " + error.message);
      } else {
        showToast("success", "Dokumentet uppdaterat");
      }
    } else {
      const { error } = await supabase.from("documents").insert(payload);
      if (error) {
        showToast("error", "Kunde inte skapa: " + error.message);
      } else {
        showToast("success", "Dokumentet tillagt");
      }
    }

    setSaving(false);
    setModalOpen(false);
    fetchDocs();
  }

  async function handleDelete(id: string) {
    const { error } = await supabase
      .from("documents")
      .delete()
      .eq("id", id);
    if (error) {
      showToast("error", "Kunde inte ta bort: " + error.message);
    } else {
      showToast("success", "Dokumentet borttaget");
    }
    setDeleteConfirm(null);
    fetchDocs();
  }

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
            Dokument
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
          Lägg till
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-border bg-card">
        <table className="w-full text-[0.8125rem]">
          <thead>
            <tr className="border-b border-border">
              {["Titel", "Kategori", "Beskrivning", "Länk", "Datum", "Åtgärder"].map(
                (h) => (
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
                )
              )}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-8 text-center text-muted-foreground"
                >
                  Laddar...
                </td>
              </tr>
            ) : documents.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-8 text-center text-muted-foreground"
                >
                  Inga dokument registrerade
                </td>
              </tr>
            ) : (
              documents.map((doc, i) => {
                const Icon = CATEGORY_ICON[doc.category] || File;
                return (
                  <tr
                    key={doc.id}
                    className={`border-b border-border last:border-0 transition-colors hover:bg-secondary/50 ${
                      i % 2 === 0 ? "" : "bg-secondary/20"
                    }`}
                  >
                    <td className="px-4 py-3 font-medium">
                      <div className="flex items-center gap-2">
                        <Icon size={14} className="text-muted-foreground" />
                        {doc.title}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block rounded-full px-2 py-0.5 text-[0.6875rem] font-medium ${
                          CATEGORY_COLOR[doc.category] || ""
                        }`}
                      >
                        {CATEGORY_LABEL[doc.category] || doc.category}
                      </span>
                    </td>
                    <td className="max-w-[250px] truncate px-4 py-3 text-muted-foreground">
                      {doc.description ?? "—"}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {doc.file_url ? (
                          <a
                            href={doc.file_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[0.75rem] text-foreground hover:text-muted-foreground"
                          >
                            <ExternalLink size={12} />
                            Fil
                          </a>
                        ) : null}
                        {doc.youtube_url ? (
                          <a
                            href={doc.youtube_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[0.75rem] text-red-600 hover:text-red-400"
                          >
                            <Youtube size={12} />
                            Video
                          </a>
                        ) : null}
                        {!doc.file_url && !doc.youtube_url && (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {formatDate(doc.created_at)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => openEdit(doc)}
                          className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                          title="Redigera"
                        >
                          <Pencil size={14} />
                        </button>
                        {deleteConfirm === doc.id ? (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleDelete(doc.id)}
                              className="rounded-md p-1.5 text-destructive transition-colors hover:bg-destructive/10"
                              title="Bekräfta"
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
                            onClick={() => setDeleteConfirm(doc.id)}
                            className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                            title="Ta bort"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-[520px] rounded-lg border border-border bg-card shadow-xl">
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <h2
                className="text-[1.125rem] tracking-[-0.02em]"
                style={{
                  fontFamily: "var(--font-bodoni), serif",
                  fontWeight: 400,
                }}
              >
                {editingId ? "Redigera dokument" : "Nytt dokument"}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="rounded-md p-1 text-muted-foreground hover:text-foreground"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 p-6">
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
                  onChange={(e) =>
                    setForm({ ...form, title: e.target.value })
                  }
                  placeholder="Namn på dokumentet"
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-[0.875rem] outline-none focus:border-foreground"
                />
              </div>

              <div>
                <label
                  className="mb-1.5 block text-[0.625rem] font-medium uppercase tracking-[0.1em] text-muted-foreground"
                  style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                >
                  Kategori *
                </label>
                <select
                  required
                  value={form.category}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      category: e.target.value as CategoryValue,
                    })
                  }
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-[0.875rem] outline-none focus:border-foreground"
                >
                  {DOCUMENT_CATEGORIES.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  className="mb-1.5 block text-[0.625rem] font-medium uppercase tracking-[0.1em] text-muted-foreground"
                  style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                >
                  Beskrivning
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  rows={3}
                  placeholder="Kort beskrivning av dokumentet"
                  className="w-full resize-none rounded-md border border-border bg-background px-3 py-2 text-[0.875rem] outline-none focus:border-foreground"
                />
              </div>

              <div>
                <label
                  className="mb-1.5 block text-[0.625rem] font-medium uppercase tracking-[0.1em] text-muted-foreground"
                  style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                >
                  Fil
                </label>
                {form.file_url ? (
                  <div className="flex items-center gap-2">
                    <a
                      href={form.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 truncate rounded-md border border-border bg-background px-3 py-2 text-[0.8125rem] text-foreground hover:underline"
                    >
                      {form.file_url.split("/").pop()}
                    </a>
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, file_url: "" })}
                      className="rounded-md p-2 text-muted-foreground hover:bg-secondary hover:text-foreground"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <label className="flex cursor-pointer items-center gap-2 rounded-md border border-dashed border-border bg-background px-3 py-3 text-[0.8125rem] text-muted-foreground transition-colors hover:border-foreground hover:text-foreground">
                    {uploading ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <Upload size={16} />
                    )}
                    {uploading ? "Laddar upp..." : "Ladda upp fil (PDF, Word, etc.)"}
                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv"
                      onChange={handleFileUpload}
                      disabled={uploading}
                    />
                  </label>
                )}
              </div>

              <div>
                <label
                  className="mb-1.5 flex items-center gap-1.5 text-[0.625rem] font-medium uppercase tracking-[0.1em] text-muted-foreground"
                  style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                >
                  <Youtube size={12} />
                  YouTube-länk
                </label>
                <input
                  type="url"
                  value={form.youtube_url}
                  onChange={(e) =>
                    setForm({ ...form, youtube_url: e.target.value })
                  }
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-[0.875rem] outline-none focus:border-foreground"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="rounded-md border border-border px-4 py-2 text-[0.8125rem] transition-colors hover:bg-secondary"
                >
                  Avbryt
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-md bg-primary px-4 py-2 text-[0.8125rem] font-medium text-primary-foreground transition-all hover:opacity-90 disabled:opacity-50"
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
                      : "Lägg till"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
