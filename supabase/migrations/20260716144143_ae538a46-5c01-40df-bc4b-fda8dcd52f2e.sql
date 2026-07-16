
-- Public-facing tables (public read + editor writes)
GRANT SELECT ON public.tour_packages, public.blogs, public.countries, public.cities, public.gallery, public.testimonials, public.categories TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.tour_packages, public.blogs, public.countries, public.cities, public.gallery, public.testimonials, public.categories TO authenticated;
GRANT ALL ON public.tour_packages, public.blogs, public.countries, public.cities, public.gallery, public.testimonials, public.categories TO service_role;

-- User-owned tables (auth only)
GRANT SELECT, INSERT, UPDATE, DELETE ON public.bookings, public.custom_itinerary_requests, public.reviews, public.wishlist, public.notifications, public.user_documents, public.profiles, public.payments TO authenticated;
GRANT ALL ON public.bookings, public.custom_itinerary_requests, public.reviews, public.wishlist, public.notifications, public.user_documents, public.profiles, public.payments TO service_role;

-- Auth-only reference tables
GRANT SELECT ON public.user_roles, public.coupons TO authenticated;
GRANT ALL ON public.user_roles, public.coupons TO service_role;
