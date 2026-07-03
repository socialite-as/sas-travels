import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type TourRow = {
  id: string;
  slug: string;
  title: string;
  summary: string | null;
  description: string | null;
  country_id: string | null;
  city_id: string | null;
  category_id: string | null;
  price: number | null;
  discount_price: number | null;
  currency: string | null;
  duration_days: number | null;
  duration_nights: number | null;
  cover_image: string | null;
  images: unknown;
  itinerary: unknown;
  inclusions: unknown;
  exclusions: unknown;
  hotels: unknown;
  flights: unknown;
  meals: unknown;
  transportation: unknown;
  availability: unknown;
  faqs: unknown;
  cities: unknown;
  highlights: unknown;
  cancellation_policy: string | null;
  map_lat: number | null;
  map_lng: number | null;
  map_zoom: number | null;
  meta_title: string | null;
  meta_description: string | null;
  max_group_size: number | null;
  difficulty: string | null;
  is_domestic: boolean | null;
  featured: boolean | null;
  archived: boolean | null;
  countries?: { id: string; name: string; slug: string; hero_image: string | null } | null;
  cities_ref?: { id: string; name: string; slug: string } | null;
};

const SELECT = `
  *,
  countries:country_id ( id, name, slug, hero_image ),
  cities_ref:city_id ( id, name, slug )
`;

export const tourBySlugQuery = (slug: string) =>
  queryOptions({
    queryKey: ["tour", slug],
    queryFn: async (): Promise<TourRow | null> => {
      const { data, error } = await supabase
        .from("tour_packages")
        .select(SELECT)
        .eq("slug", slug)
        .eq("archived", false)
        .maybeSingle();
      if (error) throw error;
      return data as unknown as TourRow | null;
    },
  });

export const tourGalleryQuery = (tourId: string | undefined) =>
  queryOptions({
    queryKey: ["tour-gallery", tourId],
    enabled: !!tourId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("gallery")
        .select("id, image_url, caption, title, sort_order")
        .eq("tour_id", tourId!)
        .eq("archived", false)
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data ?? [];
    },
  });

export const tourReviewsQuery = (tourId: string | undefined) =>
  queryOptions({
    queryKey: ["tour-reviews", tourId],
    enabled: !!tourId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("reviews")
        .select("id, rating, title, comment, created_at, user_id")
        .eq("tour_id", tourId!)
        .eq("approved", true)
        .eq("archived", false)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

export const relatedToursQuery = (countryId: string | null | undefined, excludeId: string | undefined) =>
  queryOptions({
    queryKey: ["related-tours", countryId, excludeId],
    enabled: !!countryId && !!excludeId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("tour_packages")
        .select("id, slug, title, cover_image, price, currency, duration_days")
        .eq("country_id", countryId!)
        .eq("archived", false)
        .neq("id", excludeId!)
        .limit(4);
      if (error) throw error;
      return data ?? [];
    },
  });

export const toursListQuery = (filters?: { isDomestic?: boolean; countrySlug?: string }) =>
  queryOptions({
    queryKey: ["tours-list", filters],
    queryFn: async () => {
      let q = supabase
        .from("tour_packages")
        .select("id, slug, title, summary, cover_image, price, discount_price, currency, duration_days, is_domestic, featured, country_id, countries:country_id(name, slug)")
        .eq("archived", false)
        .order("featured", { ascending: false });
      if (filters?.isDomestic !== undefined) q = q.eq("is_domestic", filters.isDomestic);
      if (filters?.countrySlug) {
        // filter after fetching country id
        const { data: c } = await supabase.from("countries").select("id").eq("slug", filters.countrySlug).maybeSingle();
        if (c?.id) q = q.eq("country_id", c.id);
      }
      const { data, error } = await q;
      if (error) throw error;
      return data ?? [];
    },
  });

export function asArray<T = unknown>(v: unknown): T[] {
  if (Array.isArray(v)) return v as T[];
  return [];
}
