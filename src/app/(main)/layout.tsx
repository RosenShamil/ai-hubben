import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { BottomTabBar } from "@/components/shared/bottom-tab-bar";
import { ChatWidget } from "@/components/shared/chat-widget";
import { PullToRefresh } from "@/components/shared/pull-to-refresh";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:text-sm"
      >
        Hoppa till innehåll
      </a>
      <Navbar />
      <PullToRefresh>
        <main id="main-content" className="flex-1 pb-20 md:pb-0">{children}</main>
      </PullToRefresh>
      <Footer />
      <BottomTabBar />
      <ChatWidget />
    </>
  );
}
