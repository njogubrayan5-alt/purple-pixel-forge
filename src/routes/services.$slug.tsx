import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Check } from "lucide-react";
import { getSiteContent } from "@/lib/site-content.functions";
import { publishedOf } from "@/lib/site-content";
import { ProjectCard } from "@/components/ProjectCard";
import { ContactForm } from "@/components/ContactForm";

export const Route = createFileRoute("/services/$slug")({
  loader: async ({ params }) => {
    const content = await getSiteContent();
    const service = content.services.find((s) => s.slug === params.slug);
    if (!service) throw notFound();
    const related = publishedOf(content.projects).filter((p) =>
      service.relatedCategories.includes(p.category),
    );
    return { service, related };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Service not found — FireboxTechs" }, { name: "robots", content: "noindex" }],
      };
    }
    const { service } = loaderData;
    return {
      meta: [
        { title: `${service.title} — FireboxTechs` },
        { name: "description", content: service.shortText },
        { property: "og:title", content: `${service.title} — FireboxTechs` },
        { property: "og:description", content: service.shortText },
      ],
    };
  },
  component: ServiceDetail,
});

function ServiceDetail() {
  const { service, related } = Route.useLoaderData();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <Link
        to="/services"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" /> All services
      </Link>

      <header className="mt-4">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary">Service</p>
        <h1 className="mt-1 font-display text-2xl font-extrabold sm:text-3xl">{service.title}</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{service.description}</p>
      </header>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <h2 className="font-display text-lg font-extrabold">Features</h2>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {service.features.map((f) => (
              <li
                key={f}
                className="flex items-start gap-2 rounded-lg border border-border bg-card p-3 text-sm shadow-card"
              >
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                {f}
              </li>
            ))}
          </ul>

          <h2 className="mt-6 font-display text-lg font-extrabold">Technologies</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {service.technologies.map((t) => (
              <span
                key={t}
                className="rounded-md bg-accent px-2.5 py-1 text-xs font-semibold text-accent-foreground"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-4 shadow-card">
          <h2 className="font-display text-lg font-extrabold">Request this service</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Share a few details and we'll get back to you with next steps.
          </p>
          <div className="mt-4">
            <ContactForm defaultService={service.slug} />
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-8">
          <h2 className="font-display text-lg font-extrabold">Relevant projects</h2>
          <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
