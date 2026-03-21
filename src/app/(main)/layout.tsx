import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { BottomTabBar } from "@/components/shared/bottom-tab-bar";
import { ChatWidget } from "@/components/shared/chat-widget";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="flex-1 pb-20 md:pb-0">{children}</main>
      <Footer />
      <BottomTabBar />
      <ChatWidget />
    </>
  );
}
