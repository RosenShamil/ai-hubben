import type { Metadata } from "next";
import { KunskapsbankPage } from "@/components/kunskapsbank/kunskapsbank-page";

export const metadata: Metadata = {
  title: "Kunskapsbank",
  description:
    "Alla AI- och IT-begrepp förklarade enkelt — från nybörjare till avancerad nivå.",
};

export default function Page() {
  return <KunskapsbankPage />;
}
