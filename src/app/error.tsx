"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an analytics or reporting service
    console.error("Application Error Boundary caught:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full rounded-2xl border border-border bg-surface-1 p-8 flex flex-col items-center text-center gap-6 shadow-2xl">
        {/* Icon */}
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-destructive/20 bg-destructive/10 text-destructive shadow-xl">
          <AlertTriangle className="h-8 w-8" />
        </div>

        {/* Heading */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-destructive">
            System Error
          </span>
          <h1 className="text-3xl font-bold tracking-tight">Something Went Wrong</h1>
        </div>

        {/* Description */}
        <p className="text-muted-foreground text-sm leading-relaxed">
          An unexpected error occurred during execution. We've logged this internally. You can attempt to retry the action or go back to safety.
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2 w-full justify-center">
          <Button
            onClick={() => reset()}
            className="gap-2 bg-gradient-to-r from-brand-blue to-brand-purple text-white hover:opacity-90"
          >
            <RotateCcw className="h-4 w-4" />
            Try Again
          </Button>

          <Link
            href="/"
            className={cn(buttonVariants({ variant: "outline" }), "gap-2")}
          >
            <Home className="h-4 w-4" />
            Home Page
          </Link>
        </div>
      </div>
    </div>
  );
}
