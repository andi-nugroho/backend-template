import { cn } from "@/lib/utils";

export function SealMark({
  label = "SEALED",
  className,
  size = "md",
}: {
  label?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const dim =
    size === "sm" ? "h-16 w-16 text-[8px]" : size === "lg" ? "h-28 w-28 text-[11px]" : "h-20 w-20 text-[9px]";

  return (
    <div
      className={cn(
        "seal-ring relative flex items-center justify-center rounded-full border border-seal/40 text-seal",
        dim,
        className,
      )}
      aria-hidden
    >
      <div className="animate-seal-spin absolute inset-1 rounded-full border border-dashed border-seal/35" />
      <div className="relative flex flex-col items-center leading-none">
        <svg viewBox="0 0 24 24" className="mb-1 h-4 w-4" fill="currentColor">
          <path d="M12 1a5 5 0 00-5 5v3H6a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2v-8a2 2 0 00-2-2h-1V6a5 5 0 00-5-5zm-3 8V6a3 3 0 116 0v3H9z" />
        </svg>
        <span className="font-mono font-semibold tracking-[0.2em]">{label}</span>
      </div>
    </div>
  );
}

export function EncryptedPill({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-seal/30 bg-seal-soft px-3 py-1 font-mono text-[11px] text-seal",
        className,
      )}
    >
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-seal opacity-60" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-seal" />
      </span>
      AES-256 · sealed at rest
    </span>
  );
}
