import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import {
  defaultSiteContent,
  type Project,
  type Service,
  type SiteContent,
  type SiteSettings,
} from "@/lib/site-content";

export const getSiteContent = createServerFn({ method: "GET" }).handler(
  async (): Promise<SiteContent> => {
    const url = process.env["SUPABASE_URL"];
    const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
    if (!url || !key) return defaultSiteContent;

    const client = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: {
        fetch: (input, init) => {
          const h = new Headers(init?.headers);
          if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) {
            h.delete("Authorization");
          }
          h.set("apikey", key);
          return fetch(input, { ...init, headers: h });
        },
      },
    });

    try {
      const [projectsRes, servicesRes, settingsRes] = await Promise.all([
        client.from("projects").select("*").order("sort_order", { ascending: true }),
        client.from("services").select("*").order("sort_order", { ascending: true }),
        client.from("site_settings").select("key, value"),
      ]);

      const projects: Project[] = (projectsRes.data ?? []).map((row: any) => ({
        id: row.id,
        slug: row.slug,
        name: row.name,
        category: row.category ?? "",
        description: row.description ?? "",
        image: row.image ?? "",
        published: !!row.published,
        longDescription: row.long_description ?? "",
        features: row.features ?? [],
        technologies: row.technologies ?? [],
        liveDemo: row.live_demo ?? undefined,
        github: row.github ?? undefined,
      }));

      const services: Service[] = (servicesRes.data ?? []).map((row: any) => ({
        id: row.id,
        slug: row.slug,
        icon: row.icon ?? "Code2",
        title: row.title,
        shortText: row.short_text ?? "",
        ctaLabel: row.cta_label ?? "Get Started",
        description: row.description ?? "",
        features: row.features ?? [],
        technologies: row.technologies ?? [],
        relatedCategories: row.related_categories ?? [],
      }));

      const settings = { ...defaultSiteContent.settings } as SiteSettings;
      for (const row of settingsRes.data ?? []) {
        (settings as any)[(row as any).key] = (row as any).value;
      }

      return {
        projects: projects.length ? projects : defaultSiteContent.projects,
        services: services.length ? services : defaultSiteContent.services,
        settings,
      };
    } catch {
      return defaultSiteContent;
    }
  },
);
