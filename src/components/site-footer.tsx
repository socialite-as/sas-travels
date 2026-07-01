import { Link } from "@tanstack/react-router";
import { Plane } from "lucide-react";

const groups: { title: string; links: { to: string; label: string }[] }[] = [
  {
    title: "Explore",
    links: [
      { to: "/domestic-tours", label: "Domestic Tours" },
      { to: "/international-tours", label: "International Tours" },
      { to: "/egypt", label: "Egypt" },
      { to: "/destinations", label: "Destinations" },
    ],
  },
  {
    title: "Company",
    links: [
      { to: "/about", label: "About" },
      { to: "/blogs", label: "Blog" },
      { to: "/contact", label: "Contact" },
      { to: "/faq", label: "FAQ" },
    ],
  },
  {
    title: "Services",
    links: [
      { to: "/custom-itinerary", label: "Custom Itinerary" },
      { to: "/visa", label: "Visa" },
      { to: "/travel-insurance", label: "Travel Insurance" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center gap-2 font-semibold">
              <Plane className="h-5 w-5 text-primary" />
              <span>Wanderly</span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">
              Curated tours and tailor-made journeys across the world.
            </p>
          </div>
          {groups.map((g) => (
            <div key={g.title}>
              <h4 className="mb-3 text-sm font-semibold">{g.title}</h4>
              <ul className="space-y-2 text-sm">
                {g.links.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="text-muted-foreground hover:text-foreground">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 border-t pt-6 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Wanderly. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
