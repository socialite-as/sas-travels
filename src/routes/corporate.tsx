import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Briefcase, Users, Trophy, Plane, Receipt, HeadphonesIcon, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SectionHeading } from "@/components/section-heading";
import { submitCorporateEnquiry, corporateEnquirySchema } from "@/lib/corporate-enquiries.functions";

const CANONICAL = "https://sas-travels.lovable.app/corporate";
const HERO = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1900&q=80&auto=format&fit=crop";

export const Route = createFileRoute("/corporate")({
  head: () => ({
    meta: [
      { title: "Corporate Travel & Team Offsites | SAS Travels" },
      { name: "description", content: "SAS Travels plans corporate offsites, leadership retreats and incentive trips across India and abroad — group rates, full logistics and GST-compliant invoicing." },
      { property: "og:title", content: "Corporate Travel & Team Offsites | SAS Travels" },
      { property: "og:description", content: "Offsites, retreats and incentive travel for companies — planned end to end by SAS Travels." },
      { property: "og:url", content: CANONICAL },
      { property: "og:type", content: "website" },
      { property: "og:image", content: HERO },
      { name: "twitter:image", content: HERO },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Corporate travel, team offsites and incentive trips",
          provider: { "@type": "TravelAgency", name: "SAS Travels", url: "https://sas-travels.lovable.app" },
          areaServed: ["India", "United Arab Emirates", "Maldives", "Thailand", "Malaysia", "Egypt"],
          description:
            "Corporate travel management for Indian companies: team offsites, leadership retreats and sales incentive trips, planned and operated end to end.",
        }),
      },
    ],
  }),
  component: CorporatePage,
});

const offerings = [
  {
    icon: Users,
    title: "Offsites & retreats",
    copy: "Team offsites, leadership retreats and annual R&R trips — designed around your agenda, not a template.",
    points: [
      "Coastal Karnataka, Goa, Coorg and Kerala for quick, high-impact getaways",
      "Maldives, Thailand and Malaysia when the team has earned something bigger",
      "Meeting rooms, AV, team activities and downtime balanced into one schedule",
      "Single point of contact from first quote to final invoice",
    ],
  },
  {
    icon: Trophy,
    title: "Incentive travel",
    copy: "Reward trips that people actually compete for — sales incentives, milestone celebrations and President's Club style journeys.",
    points: [
      "Tiered itineraries so budgets scale with achievement levels",
      "Private experiences and upgrades your team can't book themselves",
      "Branded welcome kits, dedicated hosts and on-ground coordinators",
      "Photo and video coverage for internal comms, on request",
    ],
  },
];

const whyUs = [
  { icon: Briefcase, title: "Dedicated account manager", copy: "One named person who knows your company, your budget cycle and your people." },
  { icon: Plane, title: "Group rates & logistics", copy: "Flights, hotels, transfers and activities negotiated and operated as a single package." },
  { icon: Receipt, title: "GST-compliant invoicing", copy: "Clean documentation, staged payments and paperwork your finance team will accept." },
  { icon: HeadphonesIcon, title: "On-ground support", copy: "Coordinators travelling with larger groups and a phone line that answers during the trip." },
];

const stats = [
  { value: "2016", label: "Serving travellers since" },
  { value: "150+", label: "Group departures operated" },
  { value: "8", label: "Countries covered" },
  { value: "48 hrs", label: "Typical proposal turnaround" },
];

function CorporatePage() {
  const [loading, setLoading] = useState(false);
  const submit = useServerFn(submitCorporateEnquiry);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const raw = {
      company_name: String(fd.get("company_name") ?? ""),
      contact_name: String(fd.get("contact_name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      team_size: fd.get("team_size") ? Number(fd.get("team_size")) : undefined,
      event_type: String(fd.get("event_type") ?? "offsite"),
      destination: String(fd.get("destination") ?? ""),
      preferred_dates: String(fd.get("preferred_dates") ?? ""),
      budget_per_person: fd.get("budget_per_person") ? Number(fd.get("budget_per_person")) : undefined,
      message: String(fd.get("message") ?? ""),
      website: String(fd.get("website") ?? ""),
    };

    const parsed = corporateEnquirySchema.safeParse(raw);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form and try again.");
      return;
    }

    setLoading(true);
    try {
      await submit({ data: parsed.data });
      form.reset();
      toast.success("Enquiry received — a specialist will reply within one working day.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO} alt="" className="h-full w-full object-cover" loading="eager" decoding="async" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/70 to-ink/92" />
        </div>
        <div className="container-x relative py-24 text-cream md:py-32">
          <span className="inline-flex items-center gap-3 text-[0.7rem] font-medium uppercase tracking-[0.28em] text-gold">
            <span className="h-px w-10 bg-gold" /> Corporate & B2B
          </span>
          <h1 className="mt-6 max-w-4xl font-display text-5xl font-medium leading-[1.05] text-balance md:text-6xl lg:text-7xl">
            Company travel, planned with the care of a private itinerary.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-cream/85">
            SAS Travels runs offsites, leadership retreats and incentive trips for Indian companies — from a
            twenty-person weekend in Coastal Karnataka to a three-hundred-strong reward trip abroad.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-full px-7">
              <a href="#enquiry">Request a proposal</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full border-cream/40 bg-transparent px-7 text-cream hover:bg-cream/10 hover:text-cream">
              <a href="tel:+917204751900">Call +91 72047 51900</a>
            </Button>
          </div>
        </div>
      </section>

      <section className="border-b bg-muted/30">
        <div className="container-x grid grid-cols-2 gap-8 py-12 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="font-display text-3xl font-medium md:text-4xl">{s.value}</div>
              <div className="mt-1.5 text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="container-x py-20 md:py-28">
        <SectionHeading
          eyebrow="What we run"
          title="Two things we do exceptionally well"
          description="We don't try to be everything to every company. We plan trips that bring teams together, and trips that reward the people who earned them."
        />
        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {offerings.map((o) => (
            <article key={o.title} className="rounded-3xl border bg-card p-8 md:p-10">
              <o.icon className="h-7 w-7 text-gold" />
              <h3 className="mt-6 font-display text-2xl font-medium md:text-3xl">{o.title}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{o.copy}</p>
              <ul className="mt-6 space-y-3 text-sm">
                {o.points.map((p) => (
                  <li key={p} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                    <span className="text-foreground/85">{p}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y bg-muted/30 py-20 md:py-28">
        <div className="container-x">
          <SectionHeading eyebrow="Why companies stay with us" title="The boring parts, handled properly" />
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {whyUs.map((w) => (
              <div key={w.title}>
                <w.icon className="h-6 w-6 text-gold" />
                <h3 className="mt-5 font-display text-xl font-medium">{w.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{w.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="enquiry" className="container-x py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <SectionHeading
              eyebrow="Request a proposal"
              title="Tell us about your group"
              description="Share the basics and a specialist will come back with options and indicative costing — usually within one working day."
            />
            <div className="mt-10 space-y-4 text-sm">
              <div className="flex items-center gap-3"><Phone className="h-4 w-4 text-gold" /><a href="tel:+917204751900" className="hover:text-primary">+91 72047 51900</a></div>
              <div className="flex items-center gap-3"><Mail className="h-4 w-4 text-gold" /><a href="mailto:info@sastoursandtravels.com" className="hover:text-primary">info@sastoursandtravels.com</a></div>
              <div className="flex items-center gap-3"><MapPin className="h-4 w-4 text-gold" /><span className="text-muted-foreground">Udupi, Karnataka, India</span></div>
            </div>
          </div>

          <form onSubmit={onSubmit} className="space-y-6 rounded-3xl border bg-card p-6 md:p-9">
            <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="company_name">Company name</Label>
                <Input id="company_name" name="company_name" required maxLength={150} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact_name">Your name</Label>
                <Input id="contact_name" name="contact_name" required maxLength={120} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Work email</Label>
                <Input id="email" name="email" type="email" required maxLength={255} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" type="tel" maxLength={30} placeholder="+91 " />
              </div>
              <div className="space-y-2">
                <Label htmlFor="event_type">Type of trip</Label>
                <select
                  id="event_type"
                  name="event_type"
                  defaultValue="offsite"
                  className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="offsite">Team offsite</option>
                  <option value="retreat">Leadership retreat</option>
                  <option value="incentive">Incentive / reward trip</option>
                  <option value="other">Something else</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="team_size">Team size</Label>
                <Input id="team_size" name="team_size" type="number" min={1} placeholder="45" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="destination">Destination preference</Label>
                <Input id="destination" name="destination" maxLength={200} placeholder="Coastal Karnataka, Thailand…" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="preferred_dates">Preferred dates</Label>
                <Input id="preferred_dates" name="preferred_dates" maxLength={120} placeholder="Late November, 3 nights" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="budget_per_person">Budget per person (₹)</Label>
                <Input id="budget_per_person" name="budget_per_person" type="number" min={0} placeholder="25000" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Anything else we should know?</Label>
              <Textarea id="message" name="message" rows={5} maxLength={2000} placeholder="Agenda, meeting requirements, dietary needs, past trips that worked well." />
            </div>
            <Button type="submit" size="lg" className="rounded-full px-8" disabled={loading}>
              {loading ? "Sending…" : "Request a proposal"}
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}
