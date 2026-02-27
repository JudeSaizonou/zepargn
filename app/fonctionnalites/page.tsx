import Link from "next/link";
import { Container } from "@/components/Container";
import { NAV_TABS } from "@/lib/navigation";

export const metadata = {
  title: "Fonctionnalités | Zepargn",
  description: "Explorez chaque fonctionnalité Zepargn avec un parcours clair et simple."
};

const featureTab = NAV_TABS.find((tab) => tab.id === "fonctionnalites");

export default function FonctionnalitesPage() {
  const items = featureTab?.items ?? [];

  return (
    <section className="pb-16 pt-28 sm:pb-20 sm:pt-32">
      <Container>
        <div className="max-w-4xl" data-reveal="">
          <p className="micro-accent text-zepargn-orange">Fonctionnalités</p>
          <h1 className="title-section mt-3 text-zepargn-navy">Choisissez votre parcours</h1>
          <p className="section-copy mt-4 max-w-3xl">
            Chaque page explique une fonctionnalité avec des mots simples: ce que c’est, comment ça marche et des
            exemples concrets.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3" data-reveal="" data-reveal-delay="60">
          {items.map((item) => (
            <article className="rounded-3xl bg-white p-6 shadow-soft" key={item.href}>
              <span className="type-kicker inline-flex rounded-full bg-[#F6F9FC] px-3 py-1 text-slate-600">
                {item.visualLabel}
              </span>
              <h2 className="type-h3 mt-3 text-zepargn-navy">{item.label}</h2>
              <p className="type-body mt-2 text-slate-700">{item.description}</p>
              <Link
                className="type-button mt-5 inline-flex min-h-11 items-center justify-center rounded-xl border border-zepargn-navy px-5 text-zepargn-navy transition-colors hover:bg-zepargn-navy hover:text-white"
                href={item.href}
              >
                Voir la page
              </Link>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
