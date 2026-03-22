import type { Metadata } from "next";
import { fetchPublishedPosts } from "@/lib/posts";
import { NyheterPage } from "@/components/nyheter/nyheter-page";

export const revalidate = 60;

export const metadata: Metadata = { title: "Nyheter" };

export default async function Page() {
  const posts = await fetchPublishedPosts();

  return <NyheterPage posts={posts} />;
}
