"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
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

function renderContent(content: string) {
  const blocks = content.split("\n\n");
  const elements: React.ReactNode[] = [];

  let listBuffer: string[] = [];

  function flushList(key: string) {
    if (listBuffer.length > 0) {
      elements.push(
        <ul key={key} className="my-4 list-disc space-y-1.5 pl-6 text-[1.0625rem] leading-[1.8] text-foreground/90">
          {listBuffer.map((item, i) => (
            <li key={i}>{renderInline(item)}</li>
          ))}
        </ul>
      );
      listBuffer = [];
    }
  }

  function renderInline(text: string): React.ReactNode {
    // Handle **bold** text
    const parts = text.split(/\*\*(.*?)\*\*/g);
    if (parts.length === 1) return text;
    return parts.map((part, i) =>
      i % 2 === 1 ? (
        <strong key={i} className="font-semibold text-foreground">
          {part}
        </strong>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  }

  blocks.forEach((block, i) => {
    const trimmed = block.trim();
    if (!trimmed) return;

    // Check if this block contains list items
    const lines = trimmed.split("\n");
    const allListItems = lines.every((l) => l.trim().startsWith("- "));

    if (allListItems) {
      flushList(`list-pre-${i}`);
      lines.forEach((l) => listBuffer.push(l.trim().slice(2)));
      flushList(`list-${i}`);
      return;
    }

    flushList(`list-pre-${i}`);

    if (trimmed.startsWith("### ")) {
      elements.push(
        <h3
          key={i}
          className="mt-10 mb-4 text-[1.25rem] font-semibold tracking-[-0.02em]"
        >
          {renderInline(trimmed.slice(4))}
        </h3>
      );
    } else if (trimmed.startsWith("## ")) {
      elements.push(
        <h2
          key={i}
          className="mt-12 mb-4 text-[1.5rem] tracking-[-0.03em]"
          style={{
            fontFamily: "var(--font-bodoni), serif",
            fontWeight: 400,
          }}
        >
          {renderInline(trimmed.slice(3))}
        </h2>
      );
    } else {
      // Handle blocks that mix list items and paragraphs
      const mixedLines = trimmed.split("\n");
      let currentParagraph: string[] = [];

      mixedLines.forEach((line, li) => {
        if (line.trim().startsWith("- ")) {
          if (currentParagraph.length > 0) {
            elements.push(
              <p
                key={`${i}-p-${li}`}
                className="my-4 text-[1.0625rem] leading-[1.8] text-foreground/90"
              >
                {renderInline(currentParagraph.join(" "))}
              </p>
            );
            currentParagraph = [];
          }
          listBuffer.push(line.trim().slice(2));
        } else {
          if (listBuffer.length > 0) {
            flushList(`list-${i}-${li}`);
          }
          currentParagraph.push(line);
        }
      });

      flushList(`list-end-${i}`);

      if (currentParagraph.length > 0) {
        elements.push(
          <p
            key={`${i}-p-end`}
            className="my-4 text-[1.0625rem] leading-[1.8] text-foreground/90"
          >
            {renderInline(currentParagraph.join(" "))}
          </p>
        );
      }
    }
  });

  flushList("list-final");

  return elements;
}

export function PostContent({ post }: { post: Post }) {
  const date = post.published_at ?? post.created_at;
  const youtubeId = post.youtube_url ? getYouTubeId(post.youtube_url) : null;

  return (
    <article className="mx-auto max-w-[48rem] px-6 pt-20 pb-16 md:pt-28 md:pb-24">
      {/* Breadcrumb */}
      <FadeIn>
        <Link
          href="/nyheter"
          className="inline-flex items-center gap-2 text-[0.8125rem] text-muted-foreground transition-colors hover:text-foreground"
          style={{ fontFamily: "var(--font-geist-mono), monospace" }}
        >
          <ArrowLeft size={14} />
          Tillbaka till nyheter
        </Link>
      </FadeIn>

      {/* Cover image */}
      {post.cover_image && (
        <FadeIn delay={0.05}>
          <div className="mt-8 overflow-hidden rounded-lg">
            <img
              src={post.cover_image}
              alt=""
              className="h-auto w-full object-cover"
            />
          </div>
        </FadeIn>
      )}

      {/* YouTube embed */}
      {youtubeId && (
        <FadeIn delay={0.05}>
          <div className="mt-8 overflow-hidden rounded-lg">
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <iframe
                src={`https://www.youtube.com/embed/${youtubeId}`}
                title={post.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full rounded-lg"
              />
            </div>
          </div>
        </FadeIn>
      )}

      {/* Title */}
      <FadeIn delay={0.1}>
        <h1
          className="mt-8 text-[2rem] leading-[1.15] tracking-[-0.04em] md:text-[3rem]"
          style={{
            fontFamily: "var(--font-bodoni), serif",
            fontWeight: 400,
          }}
        >
          {post.title}
        </h1>
      </FadeIn>

      {/* Date */}
      <FadeIn delay={0.15}>
        <p
          className="mt-4 text-[0.8125rem] text-muted-foreground"
          style={{ fontFamily: "var(--font-geist-mono), monospace" }}
        >
          {formatDate(date)}
        </p>
      </FadeIn>

      {/* Content */}
      {post.content && (
        <FadeIn delay={0.2}>
          <div className="mt-10">{renderContent(post.content)}</div>
        </FadeIn>
      )}

      {/* Bottom gradient divider */}
      <div className="mt-16">
        <div className="h-px" style={{ background: BRAND_GRADIENT }} />
      </div>

      {/* Back link */}
      <div className="mt-8">
        <Link
          href="/nyheter"
          className="inline-flex items-center gap-2 text-[0.8125rem] text-muted-foreground transition-colors hover:text-foreground"
          style={{ fontFamily: "var(--font-geist-mono), monospace" }}
        >
          <ArrowLeft size={14} />
          Alla nyheter
        </Link>
      </div>
    </article>
  );
}
