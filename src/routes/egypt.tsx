import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";

export const Route = createFileRoute("/egypt")({
  head: () => ({ meta: [{ title: "Egypt Tours — Wanderly" }, { name: "description", content: "Egypt specialist tours: Pyramids, Nile cruises, Red Sea and more." }] }),
  component: () => <PageShell title="Egypt" description="From the Pyramids of Giza to the Red Sea." />,
});
