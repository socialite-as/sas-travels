
ALTER TABLE public.tour_packages
  ADD COLUMN IF NOT EXISTS hotels jsonb DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS flights jsonb DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS meals jsonb DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS transportation jsonb DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS availability jsonb DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS faqs jsonb DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS cancellation_policy text,
  ADD COLUMN IF NOT EXISTS cities jsonb DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS map_lat numeric,
  ADD COLUMN IF NOT EXISTS map_lng numeric,
  ADD COLUMN IF NOT EXISTS map_zoom integer DEFAULT 6,
  ADD COLUMN IF NOT EXISTS highlights jsonb DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS meta_title text,
  ADD COLUMN IF NOT EXISTS meta_description text;

-- Ensure anon can read published tours/related lookup tables for public pages
GRANT SELECT ON public.tour_packages TO anon;
GRANT SELECT ON public.countries TO anon;
GRANT SELECT ON public.cities TO anon;
GRANT SELECT ON public.gallery TO anon;
GRANT SELECT ON public.reviews TO anon;
