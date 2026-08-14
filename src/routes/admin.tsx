import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, Plus, RefreshCw, Save, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { siteContentQueryOptions } from "@/lib/site-content-query";
import { imageKeys } from "@/lib/site-images";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — FireboxTechs" },
      {
        name: "description",
        content:
          "Manage FireboxTechs projects, services, company information and incoming contact messages.",
      },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Admin Dashboard — FireboxTechs" },
      {
        property: "og:description",
        content: "Internal dashboard for managing FireboxTechs site content.",
      },
    ],
  }),
  component: AdminPage,
});

const field =
  "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/25";
const btn =
  "inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-semibold transition-colors hover:border-primary hover:text-primary";
const btnPrimary =
  "inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90";

const csv = (v: string[] | null | undefined) => (v ?? []).join(", ");
const parseCsv = (v: string) =>
  v
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

function useAdminTable(table: "projects" | "services" | "contact_messages") {
  return useQuery({
    queryKey: ["admin", table],
    queryFn: async () => {
      const order = table === "contact_messages" ? "created_at" : "sort_order";
      const { data, error } = await supabase
        .from(table)
        .select("*")
        .order(order, { ascending: table !== "contact_messages" });
      if (error) throw error;
      return (data ?? []) as any[];
    },
  });
}

function AdminPage() {
  return (
    <div className="px-4 py-8 sm:px-6">
      <header className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">Dashboard</p>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Content admin</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Edit projects, services, company info and read contact messages. Changes go live
          immediately.
        </p>
      </header>

      <Tabs defaultValue="projects">
        <TabsList>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="company">Company</TabsTrigger>
        </TabsList>
        <TabsContent value="projects" className="mt-4">
          <ProjectsPanel />
        </TabsContent>
        <TabsContent value="services" className="mt-4">
          <ServicesPanel />
        </TabsContent>
        <TabsContent value="messages" className="mt-4">
          <MessagesPanel />
        </TabsContent>
        <TabsContent value="company" className="mt-4">
          <CompanyPanel />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function useRefresh(table: string) {
  const qc = useQueryClient();
  return async () => {
    await qc.invalidateQueries({ queryKey: ["admin", table] });
    await qc.invalidateQueries({ queryKey: ["site-content"] });
  };
}

function PanelShell({
  loading,
  onAdd,
  onRefresh,
  addLabel,
  children,
}: {
  loading: boolean;
  onAdd?: () => void;
  onRefresh: () => void;
  addLabel?: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="mb-3 flex items-center gap-2">
        {onAdd && (
          <button type="button" className={btnPrimary} onClick={onAdd}>
            <Plus className="h-3.5 w-3.5" /> {addLabel}
          </button>
        )}
        <button type="button" className={btn} onClick={onRefresh}>
          <RefreshCw className="h-3.5 w-3.5" /> Refresh
        </button>
        {loading && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
      </div>
      <div className="grid gap-3">{children}</div>
    </section>
  );
}

function ProjectsPanel() {
  const { data = [], isFetching } = useAdminTable("projects");
  const refresh = useRefresh("projects");

  const add = async () => {
    const { error } = await supabase.from("projects").insert({
      slug: `new-project-${Date.now()}`,
      name: "New project",
      category: "Web",
      description: "",
      image: imageKeys[0] ?? "",
      published: false,
      sort_order: data.length + 1,
    });
    if (error) { toast.error(error.message); return; }
    toast.success("Project created");
    refresh();
  };

  return (
    <PanelShell loading={isFetching} onAdd={add} onRefresh={refresh} addLabel="New project">
      {data.map((row) => (
        <ProjectRow key={row.id} row={row} onSaved={refresh} />
      ))}
    </PanelShell>
  );
}

function ProjectRow({ row, onSaved }: { row: any; onSaved: () => void }) {
  const [form, setForm] = useState(row);
  const [saving, setSaving] = useState(false);
  useEffect(() => setForm(row), [row]);
  const set = (k: string, v: unknown) => setForm((f: any) => ({ ...f, [k]: v }));

  const save = async () => {
    setSaving(true);
    const { error } = await supabase
      .from("projects")
      .update({
        slug: form.slug,
        name: form.name,
        category: form.category,
        description: form.description,
        long_description: form.long_description,
        image: form.image,
        published: form.published,
        sort_order: Number(form.sort_order) || 0,
        features: form.features ?? [],
        technologies: form.technologies ?? [],
        live_demo: form.live_demo || null,
        github: form.github || null,
      })
      .eq("id", row.id);
    setSaving(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Saved");
    onSaved();
  };

  const remove = async () => {
    const { error } = await supabase.from("projects").delete().eq("id", row.id);
    if (error) { toast.error(error.message); return; }
    toast.success("Deleted");
    onSaved();
  };

  return (
    <article className="rounded-xl border border-border bg-card p-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Name" value={form.name ?? ""} onChange={(v) => set("name", v)} />
        <Field label="Slug" value={form.slug ?? ""} onChange={(v) => set("slug", v)} />
        <Field label="Category" value={form.category ?? ""} onChange={(v) => set("category", v)} />
        <Field label="Image" value={form.image ?? ""} onChange={(v) => set("image", v)} hint={imageKeys.join(" · ")} />
        <Field
          label="Short description"
          value={form.description ?? ""}
          onChange={(v) => set("description", v)}
          textarea
        />
        <Field
          label="Long description"
          value={form.long_description ?? ""}
          onChange={(v) => set("long_description", v)}
          textarea
        />
        <Field
          label="Features (comma separated)"
          value={csv(form.features)}
          onChange={(v) => set("features", parseCsv(v))}
        />
        <Field
          label="Technologies (comma separated)"
          value={csv(form.technologies)}
          onChange={(v) => set("technologies", parseCsv(v))}
        />
        <Field label="Live demo URL" value={form.live_demo ?? ""} onChange={(v) => set("live_demo", v)} />
        <Field label="GitHub URL" value={form.github ?? ""} onChange={(v) => set("github", v)} />
        <Field
          label="Sort order"
          value={String(form.sort_order ?? 0)}
          onChange={(v) => set("sort_order", v)}
        />
        <label className="flex items-end gap-2 pb-2 text-sm">
          <input
            type="checkbox"
            checked={!!form.published}
            onChange={(e) => set("published", e.target.checked)}
          />
          Published
        </label>
      </div>
      <RowActions saving={saving} onSave={save} onDelete={remove} />
    </article>
  );
}

function ServicesPanel() {
  const { data = [], isFetching } = useAdminTable("services");
  const refresh = useRefresh("services");

  const add = async () => {
    const { error } = await supabase.from("services").insert({
      slug: `new-service-${Date.now()}`,
      title: "New service",
      icon: "Code2",
      short_text: "",
      cta_label: "Get Started",
      sort_order: data.length + 1,
    });
    if (error) { toast.error(error.message); return; }
    toast.success("Service created");
    refresh();
  };

  return (
    <PanelShell loading={isFetching} onAdd={add} onRefresh={refresh} addLabel="New service">
      {data.map((row) => (
        <ServiceRow key={row.id} row={row} onSaved={refresh} />
      ))}
    </PanelShell>
  );
}

function ServiceRow({ row, onSaved }: { row: any; onSaved: () => void }) {
  const [form, setForm] = useState(row);
  const [saving, setSaving] = useState(false);
  useEffect(() => setForm(row), [row]);
  const set = (k: string, v: unknown) => setForm((f: any) => ({ ...f, [k]: v }));

  const save = async () => {
    setSaving(true);
    const { error } = await supabase
      .from("services")
      .update({
        slug: form.slug,
        title: form.title,
        icon: form.icon,
        short_text: form.short_text,
        cta_label: form.cta_label,
        description: form.description,
        features: form.features ?? [],
        technologies: form.technologies ?? [],
        related_categories: form.related_categories ?? [],
        sort_order: Number(form.sort_order) || 0,
      })
      .eq("id", row.id);
    setSaving(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Saved");
    onSaved();
  };

  const remove = async () => {
    const { error } = await supabase.from("services").delete().eq("id", row.id);
    if (error) { toast.error(error.message); return; }
    toast.success("Deleted");
    onSaved();
  };

  return (
    <article className="rounded-xl border border-border bg-card p-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Title" value={form.title ?? ""} onChange={(v) => set("title", v)} />
        <Field label="Slug" value={form.slug ?? ""} onChange={(v) => set("slug", v)} />
        <Field label="Lucide icon" value={form.icon ?? ""} onChange={(v) => set("icon", v)} />
        <Field label="CTA label" value={form.cta_label ?? ""} onChange={(v) => set("cta_label", v)} />
        <Field
          label="Short text"
          value={form.short_text ?? ""}
          onChange={(v) => set("short_text", v)}
          textarea
        />
        <Field
          label="Description"
          value={form.description ?? ""}
          onChange={(v) => set("description", v)}
          textarea
        />
        <Field
          label="Features (comma separated)"
          value={csv(form.features)}
          onChange={(v) => set("features", parseCsv(v))}
        />
        <Field
          label="Technologies (comma separated)"
          value={csv(form.technologies)}
          onChange={(v) => set("technologies", parseCsv(v))}
        />
        <Field
          label="Related categories (comma separated)"
          value={csv(form.related_categories)}
          onChange={(v) => set("related_categories", parseCsv(v))}
        />
        <Field
          label="Sort order"
          value={String(form.sort_order ?? 0)}
          onChange={(v) => set("sort_order", v)}
        />
      </div>
      <RowActions saving={saving} onSave={save} onDelete={remove} />
    </article>
  );
}

function MessagesPanel() {
  const { data = [], isFetching } = useAdminTable("contact_messages");
  const refresh = useRefresh("contact_messages");

  const remove = async (id: string) => {
    const { error } = await supabase.from("contact_messages").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    refresh();
  };

  return (
    <PanelShell loading={isFetching} onRefresh={refresh}>
      {data.length === 0 && (
        <p className="rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
          No messages yet.
        </p>
      )}
      {data.map((m) => (
        <article key={m.id} className="rounded-xl border border-border bg-card p-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold">{m.name}</span>
            <a href={`mailto:${m.email}`} className="text-sm text-primary">
              {m.email}
            </a>
            {m.service && (
              <span className="rounded-md border border-border px-2 py-0.5 text-xs text-muted-foreground">
                {m.service}
              </span>
            )}
            <span className="ml-auto text-xs text-muted-foreground">
              {m.created_at ? new Date(m.created_at).toLocaleString() : ""}
            </span>
          </div>
          <p className="mt-2 whitespace-pre-wrap text-sm text-muted-foreground">{m.message}</p>
          <button type="button" className={`${btn} mt-3`} onClick={() => remove(m.id)}>
            <Trash2 className="h-3.5 w-3.5" /> Delete
          </button>
        </article>
      ))}
    </PanelShell>
  );
}

function CompanyPanel() {
  const qc = useQueryClient();
  const { data, isFetching } = useQuery({
    queryKey: ["admin", "site_settings"],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_settings").select("key, value");
      if (error) throw error;
      return (data ?? []) as { key: string; value: unknown }[];
    },
  });
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  useEffect(() => {
    if (!data) return;
    setDrafts(Object.fromEntries(data.map((r) => [r.key, JSON.stringify(r.value, null, 2)])));
  }, [data]);

  const save = async (key: string) => {
    let parsed: unknown;
    try {
      parsed = JSON.parse(drafts[key] ?? "");
    } catch {
      toast.error("Invalid JSON");
      return;
    }
    const { error } = await supabase
      .from("site_settings")
      .update({ value: parsed as never })
      .eq("key", key);
    if (error) { toast.error(error.message); return; }
    toast.success(`Saved ${key}`);
    qc.invalidateQueries({ queryKey: ["admin", "site_settings"] });
    qc.invalidateQueries({ queryKey: ["site-content"] });
  };

  return (
    <PanelShell
      loading={isFetching}
      onRefresh={() => qc.invalidateQueries({ queryKey: ["admin", "site_settings"] })}
    >
      {(data ?? []).map((row) => (
        <article key={row.key} className="rounded-xl border border-border bg-card p-4">
          <h2 className="text-sm font-semibold capitalize">{row.key.replace(/_/g, " ")}</h2>
          <textarea
            className={`${field} mt-2 min-h-40 font-mono text-xs`}
            value={drafts[row.key] ?? ""}
            onChange={(e) => setDrafts((d) => ({ ...d, [row.key]: e.target.value }))}
          />
          <button type="button" className={`${btnPrimary} mt-3`} onClick={() => save(row.key)}>
            <Save className="h-3.5 w-3.5" /> Save
          </button>
        </article>
      ))}
    </PanelShell>
  );
}

function Field({
  label,
  value,
  onChange,
  textarea,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold">{label}</span>
      {textarea ? (
        <textarea
          className={`${field} min-h-20`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input className={field} value={value} onChange={(e) => onChange(e.target.value)} />
      )}
      {hint && <span className="mt-1 block text-[11px] text-muted-foreground">{hint}</span>}
    </label>
  );
}

function RowActions({
  saving,
  onSave,
  onDelete,
}: {
  saving: boolean;
  onSave: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="mt-3 flex items-center gap-2">
      <button type="button" className={btnPrimary} onClick={onSave} disabled={saving}>
        {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
        Save
      </button>
      <button type="button" className={btn} onClick={onDelete}>
        <Trash2 className="h-3.5 w-3.5" /> Delete
      </button>
    </div>
  );
}
