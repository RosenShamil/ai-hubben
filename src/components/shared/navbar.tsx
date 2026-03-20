"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Sun, Search } from "lucide-react";
import { useTheme } from "next-themes";
import { NAV_LINKS, BRAND_GRADIENT } from "@/lib/constants";

function NavLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
      className="relative px-3 py-1.5 rounded-sm text-[0.875rem] transition-colors"
      style={{ color: active ? "var(--foreground)" : "var(--muted-foreground)" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span
        className="absolute inset-0 rounded-sm transition-opacity duration-300"
        style={{
          backgroundColor: "var(--secondary)",
          opacity: hovered && !active ? 1 : 0,
          zIndex: -1,
        }}
      />
      {children}
    </Link>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {/* Rainbow top bar */}
      <div
        className="sticky top-0 z-[1000] h-1 w-full"
        style={{ background: BRAND_GRADIENT }}
      />

      {/* Navbar */}
      <nav className="sticky top-1 z-50 border-b border-border bg-card/95 backdrop-blur-md">
        <div className="mx-auto flex h-[65px] max-w-[68.75rem] items-center justify-between px-6">
          <Link
            href="/"
            className="text-[1.125rem] font-semibold tracking-tight"
          >
            AI-hubben
          </Link>

          {/* Desktop nav links */}
          <div className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                active={
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href)
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <button
              className="hidden md:flex h-9 w-9 items-center justify-center rounded-full border border-border transition-colors hover:bg-secondary"
              aria-label="Sök"
            >
              <Search size={16} />
            </button>

            {/* Theme toggle */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border transition-colors hover:bg-secondary"
              aria-label="Byt tema"
            >
              {mounted && theme === "dark" ? (
                <Sun size={16} />
              ) : (
                <Moon size={16} />
              )}
            </button>

            {/* CTA */}
            <button
              className="hidden md:block rounded-full px-5 py-2 text-[0.8125rem] font-medium uppercase tracking-[0.01em] transition-all duration-150 bg-primary text-primary-foreground"
              style={{
                fontFamily: "var(--font-geist-mono), monospace",
                boxShadow:
                  "0px 2px 1px 0px rgba(255,255,255,0.15) inset, 0px -2px 1px 0px rgba(0,0,0,0.05) inset",
              }}
            >
              Logga in
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
