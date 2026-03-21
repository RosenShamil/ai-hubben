"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { Pencil, Trash2, X, Check, AlertTriangle } from "lucide-react";

interface Assistant {
  id: string;
  name: string;
  description: string | null;
  organization: string | null;
  chat_url: string | null;
  prompt: string | null;
  setup_instructions: string | null;
  submitted_by: string | null;
  created_at: string;
  assistant_link: string | null;
  regions: string[] | null;
}

const emptyForm = {
  name: "",
  description: "",
  organization: "",
  chat_url: "",
  prompt: "",
  setup_instructions: "",
};

export default function AdminAssistenterPage() {
  const [assistants, setAssistants] = useState<Assistant[]>([]);
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

  const showToast = useCallback(
    (type: "success" | "error", message: string) => {
      setToast({ type, message });
      setTimeout(() => setToast(null), 3000);
    },
    []
  );

  const fetchAssistants = useCallback(async () => {
    const { data, error } = await supabase
      .from("assistants")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      showToast("error", "Kunde inte hamta assistenter");
      return;
    }
    setAssistants(data ?? []);
    setLoading(false);
  }, [showToast]);

  useEffect(() => {
    fetchAssistants();
  }, [fetchAssistants]);

  function openEdit(a: Assistant) {
    setForm({
      name: a.name ?? "",
      description: a.description ?? "",
      organization: a.organization ?? "",
      chat_url: a.chat_url ?? "",
      prompt: a.prompt ?? "",
      setup_instructions: a.setup_instructions ?? "",
    });
    setEditingId(a.id);
    setModalOpen(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!editingId) return;
    setSaving(true);

    const payload = {
      name: form.name,
      description: form.description || null,
      organization: form.organization || null,
      chat_url: form.chat_url || null,
      prompt: form.prompt || null,
      setup_instructions: form.setup_instructions || null,
    };

    const { error } = await supabase
      .from("assistants")
      .update(payload)
      .eq("id", editingId);

    if (error) {
      showToast("error", "Kunde inte uppdatera: " + error.message);
    } else {
      showToast("success", "Assistenten uppdaterad");
    }

    setSaving(false);
    setModalOpen(false);
    fetchAssistants();
  }

  async function handleDelete(id: string) {
    const { error } = await supabase
      .from("assistants")
      .delete()
      .eq("id", id);

    if (error) {
      showToast("error", "Kunde inte ta bort: " + error.message);
    } else {
      showToast("success", "Assistenten borttagen");
    }
    setDeleteConfirm(null);
    fetchAssistants();
  }

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("sv-SE");
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
      <div className="mb-6">
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
          Assistenter
        </h1>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-border bg-card">
        <table className="w-full text-[0.8125rem]">
          <thead>
            <tr className="border-b border-border">
              {[
                "Namn",
                "Organisation",
                "Chattlank",
                "Inskickad av",
                "Datum",
                "Atgarder",
              ].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left font-medium uppercase tracking-[0.1em] text-muted-foreground"
                  style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: "0.625rem" }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                  Laddar...
                </td>
              </tr>
            ) : assistants.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                  Inga assistenter hittades
                </td>
              </tr>
            ) : (
              assistants.map((a, i) => (
                <tr
                  key={a.id}
                  className={`border-b border-border last:border-0 transition-colors hover:bg-secondary/50 ${
                    !a.chat_url
                      ? "bg-amber-50/50 dark:bg-amber-950/20"
                      : i % 2 === 0
                      ? ""
                      : "bg-secondary/20"
                  }`}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {!a.chat_url && (
                        <span title="Saknar chattlank">
                          <AlertTriangle
                            size={14}
                            className="shrink-0 text-amber-500"
                          />
                        </span>
                      )}
                      <span className="font-medium">{a.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {a.organization ?? "—"}
                  </td>
                  <td className="max-w-[200px] truncate px-4 py-3">
                    {a.chat_url ? (
                      <a
                        href={a.chat_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline dark:text-blue-400"
                      >
                        {a.chat_url}
                      </a>
                    ) : (
                      <span className="text-amber-600 dark:text-amber-400">
                        Saknas
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {a.submitted_by ?? "—"}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">
                    {formatDate(a.created_at)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => openEdit(a)}
                        className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                        title="Redigera"
                      >
                        <Pencil size={14} />
                      </button>
                      {deleteConfirm === a.id ? (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleDelete(a.id)}
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
                          onClick={() => setDeleteConfirm(a.id)}
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

      {/* Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-[600px] max-h-[90vh] overflow-y-auto rounded-lg border border-border bg-card shadow-xl">
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <h2
                className="text-[1.125rem] tracking-[-0.02em]"
                style={{
                  fontFamily: "var(--font-bodoni), serif",
                  fontWeight: 400,
                }}
              >
                Redigera assistent
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
                  Namn *
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-[0.875rem] outline-none focus:border-foreground"
                />
              </div>

              <div>
                <label
                  className="mb-1.5 block text-[0.625rem] font-medium uppercase tracking-[0.1em] text-muted-foreground"
                  style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                >
                  Organisation
                </label>
                <input
                  type="text"
                  value={form.organization}
                  onChange={(e) =>
                    setForm({ ...form, organization: e.target.value })
                  }
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-[0.875rem] outline-none focus:border-foreground"
                />
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
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-[0.875rem] outline-none focus:border-foreground resize-none"
                />
              </div>

              <div>
                <label
                  className="mb-1.5 block text-[0.625rem] font-medium uppercase tracking-[0.1em] text-muted-foreground"
                  style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                >
                  Chattlank (URL)
                </label>
                <input
                  type="url"
                  value={form.chat_url}
                  onChange={(e) =>
                    setForm({ ...form, chat_url: e.target.value })
                  }
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-[0.875rem] outline-none focus:border-foreground"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label
                  className="mb-1.5 block text-[0.625rem] font-medium uppercase tracking-[0.1em] text-muted-foreground"
                  style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                >
                  Prompt
                </label>
                <textarea
                  value={form.prompt}
                  onChange={(e) =>
                    setForm({ ...form, prompt: e.target.value })
                  }
                  rows={4}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-[0.875rem] outline-none focus:border-foreground resize-none font-mono text-[0.8125rem]"
                />
              </div>

              <div>
                <label
                  className="mb-1.5 block text-[0.625rem] font-medium uppercase tracking-[0.1em] text-muted-foreground"
                  style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                >
                  Installationsinstruktioner
                </label>
                <textarea
                  value={form.setup_instructions}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      setup_instructions: e.target.value,
                    })
                  }
                  rows={3}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-[0.875rem] outline-none focus:border-foreground resize-none"
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
                  {saving ? "Sparar..." : "Uppdatera"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
