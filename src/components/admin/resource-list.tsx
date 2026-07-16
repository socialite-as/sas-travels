import { useEffect, useState, useCallback } from "react";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Pencil, Trash2, Archive, ArchiveRestore, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteAdminResourceRecord, listAdminResourceRows, setAdminResourceArchived } from "@/lib/admin-resource.functions";
import type { Resource } from "@/lib/admin/resources";

type Row = Record<string, unknown> & { id: string };

export function ResourceList({ resource }: { resource: Resource }) {
  const listRows = useServerFn(listAdminResourceRows);
  const deleteRecord = useServerFn(deleteAdminResourceRecord);
  const setArchived = useServerFn(setAdminResourceArchived);
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const hasArchived = resource.fields.some((f) => f.name === "archived");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await listRows({ data: { resourceKey: resource.key } });
      setRows((data as Row[]) ?? []);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : `Could not load ${resource.label.toLowerCase()}`);
      setRows([]);
    } finally {
      setLoading(false);
    }
  }, [listRows, resource.key, resource.label]);

  useEffect(() => { load(); }, [load]);

  const del = async (id: string) => {
    try {
      await deleteRecord({ data: { resourceKey: resource.key, id } });
      toast.success("Deleted");
      load();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not delete record");
    }
  };

  const toggleArchive = async (row: Row) => {
    try {
      await setArchived({ data: { resourceKey: resource.key, id: row.id, archived: !row.archived } });
      toast.success(row.archived ? "Restored" : "Archived");
      load();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not update archive status");
    }
  };

  const listCols = resource.fields.filter((f) => f.listVisible);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">{resource.label}</h2>
          <p className="text-sm text-muted-foreground">{rows.length} record{rows.length === 1 ? "" : "s"}</p>
        </div>
        <Button asChild>
          <Link to="/admin/$resource/new" params={{ resource: resource.key }}>
            <Plus className="mr-2 h-4 w-4" /> New {resource.singular}
          </Link>
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {listCols.map((c) => <TableHead key={c.name}>{c.label}</TableHead>)}
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={listCols.length + 1} className="text-center text-muted-foreground">Loading…</TableCell></TableRow>
            ) : rows.length === 0 ? (
              <TableRow><TableCell colSpan={listCols.length + 1} className="text-center text-muted-foreground">No records yet.</TableCell></TableRow>
            ) : rows.map((row) => (
              <TableRow key={row.id} className={row.archived ? "opacity-60" : ""}>
                {listCols.map((c) => (
                  <TableCell key={c.name} className="max-w-xs truncate">
                    {renderCell(row[c.name], c.type)}
                  </TableCell>
                ))}
                <TableCell className="text-right">
                  <div className="inline-flex gap-1">
                    <Button asChild size="icon" variant="ghost">
                      <Link to="/admin/$resource/$id" params={{ resource: resource.key, id: row.id }}>
                        <Pencil className="h-4 w-4" />
                      </Link>
                    </Button>
                    {hasArchived && (
                      <Button size="icon" variant="ghost" onClick={() => toggleArchive(row)}>
                        {row.archived ? <ArchiveRestore className="h-4 w-4" /> : <Archive className="h-4 w-4" />}
                      </Button>
                    )}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="icon" variant="ghost" className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete this {resource.singular.toLowerCase()}?</AlertDialogTitle>
                          <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => del(row.id)}>Delete</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function renderCell(value: unknown, type: string) {
  if (value === null || value === undefined || value === "") return <span className="text-muted-foreground">—</span>;
  if (type === "boolean") return <Badge variant={value ? "default" : "outline"}>{value ? "Yes" : "No"}</Badge>;
  if (type === "date") return String(value).slice(0, 10);
  if (typeof value === "object") return <span className="font-mono text-xs">{JSON.stringify(value).slice(0, 40)}</span>;
  return String(value);
}
