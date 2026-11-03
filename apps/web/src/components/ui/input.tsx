import { cn } from "@/lib/utils";

export function Input({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 text-sm text-foreground placeholder:text-muted outline-none transition focus:border-signal/50 focus:bg-white/[0.05] focus:ring-2 focus:ring-signal/20",
        className,
      )}
      {...props}
    />
  );
}

export function Textarea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "min-h-[120px] w-full resize-y rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-3 text-sm text-foreground placeholder:text-muted outline-none transition focus:border-signal/50 focus:bg-white/[0.05] focus:ring-2 focus:ring-signal/20",
        className,
      )}
      {...props}
    />
  );
}

/** Themed select — re-exported so existing `@/components/ui/input` imports keep working */
export { Select } from "./select";

export function Label({
  children,
  className,
  htmlFor,
}: {
  children: React.ReactNode;
  className?: string;
  htmlFor?: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        "mb-1.5 block text-xs font-medium uppercase tracking-[0.14em] text-muted",
        className,
      )}
    >
      {children}
    </label>
  );
}
