const MARKETPLACE_URL = "https://marketplace.intric.ai/api";

export type IntricAssistant = {
  id: string;
  name: string;
  description: string;
  assistant_link: string;
  icon_url: string | null;
  regions: string[];
  organization: string;
  created_at: string;
};

export type IntricAssistantDetail = IntricAssistant & {
  prompt: string | null;
  setup_instructions: string | null;
  submitted_by: string | null;
  status: string;
  updated_at: string;
};

export async function fetchAssistants(
  search?: string
): Promise<IntricAssistant[]> {
  const url = new URL(`${MARKETPLACE_URL}/assistants`);
  if (search) url.searchParams.set("search", search);

  const res = await fetch(url.toString(), { next: { revalidate: 300 } });
  if (!res.ok) throw new Error("Failed to fetch assistants");

  const data: IntricAssistant[] = await res.json();

  return data.filter(
    (a) => a.organization.toLowerCase() === "katrineholms kommun"
  );
}

export async function fetchAssistant(
  id: string
): Promise<IntricAssistantDetail> {
  const res = await fetch(`${MARKETPLACE_URL}/assistants/${id}`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) throw new Error("Failed to fetch assistant");
  return res.json();
}
