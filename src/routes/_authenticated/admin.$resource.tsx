import { createFileRoute, notFound } from "@tanstack/react-router";
import { ResourceList } from "@/components/admin/resource-list";
import { getResource } from "@/lib/admin/resources";

export const Route = createFileRoute("/_authenticated/admin/$resource")({
  component: ResourcePage,
});

function ResourcePage() {
  const { resource: key } = Route.useParams();
  const resource = getResource(key);
  if (!resource) throw notFound();
  return <ResourceList resource={resource} />;
}
