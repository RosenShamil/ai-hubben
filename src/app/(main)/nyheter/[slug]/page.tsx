import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchPostBySlug, fetchPublishedPosts } from "@/lib/posts";
import { PostContent } from "@/components/nyheter/post-content";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchPostBySlug(slug);
  if (!post) return { title: "Artikel hittades inte" };
  return {
    title: post.title,
    description: post.excerpt ?? undefined,
  };
}

export const revalidate = 60;

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const post = await fetchPostBySlug(slug);

  if (!post) notFound();

  return <PostContent post={post} />;
}
