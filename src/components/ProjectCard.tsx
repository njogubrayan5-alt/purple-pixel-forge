import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { resolveImage } from "@/lib/site-images";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/50">
      <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
        <img
          src={resolveImage(project.image)}
          alt={`${project.name} interface`}
          loading="lazy"
          width={1200}
          height={800}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <span className="absolute left-3 top-3 rounded-md bg-background/90 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-primary backdrop-blur">
          {project.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="text-base font-bold">{project.name}</h3>
        <p className="text-sm text-muted-foreground">{project.description}</p>
        <Link
          to="/works/$slug"
          params={{ slug: project.slug }}
          className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-primary"
        >
          View Project
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}
