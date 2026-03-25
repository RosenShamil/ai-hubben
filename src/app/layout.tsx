import type { Metadata, Viewport } from "next";
import Script from "next/script";
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

const APP_NAME = "AI-hubben";
const APP_DEFAULT_TITLE = "AI-hubben — Katrineholms kommun";
const APP_TITLE_TEMPLATE = "%s — AI-hubben";
const APP_DESCRIPTION =
  "Katrineholms centrala plattform för AI-assistenter, statistik, utbildning och resurser.";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  icons: {
    apple: "/icons/apple-touch-icon.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
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
        <Script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="6359a9ad-536a-4b0d-b984-7845454e050b"
        />
      </body>
    </html>
  );
}
