import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { z } from "zod";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [
    { title: "Contact — Wanderly" },
    { name: "description", content: "Speak with a Wanderly travel specialist. We reply within one business day." },
  ]}),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  message: z.string().trim().min(10, "Tell us a bit more (min 10 chars)").max(2000),
});

function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) return toast.error(parsed.error.issues[0].message);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setForm({ name: "", email: "", message: "" });
      toast.success("Thanks — a specialist will reply within one business day.");
    }, 700);
  };

  return (
    <div className="container-x py-16 md:py-20">
      <header className="max-w-2xl">
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-gold">Contact</span>
        <h1 className="mt-3 font-display text-4xl font-semibold md:text-5xl">Let's plan something beautiful.</h1>
        <p className="mt-4 text-muted-foreground md:text-lg">
          Whether you're ready to book or just curious, our specialists are here to help.
        </p>
      </header>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_360px]">
        <form onSubmit={submit} className="space-y-5 rounded-2xl border bg-card p-6 md:p-8">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Your name</Label>
              <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">How can we help?</Label>
            <Textarea id="message" rows={6} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Where would you like to go, and when?" />
          </div>
          <Button type="submit" size="lg" disabled={loading}>{loading ? "Sending…" : "Send message"}</Button>
        </form>

        <aside className="space-y-4">
          {[
            { icon: Phone, title: "Call", value: "+20 100 000 0000" },
            { icon: Mail, title: "Email", value: "hello@wanderly.travel" },
            { icon: MessageCircle, title: "WhatsApp", value: "+20 100 000 0000" },
            { icon: MapPin, title: "Studio", value: "Zamalek, Cairo · Egypt" },
          ].map(({ icon: Icon, title, value }) => (
            <div key={title} className="flex items-start gap-4 rounded-2xl border bg-card p-5">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-gold/15 text-gold"><Icon className="h-4 w-4" /></div>
              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">{title}</div>
                <div className="mt-1 font-medium">{value}</div>
              </div>
            </div>
          ))}
        </aside>
      </div>
    </div>
  );
}
