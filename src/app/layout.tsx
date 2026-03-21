import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/shared/theme-provider";
import "./globals.css";

const bodoniModa = localFont({
  src: "../../public/fonts/BodoniModa-Regular.woff2",
  variable: "--font-bodoni",
  weight: "400",
});

const generalSans = localFont({
  src: "../../public/fonts/GeneralSans-Regular.woff2",
  variable: "--font-general",
  weight: "400",
});

export const metadata: Metadata = {
  title: {
    default: "AI-hubben — Katrineholms kommun",
    template: "%s — AI-hubben",
  },
  description:
    "Katrineholms centrala plattform för AI-assistenter, statistik, utbildning och resurser.",
};

export const viewport: Viewport = {
  themeColor: "#333333",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="sv"
      className={`${GeistSans.variable} ${GeistMono.variable} ${bodoniModa.variable} ${generalSans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground" suppressHydrationWarning>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
