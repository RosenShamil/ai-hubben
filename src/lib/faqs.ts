import { supabase } from "@/lib/supabase";

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  sort_order: number;
  created_at: string;
}

export async function fetchFaqs(): Promise<FAQ[]> {
  const { data, error } = await supabase
    .from("faqs")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Failed to fetch FAQs:", error.message);
    return [];
  }

  return data ?? [];
}
