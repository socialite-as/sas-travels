import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ToursListing } from "./domestic-tours";
import { defaultFilters, applyFilters, type FiltersState } from "@/components/tour-filters";
import { tours } from "@/lib/mock/data";

export const Route = createFileRoute("/egypt")({
  head: () => ({ meta: [
    { title: "Egypt Tours — SAS Travels" },
    { name: "description", content: "Egypt specialists since 2010. Pyramids, Nile cruises, Red Sea, and Sinai." },
    { property: "og:image", content: "https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=1600&q=80&auto=format&fit=crop" },
    { name: "twitter:image", content: "https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=1600&q=80&auto=format&fit=crop" },
    { property: "og:title", content: "Egypt Tours — Pyramids, Nile & Red Sea | SAS Travels" },
    { property: "og:description", content: "Egypt specialists: Giza pyramids, Nile cruises, Luxor temples and Red Sea stays with private guides." },
    { property: "og:url", content: "https://sas-travels.lovable.app/egypt" },
    { property: "og:type", content: "website" },
  ], links: [{ rel: "canonical", href: "https://sas-travels.lovable.app/egypt" }] }),
  component: () => {
    const [filters, setFilters] = useState<FiltersState>(defaultFilters);
    const list = useMemo(() => applyFilters(tours.filter((t) => t.region === "Egypt"), filters), [filters]);
    return <ToursListing eyebrow="Egypt specialists" title="Journeys through Egypt" description="From the Pyramids of Giza to Nubian villages and Red Sea reefs — designed by Egyptologists we trust." filters={filters} setFilters={setFilters} list={list} />;
  },
});
