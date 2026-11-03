import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { cn } from "@/lib/utils";

export type NavItem = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

export function AppShell({
  children,
  nav,
  title,
  subtitle,
  activePath,
  user,
}: {
  children: React.ReactNode;
  nav: NavItem[];
  title: string;
  subtitle?: string;
  activePath: string;
  user: { name: string; role: string };
}) {
  return (
    <div className="bg-grid bg-noise min-h-screen">
      <div className="relative z-[1] mx-auto flex min-h-screen max-w-[1400px]">
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-white/5 p-5 lg:flex">
          <Link href="/" className="mb-8">
            <Logo />
          </Link>
          <nav className="flex flex-1 flex-col gap-1">
            {nav.map((item) => {
              const active =
                activePath === item.href ||
                (item.href !== "/" && activePath.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition",
                    active
                      ? "bg-signal-soft text-signal border border-signal/20"
                      : "text-foreground-soft hover:bg-white/5 hover:text-foreground border border-transparent",
                  )}
                >
                  <span className="opacity-80">{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-auto rounded-xl border border-white/8 bg-white/[0.03] p-3">
            <p className="text-sm font-medium">{user.name}</p>
            <p className="mt-0.5 text-xs text-muted">{user.role}</p>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-20 flex items-center justify-between border-b border-white/5 bg-ink/60 px-5 py-4 backdrop-blur-xl lg:px-8">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted">
                {user.role}
              </p>
              <h1 className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight sm:text-2xl">
                {title}
              </h1>
              {subtitle && (
                <p className="mt-0.5 text-sm text-foreground-soft">{subtitle}</p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="rounded-xl border border-white/10 px-3 py-2 text-xs text-foreground-soft transition hover:bg-white/5 hover:text-foreground"
              >
                Switch role
              </Link>
            </div>
          </header>

          <div className="flex gap-1 overflow-x-auto border-b border-white/5 px-4 py-2 lg:hidden">
            {nav.map((item) => {
              const active =
                activePath === item.href ||
                (item.href !== "/" && activePath.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "whitespace-nowrap rounded-lg px-3 py-1.5 text-xs",
                    active
                      ? "bg-signal-soft text-signal"
                      : "text-muted hover:text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <main className="flex-1 px-5 py-6 lg:px-8 lg:py-8">{children}</main>
        </div>
      </div>
    </div>
  );
}

export function IconHome() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 10.5L12 3l9 7.5V21a1 1 0 01-1 1h-5v-7H9v7H4a1 1 0 01-1-1v-10.5z" />
    </svg>
  );
}

export function IconPlus() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function IconList() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
    </svg>
  );
}

export function IconShield() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 3l7 3v5c0 4.5-2.8 7.8-7 9-4.2-1.2-7-4.5-7-9V6l7-3z" />
    </svg>
  );
}

export function IconExam() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M8 3h8a2 2 0 012 2v14l-6-3-6 3V5a2 2 0 012-2z" />
    </svg>
  );
}

export function IconChart() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 19V5M10 19V9M16 19v-6M22 19V7" />
    </svg>
  );
}
