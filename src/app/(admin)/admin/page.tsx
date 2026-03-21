"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { GraduationCap, Bot, Users, ArrowRight } from "lucide-react";

export default function AdminOverviewPage() {
  const [stats, setStats] = useState({
    assistants: 0,
    sessions: 0,
    participants: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      const [assistantsRes, sessionsRes] = await Promise.all([
        supabase.from("assistants").select("id", { count: "exact", head: true }),
        supabase.from("training_sessions").select("participants"),
      ]);

      const totalParticipants = (sessionsRes.data ?? []).reduce(
        (sum, s) => sum + (s.participants ?? 0),
        0
      );

      setStats({
        assistants: assistantsRes.count ?? 0,
        sessions: sessionsRes.data?.length ?? 0,
        participants: totalParticipants,
      });
      setLoading(false);
    }
    fetchStats();
  }, []);

  const statCards = [
    {
      label: "Assistenter",
      value: stats.assistants,
      icon: Bot,
      href: "/admin/assistenter",
    },
    {
      label: "Utbildningstillfallen",
      value: stats.sessions,
      icon: GraduationCap,
      href: "/admin/utbildning",
    },
    {
      label: "Totalt deltagare",
      value: stats.participants,
      icon: Users,
      href: "/admin/utbildning",
    },
  ];

  return (
    <div className="mx-auto max-w-[1000px]">
      {/* Header */}
      <div className="mb-8">
        <p
          className="text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-muted-foreground"
          style={{ fontFamily: "var(--font-geist-mono), monospace" }}
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
      <div className="grid gap-4 sm:grid-cols-3">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="rounded-lg border border-border bg-card p-6"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-secondary">
                  <Icon size={18} className="text-muted-foreground" />
                </div>
                <p
                  className="text-[0.6875rem] font-medium uppercase tracking-[0.1em] text-muted-foreground"
                  style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                >
                  {card.label}
                </p>
              </div>
              <p className="mt-4 text-[2rem] font-medium tracking-tight">
                {loading ? "..." : card.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* Quick links */}
      <div className="mt-8">
        <h2
          className="mb-4 text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-muted-foreground"
          style={{ fontFamily: "var(--font-geist-mono), monospace" }}
        >
          Snabbllankar
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <Link
            href="/admin/utbildning"
            className="group flex items-center justify-between rounded-lg border border-border bg-card p-5 transition-colors hover:bg-secondary"
          >
            <div className="flex items-center gap-3">
              <GraduationCap
                size={18}
                className="text-muted-foreground"
              />
              <div>
                <p className="text-[0.9375rem] font-medium">
                  Hantera utbildningar
                </p>
                <p className="text-[0.8125rem] text-muted-foreground">
                  Lagg till, redigera och ta bort utbildningstillfallen
                </p>
              </div>
            </div>
            <ArrowRight
              size={16}
              className="text-muted-foreground transition-transform group-hover:translate-x-1"
            />
          </Link>

          <Link
            href="/admin/assistenter"
            className="group flex items-center justify-between rounded-lg border border-border bg-card p-5 transition-colors hover:bg-secondary"
          >
            <div className="flex items-center gap-3">
              <Bot size={18} className="text-muted-foreground" />
              <div>
                <p className="text-[0.9375rem] font-medium">
                  Hantera assistenter
                </p>
                <p className="text-[0.8125rem] text-muted-foreground">
                  Redigera och ta bort communityassistenter
                </p>
              </div>
            </div>
            <ArrowRight
              size={16}
              className="text-muted-foreground transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
