import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { Destination } from "@/lib/mock/data";

export function DestinationCard({ destination, className = "" }: { destination: Destination; className?: string }) {
  return (
    <Link
      to="/destinations"
      className={`group relative block overflow-hidden rounded-2xl ${className}`}
    >
      <img
        src={destination.image}
        alt={destination.name}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5 text-cream">
        <div className="text-[11px] uppercase tracking-[0.2em] text-gold">{destination.country}</div>
        <div className="mt-1 flex items-end justify-between gap-3">
          <div>
            <h3 className="font-display text-2xl font-semibold">{destination.name}</h3>
            <p className="mt-1 text-sm text-cream/80">{destination.tagline}</p>
          </div>
          <div className="flex items-center gap-1 text-xs font-medium text-cream/90 opacity-0 transition-opacity group-hover:opacity-100">
            {destination.toursCount} tours
            <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </Link>
  );
}
