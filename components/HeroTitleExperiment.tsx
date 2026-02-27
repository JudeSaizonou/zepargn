"use client";

import { useEffect, useState } from "react";
import { getExperimentVariant } from "@/lib/analytics";

type HeroTitleVariant = "a" | "b";

function HeroTitleA() {
  return (
    <>
      <span className="text-zepargn-orange">Z</span>’épargne. <span className="text-zepargn-orange">Z</span>
      ’investis.
      <br />
      <span className="text-zepargn-orange">Ze</span> réalise mes rêves.
    </>
  );
}

function HeroTitleB() {
  return (
    <>
      <span className="text-zepargn-orange">Z</span>’épargne. <span className="text-zepargn-orange">Z</span>
      ’investis.
      <br />
      <span className="text-zepargn-orange">Ze</span> réalise mes rêves, pas à pas.
    </>
  );
}

export function HeroTitleExperiment() {
  const [variant, setVariant] = useState<HeroTitleVariant>("a");

  useEffect(() => {
    setVariant(getExperimentVariant("hero_title"));
  }, []);

  if (variant === "b") {
    return <HeroTitleB />;
  }

  return <HeroTitleA />;
}

