import type { Metadata } from "next";
import { fetchDocuments } from "@/lib/documents";
import { DokumentationPage } from "@/components/dokumentation/dokumentation-page";

export const revalidate = 60;

export const metadata: Metadata = { title: "Dokumentation" };

export default async function Page() {
  const documents = await fetchDocuments();

  return <DokumentationPage documents={documents} />;
}
