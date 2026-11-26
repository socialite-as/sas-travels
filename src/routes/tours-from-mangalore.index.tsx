import { createFileRoute, Link } from "@tanstack/react-router";
import { Plane, Train, Car, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const URL = "https://www.sastoursandtravels.com/tours-from-mangalore";
const TITLE = "Tour Packages from Mangalore & Udupi | Coorg, Chikmagalur, Gokarna — SAS Travels";
const DESC =
  "Tour packages from Mangalore and Udupi with pick-up from Mangaluru Airport (IXE) and railway stations. Coorg, Chikmagalur, Gokarna, Wayanad, temple circuits and custom trips. Get a WhatsApp quote.";
const WA = "https://wa.me/917204751900?text=" + encodeURIComponent("Hi SAS Travels, I'd like a tour package from Mangalore.");

const trips = [
  { t: "Mangalore – Coorg – Chikmagalur", d: "5 days / 4 nights · Abbey Falls, Dubare, Mullayanagiri, Belur", to: "coastal-to-highlands-escape" as const },
  { t: "Coastal Karnataka: Udupi, Murudeshwar & Gokarna", d: "3–4 days · temples, Malpe, St. Mary's Island, Om Beach", guide: true },
  { t: "South Canara temple circuit", d: "2 days / 1 night · Kateel, Dharmasthala, Kukke Subramanya, Kollur", slug: "south-canara-temple-tour-from-mangalore" },
  { t: "Mangalore to Wayanad or Munnar", d: "3–4 days · hill stays, tea estates, waterfalls", slug: "mangalore-to-wayanad-or-munnar" },
  { t: "Mysore & Ooty from Mangalore", d: "4–5 days · palaces, gardens, Nilgiri toy train", slug: "mysore-ooty-tour-from-mangalore" },
  { t: "Hampi & Badami heritage", d: "4 days · UNESCO ruins, cave temples", slug: "hampi-badami-tour-from-mangalore" },
];

export const Route = createFileRoute("/tours-from-mangalore/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify([
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Tour packages from Mangalore",
            itemListElement: trips.map((t, i) => ({ "@type": "ListItem", position: i + 1, name: t.t })),
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://www.sastoursandtravels.com/" },
              { "@type": "ListItem", position: 2, name: "Tours from Mangalore", item: URL },
            ],
          },
        ]),
      },
    ],
  }),
  component: MangalorePage,
});

function MangalorePage() {
  return (
    <div className="container-x max-w-5xl py-16 md:py-20">
      <span className="text-xs font-medium uppercase tracking-[0.2em] text-gold">Departing Mangaluru &amp; Udupi</span>
      <h1 className="mt-3 font-display text-4xl font-semibold leading-tight md:text-5xl">
        Tour packages from Mangalore
      </h1>
      <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
        Fly into Mangaluru or arrive by train — our driver meets you and the trip starts there. Every package is
        planned by our Udupi team and can be changed to suit your dates, hotels and group size.
      </p>
      <div className="mt-6"><Button asChild size="lg"><a href={WA} target="_blank" rel="noopener noreferrer"><MessageCircle className="mr-2 h-4 w-4" />Get a quote on WhatsApp</a></Button></div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border bg-card p-5"><Plane className="h-5 w-5 text-gold" /><p className="mt-2 font-semibold">Mangaluru Airport (IXE)</p><p className="text-sm text-muted-foreground">Meet &amp; greet at arrivals</p></div>
        <div className="rounded-2xl border bg-card p-5"><Train className="h-5 w-5 text-gold" /><p className="mt-2 font-semibold">Mangaluru Central &amp; Junction</p><p className="text-sm text-muted-foreground">Also Udupi railway station</p></div>
        <div className="rounded-2xl border bg-card p-5"><Car className="h-5 w-5 text-gold" /><p className="mt-2 font-semibold">Private car, local driver</p><p className="text-sm text-muted-foreground">Sedan, Innova or Tempo Traveller</p></div>
      </div>

      <h2 className="mt-14 font-display text-3xl font-semibold">Popular trips from Mangalore</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {trips.map((t) => (
          <section key={t.t} className="flex flex-col rounded-2xl border bg-card p-6">
            <h3 className="font-display text-xl font-semibold">{t.t}</h3>
            <p className="mt-2 flex-1 text-muted-foreground">{t.d}</p>
            <div className="mt-4">
              {t.to ? (
                <Button asChild size="sm"><Link to="/tours/$tourId" params={{ tourId: t.to }}>View itinerary</Link></Button>
              ) : t.guide ? (
                <Button asChild size="sm" variant="outline"><Link to="/blog/coastal-karnataka-tour-guide">Read the route</Link></Button>
              ) : t.slug ? (
                <Button asChild size="sm" variant="outline">
                  <Link to="/tours-from-mangalore/$tripSlug" params={{ tripSlug: t.slug }}>View trip details</Link>
                </Button>
              ) : (
                <Button asChild size="sm" variant="outline">
                  <a href={"https://wa.me/917204751900?text=" + encodeURIComponent(`Hi SAS Travels, I'd like a quote for: ${t.t}`)} target="_blank" rel="noopener noreferrer">Ask for a quote</a>
                </Button>
              )}
            </div>
          </section>
        ))}
      </div>

      <h2 className="mt-14 font-display text-3xl font-semibold">Why book with a local team</h2>
      <p className="mt-3 text-muted-foreground">
        We're a Govt. of Karnataka recognised <Link className="text-primary hover:underline" to="/travel-agency-udupi">travel agency in Udupi</Link>,
        an hour from Mangaluru. We know the ghat roads, temple timings and monsoon closures, and you get one coordinator
        on call for the whole trip.
      </p>

      <div className="mt-14 rounded-2xl bg-primary p-8 text-primary-foreground">
        <h2 className="font-display text-2xl font-semibold">Don't see your trip? We'll build it.</h2>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button asChild variant="secondary"><Link to="/custom-itinerary">Plan a custom trip</Link></Button>
          <Button asChild variant="outline" className="bg-transparent"><Link to="/domestic-tours">All India packages</Link></Button>
        </div>
      </div>
    </div>
  );
}