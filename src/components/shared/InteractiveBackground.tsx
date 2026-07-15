"use client";

import { useEffect, useRef } from "react";

/**
 * Subtle aurora/gradient mesh background with mouse spotlight.
 * Uses CSS custom properties for mouse position — no canvas needed.
 * pointer-events: none so it never blocks content interaction.
 */
export function InteractiveBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const el = containerRef.current;
      if (!el) return;
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      el.style.setProperty("--mouse-x", `${x}%`);
      el.style.setProperty("--mouse-y", `${y}%`);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      style={
        {
          "--mouse-x": "50%",
          "--mouse-y": "30%",
        } as React.CSSProperties
      }
    >
      {/* Mouse spotlight */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), oklch(0.60 0.22 250 / 4%), transparent 70%)",
        }}
      />

      {/* Static aurora orbs */}
      <div
        className="animate-float absolute -left-32 top-0 h-[500px] w-[500px] rounded-full opacity-[0.15] blur-3xl"
        style={{
          background:
            "radial-gradient(circle, oklch(0.60 0.22 250) 0%, transparent 70%)",
          animationDelay: "0s",
          animationDuration: "8s",
        }}
      />
      <div
        className="animate-float absolute -right-32 top-1/3 h-[600px] w-[600px] rounded-full opacity-[0.12] blur-3xl"
        style={{
          background:
            "radial-gradient(circle, oklch(0.58 0.24 290) 0%, transparent 70%)",
          animationDelay: "-3s",
          animationDuration: "10s",
        }}
      />
      <div
        className="animate-float absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full opacity-[0.10] blur-3xl"
        style={{
          background:
            "radial-gradient(circle, oklch(0.72 0.18 210) 0%, transparent 70%)",
          animationDelay: "-6s",
          animationDuration: "12s",
        }}
      />

      {/* Dot grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "radial-gradient(circle, oklch(1 0 0 / 15%) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Very subtle top gradient — fades background into nav */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </div>
  );
}
