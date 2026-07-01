import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import { useAuth } from "@/lib/auth-provider";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — Wanderly" }] }),
  component: Dashboard,
});

function Dashboard() {
  const { user } = useAuth();
  return (
    <PageShell title="Your Dashboard" description={`Signed in as ${user?.email ?? ""}`}>
      <p className="text-muted-foreground">
        Your bookings, saved trips, and preferences will appear here.
      </p>
    </PageShell>
  );
}
