import Link from "next/link";
import { Container } from "@/components/Container";
import { BudgetCalculator } from "@/components/BudgetCalculator";

export const metadata = {
  title: "Calculateur de budget | Zepargn",
  description:
    "Planifiez vos revenus et dépenses mensuels, puis visualisez votre flux financier en temps réel."
};

export default function BudgetPage() {
  return (
    <section className="relative isolate overflow-hidden pb-12 pt-28 sm:pb-16 sm:pt-32">
      {/* Decorative blobs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute -left-20 top-20 h-56 w-56 rounded-full bg-zepargn-sky/25 blur-3xl sm:h-72 sm:w-72"
          data-parallax-speed="0.06"
        />
        <div
          className="absolute -right-20 bottom-20 h-56 w-56 rounded-full bg-zepargn-orange/10 blur-3xl sm:h-72 sm:w-72"
          data-parallax-speed="0.1"
        />
      </div>

      <Container>
        <div className="mb-8 max-w-3xl" data-reveal="">
          <p className="micro-accent text-zepargn-orange">Ressources utiles</p>
          <h1 className="title-section mt-3 text-zepargn-navy">
            Calculateur de budget mensuel
          </h1>
          <p className="section-copy mt-4">
            Renseignez vos revenus et vos dépenses par catégorie. Le graphique se met à jour
            instantanément pour vous montrer où va votre argent et ce qu&apos;il vous reste.
          </p>
        </div>

        <BudgetCalculator />

        <div
          className="mt-10 rounded-2xl bg-zepargn-sky/30 p-6"
          data-reveal=""
          data-reveal-delay="140"
        >
          <h2 className="type-h3 text-zepargn-navy">Passez à l&apos;étape suivante</h2>
          <p className="section-copy mt-2">
            Ce calculateur est un point de départ. Utilisez ensuite le simulateur Z-Lock pour
            projeter la croissance de votre épargne dans le temps.
          </p>
          <Link
            aria-label="Accéder au simulateur Zepargn"
            className="type-button mt-4 inline-flex min-h-11 items-center justify-center rounded-xl border border-zepargn-navy px-5 text-zepargn-navy transition-colors hover:bg-zepargn-navy hover:text-white sm:min-h-14 sm:px-7"
            href="/simulateur"
          >
            Voir le simulateur
          </Link>
        </div>
      </Container>
    </section>
  );
}
