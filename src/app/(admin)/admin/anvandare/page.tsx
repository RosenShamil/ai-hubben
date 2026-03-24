"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { supabase } from "@/lib/supabase";
import {
  Search,
  X,
  ChevronDown,
  GraduationCap,
  BookOpen,
  Award,
  Star,
  Flame,
  CheckCircle2,
  Map,
} from "lucide-react";
import type { EducationProgress } from "@/lib/education-progress";
import type { KnowledgeProgress } from "@/lib/knowledge-progress";
import type { AIGuideProfile } from "@/lib/ai-guide-profile";
import { DEPARTMENTS_MAP, ROLE_CATEGORIES_MAP } from "@/lib/ai-guide-data";

interface UserRow {
  id: string;
  full_name: string;
  email: string;
  municipality: string;
  job_title: string;
  created_at: string;
}

interface UserProgress {
  education_progress: EducationProgress | null;
  knowledge_progress: KnowledgeProgress | null;
  ai_guide_profile: AIGuideProfile | null;
  updated_at: string | null;
}

const AVATAR_COLORS = [
  "#c83228", "#fb873f", "#59824f", "#2874d7", "#9b59b6",
  "#e5651a", "#1abc9c", "#2c3e50", "#d4a017", "#27ae60",
];

function nameToColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("sv-SE", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

const monoStyle = { fontFamily: "var(--font-geist-mono), monospace" } as const;
const headingStyle = { fontFamily: "var(--font-bodoni), serif", fontWeight: 400 } as const;

// ---------------------------------------------------------------------------
// Progress detail panel
// ---------------------------------------------------------------------------

function ProgressPanel({
  userId,
  progressCache,
  onLoaded,
}: {
  userId: string;
  progressCache: UserProgress | undefined;
  onLoaded: (userId: string, progress: UserProgress) => void;
}) {
  const [progress, setProgress] = useState<UserProgress | null>(
    progressCache ?? null
  );
  const [loading, setLoading] = useState(!progressCache);

  useEffect(() => {
    if (progressCache) return;

    let cancelled = false;
    async function fetch() {
      const { data } = await supabase
        .from("user_progress")
        .select("education_progress, knowledge_progress, ai_guide_profile, updated_at")
        .eq("user_id", userId)
        .single();

      if (cancelled) return;

      const result: UserProgress = {
        education_progress: (data?.education_progress as EducationProgress) ?? null,
        knowledge_progress: (data?.knowledge_progress as KnowledgeProgress) ?? null,
        ai_guide_profile: (data?.ai_guide_profile as AIGuideProfile) ?? null,
        updated_at: data?.updated_at ?? null,
      };
      setProgress(result);
      setLoading(false);
      onLoaded(userId, result);
    }
    fetch();
    return () => { cancelled = true; };
  }, [userId, progressCache, onLoaded]);

  if (loading) {
    return (
      <div className="px-4 py-6 text-center text-[0.8125rem] text-muted-foreground">
        Laddar framsteg...
      </div>
    );
  }

  const edu = progress?.education_progress;
  const know = progress?.knowledge_progress;
  const guide = progress?.ai_guide_profile;
  const hasAny = edu?.completedLessons?.length || know?.readConcepts?.length || guide?.departmentId;

  if (!hasAny) {
    return (
      <div className="px-4 py-6 text-center text-[0.8125rem] text-muted-foreground">
        Ingen aktivitet registrerad
      </div>
    );
  }

  return (
    <div className="grid gap-4 px-4 py-5 sm:grid-cols-3">
      {/* Akademin */}
      <div className="rounded-md border border-border p-4">
        <div className="flex items-center gap-2 text-[0.8125rem] font-medium">
          <GraduationCap size={14} className="text-muted-foreground" />
          Akademin
        </div>
        {edu?.completedLessons?.length ? (
          <div className="mt-3 space-y-2">
            <StatRow icon={<CheckCircle2 size={12} />} label="Lektioner" value={String(edu.completedLessons.length)} />
            <StatRow icon={<Star size={12} />} label="XP" value={String(edu.xp ?? 0)} />
            <StatRow icon={<Award size={12} />} label="Certifikat" value={String(edu.certificates?.length ?? 0)} />
            <StatRow icon={<Flame size={12} />} label="Basta streak" value={`${edu.longestStreak ?? 0} d`} />
            {edu.badges?.length > 0 && (
              <p className="mt-1 text-[0.6875rem] text-muted-foreground">
                {edu.badges.length} badge{edu.badges.length !== 1 && "s"}
              </p>
            )}
          </div>
        ) : (
          <p className="mt-2 text-[0.75rem] text-muted-foreground">Ej paborjad</p>
        )}
      </div>

      {/* Kunskapsbanken */}
      <div className="rounded-md border border-border p-4">
        <div className="flex items-center gap-2 text-[0.8125rem] font-medium">
          <BookOpen size={14} className="text-muted-foreground" />
          Kunskapsbanken
        </div>
        {know?.readConcepts?.length ? (
          <div className="mt-3 space-y-2">
            <StatRow icon={<BookOpen size={12} />} label="Begrepp" value={`${know.readConcepts.length}/222`} />
            <StatRow icon={<CheckCircle2 size={12} />} label="Larvagarar" value={String(know.completedPaths?.length ?? 0)} />
            <StatRow icon={<Flame size={12} />} label="Streak" value={`${know.streak ?? 0} d`} />
            {/* Mini progress bar */}
            <div className="mt-1">
              <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{ width: `${(know.readConcepts.length / 222) * 100}%` }}
                />
              </div>
              <p className="mt-1 text-[0.625rem] text-muted-foreground" style={monoStyle}>
                {Math.round((know.readConcepts.length / 222) * 100)}%
              </p>
            </div>
          </div>
        ) : (
          <p className="mt-2 text-[0.75rem] text-muted-foreground">Ej paborjad</p>
        )}
      </div>

      {/* AI-resa */}
      <div className="rounded-md border border-border p-4">
        <div className="flex items-center gap-2 text-[0.8125rem] font-medium">
          <Map size={14} className="text-muted-foreground" />
          AI-resa
        </div>
        {guide?.departmentId ? (
          <div className="mt-3 space-y-1.5 text-[0.75rem]">
            <p>
              <span className="text-muted-foreground">Forvaltning: </span>
              {DEPARTMENTS_MAP[guide.departmentId]?.name ?? guide.departmentId}
            </p>
            <p>
              <span className="text-muted-foreground">Roll: </span>
              {ROLE_CATEGORIES_MAP[guide.roleCategory]?.title ?? guide.roleCategory}
            </p>
            <p>
              <span className="text-muted-foreground">Erfarenhet: </span>
              {guide.experienceLevel === "nyborjare"
                ? "Nyborjare"
                : guide.experienceLevel === "lite-erfarenhet"
                  ? "Lite erfarenhet"
                  : "Erfaren"}
            </p>
          </div>
        ) : (
          <p className="mt-2 text-[0.75rem] text-muted-foreground">Ej genomford</p>
        )}
      </div>

      {/* Last active */}
      {progress?.updated_at && (
        <p
          className="text-[0.6875rem] text-muted-foreground sm:col-span-3"
          style={monoStyle}
        >
          Senast synkad: {formatDate(progress.updated_at)}
        </p>
      )}
    </div>
  );
}

function StatRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between text-[0.75rem]">
      <span className="flex items-center gap-1.5 text-muted-foreground">
        {icon} {label}
      </span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [progressCache, setProgressCache] = useState<Record<string, UserProgress>>({});
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

  const fetchUsers = useCallback(async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("id, full_name, email, municipality, job_title, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      showToast("error", "Kunde inte hamta anvandare");
      return;
    }
    setUsers(data ?? []);
    setLoading(false);
  }, [showToast]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleProgressLoaded = useCallback(
    (userId: string, progress: UserProgress) => {
      setProgressCache((prev) => ({ ...prev, [userId]: progress }));
    },
    []
  );

  const filtered = useMemo(() => {
    if (!search.trim()) return users;
    const q = search.toLowerCase();
    return users.filter(
      (u) =>
        u.full_name?.toLowerCase().includes(q) ||
        u.email?.toLowerCase().includes(q) ||
        u.municipality?.toLowerCase().includes(q) ||
        u.job_title?.toLowerCase().includes(q)
    );
  }, [users, search]);

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
            Oversikt
          </p>
          <h1
            className="mt-2 text-[2rem] tracking-[-0.04em]"
            style={headingStyle}
          >
            Anvandare
          </h1>
        </div>
        <p
          className="text-[0.8125rem] text-muted-foreground"
          style={monoStyle}
        >
          {loading ? "..." : `${users.length} registrerade`}
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Sok pa namn, e-post, kommun eller titel..."
          className="w-full rounded-md border border-border bg-background py-2.5 pl-9 pr-9 text-[0.875rem] outline-none transition-colors focus:border-foreground"
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-border bg-card">
        <table className="w-full text-[0.8125rem]">
          <thead>
            <tr className="border-b border-border">
              {["", "Namn", "E-post", "Kommun", "Titel", "Registrerad"].map(
                (h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left font-medium uppercase tracking-[0.1em] text-muted-foreground"
                    style={{
                      ...monoStyle,
                      fontSize: "0.625rem",
                    }}
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
                <td
                  colSpan={6}
                  className="px-4 py-8 text-center text-muted-foreground"
                >
                  Laddar...
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-8 text-center text-muted-foreground"
                >
                  {search
                    ? "Inga anvandare matchar sokningen"
                    : "Inga registrerade anvandare"}
                </td>
              </tr>
            ) : (
              filtered.flatMap((user, i) => {
                const name = user.full_name || "Okand";
                const color = nameToColor(name);
                const initials = getInitials(name);
                const isExpanded = expandedId === user.id;
                const rows = [
                  <tr
                    key={user.id}
                    onClick={() => setExpandedId(isExpanded ? null : user.id)}
                    className={`cursor-pointer border-b border-border transition-colors hover:bg-secondary/50 ${
                      isExpanded ? "bg-secondary/30" : i % 2 === 0 ? "" : "bg-secondary/20"
                    }`}
                  >
                    <td className="px-4 py-3">
                      <div
                        className="flex h-8 w-8 items-center justify-center rounded-full text-[0.625rem] font-semibold text-white"
                        style={{ backgroundColor: color }}
                      >
                        {initials}
                      </div>
                    </td>
                    <td className="px-4 py-3 font-medium">{name}</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {user.email || "\u2014"}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {user.municipality || "\u2014"}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {user.job_title || "\u2014"}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">
                      {user.created_at ? formatDate(user.created_at) : "\u2014"}
                    </td>
                  </tr>,
                ];
                if (isExpanded) {
                  rows.push(
                    <tr key={`${user.id}-progress`} className="border-b border-border last:border-0">
                      <td colSpan={6} className="bg-secondary/10 p-0">
                        <ProgressPanel
                          userId={user.id}
                          progressCache={progressCache[user.id]}
                          onLoaded={handleProgressLoaded}
                        />
                      </td>
                    </tr>
                  );
                }
                return rows;
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Result count when filtering */}
      {search && !loading && (
        <p
          className="mt-3 text-[0.75rem] text-muted-foreground"
          style={monoStyle}
        >
          {filtered.length} av {users.length} anvandare
        </p>
      )}
    </div>
  );
}
