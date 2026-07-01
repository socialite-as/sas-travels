import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";

export const Route = createFileRoute("/custom-itinerary")({
  head: () => ({ meta: [{ title: "Custom Itinerary — Wanderly" }, { name: "description", content: "Build a fully custom trip with our specialists." }] }),
  component: () => <PageShell title="Custom Itinerary" description="Design a trip made just for you." />,
});
