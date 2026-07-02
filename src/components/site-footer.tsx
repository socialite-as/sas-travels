import { Link } from "@tanstack/react-router";
import { Instagram, Plane, Twitter, Youtube } from "lucide-react";
import { Newsletter } from "@/components/newsletter";

const groups: { title: string; links: { to: string; label: string }[] }[] = [
  {
    title: "Explore",
    links: [
      { to: "/domestic-tours", label: "Domestic Tours" },
      { to: "/international-tours", label: "International Tours" },
      { to: "/egypt", label: "Egypt" },
      { to: "/destinations", label: "Destinations" },
      { to: "/gallery", label: "Gallery" },
    ],
  },
  {
    title: "Company",
    links: [
      { to: "/about", label: "About" },
      { to: "/blogs", label: "Journal" },
      { to: "/contact", label: "Contact" },
      { to: "/faq", label: "FAQ" },
    ],
  },
  {
    title: "Services",
    links: [
      { to: "/custom-itinerary", label: "Custom Itinerary" },
      { to: "/visa", label: "Visa Support" },
      { to: "/travel-insurance", label: "Travel Insurance" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container-x py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Link to="/" className="flex items-center gap-2 font-display text-xl font-semibold">
              <Plane className="h-5 w-5 text-gold" />
              <span>Wanderly</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              A specialist travel studio designing rare journeys across Egypt and the world.
            </p>
            <div className="mt-6 max-w-sm">
              <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Get the dispatch</div>
              <Newsletter compact />
            </div>
          </div>
          {groups.map((g) => (
            <div key={g.title}>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-widest text-muted-foreground">{g.title}</h4>
              <ul className="space-y-2.5 text-sm">
                {g.links.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="text-foreground/80 hover:text-primary">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-6 text-xs text-muted-foreground md:flex-row">
          <div>© {new Date().getFullYear()} Wanderly · Crafted with care in Cairo & beyond.</div>
          <div className="flex gap-4">
            <a href="#" aria-label="Instagram" className="hover:text-primary"><Instagram className="h-4 w-4" /></a>
            <a href="#" aria-label="Twitter" className="hover:text-primary"><Twitter className="h-4 w-4" /></a>
            <a href="#" aria-label="Youtube" className="hover:text-primary"><Youtube className="h-4 w-4" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
