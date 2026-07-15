"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { cn } from "@/lib/utils";

interface FadeUpProps {
  children: React.ReactNode;
  className?: string;
  /** Delay in seconds before animation starts */
  delay?: number;
  /** Duration in seconds */
  duration?: number;
  /** Y offset to start from (px) */
  yOffset?: number;
  /** Trigger once only (default: true) */
  once?: boolean;
}

/**
 * Wraps children in a fade-up entrance animation using motion.
 * Respects prefers-reduced-motion via motion's built-in support.
 */
export function FadeUp({
  children,
  className,
  delay = 0,
  duration = 0.5,
  yOffset = 24,
  once = true,
}: FadeUpProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "0px 0px -60px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: yOffset }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: yOffset }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1], // cubic-bezier easeOut
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

/**
 * Stagger container — wraps a list of items and staggers their FadeUp
 * animations automatically.
 */
interface StaggerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function Stagger({ children, className, staggerDelay = 0.1 }: StaggerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

/**
 * Item variant for use inside a Stagger container.
 */
interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
}

export function StaggerItem({ children, className }: StaggerItemProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
        },
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
