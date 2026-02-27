"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { getAllExperimentVariants, trackEvent } from "@/lib/analytics";

export function AnalyticsProvider() {
  const pathname = usePathname();

  useEffect(() => {
    const experiments = getAllExperimentVariants();

    Object.entries(experiments).forEach(([experiment, variant]) => {
      const exposureKey = `zepargn_exp_seen_${experiment}_${variant}`;

      if (!window.sessionStorage.getItem(exposureKey)) {
        trackEvent("experiment_exposure", { experiment, variant });
        window.sessionStorage.setItem(exposureKey, "1");
      }
    });

    trackEvent("page_view", { path: pathname });

    const stepElements = Array.from(document.querySelectorAll<HTMLElement>("[data-funnel-step]"));
    if (stepElements.length === 0) {
      return;
    }

    const seenSteps = new Set<string>();
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          const element = entry.target as HTMLElement;
          const step = element.dataset.funnelStep;

          if (!step || !entry.isIntersecting || seenSteps.has(step)) {
            return;
          }

          seenSteps.add(step);
          trackEvent("funnel_step_view", { step, path: pathname });
          obs.unobserve(element);
        });
      },
      {
        threshold: 0.3,
        rootMargin: "0px 0px -12% 0px"
      }
    );

    stepElements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}

