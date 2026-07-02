import { createFileRoute } from "@tanstack/react-router";
import { galleryImages } from "@/lib/mock/data";

export const Route = createFileRoute("/gallery")({
  head: () => ({ meta: [
    { title: "Gallery — Wanderly" },
    { name: "description", content: "Postcards from the road — moments captured on Wanderly journeys." },
  ]}),
  component: Gallery,
});

function Gallery() {
  return (
    <div className="container-x py-16 md:py-20">
      <header className="max-w-2xl">
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-gold">Gallery</span>
        <h1 className="mt-3 font-display text-4xl font-semibold md:text-5xl">Postcards from the road.</h1>
        <p className="mt-4 text-muted-foreground md:text-lg">
          Moments captured on Wanderly journeys — a mood board for your next escape.
        </p>
      </header>
      <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
        {galleryImages.map((g, i) => (
          <figure key={g.id} className="group relative break-inside-avoid overflow-hidden rounded-2xl">
            <img
              src={g.url}
              alt={g.caption}
              loading="lazy"
              className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${i % 3 === 0 ? "aspect-[4/5]" : i % 3 === 1 ? "aspect-square" : "aspect-[3/4]"}`}
            />
            <figcaption className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-ink/85 to-transparent p-4 text-sm text-cream transition-transform group-hover:translate-y-0">
              {g.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
