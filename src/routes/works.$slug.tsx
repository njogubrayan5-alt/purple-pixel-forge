import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Check, Github } from "lucide-react";
import { getSiteContent } from "@/lib/site-content.functions";
import { resolveImage } from "@/lib/site-images";

export const Route = createFileRoute("/works/$slug")({
  loader: async ({ params }) => {
    const content = await getSiteContent();
    const project = content.projects.find((p) => p.slug === params.slug && p.published);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Project not found — FireboxTechs" }, { name: "robots", content: "noindex" }] };
    }
    const { project } = loaderData;
    return {
      meta: [
        { title: `${project.name} — FireboxTechs Project` },
        { name: "description", content: project.description },
        { property: "og:title", content: `${project.name} — FireboxTechs` },
        { property: "og:description", content: project.description },
      ],
    };
  },
  component: ProjectDetail,
});

function ProjectDetail() {
  const { project } = Route.useLoaderData();

  return (
    <article className="px-4 py-8 sm:px-6">
      <Link
        to="/works"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Works
      </Link>

      <header className="mt-4">
        <span className="rounded-md bg-accent px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-accent-foreground">
          {project.category}
        </span>
        <h1 className="mt-2 font-display text-2xl font-extrabold sm:text-3xl">{project.name}</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{project.longDescription}</p>
      </header>

      <img
        src={resolveImage(project.image)}
        alt={`${project.name} screenshot`}
        width={1200}
        height={800}
        className="mt-5 w-full rounded-xl border border-border object-cover shadow-card"
      />

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <h2 className="font-display text-lg font-extrabold">Features</h2>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {project.features.map((f) => (
              <li
                key={f}
                className="flex items-start gap-2 rounded-lg border border-border bg-card p-3 text-sm shadow-card"
              >
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                {f}
              </li>
            ))}
          </ul>
        </div>

        <aside className="rounded-xl border border-border bg-card p-4 shadow-card">
          <h2 className="text-sm font-bold">Technologies</h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {project.technologies.map((t) => (
              <span
                key={t}
                className="rounded-md bg-accent px-2.5 py-1 text-xs font-semibold text-accent-foreground"
              >
                {t}
              </span>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.liveDemo && (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5"
              >
                Live Demo <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
              >
                <Github className="h-4 w-4" /> GitHub
              </a>
            )}
          </div>
          <Link
            to="/contact"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
          >
            Want something like this? Let's talk
          </Link>
        </aside>
      </div>
    </article>
  );
}
