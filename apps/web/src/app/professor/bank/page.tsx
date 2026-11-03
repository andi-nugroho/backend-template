import {
  AppShell,
  IconHome,
  IconList,
  IconPlus,
} from "@/components/layout/app-shell";
import { StatusBadge } from "@/components/professor/status-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { professorProfile, professorQuestions } from "@/lib/mock-data";
import { formatRelative } from "@/lib/utils";

const nav = [
  { href: "/professor", label: "Overview", icon: <IconHome /> },
  { href: "/professor/submit", label: "Submit question", icon: <IconPlus /> },
  { href: "/professor/bank", label: "My submissions", icon: <IconList /> },
];

export default function ProfessorBankPage() {
  return (
    <AppShell
      nav={nav}
      activePath="/professor/bank"
      title="My submissions"
      subtitle="Only your contributions. Inclusion in final papers is never disclosed."
      user={{ name: professorProfile.name, role: "Professor" }}
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-foreground-soft">
          {professorQuestions.length} items in your vault view
        </p>
        <Button href="/professor/submit" size="sm">
          New question
        </Button>
      </div>

      <div className="grid gap-3">
        {professorQuestions.map((q) => (
          <Card key={q.id} hover className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <div className="mb-1.5 flex flex-wrap items-center gap-2">
                <StatusBadge status={q.status} />
                <span className="font-mono text-[11px] text-muted">{q.id}</span>
                <span className="text-xs text-muted">·</span>
                <span className="text-xs text-muted">{q.type.toUpperCase()}</span>
                <span className="text-xs text-muted">·</span>
                <span className="text-xs text-muted">{q.marks} marks</span>
                {(q.mediaCount ?? 0) > 0 && (
                  <Badge tone="signal">
                    {q.mediaCount} figure{q.mediaCount === 1 ? "" : "s"}
                  </Badge>
                )}
              </div>
              <p className="truncate font-medium">{q.preview}</p>
              <p className="mt-1 text-sm text-foreground-soft">
                {q.topic} · {formatRelative(q.submittedAt)}
                {(q.mediaCount ?? 0) > 0
                  ? " · diagrams sealed with payload"
                  : ""}
              </p>
            </div>
            {q.status === "draft" && (
              <Button href="/professor/submit" variant="secondary" size="sm">
                Continue draft
              </Button>
            )}
            {q.status === "rejected" && (
              <p className="text-xs text-rose sm:text-right">
                Returned for quality —
                <br className="hidden sm:block" /> revise & resubmit
              </p>
            )}
            {q.status === "sealed" && (
              <p className="font-mono text-[11px] text-seal sm:text-right">
                AES sealed
              </p>
            )}
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
