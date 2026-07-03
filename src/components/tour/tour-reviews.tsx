import { Star } from "lucide-react";

type Review = { id: string; rating: number | null; title: string | null; comment: string | null; created_at: string };

export function TourReviews({ reviews }: { reviews: Review[] }) {
  if (reviews.length === 0) {
    return <p className="text-sm text-muted-foreground">No reviews yet. Be the first to travel and share.</p>;
  }
  const avg = reviews.reduce((s, r) => s + (r.rating ?? 0), 0) / reviews.length;
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`h-5 w-5 ${i < Math.round(avg) ? "fill-gold text-gold" : "text-muted-foreground"}`} />
          ))}
        </div>
        <span className="font-semibold">{avg.toFixed(1)}</span>
        <span className="text-sm text-muted-foreground">({reviews.length} reviews)</span>
      </div>
      <ul className="grid gap-4">
        {reviews.slice(0, 8).map((r) => (
          <li key={r.id} className="rounded-2xl border bg-card p-5">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`h-3.5 w-3.5 ${i < (r.rating ?? 0) ? "fill-gold text-gold" : "text-muted-foreground"}`} />
              ))}
              <span className="ml-2 text-xs text-muted-foreground">{new Date(r.created_at).toLocaleDateString()}</span>
            </div>
            {r.title && <div className="mt-2 font-semibold">{r.title}</div>}
            {r.comment && <p className="mt-1 text-sm text-muted-foreground">{r.comment}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}
