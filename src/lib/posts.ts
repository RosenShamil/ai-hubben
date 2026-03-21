import { supabase } from "@/lib/supabase";

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  cover_image: string | null;
  youtube_url: string | null;
  published: boolean;
  published_at: string | null;
  created_at: string;
}

export async function fetchPublishedPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch published posts:", error.message);
    return [];
  }

  return data ?? [];
}

export async function fetchPostBySlug(slug: string): Promise<Post | null> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (error) {
    return null;
  }

  return data;
}

export async function fetchAllPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch all posts:", error.message);
    return [];
  }

  return data ?? [];
}
