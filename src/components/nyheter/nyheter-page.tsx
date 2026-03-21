"use client";

import Link from "next/link";
import { FadeIn } from "@/components/shared/fade-in";
import { BRAND_GRADIENT } from "@/lib/constants";
import type { Post } from "@/lib/posts";

function getYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/))([^?&/#]+)/
  );
  return match?.[1] ?? null;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("sv-SE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getCoverUrl(post: Post): string | null {
  if (post.cover_image) return post.cover_image;
  if (post.youtube_url) {
    const id = getYouTubeId(post.youtube_url);
    if (id) return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
  }
  return null;
}

function FeaturedPost({ post }: { post: Post }) {
  const coverUrl = getCoverUrl(post);
  const date = post.published_at ?? post.created_at;

  return (
    <FadeIn>
      <Link href={`/nyheter/${post.slug}`}>
        <div className="group relative cursor-pointer overflow-hidden rounded-lg transition-all duration-300">
          {/* Travel flash */}
          <div className="absolute -inset-px z-10 overflow-hidden rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div
              className="absolute inset-0 opacity-0 group-hover:animate-[travel-flash_1.125s_linear_forwards]"
              style={{
                background:
                  "conic-gradient(from 0deg, transparent 0%, transparent 70%, white 85%, white 95%, transparent 100%)",
              }}
            />
            <div
              className="absolute inset-0 opacity-40"
              style={{ background: BRAND_GRADIENT }}
            />
          </div>

          <div className="relative overflow-hidden rounded-lg border border-border bg-card transition-all duration-300 group-hover:shadow-lg">
            {coverUrl ? (
              <div className="relative h-[280px] w-full overflow-hidden md:h-[400px]">
                <img
                  src={coverUrl}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
                  <span
                    className="inline-block rounded-full bg-white/15 px-3 py-1 text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-white/90 backdrop-blur-sm"
                    style={{
                      fontFamily: "var(--font-geist-mono), monospace",
                    }}
                  >
                    Senaste
                  </span>
                  <h2
                    className="mt-3 text-[1.75rem] leading-[1.15] tracking-[-0.03em] text-white md:text-[2.5rem]"
                    style={{
                      fontFamily: "var(--font-bodoni), serif",
                      fontWeight: 400,
                    }}
                  >
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="mt-3 line-clamp-2 max-w-[36rem] text-[0.9375rem] leading-[1.6] text-white/80">
                      {post.excerpt}
                    </p>
                  )}
                  <p
                    className="mt-4 text-[0.75rem] text-white/60"
                    style={{
                      fontFamily: "var(--font-geist-mono), monospace",
                    }}
                  >
                    {formatDate(date)}
                  </p>
                </div>
              </div>
            ) : (
              <div className="relative h-[280px] w-full md:h-[400px]" style={{ background: BRAND_GRADIENT }}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
                  <span
                    className="inline-block rounded-full bg-white/15 px-3 py-1 text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-white/90 backdrop-blur-sm"
                    style={{
                      fontFamily: "var(--font-geist-mono), monospace",
                    }}
                  >
                    Senaste
                  </span>
                  <h2
                    className="mt-3 text-[1.75rem] leading-[1.15] tracking-[-0.03em] text-white md:text-[2.5rem]"
                    style={{
                      fontFamily: "var(--font-bodoni), serif",
                      fontWeight: 400,
                    }}
                  >
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="mt-3 line-clamp-2 max-w-[36rem] text-[0.9375rem] leading-[1.6] text-white/80">
                      {post.excerpt}
                    </p>
                  )}
                  <p
                    className="mt-4 text-[0.75rem] text-white/60"
                    style={{
                      fontFamily: "var(--font-geist-mono), monospace",
                    }}
                  >
                    {formatDate(date)}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </Link>
    </FadeIn>
  );
}

function PostCard({ post, index }: { post: Post; index: number }) {
  const coverUrl = getCoverUrl(post);
  const date = post.published_at ?? post.created_at;

  return (
    <FadeIn delay={index * 0.05}>
      <Link href={`/nyheter/${post.slug}`}>
        <div className="group relative cursor-pointer rounded-lg transition-all duration-300">
          {/* Travel flash */}
          <div className="absolute -inset-px overflow-hidden rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div
              className="absolute inset-0 opacity-0 group-hover:animate-[travel-flash_1.125s_linear_forwards]"
              style={{
                background:
                  "conic-gradient(from 0deg, transparent 0%, transparent 70%, white 85%, white 95%, transparent 100%)",
              }}
            />
            <div
              className="absolute inset-0 opacity-40"
              style={{ background: BRAND_GRADIENT }}
            />
          </div>

          {/* Card */}
          <div className="relative flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-all duration-300 group-hover:bg-secondary group-hover:shadow-lg">
            {/* Image */}
            {coverUrl ? (
              <div className="relative h-[200px] w-full overflow-hidden">
                <img
                  src={coverUrl}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            ) : (
              <div
                className="h-[200px] w-full opacity-20"
                style={{ background: BRAND_GRADIENT }}
              />
            )}

            {/* Content */}
            <div className="flex flex-1 flex-col gap-3 p-6">
              <h3
                className="text-[1.25rem] leading-[1.2] tracking-[-0.02em] transition-colors group-hover:text-foreground"
                style={{
                  fontFamily: "var(--font-bodoni), serif",
                  fontWeight: 400,
                }}
              >
                {post.title}
              </h3>
              {post.excerpt && (
                <p className="line-clamp-2 text-[0.875rem] leading-[1.6] text-muted-foreground">
                  {post.excerpt}
                </p>
              )}
              <p
                className="mt-auto pt-2 text-[0.75rem] text-muted-foreground"
                style={{
                  fontFamily: "var(--font-geist-mono), monospace",
                }}
              >
                {formatDate(date)}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </FadeIn>
  );
}

export function NyheterPage({ posts }: { posts: Post[] }) {
  if (posts.length === 0) {
    return (
      <>
        {/* Hero */}
        <section className="mx-auto max-w-[68.75rem] px-6 pt-20 pb-12 md:pt-28 md:pb-16">
          <FadeIn>
            <p
              className="text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-muted-foreground"
              style={{ fontFamily: "var(--font-geist-mono), monospace" }}
            >
              Aktuellt
            </p>
            <h1
              className="mt-4 text-[1.75rem] leading-[1.1] tracking-[-0.04em] sm:text-[2.75rem] md:text-[4.5rem]"
              style={{
                fontFamily: "var(--font-bodoni), serif",
                fontWeight: 400,
              }}
            >
              Nyheter
            </h1>
            <p className="mt-6 max-w-[42rem] text-[1.0625rem] leading-[1.7] text-muted-foreground">
              Senaste nytt och uppdateringar fran kommunens AI-arbete.
            </p>
          </FadeIn>
        </section>

        <div className="mx-auto max-w-[68.75rem] px-6">
          <div className="h-px" style={{ background: BRAND_GRADIENT }} />
        </div>

        <section className="mx-auto max-w-[68.75rem] px-6 py-12 md:py-16">
          <div className="py-20 text-center">
            <p className="text-[1.125rem] font-medium">
              Inga nyheter publicerade
            </p>
            <p className="mt-2 text-[0.875rem] text-muted-foreground">
              Kom tillbaka snart for senaste uppdateringarna.
            </p>
          </div>
        </section>
      </>
    );
  }

  const [featured, ...remaining] = posts;

  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-[68.75rem] px-6 pt-20 pb-12 md:pt-28 md:pb-16">
        <FadeIn>
          <p
            className="text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-muted-foreground"
            style={{ fontFamily: "var(--font-geist-mono), monospace" }}
          >
            Aktuellt
          </p>
          <h1
            className="mt-4 text-[1.75rem] leading-[1.1] tracking-[-0.04em] sm:text-[2.75rem] md:text-[4.5rem]"
            style={{
              fontFamily: "var(--font-bodoni), serif",
              fontWeight: 400,
            }}
          >
            Nyheter
          </h1>
          <p className="mt-6 max-w-[42rem] text-[1.0625rem] leading-[1.7] text-muted-foreground">
            Senaste nytt och uppdateringar fran kommunens AI-arbete.
          </p>
        </FadeIn>
      </section>

      {/* Gradient divider */}
      <div className="mx-auto max-w-[68.75rem] px-6">
        <div className="h-px" style={{ background: BRAND_GRADIENT }} />
      </div>

      {/* Featured post */}
      <section className="mx-auto max-w-[68.75rem] px-6 pt-12 md:pt-16">
        <FeaturedPost post={featured} />
      </section>

      {/* Grid of remaining posts */}
      {remaining.length > 0 && (
        <section className="mx-auto max-w-[68.75rem] px-6 py-12 md:py-16">
          <div className="grid gap-6 md:grid-cols-2">
            {remaining.map((post, i) => (
              <PostCard key={post.id} post={post} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* Bottom gradient divider */}
      <div className="mx-auto max-w-[68.75rem] px-6 pb-12">
        <div className="h-px" style={{ background: BRAND_GRADIENT }} />
      </div>
    </>
  );
}
