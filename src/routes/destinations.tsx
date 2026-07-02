import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DestinationCard } from "@/components/destination-card";
import { destinations } from "@/lib/mock/data";

export const Route = createFileRoute("/destinations")({
  head: () => ({ meta: [
    { title: "Destinations — Wanderly" },
    { name: "description", content: "Every country, city, and hidden gem we cover — from Cairo to Kyoto." },
  ]}),
  component: DestinationsPage,
});

function DestinationsPage() {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState<"all" | "Egypt" | "Domestic" | "International">("all");
  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return destinations.filter((d) => {
      if (region !== "all" && d.region !== region) return false;
      if (q && !`${d.name} ${d.country} ${d.tagline}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [query, region]);

  return (
    <div className="container-x py-16 md:py-20">
      <header className="mb-10 max-w-2xl">
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-gold">Destinations</span>
        <h1 className="mt-3 font-display text-4xl font-semibold md:text-5xl">Where will you go next?</h1>
        <p className="mt-4 text-muted-foreground md:text-lg">
          Every destination is personally scouted. Choose one — or let us help you build a multi-stop journey.
        </p>
      </header>

      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search destinations" className="pl-9" />
        </div>
        <div className="flex flex-wrap gap-2">
          {(["all", "Egypt", "Domestic", "International"] as const).map((r) => (
            <Button
              key={r}
              variant={region === r ? "default" : "outline"}
              size="sm"
              onClick={() => setRegion(r)}
            >
              {r === "all" ? "All regions" : r}
            </Button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((d) => (
          <div key={d.slug} className="aspect-[4/5]">
            <DestinationCard destination={d} className="h-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
