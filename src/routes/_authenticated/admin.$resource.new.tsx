import { createFileRoute, notFound } from "@tanstack/react-router";
import { ResourceForm } from "@/components/admin/resource-form";
import { getResource } from "@/lib/admin/resources";

export const Route = createFileRoute("/_authenticated/admin/$resource/new")({
  component: NewResourcePage,
});

function NewResourcePage() {
  const { resource: key } = Route.useParams();
  const resource = getResource(key);
  if (!resource) throw notFound();
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">New {resource.singular}</h1>
      <ResourceForm resource={resource} />
    </div>
  );
}
