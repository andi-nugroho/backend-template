"use client";

import { useMemo, useState } from "react";
import { AppShell, IconExam, IconHome } from "@/components/layout/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input, Textarea } from "@/components/ui/input";
import { examQuestions, studentProfile } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/student", label: "Exam lobby", icon: <IconHome /> },
  { href: "/student/exam", label: "Active exam", icon: <IconExam /> },
];

export default function StudentExamPage() {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [flagged, setFlagged] = useState<Set<number>>(new Set());

  const q = examQuestions[index];
  const answeredCount = Object.keys(answers).filter((k) => answers[Number(k)]).length;

  const progress = useMemo(
    () => Math.round((answeredCount / examQuestions.length) * 100),
    [answeredCount],
  );

  function setAnswer(value: string) {
    setAnswers((prev) => ({ ...prev, [q.id]: value }));
  }

  function toggleFlag() {
    setFlagged((prev) => {
      const next = new Set(prev);
      if (next.has(q.id)) next.delete(q.id);
      else next.add(q.id);
      return next;
    });
  }

  return (
    <AppShell
      nav={nav}
      activePath="/student/exam"
      title="CS Core · Paper B"
      subtitle="Session active · demo timer not connected"
      user={{ name: studentProfile.name, role: "Student" }}
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="mint">Live session</Badge>
          <Badge tone="seal">Decrypted for you only</Badge>
          <span className="font-mono text-xs text-muted">
            {answeredCount}/{examQuestions.length} answered · {progress}%
          </span>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 font-mono text-sm">
          <span className="h-2 w-2 animate-pulse rounded-full bg-mint" />
          02:14:36
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[220px_1fr]">
        <Card className="h-fit">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.14em] text-muted">
            Navigator
          </p>
          <div className="grid grid-cols-5 gap-2 lg:grid-cols-4">
            {examQuestions.map((item, i) => {
              const done = Boolean(answers[item.id]);
              const flag = flagged.has(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setIndex(i)}
                  className={cn(
                    "flex h-10 items-center justify-center rounded-lg border text-sm font-medium transition",
                    index === i
                      ? "border-signal bg-signal-soft text-signal"
                      : done
                        ? "border-mint/30 bg-mint-soft text-mint"
                        : flag
                          ? "border-seal/30 bg-seal-soft text-seal"
                          : "border-white/10 text-foreground-soft hover:bg-white/5",
                  )}
                >
                  {item.id}
                </button>
              );
            })}
          </div>
          <div className="mt-4 space-y-1.5 text-[11px] text-muted">
            <p>
              <span className="mr-1 inline-block h-2 w-2 rounded-sm bg-mint" /> Answered
            </p>
            <p>
              <span className="mr-1 inline-block h-2 w-2 rounded-sm bg-seal" /> Flagged
            </p>
            <p>
              <span className="mr-1 inline-block h-2 w-2 rounded-sm bg-white/20" /> Unseen
            </p>
          </div>
        </Card>

        <Card className="min-h-[420px]">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-muted">Q{q.id}</span>
              <Badge tone="muted">{q.type}</Badge>
              <Badge tone="signal">{q.marks} marks</Badge>
            </div>
            <Button type="button" variant="ghost" size="sm" onClick={toggleFlag}>
              {flagged.has(q.id) ? "Unflag" : "Flag for review"}
            </Button>
          </div>

          <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold leading-snug">
            {q.text}
          </h2>

          <div className="mt-6">
            {q.options ? (
              <div className="space-y-2">
                {q.options.map((opt) => {
                  const selected = answers[q.id] === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setAnswer(opt)}
                      className={cn(
                        "flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-left text-sm transition",
                        selected
                          ? "border-signal bg-signal-soft text-foreground"
                          : "border-white/10 hover:border-white/20 hover:bg-white/[0.03]",
                      )}
                    >
                      <span
                        className={cn(
                          "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border",
                          selected ? "border-signal bg-signal" : "border-white/25",
                        )}
                      >
                        {selected && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                      </span>
                      {opt}
                    </button>
                  );
                })}
              </div>
            ) : q.type === "numerical" ? (
              <Input
                type="number"
                placeholder="Enter numeric answer"
                value={answers[q.id] ?? ""}
                onChange={(e) => setAnswer(e.target.value)}
                className="max-w-xs"
              />
            ) : (
              <Textarea
                placeholder="Write your answer…"
                value={answers[q.id] ?? ""}
                onChange={(e) => setAnswer(e.target.value)}
                className="min-h-[160px]"
              />
            )}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-white/5 pt-5">
            <Button
              type="button"
              variant="secondary"
              disabled={index === 0}
              onClick={() => setIndex((i) => Math.max(0, i - 1))}
            >
              Previous
            </Button>
            <p className="text-xs text-muted">Answers auto-save in the real system</p>
            {index < examQuestions.length - 1 ? (
              <Button type="button" onClick={() => setIndex((i) => i + 1)}>
                Next question
              </Button>
            ) : (
              <Button type="button" variant="seal">
                Review & submit
              </Button>
            )}
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
