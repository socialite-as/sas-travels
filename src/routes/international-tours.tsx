import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ToursListing } from "./domestic-tours";
import { defaultFilters, applyFilters, type FiltersState } from "@/components/tour-filters";
import { tours } from "@/lib/mock/data";

export const Route = createFileRoute("/international-tours")({
  head: () => ({ meta: [
    { title: "International Tours — SAS Travels" },
    { name: "description", content: "Signature international journeys across Greece, Japan, Morocco, and more." },
  ]}),
  component: () => {
    const [filters, setFilters] = useState<FiltersState>(defaultFilters);
    const list = useMemo(() => applyFilters(tours.filter((t) => t.region === "International"), filters), [filters]);
    return <ToursListing eyebrow="Beyond borders" title="International tours" description="Six continents, one standard — private guides, exceptional stays, and itineraries you'll remember for life." filters={filters} setFilters={setFilters} list={list} />;
  },
});
