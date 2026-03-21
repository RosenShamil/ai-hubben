import type { Metadata } from "next";
import {
  fetchUpcomingWorkshops,
  fetchPastTraining,
  fetchResources,
  fetchAllSessions,
} from "@/lib/training-resources";
import { UtbildningPage } from "@/components/utbildning/utbildning-page";

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
    <UtbildningPage
      upcomingWorkshops={upcomingWorkshops}
      resources={resources}
      pastTraining={pastTraining}
      allSessions={allSessions}
    />
  );
}
