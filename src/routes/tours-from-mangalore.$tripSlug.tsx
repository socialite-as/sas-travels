import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, CalendarDays, MapPin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mangaloreTrips } from "@/lib/mangalore-trips";

const BASE_URL = "https://www.sastoursandtravels.com";

export const Route = createFileRoute("/tours-from-mangalore/$tripSlug")({
  loader: ({ params }) => {
    const trip = mangaloreTrips.find((item) => item.slug === params.tripSlug);
    if (!trip) throw notFound();
    return trip;
  },
  head: ({ params }) => {
    const trip = mangaloreTrips.find((item) => item.slug === params.tripSlug);
    if (!trip) {
      return { meta: [{ title: "Mangalore Tour Packages | SAS Travels" }] };
    }

    const url = `${BASE_URL}/tours-from-mangalore/${trip.slug}`;
    const itinerary = trip.sections.flatMap((section) => section.days);

    return {
      meta: [
        { title: trip.seoTitle },
        { name: "description", content: trip.description },
        { property: "og:title", content: trip.seoTitle },
        { property: "og:description", content: trip.description },
        { property: "og:url", content: url },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary" },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "TouristTrip",
              name: trip.title,
              description: trip.description,
              url,
              provider: {
                "@type": "TravelAgency",
                name: "SAS Travels",
                url: BASE_URL,
              },
              itinerary: {
                "@type": "ItemList",
                itemListElement: itinerary.map((day, index) => ({
                  "@type": "ListItem",
                  position: index + 1,
                  item: {
                    "@type": "TouristAttraction",
                    name: day.title,
                    description: day.description,
                  },
                })),
              },
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/` },
                { "@type": "ListItem", position: 2, name: "Tours from Mangalore", item: `${BASE_URL}/tours-from-mangalore` },
                { "@type": "ListItem", position: 3, name: trip.title, item: url },
              ],
            },
          ]),
        },
      ],
    };
  },
  component: MangaloreTripPage,
});

function MangaloreTripPage() {
  const trip = Route.useLoaderData();
  const whatsappUrl = `https://wa.me/917204751900?text=${encodeURIComponent(
    `Hi SAS Travels, please share a quote for the ${trip.title}. I can share my dates and group size.`,
  )}`;

  return (
    <main className="container-x max-w-5xl py-12 md:py-16">
      <Link
        to="/tours-from-mangalore"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        All tours from Mangalore
      </Link>

      <header className="mt-8 max-w-3xl">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-gold">Departing Mangaluru &amp; Udupi</p>
        <h1 className="mt-3 font-display text-4xl font-semibold leading-tight md:text-5xl">{trip.title}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{trip.intro}</p>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-2"><CalendarDays className="h-4 w-4 text-gold" aria-hidden="true" />{trip.duration}</span>
          <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-gold" aria-hidden="true" />{trip.route}</span>
        </div>
        <div className="mt-7 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 h-4 w-4" aria-hidden="true" />Get a quote on WhatsApp
            </a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/custom-itinerary">Plan a custom trip</Link>
          </Button>
        </div>
      </header>

      <section className="mt-12 border-y py-8" aria-labelledby="trip-highlights">
        <h2 id="trip-highlights" className="font-display text-2xl font-semibold">Trip highlights</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {trip.highlights.map((highlight) => (
            <li key={highlight} className="flex items-start gap-3 text-muted-foreground">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />
              {highlight}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12" aria-labelledby="suggested-itinerary">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-gold">Route outline</p>
          <h2 id="suggested-itinerary" className="mt-2 font-display text-3xl font-semibold">Suggested itinerary</h2>
          <p className="mt-3 text-muted-foreground">Stops and overnight arrangements can be adjusted when you request a quote.</p>
        </div>

        <div className="mt-8 space-y-10">
          {trip.sections.map((section) => (
            <section key={section.title} aria-label={section.title}>
              {trip.sections.length > 1 && <h3 className="mb-5 font-display text-2xl font-semibold">{section.title}</h3>}
              <ol className="space-y-4">
                {section.days.map((day, index) => (
                  <li key={day.title} className="grid gap-4 rounded-md border bg-card p-5 sm:grid-cols-[5rem_1fr] sm:p-6">
                    <div className="font-display text-lg font-semibold text-gold">
                      Day {index + 1}
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-semibold">{day.title}</h3>
                      <p className="mt-2 text-muted-foreground">{day.description}</p>
                      <p className="mt-3 text-sm text-muted-foreground">
                        <span className="font-medium text-foreground">Stops:</span> {day.places.join(" · ")}
                      </p>
                      {day.overnight && (
                        <p className="mt-1 text-sm text-muted-foreground">
                          <span className="font-medium text-foreground">Overnight:</span> {day.overnight}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </div>
      </section>

      <aside className="mt-10 border-l-2 border-gold pl-4 text-sm text-muted-foreground">
        <p className="font-medium text-foreground">Planning note</p>
        <p className="mt-1">{trip.planningNote}</p>
      </aside>

      <section className="mt-14 border-t pt-10">
        <h2 className="font-display text-2xl font-semibold">Get a trip plan and quote</h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Share your travel dates, group size and preferred pickup point. SAS Travels can tailor the route and send a quote for your trip.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button asChild>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 h-4 w-4" aria-hidden="true" />Ask for your quote
            </a>
          </Button>
          <Button asChild variant="outline">
            <Link to="/tours-from-mangalore">Explore other Mangalore tours</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}