import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";

export const Route = createFileRoute("/blogs/$slug")({
  head: () => ({ meta: [{ title: "Article — Wanderly" }, { name: "description", content: "Read the full article." }] }),
  component: BlogDetails,
});

function BlogDetails() {
  const { slug } = Route.useParams();
  return <PageShell title="Blog Post" description={`Article: ${slug}`} />;
}
