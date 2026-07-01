import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Compass, Globe, MapPin, Sparkles } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Wanderly — Discover the World, Your Way" },
      { name: "description", content: "Handcrafted tours across Egypt and the globe. Domestic escapes, international adventures, and fully custom itineraries." },
      { property: "og:title", content: "Wanderly — Discover the World, Your Way" },
      { property: "og:description", content: "Handcrafted tours across Egypt and the globe." },
    ],
  }),
  component: Home,
});

const highlights = [
  { icon: MapPin, title: "Domestic Tours", desc: "Explore hidden gems close to home.", to: "/domestic-tours" as const },
  { icon: Globe, title: "International Tours", desc: "Journeys across every continent.", to: "/international-tours" as const },
  { icon: Compass, title: "Egypt Specialists", desc: "From the Pyramids to the Red Sea.", to: "/egypt" as const },
  { icon: Sparkles, title: "Custom Itineraries", desc: "Design a trip made just for you.", to: "/custom-itinerary" as const },
];

function Home() {
  return (
    <>
      <section className="relative overflow-hidden border-b">
        <div className="mx-auto max-w-7xl px-4 py-20 md:py-28">
          <div className="max-w-3xl">
            <span className="inline-flex items-center rounded-full border bg-background/50 px-3 py-1 text-xs font-medium text-muted-foreground">
              New season · 2026 collections
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-6xl">
              Discover the world,<br />on your own terms.
            </h1>
            <p className="mt-4 max-w-xl text-lg text-muted-foreground">
              Curated tours, tailor-made itineraries, and local expertise — all in one place.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg"><Link to="/destinations">Explore destinations</Link></Button>
              <Button asChild size="lg" variant="outline"><Link to="/custom-itinerary">Plan a custom trip</Link></Button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="mb-8 text-2xl font-semibold">Where would you like to go?</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map(({ icon: Icon, title, desc, to }) => (
            <Link key={to} to={to} className="group">
              <Card className="h-full transition-colors group-hover:border-primary">
                <CardContent className="p-6">
                  <Icon className="h-6 w-6 text-primary" />
                  <h3 className="mt-4 font-semibold">{title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
