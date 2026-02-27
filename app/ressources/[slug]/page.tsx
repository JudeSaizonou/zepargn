import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { DownloadButtons } from "@/components/DownloadButtons";

type UpdateNote = {
  title: string;
  date: string;
  summary: string;
  impact: string;
  major?: boolean;
};

const UPDATE_NOTES: UpdateNote[] = [
  {
    title: "Navigation éditoriale unifiée",
    date: "19 février 2026",
    summary: "Navigation repensée avec menus plus clairs et pages mieux structurées.",
    impact: "Vous trouvez l'information utile plus rapidement.",
    major: true
  },
  {
    title: "Refonte des pages fonctionnalités",
    date: "18 février 2026",
    summary: "Nouveau format narratif: ce que c'est, comment ça marche, exemples concrets.",
    impact: "La compréhension est plus rapide, même sans base financière."
  },
  {
    title: "Mise à niveau du simulateur",
    date: "17 février 2026",
    summary: "Lecture des taux et des projections plus lisible sur mobile et desktop.",
    impact: "Comparer plusieurs scénarios devient plus simple."
  },
  {
    title: "Bloc confiance avancé",
    date: "16 février 2026",
    summary: "Affichage plus tôt du partenaire financier, du cadre BCEAO et des points de vérification d'identité.",
    impact: "Les utilisateurs comprennent le cadre de sécurité dès le début."
  }
];

type Props = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return [{ slug: "nouveautes" }];
}

export function generateMetadata({ params }: Props): Metadata {
  if (params.slug !== "nouveautes") {
    return {
      title: "Ressource | Zepargn"
    };
  }

  return {
    title: "Nouveautés | Ressources Zepargn",
    description: "Les évolutions produit Zepargn, expliquées simplement."
  };
}

export default function ResourceDetailPage({ params }: Props) {
  if (params.slug !== "nouveautes") {
    notFound();
  }

  const major = UPDATE_NOTES.find((note) => note.major) ?? UPDATE_NOTES[0];

  return (
    <>
      <section className="pb-16 pt-28 sm:pb-20 sm:pt-32">
        <Container>
          <div className="grid items-end gap-10 lg:grid-cols-[1.04fr_0.96fr]" data-reveal="">
            <div>
              <p className="section-kicker">Ressources</p>
              <h1 className="type-h1 mt-3 text-zepargn-navy">
                Nouveautés
              </h1>
              <p className="section-copy mt-5 max-w-2xl">Les évolutions produit, expliquées simplement.</p>
              <p className="section-copy mt-4 max-w-2xl">
                Chaque mise à jour est résumée en quelques lignes: ce qui change, ce que cela apporte, et ce que vous
                pouvez faire ensuite.
              </p>
              <DownloadButtons
                className="mt-8 w-full max-w-2xl sm:justify-start [&_a]:w-full sm:[&_a]:w-auto sm:[&_a]:min-h-14"
                source="ressource_nouveautes_hero"
              />
            </div>

            <div className="relative lg:pt-10">
              <div aria-hidden="true" className="absolute -left-4 -top-4 h-[78%] w-[84%] rounded-[2rem] bg-zepargn-sky/35" />
              <div className="relative overflow-hidden rounded-[2.2rem] bg-white shadow-[0_18px_42px_rgba(3,25,39,0.14)]">
                <Image
                  alt="Visuel nouveautés"
                  className="aspect-[16/10] w-full object-cover"
                  height={900}
                  sizes="(min-width: 1024px) 46rem, 100vw"
                  src="/hero-visual.svg"
                  width={1500}
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]" data-reveal="">
            <div>
              <p className="section-kicker">Mise à jour majeure</p>
              <h2 className="section-title mt-3">{major.title}</h2>
              <p className="section-copy mt-4">{major.summary}</p>
              <p className="section-copy mt-3">Impact: {major.impact}</p>
            </div>

            <div className="overflow-hidden rounded-[2.1rem] bg-[#F6F9FC] p-4 sm:p-5">
              <div className="type-small aspect-[16/10] rounded-[1.4rem] bg-white px-4 py-3 text-slate-500">
                Spot screenshot produit
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-[#F6F9FC] py-24">
        <Container>
          <div className="max-w-3xl" data-reveal="">
            <p className="section-kicker">Timeline</p>
            <h2 className="section-title mt-3">Journal des évolutions</h2>
          </div>

          <ol className="mt-12 border-l border-slate-300 pl-6 sm:pl-10" data-reveal="" data-reveal-delay="60">
            {UPDATE_NOTES.map((note, index) => (
              <li className="relative pb-12 last:pb-0" key={`${note.title}-${note.date}`}>
                <span aria-hidden="true" className="absolute -left-[1.95rem] top-1.5 h-2.5 w-2.5 rounded-full bg-zepargn-orange sm:-left-[2.45rem]" />
                <div className="grid gap-3 lg:grid-cols-[0.23fr_0.77fr]">
                  <p className="type-kicker text-slate-500">{note.date}</p>
                  <div>
                    <h3 className="type-h3 text-zepargn-navy">{note.title}</h3>
                    <p className="section-copy mt-2">{note.summary}</p>
                    <p className="section-copy mt-2">Impact: {note.impact}</p>
                  </div>
                </div>
                {index === 1 ? (
                  <div className="mt-6 overflow-hidden rounded-2xl bg-white p-4">
                    <div className="type-small aspect-[16/10] rounded-xl bg-[#F6F9FC] px-3 py-2 text-slate-500">
                      Spot capture de la mise à jour
                    </div>
                  </div>
                ) : null}
              </li>
            ))}
          </ol>

          <div className="mt-14 rounded-2xl border border-slate-200 bg-white/85 p-4 shadow-[0_10px_26px_rgba(3,25,39,0.08)] backdrop-blur-sm sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Link
                className="section-cta w-full border border-zepargn-navy text-zepargn-navy hover:bg-zepargn-navy hover:text-white sm:w-auto"
                href="/ressources/education"
              >
                Lire les guides éducation
              </Link>
              <DownloadButtons
                className="w-full sm:w-auto sm:justify-end [&_a]:w-full sm:[&_a]:w-auto sm:[&_a]:min-h-14"
                source="ressource_nouveautes_footer"
              />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
