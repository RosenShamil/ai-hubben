"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, Pencil, Trash2, X, Check } from "lucide-react";

interface TrainingSession {
  id: string;
  date: string;
  type: "workshop" | "individual";
  department: string;
  role_group: string;
  participants: number;
  description: string | null;
  created_at: string;
}

const DEPARTMENTS = [
  "Kommunledningsforvaltningen",
  "Bildningsforvaltningen",
  "Vard- och omsorgsforvaltningen",
  "Samhallsbyggnadsforvaltningen",
  "Socialforvaltningen",
  "Kultur- och turismforvaltningen",
];

const ROLE_GROUPS = [
  "Forvaltningschefer",
  "Chefer",
  "Rektorer",
  "Larare",
  "Pedagoger",
  "Sjukskoterskor",
  "Administratorer",
  "Ovriga",
];

const emptyForm = {
  date: "",
  type: "workshop" as "workshop" | "individual",
  department: DEPARTMENTS[0],
  role_group: ROLE_GROUPS[0],
  participants: 0,
  description: "",
};

export default function AdminUtbildningPage() {
  const [sessions, setSessions] = useState<TrainingSession[]>([]);
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

  const fetchSessions = useCallback(async () => {
    const { data, error } = await supabase
      .from("training_sessions")
      .select("*")
      .order("date", { ascending: false });

    if (error) {
      showToast("error", "Kunde inte hamta utbildningar");
      return;
    }
    setSessions(data ?? []);
    setLoading(false);
  }, [showToast]);

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  function openCreate() {
    setForm(emptyForm);
    setEditingId(null);
    setModalOpen(true);
  }

  function openEdit(session: TrainingSession) {
    setForm({
      date: session.date,
      type: session.type,
      department: session.department,
      role_group: session.role_group,
      participants: session.participants,
      description: session.description ?? "",
    });
    setEditingId(session.id);
    setModalOpen(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const payload = {
      date: form.date,
      type: form.type,
      department: form.department,
      role_group: form.role_group,
      participants: form.participants,
      description: form.description || null,
    };

    if (editingId) {
      const { error } = await supabase
        .from("training_sessions")
        .update(payload)
        .eq("id", editingId);
      if (error) {
        showToast("error", "Kunde inte uppdatera: " + error.message);
      } else {
        showToast("success", "Utbildningstillfallet uppdaterat");
      }
    } else {
      const { error } = await supabase
        .from("training_sessions")
        .insert(payload);
      if (error) {
        showToast("error", "Kunde inte skapa: " + error.message);
      } else {
        showToast("success", "Utbildningstillfallet tillagt");
      }
    }

    setSaving(false);
    setModalOpen(false);
    fetchSessions();
  }

  async function handleDelete(id: string) {
    const { error } = await supabase
      .from("training_sessions")
      .delete()
      .eq("id", id);
    if (error) {
      showToast("error", "Kunde inte ta bort: " + error.message);
    } else {
      showToast("success", "Utbildningstillfallet borttaget");
    }
    setDeleteConfirm(null);
    fetchSessions();
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
            Utbildning
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
          Lagg till
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-border bg-card">
        <table className="w-full text-[0.8125rem]">
          <thead>
            <tr className="border-b border-border">
              {[
                "Datum",
                "Typ",
                "Forvaltning",
                "Yrkesgrupp",
                "Deltagare",
                "Beskrivning",
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
                <td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">
                  Laddar...
                </td>
              </tr>
            ) : sessions.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">
                  Inga utbildningstillfallen registrerade
                </td>
              </tr>
            ) : (
              sessions.map((s, i) => (
                <tr
                  key={s.id}
                  className={`border-b border-border last:border-0 transition-colors hover:bg-secondary/50 ${
                    i % 2 === 0 ? "" : "bg-secondary/20"
                  }`}
                >
                  <td className="whitespace-nowrap px-4 py-3">{s.date}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block rounded-full px-2 py-0.5 text-[0.6875rem] font-medium ${
                        s.type === "workshop"
                          ? "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                          : "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300"
                      }`}
                    >
                      {s.type === "workshop" ? "Workshop" : "Individuell"}
                    </span>
                  </td>
                  <td className="px-4 py-3">{s.department}</td>
                  <td className="px-4 py-3">{s.role_group}</td>
                  <td className="px-4 py-3 text-center">{s.participants}</td>
                  <td className="max-w-[200px] truncate px-4 py-3 text-muted-foreground">
                    {s.description ?? "—"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => openEdit(s)}
                        className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                        title="Redigera"
                      >
                        <Pencil size={14} />
                      </button>
                      {deleteConfirm === s.id ? (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleDelete(s.id)}
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
                          onClick={() => setDeleteConfirm(s.id)}
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
                {editingId ? "Redigera tillfalle" : "Nytt utbildningstillfalle"}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="rounded-md p-1 text-muted-foreground hover:text-foreground"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    className="mb-1.5 block text-[0.625rem] font-medium uppercase tracking-[0.1em] text-muted-foreground"
                    style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                  >
                    Datum *
                  </label>
                  <input
                    type="date"
                    required
                    value={form.date}
                    onChange={(e) =>
                      setForm({ ...form, date: e.target.value })
                    }
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
                        type: e.target.value as "workshop" | "individual",
                      })
                    }
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-[0.875rem] outline-none focus:border-foreground"
                  >
                    <option value="workshop">Workshop</option>
                    <option value="individual">Individuell</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  className="mb-1.5 block text-[0.625rem] font-medium uppercase tracking-[0.1em] text-muted-foreground"
                  style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                >
                  Forvaltning *
                </label>
                <select
                  required
                  value={form.department}
                  onChange={(e) =>
                    setForm({ ...form, department: e.target.value })
                  }
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-[0.875rem] outline-none focus:border-foreground"
                >
                  {DEPARTMENTS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  className="mb-1.5 block text-[0.625rem] font-medium uppercase tracking-[0.1em] text-muted-foreground"
                  style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                >
                  Yrkesgrupp *
                </label>
                <select
                  required
                  value={form.role_group}
                  onChange={(e) =>
                    setForm({ ...form, role_group: e.target.value })
                  }
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-[0.875rem] outline-none focus:border-foreground"
                >
                  {ROLE_GROUPS.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  className="mb-1.5 block text-[0.625rem] font-medium uppercase tracking-[0.1em] text-muted-foreground"
                  style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                >
                  Antal deltagare *
                </label>
                <input
                  type="number"
                  required
                  min={1}
                  value={form.participants || ""}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      participants: parseInt(e.target.value) || 0,
                    })
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
                  {saving ? "Sparar..." : editingId ? "Uppdatera" : "Lagg till"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
