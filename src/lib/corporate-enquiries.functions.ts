import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

export const corporateEnquirySchema = z.object({
  company_name: z.string().trim().min(1, "Company name is required").max(150),
  contact_name: z.string().trim().min(1, "Your name is required").max(120),
  email: z.string().trim().email("Enter a valid work email").max(255),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  team_size: z.coerce.number().int().min(1).max(100000).optional(),
  event_type: z.enum(["offsite", "retreat", "incentive", "other"]),
  destination: z.string().trim().max(200).optional().or(z.literal("")),
  preferred_dates: z.string().trim().max(120).optional().or(z.literal("")),
  budget_per_person: z.coerce.number().min(0).max(100000000).optional(),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  website: z.string().max(0).optional(), // honeypot
});

export type CorporateEnquiryInput = z.input<typeof corporateEnquirySchema>;

export const submitCorporateEnquiry = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => corporateEnquirySchema.parse(data))
  .handler(async ({ data }) => {
    if (data.website) return { ok: true };

    const url = process.env["SUPABASE_URL"] ?? process.env["VITE_SUPABASE_URL"];
    const key = process.env["SUPABASE_PUBLISHABLE_KEY"] ?? process.env["VITE_SUPABASE_PUBLISHABLE_KEY"];

    if (!url || !key) {
      console.error("[corporate-enquiry] missing Supabase env", {
        hasUrl: Boolean(url),
        hasKey: Boolean(key),
      });
      throw new Error(
        "We couldn't submit your enquiry right now. Please call +91 72047 51900 or email info@sastoursandtravels.com.",
      );
    }

    const supabasePublic = createClient<Database>(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: {
        fetch: (input, init) => {
          const h = new Headers(init?.headers);
          if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
          h.set("apikey", key);
          return fetch(input, { ...init, headers: h });
        },
      },
    });

    const { error } = await supabasePublic.from("corporate_enquiries").insert({
      company_name: data.company_name,
      contact_name: data.contact_name,
      email: data.email,
      phone: data.phone || null,
      team_size: data.team_size ?? null,
      event_type: data.event_type,
      destination: data.destination || null,
      preferred_dates: data.preferred_dates || null,
      budget_per_person: data.budget_per_person ?? null,
      message: data.message || null,
    });

    if (error) {
      console.error("[corporate-enquiry] insert failed", error);
      throw new Error("We couldn't submit your enquiry. Please try again or email us directly.");
    }

    return { ok: true };
  });
