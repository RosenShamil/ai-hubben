import type { Metadata } from "next";
import { Suspense } from "react";
import {
  fetchPastTraining,
  fetchAllSessions,
} from "@/lib/training-resources";
import { UtbildningTabs } from "@/components/utbildning/utbildning-tabs";

export const metadata: Metadata = { title: "Utbildning" };

export const revalidate = 60;

export default async function Page() {
  const [pastTraining, allSessions] = await Promise.all([
    fetchPastTraining(),
    fetchAllSessions(),
  ]);

  return (
    <Suspense>
      <UtbildningTabs
        allSessions={allSessions}
        pastTraining={pastTraining}
      />
    </Suspense>
  );
}
