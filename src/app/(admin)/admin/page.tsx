"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import {
  Bot,
  GraduationCap,
  Users,
  UserSearch,
  Newspaper,
  MessageSquare,
  HelpCircle,
  FileText,
  ArrowRight,
} from "lucide-react";

const MARKETPLACE_URL = "https://marketplace.intric.ai/api";

const ALLOWED_ORGS = new Set([
  "katrineholms kommun",
  "intric ab",
  "intric ai",
  "gävle kommun",
  "lidköpings kommun",
  "mönsterås kommun",
  "trollhättans stad",
  "ab svenska bostäder",
  "atherfold consulting ab",
  "kundtjänst",
]);

const EXCLUDED_IDS = new Set([
  "b0dde2a3-31c1-45e4-8518-2f4608e4fa9d",
  "dfdf10f5-34ed-4ab3-9420-a73d8bbb6c86",
]);

const monoStyle = { fontFamily: "var(--font-geist-mono), monospace" } as const;

export default function AdminOverviewPage() {
  const [stats, setStats] = useState({
    marketplaceAssistants: 0,
    communityAssistants: 0,
    users: 0,
    sessions: 0,
    participants: 0,
    posts: 0,
    unreadMessages: 0,
    faqs: 0,
    documents: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      const [
        mpRes,
        communityRes,
        usersRes,
        sessionsRes,
        postsRes,
        messagesRes,
        faqsRes,
        docsRes,
      ] = await Promise.all([
        fetch(`${MARKETPLACE_URL}/assistants`)
          .then((r) => r.json())
          .catch(() => []),
        supabase.from("assistants").select("id", { count: "exact", head: true }),
        supabase.from("profiles").select("id", { count: "exact", head: true }),
        supabase.from("training_sessions").select("participants"),
        supabase.from("posts").select("id", { count: "exact", head: true }),
        supabase
          .from("contact_messages")
          .select("id", { count: "exact", head: true })
          .eq("read", false),
        supabase.from("faqs").select("id", { count: "exact", head: true }),
        supabase.from("documents").select("id", { count: "exact", head: true }),
      ]);

      const mpCount = Array.isArray(mpRes)
        ? mpRes.filter(
            (a: { id: string; organization: string }) =>
              ALLOWED_ORGS.has(a.organization.toLowerCase().trim()) &&
              !EXCLUDED_IDS.has(a.id)
          ).length
        : 0;

      const totalParticipants = (sessionsRes.data ?? []).reduce(
        (sum, s) => sum + (s.participants ?? 0),
        0
      );

      setStats({
        marketplaceAssistants: mpCount,
        communityAssistants: communityRes.count ?? 0,
        users: usersRes.count ?? 0,
        sessions: sessionsRes.data?.length ?? 0,
        participants: totalParticipants,
        posts: postsRes.count ?? 0,
        unreadMessages: messagesRes.count ?? 0,
        faqs: faqsRes.count ?? 0,
        documents: docsRes.count ?? 0,
      });
      setLoading(false);
    }
    fetchStats();
  }, []);

  const v = (n: number) => (loading ? "..." : n);

  const statCards = [
    {
      label: "Assistenter",
      value: v(stats.marketplaceAssistants + stats.communityAssistants),
      sub: loading
        ? undefined
        : `${stats.marketplaceAssistants} API · ${stats.communityAssistants} lokala`,
      icon: Bot,
      href: "/admin/assistenter",
    },
    {
      label: "Anvandare",
      value: v(stats.users),
      icon: UserSearch,
      href: "/admin/anvandare",
    },
    {
      label: "Utbildningar",
      value: v(stats.sessions),
      sub: loading ? undefined : `${stats.participants} deltagare totalt`,
      icon: GraduationCap,
      href: "/admin/utbildning",
    },
    {
      label: "Nyheter",
      value: v(stats.posts),
      icon: Newspaper,
      href: "/admin/nyheter",
    },
    {
      label: "Meddelanden",
      value: v(stats.unreadMessages),
      sub: loading ? undefined : "olasta",
      icon: MessageSquare,
      href: "/admin/meddelanden",
    },
    {
      label: "Dokument",
      value: v(stats.documents),
      icon: FileText,
      href: "/admin/dokument",
    },
  ];

  const quickLinks = [
    {
      label: "Hantera assistenter",
      description: "Alla marketplace- och communityassistenter",
      icon: Bot,
      href: "/admin/assistenter",
    },
    {
      label: "Anvandare & framsteg",
      description: "Se registrerade anvandare och deras aktivitet",
      icon: Users,
      href: "/admin/anvandare",
    },
    {
      label: "Utbildningar",
      description: "Lagg till och hantera utbildningstillfallen",
      icon: GraduationCap,
      href: "/admin/utbildning",
    },
    {
      label: "FAQ",
      description: `${loading ? "..." : stats.faqs} fragor publicerade`,
      icon: HelpCircle,
      href: "/admin/faq",
    },
  ];

  return (
    <div className="mx-auto max-w-[1000px]">
      {/* Header */}
      <div className="mb-8">
        <p
          className="text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-muted-foreground"
          style={monoStyle}
        >
          Dashboard
        </p>
        <h1
          className="mt-2 text-[2rem] tracking-[-0.04em] md:text-[2.5rem]"
          style={{
            fontFamily: "var(--font-bodoni), serif",
            fontWeight: 400,
          }}
        >
          Oversikt
        </h1>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              href={card.href}
              className="group rounded-lg border border-border bg-card p-6 transition-colors hover:bg-secondary/50"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-secondary">
                  <Icon size={18} className="text-muted-foreground" />
                </div>
                <p
                  className="text-[0.6875rem] font-medium uppercase tracking-[0.1em] text-muted-foreground"
                  style={monoStyle}
                >
                  {card.label}
                </p>
              </div>
              <p className="mt-4 text-[2rem] font-medium tracking-tight">
                {card.value}
              </p>
              {card.sub && (
                <p className="mt-0.5 text-[0.75rem] text-muted-foreground">
                  {card.sub}
                </p>
              )}
            </Link>
          );
        })}
      </div>

      {/* Quick links */}
      <div className="mt-8">
        <h2
          className="mb-4 text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-muted-foreground"
          style={monoStyle}
        >
          Snabblankar
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {quickLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="group flex items-center justify-between rounded-lg border border-border bg-card p-5 transition-colors hover:bg-secondary"
              >
                <div className="flex items-center gap-3">
                  <Icon size={18} className="text-muted-foreground" />
                  <div>
                    <p className="text-[0.9375rem] font-medium">
                      {link.label}
                    </p>
                    <p className="text-[0.8125rem] text-muted-foreground">
                      {link.description}
                    </p>
                  </div>
                </div>
                <ArrowRight
                  size={16}
                  className="text-muted-foreground transition-transform group-hover:translate-x-1"
                />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
