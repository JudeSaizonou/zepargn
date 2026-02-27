"use client";

import { DOWNLOAD_LINKS } from "@/data/site-content";
import { trackDownloadClick } from "@/lib/analytics";
import { cn } from "@/lib/cn";

type DownloadButtonsProps = {
  className?: string;
  stackOnMobile?: boolean;
  source?: string;
  tone?: "default" | "light";
  compact?: boolean;
  twoColumnsOnMobile?: boolean;
};

const iosTone = {
  default:
    "border border-transparent bg-zepargn-orange text-white hover:bg-[#d84200] focus-visible:ring-2 focus-visible:ring-zepargn-orange focus-visible:ring-offset-2",
  light:
    "border border-transparent bg-zepargn-orange text-white hover:bg-[#d84200] focus-visible:ring-2 focus-visible:ring-zepargn-orange focus-visible:ring-offset-2 focus-visible:ring-offset-zepargn-navy"
} as const;

const androidTone = {
  default:
    "border border-slate-300 bg-white text-zepargn-navy hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-zepargn-orange focus-visible:ring-offset-2",
  light:
    "border border-white bg-white text-zepargn-navy hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-zepargn-navy"
} as const;

function AppleIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M15.17 1.38c.09 1.38-.47 2.65-1.26 3.53-.86.97-2.22 1.6-3.48 1.52-.12-1.27.44-2.62 1.2-3.45.85-.92 2.29-1.58 3.54-1.6ZM20.78 17.57c-.53 1.23-.79 1.78-1.48 2.88-.96 1.53-2.26 3.39-3.94 3.41-1.49.02-1.89-.97-3.89-.96-2 .01-2.44.97-3.93.96-1.68-.02-2.93-1.72-3.9-3.24-2.64-4.13-2.95-8.92-1.29-11.53 1.16-1.83 3.05-2.92 4.82-2.92 1.81 0 2.95 1 4.43 1 1.45 0 2.33-1 4.41-1 1.59 0 3.28.88 4.43 2.37-3.87 2.15-3.22 7.71.34 9.03Z" />
    </svg>
  );
}

function AndroidIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M7 9h10v8a2 2 0 0 1-2 2h-1v2h-2v-2h-2v2H8v-2H7a2 2 0 0 1-2-2V9h2Zm12 0h2v7h-2V9ZM3 9h2v7H3V9Zm3.3-1.3h11.4c0-.49-.1-.97-.3-1.41l1.17-.67-.74-1.29-1.16.67A4.96 4.96 0 0 0 12 3a4.96 4.96 0 0 0-3.98 1.99l-1.15-.67-.74 1.29 1.16.67c-.19.44-.29.92-.29 1.41ZM9 6a.5.5 0 1 1 0 1 .5.5 0 0 1 0-1Zm6 0a.5.5 0 1 1 0 1 .5.5 0 0 1 0-1Z" />
    </svg>
  );
}

export function DownloadButtons({
  className,
  stackOnMobile = true,
  source = "unknown",
  tone = "default",
  compact = false,
  twoColumnsOnMobile = false
}: DownloadButtonsProps) {
  return (
    <div
      className={cn(
        twoColumnsOnMobile
          ? "grid grid-cols-2 gap-2 sm:flex sm:flex-row sm:gap-3"
          : cn(
              "flex gap-3",
              stackOnMobile ? "flex-col items-center sm:flex-row sm:items-center" : "flex-row flex-wrap"
            ),
        className
      )}
    >
      <a
        aria-label="Télécharger Zepargn sur iOS"
        className={cn(
          "type-button inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-5 shadow-[0_12px_24px_rgba(3,25,39,0.12)] transition-colors",
          compact && twoColumnsOnMobile && "flex-col gap-1 px-2 py-2 text-center",
          compact
            ? cn("type-small min-h-10 px-4", twoColumnsOnMobile && "w-full")
            : "w-72 max-w-full sm:min-h-14 sm:w-auto sm:px-7",
          iosTone[tone]
        )}
        href={DOWNLOAD_LINKS.ios}
        onClick={() => trackDownloadClick(source, "ios")}
        rel="noreferrer"
        target="_blank"
      >
        <AppleIcon className="h-4 w-4" />
        <span className="leading-tight whitespace-nowrap">Télécharger sur iOS</span>
      </a>
      <a
        aria-label="Télécharger Zepargn sur Android"
        className={cn(
          "type-button inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-5 shadow-[0_10px_20px_rgba(3,25,39,0.08)] transition-colors",
          compact && twoColumnsOnMobile && "flex-col gap-1 px-2 py-2 text-center",
          compact
            ? cn("type-small min-h-10 px-4", twoColumnsOnMobile && "w-full")
            : "w-72 max-w-full sm:min-h-14 sm:w-auto sm:px-7",
          androidTone[tone]
        )}
        href={DOWNLOAD_LINKS.android}
        onClick={() => trackDownloadClick(source, "android")}
        rel="noreferrer"
        target="_blank"
      >
        <AndroidIcon className="h-4 w-4" />
        <span className="leading-tight whitespace-nowrap">Télécharger sur Android</span>
      </a>
    </div>
  );
}
