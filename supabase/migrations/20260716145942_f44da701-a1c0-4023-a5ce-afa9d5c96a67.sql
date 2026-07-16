-- Remove overly broad Data API privileges first.
REVOKE ALL ON public.blogs, public.bookings, public.categories, public.cities, public.countries, public.coupons, public.custom_itinerary_requests, public.gallery, public.notifications, public.payments, public.profiles, public.reviews, public.testimonials, public.tour_packages, public.user_documents, public.user_roles, public.wishlist FROM anon;
REVOKE ALL ON public.blogs, public.bookings, public.categories, public.cities, public.countries, public.coupons, public.custom_itinerary_requests, public.gallery, public.notifications, public.payments, public.profiles, public.reviews, public.testimonials, public.tour_packages, public.user_documents, public.user_roles, public.wishlist FROM authenticated;
REVOKE ALL ON public.blogs, public.bookings, public.categories, public.cities, public.countries, public.coupons, public.custom_itinerary_requests, public.gallery, public.notifications, public.payments, public.profiles, public.reviews, public.testimonials, public.tour_packages, public.user_documents, public.user_roles, public.wishlist FROM service_role;

-- Public-facing CMS tables: visitors can read only; signed-in editors/admins can manage through RLS and the admin CMS.
GRANT SELECT ON public.tour_packages, public.blogs, public.countries, public.cities, public.gallery, public.testimonials, public.categories TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.tour_packages, public.blogs, public.countries, public.cities, public.gallery, public.testimonials, public.categories TO authenticated;
GRANT ALL ON public.tour_packages, public.blogs, public.countries, public.cities, public.gallery, public.testimonials, public.categories TO service_role;

-- Public submission table: visitors can submit itinerary requests; signed-in/admin flows can manage according to RLS.
GRANT INSERT ON public.custom_itinerary_requests TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.custom_itinerary_requests TO authenticated;
GRANT ALL ON public.custom_itinerary_requests TO service_role;

-- User-owned/auth-only tables.
GRANT SELECT, INSERT, UPDATE, DELETE ON public.bookings, public.reviews, public.wishlist, public.notifications, public.user_documents, public.profiles, public.payments TO authenticated;
GRANT ALL ON public.bookings, public.reviews, public.wishlist, public.notifications, public.user_documents, public.profiles, public.payments TO service_role;

-- Auth-only reference/role tables.
GRANT SELECT ON public.user_roles, public.coupons TO authenticated;
GRANT ALL ON public.user_roles, public.coupons TO service_role;