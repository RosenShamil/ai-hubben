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

export default function AdminInnehallPage() {
  const [fields, setFields] = useState<ContentField[]>([
    { key: "om_uppdrag", label: "Uppdragstext (Om-sidan)", value: "", saving: false },
    { key: "om_vision", label: "Visionstext (Om-sidan)", value: "", saving: false },
  ]);
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
      const { data, error } = await supabase
        .from("site_content")
        .select("*")
        .in("key", ["om_uppdrag", "om_vision"]);

      if (error) {
        showToast("error", "Kunde inte hämta innehåll");
        setLoading(false);
        return;
      }

      setFields((prev) =>
        prev.map((field) => {
          const match = data?.find((d) => d.key === field.key);
          return match ? { ...field, value: match.value ?? "" } : field;
        })
      );
      setLoading(false);
    }
    fetchContent();
  }, [showToast]);

  async function handleSave(index: number) {
    const field = fields[index];
    setFields((prev) =>
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

    setFields((prev) =>
      prev.map((f, i) => (i === index ? { ...f, saving: false } : f))
    );
  }

  function updateValue(index: number, value: string) {
    setFields((prev) =>
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
          Innehåll
        </h1>
        <p className="mt-2 text-[0.875rem] text-muted-foreground">
          Redigera textinnehåll som visas på Om-sidan och andra delar av sajten.
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12 text-muted-foreground">
          <Loader2 size={20} className="mr-2 animate-spin" />
          Laddar...
        </div>
      ) : (
        <div className="space-y-8">
          {fields.map((field, index) => (
            <div
              key={field.key}
              className="rounded-lg border border-border bg-card p-6"
            >
              <label
                className="mb-3 block text-[0.625rem] font-medium uppercase tracking-[0.1em] text-muted-foreground"
                style={{ fontFamily: "var(--font-geist-mono), monospace" }}
              >
                {field.label}
              </label>
              <textarea
                value={field.value}
                onChange={(e) => updateValue(index, e.target.value)}
                rows={8}
                placeholder="Skriv text här..."
                className="w-full resize-y rounded-md border border-border bg-background px-3 py-2 text-[0.875rem] leading-[1.7] outline-none focus:border-foreground"
              />
              <p className="mt-2 text-[0.75rem] text-muted-foreground">
                Separera stycken med en tom rad (dubbel radbrytning).
              </p>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => handleSave(index)}
                  disabled={field.saving}
                  className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-[0.8125rem] font-medium text-primary-foreground transition-all hover:opacity-90 disabled:opacity-50"
                  style={{
                    fontFamily: "var(--font-geist-mono), monospace",
                    boxShadow:
                      "0px 2px 1px 0px rgba(255,255,255,0.15) inset, 0px -2px 1px 0px rgba(0,0,0,0.05) inset",
                  }}
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
      )}
    </div>
  );
}
