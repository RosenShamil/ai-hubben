import Link from "next/link";
import { FOOTER_LINKS, BRAND_GRADIENT } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="hidden md:block border-t border-border">
      <div className="mx-auto max-w-[68.75rem] px-6 py-16">
        <div className="grid grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <p className="text-[1.125rem] font-semibold tracking-tight">
              AI-hubben
            </p>
            <p
              className="mt-3 text-[0.875rem] leading-[1.6] text-muted-foreground"
            >
              Katrineholms kommuns centrala plattform för AI.
            </p>
          </div>

          {/* Link columns */}
          {FOOTER_LINKS.map((group) => (
            <div key={group.title}>
              <p
                className="text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-muted-foreground"
                style={{ fontFamily: "var(--font-geist-mono), monospace" }}
              >
                {group.title}
              </p>
              <ul className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[0.875rem] text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 h-px w-full"
          style={{
            background: `linear-gradient(to right, transparent, var(--border) 50%, transparent)`,
          }}
        />
        <div className="mt-6 flex items-center justify-between">
          <p
            className="text-[0.75rem] text-muted-foreground"
            style={{ fontFamily: "var(--font-geist-mono), monospace" }}
          >
            © {new Date().getFullYear()} Digitaliseringsavdelningen
          </p>
          <div
            className="h-px w-24"
            style={{ background: BRAND_GRADIENT }}
          />
        </div>
      </div>
    </footer>
  );
}
