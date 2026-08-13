/**
 * Service data. In production this comes from the FireboxTechs Admin API.
 * Keep this shape stable so an API response can be dropped in directly.
 */
export type Service = {
  id: string;
  slug: string;
  icon: "Code2" | "Smartphone" | "Sparkles" | "Workflow" | "Layers3";
  title: string;
  shortText: string;
  ctaLabel: string;
  description: string;
  features: string[];
  technologies: string[];
  relatedCategories: string[];
};

export const services: Service[] = [
  {
    id: "svc-web",
    slug: "web-development",
    icon: "Code2",
    title: "Web Development",
    shortText: "Modern websites and powerful web applications.",
    ctaLabel: "Get Started",
    description:
      "We design and build fast, responsive websites and web applications tailored to how your business actually works — from marketing sites to full-scale platforms.",
    features: [
      "Responsive, accessible interfaces",
      "Performance-first architecture",
      "SEO-friendly page structure",
      "Scalable component-based codebase",
      "Ongoing support and iteration",
    ],
    technologies: ["React", "JavaScript", "Node.js", "Express", "MongoDB"],
    relatedCategories: ["E-Learning Platform", "Marketplace"],
  },
  {
    id: "svc-app",
    slug: "app-development",
    icon: "Smartphone",
    title: "App Development",
    shortText: "Responsive and user-friendly digital applications.",
    ctaLabel: "Get Started",
    description:
      "We build cross-platform applications with a focus on clean UX and reliable performance, from first prototype through to a published product.",
    features: [
      "Cross-platform delivery",
      "Native-feeling interactions",
      "Offline-friendly data handling",
      "Push notification support",
      "App store deployment guidance",
    ],
    technologies: ["React", "Node.js", "APIs", "Git"],
    relatedCategories: ["Entertainment"],
  },
  {
    id: "svc-ai",
    slug: "ai-solutions",
    icon: "Sparkles",
    title: "AI Solutions",
    shortText: "AI-powered products, assistants and intelligent systems.",
    ctaLabel: "Explore AI",
    description:
      "We integrate AI into real products — assistants, automations and intelligent features that give your business a genuine edge rather than a novelty.",
    features: [
      "Custom AI assistants",
      "Workflow automation",
      "Natural language interfaces",
      "Model integration guidance",
      "Responsible, tested deployments",
    ],
    technologies: ["AI", "Node.js", "APIs", "React"],
    relatedCategories: ["Automation"],
  },
  {
    id: "svc-automation",
    slug: "automation",
    icon: "Workflow",
    title: "Automation",
    shortText: "Bots, workflows and API integrations for businesses.",
    ctaLabel: "Get Started",
    description:
      "We connect your tools and automate the repetitive parts of your business — bots, integrations and workflows that save real hours every week.",
    features: [
      "Custom chat & WhatsApp bots",
      "Third-party API integrations",
      "Scheduled and event-driven workflows",
      "Internal tooling and dashboards",
      "Monitoring and error alerts",
    ],
    technologies: ["Node.js", "APIs", "MongoDB", "Git"],
    relatedCategories: ["Automation", "Developer Platform"],
  },
  {
    id: "svc-custom",
    slug: "custom-software",
    icon: "Layers3",
    title: "Custom Software",
    shortText: "Software designed around specific business requirements.",
    ctaLabel: "Request a Project",
    description:
      "When off-the-shelf tools don't fit, we design and build custom software around your exact requirements — from internal systems to full platforms.",
    features: [
      "Requirements discovery & scoping",
      "Custom system architecture",
      "Database design",
      "Secure, maintainable codebases",
      "Long-term technical partnership",
    ],
    technologies: ["React", "Node.js", "Express", "MongoDB", "Git"],
    relatedCategories: ["Developer Platform"],
  },
];

export const getServiceBySlug = (slug: string) =>
  services.find((service) => service.slug === slug);
