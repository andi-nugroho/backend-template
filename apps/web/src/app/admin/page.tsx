import { AppShell, IconChart, IconHome, IconShield } from "@/components/layout/app-shell";
import { EncryptedPill } from "@/components/brand/seal";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { adminStats, upcomingExams } from "@/lib/mock-data";

const nav = [
  { href: "/admin", label: "Operations", icon: <IconHome /> },
  { href: "/admin", label: "Metrics", icon: <IconChart /> },
  { href: "/admin", label: "Trust posture", icon: <IconShield /> },
];

const metrics = [
  { label: "Professors active", value: adminStats.professors.toLocaleString() },
  { label: "Questions sealed", value: adminStats.questionsSealed.toLocaleString() },
  { label: "Papers encrypted", value: adminStats.papersEncrypted.toString() },
  { label: "Live exams", value: adminStats.activeExams.toString() },
  {
    label: "Validation pass rate",
    value: `${adminStats.validationPassRate}%`,
  },
  {
    label: "Avg validation",
    value: `${adminStats.avgValidationMs} ms`,
  },
  { label: "Syllabus coverage", value: `${adminStats.syllabusCoverage}%` },
  {
    label: "Duplicate rejects",
    value: adminStats.duplicateRejects.toLocaleString(),
  },
];

export default function AdminPage() {
  return (
    <AppShell
      nav={nav}
      activePath="/admin"
      title="Operations console"
      subtitle="Metrics and scheduling only — plaintext content is never available here"
      user={{ name: "Ops Admin", role: "Administrator" }}
    >
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <Badge tone="mint">Zero-trust admin</Badge>
        <EncryptedPill />
        <span className="font-mono text-xs text-muted">
          audit events today · {adminStats.auditEventsToday.toLocaleString()}
        </span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((m) => (
          <Card key={m.label} hover>
            <p className="text-xs text-muted">{m.label}</p>
            <p className="mt-2 font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight">
              {m.value}
            </p>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Card>
          <CardTitle>Examination schedule</CardTitle>
          <CardDescription>
            You can trigger release windows. You cannot open sealed papers.
          </CardDescription>
          <div className="mt-4 space-y-3">
            {upcomingExams.map((exam) => (
              <div
                key={exam.id}
                className="flex items-center justify-between rounded-xl border border-white/8 bg-white/[0.02] px-4 py-3"
              >
                <div>
                  <p className="font-medium">{exam.title}</p>
                  <p className="mt-0.5 font-mono text-xs text-muted">
                    {exam.candidates.toLocaleString()} candidates · {exam.durationMinutes}m
                  </p>
                </div>
                <Badge tone={exam.status === "live" ? "mint" : "muted"}>{exam.status}</Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardTitle>Trust posture</CardTitle>
          <CardDescription>
            Hard guarantees enforced by the platform — not by policy alone.
          </CardDescription>
          <ul className="mt-4 space-y-3">
            {[
              "Administrators cannot decrypt questions or papers",
              "Paper composition is AI-only after deadline",
              "Per-question encryption keys stored separately",
              "Immutable audit log for seal / decrypt events",
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-xl border border-white/8 px-3 py-2.5 text-sm text-foreground-soft"
              >
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-mint" />
                {item}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card className="mt-6 border-rose/20">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-base text-rose">Blocked by design</CardTitle>
            <CardDescription>
              There is no “view paper” or “export questions” control in this console. If you need
              operational proof, use the audit stream — not content.
            </CardDescription>
          </div>
          <Badge tone="rose">No plaintext access</Badge>
        </div>
      </Card>
    </AppShell>
  );
}
