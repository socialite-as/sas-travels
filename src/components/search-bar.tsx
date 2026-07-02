import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Calendar, MapPin, Search, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SearchBar() {
  const navigate = useNavigate();
  const [where, setWhere] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        navigate({ to: "/destinations" });
      }}
      className="grid grid-cols-1 gap-2 rounded-2xl border bg-card/95 p-2 shadow-lg backdrop-blur md:grid-cols-[1.4fr_1fr_0.9fr_auto]"
    >
      <label className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-muted/50">
        <MapPin className="h-4 w-4 text-gold" />
        <div className="flex-1">
          <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Where</div>
          <input
            value={where}
            onChange={(e) => setWhere(e.target.value)}
            placeholder="Egypt, Kyoto, Santorini…"
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
      </label>
      <label className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-muted/50">
        <Calendar className="h-4 w-4 text-gold" />
        <div className="flex-1">
          <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">When</div>
          <input
            type="date"
            className="w-full bg-transparent text-sm outline-none"
          />
        </div>
      </label>
      <label className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-muted/50">
        <Users className="h-4 w-4 text-gold" />
        <div className="flex-1">
          <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Travelers</div>
          <select className="w-full bg-transparent text-sm outline-none">
            <option>2 adults</option>
            <option>1 adult</option>
            <option>2 adults · 1 child</option>
            <option>Group (4+)</option>
          </select>
        </div>
      </label>
      <Button type="submit" size="lg" className="h-full min-h-12 rounded-xl">
        <Search className="mr-1 h-4 w-4" /> Search
      </Button>
    </form>
  );
}
