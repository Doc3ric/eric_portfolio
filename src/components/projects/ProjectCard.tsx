"use client";

import { motion } from "motion/react";
import { ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useInView } from "@/hooks/useInView";
import { GitHubIcon } from "@/components/shared/BrandIcons";
import type { FeaturedWorkItem } from "@/types";

interface ProjectCardProps {
  // We can reuse FeaturedWorkItem type or shape since it matches the project JSON shape
  project: FeaturedWorkItem;
  index: number;
}

const statusStyles: Record<string, string> = {
  production: "border-status-production/30 bg-status-production/10 text-status-production",
  "in-progress": "border-status-progress/30 bg-status-progress/10 text-status-progress",
  personal: "border-status-personal/30 bg-status-personal/10 text-status-personal",
  "open-source": "border-brand-cyan/30 bg-brand-cyan/10 text-brand-cyan",
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-surface-1 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-border hover:shadow-xl hover:shadow-black/25"
    >
      <div className="flex flex-col gap-4">
        {/* Header (Title + Status) */}
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-bold text-foreground text-base tracking-tight leading-tight group-hover:text-brand-blue transition-colors">
            {project.title}
          </h3>
          <span
            className={cn(
              "inline-flex shrink-0 items-center rounded-full border px-2 py-0.5 text-[10px] font-medium capitalize",
              statusStyles[project.status] ?? statusStyles.personal
            )}
          >
            {project.statusLabel}
          </span>
        </div>

        {/* Description */}
        <p className="text-xs leading-relaxed text-muted-foreground line-clamp-3">
          {project.description}
        </p>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1 pt-1">
          {project.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="rounded bg-surface-2 border border-border/50 px-2 py-0.5 text-[9px] font-medium text-muted-foreground"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="rounded bg-surface-2 border border-border/50 px-1.5 py-0.5 text-[9px] font-medium text-muted-foreground/60">
              +{project.techStack.length - 4} more
            </span>
          )}
        </div>
      </div>

      {/* Action links */}
      <div className="flex items-center justify-between border-t border-border pt-4 mt-5">
        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center gap-1 text-xs font-semibold text-brand-blue hover:text-brand-purple transition-colors"
        >
          Case Study
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      {/* Glass gradient border glow */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 gradient-border" />
    </motion.div>
  );
}
