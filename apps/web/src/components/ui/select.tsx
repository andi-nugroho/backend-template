"use client";

import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

export type SelectProps = {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  id?: string;
  name?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  /** Optional accessible label text when not using an external <label> */
  "aria-label"?: string;
};

export function Select({
  options,
  value,
  defaultValue,
  onChange,
  id,
  name,
  required,
  disabled,
  placeholder = "Select…",
  className,
  "aria-label": ariaLabel,
}: SelectProps) {
  const reactId = useId();
  const listId = `${reactId}-list`;
  const rootRef = useRef<HTMLDivElement>(null);
  const isControlled = value !== undefined;

  const [open, setOpen] = useState(false);
  const [internal, setInternal] = useState(
    () => defaultValue ?? options[0]?.value ?? "",
  );

  const selectedValue = isControlled ? String(value) : internal;
  const selected = options.find((o) => o.value === selectedValue);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: MouseEvent | PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  function selectValue(next: string) {
    if (!isControlled) setInternal(next);
    onChange?.(next);
    setOpen(false);
  }

  return (
    <div
      ref={rootRef}
      className={cn("relative", open && "z-50", className)}
    >
      {/* Hidden input keeps name/value in the form without OS styling */}
      <input type="hidden" name={name} value={selectedValue} disabled={disabled} />

      <button
        type="button"
        id={id}
        disabled={disabled}
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-required={required || undefined}
        onClick={() => {
          if (!disabled) setOpen((prev) => !prev);
        }}
        className={cn(
          "flex h-11 w-full items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 text-left text-sm text-foreground outline-none transition",
          "hover:bg-white/[0.05] focus-visible:border-signal/50 focus-visible:bg-white/[0.05] focus-visible:ring-2 focus-visible:ring-signal/20",
          open && "border-signal/50 bg-white/[0.05] ring-2 ring-signal/20",
          disabled && "cursor-not-allowed opacity-50",
        )}
      >
        <span className={cn("truncate", !selected && "text-muted")}>
          {selected?.label ?? placeholder}
        </span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={cn(
            "shrink-0 text-muted transition-transform duration-200",
            open && "rotate-180 text-signal",
          )}
          aria-hidden
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <ul
          id={listId}
          role="listbox"
          className="absolute left-0 right-0 top-[calc(100%+6px)] z-50 max-h-60 overflow-auto rounded-xl border border-white/12 bg-[#121a2c] p-1 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.75)]"
        >
          {options.map((opt) => {
            const active = opt.value === selectedValue;
            return (
              <li key={opt.value} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  disabled={opt.disabled}
                  onClick={() => {
                    if (!opt.disabled) selectValue(opt.value);
                  }}
                  className={cn(
                    "flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-left text-sm transition",
                    active
                      ? "bg-signal-soft text-signal"
                      : "text-foreground-soft hover:bg-white/[0.06] hover:text-foreground",
                    opt.disabled && "cursor-not-allowed opacity-40",
                  )}
                >
                  <span className="truncate">{opt.label}</span>
                  {active && (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      className="shrink-0"
                      aria-hidden
                    >
                      <path d="M5 12l5 5L20 7" />
                    </svg>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
