import { createFileRoute, Outlet, Link, useLocation } from "@tanstack/react-router";
import { LayoutDashboard, ShieldAlert } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { RESOURCES } from "@/lib/admin/resources";
import { useRoles } from "@/lib/use-role";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({ meta: [{ title: "Admin — Wanderly" }] }),
  component: AdminLayout,
});

function AdminLayout() {
  const { isAdmin, isEditor, isLoading } = useRoles();
  const location = useLocation();

  if (isLoading) {
    return <PageShell title="Admin Dashboard"><p className="text-muted-foreground">Loading permissions…</p></PageShell>;
  }
  if (!isAdmin && !isEditor) {
    return (
      <PageShell title="Access denied" description="You don't have permission to access the admin area.">
        <div className="flex items-center gap-2 rounded-md border border-destructive/40 bg-destructive/5 p-4 text-sm">
          <ShieldAlert className="h-5 w-5 text-destructive" />
          Contact an administrator to request access.
        </div>
      </PageShell>
    );
  }

  const visible = RESOURCES.filter((r) => isAdmin || r.editorAccess);

  return (
    <div className="container mx-auto grid gap-6 px-4 py-8 lg:grid-cols-[220px_1fr]">
      <aside className="lg:sticky lg:top-20 lg:self-start">
        <nav className="space-y-1">
          <Link
            to="/admin"
            className={cn(
              "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition",
              location.pathname === "/admin" ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
            )}
          >
            <LayoutDashboard className="h-4 w-4" /> Overview
          </Link>
          <div className="pt-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Resources</div>
          {visible.map((r) => {
            const active = location.pathname.startsWith(`/admin/${r.key}`);
            return (
              <Link
                key={r.key}
                to="/admin/$resource"
                params={{ resource: r.key }}
                className={cn(
                  "block rounded-md px-3 py-2 text-sm transition",
                  active ? "bg-accent text-accent-foreground font-medium" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                )}
              >
                {r.label}
              </Link>
            );
          })}
        </nav>
      </aside>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
