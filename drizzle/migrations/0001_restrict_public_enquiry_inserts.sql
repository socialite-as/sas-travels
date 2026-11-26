DROP POLICY IF EXISTS "Anyone can submit a corporate enquiry" ON public.corporate_enquiries;
DROP POLICY IF EXISTS "Anyone can submit itinerary request" ON public.custom_itinerary_requests;
REVOKE INSERT ON TABLE public.corporate_enquiries FROM anon, authenticated;
REVOKE INSERT ON TABLE public.custom_itinerary_requests FROM anon, authenticated;
GRANT INSERT ON TABLE public.corporate_enquiries TO service_role;
GRANT INSERT ON TABLE public.custom_itinerary_requests TO service_role;