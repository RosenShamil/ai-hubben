"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import {
  Check,
  Trash2,
  Plus,
  GripVertical,
  AlertTriangle,
  Save,
} from "lucide-react";

interface FeaturedRow {
  id: string;
  assistant_id: string;
  sort_order: number;
  created_at: string;
}

interface AssistantOption {
  id: string;
  name: string;
  description: string;
  organization: string;
  source: string;
  hasChatLink: boolean;
}

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

const HOME_FIELDS = [
  { key: "home_label", label: "Etikett ovanfor rubrik", placeholder: "Katrineholms kommun", defaultValue: "Katrineholms kommun" },
  { key: "home_heading_1", label: "Rubrik rad 1", placeholder: "Kommunens", defaultValue: "Kommunens" },
  { key: "home_heading_2", label: "Rubrik rad 2", placeholder: "AI-resa", defaultValue: "AI-resa" },
  { key: "home_subtitle", label: "Underrubrik", placeholder: "En samlad plattform...", defaultValue: "En samlad plattform for AI-assistenter, statistik, utbildning och resurser — byggd for kommunal verksamhet." },
  { key: "home_cta_primary", label: "Primar knapp-text", placeholder: "Utforska assistenter", defaultValue: "Utforska assistenter" },
  { key: "home_cta_secondary", label: "Sekundar knapp-text", placeholder: "Se statistik", defaultValue: "Se statistik" },
  { key: "home_upload_heading", label: "Uppladdningssektion rubrik", placeholder: "Har du byggt en assistent?", defaultValue: "Har du byggt en assistent?" },
  { key: "home_upload_text", label: "Uppladdningssektion text", placeholder: "Dela den med kommunen...", defaultValue: "Dela den med kommunen och hjalp kollegor att jobba smartare." },
];

const monoStyle = { fontFamily: "var(--font-geist-mono), monospace" } as const;

export default function AdminStartsidaPage() {
  const [featured, setFeatured] = useState<
    (FeaturedRow & { name: string; description: string; hasChatLink: boolean })[]
  >([]);
  const [allAssistants, setAllAssistants] = useState<AssistantOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Content fields
  const [homeValues, setHomeValues] = useState<Record<string, string>>({});
  const [savingContent, setSavingContent] = useState(false);

  const showToast = useCallback(
    (type: "success" | "error", message: string) => {
      setToast({ type, message });
      setTimeout(() => setToast(null), 3000);
    },
    []
  );

  const loadData = useCallback(async () => {
    setLoading(true);

    // Fetch everything in parallel
    const [mpRes, comRes, featRes, contentRes, overridesRes, chatLinksRes] = await Promise.allSettled([
      fetch(`${MARKETPLACE_URL}/assistants`).then((r) => r.json()),
      supabase.from("assistants").select("id, name, description, organization, chat_url"),
      supabase.from("featured_assistants").select("*").order("sort_order", { ascending: true }),
      supabase.from("site_content").select("key, value").in("key", HOME_FIELDS.map((f) => f.key).concat(["chat_links"])),
      supabase.from("assistant_overrides").select("assistant_id, chat_url"),
      Promise.resolve(null), // placeholder
    ]);

    // Build chat link lookup from overrides + chat_links in site_content
    const overrides = new Map<string, string>();
    if (overridesRes.status === "fulfilled" && overridesRes.value.data) {
      for (const o of overridesRes.value.data) {
        if (o.chat_url) overrides.set(o.assistant_id, o.chat_url);
      }
    }

    // Parse chat_links from site_content
    const contentData = contentRes.status === "fulfilled" ? (contentRes.value.data ?? []) : [];
    const chatLinksRow = contentData.find((r: { key: string }) => r.key === "chat_links");
    const chatLinksMap = new Map<string, string>();
    if (chatLinksRow?.value) {
      try {
        const parsed = JSON.parse(chatLinksRow.value) as Record<string, string>;
        for (const [id, url] of Object.entries(parsed)) {
          chatLinksMap.set(id, url);
        }
      } catch { /* ignore */ }
    }

    // Build assistants list
    const mpData = mpRes.status === "fulfilled" ? mpRes.value : [];
    const comData = comRes.status === "fulfilled" ? (comRes.value.data ?? []) : [];

    const results: AssistantOption[] = [];

    // Marketplace
    if (Array.isArray(mpData)) {
      for (const a of mpData) {
        if (!ALLOWED_ORGS.has(a.organization.toLowerCase().trim())) continue;
        if (EXCLUDED_IDS.has(a.id)) continue;
        results.push({
          id: a.id,
          name: a.name,
          description: a.description || "",
          organization: a.organization,
          source: "marketplace",
          hasChatLink: !!(overrides.get(a.id) || chatLinksMap.get(a.id)),
        });
      }
    }

    // Community
    for (const a of comData) {
      results.push({
        id: a.id,
        name: a.name,
        description: a.description || "",
        organization: a.organization || "",
        source: "community",
        hasChatLink: !!a.chat_url,
      });
    }

    setAllAssistants(results);

    // Featured
    const featRows = featRes.status === "fulfilled" ? (featRes.value.data ?? []) : [];
    setFeatured(
      featRows.map((r: FeaturedRow) => {
        const match = results.find((a) => a.id === r.assistant_id);
        return {
          ...r,
          name: match?.name || "Okand assistent",
          description: match?.description || "",
          hasChatLink: match?.hasChatLink ?? false,
        };
      })
    );

    // Home content
    const values: Record<string, string> = {};
    for (const field of HOME_FIELDS) {
      const row = contentData.find((r: { key: string }) => r.key === field.key);
      values[field.key] = row?.value || field.defaultValue;
    }
    setHomeValues(values);

    setLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const featuredIds = new Set(featured.map((f) => f.assistant_id));
  const availableAssistants = allAssistants.filter(
    (a) => !featuredIds.has(a.id)
  );

  async function handleAdd() {
    if (!selectedId) return;
    setSaving(true);

    const nextOrder =
      featured.length > 0
        ? Math.max(...featured.map((f) => f.sort_order)) + 1
        : 0;

    const { error } = await supabase.from("featured_assistants").insert({
      assistant_id: selectedId,
      sort_order: nextOrder,
    });

    if (error) {
      showToast("error", "Kunde inte lagga till: " + error.message);
    } else {
      showToast("success", "Assistent tillagd pa startsidan");
      setSelectedId("");
      loadData();
    }
    setSaving(false);
  }

  async function handleRemove(id: string) {
    const { error } = await supabase
      .from("featured_assistants")
      .delete()
      .eq("id", id);

    if (error) {
      showToast("error", "Kunde inte ta bort: " + error.message);
    } else {
      setFeatured((prev) => prev.filter((f) => f.id !== id));
      showToast("success", "Assistent borttagen fran startsidan");
    }
  }

  async function handleSortOrderChange(id: string, newOrder: number) {
    const { error } = await supabase
      .from("featured_assistants")
      .update({ sort_order: newOrder })
      .eq("id", id);

    if (error) {
      showToast("error", "Kunde inte uppdatera ordning");
      return;
    }

    setFeatured((prev) =>
      prev
        .map((f) => (f.id === id ? { ...f, sort_order: newOrder } : f))
        .sort((a, b) => a.sort_order - b.sort_order)
    );
  }

  async function handleSaveContent() {
    setSavingContent(true);

    const upserts = Object.entries(homeValues).map(([key, value]) => ({
      key,
      value,
    }));

    const { error } = await supabase
      .from("site_content")
      .upsert(upserts, { onConflict: "key" });

    if (error) {
      showToast("error", "Kunde inte spara: " + error.message);
    } else {
      showToast("success", "Startsidans innehall sparat");
    }
    setSavingContent(false);
  }

  const noChatLinkCount = featured.filter((f) => !f.hasChatLink).length;

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
      <div className="mb-8">
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
          Startsida
        </h1>
      </div>

      {/* ─── Section 1: Hero & text content ─── */}
      <section className="mb-10">
        <h2
          className="mb-4 text-[0.625rem] font-medium uppercase tracking-[0.1em] text-muted-foreground"
          style={monoStyle}
        >
          Sidinnehall
        </h2>

        {loading ? (
          <div className="rounded-lg border border-border bg-card p-8 text-center text-muted-foreground">
            Laddar...
          </div>
        ) : (
          <div className="rounded-lg border border-border bg-card p-6 space-y-4">
            {HOME_FIELDS.map((field) => (
              <div key={field.key}>
                <label
                  className="mb-1.5 block text-[0.625rem] font-medium uppercase tracking-[0.1em] text-muted-foreground"
                  style={monoStyle}
                >
                  {field.label}
                </label>
                {field.key.includes("subtitle") || field.key.includes("text") ? (
                  <textarea
                    value={homeValues[field.key] ?? ""}
                    onChange={(e) =>
                      setHomeValues((prev) => ({
                        ...prev,
                        [field.key]: e.target.value,
                      }))
                    }
                    rows={3}
                    placeholder={field.placeholder}
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-[0.875rem] outline-none focus:border-foreground resize-none"
                  />
                ) : (
                  <input
                    type="text"
                    value={homeValues[field.key] ?? ""}
                    onChange={(e) =>
                      setHomeValues((prev) => ({
                        ...prev,
                        [field.key]: e.target.value,
                      }))
                    }
                    placeholder={field.placeholder}
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-[0.875rem] outline-none focus:border-foreground"
                  />
                )}
              </div>
            ))}
            <div className="pt-2">
              <button
                onClick={handleSaveContent}
                disabled={savingContent}
                className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-[0.8125rem] font-medium text-primary-foreground transition-all hover:opacity-90 disabled:opacity-50"
                style={{
                  ...monoStyle,
                  boxShadow:
                    "0px 2px 1px 0px rgba(255,255,255,0.15) inset, 0px -2px 1px 0px rgba(0,0,0,0.05) inset",
                }}
              >
                <Save size={14} />
                {savingContent ? "Sparar..." : "Spara innehall"}
              </button>
            </div>
          </div>
        )}
      </section>

      {/* ─── Section 2: Featured assistants ─── */}
      <section className="mb-10">
        <div className="mb-4 flex items-center justify-between">
          <h2
            className="text-[0.625rem] font-medium uppercase tracking-[0.1em] text-muted-foreground"
            style={monoStyle}
          >
            Utvalda assistenter
          </h2>
          {noChatLinkCount > 0 && !loading && (
            <span className="flex items-center gap-1 text-[0.75rem] text-amber-600 dark:text-amber-400">
              <AlertTriangle size={12} />
              {noChatLinkCount} saknar chattlank
            </span>
          )}
        </div>

        <div className="overflow-x-auto rounded-lg border border-border bg-card">
          <table className="w-full text-[0.8125rem]">
            <thead>
              <tr className="border-b border-border">
                {["Ordning", "Namn", "Organisation", "Chatt", "Atgarder"].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left font-medium uppercase tracking-[0.1em] text-muted-foreground"
                    style={{ ...monoStyle, fontSize: "0.625rem" }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                    Laddar...
                  </td>
                </tr>
              ) : featured.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                    Inga utvalda assistenter. Lagg till nedan.
                  </td>
                </tr>
              ) : (
                featured.map((f, i) => (
                  <tr
                    key={f.id}
                    className={`border-b border-border last:border-0 transition-colors hover:bg-secondary/50 ${
                      !f.hasChatLink
                        ? "bg-amber-50/50 dark:bg-amber-950/20"
                        : i % 2 === 0
                          ? ""
                          : "bg-secondary/20"
                    }`}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <GripVertical size={14} className="text-muted-foreground" />
                        <input
                          type="number"
                          min={0}
                          value={f.sort_order}
                          onChange={(e) =>
                            handleSortOrderChange(f.id, parseInt(e.target.value) || 0)
                          }
                          className="w-16 rounded-md border border-border bg-background px-2 py-1 text-center text-[0.8125rem] outline-none focus:border-foreground"
                          style={monoStyle}
                        />
                      </div>
                    </td>
                    <td className="px-4 py-3 font-medium">{f.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {allAssistants.find((a) => a.id === f.assistant_id)?.organization || "\u2014"}
                    </td>
                    <td className="px-4 py-3">
                      {f.hasChatLink ? (
                        <span className="text-[0.75rem] text-muted-foreground">OK</span>
                      ) : (
                        <span className="flex items-center gap-1 text-[0.75rem] text-amber-600 dark:text-amber-400">
                          <AlertTriangle size={12} /> Saknas
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleRemove(f.id)}
                        className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                        aria-label="Ta bort från startsidan"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* ─── Section 3: Add featured ─── */}
      <section>
        <h2
          className="mb-4 text-[0.625rem] font-medium uppercase tracking-[0.1em] text-muted-foreground"
          style={monoStyle}
        >
          Lagg till assistent
        </h2>

        <div className="flex items-end gap-3">
          <div className="flex-1">
            <label
              className="mb-1.5 block text-[0.625rem] font-medium uppercase tracking-[0.1em] text-muted-foreground"
              style={monoStyle}
            >
              Valj assistent
            </label>
            <select
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-[0.875rem] outline-none focus:border-foreground"
            >
              <option value="">— Valj en assistent —</option>
              {availableAssistants.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name} ({a.organization}){!a.hasChatLink ? " ⚠ ingen chatt" : ""}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleAdd}
            disabled={!selectedId || saving}
            className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-[0.8125rem] font-medium text-primary-foreground transition-all hover:opacity-90 disabled:opacity-50"
            style={{
              ...monoStyle,
              boxShadow:
                "0px 2px 1px 0px rgba(255,255,255,0.15) inset, 0px -2px 1px 0px rgba(0,0,0,0.05) inset",
            }}
          >
            <Plus size={14} />
            {saving ? "Laggar till..." : "Lagg till"}
          </button>
        </div>
      </section>
    </div>
  );
}
