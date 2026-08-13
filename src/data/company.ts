/**
 * Company-wide content. In production this comes from the FireboxTechs Admin
 * Dashboard (about content, stats, contact info, social links).
 */

export const company = {
  name: "FireboxTechs",
  tagline: "We Build Digital Solutions That Matter.",
  shortDescription:
    "A modern technology company building websites, applications, AI products and automation for businesses and individuals.",
};

export const stats = [
  { id: "stat-projects", icon: "Layers3", value: "30+", label: "Projects Completed" },
  { id: "stat-clients", icon: "Users", value: "20+", label: "Happy Clients" },
  { id: "stat-experience", icon: "ShieldCheck", value: "2+", label: "Years Experience" },
  { id: "stat-satisfaction", icon: "Star", value: "99%", label: "Client Satisfaction" },
] as const;

export const about = {
  label: "ABOUT US",
  heading: "Technology built around your ideas.",
  body: "FireboxTechs creates modern digital products for businesses, organizations and individuals. From websites and applications to AI-powered systems and automation, we turn ideas into practical technology that ships.",
  approach: [
    {
      title: "Understand first",
      text: "We start with the problem and the people using the product, not the tech stack.",
    },
    {
      title: "Build clean",
      text: "Modern tools, clear architecture and code that stays maintainable as you grow.",
    },
    {
      title: "Ship and improve",
      text: "We deliver on time, then keep refining based on real usage and feedback.",
    },
  ],
};

export const technologies = [
  { name: "React", note: "UI library" },
  { name: "JavaScript", note: "Core language" },
  { name: "Node.js", note: "Runtime" },
  { name: "Express", note: "Backend" },
  { name: "MongoDB", note: "Database" },
  { name: "APIs", note: "Integrations" },
  { name: "Git", note: "Version control" },
  { name: "AI", note: "Intelligent systems" },
];

export const contactInfo = {
  email: "hello@fireboxtechs.com",
  phone: "+254 700 000 000",
  location: "Remote-first · Worldwide",
};

export const socials = [
  { id: "social-github", label: "GitHub", href: "https://github.com" },
  { id: "social-linkedin", label: "LinkedIn", href: "https://linkedin.com" },
  { id: "social-x", label: "X", href: "https://x.com" },
];
