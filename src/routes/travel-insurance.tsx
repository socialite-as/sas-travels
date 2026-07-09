import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, HeartPulse, Luggage, Plane, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/travel-insurance")({
  head: () => ({ meta: [
    { title: "Travel Insurance — SAS Travels" },
    { name: "description", content: "Comprehensive travel insurance from our vetted partners. Medical, cancellation, and baggage coverage." },
  ]}),
  component: TravelInsurance,
});

const plans = [
  { name: "Essential", price: 39, features: ["Medical up to $100k", "Trip cancellation $2k", "24/7 emergency line"], badge: "" },
  { name: "Signature", price: 79, features: ["Medical up to $500k", "Trip cancellation $10k", "Lost baggage $2k", "Adventure sports"], badge: "Most popular" },
  { name: "Elite", price: 149, features: ["Unlimited medical", "Trip cancellation $25k", "Concierge medical", "Political evacuation"], badge: "" },
];

function TravelInsurance() {
  return (
    <div>
      <section className="border-b bg-muted/40">
        <div className="container-x py-20 md:py-24">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-gold">Peace of mind</span>
          <h1 className="mt-3 max-w-2xl font-display text-4xl font-semibold md:text-5xl">
            Travel insurance, properly done.
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground md:text-lg">
            Plans from world-class underwriters, filtered for the kind of travel we design. Add to any booking in one click.
          </p>
        </div>
      </section>

      <section className="container-x grid gap-6 py-16 md:grid-cols-4 md:py-20">
        {[
          { icon: HeartPulse, title: "Medical", desc: "Emergency care wherever you are." },
          { icon: Plane, title: "Trip protection", desc: "Cancellation, delays, interruptions." },
          { icon: Luggage, title: "Baggage", desc: "Loss, damage, or delay coverage." },
          { icon: ShieldCheck, title: "24/7 support", desc: "Multilingual assistance line." },
        ].map(({ icon: Icon, title, desc }) => (
          <div key={title} className="rounded-2xl border bg-card p-6">
            <div className="grid h-11 w-11 place-items-center rounded-full bg-gold/15 text-gold"><Icon className="h-5 w-5" /></div>
            <h3 className="mt-4 font-display text-lg font-semibold">{title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
          </div>
        ))}
      </section>

      <section className="border-t bg-background py-16 md:py-20">
        <div className="container-x">
          <h2 className="font-display text-3xl font-semibold md:text-4xl">Choose your plan</h2>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {plans.map((p) => (
              <div key={p.name} className={`relative rounded-2xl border bg-card p-6 hover-lift ${p.badge ? "ring-2 ring-gold" : ""}`}>
                {p.badge && <div className="absolute -top-3 left-6 rounded-full bg-gold px-3 py-1 text-xs font-semibold text-gold-foreground">{p.badge}</div>}
                <div className="font-display text-2xl font-semibold">{p.name}</div>
                <div className="mt-2 flex items-baseline gap-1"><span className="font-display text-4xl font-semibold">${p.price}</span><span className="text-sm text-muted-foreground">/traveler</span></div>
                <ul className="mt-6 space-y-2 text-sm">
                  {p.features.map((f) => <li key={f} className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 text-gold" /> {f}</li>)}
                </ul>
                <Button asChild className="mt-6 w-full"><Link to="/contact">Add to my trip</Link></Button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
