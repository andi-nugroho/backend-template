import Link from "next/link";
import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-signal text-white shadow-[0_10px_30px_-12px_rgba(91,140,255,0.8)] hover:bg-[#6d9aff] border border-signal/40",
  secondary:
    "bg-white/5 text-foreground hover:bg-white/10 border border-white/10",
  ghost: "bg-transparent text-foreground-soft hover:text-foreground hover:bg-white/5",
  seal: "bg-seal text-ink hover:bg-[#f6c04a] border border-seal/50 shadow-[0_10px_30px_-12px_rgba(240,180,41,0.7)]",
  danger: "bg-rose-soft text-rose border border-rose/25 hover:bg-rose/20",
} as const;

const sizes = {
  sm: "h-9 px-3.5 text-sm rounded-lg",
  md: "h-11 px-5 text-sm rounded-xl",
  lg: "h-12 px-6 text-[15px] rounded-xl",
  icon: "h-10 w-10 rounded-xl",
} as const;

type ButtonProps = {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
  children: React.ReactNode;
} & (
  | ({ href: string } & Omit<React.ComponentProps<typeof Link>, "href" | "className" | "children">)
  | ({ href?: undefined } & React.ButtonHTMLAttributes<HTMLButtonElement>)
);

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none",
    variants[variant],
    sizes[size],
    className,
  );

  if ("href" in props && props.href) {
    const { href, ...rest } = props;
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const buttonProps = props as React.ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
