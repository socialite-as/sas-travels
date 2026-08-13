import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE_URL = "https://sas-travels.lovable.app";

interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/about", changefreq: "monthly", priority: "0.8" },
          { path: "/contact", changefreq: "monthly", priority: "0.8" },
          { path: "/destinations", changefreq: "weekly", priority: "0.9" },
          { path: "/domestic-tours", changefreq: "weekly", priority: "0.9" },
          { path: "/international-tours", changefreq: "weekly", priority: "0.9" },
          { path: "/egypt", changefreq: "weekly", priority: "0.9" },
          { path: "/blogs", changefreq: "weekly", priority: "0.8" },
          { path: "/gallery", changefreq: "monthly", priority: "0.7" },
          { path: "/faq", changefreq: "monthly", priority: "0.7" },
          { path: "/visa", changefreq: "monthly", priority: "0.7" },
          { path: "/travel-insurance", changefreq: "monthly", priority: "0.7" },
          { path: "/custom-itinerary", changefreq: "monthly", priority: "0.8" },
        ];

        // Load the server-side admin client inside the handler so it never ships to the browser.
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

        const today = new Date().toISOString().split("T")[0];

        try {
          const { data: tours } = await supabaseAdmin
            .from("tour_packages")
            .select("slug, updated_at")
            .eq("archived", false)
            .order("updated_at", { ascending: false });

          for (const tour of tours ?? []) {
            if (tour.slug) {
              entries.push({
                path: `/tours/${tour.slug}`,
                changefreq: "weekly",
                priority: "0.9",
                lastmod: tour.updated_at ? tour.updated_at.split("T")[0] : today,
              });
            }
          }
        } catch (err) {
          console.error("[sitemap] failed to load tour_packages", err);
        }

        try {
          const { data: posts } = await supabaseAdmin
            .from("blogs")
            .select("slug, updated_at")
            .eq("archived", false)
            .eq("published", true)
            .order("updated_at", { ascending: false });

          for (const post of posts ?? []) {
            if (post.slug) {
              entries.push({
                path: `/blogs/${post.slug}`,
                changefreq: "monthly",
                priority: "0.7",
                lastmod: post.updated_at ? post.updated_at.split("T")[0] : today,
              });
            }
          }
        } catch (err) {
          console.error("[sitemap] failed to load blogs", err);
        }

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
