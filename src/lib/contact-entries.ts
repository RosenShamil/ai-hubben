import { supabase } from "@/lib/supabase";

export interface ContactEntry {
  id: string;
  label: string;
  title: string;
  description: string | null;
  email: string | null;
  phone: string | null;
  is_highlighted: boolean;
  sort_order: number;
  created_at: string;
}

export async function fetchContactEntries(): Promise<ContactEntry[]> {
  const { data, error } = await supabase
    .from("contact_entries")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Failed to fetch contact entries:", error.message);
    return [];
  }
  return data ?? [];
}
