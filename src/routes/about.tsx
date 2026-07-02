import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, Compass, Globe, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatsStrip } from "@/components/stats-strip";
import { TestimonialsSection } from "@/components/testimonials-section";
import { SectionHeading } from "@/components/section-heading";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [
    { title: "About — Wanderly" },
    { name: "description", content: "Fifteen years designing meaningful journeys. Meet the specialists behind Wanderly." },
  ]}),
  component: About,
});

function About() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=1900&q=80&auto=format&fit=crop" alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/60 to-ink/90" />
        </div>
        <div className="container-x relative py-24 text-cream md:py-32">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-gold">About Wanderly</span>
          <h1 className="mt-4 max-w-3xl font-display text-5xl font-semibold text-balance md:text-6xl">
            We plan the trips we'd want to take.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-cream/85">
            Wanderly is a specialist travel studio founded on a simple idea — the best trips are quietly designed,
            beautifully paced, and remembered forever.
          </p>
        </div>
      </section>

      <StatsStrip />

      <section className="container-x py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
            <img src="https://images.unsplash.com/photo-1521295121783-8a321d551ad2?w=1200&q=80&auto=format&fit=crop" alt="Founders" className="h-full w-full object-cover" />
          </div>
          <div>
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-gold">Our story</span>
            <h2 className="mt-3 font-display text-4xl font-semibold text-balance">Fifteen years, one obsession.</h2>
            <p className="mt-5 text-muted-foreground md:text-lg">
              We started in a small Cairo office in 2010 with three Egyptologists and a promise: to make travel more
              intimate, more informed, and more human. Today we design trips across 42 countries — and the promise hasn't changed.
            </p>
            <p className="mt-4 text-muted-foreground md:text-lg">
              Every itinerary is built by hand. Every guide is chosen for the way they tell a story. Every guest
              gets a specialist on speed dial — because trips this considered deserve nothing less.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-muted/40 py-20 md:py-28">
        <div className="container-x">
          <SectionHeading eyebrow="Values" title="What we believe" align="center" />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Heart, title: "Human first", desc: "Real relationships with local partners, not marketplace transactions." },
              { icon: Compass, title: "Considered pace", desc: "We build in space — for a nap, a second coffee, a quiet moment." },
              { icon: Award, title: "Uncompromising quality", desc: "Every property, guide, and vehicle is vetted personally." },
              { icon: Globe, title: "Responsible travel", desc: "Fair wages, local sourcing, and 1% of every booking supports conservation." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-2xl border bg-card p-6 hover-lift">
                <div className="grid h-12 w-12 place-items-center rounded-full bg-gold/15 text-gold"><Icon className="h-5 w-5" /></div>
                <h3 className="mt-5 font-display text-xl font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection />

      <section className="container-x py-20 text-center md:py-28">
        <h2 className="font-display text-4xl font-semibold text-balance md:text-5xl">Let's design your next journey.</h2>
        <p className="mx-auto mt-4 max-w-lg text-muted-foreground md:text-lg">
          Speak with a specialist and we'll start sketching something beautiful.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg"><Link to="/contact">Contact us</Link></Button>
          <Button asChild variant="outline" size="lg"><Link to="/custom-itinerary">Custom itinerary</Link></Button>
        </div>
      </section>
    </>
  );
}
