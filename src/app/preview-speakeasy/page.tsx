"use client";

import { useState, useEffect, useRef } from "react";
import { Moon, Sun } from "lucide-react";

const GRADIENT =
  "linear-gradient(90deg, #330f1f 0%, #c83228 13%, #fb873f 25%, #d3dd92 38%, #59824f 50%, #002414 62%, #00143d 74%, #2874d7 86%, #99c2ff 97%)";

const stats = [
  { label: "Assistenter", value: "312" },
  { label: "Ställda frågor", value: "48 291" },
  { label: "Användare", value: "1 847" },
  { label: "Spaces", value: "89" },
];

const assistants = [
  {
    name: "Mötessammanfattare",
    category: "Administration",
    description: "Sammanfattar protokoll och mötesanteckningar automatiskt.",
  },
  {
    name: "Beslutsstöd socialtjänst",
    category: "Vård & omsorg",
    description: "Hjälper handläggare med beslutsunderlag och lagstöd.",
  },
  {
    name: "Upphandlingsassistent",
    category: "Juridik",
    description: "Analyserar upphandlingsdokument och identifierar risker.",
  },
];

const themes = {
  light: {
    bg: "#FAFAFA",
    bgPure: "#FFFFFF",
    fg: "#000000",
    muted: "#545454",
    mutedLight: "#969696",
    border: "#DBDBDB",
    card: "#FFFFFF",
    cardHoverBg: "#F4F4F5",
    iconBg: "#F4F4F5",
    iconBorder: "#DBDBDB",
    btnBg: "#333333",
    btnText: "#FFFFFF",
    btnShadow:
      "0px 2px 1px 0px #414141 inset, 0px -2px 1px 0px rgba(0,0,0,0.05) inset",
    btnHoverBg: "#242424",
    btnActiveShadow:
      "0px 5px 1px 0px #1a1a1a inset, 0px -2px 1px 0px rgba(21,21,21,1) inset",
    btnSecBg: "#F8F8F8",
    btnSecText: "#333333",
    btnSecBorder: "#DBDBDB",
    btnSecShadow:
      "0px 2px 1px 0px #FFF inset, 0px -2px 1px 0px rgba(0,0,0,0.1) inset",
    btnSecHoverShadow:
      "0px 2px 1px 0px #F3F3F3 inset, 0px -40px 10px 10px rgba(220,220,220,0.2) inset, 0px -2px 1px 0px rgba(0,0,0,0.05) inset",
    cardShadowHover: "0 8px 32px rgba(0,0,0,0.08)",
    navHoverBg: "#EBEBEB",
    orbColor1: "rgba(200, 50, 40, 0.12)",
    orbColor2: "rgba(40, 116, 215, 0.10)",
    orbColor3: "rgba(153, 194, 255, 0.15)",
  },
  dark: {
    bg: "#000000",
    bgPure: "#000000",
    fg: "#FAFAFA",
    muted: "#969696",
    mutedLight: "#545454",
    border: "#242424",
    card: "#121212",
    cardHoverBg: "#1A1A1A",
    iconBg: "#1A1A1A",
    iconBorder: "#242424",
    btnBg: "#F8F8F8",
    btnText: "#000000",
    btnShadow:
      "0px 2px 1px 0px #FFF inset, 0px -2px 1px 0px rgba(0,0,0,0.05) inset",
    btnHoverBg: "#E0E0E0",
    btnActiveShadow:
      "0px 5px 1px 0px #999 inset, 0px -2px 1px 0px rgba(150,150,150,1) inset",
    btnSecBg: "transparent",
    btnSecText: "#FAFAFA",
    btnSecBorder: "#333333",
    btnSecShadow: "none",
    btnSecHoverShadow: "none",
    cardShadowHover: "0 8px 32px rgba(0,0,0,0.3)",
    navHoverBg: "#242424",
    orbColor1: "rgba(200, 50, 40, 0.20)",
    orbColor2: "rgba(40, 116, 215, 0.18)",
    orbColor3: "rgba(153, 194, 255, 0.12)",
  },
};

/* ── Floating orb component ── */
function FloatingOrb({
  size,
  color,
  top,
  left,
  delay,
}: {
  size: number;
  color: string;
  top: string;
  left: string;
  delay: number;
}) {
  return (
    <div
      className="pointer-events-none absolute rounded-full"
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        top,
        left,
        filter: "blur(60px)",
        animation: `float ${8 + delay}s ease-in-out infinite`,
        animationDelay: `${delay}s`,
      }}
    />
  );
}

/* ── Travel flash card ── */
function FlashCard({
  children,
  t,
  delay,
}: {
  children: React.ReactNode;
  t: (typeof themes)["light"];
  delay: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="group relative cursor-pointer rounded-lg transition-all duration-300"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Travel flash border */}
      <div
        className="absolute -inset-px rounded-lg overflow-hidden transition-opacity duration-300"
        style={{ opacity: hovered ? 1 : 0 }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `conic-gradient(from 0deg, transparent 0%, transparent 70%, white 85%, white 95%, transparent 100%)`,
            animation: hovered ? `travel-flash 1.125s linear forwards` : "none",
            animationDelay: `${delay}s`,
          }}
        />
        {/* Gradient border underneath */}
        <div
          className="absolute inset-0 opacity-40"
          style={{ background: GRADIENT }}
        />
      </div>
      {/* Inner content */}
      <div
        className="relative rounded-lg p-7 transition-all duration-300"
        style={{
          backgroundColor: hovered ? t.cardHoverBg : t.card,
          boxShadow: hovered ? t.cardShadowHover : "none",
        }}
      >
        {children}
      </div>
    </div>
  );
}

/* ── Fade-in on scroll ── */
function FadeIn({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        filter: visible ? "blur(0)" : "blur(8px)",
        transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s, filter 0.8s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ── Nav link with bg highlight ── */
function NavLink({
  children,
  active,
  t,
}: {
  children: React.ReactNode;
  active?: boolean;
  t: (typeof themes)["light"];
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <span
      className="relative cursor-pointer px-3 py-1.5 rounded-sm transition-colors"
      style={{ color: active ? t.fg : t.muted }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span
        className="absolute inset-0 rounded-sm transition-opacity duration-300"
        style={{
          backgroundColor: t.navHoverBg,
          opacity: hovered && !active ? 1 : 0,
          zIndex: -1,
        }}
      />
      {children}
    </span>
  );
}

/* ── Button with press effect ── */
function PrimaryButton({
  children,
  t,
}: {
  children: React.ReactNode;
  t: (typeof themes)["light"];
}) {
  const [pressed, setPressed] = useState(false);

  return (
    <button
      className="rounded-full px-7 py-3 text-[0.8125rem] font-medium uppercase tracking-[0.01em] transition-all duration-150"
      style={{
        fontFamily: "var(--font-geist-mono), monospace",
        backgroundColor: pressed ? t.btnHoverBg : t.btnBg,
        color: t.btnText,
        boxShadow: pressed ? t.btnActiveShadow : t.btnShadow,
        transform: pressed ? "scale(0.98)" : "scale(1)",
      }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
    >
      {children}
    </button>
  );
}

function SecondaryButton({
  children,
  t,
}: {
  children: React.ReactNode;
  t: (typeof themes)["light"];
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      className="rounded-full px-7 py-3 text-[0.8125rem] font-medium uppercase tracking-[0.01em] transition-all duration-150"
      style={{
        fontFamily: "var(--font-geist-mono), monospace",
        backgroundColor: t.btnSecBg,
        color: t.btnSecText,
        border: `1px solid ${t.btnSecBorder}`,
        boxShadow: hovered ? t.btnSecHoverShadow : t.btnSecShadow,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </button>
  );
}

/* ── Main page ── */
export default function PreviewSpeakeasy() {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const t = themes[mode];

  return (
    <div
      className="relative min-h-screen overflow-hidden transition-colors duration-300"
      style={{
        backgroundColor: t.bg,
        color: t.fg,
        fontFamily: "var(--font-general), var(--font-geist-sans), sans-serif",
      }}
    >
      {/* CSS keyframes */}
      <style>{`
        @property --flash-rotation {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
        @keyframes travel-flash {
          0% { transform: rotate(0deg); opacity: 0; }
          1% { opacity: 1; }
          99% { opacity: 1; }
          100% { transform: rotate(360deg); opacity: 0; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-30px) translateX(15px); }
          50% { transform: translateY(-10px) translateX(-10px); }
          75% { transform: translateY(-40px) translateX(5px); }
        }
        @keyframes orbit {
          0% { transform: rotate(0deg) translateY(var(--radius)) rotate(0deg); }
          100% { transform: rotate(360deg) translateY(var(--radius)) rotate(-360deg); }
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); filter: blur(8px); }
          100% { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
      `}</style>

      {/* Rainbow top bar */}
      <div
        className="sticky top-0 z-[1000] h-1 w-full"
        style={{ background: GRADIENT }}
      />


      {/* Navbar */}
      <nav
        className="sticky top-1 z-50 transition-colors duration-300"
        style={{
          backgroundColor: t.bgPure,
          borderBottom: `1px solid ${t.border}`,
        }}
      >
        <div className="mx-auto flex h-[65px] max-w-[68.75rem] items-center justify-between px-6">
          <span className="text-[1.125rem] font-semibold tracking-tight">
            AI-hubben
          </span>
          <div className="hidden items-center gap-2 text-[0.875rem] md:flex">
            <NavLink active t={t}>Hem</NavLink>
            <NavLink t={t}>Assistenter</NavLink>
            <NavLink t={t}>Statistik</NavLink>
            <NavLink t={t}>Utbildning</NavLink>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMode(mode === "light" ? "dark" : "light")}
              className="flex h-9 w-9 items-center justify-center rounded-full transition-all duration-200"
              style={{ border: `1px solid ${t.border}` }}
              aria-label="Byt tema"
            >
              {mode === "light" ? <Moon size={16} /> : <Sun size={16} />}
            </button>
            <PrimaryButton t={t}>Logga in</PrimaryButton>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative mx-auto max-w-[68.75rem] px-6">
        <div className="flex flex-col items-center pt-28 pb-24 md:pt-36 md:pb-32">
          <FadeIn delay={0}>
            <p
              className="text-center text-[0.75rem] font-medium uppercase tracking-[0.15em]"
              style={{
                fontFamily: "var(--font-geist-mono), monospace",
                color: t.muted,
              }}
            >
              Katrineholms kommun
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <h1
              className="mt-8 max-w-[50rem] text-center text-[2.75rem] leading-[1.1] tracking-[-0.04em] md:text-[4.5rem] lg:text-[5.625rem]"
              style={{
                fontFamily: "var(--font-bodoni), serif",
                fontWeight: 400,
              }}
            >
              Kommunens
              <br />
              AI-hub
            </h1>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p
              className="mt-8 max-w-[42rem] text-center text-[1.0625rem] leading-[1.7]"
              style={{ color: t.muted }}
            >
              En samlad plattform för AI-assistenter, statistik, utbildning och
              resurser — byggd för kommunal verksamhet.
            </p>
          </FadeIn>
          <FadeIn delay={0.45}>
            <div className="mt-12 flex items-center gap-4">
              <PrimaryButton t={t}>Utforska assistenter</PrimaryButton>
              <SecondaryButton t={t}>Se statistik</SecondaryButton>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Gradient divider */}
      <div className="mx-auto max-w-[68.75rem] px-6">
        <div className="h-px" style={{ background: GRADIENT }} />
      </div>

      {/* Stats */}
      <section className="mx-auto max-w-[68.75rem] px-6 py-24 md:py-32">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
          {stats.map((stat, i) => (
            <FadeIn key={stat.label} delay={i * 0.1}>
              <div>
                <p
                  className="text-[0.6875rem] font-medium uppercase tracking-[0.15em]"
                  style={{
                    fontFamily: "var(--font-geist-mono), monospace",
                    color: t.mutedLight,
                  }}
                >
                  {stat.label}
                </p>
                <p
                  className="mt-3 text-[2.75rem] tracking-[-0.04em] md:text-[3.5rem]"
                  style={{
                    fontFamily: "var(--font-bodoni), serif",
                    fontWeight: 400,
                  }}
                >
                  {stat.value}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Fading divider */}
      <div className="mx-auto max-w-[68.75rem] px-6">
        <div
          className="h-px"
          style={{
            background: `linear-gradient(to right, transparent, ${t.border} 50%, transparent)`,
          }}
        />
      </div>

      {/* Assistants */}
      <section className="mx-auto max-w-[68.75rem] px-6 py-24 md:py-32">
        <FadeIn>
          <p
            className="text-[0.6875rem] font-medium uppercase tracking-[0.15em]"
            style={{
              fontFamily: "var(--font-geist-mono), monospace",
              color: t.mutedLight,
            }}
          >
            Populära assistenter
          </p>
          <h2
            className="mt-5 text-[2rem] tracking-[-0.04em] md:text-[2.75rem]"
            style={{
              fontFamily: "var(--font-bodoni), serif",
              fontWeight: 400,
            }}
          >
            Verktyg som förenklar vardagen
          </h2>
        </FadeIn>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {assistants.map((a, i) => (
            <FadeIn key={a.name} delay={i * 0.12}>
              <FlashCard t={t} delay={i * 0.2}>
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-md text-[0.875rem] font-medium"
                  style={{
                    backgroundColor: t.iconBg,
                    border: `1px solid ${t.iconBorder}`,
                    fontFamily: "var(--font-geist-mono), monospace",
                  }}
                >
                  {a.name[0]}
                </div>
                <h3 className="mt-5 text-[1rem] font-medium tracking-tight">
                  {a.name}
                </h3>
                <p
                  className="mt-2 text-[0.875rem] leading-[1.6]"
                  style={{ color: t.muted }}
                >
                  {a.description}
                </p>
                <p
                  className="mt-5 text-[0.6875rem] uppercase tracking-[0.1em]"
                  style={{
                    fontFamily: "var(--font-geist-mono), monospace",
                    color: t.mutedLight,
                  }}
                >
                  {a.category}
                </p>
              </FlashCard>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer
        className="relative transition-colors duration-300"
        style={{ borderTop: `1px solid ${t.border}` }}
      >
        <div
          className="mx-auto max-w-[68.75rem] px-6 py-10 text-[0.75rem]"
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            color: t.mutedLight,
          }}
        >
          AI-hubben — Katrineholms kommun © 2026
        </div>
      </footer>
    </div>
  );
}
