import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container";
import { DownloadButtons } from "@/components/DownloadButtons";
import { FAQAccordion } from "@/components/FAQAccordion";
import { FeatureBlock } from "@/components/FeatureBlock";
import { HeroTitleExperiment } from "@/components/HeroTitleExperiment";
import { KpiCounter } from "@/components/KpiCounter";
import { MediaQuoteCard } from "@/components/MediaQuoteCard";
import { FAQ_PREVIEW, KPI_ITEMS, MEDIA_QUOTES, RATE_PREVIEW } from "@/data/site-content";

const HERO_VIDEO_DESKTOP_URL = "/hero-bg.mp4";
const HERO_VIDEO_MOBILE_CANDIDATE = "/hero-bg-mobile.mp4";
const SIMULATOR_PREVIEW_MOBILE_CANDIDATE = "/simulateur-preview-mobile.png";

function hasPublicAsset(assetPath: string) {
  return fs.existsSync(path.join(process.cwd(), "public", assetPath.replace(/^\//, "")));
}

const HERO_VIDEO_MOBILE_URL = hasPublicAsset(HERO_VIDEO_MOBILE_CANDIDATE)
  ? HERO_VIDEO_MOBILE_CANDIDATE
  : HERO_VIDEO_DESKTOP_URL;
const SIMULATOR_PREVIEW_MOBILE_URL = hasPublicAsset(SIMULATOR_PREVIEW_MOBILE_CANDIDATE)
  ? SIMULATOR_PREVIEW_MOBILE_CANDIDATE
  : "/feature-personal.svg";

export default function HomePage() {
  return (
    <>
      <section
        className="relative isolate flex min-h-[100svh] items-end overflow-hidden pb-12 pt-28 sm:items-center sm:pb-16 sm:pt-32"
        data-reveal=""
        data-funnel-step="hero"
      >
        <div className="absolute inset-0 -z-10">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[url('/hero-visual.svg')] bg-cover bg-center bg-no-repeat"
          />
          <video
            aria-hidden="true"
            autoPlay
            className="hero-video absolute inset-0 h-full w-full object-cover"
            loop
            muted
            playsInline
            preload="metadata"
          >
            <source media="(max-width: 767px)" src={HERO_VIDEO_MOBILE_URL} type="video/mp4" />
            <source src={HERO_VIDEO_DESKTOP_URL} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-zepargn-navy/65" />
        </div>

        <Container>
          <div className="mx-auto flex w-full max-w-5xl flex-col items-center text-center">
            <div className="space-y-4 sm:space-y-6">
              <p className="micro-accent text-zepargn-sky">Construisez votre avenir pas à pas</p>
              <h1 className="title-display mx-auto max-w-[19ch] text-white">
                <HeroTitleExperiment />
              </h1>
              <p className="type-body-lg mx-auto max-w-[42ch] break-words text-slate-200">
                Une appli simple pour épargner seul ou en groupe, suivre vos progrès et atteindre vos projets.
              </p>
            </div>

            <div className="mt-8 w-full max-w-2xl sm:mt-12 lg:mt-14" id="hero-download">
              <DownloadButtons className="sm:justify-center" source="hero" tone="light" />
            </div>

            <div className="mt-9 grid w-full max-w-5xl gap-3 sm:mt-12 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
              {KPI_ITEMS.map((item, index) => (
                <article
                  className="min-w-0 flex min-h-[74px] flex-col items-center justify-center rounded-2xl border border-white/25 bg-white/10 px-4 py-2 text-center backdrop-blur-sm shadow-[0_10px_26px_rgba(3,25,39,0.15)] sm:min-h-[112px] sm:px-5 sm:py-3 lg:min-h-[118px]"
                  key={item.label}
                >
                  <KpiCounter
                    className="w-full whitespace-nowrap text-center text-[clamp(1.2rem,2.4vw,1.75rem)] font-bold leading-none tracking-[-0.02em] text-white"
                    delayMs={index * 120}
                    value={item.value}
                  />
                  <p className="mt-1 max-w-[26ch] text-center text-[clamp(0.72rem,0.76vw,0.86rem)] font-semibold leading-tight tracking-[0.06em] text-slate-200">
                    {item.label}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white py-4 sm:py-5 lg:py-6" data-reveal="" data-funnel-step="trust">
        <Container>
          <div className="mx-auto flex max-w-5xl items-center justify-center rounded-2xl border border-slate-200 bg-[#F6F9FC] px-4 py-3 text-center shadow-[0_10px_24px_rgba(3,25,39,0.06)] sm:px-6 sm:py-4 lg:min-h-[96px] lg:px-8">
            <p className="type-small break-words text-slate-700">
              <span className="font-semibold text-zepargn-navy">Partenaire financier officiel:</span> AVM, SFD agréée
              (n°0094 – Arrêté 4583/MEFPD du 26/08/2015), services encadrés par la BCEAO, vérification d’identité
              requise, fonds sécurisés.
            </p>
          </div>
        </Container>
      </section>

      <FeatureBlock
        id="fonctionnalites"
        kicker="Fonctionnalité"
        mediaAlt="Épargne solo Zepargn"
        mediaClassName="aspect-[4/3] object-top"
        mediaSrc="/epargne-simple.png"
        modalContent={
          <>
            <p>Vous épargnez à votre rythme pour un objectif personnel. Votre argent reste sous votre contrôle.</p>
            <div>
              <p className="type-h3 text-zepargn-navy">Concrètement</p>
              <ul className="mt-3 space-y-2">
                {[
                  "Vous créez un objectif simple (voyage, projet, imprévu)",
                  "Vous déposez quand vous voulez, selon vos moyens",
                  "Deux gardiens valident chaque retrait avec vous"
                ].map((item) => (
                  <li className="flex items-start gap-2" key={item}>
                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 rounded-full bg-zepargn-orange" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="type-small text-slate-500">
              Vous voyez chaque mouvement dans l’application: clair, simple et sécurisé.
            </p>
          </>
        }
        modalTitle="Épargne solo"
        title="Épargne solo"
        whatIs="Un espace personnel pour mettre de l'argent de côté à votre rythme. Pour sécuriser votre épargne, vous choisissez deux personnes de confiance qui valident les retraits avec vous, comme deux clés pour ouvrir un coffre."
      />

      <FeatureBlock
        className="bg-zepargn-sky/30"
        kicker="Fonctionnalité"
        mediaAlt="Épargne en groupe Zepargn"
        mediaClassName="aspect-[4/3] object-top"
        mediaSrc="/epargne-collective.png"
        modalContent={
          <>
            <p>Vous épargnez à plusieurs pour un objectif commun, avec des règles définies dès le début.</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <article className="rounded-xl border border-slate-200 bg-[#F6F9FC] p-4">
                <p className="type-h3 text-zepargn-navy">Groupe public ou privé</p>
                <p className="type-body mt-2">
                  Public pour ouvrir le groupe à de nouveaux membres, privé pour garder l’accès réservé.
                </p>
              </article>
              <article className="rounded-xl border border-slate-200 bg-[#F6F9FC] p-4">
                <p className="type-h3 text-zepargn-navy">Règles de retrait</p>
                <p className="type-body mt-2">
                  Un admin pilote le groupe. Les retraits suivent les règles validées par les membres.
                </p>
              </article>
            </div>
            <div>
              <p className="type-h3 text-zepargn-navy">Pourquoi c’est utile</p>
              <ul className="mt-3 space-y-2">
                {[
                  "Tout le monde voit l’avancement de l’objectif",
                  "Le groupe motive chacun à continuer",
                  "Les contributions restent visibles et transparentes"
                ].map((item) => (
                  <li className="flex items-start gap-2" key={item}>
                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 rounded-full bg-zepargn-orange" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <a
              aria-label="Voir comment ça marche"
              className="type-button inline-flex min-h-11 items-center justify-center rounded-xl border border-zepargn-navy px-5 text-zepargn-navy transition-colors hover:bg-zepargn-navy hover:text-white sm:min-h-14 sm:px-7"
              href="#comment-marche"
            >
              Voir comment ça marche
            </a>
          </>
        }
        modalTitle="Épargne en groupe"
        reverse
        title="Épargne en groupe"
        whatIs="Épargnez ensemble, en famille ou entre amis, dans un coffre commun. Les règles de fonctionnement sont définies dès le départ pour que tout soit clair pour tout le monde."
      />

      <FeatureBlock
        id="taux"
        kicker="Produit"
        highlight={
          <>
            <div className="type-link inline-flex rounded-full bg-zepargn-sky px-4 py-1.5 text-zepargn-navy">
              Jusqu’à 7% / an en épargnant
            </div>
            <p className="type-small mt-2 text-slate-500">*Selon le produit choisi et la durée.</p>
          </>
        }
        mediaAlt="Épargne rémunérée Z-lock Zepargn"
        mediaClassName="aspect-[4/3] object-top"
        mediaSrc="/epargne-remuneree-zlock.png"
        modalContent={
          <>
            <p>Vous bloquez une somme pendant une durée choisie. Le taux est connu avant validation.</p>
            <div>
              <p className="type-h3 text-zepargn-navy">À retenir</p>
              <ul className="mt-3 space-y-2">
                {[
                  "Plus la durée est longue, plus le gain potentiel peut monter",
                  "Un retrait avant la fin peut supprimer les intérêts",
                  "Vérification d'identité requise pour activer le produit"
                ].map((item) => (
                  <li className="flex items-start gap-2" key={item}>
                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 rounded-full bg-zepargn-orange" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="overflow-hidden rounded-xl border border-slate-200">
              <table className="type-table w-full border-collapse text-left">
                <caption className="type-link bg-[#F6F9FC] px-4 py-3 text-left text-zepargn-navy">
                  Aperçu des taux Z-Lock
                </caption>
                <thead className="bg-white">
                  <tr>
                    <th className="px-4 py-2 font-semibold text-slate-700">Durée</th>
                    <th className="px-4 py-2 font-semibold text-slate-700">Taux</th>
                  </tr>
                </thead>
                <tbody>
                  {RATE_PREVIEW.map((rate) => (
                    <tr className="border-t border-slate-200" key={rate.duree}>
                      <td className="px-4 py-2 text-slate-700">{rate.duree}</td>
                      <td className="px-4 py-2 font-semibold text-zepargn-navy">{rate.taux}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Link
              aria-label="Accéder au simulateur"
              className="type-button inline-flex min-h-11 items-center justify-center rounded-xl border border-zepargn-navy px-5 text-zepargn-navy transition-colors hover:bg-zepargn-navy hover:text-white sm:min-h-14 sm:px-7"
              href="/simulateur"
            >
              Simuler
            </Link>
          </>
        }
        modalTitle="Épargne bloquée, jusqu'à 7% par an"
        title="Épargne bloquée, jusqu'à 7% par an"
        whatIs="Bloquez votre argent sur une durée fixe et gagnez des intérêts pour atteindre vos objectifs. Plus vous épargnez longtemps, plus vous gagnez. Le taux varie entre 3% et 7% selon la durée choisie."
      />

      <FeatureBlock
        className="bg-zepargn-sky/20"
        kicker="Produit"
        mediaAlt="Microcrédit Z-flex Zepargn"
        mediaClassName="aspect-[4/3] object-top"
        mediaSrc="/microcredit-zflex.png"
        modalContent={
          <>
            <p>
              Besoin d’un coup de pouce rapide? Vous choisissez un montant, vous voyez les conditions, puis vous
              validez.
            </p>
            <div>
              <p className="type-h3 text-zepargn-navy">À retenir</p>
              <ul className="mt-3 space-y-2">
                {[
                  "Montant et remboursement affichés avant confirmation",
                  "Remboursement anticipé possible sans frais cachés",
                  "Suivi des échéances dans l’application"
                ].map((item) => (
                  <li className="flex items-start gap-2" key={item}>
                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 rounded-full bg-zepargn-orange" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        }
        modalTitle="Microcrédit (Z-flex)"
        reverse
        title="Microcrédit (Z-flex)"
        whatIs="Besoin d'un coup de pouce ponctuel ? Obtenez un crédit simple, avec un montant et un remboursement clairs dès le départ. Pas de mauvaises surprises."
      />

      <section
        className="section-space-standard relative isolate overflow-hidden bg-[#F6F9FC]"
        data-reveal=""
        data-funnel-step="how_it_works"
        id="comment-marche"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div
            className="absolute -left-16 top-10 h-52 w-52 rounded-full bg-zepargn-sky/30 blur-3xl sm:h-64 sm:w-64"
            data-parallax-speed="0.06"
          />
          <div
            className="absolute -right-12 bottom-0 h-48 w-48 rounded-full bg-zepargn-orange/10 blur-3xl sm:h-60 sm:w-60"
            data-parallax-speed="0.1"
          />
        </div>

        <Container>
          <p className="micro-accent text-zepargn-orange">Comment ça marche</p>
          <h2 className="title-section mt-3 max-w-3xl text-zepargn-navy">3 étapes pour commencer sans stress</h2>
          <div className="mt-8 px-1">
            <div className="relative">
              <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-6">
                {[
                  {
                    title: "Créez un compte en quelques secondes",
                    body: "Avec votre numéro de téléphone et choisissez votre premier objectif.",
                    imageSrc: "/comment-marche-1.png",
                    imageAlt: "Création de compte Zepargn",
                    badgeClass: "bg-zepargn-orange text-white"
                  },
                  {
                    title: "Faites votre premier dépôt en toute sécurité",
                    body: "Avec Mobile Money ou carte bancaire en toute sécurité.",
                    imageSrc: "/comment-marche-2.png",
                    imageAlt: "Premier dépôt Zepargn",
                    badgeClass: "bg-zepargn-navy text-white"
                  },
                  {
                    title: "Suivez et atteignez vos objectifs",
                    body:
                      "Recevez des rappels pour épargner, visualisez votre progression, ajustez si besoin et célébrez chaque objectif atteint.",
                    imageSrc: "/comment-marche-3.png",
                    imageAlt: "Suivi des objectifs Zepargn",
                    badgeClass: "bg-zepargn-orange text-white"
                  }
                ].map((step, index) => (
                  <article
                    className="relative isolate min-h-[20rem] overflow-hidden rounded-[1.8rem] border border-slate-200/80 shadow-[0_20px_44px_rgba(3,25,39,0.14)] sm:min-h-[22rem] lg:min-h-[26rem]"
                    key={step.title}
                  >
                    <div className="absolute inset-0">
                      <Image
                        alt={step.imageAlt}
                        className="object-cover"
                        fill
                        priority={index === 0}
                        sizes="(min-width: 1280px) 30rem, (min-width: 1024px) 32vw, 100vw"
                        src={step.imageSrc}
                      />
                    </div>
                    <div aria-hidden="true" className="absolute inset-0 bg-zepargn-navy/35" />

                    <div className="relative z-10 flex h-full flex-col justify-end p-4 sm:p-5 lg:p-6">
                      <div className="min-w-0 rounded-2xl border border-white/20 bg-[#031927]/72 p-4 text-left backdrop-blur-[1px] sm:p-5">
                        <p className={`type-small inline-flex h-8 min-w-8 items-center justify-center rounded-full px-2 font-bold ${step.badgeClass}`}>
                          {index + 1}
                        </p>
                        <h3 className="type-h3 mt-3 break-words text-white">{step.title}</h3>
                        <p className="type-body mt-2 break-words text-slate-100">{step.body}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-space-standard relative isolate overflow-hidden bg-[#F6F9FC]" data-reveal="">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div
            className="absolute -right-20 top-8 h-56 w-56 rounded-full bg-zepargn-sky/25 blur-3xl sm:h-72 sm:w-72"
            data-parallax-speed="0.08"
          />
          <div
            className="absolute -left-12 bottom-4 h-40 w-40 rounded-full bg-zepargn-orange/10 blur-3xl sm:h-52 sm:w-52"
            data-parallax-speed="0.12"
          />
        </div>

        <Container>
          <p className="micro-accent text-zepargn-orange">Engagement</p>
          <h2 className="title-section mt-3 max-w-3xl text-zepargn-navy">Restez motivés jusqu’à votre objectif</h2>

          <div className="mt-12">
            <div className="grid gap-10 md:grid-cols-3 md:gap-12">
            {[
              {
                title: "Challenges",
                text: "Des mini-défis à relever pour garder une bonne habitude d'épargne.",
                why: "Chaque défi accompli vous rapproche de votre objectif."
              },
              {
                title: "Points de fidélité",
                text: "Chaque dépôt respecté vous rapporte des points.",
                why: "Un moyen simple de voir vos efforts récompensés et de rester sur la bonne voie."
              },
              {
                title: "Parrainage",
                text: "Invitez un proche et épargnez ensemble.",
                why: "On tient mieux ses engagements quand on n'est pas seul."
              }
            ].map((item) => (
              <article
                className="min-w-0"
                key={item.title}
              >
                <h3 className="type-h3 mt-2 break-words text-zepargn-navy">{item.title}</h3>
                <p className="type-body mt-2 break-words text-slate-700">{item.text}</p>
                <p className="type-small mt-3 break-words text-slate-600">{item.why}</p>
              </article>
            ))}
            </div>
          </div>

        </Container>
      </section>

      <section
        className="section-space-standard relative isolate overflow-hidden"
        data-reveal=""
        data-funnel-step="simulateur_teaser"
        id="simulateur"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div
            className="absolute -left-12 top-12 h-44 w-44 rounded-full bg-zepargn-sky/20 blur-3xl sm:h-56 sm:w-56"
            data-parallax-speed="0.07"
          />
          <div
            className="absolute right-10 bottom-0 h-36 w-36 rounded-full bg-zepargn-orange/10 blur-3xl sm:h-48 sm:w-48"
            data-parallax-speed="0.11"
          />
        </div>

        <Container>
          <div className="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12">
            <div className="text-left">
              <p className="micro-accent text-zepargn-orange">Simulateur</p>
              <h2 className="type-h2 mt-3 text-zepargn-navy">
                Testez votre plan d’épargne en 30 secondes
              </h2>
              <p className="section-copy mt-4 max-w-2xl">
                Entrez votre montant, choisissez une durée, puis voyez une estimation simple de votre résultat.
              </p>
              <Link
                aria-label="Accéder à la page simulateur"
                className="type-button mt-6 inline-flex min-h-11 items-center justify-center rounded-xl bg-zepargn-orange px-5 text-zepargn-navy transition-colors hover:bg-[#d84200] hover:text-white sm:min-h-14 sm:px-7"
                href="/simulateur"
              >
                Ouvrir le simulateur
              </Link>
            </div>

            <div data-reveal="" data-reveal-delay="60">
              <Image
                alt="Aperçu mobile du simulateur Zepargn"
                className="h-auto w-full object-cover"
                height={1180}
                quality={100}
                sizes="(min-width: 1024px) 48rem, (min-width: 768px) 75vw, 92vw"
                src={SIMULATOR_PREVIEW_MOBILE_URL}
                width={720}
              />
            </div>
          </div>
        </Container>
      </section>

      <section
        className="section-space-standard relative isolate overflow-hidden bg-zepargn-sky"
        data-reveal=""
        data-funnel-step="proof"
        id="medias"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div
            className="absolute -left-16 top-10 h-52 w-52 rounded-full bg-zepargn-sky/30 blur-3xl sm:h-64 sm:w-64"
            data-parallax-speed="0.06"
          />
          <div
            className="absolute -right-12 bottom-0 h-48 w-48 rounded-full bg-zepargn-orange/10 blur-3xl sm:h-60 sm:w-60"
            data-parallax-speed="0.1"
          />
        </div>

        <Container>
          <p className="micro-accent text-zepargn-orange">Ils Parlent de Nous</p>
          <h2 className="title-section mt-3 text-zepargn-navy">Ils Parlent de Nous</h2>
          <p className="section-copy mt-2">Zepargn dans les médias</p>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {MEDIA_QUOTES.map((item) => (
              <MediaQuoteCard
                href={item.href}
                key={item.source}
                linkLabel={item.linkLabel}
                quote={item.quote}
                source={item.source}
              />
            ))}
          </div>
        </Container>
      </section>

      <section
        className="section-space-standard relative isolate overflow-hidden"
        data-reveal=""
        data-funnel-step="faq"
        id="faq"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div
            className="absolute -left-16 bottom-0 h-44 w-44 rounded-full bg-zepargn-sky/20 blur-3xl sm:h-56 sm:w-56"
            data-parallax-speed="0.06"
          />
        </div>

        <Container>
          <div className="mx-auto w-full max-w-4xl text-center">
            <p className="micro-accent text-zepargn-orange">FAQ</p>
            <h2 className="title-section mt-3 text-zepargn-navy">Questions fréquentes</h2>
            <p className="section-copy mx-auto mt-2 max-w-2xl">Les réponses essentielles avant de commencer.</p>

            <div className="mt-8 text-left">
              <FAQAccordion items={FAQ_PREVIEW} />
            </div>

            <Link
              aria-label="Voir toute la FAQ"
              className="type-button mt-8 inline-flex min-h-11 items-center justify-center rounded-xl border border-zepargn-navy px-5 text-zepargn-navy transition-colors hover:bg-zepargn-navy hover:text-white sm:min-h-14 sm:px-7"
              href="/faq"
            >
              Voir toute la FAQ
            </Link>
          </div>
        </Container>
      </section>

      <section
        className="section-space-standard relative isolate overflow-hidden bg-white"
        data-reveal=""
        data-funnel-step="final_cta"
        id="cta-download"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div
            className="absolute -left-16 top-10 h-52 w-52 rounded-full bg-zepargn-sky/30 blur-3xl sm:h-64 sm:w-64"
            data-parallax-speed="0.06"
          />
          <div
            className="absolute -right-12 bottom-0 h-48 w-48 rounded-full bg-zepargn-orange/10 blur-3xl sm:h-60 sm:w-60"
            data-parallax-speed="0.1"
          />
        </div>

        <Container>
          <div className="max-w-3xl">
            <p className="micro-accent text-zepargn-orange">Prêt à passer à l’action ?</p>
            <h2 className="type-h1 mt-4 text-zepargn-navy">
              Téléchargez Zepargn et commencez aujourd’hui
            </h2>
            <p className="type-body-lg mt-4 text-slate-800">
              <span className="text-zepargn-orange">Z</span>’épargne. <span className="text-zepargn-orange">Z</span>
              ’investis. <span className="text-zepargn-orange">Ze</span> réalise mes rêves.
            </p>
            <DownloadButtons className="mt-8 max-w-2xl" source="footer_cta" tone="default" />
          </div>
        </Container>
      </section>
    </>
  );
}
