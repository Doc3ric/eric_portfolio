import Link from "next/link";
import { ArrowLeft, Clock, Zap, Target, BookOpen, User } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { InteractiveBackground } from "@/components/shared/InteractiveBackground";
import { CommandPalette } from "@/components/shared/CommandPalette";
import { siteConfig } from "@/config/site.config";

export const metadata = {
  title: "Now",
  description: "What Eric Alenton is focused on right now. A Kent C. Dodds / Derek Sivers inspired /now page.",
};

export default function NowPage() {
  return (
    <>
      <CommandPalette />
      <InteractiveBackground />
      <Navbar />

      <main className="relative z-10 min-h-screen pt-24 pb-16">
        <div className="container-xl max-w-3xl">
          {/* Back Home */}
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Portfolio
          </Link>

          {/* Page Header */}
          <div className="flex flex-col gap-3 mb-10 border-b border-border pb-6">
            <h1 className="text-4xl font-bold tracking-tight">Now</h1>
            <p className="text-muted-foreground">
              What I'm focused on at this moment in my life. Inspired by the{" "}
              <a
                href="https://nownownow.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground transition-colors"
              >
                /now page movement
              </a>
              .
            </p>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-2">
              <Clock className="h-3.5 w-3.5" />
              <span>Last updated: July 15, 2026</span>
            </div>
          </div>

          {/* Now Content Cards */}
          <div className="flex flex-col gap-6">
            {/* Card 1: Job / Work */}
            <div className="rounded-2xl border border-border bg-surface-1 p-6 flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-surface-2">
                <User className="h-5 w-5 text-brand-blue" />
              </div>
              <div className="flex flex-col gap-1.5">
                <h3 className="font-bold text-foreground">Current Job &amp; Freelance</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  I am currently working as an independent software engineer accepting freelance projects, contracting for full-stack Laravel/React apps, and seeking full-time remote opportunities with forward-thinking engineering teams.
                </p>
              </div>
            </div>

            {/* Card 2: Building */}
            <div className="rounded-2xl border border-border bg-surface-1 p-6 flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-surface-2">
                <Zap className="h-5 w-5 text-brand-blue" />
              </div>
              <div className="flex flex-col gap-1.5">
                <h3 className="font-bold text-foreground">Active Development</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Focusing heavily on <strong>English Coach AI</strong>, my mobile language coach app. Polishing the offline synchronization engine, implementing spaced repetition interval schedules locally, and writing prompts for generative grammar feedback.
                </p>
              </div>
            </div>

            {/* Card 3: Learning */}
            <div className="rounded-2xl border border-border bg-surface-1 p-6 flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-surface-2">
                <BookOpen className="h-5 w-5 text-brand-blue" />
              </div>
              <div className="flex flex-col gap-1.5">
                <h3 className="font-bold text-foreground">Learning &amp; Exploring</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Deep diving into vector databases for semantic search integrations, understanding agentic workflows for AI copilots, and exploring native-like performance profiling in React Native architectures.
                </p>
              </div>
            </div>

            {/* Card 4: Personal Goals */}
            <div className="rounded-2xl border border-border bg-surface-1 p-6 flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-surface-2">
                <Target className="h-5 w-5 text-brand-blue" />
              </div>
              <div className="flex flex-col gap-1.5">
                <h3 className="font-bold text-foreground">Current Goals</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Aiming to ship English Coach AI to the App Store and Google Play by August 2026. Setting aside dedicated hours daily for open source contributions, and keeping my body active with running/fitness.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
