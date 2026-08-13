import codelabImg from "@/assets/proj-codelab.jpg";
import cinevaultImg from "@/assets/proj-cinevault.jpg";
import bconnectImg from "@/assets/proj-bconnect.jpg";
import whatsappImg from "@/assets/proj-whatsapp.jpg";
import fireboxdeployImg from "@/assets/proj-fireboxdeploy.jpg";

/**
 * Project data. In production this comes from the FireboxTechs Admin API
 * (published projects only). Keep this shape stable so an API response can be
 * dropped in without touching components.
 */
export type Project = {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  image: string;
  published: boolean;
  longDescription: string;
  features: string[];
  technologies: string[];
  liveDemo?: string;
  github?: string;
};

export const projects: Project[] = [
  {
    id: "proj-codelab",
    slug: "codelab-academy",
    name: "CodeLab Academy",
    category: "E-Learning Platform",
    description: "Coding education platform for students and developers.",
    image: codelabImg,
    published: true,
    longDescription:
      "CodeLab Academy is a full learning platform built for aspiring developers — structured courses, in-browser coding exercises, and progress tracking designed to keep learners moving forward.",
    features: [
      "Interactive in-browser code editor",
      "Course progress tracking",
      "Instructor dashboard",
      "Certificates on completion",
    ],
    technologies: ["React", "Node.js", "MongoDB", "Express"],
    liveDemo: "#",
    github: "#",
  },
  {
    id: "proj-cinevault",
    slug: "cinevault",
    name: "CineVault",
    category: "Entertainment",
    description: "Movie streaming and discovery experience.",
    image: cinevaultImg,
    published: true,
    longDescription:
      "CineVault helps people discover what to watch next with a fast, personalised browsing experience and a clean streaming interface across devices.",
    features: [
      "Personalised recommendations",
      "Watchlists and history",
      "Adaptive streaming playback",
      "Cross-device sync",
    ],
    technologies: ["React", "Node.js", "APIs"],
    liveDemo: "#",
  },
  {
    id: "proj-bconnect",
    slug: "bconnect",
    name: "BConnect",
    category: "Marketplace",
    description: "Multi-vendor marketplace connecting people and services.",
    image: bconnectImg,
    published: true,
    longDescription:
      "BConnect is a multi-vendor marketplace that connects independent service providers with the people who need them, with built-in messaging and payments.",
    features: [
      "Vendor storefronts",
      "In-app messaging",
      "Secure payments",
      "Ratings and reviews",
    ],
    technologies: ["React", "Node.js", "MongoDB", "Express"],
    liveDemo: "#",
    github: "#",
  },
  {
    id: "proj-whatsapp",
    slug: "firebox-whatsapp-bot",
    name: "Firebox WhatsApp Bot",
    category: "Automation",
    description: "AI-powered WhatsApp automation for businesses.",
    image: whatsappImg,
    published: true,
    longDescription:
      "An AI-powered WhatsApp bot that handles customer inquiries, bookings and follow-ups automatically, freeing teams for higher-value work.",
    features: [
      "Natural language understanding",
      "Automated booking flows",
      "Human handoff when needed",
      "Analytics dashboard",
    ],
    technologies: ["Node.js", "AI", "APIs"],
    liveDemo: "#",
  },
  {
    id: "proj-fireboxdeploy",
    slug: "fireboxdeploy",
    name: "FireboxDeploy",
    category: "Developer Platform",
    description: "Deployment platform for modern applications.",
    image: fireboxdeployImg,
    published: true,
    longDescription:
      "FireboxDeploy gives development teams a simple way to ship and monitor applications, with git-based deployments and real-time logs.",
    features: [
      "Git-based deployments",
      "Real-time build logs",
      "Environment management",
      "One-click rollbacks",
    ],
    technologies: ["Node.js", "React", "APIs", "Git"],
    liveDemo: "#",
    github: "#",
  },
];

export const publishedProjects = () => projects.filter((p) => p.published);

export const getProjectBySlug = (slug: string) =>
  projects.find((project) => project.slug === slug);
