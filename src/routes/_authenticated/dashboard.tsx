import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/page-shell";
import { useAuth } from "@/lib/auth-provider";
import { useRoles } from "@/lib/use-role";
import { makeMeAdmin } from "@/lib/admin-seed.functions";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — Wanderly" }] }),
  component: Dashboard,
});

function Dashboard() {
  const { user } = useAuth();
  const { isAdmin, isLoading } = useRoles();
  const promote = useServerFn(makeMeAdmin);
  const qc = useQueryClient();
  const [busy, setBusy] = useState(false);

  const onPromote = async () => {
    setBusy(true);
    try {
      await promote();
      toast.success("You're now an admin. Reloading permissions…");
      await qc.invalidateQueries({ queryKey: ["user-roles"] });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to grant admin");
    } finally {
      setBusy(false);
    }
  };

  return (
    <PageShell title="Your Dashboard" description={`Signed in as ${user?.email ?? ""}`}>
      <div className="not-prose grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border bg-card p-6">
          <ShieldCheck className="h-6 w-6 text-gold" />
          <h3 className="mt-4 font-display text-xl font-semibold">Admin access</h3>
          {isLoading ? (
            <p className="mt-2 text-sm text-muted-foreground">Checking your permissions…</p>
          ) : isAdmin ? (
            <>
              <p className="mt-2 text-sm text-muted-foreground">You have admin access to the full CMS.</p>
              <Button asChild className="mt-4"><Link to="/admin">Open admin dashboard</Link></Button>
            </>
          ) : (
            <>
              <p className="mt-2 text-sm text-muted-foreground">
                Grant yourself admin to manage tours, blogs, bookings and more. (Demo bootstrap — remove in production.)
              </p>
              <Button onClick={onPromote} disabled={busy} className="mt-4">
                <Sparkles className="mr-1 h-4 w-4" /> {busy ? "Granting…" : "Make me admin"}
              </Button>
            </>
          )}
        </div>
        <div className="rounded-2xl border bg-card p-6">
          <h3 className="font-display text-xl font-semibold">Your trips</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Bookings, saved trips, and preferences will appear here soon.
          </p>
          <Button asChild variant="outline" className="mt-4"><Link to="/destinations">Browse tours</Link></Button>
        </div>
      </div>
    </PageShell>
  );
}
