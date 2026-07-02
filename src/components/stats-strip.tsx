const stats = [
  { value: "15+", label: "Years crafting journeys" },
  { value: "42", label: "Countries covered" },
  { value: "12k", label: "Happy travelers" },
  { value: "4.9★", label: "Average guest rating" },
];

export function StatsStrip() {
  return (
    <section className="border-y bg-primary/5">
      <div className="container-x grid grid-cols-2 gap-6 py-10 md:grid-cols-4 md:py-12">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <div className="font-display text-3xl font-semibold text-primary md:text-4xl">{s.value}</div>
            <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
