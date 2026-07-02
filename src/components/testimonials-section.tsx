import { Star } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { testimonials } from "@/lib/mock/data";

export function TestimonialsSection() {
  return (
    <section className="border-y bg-muted/40 py-20 md:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="Guest stories"
          title="Trusted by discerning travelers"
          description="A perfect trip is a promise kept — here's what guests say after journeying with us."
          align="center"
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.id}
              className="flex h-full flex-col rounded-2xl border bg-card p-6 hover-lift"
            >
              <div className="flex items-center gap-1 text-gold">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-gold" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 font-display text-lg leading-snug text-balance">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t pt-4">
                <img src={t.avatar} alt="" className="h-11 w-11 rounded-full object-cover" />
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.location}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
