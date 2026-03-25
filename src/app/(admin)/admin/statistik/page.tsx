"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { revalidateStats } from "@/app/actions";
import { Check, Loader2, Plus, Trash2, ExternalLink, RefreshCw } from "lucide-react";

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

/* ── Auto-calculation helpers ── */

function formatSwedishNumber(n: number): string {
  return n.toLocaleString("sv-SE").replace(/,/g, "\u00a0");
}

function mergeKeyMetrics(m2025: KeyMetricRow[], m2026: KeyMetricRow[]): KeyMetricRow[] {
  return m2026.map((m26) => {
    const m25 = m2025.find((m) => m.label === m26.label);
    const val25 = m25?.value ?? 0;
    const val26 = m26.value;
    const total = val25 + val26;
    const change = val25 > 0 ? Math.round(((val26 - val25) / val25) * 100) : 0;
    return {
      label: m26.label,
      value: total,
      formatted: formatSwedishNumber(total),
      change,
      changeLabel: change > 0 ? "2026 vs 2025" : "totalt",
    };
  });
}

function mergeByName(a: NameValueRow[], b: NameValueRow[]): NameValueRow[] {
  const map = new Map<string, number>();
  for (const item of a) map.set(item.name, (map.get(item.name) ?? 0) + item.value);
  for (const item of b) map.set(item.name, (map.get(item.name) ?? 0) + item.value);
  return Array.from(map.entries()).map(([name, value]) => ({ name, value }));
}

function mergeByNameMessages(a: NameMessagesRow[], b: NameMessagesRow[]): NameMessagesRow[] {
  const map = new Map<string, number>();
  for (const item of a) map.set(item.name, (map.get(item.name) ?? 0) + item.messages);
  for (const item of b) map.set(item.name, (map.get(item.name) ?? 0) + item.messages);
  return Array.from(map.entries())
    .map(([name, messages]) => ({ name, messages }))
    .sort((a, b) => b.messages - a.messages);
}

function mergeFileUploads(a: FileUploadRow[], b: FileUploadRow[]): FileUploadRow[] {
  const map = new Map<string, number>();
  for (const item of a) map.set(item.type, (map.get(item.type) ?? 0) + item.count);
  for (const item of b) map.set(item.type, (map.get(item.type) ?? 0) + item.count);
  return Array.from(map.entries())
    .map(([type, count]) => ({ type, count }))
    .sort((a, b) => b.count - a.count);
}

function mergeDailyInteractions(a: DateInteractionRow[], b: DateInteractionRow[]): DateInteractionRow[] {
  return [...a, ...b];
}

function buildYearComparison(m2025: KeyMetricRow[], m2026: KeyMetricRow[]): YearComparisonRow[] {
  const labelToCategory: Record<string, string> = {
    "Aktiva användare": "Användare",
    "Interaktioner": "Interaktioner",
    "Skapade assistenter": "Assistenter",
    "Utbildade": "Utbildade",
  };
  return m2026
    .filter((m) => labelToCategory[m.label])
    .map((m26) => {
      const m25 = m2025.find((m) => m.label === m26.label);
      return {
        category: labelToCategory[m26.label],
        "2025": m25?.value ?? 0,
        "2026": m26.value,
      };
    });
}

/* ── Helpers ── */

const monoStyle = { fontFamily: "var(--font-geist-mono), monospace" };
const bodoniStyle = { fontFamily: "var(--font-bodoni), serif", fontWeight: 400 as const };
const btnShadow = "0px 2px 1px 0px rgba(255,255,255,0.15) inset, 0px -2px 1px 0px rgba(0,0,0,0.05) inset";

function SectionHeader({ label, title, auto }: { label: string; title: string; auto?: boolean }) {
  return (
    <div className="mb-4 flex items-start justify-between">
      <div>
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
      {auto && (
        <span
          className="mt-1 flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-[0.625rem] font-medium uppercase tracking-[0.06em] text-blue-700 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-300"
          style={monoStyle}
        >
          <RefreshCw size={10} />
          Auto
        </span>
      )}
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
    { label: "Interaktioner", value: 2881, formatted: "2\u00a0881", change: 0, changeLabel: "" },
    { label: "Aktiva användare", value: 139, formatted: "139", change: 0, changeLabel: "" },
    { label: "Skapade assistenter", value: 120, formatted: "120", change: 0, changeLabel: "" },
    { label: "Utbildade", value: 160, formatted: "160", change: 0, changeLabel: "" },
  ];
  const defaultMetrics2026: KeyMetricRow[] = [
    { label: "Interaktioner", value: 6973, formatted: "6\u00a0973", change: 142, changeLabel: "vs 2025" },
    { label: "Aktiva användare", value: 257, formatted: "257", change: 85, changeLabel: "vs 2025" },
    { label: "Skapade assistenter", value: 190, formatted: "190", change: 58, changeLabel: "vs 2025" },
    { label: "Utbildade", value: 340, formatted: "340", change: 113, changeLabel: "vs 2025" },
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

  // Data state — only 2025 and 2026 (all is auto-calculated)
  const [metrics2025, setMetrics2025] = useState<KeyMetricRow[]>(defaultMetrics2025);
  const [metrics2026, setMetrics2026] = useState<KeyMetricRow[]>(defaultMetrics2026);
  const [dailyInteractions2025, setDailyInteractions2025] = useState<DateInteractionRow[]>([]);
  const [dailyInteractions2026, setDailyInteractions2026] = useState<DateInteractionRow[]>([]);
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
  const [userRoles2025, setUserRoles2025] = useState<NameValueRow[]>([]);
  const [userRoles2026, setUserRoles2026] = useState<NameValueRow[]>([]);
  const [userRolesAll, setUserRolesAll] = useState<NameValueRow[]>([]);
  const [metricsAll, setMetricsAll] = useState<KeyMetricRow[]>([]);
  const [yearComparison, setYearComparison] = useState<YearComparisonRow[]>([]);
  const [platformOverview, setPlatformOverview] = useState<{
    registeredUsers: number;
    activeUsers: number;
    spaces: number;
    totalAssistants: number;
  }>({ registeredUsers: 0, activeUsers: 0, spaces: 0, totalAssistants: 0 });

  // Saving state
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

      const allExpectedKeys = [
        "key_metrics_2025", "key_metrics_2026",
        "daily_interactions_2025", "daily_interactions_2026",
        "top_assistants_2025", "top_assistants_2026",
        "model_usage_2025", "model_usage_2026",
        "assistant_split_2025", "assistant_split_2026",
        "file_uploads_2025", "file_uploads_2026",
        "user_roles_2025", "user_roles_2026",
        "platform_overview",
      ];
      setUnsavedKeys(allExpectedKeys.filter((k) => !map[k]));

      setLoading(false);
    }
    load();
  }, [showToast]);

  // ── Core save with auto-calculation + revalidation ──

  async function upsertKey(key: string, value: unknown) {
    const { error } = await supabase
      .from("stats_data")
      .upsert(
        { key, value, updated_at: new Date().toISOString() },
        { onConflict: "key" }
      );
    return error;
  }

  // Fetch fresh value from DB (avoids stale React state in async functions)
  async function fetchDbValue<T>(key: string): Promise<T | null> {
    const { data } = await supabase
      .from("stats_data")
      .select("value")
      .eq("key", key)
      .single();
    return data?.value as T | null;
  }

  async function saveWithSync(key: string, value: unknown) {
    setSavingSection(key);

    // 1. Save the section itself
    const error = await upsertKey(key, value);
    if (error) {
      showToast("error", "Kunde inte spara: " + error.message);
      setSavingSection(null);
      return;
    }

    // 2. Auto-calculate "all" counterpart + year comparison
    const match = key.match(/^(.+)_(2025|2026)$/);
    if (match) {
      const [, base, savedPeriod] = match;
      const otherPeriod = savedPeriod === "2025" ? "2026" : "2025";

      // Use the just-saved value for the saved period,
      // and fetch fresh from DB for the other period
      const otherValue = await fetchDbValue(`${base}_${otherPeriod}`);
      const d2025 = savedPeriod === "2025" ? value : otherValue;
      const d2026 = savedPeriod === "2026" ? value : otherValue;

      if (d2025 && d2026) {
        await autoCalculateAll(base, d2025, d2026);
      }
    }

    // 3. Revalidate the public page
    try {
      await revalidateStats();
    } catch {
      // Revalidation may fail in dev — not critical
    }

    showToast("success", "Sparad! Statistiksidan uppdateras inom sekunder.");
    setSavingSection(null);
    setUnsavedKeys((prev) => prev.filter((k) => k !== key));
  }

  async function autoCalculateAll(base: string, d2025: unknown, d2026: unknown) {
    let allData: unknown = null;

    switch (base) {
      case "key_metrics": {
        allData = mergeKeyMetrics(d2025 as KeyMetricRow[], d2026 as KeyMetricRow[]);
        setMetricsAll(allData as KeyMetricRow[]);

        const yearComp = buildYearComparison(d2025 as KeyMetricRow[], d2026 as KeyMetricRow[]);
        setYearComparison(yearComp);
        await upsertKey("year_comparison", yearComp);
        break;
      }
      case "daily_interactions": {
        allData = mergeDailyInteractions(d2025 as DateInteractionRow[], d2026 as DateInteractionRow[]);
        break;
      }
      case "top_assistants": {
        allData = mergeByNameMessages(d2025 as NameMessagesRow[], d2026 as NameMessagesRow[]);
        setTopAssistantsAll(allData as NameMessagesRow[]);
        break;
      }
      case "model_usage": {
        allData = mergeByName(d2025 as NameValueRow[], d2026 as NameValueRow[]);
        setModelUsageAll(allData as NameValueRow[]);
        break;
      }
      case "assistant_split": {
        allData = mergeByName(d2025 as NameValueRow[], d2026 as NameValueRow[]);
        setAssistantSplitAll(allData as NameValueRow[]);
        break;
      }
      case "file_uploads": {
        allData = mergeFileUploads(d2025 as FileUploadRow[], d2026 as FileUploadRow[]);
        setFileUploadsAll(allData as FileUploadRow[]);
        break;
      }
      case "user_roles": {
        allData = mergeByName(d2025 as NameValueRow[], d2026 as NameValueRow[]);
        setUserRolesAll(allData as NameValueRow[]);
        break;
      }
    }

    if (allData) {
      await upsertKey(`${base}_all`, allData);
    }
  }

  // Save platform overview (no auto-calc needed)
  async function savePlatformOverview() {
    setSavingSection("platform_overview");
    const error = await upsertKey("platform_overview", platformOverview);
    if (error) {
      showToast("error", "Kunde inte spara: " + error.message);
      setSavingSection(null);
      return;
    }
    try { await revalidateStats(); } catch { /* ok */ }
    showToast("success", "Sparad! Statistiksidan uppdateras inom sekunder.");
    setSavingSection(null);
    setUnsavedKeys((prev) => prev.filter((k) => k !== "platform_overview"));
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
            Redigera statistikdata per period. <strong>Totalt</strong>, <strong>Årsjämförelse</strong> och <strong>Förändring %</strong> beräknas automatiskt från 2025 + 2026.
          </p>
          {unsavedKeys.length > 0 && (
            <p className="mt-2 text-[0.75rem] text-amber-600 dark:text-amber-400" style={monoStyle}>
              {unsavedKeys.length} sektioner använder standardvärden (ej sparade i databasen)
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
            ["sec-daily", "Dagliga interaktioner"],
            ["sec-platform", "Plattform"],
            ["sec-roles", "Användarroller"],
            ["sec-top", "Topp assistenter"],
            ["sec-models", "AI-modeller"],
            ["sec-split", "Personliga vs anpassade"],
            ["sec-files", "Filuppladdningar"],
            ["sec-auto", "Auto-beräknat"],
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
          <KeyMetricsEditor rows={metrics2025} onChange={setMetrics2025} />
          <div className="mt-4 flex justify-end">
            <SaveButton
              saving={savingSection === "key_metrics_2025"}
              onClick={() => saveWithSync("key_metrics_2025", metrics2025)}
            />
          </div>
        </section>

        {/* ── Key Metrics 2026 ── */}
        <section id="sec-metrics-2026" className="scroll-mt-20 rounded-lg border border-border bg-card p-6">
          <SectionHeader label="Nyckeltal" title="2026" />
          <KeyMetricsEditor rows={metrics2026} onChange={setMetrics2026} />
          <div className="mt-4 flex justify-end">
            <SaveButton
              saving={savingSection === "key_metrics_2026"}
              onClick={() => saveWithSync("key_metrics_2026", metrics2026)}
            />
          </div>
        </section>

        {/* ── Daily Interactions ── */}
        {([
          ["daily_interactions_2025", "Dagliga interaktioner 2025", dailyInteractions2025, setDailyInteractions2025],
          ["daily_interactions_2026", "Dagliga interaktioner 2026", dailyInteractions2026, setDailyInteractions2026],
        ] as const).map(([key, title, data, setData], i) => (
          <section key={key} id={i === 0 ? "sec-daily" : undefined} className="scroll-mt-20 rounded-lg border border-border bg-card p-6">
            <SectionHeader label="Diagram" title={title} />
            <DateInteractionsEditor rows={data as DateInteractionRow[]} onChange={setData as (rows: DateInteractionRow[]) => void} />
            <div className="mt-4 flex justify-end">
              <SaveButton saving={savingSection === key} onClick={() => saveWithSync(key, data)} />
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
            <SaveButton saving={savingSection === "platform_overview"} onClick={savePlatformOverview} />
          </div>
        </section>

        {/* ── User Roles ── */}
        {([
          ["user_roles_2025", "Användarroller 2025", userRoles2025, setUserRoles2025],
          ["user_roles_2026", "Användarroller 2026", userRoles2026, setUserRoles2026],
        ] as const).map(([key, title, data, setData], i) => (
          <section key={key} id={i === 0 ? "sec-roles" : undefined} className="scroll-mt-20 rounded-lg border border-border bg-card p-6">
            <SectionHeader label="Diagram" title={title} />
            <NameValueEditor rows={data as NameValueRow[]} onChange={setData as (rows: NameValueRow[]) => void} nameLabel="Roll" valueLabel="Antal" />
            <div className="mt-4 flex justify-end">
              <SaveButton saving={savingSection === key} onClick={() => saveWithSync(key, data)} />
            </div>
          </section>
        ))}

        {/* ── Top Assistants ── */}
        {([
          ["top_assistants_2025", "Topp assistenter 2025", topAssistants2025, setTopAssistants2025],
          ["top_assistants_2026", "Topp assistenter 2026", topAssistants2026, setTopAssistants2026],
        ] as const).map(([key, title, data, setData], i) => (
          <section key={key} id={i === 0 ? "sec-top" : undefined} className="scroll-mt-20 rounded-lg border border-border bg-card p-6">
            <SectionHeader label="Diagram" title={title} />
            <NameMessagesEditor rows={data as NameMessagesRow[]} onChange={setData as (rows: NameMessagesRow[]) => void} />
            <div className="mt-4 flex justify-end">
              <SaveButton saving={savingSection === key} onClick={() => saveWithSync(key, data)} />
            </div>
          </section>
        ))}

        {/* ── Model Usage ── */}
        {([
          ["model_usage_2025", "AI-modeller 2025", modelUsage2025, setModelUsage2025],
          ["model_usage_2026", "AI-modeller 2026", modelUsage2026, setModelUsage2026],
        ] as const).map(([key, title, data, setData], i) => (
          <section key={key} id={i === 0 ? "sec-models" : undefined} className="scroll-mt-20 rounded-lg border border-border bg-card p-6">
            <SectionHeader label="Diagram" title={title} />
            <NameValueEditor rows={data as NameValueRow[]} onChange={setData as (rows: NameValueRow[]) => void} nameLabel="Modell" valueLabel="Antal" />
            <div className="mt-4 flex justify-end">
              <SaveButton saving={savingSection === key} onClick={() => saveWithSync(key, data)} />
            </div>
          </section>
        ))}

        {/* ── Assistant Split ── */}
        {([
          ["assistant_split_2025", "Personliga vs anpassade 2025", assistantSplit2025, setAssistantSplit2025],
          ["assistant_split_2026", "Personliga vs anpassade 2026", assistantSplit2026, setAssistantSplit2026],
        ] as const).map(([key, title, data, setData], i) => (
          <section key={key} id={i === 0 ? "sec-split" : undefined} className="scroll-mt-20 rounded-lg border border-border bg-card p-6">
            <SectionHeader label="Diagram" title={title} />
            <NameValueEditor rows={data as NameValueRow[]} onChange={setData as (rows: NameValueRow[]) => void} nameLabel="Typ" valueLabel="Antal" />
            <div className="mt-4 flex justify-end">
              <SaveButton saving={savingSection === key} onClick={() => saveWithSync(key, data)} />
            </div>
          </section>
        ))}

        {/* ── File Uploads ── */}
        {([
          ["file_uploads_2025", "Filuppladdningar 2025", fileUploads2025, setFileUploads2025],
          ["file_uploads_2026", "Filuppladdningar 2026", fileUploads2026, setFileUploads2026],
        ] as const).map(([key, title, data, setData], i) => (
          <section key={key} id={i === 0 ? "sec-files" : undefined} className="scroll-mt-20 rounded-lg border border-border bg-card p-6">
            <SectionHeader label="Diagram" title={title} />
            <FileUploadsEditor rows={data as FileUploadRow[]} onChange={setData as (rows: FileUploadRow[]) => void} />
            <div className="mt-4 flex justify-end">
              <SaveButton saving={savingSection === key} onClick={() => saveWithSync(key, data)} />
            </div>
          </section>
        ))}

        {/* ══════════════════════════════════════════
           Auto-calculated sections (read-only preview)
           ══════════════════════════════════════════ */}
        <div id="sec-auto" className="scroll-mt-20 space-y-6">
          <div className="rounded-lg border border-blue-200 bg-blue-50/50 p-4 dark:border-blue-900 dark:bg-blue-950/30">
            <p className="flex items-center gap-2 text-[0.8125rem] font-medium text-blue-800 dark:text-blue-200" style={monoStyle}>
              <RefreshCw size={14} />
              Följande sektioner beräknas automatiskt från 2025 + 2026-data
            </p>
            <p className="mt-1 text-[0.75rem] text-blue-600 dark:text-blue-400">
              Spara en 2025- eller 2026-sektion ovan för att uppdatera dessa.
            </p>
          </div>

          {/* Auto: Key Metrics All */}
          <section className="rounded-lg border border-dashed border-blue-300 bg-card p-6 dark:border-blue-800">
            <SectionHeader label="Nyckeltal" title="Totalt (auto)" auto />
            {metricsAll.length > 0 ? (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {metricsAll.map((m) => (
                  <div key={m.label} className="rounded-md border border-border bg-background p-3">
                    <p className="text-[0.625rem] uppercase tracking-[0.1em] text-muted-foreground" style={monoStyle}>{m.label}</p>
                    <p className="mt-1 text-[1.25rem] tracking-tight" style={bodoniStyle}>{m.formatted}</p>
                    {m.change > 0 && (
                      <p className="mt-1 text-[0.625rem] text-green-600 dark:text-green-400" style={monoStyle}>+{m.change}% {m.changeLabel}</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[0.8125rem] text-muted-foreground">Spara nyckeltal för 2025 och 2026 för att generera totaler.</p>
            )}
          </section>

          {/* Auto: Year Comparison */}
          <section className="rounded-lg border border-dashed border-blue-300 bg-card p-6 dark:border-blue-800">
            <SectionHeader label="Diagram" title="Årsjämförelse (auto)" auto />
            {yearComparison.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-[0.8125rem]">
                  <thead>
                    <tr className="border-b border-border">
                      <th className={thClass} style={monoStyle}>Kategori</th>
                      <th className={thClass} style={monoStyle}>2025</th>
                      <th className={thClass} style={monoStyle}>2026</th>
                    </tr>
                  </thead>
                  <tbody>
                    {yearComparison.map((row) => (
                      <tr key={row.category} className="border-b border-border last:border-0">
                        <td className="px-3 py-2">{row.category}</td>
                        <td className="px-3 py-2 tabular-nums" style={monoStyle}>{row["2025"].toLocaleString("sv-SE")}</td>
                        <td className="px-3 py-2 tabular-nums" style={monoStyle}>{row["2026"].toLocaleString("sv-SE")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-[0.8125rem] text-muted-foreground">Spara nyckeltal för att generera årsjämförelse.</p>
            )}
          </section>

          {/* Auto: Other "all" summaries */}
          {([
            ["Topp assistenter (totalt)", topAssistantsAll, "name", "messages"],
            ["AI-modeller (totalt)", modelUsageAll, "name", "value"],
            ["Personliga vs anpassade (totalt)", assistantSplitAll, "name", "value"],
            ["Filuppladdningar (totalt)", fileUploadsAll, "type", "count"],
            ["Användarroller (totalt)", userRolesAll, "name", "value"],
          ] as const).map(([title, data, nameKey, valueKey]) => (
            <section key={title} className="rounded-lg border border-dashed border-blue-300 bg-card p-6 dark:border-blue-800">
              <SectionHeader label="Sammanslaget" title={title} auto />
              {(data as unknown as Array<Record<string, unknown>>).length > 0 ? (
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
                  {(data as unknown as Array<Record<string, unknown>>).map((item, i) => (
                    <div key={i} className="rounded-md border border-border bg-background px-3 py-2">
                      <p className="text-[0.6875rem] text-muted-foreground" style={monoStyle}>{String(item[nameKey])}</p>
                      <p className="text-[1rem] font-medium tabular-nums" style={monoStyle}>{Number(item[valueKey]).toLocaleString("sv-SE")}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[0.8125rem] text-muted-foreground">Spara 2025- och 2026-data för att generera sammanslag.</p>
              )}
            </section>
          ))}
        </div>
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
              <th className={thClass} style={monoStyle}>Värde</th>
              <th className={thClass} style={monoStyle}>Formaterat</th>
              <th className={thClass} style={monoStyle}>Förändring %</th>
              <th className={thClass} style={monoStyle}>Förändringsetikett</th>
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
        <Plus size={14} /> Lägg till rad
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
        <Plus size={14} /> Lägg till rad
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
        <Plus size={14} /> Lägg till rad
      </button>
    </div>
  );
}

/* ── Name/Value editor (models, split, roles) ── */

function NameValueEditor({
  rows,
  onChange,
  nameLabel = "Namn",
  valueLabel = "Värde",
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
        <Plus size={14} /> Lägg till rad
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
        <Plus size={14} /> Lägg till rad
      </button>
    </div>
  );
}
