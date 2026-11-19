import { createFileRoute, Link } from "@tanstack/react-router";
import { BadgeCheck, MapPin, Phone, Clock, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const URL = "https://www.sastoursandtravels.com/travel-agency-udupi";
const TITLE = "Best Travel Agency in Udupi | Tour Operators Near You — SAS Travels";
const DESC =
  "SAS Travels is a Govt. of Karnataka recognised travel agency in Udupi, opposite the Head Post Office. Karnataka, India & international tour packages, cabs and custom trips. Call +91 72047 51900.";
const WA = "https://wa.me/917204751900?text=" + encodeURIComponent("Hi SAS Travels, I'd like help planning a trip from Udupi.");

const faqs = [
  { q: "Where is the SAS Travels office in Udupi?", a: "Office 10-1-20G, 3rd Floor, Sri Ram Arcade, opposite the Head Post Office, Udupi, Karnataka 576101. Walk in Monday to Saturday, 9 AM to 9 PM." },
  { q: "Are you a government-recognised travel agency?", a: "Yes. SAS Travels is recognised by the Government of Karnataka, Department of Tourism." },
  { q: "Do you arrange pick-up from Udupi and Manipal?", a: "Yes. We pick up from your home or hotel in Udupi, Manipal, Malpe or Kundapura, and from Udupi railway station or Mangaluru Airport (IXE)." },
  { q: "Can you customise a tour for my family or group?", a: "Every package can be changed — dates, hotels, car and pace. Message us on WhatsApp and we'll send a tailored quote." },
];

const services = [
  { t: "Karnataka & South India tours", d: "Coorg, Chikmagalur, Gokarna, Hampi, Mysore, Ooty, Munnar and the coastal temple circuit." },
  { t: "International holidays", d: "Dubai, Singapore, Malaysia, Thailand, Maldives, Egypt and Europe with visa help." },
  { t: "Udupi sightseeing & cabs", d: "Sri Krishna Matha, Malpe, St. Mary's Island, Kaup and Kollur with local drivers." },
  { t: "Temple & pilgrimage trips", d: "Kollur, Dharmasthala, Kukke Subramanya, Kateel, Sringeri and Horanadu." },
  { t: "Corporate & group travel", d: "Offsites, school and college tours, GST invoices." },
  { t: "Airport & railway transfers", d: "Mangaluru Airport (IXE) and Udupi station pick-up and drop." },
];

export const Route = createFileRoute("/travel-agency-udupi")({
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
            "@type": "TravelAgency",
            "@id": "https://www.sastoursandtravels.com/#agency",
            name: "SAS Travels",
            url: URL,
            telephone: "+91-72047-51900",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Office 10-1-20G, 3rd Floor, Sri Ram Arcade, opposite Head Post Office",
              addressLocality: "Udupi",
              addressRegion: "Karnataka",
              postalCode: "576101",
              addressCountry: "IN",
            },
            geo: { "@type": "GeoCoordinates", latitude: 13.3409, longitude: 74.7421 },
            openingHoursSpecification: [{
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
              opens: "09:00",
              closes: "21:00",
            }],
            areaServed: ["Udupi", "Manipal", "Malpe", "Kundapura", "Mangaluru", "Karnataka"],
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://www.sastoursandtravels.com/" },
              { "@type": "ListItem", position: 2, name: "Travel Agency in Udupi", item: URL },
            ],
          },
        ]),
      },
    ],
  }),
  component: UdupiPage,
});

function UdupiPage() {
  return (
    <div className="container-x max-w-5xl py-16 md:py-20">
      <span className="text-xs font-medium uppercase tracking-[0.2em] text-gold">Udupi · Manipal · Malpe</span>
      <h1 className="mt-3 font-display text-4xl font-semibold leading-tight md:text-5xl">
        Your local travel agency in Udupi
      </h1>
      <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
        SAS Travels plans holidays, pilgrimages and business trips from our office opposite the Udupi Head Post Office.
        Talk to a real person, get a clear quote in rupees, and travel with drivers who know the coast.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Button asChild size="lg"><a href={WA} target="_blank" rel="noopener noreferrer"><MessageCircle className="mr-2 h-4 w-4" />Get a quote on WhatsApp</a></Button>
        <Button asChild size="lg" variant="outline"><a href="tel:+917204751900"><Phone className="mr-2 h-4 w-4" />+91 72047 51900</a></Button>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border bg-card p-5"><BadgeCheck className="h-5 w-5 text-gold" /><p className="mt-2 font-semibold">Govt. of Karnataka recognised</p><p className="text-sm text-muted-foreground">Department of Tourism</p></div>
        <div className="rounded-2xl border bg-card p-5"><MapPin className="h-5 w-5 text-gold" /><p className="mt-2 font-semibold">Sri Ram Arcade, Udupi 576101</p><p className="text-sm text-muted-foreground">Office 10-1-20G, 3rd Floor, opp. Head Post Office</p></div>
        <div className="rounded-2xl border bg-card p-5"><Clock className="h-5 w-5 text-gold" /><p className="mt-2 font-semibold">Mon – Sat, 9 AM – 9 PM</p><p className="text-sm text-muted-foreground">WhatsApp replies 7 days a week</p></div>
      </div>

      <h2 className="mt-14 font-display text-3xl font-semibold">What we arrange from Udupi</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {services.map((s) => (
          <section key={s.t} className="rounded-2xl border bg-card p-6">
            <h3 className="font-display text-xl font-semibold">{s.t}</h3>
            <p className="mt-2 text-muted-foreground">{s.d}</p>
          </section>
        ))}
      </div>

      <h2 className="mt-14 font-display text-3xl font-semibold">Popular trips from Udupi</h2>
      <ul className="mt-4 space-y-2 text-muted-foreground">
        <li>• <Link className="text-primary hover:underline" to="/tours/$tourId" params={{ tourId: "coastal-to-highlands-escape" }}>Mangalore, Coorg &amp; Chikmagalur — 5 days / 4 nights</Link></li>
        <li>• <Link className="text-primary hover:underline" to="/blog/coastal-karnataka-tour-guide">Coastal Karnataka in 4 days: Udupi, Mangalore &amp; Gokarna</Link></li>
        <li>• <Link className="text-primary hover:underline" to="/tours-from-mangalore">All tour packages from Mangalore &amp; Udupi</Link></li>
        <li>• <Link className="text-primary hover:underline" to="/international-tours">International holidays from Udupi</Link></li>
      </ul>

      <h2 className="mt-14 font-display text-3xl font-semibold">Questions people ask us</h2>
      <div className="mt-6 space-y-4">
        {faqs.map((f) => (
          <section key={f.q} className="rounded-2xl border bg-card p-6">
            <h3 className="font-semibold">{f.q}</h3>
            <p className="mt-2 text-muted-foreground">{f.a}</p>
          </section>
        ))}
      </div>

      <div className="mt-14 rounded-2xl bg-primary p-8 text-primary-foreground">
        <h2 className="font-display text-2xl font-semibold">Planning a trip? Visit or message us today.</h2>
        <p className="mt-2 opacity-90">Tell us where, when and how many — we'll reply with a tailored plan.</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button asChild variant="secondary"><a href={WA} target="_blank" rel="noopener noreferrer">WhatsApp us</a></Button>
          <Button asChild variant="outline" className="bg-transparent"><Link to="/custom-itinerary">Plan a custom trip</Link></Button>
        </div>
      </div>
    </div>
  );
}
