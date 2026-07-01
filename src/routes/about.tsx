import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "About — Wanderly" }, { name: "description", content: "Our story, mission, and team." }] }),
  component: () => <PageShell title="About" description="Meet the people crafting your journeys." />,
});
