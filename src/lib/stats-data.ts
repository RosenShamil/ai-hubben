// ── Stats Data (placeholder + CSV-derived) ──

import { supabase } from "@/lib/supabase";

export type Period = "2025" | "2026" | "all";

export interface KeyMetric {
  label: string;
  value: number;
  formatted: string;
  change: number; // percentage change
  changeLabel: string;
}

export interface DailyInteraction {
  date: string;
  interactions: number;
}

export interface AssistantUsage {
  name: string;
  messages: number;
}

export interface ModelUsage {
  name: string;
  value: number;
}

export interface FileUpload {
  type: string;
  count: number;
}

export interface YearComparison {
  category: string;
  "2025": number;
  "2026": number;
}

export interface TrainingMetric {
  label: string;
  value: number;
  formatted: string;
}

export interface DepartmentTraining {
  name: string;
  trained: number;
}

export interface RoleTraining {
  name: string;
  trained: number;
}

export interface UserRoles {
  name: string;
  value: number;
}

export interface PlatformOverview {
  registeredUsers: number;
  activeUsers: number;
  spaces: number;
  totalAssistants: number;
}

// ── All stats data interface ──

export interface AllStatsData {
  keyMetrics: Record<Period, KeyMetric[]>;
  dailyInteractions: DailyInteraction[];
  topAssistants: Record<Period, AssistantUsage[]>;
  modelUsage: Record<Period, ModelUsage[]>;
  assistantSplit: Record<Period, ModelUsage[]>;
  fileUploads: Record<Period, FileUpload[]>;
  yearComparison: YearComparison[];
  userRoles: Record<Period, UserRoles[]>;
  platformOverview: PlatformOverview;
}

// ── Default / fallback data ──

const DEFAULT_KEY_METRICS: Record<Period, KeyMetric[]> = {
  "2026": [
    { label: "Interaktioner", value: 6973, formatted: "6 973", change: 142, changeLabel: "vs 2025" },
    { label: "Aktiva användare", value: 257, formatted: "257", change: 85, changeLabel: "vs 2025" },
    { label: "Skapade assistenter", value: 190, formatted: "190", change: 58, changeLabel: "vs 2025" },
    { label: "Utbildade", value: 340, formatted: "340", change: 113, changeLabel: "vs 2025" },
  ],
  "2025": [
    { label: "Interaktioner", value: 2881, formatted: "2 881", change: 0, changeLabel: "" },
    { label: "Aktiva användare", value: 139, formatted: "139", change: 0, changeLabel: "" },
    { label: "Skapade assistenter", value: 120, formatted: "120", change: 0, changeLabel: "" },
    { label: "Utbildade", value: 160, formatted: "160", change: 0, changeLabel: "" },
  ],
  all: [
    { label: "Interaktioner", value: 9854, formatted: "9 854", change: 142, changeLabel: "2026 vs 2025" },
    { label: "Aktiva användare", value: 257, formatted: "257", change: 85, changeLabel: "2026 vs 2025" },
    { label: "Skapade assistenter", value: 190, formatted: "190", change: 58, changeLabel: "2026 vs 2025" },
    { label: "Utbildade", value: 500, formatted: "500", change: 113, changeLabel: "totalt" },
  ],
};

const DEFAULT_DAILY_INTERACTIONS: DailyInteraction[] = [
  { date: "3 feb", interactions: 145 },
  { date: "4 feb", interactions: 189 },
  { date: "5 feb", interactions: 212 },
  { date: "6 feb", interactions: 198 },
  { date: "7 feb", interactions: 167 },
  { date: "10 feb", interactions: 234 },
  { date: "11 feb", interactions: 256 },
  { date: "12 feb", interactions: 278 },
  { date: "13 feb", interactions: 245 },
  { date: "14 feb", interactions: 201 },
  { date: "17 feb", interactions: 289 },
  { date: "18 feb", interactions: 312 },
  { date: "19 feb", interactions: 298 },
  { date: "20 feb", interactions: 267 },
  { date: "21 feb", interactions: 223 },
  { date: "24 feb", interactions: 334 },
  { date: "25 feb", interactions: 356 },
  { date: "26 feb", interactions: 321 },
  { date: "27 feb", interactions: 289 },
  { date: "28 feb", interactions: 245 },
  { date: "3 mar", interactions: 378 },
  { date: "4 mar", interactions: 401 },
  { date: "5 mar", interactions: 389 },
  { date: "6 mar", interactions: 356 },
  { date: "7 mar", interactions: 312 },
  { date: "10 mar", interactions: 423 },
  { date: "11 mar", interactions: 445 },
  { date: "12 mar", interactions: 412 },
  { date: "13 mar", interactions: 389 },
  { date: "14 mar", interactions: 345 },
];

const DEFAULT_TOP_ASSISTANTS: AssistantUsage[] = [
  { name: "Intric", messages: 3759 },
  { name: "Promptexperten", messages: 460 },
  { name: "Konteringsassistenten", messages: 227 },
  { name: "iKAI", messages: 191 },
  { name: "Avtalskollen", messages: 178 },
  { name: "HR-assistenten", messages: 156 },
  { name: "Mötessammanfattare", messages: 134 },
  { name: "Ärendehanterare", messages: 112 },
  { name: "Beslutsstöd", messages: 98 },
  { name: "Kommunikatören", messages: 87 },
];

const DEFAULT_MODEL_USAGE: ModelUsage[] = [
  { name: "GPT-5.3", value: 1745 },
  { name: "GPT-4.1", value: 1455 },
  { name: "GPT-oss-120b", value: 1433 },
  { name: "Claude Sonnet 4.5", value: 975 },
  { name: "Claude Sonnet 4.6", value: 790 },
  { name: "Övriga", value: 575 },
];

const DEFAULT_ASSISTANT_SPLIT: ModelUsage[] = [
  { name: "Personliga", value: 3759 },
  { name: "Anpassade", value: 3214 },
];

const DEFAULT_FILE_UPLOADS: FileUpload[] = [
  { type: "PDF", count: 1853 },
  { type: "Word", count: 498 },
  { type: "PNG", count: 154 },
  { type: "Excel", count: 94 },
  { type: "PPT", count: 54 },
  { type: "JPEG", count: 45 },
  { type: "Audio", count: 31 },
];

const DEFAULT_YEAR_COMPARISON: YearComparison[] = [
  { category: "Användare", "2025": 139, "2026": 257 },
  { category: "Interaktioner", "2025": 2881, "2026": 6973 },
  { category: "Assistenter", "2025": 120, "2026": 190 },
  { category: "Utbildade", "2025": 160, "2026": 340 },
];

// ── Training data (kept for backward compat, handled by training-data.ts) ──

export const TRAINING_METRICS: TrainingMetric[] = [
  { label: "Workshops", value: 12, formatted: "12" },
  { label: "Individuella sessioner", value: 28, formatted: "28" },
  { label: "Totalt utbildade", value: 340, formatted: "340" },
];

export const DEPARTMENT_TRAINING: DepartmentTraining[] = [
  { name: "Kommunledningsförvaltningen", trained: 82 },
  { name: "Bildningsförvaltningen", trained: 74 },
  { name: "Samhällsbyggnadsförvaltningen", trained: 61 },
  { name: "Social- och omsorgsförvaltningen", trained: 123 },
];

export const ROLE_TRAINING: RoleTraining[] = [
  { name: "Förvaltningschefer", trained: 18 },
  { name: "Chefer", trained: 45 },
  { name: "Rektorer", trained: 32 },
  { name: "Lärare", trained: 67 },
  { name: "Pedagoger", trained: 54 },
  { name: "Sjuksköterskor", trained: 42 },
  { name: "Administratörer", trained: 82 },
];

const DEFAULT_USER_ROLES: UserRoles[] = [
  { name: "Creator", value: 158 },
  { name: "User", value: 186 },
  { name: "Admin", value: 7 },
];

const DEFAULT_PLATFORM_OVERVIEW: PlatformOverview = {
  registeredUsers: 351,
  activeUsers: 332,
  spaces: 257,
  totalAssistants: 394,
};

// ── Chart colors (brand palette) ──

export const CHART_COLORS = [
  "#c83228", // red
  "#e5651a", // orange
  "#f5a623", // yellow
  "#27ae60", // green
  "#3498db", // blue
  "#9b59b6", // purple
  "#e74c3c", // light red
  "#1abc9c", // teal
];

// ── Backwards-compatible static exports (for any legacy usage) ──

export const KEY_METRICS = DEFAULT_KEY_METRICS;
export const DAILY_INTERACTIONS = DEFAULT_DAILY_INTERACTIONS;
export const TOP_ASSISTANTS = DEFAULT_TOP_ASSISTANTS;
export const MODEL_USAGE = DEFAULT_MODEL_USAGE;
export const ASSISTANT_SPLIT = DEFAULT_ASSISTANT_SPLIT;
export const FILE_UPLOADS = DEFAULT_FILE_UPLOADS;
export const YEAR_COMPARISON = DEFAULT_YEAR_COMPARISON;

// ── Fetch helpers (DB with fallback) ──

async function fetchStatsValue<T>(key: string, fallback: T): Promise<T> {
  try {
    const { data, error } = await supabase
      .from("stats_data")
      .select("value")
      .eq("key", key)
      .single();

    if (error || !data) return fallback;
    return data.value as T;
  } catch {
    return fallback;
  }
}

export async function fetchKeyMetrics(): Promise<Record<Period, KeyMetric[]>> {
  const [m2025, m2026, mAll] = await Promise.all([
    fetchStatsValue<KeyMetric[]>("key_metrics_2025", DEFAULT_KEY_METRICS["2025"]),
    fetchStatsValue<KeyMetric[]>("key_metrics_2026", DEFAULT_KEY_METRICS["2026"]),
    fetchStatsValue<KeyMetric[]>("key_metrics_all", DEFAULT_KEY_METRICS["all"]),
  ]);
  return { "2025": m2025, "2026": m2026, all: mAll };
}

export async function fetchDailyInteractions(): Promise<DailyInteraction[]> {
  return fetchStatsValue("daily_interactions", DEFAULT_DAILY_INTERACTIONS);
}

async function fetchPerPeriod<T>(base: string, fallback: T): Promise<Record<Period, T>> {
  const [d2025, d2026, dAll] = await Promise.all([
    fetchStatsValue<T>(`${base}_2025`, fallback),
    fetchStatsValue<T>(`${base}_2026`, fallback),
    fetchStatsValue<T>(`${base}_all`, fallback),
  ]);
  return { "2025": d2025, "2026": d2026, all: dAll };
}

export async function fetchTopAssistants(): Promise<Record<Period, AssistantUsage[]>> {
  return fetchPerPeriod("top_assistants", DEFAULT_TOP_ASSISTANTS);
}

export async function fetchModelUsage(): Promise<Record<Period, ModelUsage[]>> {
  return fetchPerPeriod("model_usage", DEFAULT_MODEL_USAGE);
}

export async function fetchAssistantSplit(): Promise<Record<Period, ModelUsage[]>> {
  return fetchPerPeriod("assistant_split", DEFAULT_ASSISTANT_SPLIT);
}

export async function fetchFileUploads(): Promise<Record<Period, FileUpload[]>> {
  return fetchPerPeriod("file_uploads", DEFAULT_FILE_UPLOADS);
}

export async function fetchYearComparison(): Promise<YearComparison[]> {
  return fetchStatsValue("year_comparison", DEFAULT_YEAR_COMPARISON);
}

export async function fetchUserRoles(): Promise<Record<Period, UserRoles[]>> {
  return fetchPerPeriod("user_roles", DEFAULT_USER_ROLES);
}

export async function fetchPlatformOverview(): Promise<PlatformOverview> {
  return fetchStatsValue("platform_overview", DEFAULT_PLATFORM_OVERVIEW);
}

export async function fetchAllStats(): Promise<AllStatsData> {
  const [keyMetrics, dailyInteractions, topAssistants, modelUsage, assistantSplit, fileUploads, yearComparison, userRoles, platformOverview] =
    await Promise.all([
      fetchKeyMetrics(),
      fetchDailyInteractions(),
      fetchTopAssistants(),
      fetchModelUsage(),
      fetchAssistantSplit(),
      fetchFileUploads(),
      fetchYearComparison(),
      fetchUserRoles(),
      fetchPlatformOverview(),
    ]);

  return {
    keyMetrics,
    dailyInteractions,
    topAssistants,
    modelUsage,
    assistantSplit,
    fileUploads,
    yearComparison,
    userRoles,
    platformOverview,
  };
}
