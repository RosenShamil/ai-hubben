"use client";

import { ThemeToggle } from "@/components/shared/theme-toggle";

const stats = [
  { label: "AI-assistenter", value: "312", change: "+12 denna månad" },
  { label: "Ställda frågor", value: "48 291", change: "+2 340 denna vecka" },
  { label: "Aktiva användare", value: "1 847", change: "+156 denna månad" },
  { label: "Spaces", value: "89", change: "+7 denna månad" },
];

const assistants = [
  { name: "Mötessammanfattare", category: "Administration", model: "GPT-4" },
  { name: "Beslutsstöd socialtjänst", category: "Vård & omsorg", model: "Claude" },
  { name: "Upphandlingsassistent", category: "Juridik", model: "GPT-4" },
];

export default function Preview() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navbar preview */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary" />
            <span className="text-lg font-semibold tracking-tight">AI-hubben</span>
          </div>
          <div className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
            <span className="text-foreground">Hem</span>
            <span className="hover:text-foreground transition-colors cursor-pointer">Assistenter</span>
            <span className="hover:text-foreground transition-colors cursor-pointer">Statistik</span>
            <span className="hover:text-foreground transition-colors cursor-pointer">Utbildning</span>
            <span className="hover:text-foreground transition-colors cursor-pointer">Dokumentation</span>
          </div>
          <ThemeToggle />
        </div>
      </nav>

      <main className="mx-auto max-w-6xl px-6 py-12">
        {/* Hero */}
        <section className="py-16 text-center">
          <h1 className="text-5xl font-bold tracking-tight md:text-6xl">
            AI-hubben{" "}
            <span className="bg-gradient-to-r from-[#06B6D4] via-primary to-accent bg-clip-text text-transparent">
              Katrineholm
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Kommunens centrala plattform för AI-assistenter, statistik, utbildning och resurser.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <button className="rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
              Utforska assistenter
            </button>
            <button className="rounded-lg border border-border px-6 py-3 text-sm font-medium transition-colors hover:bg-secondary">
              Se statistik
            </button>
          </div>
        </section>

        {/* Stat cards */}
        <section className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group rounded-xl border border-border bg-card p-6 transition-shadow hover:shadow-lg"
            >
              <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
              <p className="mt-2 text-3xl font-bold tracking-tight">{stat.value}</p>
              <p className="mt-1 text-xs text-primary">{stat.change}</p>
            </div>
          ))}
        </section>

        {/* Assistant cards */}
        <section className="mt-16">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold tracking-tight">Populära assistenter</h2>
            <span className="text-sm font-medium text-primary cursor-pointer hover:underline">
              Visa alla →
            </span>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {assistants.map((a) => (
              <div
                key={a.name}
                className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary text-lg font-bold">
                    {a.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold">{a.name}</p>
                    <p className="text-sm text-muted-foreground">{a.category}</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <span className="rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground">
                    {a.model}
                  </span>
                  <span className="rounded-md bg-accent/10 px-2 py-1 text-xs font-medium text-accent">
                    Populär
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Color palette reference */}
        <section className="mt-20 rounded-xl border border-border bg-card p-8">
          <h3 className="text-lg font-semibold mb-6">Färgpalett (referens)</h3>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div>
              <div className="h-16 rounded-lg bg-primary" />
              <p className="mt-2 text-xs text-muted-foreground">Primary — #2563EB</p>
            </div>
            <div>
              <div className="h-16 rounded-lg bg-accent" />
              <p className="mt-2 text-xs text-muted-foreground">Accent — #7C3AED</p>
            </div>
            <div>
              <div className="h-16 rounded-lg bg-[#06B6D4]" />
              <p className="mt-2 text-xs text-muted-foreground">Cyan — #06B6D4</p>
            </div>
            <div>
              <div className="h-16 rounded-lg bg-gradient-to-r from-[#06B6D4] via-primary to-accent" />
              <p className="mt-2 text-xs text-muted-foreground">Gradient — Cyan → Blå → Lila</p>
            </div>
            <div>
              <div className="h-16 rounded-lg bg-background border border-border" />
              <p className="mt-2 text-xs text-muted-foreground">Background</p>
            </div>
            <div>
              <div className="h-16 rounded-lg bg-card border border-border" />
              <p className="mt-2 text-xs text-muted-foreground">Card</p>
            </div>
            <div>
              <div className="h-16 rounded-lg bg-secondary" />
              <p className="mt-2 text-xs text-muted-foreground">Secondary</p>
            </div>
            <div>
              <div className="h-16 rounded-lg bg-muted" />
              <p className="mt-2 text-xs text-muted-foreground">Muted</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer preview */}
      <footer className="mt-20 border-t border-border bg-card">
        <div className="mx-auto max-w-6xl px-6 py-8 text-center text-sm text-muted-foreground">
          AI-hubben — Katrineholms kommun © 2026
        </div>
      </footer>
    </div>
  );
}
