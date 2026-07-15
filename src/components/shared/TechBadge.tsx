import { cn } from "@/lib/utils";

interface TechBadgeProps {
  label: string;
  className?: string;
  size?: "sm" | "md";
}

/**
 * Small technology pill badge.
 * Server Component — purely presentational.
 */
export function TechBadge({ label, className, size = "md" }: TechBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-surface-1 font-medium text-muted-foreground",
        size === "sm" && "px-2.5 py-0.5 text-xs",
        size === "md" && "px-3 py-1 text-sm",
        className
      )}
    >
      {label}
    </span>
  );
}
