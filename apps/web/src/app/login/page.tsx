import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { EncryptedPill } from "@/components/brand/seal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

const portals = [
  {
    role: "Professor",
    href: "/professor",
    tone: "signal" as const,
    points: ["Submit questions", "Assigned topics only", "No paper visibility"],
  },
  {
    role: "Student",
    href: "/student",
    tone: "seal" as const,
    points: ["Exam lobby", "Sealed until start", "Timed delivery"],
  },
  {
    role: "Administrator",
    href: "/admin",
    tone: "mint" as const,
    points: ["Ops metrics", "Scheduling", "Never decrypts content"],
  },
];

export default function LoginPage() {
  return (
    <div className="bg-grid bg-noise flex min-h-screen flex-col">
      <div className="relative z-1 mx-auto flex w-full max-w-5xl flex-1 flex-col px-5 py-10">
        <div className="mb-10 flex items-center justify-between">
          <Link href="/">
            <Logo />
          </Link>
          <EncryptedPill />
        </div>

        <div className="mb-10 max-w-xl">
          <Badge tone="muted" className="mb-4">
            Preview auth
          </Badge>
          <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Choose a portal
          </h1>
          <p className="mt-3 text-foreground-soft">
            OAuth will plug into the existing API later. For now, pick a role to explore the
            interface with realistic mock data.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {portals.map((portal) => (
            <Card key={portal.role} hover className="flex flex-col">
              <Badge tone={portal.tone} className="w-fit">
                {portal.role}
              </Badge>
              <CardTitle className="mt-4">{portal.role}</CardTitle>
              <CardDescription>Continue as a demo {portal.role.toLowerCase()}.</CardDescription>
              <ul className="mt-4 flex-1 space-y-2">
                {portal.points.map((p) => (
                  <li key={p} className="flex items-center gap-2 text-sm text-foreground-soft">
                    <span className="h-1 w-1 rounded-full bg-signal" />
                    {p}
                  </li>
                ))}
              </ul>
              <Button href={portal.href} className="mt-6 w-full">
                Continue
              </Button>
            </Card>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-muted">
          <Link href="/" className="text-foreground-soft underline-offset-4 hover:underline">
            ← Back to homepage
          </Link>
        </p>
      </div>
    </div>
  );
}
