CREATE TABLE public.corporate_enquiries (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name text NOT NULL,
  contact_name text NOT NULL,
  email text NOT NULL,
  phone text,
  team_size integer,
  event_type text NOT NULL DEFAULT 'offsite',
  destination text,
  preferred_dates text,
  budget_per_person numeric,
  message text,
  status itinerary_status NOT NULL DEFAULT 'new',
  archived boolean NOT NULL DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);
GRANT INSERT ON public.corporate_enquiries TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.corporate_enquiries TO authenticated;
GRANT ALL ON public.corporate_enquiries TO service_role;
ALTER TABLE public.corporate_enquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit a corporate enquiry" ON public.corporate_enquiries FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins and editors can view enquiries" ON public.corporate_enquiries FOR SELECT TO authenticated USING (public.is_editor_or_admin(auth.uid()));
CREATE POLICY "Admins and editors can update enquiries" ON public.corporate_enquiries FOR UPDATE TO authenticated USING (public.is_editor_or_admin(auth.uid())) WITH CHECK (public.is_editor_or_admin(auth.uid()));
CREATE POLICY "Admins and editors can delete enquiries" ON public.corporate_enquiries FOR DELETE TO authenticated USING (public.is_editor_or_admin(auth.uid()));
CREATE TRIGGER trg_corporate_enquiries_updated_at BEFORE UPDATE ON public.corporate_enquiries FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();