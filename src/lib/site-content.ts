import { projects as staticProjects, type Project } from "@/data/projects";
import { services as staticServices, type Service } from "@/data/services";
import {
  about as staticAbout,
  company as staticCompany,
  contactInfo as staticContactInfo,
  socials as staticSocials,
  stats as staticStats,
  technologies as staticTechnologies,
} from "@/data/company";

export type { Project, Service };

export type StatItem = { id: string; icon: string; value: string; label: string };
export type TechItem = { name: string; note: string };
export type SocialItem = { id: string; label: string; href: string };

export type SiteSettings = {
  company: { name: string; tagline: string; shortDescription: string };
  stats: StatItem[];
  about: {
    label: string;
    heading: string;
    body: string;
    approach: { title: string; text: string }[];
  };
  technologies: TechItem[];
  contactInfo: { email: string; phone: string; location: string };
  socials: SocialItem[];
};

export type SiteContent = {
  projects: Project[];
  services: Service[];
  settings: SiteSettings;
};

export const defaultSiteContent: SiteContent = {
  projects: staticProjects,
  services: staticServices,
  settings: {
    company: staticCompany,
    stats: staticStats.map((s) => ({ ...s })),
    about: staticAbout,
    technologies: staticTechnologies,
    contactInfo: staticContactInfo,
    socials: staticSocials,
  },
};

export const publishedOf = (projects: Project[]) => projects.filter((p) => p.published);
