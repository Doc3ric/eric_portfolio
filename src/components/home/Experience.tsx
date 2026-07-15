"use client";

import { motion } from "motion/react";
import { MapPin, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { useInView } from "@/hooks/useInView";
import { formatDate } from "@/lib/utils";
import experienceData from "@/content/experience.json";
import { SectionHeader } from "@/components/shared/SectionHeader";
import type { ExperienceEntry } from "@/types";

const entries = experienceData as ExperienceEntry[];

const typeStyles: Record<string, string> = {
  "full-time": "text-status-production border-status-production/40 bg-status-production/10",
  freelance: "text-brand-blue border-brand-blue/40 bg-brand-blue/10",
  contract: "text-brand-purple border-brand-purple/40 bg-brand-purple/10",
  education: "text-muted-foreground border-border bg-surface-2",
};

const typeLabels: Record<string, string> = {
  "full-time": "Full-time",
  freelance: "Freelance",
  contract: "Contract",
  education: "Education",
};

interface TimelineItemProps {
  entry: ExperienceEntry;
  index: number;
  isLast: boolean;
}

function TimelineItem({ entry, index, isLast }: TimelineItemProps) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.15 });

  return (
    <div ref={ref} className="relative flex gap-6">
      {/* Timeline line + dot */}
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ delay: index * 0.1, duration: 0.3 }}
          className={cn(
            "relative z-10 mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2",
            entry.type === "education"
              ? "border-muted-foreground/40 bg-surface-2"
              : "border-brand-blue bg-brand-blue/20"
          )}
        >
          <div
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              entry.type === "education" ? "bg-muted-foreground/60" : "bg-brand-blue"
            )}
          />
        </motion.div>

        {/* Vertical line */}
        {!isLast && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ delay: index * 0.1 + 0.2, duration: 0.4, ease: "easeOut" }}
            style={{ originY: 0 }}
            className="mt-2 w-px flex-1 bg-gradient-to-b from-border to-transparent"
          />
        )}
      </div>

      {/* Content card */}
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
        transition={{ delay: index * 0.1 + 0.1, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        className={cn(
          "mb-10 flex-1 rounded-2xl border border-border bg-surface-1 p-6",
          "transition-all duration-300 hover:border-border hover:shadow-md hover:shadow-black/20"
        )}
      >
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex flex-col gap-1">
            <h3 className="font-semibold leading-tight">{entry.role}</h3>
            <p className="text-sm font-medium text-muted-foreground">{entry.company}</p>
          </div>

          <span
            className={cn(
              "rounded-full border px-2.5 py-0.5 text-xs font-medium",
              typeStyles[entry.type]
            )}
          >
            {typeLabels[entry.type]}
          </span>
        </div>

        {/* Meta row */}
        <div className="mt-3 flex flex-wrap gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {formatDate(entry.startDate)} — {formatDate(entry.endDate)}
          </span>
          {entry.location && (
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {entry.location}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          {entry.description}
        </p>

        {/* Highlights */}
        {entry.highlights && entry.highlights.length > 0 && (
          <ul className="mt-4 flex flex-col gap-1.5">
            {entry.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-blue" />
                {h}
              </li>
            ))}
          </ul>
        )}

        {/* Tech stack pills */}
        {entry.techStack && entry.techStack.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {entry.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-border bg-surface-2 px-2.5 py-0.5 text-xs text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}

export function Experience() {
  return (
    <section id="experience" className="section" aria-label="Experience">
      <div className="container-xl flex flex-col gap-12">
        <SectionHeader
          eyebrow="Experience"
          heading="Where I've"
          highlight="Made an Impact"
          description="From government systems to freelance projects — every role has been about building things that work in the real world."
        />

        <div className="max-w-2xl">
          {entries.map((entry, index) => (
            <TimelineItem
              key={entry.id}
              entry={entry}
              index={index}
              isLast={index === entries.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
