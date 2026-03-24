"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { supabase } from "@/lib/supabase";
import {
  Pencil,
  Trash2,
  X,
  Check,
  AlertTriangle,
  Search,
  Eye,
  EyeOff,
  Globe,
  Upload,
} from "lucide-react";

const MARKETPLACE_URL = "https://marketplace.intric.ai/api";

const ALLOWED_ORGS = new Set([
  "katrineholms kommun",
  "intric ab",
  "intric ai",
  "gävle kommun",
  "lidköpings kommun",
  "mönsterås kommun",
  "trollhättans stad",
  "ab svenska bostäder",
  "atherfold consulting ab",
  "kundtjänst",
]);

const EXCLUDED_IDS = new Set([
  "b0dde2a3-31c1-45e4-8518-2f4608e4fa9d",
  "dfdf10f5-34ed-4ab3-9420-a73d8bbb6c86",
]);

interface AdminAssistant {
  id: string;
  name: string;
  description: string;
  organization: string;
  source: "marketplace" | "community";
  assistant_link: string | null;
  chat_url: string | null;
  prompt: string | null;
  setup_instructions: string | null;
  submitted_by: string | null;
  created_at: string;
  // Override data (marketplace only)
  override?: {
    description_extra: string | null;
    chat_url: string | null;
    prompt: string | null;
    setup_instructions: string | null;
    hidden: boolean;
  };
}

const monoStyle = { fontFamily: "var(--font-geist-mono), monospace" } as const;

export default function AdminAssistenterPage() {
  const [assistants, setAssistants] = useState<AdminAssistant[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [sourceFilter, setSourceFilter] = useState<"all" | "marketplace" | "community">("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingAssistant, setEditingAssistant] = useState<AdminAssistant | null>(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    description_extra: "",
    organization: "",
    chat_url: "",
    prompt: "",
    setup_instructions: "",
  });
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const showToast = useCallback(
    (type: "success" | "error", message: string) => {
      setToast({ type, message });
      setTimeout(() => setToast(null), 3000);
    },
    []
  );

  const fetchAll = useCallback(async () => {
    // Fetch marketplace, community, and overrides in parallel
    const [mpRes, comRes, ovRes] = await Promise.allSettled([
      fetch(`${MARKETPLACE_URL}/assistants`).then((r) => r.json()),
      supabase.from("assistants").select("*").order("created_at", { ascending: false }),
      supabase.from("assistant_overrides").select("*"),
    ]);

    const mpData = mpRes.status === "fulfilled" ? mpRes.value : [];
    const comData = comRes.status === "fulfilled" ? (comRes.value.data ?? []) : [];
    const ovData = ovRes.status === "fulfilled" ? (ovRes.value.data ?? []) : [];

    const overrideMap = new Map(
      ovData.map((o: { assistant_id: string }) => [o.assistant_id, o])
    );

    // Marketplace assistants (Swedish only)
    const marketplace: AdminAssistant[] = mpData
      .filter(
        (a: { id: string; organization: string }) =>
          ALLOWED_ORGS.has(a.organization.toLowerCase().trim()) &&
          !EXCLUDED_IDS.has(a.id)
      )
      .map((a: { id: string; name: string; description: string; organization: string; assistant_link: string; created_at: string }) => {
        const ov = overrideMap.get(a.id) as {
          description_extra: string | null;
          chat_url: string | null;
          prompt: string | null;
          setup_instructions: string | null;
          hidden: boolean;
        } | undefined;
        return {
          id: a.id,
          name: a.name,
          description: a.description || "",
          organization: a.organization,
          source: "marketplace" as const,
          assistant_link: a.assistant_link || null,
          chat_url: ov?.chat_url ?? null,
          prompt: ov?.prompt ?? null,
          setup_instructions: ov?.setup_instructions ?? null,
          submitted_by: null,
          created_at: a.created_at,
          override: ov ?? undefined,
        };
      });

    // Community assistants
    const community: AdminAssistant[] = comData.map(
      (a: {
        id: string;
        name: string;
        description: string | null;
        organization: string | null;
        chat_url: string | null;
        prompt: string | null;
        setup_instructions: string | null;
        submitted_by: string | null;
        created_at: string;
      }) => ({
        id: a.id,
        name: a.name,
        description: a.description || "",
        organization: a.organization || "",
        source: "community" as const,
        assistant_link: null,
        chat_url: a.chat_url ?? null,
        prompt: a.prompt ?? null,
        setup_instructions: a.setup_instructions ?? null,
        submitted_by: a.submitted_by ?? null,
        created_at: a.created_at,
      })
    );

    setAssistants([...marketplace, ...community]);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const filtered = useMemo(() => {
    let list = assistants;
    if (sourceFilter !== "all") {
      list = list.filter((a) => a.source === sourceFilter);
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.description.toLowerCase().includes(q) ||
          a.organization.toLowerCase().includes(q)
      );
    }
    return list;
  }, [assistants, query, sourceFilter]);

  const hiddenCount = assistants.filter((a) => a.override?.hidden).length;

  function openEdit(a: AdminAssistant) {
    setEditingAssistant(a);
    if (a.source === "marketplace") {
      setForm({
        name: a.name,
        description: a.description,
        description_extra: a.override?.description_extra ?? "",
        organization: a.organization,
        chat_url: a.override?.chat_url ?? "",
        prompt: a.override?.prompt ?? "",
        setup_instructions: a.override?.setup_instructions ?? "",
      });
    } else {
      setForm({
        name: a.name,
        description: a.description,
        description_extra: "",
        organization: a.organization,
        chat_url: a.chat_url ?? "",
        prompt: a.prompt ?? "",
        setup_instructions: a.setup_instructions ?? "",
      });
    }
    setModalOpen(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!editingAssistant) return;
    setSaving(true);

    if (editingAssistant.source === "marketplace") {
      // Upsert override
      const payload = {
        assistant_id: editingAssistant.id,
        description_extra: form.description_extra.trim() || null,
        chat_url: form.chat_url.trim() || null,
        prompt: form.prompt.trim() || null,
        setup_instructions: form.setup_instructions.trim() || null,
        hidden: editingAssistant.override?.hidden ?? false,
        updated_at: new Date().toISOString(),
      };
      const { error } = await supabase
        .from("assistant_overrides")
        .upsert(payload, { onConflict: "assistant_id" });

      if (error) {
        showToast("error", "Kunde inte spara: " + error.message);
      } else {
        showToast("success", "Override sparad");
      }
    } else {
      // Update community assistant
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
        .eq("id", editingAssistant.id);

      if (error) {
        showToast("error", "Kunde inte uppdatera: " + error.message);
      } else {
        showToast("success", "Assistenten uppdaterad");
      }
    }

    setSaving(false);
    setModalOpen(false);
    fetchAll();
  }

  async function handleToggleHidden(a: AdminAssistant) {
    const newHidden = !a.override?.hidden;
    const { error } = await supabase
      .from("assistant_overrides")
      .upsert(
        {
          assistant_id: a.id,
          hidden: newHidden,
          description_extra: a.override?.description_extra ?? null,
          chat_url: a.override?.chat_url ?? null,
          prompt: a.override?.prompt ?? null,
          setup_instructions: a.override?.setup_instructions ?? null,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "assistant_id" }
      );

    if (error) {
      showToast("error", "Kunde inte uppdatera: " + error.message);
    } else {
      showToast("success", newHidden ? "Assistenten dold" : "Assistenten synlig");
    }
    fetchAll();
  }

  async function handleDelete(id: string) {
    const { error } = await supabase.from("assistants").delete().eq("id", id);
    if (error) {
      showToast("error", "Kunde inte ta bort: " + error.message);
    } else {
      showToast("success", "Assistenten borttagen");
    }
    setDeleteConfirm(null);
    fetchAll();
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
            style={monoStyle}
          >
            Hantera
          </p>
          <h1
            className="mt-2 text-[2rem] tracking-[-0.04em]"
            style={{ fontFamily: "var(--font-bodoni), serif", fontWeight: 400 }}
          >
            Assistenter
          </h1>
        </div>
        <p className="text-[0.8125rem] text-muted-foreground" style={monoStyle}>
          {loading
            ? "..."
            : `${assistants.length} totalt${hiddenCount > 0 ? ` · ${hiddenCount} dolda` : ""}`}
        </p>
      </div>

      {/* Search + filter */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Sok assistenter..."
            className="w-full rounded-md border border-border bg-background py-2.5 pl-9 pr-9 text-[0.875rem] outline-none transition-colors focus:border-foreground"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X size={14} />
            </button>
          )}
        </div>
        <div className="flex gap-1">
          {(["all", "marketplace", "community"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setSourceFilter(f)}
              className={`rounded-md px-3 py-2 text-[0.75rem] font-medium transition-colors ${
                sourceFilter === f
                  ? "bg-primary text-primary-foreground"
                  : "border border-border text-muted-foreground hover:bg-secondary"
              }`}
              style={monoStyle}
            >
              {f === "all" ? "Alla" : f === "marketplace" ? "Marketplace" : "Uppladdade"}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-border bg-card">
        <table className="w-full text-[0.8125rem]">
          <thead>
            <tr className="border-b border-border">
              {["Namn", "Organisation", "Kalla", "Chattlank", "Atgarder"].map(
                (h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left font-medium uppercase tracking-[0.1em] text-muted-foreground"
                    style={{ ...monoStyle, fontSize: "0.625rem" }}
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
                <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                  Laddar...
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                  {query ? "Inga assistenter matchar sokningen" : "Inga assistenter"}
                </td>
              </tr>
            ) : (
              filtered.map((a, i) => {
                const isHidden = a.override?.hidden;
                const chatUrl = a.source === "marketplace" ? a.override?.chat_url : a.chat_url;
                return (
                  <tr
                    key={a.id}
                    className={`border-b border-border last:border-0 transition-colors hover:bg-secondary/50 ${
                      isHidden
                        ? "opacity-40"
                        : !chatUrl
                          ? "bg-amber-50/50 dark:bg-amber-950/20"
                          : i % 2 === 0
                            ? ""
                            : "bg-secondary/20"
                    }`}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {!chatUrl && !isHidden && (
                          <span title="Saknar chattlank">
                            <AlertTriangle size={14} className="shrink-0 text-amber-500" />
                          </span>
                        )}
                        <span className={`font-medium ${isHidden ? "line-through" : ""}`}>
                          {a.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {a.organization || "\u2014"}
                    </td>
                    <td className="px-4 py-3">
                      {a.source === "marketplace" ? (
                        <a
                          href="https://intric-library.pages.dev/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-[0.625rem] font-medium uppercase tracking-wide text-blue-700 transition-colors hover:bg-blue-100 dark:bg-blue-950 dark:text-blue-300 dark:hover:bg-blue-900"
                          style={monoStyle}
                          title="Oppna i Intric Library"
                        >
                          <Globe size={10} /> API
                        </a>
                      ) : (
                        <span
                          className="inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-[0.625rem] font-medium uppercase tracking-wide text-muted-foreground"
                          style={monoStyle}
                        >
                          <Upload size={10} /> Lokal
                        </span>
                      )}
                    </td>
                    <td className="max-w-[180px] truncate px-4 py-3">
                      {chatUrl ? (
                        <a
                          href={chatUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline dark:text-blue-400"
                        >
                          Oppen
                        </a>
                      ) : (
                        <span className="text-amber-600 dark:text-amber-400">Saknas</span>
                      )}
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
                        {a.source === "marketplace" ? (
                          <button
                            onClick={() => handleToggleHidden(a)}
                            className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                            title={isHidden ? "Visa" : "Doj"}
                          >
                            {isHidden ? <Eye size={14} /> : <EyeOff size={14} />}
                          </button>
                        ) : deleteConfirm === a.id ? (
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
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {modalOpen && editingAssistant && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-[600px] max-h-[90vh] overflow-y-auto rounded-lg border border-border bg-card shadow-xl">
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <div>
                <h2
                  className="text-[1.125rem] tracking-[-0.02em]"
                  style={{ fontFamily: "var(--font-bodoni), serif", fontWeight: 400 }}
                >
                  {editingAssistant.source === "marketplace"
                    ? "Redigera override"
                    : "Redigera assistent"}
                </h2>
                {editingAssistant.source === "marketplace" && (
                  <p className="mt-0.5 text-[0.75rem] text-muted-foreground">
                    Marketplace-data kan inte andras, men du kan lagga till extra information.
                  </p>
                )}
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="rounded-md p-1 text-muted-foreground hover:text-foreground"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 p-6">
              {/* Name — readonly for marketplace */}
              <div>
                <label
                  className="mb-1.5 block text-[0.625rem] font-medium uppercase tracking-[0.1em] text-muted-foreground"
                  style={monoStyle}
                >
                  Namn {editingAssistant.source === "marketplace" && "(fran Intric)"}
                </label>
                <input
                  type="text"
                  value={form.name}
                  disabled={editingAssistant.source === "marketplace"}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-[0.875rem] outline-none focus:border-foreground disabled:bg-secondary/50 disabled:text-muted-foreground"
                />
              </div>

              {/* Description — readonly for marketplace */}
              <div>
                <label
                  className="mb-1.5 block text-[0.625rem] font-medium uppercase tracking-[0.1em] text-muted-foreground"
                  style={monoStyle}
                >
                  Beskrivning {editingAssistant.source === "marketplace" && "(fran Intric)"}
                </label>
                <textarea
                  value={form.description}
                  disabled={editingAssistant.source === "marketplace"}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-[0.875rem] outline-none focus:border-foreground resize-none disabled:bg-secondary/50 disabled:text-muted-foreground"
                />
              </div>

              {/* Extra description — marketplace only */}
              {editingAssistant.source === "marketplace" && (
                <div>
                  <label
                    className="mb-1.5 block text-[0.625rem] font-medium uppercase tracking-[0.1em] text-muted-foreground"
                    style={monoStyle}
                  >
                    Extra beskrivning (laggs till efter originalet)
                  </label>
                  <textarea
                    value={form.description_extra}
                    onChange={(e) => setForm({ ...form, description_extra: e.target.value })}
                    rows={3}
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-[0.875rem] outline-none focus:border-foreground resize-none"
                    placeholder="T.ex. interna tips, lankar, kontaktperson..."
                  />
                </div>
              )}

              {/* Organisation — readonly for marketplace */}
              <div>
                <label
                  className="mb-1.5 block text-[0.625rem] font-medium uppercase tracking-[0.1em] text-muted-foreground"
                  style={monoStyle}
                >
                  Organisation
                </label>
                <input
                  type="text"
                  value={form.organization}
                  disabled={editingAssistant.source === "marketplace"}
                  onChange={(e) => setForm({ ...form, organization: e.target.value })}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-[0.875rem] outline-none focus:border-foreground disabled:bg-secondary/50 disabled:text-muted-foreground"
                />
              </div>

              {/* Chat URL */}
              <div>
                <label
                  className="mb-1.5 block text-[0.625rem] font-medium uppercase tracking-[0.1em] text-muted-foreground"
                  style={monoStyle}
                >
                  Chattlank (URL)
                </label>
                <input
                  type="url"
                  value={form.chat_url}
                  onChange={(e) => setForm({ ...form, chat_url: e.target.value })}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-[0.875rem] outline-none focus:border-foreground"
                  placeholder="https://..."
                />
              </div>

              {/* Prompt */}
              <div>
                <label
                  className="mb-1.5 block text-[0.625rem] font-medium uppercase tracking-[0.1em] text-muted-foreground"
                  style={monoStyle}
                >
                  Prompt {editingAssistant.source === "marketplace" && "(lokal override)"}
                </label>
                <textarea
                  value={form.prompt}
                  onChange={(e) => setForm({ ...form, prompt: e.target.value })}
                  rows={4}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-[0.875rem] outline-none focus:border-foreground resize-none font-mono text-[0.8125rem]"
                />
              </div>

              {/* Setup instructions */}
              <div>
                <label
                  className="mb-1.5 block text-[0.625rem] font-medium uppercase tracking-[0.1em] text-muted-foreground"
                  style={monoStyle}
                >
                  Instruktioner {editingAssistant.source === "marketplace" && "(lokal override)"}
                </label>
                <textarea
                  value={form.setup_instructions}
                  onChange={(e) => setForm({ ...form, setup_instructions: e.target.value })}
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
                    ...monoStyle,
                    boxShadow:
                      "0px 2px 1px 0px rgba(255,255,255,0.15) inset, 0px -2px 1px 0px rgba(0,0,0,0.05) inset",
                  }}
                >
                  {saving ? "Sparar..." : "Spara"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
