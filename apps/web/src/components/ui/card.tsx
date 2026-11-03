import { cn } from "@/lib/utils";

export function Card({
  children,
  className,
  hover = false,
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={cn(
        "glass relative z-0 overflow-visible rounded-[var(--radius-lg)] p-5",
        hover &&
          "transition-all duration-300 hover:border-signal/25 hover:shadow-[0_0_0_1px_rgba(91,140,255,0.12),0_20px_40px_-24px_rgba(91,140,255,0.35)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function CardTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h3
      className={cn(
        "font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight",
        className,
      )}
    >
      {children}
    </h3>
  );
}

export function CardDescription({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("mt-1 text-sm text-foreground-soft leading-relaxed", className)}>
      {children}
    </p>
  );
}
