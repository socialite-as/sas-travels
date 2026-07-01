import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";

export const Route = createFileRoute("/visa")({
  head: () => ({ meta: [{ title: "Visa Services — Wanderly" }, { name: "description", content: "Visa guidance and application assistance." }] }),
  component: () => <PageShell title="Visa" description="Guidance and support for your visa applications." />,
});
