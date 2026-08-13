import { Layers3, ShieldCheck, Star, Users } from "lucide-react";
import { stats } from "@/data/company";

const icons = { Layers3, Users, ShieldCheck, Star };

export function Stats() {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {stats.map((s) => {
        const Icon = icons[s.icon];
        return (
          <div
            key={s.id}
            className="rounded-xl border border-border bg-card p-4 shadow-card transition-colors hover:border-primary/50"
          >
            <Icon className="h-4 w-4 text-primary" />
            <p className="mt-2 font-display text-2xl font-extrabold">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        );
      })}
    </div>
  );
}
