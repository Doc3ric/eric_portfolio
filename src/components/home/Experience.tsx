"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { formatDate } from "@/lib/utils";
import experienceData from "@/content/experience.json";
import type { ExperienceEntry } from "@/types";

const entries = experienceData as ExperienceEntry[];

// ─────────────────────────────────────────────────────────────────────────────
// Section header
// ─────────────────────────────────────────────────────────────────────────────
function ExperienceHeader() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col gap-4"
    >
      <p className="font-mono text-[10px] tracking-widest uppercase" style={{ color: "oklch(0.72 0.18 210)" }}>
        — EXPERIENCE —
      </p>
      <h2 className="font-sans text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.0] tracking-[-0.03em] text-foreground">
        Where I've <span style={{ color: "oklch(0.72 0.18 210)" }}>Made an Impact</span>
      </h2>
      <p className="mt-2 max-w-xl text-base leading-relaxed text-muted-foreground">
        From government systems to freelance projects — every role has been about building things that work in the real world.
      </p>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Timeline item
// ─────────────────────────────────────────────────────────────────────────────
interface TimelineItemProps {
  entry: ExperienceEntry;
  index: number;
  isLast: boolean;
}

function TimelineItem({ entry, index, isLast }: TimelineItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });

  // Format metadata: JAN 2024 — JUL 2024 · MALAYBALAY CITY · CONTRACT
  const dateString = `${formatDate(entry.startDate)} — ${formatDate(entry.endDate)}`.toUpperCase();
  const locationString = entry.location ? ` · ${entry.location.toUpperCase()}` : "";
  
  // Clean up type string (e.g. "full-time" -> "FULL TIME")
  let typeString = "";
  if (entry.type && entry.type !== "education") {
    typeString = ` · ${entry.type.replace("-", " ").toUpperCase()}`;
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        duration: 0.6,
        delay: index * 0.07,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="relative grid grid-cols-[2rem_1fr] gap-x-8 sm:grid-cols-[3.5rem_1fr] md:gap-x-10"
    >
      {/* ── Left: dot and vertical rule ── */}
      <div className="flex flex-col items-center pt-2.5">
        {/* Minimal dot */}
        <div className="h-1.5 w-1.5 rounded-full bg-[oklch(0.45_0_0)]" />
        
        {/* Vertical rule connector */}
        {!isLast && (
          <motion.div
            className="mt-3.5 w-px flex-1 bg-[oklch(1_0_0/10%)]"
            initial={{ scaleY: 0, originY: 0 }}
            animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{
              duration: 0.6,
              delay: index * 0.07 + 0.25,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{ minHeight: "2.5rem" }}
          />
        )}
      </div>

      {/* ── Right: content ── */}
      <div className="pb-12 md:pb-16 flex flex-col gap-5">
        
        {/* Header Block */}
        <div className="flex flex-col gap-1.5">
          <h3 className="font-sans text-lg font-bold leading-tight tracking-tight text-foreground sm:text-xl">
            {entry.role}
          </h3>
          <p className="text-base font-medium text-muted-foreground/80">
            {entry.company}
          </p>
          <p className="mt-1 font-mono text-[10px] tracking-widest uppercase text-[oklch(0.45_0_0)]">
            {dateString}{locationString}{typeString}
          </p>
        </div>

        {/* Description / Achievements paragraph */}
        <div className="max-w-2xl text-base leading-relaxed text-muted-foreground space-y-3">
          {entry.description && <p>{entry.description}</p>}
          
          {/* Fold highlights into a flowing paragraph with dashes */}
          {entry.highlights && entry.highlights.length > 0 && (
            <p className="text-muted-foreground/90">
              {entry.highlights.map((h, i) => (
                <span key={i}>
                  {i > 0 && " — "}{h}
                </span>
              ))}
            </p>
          )}
        </div>

        {/* Tech Stack */}
        {entry.techStack && entry.techStack.length > 0 && (
          <div className="mt-2">
            <p className="mb-1.5 font-mono text-[10px] tracking-widest uppercase text-[oklch(0.4_0_0)]">
              Stack
            </p>
            <p className="font-mono text-sm text-[oklch(0.5_0_0)]">
              {entry.techStack.join(" · ")}
            </p>
          </div>
        )}

        {/* Horizontal hairline divider separating entries */}
        {!isLast && (
           <div className="mt-8 h-px w-full max-w-2xl bg-[oklch(1_0_0/10%)]" aria-hidden="true" />
        )}
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Experience Section
// ─────────────────────────────────────────────────────────────────────────────
export function Experience() {
  return (
    <section id="experience" className="relative py-20 md:py-28" aria-label="Experience">
      {/* Top rule */}
      <div aria-hidden="true" className="absolute top-0 inset-x-0 h-px bg-[oklch(1_0_0/10%)]" />

      <div className="mx-auto w-full max-w-[80rem] px-6 sm:px-10 lg:px-14">
        {/* Two-column layout matching Process/Projects pattern */}
        <div className="flex flex-col gap-16 lg:flex-row lg:gap-24">
          
          {/* Left — section header */}
          <div className="lg:w-[38%] lg:pt-1">
            <ExperienceHeader />
          </div>

          {/* Right — timeline list */}
          <div className="flex-1">
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
      </div>
    </section>
  );
}
