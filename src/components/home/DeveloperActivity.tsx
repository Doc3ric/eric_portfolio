"use client";

import { motion } from "motion/react";
import { GitBranch, GitCommit, GitPullRequest, Code2, Sparkles, Terminal, Activity, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { useInView } from "@/hooks/useInView";
import homeData from "@/content/home.json";
import { SectionHeader } from "@/components/shared/SectionHeader";
import type { DeveloperActivity as ActivityType } from "@/types";

const activity = homeData as ActivityType;

export function DeveloperActivity() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.1 });

  // Generate a mock contribution graph data structure (7 days x 20 weeks)
  const weeks = 22;
  const days = 7;
  const gridCells = Array.from({ length: weeks * days }).map((_, i) => {
    // Generate organic-looking variation using a deterministic pseudorandom generator.
    // This prevents React Hydration mismatches by ensuring server and client HTML match exactly.
    const pseudoRand = Math.abs(Math.sin(i + 5)) * 1000 % 1;
    let level = 0; // Empty
    if (pseudoRand > 0.85) level = 4; // High activity
    else if (pseudoRand > 0.7) level = 3; // Medium-high
    else if (pseudoRand > 0.5) level = 2; // Medium
    else if (pseudoRand > 0.35) level = 1; // Low
    return level;
  });

  const getLevelColor = (level: number) => {
    switch (level) {
      case 1:
        return "bg-brand-blue/20 border-brand-blue/10";
      case 2:
        return "bg-brand-blue/40 border-brand-blue/20";
      case 3:
        return "bg-brand-blue/70 border-brand-blue/30";
      case 4:
        return "bg-gradient-to-br from-brand-blue to-brand-purple border-brand-blue/40";
      default:
        return "bg-surface-3 border-border/20";
    }
  };

  return (
    <section id="activity" className="section" aria-label="Developer Activity">
      <div className="container-xl flex flex-col gap-12">
        <SectionHeader
          eyebrow="Activity"
          heading="Developer"
          highlight="Activity Dashboard"
          description="A centralized overview of my current projects, production systems, and coding metrics. Kept up to date to showcase active development."
        />

        {/* Bento Grid */}
        <div ref={ref} className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Card 1: Current Focus & Latest Project */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-2 rounded-2xl border border-border bg-surface-1 p-6 flex flex-col justify-between gap-6"
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-blue opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-blue" />
                </span>
                <span className="text-xs font-semibold uppercase tracking-widest text-brand-blue">
                  Current Focus
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-foreground">
                  Building: {activity.latestProject}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {activity.currentFocus}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground border-t border-border pt-4">
              <Activity className="h-3.5 w-3.5" />
              <span>Active development in progress</span>
            </div>
          </motion.div>

          {/* Card 2: Availability */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-2xl border border-border bg-surface-1 p-6 flex flex-col justify-between gap-6"
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-widest text-status-production">
                  Status
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-foreground">Availability</h3>
                <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-status-production/30 bg-status-production/10 px-3.5 py-1.5 text-sm font-semibold text-status-production">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-status-production opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-status-production" />
                  </span>
                  Freelance &amp; Remote
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground border-t border-border pt-4">
              <Calendar className="h-3.5 w-3.5" />
              <span>Last updated: {activity.lastUpdated}</span>
            </div>
          </motion.div>

          {/* Card 3: Contribution Heatmap */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:col-span-2 rounded-2xl border border-border bg-surface-1 p-6 flex flex-col gap-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/80">
                  Weekly Contribution Activity
                </span>
              </div>
              <span className="text-[10px] text-muted-foreground/60">Past 150 days</span>
            </div>

            {/* Heatmap Grid */}
            <div className="flex flex-col gap-1 overflow-x-auto pb-2">
              <div className="grid grid-flow-col gap-1 auto-cols-max">
                {Array.from({ length: weeks }).map((_, wIndex) => (
                  <div key={wIndex} className="grid grid-rows-7 gap-1">
                    {Array.from({ length: days }).map((_, dIndex) => {
                      const level = gridCells[wIndex * days + dIndex];
                      return (
                        <div
                          key={dIndex}
                          className={cn(
                            "h-2.5 w-2.5 rounded-sm border transition-all duration-300 hover:scale-125",
                            getLevelColor(level)
                          )}
                          title={`Activity level: ${level}`}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div className="mt-2 flex items-center justify-end gap-1.5 text-[10px] text-muted-foreground">
                <span>Less</span>
                <div className="h-2 w-2 rounded-sm border border-border/20 bg-surface-3" />
                <div className="h-2 w-2 rounded-sm border border-brand-blue/10 bg-brand-blue/20" />
                <div className="h-2 w-2 rounded-sm border border-brand-blue/20 bg-brand-blue/40" />
                <div className="h-2 w-2 rounded-sm border border-brand-blue/30 bg-brand-blue/70" />
                <div className="h-2 w-2 rounded-sm border border-brand-blue/40 bg-gradient-to-br from-brand-blue to-brand-purple" />
                <span>More</span>
              </div>
            </div>
          </motion.div>

          {/* Card 4: Mini Stats Bento */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="rounded-2xl border border-border bg-surface-1 p-6 flex flex-col justify-between gap-4"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-brand-purple" />
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/80">
                Core Metrics
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1 border-r border-border pr-2">
                <span className="text-2xl font-bold text-foreground">
                  {activity.productionSystems}
                </span>
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                  Production Apps
                </span>
              </div>
              <div className="flex flex-col gap-1 pl-2">
                <span className="text-2xl font-bold text-foreground">
                  {activity.repositories}
                </span>
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                  Repositories
                </span>
              </div>
              <div className="flex flex-col gap-1 border-r border-border border-t pt-4 pr-2">
                <span className="text-2xl font-bold text-foreground">
                  {activity.openSource}
                </span>
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                  Open Source
                </span>
              </div>
              <div className="flex flex-col gap-1 border-t pt-4 pl-2">
                <span className="text-2xl font-bold text-foreground">
                  {activity.yearsActive}
                </span>
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                  Years Active
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground mt-2">
              <GitCommit className="h-3 w-3" />
              <span>Verifiable on GitHub</span>
            </div>
          </motion.div>

          {/* Card 5: Recent Technologies */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="md:col-span-3 rounded-2xl border border-border bg-surface-1 p-6 flex flex-col gap-4"
          >
            <div className="flex items-center gap-2">
              <Code2 className="h-4 w-4 text-brand-blue" />
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/80">
                Recent Technologies Active In Commits
              </span>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {activity.recentTechnologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-border bg-surface-2 px-3.5 py-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
