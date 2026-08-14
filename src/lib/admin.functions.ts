import { createServerFn } from "@tanstack/react-start";
import { ObjectId } from "mongodb";
import {
  fetchProjects,
  fetchServices,
  fetchContactMessages,
  fetchSiteSettings,
  createProject,
  updateProject,
  deleteProject,
  createService,
  updateService,
  deleteService,
  deleteContactMessage,
  updateSiteSetting,
} from "./mongodb-operations";

// Projects
export const getAdminProjects = createServerFn({ method: "GET" }).handler(
  async () => {
    try {
      const projects = await fetchProjects();
      return projects.map((p: any) => ({
        id: p._id?.toString() || "",
        slug: p.slug,
        name: p.name,
        category: p.category || "",
        description: p.description || "",
        long_description: p.long_description || "",
        image: p.image || "",
        published: p.published || false,
        sort_order: p.sort_order || 0,
        features: p.features || [],
        technologies: p.technologies || [],
        live_demo: p.live_demo || null,
        github: p.github || null,
      }));
    } catch (error) {
      console.error("Error fetching projects:", error);
      throw error;
    }
  }
);

export const createAdminProject = createServerFn({ method: "POST" })
  .input<any>()
  .handler(async (input) => {
    try {
      const result = await createProject({
        slug: input.slug,
        name: input.name,
        category: input.category,
        description: input.description,
        long_description: input.long_description || "",
        image: input.image,
        published: input.published,
        sort_order: input.sort_order || 0,
        features: input.features || [],
        technologies: input.technologies || [],
        live_demo: input.live_demo || null,
        github: input.github || null,
      });
      return { success: true, id: result.insertedId?.toString() };
    } catch (error) {
      console.error("Error creating project:", error);
      throw error;
    }
  });

export const updateAdminProject = createServerFn({ method: "POST" })
  .input<{ id: string; updates: any }>()
  .handler(async (input) => {
    try {
      await updateProject(input.id, input.updates);
      return { success: true };
    } catch (error) {
      console.error("Error updating project:", error);
      throw error;
    }
  });

export const deleteAdminProject = createServerFn({ method: "POST" })
  .input<{ id: string }>()
  .handler(async (input) => {
    try {
      await deleteProject(input.id);
      return { success: true };
    } catch (error) {
      console.error("Error deleting project:", error);
      throw error;
    }
  });

// Services
export const getAdminServices = createServerFn({ method: "GET" }).handler(
  async () => {
    try {
      const services = await fetchServices();
      return services.map((s: any) => ({
        id: s._id?.toString() || "",
        slug: s.slug,
        title: s.title,
        icon: s.icon || "Code2",
        short_text: s.short_text || "",
        description: s.description || "",
        cta_label: s.cta_label || "Get Started",
        sort_order: s.sort_order || 0,
        features: s.features || [],
        technologies: s.technologies || [],
        related_categories: s.related_categories || [],
      }));
    } catch (error) {
      console.error("Error fetching services:", error);
      throw error;
    }
  }
);

export const createAdminService = createServerFn({ method: "POST" })
  .input<any>()
  .handler(async (input) => {
    try {
      const result = await createService({
        slug: input.slug,
        title: input.title,
        icon: input.icon || "Code2",
        short_text: input.short_text || "",
        description: input.description || "",
        cta_label: input.cta_label || "Get Started",
        sort_order: input.sort_order || 0,
        features: input.features || [],
        technologies: input.technologies || [],
        related_categories: input.related_categories || [],
      });
      return { success: true, id: result.insertedId?.toString() };
    } catch (error) {
      console.error("Error creating service:", error);
      throw error;
    }
  });

export const updateAdminService = createServerFn({ method: "POST" })
  .input<{ id: string; updates: any }>()
  .handler(async (input) => {
    try {
      await updateService(input.id, input.updates);
      return { success: true };
    } catch (error) {
      console.error("Error updating service:", error);
      throw error;
    }
  });

export const deleteAdminService = createServerFn({ method: "POST" })
  .input<{ id: string }>()
  .handler(async (input) => {
    try {
      await deleteService(input.id);
      return { success: true };
    } catch (error) {
      console.error("Error deleting service:", error);
      throw error;
    }
  });

// Contact Messages
export const getAdminMessages = createServerFn({ method: "GET" }).handler(
  async () => {
    try {
      const messages = await fetchContactMessages();
      return messages.map((m: any) => ({
        id: m._id?.toString() || "",
        name: m.name,
        email: m.email,
        service: m.service || null,
        message: m.message,
        created_at: m.created_at ? new Date(m.created_at).toISOString() : null,
        is_read: m.is_read || false,
      }));
    } catch (error) {
      console.error("Error fetching messages:", error);
      throw error;
    }
  }
);

export const deleteAdminMessage = createServerFn({ method: "POST" })
  .input<{ id: string }>()
  .handler(async (input) => {
    try {
      await deleteContactMessage(input.id);
      return { success: true };
    } catch (error) {
      console.error("Error deleting message:", error);
      throw error;
    }
  });

// Site Settings
export const getAdminSettings = createServerFn({ method: "GET" }).handler(
  async () => {
    try {
      const settings = await fetchSiteSettings();
      return settings.map((s: any) => ({
        key: s.key,
        value: s.value,
      }));
    } catch (error) {
      console.error("Error fetching settings:", error);
      throw error;
    }
  }
);

export const updateAdminSetting = createServerFn({ method: "POST" })
  .input<{ key: string; value: any }>()
  .handler(async (input) => {
    try {
      await updateSiteSetting(input.key, input.value);
      return { success: true };
    } catch (error) {
      console.error("Error updating setting:", error);
      throw error;
    }
  });
