import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ToursListing } from "./domestic-tours";
import { defaultFilters, applyFilters, type FiltersState } from "@/components/tour-filters";
import { tours } from "@/lib/mock/data";

export const Route = createFileRoute("/international-tours")({
  head: () => ({ meta: [
    { title: "International Tours — SAS Travels" },
    { name: "description", content: "Signature international journeys across Greece, Japan, Morocco, and more." },
  ], links: [{ rel: "canonical", href: "https://sas-travels.lovable.app/international-tours" }] }),
  component: () => {
    const [filters, setFilters] = useState<FiltersState>(defaultFilters);
    const list = useMemo(() => applyFilters(tours.filter((t) => t.region !== "Domestic"), filters), [filters]);
    return <ToursListing eyebrow="Beyond borders" title="International tours" description="Egypt, UAE, Maldives, Thailand and Malaysia — visa support, curated stays, and itineraries built for Indian travellers." filters={filters} setFilters={setFilters} list={list} />;

  },
});
