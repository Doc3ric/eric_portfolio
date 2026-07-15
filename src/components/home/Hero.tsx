"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Download, Mail, MapPin, Sparkles } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { FadeUp } from "@/components/shared/FadeUp";
import { siteConfig } from "@/config/site.config";

// Floating badge positions around the profile card
const floatingBadges = [
  { label: "Laravel", className: "-top-4 -left-8 rotate-[-8deg]", delay: 0 },
  { label: "Next.js", className: "-top-6 right-2 rotate-[6deg]", delay: 0.15 },
  { label: "React", className: "top-1/3 -right-10 rotate-[10deg]", delay: 0.3 },
  { label: "AI", className: "bottom-16 -right-8 rotate-[-5deg]", delay: 0.1 },
  { label: "TypeScript", className: "-bottom-4 left-4 rotate-[4deg]", delay: 0.25 },
];

export function Hero() {
  const [titleIndex, setTitleIndex] = useState(0);
  const titles = siteConfig.rotatingTitles;

  // Rotate subtitle every 2.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((i) => (i + 1) % titles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [titles.length]);

  return (
    <section
      id="home"
      className="relative min-h-screen pt-16"
      aria-label="Hero section"
    >
      <div className="container-xl flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center py-20 lg:flex-row lg:gap-16 lg:py-28">
        {/* ── Left Column ────────────────────────────────────────── */}
        <div className="flex flex-1 flex-col gap-8 text-center lg:text-left">
          {/* Availability badge */}
          <FadeUp delay={0}>
            <div className="flex justify-center lg:justify-start">
              <div className="inline-flex items-center gap-2 rounded-full border border-status-production/30 bg-status-production/10 px-4 py-1.5 text-sm text-status-production">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-status-production opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-status-production" />
                </span>
                {siteConfig.availabilityLabel}
              </div>
            </div>
          </FadeUp>

          {/* Headline */}
          <FadeUp delay={0.1}>
            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl">
              Building{" "}
              <span className="gradient-text">Production-Ready</span>
              <br />
              Web Applications
              <br />
              with Laravel, React{" "}
              <span className="gradient-text">&amp; AI</span>
            </h1>
          </FadeUp>

          {/* Rotating subtitle */}
          <FadeUp delay={0.2}>
            <div className="flex h-8 items-center justify-center overflow-hidden lg:justify-start">
              <AnimatePresence mode="wait">
                <motion.p
                  key={titleIndex}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="text-lg font-medium text-brand-blue sm:text-xl"
                >
                  {titles[titleIndex]}
                </motion.p>
              </AnimatePresence>
            </div>
          </FadeUp>

          {/* Description */}
          <FadeUp delay={0.3}>
            <p className="mx-auto max-w-xl text-base leading-relaxed text-muted-foreground lg:mx-0 lg:text-lg">
              {siteConfig.name} — {siteConfig.title} from{" "}
              <span className="text-foreground/80">{siteConfig.location}</span>.
              I build scalable web applications, AI-powered tools, dashboards,
              mobile applications, and government systems that work in the real world.
            </p>
          </FadeUp>

          {/* Location pill */}
          <FadeUp delay={0.35}>
            <div className="flex justify-center lg:justify-start">
              <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" />
                {siteConfig.location}
              </span>
            </div>
          </FadeUp>

          {/* CTA buttons */}
          <FadeUp delay={0.4}>
            <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <a
                href="/#projects"
                className={cn(
                  buttonVariants(),
                  "gap-2 bg-gradient-to-r from-brand-blue to-brand-purple text-white hover:opacity-90"
                )}
              >
                View Projects
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={siteConfig.resume}
                download
                className={cn(buttonVariants({ variant: "outline" }), "gap-2")}
              >
                <Download className="h-4 w-4" />
                Download Resume
              </a>
              <a
                href="/#contact"
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "gap-2 text-muted-foreground hover:text-foreground"
                )}
              >
                <Mail className="h-4 w-4" />
                Contact Me
              </a>
            </div>
          </FadeUp>
        </div>

        {/* ── Right Column — Profile Card ─────────────────────────── */}
        <FadeUp
          delay={0.2}
          className="relative mt-12 flex shrink-0 justify-center lg:mt-0"
        >
          <div className="relative">
            {/* Profile photo card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
              className="relative h-72 w-64 overflow-hidden rounded-3xl border border-border bg-surface-1 shadow-2xl sm:h-80 sm:w-72 z-10"
            >
              {/* Profile Image (points to public/images/profile.png) */}
              <div className="absolute inset-0 z-0">
                <Image
                  src="/images/profile.png"
                  alt={siteConfig.name}
                  fill
                  priority
                  sizes="(max-width: 768px) 256px, 288px"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              {/* Gradient fallback/dark overlay to ensure text readability */}
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />

              {/* Availability badge — bottom of card */}
              <motion.div
                className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="flex items-center gap-2 rounded-full border border-status-production/30 bg-status-production/10 px-3 py-1.5 text-xs font-medium text-status-production shadow-lg backdrop-blur-sm">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-status-production opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-status-production" />
                  </span>
                  Available for work
                </div>
              </motion.div>
            </motion.div>

            {/* Floating tech badges (rendered after card and styled to sit on top with high contrast) */}
            {floatingBadges.map(({ label, className, delay }) => (
              <motion.div
                key={label}
                className={cn("absolute z-20", className)}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: delay + 0.5, duration: 0.4, ease: "easeOut" }}
              >
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: Math.random() * 2,
                  }}
                  className="rounded-full border border-border bg-surface-1/90 px-3.5 py-1.5 text-xs font-semibold text-foreground shadow-xl backdrop-blur-md hover:border-brand-blue/30 transition-all cursor-default select-none"
                >
                  {label}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </FadeUp>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-muted-foreground/50">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="h-5 w-px bg-gradient-to-b from-muted-foreground/30 to-transparent"
        />
      </motion.div>
    </section>
  );
}
