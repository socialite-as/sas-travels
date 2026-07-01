import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";

export const Route = createFileRoute("/faq")({
  head: () => ({ meta: [{ title: "FAQ — Wanderly" }, { name: "description", content: "Frequently asked questions." }] }),
  component: () => <PageShell title="FAQ" description="Answers to common questions about booking and travel." />,
});
