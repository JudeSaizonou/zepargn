export type NavItem = {
  label: string;
  href: string;
  description: string;
  visualLabel: string;
};

export type NavTab = {
  id: "fonctionnalites" | "ressources" | "a-propos";
  label: string;
  overviewHref: string;
  panelTitle: string;
  panelDescription: string;
  visualTitle: string;
  visualBody: string;
  columns: 1 | 2;
  items: NavItem[];
};

export const NAV_TABS: NavTab[] = [
  {
    id: "fonctionnalites",
    label: "Fonctionnalités",
    overviewHref: "/fonctionnalites",
    panelTitle: "Explorez les fonctionnalités Zepargn",
    panelDescription: "Choisissez un parcours et comprenez en quelques minutes comment l'utiliser dans la vraie vie.",
    visualTitle: "Aperçu parcours",
    visualBody: "Objectif, dépôt, suivi: un flux simple pour passer de l'idée au résultat.",
    columns: 2,
    items: [
      {
        label: "Épargne personnelle",
        href: "/fonctionnalites/epargne-personnelle",
        description: "Épargner seul à votre rythme avec un suivi clair.",
        visualLabel: "Solo"
      },
      {
        label: "Épargne collective",
        href: "/fonctionnalites/epargne-collective",
        description: "Construire un projet à plusieurs avec transparence.",
        visualLabel: "Groupe"
      },
      {
        label: "Z-Lock",
        href: "/fonctionnalites/z-lock",
        description: "Bloquer son épargne sur une durée choisie.",
        visualLabel: "Lock"
      },
      {
        label: "Z-Flex",
        href: "/fonctionnalites/z-flex",
        description: "Une option souple pour un besoin ponctuel.",
        visualLabel: "Flex"
      },
      {
        label: "Challenges & Z-Points",
        href: "/fonctionnalites/challenges-zpoints",
        description: "Rester motivé grâce à des objectifs progressifs.",
        visualLabel: "Points"
      },
      {
        label: "Parrainage",
        href: "/fonctionnalites/parrainage",
        description: "Avancer avec vos proches et garder le rythme.",
        visualLabel: "Parrainage"
      }
    ]
  },
  {
    id: "ressources",
    label: "Ressources",
    overviewHref: "/ressources",
    panelTitle: "Ressources utiles",
    panelDescription: "Apprenez vite, trouvez des réponses simples et suivez les nouveautés du produit.",
    visualTitle: "Comprendre rapidement",
    visualBody: "Des contenus courts, concrets, pensés pour décider sans jargon.",
    columns: 1,
    items: [
      {
        label: "Éducation",
        href: "/ressources/education",
        description: "Mini leçons simples pour mieux épargner.",
        visualLabel: "Édu"
      },
      {
        label: "Nouveautés",
        href: "/ressources/nouveautes",
        description: "Les dernières évolutions de Zepargn.",
        visualLabel: "News"
      },
      {
        label: "FAQ",
        href: "/faq",
        description: "Réponses directes aux questions fréquentes.",
        visualLabel: "FAQ"
      },
      {
        label: "Calculateur de budget",
        href: "/ressources/budget",
        description: "Planifiez vos dépenses et visualisez vos flux financiers.",
        visualLabel: "Budget"
      },
      {
        label: "Simulateur",
        href: "/simulateur",
        description: "Testez un montant et une durée en quelques secondes.",
        visualLabel: "Simu"
      }
    ]
  },
  {
    id: "a-propos",
    label: "À propos",
    overviewHref: "/a-propos",
    panelTitle: "Découvrir Zepargn",
    panelDescription: "Notre histoire, nos chiffres, notre cadre de sécurité et nos contacts.",
    visualTitle: "Mission et impact",
    visualBody: "Pourquoi Zepargn existe et comment nous avançons avec la communauté.",
    columns: 1,
    items: [
      {
        label: "Notre histoire",
        href: "/a-propos#intro",
        description: "Pourquoi nous avons créé Zepargn.",
        visualLabel: "Histoire"
      },
      {
        label: "Zepargn en chiffres",
        href: "/a-propos#chiffres",
        description: "Les indicateurs clés de progression.",
        visualLabel: "Chiffres"
      },
      {
        label: "Sécurité",
        href: "/a-propos#securite",
        description: "Protection des fonds, KYC et cadre partenaire.",
        visualLabel: "Sécurité"
      },
      {
        label: "Contact",
        href: "/a-propos#contact",
        description: "Les canaux simples pour joindre l'équipe.",
        visualLabel: "Contact"
      }
    ]
  }
];
