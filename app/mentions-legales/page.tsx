import { Container } from "@/components/Container";

export const metadata = {
  title: "Mentions légales | Zepargn",
  description: "Mentions légales de Zepargn."
};

const legalMentionsContent = `MENTIONS LÉGALES

Identité

Nom du site web et de l'application : Zepargn
Adresse du site web : https://zepargn.com/
Propriétaire : société Digitall Elevate S.A.S.U
Responsable de publication : Adechina Lawal ALAO

Hébergement

Nom de l'hébergeur : DigitalOcean
Adresse : 101 Avenue of the Americas, 10th Floor, New York, NY 10013, USA
Site web : https://www.digitalocean.com
Registrar : open.bj, Cotonou, Bénin

Déclaration à l'APDP

Conformément à la loi 2017-20 portant code du numérique en République du Bénin (Livre 5ième relatif à la protection des données personnelles et de la vie privée), le site et l'application « Zepargn » a fait l'objet d'une déclaration auprès de l'Autorité de Protection des Données Personnelles (www.apdp.bj) sous le numéro (ADPD-SA-TDP-g3IJN1).

En tout état de cause la société Digitall Elevate S.A.S, ne collecte des informations personnelles relatives à l'utilisateur que pour le besoin de certains services proposés par le site et l'application « Zepargn ».

L'utilisateur fournit ces informations en toute connaissance de cause, notamment lorsqu'il procède par lui-même à leur saisie.

Conformément aux dispositions de la loi 2017-20 portant code du numérique en République du Bénin, tout utilisateur dispose d'un droit d'accès, de rectification et d'opposition aux données personnelles le concernant, en effectuant sa demande écrite et signée, accompagnée d'une copie du titre d'identité avec signature du titulaire de la pièce, en précisant l'adresse à laquelle la réponse doit être envoyée.

Aucune information personnelle de l'utilisateur du site et de l'application « Zepargn » n'est publiée à l'insu de l'utilisateur, échangée, transférée, cédée ou vendue sur un support quelconque à des tiers.

Droit d'accès

En application de cette loi, les internautes disposent d'un droit d'accès, de rectification, de modification et de suppression concernant les données qui les concernent personnellement. Ce droit peut être exercé par voie postale auprès de ……………………….. ou par voie électronique à l'adresse email suivante : lawal@zepargn.com.

Les informations personnelles collectées ne sont en aucun cas confiées à des tiers.

Confidentialité

Vos données personnelles sont confidentielles et ne seront en aucun cas communiquées à des tiers, en dehors des partenaires agréés via lesquels s'effectue l'hébergement de vos fonds et des personnes habilitées en raison d'obligations légales, réglementaires et judiciaires.

Interactivité

Les utilisateurs du site peuvent y déposer du contenu, apparaissant sur le site dans des espaces dédiés auxquels ils peuvent accéder après identification et ouverture de compte.

Le contenu déposé dans les espaces de discussion et de commentaire reste sous la responsabilité de son auteur, qui en assume pleinement l'entière responsabilité juridique.

Le propriétaire du site se réserve néanmoins le droit de retirer sans préavis et sans justification tout contenu déposé par un utilisateur qui ne satisferait pas à l'objet du site ou à la législation en vigueur.

Propriété intellectuelle

Tout le contenu du présent site, incluant, de façon non limitative, les graphismes, images, textes, vidéos, animations, sons, logos, gifs et icônes ainsi que leur mise en forme sont la propriété exclusive de la société Digitall Elevate S.A.S.U, à l'exception des marques, logos ou contenus appartenant à d'autres sociétés partenaires ou auteurs.

Toute reproduction, distribution, modification, adaptation, retransmission ou publication, même partielle, de ces différents éléments est strictement interdite sans l'accord exprès par écrit de la société Digitall Elevate S.A.S.U.`;

export default function MentionsPage() {
  return (
    <section className="pb-16 pt-28 sm:pb-20 sm:pt-32">
      <Container className="max-w-5xl">
        <h1 className="title-section text-zepargn-navy">Mentions légales</h1>
        <p className="section-copy mt-4 max-w-3xl">
          Informations légales, éditeur, hébergement et droits des utilisateurs.
        </p>

        <article className="mt-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-soft sm:p-8">
          <pre className="type-body whitespace-pre-wrap font-sans text-slate-700">
            {legalMentionsContent}
          </pre>
        </article>
      </Container>
    </section>
  );
}
