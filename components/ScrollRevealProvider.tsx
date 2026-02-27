"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function ScrollRevealProvider() {
  const pathname = usePathname();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      return;
    }

    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

    if (elements.length === 0) {
      return;
    }

    let direction: "up" | "down" = "down";
    let lastY = window.scrollY;

    const onScroll = () => {
      const currentY = window.scrollY;
      direction = currentY > lastY ? "down" : "up";
      lastY = currentY;
    };

    const updateHiddenDirection = (element: HTMLElement) => {
      element.classList.remove("reveal-from-up", "reveal-from-down");
      element.classList.add(direction === "up" ? "reveal-from-up" : "reveal-from-down");
    };

    const revealed = new WeakSet<HTMLElement>();
    const viewportHeight = window.innerHeight;
    elements.forEach((element) => {
      element.classList.add("reveal-ready");

      const delay = Number(element.dataset.revealDelay ?? "0");
      if (Number.isFinite(delay) && delay > 0) {
        element.style.transitionDelay = `${delay}ms`;
      }

      const rect = element.getBoundingClientRect();
      const isInitiallyVisible = rect.top < viewportHeight * 0.9 && rect.bottom > 0;

      if (isInitiallyVisible) {
        element.classList.add("is-visible");
        revealed.add(element);
      } else {
        updateHiddenDirection(element);
      }
    });

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          const element = entry.target as HTMLElement;

          if (entry.isIntersecting) {
            updateHiddenDirection(element);
            element.classList.add("is-visible");
            revealed.add(element);
            obs.unobserve(element);
            return;
          }

          if (!revealed.has(element)) {
            element.classList.remove("is-visible");
            updateHiddenDirection(element);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -12% 0px"
      }
    );

    elements.forEach((element) => observer.observe(element));
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      elements.forEach((element) => {
        element.classList.remove("reveal-ready", "is-visible", "reveal-from-up", "reveal-from-down");
        element.style.transitionDelay = "";
      });
    };
  }, [pathname]);

  return null;
}
