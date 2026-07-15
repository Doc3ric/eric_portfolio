"use client";

import { motion } from "motion/react";
import {
  Search,
  FileText,
  Palette,
  Code2,
  TestTube2,
  Rocket,
  ArrowDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useInView } from "@/hooks/useInView";
import { SectionHeader } from "@/components/shared/SectionHeader";

const steps = [
  {
    id: "discovery",
    icon: Search,
    label: "Discovery",
    description: "Understanding requirements, business goals, and user needs before writing a single line of code.",
    color: "text-brand-blue",
    bg: "bg-brand-blue/10 border-brand-blue/20",
  },
  {
    id: "planning",
    icon: FileText,
    label: "Planning",
    description: "Architecture design, database schema, API contracts, and project milestones agreed upfront.",
    color: "text-brand-purple",
    bg: "bg-brand-purple/10 border-brand-purple/20",
  },
  {
    id: "ui-design",
    icon: Palette,
    label: "UI Design",
    description: "Wireframes and high-fidelity mockups with a focus on usability and developer handoff clarity.",
    color: "text-brand-cyan",
    bg: "bg-brand-cyan/10 border-brand-cyan/20",
  },
  {
    id: "development",
    icon: Code2,
    label: "Development",
    description: "Clean, maintainable code with regular commits, code reviews, and clear progress updates.",
    color: "text-status-production",
    bg: "bg-status-production/10 border-status-production/20",
  },
  {
    id: "testing",
    icon: TestTube2,
    label: "Testing",
    description: "Functional testing, edge cases, performance checks, and stakeholder review before release.",
    color: "text-amber-400",
    bg: "bg-amber-400/10 border-amber-400/20",
  },
  {
    id: "deployment",
    icon: Rocket,
    label: "Deployment",
    description: "Smooth production release with monitoring, documentation, and ongoing support handoff.",
    color: "text-rose-400",
    bg: "bg-rose-400/10 border-rose-400/20",
  },
];

interface StepCardProps {
  step: (typeof steps)[number];
  index: number;
  isLast: boolean;
}

function StepCard({ step, index, isLast }: StepCardProps) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.2 });
  const Icon = step.icon;

  return (
    <div ref={ref} className="flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
        transition={{ delay: index * 0.08, duration: 0.4, ease: "easeOut" }}
        className={cn(
          "group flex w-full flex-col items-center gap-4 rounded-2xl border p-6 text-center",
          "transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/20",
          step.bg
        )}
      >
        {/* Step number */}
        <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground/60">
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Icon */}
        <div
          className={cn(
            "flex h-14 w-14 items-center justify-center rounded-2xl border bg-background/50",
            step.bg
          )}
        >
          <Icon className={cn("h-7 w-7", step.color)} />
        </div>

        {/* Label */}
        <h3 className={cn("text-lg font-bold", step.color)}>{step.label}</h3>

        {/* Description */}
        <p className="text-sm leading-relaxed text-muted-foreground">
          {step.description}
        </p>
      </motion.div>

      {/* Down arrow connector */}
      {!isLast && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
          transition={{ delay: index * 0.08 + 0.2, duration: 0.3 }}
          className="my-2"
        >
          <ArrowDown className="h-5 w-5 text-border" />
        </motion.div>
      )}
    </div>
  );
}

export function HowIWork() {
  return (
    <section id="how-i-work" className="section" aria-label="How I Work">
      <div className="container-xl flex flex-col items-center gap-12">
        <SectionHeader
          eyebrow="Process"
          heading="How I"
          highlight="Approach Every Project"
          description="A repeatable process built from working on real production systems. No surprises — just clear communication and solid delivery."
          align="center"
        />

        {/* Mobile: vertical list, Desktop: 3-column grid */}
        <div className="grid w-full max-w-4xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {steps.map((step, index) => (
            <StepCard
              key={step.id}
              step={step}
              index={index}
              isLast={index === steps.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
