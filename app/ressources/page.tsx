import Link from "next/link";
import { Container } from "@/components/Container";
import { NAV_TABS } from "@/lib/navigation";

export const metadata = {
  title: "Ressources | Zepargn",
  description: "Guides, nouveautés, FAQ et simulateur pour mieux utiliser Zepargn."
};

const resourcesTab = NAV_TABS.find((tab) => tab.id === "ressources");

export default function RessourcesPage() {
  const items = resourcesTab?.items ?? [];

  return (
    <section className="pb-20 pt-28 sm:pb-24 sm:pt-32">
      <Container>
        <div className="max-w-4xl" data-reveal="">
          <p className="section-kicker">Ressources</p>
          <h1 className="type-h1 mt-3 text-zepargn-navy">
            Le bon contenu, au bon moment
          </h1>
          <p className="section-copy mt-5 max-w-3xl">
            Choisissez une ressource selon votre besoin: apprendre, vérifier une réponse, ou tester un scénario.
          </p>
        </div>

        <div className="mt-14 divide-y divide-slate-200 border-y border-slate-200" data-reveal="" data-reveal-delay="60">
          {items.map((item) => (
            <article className="py-6 sm:py-8" key={item.href}>
              <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
                <div>
                  <p className="type-kicker text-slate-500">{item.visualLabel}</p>
                  <h2 className="type-h3 mt-2 text-zepargn-navy">{item.label}</h2>
                  <p className="section-copy mt-2 max-w-2xl">{item.description}</p>
                </div>
                <Link
                  className="section-cta border border-zepargn-navy text-zepargn-navy hover:bg-zepargn-navy hover:text-white"
                  href={item.href}
                >
                  Ouvrir
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
