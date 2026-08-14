import { createServerFn } from "@tanstack/react-start";
import {
  defaultSiteContent,
  type Project,
  type Service,
  type SiteContent,
  type SiteSettings,
} from "@/lib/site-content";
import {
  getProjectsCollection,
  getServicesCollection,
  getSiteSettingsCollection,
} from "@/lib/mongodb";

export const getSiteContent = createServerFn({ method: "GET" }).handler(
  async (): Promise<SiteContent> => {
    try {
      const [projectsColl, servicesColl, settingsColl] = await Promise.all([
        getProjectsCollection(),
        getServicesCollection(),
        getSiteSettingsCollection(),
      ]);

      const [projectsData, servicesData, settingsData] = await Promise.all([
        projectsColl
          .find({ published: true })
          .sort({ sort_order: 1 })
          .toArray(),
        servicesColl.find({}).sort({ sort_order: 1 }).toArray(),
        settingsColl.find({}).toArray(),
      ]);

      const projects: Project[] = projectsData.map((row: any) => ({
        id: row._id?.toString() || "",
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

      const services: Service[] = servicesData.map((row: any) => ({
        id: row._id?.toString() || "",
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
      for (const row of settingsData) {
        (settings as any)[row.key] = row.value;
      }

      return {
        projects: projects.length ? projects : defaultSiteContent.projects,
        services: services.length ? services : defaultSiteContent.services,
        settings,
      };
    } catch (error) {
      console.error("Error fetching site content:", error);
      return defaultSiteContent;
    }
  },
);
