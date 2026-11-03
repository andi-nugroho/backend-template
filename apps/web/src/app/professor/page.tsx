import {
  AppShell,
  IconHome,
  IconList,
  IconPlus,
} from "@/components/layout/app-shell";
import { StatusBadge } from "@/components/professor/status-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import {
  professorProfile,
  professorQuestions,
} from "@/lib/mock-data";
import { formatRelative } from "@/lib/utils";

const nav = [
  { href: "/professor", label: "Overview", icon: <IconHome /> },
  { href: "/professor/submit", label: "Submit question", icon: <IconPlus /> },
  { href: "/professor/bank", label: "My submissions", icon: <IconList /> },
];

export default function ProfessorDashboardPage() {
  const sealed = professorQuestions.filter((q) => q.status === "sealed").length;
  const inFlight = professorQuestions.filter((q) =>
    ["submitted", "validating"].includes(q.status),
  ).length;
  const drafts = professorQuestions.filter((q) => q.status === "draft").length;
  const progress = Math.round(
    (professorQuestions.filter((q) => q.status !== "draft").length /
      professorProfile.targetSubmissions) *
      100,
  );

  return (
    <AppShell
      nav={nav}
      activePath="/professor"
      title="Professor workspace"
      subtitle={`${professorProfile.institution} · ${professorProfile.department}`}
      user={{ name: professorProfile.name, role: "Professor" }}
    >
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <CardTitle>Submission progress</CardTitle>
              <CardDescription>
                Target {professorProfile.targetSubmissions} questions for this cycle.
                Acceptance and paper inclusion stay hidden by design.
              </CardDescription>
            </div>
            <Button href="/professor/submit">Submit question</Button>
          </div>

          <div className="mt-6">
            <div className="mb-2 flex items-end justify-between">
              <p className="font-[family-name:var(--font-display)] text-3xl font-bold">
                {professorQuestions.filter((q) => q.status !== "draft").length}
                <span className="text-lg text-muted">
                  {" "}
                  / {professorProfile.targetSubmissions}
                </span>
              </p>
              <p className="font-mono text-sm text-signal">{progress}%</p>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/5">
              <div
                className="h-full rounded-full bg-gradient-to-r from-signal to-seal"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            {[
              { label: "Sealed", value: sealed, tone: "text-seal" },
              { label: "In pipeline", value: inFlight, tone: "text-signal" },
              { label: "Drafts", value: drafts, tone: "text-muted" },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-white/8 bg-white/[0.02] p-3"
              >
                <p className="text-xs text-muted">{s.label}</p>
                <p className={`mt-1 text-2xl font-semibold ${s.tone}`}>{s.value}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardTitle>Assigned topics</CardTitle>
          <CardDescription>
            You can only submit within these boundaries.
          </CardDescription>
          <div className="mt-4 flex flex-wrap gap-2">
            {professorProfile.assignedTopics.map((topic) => (
              <Badge key={topic} tone="signal">
                {topic}
              </Badge>
            ))}
          </div>
          <div className="mt-6 rounded-xl border border-seal/20 bg-seal-soft p-3">
            <p className="text-xs font-medium text-seal">Zero-trust notice</p>
            <p className="mt-1 text-sm text-foreground-soft">
              After the deadline you cannot edit. You will never learn which items made the final
              paper.
            </p>
          </div>
        </Card>
      </div>

      <div className="mt-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold">
            Recent submissions
          </h2>
          <Button href="/professor/bank" variant="ghost" size="sm">
            View all
          </Button>
        </div>
        <div className="overflow-hidden rounded-[var(--radius-lg)] border border-white/8">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/[0.03] text-xs uppercase tracking-wider text-muted">
              <tr>
                <th className="px-4 py-3 font-medium">Question</th>
                <th className="hidden px-4 py-3 font-medium sm:table-cell">Topic</th>
                <th className="hidden px-4 py-3 font-medium md:table-cell">Marks</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="hidden px-4 py-3 font-medium lg:table-cell">When</th>
              </tr>
            </thead>
            <tbody>
              {professorQuestions.slice(0, 5).map((q) => (
                <tr key={q.id} className="border-t border-white/5 hover:bg-white/[0.02]">
                  <td className="max-w-[280px] px-4 py-3">
                    <p className="truncate font-medium">{q.preview}</p>
                    <p className="mt-0.5 font-mono text-[11px] text-muted">
                      {q.id}
                      {(q.mediaCount ?? 0) > 0
                        ? ` · ${q.mediaCount} fig`
                        : ""}
                    </p>
                  </td>
                  <td className="hidden px-4 py-3 text-foreground-soft sm:table-cell">
                    {q.topic}
                  </td>
                  <td className="hidden px-4 py-3 md:table-cell">{q.marks}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={q.status} />
                  </td>
                  <td className="hidden px-4 py-3 text-muted lg:table-cell">
                    {formatRelative(q.submittedAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}
