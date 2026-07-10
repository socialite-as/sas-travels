import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";

export function Newsletter({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Please enter a valid email");
      return;
    }
    setLoading(true);
    // Placeholder — hook up to Supabase later.
    setTimeout(() => {
      setLoading(false);
      setEmail("");
      toast.success("Subscribed. Welcome aboard ✨");
    }, 600);
  };

  if (compact) {
    return (
      <form onSubmit={submit} className="flex w-full flex-col gap-2 sm:flex-row">
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          required
          className="flex-1"
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Subscribing…" : "Subscribe"}
        </Button>
      </form>
    );
  }

  return (
    <section className="relative overflow-hidden bg-primary py-20 text-primary-foreground md:py-24">
      <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-gold/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />
      <div className="container-x relative grid gap-10 md:grid-cols-2 md:items-center">
        <div>
          <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-gold">
            <Mail className="h-3.5 w-3.5" /> The SAS Travels dispatch
          </span>
          <h3 className="mt-4 font-display text-3xl font-semibold md:text-4xl">
            Rare journeys, delivered monthly.
          </h3>
          <p className="mt-3 max-w-md text-primary-foreground/80">
            Sunrise cruises, hidden ryokans, and first-look itineraries. No spam, one thoughtful email per month.
          </p>
        </div>
        <form onSubmit={submit} className="flex w-full flex-col gap-3 sm:flex-row">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            required
            className="h-12 flex-1 bg-background/95 text-foreground"
          />
          <Button type="submit" size="lg" variant="secondary" className="h-12 bg-gold text-gold-foreground hover:bg-gold/90" disabled={loading}>
            {loading ? "Subscribing…" : "Get the dispatch"}
          </Button>
        </form>
      </div>
    </section>
  );
}
