"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/utils/helpers";

/**
 * Animates a number from 0 to `end` when the element enters the viewport.
 * Respects prefers-reduced-motion — returns the final value immediately if reduced motion is set.
 */
export function useCountUp(
  end: number,
  duration = 1500,
  startOnMount = false
): { count: number; ref: React.RefObject<HTMLElement | null> } {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setCount(end);
      return;
    }

    const startAnimation = () => {
      if (hasAnimated.current) return;
      hasAnimated.current = true;

      const startTime = performance.now();

      const tick = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(eased * end));

        if (progress < 1) requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
    };

    if (startOnMount) {
      startAnimation();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startAnimation();
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration, startOnMount]);

  return { count, ref };
}
