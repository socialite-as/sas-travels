import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const URL = "https://sas-travels.lovable.app/blog/coastal-karnataka-tour-guide";
const IMAGE = "https://images.unsplash.com/photo-1590123715937-e3ae7f8b4c4e?w=1200&h=630&q=80&auto=format&fit=crop";
const TITLE = "Coastal Karnataka Tour Guide: Udupi, Mangalore & Gokarna — SAS Travels";
const DESC =
  "A local's 4-day Coastal Karnataka itinerary from Mangalore to Gokarna: Udupi Sri Krishna Matha, Malpe & St. Mary's Island, Murudeshwar and the best beaches — planned by SAS Travels, Udupi.";

export const Route = createFileRoute("/blog/coastal-karnataka-tour-guide")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "article" },
      { property: "og:url", content: URL },
      { property: "og:image", content: IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: IMAGE },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify([
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Coastal Karnataka Tour Guide: Udupi, Mangalore & Gokarna",
            description: DESC,
            image: [IMAGE],
            datePublished: "2026-10-25",
            dateModified: "2026-10-25",
            mainEntityOfPage: { "@type": "WebPage", "@id": URL },
            author: { "@type": "Organization", name: "SAS Travels" },
            publisher: { "@type": "Organization", name: "SAS Travels" },
          },
          {
            "@context": "https://schema.org",
            "@type": "TouristTrip",
            name: "4-Day Coastal Karnataka Itinerary",
            touristType: ["Families", "Pilgrims", "Beach travellers"],
            itinerary: {
              "@type": "ItemList",
              itemListElement: ["Mangaluru", "Udupi", "Murudeshwar", "Gokarna"].map((name, i) => ({
                "@type": "ListItem",
                position: i + 1,
                item: { "@type": "TouristDestination", name },
              })),
            },
            provider: { "@type": "TravelAgency", name: "SAS Travels", url: "https://sas-travels.lovable.app" },
          },
        ]),
      },
    ],
  }),
  component: Guide,
});

const days = [
  {
    title: "Day 1 — Mangaluru: temples, coast and Tulu Nadu cuisine",
    body: "Arrive at Mangaluru International Airport (IXE) or Mangaluru Junction. Visit Kadri Manjunatha Temple and the Mangaladevi Temple, then St. Aloysius Chapel's painted interiors. End at Panambur or Tannirbhavi beach for sunset and a dinner of Mangalorean fish curry and neer dosa.",
  },
  {
    title: "Day 2 — Udupi: Sri Krishna Matha, Malpe and St. Mary's Island",
    body: "Drive about an hour north to Udupi. Begin at Sri Krishna Matha and the Car Street temples, then head to Malpe Beach and take the ferry to St. Mary's Island to see its hexagonal basalt columns (ferries generally run outside the monsoon). Finish at Kaup Lighthouse at golden hour.",
  },
  {
    title: "Day 3 — Kollur, Maravanthe and Murudeshwar",
    body: "Optional morning darshan at Kollur Mookambika. Stop at Maravanthe, where the highway runs between the Arabian Sea and the Souparnika river, then continue to Murudeshwar for its giant Shiva statue and seafront temple gopura.",
  },
  {
    title: "Day 4 — Gokarna's beaches",
    body: "Visit Mahabaleshwar Temple, then spend the day on Om Beach, Kudle and Half Moon beach. Return south to Udupi or Mangaluru for your onward journey.",
  },
];

function Guide() {
  return (
    <article className="container-x max-w-3xl py-16 md:py-20">
      <Link to="/blogs" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
        <ArrowLeft className="h-4 w-4" /> Back to Journal
      </Link>
      <span className="mt-6 block text-xs font-medium uppercase tracking-[0.2em] text-gold">Coastal Karnataka guide</span>
      <h1 className="mt-3 font-display text-4xl font-semibold leading-tight md:text-5xl">
        Coastal Karnataka in 4 days: Udupi, Mangalore &amp; Gokarna
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">
        We're based in Udupi, and this is the route we send our own family on. It links the region's great temples,
        quiet beaches and coastal food along the Karavali coast.
      </p>
      <img
        src={IMAGE}
        alt="Palm-lined beach on the Coastal Karnataka shoreline near Udupi at sunset"
        className="mt-8 aspect-[1200/630] w-full rounded-2xl object-cover"
        width={1200}
        height={630}
      />

      <h2 className="mt-12 font-display text-2xl font-semibold">Best time to visit</h2>
      <p className="mt-3 text-muted-foreground">
        October to March is ideal — dry, sunny and calm seas. The monsoon (June–September) brings lush greenery and
        waterfalls, but island ferries and beach activities are usually suspended.
      </p>

      <h2 className="mt-12 font-display text-2xl font-semibold">The 4-day itinerary</h2>
      <div className="mt-6 space-y-6">
        {days.map((d) => (
          <section key={d.title} className="rounded-2xl border bg-card p-6">
            <h3 className="flex items-start gap-2 font-display text-xl font-semibold">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-gold" aria-hidden="true" /> {d.title}
            </h3>
            <p className="mt-3 text-muted-foreground">{d.body}</p>
          </section>
        ))}
      </div>

      <h2 className="mt-12 font-display text-2xl font-semibold">Getting there</h2>
      <p className="mt-3 text-muted-foreground">
        Mangaluru International Airport (IXE) has flights from Bengaluru, Mumbai, Delhi and the Gulf. The Konkan Railway
        connects Mangaluru, Udupi, Murudeshwar and Gokarna Road. A private car with a local driver is the most
        comfortable way to travel the coast.
      </p>

      <div className="mt-12 rounded-2xl bg-primary p-8 text-primary-foreground">
        <h2 className="font-display text-2xl font-semibold">Let a Udupi team plan it for you</h2>
        <p className="mt-2 opacity-90">
          Private car, handpicked stays and temple timings sorted — tailored to your dates and budget in INR.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button asChild variant="secondary"><Link to="/domestic-tours">See Karnataka packages</Link></Button>
          <Button asChild variant="outline" className="bg-transparent"><Link to="/custom-itinerary">Plan a custom trip</Link></Button>
        </div>
      </div>
    </article>
  );
}
