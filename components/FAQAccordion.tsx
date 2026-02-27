"use client";

import { useState } from "react";
import { FAQItem } from "@/data/site-content";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/cn";

type FAQAccordionProps = {
  items: FAQItem[];
};

export function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="mx-auto w-full divide-y divide-slate-200 border-y border-slate-200">
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
        <details
          className="group bg-transparent py-5 sm:py-6"
          open={isOpen}
          key={item.question}
        >
          <summary
            className={cn(
              "type-link flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 break-words pr-1 text-left transition-colors",
              isOpen ? "text-zepargn-orange" : "text-zepargn-navy"
            )}
            onClick={(event) => {
              event.preventDefault();

              if (isOpen) {
                setOpenIndex(null);
                return;
              }

              setOpenIndex(index);
              trackEvent("faq_open", { question: item.question });
            }}
          >
            {item.question}
            <span
              aria-hidden="true"
              className={cn(
                "inline-flex h-8 w-8 items-center justify-center rounded-full border transition-transform",
                isOpen
                  ? "rotate-45 border-zepargn-orange bg-zepargn-orange text-white"
                  : "border-slate-300 text-zepargn-orange"
              )}
            >
              +
            </span>
          </summary>
          <p className="type-body max-w-4xl break-words pt-4 text-slate-700">{item.answer}</p>
        </details>
      );
      })}
    </div>
  );
}
