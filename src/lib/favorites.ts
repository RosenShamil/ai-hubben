import { supabase } from "./supabase";

export type FavoriteItemType = "assistant" | "course" | "lesson";

export interface Favorite {
  id: string;
  user_id: string;
  item_type: FavoriteItemType;
  item_id: string;
  created_at: string;
}

export async function getFavorites(
  userId: string,
  itemType?: FavoriteItemType
): Promise<Favorite[]> {
  let query = supabase
    .from("user_favorites")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (itemType) {
    query = query.eq("item_type", itemType);
  }

  const { data, error } = await query;
  if (error || !data) return [];
  return data as Favorite[];
}

export async function addFavorite(
  userId: string,
  itemType: FavoriteItemType,
  itemId: string
): Promise<void> {
  const { error } = await supabase
    .from("user_favorites")
    .insert({ user_id: userId, item_type: itemType, item_id: itemId });

  if (error) throw error;
}

export async function removeFavorite(
  userId: string,
  itemType: FavoriteItemType,
  itemId: string
): Promise<void> {
  const { error } = await supabase
    .from("user_favorites")
    .delete()
    .eq("user_id", userId)
    .eq("item_type", itemType)
    .eq("item_id", itemId);

  if (error) throw error;
}

export async function isFavorite(
  userId: string,
  itemType: FavoriteItemType,
  itemId: string
): Promise<boolean> {
  const { data, error } = await supabase
    .from("user_favorites")
    .select("id")
    .eq("user_id", userId)
    .eq("item_type", itemType)
    .eq("item_id", itemId)
    .single();

  if (error || !data) return false;
  return true;
}
