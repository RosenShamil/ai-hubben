import type { Metadata } from "next";
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
  const [assistants, posts, homeTexts] = await Promise.all([
    fetchFeaturedAssistants().catch(() => []),
    fetchPublishedPosts().catch(() => []),
    fetchHomeTexts().catch(() => ({})),
  ]);

  const latestPosts = posts.slice(0, 3);

  return (
    <HomeContent
      assistants={assistants}
      posts={latestPosts}
      homeTexts={homeTexts}
    />
  );
}
