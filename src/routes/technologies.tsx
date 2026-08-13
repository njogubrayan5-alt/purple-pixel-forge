import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/Section";
import { TechGrid } from "@/components/TechGrid";
import { Stats } from "@/components/Stats";

export const Route = createFileRoute("/technologies")({
  head: () => ({
    meta: [
      { title: "Technologies — The FireboxTechs Stack" },
      {
        name: "description",
        content:
          "React, JavaScript, Node.js, Express, MongoDB, APIs, Git and AI — the technologies FireboxTechs builds with.",
      },
      { property: "og:title", content: "Technologies — FireboxTechs" },
      {
        property: "og:description",
        content: "The modern stack behind FireboxTechs products.",
      },
    ],
  }),
  component: TechnologiesPage,
});

function TechnologiesPage() {
  return (
    <>
      <Section label="Technologies" title="Tools We Work With Every Day">
        <TechGrid />
      </Section>
      <Section className="bg-secondary/40">
        <Stats />
      </Section>
    </>
  );
}
