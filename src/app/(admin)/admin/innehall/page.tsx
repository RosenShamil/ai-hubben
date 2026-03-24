"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { Check, Loader2 } from "lucide-react";

interface ContentField {
  key: string;
  label: string;
  value: string;
  saving: boolean;
}

const monoStyle = { fontFamily: "var(--font-geist-mono), monospace" };
const bodoniStyle = { fontFamily: "var(--font-bodoni), serif", fontWeight: 400 as const };
const btnShadow = "0px 2px 1px 0px rgba(255,255,255,0.15) inset, 0px -2px 1px 0px rgba(0,0,0,0.05) inset";

const OM_FIELDS = [
  { key: "om_uppdrag", label: "Uppdragstext (Om-sidan)" },
  { key: "om_vision", label: "Visionstext (Om-sidan)" },
];

const KONTAKT_FIELDS = [
  { key: "kontakt_heading", label: "Rubrik", placeholder: "Hor av dig", defaultValue: "Hor av dig" },
  { key: "kontakt_description", label: "Beskrivning", placeholder: "Har du fragor, feedback eller forslag...", defaultValue: "Har du fragor, feedback eller forslag kring AI-hubben eller kommunens digitala utveckling? Vi finns har for att hjalpa." },
];

export default function AdminInnehallPage() {
  const [omFields, setOmFields] = useState<ContentField[]>(
    OM_FIELDS.map((f) => ({ ...f, value: "", saving: false }))
  );
  const [kontaktFields, setKontaktFields] = useState<ContentField[]>(
    KONTAKT_FIELDS.map((f) => ({ key: f.key, label: f.label, value: "", saving: false }))
  );
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    async function fetchContent() {
      const allKeys = [
        ...OM_FIELDS.map((f) => f.key),
        ...KONTAKT_FIELDS.map((f) => f.key),
      ];

      const { data, error } = await supabase
        .from("site_content")
        .select("*")
        .in("key", allKeys);

      if (error) {
        showToast("error", "Kunde inte hamta innehall");
        setLoading(false);
        return;
      }

      const dataMap: Record<string, string> = {};
      for (const row of data ?? []) {
        dataMap[row.key] = row.value ?? "";
      }

      setOmFields((prev) =>
        prev.map((field) => ({
          ...field,
          value: dataMap[field.key] ?? "",
        }))
      );

      setKontaktFields((prev) =>
        prev.map((field, i) => ({
          ...field,
          value: dataMap[field.key] || KONTAKT_FIELDS[i]?.defaultValue || "",
        }))
      );

      setLoading(false);
    }
    fetchContent();
  }, [showToast]);

  async function handleSave(
    index: number,
    group: "om" | "kontakt"
  ) {
    const list = group === "om" ? omFields : kontaktFields;
    const setList = group === "om" ? setOmFields : setKontaktFields;
    const field = list[index];

    setList((prev) =>
      prev.map((f, i) => (i === index ? { ...f, saving: true } : f))
    );

    const { error } = await supabase
      .from("site_content")
      .upsert(
        { key: field.key, value: field.value, updated_at: new Date().toISOString() },
        { onConflict: "key" }
      );

    if (error) {
      showToast("error", "Kunde inte spara: " + error.message);
    } else {
      showToast("success", `"${field.label}" sparad`);
    }

    setList((prev) =>
      prev.map((f, i) => (i === index ? { ...f, saving: false } : f))
    );
  }

  function updateValue(index: number, value: string, group: "om" | "kontakt") {
    const setList = group === "om" ? setOmFields : setKontaktFields;
    setList((prev) =>
      prev.map((f, i) => (i === index ? { ...f, value } : f))
    );
  }

  return (
    <div className="mx-auto max-w-[800px]">
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
          style={bodoniStyle}
        >
          Om & Kontakt
        </h1>
        <p className="mt-2 text-[0.875rem] text-muted-foreground">
          Redigera textinnehall for Om-sidan och Kontaktsidan.
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12 text-muted-foreground">
          <Loader2 size={20} className="mr-2 animate-spin" />
          Laddar...
        </div>
      ) : (
        <div className="space-y-12">
          {/* ── Om-sidan ── */}
          <section>
            <h2
              className="mb-6 text-[1.25rem] tracking-[-0.02em]"
              style={bodoniStyle}
            >
              Om-sidan
            </h2>
            <div className="space-y-6">
              {omFields.map((field, index) => (
                <div
                  key={field.key}
                  className="rounded-lg border border-border bg-card p-6"
                >
                  <label
                    className="mb-3 block text-[0.625rem] font-medium uppercase tracking-[0.1em] text-muted-foreground"
                    style={monoStyle}
                  >
                    {field.label}
                  </label>
                  <textarea
                    value={field.value}
                    onChange={(e) => updateValue(index, e.target.value, "om")}
                    rows={8}
                    placeholder="Skriv text har..."
                    className="w-full resize-y rounded-md border border-border bg-background px-3 py-2 text-[0.875rem] leading-[1.7] outline-none focus:border-foreground"
                  />
                  <p className="mt-2 text-[0.75rem] text-muted-foreground">
                    Separera stycken med en tom rad (dubbel radbrytning).
                  </p>
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={() => handleSave(index, "om")}
                      disabled={field.saving}
                      className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-[0.8125rem] font-medium text-primary-foreground transition-all hover:opacity-90 disabled:opacity-50"
                      style={{ ...monoStyle, boxShadow: btnShadow }}
                    >
                      {field.saving ? (
                        <Loader2 size={14} className="animate-spin" />
                      ) : (
                        <Check size={14} />
                      )}
                      {field.saving ? "Sparar..." : "Spara"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Kontaktsidan ── */}
          <section>
            <h2
              className="mb-6 text-[1.25rem] tracking-[-0.02em]"
              style={bodoniStyle}
            >
              Kontaktsidan
            </h2>
            <div className="space-y-5">
              {kontaktFields.map((field, index) => (
                <div
                  key={field.key}
                  className="rounded-lg border border-border bg-card p-5"
                >
                  <label
                    className="mb-2 block text-[0.625rem] font-medium uppercase tracking-[0.1em] text-muted-foreground"
                    style={monoStyle}
                  >
                    {field.label}
                  </label>
                  <input
                    type="text"
                    value={field.value}
                    onChange={(e) => updateValue(index, e.target.value, "kontakt")}
                    placeholder={KONTAKT_FIELDS[index]?.placeholder ?? ""}
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-[0.875rem] outline-none focus:border-foreground"
                  />
                  <p className="mt-1.5 text-[0.75rem] text-muted-foreground">
                    Tom = standardvarde ({KONTAKT_FIELDS[index]?.placeholder})
                  </p>
                  <div className="mt-3 flex justify-end">
                    <button
                      onClick={() => handleSave(index, "kontakt")}
                      disabled={field.saving}
                      className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-[0.8125rem] font-medium text-primary-foreground transition-all hover:opacity-90 disabled:opacity-50"
                      style={{ ...monoStyle, boxShadow: btnShadow }}
                    >
                      {field.saving ? (
                        <Loader2 size={14} className="animate-spin" />
                      ) : (
                        <Check size={14} />
                      )}
                      {field.saving ? "Sparar..." : "Spara"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
