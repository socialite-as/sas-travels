import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";

export const Route = createFileRoute("/travel-insurance")({
  head: () => ({ meta: [{ title: "Travel Insurance — Wanderly" }, { name: "description", content: "Travel with peace of mind." }] }),
  component: () => <PageShell title="Travel Insurance" description="Coverage plans for every kind of traveler." />,
});
