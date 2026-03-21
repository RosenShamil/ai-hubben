import type { Metadata } from "next";
import { StatsDashboard } from "@/components/statistik/stats-dashboard";

export const metadata: Metadata = {
  title: "Statistik — AI-hubben",
  description:
    "Användningsdata, trender och insikter kring Katrineholms kommuns AI-verktyg och utbildningsinsatser.",
};

export default function StatistikPage() {
  return <StatsDashboard />;
}
