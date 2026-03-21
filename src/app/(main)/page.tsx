import type { Metadata } from "next";
import { fetchKeyMetrics } from "@/lib/stats-data";
import { fetchFeaturedAssistants } from "@/lib/intric";
import { fetchPublishedPosts } from "@/lib/posts";
import { fetchHomeTexts } from "@/lib/home-content-data";
import { HomeContent } from "./home-content";

export const metadata: Metadata = {
  title: "AI-hubben — Katrineholms kommun",
  description: "Kommunens centrala plattform för AI-assistenter, statistik, utbildning och resurser.",
};

export const revalidate = 300;

export default async function Home() {
  const [assistants, posts, keyMetrics, homeTexts] = await Promise.all([
    fetchFeaturedAssistants().catch(() => []),
    fetchPublishedPosts().catch(() => []),
    fetchKeyMetrics().catch(() => null),
    fetchHomeTexts().catch(() => ({})),
  ]);

  const stats = keyMetrics ? keyMetrics["all"] : [];
  const latestPosts = posts.slice(0, 3);

  return (
    <HomeContent
      stats={stats}
      assistants={assistants}
      posts={latestPosts}
      homeTexts={homeTexts}
    />
  );
}
