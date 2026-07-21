"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { ProjectRow } from "@/components/projects/ProjectRow";
import featuredData from "@/content/featured.json";
import type { FeaturedWorkItem } from "@/types";

// Cast the JSON to a richer shape that includes optional fields from the data
type ProjectData = FeaturedWorkItem & {
  year?: number;
  role?: string;
  duration?: string;
  metrics?: { label: string; value: string }[];
  images?: { coverImage?: string; thumbnail?: string };
  liveUrl?: string;
  githubUrl?: string;
  category?: string[];
};

const projects = (featuredData as ProjectData[]).sort(
  (a, b) => (a.order ?? 99) - (b.order ?? 99)
);

// ─────────────────────────────────────────────────────────────────────────────
// Section header — matches the hero's label + heading pattern:
// small monospace caps label → large tight heading
// ─────────────────────────────────────────────────────────────────────────────
function ProjectsHeader() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col gap-4 pb-4"
    >
      {/* Eyebrow — mirrors hero label treatment exactly */}
      <p className="font-mono text-[10px] tracking-widest uppercase" style={{ color: "oklch(0.72 0.18 210)" }}>
        — FEATURED WORK —
      </p>

      {/* Section heading — same weight/scale family as "Full Stack Engineer" */}
      <h2 className="font-sans text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.0] tracking-[-0.03em] text-foreground">
        Projects That{" "}
        <span className="text-foreground/40">Shipped to Production</span>
      </h2>

      {/* Subtext — matches hero body text tone */}
      <p className="mt-2 max-w-xl text-base leading-relaxed text-muted-foreground">
        A selection of production systems, AI-powered tools, and web
        applications — built solo and delivered end-to-end.
      </p>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Projects section
// ─────────────────────────────────────────────────────────────────────────────
export function Projects() {
  return (
    <section
      id="projects"
      aria-label="Projects section"
      className="relative py-20 md:py-28"
    >
      {/* Faint top rule — mirrors hero's section boundary */}
      <div aria-hidden="true" className="absolute top-0 inset-x-0 h-px bg-[oklch(1_0_0/10%)]" />

      <div className="mx-auto w-full max-w-[80rem] px-6 sm:px-10 lg:px-14">
        {/* Section header */}
        <ProjectsHeader />

        {/* Project list — vertical rows, separated by rules */}
        <div className="mt-12 lg:mt-16">
          {projects.map((project, index) => (
            <ProjectRow
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </div>

        {/* Footer note — plain text, no button pill */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "0px 0px -40px 0px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex items-center gap-4"
        >
          <div className="h-px flex-1 bg-[oklch(1_0_0/10%)]" />
          <p className="font-mono text-[10px] tracking-widest uppercase text-[oklch(0.4_0_0)]">
            {projects.length} projects · More coming
          </p>
          <div className="h-px flex-1 bg-[oklch(1_0_0/8%)]" />
        </motion.div>
      </div>
    </section>
  );
}
