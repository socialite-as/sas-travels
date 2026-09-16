import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseAnon } from "../supabase";

export default defineTool({
  name: "search_tours",
  title: "Search tour packages",
  description:
    "Search SAS Travels tour packages by keyword, domestic/international scope, price and duration. Returns slug, title, price in INR and duration.",
  inputSchema: {
    query: z.string().trim().max(120).optional().describe("Keyword to match in the title or summary."),
    scope: z.enum(["domestic", "international", "all"]).optional().describe("Domestic (India) or international tours."),
    max_price: z.number().positive().optional().describe("Maximum price per person in INR."),
    limit: z.number().int().min(1).max(25).optional().describe("Maximum number of results (default 10)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ query, scope, max_price, limit }) => {
    const supabase = supabaseAnon();
    let q = supabase
      .from("tour_packages")
      .select("slug,title,summary,price,discount_price,currency,duration_days,duration_nights,is_domestic,featured")
      .eq("archived", false)
      .limit(limit ?? 10);

    if (query) q = q.or(`title.ilike.%${query}%,summary.ilike.%${query}%`);
    if (scope === "domestic") q = q.eq("is_domestic", true);
    if (scope === "international") q = q.eq("is_domestic", false);
    if (max_price) q = q.lte("price", max_price);

    const { data, error } = await q;
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data ?? []) }],
      structuredContent: { tours: data ?? [] },
    };
  },
});
