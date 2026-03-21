import { supabase } from "@/lib/supabase";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string | null;
  image_url: string | null;
  sort_order: number;
  created_at: string;
}

export async function fetchTeamMembers(): Promise<TeamMember[]> {
  const { data, error } = await supabase
    .from("team_members")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Failed to fetch team members:", error.message);
    return [];
  }
  return data ?? [];
}

export async function fetchSiteContent(key: string): Promise<string> {
  const { data, error } = await supabase
    .from("site_content")
    .select("value")
    .eq("key", key)
    .single();

  if (error) {
    console.error(`Failed to fetch site_content[${key}]:`, error.message);
    return "";
  }
  return data?.value ?? "";
}
