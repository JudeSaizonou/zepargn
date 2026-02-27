"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

type VideoBackdropSpotProps = {
  className?: string;
  videoSrc?: string;
  posterSrc: string;
  title: string;
  body?: string;
  kicker?: string;
  children?: React.ReactNode;
};

export function VideoBackdropSpot({
  className,
  videoSrc,
  posterSrc,
  title,
  body,
  kicker,
  children
}: VideoBackdropSpotProps) {
  const [reducedMotion, setReducedMotion] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReducedMotion(mediaQuery.matches);

    onChange();
    mediaQuery.addEventListener("change", onChange);

    return () => {
      mediaQuery.removeEventListener("change", onChange);
    };
  }, []);

  const shouldPlayVideo = Boolean(videoSrc) && !reducedMotion;

  return (
    <section className={cn("relative isolate overflow-hidden rounded-[2.4rem]", className)}>
      <div aria-hidden="true" className="absolute inset-0">
        {shouldPlayVideo ? (
          <video
            autoPlay
            className="h-full w-full object-cover"
            loop
            muted
            playsInline
            poster={posterSrc}
            preload="metadata"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : (
          <Image alt="" className="h-full w-full object-cover" fill sizes="100vw" src={posterSrc} />
        )}
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-[#F04A00]/12" />
      </div>

      <div className="relative z-10 px-6 py-10 text-white sm:px-10 sm:py-14 lg:px-14 lg:py-16">
        {kicker ? <p className="micro-accent text-zepargn-sky">{kicker}</p> : null}
        <h2 className="type-h1 mt-2 max-w-4xl">{title}</h2>
        {body ? <p className="type-body mt-4 max-w-2xl text-slate-200">{body}</p> : null}
        {children ? <div className="mt-7">{children}</div> : null}
      </div>
    </section>
  );
}
