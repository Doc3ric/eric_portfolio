"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { useCountUp } from "@/hooks/useCountUp";
import { cn } from "@/lib/utils";

interface AnimatedCounterProps {
  /** Numeric end value (e.g. 12 for "12+") */
  value: number;
  /** Suffix to append after the number (e.g. "+", "%", "x") */
  suffix?: string;
  /** Prefix to prepend (e.g. "$") */
  prefix?: string;
  className?: string;
  duration?: number;
}

export function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  className,
  duration = 1500,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });
  const { count } = useCountUp(value, duration);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {prefix}
      {inView ? count : 0}
      {suffix}
    </span>
  );
}
