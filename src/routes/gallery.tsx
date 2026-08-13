import { createFileRoute } from "@tanstack/react-router";
import { galleryImages } from "@/lib/mock/data";

export const Route = createFileRoute("/gallery")({
  head: () => ({ meta: [
    { title: "Gallery — SAS Travels" },
    { name: "description", content: "Postcards from the road — moments captured on SAS Travels journeys." },
    { property: "og:title", content: "Travel Gallery — postcards from our journeys | SAS Travels" },
    { property: "og:description", content: "Photographs from SAS Travels journeys across coastal Karnataka, Egypt, the Maldives and Southeast Asia." },
    { property: "og:url", content: "https://sas-travels.lovable.app/gallery" },
    { property: "og:type", content: "website" },
    { property: "og:image", content: "https://images.unsplash.com/photo-1502786129293-79981df4e689?w=1600&q=80&auto=format&fit=crop" },
    { name: "twitter:image", content: "https://images.unsplash.com/photo-1502786129293-79981df4e689?w=1600&q=80&auto=format&fit=crop" },
  ], links: [{ rel: "canonical", href: "https://sas-travels.lovable.app/gallery" }] }),
  component: Gallery,
});

function Gallery() {
  return (
    <div className="container-x py-16 md:py-20">
      <header className="max-w-2xl">
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-gold">Gallery</span>
        <h1 className="mt-3 font-display text-4xl font-semibold md:text-5xl">Postcards from the road.</h1>
        <p className="mt-4 text-muted-foreground md:text-lg">
          Moments captured on SAS Travels journeys — a mood board for your next escape.
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
