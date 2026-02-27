export const DOWNLOAD_LINKS = {
  ios: "https://apps.apple.com/us/app/zepargn/id6474701827?platform=iphone",
  android: "https://play.google.com/store/apps/details?id=com.digitalelevate.zepargnmobileapp"
} as const;

export const KPI_ITEMS = [
  { label: "Objectifs atteints", value: "+3000" },
  { label: "Montant total épargné", value: "174,861,450 FCFA" },
  { label: "Communauté", value: "+8000 Zepargnants" }
] as const;

export const RATE_PREVIEW = [
  { duree: "3 mois", taux: "5%" },
  { duree: "6 mois", taux: "6%" },
  { duree: "12 mois", taux: "7.5%" },
  { duree: "24 mois", taux: "9%" }
] as const;

export const MEDIA_QUOTES = [
  {
    source: "We Are Tech Africa",
    quote:
      "Zepargn révolutionne l'épargne avec son application mobile. La fintech béninoise a enregistré plus de 1 500 utilisateurs actifs et plus de 15 millions FCFA épargnés sur la plateforme depuis son lancement.",
    href: "https://www.wearetech.africa/fr/fils/solutions/benin-zepargn-revolutionne-l-epargne-avec-son-application-mobile",
    linkLabel: "Lire plus →"
  },
  {
    source: "Gouv.bj",
    quote:
      "Zepargn faisait partie des dix (10) entrepreneurs visionnaires représentant le Bénin à FrancoTech 2024, présentant des solutions financières innovantes pour le marché africain.",
    href: "https://www.gouv.bj/article/2795/benin-innov-entrepreneurs-visionnaires-representent-benin-francotech-2024/",
    linkLabel: "Lire plus →"
  }
] as const;

export type FAQItem = {
  question: string;
  answer: string;
};

export const FAQ_PREVIEW: FAQItem[] = [
  {
    question: "Quel est le délai réel pour retirer mon argent ?",
    answer:
      "Le délai dépend du produit et du moyen de paiement. En Z-Lock, un retrait anticipé reste possible et les fonds sont disponibles sous 72 heures ouvrées maximum."
  },
  {
    question: "Quels sont les frais exacts ?",
    answer:
      "Dépôt Mobile Money (MTN/Moov/Celtis): 2%. Dépôt carte: 3,5%. Dépôt depuis l'étranger: 0,5% + frais agrégateur. Retrait avant la date de fin d'objectif: 5%."
  },
  {
    question: "Quelles sont les conditions de Z-Lock et Z-Flex ?",
    answer:
      "Z-Lock bloque l'épargne sur une durée choisie pour viser un meilleur taux. Z-Flex est un microcrédit avec conditions affichées avant validation et pénalité en cas de retard."
  },
  {
    question: "Que faire si je perds mon téléphone ?",
    answer:
      "Installez l'app sur un nouveau téléphone et reconnectez-vous avec votre numéro. Si besoin, le support vérifie votre identité pour sécuriser et restaurer l'accès."
  }
];

export const FAQ_FULL: FAQItem[] = [
  ...FAQ_PREVIEW,
  {
    question: "Est-ce risqué ?",
    answer:
      "Comme tout produit financier, il y a des conditions à respecter. Z-Lock pénalise le retrait anticipé, et Z-Flex applique des pénalités en cas de retard de remboursement."
  },
  {
    question: "Combien faut-il pour commencer ?",
    answer: "Vous pouvez démarrer avec un petit montant puis augmenter à votre rythme."
  },
  {
    question: "Comment ça marche concrètement ?",
    answer:
      "Vous créez un compte, vous choisissez un objectif, vous faites un premier dépôt, puis vous suivez votre progression en temps réel dans l'application."
  },
  {
    question: "L'épargne en groupe est-elle privée ?",
    answer:
      "Oui. Vous pouvez créer un groupe privé avec accès réservé ou un groupe public selon votre objectif."
  },
  {
    question: "Qui gère un groupe d'épargne ?",
    answer:
      "Chaque groupe peut avoir un admin. Les règles sont visibles par tous les membres pour garder de la transparence."
  },
  {
    question: "Que se passe-t-il en Z-Lock si je retire avant la fin ?",
    answer:
      "Les intérêts prévus ne sont pas acquis. Une pénalité s'applique selon les conditions du produit, et les fonds sont libérés sous 72 heures ouvrées maximum."
  },
  {
    question: "Quelles sont les pénalités possibles sur Z-Flex ?",
    answer:
      "Le microcrédit Z-Flex applique un taux forfaitaire affiché avant validation. En cas de retard, une pénalité de 2% par jour est appliquée, plafonnée à 30% du montant emprunté."
  },
  {
    question: "Comment télécharger l'application ?",
    answer:
      "Utilisez les boutons iOS et Android présents sur le site pour ouvrir directement votre store."
  }
];
