import Link from "next/link";
import { Container } from "@/components/Container";

export const metadata = {
  title: "Produits | Zepargn",
  description: "Découvrez les produits Zepargn selon votre besoin: épargne bloquée, souplesse, groupe et objectifs."
};

const products = [
  {
    label: "Z-Lock (Taux & Durées)",
    description: "Bloquer une épargne sur une durée choisie pour viser un meilleur rendement.",
    href: "/produits/z-lock"
  },
  {
    label: "Z-Flex (Souplesse)",
    description: "Un microcrédit simple pour un besoin ponctuel, avec conditions claires.",
    href: "/produits/z-flex"
  },
  {
    label: "Épargne en groupe",
    description: "Construire un objectif collectif avec des règles transparentes.",
    href: "/produits/groupes"
  },
  {
    label: "Objectifs & Projets",
    description: "Planifier un objectif personnel étape par étape.",
    href: "/produits/objectifs"
  }
] as const;

export default function ProduitsPage() {
  return (
    <section className="pb-16 pt-28 sm:pb-20 sm:pt-32">
      <Container>
        <div className="max-w-4xl" data-reveal="">
          <p className="micro-accent text-zepargn-orange">Produits</p>
          <h1 className="title-section mt-3 text-zepargn-navy">Des produits clairs pour des besoins réels</h1>
          <p className="section-copy mt-4 max-w-3xl">
            Cette page reste disponible pour comparer l’offre complète de Zepargn.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2" data-reveal="" data-reveal-delay="60">
          {products.map((item) => (
            <article className="rounded-3xl bg-white p-6 shadow-soft" key={item.href}>
              <h2 className="type-h3 text-zepargn-navy">{item.label}</h2>
              <p className="type-body mt-3 text-slate-700">{item.description}</p>
              <Link
                className="type-button mt-6 inline-flex min-h-11 items-center justify-center rounded-xl bg-zepargn-orange px-5 text-white transition-colors hover:bg-[#d84200] sm:min-h-12 sm:px-6"
                href={item.href}
              >
                Voir le détail
              </Link>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
