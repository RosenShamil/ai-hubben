import { supabase } from "@/lib/supabase";

export interface HomeTexts {
  home_label?: string;
  home_heading_1?: string;
  home_heading_2?: string;
  home_subtitle?: string;
  home_cta_primary?: string;
  home_cta_secondary?: string;
  home_upload_heading?: string;
  home_upload_text?: string;
}

const HOME_KEYS = [
  "home_label",
  "home_heading_1",
  "home_heading_2",
  "home_subtitle",
  "home_cta_primary",
  "home_cta_secondary",
  "home_upload_heading",
  "home_upload_text",
];

export async function fetchHomeTexts(): Promise<HomeTexts> {
  try {
    const { data, error } = await supabase
      .from("site_content")
      .select("key, value")
      .in("key", HOME_KEYS);

    if (error || !data) return {};

    const result: Record<string, string> = {};
    for (const row of data) {
      result[row.key] = row.value;
    }
    return result as HomeTexts;
  } catch {
    return {};
  }
}
