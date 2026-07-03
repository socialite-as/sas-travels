export function TourMap({ lat, lng, zoom = 6, title }: { lat: number | null; lng: number | null; zoom?: number | null; title?: string }) {
  if (lat == null || lng == null) {
    return (
      <div className="grid aspect-[16/9] place-items-center rounded-2xl border bg-muted text-sm text-muted-foreground">
        Map coordinates not yet available for this tour.
      </div>
    );
  }
  const z = zoom ?? 6;
  const bbox = `${lng - 2},${lat - 1.5},${lng + 2},${lat + 1.5}`;
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`;
  return (
    <div className="overflow-hidden rounded-2xl border">
      <iframe
        title={title ? `Map — ${title}` : "Tour map"}
        src={src}
        className="h-[360px] w-full"
        loading="lazy"
        data-zoom={z}
      />
    </div>
  );
}
