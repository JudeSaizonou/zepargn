"use client";

import Image from "next/image";
import { useRef } from "react";
import { Container } from "@/components/Container";
import { cn } from "@/lib/cn";

type FeatureBlockProps = {
  id?: string;
  kicker: string;
  title: string;
  whatIs: string;
  highlight?: React.ReactNode;
  mediaSrc: string;
  mediaAlt: string;
  mediaClassName?: string;
  reverse?: boolean;
  className?: string;
  modalTitle: string;
  modalContent: React.ReactNode;
};

export function FeatureBlock({
  id,
  kicker,
  title,
  whatIs,
  highlight,
  mediaSrc,
  mediaAlt,
  mediaClassName,
  reverse = false,
  className,
  modalTitle,
  modalContent
}: FeatureBlockProps) {
  const modalRef = useRef<HTMLDialogElement>(null);

  const openModal = () => modalRef.current?.showModal();
  const closeModal = () => modalRef.current?.close();

  return (
    <section className={cn("section-space-spacious", className)} data-reveal="" id={id}>
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className={cn("relative min-w-0", reverse && "lg:order-2")}>
            <span aria-hidden="true" className="absolute -left-5 top-2 hidden h-24 w-px bg-slate-300 lg:block" />
            <p className="micro-accent text-zepargn-orange">{kicker}</p>
            <h2 className="type-h2 mt-3 break-words text-zepargn-navy">
              {title}
            </h2>
            {highlight ? <div className="mt-6">{highlight}</div> : null}

            <p className="type-body mt-6 max-w-2xl break-words text-slate-700">{whatIs}</p>

            <button
              aria-label={`En savoir plus sur ${title}`}
              className="type-link mt-4 inline-flex items-center rounded-full bg-zepargn-orange/12 px-3 py-1.5 text-zepargn-orange transition-colors hover:bg-zepargn-orange hover:text-white sm:hidden"
              onClick={openModal}
              type="button"
            >
              Lire plus
            </button>

            <button
              aria-label={`En savoir plus sur ${title}`}
              className="type-button mt-7 hidden min-h-14 items-center justify-center rounded-full bg-zepargn-orange px-8 text-white shadow-[0_10px_24px_rgba(240,74,0,0.3)] transition-colors hover:bg-[#d84200] sm:inline-flex"
              onClick={openModal}
              type="button"
            >
              En savoir plus
            </button>
          </div>

          <div
            className={cn(
              "relative mx-auto min-w-0 w-full max-w-[22rem] sm:max-w-[27rem] lg:max-w-[31rem] xl:max-w-[35rem] lg:pt-5",
              reverse && "lg:order-1"
            )}
          >
            <div
              aria-hidden="true"
              className="absolute -inset-2 hidden rounded-[1.9rem] border border-slate-200/70 bg-white/50 lg:block"
            />
            <Image
              alt={mediaAlt}
              className={cn(
                "relative w-full rounded-3xl border border-slate-200 bg-white object-cover shadow-[0_18px_44px_rgba(3,25,39,0.12)]",
                mediaClassName
              )}
              height={900}
              quality={100}
              sizes="(min-width: 1536px) 35rem, (min-width: 1280px) 33rem, (min-width: 1024px) 31rem, (min-width: 640px) 27rem, 92vw"
              src={mediaSrc}
              width={900}
            />
          </div>
        </div>
      </Container>

      <dialog
        aria-label={modalTitle}
        className="w-[min(94vw,52rem)] rounded-3xl border border-slate-200 p-0 shadow-[0_28px_70px_rgba(3,25,39,0.22)] backdrop:bg-zepargn-navy/60 backdrop:backdrop-blur-sm"
        onClick={(event) => {
          if (event.target === modalRef.current) {
            modalRef.current.close();
          }
        }}
        ref={modalRef}
      >
        <div className="relative max-h-[86vh] overflow-y-auto bg-white p-6 sm:p-8">
          <button
            aria-label="Fermer la fenêtre"
            className="type-button absolute right-4 top-4 inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-slate-300 bg-white text-zepargn-navy transition-colors hover:bg-slate-100"
            onClick={closeModal}
            type="button"
          >
            <span aria-hidden="true" className="text-2xl leading-none">×</span>
            <span className="sr-only">Fermer</span>
          </button>

          <p className="micro-accent pr-16 text-zepargn-orange">Détail fonctionnalité</p>
          <h3 className="type-h2 mt-3 break-words pr-16 text-zepargn-navy">{modalTitle}</h3>
          <div className="type-body mt-6 space-y-5 break-words text-slate-700">{modalContent}</div>
        </div>
      </dialog>
    </section>
  );
}
