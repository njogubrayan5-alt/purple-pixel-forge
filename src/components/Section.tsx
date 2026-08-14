import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Section({
  id,
  label,
  title,
  action,
  children,
  className,
}: {
  id?: string;
  label?: string;
  title?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("border-b border-border", className)}>
      <div className="px-4 py-10 sm:px-6">
        {(title || label || action) && (
          <div className="mb-5 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
            <div className="min-w-0">
              {label && (
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary">
                  {label}
                </p>
              )}
              {title && (
                <h2 className="mt-1 font-display text-xl font-extrabold sm:text-2xl">{title}</h2>
              )}
            </div>
            {action}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
