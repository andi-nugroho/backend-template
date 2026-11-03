import { Badge } from "@/components/ui/badge";
import type { QuestionStatus } from "@/lib/mock-data";

const map: Record<
  QuestionStatus,
  { label: string; tone: "signal" | "seal" | "mint" | "rose" | "muted" }
> = {
  draft: { label: "Draft", tone: "muted" },
  submitted: { label: "Submitted", tone: "signal" },
  validating: { label: "Validating", tone: "signal" },
  sealed: { label: "Sealed", tone: "seal" },
  rejected: { label: "Returned", tone: "rose" },
};

export function StatusBadge({ status }: { status: QuestionStatus }) {
  const cfg = map[status];
  return <Badge tone={cfg.tone}>{cfg.label}</Badge>;
}
