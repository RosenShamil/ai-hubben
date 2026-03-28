import type { MetadataRoute } from "next";
import { fetchPublishedPosts } from "@/lib/posts";
import { fetchAssistants } from "@/lib/intric";
import { COURSES } from "@/lib/education-data";

const BASE_URL = "https://ai-hubben.eu";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, assistants] = await Promise.allSettled([
    fetchPublishedPosts(),
    fetchAssistants(),
  ]);

  const publishedPosts =
    posts.status === "fulfilled" ? posts.value : [];
  const allAssistants =
    assistants.status === "fulfilled" ? assistants.value : [];

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/assistenter`, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/statistik`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/utbildning`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/utbildning/akademin/certifikat`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/dokumentation`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/nyheter`, changeFrequency: "daily", priority: 0.7 },
    { url: `${BASE_URL}/faq`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/om`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/kontakt`, changeFrequency: "yearly", priority: 0.4 },
    { url: `${BASE_URL}/integritetspolicy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/tillganglighet`, changeFrequency: "yearly", priority: 0.3 },
  ];

  const coursePages: MetadataRoute.Sitemap = COURSES.map((course) => ({
    url: `${BASE_URL}/utbildning/akademin/${course.id}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const postPages: MetadataRoute.Sitemap = publishedPosts.map((post) => ({
    url: `${BASE_URL}/nyheter/${post.slug}`,
    lastModified: post.published_at ?? post.created_at,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const assistantPages: MetadataRoute.Sitemap = allAssistants.map((a) => ({
    url: `${BASE_URL}/assistenter/${a.id}`,
    changeFrequency: "weekly" as const,
    priority: 0.5,
  }));

  return [...staticPages, ...coursePages, ...postPages, ...assistantPages];
}
