"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Bot,
  BarChart3,
  GraduationCap,
  Menu,
  X,
  FileText,
  Newspaper,
  HelpCircle,
  Mail,
  Info,
} from "lucide-react";

const ICON_MAP = { Home, Bot, BarChart3, GraduationCap, Menu } as const;

const TABS = [
  { label: "Hem", href: "/", icon: "Home" as const },
  { label: "Assistenter", href: "/assistenter", icon: "Bot" as const },
  { label: "Statistik", href: "/statistik", icon: "BarChart3" as const },
  { label: "Utbildning", href: "/utbildning", icon: "GraduationCap" as const },
  { label: "Mer", href: "#more", icon: "Menu" as const },
];

const MORE_LINKS = [
  { label: "Dokumentation", href: "/dokumentation", icon: FileText },
  { label: "Nyheter", href: "/nyheter", icon: Newspaper },
  { label: "FAQ", href: "/faq", icon: HelpCircle },
  { label: "Kontakt", href: "/kontakt", icon: Mail },
  { label: "Om AI-hubben", href: "/om", icon: Info },
];

export function BottomTabBar() {
  const pathname = usePathname();
  const [moreOpen, setMoreOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      {/* More menu overlay */}
      {moreOpen && (
        <div className="fixed inset-0 z-[998] md:hidden" onClick={() => setMoreOpen(false)}>
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
          <div
            className="absolute bottom-[calc(env(safe-area-inset-bottom,0px)+4.5rem)] left-4 right-4 rounded-lg border border-border bg-card p-2 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-3 py-2 mb-1">
              <p
                className="text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-muted-foreground"
                style={{ fontFamily: "var(--font-geist-mono), monospace" }}
              >
                Mer
              </p>
              <button onClick={() => setMoreOpen(false)}>
                <X size={16} className="text-muted-foreground" />
              </button>
            </div>
            {MORE_LINKS.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMoreOpen(false)}
                  className="flex items-center gap-3 rounded-md px-3 py-3 text-[0.875rem] transition-colors hover:bg-secondary"
                  style={{
                    color: isActive(link.href)
                      ? "var(--foreground)"
                      : "var(--muted-foreground)",
                  }}
                >
                  <Icon size={18} />
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab bar */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-[999] border-t border-border bg-card/95 backdrop-blur-md md:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      >
        <div className="flex h-16 items-stretch">
          {TABS.map((tab) => {
            const Icon = ICON_MAP[tab.icon];
            const active = tab.href !== "#more" && isActive(tab.href);
            const isMore = tab.href === "#more";

            if (isMore) {
              return (
                <button
                  key="more"
                  onClick={() => setMoreOpen(!moreOpen)}
                  className="flex flex-1 flex-col items-center justify-center gap-1 transition-colors"
                  style={{
                    color: moreOpen
                      ? "var(--foreground)"
                      : "var(--muted-foreground)",
                    minWidth: 44,
                    minHeight: 44,
                  }}
                >
                  {moreOpen ? <X size={20} /> : <Icon size={20} />}
                  <span className="text-[0.625rem] font-medium">
                    {moreOpen ? "Stäng" : tab.label}
                  </span>
                </button>
              );
            }

            return (
              <Link
                key={tab.href}
                href={tab.href}
                className="flex flex-1 flex-col items-center justify-center gap-1 transition-colors"
                style={{
                  color: active
                    ? "var(--foreground)"
                    : "var(--muted-foreground)",
                  minWidth: 44,
                  minHeight: 44,
                }}
              >
                <Icon size={20} />
                <span className="text-[0.625rem] font-medium">{tab.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
