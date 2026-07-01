import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact — Wanderly" }, { name: "description", content: "Get in touch with our travel team." }] }),
  component: () => <PageShell title="Contact" description="We'd love to hear from you." />,
});
