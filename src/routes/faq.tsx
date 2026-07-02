import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqs } from "@/lib/mock/data";

export const Route = createFileRoute("/faq")({
  head: () => ({ meta: [
    { title: "FAQ — Wanderly" },
    { name: "description", content: "Answers to the questions travelers ask most often before booking." },
  ]}),
  component: FAQ,
});

function FAQ() {
  return (
    <div className="container-x py-16 md:py-20">
      <header className="max-w-2xl">
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-gold">FAQ</span>
        <h1 className="mt-3 font-display text-4xl font-semibold md:text-5xl">Questions, answered.</h1>
        <p className="mt-4 text-muted-foreground md:text-lg">
          Everything you need to know before you book. Can't find your question? Our specialists are one message away.
        </p>
      </header>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_320px]">
        <Accordion type="single" collapsible className="rounded-2xl border bg-card">
          {faqs.map((f, i) => (
            <AccordionItem key={f.q} value={`item-${i}`} className="border-b px-5 last:border-b-0">
              <AccordionTrigger className="text-left font-display text-lg font-medium hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <aside className="rounded-2xl border bg-primary p-6 text-primary-foreground">
          <ChevronDown className="h-6 w-6 text-gold" />
          <h3 className="mt-3 font-display text-2xl font-semibold">Still curious?</h3>
          <p className="mt-2 text-sm text-primary-foreground/80">
            Speak with a specialist and we'll answer any question — big or small.
          </p>
          <Button asChild variant="secondary" className="mt-5 w-full bg-gold text-gold-foreground hover:bg-gold/90">
            <Link to="/contact">Contact us</Link>
          </Button>
        </aside>
      </div>
    </div>
  );
}
