"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import technologiesData from "@/content/technologies.json";
import type { TechnologyCategory } from "@/types";

const categories = technologiesData as TechnologyCategory[];

// ─────────────────────────────────────────────────────────────────────────────
// Single category group — plain label + inline tech text
// ─────────────────────────────────────────────────────────────────────────────
interface CategoryGroupProps {
  category: TechnologyCategory;
  index: number;
}

function CategoryGroup({ category, index }: CategoryGroupProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{
        duration: 0.55,
        delay: index * 0.06,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="flex flex-col gap-2"
    >
      {/* Category label — exact same treatment as "STACK" in hero */}
      <p className="font-mono text-[10px] tracking-widest uppercase text-[oklch(0.45_0_0)]">
        {category.label}
      </p>

      {/* Inline tech list — highlighted items get accent weight, rest stay muted */}
      <p className="font-mono text-sm leading-relaxed text-[oklch(0.5_0_0)]">
        {category.technologies.map((tech, i) => (
          <span key={tech.name}>
            {tech.highlight ? (
              <span
                className="font-semibold"
                style={{ color: "oklch(0.72 0.18 210)" }} // slightly softer accent for inline text
              >
                {tech.name}
              </span>
            ) : (
              <span>{tech.name}</span>
            )}
            {i < category.technologies.length - 1 && (
              <span className="mx-1.5 text-[oklch(0.3_0_0)]">·</span>
            )}
          </span>
        ))}
      </p>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Section header
// ─────────────────────────────────────────────────────────────────────────────
function TechHeader() {
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
        — STACK —
      </p>
      <h2 className="font-sans text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.0] tracking-[-0.03em] text-foreground">
        Technologies{" "}
        <span className="text-foreground/40">I Use</span>
      </h2>
      <p className="mt-2 max-w-xl text-base leading-relaxed text-muted-foreground">
        My active stack grouped by category.{" "}
        <span style={{ color: "oklch(0.72 0.18 210)" }}>Highlighted</span>{" "}
        items represent primary expertise and daily use.
      </p>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TechnologiesIUse section
// ─────────────────────────────────────────────────────────────────────────────
export function TechnologiesIUse() {
  return (
    <section
      id="technologies"
      aria-label="Technologies I Use"
      className="relative py-20 md:py-28"
    >
      {/* Top rule */}
      <div
        aria-hidden="true"
        className="absolute top-0 inset-x-0 h-px bg-[oklch(1_0_0/10%)]"
      />

      <div className="mx-auto w-full max-w-[80rem] px-6 sm:px-10 lg:px-14">
        {/* Two-column layout: header left, categories grid right */}
        <div className="flex flex-col gap-16 lg:flex-row lg:gap-24">

          {/* Left — section header */}
          <div className="lg:w-[38%] lg:pt-1">
            <TechHeader />

            {/* Footnote */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 font-mono text-[10px] leading-relaxed tracking-widest uppercase text-[oklch(0.4_0_0)]"
            >
              {categories.reduce((acc, c) => acc + c.technologies.length, 0)}+ technologies · {categories.length} categories
            </motion.p>
          </div>

          {/* Right — category groups in a 2-column grid */}
          <div className="flex-1">
            {/* Thin top rule above the grid */}
            <div className="h-px bg-[oklch(1_0_0/8%)] mb-10" aria-hidden="true" />

            <div className="grid grid-cols-1 gap-x-16 gap-y-10 sm:grid-cols-2">
              {categories.map((category, index) => (
                <CategoryGroup
                  key={category.id}
                  category={category}
                  index={index}
                />
              ))}
            </div>

            {/* Bottom rule */}
            <div className="h-px bg-[oklch(1_0_0/8%)] mt-10" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
