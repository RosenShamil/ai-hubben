import { createClient } from "@supabase/supabase-js";
import { supabase as supabaseClient } from "@/lib/supabase";

const MARKETPLACE_URL = "https://marketplace.intric.ai/api";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export type IntricAssistant = {
  id: string;
  name: string;
  description: string;
  assistant_link: string;
  icon_url: string | null;
  regions: string[];
  organization: string;
  created_at: string;
  source: "marketplace" | "community";
};

export type IntricAssistantDetail = IntricAssistant & {
  prompt: string | null;
  setup_instructions: string | null;
  submitted_by: string | null;
};

export async function fetchAssistants(): Promise<IntricAssistant[]> {
  // Fetch from both sources in parallel
  const [marketplaceResult, supabaseResult] = await Promise.allSettled([
    fetchMarketplaceAssistants(),
    fetchSupabaseAssistants(),
  ]);

  const marketplace =
    marketplaceResult.status === "fulfilled" ? marketplaceResult.value : [];
  const community =
    supabaseResult.status === "fulfilled" ? supabaseResult.value : [];

  return [...marketplace, ...community];
}

// Swedish organizations to include from Intric Marketplace
const ALLOWED_ORGS = new Set([
  "katrineholms kommun",
  "intric ab",
  "intric ai",
  "gävle kommun",
  "lidköpings kommun",
  "mönsterås kommun",
  "trollhättans stad",
  "ab svenska bostäder",
  "atherfold consulting ab",
  "kundtjänst",
]);

// Non-Swedish assistants to exclude (German descriptions despite Swedish org)
const EXCLUDED_IDS = new Set([
  "b0dde2a3-31c1-45e4-8518-2f4608e4fa9d", // Offboarding Assistent (Intric AI, German)
  "dfdf10f5-34ed-4ab3-9420-a73d8bbb6c86", // IT Scanner (Intric AB, German)
]);

async function fetchMarketplaceAssistants(): Promise<IntricAssistant[]> {
  const res = await fetch(`${MARKETPLACE_URL}/assistants`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) throw new Error("Failed to fetch marketplace assistants");

  const data = await res.json();

  return data
    .filter(
      (a: { id: string; organization: string }) =>
        ALLOWED_ORGS.has(a.organization.toLowerCase().trim()) &&
        !EXCLUDED_IDS.has(a.id)
    )
    .map((a: IntricAssistant) => ({ ...a, source: "marketplace" as const }));
}

async function fetchSupabaseAssistants(): Promise<IntricAssistant[]> {
  const { data, error } = await supabase
    .from("assistants")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return (data || []).map((a) => ({
    id: a.id,
    name: a.name,
    description: a.description || "",
    assistant_link: a.assistant_link,
    icon_url: null,
    regions: a.regions || ["sweden"],
    organization: a.organization,
    created_at: a.created_at,
    source: "community" as const,
  }));
}

export async function fetchFeaturedAssistants(): Promise<IntricAssistant[]> {
  const { data: featuredRows, error } = await supabaseClient
    .from("featured_assistants")
    .select("assistant_id, sort_order")
    .order("sort_order", { ascending: true });

  if (error || !featuredRows || featuredRows.length === 0) return [];

  const allAssistants = await fetchAssistants();

  const featuredMap = new Map(
    featuredRows.map((row) => [row.assistant_id, row.sort_order as number])
  );

  return allAssistants
    .filter((a) => featuredMap.has(a.id))
    .sort((a, b) => (featuredMap.get(a.id) ?? 0) - (featuredMap.get(b.id) ?? 0));
}

export async function fetchAssistant(
  id: string
): Promise<IntricAssistantDetail> {
  // Try marketplace first, then Supabase
  try {
    const res = await fetch(`${MARKETPLACE_URL}/assistants/${id}`, {
      next: { revalidate: 300 },
    });
    if (res.ok) {
      const data = await res.json();
      return { ...data, source: "marketplace" };
    }
  } catch {
    // Fall through to Supabase
  }

  // Try Supabase
  const { data, error } = await supabase
    .from("assistants")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) throw new Error("Assistant not found");

  return {
    id: data.id,
    name: data.name,
    description: data.description || "",
    assistant_link: data.assistant_link,
    icon_url: null,
    regions: data.regions || ["sweden"],
    organization: data.organization,
    created_at: data.created_at,
    source: "community",
    prompt: data.prompt,
    setup_instructions: data.setup_instructions,
    submitted_by: data.submitted_by,
  };
}
