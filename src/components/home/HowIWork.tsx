"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";

// ─────────────────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────────────────
const steps = [
  {
    id: "discovery",
    num: "01",
    label: "Discovery",
    description:
      "Understanding requirements, business goals, and user needs before writing a single line of code. Clear scoping prevents costly changes mid-build.",
  },
  {
    id: "planning",
    num: "02",
    label: "Planning",
    description:
      "Architecture design, database schema, API contracts, and project milestones agreed upfront — so every decision has a reason and a paper trail.",
  },
  {
    id: "ui-design",
    num: "03",
    label: "UI Design",
    description:
      "Wireframes and high-fidelity mockups focused on usability. I design for developer handoff clarity, not for portfolio screenshots.",
  },
  {
    id: "development",
    num: "04",
    label: "Development",
    description:
      "Clean, maintainable code with regular commits, clear naming, and progress updates. No \"magic\" code that only I can read.",
  },
  {
    id: "testing",
    num: "05",
    label: "Testing & Review",
    description:
      "Functional testing, edge-case handling, performance checks, and stakeholder review before any production release.",
  },
  {
    id: "deployment",
    num: "06",
    label: "Deployment & Handoff",
    description:
      "Smooth production release with monitoring, documentation, and a handoff process so the system stays maintainable after I leave.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Step row
// ─────────────────────────────────────────────────────────────────────────────
interface StepRowProps {
  step: (typeof steps)[number];
  index: number;
  isLast: boolean;
}

function StepRow({ step, index, isLast }: StepRowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });

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
      className="relative grid grid-cols-[2rem_1fr] gap-x-8 sm:grid-cols-[3.5rem_1fr] md:grid-cols-[3.5rem_max-content_1fr] md:gap-x-10"
    >
      {/* ── Left: step number ── */}
      <div className="flex flex-col items-center pt-0.5">
        {/* Number */}
        <span
          className="font-mono text-sm font-bold leading-none tabular-nums"
          style={{ color: "oklch(0.72 0.18 210)" }} // single accent — cyan
        >
          {step.num}
        </span>

        {/* Vertical rule connector */}
        {!isLast && (
          <motion.div
            className="mt-3 w-px flex-1 bg-[oklch(1_0_0/10%)]"
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

      {/* ── Middle: title (label column on md+) ── */}
      <div className="md:w-44 lg:w-52 pt-0.5">
        <h3 className="font-sans text-base font-bold leading-tight tracking-tight text-foreground sm:text-lg">
          {step.label}
        </h3>
      </div>

      {/* ── Right: description ── */}
      <div className="col-start-2 mt-2 pb-10 md:col-start-3 md:mt-0 md:pb-12">
        <p className="text-base leading-relaxed text-muted-foreground">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Section header — matches hero / Projects pattern exactly
// ─────────────────────────────────────────────────────────────────────────────
function ProcessHeader() {
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
        — PROCESS —
      </p>
      <h2 className="font-sans text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.0] tracking-[-0.03em] text-foreground">
        How I{" "}
        <span className="text-foreground/40">Approach Every Project</span>
      </h2>
      <p className="mt-2 max-w-xl text-base leading-relaxed text-muted-foreground">
        A repeatable process built from working on real production systems. No
        surprises — just clear communication and solid delivery.
      </p>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HowIWork section
// ─────────────────────────────────────────────────────────────────────────────
export function HowIWork() {
  return (
    <section
      id="how-i-work"
      aria-label="How I Work"
      className="relative py-20 md:py-28"
    >
      {/* Top rule */}
      <div
        aria-hidden="true"
        className="absolute top-0 inset-x-0 h-px bg-[oklch(1_0_0/10%)]"
      />

      <div className="mx-auto w-full max-w-[80rem] px-6 sm:px-10 lg:px-14">
        {/* Two-column split: header left, steps right on lg */}
        <div className="flex flex-col gap-16 lg:flex-row lg:gap-24">
          {/* Left — section header, sticks to top on large screens */}
          <div className="lg:w-[38%] lg:pt-1">
            <ProcessHeader />

            {/* Subtle "what this means" footnote */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 font-mono text-[10px] leading-relaxed tracking-widest uppercase text-[oklch(0.4_0_0)]"
            >
              6 phases · Solo delivery
            </motion.p>
          </div>

          {/* Right — numbered step list */}
          <div className="flex-1">
            {steps.map((step, index) => (
              <StepRow
                key={step.id}
                step={step}
                index={index}
                isLast={index === steps.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
