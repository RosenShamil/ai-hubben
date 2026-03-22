"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import {
  Award,
  BookOpen,
  Users,
  TrendingUp,
  CheckCircle,
  XCircle,
  RefreshCw,
  Loader2,
  Download,
  GraduationCap,
  Clock,
  Target,
  BarChart3,
} from "lucide-react";
import { BRAND_GRADIENT } from "@/lib/constants";

/* ── Types ── */

interface EventRow {
  id: string;
  anonymous_id: string;
  user_name: string | null;
  event_type: string;
  level_id: string | null;
  course_id: string | null;
  module_id: string | null;
  lesson_id: string | null;
  score: number | null;
  metadata: Record<string, unknown>;
  created_at: string;
}

interface LevelStats {
  enrolled: number;
  lessonsCompleted: number;
  quizzesPassed: number;
  quizzesFailed: number;
  examsPassed: number;
  examsFailed: number;
  certificates: number;
}

interface CertificateRow {
  user_name: string;
  level_id: string;
  certificate_id: string;
  earned_date: string;
}

/* ── Helpers ── */

const monoStyle = {
  fontFamily: "var(--font-geist-mono), monospace",
};
const bodoniStyle = {
  fontFamily: "var(--font-bodoni), serif",
  fontWeight: 400 as const,
};

const LEVEL_LABELS: Record<string, string> = {
  "niva-1": "Nivå 1 — AI-redo medarbetare",
  "niva-2": "Nivå 2 — AI-superanvändare",
  "niva-3": "Nivå 3 — AI-ambassadör",
};

const LEVEL_COLORS: Record<string, string> = {
  "niva-1": "#CD7F32",
  "niva-2": "#C0C0C0",
  "niva-3": "#FFD700",
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("sv-SE", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString("sv-SE", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/* ── Main Page ── */

export default function AdminAkademinPage() {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<EventRow[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "certificates" | "activity">("overview");

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error: err } = await supabase
      .from("education_events")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5000);

    if (err) {
      setError(err.message);
      setEvents([]);
    } else {
      setEvents((data as EventRow[]) ?? []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // --- Compute stats ---

  const uniqueUsers = new Set(events.map((e) => e.anonymous_id)).size;

  const levelStats: Record<string, LevelStats> = {
    "niva-1": { enrolled: 0, lessonsCompleted: 0, quizzesPassed: 0, quizzesFailed: 0, examsPassed: 0, examsFailed: 0, certificates: 0 },
    "niva-2": { enrolled: 0, lessonsCompleted: 0, quizzesPassed: 0, quizzesFailed: 0, examsPassed: 0, examsFailed: 0, certificates: 0 },
    "niva-3": { enrolled: 0, lessonsCompleted: 0, quizzesPassed: 0, quizzesFailed: 0, examsPassed: 0, examsFailed: 0, certificates: 0 },
  };

  const enrolledUsers = new Set<string>();

  events.forEach((e) => {
    if (e.event_type === "enrollment") {
      enrolledUsers.add(e.anonymous_id);
    }
    const lvl = e.level_id;
    if (!lvl || !levelStats[lvl]) return;
    const s = levelStats[lvl];
    switch (e.event_type) {
      case "lesson_complete":
        s.lessonsCompleted++;
        break;
      case "module_quiz_pass":
        s.quizzesPassed++;
        break;
      case "module_quiz_fail":
        s.quizzesFailed++;
        break;
      case "exam_pass":
        s.examsPassed++;
        break;
      case "exam_fail":
        s.examsFailed++;
        break;
      case "certificate_earned":
        s.certificates++;
        break;
    }
  });

  // Count unique users per level who completed at least one lesson
  const usersPerLevel: Record<string, Set<string>> = { "niva-1": new Set(), "niva-2": new Set(), "niva-3": new Set() };
  events.forEach((e) => {
    if (e.level_id && usersPerLevel[e.level_id]) {
      usersPerLevel[e.level_id].add(e.anonymous_id);
    }
  });

  // Certificates list
  const certificates: CertificateRow[] = events
    .filter((e) => e.event_type === "certificate_earned" && e.user_name)
    .map((e) => ({
      user_name: e.user_name!,
      level_id: e.level_id ?? "",
      certificate_id: (e.metadata?.certificate_id as string) ?? "",
      earned_date: e.created_at,
    }));

  // Recent activity
  const recentActivity = events.slice(0, 50);

  // Quiz average scores per level
  const quizScores: Record<string, number[]> = { "niva-1": [], "niva-2": [], "niva-3": [] };
  events.forEach((e) => {
    if ((e.event_type === "module_quiz_pass" || e.event_type === "module_quiz_fail") && e.score != null && e.level_id) {
      quizScores[e.level_id]?.push(e.score);
    }
  });

  const totalCerts = certificates.length;
  const totalLessonsCompleted = Object.values(levelStats).reduce((a, s) => a + s.lessonsCompleted, 0);

  // Activity last 7 days
  const now = Date.now();
  const weekAgo = now - 7 * 24 * 60 * 60 * 1000;
  const thisWeek = events.filter((e) => new Date(e.created_at).getTime() > weekAgo).length;

  // --- Export CSV ---
  function exportCSV() {
    const header = "Datum,Typ,Nivå,Namn,Poäng\n";
    const rows = events
      .map((e) => {
        const date = formatDateTime(e.created_at);
        const name = e.user_name ?? "-";
        const score = e.score != null ? `${e.score}%` : "-";
        return `${date},${e.event_type},${e.level_id ?? "-"},${name},${score}`;
      })
      .join("\n");
    const blob = new Blob([header + rows], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `akademin-statistik-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const EVENT_LABELS: Record<string, string> = {
    enrollment: "Registrering",
    lesson_complete: "Lektion klar",
    module_quiz_pass: "Quiz godkänt",
    module_quiz_fail: "Quiz underkänt",
    exam_pass: "Slutprov godkänt",
    exam_fail: "Slutprov underkänt",
    certificate_earned: "Certifikat utfärdat",
  };

  const EVENT_ICONS: Record<string, typeof Award> = {
    enrollment: Users,
    lesson_complete: BookOpen,
    module_quiz_pass: CheckCircle,
    module_quiz_fail: XCircle,
    exam_pass: GraduationCap,
    exam_fail: XCircle,
    certificate_earned: Award,
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p
            className="text-[0.625rem] font-medium uppercase tracking-[0.1em] text-muted-foreground"
            style={monoStyle}
          >
            Analytics
          </p>
          <h1
            className="mt-1 text-[1.75rem] tracking-[-0.04em]"
            style={bodoniStyle}
          >
            AI-akademin
          </h1>
        </div>
        <div className="flex gap-2">
          <button
            onClick={fetchEvents}
            disabled={loading}
            className="flex items-center gap-2 rounded-md border border-border px-3 py-2 text-[0.75rem] font-medium transition-colors hover:bg-muted"
            style={monoStyle}
          >
            {loading ? <Loader2 size={14} className="animate-spin" /> : <RefreshCw size={14} />}
            Uppdatera
          </button>
          <button
            onClick={exportCSV}
            disabled={events.length === 0}
            className="flex items-center gap-2 rounded-md border border-border px-3 py-2 text-[0.75rem] font-medium transition-colors hover:bg-muted disabled:opacity-50"
            style={monoStyle}
          >
            <Download size={14} />
            Exportera CSV
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          Kunde inte hämta data: {error}
        </div>
      )}

      {/* Top-level stat cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          icon={Users}
          label="Unika användare"
          value={uniqueUsers}
          sub={`${enrolledUsers.size} registrerade`}
        />
        <StatCard
          icon={BookOpen}
          label="Lektioner klara"
          value={totalLessonsCompleted}
          sub={`${thisWeek} händelser denna vecka`}
        />
        <StatCard
          icon={Award}
          label="Certifikat"
          value={totalCerts}
          sub={`av ${uniqueUsers || 1} användare`}
        />
        <StatCard
          icon={TrendingUp}
          label="Aktivitet (7 dagar)"
          value={thisWeek}
          sub="händelser"
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-1 rounded-lg border border-border bg-muted/30 p-1">
        {(["overview", "certificates", "activity"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 rounded-md px-3 py-2 text-[0.75rem] font-medium transition-colors ${
              activeTab === tab
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
            style={monoStyle}
          >
            {tab === "overview" ? "Översikt per nivå" : tab === "certificates" ? "Certifikat" : "Aktivitetslogg"}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={24} className="animate-spin text-muted-foreground" />
        </div>
      ) : activeTab === "overview" ? (
        <OverviewTab
          levelStats={levelStats}
          usersPerLevel={usersPerLevel}
          quizScores={quizScores}
        />
      ) : activeTab === "certificates" ? (
        <CertificatesTab certificates={certificates} />
      ) : (
        <ActivityTab events={recentActivity} eventLabels={EVENT_LABELS} eventIcons={EVENT_ICONS} />
      )}
    </div>
  );
}

/* ── Stat Card ── */

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
}: {
  icon: typeof Award;
  label: string;
  value: number;
  sub: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Icon size={14} />
        <span
          className="text-[0.625rem] font-medium uppercase tracking-[0.08em]"
          style={{ fontFamily: "var(--font-geist-mono), monospace" }}
        >
          {label}
        </span>
      </div>
      <p
        className="mt-2 text-[2rem] leading-none tracking-[-0.04em]"
        style={{ fontFamily: "var(--font-bodoni), serif" }}
      >
        {value.toLocaleString("sv-SE")}
      </p>
      <p className="mt-1 text-[0.6875rem] text-muted-foreground">{sub}</p>
    </div>
  );
}

/* ── Overview Tab ── */

function OverviewTab({
  levelStats,
  usersPerLevel,
  quizScores,
}: {
  levelStats: Record<string, LevelStats>;
  usersPerLevel: Record<string, Set<string>>;
  quizScores: Record<string, number[]>;
}) {
  return (
    <div className="space-y-6">
      {(["niva-1", "niva-2", "niva-3"] as const).map((lvl) => {
        const s = levelStats[lvl];
        const users = usersPerLevel[lvl].size;
        const scores = quizScores[lvl];
        const avgScore = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
        const totalQuiz = s.quizzesPassed + s.quizzesFailed;
        const passRate = totalQuiz > 0 ? Math.round((s.quizzesPassed / totalQuiz) * 100) : 0;
        const color = LEVEL_COLORS[lvl];

        return (
          <div key={lvl} className="rounded-xl border border-border bg-card overflow-hidden">
            {/* Level header */}
            <div className="flex items-center gap-3 border-b border-border px-5 py-4">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold"
                style={{ background: `${color}20`, color }}
              >
                {lvl.split("-")[1]}
              </div>
              <div>
                <h3
                  className="text-[1.125rem] tracking-[-0.02em]"
                  style={{ fontFamily: "var(--font-bodoni), serif" }}
                >
                  {LEVEL_LABELS[lvl]}
                </h3>
                <p className="text-[0.6875rem] text-muted-foreground">
                  {users} användare aktiva
                </p>
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-px bg-border sm:grid-cols-3 lg:grid-cols-6">
              <MiniStat icon={BookOpen} label="Lektioner" value={s.lessonsCompleted} />
              <MiniStat icon={CheckCircle} label="Quiz godkända" value={s.quizzesPassed} />
              <MiniStat icon={XCircle} label="Quiz underkända" value={s.quizzesFailed} />
              <MiniStat icon={Target} label="Quiz snittpoäng" value={avgScore} suffix="%" />
              <MiniStat icon={GraduationCap} label="Slutprov godkända" value={s.examsPassed} />
              <MiniStat icon={Award} label="Certifikat" value={s.certificates} />
            </div>

            {/* Progress bar */}
            {totalQuiz > 0 && (
              <div className="px-5 py-3 border-t border-border">
                <div className="flex items-center justify-between text-[0.6875rem] text-muted-foreground mb-1">
                  <span>Quiz godkänt-andel</span>
                  <span className="font-medium text-foreground">{passRate}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${passRate}%`, background: BRAND_GRADIENT }}
                  />
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function MiniStat({
  icon: Icon,
  label,
  value,
  suffix,
}: {
  icon: typeof Award;
  label: string;
  value: number;
  suffix?: string;
}) {
  return (
    <div className="bg-card px-4 py-3">
      <div className="flex items-center gap-1.5 text-muted-foreground">
        <Icon size={12} />
        <span
          className="text-[0.5625rem] font-medium uppercase tracking-[0.06em]"
          style={{ fontFamily: "var(--font-geist-mono), monospace" }}
        >
          {label}
        </span>
      </div>
      <p
        className="mt-1 text-[1.25rem] leading-none tracking-[-0.04em]"
        style={{ fontFamily: "var(--font-bodoni), serif" }}
      >
        {value.toLocaleString("sv-SE")}{suffix ?? ""}
      </p>
    </div>
  );
}

/* ── Certificates Tab ── */

function CertificatesTab({ certificates }: { certificates: CertificateRow[] }) {
  if (certificates.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-card px-6 py-16 text-center">
        <Award size={32} className="mx-auto mb-3 text-muted-foreground/40" />
        <p className="text-sm text-muted-foreground">Inga certifikat utfärdade ännu.</p>
        <p className="mt-1 text-xs text-muted-foreground/60">
          Certifikat visas här när användare klarar slutprov.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/30">
            <th
              className="px-4 py-3 text-left text-[0.625rem] font-medium uppercase tracking-[0.08em] text-muted-foreground"
              style={{ fontFamily: "var(--font-geist-mono), monospace" }}
            >
              Namn
            </th>
            <th
              className="px-4 py-3 text-left text-[0.625rem] font-medium uppercase tracking-[0.08em] text-muted-foreground"
              style={{ fontFamily: "var(--font-geist-mono), monospace" }}
            >
              Nivå
            </th>
            <th
              className="hidden px-4 py-3 text-left text-[0.625rem] font-medium uppercase tracking-[0.08em] text-muted-foreground sm:table-cell"
              style={{ fontFamily: "var(--font-geist-mono), monospace" }}
            >
              Certifikat-ID
            </th>
            <th
              className="px-4 py-3 text-left text-[0.625rem] font-medium uppercase tracking-[0.08em] text-muted-foreground"
              style={{ fontFamily: "var(--font-geist-mono), monospace" }}
            >
              Datum
            </th>
          </tr>
        </thead>
        <tbody>
          {certificates.map((c, i) => (
            <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
              <td className="px-4 py-3 font-medium">{c.user_name}</td>
              <td className="px-4 py-3">
                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium"
                  style={{
                    background: `${LEVEL_COLORS[c.level_id] ?? "#888"}15`,
                    color: LEVEL_COLORS[c.level_id] ?? "#888",
                  }}
                >
                  <Award size={10} />
                  {LEVEL_LABELS[c.level_id]?.split("—")[0]?.trim() ?? c.level_id}
                </span>
              </td>
              <td
                className="hidden px-4 py-3 text-muted-foreground sm:table-cell"
                style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: "0.75rem" }}
              >
                {c.certificate_id}
              </td>
              <td className="px-4 py-3 text-muted-foreground">{formatDate(c.earned_date)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ── Activity Tab ── */

function ActivityTab({
  events,
  eventLabels,
  eventIcons,
}: {
  events: EventRow[];
  eventLabels: Record<string, string>;
  eventIcons: Record<string, typeof Award>;
}) {
  if (events.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-card px-6 py-16 text-center">
        <Clock size={32} className="mx-auto mb-3 text-muted-foreground/40" />
        <p className="text-sm text-muted-foreground">Ingen aktivitet registrerad ännu.</p>
        <p className="mt-1 text-xs text-muted-foreground/60">
          Händelser visas här när användare interagerar med AI-akademin.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="max-h-[600px] overflow-y-auto">
        {events.map((e, i) => {
          const Icon = eventIcons[e.event_type] ?? BarChart3;
          const isSuccess = e.event_type.includes("pass") || e.event_type === "certificate_earned" || e.event_type === "lesson_complete";
          const isFail = e.event_type.includes("fail");

          return (
            <div
              key={e.id ?? i}
              className="flex items-center gap-3 border-b border-border px-4 py-3 last:border-0 hover:bg-muted/20 transition-colors"
            >
              <div
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                  isSuccess
                    ? "bg-emerald-500/10 text-emerald-500"
                    : isFail
                    ? "bg-red-500/10 text-red-500"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                <Icon size={13} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium truncate">
                  {eventLabels[e.event_type] ?? e.event_type}
                  {e.user_name && (
                    <span className="ml-2 text-muted-foreground font-normal">— {e.user_name}</span>
                  )}
                </p>
                <p className="text-[0.6875rem] text-muted-foreground truncate">
                  {e.level_id && <span>{LEVEL_LABELS[e.level_id]?.split("—")[0]?.trim()}</span>}
                  {e.score != null && <span> · {e.score}%</span>}
                  {e.lesson_id && <span> · {e.lesson_id}</span>}
                  {e.module_id && !e.lesson_id && <span> · {e.module_id}</span>}
                </p>
              </div>
              <span
                className="shrink-0 text-[0.6875rem] text-muted-foreground"
                style={{ fontFamily: "var(--font-geist-mono), monospace" }}
              >
                {formatDateTime(e.created_at)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
