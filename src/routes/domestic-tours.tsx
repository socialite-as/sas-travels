import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { TourCard } from "@/components/tour-card";
import { TourFilters, applyFilters, defaultFilters, type FiltersState } from "@/components/tour-filters";
import { tours } from "@/lib/mock/data";

export const Route = createFileRoute("/domestic-tours")({
  head: () => ({ meta: [
    { title: "Domestic Tours — Wanderly" },
    { name: "description", content: "Escape close to home. Handcrafted domestic tours across Egypt's oases, coasts, and mountains." },
  ]}),
  component: DomesticTours,
});

function DomesticTours() {
  const [filters, setFilters] = useState<FiltersState>(defaultFilters);
  const list = useMemo(() => applyFilters(tours.filter((t) => t.region === "Domestic"), filters), [filters]);
  return <ToursListing eyebrow="Close to home" title="Domestic tours" description="Oases, coasts, mountain sunrises — Egypt's finest weekend escapes and week-long journeys." filters={filters} setFilters={setFilters} list={list} />;
}

export function ToursListing({ eyebrow, title, description, filters, setFilters, list }: {
  eyebrow: string; title: string; description: string;
  filters: FiltersState; setFilters: (v: FiltersState) => void; list: typeof tours;
}) {
  return (
    <div className="container-x py-16 md:py-20">
      <header className="mb-10 max-w-2xl">
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-gold">{eyebrow}</span>
        <h1 className="mt-3 font-display text-4xl font-semibold md:text-5xl">{title}</h1>
        <p className="mt-4 text-muted-foreground md:text-lg">{description}</p>
      </header>
      <TourFilters value={filters} onChange={setFilters} resultsCount={list.length} />
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((t) => <TourCard key={t.id} tour={t} />)}
      </div>
      {list.length === 0 && (
        <div className="mt-12 rounded-2xl border bg-muted/30 py-16 text-center text-muted-foreground">
          No tours match your filters. Try widening your search.
        </div>
      )}
    </div>
  );
}
