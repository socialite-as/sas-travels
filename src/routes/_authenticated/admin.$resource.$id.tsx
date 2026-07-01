import { createFileRoute, notFound } from "@tanstack/react-router";
import { ResourceForm } from "@/components/admin/resource-form";
import { getResource } from "@/lib/admin/resources";

export const Route = createFileRoute("/_authenticated/admin/$resource/$id")({
  component: EditResourcePage,
});

function EditResourcePage() {
  const { resource: key, id } = Route.useParams();
  const resource = getResource(key);
  if (!resource) throw notFound();
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Edit {resource.singular}</h1>
      <ResourceForm resource={resource} recordId={id} />
    </div>
  );
}
