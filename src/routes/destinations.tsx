import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";

export const Route = createFileRoute("/destinations")({
  head: () => ({ meta: [{ title: "Destinations — Wanderly" }, { name: "description", content: "Browse destinations we cover." }] }),
  component: () => <PageShell title="Destinations" description="Every country, city, and hidden gem we cover." />,
});
