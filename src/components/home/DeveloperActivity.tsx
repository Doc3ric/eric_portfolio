"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { GitHubCalendar } from "react-github-calendar";
import { motion, useInView } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import homeData from "@/content/home.json";
import { siteConfig } from "@/config/site.config";
import type { DeveloperActivity as ActivityType } from "@/types";

const activity = homeData as ActivityType;

// ─────────────────────────────────────────────────────────────────────────────
// Single stat — large plain number + small mono label, no box
// ─────────────────────────────────────────────────────────────────────────────
interface StatProps {
  value: string | number;
  label: string;
  index: number;
}

function Stat({ value, label, index }: StatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{
        duration: 0.55,
        delay: index * 0.07,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="flex flex-col gap-1"
    >
      <span
        className="font-sans text-[clamp(1.75rem,4vw,2.5rem)] font-bold leading-none tracking-tight tabular-nums"
        style={{ color: "oklch(0.72 0.18 210)" }} // single accent — cyan
      >
        {value}
      </span>
      <span className="font-mono text-[10px] tracking-widest uppercase text-[oklch(0.45_0_0)]">
        {label}
      </span>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Section header
// ─────────────────────────────────────────────────────────────────────────────
function ActivityHeader() {
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
        — ACTIVITY —
      </p>
      <h2 className="font-sans text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.0] tracking-[-0.03em] text-foreground">
        Developer{" "}
        <span className="text-foreground/40">Activity</span>
      </h2>
      <p className="mt-2 max-w-xl text-base leading-relaxed text-muted-foreground">
        Live metrics and commit activity — pulled directly from GitHub.
      </p>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DeveloperActivity section
// ─────────────────────────────────────────────────────────────────────────────
export function DeveloperActivity() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);
  const calendarInView = useInView(calendarRef, {
    once: true,
    margin: "0px 0px -60px 0px",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const stats = [
    { value: activity.productionSystems, label: "Production Apps" },
    { value: activity.repositories, label: "Repositories" },
    { value: activity.openSource, label: "Open Source" },
    { value: `${activity.yearsActive}+`, label: "Years Active" },
  ];

  return (
    <section
      id="activity"
      aria-label="Developer Activity"
      className="relative py-20 md:py-28"
    >
      {/* Top rule */}
      <div
        aria-hidden="true"
        className="absolute top-0 inset-x-0 h-px bg-[oklch(1_0_0/10%)]"
      />

      <div className="mx-auto w-full max-w-[80rem] px-6 sm:px-10 lg:px-14 flex flex-col gap-16">

        {/* ── Header + stats row ── */}
        <div className="flex flex-col gap-16 lg:flex-row lg:items-start lg:gap-24">

          {/* Left — section header + availability */}
          <div className="lg:w-[38%] lg:pt-1 flex flex-col gap-8">
            <ActivityHeader />

            {/* Availability — plain dot treatment, matches hero */}
            <div className="flex flex-col gap-1.5">
              <p className="font-mono text-[10px] tracking-widest uppercase text-[oklch(0.45_0_0)]">
                Status
              </p>
              {siteConfig.availability ? (
                <span className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="relative flex h-1.5 w-1.5 shrink-0">
                    <span
                      className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
                      style={{ backgroundColor: "oklch(0.65 0.18 145)" }}
                    />
                    <span
                      className="relative inline-flex h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: "oklch(0.65 0.18 145)" }}
                    />
                  </span>
                  {siteConfig.availabilityLabel}
                </span>
              ) : (
                <span className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="relative flex h-1.5 w-1.5 shrink-0">
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[oklch(0.4_0_0)]" />
                  </span>
                  Not available at this time
                </span>
              )}
            </div>

            {/* Current focus */}
            <div className="flex flex-col gap-1.5">
              <p className="font-mono text-[10px] tracking-widest uppercase text-[oklch(0.45_0_0)]">
                Currently Building
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {activity.latestProject} —{" "}
                <span className="text-foreground/70">{activity.currentFocus}</span>
              </p>
            </div>
          </div>

          {/* Right — stats row */}
          <div className="flex-1 flex flex-col gap-10">
            {/* Hairline above stats */}
            <div className="h-px bg-[oklch(1_0_0/10%)]" aria-hidden="true" />

            {/* 4-stat row — same bare treatment as project metrics */}
            <div className="grid grid-cols-2 gap-x-10 gap-y-8 sm:grid-cols-4">
              {stats.map((s, i) => (
                <Stat key={s.label} value={s.value} label={s.label} index={i} />
              ))}
            </div>

            {/* Recent technologies — inline text, not chips */}
            <div className="flex flex-col gap-2">
              <p className="font-mono text-[10px] tracking-widest uppercase text-[oklch(0.45_0_0)]">
                Recent in Commits
              </p>
              <p className="font-mono text-sm text-[oklch(0.5_0_0)]">
                {activity.recentTechnologies.join(" · ")}
              </p>
            </div>

            {/* Hairline below */}
            <div className="h-px bg-[oklch(1_0_0/10%)]" aria-hidden="true" />
          </div>
        </div>

        {/* ── GitHub Contribution Calendar ── */}
        <motion.div
          ref={calendarRef}
          initial={{ opacity: 0, y: 24 }}
          animate={
            calendarInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }
          }
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-6"
        >
          {/* Calendar label row */}
          <div className="flex items-center justify-between">
            <p className="font-mono text-[10px] tracking-widest uppercase text-[oklch(0.45_0_0)]">
              GitHub Contribution Activity
            </p>
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              id="activity-github-link"
              className="group inline-flex items-center gap-1.5 font-mono text-[10px] tracking-widest uppercase text-[oklch(0.45_0_0)] transition-colors hover:text-foreground"
            >
              Visit Profile
              <ArrowUpRight
                className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </a>
          </div>

          {/* Hairline above graph */}
          <div className="h-px bg-[oklch(1_0_0/10%)]" aria-hidden="true" />

          {/* Calendar — transparent background, no border container */}
          <div className="overflow-x-auto pb-1">
            {mounted ? (
              <GitHubCalendar
                username="Doc3ric"
                colorScheme="dark"
                theme={{
                  dark: [
                    "oklch(0.15 0 0)",      // empty — very muted
                    "oklch(0.55 0.10 210)",  // low
                    "oklch(0.62 0.14 210)",  // mid-low
                    "oklch(0.68 0.17 210)",  // mid-high
                    "oklch(0.72 0.18 210)",  // peak — matches site accent
                  ],
                }}
                transformData={(contributions) => contributions.slice(-180)}
                style={{
                  color: "oklch(0.45 0 0)", // month/day labels in muted gray
                  fontFamily: "var(--font-mono, monospace)",
                  fontSize: "11px",
                }}
              />
            ) : (
              // Skeleton placeholder — same proportions as calendar
              <div className="h-[120px] w-full animate-pulse rounded-sm bg-[oklch(0.12_0_0)]" />
            )}
          </div>

          {/* Hairline below + footnote */}
          <div className="h-px bg-[oklch(1_0_0/10%)]" aria-hidden="true" />

          <div className="flex items-center justify-between">
            <p className="font-mono text-[10px] tracking-widest uppercase text-[oklch(0.35_0_0)]">
              Live sync · Verifiable on GitHub
            </p>
            <p className="font-mono text-[10px] tracking-widest uppercase text-[oklch(0.35_0_0)]">
              Last updated {activity.lastUpdated}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
