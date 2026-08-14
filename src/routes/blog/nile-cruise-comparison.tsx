import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, Compass, MapPin, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/blog/nile-cruise-comparison")({
  head: () => {
    const title = "Luxury Nile Cruise Comparison Guide 2026 — SAS Travels";
    const description =
      "Compare the best luxury Nile cruise ships, Luxor vs Aswan routes, Egyptologist guides, cabins and inclusions. Plan your Egypt tour package with the SAS Travels specialists.";
    const url = "https://sas-travels.lovable.app/blog/nile-cruise-comparison";
    const image = "https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=1600&q=80&auto=format&fit=crop";
    const published = "2026-08-14";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "og:image", content: image },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: image },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Luxury Nile Cruise Comparison Guide 2026",
            description,
            image: [image],
            datePublished: published,
            dateModified: published,
            mainEntityOfPage: { "@type": "WebPage", "@id": url },
            author: { "@type": "Organization", name: "SAS Travels" },
            publisher: {
              "@type": "Organization",
              name: "SAS Travels",
              logo: {
                "@type": "ImageObject",
                url: "https://sas-travels.lovable.app/__l5e/assets-v1/12782845-78e2-4600-bc0e-28cb6f029c95/sas-travels-logo.png",
              },
            },
          }),
        },
      ],
    };
  },
  component: NileCruiseComparison,
});

const heroImg = "https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=1600&q=80&auto=format&fit=crop";
const aswanImg = "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?w=1200&q=80&auto=format&fit=crop";

const cruises = [
  {
    name: "Oberoi Zahra",
    tier: "Ultra-luxury",
    cabins: 27,
    route: "Aswan ↔ Luxor, 4–5 nights",
    guide: "Private Egyptologist per sailing",
    dining: "Fine-dining à la carte + sommelier",
    pool: "Heated pool + sun deck",
    spa: "Full-service spa & salon",
    bestFor: "Couples, milestone trips",
    inr: "₹2,85,000 – ₹4,50,000",
  },
  {
    name: "Sonesta St. George",
    tier: "Luxury",
    cabins: 47,
    route: "Aswan ↔ Luxor, 4–5 nights",
    guide: "Egyptologist-led shore excursions",
    dining: "Buffet + themed dinners",
    pool: "Outdoor pool + pool bar",
    spa: "Massage room + fitness centre",
    bestFor: "Families, groups",
    inr: "₹1,95,000 – ₹2,95,000",
  },
  {
    name: "MS Mayfair",
    tier: "Premium",
    cabins: 50,
    route: "Luxor → Aswan, 5 nights",
    guide: "Shared Egyptologist groups (8–12)",
    dining: "Open-buffet restaurant + lounge",
    pool: "Plunge pool + sun loungers",
    spa: "Basic wellness area",
    bestFor: "Value-conscious luxury seekers",
    inr: "₹1,25,000 – ₹1,85,000",
  },
  {
    name: "Sanctuary Sun Boat IV",
    tier: "Boutique",
    cabins: 20,
    route: "Luxor → Aswan, 4 nights",
    guide: "Specialist Egyptologist (small group)",
    dining: "Chef-driven seasonal menus",
    pool: "Small pool + intimate deck",
    spa: "In-cabin treatments",
    bestFor: "Solo travellers, design lovers",
    inr: "₹1,65,000 – ₹2,45,000",
  },
];

const criteria = [
  {
    icon: Star,
    title: "Ship size & amenities",
    body: "Ultra-luxury vessels carry 20–30 cabins; premium ships 45–60. Smaller ships dock closer to temples and offer quieter common decks.",
  },
  {
    icon: Compass,
    title: "Itinerary direction",
    body: "Sail Aswan to Luxor for a relaxed, upstream pace with sunrise temple visits. Sail Luxor to Aswan for a dramatic finish at Philae.",
  },
  {
    icon: Users,
    title: "Egyptologist quality",
    body: "The guide matters more than the cabin. Look for MOHA-licensed Egyptologists with small-group ratios under 1:12.",
  },
  {
    icon: MapPin,
    title: "Inclusions",
    body: "Luxury cruises bundle all shore excursions, gratuities, Wi-Fi and domestic flights. Premium lines may charge extras for Abu Simbel.",
  },
];

function NileCruiseComparison() {
  return (
    <article className="container-x max-w-4xl py-16 md:py-24">
      <Button asChild variant="ghost" size="sm" className="mb-8">
        <Link to="/blogs">
          <ArrowLeft className="mr-1 h-4 w-4" /> All journal posts
        </Link>
      </Button>

      <span className="text-xs font-medium uppercase tracking-[0.2em] text-gold">Egypt Specialists</span>
      <h1 className="mt-3 font-display text-4xl font-semibold text-balance md:text-6xl">
        Luxury Nile Cruise Comparison Guide 2026
      </h1>
      <p className="mt-5 max-w-2xl text-lg text-muted-foreground text-balance">
        How to choose the right ship, route and Egyptologist for your river journey — from boutique sailing vessels to
        ultra-luxury all-suite ships.
      </p>
      <div className="mt-6 text-sm text-muted-foreground">August 2026 · 10 min read</div>

      <div className="mt-10 aspect-[16/9] overflow-hidden rounded-2xl">
        <img
          src={heroImg}
          alt="Karnak Temple columns on the Nile at golden hour, representing a luxury Nile cruise experience"
          className="h-full w-full object-cover animate-ken-burns"
          loading="eager"
          width="1600"
          height="900"
        />
      </div>

      <div className="prose prose-neutral dark:prose-invert mt-12 max-w-none">
        <p className="lead text-xl">
          A luxury Nile cruise is the centrepiece of most Egypt tour packages. It is where the Pyramids meet the river:
          four or five nights drifting between the temples of Luxor, Edfu, Kom Ombo and Aswan, waking up to sunrise at
          Karnak and falling asleep to the call to prayer from the west bank. The right ship turns the journey into a
          private, moving hotel; the wrong one turns it into a crowded bus tour on water.
        </p>

        <p>
          At SAS Travels, we have been designing Egypt itineraries for Indian travellers for over a decade. The question
          we are asked most often is not “Which Nile cruise is cheapest?” but “Which Nile cruise is actually worth the
          money?” This guide answers that by comparing the four categories of luxury Nile cruise ships, the two main
          routing directions, and what Egyptologist quality should cost.
        </p>

        <h2 className="font-display text-3xl font-medium tracking-tight md:text-4xl">
          What to compare before you book a luxury Nile cruise
        </h2>

        <div className="not-prose my-10 grid gap-6 sm:grid-cols-2">
          {criteria.map((c) => (
            <div
              key={c.title}
              className="rounded-2xl border bg-card p-6 transition-all hover:border-gold/50 hover:shadow-sm"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/10 text-gold">
                <c.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-xl font-medium">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
            </div>
          ))}
        </div>

        <h2 className="font-display text-3xl font-medium tracking-tight md:text-4xl">
          Luxury Nile cruise ship comparison
        </h2>
        <p>
          Prices are indicative per cabin for two people on a 4–5 night sailing, including most meals and shore excursions.
          Final rates depend on season, cabin deck and whether Abu Simbel is included.
        </p>

        <div className="not-prose my-10 overflow-hidden rounded-2xl border">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50 text-left text-xs uppercase tracking-wider">
                  <th className="whitespace-nowrap px-4 py-3 font-semibold">Ship</th>
                  <th className="whitespace-nowrap px-4 py-3 font-semibold">Tier</th>
                  <th className="whitespace-nowrap px-4 py-3 font-semibold">Cabins</th>
                  <th className="whitespace-nowrap px-4 py-3 font-semibold">Route</th>
                  <th className="whitespace-nowrap px-4 py-3 font-semibold">Egyptologist</th>
                  <th className="whitespace-nowrap px-4 py-3 font-semibold">Indicative price</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {cruises.map((c) => (
                  <tr key={c.name} className="hover:bg-muted/30">
                    <td className="px-4 py-3 font-medium">
                      <div>{c.name}</div>
                      <div className="text-xs text-muted-foreground">{c.bestFor}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex rounded-full bg-gold/10 px-2.5 py-1 text-xs font-medium text-gold">
                        {c.tier}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{c.cabins}</td>
                    <td className="px-4 py-3 text-muted-foreground">{c.route}</td>
                    <td className="px-4 py-3 text-muted-foreground">{c.guide}</td>
                    <td className="px-4 py-3 font-medium text-gold">{c.inr}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <h3 className="font-display text-2xl font-medium tracking-tight">Which ship is right for you?</h3>
        <ul>
          <li>
            <strong>Choose Oberoi Zahra</strong> if you want the quietest, most intimate ship on the Nile, with a private
            Egyptologist, fine-dining menus and a spa. Best for honeymoons and anniversary trips.
          </li>
          <li>
            <strong>Choose Sonesta St. George</strong> if you need space, reliability and strong family amenities without
            giving up luxury. The balance of comfort and value is excellent.
          </li>
          <li>
            <strong>Choose MS Mayfair</strong> if you want a polished Nile cruise experience at a lower price point, with
            the option to add Abu Simbel and a private guide as upgrades.
          </li>
          <li>
            <strong>Choose Sanctuary Sun Boat IV</strong> if you prefer boutique design, chef-led dining and a small group
            of like-minded travellers.
          </li>
        </ul>

        <h2 className="font-display text-3xl font-medium tracking-tight md:text-4xl">Luxor vs Aswan: where to start?</h2>
        <div className="not-prose my-10 grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border bg-card p-6">
            <h3 className="font-display text-xl font-medium">Start in Luxor</h3>
            <p className="mt-2 text-muted-foreground">
              You begin at Karnak and the Valley of the Kings, then wind down as the landscape softens toward Aswan. The
              pacing is dramatic-to-relaxed; ideal if you want to front-load the big sites.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> Best for first-time Egypt visitors
              </li>
              <li className="flex gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> Easier flight connections via Luxor
              </li>
              <li className="flex gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> Strongest Nile valley archaeology
              </li>
            </ul>
          </div>
          <div className="rounded-2xl border bg-card p-6">
            <h3 className="font-display text-xl font-medium">Start in Aswan</h3>
            <p className="mt-2 text-muted-foreground">
              You begin at Philae and the Nubian Museum, then sail north toward the grand temples of Edfu, Kom Ombo and
              Luxor. The pacing is gentle-to-grand; ideal if you want a softer landing and a spectacular finish.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> Quieter start, less airport bustle
              </li>
              <li className="flex gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> Easier add-on to Abu Simbel
              </li>
              <li className="flex gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> Best light for photographers at sunset
              </li>
            </ul>
          </div>
        </div>

        <div className="my-12 aspect-[16/9] overflow-hidden rounded-2xl">
          <img
            src={aswanImg}
            alt="The Pyramids of Giza and Sphinx at golden hour, a common pre- or post-cruise extension for Egypt tour packages"
            className="h-full w-full object-cover"
            loading="lazy"
            width="1200"
            height="675"
          />
        </div>

        <h2 className="font-display text-3xl font-medium tracking-tight md:text-4xl">
          What an Egyptologist guide really adds
        </h2>
        <p>
          A Nile cruise without a strong guide is a sightseeing bus. A Nile cruise with an Egyptologist is a movable
          seminar on Pharaonic history, Coptic culture and modern Egyptian life. The difference shows in small moments:
          reading a cartouche together in the Temple of Hatshepsut, knowing which tomb has the best-preserved colours
          this month, or timing Karnak before the cruise ships arrive.
        </p>
        <p>
          SAS Travels vets every Egyptologist we use for language clarity, patience with Indian dietary needs and the
          ability to pace a day for mixed-age groups. We also book private guides for families and couples on premium and
          ultra-luxury sailings, even when the ship offers shared excursions.
        </p>

        <h2 className="font-display text-3xl font-medium tracking-tight md:text-4xl">
          Abu Simbel, hot-air balloons and other add-ons
        </h2>
        <p>
          Most luxury Nile cruises do not include the Abu Simbel temples by default. The excursion is a 3–4 hour round
          trip from Aswan and is worth every minute. We recommend booking it before you board, as early-morning flights
          from Aswan to Abu Simbel sell out first.
        </p>
        <p>
          Other worthwhile additions: a sunrise hot-air balloon over Luxor’s west bank, a Nubian village lunch in Aswan,
          and a private felucca sail around Elephantine Island. These are easy to bundle into your Egypt tour package at
          the planning stage.
        </p>

        <h2 className="font-display text-3xl font-medium tracking-tight md:text-4xl">
          Typical 8-day Egypt tour package with a Nile cruise
        </h2>
        <p>
          Our most booked Egypt itinerary pairs Cairo with the Nile. You spend three nights in Cairo — Pyramids, Sphinx,
          Egyptian Museum and a Coptic Cairo walk — then fly to Luxor or Aswan for a four-night cruise, ending with one
          night in Aswan or a Red Sea extension in Hurghada. Flights between cities, private transfers, all cruise meals
          and Egyptologist-led excursions are included.
        </p>

        <div className="not-prose my-10 rounded-2xl bg-primary p-8 text-primary-foreground md:p-10">
          <h3 className="font-display text-2xl font-medium md:text-3xl">
            Ready to choose your luxury Nile cruise?
          </h3>
          <p className="mt-3 max-w-2xl text-primary-foreground/80">
            Tell us your travel dates, budget and must-see sites. Our Egypt specialists will shortlist the right ship and
            route and handle every booking detail from India.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Button asChild size="lg" className="bg-gold text-gold-foreground hover:bg-gold/90">
              <Link to="/custom-itinerary">
                Plan my Egypt trip <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
              <Link to="/egypt">View Egypt tour packages</Link>
            </Button>
          </div>
        </div>

        <h2 className="font-display text-3xl font-medium tracking-tight md:text-4xl">Frequently asked questions</h2>
        <div className="not-prose space-y-6">
          <div>
            <h3 className="font-display text-lg font-medium">When is the best time for a Nile cruise?</h3>
            <p className="text-muted-foreground">
              October through April offers mild, dry weather. December and January are peak months; book at least 90 days
              ahead.
            </p>
          </div>
          <div>
            <h3 className="font-display text-lg font-medium">Are international flights included?</h3>
            <p className="text-muted-foreground">
              International flights from India are optional add-ons. All internal flights, cruise transfers and
              Egyptologist-led excursions are included in our Egypt tour packages.
            </p>
          </div>
          <div>
            <h3 className="font-display text-lg font-medium">Is vegetarian food available on board?</h3>
            <p className="text-muted-foreground">
              Yes. Luxury ships offer vegetarian, vegan and Jain-friendly options when requested in advance. We pass your
              dietary requirements to the ship before you sail.
            </p>
          </div>
          <div>
            <h3 className="font-display text-lg font-medium">How far in advance should I book?</h3>
            <p className="text-muted-foreground">
              For Oberoi Zahra and Sanctuary Sun Boat IV during peak season, book 4–6 months ahead. Premium ships can
              usually be confirmed 60–90 days out.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-16 border-t pt-10">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-sm text-muted-foreground">Written by</div>
            <div className="font-display text-lg font-medium">SAS Travels Egypt Specialists</div>
          </div>
          <Button asChild variant="outline">
            <Link to="/contact">Ask a question</Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
