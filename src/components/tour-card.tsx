import { Link } from "@tanstack/react-router";
import { Clock, MapPin, Star } from "lucide-react";
import type { Tour } from "@/lib/mock/data";

export function TourCard({ tour }: { tour: Tour }) {
  return (
    <Link
      to="/tours/$tourId"
      params={{ tourId: tour.slug }}
      className="group hover-lift block overflow-hidden rounded-2xl border bg-card"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={tour.image}
          alt={tour.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
        <div className="absolute left-3 top-3 rounded-full bg-background/90 px-3 py-1 text-xs font-medium backdrop-blur">
          {tour.region}
        </div>
        <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-background/90 px-2.5 py-1 text-xs font-medium backdrop-blur">
          <Star className="h-3 w-3 fill-gold text-gold" />
          {tour.rating.toFixed(1)}
          <span className="text-muted-foreground">({tour.reviewsCount})</span>
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" />
          {tour.destination}
        </div>
        <h3 className="mt-2 font-display text-xl font-semibold leading-snug group-hover:text-primary">
          {tour.title}
        </h3>
        <div className="mt-4 flex items-end justify-between border-t pt-4">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            {tour.durationDays} days
          </div>
          <div className="text-right">
            <div className="text-xs text-muted-foreground">from</div>
            <div className="font-display text-xl font-semibold text-primary">
              ${tour.priceFrom.toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
