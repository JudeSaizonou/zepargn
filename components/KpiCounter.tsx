"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type KpiCounterProps = {
  value: string;
  className?: string;
  durationMs?: number;
  delayMs?: number;
};

type ParsedValue = {
  prefix: string;
  target: number;
  suffix: string;
  format: "plain" | "en-US" | "fr-FR";
};

function parseValue(value: string): ParsedValue | null {
  const match = value.match(/^([^0-9]*)([0-9][0-9,.\s\u202f]*)(.*)$/);
  if (!match) {
    return null;
  }

  const [, prefix, numericChunk, suffix] = match;
  const target = Number.parseInt(numericChunk.replace(/[^\d]/g, ""), 10);
  if (!Number.isFinite(target)) {
    return null;
  }

  let format: ParsedValue["format"] = "plain";
  if (numericChunk.includes(",")) {
    format = "en-US";
  } else if (numericChunk.includes(" ") || numericChunk.includes("\u202f")) {
    format = "fr-FR";
  }

  return { prefix, target, suffix, format };
}

function formatNumber(value: number, format: ParsedValue["format"]) {
  if (format === "plain") {
    return String(value);
  }

  return value.toLocaleString(format);
}

export function KpiCounter({ value, className, durationMs = 1400, delayMs = 0 }: KpiCounterProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const hasStartedRef = useRef(false);
  const [displayValue, setDisplayValue] = useState(value);
  const parsed = useMemo(() => parseValue(value), [value]);

  useEffect(() => {
    if (!parsed) {
      setDisplayValue(value);
      return;
    }

    const element = containerRef.current;
    if (!element) {
      return;
    }

    let rafId = 0;
    let timeoutId = 0;
    let observer: IntersectionObserver | null = null;

    const startAnimation = () => {
      if (hasStartedRef.current) {
        return;
      }

      hasStartedRef.current = true;
      const startAt = performance.now();

      const tick = (now: number) => {
        const elapsed = now - startAt;
        const progress = Math.min(1, elapsed / durationMs);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(parsed.target * eased);

        setDisplayValue(`${parsed.prefix}${formatNumber(current, parsed.format)}${parsed.suffix}`);

        if (progress < 1) {
          rafId = window.requestAnimationFrame(tick);
          return;
        }

        setDisplayValue(`${parsed.prefix}${formatNumber(parsed.target, parsed.format)}${parsed.suffix}`);
      };

      timeoutId = window.setTimeout(() => {
        rafId = window.requestAnimationFrame(tick);
      }, delayMs);
    };

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          startAnimation();
          observer?.disconnect();
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(element);

    return () => {
      window.clearTimeout(timeoutId);
      window.cancelAnimationFrame(rafId);
      observer?.disconnect();
    };
  }, [delayMs, durationMs, parsed, value]);

  return (
    <p className={className} ref={containerRef}>
      {displayValue}
    </p>
  );
}

