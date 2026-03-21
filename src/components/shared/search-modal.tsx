"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Search, X, Bot, Newspaper, HelpCircle, FileText, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

interface SearchResult {
  id: string;
  title: string;
  description: string;
  href: string;
  type: "assistent" | "nyhet" | "faq" | "dokument";
}

const TYPE_CONFIG = {
  assistent: { icon: Bot, label: "Assistent" },
  nyhet: { icon: Newspaper, label: "Nyhet" },
  faq: { icon: HelpCircle, label: "FAQ" },
  dokument: { icon: FileText, label: "Dokument" },
};

export function SearchModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(null);

  // Focus input when opening
  useEffect(() => {
    if (open) {
      setQuery("");
      setResults([]);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) {
      document.addEventListener("keydown", handleKey);
      return () => document.removeEventListener("keydown", handleKey);
    }
  }, [open, onClose]);

  // Ctrl+K / Cmd+K to open
  useEffect(() => {
    function handleGlobalKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (!open) {
          // Parent handles opening — this is just for awareness
        }
      }
    }
    document.addEventListener("keydown", handleGlobalKey);
    return () => document.removeEventListener("keydown", handleGlobalKey);
  }, [open]);

  const search = useCallback(async (q: string) => {
    if (q.length < 2) {
      setResults([]);
      return;
    }

    setLoading(true);
    const term = `%${q}%`;

    const [assistants, posts, faqs, docs] = await Promise.allSettled([
      // Assistants from Supabase (community)
      supabase
        .from("assistants")
        .select("id, name, description")
        .or(`name.ilike.${term},description.ilike.${term}`)
        .limit(5),
      // Posts
      supabase
        .from("posts")
        .select("id, title, excerpt, slug")
        .eq("published", true)
        .or(`title.ilike.${term},excerpt.ilike.${term}`)
        .limit(5),
      // FAQs
      supabase
        .from("faqs")
        .select("id, question, answer")
        .or(`question.ilike.${term},answer.ilike.${term}`)
        .limit(5),
      // Documents
      supabase
        .from("documents")
        .select("id, title, description")
        .or(`title.ilike.${term},description.ilike.${term}`)
        .limit(5),
    ]);

    const items: SearchResult[] = [];

    if (assistants.status === "fulfilled" && assistants.value.data) {
      for (const a of assistants.value.data) {
        items.push({
          id: a.id,
          title: a.name,
          description: a.description?.slice(0, 100) || "",
          href: `/assistenter/${a.id}`,
          type: "assistent",
        });
      }
    }

    if (posts.status === "fulfilled" && posts.value.data) {
      for (const p of posts.value.data) {
        items.push({
          id: p.id,
          title: p.title,
          description: p.excerpt?.slice(0, 100) || "",
          href: `/nyheter/${p.slug}`,
          type: "nyhet",
        });
      }
    }

    if (faqs.status === "fulfilled" && faqs.value.data) {
      for (const f of faqs.value.data) {
        items.push({
          id: f.id,
          title: f.question,
          description: f.answer?.slice(0, 100) || "",
          href: "/faq",
          type: "faq",
        });
      }
    }

    if (docs.status === "fulfilled" && docs.value.data) {
      for (const d of docs.value.data) {
        items.push({
          id: d.id,
          title: d.title,
          description: d.description?.slice(0, 100) || "",
          href: "/dokumentation",
          type: "dokument",
        });
      }
    }

    // Also search marketplace assistants via a simple fetch
    try {
      const res = await fetch("https://marketplace.intric.ai/api/assistants");
      if (res.ok) {
        const all = (await res.json()) as Array<{
          id: string;
          name: string;
          description: string;
          organization: string;
        }>;
        const lq = q.toLowerCase();
        const matches = all
          .filter(
            (a) =>
              a.organization.toLowerCase() === "katrineholms kommun" &&
              (a.name.toLowerCase().includes(lq) ||
                a.description?.toLowerCase().includes(lq))
          )
          .slice(0, 5);

        for (const a of matches) {
          // Avoid duplicates
          if (!items.some((i) => i.id === a.id)) {
            items.push({
              id: a.id,
              title: a.name,
              description: a.description?.slice(0, 100) || "",
              href: `/assistenter/${a.id}`,
              type: "assistent",
            });
          }
        }
      }
    } catch {
      // ignore marketplace errors
    }

    setResults(items);
    setLoading(false);
  }, []);

  function handleInput(value: string) {
    setQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => search(value), 300);
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[1001] flex items-start justify-center bg-black/50 backdrop-blur-sm px-4 pt-[15vh]"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: -10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-[560px] overflow-hidden rounded-xl border border-border bg-card shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search input */}
            <div className="flex items-center gap-3 border-b border-border px-4 py-3">
              <Search size={18} className="shrink-0 text-muted-foreground" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => handleInput(e.target.value)}
                placeholder="Sök assistenter, nyheter, FAQ, dokument..."
                className="flex-1 bg-transparent text-[0.9375rem] outline-none placeholder:text-muted-foreground"
              />
              {query && (
                <button
                  onClick={() => {
                    setQuery("");
                    setResults([]);
                    inputRef.current?.focus();
                  }}
                  className="shrink-0 rounded-md p-1 text-muted-foreground hover:text-foreground"
                >
                  <X size={16} />
                </button>
              )}
              <kbd
                className="hidden sm:inline-flex shrink-0 items-center rounded border border-border bg-secondary px-1.5 py-0.5 text-[0.625rem] text-muted-foreground"
                style={{ fontFamily: "var(--font-geist-mono), monospace" }}
              >
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div className="max-h-[60vh] overflow-y-auto">
              {loading && (
                <div className="flex items-center justify-center py-8">
                  <Loader2 size={20} className="animate-spin text-muted-foreground" />
                </div>
              )}

              {!loading && query.length >= 2 && results.length === 0 && (
                <div className="px-4 py-8 text-center text-[0.875rem] text-muted-foreground">
                  Inga resultat för &ldquo;{query}&rdquo;
                </div>
              )}

              {!loading && results.length > 0 && (
                <div className="p-2">
                  {results.map((result) => {
                    const config = TYPE_CONFIG[result.type];
                    const Icon = config.icon;
                    return (
                      <Link
                        key={`${result.type}-${result.id}`}
                        href={result.href}
                        onClick={onClose}
                        className="flex items-start gap-3 rounded-lg px-3 py-3 transition-colors hover:bg-secondary"
                      >
                        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border bg-secondary text-muted-foreground">
                          <Icon size={16} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <p className="truncate text-[0.875rem] font-medium">
                              {result.title}
                            </p>
                            <span
                              className="shrink-0 rounded-full bg-secondary px-2 py-0.5 text-[0.5625rem] uppercase tracking-[0.08em] text-muted-foreground"
                              style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                            >
                              {config.label}
                            </span>
                          </div>
                          {result.description && (
                            <p className="mt-0.5 truncate text-[0.8125rem] text-muted-foreground">
                              {result.description}
                            </p>
                          )}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}

              {!loading && query.length < 2 && (
                <div className="px-4 py-8 text-center text-[0.8125rem] text-muted-foreground">
                  Skriv minst 2 tecken för att söka
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
