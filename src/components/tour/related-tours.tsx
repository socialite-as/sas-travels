import { Link } from "@tanstack/react-router";
import { Clock } from "lucide-react";

type Item = {
  id: string;
  slug: string;
  title: string;
  cover_image: string | null;
  price: number | null;
  currency: string | null;
  duration_days: number | null;
};

export function RelatedTours({ items }: { items: Item[] }) {
  if (items.length === 0) return null;
  return (
    <section className="border-t bg-muted/30 py-16">
      <div className="container-x">
        <h2 className="font-display text-2xl font-semibold md:text-3xl">You may also like</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((t) => (
            <Link
              key={t.id}
              to="/tours/$tourId"
              params={{ tourId: t.slug }}
              className="group hover-lift overflow-hidden rounded-2xl border bg-card"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={t.cover_image ?? "https://images.unsplash.com/photo-1500835556837-99ac94a94552?w=800&q=80"}
                  alt={t.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="line-clamp-2 font-display text-lg font-semibold">{t.title}</h3>
                <div className="mt-3 flex items-center justify-between text-sm">
                  {t.duration_days ? (
                    <span className="flex items-center gap-1 text-muted-foreground"><Clock className="h-3.5 w-3.5" /> {t.duration_days}d</span>
                  ) : <span />}
                  {t.price != null && (
                    <span className="font-semibold text-primary">
                      {t.currency ?? "$"}{Number(t.price).toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
