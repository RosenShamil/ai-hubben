import { fetchAssistants } from "@/lib/intric";
import { AssistantLibrary } from "@/components/assistenter/assistant-library";

export const revalidate = 60;

export const metadata = {
  title: "Assistenter — AI-hubben",
  description:
    "Utforska Katrineholms kommuns AI-assistenter. Sök och hitta verktyg som förenklar din vardag.",
};

export default async function AssistenterPage() {
  const assistants = await fetchAssistants();

  return <AssistantLibrary assistants={assistants} />;
}
