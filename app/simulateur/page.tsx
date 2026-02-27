import Link from "next/link";
import { Container } from "@/components/Container";
import { SimulatorCalculator } from "@/components/SimulatorCalculator";

export const metadata = {
  title: "Simulateur | Zepargn",
  description: "Estimez votre épargne Zepargn en quelques secondes."
};

export default function SimulateurPage() {
  return (
    <section className="relative isolate overflow-hidden pb-12 pt-28 sm:pb-16 sm:pt-32">
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
          <p className="micro-accent text-zepargn-orange">Simulateur Zepargn</p>
          <h1 className="title-section mt-3 text-zepargn-navy">Estimez votre épargne en quelques secondes</h1>
          <p className="section-copy mt-4">
            Ajustez votre montant, votre dépôt mensuel et la durée Z-Lock. Consultez ensuite le tableau des taux de
            référence en bas de page.
          </p>
        </div>

        <SimulatorCalculator />

        <div className="mt-10 rounded-2xl bg-zepargn-sky/30 p-6" data-reveal="" data-reveal-delay="120">
          <h2 className="type-h3 text-zepargn-navy">Passez à l’action</h2>
          <p className="section-copy mt-2">
            Le simulateur vous donne une estimation. Vous pouvez ensuite ajuster votre plan avant de démarrer.
          </p>
          <Link
            aria-label="Voir la FAQ Zepargn"
            className="type-button mt-4 inline-flex min-h-11 items-center justify-center rounded-xl border border-zepargn-navy px-5 text-zepargn-navy transition-colors hover:bg-zepargn-navy hover:text-white sm:min-h-14 sm:px-7"
            href="/faq"
          >
            Voir la FAQ
          </Link>
        </div>
      </Container>
    </section>
  );
}
