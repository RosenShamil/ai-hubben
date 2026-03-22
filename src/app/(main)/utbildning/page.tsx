import type { Metadata } from "next";
import {
  fetchUpcomingWorkshops,
  fetchPastTraining,
  fetchResources,
  fetchAllSessions,
} from "@/lib/training-resources";
import { UtbildningPage } from "@/components/utbildning/utbildning-page";
import { PullToRefresh } from "@/components/shared/pull-to-refresh";

export const metadata: Metadata = { title: "Utbildning" };

export const revalidate = 60;

export default async function Page() {
  const [upcomingWorkshops, pastTraining, resources, allSessions] =
    await Promise.all([
      fetchUpcomingWorkshops(),
      fetchPastTraining(),
      fetchResources(),
      fetchAllSessions(),
    ]);

  return (
    <PullToRefresh>
      <UtbildningPage
        upcomingWorkshops={upcomingWorkshops}
        resources={resources}
        pastTraining={pastTraining}
        allSessions={allSessions}
      />
    </PullToRefresh>
  );
}
