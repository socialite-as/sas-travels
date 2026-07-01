import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";

export const Route = createFileRoute("/domestic-tours")({
  head: () => ({ meta: [{ title: "Domestic Tours — Wanderly" }, { name: "description", content: "Explore curated domestic tour packages." }] }),
  component: () => <PageShell title="Domestic Tours" description="Browse handpicked tours close to home." />,
});
