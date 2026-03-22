"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, Pencil, Trash2, X, Check, ExternalLink, Upload, Loader2 } from "lucide-react";

interface TrainingResource {
  id: string;
  title: string;
  description: string | null;
  type: "guide" | "video" | "pdf" | "kurs";
  url: string | null;
  created_at: string;
}

const RESOURCE_TYPES = [
  { value: "guide", label: "Guide" },
  { value: "video", label: "Video" },
  { value: "pdf", label: "PDF" },
  { value: "kurs", label: "Kurs" },
];

const emptyForm = {
  title: "",
  description: "",
  type: "guide" as "guide" | "video" | "pdf" | "kurs",
  url: "",
};

export default function AdminResurserPage() {
  const [resources, setResources] = useState<TrainingResource[]>([]);
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

  const fetchResources = useCallback(async () => {
    const { data, error } = await supabase
      .from("training_resources")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      showToast("error", "Kunde inte hämta resurser");
      return;
    }
    setResources(data ?? []);
    setLoading(false);
  }, [showToast]);

  useEffect(() => {
    fetchResources();
  }, [fetchResources]);

  function openCreate() {
    setForm(emptyForm);
    setEditingId(null);
    setModalOpen(true);
  }

  function openEdit(resource: TrainingResource) {
    setForm({
      title: resource.title,
      description: resource.description ?? "",
      type: resource.type,
      url: resource.url ?? "",
    });
    setEditingId(resource.id);
    setModalOpen(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const payload = {
      title: form.title.trim(),
      description: form.description.trim() || null,
      type: form.type,
      url: form.url.trim() || null,
    };

    if (editingId) {
      const { error } = await supabase
        .from("training_resources")
        .update(payload)
        .eq("id", editingId);
      if (error) {
        showToast("error", "Kunde inte uppdatera: " + error.message);
      } else {
        showToast("success", "Resursen uppdaterad");
      }
    } else {
      const { error } = await supabase
        .from("training_resources")
        .insert(payload);
      if (error) {
        showToast("error", "Kunde inte skapa: " + error.message);
      } else {
        showToast("success", "Resursen tillagd");
      }
    }

    setSaving(false);
    setModalOpen(false);
    fetchResources();
  }

  async function handleDelete(id: string) {
    const { error } = await supabase
      .from("training_resources")
      .delete()
      .eq("id", id);
    if (error) {
      showToast("error", "Kunde inte ta bort: " + error.message);
    } else {
      showToast("success", "Resursen borttagen");
    }
    setDeleteConfirm(null);
    fetchResources();
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);

    const ext = file.name.split(".").pop();
    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { error } = await supabase.storage
      .from("training-resources")
      .upload(path, file);

    if (error) {
      showToast("error", "Uppladdning misslyckades: " + error.message);
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage
      .from("training-resources")
      .getPublicUrl(path);

    setForm({ ...form, url: urlData.publicUrl });
    setUploading(false);
    showToast("success", "Filen uppladdad");
  }

  const typeLabel: Record<string, string> = {
    guide: "Guide",
    video: "Video",
    pdf: "PDF",
    kurs: "Kurs",
  };

  const typeColor: Record<string, string> = {
    guide:
      "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300",
    video:
      "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
    pdf: "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300",
    kurs: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  };

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
            Utbildningsmaterial
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
              {["Titel", "Typ", "Beskrivning", "Länk", "Åtgärder"].map(
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
                  colSpan={5}
                  className="px-4 py-8 text-center text-muted-foreground"
                >
                  Laddar...
                </td>
              </tr>
            ) : resources.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-8 text-center text-muted-foreground"
                >
                  Inga resurser registrerade
                </td>
              </tr>
            ) : (
              resources.map((r, i) => (
                <tr
                  key={r.id}
                  className={`border-b border-border last:border-0 transition-colors hover:bg-secondary/50 ${
                    i % 2 === 0 ? "" : "bg-secondary/20"
                  }`}
                >
                  <td className="px-4 py-3 font-medium">{r.title}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block rounded-full px-2 py-0.5 text-[0.6875rem] font-medium ${
                        typeColor[r.type] || ""
                      }`}
                    >
                      {typeLabel[r.type] || r.type}
                    </span>
                  </td>
                  <td className="max-w-[250px] truncate px-4 py-3 text-muted-foreground">
                    {r.description ?? "—"}
                  </td>
                  <td className="px-4 py-3">
                    {r.url ? (
                      <a
                        href={r.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[0.75rem] text-foreground hover:text-muted-foreground"
                      >
                        <ExternalLink size={12} />
                        Öppna
                      </a>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => openEdit(r)}
                        className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                        title="Redigera"
                      >
                        <Pencil size={14} />
                      </button>
                      {deleteConfirm === r.id ? (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleDelete(r.id)}
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
                          onClick={() => setDeleteConfirm(r.id)}
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
                {editingId ? "Redigera resurs" : "Ny resurs"}
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
                  placeholder="Namn på resursen"
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-[0.875rem] outline-none focus:border-foreground"
                />
              </div>

              <div>
                <label
                  className="mb-1.5 block text-[0.625rem] font-medium uppercase tracking-[0.1em] text-muted-foreground"
                  style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                >
                  Typ *
                </label>
                <select
                  required
                  value={form.type}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      type: e.target.value as
                        | "guide"
                        | "video"
                        | "pdf"
                        | "kurs",
                    })
                  }
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-[0.875rem] outline-none focus:border-foreground"
                >
                  {RESOURCE_TYPES.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
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
                  placeholder="Kort beskrivning av resursen"
                  className="w-full resize-none rounded-md border border-border bg-background px-3 py-2 text-[0.875rem] outline-none focus:border-foreground"
                />
              </div>

              <div>
                <label
                  className="mb-1.5 block text-[0.625rem] font-medium uppercase tracking-[0.1em] text-muted-foreground"
                  style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                >
                  Länk (URL) eller ladda upp fil
                </label>
                <input
                  type="url"
                  value={form.url}
                  onChange={(e) =>
                    setForm({ ...form, url: e.target.value })
                  }
                  placeholder="https://..."
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-[0.875rem] outline-none focus:border-foreground"
                />
                <label className="mt-2 flex cursor-pointer items-center gap-2 rounded-md border border-dashed border-border bg-background px-3 py-3 text-[0.8125rem] text-muted-foreground transition-colors hover:border-foreground hover:text-foreground">
                  {uploading ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Upload size={16} />
                  )}
                  {uploading ? "Laddar upp..." : "Ladda upp fil (PDF, Word, etc.)"}
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.mp4,.webm,.png,.jpg,.jpeg"
                    onChange={handleFileUpload}
                    disabled={uploading}
                  />
                </label>
                {form.url && (
                  <p className="mt-1.5 truncate text-[0.75rem] text-muted-foreground">
                    {form.url}
                  </p>
                )}
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
