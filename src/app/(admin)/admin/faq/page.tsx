"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, Pencil, Trash2, X, Check, HelpCircle, ArrowUp, ArrowDown, ChevronDown, ExternalLink } from "lucide-react";
import type { FAQ } from "@/lib/faqs";

const emptyForm = {
  question: "",
  answer: "",
  sort_order: 0,
};

export default function AdminFaqPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
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
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const showToast = useCallback(
    (type: "success" | "error", message: string) => {
      setToast({ type, message });
      setTimeout(() => setToast(null), 3000);
    },
    []
  );

  const fetchData = useCallback(async () => {
    const { data, error } = await supabase
      .from("faqs")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) {
      showToast("error", "Kunde inte hämta FAQ");
      return;
    }
    setFaqs(data ?? []);
    setLoading(false);
  }, [showToast]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  function openCreate() {
    setForm({ ...emptyForm, sort_order: faqs.length + 1 });
    setEditingId(null);
    setModalOpen(true);
  }

  function openEdit(faq: FAQ) {
    setForm({
      question: faq.question,
      answer: faq.answer,
      sort_order: faq.sort_order,
    });
    setEditingId(faq.id);
    setModalOpen(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const payload = {
      question: form.question.trim(),
      answer: form.answer.trim(),
      sort_order: form.sort_order,
    };

    if (editingId) {
      const { error } = await supabase
        .from("faqs")
        .update(payload)
        .eq("id", editingId);
      if (error) {
        showToast("error", "Kunde inte uppdatera: " + error.message);
      } else {
        showToast("success", "FAQ uppdaterad");
      }
    } else {
      const { error } = await supabase.from("faqs").insert(payload);
      if (error) {
        showToast("error", "Kunde inte skapa: " + error.message);
      } else {
        showToast("success", "FAQ tillagd");
      }
    }

    setSaving(false);
    setModalOpen(false);
    fetchData();
  }

  async function handleMove(index: number, direction: "up" | "down") {
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === faqs.length - 1) return;
    const swapIndex = direction === "up" ? index - 1 : index + 1;
    const a = faqs[index];
    const b = faqs[swapIndex];
    await Promise.all([
      supabase.from("faqs").update({ sort_order: b.sort_order }).eq("id", a.id),
      supabase.from("faqs").update({ sort_order: a.sort_order }).eq("id", b.id),
    ]);
    fetchData();
  }

  async function handleDelete(id: string) {
    const { error } = await supabase.from("faqs").delete().eq("id", id);
    if (error) {
      showToast("error", "Kunde inte ta bort: " + error.message);
    } else {
      showToast("success", "FAQ borttagen");
    }
    setDeleteConfirm(null);
    fetchData();
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
            FAQ
          </h1>
        </div>
        <div className="flex items-center gap-2">
        <a
          href="/faq"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 rounded-md border border-border px-3 py-2 text-[0.8125rem] text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          style={{ fontFamily: "var(--font-geist-mono), monospace" }}
        >
          <ExternalLink size={14} />
          Visa live
        </a>
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
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-border bg-card">
        <table className="w-full text-[0.8125rem]">
          <thead>
            <tr className="border-b border-border">
              {["Ordning", "Fråga", "Svar", "Åtgärder"].map((h) => (
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
            ) : faqs.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-8 text-center text-muted-foreground"
                >
                  Inga FAQ registrerade
                </td>
              </tr>
            ) : (
              faqs.flatMap((faq, i) => {
                const isExpanded = expandedId === faq.id;
                const rows = [
                  <tr
                    key={faq.id}
                    className={`border-b border-border last:border-0 transition-colors hover:bg-secondary/50 ${
                      isExpanded ? "bg-secondary/30" : i % 2 === 0 ? "" : "bg-secondary/20"
                    }`}
                  >
                    <td className="px-4 py-3 text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <HelpCircle
                          size={14}
                          className="text-muted-foreground"
                        />
                        {faq.sort_order}
                      </div>
                    </td>
                    <td
                      className="max-w-[300px] cursor-pointer px-4 py-3 font-medium"
                      onClick={() => setExpandedId(isExpanded ? null : faq.id)}
                    >
                      <div className="flex items-center gap-2">
                        <ChevronDown size={14} className={`shrink-0 text-muted-foreground transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                        <span className="truncate">{faq.question}</span>
                      </div>
                    </td>
                    <td className="max-w-[300px] truncate px-4 py-3 text-muted-foreground">
                      {faq.answer.slice(0, 60)}{faq.answer.length > 60 ? "..." : ""}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button onClick={() => handleMove(i, "up")} disabled={i === 0} className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground disabled:opacity-30 disabled:pointer-events-none" aria-label="Flytta upp"><ArrowUp size={14} /></button>
                        <button onClick={() => handleMove(i, "down")} disabled={i === faqs.length - 1} className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground disabled:opacity-30 disabled:pointer-events-none" aria-label="Flytta ner"><ArrowDown size={14} /></button>
                        <button
                          onClick={() => openEdit(faq)}
                          className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                          aria-label="Redigera"
                        >
                          <Pencil size={14} />
                        </button>
                        {deleteConfirm === faq.id ? (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleDelete(faq.id)}
                              className="rounded-md p-1.5 text-destructive transition-colors hover:bg-destructive/10"
                              aria-label="Bekräfta"
                            >
                              <Check size={14} />
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(null)}
                              className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-secondary"
                              aria-label="Avbryt"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setDeleteConfirm(faq.id)}
                            className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                            aria-label="Ta bort"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>,
                ];
                if (isExpanded) {
                  rows.push(
                    <tr key={`${faq.id}-answer`} className="border-b border-border">
                      <td colSpan={4} className="bg-secondary/10 px-4 py-4">
                        <p
                          className="text-[0.6875rem] font-medium uppercase tracking-[0.1em] text-muted-foreground"
                          style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                        >
                          Svar
                        </p>
                        <p className="mt-2 whitespace-pre-wrap text-[0.875rem] leading-[1.7] text-foreground/85">
                          {faq.answer}
                        </p>
                      </td>
                    </tr>
                  );
                }
                return rows;
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
                {editingId ? "Redigera FAQ" : "Ny FAQ"}
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
                  Fråga *
                </label>
                <input
                  type="text"
                  required
                  value={form.question}
                  onChange={(e) =>
                    setForm({ ...form, question: e.target.value })
                  }
                  placeholder="Skriv frågan här..."
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-[0.875rem] outline-none focus:border-foreground"
                />
              </div>

              <div>
                <label
                  className="mb-1.5 block text-[0.625rem] font-medium uppercase tracking-[0.1em] text-muted-foreground"
                  style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                >
                  Svar *
                </label>
                <textarea
                  required
                  value={form.answer}
                  onChange={(e) =>
                    setForm({ ...form, answer: e.target.value })
                  }
                  rows={5}
                  placeholder="Skriv svaret här... (Använd dubbla radbrytningar för nya stycken)"
                  className="w-full resize-none rounded-md border border-border bg-background px-3 py-2 text-[0.875rem] outline-none focus:border-foreground"
                />
              </div>

              <div>
                <label
                  className="mb-1.5 block text-[0.625rem] font-medium uppercase tracking-[0.1em] text-muted-foreground"
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
