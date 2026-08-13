import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/Section";
import { ServiceCard } from "@/components/ServiceCard";
import { services } from "@/data/services";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Services — Web, Apps, AI & Automation | FireboxTechs" },
      {
        name: "description",
        content:
          "FireboxTechs services: web development, app development, AI solutions, automation and custom software.",
      },
      { property: "og:title", content: "Services — FireboxTechs" },
      {
        property: "og:description",
        content: "Web, apps, AI, automation and custom software built by FireboxTechs.",
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <Section label="Services" title="Everything We Can Build For You">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <ServiceCard key={s.id} service={s} />
        ))}
      </div>
    </Section>
  );
}
