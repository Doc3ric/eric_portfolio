import Link from "next/link";
import { ArrowLeft, FileQuestion } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { InteractiveBackground } from "@/components/shared/InteractiveBackground";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <>
      <InteractiveBackground />
      <Navbar />

      <main className="relative z-10 min-h-screen flex flex-col items-center justify-center pt-16">
        <div className="container-xl max-w-md flex flex-col items-center text-center gap-6">
          {/* Icon */}
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-surface-1 text-brand-purple shadow-xl">
            <FileQuestion className="h-8 w-8" />
          </div>

          {/* Heading */}
          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold uppercase tracking-widest text-brand-purple">
              Error 404
            </span>
            <h1 className="text-4xl font-bold tracking-tight">Page Not Found</h1>
          </div>

          {/* Description */}
          <p className="text-muted-foreground text-sm leading-relaxed">
            The page you are looking for doesn't exist, has been removed, or is temporarily unavailable. Double check the address or try searching via the command palette.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2 w-full justify-center">
            <Link
              href="/"
              className={cn(
                buttonVariants(),
                "gap-2 bg-gradient-to-r from-brand-blue to-brand-purple text-white hover:opacity-90"
              )}
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
