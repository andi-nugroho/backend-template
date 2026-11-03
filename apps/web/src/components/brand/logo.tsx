import { cn } from "@/lib/utils";

export function Logo({
  className,
  markOnly = false,
}: {
  className?: string;
  markOnly?: boolean;
}) {
  return (
    <div className={cn("inline-flex items-center gap-2.5", className)}>
      <span className="relative flex h-8 w-8 items-center justify-center">
        <span className="absolute inset-0 rounded-lg bg-signal/20 blur-sm" />
        <span className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-signal/40 bg-gradient-to-br from-signal/30 to-elevated">
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4 text-signal"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M12 3l7 3v5c0 4.5-2.8 7.8-7 9-4.2-1.2-7-4.5-7-9V6l7-3z" />
            <path d="M9.5 12l1.8 1.8L15 10" />
          </svg>
        </span>
      </span>
      {!markOnly && (
        <span className="font-[family-name:var(--font-display)] text-[17px] font-semibold tracking-tight">
          Safeguard
        </span>
      )}
    </div>
  );
}
