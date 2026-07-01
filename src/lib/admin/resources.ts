// Config-driven admin resources. Each resource maps to a Supabase table and
// declares the fields used to render list columns and CRUD forms.

export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "boolean"
  | "date"
  | "select"
  | "json";

export type ResourceField = {
  name: string;
  label: string;
  type: FieldType;
  options?: { label: string; value: string }[];
  required?: boolean;
  listVisible?: boolean;
  formVisible?: boolean;
  placeholder?: string;
};

export type Resource = {
  key: string; // route slug
  table: string; // supabase table name
  label: string; // plural display
  singular: string;
  editorAccess?: boolean; // if true, editors (not just admins) can access
  primaryColumn?: string; // shown as row label
  orderBy?: { column: string; ascending?: boolean };
  fields: ResourceField[];
};

const BOOKING_STATUS = ["pending", "confirmed", "cancelled", "completed", "refunded"].map((v) => ({ label: v, value: v }));
const PAYMENT_STATUS = ["pending", "paid", "failed", "refunded"].map((v) => ({ label: v, value: v }));
const ITINERARY_STATUS = ["new", "in_review", "quoted", "accepted", "rejected", "closed"].map((v) => ({ label: v, value: v }));
const DOC_STATUS = ["pending", "approved", "rejected"].map((v) => ({ label: v, value: v }));
const CATEGORY_TYPE = ["tour", "blog"].map((v) => ({ label: v, value: v }));
const COUPON_TYPE = ["percentage", "fixed"].map((v) => ({ label: v, value: v }));
const NOTIF_TYPE = ["info", "success", "warning", "error"].map((v) => ({ label: v, value: v }));
const APP_ROLE = ["admin", "editor", "user"].map((v) => ({ label: v, value: v }));

export const RESOURCES: Resource[] = [
  {
    key: "profiles",
    table: "profiles",
    label: "Users",
    singular: "User",
    primaryColumn: "email",
    orderBy: { column: "created_at", ascending: false },
    fields: [
      { name: "email", label: "Email", type: "text", listVisible: true, formVisible: false },
      { name: "full_name", label: "Full name", type: "text", listVisible: true },
      { name: "phone", label: "Phone", type: "text" },
      { name: "country", label: "Country", type: "text" },
      { name: "avatar_url", label: "Avatar URL", type: "text" },
    ],
  },
  {
    key: "user_roles",
    table: "user_roles",
    label: "Admins & Roles",
    singular: "Role",
    primaryColumn: "role",
    orderBy: { column: "created_at", ascending: false },
    fields: [
      { name: "user_id", label: "User ID", type: "text", required: true, listVisible: true, placeholder: "auth user uuid" },
      { name: "role", label: "Role", type: "select", options: APP_ROLE, required: true, listVisible: true },
    ],
  },
  {
    key: "countries",
    table: "countries",
    label: "Countries",
    singular: "Country",
    editorAccess: true,
    primaryColumn: "name",
    orderBy: { column: "name", ascending: true },
    fields: [
      { name: "name", label: "Name", type: "text", required: true, listVisible: true },
      { name: "slug", label: "Slug", type: "text", required: true, listVisible: true },
      { name: "code", label: "Code", type: "text" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "hero_image", label: "Hero image URL", type: "text" },
      { name: "featured", label: "Featured", type: "boolean", listVisible: true },
      { name: "archived", label: "Archived", type: "boolean", listVisible: true },
    ],
  },
  {
    key: "cities",
    table: "cities",
    label: "Cities",
    singular: "City",
    editorAccess: true,
    primaryColumn: "name",
    orderBy: { column: "name", ascending: true },
    fields: [
      { name: "name", label: "Name", type: "text", required: true, listVisible: true },
      { name: "slug", label: "Slug", type: "text", required: true, listVisible: true },
      { name: "country_id", label: "Country ID", type: "text" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "image_url", label: "Image URL", type: "text" },
      { name: "archived", label: "Archived", type: "boolean", listVisible: true },
    ],
  },
  {
    key: "categories",
    table: "categories",
    label: "Categories",
    singular: "Category",
    editorAccess: true,
    primaryColumn: "name",
    orderBy: { column: "name", ascending: true },
    fields: [
      { name: "name", label: "Name", type: "text", required: true, listVisible: true },
      { name: "slug", label: "Slug", type: "text", required: true, listVisible: true },
      { name: "type", label: "Type", type: "select", options: CATEGORY_TYPE, listVisible: true },
      { name: "description", label: "Description", type: "textarea" },
      { name: "archived", label: "Archived", type: "boolean", listVisible: true },
    ],
  },
  {
    key: "tour_packages",
    table: "tour_packages",
    label: "Tour Packages",
    singular: "Tour",
    editorAccess: true,
    primaryColumn: "title",
    orderBy: { column: "created_at", ascending: false },
    fields: [
      { name: "title", label: "Title", type: "text", required: true, listVisible: true },
      { name: "slug", label: "Slug", type: "text", required: true, listVisible: true },
      { name: "summary", label: "Summary", type: "textarea" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "country_id", label: "Country ID", type: "text" },
      { name: "city_id", label: "City ID", type: "text" },
      { name: "category_id", label: "Category ID", type: "text" },
      { name: "price", label: "Price", type: "number", listVisible: true },
      { name: "discount_price", label: "Discount price", type: "number" },
      { name: "currency", label: "Currency", type: "text" },
      { name: "duration_days", label: "Duration (days)", type: "number", listVisible: true },
      { name: "duration_nights", label: "Duration (nights)", type: "number" },
      { name: "max_group_size", label: "Max group size", type: "number" },
      { name: "difficulty", label: "Difficulty", type: "text" },
      { name: "cover_image", label: "Cover image URL", type: "text" },
      { name: "images", label: "Images (JSON array)", type: "json" },
      { name: "itinerary", label: "Itinerary (JSON)", type: "json" },
      { name: "inclusions", label: "Inclusions (JSON array)", type: "json" },
      { name: "exclusions", label: "Exclusions (JSON array)", type: "json" },
      { name: "is_domestic", label: "Domestic", type: "boolean", listVisible: true },
      { name: "featured", label: "Featured", type: "boolean", listVisible: true },
      { name: "archived", label: "Archived", type: "boolean", listVisible: true },
    ],
  },
  {
    key: "blogs",
    table: "blogs",
    label: "Blogs",
    singular: "Blog",
    editorAccess: true,
    primaryColumn: "title",
    orderBy: { column: "created_at", ascending: false },
    fields: [
      { name: "title", label: "Title", type: "text", required: true, listVisible: true },
      { name: "slug", label: "Slug", type: "text", required: true, listVisible: true },
      { name: "excerpt", label: "Excerpt", type: "textarea" },
      { name: "content", label: "Content", type: "textarea" },
      { name: "cover_image", label: "Cover image", type: "text" },
      { name: "category_id", label: "Category ID", type: "text" },
      { name: "tags", label: "Tags (JSON array)", type: "json" },
      { name: "published", label: "Published", type: "boolean", listVisible: true },
      { name: "published_at", label: "Published at", type: "date" },
      { name: "archived", label: "Archived", type: "boolean", listVisible: true },
    ],
  },
  {
    key: "testimonials",
    table: "testimonials",
    label: "Testimonials",
    singular: "Testimonial",
    editorAccess: true,
    primaryColumn: "author_name",
    orderBy: { column: "created_at", ascending: false },
    fields: [
      { name: "author_name", label: "Author name", type: "text", required: true, listVisible: true },
      { name: "author_role", label: "Author role", type: "text" },
      { name: "avatar_url", label: "Avatar URL", type: "text" },
      { name: "content", label: "Content", type: "textarea", required: true },
      { name: "rating", label: "Rating", type: "number", listVisible: true },
      { name: "approved", label: "Approved", type: "boolean", listVisible: true },
      { name: "archived", label: "Archived", type: "boolean", listVisible: true },
    ],
  },
  {
    key: "gallery",
    table: "gallery",
    label: "Gallery",
    singular: "Image",
    editorAccess: true,
    primaryColumn: "title",
    orderBy: { column: "sort_order", ascending: true },
    fields: [
      { name: "title", label: "Title", type: "text", listVisible: true },
      { name: "image_url", label: "Image URL", type: "text", required: true, listVisible: true },
      { name: "caption", label: "Caption", type: "textarea" },
      { name: "tour_id", label: "Tour ID", type: "text" },
      { name: "category_id", label: "Category ID", type: "text" },
      { name: "sort_order", label: "Sort order", type: "number" },
      { name: "archived", label: "Archived", type: "boolean", listVisible: true },
    ],
  },
  {
    key: "coupons",
    table: "coupons",
    label: "Coupons",
    singular: "Coupon",
    editorAccess: true,
    primaryColumn: "code",
    orderBy: { column: "created_at", ascending: false },
    fields: [
      { name: "code", label: "Code", type: "text", required: true, listVisible: true },
      { name: "description", label: "Description", type: "textarea" },
      { name: "discount_type", label: "Discount type", type: "select", options: COUPON_TYPE, listVisible: true },
      { name: "discount_value", label: "Discount value", type: "number", listVisible: true },
      { name: "max_uses", label: "Max uses", type: "number" },
      { name: "valid_from", label: "Valid from", type: "date" },
      { name: "valid_until", label: "Valid until", type: "date" },
      { name: "active", label: "Active", type: "boolean", listVisible: true },
      { name: "archived", label: "Archived", type: "boolean", listVisible: true },
    ],
  },
  {
    key: "bookings",
    table: "bookings",
    label: "Bookings",
    singular: "Booking",
    primaryColumn: "id",
    orderBy: { column: "created_at", ascending: false },
    fields: [
      { name: "user_id", label: "User ID", type: "text", required: true, listVisible: true },
      { name: "tour_id", label: "Tour ID", type: "text" },
      { name: "coupon_id", label: "Coupon ID", type: "text" },
      { name: "travellers", label: "Travellers", type: "number", listVisible: true },
      { name: "start_date", label: "Start date", type: "date", listVisible: true },
      { name: "end_date", label: "End date", type: "date" },
      { name: "total_amount", label: "Total", type: "number", listVisible: true },
      { name: "currency", label: "Currency", type: "text" },
      { name: "status", label: "Status", type: "select", options: BOOKING_STATUS, listVisible: true },
      { name: "contact_name", label: "Contact name", type: "text" },
      { name: "contact_email", label: "Contact email", type: "text" },
      { name: "contact_phone", label: "Contact phone", type: "text" },
      { name: "notes", label: "Notes", type: "textarea" },
      { name: "archived", label: "Archived", type: "boolean", listVisible: true },
    ],
  },
  {
    key: "custom_itinerary_requests",
    table: "custom_itinerary_requests",
    label: "Custom Itineraries",
    singular: "Request",
    primaryColumn: "full_name",
    orderBy: { column: "created_at", ascending: false },
    fields: [
      { name: "full_name", label: "Full name", type: "text", required: true, listVisible: true },
      { name: "email", label: "Email", type: "text", required: true, listVisible: true },
      { name: "phone", label: "Phone", type: "text" },
      { name: "destination", label: "Destination", type: "text", listVisible: true },
      { name: "start_date", label: "Start date", type: "date" },
      { name: "end_date", label: "End date", type: "date" },
      { name: "travellers", label: "Travellers", type: "number" },
      { name: "budget", label: "Budget", type: "number" },
      { name: "currency", label: "Currency", type: "text" },
      { name: "interests", label: "Interests (JSON)", type: "json" },
      { name: "notes", label: "Notes", type: "textarea" },
      { name: "status", label: "Status", type: "select", options: ITINERARY_STATUS, listVisible: true },
      { name: "archived", label: "Archived", type: "boolean", listVisible: true },
    ],
  },
  {
    key: "reviews",
    table: "reviews",
    label: "Reviews",
    singular: "Review",
    primaryColumn: "title",
    orderBy: { column: "created_at", ascending: false },
    fields: [
      { name: "user_id", label: "User ID", type: "text", required: true, listVisible: true },
      { name: "tour_id", label: "Tour ID", type: "text" },
      { name: "booking_id", label: "Booking ID", type: "text" },
      { name: "rating", label: "Rating", type: "number", required: true, listVisible: true },
      { name: "title", label: "Title", type: "text", listVisible: true },
      { name: "comment", label: "Comment", type: "textarea" },
      { name: "approved", label: "Approved", type: "boolean", listVisible: true },
      { name: "archived", label: "Archived", type: "boolean", listVisible: true },
    ],
  },
  {
    key: "payments",
    table: "payments",
    label: "Payments",
    singular: "Payment",
    primaryColumn: "id",
    orderBy: { column: "created_at", ascending: false },
    fields: [
      { name: "booking_id", label: "Booking ID", type: "text", required: true, listVisible: true },
      { name: "user_id", label: "User ID", type: "text", required: true, listVisible: true },
      { name: "amount", label: "Amount", type: "number", listVisible: true },
      { name: "currency", label: "Currency", type: "text" },
      { name: "provider", label: "Provider", type: "text", listVisible: true },
      { name: "provider_reference", label: "Provider reference", type: "text" },
      { name: "status", label: "Status", type: "select", options: PAYMENT_STATUS, listVisible: true },
      { name: "paid_at", label: "Paid at", type: "date" },
      { name: "metadata", label: "Metadata (JSON)", type: "json" },
      { name: "archived", label: "Archived", type: "boolean", listVisible: true },
    ],
  },
  {
    key: "notifications",
    table: "notifications",
    label: "Notifications",
    singular: "Notification",
    primaryColumn: "title",
    orderBy: { column: "created_at", ascending: false },
    fields: [
      { name: "user_id", label: "User ID", type: "text", required: true, listVisible: true },
      { name: "title", label: "Title", type: "text", required: true, listVisible: true },
      { name: "message", label: "Message", type: "textarea" },
      { name: "type", label: "Type", type: "select", options: NOTIF_TYPE, listVisible: true },
      { name: "link", label: "Link", type: "text" },
      { name: "read", label: "Read", type: "boolean", listVisible: true },
    ],
  },
  {
    key: "wishlist",
    table: "wishlist",
    label: "Wishlist",
    singular: "Wishlist item",
    primaryColumn: "id",
    orderBy: { column: "created_at", ascending: false },
    fields: [
      { name: "user_id", label: "User ID", type: "text", required: true, listVisible: true },
      { name: "tour_id", label: "Tour ID", type: "text", required: true, listVisible: true },
    ],
  },
  {
    key: "user_documents",
    table: "user_documents",
    label: "User Documents",
    singular: "Document",
    primaryColumn: "name",
    orderBy: { column: "created_at", ascending: false },
    fields: [
      { name: "user_id", label: "User ID", type: "text", required: true, listVisible: true },
      { name: "document_type", label: "Type", type: "text", listVisible: true },
      { name: "name", label: "Name", type: "text", required: true, listVisible: true },
      { name: "file_url", label: "File URL", type: "text", required: true },
      { name: "status", label: "Status", type: "select", options: DOC_STATUS, listVisible: true },
      { name: "notes", label: "Notes", type: "textarea" },
      { name: "archived", label: "Archived", type: "boolean", listVisible: true },
    ],
  },
];

export function getResource(key: string): Resource | undefined {
  return RESOURCES.find((r) => r.key === key);
}
