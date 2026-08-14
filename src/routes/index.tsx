import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { ProjectCard } from "@/components/ProjectCard";
import { ServiceCard } from "@/components/ServiceCard";
import { Stats } from "@/components/Stats";
import { TechGrid } from "@/components/TechGrid";
import { useSiteContent } from "@/lib/site-content-query";
import { publishedOf } from "@/lib/site-content";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FireboxTechs — We Build Digital Solutions That Matter" },
      {
        name: "description",
        content:
          "FireboxTechs turns ideas into websites, applications, AI products and automation. Explore our recent projects and services.",
      },
      { property: "og:title", content: "FireboxTechs — Digital Solutions That Matter" },
      {
        property: "og:description",
        content: "Modern websites, apps, AI solutions and automation built by FireboxTechs.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const { projects, services, settings } = useSiteContent();
  const about = settings.about;
  const featured = publishedOf(projects).slice(0, 3);

  return (
    <>
      <Hero />

      <Section className="bg-secondary/40">
        <Stats />
      </Section>

      <Section
        label="Featured Works"
        title="Some Of Our Recent Projects"
        action={
          <Link
            to="/works"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
          >
            View All Projects
            <ArrowRight className="h-4 w-4" />
          </Link>
        }
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </Section>

      <Section label={about.label} title={about.heading} className="bg-secondary/40">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="text-sm text-muted-foreground sm:text-base">{about.body}</p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-3">
              {about.approach.map((a) => (
                <li key={a.title} className="rounded-xl border border-border bg-card p-3 shadow-card">
                  <p className="flex items-center gap-1.5 text-sm font-bold">
                    <Check className="h-4 w-4 text-primary" />
                    {a.title}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">{a.text}</p>
                </li>
              ))}
            </ul>
            <Link
              to="/about"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
            >
              More about FireboxTechs <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="rounded-xl border border-primary/25 bg-gradient-primary p-5 text-primary-foreground shadow-glow">
            <h3 className="font-display text-lg font-extrabold">Have a project in mind?</h3>
            <p className="mt-2 text-sm opacity-90">
              Tell us what you're building and we'll map out how to get it live.
            </p>
            <Link
              to="/contact"
              className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-background px-4 py-2 text-sm font-semibold text-foreground transition-transform hover:-translate-y-0.5"
            >
              Start a conversation <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Section>

      <Section
        label="Services"
        title="What We Build For You"
        action={
          <Link
            to="/services"
            className="hidden shrink-0 items-center gap-1.5 text-sm font-semibold text-primary sm:inline-flex"
          >
            All services <ArrowRight className="h-4 w-4" />
          </Link>
        }
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </div>
      </Section>

      <Section label="Technologies" title="Tools We Work With" className="bg-secondary/40">
        <TechGrid />
      </Section>
    </>
  );
}
