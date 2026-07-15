"use client";

import Link from "next/link";

import { useState, useEffect } from "react";
import { Menu, X, Download, Terminal } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useScrolled } from "@/hooks/useScrolled";
import { siteConfig } from "@/config/site.config";
import { ThemeToggle } from "@/components/shared/ThemeToggle";

export function Navbar() {
  const scrolled = useScrolled(20);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile menu on route change / resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <nav className="container-xl flex h-16 items-center justify-between">
        {/* ── Logo ────────────────────────────────────────────── */}
        <Link
          href="/"
          className="group flex items-center gap-2.5"
          aria-label="Eric Alenton — Home"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-blue to-brand-purple text-sm font-bold text-white shadow-lg shadow-brand-blue/20 transition-transform group-hover:scale-105">
            EA
          </span>
          <span className="font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
            Eric Alenton
          </span>
        </Link>

        {/* ── Desktop Nav ─────────────────────────────────────── */}
        <div className="hidden items-center gap-6 md:flex">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* ── Desktop Actions ──────────────────────────────────── */}
        <div className="hidden items-center gap-2 md:flex">
          {/* ⌘K hint */}
          <button
            onClick={() => {
              const event = new KeyboardEvent("keydown", {
                key: "k",
                ctrlKey: true,
                bubbles: true,
              });
              document.dispatchEvent(event);
            }}
            className="flex items-center gap-1.5 rounded-md border border-border bg-surface-1 px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:border-border hover:text-foreground"
            aria-label="Open command palette"
          >
            <Terminal className="h-3 w-3" />
            <span>Search</span>
            <kbd className="rounded border border-border bg-background px-1 font-mono text-[10px]">
              ⌘K
            </kbd>
          </button>

          <ThemeToggle />

          {/* Resume CTA */}
          <a
            href={siteConfig.resume}
            download
            aria-label="Download resume"
            className={cn(buttonVariants({ size: "sm" }), "gap-2 text-sm")}
          >
            <Download className="h-3.5 w-3.5" />
            Resume
          </a>
        </div>

        {/* ── Mobile Menu ──────────────────────────────────────── */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger
            className="md:hidden"
            render={
              <Button
                variant="ghost"
                size="icon"
                aria-label="Toggle navigation menu"
              >
                {mobileOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            }
          />

          <SheetContent side="right" className="w-72 border-border bg-background p-0">
            <div className="flex h-full flex-col">
              {/* Mobile header */}
              <div className="flex items-center justify-between border-b border-border px-6 py-4">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-brand-blue to-brand-purple text-xs font-bold text-white">
                    EA
                  </span>
                  <span className="font-semibold">{siteConfig.name}</span>
                </div>
                <ThemeToggle />
              </div>

              {/* Mobile nav links */}
              <nav className="flex flex-col gap-1 p-4">
                {siteConfig.nav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg px-4 py-3 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              {/* Mobile availability badge */}
              {siteConfig.availability && (
                <div className="px-5 pb-4">
                  <Badge
                    variant="outline"
                    className="gap-1.5 border-status-production/30 text-status-production"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-status-production" />
                    Available for work
                  </Badge>
                </div>
              )}

              {/* Mobile resume button */}
              <div className="mt-auto border-t border-border p-4">
                <a
                  href={siteConfig.resume}
                  download
                  className={cn(buttonVariants(), "w-full gap-2")}
                >
                  <Download className="h-4 w-4" />
                  Download Resume
                </a>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
