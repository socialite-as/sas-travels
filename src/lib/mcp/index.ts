import { auth, defineMcp } from "@lovable.dev/mcp-js";
import searchTours from "./tools/search-tours";
import getTour from "./tools/get-tour";
import listDestinations from "./tools/list-destinations";
import listMyBookings from "./tools/list-my-bookings";
import submitCorporateEnquiry from "./tools/submit-corporate-enquiry";

const projectRef = import.meta.env['VITE_SUPABASE_PROJECT_ID'] ?? "project-ref-unset";

export default defineMcp({
  name: "sas-travels",
  title: "SAS Travels",
  version: "0.1.0",
  instructions:
    "Tools for SAS Travels, a travel agency in Udupi, India. Browse tour packages and destinations, review the signed-in traveller's bookings, and send corporate (B2B) trip enquiries. Prices are in INR.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [searchTours, getTour, listDestinations, listMyBookings, submitCorporateEnquiry],
});
