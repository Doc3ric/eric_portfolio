"use client";

import { useRef } from "react";
import { useInView } from "motion/react";
import { Zap, Server, Code2, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCountUp } from "@/hooks/useCountUp";
import { siteConfig } from "@/config/site.config";

interface StatCard {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  value: number;
  suffix: string;
  label: string;
  description: string;
  gradient: string;
}

const statCards: StatCard[] = [
  {
    id: "projects",
    icon: Code2,
    value: 12,
    suffix: "+",
    label: "Projects Built",
    description: "From government systems to mobile apps",
    gradient: "from-brand-blue/10 to-transparent",
  },
  {
    id: "production",
    icon: Server,
    value: 3,
    suffix: "",
    label: "Production Systems",
    description: "Live systems used by real organizations",
    gradient: "from-status-production/10 to-transparent",
  },
  {
    id: "technologies",
    icon: Zap,
    value: 20,
    suffix: "+",
    label: "Technologies",
    description: "Across web, mobile, AI, and cloud",
    gradient: "from-brand-purple/10 to-transparent",
  },
  {
    id: "passion",
    icon: Heart,
    value: 100,
    suffix: "%",
    label: "Passion",
    description: "I build systems that matter",
    gradient: "from-rose-500/10 to-transparent",
  },
];

function StatCardItem({ card }: { card: StatCard }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });
  const { count } = useCountUp(card.value, 1500);
  const Icon = card.icon;

  return (
    <div
      ref={ref}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border bg-surface-1 p-6",
        "transition-all duration-300 hover:-translate-y-1 hover:border-border hover:shadow-lg hover:shadow-black/20"
      )}
    >
      {/* Gradient background on hover */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100",
          card.gradient
        )}
      />

      <div className="relative flex flex-col gap-3">
        {/* Icon */}
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface-2">
          <Icon className="h-5 w-5 text-muted-foreground" />
        </div>

        {/* Value */}
        <div className="text-4xl font-bold tracking-tight sm:text-5xl">
          <span className="gradient-text tabular-nums">
            {inView ? count : 0}
            {card.suffix}
          </span>
        </div>

        {/* Label + description */}
        <div className="flex flex-col gap-1">
          <p className="font-semibold text-foreground">{card.label}</p>
          <p className="text-sm text-muted-foreground">{card.description}</p>
        </div>
      </div>
    </div>
  );
}

export function Stats() {
  return (
    <section id="stats" className="section" aria-label="Statistics">
      <div className="container-xl">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map((card, i) => (
            <div
              key={card.id}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <StatCardItem card={card} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
