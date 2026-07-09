import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  action,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
  action?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 md:flex-row md:items-end md:justify-between",
        align === "center" && "md:flex-col md:items-center md:text-center",
        className,
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        {eyebrow && (
          <span className="inline-flex items-center gap-3 text-[0.7rem] font-medium uppercase tracking-[0.28em] text-gold">
            <span className="h-px w-10 bg-gold" />
            {eyebrow}
          </span>
        )}
        <h2 className="mt-5 font-display text-4xl font-medium leading-[1.05] text-balance md:text-5xl lg:text-6xl">
          {title}
        </h2>
        {description && (
          <p className="mt-5 text-muted-foreground text-pretty md:text-lg leading-relaxed">{description}</p>
        )}
      </div>

      {action}
    </div>
  );
}
