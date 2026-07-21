"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import type { FeaturedWorkItem } from "@/types";

// ─────────────────────────────────────────────────────────────────────────────
// Status label map — plain monospace text, no colored pills
// ─────────────────────────────────────────────────────────────────────────────
const statusDot: Record<string, string> = {
  production: "bg-[oklch(0.65_0.18_145)]",   // muted green dot
  "in-progress": "bg-[oklch(0.72_0.18_210)]", // cyan dot (matches hero accent)
  personal: "bg-[oklch(0.55_0_0)]",           // neutral gray dot
  "open-source": "bg-[oklch(0.55_0_0)]",
};

const statusText: Record<string, string> = {
  production: "Production",
  "in-progress": "In Progress",
  personal: "Portfolio Project",
  "open-source": "Open Source",
};

// ─────────────────────────────────────────────────────────────────────────────
// ProjectRow — one editorial list item
// ─────────────────────────────────────────────────────────────────────────────
interface ProjectRowProps {
  project: FeaturedWorkItem & {
    year?: number;
    role?: string;
    duration?: string;
    metrics?: { label: string; value: string }[];
    images?: { coverImage?: string; thumbnail?: string };
    liveUrl?: string;
    githubUrl?: string;
  };
  index: number;
}

export function ProjectRow({ project, index }: ProjectRowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });
  const [isHovered, setIsHovered] = useState(false);

  const hasCover = !!project.images?.coverImage;
  const dot = statusDot[project.status] ?? statusDot.personal;
  const label = statusText[project.status] ?? project.statusLabel;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{
        duration: 0.65,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="project-row group relative"
    >
      {/* ── Top rule — draws in from left on hover ── */}
      <div className="relative h-px bg-[oklch(1_0_0/10%)] overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-[oklch(1_0_0/20%)]"
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      {/* ── Row body ── */}
      <div className="grid grid-cols-1 gap-6 py-10 lg:grid-cols-[1fr_auto] lg:gap-16 lg:py-12">

        {/* Left — all text content */}
        <div className="flex flex-col gap-5">

          {/* ·· Header row: status · year · role ·· */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Status — plain monospace dot + label */}
            <span className="flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase text-[oklch(0.55_0_0)]">
              <span className={`inline-block h-1.5 w-1.5 rounded-full ${dot}`} />
              {label}
            </span>

            {project.year && (
              <>
                <span className="font-mono text-[10px] text-[oklch(0.3_0_0)]">·</span>
                <span className="font-mono text-[10px] tracking-widest uppercase text-[oklch(0.55_0_0)]">
                  {project.year}
                </span>
              </>
            )}

            {project.role && (
              <>
                <span className="font-mono text-[10px] text-[oklch(0.3_0_0)]">·</span>
                <span className="font-mono text-[10px] tracking-widest uppercase text-[oklch(0.55_0_0)]">
                  {project.role}
                </span>
              </>
            )}

            {project.duration && (
              <>
                <span className="font-mono text-[10px] text-[oklch(0.3_0_0)]">·</span>
                <span className="font-mono text-[10px] tracking-widest uppercase text-[oklch(0.55_0_0)]">
                  {project.duration}
                </span>
              </>
            )}
          </div>

          {/* ·· Project title — large, editorial ·· */}
          <h3 className="font-sans text-[clamp(1.5rem,3.5vw,2.5rem)] font-bold leading-[1.05] tracking-[-0.025em] text-foreground transition-colors duration-300 group-hover:text-foreground/80">
            {project.title}
          </h3>

          {/* ·· Description ·· */}
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground lg:text-lg">
            {project.description}
          </p>

          {/* ·· Tech stack — inline monospace, matches hero "Stack" row ·· */}
          <div>
            <p className="mb-1.5 font-mono text-[10px] tracking-widest uppercase text-[oklch(0.4_0_0)]">
              Stack
            </p>
            <p className="font-mono text-sm text-[oklch(0.5_0_0)]">
              {project.techStack.join(" · ")}
            </p>
          </div>

          {/* ·· Key metrics — plain stat row, accent on numbers ·· */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="flex flex-wrap items-end gap-8 pt-1">
              {project.metrics.map((m) => (
                <div key={m.label} className="flex flex-col gap-0.5">
                  <span
                    className="font-sans text-2xl font-bold leading-none tracking-tight"
                    style={{ color: "oklch(0.72 0.18 210)" }} // single accent — cyan
                  >
                    {m.value}
                  </span>
                  <span className="font-mono text-[10px] tracking-widest uppercase text-[oklch(0.45_0_0)]">
                    {m.label}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* ·· CTA — text link with arrow ·· */}
          <div className="flex items-center gap-6 pt-2">
            <Link
              href={`/projects/${project.slug}`}
              id={`project-row-${project.slug}`}
              className="group/link inline-flex items-center gap-2 font-medium text-foreground underline-offset-4 transition-colors hover:underline"
            >
              View Case Study
              <ArrowUpRight
                className="h-4 w-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                aria-hidden="true"
              />
            </Link>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border-b border-[oklch(1_0_0/10%)] pb-0.5 font-medium text-muted-foreground/60 transition-colors hover:border-foreground/20 hover:text-muted-foreground"
              >
                Live Site
              </a>
            )}
          </div>
        </div>

        {/* Right — preview image (desktop only), appears on hover */}
        {hasCover && (
          <motion.div
            className="relative hidden h-52 w-80 shrink-0 overflow-hidden lg:block xl:w-96 border border-[oklch(1_0_0/10%)]"
            initial={{ opacity: 0, x: 12 }}
            animate={isHovered ? { opacity: 1, x: 0 } : { opacity: 0, x: 12 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            aria-hidden="true"
          >
            <Image
              src={project.images!.coverImage!}
              alt={`${project.title} preview`}
              fill
              sizes="(max-width: 1280px) 320px, 384px"
              className="object-cover object-top grayscale transition-all duration-500 group-hover:grayscale-0"
            />
          </motion.div>
        )}
      </div>

      {/* Bottom rule — always shown on last row too */}
      <div className="h-px bg-[oklch(1_0_0/10%)]" />
    </motion.div>
  );
}
