"use client";

import { useCallback, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type QuestionMedia = {
  id: string;
  file: File;
  url: string;
  name: string;
  size: number;
  caption: string;
  alt: string;
};

const ACCEPTED = ["image/png", "image/jpeg", "image/webp", "image/gif", "image/svg+xml"];
const MAX_BYTES = 5 * 1024 * 1024; // 5 MB
const DEFAULT_MAX_FILES = 6;

function formatBytes(n: number) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(0)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}

function makeId() {
  return `media-${Math.random().toString(36).slice(2, 10)}`;
}

type MediaUploaderProps = {
  value: QuestionMedia[];
  onChange: (next: QuestionMedia[]) => void;
  maxFiles?: number;
  label?: string;
  hint?: string;
  compact?: boolean;
  className?: string;
};

export function MediaUploader({
  value,
  onChange,
  maxFiles = DEFAULT_MAX_FILES,
  label = "Figures & diagrams",
  hint = "PNG, JPG, WebP, GIF, or SVG · max 5 MB each",
  compact = false,
  className,
}: MediaUploaderProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const remaining = maxFiles - value.length;

  const addFiles = useCallback(
    (fileList: FileList | File[]) => {
      setError(null);
      const files = Array.from(fileList);
      if (!files.length) return;

      const next: QuestionMedia[] = [...value];
      const issues: string[] = [];

      for (const file of files) {
        if (next.length >= maxFiles) {
          issues.push(`Maximum ${maxFiles} image${maxFiles === 1 ? "" : "s"}.`);
          break;
        }
        if (!ACCEPTED.includes(file.type)) {
          issues.push(`“${file.name}” is not a supported image type.`);
          continue;
        }
        if (file.size > MAX_BYTES) {
          issues.push(`“${file.name}” exceeds 5 MB.`);
          continue;
        }
        next.push({
          id: makeId(),
          file,
          url: URL.createObjectURL(file),
          name: file.name,
          size: file.size,
          caption: "",
          alt: "",
        });
      }

      if (issues.length) setError(issues[0]);
      if (next.length !== value.length) onChange(next);
    },
    [maxFiles, onChange, value],
  );

  function remove(id: string) {
    const target = value.find((m) => m.id === id);
    if (target) URL.revokeObjectURL(target.url);
    onChange(value.filter((m) => m.id !== id));
  }

  function updateMeta(id: string, patch: Partial<Pick<QuestionMedia, "caption" | "alt">>) {
    onChange(value.map((m) => (m.id === id ? { ...m, ...patch } : m)));
  }

  function move(id: string, dir: -1 | 1) {
    const i = value.findIndex((m) => m.id === id);
    const j = i + dir;
    if (i < 0 || j < 0 || j >= value.length) return;
    const next = [...value];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  }

  function onPaste(e: React.ClipboardEvent) {
    const items = e.clipboardData?.items;
    if (!items) return;
    const files: File[] = [];
    for (const item of Array.from(items)) {
      if (item.type.startsWith("image/")) {
        const file = item.getAsFile();
        if (file) files.push(file);
      }
    }
    if (files.length) {
      e.preventDefault();
      addFiles(files);
    }
  }

  return (
    <div className={cn("space-y-3", className)} onPaste={onPaste}>
      {!compact && (
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted">
              {label}
            </p>
            <p className="mt-1 text-xs text-foreground-soft">{hint}</p>
          </div>
          {value.length > 0 && (
            <p className="font-mono text-[11px] text-muted">
              {value.length}/{maxFiles}
            </p>
          )}
        </div>
      )}

      {remaining > 0 && (
        <label
          htmlFor={inputId}
          onDragEnter={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            setDragging(false);
          }}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            if (e.dataTransfer.files?.length) addFiles(e.dataTransfer.files);
          }}
          className={cn(
            "group flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed px-4 text-center transition",
            compact ? "min-h-[88px] py-3" : "min-h-[120px] py-5",
            dragging
              ? "border-signal bg-signal-soft/50"
              : "border-white/15 bg-white/[0.02] hover:border-signal/40 hover:bg-white/[0.04]",
          )}
        >
          <input
            ref={inputRef}
            id={inputId}
            type="file"
            accept={ACCEPTED.join(",")}
            multiple={maxFiles > 1}
            className="sr-only"
            onChange={(e) => {
              if (e.target.files?.length) addFiles(e.target.files);
              e.target.value = "";
            }}
          />
          <span
            className={cn(
              "mb-2 flex items-center justify-center rounded-lg border border-white/10 bg-white/5 text-signal",
              compact ? "h-8 w-8" : "h-10 w-10",
            )}
          >
            <svg
              width={compact ? 14 : 18}
              height={compact ? 14 : 18}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <circle cx="8.5" cy="10" r="1.5" />
              <path d="M21 16l-5-5-4 4-2-2-5 5" />
            </svg>
          </span>
          <p className={cn("text-sm text-foreground-soft", compact && "text-xs")}>
            <span className="font-medium text-signal">Upload</span>
            {compact ? " image" : " or drag diagrams here"}
          </p>
          {!compact && (
            <p className="mt-1 text-[11px] text-muted">
              You can also paste an image from the clipboard (Ctrl/⌘ V)
            </p>
          )}
        </label>
      )}

      {error && (
        <p className="rounded-lg border border-rose/25 bg-rose-soft px-3 py-2 text-xs text-rose">
          {error}
        </p>
      )}

      {value.length > 0 && (
        <ul className="space-y-3">
          {value.map((media, index) => (
            <li
              key={media.id}
              className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]"
            >
              <div className={cn("grid gap-3 p-3", compact ? "" : "sm:grid-cols-[140px_1fr]")}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-white/10 bg-ink">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={media.url}
                    alt={media.alt || media.name}
                    className="h-full w-full object-contain"
                  />
                  <span className="absolute left-2 top-2 rounded-md border border-seal/30 bg-ink/80 px-1.5 py-0.5 font-mono text-[10px] text-seal backdrop-blur">
                    Fig. {index + 1}
                  </span>
                </div>

                <div className="flex min-w-0 flex-col gap-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{media.name}</p>
                      <p className="font-mono text-[11px] text-muted">
                        {formatBytes(media.size)}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-1">
                      {!compact && (
                        <>
                          <button
                            type="button"
                            aria-label="Move up"
                            disabled={index === 0}
                            onClick={() => move(media.id, -1)}
                            className="rounded-lg border border-white/10 px-2 py-1 text-xs text-muted transition hover:bg-white/5 disabled:opacity-30"
                          >
                            ↑
                          </button>
                          <button
                            type="button"
                            aria-label="Move down"
                            disabled={index === value.length - 1}
                            onClick={() => move(media.id, 1)}
                            className="rounded-lg border border-white/10 px-2 py-1 text-xs text-muted transition hover:bg-white/5 disabled:opacity-30"
                          >
                            ↓
                          </button>
                        </>
                      )}
                      <button
                        type="button"
                        onClick={() => remove(media.id)}
                        className="rounded-lg border border-rose/20 px-2 py-1 text-xs text-rose transition hover:bg-rose-soft"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  {!compact && (
                    <>
                      <div>
                        <label className="mb-1 block text-[10px] uppercase tracking-wider text-muted">
                          Caption (shown on paper)
                        </label>
                        <input
                          value={media.caption}
                          onChange={(e) =>
                            updateMeta(media.id, { caption: e.target.value })
                          }
                          placeholder={`Figure ${index + 1}: describe the diagram…`}
                          className="h-9 w-full rounded-lg border border-white/10 bg-white/[0.03] px-2.5 text-sm outline-none focus:border-signal/50 focus:ring-2 focus:ring-signal/20"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-[10px] uppercase tracking-wider text-muted">
                          Alt text (accessibility)
                        </label>
                        <input
                          value={media.alt}
                          onChange={(e) => updateMeta(media.id, { alt: e.target.value })}
                          placeholder="Brief description for screen readers"
                          className="h-9 w-full rounded-lg border border-white/10 bg-white/[0.03] px-2.5 text-sm outline-none focus:border-signal/50 focus:ring-2 focus:ring-signal/20"
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
