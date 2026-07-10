## Why "Tour not found" appears

The tour detail page at `/tours/$tourId` queries Supabase (`tour_packages` filtered by `slug`) — but the database is currently empty:

- `tour_packages`: 0 rows
- `countries`: 0 rows
- `cities`: 0 rows

The listing pages (Home, Domestic, International, Egypt, Destinations) render from the local mock file `src/lib/mock/data.ts`, so cards appear and link to `/tours/pyramids-and-nile-signature`, `/tours/kyoto-tea-and-temples`, etc. When you click, the detail route asks Supabase for that slug, gets nothing, and throws `notFound()` → "Tour not found."

Nothing is broken in the code — the DB just has no content yet.

## Fix

Seed the database with real rows that match the 8 mock tour slugs plus their countries and cities, so every card on the listing pages resolves to a full detail page.

### Migration / seed contents

1. **Countries** — insert Egypt, Greece, Japan, Morocco, Indonesia (with hero images, slugs).
2. **Cities** — insert Cairo, Luxor, Aswan, Hurghada, Santorini, Kyoto, Marrakech, Ubud, Saint Catherine, Siwa, linked to their country.
3. **Tour packages** — insert all 8 tours from the mock file, using the same slugs so existing links keep working:
   - `pyramids-and-nile-signature`
   - `red-sea-liveaboard`
   - `santorini-hidden-cyclades`
   - `kyoto-tea-and-temples`
   - `marrakech-and-sahara`
   - `bali-ubud-retreat`
   - `sinai-summit-trek`
   - `siwa-oasis-escape`

   Each row populated with: title, slug, hero image, price, duration, country_id, city_id, `archived = false`, plus the JSON columns already added (`highlights`, `hotels`, `flights`, `meals`, `transportation`, `availability`, `faqs`, `cities`) with plausible starter content, and `map_lat`/`map_lng`/`map_zoom` so the map tab renders.

4. **Gallery** — a few images per tour so the gallery tab isn't empty.

### Not in this change

- Listing pages (Home / Domestic / International / Egypt / Destinations) will keep reading from `src/lib/mock/data.ts` for now. They already show cards correctly; switching them to Supabase is a separate task if you want the admin dashboard to control what appears there.
- No schema changes — only data. Existing RLS/GRANTs already allow public reads on tours, countries, cities, and gallery.

### After it runs

Every tour card on the site will open a fully populated detail page (overview, itinerary, hotels, map, gallery, reviews, related tours). Would you like me to also convert the listing pages to read from Supabase in a follow-up, so the admin dashboard drives the whole site?