"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, Pencil, Trash2, X, Check, Loader2, ArrowUp, ArrowDown } from "lucide-react";
import type { ContactEntry } from "@/lib/contact-entries";

const emptyForm = {
  label: "",
  title: "",
  description: "",
  email: "",
  phone: "",
  is_highlighted: false,
  sort_order: 0,
};

export default function AdminKontaktPage() {
  const [entries, setEntries] = useState<ContactEntry[]>([]);
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

  const fetchEntries = useCallback(async () => {
    const { data, error } = await supabase
      .from("contact_entries")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) {
      showToast("error", "Kunde inte hämta kontaktposter");
      return;
    }
    setEntries((data ?? []) as ContactEntry[]);
    setLoading(false);
  }, [showToast]);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  function openCreate() {
    setForm(emptyForm);
    setEditingId(null);
    setModalOpen(true);
  }

  function openEdit(entry: ContactEntry) {
    setForm({
      label: entry.label,
      title: entry.title,
      description: entry.description ?? "",
      email: entry.email ?? "",
      phone: entry.phone ?? "",
      is_highlighted: entry.is_highlighted,
      sort_order: entry.sort_order,
    });
    setEditingId(entry.id);
    setModalOpen(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const payload = {
      label: form.label.trim(),
      title: form.title.trim(),
      description: form.description.trim() || null,
      email: form.email.trim() || null,
      phone: form.phone.trim() || null,
      is_highlighted: form.is_highlighted,
      sort_order: form.sort_order,
    };

    if (editingId) {
      const { error } = await supabase
        .from("contact_entries")
        .update(payload)
        .eq("id", editingId);
      if (error) {
        showToast("error", "Kunde inte uppdatera: " + error.message);
      } else {
        showToast("success", "Kontaktpost uppdaterad");
      }
    } else {
      const { error } = await supabase.from("contact_entries").insert(payload);
      if (error) {
        showToast("error", "Kunde inte skapa: " + error.message);
      } else {
        showToast("success", "Kontaktpost tillagd");
      }
    }

    setSaving(false);
    setModalOpen(false);
    fetchEntries();
  }

  async function handleMove(index: number, direction: "up" | "down") {
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === entries.length - 1) return;
    const swapIndex = direction === "up" ? index - 1 : index + 1;
    const a = entries[index];
    const b = entries[swapIndex];
    await Promise.all([
      supabase.from("contact_entries").update({ sort_order: b.sort_order }).eq("id", a.id),
      supabase.from("contact_entries").update({ sort_order: a.sort_order }).eq("id", b.id),
    ]);
    fetchEntries();
  }

  async function handleDelete(id: string) {
    const { error } = await supabase
      .from("contact_entries")
      .delete()
      .eq("id", id);
    if (error) {
      showToast("error", "Kunde inte ta bort: " + error.message);
    } else {
      showToast("success", "Kontaktpost borttagen");
    }
    setDeleteConfirm(null);
    fetchEntries();
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
            Kontaktposter
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
              {["Etikett", "Titel", "E-post", "Telefon", "Markerad", "Ordning", "Åtgärder"].map(
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
                  colSpan={7}
                  className="px-4 py-8 text-center text-muted-foreground"
                >
                  Laddar...
                </td>
              </tr>
            ) : entries.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-8 text-center text-muted-foreground"
                >
                  Inga kontaktposter
                </td>
              </tr>
            ) : (
              entries.map((entry, i) => (
                <tr
                  key={entry.id}
                  className={`border-b border-border last:border-0 transition-colors hover:bg-secondary/50 ${
                    i % 2 === 0 ? "" : "bg-secondary/20"
                  }`}
                >
                  <td className="px-4 py-3 font-medium">{entry.label}</td>
                  <td className="px-4 py-3">{entry.title}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {entry.email ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {entry.phone ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {entry.is_highlighted ? "Ja" : "Nej"}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {entry.sort_order}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button onClick={() => handleMove(i, "up")} disabled={i === 0} className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground disabled:opacity-30 disabled:pointer-events-none" title="Flytta upp"><ArrowUp size={14} /></button>
                      <button onClick={() => handleMove(i, "down")} disabled={i === entries.length - 1} className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground disabled:opacity-30 disabled:pointer-events-none" title="Flytta ner"><ArrowDown size={14} /></button>
                      <button
                        onClick={() => openEdit(entry)}
                        className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                        title="Redigera"
                      >
                        <Pencil size={14} />
                      </button>
                      {deleteConfirm === entry.id ? (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleDelete(entry.id)}
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
                          onClick={() => setDeleteConfirm(entry.id)}
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
                {editingId ? "Redigera kontaktpost" : "Ny kontaktpost"}
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
                  Etikett *
                </label>
                <input
                  type="text"
                  required
                  value={form.label}
                  onChange={(e) => setForm({ ...form, label: e.target.value })}
                  placeholder="T.ex. Avdelning, IT-support, Kontaktperson"
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-[0.875rem] outline-none focus:border-foreground"
                />
              </div>

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
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="T.ex. Digitaliseringsavdelningen"
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
                <input
                  type="text"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  placeholder="T.ex. Katrineholms kommun"
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-[0.875rem] outline-none focus:border-foreground"
                />
              </div>

              <div>
                <label
                  className="mb-1.5 block text-[0.625rem] font-medium uppercase tracking-[0.1em] text-muted-foreground"
                  style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                >
                  E-post
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="namn@katrineholm.se"
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-[0.875rem] outline-none focus:border-foreground"
                />
              </div>

              <div>
                <label
                  className="mb-1.5 block text-[0.625rem] font-medium uppercase tracking-[0.1em] text-muted-foreground"
                  style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                >
                  Telefon
                </label>
                <input
                  type="text"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="0150-569 00"
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-[0.875rem] outline-none focus:border-foreground"
                />
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <label
                    className="text-[0.625rem] font-medium uppercase tracking-[0.1em] text-muted-foreground"
                    style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                  >
                    Ordning
                  </label>
                  <input
                    type="number"
                    value={form.sort_order}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        sort_order: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-20 rounded-md border border-border bg-background px-3 py-2 text-[0.875rem] outline-none focus:border-foreground"
                  />
                </div>
                <label className="flex items-center gap-2 text-[0.8125rem] text-muted-foreground cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.is_highlighted}
                    onChange={(e) =>
                      setForm({ ...form, is_highlighted: e.target.checked })
                    }
                    className="rounded border-border"
                  />
                  Markerad (visas som kort)
                </label>
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
                  className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-[0.8125rem] font-medium text-primary-foreground transition-all hover:opacity-90 disabled:opacity-50"
                  style={{
                    fontFamily: "var(--font-geist-mono), monospace",
                    boxShadow:
                      "0px 2px 1px 0px rgba(255,255,255,0.15) inset, 0px -2px 1px 0px rgba(0,0,0,0.05) inset",
                  }}
                >
                  {saving ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : null}
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
