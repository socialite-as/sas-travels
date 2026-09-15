# Fix "supabaseUrl is required" on the corporate enquiry form

## What's happening

The corporate enquiry form sends its data to a small piece of server code that saves the enquiry. That code reads the database address and key from the deployment's settings — and if either one isn't present when the server starts handling the request, the database library stops with the raw message "supabaseUrl is required". That exact wording only comes from this one place in the project, so this is the form that's failing.

The same page works fine when the settings are present, which is why it saved correctly during testing earlier but fails now on the live/preview deployment.

Worth knowing: the Contact, Custom Itinerary and Newsletter forms don't save anywhere at all today — they only show a success message. Not part of this fix unless you want it.

## The fix

1. Re-bind the project's backend connection settings so the deployed server has the database address and key again.
2. Make the enquiry saving code resilient instead of crashing with a raw library error:
   - fall back to the build-time values when the server-only ones are missing;
   - if both are missing, log it and show the visitor a clear, friendly message ("We couldn't submit your enquiry right now — please call or email us") instead of a technical one.
3. Submit a real test enquiry against the running app, confirm it lands in Corporate Enquiries in the admin dashboard, then delete the test row.

## Technical detail

- `src/lib/corporate-enquiries.functions.ts` currently does `createClient(process.env["SUPABASE_URL"]!, process.env["SUPABASE_PUBLISHABLE_KEY"]!)` with non-null assertions and no guard — undefined URL makes `@supabase/supabase-js` throw `supabaseUrl is required`. Every other Supabase entry point in the project (`client.ts`, `client.server.ts`, `auth-middleware.ts`) guards and throws a descriptive error first.
- Run `supabase--rebind_secrets` to refresh `SUPABASE_URL` / `SUPABASE_PUBLISHABLE_KEY` / service-role binding in the runtime env.
- In the handler, resolve the URL/key as `process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL` (same for the publishable key), guard for missing values, `console.error` the detail, and throw a user-safe `Error` that the existing toast surfaces.
- Keep the honeypot, Zod validation and insert logic unchanged.
- Verify with Playwright against `localhost:8080/corporate` plus a `supabase--read_query` on `corporate_enquiries`; remove the test row afterwards.

## Out of scope

- Wiring Contact / Custom Itinerary / Newsletter to the database (say the word and I'll plan that separately).
