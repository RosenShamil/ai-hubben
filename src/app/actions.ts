"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@supabase/supabase-js";

export async function revalidateStats() {
  revalidatePath("/statistik");
}

export async function deleteUserAccount(userId: string) {
  if (!userId) throw new Error("Inget användar-ID angavs");

  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  // Delete user data from all related tables
  const userIdTables = [
    "user_favorites",
    "user_progress",
    "training_registrations",
  ] as const;

  for (const table of userIdTables) {
    const { error } = await supabaseAdmin
      .from(table)
      .delete()
      .eq("user_id", userId);

    if (error) {
      console.error(`Failed to delete from ${table}:`, error.message);
    }
  }

  // profiles uses "id" as the column, not "user_id"
  const { error: profileError } = await supabaseAdmin
    .from("profiles")
    .delete()
    .eq("id", userId);

  if (profileError) {
    console.error("Failed to delete profile:", profileError.message);
  }

  // Delete the auth user via Admin API
  const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(userId);

  if (authError) {
    throw new Error("Kunde inte radera kontot. Försök igen eller kontakta support.");
  }
}

export async function exportUserData(userId: string) {
  if (!userId) throw new Error("Inget användar-ID angavs");

  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  const [profile, progress, favorites, registrations] = await Promise.all([
    supabaseAdmin.from("profiles").select("*").eq("id", userId).single(),
    supabaseAdmin.from("user_progress").select("*").eq("user_id", userId),
    supabaseAdmin.from("user_favorites").select("*").eq("user_id", userId),
    supabaseAdmin.from("training_registrations").select("*").eq("user_id", userId),
  ]);

  return {
    exporterad: new Date().toISOString(),
    profil: profile.data ?? null,
    utbildningsframsteg: progress.data ?? [],
    favoriter: favorites.data ?? [],
    utbildningsanmalningar: registrations.data ?? [],
  };
}
