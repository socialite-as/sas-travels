import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";

export const Route = createFileRoute("/tours/$tourId")({
  head: () => ({ meta: [{ title: "Tour Details — Wanderly" }, { name: "description", content: "Detailed information about this tour." }] }),
  component: TourDetails,
});

function TourDetails() {
  const { tourId } = Route.useParams();
  return <PageShell title="Tour Details" description={`Detailed information for tour: ${tourId}`} />;
}
