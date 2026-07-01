import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";

export const Route = createFileRoute("/blogs")({
  head: () => ({ meta: [{ title: "Blog — Wanderly" }, { name: "description", content: "Travel stories, guides, and tips." }] }),
  component: () => <PageShell title="Blog" description="Travel stories, guides, and inspiration." />,
});
