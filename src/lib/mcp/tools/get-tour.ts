import { defineTool, ToolError } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseAnon } from "../supabase";

export default defineTool({
  name: "get_tour",
  title: "Get tour details",
  description:
    "Fetch the full details of one SAS Travels tour package by its slug: itinerary, inclusions, hotels, meals, price and cancellation policy.",
  inputSchema: { slug: z.string().trim().min(1).describe("Tour slug, e.g. 'udupi-coastal-escape'.") },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ slug }) => {
    const supabase = supabaseAnon();
    const { data, error } = await supabase
      .from("tour_packages")
      .select("*, countries:country_id ( name, slug ), cities_ref:city_id ( name, slug )")
      .eq("slug", slug)
      .eq("archived", false)
      .maybeSingle();

    if (error) throw new ToolError(error.message);
    if (!data) throw new ToolError(`No tour found with slug "${slug}".`);
    return {
      content: [{ type: "text", text: JSON.stringify(data) }],
      structuredContent: { tour: data },
    };
  },
});
