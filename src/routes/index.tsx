import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Award, Compass, Globe, Headphones, Shield, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/search-bar";
import { SectionHeading } from "@/components/section-heading";
import { TourCard } from "@/components/tour-card";
import { DestinationCard } from "@/components/destination-card";
import { StatsStrip } from "@/components/stats-strip";
import { TestimonialsSection } from "@/components/testimonials-section";
import { Newsletter } from "@/components/newsletter";
import { destinations, tours } from "@/lib/mock/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Wanderly — Rare journeys, thoughtfully crafted" },
      { name: "description", content: "Luxury tours across Egypt and the world. Signature itineraries, private guides, and custom-built escapes." },
      { property: "og:title", content: "Wanderly — Rare journeys, thoughtfully crafted" },
      { property: "og:description", content: "Signature tours across Egypt and the world." },
      { property: "og:image", content: "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?w=1600&q=80&auto=format&fit=crop" },
      { name: "twitter:image", content: "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?w=1600&q=80&auto=format&fit=crop" },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = tours.filter((t) => t.featured);
  const heroDestinations = destinations.slice(0, 6);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?w=1900&q=80&auto=format&fit=crop"
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/50 to-ink/85" />
        </div>
        <div className="container-x relative flex min-h-[85vh] flex-col justify-end py-20 md:py-28">
          <div className="max-w-3xl text-cream animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="inline-flex items-center gap-2 rounded-full border border-cream/20 bg-cream/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-cream backdrop-blur">
              <Sparkles className="h-3 w-3 text-gold" /> 2026 collection · Now booking
            </span>
            <h1 className="mt-6 font-display text-5xl font-semibold leading-[0.95] text-balance md:text-6xl lg:text-7xl">
              Rare journeys,<br />thoughtfully crafted.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-cream/85">
              From the shadow of the pyramids to the cliffs of Santorini — signature itineraries,
              private guides, and every detail considered.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-gold text-gold-foreground hover:bg-gold/90">
                <Link to="/destinations">Explore destinations <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-cream/30 bg-cream/5 text-cream hover:bg-cream/15 hover:text-cream">
                <Link to="/custom-itinerary">Design a custom trip</Link>
              </Button>
            </div>
          </div>
          <div className="relative z-10 mt-12">
            <SearchBar />
          </div>
        </div>
      </section>

      <StatsStrip />

      {/* DESTINATIONS BENTO */}
      <section className="py-20 md:py-28">
        <div className="container-x">
          <SectionHeading
            eyebrow="Destinations"
            title="Where would you like to be next week?"
            description="Handpicked places our travelers return to again and again."
            action={
              <Button asChild variant="ghost">
                <Link to="/destinations">View all <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
            }
          />
          <div className="mt-10 grid gap-4 md:grid-cols-4 md:grid-rows-2 md:h-[560px]">
            <DestinationCard destination={heroDestinations[0]} className="md:col-span-2 md:row-span-2" />
            <DestinationCard destination={heroDestinations[1]} />
            <DestinationCard destination={heroDestinations[2]} />
            <DestinationCard destination={heroDestinations[3]} />
            <DestinationCard destination={heroDestinations[4]} />
          </div>
        </div>
      </section>

      {/* FEATURED TOURS */}
      <section className="bg-muted/40 py-20 md:py-28">
        <div className="container-x">
          <SectionHeading
            eyebrow="Featured tours"
            title="This season's most-loved journeys"
            description="Curated by our specialists, refined by feedback from hundreds of travelers."
            action={
              <div className="hidden gap-2 md:flex">
                <Button asChild variant="outline"><Link to="/domestic-tours">Domestic</Link></Button>
                <Button asChild variant="outline"><Link to="/international-tours">International</Link></Button>
                <Button asChild><Link to="/egypt">Egypt</Link></Button>
              </div>
            }
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((t) => <TourCard key={t.id} tour={t} />)}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="py-20 md:py-28">
        <div className="container-x">
          <SectionHeading
            eyebrow="Why Wanderly"
            title="The difference is in the detail"
            align="center"
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Award, title: "Specialist-designed", desc: "Every itinerary is built by regional experts, not algorithms." },
              { icon: Compass, title: "Private guides", desc: "Licensed local guides who know the stories behind the sites." },
              { icon: Headphones, title: "24/7 concierge", desc: "A dedicated planner and on-trip support at any hour." },
              { icon: Shield, title: "Fully protected", desc: "Financial protection and flexible cancellation on every booking." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-2xl border bg-card p-6 hover-lift">
                <div className="grid h-12 w-12 place-items-center rounded-full bg-gold/15 text-gold">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection />

      {/* EGYPT SPOTLIGHT */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="container-x grid items-center gap-12 md:grid-cols-2">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
            <img
              src="https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=1200&q=80&auto=format&fit=crop"
              alt="Luxor temples"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-gold">Egypt specialists</span>
            <h2 className="mt-3 font-display text-4xl font-semibold text-balance md:text-5xl">
              7,000 years of stories, told the way they deserve.
            </h2>
            <p className="mt-5 text-muted-foreground md:text-lg">
              We've spent 15 years crafting the finest way to experience Egypt — Cairo's chaos, the Nile's silence,
              and Sinai's stars. Every guide is a licensed Egyptologist. Every detail, ours to worry about.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg"><Link to="/egypt">Explore Egypt tours</Link></Button>
              <Button asChild variant="outline" size="lg"><Link to="/custom-itinerary">Design your own</Link></Button>
            </div>
          </div>
        </div>
      </section>

      <Newsletter />

      {/* FINAL CTA */}
      <section className="py-20 md:py-28">
        <div className="container-x">
          <div className="rounded-3xl border bg-card p-10 text-center md:p-16">
            <Globe className="mx-auto h-10 w-10 text-gold" />
            <h2 className="mt-6 font-display text-4xl font-semibold text-balance md:text-5xl">
              Ready when you are.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground md:text-lg">
              Speak with a specialist, or browse curated tours ready to book today.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg"><Link to="/contact">Speak with a specialist</Link></Button>
              <Button asChild size="lg" variant="outline"><Link to="/destinations">Browse tours</Link></Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
