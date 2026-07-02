import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Calendar, Check, Clock, MapPin, Shield, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { tours } from "@/lib/mock/data";

export const Route = createFileRoute("/tours/$tourId")({
  head: ({ params }) => {
    const tour = tours.find((t) => t.slug === params.tourId);
    return {
      meta: [
        { title: tour ? `${tour.title} — Wanderly` : "Tour — Wanderly" },
        { name: "description", content: tour ? `${tour.title} · ${tour.destination} · from $${tour.priceFrom}` : "Tour details" },
        ...(tour ? [{ property: "og:image", content: tour.image } as const] : []),
      ],
    };
  },
  component: TourDetails,
  notFoundComponent: () => (
    <div className="container-x py-24 text-center">
      <h1 className="font-display text-3xl font-semibold">Tour not found</h1>
      <p className="mt-2 text-muted-foreground">The tour you're looking for doesn't exist.</p>
      <Button asChild className="mt-6"><Link to="/destinations">Browse tours</Link></Button>
    </div>
  ),
});

function TourDetails() {
  const { tourId } = Route.useParams();
  const tour = tours.find((t) => t.slug === tourId);
  if (!tour) throw notFound();

  const itinerary = [
    { day: 1, title: "Arrival & welcome", desc: "Private airport transfer, welcome dinner with your specialist guide." },
    { day: 2, title: "Signature experience", desc: "The moment that defines this trip — timed to avoid crowds." },
    { day: 3, title: "Local immersion", desc: "Meet the artisans, cooks, and storytellers who make this place." },
    { day: 4, title: "Hidden corners", desc: "Places most travelers never see. Small groups only." },
    { day: 5, title: "Wellness & rest", desc: "A slow day: spa, breathwork, or a private morning at leisure." },
  ].slice(0, Math.min(5, tour.durationDays));

  return (
    <>
      <section className="relative">
        <div className="relative h-[60vh] min-h-96 overflow-hidden">
          <img src={tour.image} alt={tour.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent" />
          <div className="container-x absolute inset-x-0 bottom-0 pb-10 text-cream">
            <div className="text-xs font-medium uppercase tracking-[0.2em] text-gold">{tour.region}</div>
            <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold text-balance md:text-6xl">{tour.title}</h1>
            <div className="mt-4 flex flex-wrap items-center gap-6 text-sm text-cream/90">
              <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {tour.destination}</span>
              <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {tour.durationDays} days</span>
              <span className="flex items-center gap-1.5"><Star className="h-4 w-4 fill-gold text-gold" /> {tour.rating} ({tour.reviewsCount})</span>
            </div>
          </div>
        </div>
      </section>

      <section className="container-x grid gap-10 py-16 lg:grid-cols-[1fr_360px]">
        <div>
          <h2 className="font-display text-2xl font-semibold">Overview</h2>
          <p className="mt-4 text-muted-foreground md:text-lg">
            A meticulously paced {tour.durationDays}-day journey through {tour.destination}. Private guiding,
            hand-picked accommodations, and time built in for the unplanned moments that make a trip unforgettable.
          </p>

          <h3 className="mt-10 font-display text-xl font-semibold">Highlights</h3>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {(tour.highlights ?? ["Private guiding", "Curated accommodations", "24/7 support"]).map((h) => (
              <li key={h} className="flex items-start gap-2 text-sm">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> {h}
              </li>
            ))}
          </ul>

          <h3 className="mt-10 font-display text-xl font-semibold">Sample itinerary</h3>
          <ol className="mt-6 space-y-6 border-l pl-6">
            {itinerary.map((d) => (
              <li key={d.day} className="relative">
                <span className="absolute -left-[31px] top-0 grid h-6 w-6 place-items-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                  {d.day}
                </span>
                <div className="font-semibold">{d.title}</div>
                <div className="mt-1 text-sm text-muted-foreground">{d.desc}</div>
              </li>
            ))}
          </ol>
        </div>

        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <div className="text-xs text-muted-foreground">from</div>
            <div className="font-display text-4xl font-semibold text-primary">${tour.priceFrom.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">per person, twin share</div>
            <div className="mt-5 space-y-3 text-sm">
              <label className="flex items-center gap-3 rounded-lg border p-3">
                <Calendar className="h-4 w-4 text-gold" />
                <input type="date" className="flex-1 bg-transparent outline-none" />
              </label>
              <label className="flex items-center gap-3 rounded-lg border p-3">
                <Users className="h-4 w-4 text-gold" />
                <select className="flex-1 bg-transparent outline-none">
                  <option>2 adults</option><option>1 adult</option><option>Group (4+)</option>
                </select>
              </label>
            </div>
            <Button className="mt-5 w-full" size="lg">Request to book</Button>
            <Button asChild variant="outline" className="mt-2 w-full"><Link to="/contact">Speak with a specialist</Link></Button>
            <div className="mt-5 flex items-start gap-2 text-xs text-muted-foreground">
              <Shield className="mt-0.5 h-4 w-4 text-gold" />
              Free cancellation up to 30 days. Full financial protection.
            </div>
          </div>
        </aside>
      </section>
    </>
  );
}
