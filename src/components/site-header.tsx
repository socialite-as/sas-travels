import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAuth } from "@/lib/auth-provider";
import { cn } from "@/lib/utils";
import logo from "@/assets/sas-travels-logo.png.asset.json";

const nav = [
  { to: "/", label: "Home" },
  { to: "/egypt", label: "Egypt" },
  { to: "/domestic-tours", label: "Domestic" },
  { to: "/international-tours", label: "International" },
  { to: "/destinations", label: "Destinations" },
  { to: "/gallery", label: "Gallery" },
  { to: "/blogs", label: "Journal" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, signOut } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300",
        scrolled
          ? "border-b bg-background/85 backdrop-blur-xl supports-[backdrop-filter]:bg-background/70"
          : "border-b border-transparent bg-background/0",
      )}
    >
      <div className="container-x flex h-20 items-center justify-between gap-4">
        <Link to="/" className="flex min-w-0 items-center gap-2.5 font-semibold" aria-label="SAS Travels home">
          <img src={logo.url} alt="" width={36} height={36} className="h-9 w-9 shrink-0" loading="eager" decoding="async" />
          <span className="font-display text-lg tracking-tight">SAS Travels</span>
        </Link>

        <nav aria-label="Primary" className="hidden lg:flex items-center gap-0.5">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="rounded-full px-3.5 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground font-medium" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          {user ? (
            <>
              <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
                <Link to="/dashboard"><UserIcon className="mr-1 h-4 w-4" />Dashboard</Link>
              </Button>
              <Button variant="outline" size="sm" onClick={() => signOut()}>Sign out</Button>
            </>
          ) : (
            <Button asChild size="sm" className="hidden sm:inline-flex rounded-full px-4">
              <Link to="/auth">Sign in</Link>
            </Button>
          )}
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen((v) => !v)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      <div className={cn("lg:hidden border-t bg-background/95 backdrop-blur", open ? "block" : "hidden")}>
        <nav aria-label="Mobile" className="container-x flex flex-col gap-1 py-4">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
              activeProps={{ className: "bg-accent text-foreground font-medium" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
          {!user && (
            <Button asChild size="sm" className="mt-2 rounded-full">
              <Link to="/auth" onClick={() => setOpen(false)}>Sign in</Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}
