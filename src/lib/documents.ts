import { supabase } from "@/lib/supabase";

export interface Document {
  id: string;
  title: string;
  description: string | null;
  category: "riktlinje" | "policy" | "guide" | "rapport" | "mall" | "video" | "ovrigt";
  file_url: string | null;
  youtube_url: string | null;
  created_at: string;
}

export async function fetchDocuments(): Promise<Document[]> {
  const { data, error } = await supabase
    .from("documents")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch documents:", error.message);
    return [];
  }

  return data ?? [];
}
