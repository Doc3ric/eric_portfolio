"use client";

import { motion } from "motion/react";
import { Calendar, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useInView } from "@/hooks/useInView";
import type { CurrentlyBuildingItem } from "@/types";

interface CurrentlyBuildingCardProps {
  item: CurrentlyBuildingItem;
  index: number;
}

export function CurrentlyBuildingCard({ item, index }: CurrentlyBuildingCardProps) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative overflow-hidden rounded-2xl border border-border bg-surface-1 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/20"
    >
      {/* Animated gradient accent */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-blue to-transparent opacity-60" />

      <div className="flex flex-col gap-5">
        {/* Header row */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin text-brand-blue" />
              <span className="text-xs font-medium uppercase tracking-widest text-brand-blue">
                In Progress
              </span>
            </div>
            <h3 className="text-lg font-bold tracking-tight">{item.title}</h3>
          </div>

          {/* ETA badge */}
          <div className="flex shrink-0 items-center gap-1.5 rounded-full border border-border bg-surface-2 px-3 py-1.5 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            ETA {item.eta}
          </div>
        </div>

        {/* Description */}
        <p className="text-sm leading-relaxed text-muted-foreground">
          {item.description}
        </p>

        {/* Progress bar */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-semibold text-foreground">{item.progress}%</span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-surface-3">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-brand-blue to-brand-purple"
              initial={{ width: 0 }}
              animate={inView ? { width: `${item.progress}%` } : { width: 0 }}
              transition={{ duration: 1.2, delay: index * 0.1 + 0.3, ease: "easeOut" }}
            />
          </div>

          {/* Progress dots */}
          <div className="flex gap-1">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  "h-1 flex-1 rounded-full transition-colors duration-300",
                  i < Math.floor(item.progress / 10)
                    ? "bg-brand-blue"
                    : "bg-surface-3"
                )}
              />
            ))}
          </div>
        </div>

        {/* Tech stack */}
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
      </div>
    </motion.div>
  );
}
