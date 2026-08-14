import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/Section";
import { ProjectCard } from "@/components/ProjectCard";
import { useSiteContent } from "@/lib/site-content-query";
import { publishedOf } from "@/lib/site-content";

export const Route = createFileRoute("/works/")({
  head: () => ({
    meta: [
      { title: "Our Works — FireboxTechs Projects" },
      {
        name: "description",
        content:
          "Explore projects built by FireboxTechs: e-learning platforms, marketplaces, streaming apps, AI bots and developer tools.",
      },
      { property: "og:title", content: "Our Works — FireboxTechs Projects" },
      {
        property: "og:description",
        content: "A showcase of digital products built by FireboxTechs.",
      },
    ],
  }),
  component: WorksPage,
});

function WorksPage() {
  const { projects } = useSiteContent();
  return (
    <Section label="Works" title="Some Of Our Recent Projects">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {publishedOf(projects).map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </Section>
  );
}
