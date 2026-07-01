import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RESOURCES } from "@/lib/admin/resources";
import { useRoles } from "@/lib/use-role";

export const Route = createFileRoute("/_authenticated/admin/")({
  component: AdminOverview,
});

function AdminOverview() {
  const { isAdmin } = useRoles();
  const visible = RESOURCES.filter((r) => isAdmin || r.editorAccess);
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage every resource in the platform.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((r) => (
          <Link key={r.key} to="/admin/$resource" params={{ resource: r.key }}>
            <Card className="transition hover:border-primary">
              <CardHeader>
                <CardTitle className="text-base">{r.label}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Manage {r.label.toLowerCase()}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
