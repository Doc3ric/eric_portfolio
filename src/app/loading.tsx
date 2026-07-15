import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center gap-4">
        {/* Loading Spinner */}
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-surface-1 text-brand-blue shadow-lg">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
        <span className="text-sm font-medium text-muted-foreground tracking-wide">
          Loading Page Content...
        </span>
      </div>
    </div>
  );
}
