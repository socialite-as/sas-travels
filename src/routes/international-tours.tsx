import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ToursListing } from "./domestic-tours";
import { defaultFilters, applyFilters, type FiltersState } from "@/components/tour-filters";
import { tours } from "@/lib/mock/data";

export const Route = createFileRoute("/international-tours")({
  head: () => ({ meta: [
    { title: "International Tours — SAS Travels" },
    { name: "description", content: "Signature international journeys across Greece, Japan, Morocco, and more." },
    { property: "og:title", content: "International Tours | SAS Travels" },
    { property: "og:description", content: "Signature international holidays to Egypt, UAE, Maldives, Thailand and Malaysia with all-inclusive INR pricing." },
    { property: "og:url", content: "https://sas-travels.lovable.app/international-tours" },
    { property: "og:type", content: "website" },
    { property: "og:image", content: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1600&q=80&auto=format&fit=crop" },
    { name: "twitter:image", content: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1600&q=80&auto=format&fit=crop" },
  ], links: [{ rel: "canonical", href: "https://sas-travels.lovable.app/international-tours" }] }),
  component: () => {
    const [filters, setFilters] = useState<FiltersState>(defaultFilters);
    const list = useMemo(() => applyFilters(tours.filter((t) => t.region !== "Domestic"), filters), [filters]);
    return <ToursListing eyebrow="Beyond borders" title="International tours" description="Egypt, UAE, Maldives, Thailand and Malaysia — visa support, curated stays, and itineraries built for Indian travellers." filters={filters} setFilters={setFilters} list={list} />;

  },
});
