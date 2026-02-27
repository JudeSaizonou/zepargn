import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { DownloadButtons } from "@/components/DownloadButtons";
import { VideoBackdropSpot } from "@/components/VideoBackdropSpot";

type FeatureExample = {
  persona: string;
  title: string;
  text: string;
};

type FeaturePage = {
  slug: string;
  title: string;
  heroLine: string;
  whatIs: string;
  whatYouGet: string[];
  howItWorks: string[];
  howItWorksDetails?: string[];
  examples: FeatureExample[];
  trustTitle: string;
  trustBody: string;
  trustPoints: string[];
  visual: {
    src: string;
    alt: string;
    caption: string;
  };
};

const FEATURE_PAGES: FeaturePage[] = [
  {
    slug: "epargne-personnelle",
    title: "Épargne personnelle",
    heroLine: "Un espace simple pour mettre de côté selon votre rythme.",
    whatIs:
      "Vous définissez un objectif, vous déposez quand vous pouvez, et vous suivez votre progression en temps réel.",
    whatYouGet: [
      "Un montant cible pour savoir exactement où vous allez.",
      "Un suivi visuel pour voir votre progression d'un coup d'œil.",
      "Des rappels pour ne jamais rater un dépôt.",
      "Un historique clair de tous vos mouvements.",
      "Deux personnes de confiance que vous choisissez pour sécuriser vos retraits."
    ],
    howItWorks: [
      "Créez votre objectif en quelques secondes",
      "Faites votre premier dépôt",
      "Suivez votre avancée et ajustez si besoin"
    ],
    howItWorksDetails: [
      "Donnez un nom à votre objectif, fixez le montant, et c'est parti. Tout se configure depuis l'application en moins d'une minute.",
      "Choisissez le moyen de paiement qui vous convient et déposez en toute simplicité. Chaque dépôt compte.",
      "Votre progression se met à jour en temps réel. Vous pouvez changer votre rythme à tout moment selon votre situation."
    ],
    examples: [
      {
        persona: "Étudiant",
        title: "Préparer les frais de rentrée",
        text: "Fatou met 10 000 FCFA par semaine et couvre ses dépenses de rentrée sans stress."
      },
      {
        persona: "Jeune actif",
        title: "Construire une réserve d'urgence",
        text: "Yann programme un dépôt mensuel pour gérer les imprévus plus sereinement."
      },
      {
        persona: "Petit commerce",
        title: "Renouveler son stock",
        text: "Aïcha met de côté chaque semaine pour acheter du stock au bon moment."
      }
    ],
    trustTitle: "Un cadre clair à chaque étape",
    trustBody: "Conditions affichées avant validation, suivi transparent et support disponible en cas de besoin.",
    trustPoints: [
      "Vérification d'identité selon les services utilisés.",
      "Historique des opérations visible dans l'application.",
      "Support accessible si vous perdez votre téléphone."
    ],
    visual: {
      src: "/epargne-simple.png",
      alt: "Aperçu de l'épargne personnelle",
      caption: "Vue de l'espace épargne personnelle"
    }
  },
  {
    slug: "epargne-collective",
    title: "Épargne collective",
    heroLine: "Épargnez à plusieurs avec des règles visibles pour tout le monde.",
    whatIs:
      "Vous créez un groupe public ou privé, vous fixez les règles et chaque membre suit la cagnotte commune.",
    whatYouGet: [
      "Un objectif partagé entre proches.",
      "Des contributions visibles en temps réel.",
      "Un cadre simple piloté par un administrateur.",
      "Plus de motivation grâce à la dynamique du groupe."
    ],
    howItWorks: [
      "Créez le groupe puis définissez les règles de contribution.",
      "Invitez les membres et lancez les premiers dépôts.",
      "Suivez le total commun jusqu'à l'objectif fixé."
    ],
    examples: [
      {
        persona: "Étudiant",
        title: "Projet de promotion",
        text: "Un groupe d'étudiants cotise chaque semaine pour financer un événement commun."
      },
      {
        persona: "Jeune actif",
        title: "Voyage à plusieurs",
        text: "Trois collègues déposent tous les mois pour préparer leur voyage à date fixe."
      },
      {
        persona: "Petit commerce",
        title: "Achat collectif",
        text: "Deux commerçants créent une cagnotte pour acquérir ensemble du matériel."
      }
    ],
    trustTitle: "Transparence et confiance",
    trustBody: "Chaque membre voit l'état des contributions et les règles sont claires dès la création du groupe.",
    trustPoints: [
      "Mode public ou privé selon votre besoin.",
      "Rôle administrateur clairement défini.",
      "Visibilité partagée des dépôts et du solde."
    ],
    visual: {
      src: "/epargne-collective.png",
      alt: "Aperçu de l'épargne collective",
      caption: "Vue de l'espace groupe"
    }
  },
  {
    slug: "z-lock",
    title: "Épargne rémunérée (Z-lock)",
    heroLine: "Bloquez votre épargne sur une durée choisie pour viser un meilleur rendement.",
    whatIs:
      "Vous choisissez le montant et la durée. Les conditions sont affichées avant validation.",
    whatYouGet: [
      "Un cadre de durée fixe, simple à comprendre.",
      "Une estimation claire du résultat final.",
      "Une discipline d'épargne renforcée.",
      "Des taux indicatifs selon la durée choisie."
    ],
    howItWorks: [
      "Sélectionnez une somme et une durée.",
      "Validez les conditions affichées dans l'application.",
      "Laissez courir jusqu'à l'échéance prévue."
    ],
    examples: [
      {
        persona: "Étudiant",
        title: "Préparer un ordinateur",
        text: "Ibrahim bloque une partie de son budget mensuel sur 12 mois pour financer son laptop."
      },
      {
        persona: "Jeune actif",
        title: "Planifier un permis",
        text: "Marie choisit une durée fixe et suit sa progression jusqu'à la date de paiement."
      },
      {
        persona: "Petit commerce",
        title: "Préparer une extension",
        text: "Joël bloque une somme pour renforcer sa trésorerie à une date précise."
      }
    ],
    trustTitle: "Règles connues avant engagement",
    trustBody: "Vous voyez les conditions de retrait anticipé et la durée avant de confirmer.",
    trustPoints: [
      "Taux et durée indiqués avant souscription.",
      "Conditions de sortie précisées dans le contrat.",
      "Support disponible pour accompagner votre choix."
    ],
    visual: {
      src: "/epargne-remuneree-zlock.png",
      alt: "Aperçu de Z-Lock",
      caption: "Vue du produit Z-Lock"
    }
  },
  {
    slug: "z-flex",
    title: "Microcrédit (Z-flex)",
    heroLine: "Une solution souple pour répondre à un besoin ponctuel.",
    whatIs:
      "Z-Flex est un microcrédit avec conditions visibles avant validation et échéancier clair.",
    whatYouGet: [
      "Une réponse rapide à un besoin court terme.",
      "Un échéancier connu dès le départ.",
      "Un suivi clair du remboursement.",
      "Des règles simples avant confirmation."
    ],
    howItWorks: [
      "Décrivez votre besoin dans l'application.",
      "Consultez les conditions et l'échéancier.",
      "Validez puis suivez vos remboursements."
    ],
    examples: [
      {
        persona: "Étudiant",
        title: "Dépense académique urgente",
        text: "Nadia couvre une dépense imprévue et rembourse selon un plan défini."
      },
      {
        persona: "Jeune actif",
        title: "Imprévu de fin de mois",
        text: "Kevin gère un besoin ponctuel puis suit ses remboursements dans l'app."
      },
      {
        persona: "Petit commerce",
        title: "Réassort rapide",
        text: "Rita finance un achat immédiat pour éviter une rupture de stock."
      }
    ],
    trustTitle: "Souplesse avec cadre explicite",
    trustBody: "Les conditions de remboursement et les pénalités éventuelles sont affichées avant validation.",
    trustPoints: [
      "Échéancier défini à l'avance.",
      "Remboursement anticipé possible.",
      "Accompagnement support en cas de question."
    ],
    visual: {
      src: "/microcredit-zflex.png",
      alt: "Aperçu de Microcrédit (Z-flex)",
      caption: "Vue du produit Microcrédit (Z-flex)"
    }
  },
  {
    slug: "challenges-zpoints",
    title: "Challenges & Z-Points",
    heroLine: "Gardez le rythme avec des défis simples et un suivi de vos efforts.",
    whatIs:
      "Cette fonctionnalité vous aide à rester régulier grâce à des objectifs courts et une progression visible.",
    whatYouGet: [
      "Des mini défis faciles à suivre.",
      "Des points liés à vos actions régulières.",
      "Une lecture claire de votre constance.",
      "Plus de motivation sur la durée."
    ],
    howItWorks: [
      "Activez un challenge dans l'application.",
      "Respectez vos dépôts selon la fréquence choisie.",
      "Suivez vos points et votre progression."
    ],
    examples: [
      {
        persona: "Étudiant",
        title: "Routine hebdomadaire",
        text: "Moussa suit un mini-défi de dépôt chaque semaine pour créer une habitude solide."
      },
      {
        persona: "Jeune actif",
        title: "Rester constant malgré un agenda chargé",
        text: "Nina utilise les challenges pour garder sa discipline même pendant les périodes intenses."
      },
      {
        persona: "Petit commerce",
        title: "Mesurer ses efforts",
        text: "Abdou visualise ses points pour ajuster son rythme et rester stable."
      }
    ],
    trustTitle: "Un système motivant, sans complexité",
    trustBody: "Les challenges sont optionnels et servent à rendre vos progrès visibles au quotidien.",
    trustPoints: [
      "Activation simple dans l'app.",
      "Suivi en temps réel de votre progression.",
      "Approche ludique sans jargon financier."
    ],
    visual: {
      src: "/comment-marche-3.png",
      alt: "Aperçu des challenges et points",
      caption: "Vue du parcours de motivation"
    }
  },
  {
    slug: "parrainage",
    title: "Parrainage",
    heroLine: "Invitez un proche et avancez ensemble vers vos objectifs.",
    whatIs:
      "Vous partagez votre lien, vos proches rejoignent Zepargn et vous gardez une dynamique commune.",
    whatYouGet: [
      "Plus de motivation à deux ou en petit cercle.",
      "Une habitude d'épargne plus régulière.",
      "Un suivi simple de votre progression commune.",
      "Un parcours clair pour inviter rapidement."
    ],
    howItWorks: [
      "Partagez votre lien de parrainage.",
      "Votre proche crée son compte.",
      "Vous suivez vos objectifs ensemble."
    ],
    examples: [
      {
        persona: "Étudiant",
        title: "Avancer avec un camarade",
        text: "Deux amis de promo se motivent mutuellement pour tenir leur objectif du semestre."
      },
      {
        persona: "Jeune actif",
        title: "Créer une routine en famille",
        text: "Aline invite sa sœur pour construire une habitude d'épargne commune."
      },
      {
        persona: "Petit commerce",
        title: "Rester engagé avec un pair",
        text: "Un commerçant parraine un collègue pour garder un rythme régulier."
      }
    ],
    trustTitle: "Une dynamique sociale positive",
    trustBody: "Le parrainage est conçu pour renforcer la régularité grâce à la motivation partagée.",
    trustPoints: [
      "Partage du lien en quelques clics.",
      "Suivi simple de l'avancement.",
      "Règles du programme visibles dans l'application."
    ],
    visual: {
      src: "/comment-marche-1.png",
      alt: "Aperçu du parrainage",
      caption: "Vue du parcours parrainage"
    }
  }
];

function hasPublicAsset(assetPath: string) {
  return fs.existsSync(path.join(process.cwd(), "public", assetPath.replace(/^\//, "")));
}

const FEATURE_HIGHLIGHT_IMAGE_CANDIDATE = "/feature-highlight.jpg";
const FEATURE_HIGHLIGHT_IMAGE_SRC = hasPublicAsset(FEATURE_HIGHLIGHT_IMAGE_CANDIDATE)
  ? FEATURE_HIGHLIGHT_IMAGE_CANDIDATE
  : "/epargne-remuneree-zlock.png";
const FEATURE_HERO_VIDEO_SHARED_CANDIDATE = "/videos/feature-highlight.mp4";
const FEATURE_HERO_VIDEO_BY_SLUG: Record<FeaturePage["slug"], string> = {
  "epargne-personnelle": "/videos/feature-epargne-personnelle.mp4",
  "epargne-collective": "/videos/feature-epargne-collective.mp4",
  "z-lock": "/videos/feature-z-lock.mp4",
  "z-flex": "/videos/feature-z-flex.mp4",
  "challenges-zpoints": "/videos/feature-challenges-zpoints.mp4",
  parrainage: "/videos/feature-parrainage.mp4"
};
const FEATURE_EXAMPLE_MAIN_CANDIDATE = "/feature-example-main.png";
const FEATURE_EXAMPLE_SIDE_1_CANDIDATE = "/feature-example-side-1.png";
const FEATURE_EXAMPLE_SIDE_2_CANDIDATE = "/feature-example-side-2.png";
const HOW_IT_WORKS_SUPPORT_COPY = [
  "Configuration rapide depuis l'application, avec des règles claires dès le départ.",
  "Action guidée et validation simple pour avancer sans friction.",
  "Suivi en temps réel pour rester régulier et atteindre votre objectif."
] as const;

function getFeatureBySlug(slug: string) {
  return FEATURE_PAGES.find((page) => page.slug === slug);
}

function getFeatureHeroVideoSrc(slug: FeaturePage["slug"]) {
  const pageSpecificCandidate = FEATURE_HERO_VIDEO_BY_SLUG[slug];
  if (hasPublicAsset(pageSpecificCandidate)) {
    return pageSpecificCandidate;
  }

  if (hasPublicAsset(FEATURE_HERO_VIDEO_SHARED_CANDIDATE)) {
    return FEATURE_HERO_VIDEO_SHARED_CANDIDATE;
  }

  return undefined;
}

type Props = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return FEATURE_PAGES.map((page) => ({ slug: page.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const page = getFeatureBySlug(params.slug);

  if (!page) {
    return {
      title: "Fonctionnalité | Zepargn"
    };
  }

  return {
    title: `${page.title} | Fonctionnalités Zepargn`,
    description: page.heroLine
  };
}

export default function FeatureDetailPage({ params }: Props) {
  const page = getFeatureBySlug(params.slug);

  if (!page) {
    notFound();
  }
  const isZLockPage = page.slug === "z-lock";

  const featureExampleMainSrc = hasPublicAsset(FEATURE_EXAMPLE_MAIN_CANDIDATE)
    ? FEATURE_EXAMPLE_MAIN_CANDIDATE
    : page.visual.src;
  const featureExampleSide1Src = hasPublicAsset(FEATURE_EXAMPLE_SIDE_1_CANDIDATE)
    ? FEATURE_EXAMPLE_SIDE_1_CANDIDATE
    : page.visual.src;
  const featureExampleSide2Src = hasPublicAsset(FEATURE_EXAMPLE_SIDE_2_CANDIDATE)
    ? FEATURE_EXAMPLE_SIDE_2_CANDIDATE
    : page.visual.src;
  const exampleVisualSources = [featureExampleMainSrc, featureExampleSide1Src, featureExampleSide2Src] as const;
  const heroPosterSrc = isZLockPage ? FEATURE_HIGHLIGHT_IMAGE_SRC : page.visual.src;
  const heroVideoSrc = getFeatureHeroVideoSrc(page.slug);
  const sectionVerticalSpacingClass = "py-12 sm:py-16 lg:py-20";

  return (
    <>
      <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden pb-12 pt-28 text-white sm:items-center sm:pb-16 sm:pt-32">
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          {heroVideoSrc ? (
            <video autoPlay className="h-full w-full object-cover" loop muted playsInline preload="metadata">
              <source src={heroVideoSrc} type="video/mp4" />
            </video>
          ) : (
            <Image alt="" className="h-full w-full object-cover" fill sizes="100vw" src={heroPosterSrc} />
          )}
          <div className="absolute inset-0 bg-zepargn-navy/72" />
          <div className="absolute inset-0 bg-[#F04A00]/12" />
        </div>

        <Container>
          <div className="mx-auto flex w-full max-w-5xl flex-col items-center text-center" data-reveal="">
            <p className="micro-accent text-zepargn-sky">Fonctionnalité</p>
            <h1 className="type-h1 mt-3 text-white">{page.title}</h1>
            <div className="mt-5 w-full max-w-3xl rounded-2xl border border-[#ee7f4f]/60 bg-[#f04a00]/30 px-4 py-4 backdrop-blur-[2px] sm:px-6 sm:py-5">
              <p className="type-body-lg text-slate-100">{page.heroLine}</p>
              <p className="type-body mt-3 text-slate-200">{page.whatIs}</p>
            </div>
            <DownloadButtons className="mt-8 max-w-2xl sm:justify-center" source={`feature_${page.slug}_hero`} tone="light" />
          </div>
        </Container>
      </section>

      <section className={sectionVerticalSpacingClass}>
        <Container>
          <div className="mx-auto max-w-3xl text-center" data-reveal="" data-reveal-delay="40">
            <p className="micro-accent text-zepargn-orange">Ce que vous obtenez</p>
            <h2 className="type-h2 mt-3 text-zepargn-navy">
              Tout ce qu’il faut pour avancer sans complexité
            </h2>
          </div>

          <ul className="mx-auto mt-14 grid max-w-5xl gap-x-14 gap-y-6 md:grid-cols-2" data-reveal="" data-reveal-delay="85">
            {page.whatYouGet.map((item) => (
              <li className="flex items-start gap-4 border-b border-slate-200 pb-6" key={item}>
                <span aria-hidden="true" className="mt-3 h-2.5 w-2.5 shrink-0 rounded-full bg-zepargn-orange" />
                <span className="type-body-lg text-slate-700">{item}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className={`${sectionVerticalSpacingClass} relative isolate overflow-hidden bg-[#eaf6fe]`}>
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_16%,rgba(157,209,241,0.55),transparent_48%),radial-gradient(circle_at_88%_22%,rgba(240,74,0,0.14),transparent_40%),radial-gradient(circle_at_52%_86%,rgba(3,25,39,0.08),transparent_44%)]" />
          <div className="absolute inset-0 opacity-[0.22] [background-image:repeating-linear-gradient(90deg,rgba(3,25,39,0.065)_0_1px,transparent_1px_56px)]" />
          <div className="absolute inset-0 opacity-[0.12] [background-image:radial-gradient(circle_at_1px_1px,rgba(3,25,39,0.15)_1px,transparent_0)] [background-size:22px_22px]" />
          <div
            className="absolute -left-20 top-6 h-64 w-64 rounded-full bg-white/45 blur-3xl"
            data-parallax-speed="0.05"
          />
          <div
            className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-zepargn-sky/50 blur-3xl"
            data-parallax-speed="0.09"
          />
          <div
            className="absolute left-1/2 top-1/2 h-[145%] w-[42%] -translate-x-1/2 -translate-y-1/2 rotate-[18deg] bg-[linear-gradient(180deg,rgba(255,255,255,0.52),rgba(255,255,255,0.04))] opacity-45 blur-2xl"
            data-parallax-speed="0.04"
          />
          <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(3,25,39,0.08)]" />
        </div>

        <Container>
          <div className="mx-auto w-full max-w-7xl" data-reveal="">
            <p className="micro-accent text-center text-zepargn-orange">Comment ça marche</p>
            <h2 className="type-h2 mt-3 mx-auto max-w-4xl text-center text-zepargn-navy">
              Trois étapes pour passer à l’action
            </h2>

            <ol className="mt-10 space-y-8 sm:mt-12 md:hidden">
              {page.howItWorks.map((step, index) => (
                <li className="flex flex-col items-center text-center" key={step}>
                  <span className="type-link inline-flex h-20 w-20 items-center justify-center rounded-full border-2 border-zepargn-orange/60 bg-white font-bold text-zepargn-orange shadow-[0_14px_32px_rgba(3,25,39,0.12)]">
                    {index + 1}
                  </span>
                  <p className="type-h3 mt-5 max-w-[23ch] text-zepargn-navy">{step}</p>
                  <p className="type-body mt-3 max-w-[30ch] text-slate-600">
                    {page.howItWorksDetails?.[index] ?? HOW_IT_WORKS_SUPPORT_COPY[index] ?? HOW_IT_WORKS_SUPPORT_COPY[2]}
                  </p>
                </li>
              ))}
            </ol>

            <ol className="relative mt-12 hidden space-y-6 md:block">
              {page.howItWorks.map((step, index) => (
                <li className="grid grid-cols-[1fr_7rem_1fr] items-center gap-7 py-4 lg:gap-10" key={step}>
                  <div
                    className={`max-w-[34rem] ${
                      index % 2 === 0
                        ? "col-start-1 justify-self-end text-right"
                        : "col-start-3 justify-self-start text-left"
                    }`}
                  >
                    <p className="type-h3 text-zepargn-navy">{step}</p>
                    <p className="type-body mt-2 text-slate-600">
                      {page.howItWorksDetails?.[index] ?? HOW_IT_WORKS_SUPPORT_COPY[index] ?? HOW_IT_WORKS_SUPPORT_COPY[2]}
                    </p>
                  </div>

                  <div className="col-start-2 row-start-1 flex justify-center">
                    <span className="type-link inline-flex h-24 w-24 items-center justify-center rounded-full border-2 border-zepargn-orange/60 bg-white font-bold text-zepargn-orange shadow-[0_14px_32px_rgba(3,25,39,0.12)] lg:h-28 lg:w-28">
                      {index + 1}
                    </span>
                  </div>

                  <div className={index % 2 === 0 ? "col-start-3" : "col-start-1"} />
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      <div className="relative isolate overflow-hidden bg-white">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_14%,rgba(157,209,241,0.2),transparent_46%),radial-gradient(circle_at_86%_82%,rgba(240,74,0,0.1),transparent_42%)]" />
          <div className="absolute inset-0 opacity-[0.06] [background-image:repeating-linear-gradient(90deg,rgba(3,25,39,0.08)_0_1px,transparent_1px_64px)]" />
          <div className="absolute -left-20 top-8 h-56 w-56 rounded-full bg-zepargn-sky/22 blur-3xl" data-parallax-speed="0.05" />
          <div className="absolute -right-20 bottom-4 h-60 w-60 rounded-full bg-zepargn-orange/10 blur-3xl" data-parallax-speed="0.08" />
        </div>

      {isZLockPage ? (
        <section className={sectionVerticalSpacingClass}>
          <Container>
            <VideoBackdropSpot
              body="Une projection visuelle simple pour comprendre ce que peut donner votre effort dans la durée."
              kicker="Moment produit"
              posterSrc={FEATURE_HIGHLIGHT_IMAGE_SRC}
              title="Quand vous bloquez votre épargne, vous gagnez en lisibilité"
            >
              <a
                className="section-cta bg-zepargn-orange text-white hover:bg-[#d84200]"
                href="/simulateur"
              >
                Voir les taux et simuler
              </a>
            </VideoBackdropSpot>
          </Container>
        </section>
      ) : null}

      <section className={sectionVerticalSpacingClass}>
        <Container>
          <div className="max-w-3xl" data-reveal="">
            <p className="micro-accent text-zepargn-orange">Exemples concrets</p>
            <h2 className="type-h2 mt-3 text-zepargn-navy">
              Dans la vraie vie
            </h2>
          </div>

          <ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8 lg:gap-10" data-reveal="" data-reveal-delay="60">
            {page.examples.map((example, index) => (
              <li className="border-t border-slate-300/80 pt-5" key={example.title}>
                <p className="type-kicker text-slate-500">{example.persona}</p>

                <h3 className="mt-3 text-[clamp(1.02rem,1.45vw,1.3rem)] font-semibold leading-tight tracking-[-0.01em] text-zepargn-navy">
                  {example.title}
                </h3>
                <p className="type-body mt-3 max-w-3xl text-slate-700">{example.text}</p>

                <div className="relative mt-5 overflow-hidden rounded-[1.25rem] shadow-[0_12px_24px_rgba(3,25,39,0.1)]">
                  <Image
                    alt={`Illustration ${example.title}`}
                    className="aspect-[16/10] w-full object-cover"
                    height={960}
                    sizes="(min-width: 1280px) 31vw, (min-width: 768px) 30vw, 100vw"
                    src={exampleVisualSources[index] ?? featureExampleSide2Src}
                    width={1440}
                  />
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className={sectionVerticalSpacingClass}>
        <Container>
          <div className="rounded-[2.2rem] bg-zepargn-sky/40 px-6 py-10 sm:px-10 sm:py-12" data-reveal="">
            <p className="micro-accent text-zepargn-orange">Repères de confiance</p>
            <h2 className="type-h2 mt-2 text-zepargn-navy">
              {page.trustTitle}
            </h2>
            <p className="type-body mt-3 max-w-3xl text-slate-700">{page.trustBody}</p>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {page.trustPoints.map((point) => (
                <p className="type-body border-t border-slate-300 pt-4 text-zepargn-navy" key={point}>
                  {point}
                </p>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className={sectionVerticalSpacingClass}>
        <Container>
          <div className="rounded-[2.3rem] bg-zepargn-navy px-6 py-12 text-center text-white sm:px-10 sm:py-14" data-reveal="">
            <h2 className="type-h1">
              Prêt à commencer avec {page.title} ?
            </h2>
            <p className="type-body mx-auto mt-4 max-w-2xl text-slate-200">
              Téléchargez l’application et lancez votre premier objectif en quelques minutes.
            </p>
            <DownloadButtons className="mx-auto mt-8 max-w-2xl" source={`feature_${page.slug}_final`} tone="light" />
          </div>
        </Container>
      </section>

      </div>
    </>
  );
}
