"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { Check, Loader2, Plus, Trash2 } from "lucide-react";

interface ContentField {
  key: string;
  label: string;
  value: string;
  saving: boolean;
}

interface ChatLinkRow {
  id: string;
  name: string;
  url: string;
}

const monoStyle = { fontFamily: "var(--font-geist-mono), monospace" };
const bodoniStyle = { fontFamily: "var(--font-bodoni), serif", fontWeight: 400 as const };
const btnShadow = "0px 2px 1px 0px rgba(255,255,255,0.15) inset, 0px -2px 1px 0px rgba(0,0,0,0.05) inset";

const OM_FIELDS = [
  { key: "om_uppdrag", label: "Uppdragstext (Om-sidan)" },
  { key: "om_vision", label: "Visionstext (Om-sidan)" },
];

const HOME_FIELDS = [
  { key: "home_label", label: "Etikett ovanför rubrik", placeholder: "Katrineholms kommun", defaultValue: "Katrineholms kommun" },
  { key: "home_heading_1", label: "Rubrik rad 1", placeholder: "Kommunens", defaultValue: "Kommunens" },
  { key: "home_heading_2", label: "Rubrik rad 2", placeholder: "AI-resa", defaultValue: "AI-resa" },
  { key: "home_subtitle", label: "Underrubrik", placeholder: "En samlad plattform...", defaultValue: "En samlad plattform för AI-assistenter, statistik, utbildning och resurser — byggd för kommunal verksamhet." },
  { key: "home_cta_primary", label: "Primär knapp-text", placeholder: "Utforska assistenter", defaultValue: "Utforska assistenter" },
  { key: "home_cta_secondary", label: "Sekundär knapp-text", placeholder: "Se statistik", defaultValue: "Se statistik" },
  { key: "home_upload_heading", label: "Uppladdningssektion rubrik", placeholder: "Har du byggt en assistent?", defaultValue: "Har du byggt en assistent?" },
  { key: "home_upload_text", label: "Uppladdningssektion text", placeholder: "Dela den med kommunen...", defaultValue: "Dela den med kommunen och hjälp kollegor att jobba smartare." },
];

export default function AdminInnehallPage() {
  const [fields, setFields] = useState<ContentField[]>(
    OM_FIELDS.map((f) => ({ ...f, value: "", saving: false }))
  );
  const [homeFields, setHomeFields] = useState<ContentField[]>(
    HOME_FIELDS.map((f) => ({ key: f.key, label: f.label, value: "", saving: false }))
  );
  const [chatLinks, setChatLinks] = useState<ChatLinkRow[]>([]);
  const [chatLinksSaving, setChatLinksSaving] = useState(false);
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
        ...HOME_FIELDS.map((f) => f.key),
        "chat_links",
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

      setFields((prev) =>
        prev.map((field) => ({
          ...field,
          value: dataMap[field.key] ?? "",
        }))
      );

      setHomeFields((prev) =>
        prev.map((field, i) => ({
          ...field,
          value: dataMap[field.key] || HOME_FIELDS[i]?.defaultValue || "",
        }))
      );

      // Parse chat links (from DB or defaults)
      const defaultChatLinks: Record<string, string> = {
        "1bf566df-5f69-439e-bdbd-13da06b5d947": "https://katrineholm.intric.ai/public/4fcece60-7310-489e-a003-9adb4d9c3e8b",
        "9e588455-1fbd-4a6a-b9dd-e74ad6f23ec0": "https://katrineholm.intric.ai/public/91cfdcd1-bb86-4a83-8ac5-9d0dfc945278",
        "45cfade2-7c6e-482c-a1ab-e7f0da85fe54": "https://katrineholm.intric.ai/public/3f5b4f92-9202-4b49-a6d4-55bc24faacb6",
        "f139962a-12e1-4eeb-a170-4da2df2ffc55": "https://katrineholm.intric.ai/public/4a133c44-9d8e-46bc-bcbc-f3397a349577",
      };
      let chatLinksData = defaultChatLinks;
      if (dataMap.chat_links) {
        try {
          const parsed = JSON.parse(dataMap.chat_links) as Record<string, string>;
          chatLinksData = { ...defaultChatLinks, ...parsed };
        } catch {
          // ignore parse error
        }
      }
      setChatLinks(
        Object.entries(chatLinksData).map(([id, url]) => ({
          id,
          name: id,
          url,
        }))
      );

      // Try to resolve assistant names for chat links
      try {
        const res = await fetch("https://marketplace.intric.ai/api/assistants");
        if (res.ok) {
          const assistants = await res.json() as Array<{ id: string; name: string }>;
          setChatLinks((prev) =>
            prev.map((link) => {
              const match = assistants.find((a) => a.id === link.id);
              return match ? { ...link, name: match.name } : link;
            })
          );
        }
      } catch {
        // ignore
      }

      setLoading(false);
    }
    fetchContent();
  }, [showToast]);

  async function handleSave(index: number, isHome: boolean) {
    const fieldsList = isHome ? homeFields : fields;
    const setFn = isHome ? setHomeFields : setFields;
    const field = fieldsList[index];

    setFn((prev) =>
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

    setFn((prev) =>
      prev.map((f, i) => (i === index ? { ...f, saving: false } : f))
    );
  }

  function updateValue(index: number, value: string, isHome: boolean) {
    const setFn = isHome ? setHomeFields : setFields;
    setFn((prev) =>
      prev.map((f, i) => (i === index ? { ...f, value } : f))
    );
  }

  async function handleSaveChatLinks() {
    setChatLinksSaving(true);
    const linksObj: Record<string, string> = {};
    for (const link of chatLinks) {
      if (link.id && link.url) {
        linksObj[link.id] = link.url;
      }
    }

    const { error } = await supabase
      .from("site_content")
      .upsert(
        {
          key: "chat_links",
          value: JSON.stringify(linksObj),
          updated_at: new Date().toISOString(),
        },
        { onConflict: "key" }
      );

    if (error) {
      showToast("error", "Kunde inte spara chattlankar: " + error.message);
    } else {
      showToast("success", "Chattlankar sparade");
    }
    setChatLinksSaving(false);
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
          Innehall
        </h1>
        <p className="mt-2 text-[0.875rem] text-muted-foreground">
          Redigera textinnehall som visas pa startsidan, Om-sidan och andra delar av sajten.
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12 text-muted-foreground">
          <Loader2 size={20} className="mr-2 animate-spin" />
          Laddar...
        </div>
      ) : (
        <div className="space-y-12">
          {/* ── Homepage Texts ── */}
          <div>
            <h2
              className="mb-6 text-[1.25rem] tracking-[-0.02em]"
              style={bodoniStyle}
            >
              Startsida — Hero-sektion
            </h2>
            <div className="space-y-5">
              {homeFields.map((field, index) => (
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
                    onChange={(e) => updateValue(index, e.target.value, true)}
                    placeholder={HOME_FIELDS[index]?.placeholder ?? ""}
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-[0.875rem] outline-none focus:border-foreground"
                  />
                  <p className="mt-1.5 text-[0.75rem] text-muted-foreground">
                    Tom = standardvarde ({HOME_FIELDS[index]?.placeholder})
                  </p>
                  <div className="mt-3 flex justify-end">
                    <button
                      onClick={() => handleSave(index, true)}
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
          </div>

          {/* ── Om-sidan ── */}
          <div>
            <h2
              className="mb-6 text-[1.25rem] tracking-[-0.02em]"
              style={bodoniStyle}
            >
              Om-sidan
            </h2>
            <div className="space-y-6">
              {fields.map((field, index) => (
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
                    onChange={(e) => updateValue(index, e.target.value, false)}
                    rows={8}
                    placeholder="Skriv text har..."
                    className="w-full resize-y rounded-md border border-border bg-background px-3 py-2 text-[0.875rem] leading-[1.7] outline-none focus:border-foreground"
                  />
                  <p className="mt-2 text-[0.75rem] text-muted-foreground">
                    Separera stycken med en tom rad (dubbel radbrytning).
                  </p>
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={() => handleSave(index, false)}
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
          </div>

          {/* ── Chat Links ── */}
          <div>
            <h2
              className="mb-2 text-[1.25rem] tracking-[-0.02em]"
              style={bodoniStyle}
            >
              Chattlankar
            </h2>
            <p className="mb-6 text-[0.875rem] text-muted-foreground">
              Koppla Intric-assistenter till deras publika chatt-URL:er. Ange assistent-ID och URL.
            </p>

            <div className="rounded-lg border border-border bg-card p-6">
              <div className="overflow-x-auto">
                <table className="w-full text-[0.8125rem]">
                  <thead>
                    <tr className="border-b border-border">
                      <th
                        className="px-3 py-2 text-left text-[0.625rem] font-medium uppercase tracking-[0.1em] text-muted-foreground"
                        style={monoStyle}
                      >
                        Assistent (namn/ID)
                      </th>
                      <th
                        className="px-3 py-2 text-left text-[0.625rem] font-medium uppercase tracking-[0.1em] text-muted-foreground"
                        style={monoStyle}
                      >
                        Chatt-URL
                      </th>
                      <th className="w-10"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {chatLinks.map((link, i) => (
                      <tr
                        key={i}
                        className="border-b border-border last:border-0"
                      >
                        <td className="px-2 py-1.5">
                          <div>
                            {link.name !== link.id && (
                              <p className="mb-1 text-[0.75rem] text-muted-foreground">
                                {link.name}
                              </p>
                            )}
                            <input
                              className="w-full rounded-md border border-border bg-background px-3 py-2 text-[0.8125rem] outline-none focus:border-foreground font-mono"
                              value={link.id}
                              onChange={(e) => {
                                const next = [...chatLinks];
                                next[i] = { ...next[i], id: e.target.value };
                                setChatLinks(next);
                              }}
                              placeholder="assistent-uuid"
                            />
                          </div>
                        </td>
                        <td className="px-2 py-1.5">
                          <input
                            className="w-full rounded-md border border-border bg-background px-3 py-2 text-[0.8125rem] outline-none focus:border-foreground"
                            value={link.url}
                            onChange={(e) => {
                              const next = [...chatLinks];
                              next[i] = { ...next[i], url: e.target.value };
                              setChatLinks(next);
                            }}
                            placeholder="https://katrineholm.intric.ai/public/..."
                          />
                        </td>
                        <td className="px-2 py-1.5">
                          <button
                            onClick={() =>
                              setChatLinks(chatLinks.filter((_, j) => j !== i))
                            }
                            className="rounded-md p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <button
                onClick={() =>
                  setChatLinks([...chatLinks, { id: "", name: "", url: "" }])
                }
                className="mt-3 flex items-center gap-1.5 text-[0.8125rem] text-muted-foreground hover:text-foreground"
              >
                <Plus size={14} /> Lagg till chattlank
              </button>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={handleSaveChatLinks}
                  disabled={chatLinksSaving}
                  className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-[0.8125rem] font-medium text-primary-foreground transition-all hover:opacity-90 disabled:opacity-50"
                  style={{ ...monoStyle, boxShadow: btnShadow }}
                >
                  {chatLinksSaving ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <Check size={14} />
                  )}
                  {chatLinksSaving ? "Sparar..." : "Spara chattlankar"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
