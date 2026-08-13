import { Link } from "@tanstack/react-router";
import { ArrowRight, Code2, Layers3, Smartphone, Sparkles, Workflow } from "lucide-react";
import type { Service } from "@/data/services";

const icons = { Code2, Smartphone, Sparkles, Workflow, Layers3 };

export function ServiceCard({ service }: { service: Service }) {
  const Icon = icons[service.icon];
  return (
    <article className="group flex flex-col rounded-xl border border-border bg-card p-4 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/50">
      <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent text-accent-foreground transition-colors group-hover:bg-gradient-primary group-hover:text-primary-foreground">
        <Icon className="h-[18px] w-[18px]" />
      </span>
      <h3 className="mt-3 text-base font-bold">{service.title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{service.shortText}</p>
      <Link
        to="/services/$slug"
        params={{ slug: service.slug }}
        className="mt-4 inline-flex items-center justify-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm font-semibold transition-colors hover:border-primary hover:bg-accent hover:text-accent-foreground"
      >
        {service.ctaLabel}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </article>
  );
}
