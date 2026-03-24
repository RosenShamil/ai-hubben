"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { Check, Loader2, Plus, Trash2, ExternalLink } from "lucide-react";

/* ── Types ── */

interface KeyMetricRow {
  label: string;
  value: number;
  formatted: string;
  change: number;
  changeLabel: string;
}

interface NameValueRow {
  name: string;
  value: number;
}

interface DateInteractionRow {
  date: string;
  interactions: number;
}

interface NameMessagesRow {
  name: string;
  messages: number;
}

interface FileUploadRow {
  type: string;
  count: number;
}

interface YearComparisonRow {
  category: string;
  "2025": number;
  "2026": number;
}

/* ── Helpers ── */

const monoStyle = { fontFamily: "var(--font-geist-mono), monospace" };
const bodoniStyle = { fontFamily: "var(--font-bodoni), serif", fontWeight: 400 as const };
const btnShadow = "0px 2px 1px 0px rgba(255,255,255,0.15) inset, 0px -2px 1px 0px rgba(0,0,0,0.05) inset";

function SectionHeader({ label, title }: { label: string; title: string }) {
  return (
    <div className="mb-4">
      <p
        className="text-[0.625rem] font-medium uppercase tracking-[0.1em] text-muted-foreground"
        style={monoStyle}
      >
        {label}
      </p>
      <h2
        className="mt-1 text-[1.5rem] tracking-[-0.04em]"
        style={bodoniStyle}
      >
        {title}
      </h2>
    </div>
  );
}

function SaveButton({
  saving,
  onClick,
}: {
  saving: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={saving}
      className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-[0.8125rem] font-medium text-primary-foreground transition-all hover:opacity-90 disabled:opacity-50"
      style={{ ...monoStyle, boxShadow: btnShadow }}
    >
      {saving ? (
        <Loader2 size={14} className="animate-spin" />
      ) : (
        <Check size={14} />
      )}
      {saving ? "Sparar..." : "Spara"}
    </button>
  );
}

/* ── Main Page ── */

export default function AdminStatistikPage() {
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Default values
  const defaultMetrics2025: KeyMetricRow[] = [
    { label: "Interaktioner", value: 2881, formatted: "2 881", change: 0, changeLabel: "" },
    { label: "Aktiva användare", value: 139, formatted: "139", change: 0, changeLabel: "" },
    { label: "Skapade assistenter", value: 120, formatted: "120", change: 0, changeLabel: "" },
    { label: "Utbildade", value: 160, formatted: "160", change: 0, changeLabel: "" },
  ];
  const defaultMetrics2026: KeyMetricRow[] = [
    { label: "Interaktioner", value: 6973, formatted: "6 973", change: 142, changeLabel: "vs 2025" },
    { label: "Aktiva användare", value: 257, formatted: "257", change: 85, changeLabel: "vs 2025" },
    { label: "Skapade assistenter", value: 190, formatted: "190", change: 58, changeLabel: "vs 2025" },
    { label: "Utbildade", value: 340, formatted: "340", change: 113, changeLabel: "vs 2025" },
  ];
  const defaultMetricsAll: KeyMetricRow[] = [
    { label: "Interaktioner", value: 9854, formatted: "9 854", change: 142, changeLabel: "2026 vs 2025" },
    { label: "Aktiva användare", value: 257, formatted: "257", change: 85, changeLabel: "2026 vs 2025" },
    { label: "Skapade assistenter", value: 190, formatted: "190", change: 58, changeLabel: "2026 vs 2025" },
    { label: "Utbildade", value: 500, formatted: "500", change: 113, changeLabel: "totalt" },
  ];
  const defaultTopAssistants: NameMessagesRow[] = [
    { name: "Intric", messages: 3759 }, { name: "Promptexperten", messages: 460 },
    { name: "Konteringsassistenten", messages: 227 }, { name: "iKAI", messages: 191 },
  ];
  const defaultModelUsage: NameValueRow[] = [
    { name: "GPT-5.3", value: 1745 }, { name: "GPT-4.1", value: 1455 },
    { name: "Claude Sonnet 4.5", value: 975 }, { name: "Claude Sonnet 4.6", value: 790 },
  ];
  const defaultAssistantSplit: NameValueRow[] = [
    { name: "Personliga", value: 3759 }, { name: "Anpassade", value: 3214 },
  ];
  const defaultFileUploads: FileUploadRow[] = [
    { type: "PDF", count: 1853 }, { type: "Word", count: 498 }, { type: "PNG", count: 154 },
  ];
  const defaultYearComparison: YearComparisonRow[] = [
    { category: "Användare", "2025": 139, "2026": 257 },
    { category: "Interaktioner", "2025": 2881, "2026": 6973 },
    { category: "Assistenter", "2025": 120, "2026": 190 },
    { category: "Utbildade", "2025": 160, "2026": 340 },
  ];

  // Data state (initialized with defaults)
  const [metrics2025, setMetrics2025] = useState<KeyMetricRow[]>(defaultMetrics2025);
  const [metrics2026, setMetrics2026] = useState<KeyMetricRow[]>(defaultMetrics2026);
  const [metricsAll, setMetricsAll] = useState<KeyMetricRow[]>(defaultMetricsAll);
  const [dailyInteractions2025, setDailyInteractions2025] = useState<DateInteractionRow[]>([]);
  const [dailyInteractions2026, setDailyInteractions2026] = useState<DateInteractionRow[]>([]);
  const [dailyInteractionsAll, setDailyInteractionsAll] = useState<DateInteractionRow[]>([]);
  const [topAssistants2025, setTopAssistants2025] = useState<NameMessagesRow[]>([]);
  const [topAssistants2026, setTopAssistants2026] = useState<NameMessagesRow[]>([]);
  const [topAssistantsAll, setTopAssistantsAll] = useState<NameMessagesRow[]>(defaultTopAssistants);
  const [modelUsage2025, setModelUsage2025] = useState<NameValueRow[]>([]);
  const [modelUsage2026, setModelUsage2026] = useState<NameValueRow[]>([]);
  const [modelUsageAll, setModelUsageAll] = useState<NameValueRow[]>(defaultModelUsage);
  const [assistantSplit2025, setAssistantSplit2025] = useState<NameValueRow[]>([]);
  const [assistantSplit2026, setAssistantSplit2026] = useState<NameValueRow[]>([]);
  const [assistantSplitAll, setAssistantSplitAll] = useState<NameValueRow[]>(defaultAssistantSplit);
  const [fileUploads2025, setFileUploads2025] = useState<FileUploadRow[]>([]);
  const [fileUploads2026, setFileUploads2026] = useState<FileUploadRow[]>([]);
  const [fileUploadsAll, setFileUploadsAll] = useState<FileUploadRow[]>(defaultFileUploads);
  const [yearComparison, setYearComparison] = useState<YearComparisonRow[]>(defaultYearComparison);
  const [userRoles2025, setUserRoles2025] = useState<NameValueRow[]>([]);
  const [userRoles2026, setUserRoles2026] = useState<NameValueRow[]>([]);
  const [userRolesAll, setUserRolesAll] = useState<NameValueRow[]>([]);
  const [platformOverview, setPlatformOverview] = useState<{ registeredUsers: number; activeUsers: number; spaces: number; totalAssistants: number }>({ registeredUsers: 0, activeUsers: 0, spaces: 0, totalAssistants: 0 });

  // Saving state per section
  const [savingSection, setSavingSection] = useState<string | null>(null);
  const [unsavedKeys, setUnsavedKeys] = useState<string[]>([]);

  const showToast = useCallback(
    (type: "success" | "error", message: string) => {
      setToast({ type, message });
      setTimeout(() => setToast(null), 3000);
    },
    []
  );

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from("stats_data")
        .select("key, value");

      if (error) {
        showToast("error", "Kunde inte ladda statistik");
        setLoading(false);
        return;
      }

      const map: Record<string, unknown> = {};
      for (const row of data ?? []) {
        map[row.key] = row.value;
      }

      if (map.key_metrics_2025) setMetrics2025(map.key_metrics_2025 as KeyMetricRow[]);
      if (map.key_metrics_2026) setMetrics2026(map.key_metrics_2026 as KeyMetricRow[]);
      if (map.key_metrics_all) setMetricsAll(map.key_metrics_all as KeyMetricRow[]);
      if (map.daily_interactions_2025) setDailyInteractions2025(map.daily_interactions_2025 as DateInteractionRow[]);
      if (map.daily_interactions_2026) setDailyInteractions2026(map.daily_interactions_2026 as DateInteractionRow[]);
      if (map.daily_interactions_all) setDailyInteractionsAll(map.daily_interactions_all as DateInteractionRow[]);
      if (map.top_assistants_2025) setTopAssistants2025(map.top_assistants_2025 as NameMessagesRow[]);
      if (map.top_assistants_2026) setTopAssistants2026(map.top_assistants_2026 as NameMessagesRow[]);
      if (map.top_assistants_all) setTopAssistantsAll(map.top_assistants_all as NameMessagesRow[]);
      if (map.model_usage_2025) setModelUsage2025(map.model_usage_2025 as NameValueRow[]);
      if (map.model_usage_2026) setModelUsage2026(map.model_usage_2026 as NameValueRow[]);
      if (map.model_usage_all) setModelUsageAll(map.model_usage_all as NameValueRow[]);
      if (map.assistant_split_2025) setAssistantSplit2025(map.assistant_split_2025 as NameValueRow[]);
      if (map.assistant_split_2026) setAssistantSplit2026(map.assistant_split_2026 as NameValueRow[]);
      if (map.assistant_split_all) setAssistantSplitAll(map.assistant_split_all as NameValueRow[]);
      if (map.file_uploads_2025) setFileUploads2025(map.file_uploads_2025 as FileUploadRow[]);
      if (map.file_uploads_2026) setFileUploads2026(map.file_uploads_2026 as FileUploadRow[]);
      if (map.file_uploads_all) setFileUploadsAll(map.file_uploads_all as FileUploadRow[]);
      if (map.year_comparison) setYearComparison(map.year_comparison as YearComparisonRow[]);
      if (map.user_roles_2025) setUserRoles2025(map.user_roles_2025 as NameValueRow[]);
      if (map.user_roles_2026) setUserRoles2026(map.user_roles_2026 as NameValueRow[]);
      if (map.user_roles_all) setUserRolesAll(map.user_roles_all as NameValueRow[]);
      if (map.platform_overview) setPlatformOverview(map.platform_overview as typeof platformOverview);

      // Track which keys use defaults (not saved to DB)
      const allExpectedKeys = [
        "key_metrics_2025", "key_metrics_2026", "key_metrics_all",
        "daily_interactions_2025", "daily_interactions_2026", "daily_interactions_all",
        "top_assistants_2025", "top_assistants_2026", "top_assistants_all",
        "model_usage_2025", "model_usage_2026", "model_usage_all",
        "assistant_split_2025", "assistant_split_2026", "assistant_split_all",
        "file_uploads_2025", "file_uploads_2026", "file_uploads_all",
        "year_comparison", "user_roles_2025", "user_roles_2026", "user_roles_all",
        "platform_overview",
      ];
      setUnsavedKeys(allExpectedKeys.filter((k) => !map[k]));

      setLoading(false);
    }
    load();
  }, [showToast]);

  async function saveSection(key: string, value: unknown) {
    setSavingSection(key);
    const { error } = await supabase
      .from("stats_data")
      .upsert(
        { key, value, updated_at: new Date().toISOString() },
        { onConflict: "key" }
      );

    if (error) {
      showToast("error", "Kunde inte spara: " + error.message);
    } else {
      showToast("success", "Sparad!");
    }
    setSavingSection(null);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12 text-muted-foreground">
        <Loader2 size={20} className="mr-2 animate-spin" />
        Laddar...
      </div>
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

      {/* Page Header */}
      <div className="mb-8 flex items-start justify-between">
        <div>
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
            Statistik
          </h1>
          <p className="mt-2 text-[0.875rem] text-muted-foreground">
            Redigera all statistikdata som visas pa statistiksidan. Spara per sektion.
          </p>
          {unsavedKeys.length > 0 && (
            <p className="mt-2 text-[0.75rem] text-amber-600 dark:text-amber-400" style={monoStyle}>
              {unsavedKeys.length} sektioner anvander standardvarden (ej sparade i databasen)
            </p>
          )}
        </div>
        <a
          href="/statistik"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 rounded-md border border-border px-3 py-2 text-[0.8125rem] text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          style={monoStyle}
        >
          <ExternalLink size={14} />
          Visa live
        </a>
      </div>

      {/* Table of contents */}
      <div className="mb-8 rounded-lg border border-border bg-card p-4">
        <p
          className="mb-3 text-[0.625rem] font-medium uppercase tracking-[0.1em] text-muted-foreground"
          style={monoStyle}
        >
          Sektioner
        </p>
        <div className="flex flex-wrap gap-2">
          {[
            ["sec-metrics-2025", "Nyckeltal 2025"],
            ["sec-metrics-2026", "Nyckeltal 2026"],
            ["sec-metrics-all", "Nyckeltal Totalt"],
            ["sec-daily", "Dagliga interaktioner"],
            ["sec-platform", "Plattform"],
            ["sec-roles", "Anvandarroller"],
            ["sec-top", "Topp assistenter"],
            ["sec-models", "AI-modeller"],
            ["sec-split", "Personliga vs anpassade"],
            ["sec-files", "Filuppladdningar"],
            ["sec-year", "Arsjamforelse"],
          ].map(([id, label]) => (
            <button
              key={id}
              onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })}
              className="rounded-md border border-border px-2.5 py-1.5 text-[0.6875rem] text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              style={monoStyle}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-10">
        {/* ── Key Metrics 2025 ── */}
        <section id="sec-metrics-2025" className="scroll-mt-20 rounded-lg border border-border bg-card p-6">
          <SectionHeader label="Nyckeltal" title="2025" />
          <KeyMetricsEditor
            rows={metrics2025}
            onChange={setMetrics2025}
          />
          <div className="mt-4 flex justify-end">
            <SaveButton
              saving={savingSection === "key_metrics_2025"}
              onClick={() => saveSection("key_metrics_2025", metrics2025)}
            />
          </div>
        </section>

        {/* ── Key Metrics 2026 ── */}
        <section id="sec-metrics-2026" className="scroll-mt-20 rounded-lg border border-border bg-card p-6">
          <SectionHeader label="Nyckeltal" title="2026" />
          <KeyMetricsEditor
            rows={metrics2026}
            onChange={setMetrics2026}
          />
          <div className="mt-4 flex justify-end">
            <SaveButton
              saving={savingSection === "key_metrics_2026"}
              onClick={() => saveSection("key_metrics_2026", metrics2026)}
            />
          </div>
        </section>

        {/* ── Key Metrics All ── */}
        <section id="sec-metrics-all" className="scroll-mt-20 rounded-lg border border-border bg-card p-6">
          <SectionHeader label="Nyckeltal" title="Alla perioder" />
          <KeyMetricsEditor
            rows={metricsAll}
            onChange={setMetricsAll}
          />
          <div className="mt-4 flex justify-end">
            <SaveButton
              saving={savingSection === "key_metrics_all"}
              onClick={() => saveSection("key_metrics_all", metricsAll)}
            />
          </div>
        </section>

        {/* ── Daily Interactions ── */}
        {([["daily_interactions_2025", "Dagliga interaktioner 2025", dailyInteractions2025, setDailyInteractions2025], ["daily_interactions_2026", "Dagliga interaktioner 2026", dailyInteractions2026, setDailyInteractions2026], ["daily_interactions_all", "Dagliga interaktioner Totalt", dailyInteractionsAll, setDailyInteractionsAll]] as const).map(([key, title, data, setData], i) => (
          <section key={key} id={i === 0 ? "sec-daily" : undefined} className="scroll-mt-20 rounded-lg border border-border bg-card p-6">
            <SectionHeader label="Diagram" title={title} />
            <DateInteractionsEditor rows={data as DateInteractionRow[]} onChange={setData as (rows: DateInteractionRow[]) => void} />
            <div className="mt-4 flex justify-end">
              <SaveButton saving={savingSection === key} onClick={() => saveSection(key, data)} />
            </div>
          </section>
        ))}

        {/* ── Platform Overview ── */}
        <section id="sec-platform" className="scroll-mt-20 rounded-lg border border-border bg-card p-6">
          <SectionHeader label="Plattform" title="Plattformsöversikt" />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {(["registeredUsers", "activeUsers", "spaces", "totalAssistants"] as const).map((key) => {
              const labels = { registeredUsers: "Registrerade", activeUsers: "Aktiva", spaces: "Spaces", totalAssistants: "Assistenter" };
              return (
                <div key={key}>
                  <label className={thClass} style={monoStyle}>{labels[key]}</label>
                  <input className={inputClass} type="number" value={platformOverview[key]} onChange={(e) => setPlatformOverview({ ...platformOverview, [key]: Number(e.target.value) || 0 })} />
                </div>
              );
            })}
          </div>
          <div className="mt-4 flex justify-end">
            <SaveButton saving={savingSection === "platform_overview"} onClick={() => saveSection("platform_overview", platformOverview)} />
          </div>
        </section>

        {/* ── User Roles ── */}
        {([["user_roles_2025", "Användarroller 2025", userRoles2025, setUserRoles2025], ["user_roles_2026", "Användarroller 2026", userRoles2026, setUserRoles2026], ["user_roles_all", "Användarroller Totalt", userRolesAll, setUserRolesAll]] as const).map(([key, title, data, setData], i) => (
          <section key={key} id={i === 0 ? "sec-roles" : undefined} className="scroll-mt-20 rounded-lg border border-border bg-card p-6">
            <SectionHeader label="Diagram" title={title} />
            <NameValueEditor rows={data as NameValueRow[]} onChange={setData as (rows: NameValueRow[]) => void} nameLabel="Roll" valueLabel="Antal" />
            <div className="mt-4 flex justify-end">
              <SaveButton saving={savingSection === key} onClick={() => saveSection(key, data)} />
            </div>
          </section>
        ))}

        {/* ── Top Assistants ── */}
        {([["top_assistants_2025", "Topp assistenter 2025", topAssistants2025, setTopAssistants2025], ["top_assistants_2026", "Topp assistenter 2026", topAssistants2026, setTopAssistants2026], ["top_assistants_all", "Topp assistenter Totalt", topAssistantsAll, setTopAssistantsAll]] as const).map(([key, title, data, setData], i) => (
          <section key={key} id={i === 0 ? "sec-top" : undefined} className="scroll-mt-20 rounded-lg border border-border bg-card p-6">
            <SectionHeader label="Diagram" title={title} />
            <NameMessagesEditor rows={data as NameMessagesRow[]} onChange={setData as (rows: NameMessagesRow[]) => void} />
            <div className="mt-4 flex justify-end">
              <SaveButton saving={savingSection === key} onClick={() => saveSection(key, data)} />
            </div>
          </section>
        ))}

        {/* ── Model Usage ── */}
        {([["model_usage_2025", "AI-modeller 2025", modelUsage2025, setModelUsage2025], ["model_usage_2026", "AI-modeller 2026", modelUsage2026, setModelUsage2026], ["model_usage_all", "AI-modeller Totalt", modelUsageAll, setModelUsageAll]] as const).map(([key, title, data, setData], i) => (
          <section key={key} id={i === 0 ? "sec-models" : undefined} className="scroll-mt-20 rounded-lg border border-border bg-card p-6">
            <SectionHeader label="Diagram" title={title} />
            <NameValueEditor rows={data as NameValueRow[]} onChange={setData as (rows: NameValueRow[]) => void} nameLabel="Modell" valueLabel="Antal" />
            <div className="mt-4 flex justify-end">
              <SaveButton saving={savingSection === key} onClick={() => saveSection(key, data)} />
            </div>
          </section>
        ))}

        {/* ── Assistant Split ── */}
        {([["assistant_split_2025", "Personliga vs anpassade 2025", assistantSplit2025, setAssistantSplit2025], ["assistant_split_2026", "Personliga vs anpassade 2026", assistantSplit2026, setAssistantSplit2026], ["assistant_split_all", "Personliga vs anpassade Totalt", assistantSplitAll, setAssistantSplitAll]] as const).map(([key, title, data, setData], i) => (
          <section key={key} id={i === 0 ? "sec-split" : undefined} className="scroll-mt-20 rounded-lg border border-border bg-card p-6">
            <SectionHeader label="Diagram" title={title} />
            <NameValueEditor rows={data as NameValueRow[]} onChange={setData as (rows: NameValueRow[]) => void} nameLabel="Typ" valueLabel="Antal" />
            <div className="mt-4 flex justify-end">
              <SaveButton saving={savingSection === key} onClick={() => saveSection(key, data)} />
            </div>
          </section>
        ))}

        {/* ── File Uploads ── */}
        {([["file_uploads_2025", "Filuppladdningar 2025", fileUploads2025, setFileUploads2025], ["file_uploads_2026", "Filuppladdningar 2026", fileUploads2026, setFileUploads2026], ["file_uploads_all", "Filuppladdningar Totalt", fileUploadsAll, setFileUploadsAll]] as const).map(([key, title, data, setData], i) => (
          <section key={key} id={i === 0 ? "sec-files" : undefined} className="scroll-mt-20 rounded-lg border border-border bg-card p-6">
            <SectionHeader label="Diagram" title={title} />
            <FileUploadsEditor rows={data as FileUploadRow[]} onChange={setData as (rows: FileUploadRow[]) => void} />
            <div className="mt-4 flex justify-end">
              <SaveButton saving={savingSection === key} onClick={() => saveSection(key, data)} />
            </div>
          </section>
        ))}

        {/* ── Year Comparison ── */}
        <section id="sec-year" className="scroll-mt-20 rounded-lg border border-border bg-card p-6">
          <SectionHeader label="Diagram" title="Årsjämförelse" />
          <YearComparisonEditor
            rows={yearComparison}
            onChange={setYearComparison}
          />
          <div className="mt-4 flex justify-end">
            <SaveButton
              saving={savingSection === "year_comparison"}
              onClick={() => saveSection("year_comparison", yearComparison)}
            />
          </div>
        </section>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   Sub-editors
   ══════════════════════════════════════════ */

const inputClass =
  "w-full rounded-md border border-border bg-background px-3 py-2 text-[0.8125rem] outline-none focus:border-foreground";
const thClass =
  "px-3 py-2 text-left text-[0.625rem] font-medium uppercase tracking-[0.1em] text-muted-foreground";

/* ── Key Metrics editor ── */

function KeyMetricsEditor({
  rows,
  onChange,
}: {
  rows: KeyMetricRow[];
  onChange: (rows: KeyMetricRow[]) => void;
}) {
  function update(index: number, field: keyof KeyMetricRow, val: string) {
    const next = [...rows];
    const row = { ...next[index] };
    if (field === "value" || field === "change") {
      (row as Record<string, string | number>)[field] = Number(val) || 0;
    } else {
      (row as Record<string, string | number>)[field] = val;
    }
    next[index] = row;
    onChange(next);
  }

  function addRow() {
    onChange([
      ...rows,
      { label: "", value: 0, formatted: "0", change: 0, changeLabel: "" },
    ]);
  }

  function removeRow(index: number) {
    onChange(rows.filter((_, i) => i !== index));
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full text-[0.8125rem]">
          <thead>
            <tr className="border-b border-border">
              <th className={thClass} style={monoStyle}>Etikett</th>
              <th className={thClass} style={monoStyle}>Varde</th>
              <th className={thClass} style={monoStyle}>Formaterat</th>
              <th className={thClass} style={monoStyle}>Forandring %</th>
              <th className={thClass} style={monoStyle}>Forandringsetikett</th>
              <th className={thClass} style={monoStyle}></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-b border-border last:border-0">
                <td className="px-2 py-2">
                  <input
                    className={inputClass}
                    value={row.label}
                    onChange={(e) => update(i, "label", e.target.value)}
                  />
                </td>
                <td className="px-2 py-2">
                  <input
                    className={inputClass}
                    type="number"
                    value={row.value}
                    onChange={(e) => update(i, "value", e.target.value)}
                  />
                </td>
                <td className="px-2 py-2">
                  <input
                    className={inputClass}
                    value={row.formatted}
                    onChange={(e) => update(i, "formatted", e.target.value)}
                  />
                </td>
                <td className="px-2 py-2">
                  <input
                    className={inputClass}
                    type="number"
                    value={row.change}
                    onChange={(e) => update(i, "change", e.target.value)}
                  />
                </td>
                <td className="px-2 py-2">
                  <input
                    className={inputClass}
                    value={row.changeLabel}
                    onChange={(e) => update(i, "changeLabel", e.target.value)}
                  />
                </td>
                <td className="px-2 py-2">
                  <button
                    onClick={() => removeRow(i)}
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
        onClick={addRow}
        className="mt-3 flex items-center gap-1.5 text-[0.8125rem] text-muted-foreground hover:text-foreground"
      >
        <Plus size={14} /> Lagg till rad
      </button>
    </div>
  );
}

/* ── Date/Interactions editor ── */

function DateInteractionsEditor({
  rows,
  onChange,
}: {
  rows: DateInteractionRow[];
  onChange: (rows: DateInteractionRow[]) => void;
}) {
  function update(index: number, field: keyof DateInteractionRow, val: string) {
    const next = [...rows];
    if (field === "interactions") {
      next[index] = { ...next[index], interactions: Number(val) || 0 };
    } else {
      next[index] = { ...next[index], date: val };
    }
    onChange(next);
  }

  return (
    <div>
      <div className="max-h-[400px] overflow-y-auto overflow-x-auto">
        <table className="w-full text-[0.8125rem]">
          <thead className="sticky top-0 bg-card">
            <tr className="border-b border-border">
              <th className={thClass} style={monoStyle}>Datum</th>
              <th className={thClass} style={monoStyle}>Interaktioner</th>
              <th className={thClass} style={monoStyle}></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-b border-border last:border-0">
                <td className="px-2 py-1.5">
                  <input
                    className={inputClass}
                    value={row.date}
                    onChange={(e) => update(i, "date", e.target.value)}
                  />
                </td>
                <td className="px-2 py-1.5">
                  <input
                    className={inputClass}
                    type="number"
                    value={row.interactions}
                    onChange={(e) => update(i, "interactions", e.target.value)}
                  />
                </td>
                <td className="px-2 py-1.5">
                  <button
                    onClick={() => onChange(rows.filter((_, j) => j !== i))}
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
        onClick={() => onChange([...rows, { date: "", interactions: 0 }])}
        className="mt-3 flex items-center gap-1.5 text-[0.8125rem] text-muted-foreground hover:text-foreground"
      >
        <Plus size={14} /> Lagg till rad
      </button>
    </div>
  );
}

/* ── Name/Messages editor (top assistants) ── */

function NameMessagesEditor({
  rows,
  onChange,
}: {
  rows: NameMessagesRow[];
  onChange: (rows: NameMessagesRow[]) => void;
}) {
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full text-[0.8125rem]">
          <thead>
            <tr className="border-b border-border">
              <th className={thClass} style={monoStyle}>Namn</th>
              <th className={thClass} style={monoStyle}>Meddelanden</th>
              <th className={thClass} style={monoStyle}></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-b border-border last:border-0">
                <td className="px-2 py-1.5">
                  <input
                    className={inputClass}
                    value={row.name}
                    onChange={(e) => {
                      const next = [...rows];
                      next[i] = { ...next[i], name: e.target.value };
                      onChange(next);
                    }}
                  />
                </td>
                <td className="px-2 py-1.5">
                  <input
                    className={inputClass}
                    type="number"
                    value={row.messages}
                    onChange={(e) => {
                      const next = [...rows];
                      next[i] = { ...next[i], messages: Number(e.target.value) || 0 };
                      onChange(next);
                    }}
                  />
                </td>
                <td className="px-2 py-1.5">
                  <button
                    onClick={() => onChange(rows.filter((_, j) => j !== i))}
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
        onClick={() => onChange([...rows, { name: "", messages: 0 }])}
        className="mt-3 flex items-center gap-1.5 text-[0.8125rem] text-muted-foreground hover:text-foreground"
      >
        <Plus size={14} /> Lagg till rad
      </button>
    </div>
  );
}

/* ── Name/Value editor (models, split) ── */

function NameValueEditor({
  rows,
  onChange,
  nameLabel = "Namn",
  valueLabel = "Varde",
}: {
  rows: NameValueRow[];
  onChange: (rows: NameValueRow[]) => void;
  nameLabel?: string;
  valueLabel?: string;
}) {
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full text-[0.8125rem]">
          <thead>
            <tr className="border-b border-border">
              <th className={thClass} style={monoStyle}>{nameLabel}</th>
              <th className={thClass} style={monoStyle}>{valueLabel}</th>
              <th className={thClass} style={monoStyle}></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-b border-border last:border-0">
                <td className="px-2 py-1.5">
                  <input
                    className={inputClass}
                    value={row.name}
                    onChange={(e) => {
                      const next = [...rows];
                      next[i] = { ...next[i], name: e.target.value };
                      onChange(next);
                    }}
                  />
                </td>
                <td className="px-2 py-1.5">
                  <input
                    className={inputClass}
                    type="number"
                    value={row.value}
                    onChange={(e) => {
                      const next = [...rows];
                      next[i] = { ...next[i], value: Number(e.target.value) || 0 };
                      onChange(next);
                    }}
                  />
                </td>
                <td className="px-2 py-1.5">
                  <button
                    onClick={() => onChange(rows.filter((_, j) => j !== i))}
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
        onClick={() => onChange([...rows, { name: "", value: 0 }])}
        className="mt-3 flex items-center gap-1.5 text-[0.8125rem] text-muted-foreground hover:text-foreground"
      >
        <Plus size={14} /> Lagg till rad
      </button>
    </div>
  );
}

/* ── File Uploads editor ── */

function FileUploadsEditor({
  rows,
  onChange,
}: {
  rows: FileUploadRow[];
  onChange: (rows: FileUploadRow[]) => void;
}) {
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full text-[0.8125rem]">
          <thead>
            <tr className="border-b border-border">
              <th className={thClass} style={monoStyle}>Filtyp</th>
              <th className={thClass} style={monoStyle}>Antal</th>
              <th className={thClass} style={monoStyle}></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-b border-border last:border-0">
                <td className="px-2 py-1.5">
                  <input
                    className={inputClass}
                    value={row.type}
                    onChange={(e) => {
                      const next = [...rows];
                      next[i] = { ...next[i], type: e.target.value };
                      onChange(next);
                    }}
                  />
                </td>
                <td className="px-2 py-1.5">
                  <input
                    className={inputClass}
                    type="number"
                    value={row.count}
                    onChange={(e) => {
                      const next = [...rows];
                      next[i] = { ...next[i], count: Number(e.target.value) || 0 };
                      onChange(next);
                    }}
                  />
                </td>
                <td className="px-2 py-1.5">
                  <button
                    onClick={() => onChange(rows.filter((_, j) => j !== i))}
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
        onClick={() => onChange([...rows, { type: "", count: 0 }])}
        className="mt-3 flex items-center gap-1.5 text-[0.8125rem] text-muted-foreground hover:text-foreground"
      >
        <Plus size={14} /> Lagg till rad
      </button>
    </div>
  );
}

/* ── Year Comparison editor ── */

function YearComparisonEditor({
  rows,
  onChange,
}: {
  rows: YearComparisonRow[];
  onChange: (rows: YearComparisonRow[]) => void;
}) {
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full text-[0.8125rem]">
          <thead>
            <tr className="border-b border-border">
              <th className={thClass} style={monoStyle}>Kategori</th>
              <th className={thClass} style={monoStyle}>2025</th>
              <th className={thClass} style={monoStyle}>2026</th>
              <th className={thClass} style={monoStyle}></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-b border-border last:border-0">
                <td className="px-2 py-1.5">
                  <input
                    className={inputClass}
                    value={row.category}
                    onChange={(e) => {
                      const next = [...rows];
                      next[i] = { ...next[i], category: e.target.value };
                      onChange(next);
                    }}
                  />
                </td>
                <td className="px-2 py-1.5">
                  <input
                    className={inputClass}
                    type="number"
                    value={row["2025"]}
                    onChange={(e) => {
                      const next = [...rows];
                      next[i] = { ...next[i], "2025": Number(e.target.value) || 0 };
                      onChange(next);
                    }}
                  />
                </td>
                <td className="px-2 py-1.5">
                  <input
                    className={inputClass}
                    type="number"
                    value={row["2026"]}
                    onChange={(e) => {
                      const next = [...rows];
                      next[i] = { ...next[i], "2026": Number(e.target.value) || 0 };
                      onChange(next);
                    }}
                  />
                </td>
                <td className="px-2 py-1.5">
                  <button
                    onClick={() => onChange(rows.filter((_, j) => j !== i))}
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
        onClick={() => onChange([...rows, { category: "", "2025": 0, "2026": 0 }])}
        className="mt-3 flex items-center gap-1.5 text-[0.8125rem] text-muted-foreground hover:text-foreground"
      >
        <Plus size={14} /> Lagg till rad
      </button>
    </div>
  );
}
