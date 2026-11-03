import type { QuestionMedia } from "@/components/professor/media-uploader";
import { cn } from "@/lib/utils";

export type PreviewOption = {
  key: string;
  text: string;
  media?: QuestionMedia | null;
};

type QuestionPreviewProps = {
  stem: string;
  type: string;
  marks: number;
  figures: QuestionMedia[];
  options: PreviewOption[];
  className?: string;
};

export function QuestionPreview({
  stem,
  type,
  marks,
  figures,
  options,
  className,
}: QuestionPreviewProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-black/5 bg-[#f7f4ec] p-4 text-[#1a1a1a] shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]",
        className,
      )}
    >
      <div className="mb-3 flex items-center justify-between border-b border-black/10 pb-2">
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-black/45">
          Paper preview · {type}
        </p>
        <p className="font-mono text-[11px] text-black/50">[{marks} marks]</p>
      </div>

      <p className="text-[13px] leading-relaxed whitespace-pre-wrap">
        <span className="mr-1.5 font-semibold">Q.</span>
        {stem.trim() || (
          <span className="italic text-black/35">Question stem appears here…</span>
        )}
      </p>

      {figures.length > 0 && (
        <div className="mt-3 grid gap-3">
          {figures.map((fig, i) => (
            <figure key={fig.id} className="overflow-hidden rounded-md border border-black/10 bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={fig.url}
                alt={fig.alt || fig.caption || fig.name}
                className="max-h-44 w-full object-contain p-2"
              />
              <figcaption className="border-t border-black/5 px-2 py-1.5 text-center text-[11px] text-black/55">
                Figure {i + 1}
                {fig.caption ? `. ${fig.caption}` : ""}
              </figcaption>
            </figure>
          ))}
        </div>
      )}

      {type === "mcq" && (
        <ol className="mt-4 space-y-2">
          {options.map((opt) => (
            <li key={opt.key} className="flex gap-2 text-[13px]">
              <span className="font-semibold">({opt.key.toLowerCase()})</span>
              <div className="min-w-0 flex-1">
                <p className="leading-relaxed">
                  {opt.text.trim() || (
                    <span className="italic text-black/35">Option text…</span>
                  )}
                </p>
                {opt.media && (
                  <div className="mt-1.5 overflow-hidden rounded border border-black/10 bg-white">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={opt.media.url}
                      alt={opt.media.alt || opt.media.name}
                      className="max-h-28 w-full object-contain p-1.5"
                    />
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
