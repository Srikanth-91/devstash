"use client";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 p-6 text-center">
      <p className="text-sm font-medium text-foreground">Failed to load dashboard</p>
      <p className="text-xs text-muted-foreground">{error.message}</p>
      <button
        onClick={reset}
        className="text-xs px-3 py-1.5 rounded-lg border border-border hover:bg-muted transition-colors"
      >
        Try again
      </button>
    </div>
  );
}
