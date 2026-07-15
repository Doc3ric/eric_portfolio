"use client";

import { useState, useEffect } from "react";
import { Moon, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import { type Theme } from "@/types";

const themes: { id: Theme; label: string; available: boolean }[] = [
  { id: "dark", label: "Dark", available: true },
  { id: "midnight", label: "Midnight", available: false },
  { id: "graphite", label: "Graphite", available: false },
  { id: "system", label: "System", available: false },
];

/**
 * Applies the theme CSS class to the <html> element.
 * Dark is the only active theme; others show "Coming Soon".
 */
function applyTheme(theme: Theme) {
  const html = document.documentElement;
  // Remove all theme classes
  html.classList.remove("dark", "midnight", "graphite");

  if (theme === "system") {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    html.classList.add(prefersDark ? "dark" : "");
  } else {
    html.classList.add(theme);
  }
}

export function ThemeCustomizer() {
  const [activeTheme, setActiveTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Always start with dark
    applyTheme("dark");
  }, []);

  const handleThemeChange = (theme: Theme, available: boolean) => {
    if (!available) return;
    setActiveTheme(theme);
    applyTheme(theme);
  };

  if (!mounted) return null;

  return (
    <div className="flex items-center gap-1 rounded-lg border border-border bg-surface-1 p-1">
      <Moon className="mx-1 h-3.5 w-3.5 text-muted-foreground" />
      {themes.map(({ id, label, available }) => (
        <button
          key={id}
          onClick={() => handleThemeChange(id, available)}
          disabled={!available}
          title={available ? `Switch to ${label}` : `${label} — Coming Soon`}
          className={cn(
            "relative rounded-md px-2.5 py-1 text-xs font-medium transition-all",
            activeTheme === id && available
              ? "bg-primary text-primary-foreground shadow-sm"
              : available
                ? "text-muted-foreground hover:bg-accent hover:text-foreground"
                : "cursor-not-allowed text-muted-foreground/40"
          )}
        >
          {label}
          {!available && (
            <span className="ml-1 text-[9px] text-muted-foreground/40">
              soon
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
