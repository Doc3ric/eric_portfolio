/** Safely read the value of a CSS custom property */
export function getCSSVariable(name: string): string {
  if (typeof window === "undefined") return "";
  return getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
}

/** Check if the user prefers reduced motion */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Format a number with a + suffix (e.g. 12 → "12+") */
export function formatStat(value: number | string): string {
  return typeof value === "string" ? value : `${value}+`;
}

/** Truncate a string to a max length with ellipsis */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength).trimEnd() + "…";
}

/** Get initials from a full name (e.g. "Eric Alenton" → "EA") */
export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

/** Linear interpolation */
export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}
