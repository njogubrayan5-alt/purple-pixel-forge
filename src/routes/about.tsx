import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { Section } from "@/components/Section";
import { Stats } from "@/components/Stats";
import { TechGrid } from "@/components/TechGrid";
import { about, company } from "@/data/company";
import heroDevices from "@/assets/hero-devices.png";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About FireboxTechs — Modern Technology Company" },
      {
        name: "description",
        content:
          "FireboxTechs builds modern digital products: websites, applications, AI systems and automation for businesses and individuals.",
      },
      { property: "og:title", content: "About FireboxTechs" },
      {
        property: "og:description",
        content: "A technology company building practical, modern digital products.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <Section label={about.label} title={about.heading}>
        <div className="grid items-center gap-6 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="text-sm text-muted-foreground sm:text-base">{about.body}</p>
            <p className="mt-3 text-sm text-muted-foreground sm:text-base">
              {company.shortDescription}
            </p>
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
              to="/contact"
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-gradient-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5"
            >
              Work with us <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <img
            src={heroDevices}
            alt="FireboxTechs product interface on laptop and phone"
            loading="lazy"
            width={1200}
            height={900}
            className="hidden w-full lg:block"
          />
        </div>
      </Section>

      <Section className="bg-secondary/40">
        <Stats />
      </Section>

      <Section label="Technologies" title="Our Everyday Stack">
        <TechGrid />
      </Section>
    </>
  );
}
