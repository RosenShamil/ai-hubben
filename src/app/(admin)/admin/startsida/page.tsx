"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { Check, Trash2, Plus, GripVertical } from "lucide-react";

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
}

const MARKETPLACE_URL = "https://marketplace.intric.ai/api";

export default function AdminStartsidaPage() {
  const [featured, setFeatured] = useState<
    (FeaturedRow & { name: string; description: string })[]
  >([]);
  const [allAssistants, setAllAssistants] = useState<AssistantOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const showToast = useCallback(
    (type: "success" | "error", message: string) => {
      setToast({ type, message });
      setTimeout(() => setToast(null), 3000);
    },
    []
  );

  const loadAllAssistants = useCallback(async () => {
    const results: AssistantOption[] = [];

    // Fetch marketplace assistants
    try {
      const res = await fetch(`${MARKETPLACE_URL}/assistants`);
      if (res.ok) {
        const data = await res.json();
        const filtered = data.filter(
          (a: { organization: string }) =>
            a.organization.toLowerCase() === "katrineholms kommun"
        );
        for (const a of filtered) {
          results.push({
            id: a.id,
            name: a.name,
            description: a.description || "",
            organization: a.organization,
            source: "marketplace",
          });
        }
      }
    } catch {
      // ignore marketplace errors
    }

    // Fetch community assistants
    try {
      const { data } = await supabase
        .from("assistants")
        .select("id, name, description, organization")
        .order("created_at", { ascending: false });
      if (data) {
        for (const a of data) {
          results.push({
            id: a.id,
            name: a.name,
            description: a.description || "",
            organization: a.organization || "",
            source: "community",
          });
        }
      }
    } catch {
      // ignore supabase errors
    }

    setAllAssistants(results);
  }, []);

  const loadFeatured = useCallback(async () => {
    const { data: rows, error } = await supabase
      .from("featured_assistants")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) {
      showToast("error", "Kunde inte ladda utvalda assistenter");
      setLoading(false);
      return;
    }

    // We need to resolve names from allAssistants, but they may not be loaded yet.
    // Store raw rows and resolve later.
    return rows || [];
  }, [showToast]);

  const loadData = useCallback(async () => {
    setLoading(true);
    await loadAllAssistants();
    const rows = await loadFeatured();
    // Resolve will happen in effect when allAssistants is set
    if (rows) {
      // Store raw temporarily
      setFeatured(
        rows.map((r: FeaturedRow) => ({
          ...r,
          name: "",
          description: "",
        }))
      );
    }
    setLoading(false);
  }, [loadAllAssistants, loadFeatured]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Resolve names when allAssistants changes
  useEffect(() => {
    if (allAssistants.length === 0) return;
    setFeatured((prev) =>
      prev.map((f) => {
        const match = allAssistants.find((a) => a.id === f.assistant_id);
        return {
          ...f,
          name: match?.name || f.name || "Okand assistent",
          description: match?.description || f.description || "",
        };
      })
    );
  }, [allAssistants]);

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
      // Reload
      const { data: rows } = await supabase
        .from("featured_assistants")
        .select("*")
        .order("sort_order", { ascending: true });
      if (rows) {
        setFeatured(
          rows.map((r: FeaturedRow) => {
            const match = allAssistants.find((a) => a.id === r.assistant_id);
            return {
              ...r,
              name: match?.name || "Okand assistent",
              description: match?.description || "",
            };
          })
        );
      }
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
          Startsida
        </h1>
        <p className="mt-2 text-[0.875rem] text-muted-foreground">
          Valj vilka assistenter som visas pa startsidan under &quot;Populara
          assistenter&quot;.
        </p>
      </div>

      {/* Current featured assistants */}
      <div className="mb-8">
        <h2
          className="mb-4 text-[0.625rem] font-medium uppercase tracking-[0.1em] text-muted-foreground"
          style={{ fontFamily: "var(--font-geist-mono), monospace" }}
        >
          Utvalda assistenter
        </h2>

        <div className="overflow-x-auto rounded-lg border border-border bg-card">
          <table className="w-full text-[0.8125rem]">
            <thead>
              <tr className="border-b border-border">
                {["Ordning", "Namn", "Beskrivning", "Atgarder"].map((h) => (
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
              ) : featured.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 py-8 text-center text-muted-foreground"
                  >
                    Inga utvalda assistenter. Lagg till nedan.
                  </td>
                </tr>
              ) : (
                featured.map((f, i) => (
                  <tr
                    key={f.id}
                    className={`border-b border-border last:border-0 transition-colors hover:bg-secondary/50 ${
                      i % 2 === 0 ? "" : "bg-secondary/20"
                    }`}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <GripVertical
                          size={14}
                          className="text-muted-foreground"
                        />
                        <input
                          type="number"
                          min={0}
                          value={f.sort_order}
                          onChange={(e) =>
                            handleSortOrderChange(
                              f.id,
                              parseInt(e.target.value) || 0
                            )
                          }
                          className="w-16 rounded-md border border-border bg-background px-2 py-1 text-center text-[0.8125rem] outline-none focus:border-foreground"
                          style={{
                            fontFamily: "var(--font-geist-mono), monospace",
                          }}
                        />
                      </div>
                    </td>
                    <td className="px-4 py-3 font-medium">{f.name}</td>
                    <td className="max-w-[300px] truncate px-4 py-3 text-muted-foreground">
                      {f.description}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleRemove(f.id)}
                        className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                        title="Ta bort fran startsidan"
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
      </div>

      {/* Add assistant */}
      <div>
        <h2
          className="mb-4 text-[0.625rem] font-medium uppercase tracking-[0.1em] text-muted-foreground"
          style={{ fontFamily: "var(--font-geist-mono), monospace" }}
        >
          Lagg till assistent
        </h2>

        <div className="flex items-end gap-3">
          <div className="flex-1">
            <label
              className="mb-1.5 block text-[0.625rem] font-medium uppercase tracking-[0.1em] text-muted-foreground"
              style={{ fontFamily: "var(--font-geist-mono), monospace" }}
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
                  {a.name}{" "}
                  ({a.source === "marketplace" ? "Intric" : "Community"})
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleAdd}
            disabled={!selectedId || saving}
            className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-[0.8125rem] font-medium text-primary-foreground transition-all hover:opacity-90 disabled:opacity-50"
            style={{
              fontFamily: "var(--font-geist-mono), monospace",
              boxShadow:
                "0px 2px 1px 0px rgba(255,255,255,0.15) inset, 0px -2px 1px 0px rgba(0,0,0,0.05) inset",
            }}
          >
            <Plus size={14} />
            {saving ? "Laggar till..." : "Lagg till"}
          </button>
        </div>
      </div>
    </div>
  );
}
