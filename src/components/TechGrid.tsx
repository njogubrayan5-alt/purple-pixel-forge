import { Cpu } from "lucide-react";
import { useSiteContent } from "@/lib/site-content-query";

export function TechGrid() {
  const { settings } = useSiteContent();
  const technologies = settings.technologies;
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {technologies.map((t) => (
        <div
          key={t.name}
          className="flex items-center gap-2.5 rounded-xl border border-border bg-card p-3 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/50"
        >
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent text-accent-foreground">
            <Cpu className="h-4 w-4" />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-semibold">{t.name}</span>
            <span className="block truncate text-[11px] text-muted-foreground">{t.note}</span>
          </span>
        </div>
      ))}
    </div>
  );
}
