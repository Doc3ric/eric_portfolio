"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { GitHubCalendar } from "react-github-calendar";
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
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);


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
            <div className="flex flex-col gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <Terminal className="h-4 w-4 text-brand-blue" />
                  <span className="text-xs font-semibold uppercase tracking-widest text-foreground">
                    Open Source Activity
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Tracking my recent development updates and repository activity on GitHub.
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center min-h-[160px] overflow-hidden rounded-xl bg-surface-2/30 p-4">
              {mounted ? (
                <div className="max-w-full overflow-x-auto pb-2 -mx-2 px-2 scrollbar-thin">
                  <GitHubCalendar 
                    username="Doc3ric"
                    colorScheme={resolvedTheme === "dark" ? "dark" : "light"}
                    theme={{
                      light: ['#ebedf0', '#bae6fd', '#7dd3fc', '#38bdf8', '#0284c7'],
                      dark: ['#1e1e24', '#0ea5e940', '#0ea5e970', '#0ea5e9a0', '#0ea5e9']
                    }}
                    transformData={(contributions) => contributions.slice(-150)}
                  />
                </div>
              ) : (
                <div className="h-[120px] w-full animate-pulse rounded-lg bg-surface-3/50" />
              )}
            </div>

            <div className="flex items-center justify-between border-t border-border pt-4">
              <div className="flex items-center gap-2 text-xs font-medium text-status-production">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-status-production opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-status-production" />
                </span>
                Live Sync via GitHub Chart API
              </div>
              <a 
                href="https://github.com/Doc3ric" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group flex items-center gap-1.5 rounded-md border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-brand-blue/30 hover:text-brand-blue"
              >
                Visit GitHub Profile
                <span className="transition-transform duration-200 group-hover:translate-x-0.5">&rarr;</span>
              </a>
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
