import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/blogs")({
  head: () => ({ meta: [
    { title: "Journal — Wanderly" },
    { name: "description", content: "Travel journal: field notes, city guides, and quiet corners from the road." },
  ]}),
  component: Blogs,
});

const posts = [
  { slug: "cairo-in-a-weekend", title: "Cairo in a weekend — the specialist's edit", excerpt: "Two days, five neighborhoods, and where to eat between them.", img: "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=900&q=80&auto=format&fit=crop", date: "May 2026" },
  { slug: "sailing-the-cyclades", title: "Sailing the hidden Cyclades", excerpt: "Beyond Santorini: the quiet islands worth sailing to.", img: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=900&q=80&auto=format&fit=crop", date: "Apr 2026" },
  { slug: "kyoto-off-the-map", title: "Kyoto, off the map", excerpt: "Where to find the city's oldest teahouses and quietest gardens.", img: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=900&q=80&auto=format&fit=crop", date: "Mar 2026" },
];

function Blogs() {
  return (
    <div className="container-x py-16 md:py-20">
      <header className="max-w-2xl">
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-gold">Journal</span>
        <h1 className="mt-3 font-display text-4xl font-semibold md:text-5xl">Field notes from the road.</h1>
        <p className="mt-4 text-muted-foreground md:text-lg">
          Slow reads, city guides, and the odd love letter to a place we can't forget.
        </p>
      </header>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {posts.map((p) => (
          <Link key={p.slug} to="/blogs/$slug" params={{ slug: p.slug }} className="group overflow-hidden rounded-2xl border bg-card hover-lift">
            <div className="aspect-[4/3] overflow-hidden">
              <img src={p.img} alt={p.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="p-5">
              <div className="text-xs text-muted-foreground">{p.date}</div>
              <h3 className="mt-2 font-display text-xl font-semibold leading-snug group-hover:text-primary">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
      <PageShellExit />
    </div>
  );
}

function PageShellExit() { return null; }
// Keep import to avoid removing existing helper elsewhere.
void PageShell; void Button;
