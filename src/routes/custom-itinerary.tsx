import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/custom-itinerary")({
  head: () => ({ meta: [
    { title: "Custom Itinerary — SAS Travels" },
    { name: "description", content: "Tell us your dream trip and a specialist will design a private itinerary — usually within 48 hours." },
  ]}),
  component: Custom,
});

function Custom() {
  const [loading, setLoading] = useState(false);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      (e.target as HTMLFormElement).reset();
      toast.success("Received — your specialist will be in touch within 48 hours.");
    }, 700);
  };

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1502786129293-79981df4e689?w=1900&q=80&auto=format&fit=crop" alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/60 to-ink/90" />
        </div>
        <div className="container-x relative py-20 text-cream md:py-28">
          <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-gold">
            <Sparkles className="h-3 w-3" /> Custom trips
          </span>
          <h1 className="mt-4 max-w-3xl font-display text-5xl font-semibold text-balance md:text-6xl">
            Tell us your dream. We'll design it.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-cream/85">
            Every custom itinerary is designed by a specialist for you. Usually within 48 hours, always free to request.
          </p>
        </div>
      </section>

      <section className="container-x py-16 md:py-20">
        <form onSubmit={submit} className="mx-auto max-w-2xl space-y-6 rounded-2xl border bg-card p-6 md:p-8">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2"><Label>Your name</Label><Input required /></div>
            <div className="space-y-2"><Label>Email</Label><Input type="email" required /></div>
            <div className="space-y-2"><Label>Destinations</Label><Input placeholder="Egypt, Japan…" /></div>
            <div className="space-y-2"><Label>Travelers</Label><Input placeholder="2 adults" /></div>
            <div className="space-y-2"><Label>Ideal start date</Label><Input type="date" /></div>
            <div className="space-y-2"><Label>Trip length</Label><Input placeholder="10 days" /></div>
            <div className="space-y-2 md:col-span-2"><Label>Budget per person (USD)</Label><Input placeholder="$3,000 – $5,000" /></div>
          </div>
          <div className="space-y-2">
            <Label>Tell us about the trip you want</Label>
            <Textarea rows={6} placeholder="Style, must-sees, pace, dietary needs — anything that would help us design your perfect itinerary." />
          </div>
          <Button type="submit" size="lg" disabled={loading}>{loading ? "Sending…" : "Request my itinerary"}</Button>
        </form>
      </section>
    </div>
  );
}
