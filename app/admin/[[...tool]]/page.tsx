"use client";

import { useEffect } from "react";
import { NextStudio } from "next-sanity/studio";
import config from "../../../sanity.config";
import { hasSanityConfig } from "@/sanity/env";

export default function StudioPage() {
  useEffect(() => {
    document.body.classList.add("studio-route");

    return () => {
      document.body.classList.remove("studio-route");
    };
  }, []);

  if (!hasSanityConfig) {
    return (
      <div className="min-h-screen bg-white">
        <section className="mx-auto max-w-3xl px-4 pb-16 pt-12 sm:px-6 sm:pt-16">
          <h1 className="type-h2 text-zepargn-navy">Sanity Studio non configuré</h1>
          <p className="type-body mt-4 text-slate-700">
            Ajoutez les variables suivantes pour activer l’éditeur:
          </p>
          <div className="mt-6 rounded-2xl bg-[#F6F9FC] p-5">
            <code className="type-small block whitespace-pre-wrap text-slate-700">
              NEXT_PUBLIC_SANITY_PROJECT_ID=...
              {"\n"}NEXT_PUBLIC_SANITY_DATASET=production
              {"\n"}NEXT_PUBLIC_SANITY_API_VERSION=2025-01-01
            </code>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white" data-studio-route="">
      <NextStudio config={config} />
    </div>
  );
}
