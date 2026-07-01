import type { ReactNode } from "react";

export function PageShell({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:py-16">
      <header className="mb-8 border-b pb-6">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h1>
        {description && <p className="mt-3 max-w-2xl text-muted-foreground">{description}</p>}
      </header>
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        {children ?? (
          <p className="text-muted-foreground">
            This page is a placeholder. Content and functionality will be added in future iterations.
          </p>
        )}
      </div>
    </div>
  );
}
