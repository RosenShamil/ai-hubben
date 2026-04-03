// ── Intric Stats API helpers ──
// Fetches data from Intric Insights API for automated statistics sync.

const INTRIC_BASE_URL = "https://api.katrineholm.intric.ai";

function getApiKey(): string {
  const key = process.env.INTRIC_API_KEY;
  if (!key) throw new Error("INTRIC_API_KEY is not configured");
  return key;
}

function headers(): HeadersInit {
  return { "api-key": getApiKey() };
}

// ── Types ──

interface OverviewMetrics {
  total_questions: number;
  total_active_users: number;
  total_assistants: number;
  total_active_assistants: number;
  avg_question_per_user: number;
}

interface TimeSeriesPoint {
  date: string;
  total_questions: number;
}

interface AssistantRow {
  assistant_id: string;
  assistant_name: string;
  space_name: string;
  question_count: number;
  user_count: number;
}

interface TokenModel {
  model_name: string;
  request_count: number;
  total_input_tokens: number;
  total_output_tokens: number;
  total_cost: number;
}

interface UserEngagement {
  total_users: number;
  active_users: number;
  activation_rate: number;
}

interface AuditTrailRow {
  eventType: string;
  metadata: Record<string, unknown>;
}

// ── Fetch functions ──

export async function fetchOverviewMetrics(
  startDate: string,
  endDate: string
): Promise<OverviewMetrics> {
  const url = `${INTRIC_BASE_URL}/api/v1/insights/overview-metrics?start_date=${startDate}&end_date=${endDate}`;
  const res = await fetch(url, { headers: headers(), cache: "no-store" });
  if (!res.ok) throw new Error(`overview-metrics failed: ${res.status}`);
  return res.json();
}

export async function fetchTimeSeries(
  startDate: string,
  endDate: string
): Promise<TimeSeriesPoint[]> {
  const url = `${INTRIC_BASE_URL}/api/v1/insights/time-series-metrics?start_date=${startDate}&end_date=${endDate}`;
  const res = await fetch(url, { headers: headers(), cache: "no-store" });
  if (!res.ok) throw new Error(`time-series-metrics failed: ${res.status}`);
  const data = await res.json();
  return data.data_points ?? [];
}

export async function fetchAssistantTable(
  startDate: string,
  endDate: string
): Promise<AssistantRow[]> {
  const url = `${INTRIC_BASE_URL}/api/v1/insights/assistant-table?start_date=${startDate}&end_date=${endDate}`;
  const res = await fetch(url, { headers: headers(), cache: "no-store" });
  if (!res.ok) throw new Error(`assistant-table failed: ${res.status}`);
  const data = await res.json();
  return data.rows ?? [];
}

export async function fetchTokenUsage(
  startDate: string,
  endDate: string
): Promise<TokenModel[]> {
  const url = `${INTRIC_BASE_URL}/api/v1/token-usage/?start_date=${startDate}&end_date=${endDate}`;
  const res = await fetch(url, { headers: headers(), cache: "no-store" });
  if (!res.ok) throw new Error(`token-usage failed: ${res.status}`);
  const data = await res.json();
  return data.models ?? [];
}

export async function fetchUserEngagement(
  startDate: string,
  endDate: string
): Promise<UserEngagement> {
  const url = `${INTRIC_BASE_URL}/api/v1/insights/user-engagement?start_date=${startDate}&end_date=${endDate}`;
  const res = await fetch(url, { headers: headers(), cache: "no-store" });
  if (!res.ok) throw new Error(`user-engagement failed: ${res.status}`);
  return res.json();
}

export async function fetchActivityHeatmap(
  startDate: string,
  endDate: string
): Promise<number[][]> {
  const url = `${INTRIC_BASE_URL}/api/v1/insights/activity-heatmap?start_date=${startDate}&end_date=${endDate}`;
  const res = await fetch(url, { headers: headers(), cache: "no-store" });
  if (!res.ok) throw new Error(`activity-heatmap failed: ${res.status}`);
  const data = await res.json();
  return data.activity_matrix ?? [];
}

/**
 * Parse audit trail CSV text into structured rows.
 */
export function parseAuditTrail(csv: string): AuditTrailRow[] {
  const lines = csv.split("\n").filter((line) => line.trim().length > 0);
  if (lines.length <= 1) return [];

  const rows: AuditTrailRow[] = [];
  for (let i = 1; i < lines.length; i++) {
    // CSV fields may contain JSON with commas, so we parse carefully
    const match = lines[i].match(
      /^[^,]+,[^,]+,[^,]+,([^,]+),"(\{.*?\})",.*/
    );
    if (match) {
      try {
        rows.push({
          eventType: match[1],
          metadata: JSON.parse(match[2].replace(/""/g, '"')),
        });
      } catch {
        rows.push({ eventType: match[1], metadata: {} });
      }
    } else {
      const parts = lines[i].split(",");
      if (parts[3]) {
        rows.push({ eventType: parts[3], metadata: {} });
      }
    }
  }
  return rows;
}

/**
 * Fetch and parse all audit trail events for a date range.
 */
export async function fetchAuditTrail(
  startDate: string,
  endDate: string
): Promise<AuditTrailRow[]> {
  const csv = await fetchAuditTrailCsv(startDate, endDate);
  return parseAuditTrail(csv);
}

/**
 * Count total interactions (all audit-trail events) for a date range.
 */
export function countInteractions(rows: AuditTrailRow[]): number {
  return rows.length;
}

/**
 * Count interactions per day from audit trail rows.
 * Requires the raw CSV to extract dates.
 */
export function countInteractionsPerDay(
  csv: string
): { date: string; count: number }[] {
  const lines = csv.split("\n");
  if (lines.length <= 1) return [];

  const dayCounts: Record<string, number> = {};
  // Match ISO date pattern in the "Created At" column (2nd field)
  const datePattern = /^\d{4}-\d{2}-\d{2}/;
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;
    // Find the first comma, then extract the date from the 2nd field
    const firstComma = line.indexOf(",");
    if (firstComma === -1) continue;
    const afterFirst = line.slice(firstComma + 1);
    const match = afterFirst.match(datePattern);
    if (match) {
      dayCounts[match[0]] = (dayCounts[match[0]] ?? 0) + 1;
    }
  }

  return Object.entries(dayCounts)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, count]) => ({ date, count }));
}

/**
 * Fetch raw audit trail CSV for a date range.
 */
export async function fetchAuditTrailCsv(
  startDate: string,
  endDate: string
): Promise<string> {
  const url = `${INTRIC_BASE_URL}/api/v1/events/audit-trail/export/?start_date=${startDate}&end_date=${endDate}`;
  const res = await fetch(url, { headers: headers(), cache: "no-store" });
  if (!res.ok) throw new Error(`audit-trail export failed: ${res.status}`);
  return res.text();
}

/**
 * Count personal vs custom assistant interactions from audit trail.
 */
export function countAssistantSplit(
  rows: AuditTrailRow[]
): { personal: number; custom: number } {
  let personal = 0;
  let custom = 0;
  for (const row of rows) {
    if (row.eventType === "ASSISTANT_ASK") {
      if (row.metadata.is_personal_assistant) {
        personal++;
      } else {
        custom++;
      }
    }
  }
  return { personal, custom };
}

/**
 * Count file uploads by type from audit trail.
 */
export function countFileUploads(
  rows: AuditTrailRow[]
): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const row of rows) {
    if (row.eventType === "FILE_UPLOAD") {
      const mime = (row.metadata.mimetype as string) ?? "unknown";
      const friendly = mimeToFriendly(mime);
      counts[friendly] = (counts[friendly] ?? 0) + 1;
    }
  }
  return counts;
}

function mimeToFriendly(mime: string): string {
  if (mime.includes("pdf")) return "PDF";
  if (mime.includes("wordprocessing")) return "Word";
  if (mime.includes("spreadsheet") || mime.includes("ms-excel")) return "Excel";
  if (mime.includes("presentation")) return "PPT";
  if (mime.includes("png")) return "PNG";
  if (mime.includes("jpeg") || mime.includes("jpg")) return "JPEG";
  if (mime.includes("audio")) return "Audio";
  if (mime.includes("video")) return "Video";
  if (mime.includes("text/plain") || mime.includes("text/csv") || mime.includes("text/markdown")) return "Text";
  return "Övrigt";
}

/**
 * Map model names to display-friendly names.
 */
export function formatModelName(name: string): string {
  const map: Record<string, string> = {
    "gpt-4.1": "GPT-4.1",
    "gpt-4.1-mini": "GPT-4.1 mini",
    "gpt-5.3-chat-latest": "GPT-5.3",
    "gpt-5.2": "GPT-5.2",
    "gpt-5-mini": "GPT-5 mini",
    "gpt-oss-120b": "GPT-oss-120b",
    "claude-sonnet-4-5": "Claude Sonnet 4.5",
    "claude-sonnet-4-6": "Claude Sonnet 4.6",
    "claude-haiku-4-5": "Claude Haiku 4.5",
  };
  return map[name] ?? name;
}

/**
 * Format a date string like "3 feb" in Swedish.
 */
export function formatSwedishDate(isoDate: string): string {
  const months = [
    "jan", "feb", "mar", "apr", "maj", "jun",
    "jul", "aug", "sep", "okt", "nov", "dec",
  ];
  // Parse "2026-01-15" or "2026-01-15T00:00:00Z" manually to avoid timezone issues
  const parts = isoDate.split("-");
  const month = parseInt(parts[1], 10) - 1;
  const day = parseInt(parts[2], 10);
  return `${day} ${months[month]}`;
}

/**
 * Format a number with Swedish locale (space as thousands separator).
 */
export function formatSwedishNumber(n: number): string {
  return n.toLocaleString("sv-SE").replace(/,/g, "\u00a0");
}
