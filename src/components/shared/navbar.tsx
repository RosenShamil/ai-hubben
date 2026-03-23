"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Sun, Search, LogOut, User, Shield } from "lucide-react";
import { useTheme } from "next-themes";
import { NAV_LINKS, BRAND_GRADIENT } from "@/lib/constants";
import { SearchModal } from "@/components/shared/search-modal";
import { useAuth } from "@/components/shared/auth-provider";

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
  const [searchOpen, setSearchOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const { user, profile, isAdmin, loading: authLoading, signOut } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Ctrl+K / Cmd+K to open search
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  // Close user menu on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    if (userMenuOpen) {
      document.addEventListener("mousedown", handleClick);
      return () => document.removeEventListener("mousedown", handleClick);
    }
  }, [userMenuOpen]);

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
              onClick={() => setSearchOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border transition-colors hover:bg-secondary"
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

            {/* Auth CTA */}
            {!authLoading && (
              <div className="hidden md:block relative" ref={userMenuRef}>
                {user && profile ? (
                  <>
                    <button
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground text-[0.8125rem] font-medium transition-opacity hover:opacity-90"
                      aria-label="Användarmeny"
                    >
                      {profile.full_name
                        ? profile.full_name.charAt(0).toUpperCase()
                        : "?"}
                    </button>

                    {userMenuOpen && (
                      <div className="absolute right-0 top-12 w-56 rounded-lg border border-border bg-card p-2 shadow-lg">
                        <div className="px-3 py-2 border-b border-border mb-1">
                          <p className="text-[0.875rem] font-medium truncate">
                            {profile.full_name}
                          </p>
                          <p className="text-[0.75rem] text-muted-foreground truncate">
                            {profile.email}
                          </p>
                        </div>

                        <Link
                          href="/profil"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2 rounded-md px-3 py-2 text-[0.875rem] text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                        >
                          <User size={14} /> Min profil
                        </Link>

                        {isAdmin && (
                          <Link
                            href="/admin"
                            onClick={() => setUserMenuOpen(false)}
                            className="flex items-center gap-2 rounded-md px-3 py-2 text-[0.875rem] text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                          >
                            <Shield size={14} /> Adminpanel
                          </Link>
                        )}

                        <button
                          onClick={async () => {
                            setUserMenuOpen(false);
                            await signOut();
                          }}
                          className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-[0.875rem] text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                        >
                          <LogOut size={14} /> Logga ut
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex items-center gap-3">
                    <Link
                      href="/logga-in"
                      className="text-[0.8125rem] text-muted-foreground transition-colors hover:text-foreground"
                      style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                    >
                      Logga in
                    </Link>
                    <Link
                      href="/registrera"
                      className="rounded-full px-5 py-2 text-[0.8125rem] font-medium uppercase tracking-[0.01em] transition-all duration-150 bg-primary text-primary-foreground"
                      style={{
                        fontFamily: "var(--font-geist-mono), monospace",
                        boxShadow:
                          "0px 2px 1px 0px rgba(255,255,255,0.15) inset, 0px -2px 1px 0px rgba(0,0,0,0.05) inset",
                      }}
                    >
                      Skapa konto
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Search modal */}
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
