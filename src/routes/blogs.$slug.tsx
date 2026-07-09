import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/blogs/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.slug.replace(/-/g, " ")} — SAS Travels journal` },
      { name: "description", content: "SAS Travels travel journal." },
    ],
  }),
  component: BlogPost,
});

function BlogPost() {
  const { slug } = Route.useParams();
  const title = slug.replace(/-/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase());
  return (
    <article className="container-x max-w-3xl py-16 md:py-20">
      <Button asChild variant="ghost" size="sm" className="mb-8">
        <Link to="/blogs"><ArrowLeft className="mr-1 h-4 w-4" /> All posts</Link>
      </Button>
      <span className="text-xs font-medium uppercase tracking-[0.2em] text-gold">Journal</span>
      <h1 className="mt-3 font-display text-4xl font-semibold text-balance md:text-5xl">{title}</h1>
      <div className="mt-4 text-sm text-muted-foreground">May 2026 · 6 min read</div>
      <div className="mt-8 aspect-[16/9] overflow-hidden rounded-2xl">
        <img src="https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1400&q=80&auto=format&fit=crop" alt="" className="h-full w-full object-cover" />
      </div>
      <div className="prose prose-neutral dark:prose-invert mt-10 max-w-none">
        <p>
          A short read from the field. This is a placeholder article body — the full journal system will pull from
          the database once content is imported. In the meantime, imagine a slow-paced essay full of hidden addresses,
          honest recommendations, and one very good coffee shop.
        </p>
        <p>
          The best trips start with the smallest details — the right guide, the right room, the right hour of the day
          to arrive somewhere. This is where we share ours.
        </p>
      </div>
    </article>
  );
}
