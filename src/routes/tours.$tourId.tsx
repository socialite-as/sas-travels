import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  Bed, Calendar, Check, Clock, Heart, MapPin, Plane, Shield, UtensilsCrossed, Users, Car, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { TourGallery } from "@/components/tour/tour-gallery";
import { TourMap } from "@/components/tour/tour-map";
import { TourReviews } from "@/components/tour/tour-reviews";
import { RelatedTours } from "@/components/tour/related-tours";
import { ShareButtons } from "@/components/tour/share-buttons";
import { asArray, relatedToursQuery, tourBySlugQuery, tourGalleryQuery, tourReviewsQuery } from "@/lib/queries/tours";
import { useWishlist } from "@/lib/use-wishlist";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/tours/$tourId")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.tourId.replace(/-/g, " ")} — SAS Travels` },
      { name: "description", content: `Explore this curated tour — full itinerary, hotels, and availability.` },
      { property: "og:title", content: `${params.tourId.replace(/-/g, " ")} — SAS Travels` },
      { property: "og:url", content: `/tours/${params.tourId}` },
      { property: "og:type", content: "product" },
    ],
    links: [{ rel: "canonical", href: `/tours/${params.tourId}` }],
  }),
  component: TourDetails,
  errorComponent: TourError,
  notFoundComponent: TourNotFound,
});

function TourNotFound() {
  return (
    <div className="container-x py-24 text-center">
      <h1 className="font-display text-3xl font-semibold">Tour not found</h1>
      <p className="mt-2 text-muted-foreground">The tour you're looking for doesn't exist or was archived.</p>
      <Button asChild className="mt-6"><Link to="/destinations">Browse tours</Link></Button>
    </div>
  );
}

function TourError() {
  return (
    <div className="container-x py-24 text-center">
      <h1 className="font-display text-3xl font-semibold">Something went wrong</h1>
      <p className="mt-2 text-muted-foreground">We couldn't load this tour right now. Please try again.</p>
    </div>
  );
}

function TourDetails() {
  const { tourId } = Route.useParams();
  const tourQ = useQuery(tourBySlugQuery(tourId));
  const tour = tourQ.data;

  const galleryQ = useQuery(tourGalleryQuery(tour?.id));
  const reviewsQ = useQuery(tourReviewsQuery(tour?.id));
  const relatedQ = useQuery(relatedToursQuery(tour?.country_id, tour?.id));

  const wishlist = useWishlist(tour?.id);

  if (tourQ.isLoading) return <TourSkeleton />;
  if (!tour && !tourQ.isLoading) throw notFound();
  if (!tour) return null;

  const images: { url: string; caption?: string }[] = [
    ...(tour.cover_image ? [{ url: tour.cover_image, caption: tour.title }] : []),
    ...asArray<string>(tour.images).map((u) => ({ url: u })),
    ...(galleryQ.data ?? []).map((g) => ({ url: g.image_url, caption: g.caption ?? g.title ?? "" })),
  ];

  const highlights = asArray<string>(tour.highlights);
  const inclusions = asArray<string>(tour.inclusions);
  const exclusions = asArray<string>(tour.exclusions);
  const itinerary = asArray<{ day?: number; title?: string; description?: string; desc?: string }>(tour.itinerary);
  const hotels = asArray<{ name?: string; city?: string; nights?: number; rating?: number }>(tour.hotels);
  const flights = asArray<{ from?: string; to?: string; airline?: string; note?: string }>(tour.flights);
  const meals = asArray<string>(tour.meals);
  const transportation = asArray<string>(tour.transportation);
  const availability = asArray<{ start_date?: string; end_date?: string; seats?: number; price?: number }>(tour.availability);
  const faqs = asArray<{ question?: string; q?: string; answer?: string; a?: string }>(tour.faqs);
  const cities = asArray<string>(tour.cities);

  const currency = tour.currency ?? "$";
  const displayPrice = tour.discount_price ?? tour.price;
  const shareUrl = typeof window !== "undefined" ? window.location.href : `/tours/${tour.slug}`;

  return (
    <>
      {/* Hero */}
      <section className="container-x pt-8">
        <nav className="mb-4 text-xs text-muted-foreground">
          <Link to="/destinations" className="hover:text-foreground">Destinations</Link>
          {tour.countries && <> <span className="mx-1">/</span> {tour.countries.name} </>}
          <span className="mx-1">/</span> <span className="text-foreground">{tour.title}</span>
        </nav>

        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              {tour.countries && <Badge variant="secondary">{tour.countries.name}</Badge>}
              {tour.is_domestic ? <Badge variant="outline">Domestic</Badge> : <Badge variant="outline">International</Badge>}
              {tour.featured && <Badge className="bg-gold text-ink hover:bg-gold">Featured</Badge>}
            </div>
            <h1 className="mt-3 max-w-3xl font-display text-3xl font-semibold md:text-5xl">{tour.title}</h1>
            {tour.summary && <p className="mt-3 max-w-2xl text-muted-foreground">{tour.summary}</p>}
            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              {(cities.length > 0 || tour.cities_ref) && (
                <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {cities.length ? cities.join(" · ") : tour.cities_ref?.name}</span>
              )}
              {tour.duration_days && (
                <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {tour.duration_days} days{tour.duration_nights ? ` / ${tour.duration_nights} nights` : ""}</span>
              )}
              {tour.max_group_size && (
                <span className="flex items-center gap-1.5"><Users className="h-4 w-4" /> Max {tour.max_group_size}</span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={wishlist.isSaved ? "default" : "outline"}
              size="sm"
              onClick={wishlist.toggle}
              disabled={wishlist.isPending}
            >
              <Heart className={cn("mr-2 h-4 w-4", wishlist.isSaved && "fill-current")} />
              {wishlist.isSaved ? "Saved" : "Save"}
            </Button>
            <ShareButtons url={shareUrl} title={tour.title} />
          </div>
        </div>

        <div className="mt-6">
          {images.length > 0 ? (
            <TourGallery images={images} />
          ) : (
            <div className="grid aspect-[16/9] place-items-center rounded-2xl border bg-muted text-sm text-muted-foreground">
              No photos yet
            </div>
          )}
        </div>
      </section>

      {/* Body */}
      <section className="container-x grid gap-10 py-12 lg:grid-cols-[1fr_360px]">
        <div>
          <Tabs defaultValue="overview">
            <TabsList className="flex-wrap">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
              <TabsTrigger value="hotels">Hotels</TabsTrigger>
              <TabsTrigger value="logistics">Flights & Transfers</TabsTrigger>
              <TabsTrigger value="availability">Availability</TabsTrigger>
              <TabsTrigger value="map">Map</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="faqs">FAQs</TabsTrigger>
              <TabsTrigger value="policy">Policy</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="pt-6">
              {tour.description ? (
                <p className="whitespace-pre-line text-muted-foreground md:text-lg">{tour.description}</p>
              ) : (
                <p className="text-muted-foreground">Overview coming soon.</p>
              )}
              {highlights.length > 0 && (
                <>
                  <h3 className="mt-8 font-display text-xl font-semibold">Highlights</h3>
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2 text-sm">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> {h}
                      </li>
                    ))}
                  </ul>
                </>
              )}
              {(inclusions.length > 0 || exclusions.length > 0) && (
                <div className="mt-10 grid gap-8 sm:grid-cols-2">
                  {inclusions.length > 0 && (
                    <div>
                      <h3 className="font-display text-lg font-semibold">What's included</h3>
                      <ul className="mt-3 space-y-2 text-sm">
                        {inclusions.map((i) => (
                          <li key={i} className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" /> {i}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {exclusions.length > 0 && (
                    <div>
                      <h3 className="font-display text-lg font-semibold">Not included</h3>
                      <ul className="mt-3 space-y-2 text-sm">
                        {exclusions.map((i) => (
                          <li key={i} className="flex items-start gap-2 text-muted-foreground"><X className="mt-0.5 h-4 w-4 shrink-0" /> {i}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
              {meals.length > 0 && (
                <div className="mt-8">
                  <h3 className="flex items-center gap-2 font-display text-lg font-semibold"><UtensilsCrossed className="h-5 w-5 text-gold" /> Meals</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{meals.join(" · ")}</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="itinerary" className="pt-6">
              {itinerary.length === 0 ? (
                <p className="text-muted-foreground">Detailed itinerary coming soon.</p>
              ) : (
                <ol className="space-y-6 border-l pl-6">
                  {itinerary.map((d, i) => (
                    <li key={i} className="relative">
                      <span className="absolute -left-[31px] top-0 grid h-6 w-6 place-items-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                        {d.day ?? i + 1}
                      </span>
                      <div className="font-semibold">{d.title ?? `Day ${d.day ?? i + 1}`}</div>
                      {(d.description || d.desc) && (
                        <div className="mt-1 text-sm text-muted-foreground">{d.description ?? d.desc}</div>
                      )}
                    </li>
                  ))}
                </ol>
              )}
            </TabsContent>

            <TabsContent value="hotels" className="pt-6">
              {hotels.length === 0 ? (
                <p className="text-muted-foreground">Accommodations to be confirmed on booking.</p>
              ) : (
                <ul className="grid gap-3">
                  {hotels.map((h, i) => (
                    <li key={i} className="flex items-start gap-3 rounded-xl border bg-card p-4">
                      <Bed className="mt-0.5 h-5 w-5 text-gold" />
                      <div>
                        <div className="font-semibold">{h.name ?? "Hotel"}</div>
                        <div className="text-xs text-muted-foreground">
                          {[h.city, h.nights ? `${h.nights} nights` : null, h.rating ? `${h.rating}★` : null].filter(Boolean).join(" · ")}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </TabsContent>

            <TabsContent value="logistics" className="pt-6 space-y-8">
              <div>
                <h3 className="flex items-center gap-2 font-display text-lg font-semibold"><Plane className="h-5 w-5 text-gold" /> Flights</h3>
                {flights.length === 0 ? (
                  <p className="mt-2 text-sm text-muted-foreground">Optional add-on — we can quote flights from your city.</p>
                ) : (
                  <ul className="mt-3 grid gap-2 text-sm">
                    {flights.map((f, i) => (
                      <li key={i} className="rounded-lg border bg-card p-3">
                        <div className="font-medium">{f.from} → {f.to}</div>
                        <div className="text-xs text-muted-foreground">{[f.airline, f.note].filter(Boolean).join(" · ")}</div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div>
                <h3 className="flex items-center gap-2 font-display text-lg font-semibold"><Car className="h-5 w-5 text-gold" /> Transportation</h3>
                {transportation.length === 0 ? (
                  <p className="mt-2 text-sm text-muted-foreground">Private transfers included throughout.</p>
                ) : (
                  <ul className="mt-3 list-disc pl-5 text-sm text-muted-foreground">
                    {transportation.map((t) => <li key={t}>{t}</li>)}
                  </ul>
                )}
              </div>
            </TabsContent>

            <TabsContent value="availability" className="pt-6">
              {availability.length === 0 ? (
                <p className="text-muted-foreground">Contact us for open departures — we run this tour year-round on request.</p>
              ) : (
                <div className="overflow-hidden rounded-xl border">
                  <table className="w-full text-sm">
                    <thead className="bg-muted/50 text-left">
                      <tr>
                        <th className="p-3">Start</th><th className="p-3">End</th><th className="p-3">Seats</th><th className="p-3 text-right">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {availability.map((a, i) => (
                        <tr key={i} className="border-t">
                          <td className="p-3">{a.start_date}</td>
                          <td className="p-3">{a.end_date}</td>
                          <td className="p-3">{a.seats ?? "—"}</td>
                          <td className="p-3 text-right font-semibold">{a.price ? `${currency}${a.price.toLocaleString()}` : "—"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </TabsContent>

            <TabsContent value="map" className="pt-6">
              <TourMap lat={tour.map_lat} lng={tour.map_lng} zoom={tour.map_zoom} title={tour.title} />
            </TabsContent>

            <TabsContent value="reviews" className="pt-6">
              {reviewsQ.isLoading ? <Skeleton className="h-40 w-full" /> : <TourReviews reviews={reviewsQ.data ?? []} />}
            </TabsContent>

            <TabsContent value="faqs" className="pt-6">
              {faqs.length === 0 ? (
                <p className="text-muted-foreground">Questions? Ask our specialists — we usually reply within a few hours.</p>
              ) : (
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((f, i) => (
                    <AccordionItem key={i} value={`f-${i}`}>
                      <AccordionTrigger className="text-left">{f.question ?? f.q}</AccordionTrigger>
                      <AccordionContent>{f.answer ?? f.a}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              )}
            </TabsContent>

            <TabsContent value="policy" className="pt-6">
              <div className="flex items-start gap-3 rounded-2xl border bg-card p-5">
                <Shield className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                <p className="whitespace-pre-line text-sm text-muted-foreground">
                  {tour.cancellation_policy ?? "Full refund up to 30 days before departure. 50% refund within 14 days. Non-refundable within 7 days. Travel insurance strongly recommended."}
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sticky booking */}
        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            {displayPrice != null && (
              <>
                <div className="text-xs text-muted-foreground">from</div>
                <div className="flex items-baseline gap-2">
                  <div className="font-display text-4xl font-semibold text-primary">
                    {currency}{Number(displayPrice).toLocaleString()}
                  </div>
                  {tour.discount_price && tour.price && (
                    <div className="text-sm text-muted-foreground line-through">
                      {currency}{Number(tour.price).toLocaleString()}
                    </div>
                  )}
                </div>
                <div className="text-xs text-muted-foreground">per person, twin share</div>
              </>
            )}
            <div className="mt-5 space-y-3 text-sm">
              <label className="flex items-center gap-3 rounded-lg border p-3">
                <Calendar className="h-4 w-4 text-gold" />
                <input type="date" className="flex-1 bg-transparent outline-none" />
              </label>
              <label className="flex items-center gap-3 rounded-lg border p-3">
                <Users className="h-4 w-4 text-gold" />
                <select className="flex-1 bg-transparent outline-none">
                  <option>2 adults</option><option>1 adult</option><option>Group (4+)</option>
                </select>
              </label>
            </div>
            <Button className="mt-5 w-full" size="lg">Request to book</Button>
            <Button asChild variant="outline" className="mt-2 w-full"><Link to="/contact">Speak with a specialist</Link></Button>
            <div className="mt-5 flex items-start gap-2 text-xs text-muted-foreground">
              <Shield className="mt-0.5 h-4 w-4 text-gold" />
              Free cancellation up to 30 days. Full financial protection.
            </div>
          </div>
        </aside>
      </section>

      <RelatedTours items={relatedQ.data ?? []} />
    </>
  );
}

function TourSkeleton() {
  return (
    <div className="container-x space-y-6 py-10">
      <Skeleton className="h-10 w-2/3" />
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="aspect-[16/9] w-full rounded-2xl" />
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <Skeleton className="h-96 w-full" />
        <Skeleton className="h-96 w-full" />
      </div>
    </div>
  );
}
