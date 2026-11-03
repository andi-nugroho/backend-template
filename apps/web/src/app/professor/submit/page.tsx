"use client";

import { useMemo, useState } from "react";
import {
  AppShell,
  IconHome,
  IconList,
  IconPlus,
} from "@/components/layout/app-shell";
import {
  MediaUploader,
  type QuestionMedia,
} from "@/components/professor/media-uploader";
import { QuestionPreview } from "@/components/professor/question-preview";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Input, Label, Textarea } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { professorProfile } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/professor", label: "Overview", icon: <IconHome /> },
  { href: "/professor/submit", label: "Submit question", icon: <IconPlus /> },
  { href: "/professor/bank", label: "My submissions", icon: <IconList /> },
];

const OPTION_KEYS = ["A", "B", "C", "D"] as const;

const TOPIC_OPTIONS = professorProfile.assignedTopics.map((t) => ({
  value: t,
  label: t,
}));

const TYPE_OPTIONS = [
  { value: "mcq", label: "Multiple choice" },
  { value: "short", label: "Short answer" },
  { value: "numerical", label: "Numerical" },
  { value: "essay", label: "Essay" },
];

const ANSWER_KEY_OPTIONS = OPTION_KEYS.map((key) => ({
  value: key,
  label: `Option ${key}`,
}));

type OptionState = {
  text: string;
  media: QuestionMedia[];
};

function emptyOptions(): Record<(typeof OPTION_KEYS)[number], OptionState> {
  return {
    A: { text: "", media: [] },
    B: { text: "", media: [] },
    C: { text: "", media: [] },
    D: { text: "", media: [] },
  };
}

export default function SubmitQuestionPage() {
  const [topic, setTopic] = useState(TOPIC_OPTIONS[0]?.value ?? "");
  const [type, setType] = useState("mcq");
  const [marks, setMarks] = useState(2);
  const [stem, setStem] = useState("");
  const [figures, setFigures] = useState<QuestionMedia[]>([]);
  const [options, setOptions] = useState(emptyOptions);
  const [answerKey, setAnswerKey] = useState("A");
  const [expandedOptionMedia, setExpandedOptionMedia] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [attachmentCount, setAttachmentCount] = useState(0);

  const previewOptions = useMemo(
    () =>
      OPTION_KEYS.map((key) => ({
        key,
        text: options[key].text,
        media: options[key].media[0] ?? null,
      })),
    [options],
  );

  const totalMedia =
    figures.length +
    OPTION_KEYS.reduce((sum, key) => sum + options[key].media.length, 0);

  function resetForm() {
    setTopic(TOPIC_OPTIONS[0]?.value ?? "");
    setType("mcq");
    setStem("");
    setFigures([]);
    setOptions(emptyOptions());
    setAnswerKey("A");
    setExpandedOptionMedia(null);
    setAttachmentCount(0);
    setSubmitted(false);
  }

  return (
    <AppShell
      nav={nav}
      activePath="/professor/submit"
      title="Submit a question"
      subtitle="Compose stem, attach diagrams, then seal. Media is encrypted with the question."
      user={{ name: professorProfile.name, role: "Professor" }}
    >
      {submitted ? (
        <Card className="mx-auto max-w-xl text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-seal/30 bg-seal-soft text-seal">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 3l7 3v5c0 4.5-2.8 7.8-7 9-4.2-1.2-7-4.5-7-9V6l7-3z" />
              <path d="M9 12l2 2 4-4" />
            </svg>
          </div>
          <CardTitle>Handed to the vault</CardTitle>
          <CardDescription className="mx-auto max-w-md">
            Your question{attachmentCount > 0 ? ` and ${attachmentCount} figure${attachmentCount === 1 ? "" : "s"}` : ""}{" "}
            entered the AI validation pipeline. Diagrams are sealed with the stem — operators never
            see plaintext or image content.
          </CardDescription>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button onClick={resetForm}>Submit another</Button>
            <Button href="/professor/bank" variant="secondary">
              View submissions
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
          <Card className="min-w-0">
            <form
              className="space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                setAttachmentCount(totalMedia);
                setSubmitted(true);
              }}
            >
              {/* Meta */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" defaultValue="Computer Science" required />
                </div>
                <div>
                  <Label htmlFor="topic">Topic</Label>
                  <Select
                    id="topic"
                    name="topic"
                    options={TOPIC_OPTIONS}
                    value={topic}
                    onChange={setTopic}
                    required
                    aria-label="Topic"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="type">Question type</Label>
                  <Select
                    id="type"
                    name="type"
                    options={TYPE_OPTIONS}
                    value={type}
                    onChange={setType}
                    required
                    aria-label="Question type"
                  />
                </div>
                <div>
                  <Label htmlFor="marks">Estimated marks</Label>
                  <Input
                    id="marks"
                    type="number"
                    min={1}
                    max={20}
                    value={marks}
                    onChange={(e) => setMarks(Number(e.target.value) || 1)}
                    required
                  />
                </div>
              </div>

              {/* Stem */}
              <section className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <Label htmlFor="question" className="mb-0">
                    Question stem
                  </Label>
                  <p className="text-[11px] text-muted">
                    Reference figures as “Figure 1”, “Figure 2” in the text
                  </p>
                </div>
                <Textarea
                  id="question"
                  value={stem}
                  onChange={(e) => setStem(e.target.value)}
                  placeholder={
                    "Example: The circuit in Figure 1 is in steady state. Find the current through the 2Ω resistor.\n\nYou can paste screenshots directly into this form."
                  }
                  required
                  className="min-h-[150px]"
                />
              </section>

              {/* Stem figures */}
              <section className="rounded-xl border border-white/8 bg-white/[0.015] p-4">
                <MediaUploader
                  value={figures}
                  onChange={setFigures}
                  maxFiles={6}
                  label="Stem figures & diagrams"
                  hint="Circuits, graphs, tables-as-images, geometry sketches — encrypted with the question"
                />
              </section>

              {/* MCQ options */}
              {type === "mcq" && (
                <section className="space-y-3">
                  <div className="flex flex-wrap items-end justify-between gap-2">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted">
                        Options
                      </p>
                      <p className="mt-1 text-xs text-foreground-soft">
                        Each choice can be text, an image, or both (e.g. waveform diagrams).
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {OPTION_KEYS.map((key) => {
                      const opt = options[key];
                      const mediaOpen =
                        expandedOptionMedia === key || opt.media.length > 0;
                      return (
                        <div
                          key={key}
                          className="rounded-xl border border-white/10 bg-white/[0.02] p-3"
                        >
                          <div className="flex items-start gap-3">
                            <span className="mt-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-signal/25 bg-signal-soft font-mono text-sm font-semibold text-signal">
                              {key}
                            </span>
                            <div className="min-w-0 flex-1 space-y-2">
                              <Input
                                value={opt.text}
                                onChange={(e) =>
                                  setOptions((prev) => ({
                                    ...prev,
                                    [key]: { ...prev[key], text: e.target.value },
                                  }))
                                }
                                placeholder={`Option ${key} text (optional if image only)`}
                              />
                              <div className="flex flex-wrap items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() =>
                                    setExpandedOptionMedia((cur) =>
                                      cur === key && opt.media.length === 0 ? null : key,
                                    )
                                  }
                                  className={cn(
                                    "inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs transition",
                                    mediaOpen
                                      ? "border-signal/30 bg-signal-soft text-signal"
                                      : "border-white/10 text-foreground-soft hover:bg-white/5",
                                  )}
                                >
                                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="3" y="5" width="18" height="14" rx="2" />
                                    <circle cx="8.5" cy="10" r="1.5" />
                                    <path d="M21 16l-5-5-4 4-2-2-5 5" />
                                  </svg>
                                  {opt.media.length
                                    ? "Image attached"
                                    : "Attach image"}
                                </button>
                                {opt.media.length > 0 && (
                                  <Badge tone="seal">1 figure</Badge>
                                )}
                              </div>
                              {mediaOpen && (
                                <MediaUploader
                                  value={opt.media}
                                  onChange={(next) =>
                                    setOptions((prev) => ({
                                      ...prev,
                                      [key]: { ...prev[key], media: next.slice(0, 1) },
                                    }))
                                  }
                                  maxFiles={1}
                                  compact
                                  label={`Option ${key} image`}
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="answer">Correct answer</Label>
                  {type === "mcq" ? (
                    <Select
                      id="answer"
                      name="answer"
                      options={ANSWER_KEY_OPTIONS}
                      value={answerKey}
                      onChange={setAnswerKey}
                      required
                      aria-label="Correct answer"
                    />
                  ) : (
                    <Input
                      id="answer"
                      name="answer"
                      placeholder={
                        type === "numerical"
                          ? "e.g. 42"
                          : "Key or model answer"
                      }
                      required
                    />
                  )}
                </div>
                <div className="flex flex-col justify-end">
                  <div className="rounded-xl border border-white/8 bg-white/[0.02] px-3 py-2.5 text-xs text-foreground-soft">
                    <span className="font-mono text-signal">{totalMedia}</span> media
                    file{totalMedia === 1 ? "" : "s"} will be encrypted with this item
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="explanation">Explanation</Label>
                <Textarea
                  id="explanation"
                  placeholder="Why this answer is correct (used for AI quality checks — not shown to students)"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/5 pt-5">
                <p className="max-w-sm text-xs text-muted">
                  Stem + figures + options are sealed together. Plaintext images never persist
                  after encryption.
                </p>
                <div className="flex gap-2">
                  <Button type="button" variant="secondary">
                    Save draft
                  </Button>
                  <Button type="submit" variant="seal">
                    Submit & seal
                  </Button>
                </div>
              </div>
            </form>
          </Card>

          <div className="space-y-4 xl:sticky xl:top-24 xl:self-start">
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-[0.14em] text-muted">
                How it prints
              </p>
              <QuestionPreview
                stem={stem}
                type={type}
                marks={marks}
                figures={figures}
                options={previewOptions}
              />
            </div>

            <Card>
              <CardTitle className="text-base">Media guidance</CardTitle>
              <ul className="mt-3 space-y-2 text-sm text-foreground-soft">
                <li className="flex gap-2">
                  <span className="text-signal">•</span>
                  Prefer high-contrast diagrams; students may print in B&amp;W.
                </li>
                <li className="flex gap-2">
                  <span className="text-signal">•</span>
                  Crop tightly — avoid phone photos of full notebook pages.
                </li>
                <li className="flex gap-2">
                  <span className="text-signal">•</span>
                  Caption each figure; reference it from the stem (“see Figure 1”).
                </li>
                <li className="flex gap-2">
                  <span className="text-signal">•</span>
                  Option images are ideal for “which graph matches…” questions.
                </li>
              </ul>
            </Card>

            <Card>
              <Badge tone="seal">Encrypt immediately</Badge>
              <CardDescription className="mt-3">
                Images travel with the encrypted payload. Admins and operators never open stem or
                figure bytes in plaintext.
              </CardDescription>
            </Card>
          </div>
        </div>
      )}
    </AppShell>
  );
}
