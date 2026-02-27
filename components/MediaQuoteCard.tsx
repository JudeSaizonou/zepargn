import { cn } from "@/lib/cn";

type MediaQuoteCardProps = {
  source: string;
  quote: string;
  href: string;
  linkLabel: string;
  className?: string;
};

export function MediaQuoteCard({ source, quote, href, linkLabel, className }: MediaQuoteCardProps) {
  return (
    <article
      className={cn(
        "relative h-full min-w-0 overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_16px_40px_rgba(3,25,39,0.1)] sm:p-7",
        className
      )}
    >
      <span aria-hidden="true" className="type-decor pointer-events-none absolute -right-3 -top-6 text-slate-100">
        &rdquo;
      </span>
      <p className="type-kicker inline-flex max-w-full break-words rounded-full bg-[#F6F9FC] px-3 py-1 text-zepargn-orange">
        {source}
      </p>
      <p className="type-body mt-4 break-words text-slate-700">&quot;{quote}&quot;</p>
      <a
        aria-label={`Lire l'article ${source}`}
        className="type-link mt-5 inline-flex max-w-full items-center gap-1 break-words text-zepargn-navy underline-offset-2 transition hover:text-zepargn-orange hover:underline"
        href={href}
        rel="noreferrer"
        target="_blank"
      >
        {linkLabel}
      </a>
    </article>
  );
}
