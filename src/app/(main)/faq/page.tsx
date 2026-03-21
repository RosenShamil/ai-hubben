import type { Metadata } from "next";
import { fetchFaqs } from "@/lib/faqs";
import { FaqPage } from "@/components/faq/faq-page";

export const metadata: Metadata = { title: "FAQ" };
export const revalidate = 60;

export default async function FAQPage() {
  const faqs = await fetchFaqs();

  return <FaqPage faqs={faqs} />;
}
