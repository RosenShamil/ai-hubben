import type { Metadata } from "next";
import { StatsDashboard } from "@/components/statistik/stats-dashboard";
import { fetchTrainingStats } from "@/lib/training-data";

export const metadata: Metadata = {
  title: "Statistik — AI-hubben",
  description:
    "Användningsdata, trender och insikter kring Katrineholms kommuns AI-verktyg och utbildningsinsatser.",
};

export const revalidate = 300; // Refresh every 5 min

export default async function StatistikPage() {
  const trainingStats = await fetchTrainingStats();

  return <StatsDashboard trainingStats={trainingStats} />;
}
