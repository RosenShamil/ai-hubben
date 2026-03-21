"use client";

import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { FadeIn } from "@/components/shared/fade-in";
import { CountUp } from "@/components/shared/count-up";
import { BRAND_GRADIENT } from "@/lib/constants";
import {
  CHART_COLORS,
} from "@/lib/stats-data";
import type {
  Period,
  KeyMetric,
  DailyInteraction,
  AssistantUsage,
  ModelUsage,
  FileUpload,
  YearComparison,
  UserRoles,
  PlatformOverview,
} from "@/lib/stats-data";
import type { TrainingStats } from "@/lib/training-data";
import { TrendingUp, Users, Zap, Layers } from "lucide-react";

/* ── Custom tooltip ── */

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number; name: string; color?: string }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border bg-card px-4 py-3 shadow-lg">
      {label && (
        <p
          className="mb-1.5 text-[0.6875rem] uppercase tracking-[0.1em] text-muted-foreground"
          style={{ fontFamily: "var(--font-geist-mono), monospace" }}
        >
          {label}
        </p>
      )}
      {payload.map((entry, i) => (
        <p key={i} className="text-[0.875rem] font-medium">
          <span
            className="mr-2 inline-block h-2 w-2 rounded-full"
            style={{ backgroundColor: entry.color ?? CHART_COLORS[i] }}
          />
          {entry.name}: {entry.value.toLocaleString("sv-SE")}
        </p>
      ))}
    </div>
  );
}

/* ── Pie tooltip ── */

function PieTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ value: number; name: string; payload?: { fill?: string } }>;
}) {
  if (!active || !payload?.length) return null;
  const entry = payload[0];
  return (
    <div className="rounded-lg border border-border bg-card px-4 py-3 shadow-lg">
      <p className="text-[0.875rem] font-medium">
        <span
          className="mr-2 inline-block h-2 w-2 rounded-full"
          style={{ backgroundColor: entry.payload?.fill ?? CHART_COLORS[0] }}
        />
        {entry.name}: {entry.value.toLocaleString("sv-SE")}
      </p>
    </div>
  );
}

/* ── Section card wrapper ── */

function SectionCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-lg border border-border bg-card p-6 md:p-8 ${className}`}>
      {children}
    </div>
  );
}

/* ── Props ── */

interface StatsDashboardProps {
  trainingStats: TrainingStats;
  keyMetrics: Record<Period, KeyMetric[]>;
  dailyInteractions: DailyInteraction[];
  topAssistants: Record<Period, AssistantUsage[]>;
  modelUsage: Record<Period, ModelUsage[]>;
  assistantSplit: Record<Period, ModelUsage[]>;
  fileUploads: Record<Period, FileUpload[]>;
  yearComparison: YearComparison[];
  userRoles: Record<Period, UserRoles[]>;
  platformOverview: PlatformOverview;
}

/* ── Main dashboard ── */

export function StatsDashboard({
  trainingStats,
  keyMetrics,
  dailyInteractions,
  topAssistants,
  modelUsage,
  assistantSplit,
  fileUploads,
  yearComparison,
  userRoles,
  platformOverview,
}: StatsDashboardProps) {
  const [period, setPeriod] = useState<Period>("2026");
  const [trainingView, setTrainingView] = useState<"department" | "role">("department");

  const metrics = keyMetrics[period];
  const currentTopAssistants = topAssistants[period];
  const currentModelUsage = modelUsage[period];
  const currentAssistantSplit = assistantSplit[period];
  const currentFileUploads = fileUploads[period];
  const currentUserRoles = userRoles[period];

  const periodOptions: { label: string; value: Period }[] = [
    { label: "2025", value: "2025" },
    { label: "2026", value: "2026" },
    { label: "Totalt", value: "all" },
  ];

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="mx-auto max-w-[68.75rem] px-6 pt-20 pb-12 md:pt-28 md:pb-16">
        <FadeIn>
          <div>
            <p
              className="text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-muted-foreground"
              style={{ fontFamily: "var(--font-geist-mono), monospace" }}
            >
              Insikter
            </p>
            <h1
              className="mt-4 text-[1.75rem] leading-[1.1] tracking-[-0.04em] sm:text-[2.75rem] md:text-[4.5rem]"
              style={{
                fontFamily: "var(--font-bodoni), serif",
                fontWeight: 400,
              }}
            >
              Statistik
            </h1>
          </div>
          <p className="mt-6 max-w-[42rem] text-[1.0625rem] leading-[1.7] text-muted-foreground">
            Användningsdata, trender och insikter kring kommunens AI-verktyg och
            utbildningsinsatser.
          </p>
        </FadeIn>

        {/* Period selector */}
        <FadeIn delay={0.1}>
          <div className="mt-8 flex gap-2">
            {periodOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setPeriod(opt.value)}
                className={`rounded-full px-5 py-2 text-[0.8125rem] font-medium uppercase tracking-[0.01em] transition-all duration-150 active:scale-[0.98] ${
                  period === opt.value
                    ? "bg-primary text-primary-foreground"
                    : "border border-border text-muted-foreground hover:bg-secondary"
                }`}
                style={{
                  fontFamily: "var(--font-geist-mono), monospace",
                  ...(period === opt.value
                    ? {
                        boxShadow:
                          "0px 2px 1px 0px rgba(255,255,255,0.15) inset, 0px -2px 1px 0px rgba(0,0,0,0.05) inset",
                      }
                    : {}),
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* ─── Gradient divider ─── */}
      <div className="mx-auto max-w-[68.75rem] px-6">
        <div className="h-px" style={{ background: BRAND_GRADIENT }} />
      </div>

      {/* ─── Key Metrics 3+3 ─── */}
      <section className="mx-auto max-w-[68.75rem] px-6 py-12 md:py-16">
        {(() => {
          const normalize = (s: string) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
          const findMetric = (label: string) => metrics.find((m) => normalize(m.label) === normalize(label));
          const topRow = [
            findMetric("Aktiva användare"),
            findMetric("Skapade assistenter"),
            findMetric("Interaktioner"),
          ];
          const bottomRow = [
            { label: "Registrerade användare", formatted: String(platformOverview.registeredUsers), change: 0, changeLabel: "" },
            { label: "Skapade spaces", formatted: String(platformOverview.spaces), change: 0, changeLabel: "" },
            findMetric("Utbildade"),
          ];
          const allCards = [topRow, bottomRow];

          return allCards.map((row, rowIdx) => (
            <div key={rowIdx} className={`grid grid-cols-1 gap-5 sm:grid-cols-3 ${rowIdx > 0 ? "mt-5" : ""}`}>
              {row.map((metric, i) => {
                if (!metric) return null;
                return (
                  <FadeIn key={metric.label} delay={(rowIdx * 3 + i) * 0.06}>
                    <SectionCard className="h-full">
                      <p
                        className="text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-muted-foreground"
                        style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                      >
                        {metric.label}
                      </p>
                      <CountUp
                        target={metric.formatted}
                        className="mt-3 block text-[2.25rem] tracking-[-0.04em] md:text-[2.75rem]"
                        style={{
                          fontFamily: "var(--font-bodoni), serif",
                          fontWeight: 400,
                        }}
                      />
                      {metric.change > 0 && (
                        <div className="mt-3 flex items-center gap-1.5">
                          <span className="inline-flex items-center gap-1 rounded-full bg-green-500/10 px-2.5 py-1 text-[0.6875rem] font-medium text-green-600 dark:text-green-400">
                            <TrendingUp size={12} />+{metric.change}%
                          </span>
                          <span
                            className="text-[0.6875rem] text-muted-foreground"
                            style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                          >
                            {metric.changeLabel}
                          </span>
                        </div>
                      )}
                    </SectionCard>
                  </FadeIn>
                );
              })}
            </div>
          ));
        })()}
      </section>

      {/* ─── Fading divider ─── */}
      <div className="mx-auto max-w-[68.75rem] px-6">
        <div
          className="h-px"
          style={{
            background:
              "linear-gradient(to right, transparent, var(--border) 50%, transparent)",
          }}
        />
      </div>

      {/* ─── Interactions over time ─── */}
      <section className="mx-auto max-w-[68.75rem] px-6 py-12 md:py-16">
        <FadeIn>
          <SectionCard>
            <p
              className="text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-muted-foreground"
              style={{ fontFamily: "var(--font-geist-mono), monospace" }}
            >
              Interaktioner
            </p>
            <h2
              className="mt-3 text-[1.5rem] tracking-[-0.04em] md:text-[2rem]"
              style={{
                fontFamily: "var(--font-bodoni), serif",
                fontWeight: 400,
              }}
            >
              Daglig användning
            </h2>
            <div className="mt-8 h-[300px] md:h-[380px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={dailyInteractions}
                  margin={{ top: 5, right: 5, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#c83228" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#c83228" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="var(--border)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                    tickLine={false}
                    axisLine={{ stroke: "var(--border)" }}
                    interval="preserveStartEnd"
                    style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                    tickLine={false}
                    axisLine={false}
                    style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                  />
                  <Tooltip content={<ChartTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="interactions"
                    name="Interaktioner"
                    stroke="#c83228"
                    strokeWidth={2}
                    fill="url(#areaGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </SectionCard>
        </FadeIn>
      </section>

      {/* ─── Gradient divider ─── */}
      <div className="mx-auto max-w-[68.75rem] px-6">
        <div className="h-px" style={{ background: BRAND_GRADIENT }} />
      </div>

      {/* ─── Top assistants + AI models ─── */}
      <section className="mx-auto max-w-[68.75rem] px-6 py-12 md:py-16">
        <div className="grid gap-5 md:grid-cols-2">
          {/* Top assistants */}
          <FadeIn>
            <SectionCard className="h-full">
              <p
                className="text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-muted-foreground"
                style={{ fontFamily: "var(--font-geist-mono), monospace" }}
              >
                Topp 10
              </p>
              <h2
                className="mt-3 text-[1.5rem] tracking-[-0.04em] md:text-[2rem]"
                style={{
                  fontFamily: "var(--font-bodoni), serif",
                  fontWeight: 400,
                }}
              >
                Populäraste assistenter
              </h2>
              <div className="mt-8 h-[380px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[...currentTopAssistants].reverse()}
                    layout="vertical"
                    margin={{ top: 0, right: 10, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="var(--border)"
                      horizontal={false}
                    />
                    <XAxis
                      type="number"
                      tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                      tickLine={false}
                      axisLine={{ stroke: "var(--border)" }}
                      style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                    />
                    <YAxis
                      type="category"
                      dataKey="name"
                      tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                      tickLine={false}
                      axisLine={false}
                      width={130}
                      style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                    />
                    <Tooltip content={<ChartTooltip />} />
                    <Bar dataKey="messages" name="Meddelanden" radius={[0, 4, 4, 0]}>
                      {[...currentTopAssistants].reverse().map((_, index) => (
                        <Cell key={index} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </SectionCard>
          </FadeIn>

          {/* AI models */}
          <FadeIn delay={0.1}>
            <SectionCard className="h-full">
              <p
                className="text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-muted-foreground"
                style={{ fontFamily: "var(--font-geist-mono), monospace" }}
              >
                Modeller
              </p>
              <h2
                className="mt-3 text-[1.5rem] tracking-[-0.04em] md:text-[2rem]"
                style={{
                  fontFamily: "var(--font-bodoni), serif",
                  fontWeight: 400,
                }}
              >
                AI-modellanvändning
              </h2>
              <div className="mt-8 h-[380px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={currentModelUsage}
                      cx="50%"
                      cy="50%"
                      innerRadius="50%"
                      outerRadius="80%"
                      paddingAngle={2}
                      dataKey="value"
                      nameKey="name"
                      stroke="none"
                    >
                      {currentModelUsage.map((_, index) => (
                        <Cell key={index} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<PieTooltip />} />
                    <Legend
                      verticalAlign="bottom"
                      iconType="circle"
                      iconSize={8}
                      formatter={(value: string) => (
                        <span
                          className="text-[0.75rem] text-muted-foreground"
                          style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                        >
                          {value}
                        </span>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </SectionCard>
          </FadeIn>
        </div>
      </section>

      {/* ─── Fading divider ─── */}
      <div className="mx-auto max-w-[68.75rem] px-6">
        <div
          className="h-px"
          style={{
            background:
              "linear-gradient(to right, transparent, var(--border) 50%, transparent)",
          }}
        />
      </div>

      {/* ─── User roles + Assistant split + File uploads ─── */}
      <section className="mx-auto max-w-[68.75rem] px-6 py-12 md:py-16">
        <div className="grid gap-5 md:grid-cols-3">
          {/* User roles */}
          <FadeIn>
            <SectionCard className="h-full">
              <p
                className="text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-muted-foreground"
                style={{ fontFamily: "var(--font-geist-mono), monospace" }}
              >
                Roller
              </p>
              <h2
                className="mt-3 text-[1.5rem] tracking-[-0.04em] md:text-[2rem]"
                style={{
                  fontFamily: "var(--font-bodoni), serif",
                  fontWeight: 400,
                }}
              >
                Användarroller
              </h2>
              <div className="mt-8 h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={currentUserRoles}
                      cx="50%"
                      cy="50%"
                      innerRadius="50%"
                      outerRadius="80%"
                      paddingAngle={3}
                      dataKey="value"
                      nameKey="name"
                      stroke="none"
                    >
                      {currentUserRoles.map((_, index) => (
                        <Cell key={index} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<PieTooltip />} />
                    <Legend
                      verticalAlign="bottom"
                      iconType="circle"
                      iconSize={8}
                      formatter={(value: string) => (
                        <span
                          className="text-[0.75rem] text-muted-foreground"
                          style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                        >
                          {value}
                        </span>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </SectionCard>
          </FadeIn>

          {/* Personal vs custom */}
          <FadeIn>
            <SectionCard className="h-full">
              <p
                className="text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-muted-foreground"
                style={{ fontFamily: "var(--font-geist-mono), monospace" }}
              >
                Fördelning
              </p>
              <h2
                className="mt-3 text-[1.5rem] tracking-[-0.04em] md:text-[2rem]"
                style={{
                  fontFamily: "var(--font-bodoni), serif",
                  fontWeight: 400,
                }}
              >
                Personliga vs anpassade
              </h2>
              <div className="mt-8 h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={currentAssistantSplit}
                      cx="50%"
                      cy="50%"
                      innerRadius="50%"
                      outerRadius="80%"
                      paddingAngle={3}
                      dataKey="value"
                      nameKey="name"
                      stroke="none"
                    >
                      <Cell fill={CHART_COLORS[0]} />
                      <Cell fill={CHART_COLORS[4]} />
                    </Pie>
                    <Tooltip content={<PieTooltip />} />
                    <Legend
                      verticalAlign="bottom"
                      iconType="circle"
                      iconSize={8}
                      formatter={(value: string) => (
                        <span
                          className="text-[0.75rem] text-muted-foreground"
                          style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                        >
                          {value}
                        </span>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </SectionCard>
          </FadeIn>

        </div>

        {/* File uploads — full width */}
        <div className="mt-5">
          <FadeIn delay={0.15}>
            <SectionCard>
              <p
                className="text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-muted-foreground"
                style={{ fontFamily: "var(--font-geist-mono), monospace" }}
              >
                Uppladdningar
              </p>
              <h2
                className="mt-3 text-[1.5rem] tracking-[-0.04em] md:text-[2rem]"
                style={{
                  fontFamily: "var(--font-bodoni), serif",
                  fontWeight: 400,
                }}
              >
                Filtyper
              </h2>
              <div className="mt-8 h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={currentFileUploads}
                    margin={{ top: 0, right: 10, left: -20, bottom: 0 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="var(--border)"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="type"
                      tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                      tickLine={false}
                      axisLine={{ stroke: "var(--border)" }}
                      style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                    />
                    <YAxis
                      tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                      tickLine={false}
                      axisLine={false}
                      style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                    />
                    <Tooltip content={<ChartTooltip />} />
                    <Bar dataKey="count" name="Filer" radius={[4, 4, 0, 0]}>
                      {currentFileUploads.map((_, index) => (
                        <Cell key={index} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </SectionCard>
          </FadeIn>
        </div>
      </section>

      {/* ─── Gradient divider ─── */}
      <div className="mx-auto max-w-[68.75rem] px-6">
        <div className="h-px" style={{ background: BRAND_GRADIENT }} />
      </div>

      {/* ─── Year comparison ─── */}
      <section className="mx-auto max-w-[68.75rem] px-6 py-12 md:py-16">
        <FadeIn>
          <SectionCard>
            <p
              className="text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-muted-foreground"
              style={{ fontFamily: "var(--font-geist-mono), monospace" }}
            >
              Jämförelse
            </p>
            <h2
              className="mt-3 text-[1.5rem] tracking-[-0.04em] md:text-[2rem]"
              style={{
                fontFamily: "var(--font-bodoni), serif",
                fontWeight: 400,
              }}
            >
              2025 vs 2026
            </h2>
            <div className="mt-8 h-[320px] md:h-[380px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={yearComparison}
                  margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="var(--border)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="category"
                    tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                    tickLine={false}
                    axisLine={{ stroke: "var(--border)" }}
                    style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                    tickLine={false}
                    axisLine={false}
                    style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                  />
                  <Tooltip content={<ChartTooltip />} />
                  <Legend
                    verticalAlign="top"
                    iconType="circle"
                    iconSize={8}
                    formatter={(value: string) => (
                      <span
                        className="text-[0.75rem] text-muted-foreground"
                        style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                      >
                        {value}
                      </span>
                    )}
                  />
                  <Bar dataKey="2025" name="2025" fill={CHART_COLORS[4]} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="2026" name="2026" fill={CHART_COLORS[0]} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </SectionCard>
        </FadeIn>
      </section>

      {/* ─── Fading divider ─── */}
      <div className="mx-auto max-w-[68.75rem] px-6">
        <div
          className="h-px"
          style={{
            background:
              "linear-gradient(to right, transparent, var(--border) 50%, transparent)",
          }}
        />
      </div>

      {/* ─── Training / Education ─── */}
      <section className="mx-auto max-w-[68.75rem] px-6 py-12 md:py-16">
        <FadeIn>
          <p
            className="text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-muted-foreground"
            style={{ fontFamily: "var(--font-geist-mono), monospace" }}
          >
            Utbildning
          </p>
          <h2
            className="mt-3 text-[1.5rem] tracking-[-0.04em] md:text-[2rem]"
            style={{
              fontFamily: "var(--font-bodoni), serif",
              fontWeight: 400,
            }}
          >
            Utbildningsinsatser
          </h2>
        </FadeIn>

        {/* Training key metrics */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {[
            { label: "Workshops", formatted: String(trainingStats.workshops) },
            { label: "Individuella sessioner", formatted: String(trainingStats.individualSessions) },
            { label: "Totalt utbildade", formatted: String(trainingStats.totalTrained) },
          ].map((metric, i) => (
            <FadeIn key={metric.label} delay={i * 0.08}>
              <SectionCard>
                <p
                  className="text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-muted-foreground"
                  style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                >
                  {metric.label}
                </p>
                <CountUp
                  target={metric.formatted}
                  className="mt-3 block text-[2.25rem] tracking-[-0.04em] md:text-[2.75rem]"
                  style={{
                    fontFamily: "var(--font-bodoni), serif",
                    fontWeight: 400,
                  }}
                />
              </SectionCard>
            </FadeIn>
          ))}
        </div>

        {/* Toggle + chart */}
        <FadeIn delay={0.15}>
          <div className="mt-8">
            <SectionCard>
              <div className="flex gap-2">
                <button
                  onClick={() => setTrainingView("department")}
                  className={`rounded-full px-5 py-2 text-[0.8125rem] font-medium uppercase tracking-[0.01em] transition-all duration-150 active:scale-[0.98] ${
                    trainingView === "department"
                      ? "bg-primary text-primary-foreground"
                      : "border border-border text-muted-foreground hover:bg-secondary"
                  }`}
                  style={{
                    fontFamily: "var(--font-geist-mono), monospace",
                    ...(trainingView === "department"
                      ? {
                          boxShadow:
                            "0px 2px 1px 0px rgba(255,255,255,0.15) inset, 0px -2px 1px 0px rgba(0,0,0,0.05) inset",
                        }
                      : {}),
                  }}
                >
                  Förvaltning
                </button>
                <button
                  onClick={() => setTrainingView("role")}
                  className={`rounded-full px-5 py-2 text-[0.8125rem] font-medium uppercase tracking-[0.01em] transition-all duration-150 active:scale-[0.98] ${
                    trainingView === "role"
                      ? "bg-primary text-primary-foreground"
                      : "border border-border text-muted-foreground hover:bg-secondary"
                  }`}
                  style={{
                    fontFamily: "var(--font-geist-mono), monospace",
                    ...(trainingView === "role"
                      ? {
                          boxShadow:
                            "0px 2px 1px 0px rgba(255,255,255,0.15) inset, 0px -2px 1px 0px rgba(0,0,0,0.05) inset",
                        }
                      : {}),
                  }}
                >
                  Yrkesgrupp
                </button>
              </div>
              <div className="mt-8 h-[320px] md:h-[380px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={
                      trainingView === "department"
                        ? [...trainingStats.byDepartment].reverse()
                        : [...trainingStats.byRole].reverse()
                    }
                    layout="vertical"
                    margin={{ top: 0, right: 10, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="var(--border)"
                      horizontal={false}
                    />
                    <XAxis
                      type="number"
                      tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                      tickLine={false}
                      axisLine={{ stroke: "var(--border)" }}
                      style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                    />
                    <YAxis
                      type="category"
                      dataKey="name"
                      tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                      tickLine={false}
                      axisLine={false}
                      width={180}
                      style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                    />
                    <Tooltip content={<ChartTooltip />} />
                    <Bar dataKey="trained" name="Utbildade" radius={[0, 4, 4, 0]}>
                      {(trainingView === "department"
                        ? [...trainingStats.byDepartment].reverse()
                        : [...trainingStats.byRole].reverse()
                      ).map((_, index) => (
                        <Cell key={index} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </SectionCard>
          </div>
        </FadeIn>
      </section>

      {/* ─── Bottom gradient divider ─── */}
      <div className="mx-auto max-w-[68.75rem] px-6 pb-12">
        <div className="h-px" style={{ background: BRAND_GRADIENT }} />
      </div>
    </>
  );
}
