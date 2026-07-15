"use client";

import { useEffect, useState } from "react";

/**
 * Returns true when the page has been scrolled past `threshold` pixels.
 * Used by the Navbar to apply backdrop-blur + border on scroll.
 */
export function useScrolled(threshold = 10): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > threshold);
    };

    // Check immediately in case the page loads mid-scroll
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return scrolled;
}
