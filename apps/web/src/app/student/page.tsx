import { AppShell, IconExam, IconHome } from "@/components/layout/app-shell";
import { EncryptedPill, SealMark } from "@/components/brand/seal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { studentProfile, upcomingExams } from "@/lib/mock-data";

const nav = [
  { href: "/student", label: "Exam lobby", icon: <IconHome /> },
  { href: "/student/exam", label: "Active exam", icon: <IconExam /> },
];

export default function StudentLobbyPage() {
  const live = upcomingExams.find((e) => e.status === "live");
  const upcoming = upcomingExams.filter((e) => e.status === "upcoming");

  return (
    <AppShell
      nav={nav}
      activePath="/student"
      title="Examination lobby"
      subtitle={`${studentProfile.roll} · ${studentProfile.institution}`}
      user={{ name: studentProfile.name, role: "Student" }}
    >
      {live && (
        <Card className="mb-6 border-seal/30 bg-gradient-to-br from-seal-soft/40 to-transparent">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <Badge tone="seal" className="mb-3">
                Live now
              </Badge>
              <CardTitle className="text-2xl">{live.title}</CardTitle>
              <CardDescription className="mt-2">
                Duration {live.durationMinutes} minutes · Paper{" "}
                <span className="font-mono text-seal">{live.paperAssigned ?? "—"}</span> assigned at
                unlock
              </CardDescription>
              <div className="mt-4">
                <EncryptedPill />
              </div>
            </div>
            <div className="flex items-center gap-6">
              <SealMark label="READY" size="lg" />
              <Button href="/student/exam" variant="seal" size="lg">
                Enter examination
              </Button>
            </div>
          </div>
        </Card>
      )}

      <h2 className="mb-3 font-[family-name:var(--font-display)] text-lg font-semibold">
        Upcoming
      </h2>
      <div className="grid gap-4 md:grid-cols-2">
        {upcoming.map((exam) => (
          <Card key={exam.id} hover>
            <div className="flex items-start justify-between gap-3">
              <div>
                <Badge tone="muted">Scheduled</Badge>
                <CardTitle className="mt-3 text-base">{exam.title}</CardTitle>
                <CardDescription>
                  {exam.subject} · {exam.durationMinutes} min · {exam.candidates.toLocaleString()}{" "}
                  candidates
                </CardDescription>
              </div>
              <SealMark size="sm" label="SEALED" />
            </div>
            <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4">
              <p className="font-mono text-xs text-muted">
                starts {new Date(exam.startsAt).toLocaleString()}
              </p>
              <span className="text-xs text-foreground-soft">Paper locked</span>
            </div>
          </Card>
        ))}
      </div>

      <Card className="mt-6">
        <CardTitle className="text-base">Before you begin</CardTitle>
        <ul className="mt-3 grid gap-2 text-sm text-foreground-soft sm:grid-cols-2">
          <li>• Identity verified at session start</li>
          <li>• Paper A/B/C assigned randomly</li>
          <li>• Content decrypts only after T₀</li>
          <li>• Answers auto-save every few seconds</li>
        </ul>
      </Card>
    </AppShell>
  );
}
