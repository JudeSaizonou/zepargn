import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container";
import { DownloadButtons } from "@/components/DownloadButtons";
import { VideoBackdropSpot } from "@/components/VideoBackdropSpot";
import { KPI_ITEMS } from "@/data/site-content";
import { cn } from "@/lib/cn";

export const metadata = {
  title: "À propos | Zepargn",
  description: "Notre histoire, nos chiffres, notre approche sécurité et les moyens de contact Zepargn."
};

function hasPublicAsset(assetPath: string) {
  return fs.existsSync(path.join(process.cwd(), "public", assetPath.replace(/^\//, "")));
}

const ABOUT_VIDEO_CANDIDATE = "/videos/about-story.mp4";
const ABOUT_VIDEO_SRC = hasPublicAsset(ABOUT_VIDEO_CANDIDATE) ? ABOUT_VIDEO_CANDIDATE : undefined;
const KPI_DESCRIPTIONS = [
  "Des projets concrets validés chaque semaine par les utilisateurs.",
  "Un volume d'épargne qui finance études, activités et objectifs familiaux.",
  "Une communauté active qui progresse ensemble avec transparence."
];

export default function AProposPage() {
  return (
    <>
      <section className="anchor-section pb-10 pt-28 sm:pt-32" id="intro">
        <Container>
          <VideoBackdropSpot
            body="Une entreprise née au Bénin pour rendre l'épargne plus simple, plus claire et plus utile au quotidien."
            className="anchor-section"
            kicker="À propos"
            posterSrc="/hero-visual.svg"
            title="Nous aidons chacun à transformer de petits dépôts en vrais projets"
            videoSrc={ABOUT_VIDEO_SRC}
          >
            <DownloadButtons source="apropos_hero" tone="light" />
          </VideoBackdropSpot>
        </Container>
      </section>

      <section className="anchor-section pb-24 pt-12" id="histoire">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1.02fr_0.98fr]" data-reveal="">
            <div>
              <p className="section-kicker">Notre histoire</p>
              <h2 className="section-title mt-3">Pourquoi Zepargn existe</h2>
              <p className="section-copy mt-5 max-w-2xl">
                Nous avons observé une réalité simple: beaucoup de jeunes veulent épargner, mais l’information est
                souvent compliquée. Zepargn a été construit pour enlever cette friction.
              </p>
              <p className="section-copy mt-4 max-w-2xl">
                Notre approche: un parcours direct, des règles visibles, et un langage compréhensible sans jargon.
              </p>
            </div>

            <div className="relative lg:pt-10">
              <div aria-hidden="true" className="absolute -left-4 top-2 h-[78%] w-[85%] rounded-[2.1rem] bg-zepargn-sky/35" />
              <div className="relative overflow-hidden rounded-[2.2rem] bg-white shadow-[0_20px_46px_rgba(3,25,39,0.14)]">
                <Image
                  alt="Ancrage local de Zepargn au Bénin"
                  className="aspect-[16/10] w-full object-cover"
                  height={920}
                  sizes="(min-width: 1024px) 45rem, 100vw"
                  src="/hero-visual.svg"
                  width={1500}
                />
              </div>
              <p className="type-small mt-3 text-slate-500">Racines locales, ambition panafricaine.</p>
            </div>
          </div>

          <div className="mt-16 grid gap-10 lg:grid-cols-[0.7fr_1.3fr]" data-reveal="" data-reveal-delay="70">
            <p className="type-h2">Bénin, terrain d’origine et de confiance</p>
            <div className="space-y-4">
              <p className="section-copy">
                Notre équipe évolue au plus près des besoins réels des utilisateurs: étudiants, jeunes actifs, petits
                entrepreneurs.
              </p>
              <p className="section-copy">
                Zepargn avance avec une mission claire: rendre l’épargne plus accessible et créer un cadre de confiance
                durable.
              </p>
              <Link className="section-cta mt-2 border border-zepargn-navy text-zepargn-navy hover:bg-zepargn-navy hover:text-white" href="/conditions-utilisation">
                Lire nos engagements
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="anchor-section relative isolate overflow-hidden bg-[#F6F9FC] py-24" id="chiffres">
        <Container>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-16 top-10 h-52 w-52 rounded-full bg-zepargn-sky/30 blur-3xl"
            data-parallax-speed="0.07"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-14 bottom-4 h-44 w-44 rounded-full bg-zepargn-orange/12 blur-3xl"
            data-parallax-speed="0.1"
          />

          <div className="mx-auto max-w-3xl text-center" data-reveal="">
            <p className="section-kicker">Zepargn en chiffres</p>
            <h2 className="section-title mt-3">Des résultats visibles, construits pas à pas</h2>
            <p className="section-copy mt-4">
              Ces indicateurs montrent ce que les utilisateurs accomplissent concrètement avec Zepargn.
            </p>
          </div>

          <div className="relative mx-auto mt-16 max-w-6xl">
            <div
              aria-hidden="true"
              className="absolute bottom-3 left-4 top-2 w-px bg-gradient-to-b from-zepargn-orange via-zepargn-sky to-zepargn-navy sm:left-7 lg:left-1/2 lg:-translate-x-1/2"
            />

            <ol className="space-y-10 sm:space-y-14">
              {KPI_ITEMS.map((item, index) => {
                const isLeft = index % 2 === 0;

                return (
                  <li
                    className="relative pl-12 sm:pl-20 lg:pl-0"
                    data-reveal=""
                    data-reveal-delay={String(60 + index * 70)}
                    key={item.label}
                  >
                    <span
                      aria-hidden="true"
                      className="kpi-orb absolute left-[0.44rem] top-2 block h-3.5 w-3.5 rounded-full bg-zepargn-orange ring-4 ring-zepargn-orange/20 sm:left-[1.38rem] lg:left-1/2 lg:-translate-x-1/2"
                    />

                    <div className="lg:grid lg:grid-cols-2 lg:gap-16">
                      <article
                        className={cn(
                          "max-w-2xl border-b border-slate-300/85 pb-8",
                          isLeft ? "lg:justify-self-start lg:text-left" : "lg:col-start-2 lg:justify-self-end lg:text-left"
                        )}
                      >
                        <p className="type-metric text-zepargn-navy">{item.value}</p>
                        <p className="type-label mt-3 text-slate-500">{item.label}</p>
                        <p className="section-copy mt-4 text-slate-600">{KPI_DESCRIPTIONS[index]}</p>
                      </article>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </Container>
      </section>

      <section className="anchor-section py-24" id="securite">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr]" data-reveal="">
            <div>
              <p className="section-kicker">Sécurité</p>
              <h2 className="section-title mt-3">Un cadre simple pour protéger les utilisateurs</h2>
              <p className="section-copy mt-5 max-w-2xl">
                Nous expliquons clairement ce que nous protégeons, comment nous le faisons, et avec quel partenaire
                financier officiel.
              </p>

              <div className="mt-10 space-y-6">
                {[
                  "Partenaire financier officiel: AVM, SFD agréée (n°0094 – Arrêté 4583/MEFPD du 26/08/2015).",
                  "Services encadrés par la BCEAO et vérification d'identité selon les produits.",
                  "Conditions affichées avant chaque validation.",
                  "Support disponible pour sécuriser l'accès en cas de perte de téléphone."
                ].map((item) => (
                  <p className="section-copy border-t border-slate-300 pt-4" key={item}>
                    {item}
                  </p>
                ))}
              </div>
            </div>

            <div className="lg:pt-12">
              <div className="rounded-[2.2rem] bg-[#F6F9FC] p-6 sm:p-8">
                <p className="type-kicker text-slate-500">Partenaire financier officiel</p>
                <Image
                  alt="Logo partenaire AVM"
                  className="mt-5 h-24 w-auto object-contain"
                  height={110}
                  src="/logo-partenaire-avm.svg"
                  width={330}
                />
                <p className="section-copy mt-6">Transparence des règles, lisibilité des contrats et accompagnement support.</p>
                <a
                  className="section-cta mt-6 border border-zepargn-navy text-zepargn-navy hover:bg-zepargn-navy hover:text-white"
                  href="mailto:support@zepargn.com"
                >
                  support@zepargn.com
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="anchor-section bg-zepargn-navy py-24 text-white" id="contact">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]" data-reveal="">
            <div>
              <p className="section-kicker text-zepargn-sky">Contact</p>
              <h2 className="type-h2 mt-3">
                Une équipe disponible pour vous répondre
              </h2>
              <p className="type-body mt-5 max-w-xl text-slate-200">
                Besoin d’aide avant inscription, pendant l’utilisation, ou après une opération ? Nous sommes joignables
                rapidement.
              </p>

              <div className="type-body mt-8 space-y-3 text-slate-200">
                <p>
                  Email: <a className="font-semibold text-white underline-offset-2 hover:underline" href="mailto:support@zepargn.com">support@zepargn.com</a>
                </p>
                <p>
                  Téléphone: <a className="font-semibold text-white underline-offset-2 hover:underline" href="tel:+2290161382869">+229 01 61 38 28 69</a>
                </p>
                <p>Horaires: lundi à samedi, 8h00 - 19h00</p>
              </div>

              <div className="mt-8 max-w-[34rem]">
                <DownloadButtons source="apropos_contact" tone="light" />
              </div>
            </div>

            <div className="rounded-[2.1rem] bg-white p-6 text-zepargn-navy sm:p-8">
              <h3 className="type-h3">Formulaire de contact</h3>
              <form className="mt-6 space-y-4" noValidate>
                <div>
                  <label className="type-link mb-1 block" htmlFor="contact-nom">
                    Nom
                  </label>
                  <input
                    className="type-input h-11 w-full rounded-xl border border-slate-300 px-3 outline-none transition focus:border-zepargn-orange"
                    id="contact-nom"
                    name="nom"
                    placeholder="Votre nom"
                    type="text"
                  />
                </div>

                <div>
                  <label className="type-link mb-1 block" htmlFor="contact-email">
                    Email
                  </label>
                  <input
                    className="type-input h-11 w-full rounded-xl border border-slate-300 px-3 outline-none transition focus:border-zepargn-orange"
                    id="contact-email"
                    name="email"
                    placeholder="vous@email.com"
                    type="email"
                  />
                </div>

                <div>
                  <label className="type-link mb-1 block" htmlFor="contact-message">
                    Message
                  </label>
                  <textarea
                    className="type-input w-full rounded-xl border border-slate-300 px-3 py-2 outline-none transition focus:border-zepargn-orange"
                    id="contact-message"
                    name="message"
                    placeholder="Votre message"
                    rows={6}
                  />
                </div>

                <button
                  className="section-cta w-full bg-zepargn-orange text-white hover:bg-[#d84200]"
                  type="button"
                >
                  Envoyer
                </button>
              </form>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
