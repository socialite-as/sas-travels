import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export type FiltersState = {
  query: string;
  duration: "all" | "short" | "medium" | "long";
  price: "all" | "under1500" | "1500to3000" | "over3000";
  sort: "recommended" | "price-asc" | "price-desc" | "duration";
};

export const defaultFilters: FiltersState = {
  query: "",
  duration: "all",
  price: "all",
  sort: "recommended",
};

export function TourFilters({
  value,
  onChange,
  resultsCount,
}: {
  value: FiltersState;
  onChange: (v: FiltersState) => void;
  resultsCount: number;
}) {
  const update = <K extends keyof FiltersState>(key: K, v: FiltersState[K]) =>
    onChange({ ...value, [key]: v });

  return (
    <div className="rounded-2xl border bg-card p-4 md:p-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={value.query}
            onChange={(e) => update("query", e.target.value)}
            placeholder="Search tours, cities, experiences…"
            className="pl-9"
          />
        </div>
        <div className="grid grid-cols-3 gap-2 md:grid-cols-3">
          <select
            value={value.duration}
            onChange={(e) => update("duration", e.target.value as FiltersState["duration"])}
            className="h-10 rounded-md border bg-background px-3 text-sm"
          >
            <option value="all">Any duration</option>
            <option value="short">Up to 5 days</option>
            <option value="medium">6–8 days</option>
            <option value="long">9+ days</option>
          </select>
          <select
            value={value.price}
            onChange={(e) => update("price", e.target.value as FiltersState["price"])}
            className="h-10 rounded-md border bg-background px-3 text-sm"
          >
            <option value="all">Any price</option>
            <option value="under1500">Under $1,500</option>
            <option value="1500to3000">$1,500–$3,000</option>
            <option value="over3000">$3,000+</option>
          </select>
          <select
            value={value.sort}
            onChange={(e) => update("sort", e.target.value as FiltersState["sort"])}
            className="h-10 rounded-md border bg-background px-3 text-sm"
          >
            <option value="recommended">Recommended</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
            <option value="duration">Duration</option>
          </select>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => onChange(defaultFilters)}
          className="md:self-stretch"
        >
          Reset
        </Button>
      </div>
      <div className="mt-3 text-xs text-muted-foreground">
        Showing <span className="font-medium text-foreground">{resultsCount}</span> curated tours
      </div>
    </div>
  );
}

export function applyFilters<T extends { title: string; destination: string; priceFrom: number; durationDays: number }>(
  items: T[],
  f: FiltersState,
): T[] {
  const q = f.query.trim().toLowerCase();
  let out = items.filter((t) => {
    if (q && !`${t.title} ${t.destination}`.toLowerCase().includes(q)) return false;
    if (f.duration === "short" && t.durationDays > 5) return false;
    if (f.duration === "medium" && (t.durationDays < 6 || t.durationDays > 8)) return false;
    if (f.duration === "long" && t.durationDays < 9) return false;
    if (f.price === "under1500" && t.priceFrom >= 1500) return false;
    if (f.price === "1500to3000" && (t.priceFrom < 1500 || t.priceFrom > 3000)) return false;
    if (f.price === "over3000" && t.priceFrom <= 3000) return false;
    return true;
  });
  if (f.sort === "price-asc") out = [...out].sort((a, b) => a.priceFrom - b.priceFrom);
  if (f.sort === "price-desc") out = [...out].sort((a, b) => b.priceFrom - a.priceFrom);
  if (f.sort === "duration") out = [...out].sort((a, b) => a.durationDays - b.durationDays);
  return out;
}
