import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import {
  fetchOverviewMetrics,
  fetchAssistantTable,
  fetchTokenUsage,
  fetchUserEngagement,
  fetchAuditTrailCsv,
  parseAuditTrail,
  fetchActivityHeatmap,
  countInteractions,
  countInteractionsPerDay,
  countAssistantSplit,
  countFileUploads,
  formatModelName,
  formatSwedishDate,
  formatSwedishNumber,
} from "@/lib/intric-stats";

// ── Supabase (service role for server-side writes) ──

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Missing Supabase env vars");
  return createClient(url, key);
}

async function upsertStat(
  supabase: ReturnType<typeof getSupabase>,
  key: string,
  value: unknown
) {
  const { error } = await supabase
    .from("stats_data")
    .upsert(
      { key, value, updated_at: new Date().toISOString() },
      { onConflict: "key" }
    );
  if (error) throw new Error(`Failed to upsert ${key}: ${error.message}`);
}

// ── Date ranges ──

const RANGE_2025 = {
  start: "2025-01-01T00:00:00Z",
  end: "2025-12-31T23:59:59Z",
};
const RANGE_2026 = {
  start: "2026-01-01T00:00:00Z",
  end: "2026-12-31T23:59:59Z",
};
const RANGE_ALL = {
  start: "2025-01-01T00:00:00Z",
  end: "2026-12-31T23:59:59Z",
};

function pctChange(prev: number, curr: number): number {
  return prev > 0 ? Math.round(((curr - prev) / prev) * 100) : 0;
}

// ── Main sync handler ──

export async function GET(request: Request) {
  // Verify cron secret in production
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  if (process.env.CRON_SECRET && secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const supabase = getSupabase();

    // ── Fetch all data in parallel ──

    const [
      overview2025,
      overview2026,
      overviewAll,
      assistants2025,
      assistants2026,
      assistantsAll,
      tokens2025,
      tokens2026,
      tokensAll,
      engagement2025,
      engagement2026,
      engagementAll,
      auditCsv2025,
      auditCsv2026,
      heatmap2026,
    ] = await Promise.all([
      fetchOverviewMetrics(RANGE_2025.start, RANGE_2025.end),
      fetchOverviewMetrics(RANGE_2026.start, RANGE_2026.end),
      fetchOverviewMetrics(RANGE_ALL.start, RANGE_ALL.end),
      fetchAssistantTable(RANGE_2025.start, RANGE_2025.end),
      fetchAssistantTable(RANGE_2026.start, RANGE_2026.end),
      fetchAssistantTable(RANGE_ALL.start, RANGE_ALL.end),
      fetchTokenUsage(RANGE_2025.start, RANGE_2025.end),
      fetchTokenUsage(RANGE_2026.start, RANGE_2026.end),
      fetchTokenUsage(RANGE_ALL.start, RANGE_ALL.end),
      fetchUserEngagement(RANGE_2025.start, RANGE_2025.end),
      fetchUserEngagement(RANGE_2026.start, RANGE_2026.end),
      fetchUserEngagement(RANGE_ALL.start, RANGE_ALL.end),
      fetchAuditTrailCsv(RANGE_2025.start, RANGE_2025.end),
      fetchAuditTrailCsv(RANGE_2026.start, RANGE_2026.end),
      fetchActivityHeatmap(RANGE_2026.start, RANGE_2026.end),
    ]);

    // Parse audit trail CSVs — used for interactions, splits, file uploads, and daily chart
    const audit2025 = parseAuditTrail(auditCsv2025);
    const audit2026 = parseAuditTrail(auditCsv2026);
    const auditAll = [...audit2025, ...audit2026];

    // Daily interactions from audit trail (all event types)
    const daily2025 = countInteractionsPerDay(auditCsv2025);
    const daily2026 = countInteractionsPerDay(auditCsv2026);
    const dailyAllCsv = auditCsv2025 + "\n" + auditCsv2026.split("\n").slice(1).join("\n");
    const dailyAll = countInteractionsPerDay(dailyAllCsv);

    // ── 1. Key Metrics ──

    const interactions2025 = countInteractions(audit2025);
    const interactions2026 = countInteractions(audit2026);
    const interactionsAll = countInteractions(auditAll);
    const interactionsChange = pctChange(interactions2025, interactions2026);

    // Read existing key_metrics to preserve "Utbildade" (manually managed)
    const [existing2025, existing2026, existingAll] = await Promise.all([
      supabase.from("stats_data").select("value").eq("key", "key_metrics_2025").single(),
      supabase.from("stats_data").select("value").eq("key", "key_metrics_2026").single(),
      supabase.from("stats_data").select("value").eq("key", "key_metrics_all").single(),
    ]);

    // Helper: get a manually managed metric from existing data (don't overwrite)
    function getExistingMetric(existing: { data: { value: unknown } | null }, label: string): {
      value: number;
      formatted: string;
    } | null {
      const metrics = existing.data?.value;
      if (!Array.isArray(metrics)) return null;
      const found = metrics.find((m: { label: string }) => m.label === label);
      return found ? { value: found.value, formatted: found.formatted } : null;
    }

    // ── "Användare" logic ──
    // 2025 = frozen (manually set, never overwritten by cron)
    // 2026 & all = current registered total from API
    const users2025 = getExistingMetric(existing2025, "Användare");
    const users2025Value = users2025?.value ?? 139; // fallback to known 2025 end-of-year value
    const currentTotalUsers = engagement2026.total_users; // current registered total
    const usersChange = pctChange(users2025Value, currentTotalUsers);

    // ── "Skapade assistenter" logic ──
    // 2025 = frozen (end-of-year snapshot), 2026 & all = current total
    const ast2025Existing = getExistingMetric(existing2025, "Skapade assistenter");
    const ast2025Value = ast2025Existing?.value ?? overview2025.total_assistants;
    const astCurrent = overview2026.total_assistants;
    const astChange = pctChange(ast2025Value, astCurrent);

    function buildMetrics(
      interactions: number,
      intChange: number,
      intChangeLabel: string,
      users: number,
      userChange: number,
      userChangeLabel: string,
      assistants: number,
      assistantChange: number,
      assistantChangeLabel: string,
      engagement: { activation_rate: number },
      avgQuestions: number,
      existingData: { data: { value: unknown } | null }
    ) {
      const utb = getExistingMetric(existingData, "Utbildade");
      const activationPct = Math.round(engagement.activation_rate * 100);
      return [
        {
          label: "Interaktioner",
          value: interactions,
          formatted: formatSwedishNumber(interactions),
          change: intChange,
          changeLabel: intChangeLabel,
        },
        {
          label: "Användare",
          value: users,
          formatted: formatSwedishNumber(users),
          change: userChange,
          changeLabel: userChangeLabel,
        },
        {
          label: "Skapade assistenter",
          value: assistants,
          formatted: formatSwedishNumber(assistants),
          change: assistantChange,
          changeLabel: assistantChangeLabel,
        },
        {
          label: "Utbildade",
          value: utb?.value ?? 0,
          formatted: utb?.formatted ?? "0",
          change: 0,
          changeLabel: "manuellt",
        },
        {
          label: "Aktiveringsgrad",
          value: activationPct,
          formatted: `${activationPct}%`,
          change: 0,
          changeLabel: "",
        },
        {
          label: "Snitt frågor/användare",
          value: Math.round(avgQuestions),
          formatted: String(Math.round(avgQuestions)),
          change: 0,
          changeLabel: "",
        },
      ];
    }

    // 2025: frozen values, no change indicators
    const keyMetrics2025 = buildMetrics(
      interactions2025, 0, "",
      users2025Value, 0, "",
      ast2025Value, 0, "",
      engagement2025, overview2025.avg_question_per_user,
      existing2025
    );
    // 2026: current values with change vs 2025
    const keyMetrics2026 = buildMetrics(
      interactions2026, interactionsChange, "vs 2025",
      currentTotalUsers, usersChange, "vs 2025",
      astCurrent, astChange, "vs 2025",
      engagement2026, overview2026.avg_question_per_user,
      existing2026
    );
    // Totalt: interactions & assistants summed, users = current
    const astTotal = overviewAll.total_assistants; // 423 = all ever created
    const keyMetricsAll = buildMetrics(
      interactionsAll, interactionsChange, "2026 vs 2025",
      currentTotalUsers, usersChange, "2026 vs 2025",
      astTotal, astChange, "2026 vs 2025",
      engagementAll, overviewAll.avg_question_per_user,
      existingAll
    );

    // ── 2. Daily Interactions (from audit trail — all event types) ──

    function buildDailyInteractions(perDay: { date: string; count: number }[]) {
      return perDay
        .filter((p) => p.count > 0)
        .map((p) => ({
          date: formatSwedishDate(p.date),
          interactions: p.count,
        }));
    }

    // ── 3. Top Assistants ──

    function buildTopAssistants(rows: { assistant_name: string; question_count: number }[]) {
      return rows
        .sort((a, b) => b.question_count - a.question_count)
        .slice(0, 10)
        .map((r) => ({
          name: r.assistant_name.replace(/[^\w\sÅÄÖåäö()-]/g, "").trim(),
          messages: r.question_count,
        }));
    }

    // ── 4. Model Usage ──

    function buildModelUsage(models: { model_name: string; request_count: number }[]) {
      const sorted = models
        .sort((a, b) => b.request_count - a.request_count);
      const top5 = sorted.slice(0, 5).map((m) => ({
        name: formatModelName(m.model_name),
        value: m.request_count,
      }));
      const rest = sorted.slice(5).reduce((sum, m) => sum + m.request_count, 0);
      if (rest > 0) top5.push({ name: "Övriga", value: rest });
      return top5;
    }

    // ── 5. Assistant Split (personal vs custom) ──

    function buildAssistantSplit(auditRows: { eventType: string; metadata: Record<string, unknown> }[]) {
      const split = countAssistantSplit(auditRows);
      return [
        { name: "Personliga", value: split.personal },
        { name: "Anpassade", value: split.custom },
      ];
    }

    // ── 6. File Uploads ──

    function buildFileUploads(auditRows: { eventType: string; metadata: Record<string, unknown> }[]) {
      const counts = countFileUploads(auditRows);
      return Object.entries(counts)
        .map(([type, count]) => ({ type, count }))
        .sort((a, b) => b.count - a.count);
    }

    // ── 7. Year Comparison ──

    // Preserve "Utbildade" from existing year_comparison
    const existingYearComp = await supabase
      .from("stats_data")
      .select("value")
      .eq("key", "year_comparison")
      .single();
    const oldUtbildade = Array.isArray(existingYearComp.data?.value)
      ? (existingYearComp.data.value as { category: string; "2025": number; "2026": number }[]).find(
          (r) => r.category === "Utbildade"
        )
      : null;

    const yearComparison = [
      { category: "Användare", "2025": users2025Value, "2026": currentTotalUsers },
      { category: "Interaktioner", "2025": interactions2025, "2026": interactions2026 },
      { category: "Assistenter", "2025": ast2025Value, "2026": overview2026.total_assistants },
      {
        category: "Utbildade",
        "2025": oldUtbildade?.["2025"] ?? 0,
        "2026": oldUtbildade?.["2026"] ?? 0,
      },
    ];

    // ── 8. User Roles ──

    function buildUserRoles(eng: { total_users: number; active_users: number }) {
      // API doesn't give role breakdown directly, but we can derive:
      // active_users from engagement, and creator/admin from overview
      // For now, use engagement data as available
      return [
        { name: "Aktiva", value: eng.active_users },
        { name: "Inaktiva", value: Math.max(0, eng.total_users - eng.active_users) },
      ];
    }

    // ── 9. Platform Overview ──

    const platformOverview = {
      registeredUsers: engagementAll.total_users,
      activeUsers: engagementAll.active_users,
      spaces: 0, // Not available via API — kept for manual override
      totalAssistants: overviewAll.total_assistants,
    };

    // Preserve existing spaces count if set
    const existingPlatform = await supabase
      .from("stats_data")
      .select("value")
      .eq("key", "platform_overview")
      .single();
    if (existingPlatform.data?.value) {
      const prev = existingPlatform.data.value as { spaces?: number };
      if (prev.spaces) platformOverview.spaces = prev.spaces;
    }

    // ── Save everything to Supabase ──

    await Promise.all([
      // Key metrics
      upsertStat(supabase, "key_metrics_2025", keyMetrics2025),
      upsertStat(supabase, "key_metrics_2026", keyMetrics2026),
      upsertStat(supabase, "key_metrics_all", keyMetricsAll),
      // Daily interactions (from audit trail)
      upsertStat(supabase, "daily_interactions_2025", buildDailyInteractions(daily2025)),
      upsertStat(supabase, "daily_interactions_2026", buildDailyInteractions(daily2026)),
      upsertStat(supabase, "daily_interactions_all", buildDailyInteractions(dailyAll)),
      // Top assistants
      upsertStat(supabase, "top_assistants_2025", buildTopAssistants(assistants2025)),
      upsertStat(supabase, "top_assistants_2026", buildTopAssistants(assistants2026)),
      upsertStat(supabase, "top_assistants_all", buildTopAssistants(assistantsAll)),
      // Model usage
      upsertStat(supabase, "model_usage_2025", buildModelUsage(tokens2025)),
      upsertStat(supabase, "model_usage_2026", buildModelUsage(tokens2026)),
      upsertStat(supabase, "model_usage_all", buildModelUsage(tokensAll)),
      // Assistant split
      upsertStat(supabase, "assistant_split_2025", buildAssistantSplit(audit2025)),
      upsertStat(supabase, "assistant_split_2026", buildAssistantSplit(audit2026)),
      upsertStat(supabase, "assistant_split_all", buildAssistantSplit(auditAll)),
      // File uploads
      upsertStat(supabase, "file_uploads_2025", buildFileUploads(audit2025)),
      upsertStat(supabase, "file_uploads_2026", buildFileUploads(audit2026)),
      upsertStat(supabase, "file_uploads_all", buildFileUploads(auditAll)),
      // Year comparison
      upsertStat(supabase, "year_comparison", yearComparison),
      // User roles
      upsertStat(supabase, "user_roles_2025", buildUserRoles(engagement2025)),
      upsertStat(supabase, "user_roles_2026", buildUserRoles(engagement2026)),
      upsertStat(supabase, "user_roles_all", buildUserRoles(engagementAll)),
      // Activity heatmap (only 2026 — most relevant)
      upsertStat(supabase, "activity_heatmap", heatmap2026),
      // Platform overview
      upsertStat(supabase, "platform_overview", platformOverview),
    ]);

    return NextResponse.json({
      success: true,
      synced_at: new Date().toISOString(),
      data: {
        interactions: { "2025": interactions2025, "2026": interactions2026, all: interactionsAll },
        activeUsers: { "2025": overview2025.total_active_users, "2026": overview2026.total_active_users },
        assistants: { "2025": overview2025.total_assistants, "2026": overview2026.total_assistants },
        topAssistants: buildTopAssistants(assistants2026).slice(0, 3).map((a) => a.name),
        models: buildModelUsage(tokens2026).slice(0, 3).map((m) => m.name),
        platformOverview,
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
