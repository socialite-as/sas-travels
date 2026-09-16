import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "submit_corporate_enquiry",
  title: "Submit a corporate enquiry",
  description:
    "Send SAS Travels a B2B enquiry for a corporate offsite, retreat or incentive trip. The team follows up by email.",
  inputSchema: {
    company_name: z.string().trim().min(1).max(150),
    contact_name: z.string().trim().min(1).max(120),
    email: z.string().trim().email().max(255).describe("Work email for the follow-up."),
    phone: z.string().trim().max(30).optional(),
    event_type: z.enum(["offsite", "retreat", "incentive", "other"]),
    team_size: z.number().int().min(1).max(100000).optional(),
    destination: z.string().trim().max(200).optional(),
    preferred_dates: z.string().trim().max(120).optional(),
    budget_per_person: z.number().min(0).max(100000000).optional().describe("Budget per person in INR."),
    message: z.string().trim().max(2000).optional(),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: false },
  handler: async (input, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const supabase = supabaseForUser(ctx);
    const { data, error } = await supabase
      .from("corporate_enquiries")
      .insert({
        company_name: input.company_name,
        contact_name: input.contact_name,
        email: input.email,
        phone: input.phone ?? null,
        event_type: input.event_type,
        team_size: input.team_size ?? null,
        destination: input.destination ?? null,
        preferred_dates: input.preferred_dates ?? null,
        budget_per_person: input.budget_per_person ?? null,
        message: input.message ?? null,
      })
      .select("id,created_at")
      .maybeSingle();

    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: `Enquiry received. Reference: ${data?.id ?? "pending"}` }],
      structuredContent: { enquiry: data },
    };
  },
});
