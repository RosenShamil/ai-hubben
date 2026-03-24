import type { Metadata } from "next";
import { StatsDashboard } from "@/components/statistik/stats-dashboard";
import { fetchTrainingStats } from "@/lib/training-data";
import { fetchAllStats } from "@/lib/stats-data";

export const metadata: Metadata = {
  title: "Statistik — AI-hubben",
  description:
    "Användningsdata, trender och insikter kring Katrineholms kommuns AI-verktyg och utbildningsinsatser.",
};

export const revalidate = 60;

export default async function StatistikPage() {
  const [trainingStats, allStats] = await Promise.all([
    fetchTrainingStats(),
    fetchAllStats(),
  ]);

  return (
    <StatsDashboard
      trainingStats={trainingStats}
      keyMetrics={allStats.keyMetrics}
      dailyInteractions={allStats.dailyInteractions}
      topAssistants={allStats.topAssistants}
      modelUsage={allStats.modelUsage}
      assistantSplit={allStats.assistantSplit}
      fileUploads={allStats.fileUploads}
      yearComparison={allStats.yearComparison}
      userRoles={allStats.userRoles}
      platformOverview={allStats.platformOverview}
    />
  );
}
