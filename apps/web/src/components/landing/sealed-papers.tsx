import { SealMark } from "@/components/brand/seal";

const papers = [
  { id: "A", rotate: "-6deg", delay: "0s", x: -56 },
  { id: "B", rotate: "1deg", delay: "0.8s", x: 0 },
  { id: "C", rotate: "7deg", delay: "1.6s", x: 56 },
];

export function SealedPapers() {
  return (
    <div className="relative mx-auto flex h-[340px] w-full max-w-md items-center justify-center sm:h-[400px]">
      <div className="animate-pulse-glow absolute h-48 w-48 rounded-full bg-signal/20 blur-3xl" />
      <div className="absolute h-32 w-32 rounded-full bg-seal/10 blur-2xl" />

      {papers.map((paper, i) => (
        <div
          key={paper.id}
          className="animate-float absolute"
          style={{
            zIndex: i + 1,
            left: "50%",
            marginLeft: paper.x,
            transform: "translateX(-50%)",
            animationDelay: paper.delay,
          }}
        >
          <div
            className="glass-strong flex h-56 w-40 flex-col justify-between rounded-2xl p-4 sm:h-64 sm:w-44"
            style={{ transform: `rotate(${paper.rotate})` }}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                  Paper
                </p>
                <p className="font-[family-name:var(--font-display)] text-3xl font-bold text-signal">
                  {paper.id}
                </p>
              </div>
              <span className="rounded-md border border-seal/30 bg-seal-soft px-1.5 py-0.5 font-mono text-[9px] text-seal">
                ENC
              </span>
            </div>

            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, line) => (
                <div
                  key={line}
                  className="h-1.5 rounded-full bg-white/5"
                  style={{ width: `${70 + ((line * 17) % 30)}%` }}
                />
              ))}
            </div>

            <div className="flex items-center justify-between">
              <SealMark size="sm" label="LOCKED" className="!h-12 !w-12 scale-90" />
              <p className="max-w-[70px] text-right font-mono text-[9px] leading-tight text-muted">
                unlocks at exam time
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
