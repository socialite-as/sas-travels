import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { getResource } from "@/lib/admin/resources";

const resourceKeySchema = z.object({ resourceKey: z.string().min(1) });
const recordSchema = resourceKeySchema.extend({ id: z.string().uuid() });

type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };
type AdminRow = { [key: string]: JsonValue };

const jsonValueSchema: z.ZodType<JsonValue> = z.lazy(() =>
  z.union([z.string(), z.number(), z.boolean(), z.null(), z.array(jsonValueSchema), z.record(jsonValueSchema)]),
);
const saveSchema = resourceKeySchema.extend({
  id: z.string().uuid().optional(),
  payload: z.record(z.string(), jsonValueSchema),
});
const archiveSchema = recordSchema.extend({ archived: z.boolean() });

export const listAdminResourceRows = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => resourceKeySchema.parse(input))
  .handler(async ({ data, context }) => {
    const resource = getResource(data.resourceKey);
    if (!resource) throw new Error("Unknown admin resource");

    const { data: roleRows, error: roleError } = await context.supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", context.userId);
    if (roleError) throw new Error(`Could not verify admin access: ${roleError.message}`);

    const roles = new Set((roleRows ?? []).map((row) => row.role));
    const isAdmin = roles.has("admin");
    const isEditor = roles.has("editor") || isAdmin;
    if (!isAdmin && !(resource.editorAccess && isEditor)) throw new Error("You do not have permission to manage this CMS section.");

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    let query = supabaseAdmin.from(resource.table as never).select("*").limit(200);
    if (resource.orderBy) query = query.order(resource.orderBy.column as never, { ascending: !!resource.orderBy.ascending });

    const { data: rows, error } = await query;
    if (error) throw new Error(error.message);
    return JSON.parse(JSON.stringify(rows ?? [])) as AdminRow[];
  });

export const getAdminResourceRecord = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => recordSchema.parse(input))
  .handler(async ({ data, context }) => {
    const resource = getResource(data.resourceKey);
    if (!resource) throw new Error("Unknown admin resource");

    const { data: roleRows, error: roleError } = await context.supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", context.userId);
    if (roleError) throw new Error(`Could not verify admin access: ${roleError.message}`);

    const roles = new Set((roleRows ?? []).map((row) => row.role));
    const isAdmin = roles.has("admin");
    const isEditor = roles.has("editor") || isAdmin;
    if (!isAdmin && !(resource.editorAccess && isEditor)) throw new Error("You do not have permission to manage this CMS section.");

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row, error } = await supabaseAdmin
      .from(resource.table as never)
      .select("*")
      .eq("id" as never, data.id as never)
      .maybeSingle();

    if (error) throw new Error(error.message);
    return row ? (JSON.parse(JSON.stringify(row)) as AdminRow) : null;
  });

export const saveAdminResourceRecord = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => saveSchema.parse(input))
  .handler(async ({ data, context }) => {
    const resource = getResource(data.resourceKey);
    if (!resource) throw new Error("Unknown admin resource");

    const { data: roleRows, error: roleError } = await context.supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", context.userId);
    if (roleError) throw new Error(`Could not verify admin access: ${roleError.message}`);

    const roles = new Set((roleRows ?? []).map((row) => row.role));
    const isAdmin = roles.has("admin");
    const isEditor = roles.has("editor") || isAdmin;
    if (!isAdmin && !(resource.editorAccess && isEditor)) throw new Error("You do not have permission to manage this CMS section.");

    const allowedFields = new Set(resource.fields.filter((field) => field.formVisible !== false).map((field) => field.name));
    const payload = Object.fromEntries(Object.entries(data.payload).filter(([key]) => allowedFields.has(key)));
    if (Object.keys(payload).length === 0) throw new Error("No CMS fields were provided to save.");

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const result = data.id
      ? await supabaseAdmin.from(resource.table as never).update(payload as never).eq("id" as never, data.id as never).select("*").single()
      : await supabaseAdmin.from(resource.table as never).insert(payload as never).select("*").single();

    if (result.error) throw new Error(result.error.message);
    return JSON.parse(JSON.stringify(result.data)) as AdminRow;
  });

export const deleteAdminResourceRecord = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => recordSchema.parse(input))
  .handler(async ({ data, context }) => {
    const resource = getResource(data.resourceKey);
    if (!resource) throw new Error("Unknown admin resource");

    const { data: roleRows, error: roleError } = await context.supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", context.userId);
    if (roleError) throw new Error(`Could not verify admin access: ${roleError.message}`);

    const roles = new Set((roleRows ?? []).map((row) => row.role));
    const isAdmin = roles.has("admin");
    const isEditor = roles.has("editor") || isAdmin;
    if (!isAdmin && !(resource.editorAccess && isEditor)) throw new Error("You do not have permission to manage this CMS section.");

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from(resource.table as never).delete().eq("id" as never, data.id as never);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const setAdminResourceArchived = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => archiveSchema.parse(input))
  .handler(async ({ data, context }) => {
    const resource = getResource(data.resourceKey);
    if (!resource) throw new Error("Unknown admin resource");
    if (!resource.fields.some((field) => field.name === "archived")) throw new Error("This CMS section cannot be archived.");

    const { data: roleRows, error: roleError } = await context.supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", context.userId);
    if (roleError) throw new Error(`Could not verify admin access: ${roleError.message}`);

    const roles = new Set((roleRows ?? []).map((row) => row.role));
    const isAdmin = roles.has("admin");
    const isEditor = roles.has("editor") || isAdmin;
    if (!isAdmin && !(resource.editorAccess && isEditor)) throw new Error("You do not have permission to manage this CMS section.");

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from(resource.table as never)
      .update({ archived: data.archived } as never)
      .eq("id" as never, data.id as never);
    if (error) throw new Error(error.message);
    return { ok: true };
  });