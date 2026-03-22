import type { Metadata } from "next";
import { fetchPublishedPosts } from "@/lib/posts";
import { NyheterPage } from "@/components/nyheter/nyheter-page";
import { PullToRefresh } from "@/components/shared/pull-to-refresh";

export const revalidate = 60;

export const metadata: Metadata = { title: "Nyheter" };

export default async function Page() {
  const posts = await fetchPublishedPosts();

  return (
    <PullToRefresh>
      <NyheterPage posts={posts} />
    </PullToRefresh>
  );
}
