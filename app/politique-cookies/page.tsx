import { Container } from "@/components/Container";

export const metadata = {
  title: "Politique cookies | Zepargn",
  description: "Politique relative aux cookies de Zepargn."
};

const cookiesPolicyContent = `POLITIQUE RELATIVE AUX COOKIES

La présente politique est rédigée conformément à l'obligation d'information incombant au responsable de traitement prévu à l'article 415, figurant au cinquième livre du code du numérique applicable en République du Bénin, relatif à la Protection des Données à caractère personnel.

Lors de votre première connexion sur le site web, vous êtes avertis par un bandeau en bas de votre écran que des informations relatives à votre navigation sont susceptibles d'être enregistrées dans des fichiers dénommés « cookies ».

Notre politique d'utilisation des cookies vous permet de mieux comprendre les dispositions que nous mettons en œuvre en matière de navigation sur notre site et application web « Zepargn ». Elle vous informe notamment sur l'ensemble des cookies présents sur notre « Zepargn », leur finalité et vous donne la marche à suivre pour les paramétrer.

Article 1 : Informations générales sur les cookies présents sur le site

La société Digitall Elevate S.A.S.U en tant qu'éditeur du présent site web et de la présente application web « Zepargn », pourra procéder à l'implantation d'un cookie sur le disque dur de votre terminal (ordinateur, tablette, mobile, etc.) afin de vous garantir une navigation fluide et optimale sur notre site internet.

Les « cookies » (ou témoins de connexion) sont des petits fichiers texte de taille limitée qui nous permettent de reconnaître votre ordinateur, votre tablette ou votre mobile aux fins de personnaliser les services que nous vous proposons.

Les informations recueillies par le biais des cookies ne permettent en aucune manière de vous identifier nominativement. Elles sont utilisées exclusivement pour nos besoins propres afin d'améliorer l'interactivité et la performance de notre site et application web et de vous adresser des contenus adaptés à vos centres d'intérêts.

Aucune de ces informations ne fait l'objet d'une communication auprès de tiers sauf lorsque la société Digitall Elevate S.A.S.U a obtenu au préalable votre consentement ou bien lorsque la divulgation de ces informations est requise par la loi, sur ordre d'un tribunal ou toute autorité administrative ou judiciaire habilitée à en connaître.

Article 2 : Configuration de vos préférences sur les cookies

Vous pouvez accepter ou refuser le dépôt de cookies à tout moment.

Lors de votre première connexion sur le site et l'application web de la société Digitall Elevate S.A.S.U, une bannière présentant brièvement des informations relatives au dépôt de cookies et de technologies similaires apparaît en bas de votre écran.

Cette bannière vous avertit qu'en poursuivant votre navigation sur le site web, vous acceptez le dépôt de cookies sur votre terminal. Vous êtes également réputé avoir donné votre accord au dépôt de cookies en cliquant sur l'icône « Accepter et continuer ».

Selon le type de cookie en cause, le recueil de votre consentement au dépôt et à la lecture de cookies sur votre terminal peut être impératif.

2.1. Les cookies exemptés de consentement

Certains cookies sont dispensés du recueil préalable de votre consentement dans la mesure où ils sont strictement nécessaires au fonctionnement du site internet ou ont pour finalité exclusive de permettre ou faciliter la communication par voie électronique.

Il s'agit notamment des cookies d'identifiant de session, d'authentification, de session d'équilibrage de charge ainsi que des cookies de personnalisation de votre interface. Ces cookies sont intégralement soumis à la présente politique dans la mesure où ils sont émis et gérés par la société Digitall Elevate S.A.S.U.

2.2. Les cookies nécessitant le recueil préalable de votre consentement

Cette exigence concerne les cookies émis par des tiers et qui sont qualifiés de « persistants » dans la mesure où ils demeurent dans votre terminal jusqu'à leur effacement ou leur date d'expiration.

De tels cookies étant émis par des tiers, leur utilisation et leur dépôt sont soumis à leurs propres politiques de confidentialité.

Cette famille de cookie regroupe les cookies de mesure d'audience et les cookies publicitaires.

Les cookies de mesure d'audience établissent des statistiques concernant la fréquentation et l'utilisation de divers éléments du site web (comme les contenus/pages que vous avez visité).

2.3. Vous disposez de divers outils de paramétrage des cookies

La plupart des navigateurs internet sont configurés par défaut de façon à ce que le dépôt de cookies soit autorisé.

Votre navigateur vous offre l'opportunité de modifier ces paramètres standards de manière à ce que l'ensemble des cookies soit rejeté systématiquement ou bien à ce qu'une partie seulement des cookies soit acceptée ou refusée en fonction de leur émetteur.

ATTENTION : Nous attirons votre attention sur le fait que le refus du dépôt de cookies sur votre terminal est néanmoins susceptible d'altérer votre expérience d'utilisateur ainsi que votre accès à certains services ou fonctionnalités du présent site web.

Le cas échéant, la société Digitall Elevate S.A.S.U décline toute responsabilité concernant les conséquences liées à la dégradation de vos conditions de navigation qui interviennent en raison de votre choix de refuser, supprimer ou bloquer les cookies nécessaires au fonctionnement du site.

Ces conséquences ne sauraient constituer un dommage et vous ne pourrez prétendre à aucune indemnité de ce fait.

Votre navigateur vous permet également de supprimer les cookies existants sur votre terminal ou encore de vous signaler lorsque de nouveaux cookies sont susceptibles d'être déposés sur votre terminal.`;

export default function CookiesPage() {
  return (
    <section className="pb-16 pt-28 sm:pb-20 sm:pt-32">
      <Container className="max-w-5xl">
        <h1 className="title-section text-zepargn-navy">Politique cookies</h1>
        <p className="section-copy mt-4 max-w-3xl">
          Informations sur l’usage des cookies et vos options de paramétrage.
        </p>

        <article className="mt-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-soft sm:p-8">
          <pre className="type-body whitespace-pre-wrap font-sans text-slate-700">
            {cookiesPolicyContent}
          </pre>
        </article>
      </Container>
    </section>
  );
}
