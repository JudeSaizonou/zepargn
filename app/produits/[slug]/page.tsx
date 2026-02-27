import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { DownloadButtons } from "@/components/DownloadButtons";
import { RATE_PREVIEW } from "@/data/site-content";

type ProductPage = {
  slug: string;
  title: string;
  heroLine: string;
  definition: string;
  upToCopy?: string;
  upToNote?: string;
  whatYouGet: string[];
  howItWorks: string[];
  rules: string[];
  examples: Array<{ persona: string; text: string }>;
  visual: {
    main: string;
    alt: string;
    caption: string;
  };
};

const PRODUCT_PAGES: ProductPage[] = [
  {
    slug: "z-lock",
    title: "Z-Lock (Taux & Durées)",
    heroLine: "Vous bloquez une somme pendant une durée choisie pour viser un meilleur rendement.",
    definition:
      "Z-Lock est une épargne bloquée. Vous choisissez le montant et la durée. Les conditions sont affichées avant validation.",
    upToCopy: "Jusqu'à 7% / an en épargnant",
    upToNote: "*Selon le produit choisi et la durée.",
    whatYouGet: [
      "Un cadre clair dès le départ.",
      "Une durée que vous choisissez selon votre objectif.",
      "Une estimation simple de votre résultat.",
      "Plus de discipline pour garder votre plan."
    ],
    howItWorks: [
      "Choisissez votre montant et votre durée.",
      "Vérifiez les conditions et validez.",
      "Attendez l'échéance pour récupérer selon le contrat."
    ],
    rules: [
      "Les intérêts sont acquis à l'échéance.",
      "En cas de retrait anticipé, des pénalités peuvent s'appliquer.",
      "Les délais de disponibilité suivent les conditions affichées au moment de la souscription."
    ],
    examples: [
      {
        persona: "Étudiant",
        text: "Bloquer une somme sur 12 mois pour financer un ordinateur."
      },
      {
        persona: "Jeune salarié",
        text: "Préparer un apport pour un projet personnel sur une durée fixe."
      },
      {
        persona: "Petit commerce",
        text: "Constituer une réserve planifiée pour un achat important."
      }
    ],
    visual: {
      main: "/epargne-remuneree-zlock.png",
      alt: "Aperçu du produit Z-Lock",
      caption: "Aperçu produit Z-Lock"
    }
  },
  {
    slug: "z-flex",
    title: "Z-Flex (Souplesse)",
    heroLine: "Un microcrédit simple pour répondre à un besoin ponctuel.",
    definition:
      "Z-Flex est pensé pour un besoin rapide et précis. Vous voyez les conditions avant de confirmer votre demande.",
    whatYouGet: [
      "Une demande simple et rapide.",
      "Un cadre de remboursement clair.",
      "Un suivi lisible dans l'application.",
      "Des règles connues avant validation."
    ],
    howItWorks: [
      "Faites votre demande dans l'application.",
      "Consultez l'échéancier et les conditions.",
      "Remboursez selon le plan validé."
    ],
    rules: [
      "Le remboursement suit un échéancier défini à l'avance.",
      "En cas de retard, une pénalité peut être appliquée selon le contrat.",
      "Le remboursement anticipé est possible sans frais supplémentaires."
    ],
    examples: [
      {
        persona: "Étudiant",
        text: "Couvrir un besoin académique urgent et rembourser sur la période prévue."
      },
      {
        persona: "Jeune salarié",
        text: "Gérer une dépense imprévue sans casser son budget du mois."
      },
      {
        persona: "Petit commerce",
        text: "Financer rapidement un réassort pour maintenir l'activité."
      }
    ],
    visual: {
      main: "/microcredit-zflex.png",
      alt: "Aperçu du produit Z-Flex",
      caption: "Aperçu produit Z-Flex"
    }
  },
  {
    slug: "groupes",
    title: "Épargne en groupe",
    heroLine: "Un produit collectif pour avancer ensemble avec des règles claires.",
    definition:
      "Vous créez un groupe public ou privé, vous définissez un objectif commun et chacun suit les contributions en transparence.",
    whatYouGet: [
      "Un objectif partagé.",
      "Des contributions visibles par les membres.",
      "Un cadre défini par l'administrateur.",
      "Une dynamique collective motivante."
    ],
    howItWorks: [
      "Créez le groupe et choisissez les règles.",
      "Invitez les participants.",
      "Suivez les dépôts jusqu'à l'objectif commun."
    ],
    rules: [
      "Le groupe peut être public ou privé.",
      "L'administrateur gère le cadre du groupe.",
      "Les participants voient l'état des fonds pour garder la transparence."
    ],
    examples: [
      {
        persona: "Étudiant",
        text: "Cotiser entre camarades pour un projet de promotion."
      },
      {
        persona: "Jeune salarié",
        text: "Préparer un voyage en groupe avec des dépôts mensuels."
      },
      {
        persona: "Petit commerce",
        text: "Constituer un fonds commun pour un achat collectif."
      }
    ],
    visual: {
      main: "/epargne-collective.png",
      alt: "Aperçu de l'épargne en groupe",
      caption: "Aperçu épargne en groupe"
    }
  },
  {
    slug: "objectifs",
    title: "Objectifs & Projets",
    heroLine: "Planifiez vos objectifs étape par étape, sans complexité.",
    definition:
      "Ce produit vous aide à transformer un projet en plan simple: montant cible, durée, fréquence de dépôt et suivi.",
    whatYouGet: [
      "Un objectif clair et réaliste.",
      "Un plan adapté à votre budget.",
      "Des rappels pour rester régulier.",
      "Une progression visible en continu."
    ],
    howItWorks: [
      "Choisissez un projet concret.",
      "Définissez montant et durée.",
      "Suivez, ajustez, puis atteignez votre objectif."
    ],
    rules: [
      "Commencez avec un petit montant si besoin.",
      "Ajustez votre plan en cours de route.",
      "Gardez un rythme simple et constant."
    ],
    examples: [
      {
        persona: "Étudiant",
        text: "Préparer les frais de rentrée avec un plan mensuel."
      },
      {
        persona: "Jeune salarié",
        text: "Constituer une réserve d'urgence en quelques mois."
      },
      {
        persona: "Petit commerce",
        text: "Financer du matériel pour améliorer l'activité."
      }
    ],
    visual: {
      main: "/epargne-simple.png",
      alt: "Aperçu des objectifs et projets",
      caption: "Aperçu objectifs et projets"
    }
  }
];

const compareRows = [
  {
    label: "Quand l'utiliser",
    zLock: "Quand vous pouvez laisser l'argent jusqu'à une date précise.",
    zFlex: "Quand vous avez un besoin rapide à couvrir."
  },
  {
    label: "Approche",
    zLock: "Épargne bloquée avec durée définie.",
    zFlex: "Microcrédit avec échéancier clair."
  },
  {
    label: "Point clé",
    zLock: "Vous gagnez plus en respectant la durée.",
    zFlex: "Vous gardez de la souplesse pour un besoin ponctuel."
  }
] as const;

function getProductBySlug(slug: string) {
  return PRODUCT_PAGES.find((item) => item.slug === slug);
}

type Props = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return PRODUCT_PAGES.map((page) => ({ slug: page.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const page = getProductBySlug(params.slug);

  if (!page) {
    return {
      title: "Produit | Zepargn"
    };
  }

  return {
    title: `${page.title} | Produits Zepargn`,
    description: page.heroLine
  };
}

export default function ProductDetailPage({ params }: Props) {
  const page = getProductBySlug(params.slug);

  if (!page) {
    notFound();
  }

  return (
    <section className="pb-16 pt-28 sm:pb-20 sm:pt-32">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]" data-reveal="">
          <div>
            <p className="micro-accent text-zepargn-orange">Produit</p>
            <h1 className="title-section mt-3 text-zepargn-navy">{page.title}</h1>
            <p className="section-copy mt-4 max-w-2xl">{page.heroLine}</p>
            <p className="section-copy mt-4 max-w-2xl">{page.definition}</p>

            {page.upToCopy ? (
              <div className="mt-5">
                <span className="type-link inline-flex rounded-full bg-zepargn-sky px-4 py-1.5 text-zepargn-navy">
                  {page.upToCopy}
                </span>
                {page.upToNote ? <p className="type-small mt-2 text-slate-500">{page.upToNote}</p> : null}
              </div>
            ) : null}

            <DownloadButtons className="mt-7" source={`produit_${page.slug}_hero`} />
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                className="type-button inline-flex min-h-11 items-center justify-center rounded-xl border border-zepargn-navy px-5 text-zepargn-navy transition-colors hover:bg-zepargn-navy hover:text-white sm:min-h-12 sm:px-6"
                href="/simulateur"
              >
                Ouvrir le simulateur
              </Link>
            </div>
          </div>

          <aside className="rounded-3xl bg-[#F6F9FC] p-4 sm:p-5">
            <p className="type-kicker text-slate-500">{page.visual.caption}</p>
            <div className="mt-3 overflow-hidden rounded-2xl bg-white shadow-[0_14px_30px_rgba(3,25,39,0.1)]">
              <Image
                alt={page.visual.alt}
                className="aspect-[16/10] w-full object-cover"
                height={720}
                sizes="(min-width: 1024px) 44rem, 100vw"
                src={page.visual.main}
                width={1200}
              />
            </div>
            <div className="type-small mt-3 aspect-[4/3] rounded-2xl bg-white px-4 py-3 text-slate-500 shadow-[0_10px_20px_rgba(3,25,39,0.06)]">
              Spot mockup complémentaire
            </div>
          </aside>
        </div>

        <section className="mt-8 rounded-3xl bg-white p-6 shadow-soft sm:p-8" data-reveal="" data-reveal-delay="50">
          <h2 className="type-h2 text-zepargn-navy">Ce produit vous apporte</h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {page.whatYouGet.map((item) => (
              <li className="type-body rounded-2xl bg-[#F6F9FC] px-4 py-3 text-slate-700" key={item}>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-6 rounded-3xl bg-[#F6F9FC] p-6 sm:p-8" data-reveal="" data-reveal-delay="85">
          <h2 className="type-h2 text-zepargn-navy">Comment ça fonctionne</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {page.howItWorks.map((step, index) => (
              <article className="rounded-2xl bg-white p-4" key={step}>
                <p className="type-kicker text-zepargn-orange">Étape {index + 1}</p>
                <p className="type-link mt-2 text-zepargn-navy">{step}</p>
              </article>
            ))}
          </div>
        </section>

        {page.slug === "z-lock" ? (
          <section className="mt-6 rounded-3xl bg-white p-6 shadow-soft sm:p-8" data-reveal="" data-reveal-delay="120">
            <h2 className="type-h2 text-zepargn-navy">Tableau des taux de référence</h2>
            <p className="type-body mt-2 text-slate-600">Aperçu simple des durées principales de Z-Lock.</p>
            <div className="mt-5 overflow-hidden rounded-2xl bg-[#F6F9FC]">
              <table className="type-table w-full border-collapse text-left">
                <thead className="bg-zepargn-navy text-white">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Durée</th>
                    <th className="px-4 py-3 font-semibold">Taux</th>
                  </tr>
                </thead>
                <tbody>
                  {RATE_PREVIEW.map((rate) => (
                    <tr className="border-t border-slate-200" key={rate.duree}>
                      <td className="px-4 py-3 text-slate-700">{rate.duree}</td>
                      <td className="px-4 py-3 font-semibold text-zepargn-navy">{rate.taux}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ) : null}

        <section className="mt-6 rounded-3xl bg-white p-6 shadow-soft sm:p-8" data-reveal="" data-reveal-delay="150">
          <h2 className="type-h2 text-zepargn-navy">Règles simples à connaître</h2>
          <ul className="mt-5 space-y-3">
            {page.rules.map((rule) => (
              <li className="type-body flex items-start gap-2 text-slate-700" key={rule}>
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zepargn-orange" />
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-6" data-reveal="" data-reveal-delay="180">
          <h2 className="type-h2 text-zepargn-navy">Exemples concrets</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {page.examples.map((example) => (
              <article className="rounded-3xl bg-[#F6F9FC] p-5" key={`${page.slug}-${example.persona}`}>
                <p className="type-kicker text-slate-500">{example.persona}</p>
                <p className="type-body mt-2 text-slate-700">{example.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-3xl bg-zepargn-navy p-6 text-white sm:p-8" data-reveal="" data-reveal-delay="210">
          <h2 className="type-h2">Comparer Z-Lock et Z-Flex rapidement</h2>
          <div className="mt-5 overflow-hidden rounded-2xl bg-white/10">
            <table className="type-table w-full border-collapse text-left">
              <thead className="bg-white/15">
                <tr>
                  <th className="px-4 py-3 font-semibold text-white">Point</th>
                  <th className="px-4 py-3 font-semibold text-white">Z-Lock</th>
                  <th className="px-4 py-3 font-semibold text-white">Z-Flex</th>
                </tr>
              </thead>
              <tbody>
                {compareRows.map((row) => (
                  <tr className="border-t border-white/20 align-top" key={row.label}>
                    <td className="px-4 py-3 font-semibold text-slate-100">{row.label}</td>
                    <td className="px-4 py-3 text-slate-200">{row.zLock}</td>
                    <td className="px-4 py-3 text-slate-200">{row.zFlex}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Link
            className="type-button mt-6 inline-flex min-h-11 items-center justify-center rounded-xl bg-zepargn-orange px-5 text-white transition-colors hover:bg-[#d84200] sm:min-h-12 sm:px-6"
            href="/simulateur"
          >
            Simuler mon scénario
          </Link>
        </section>

        <section className="mt-6 rounded-3xl bg-[#F6F9FC] p-6 sm:p-8" data-reveal="" data-reveal-delay="240">
          <h2 className="type-h2 text-zepargn-navy">Passez à l’action</h2>
          <p className="type-body mt-3 max-w-2xl text-slate-700">
            Téléchargez l’application pour choisir le produit adapté à votre besoin.
          </p>
          <DownloadButtons className="mt-6" source={`produit_${page.slug}_final`} />
        </section>
      </Container>
    </section>
  );
}
