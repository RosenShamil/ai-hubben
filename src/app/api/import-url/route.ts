import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();
    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "URL saknas" }, { status: 400 });
    }

    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; AI-hubben/1.0)",
        Accept: "text/html",
      },
      signal: AbortSignal.timeout(10000),
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `Kunde inte hamta sidan (${res.status})` },
        { status: 400 }
      );
    }

    const html = await res.text();

    // Extract metadata
    const title = extractMeta(html, /<title[^>]*>([^<]*)<\/title>/i)
      || extractMeta(html, /property="og:title"\s+content="([^"]*)"/i)
      || "";

    const description = extractMeta(html, /name="description"\s+content="([^"]*)"/i)
      || extractMeta(html, /property="og:description"\s+content="([^"]*)"/i)
      || "";

    const image = extractMeta(html, /property="og:image"\s+content="([^"]*)"/i)
      || "";

    // Extract main content text
    const content = extractContent(html);

    return NextResponse.json({ title: title.trim(), description: description.trim(), image, content });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Okant fel";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

function extractMeta(html: string, regex: RegExp): string {
  const match = html.match(regex);
  return match?.[1] ?? "";
}

function extractContent(html: string): string {
  // Remove script, style, nav, header, footer, aside
  let cleaned = html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<nav[\s\S]*?<\/nav>/gi, "")
    .replace(/<header[\s\S]*?<\/header>/gi, "")
    .replace(/<footer[\s\S]*?<\/footer>/gi, "")
    .replace(/<aside[\s\S]*?<\/aside>/gi, "");

  // Try to find article or main content
  const articleMatch = cleaned.match(/<article[\s\S]*?<\/article>/i)
    || cleaned.match(/<main[\s\S]*?<\/main>/i)
    || cleaned.match(/<div[^>]*class="[^"]*content[^"]*"[\s\S]*?<\/div>/i);

  if (articleMatch) {
    cleaned = articleMatch[0];
  }

  // Convert common HTML to markdown-ish
  let text = cleaned
    .replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, "\n\n## $1\n\n")
    .replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, "\n\n## $1\n\n")
    .replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, "\n\n### $1\n\n")
    .replace(/<h[456][^>]*>([\s\S]*?)<\/h[456]>/gi, "\n\n### $1\n\n")
    .replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, "- $1\n")
    .replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, "\n\n$1\n\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<strong[^>]*>([\s\S]*?)<\/strong>/gi, "**$1**")
    .replace(/<b[^>]*>([\s\S]*?)<\/b>/gi, "**$1**")
    .replace(/<em[^>]*>([\s\S]*?)<\/em>/gi, "*$1*")
    .replace(/<i[^>]*>([\s\S]*?)<\/i>/gi, "*$1*")
    .replace(/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, "$2")
    .replace(/<[^>]+>/g, "") // Remove remaining HTML tags
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\n{3,}/g, "\n\n") // Collapse excessive newlines
    .trim();

  // Limit length
  if (text.length > 10000) {
    text = text.slice(0, 10000) + "\n\n[Texten har kortats ner...]";
  }

  return text;
}
