"use client";

import { useEffect, useRef, useState } from "react";

interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
  /** Only trigger once (default: true) */
  once?: boolean;
}

/**
 * Returns true when the referenced element enters the viewport.
 * Used to trigger scroll-reveal animations.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  options: UseInViewOptions = {}
): { ref: React.RefObject<T | null>; inView: boolean } {
  const { threshold = 0.15, rootMargin = "0px", once = true } = options;
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, inView };
}
