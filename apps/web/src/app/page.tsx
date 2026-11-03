import { EncryptedPill } from "@/components/brand/seal";
import { SealedPapers } from "@/components/landing/sealed-papers";
import { SiteHeader } from "@/components/layout/site-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { pipelineStages } from "@/lib/mock-data";

const securityPoints = [
  {
    title: "Encrypt immediately",
    body: "Plaintext exists only during submission, AI processing, and authorized delivery. Never on disk.",
  },
  {
    title: "Zero trust by role",
    body: "Professors see only their own work. Admins never decrypt questions. Students get only their assigned paper.",
  },
  {
    title: "AI assembles papers",
    body: "No human picks questions. Papers are balanced for syllabus, difficulty, and Bloom taxonomy.",
  },
  {
    title: "Immutable audit trail",
    body: "Every login, submission, seal, generation, and unlock is recorded and cannot be rewritten.",
  },
];

const roles = [
  {
    role: "Professor",
    href: "/professor",
    summary: "Submit questions for assigned topics. No visibility into acceptance or final papers.",
  },
  {
    role: "Student",
    href: "/student",
    summary: "Sit timed examinations with sealed papers unlocked only at the scheduled start.",
  },
  {
    role: "Administrator",
    href: "/admin",
    summary: "Operate the system with metrics and scheduling — never with plaintext content.",
  },
];

export default function HomePage() {
  return (
    <div className="bg-grid bg-noise min-h-screen">
      <div className="relative z-[1]">
        <SiteHeader />

        {/* Hero */}
        <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-20 pt-14 lg:grid-cols-2 lg:pb-28 lg:pt-20">
          <div className="animate-fade-up">
            <Badge tone="seal" className="mb-5">
              Zero-trust · AI-composed · Encrypted at rest
            </Badge>
            <h1 className="font-[family-name:var(--font-display)] text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.4rem]">
              Examinations no insider
              <span className="block bg-gradient-to-r from-signal via-[#8eb0ff] to-seal bg-clip-text text-transparent">
                can leak.
              </span>
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-foreground-soft sm:text-lg">
              Safeguard is an AI-driven examination platform where no single person — not
              professors, not operators — ever holds the complete paper before the scheduled exam.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button href="/login" size="lg">
                Open portal
              </Button>
              <Button href="/#how-it-works" variant="secondary" size="lg">
                See the pipeline
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <EncryptedPill />
              <p className="font-mono text-xs text-muted">papers A · B · C · sealed until T₀</p>
            </div>
          </div>

          <div className="animate-fade-up-delay-1 relative">
            <SealedPapers />
          </div>
        </section>

        {/* Stats strip */}
        <section className="border-y border-white/5 bg-panel/40">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-5 py-8 sm:grid-cols-4">
            {[
              { k: "Human paper assembly", v: "None" },
              { k: "Plaintext at rest", v: "Never" },
              { k: "Equivalent papers", v: "A / B / C" },
              { k: "Audit coverage", v: "100%" },
            ].map((item) => (
              <div key={item.k}>
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                  {item.k}
                </p>
                <p className="mt-1 font-[family-name:var(--font-display)] text-2xl font-semibold text-foreground">
                  {item.v}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Pipeline */}
        <section id="how-it-works" className="mx-auto max-w-6xl px-5 py-20">
          <div className="mb-10 max-w-2xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-signal">Pipeline</p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight sm:text-4xl">
              From submission to sealed release
            </h2>
            <p className="mt-3 text-foreground-soft">
              Every question moves through a one-way vault. Humans contribute; AI validates and
              composes; cryptography holds the keys until exam time.
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-5">
            {pipelineStages.map((stage, index) => (
              <Card key={stage.key} hover className="relative overflow-hidden">
                <p className="font-mono text-[11px] text-signal">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <CardTitle className="mt-3 text-base">{stage.title}</CardTitle>
                <CardDescription className="text-[13px]">{stage.description}</CardDescription>
                {index < pipelineStages.length - 1 && (
                  <div className="pointer-events-none absolute -right-1 top-1/2 hidden h-px w-3 bg-signal/40 md:block" />
                )}
              </Card>
            ))}
          </div>
        </section>

        {/* Security */}
        <section id="security" className="border-t border-white/5 bg-panel/30">
          <div className="mx-auto max-w-6xl px-5 py-20">
            <div className="mb-10 max-w-2xl">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-seal">
                Security model
              </p>
              <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight sm:text-4xl">
                Designed so leaks have nowhere to hide
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {securityPoints.map((point) => (
                <Card key={point.title} hover>
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg border border-seal/25 bg-seal-soft text-seal">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M12 3l7 3v5c0 4.5-2.8 7.8-7 9-4.2-1.2-7-4.5-7-9V6l7-3z" />
                    </svg>
                  </div>
                  <CardTitle className="text-base">{point.title}</CardTitle>
                  <CardDescription>{point.body}</CardDescription>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Roles */}
        <section id="roles" className="mx-auto max-w-6xl px-5 py-20">
          <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div className="max-w-xl">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-signal">
                Portals
              </p>
              <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight sm:text-4xl">
                Enter as your role
              </h2>
              <p className="mt-3 text-foreground-soft">
                This preview uses mock data so we can iterate on flows before wiring the API.
              </p>
            </div>
            <Button href="/login" variant="secondary">
              All portals →
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {roles.map((r) => (
              <Card key={r.role} hover className="flex flex-col">
                <Badge tone="signal" className="w-fit">
                  {r.role}
                </Badge>
                <CardTitle className="mt-4">{r.role} portal</CardTitle>
                <CardDescription className="flex-1">{r.summary}</CardDescription>
                <Button href={r.href} className="mt-6 w-full" variant="secondary">
                  Open {r.role.toLowerCase()} view
                </Button>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="px-5 pb-20">
          <div className="mx-auto max-w-6xl overflow-hidden rounded-[1.5rem] border border-signal/20 bg-gradient-to-br from-elevated via-panel to-ink p-8 sm:p-12">
            <div className="relative z-10 max-w-2xl">
              <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight sm:text-4xl">
                Ready to seal the next examination?
              </h2>
              <p className="mt-3 text-foreground-soft">
                Start with the professor submission flow or explore how students experience a locked
                paper until the clock hits zero.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/professor" size="lg">
                  Professor dashboard
                </Button>
                <Button href="/student" variant="secondary" size="lg">
                  Student lobby
                </Button>
              </div>
            </div>
          </div>
        </section>

        <footer className="border-t border-white/5 py-8">
          <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-3 px-5 sm:flex-row sm:items-center">
            <p className="text-sm text-muted">Safeguard · AI-driven decentralized examinations</p>
            <p className="font-mono text-xs text-muted">encrypt · validate · compose · release</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
