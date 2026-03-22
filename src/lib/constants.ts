export const BRAND_GRADIENT =
  "linear-gradient(90deg, #330f1f 0%, #c83228 13%, #fb873f 25%, #d3dd92 38%, #59824f 50%, #002414 62%, #00143d 74%, #2874d7 86%, #99c2ff 97%)";

export const NAV_LINKS = [
  { label: "Hem", href: "/" },
  { label: "Assistenter", href: "/assistenter" },
  { label: "Statistik", href: "/statistik" },
  { label: "Utbildning", href: "/utbildning" },
  { label: "Kunskapsbank", href: "/kunskapsbank" },
  { label: "Akademin", href: "/akademin" },
  { label: "Dokumentation", href: "/dokumentation" },
] as const;

export const MOBILE_TABS = [
  { label: "Hem", href: "/", icon: "Home" },
  { label: "Assistenter", href: "/assistenter", icon: "Bot" },
  { label: "Statistik", href: "/statistik", icon: "BarChart3" },
  { label: "Utbildning", href: "/utbildning", icon: "GraduationCap" },
  { label: "Mer", href: "#more", icon: "Menu" },
] as const;

export const FOOTER_LINKS = [
  {
    title: "Plattform",
    links: [
      { label: "Assistenter", href: "/assistenter" },
      { label: "Statistik", href: "/statistik" },
      { label: "Utbildning", href: "/utbildning" },
      { label: "Kunskapsbank", href: "/kunskapsbank" },
      { label: "AI-akademin", href: "/akademin" },
      { label: "Dokumentation", href: "/dokumentation" },
    ],
  },
  {
    title: "Resurser",
    links: [
      { label: "Nyheter", href: "/nyheter" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Om oss",
    links: [
      { label: "Om AI-hubben", href: "/om" },
      { label: "Kontakt", href: "/kontakt" },
    ],
  },
] as const;
