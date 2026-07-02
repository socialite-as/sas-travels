import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, FileText, Globe, Stamp } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/visa")({
  head: () => ({ meta: [
    { title: "Visa Support — Wanderly" },
    { name: "description", content: "Concierge visa support: e-visas, invitation letters, and consular guidance." },
  ]}),
  component: Visa,
});

function Visa() {
  return (
    <div>
      <section className="border-b bg-muted/40">
        <div className="container-x py-20 md:py-24">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-gold">Visa desk</span>
          <h1 className="mt-3 max-w-2xl font-display text-4xl font-semibold md:text-5xl">Paperwork, handled.</h1>
          <p className="mt-4 max-w-2xl text-muted-foreground md:text-lg">
            Our visa desk handles invitation letters, e-visa applications, and consular guidance so you can focus on the trip.
          </p>
        </div>
      </section>

      <section className="container-x grid gap-6 py-16 md:grid-cols-3 md:py-20">
        {[
          { icon: FileText, title: "Invitation letters", desc: "Official host-country letters issued within 48 hours." },
          { icon: Globe, title: "E-visa applications", desc: "Filed on your behalf for eligible countries — nothing to print." },
          { icon: Stamp, title: "Consular guidance", desc: "Document checklists, appointment prep, and interview coaching." },
        ].map(({ icon: Icon, title, desc }) => (
          <div key={title} className="rounded-2xl border bg-card p-6 hover-lift">
            <div className="grid h-12 w-12 place-items-center rounded-full bg-gold/15 text-gold"><Icon className="h-5 w-5" /></div>
            <h3 className="mt-5 font-display text-xl font-semibold">{title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
          </div>
        ))}
      </section>

      <section className="border-t bg-primary py-20 text-primary-foreground md:py-24">
        <div className="container-x grid items-center gap-10 md:grid-cols-2">
          <div>
            <h2 className="font-display text-4xl font-semibold text-balance md:text-5xl">Included with every tour.</h2>
            <p className="mt-4 max-w-md text-primary-foreground/85 md:text-lg">
              Visa support is complimentary for all Wanderly bookings. Booking elsewhere? We offer a standalone visa service too.
            </p>
            <Button asChild size="lg" className="mt-6 bg-gold text-gold-foreground hover:bg-gold/90">
              <Link to="/contact">Request visa help</Link>
            </Button>
          </div>
          <ul className="space-y-3">
            {["Personal document checklist", "Application review by an agent", "Appointment booking assistance", "Status tracking end-to-end"].map((i) => (
              <li key={i} className="flex items-start gap-3 rounded-xl border border-primary-foreground/15 bg-primary-foreground/5 p-4">
                <Check className="mt-0.5 h-4 w-4 text-gold" /> {i}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
