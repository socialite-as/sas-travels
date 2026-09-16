import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseAnon } from "../supabase";

export default defineTool({
  name: "list_destinations",
  title: "List destinations",
  description: "List the countries and cities SAS Travels runs tours to.",
  inputSchema: { limit: z.number().int().min(1).max(100).optional().describe("Maximum countries returned (default 50).") },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ limit }) => {
    const supabase = supabaseAnon();
    const [countries, cities] = await Promise.all([
      supabase.from("countries").select("name,slug,summary").limit(limit ?? 50),
      supabase.from("cities").select("name,slug,country_id").limit(200),
    ]);
    if (countries.error) return { content: [{ type: "text", text: countries.error.message }], isError: true };
    const payload = { countries: countries.data ?? [], cities: cities.data ?? [] };
    return {
      content: [{ type: "text", text: JSON.stringify(payload) }],
      structuredContent: payload,
    };
  },
});
