"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function ParallaxProvider() {
  const pathname = usePathname();

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      return;
    }

    const parallaxElements = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax-speed]"));

    if (parallaxElements.length === 0) {
      return;
    }

    let rafId = 0;
    let ticking = false;

    const update = () => {
      const viewportHeight = window.innerHeight;

      parallaxElements.forEach((element) => {
        const speed = Number.parseFloat(element.dataset.parallaxSpeed ?? "0.08");
        const rect = element.getBoundingClientRect();
        const isNearViewport = rect.bottom > -220 && rect.top < viewportHeight + 220;

        if (!isNearViewport) {
          return;
        }

        const elementCenter = rect.top + rect.height / 2;
        const deltaFromCenter = elementCenter - viewportHeight / 2;
        const rawTranslate = -deltaFromCenter * speed;
        const translate = Math.max(-36, Math.min(36, rawTranslate));

        element.style.transform = `translate3d(0, ${translate.toFixed(2)}px, 0)`;
      });

      ticking = false;
    };

    const requestTick = () => {
      if (ticking) {
        return;
      }

      ticking = true;
      rafId = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestTick, { passive: true });
    window.addEventListener("resize", requestTick);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", requestTick);
      window.removeEventListener("resize", requestTick);
      parallaxElements.forEach((element) => {
        element.style.transform = "";
      });
    };
  }, [pathname]);

  return null;
}
