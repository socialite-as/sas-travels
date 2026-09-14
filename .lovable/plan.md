# Corporate Travel (B2B) Page + Enquiry Pipeline

## Goal
A dedicated public page for SAS Travels' corporate business — team offsites/retreats and incentive travel — with an enquiry form whose submissions are saved to the database and managed from the existing admin dashboard.

## 1. Public page: `src/routes/corporate.tsx` (`/corporate`)
Luxury-styled, conversion-focused page following the existing site design (Fraunces/Inter, midnight teal + gold, container-x sections):

- **Hero**: full-width image, dark overlay, "Corporate travel, handled like a five-star trip" style headline, CTA to the enquiry form. (Invented copy — user can adjust.)
- **Offerings section**: two feature blocks —
  - *Offsites & retreats*: team offsites, leadership retreats, R&R trips (Coastal Karnataka, Goa, Kerala, Maldives, Thailand angles).
  - *Incentive travel*: sales incentive trips, reward travel, milestone celebrations.
- **Why us section**: dedicated account manager, group rates, end-to-end logistics (flights, stays, activities, GST-compliant invoicing), pan-India + international.
- **Stats strip** (reuses existing `stats-strip` styling): trips delivered, travellers handled, retention.
- **Enquiry form** (zod-validated): company name, contact person, work email, phone, team size, event type (offsite/incentive/other), destination preference, preferred dates, budget per person (INR), message.
- **Trust + CTA blocks**: contact details (Udupi, +91 72047 51900, info@sastoursandtravels.com).
- **SEO**: unique `head()` (title/description/canonical/og + twitter), `Service` JSON-LD schema, added to `sitemap.xml`, `robots/llms.txt` mention, header nav link ("Corporate") + footer link.

## 2. Database: new `corporate_enquiries` table
Migration via the migration tool:
- Columns: `company_name`, `contact_name`, `email`, `phone`, `team_size` (int), `event_type` (text: offsite/retreat/incentive/other), `destination`, `preferred_dates`, `budget_per_person` (numeric, INR), `message`, `status` (new/contacted/quoted/closed — reuse `itinerary_status` enum), `archived`, timestamps + `updated_at` trigger.
- Order per template rules: CREATE TABLE → GRANTs (`INSERT` to anon + authenticated so the public form can submit; `SELECT/UPDATE/DELETE` to authenticated; `ALL` to service_role) → ENABLE RLS → policies:
  - Anyone (anon/authenticated) may submit a new enquiry (INSERT only).
  - Only admins/editors may view, update, or archive enquiries (via existing `has_role`/`is_editor_or_admin` functions).

## 3. Form submission: server function
New `src/lib/corporate-enquiries.functions.ts`:
- `submitCorporateEnquiry` — public `createServerFn` (POST), zod-validated, inserts via a server-side client (publishable key + anon insert policy). No service-role key needed.
- Client-side zod validation in the form; success/error toast via sonner; honeypot field for spam.

## 4. Admin management
- Register `corporate_enquiries` in `src/lib/admin/resources.ts` (list columns, form fields, edit/delete/archive) so it appears in the existing generic admin CRUD (`/admin/corporate_enquiries`) — no new admin UI needed.
- Status field editable by admins (new → contacted → quoted → closed).

## Technical notes
- Route ID `createFileRoute("/corporate")` in `src/routes/corporate.tsx`.
- Regenerated Supabase types consumed after migration; add table type if needed.
- Header nav: add `{ to: "/corporate", label: "Corporate" }`; footer link too.
- Sitemap: add `/corporate` static entry in `src/routes/sitemap[.]xml.ts`.
- Verify: build OK, form submits and row appears in admin list; anon cannot read others' enquiries.

## Out of scope (unless you want them)
- Corporate login/portal, B2B pricing engine, payment collection.
