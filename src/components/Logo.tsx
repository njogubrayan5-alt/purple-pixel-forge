import { Flame } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2", className)}>
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-gradient-primary shadow-glow">
        <Flame className="h-[18px] w-[18px] text-primary-foreground" strokeWidth={2.4} />
      </span>
      <span className="font-display text-[17px] font-extrabold tracking-tight">
        Firebox<span className="text-primary">Techs</span>
      </span>
    </span>
  );
}
