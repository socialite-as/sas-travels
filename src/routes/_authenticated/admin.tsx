import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({ meta: [{ title: "Admin — Wanderly" }] }),
  component: () => (
    <PageShell title="Admin Dashboard" description="Manage tours, bookings, content, and users.">
      <p className="text-muted-foreground">
        Role-based access control and admin tooling will be added in a later iteration.
      </p>
    </PageShell>
  ),
});
