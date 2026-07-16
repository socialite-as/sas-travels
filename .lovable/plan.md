## Problem

You're signed in as an admin, and the admin RLS policies (`is_editor_or_admin`) are correct — but every write from the CMS still fails. Root cause: none of the tables in the `public` schema have any Data API GRANTs (`SELECT/INSERT/UPDATE/DELETE`) to `anon`, `authenticated`, or `service_role`. Supabase's Data API (PostgREST) requires explicit GRANTs on top of RLS. Without them the API returns "permission denied" no matter what role you're in, so the admin form's insert/update/delete never even reaches the RLS policy check.

This also affects public reads on your tour/blog/gallery pages — they currently work only because listing pages still read from the local mock file, not from the database.

## Fix

One migration that adds the correct Data API grants to every `public` table, tuned to each table's existing RLS:

- **Public-facing tables** (`tour_packages`, `blogs`, `countries`, `cities`, `gallery`, `testimonials`, `categories`): grant `SELECT` to `anon`, full CRUD to `authenticated`, `ALL` to `service_role`. RLS still restricts writes to editors/admins.
- **User-owned tables** (`bookings`, `custom_itinerary_requests`, `reviews`, `wishlist`, `notifications`, `user_documents`, `profiles`, `payments`): full CRUD to `authenticated`, `ALL` to `service_role`, NO `anon` grant (RLS scopes to `auth.uid()`).
- **Auth-only tables** (`user_roles`, `coupons`): `SELECT` to `authenticated` (needed by `useRoles` hook & coupon lookups), `ALL` to `service_role`, no `anon`.

Nothing else changes — no schema, no RLS, no app code. After the migration, the admin dashboard will be able to create/edit/delete tours, blogs, countries, cities, gallery items, testimonials, and categories, and public pages will be able to read directly from the database when you're ready to switch listings off the mock file.
