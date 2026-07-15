"use client";

import { motion } from "motion/react";
import { Monitor, Server, Database, Smartphone, Brain, Cloud, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";
import { useInView } from "@/hooks/useInView";
import technologiesData from "@/content/technologies.json";
import { SectionHeader } from "@/components/shared/SectionHeader";
import type { TechnologyCategory } from "@/types";

const categories = technologiesData as TechnologyCategory[];

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Monitor,
  Server,
  Database,
  Smartphone,
  Brain,
  Cloud,
  Wrench,
};

interface CategoryCardProps {
  category: TechnologyCategory;
  index: number;
}

function CategoryCard({ category, index }: CategoryCardProps) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.15 });
  const IconComponent = iconMap[category.icon || ""] || Wrench;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
      className="rounded-2xl border border-border bg-surface-1 p-6 transition-all duration-300 hover:border-border/80 hover:shadow-lg hover:shadow-black/20"
    >
      <div className="flex flex-col gap-4">
        {/* Category Header */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-surface-2">
            <IconComponent className="h-4.5 w-4.5 text-brand-blue" />
          </div>
          <h3 className="font-bold text-foreground">{category.label}</h3>
        </div>

        {/* Tech Pills */}
        <div className="flex flex-wrap gap-2 pt-2">
          {category.technologies.map((tech) => (
            <span
              key={tech.name}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-medium border transition-colors",
                tech.highlight
                  ? "bg-brand-blue/10 border-brand-blue/30 text-brand-blue hover:bg-brand-blue/20"
                  : "bg-surface-2 border-border text-muted-foreground hover:text-foreground"
              )}
            >
              {tech.name}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function TechnologiesIUse() {
  return (
    <section id="technologies" className="section" aria-label="Technologies I Use">
      <div className="container-xl flex flex-col gap-12">
        <SectionHeader
          eyebrow="Stack"
          heading="Technologies"
          highlight="I Use"
          description="My active stack grouped by category. Technologies highlighted in blue represent my primary expertise and what I use daily."
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((category, index) => (
            <CategoryCard key={category.id} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
