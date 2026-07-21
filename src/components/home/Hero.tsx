"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, Download, MapPin } from "lucide-react";
import { siteConfig } from "@/config/site.config";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────
interface BlinkingCursorProps {
  className?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────

/** Blinking terminal cursor — one accent micro-detail */
function BlinkingCursor({ className = "" }: BlinkingCursorProps) {
  return (
    <motion.span
      aria-hidden="true"
      className={`inline-block w-[3px] h-[1em] bg-[var(--accent-mark)] align-middle ${className}`}
      animate={{ opacity: [1, 0, 1] }}
      transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
    />
  );
}

/** Scroll-triggered line that draws itself in */
function DrawLine({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      className="absolute left-0 top-0 h-full w-px bg-[var(--rule-color)]"
      initial={{ scaleY: 0, originY: 0 }}
      animate={{ scaleY: 1 }}
      transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Hero
// ─────────────────────────────────────────────────────────────────────────────
export function Hero() {
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax: image drifts up slightly as user scrolls
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const stackItems = [
    "Laravel",
    "React",
    "Next.js",
    "TypeScript",
    "Inertia.js",
    "Tailwind",
    "MySQL",
    "AI/LLMs",
    "REST APIs",
    "Flutter",
  ];

  return (
    <section
      ref={sectionRef}
      id="home"
      aria-label="Hero section"
      className="hero-section relative min-h-screen pt-[var(--nav-height)] overflow-hidden"
    >
      {/* ── CSS custom properties scoped to hero ─────────────────────────── */}
      <style>{`
        .hero-section {
          --nav-height: 4rem;
          --accent-mark: oklch(0.72 0.18 210);   /* single accent — cyan */
          --rule-color: oklch(1 0 0 / 10%);
          --label-color: oklch(0.55 0 0);
          --hero-max: 80rem;
        }
      `}</style>

      {/* ── Noise / grain texture overlay ────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px",
        }}
      />

      {/* ── Faint horizontal rule at very top of section ─────────────────── */}
      <div
        aria-hidden="true"
        className="absolute top-[var(--nav-height)] inset-x-0 h-px bg-[var(--rule-color)]"
      />

      {/* ════════════════════════════════════════════════════════════════════
          Main grid — intentionally asymmetric: 55 / 45 split on desktop,
          stacked on mobile
      ════════════════════════════════════════════════════════════════════ */}
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-var(--nav-height))] max-w-[var(--hero-max)] flex-col lg:flex-row">

        {/* ── LEFT COLUMN ─────────────────────────────────────────────────── */}
        <div className="flex flex-col justify-between px-6 pb-16 pt-20 sm:px-10 lg:w-[55%] lg:px-14 md:pb-28 md:pt-28 lg:pb-20 lg:pt-28">

          {/* ·· Top label row ·· */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3"
          >
            {/* Availability pulse — plain dot, no pill */}
            {siteConfig.availability && (
              <span className="flex items-center gap-2 text-xs tracking-widest uppercase text-[var(--label-color)]">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent-mark)] opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--accent-mark)]" />
                </span>
                Available for work
              </span>
            )}
            <span className="text-[var(--rule-color)] text-xs">·</span>
            <span className="flex items-center gap-1 text-xs tracking-widest uppercase text-[var(--label-color)]">
              <MapPin className="h-3 w-3" aria-hidden="true" />
              PH
            </span>
          </motion.div>

          {/* ·· Headline — large, tight, type-led ·· */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 lg:mt-0 lg:flex-1 lg:flex lg:flex-col lg:justify-center"
          >
            <h1 className="font-sans text-[clamp(2.8rem,7vw,5.5rem)] font-bold leading-[0.95] tracking-[-0.03em] text-foreground">
              Full Stack
              <br />
              <span className="text-foreground/40">Engineer</span>
              <BlinkingCursor className="ml-2 mb-1" />
            </h1>

            {/* Sub-heading — role line, monospace feel */}
            <p className="mt-6 font-mono text-xs tracking-widest uppercase text-[var(--label-color)]">
              Eric Alenton &nbsp;/&nbsp; Malaybalay City, Bukidnon, Philippines
            </p>

            {/* Bio paragraph */}
            <p className="mt-8 max-w-md text-base leading-relaxed text-muted-foreground lg:text-lg">
              Building production-grade web applications with Laravel, React,
              and AI. I specialise in government systems, dashboards, and
              tools that solve real-world problems.
            </p>

            {/* ·· Stack row — inline text, not chips ·· */}
            <div className="mt-8">
              <p className="mb-2 font-mono text-[10px] tracking-widest uppercase text-[var(--label-color)]">
                Stack
              </p>
              <p className="font-mono text-sm text-muted-foreground/70">
                {stackItems.join(" · ")}
              </p>
            </div>
          </motion.div>

          {/* ·· CTA row — text links, no pill buttons ·· */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mt-16 flex flex-wrap items-center gap-6 lg:mt-0"
          >
            {/* Primary — underline link */}
            <Link
              href="/#projects"
              id="hero-view-projects"
              className="group inline-flex items-center gap-2 font-medium text-foreground underline-offset-4 transition-all hover:underline"
            >
              View Projects
              <ArrowUpRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </Link>

            {/* Secondary — subtle border button */}
            <a
              href={siteConfig.resume}
              download
              id="hero-download-resume"
              className="group inline-flex items-center gap-2 border-b border-[var(--rule-color)] pb-0.5 font-medium text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
            >
              <Download className="h-3.5 w-3.5" aria-hidden="true" />
              Download Résumé
            </a>

            {/* Tertiary */}
            <a
              href="/#contact"
              id="hero-contact"
              className="font-medium text-muted-foreground/60 transition-colors hover:text-muted-foreground"
            >
              Contact Me
            </a>
          </motion.div>
        </div>

        {/* ── RIGHT COLUMN — photo treatment ──────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative hidden overflow-hidden lg:block lg:w-[45%]"
        >
          {/* Vertical rule separating columns */}
          <div className="relative h-full">
            <DrawLine delay={0.4} />

            {/* Photo — grayscale, parallax drift, no badges on top */}
            <motion.div
              style={{ y: mounted ? imageY : "0%" }}
              className="absolute inset-0"
            >
              <Image
                src="/images/profileremovebg.png"
                alt={`${siteConfig.name} — ${siteConfig.title}`}
                fill
                priority
                sizes="(max-width: 1024px) 0px, 45vw"
                className="object-cover object-top grayscale transition-all duration-700 hover:grayscale-0"
                style={{ objectPosition: "center top" }}
              />
              {/* Bottom fade so photo merges into page */}
              <div
                aria-hidden="true"
                className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-background via-background/60 to-transparent"
              />
              {/* Left-edge vignette so the column line reads cleanly */}
              <div
                aria-hidden="true"
                className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-background to-transparent"
              />
            </motion.div>

            {/* ·· Info overlay — bottom-right corner ·· */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="absolute bottom-8 right-8 z-10 space-y-1 text-right"
            >
              <p className="font-mono text-[10px] tracking-widest uppercase text-[var(--label-color)]">
                {siteConfig.stats.projects} projects delivered
              </p>
              <p className="font-mono text-[10px] tracking-widest uppercase text-[var(--label-color)]">
                {siteConfig.stats.productionSystems} in production
              </p>
              <p className="font-mono text-[10px] tracking-widest uppercase text-[var(--label-color)]">
                {siteConfig.stats.years} years experience
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* ── Mobile photo — below fold, cropped, grayscale ─────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative h-64 w-full overflow-hidden sm:h-80 lg:hidden"
        >
          <Image
            src="/images/profileremovebg.png"
            alt={`${siteConfig.name} — ${siteConfig.title}`}
            fill
            priority
            sizes="100vw"
            className="object-cover object-top grayscale"
            style={{ objectPosition: "center 15%" }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent"
          />
        </motion.div>
      </div>

      {/* ── Bottom rule ───────────────────────────────────────────────────── */}
      <motion.div
        aria-hidden="true"
        initial={{ scaleX: 0, originX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.4, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-0 inset-x-0 h-px bg-[var(--rule-color)]"
      />

      {/* ── Scroll indicator ─────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden flex-col items-center gap-2 lg:flex"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="h-6 w-px bg-gradient-to-b from-[var(--label-color)] to-transparent"
        />
      </motion.div>
    </section>
  );
}
