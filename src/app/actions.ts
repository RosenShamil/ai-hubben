"use server";

import { revalidatePath } from "next/cache";

export async function revalidateStats() {
  revalidatePath("/statistik");
}
