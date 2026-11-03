import { cn } from "@/lib/utils";

const tones = {
  signal: "bg-signal-soft text-signal border-signal/20",
  seal: "bg-seal-soft text-seal border-seal/25",
  mint: "bg-mint-soft text-mint border-mint/20",
  rose: "bg-rose-soft text-rose border-rose/20",
  muted: "bg-white/5 text-muted border-white/10",
} as const;

export function Badge({
  children,
  tone = "muted",
  className,
}: {
  children: React.ReactNode;
  tone?: keyof typeof tones;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium tracking-wide uppercase",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
