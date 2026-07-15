import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  /** Small label above the heading */
  eyebrow?: string;
  /** Main heading text */
  heading: string;
  /** Optional highlighted/gradient part of the heading */
  highlight?: string;
  /** Subtext below the heading */
  description?: string;
  /** Text alignment */
  align?: "left" | "center";
  className?: string;
}

/**
 * Reusable section header with eyebrow label, heading with optional gradient
 * highlight, and optional description paragraph.
 *
 * Server Component — no interactivity required.
 */
export function SectionHeader({
  eyebrow,
  heading,
  highlight,
  description,
  align = "left",
  className,
}: SectionHeaderProps) {
  const isCenter = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        isCenter && "items-center text-center",
        className
      )}
    >
      {/* Eyebrow */}
      {eyebrow && (
        <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-brand-blue">
          <span className="h-px w-6 bg-brand-blue" />
          {eyebrow}
          <span className="h-px w-6 bg-brand-blue" />
        </span>
      )}

      {/* Heading */}
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
        {heading}{" "}
        {highlight && <span className="gradient-text">{highlight}</span>}
      </h2>

      {/* Description */}
      {description && (
        <p
          className={cn(
            "text-base text-muted-foreground",
            isCenter ? "max-w-2xl" : "max-w-xl"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
