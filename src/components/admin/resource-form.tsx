import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import type { Resource, ResourceField } from "@/lib/admin/resources";

type Props = {
  resource: Resource;
  recordId?: string;
};

type Row = Record<string, unknown>;

export function ResourceForm({ resource, recordId }: Props) {
  const navigate = useNavigate();
  const [values, setValues] = useState<Row>({});
  const [loading, setLoading] = useState(!!recordId);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!recordId) return;
    (async () => {
      const { data, error } = await supabase
        .from(resource.table as never)
        .select("*")
        .eq("id", recordId)
        .maybeSingle();
      if (error) toast.error(error.message);
      if (data) setValues(data as Row);
      setLoading(false);
    })();
  }, [recordId, resource.table]);

  const setField = (name: string, v: unknown) => setValues((prev) => ({ ...prev, [name]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    // Normalize JSON fields
    const payload: Row = {};
    for (const f of resource.fields) {
      if (f.formVisible === false) continue;
      const v = values[f.name];
      if (f.type === "json") {
        if (v === undefined || v === "" || v === null) continue;
        if (typeof v === "string") {
          try {
            payload[f.name] = JSON.parse(v);
          } catch {
            toast.error(`Invalid JSON in ${f.label}`);
            setSaving(false);
            return;
          }
        } else {
          payload[f.name] = v;
        }
      } else if (f.type === "number") {
        payload[f.name] = v === "" || v == null ? null : Number(v);
      } else if (f.type === "boolean") {
        payload[f.name] = !!v;
      } else if (v === "") {
        payload[f.name] = null;
      } else if (v !== undefined) {
        payload[f.name] = v;
      }
    }

    const table = resource.table as never;
    const res = recordId
      ? await supabase.from(table).update(payload as never).eq("id", recordId)
      : await supabase.from(table).insert(payload as never);
    setSaving(false);
    if (res.error) return toast.error(res.error.message);
    toast.success(`${resource.singular} ${recordId ? "updated" : "created"}`);
    navigate({ to: "/admin/$resource", params: { resource: resource.key } });
  };

  if (loading) return <p className="text-muted-foreground">Loading…</p>;

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-3xl">
      {resource.fields.filter((f) => f.formVisible !== false).map((f) => (
        <FieldRow key={f.name} field={f} value={values[f.name]} onChange={(v) => setField(f.name, v)} />
      ))}
      <div className="flex gap-2">
        <Button type="submit" disabled={saving}>{saving ? "Saving…" : recordId ? "Save changes" : `Create ${resource.singular}`}</Button>
        <Button type="button" variant="outline" onClick={() => navigate({ to: "/admin/$resource", params: { resource: resource.key } })}>Cancel</Button>
      </div>
    </form>
  );
}

function FieldRow({ field, value, onChange }: { field: ResourceField; value: unknown; onChange: (v: unknown) => void }) {
  const id = `f-${field.name}`;
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>
        {field.label}
        {field.required ? <span className="text-destructive"> *</span> : null}
      </Label>
      {field.type === "textarea" && (
        <Textarea id={id} value={(value as string) ?? ""} onChange={(e) => onChange(e.target.value)} rows={4} required={field.required} />
      )}
      {field.type === "json" && (
        <Textarea
          id={id}
          className="font-mono text-xs"
          rows={6}
          placeholder='e.g. ["item1","item2"] or {"key":"value"}'
          value={typeof value === "string" ? value : value ? JSON.stringify(value, null, 2) : ""}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
      {field.type === "boolean" && (
        <div className="flex items-center gap-2"><Switch id={id} checked={!!value} onCheckedChange={onChange} /></div>
      )}
      {field.type === "select" && field.options && (
        <Select value={(value as string) ?? ""} onValueChange={onChange}>
          <SelectTrigger id={id}><SelectValue placeholder="Select…" /></SelectTrigger>
          <SelectContent>
            {field.options.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
          </SelectContent>
        </Select>
      )}
      {(field.type === "text" || field.type === "number" || field.type === "date") && (
        <Input
          id={id}
          type={field.type === "number" ? "number" : field.type === "date" ? "date" : "text"}
          value={
            field.type === "date" && value
              ? String(value).slice(0, 10)
              : (value as string | number | undefined) ?? ""
          }
          onChange={(e) => onChange(e.target.value)}
          required={field.required}
          placeholder={field.placeholder}
        />
      )}
    </div>
  );
}
