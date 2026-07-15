"use client";

import { motion } from "motion/react";
import { ArrowRight, CheckCircle2, ExternalLink } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useInView } from "@/hooks/useInView";
import type { FeaturedWorkItem } from "@/types";

interface FeaturedWorkCardProps {
  item: FeaturedWorkItem;
  index: number;
}

const statusStyles: Record<string, string> = {
  production: "border-status-production/30 bg-status-production/10 text-status-production",
  "in-progress": "border-status-progress/30 bg-status-progress/10 text-status-progress",
  personal: "border-status-personal/30 bg-status-personal/10 text-status-personal",
  "open-source": "border-brand-cyan/30 bg-brand-cyan/10 text-brand-cyan",
};

export function FeaturedWorkCard({ item, index }: FeaturedWorkCardProps) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-surface-1 transition-all duration-300 hover:-translate-y-1 hover:border-border hover:shadow-2xl hover:shadow-black/30"
    >
      {/* ── Screenshot / Cover Image area ───────────────────── */}
      <div className="relative h-52 overflow-hidden bg-surface-2 sm:h-60">
        {/* Gradient placeholder — replace src with actual image */}
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-br",
            index % 4 === 0 && "from-brand-blue/20 via-surface-2 to-brand-purple/10",
            index % 4 === 1 && "from-status-production/20 via-surface-2 to-brand-cyan/10",
            index % 4 === 2 && "from-brand-purple/20 via-surface-2 to-brand-blue/10",
            index % 4 === 3 && "from-brand-cyan/20 via-surface-2 to-brand-purple/10",
          )}
        />

        {/* Centered project initial */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-blue to-brand-purple text-xl font-bold text-white shadow-xl opacity-60">
            {item.title.charAt(0)}
          </div>
        </div>

        {/* Status badge — top left */}
        <div className="absolute left-4 top-4">
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium backdrop-blur-sm",
              statusStyles[item.status] ?? statusStyles.personal
            )}
          >
            {item.status === "production" && (
              <span className="h-1.5 w-1.5 rounded-full bg-status-production" />
            )}
            {item.statusLabel}
          </span>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-surface-1 via-transparent opacity-60" />
      </div>

      {/* ── Card Body ─────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col gap-5 p-6">
        {/* Title */}
        <div>
          <h3 className="text-xl font-bold tracking-tight">{item.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {item.description}
          </p>
        </div>

        {/* Checklist */}
        {item.checklist && item.checklist.length > 0 && (
          <ul className="flex flex-col gap-1.5">
            {item.checklist.map((check) => (
              <li
                key={check}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <CheckCircle2 className="h-4 w-4 shrink-0 text-status-production" />
                {check}
              </li>
            ))}
          </ul>
        )}

        {/* Tech stack pills */}
        <div className="flex flex-wrap gap-2">
          {item.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-border bg-surface-2 px-2.5 py-0.5 text-xs text-muted-foreground"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Metrics row */}
        {item.metrics && item.metrics.length > 0 && (
          <div className="flex flex-wrap gap-4 border-t border-border pt-4">
            {item.metrics.map((m) => (
              <div key={m.label} className="flex flex-col">
                <span className="text-lg font-bold gradient-text">{m.value}</span>
                <span className="text-xs text-muted-foreground">{m.label}</span>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-auto pt-2">
          <Link
            href={`/projects/${item.slug}`}
            className="group/link inline-flex items-center gap-2 text-sm font-medium text-brand-blue transition-colors hover:text-brand-purple"
          >
            View Case Study
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/link:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* Gradient border on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 gradient-border" />
    </motion.div>
  );
}
