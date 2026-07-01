import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";

export const Route = createFileRoute("/international-tours")({
  head: () => ({ meta: [{ title: "International Tours — Wanderly" }, { name: "description", content: "Discover international tour packages across the globe." }] }),
  component: () => <PageShell title="International Tours" description="Journeys across every continent." />,
});
