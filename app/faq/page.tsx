import { Container } from "@/components/Container";
import { DownloadButtons } from "@/components/DownloadButtons";
import { FAQAccordion } from "@/components/FAQAccordion";
import { FAQ_FULL } from "@/data/site-content";

export const metadata = {
  title: "FAQ | Zepargn",
  description: "Questions fréquentes sur Zepargn, ses services et son fonctionnement."
};

export default function FAQPage() {
  return (
    <>
      <section className="pb-12 pt-28 sm:pb-16 sm:pt-32">
        <Container>
          <div className="mx-auto max-w-4xl text-center" data-reveal="">
            <p className="section-kicker">FAQ</p>
            <h1 className="type-h1 mt-3 text-zepargn-navy">
              Réponses claires avant de commencer
            </h1>
            <p className="section-copy mx-auto mt-5 max-w-2xl">
              Tout ce qu’il faut savoir sur Zepargn, avec un langage simple et direct.
            </p>
          </div>
        </Container>
      </section>

      <section className="pb-16">
        <Container>
          <div className="mx-auto max-w-4xl" data-reveal="" data-reveal-delay="60">
            <FAQAccordion items={FAQ_FULL} />
          </div>
        </Container>
      </section>

      <section className="bg-[#F6F9FC] py-20">
        <Container>
          <div className="mx-auto max-w-4xl text-center" data-reveal="">
            <h2 className="section-title">Toujours une question ?</h2>
            <p className="section-copy mx-auto mt-4 max-w-2xl">
              Écrivez-nous directement, ou téléchargez l’application pour découvrir le parcours complet.
            </p>
            <div className="mt-8 flex w-full flex-col items-stretch gap-3 sm:items-center">
              <a className="section-cta w-full border border-zepargn-navy text-zepargn-navy hover:bg-zepargn-navy hover:text-white sm:w-auto" href="mailto:support@zepargn.com">
                Nous écrire
              </a>
              <DownloadButtons source="faq_footer" />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
