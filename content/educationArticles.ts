export type EducationCategorySlug = "epargne" | "investissement" | "bourse" | "immobilier" | "banques" | "sgi" | "debuter";
export type EducationCategoryFilterSlug = "tous" | EducationCategorySlug;

export type EducationCategoryDefinition = {
  slug: EducationCategorySlug;
  label: string;
  intro: string;
};

export type EducationArticleBlock =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "list"; items: string[] }
  | { type: "image"; src: string; alt: string; caption: string }
  | { type: "quote"; text: string };

export type EducationArticle = {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  category: EducationCategorySlug;
  categoryLabel: string;
  readingTime: string;
  date: string;
  authorName: string;
  coverImage: string;
  contentBlocks: EducationArticleBlock[];
  keyTakeaways: string[];
  featured: boolean;
  tags?: string[];
};

export const EDUCATION_CATEGORIES: EducationCategoryDefinition[] = [
  {
    slug: "epargne",
    label: "Épargne",
    intro: "Apprenez à mettre de côté régulièrement, même avec un revenu variable."
  },
  {
    slug: "investissement",
    label: "Investissement",
    intro: "Comprendre les bases pour investir progressivement avec un cadre clair."
  },
  {
    slug: "bourse",
    label: "Bourse",
    intro: "Décoder les notions essentielles de la bourse en langage simple."
  },
  {
    slug: "immobilier",
    label: "Immobilier",
    intro: "Des repères concrets pour préparer un projet immobilier au Bénin."
  },
  {
    slug: "banques",
    label: "Banques",
    intro: "Comparer les options bancaires et mieux comprendre les frais du quotidien."
  },
  {
    slug: "sgi",
    label: "SGI",
    intro: "Comprendre le rôle des SGI et leur utilité pour commencer à investir."
  },
  {
    slug: "debuter",
    label: "Débuter",
    intro: "Finance simple pour débutants: guides pratiques pour prendre de bonnes habitudes."
  }
];

export const EDUCATION_FILTERS: Array<{ slug: EducationCategoryFilterSlug; label: string }> = [
  { slug: "tous", label: "Tous" },
  { slug: "epargne", label: "Épargne" },
  { slug: "investissement", label: "Investissement" },
  { slug: "immobilier", label: "Immobilier" },
  { slug: "bourse", label: "Bourse" },
  { slug: "banques", label: "Banques" },
  { slug: "sgi", label: "SGI" },
  { slug: "debuter", label: "Débuter" }
];

const CATEGORY_LABELS: Record<EducationCategorySlug, string> = EDUCATION_CATEGORIES.reduce(
  (accumulator, category) => ({
    ...accumulator,
    [category.slug]: category.label
  }),
  {} as Record<EducationCategorySlug, string>
);

const INLINE_IMAGES = [
  "/comment-marche-1.png",
  "/comment-marche-2.png",
  "/comment-marche-3.png",
  "/epargne-simple.png",
  "/epargne-collective.png",
  "/epargne-remuneree-zlock.png",
  "/microcredit-zflex.png"
] as const;

type ArticleSeed = {
  slug: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  category: EducationCategorySlug;
  readingTime: string;
  date: string;
  authorName: string;
  coverImage: string;
  angle: string;
  everydayExample: string;
  steps: string[];
  mistakes: string[];
  tags: string[];
  featured?: boolean;
};

const ARTICLE_SEEDS: ArticleSeed[] = [
  {
    slug: "comment-epargner-avec-petit-revenu",
    title: "Comment épargner avec un petit revenu",
    subtitle: "Une méthode réaliste quand chaque fin de mois est serrée",
    excerpt: "Trois habitudes simples pour mettre de côté sans casser votre budget quotidien.",
    category: "epargne",
    readingTime: "6 min",
    date: "2026-02-18",
    authorName: "Équipe Zepargn",
    coverImage: "/comment-marche-1.png",
    angle: "L'objectif n'est pas de faire un gros effort une fois, mais de répéter un petit effort chaque semaine.",
    everydayExample: "Si vous mettez 1 500 FCFA deux fois par semaine, vous créez une réserve sans sentir une grosse pression.",
    steps: [
      "Choisissez un montant très simple à respecter pendant 30 jours.",
      "Programmez un rappel fixe dans la semaine.",
      "Mettez l'argent de côté dès réception de vos revenus."
    ],
    mistakes: [
      "Commencer avec un montant trop élevé.",
      "Épargner seulement quand il reste de l'argent.",
      "Arrêter après une seule semaine difficile."
    ],
    tags: ["budget", "routine", "petit revenu"],
    featured: true
  },
  {
    slug: "plan-epargne-90-jours",
    title: "Construire un plan d'épargne sur 90 jours",
    subtitle: "Un cadre court pour prendre de l'élan",
    excerpt: "Découpez votre objectif en semaines pour rester motivé et mesurer vos progrès.",
    category: "epargne",
    readingTime: "5 min",
    date: "2026-02-14",
    authorName: "K. Sossa",
    coverImage: "/epargne-simple.png",
    angle: "Un horizon de 90 jours est assez court pour rester engagé et assez long pour voir un vrai résultat.",
    everydayExample: "Vous visez 120 000 FCFA en 3 mois: cela fait environ 10 000 FCFA par semaine.",
    steps: [
      "Fixez un objectif chiffré clair.",
      "Divisez ce montant en dépôts hebdomadaires.",
      "Faites un point chaque dimanche pour ajuster."
    ],
    mistakes: [
      "Ne pas suivre l'avancement chaque semaine.",
      "Changer d'objectif tous les 10 jours.",
      "Penser qu'un retard annule tout le plan."
    ],
    tags: ["objectif", "discipline", "3 mois"]
  },
  {
    slug: "objectif-epargne-sur-12-mois",
    title: "Atteindre un objectif d'épargne sur 12 mois",
    subtitle: "Du long terme, sans complexité",
    excerpt: "Apprenez à planifier une année d'épargne avec des montants réalistes.",
    category: "epargne",
    readingTime: "7 min",
    date: "2026-02-09",
    authorName: "N. Alao",
    coverImage: "/hero-visual.svg",
    angle: "Sur 12 mois, la régularité compte plus que les gros dépôts ponctuels.",
    everydayExample: "Pour viser 600 000 FCFA sur un an, vous pouvez répartir environ 50 000 FCFA par mois.",
    steps: [
      "Définissez une cible annuelle claire.",
      "Transformez-la en objectif mensuel.",
      "Préparez un plan B pour les mois plus difficiles."
    ],
    mistakes: [
      "Ne pas anticiper les périodes de dépenses élevées.",
      "Ignorer les petits écarts mensuels.",
      "Abandonner après un seul mois raté."
    ],
    tags: ["long terme", "organisation", "12 mois"]
  },
  {
    slug: "commencer-investir-avec-peu",
    title: "Comment commencer à investir avec peu",
    subtitle: "Démarrer petit, apprendre vite",
    excerpt: "Un guide clair pour faire vos premiers pas sans prendre de décisions impulsives.",
    category: "investissement",
    readingTime: "6 min",
    date: "2026-02-17",
    authorName: "Équipe Zepargn",
    coverImage: "/epargne-remuneree-zlock.png",
    angle: "Investir ne demande pas forcément un gros capital de départ. Le plus important est de commencer avec méthode.",
    everydayExample: "Vous pouvez tester une petite somme mensuelle pour comprendre le rythme et les résultats.",
    steps: [
      "Définissez votre objectif avant de choisir un produit.",
      "Commencez avec un montant que vous pouvez perdre sans stress.",
      "Suivez vos décisions dans un carnet simple."
    ],
    mistakes: [
      "Investir sous pression d'un proche.",
      "Chercher un gain rapide sans comprendre le produit.",
      "Mettre tout son argent dans une seule option."
    ],
    tags: ["début", "méthode", "objectif"],
    featured: true
  },
  {
    slug: "comprendre-risque-et-rendement",
    title: "Comprendre le risque et le rendement simplement",
    excerpt: "Une lecture claire du couple risque/rendement avec des exemples de la vraie vie.",
    category: "investissement",
    readingTime: "5 min",
    date: "2026-02-12",
    authorName: "F. Ahouansou",
    coverImage: "/microcredit-zflex.png",
    angle: "Plus un rendement potentiel est élevé, plus il faut accepter une part d'incertitude.",
    everydayExample: "Un projet stable rapporte souvent moins, mais peut être plus prévisible sur la durée.",
    steps: [
      "Identifiez votre tolérance au risque.",
      "Choisissez des horizons adaptés à vos projets.",
      "Comparez toujours plusieurs options avant de valider."
    ],
    mistakes: [
      "Confondre rendement estimé et rendement garanti.",
      "Suivre une tendance sans vérifier les conditions.",
      "Ignorer son propre niveau de stress face aux pertes."
    ],
    tags: ["risque", "rendement", "décision"]
  },
  {
    slug: "investissement-regulier-ou-ponctuel",
    title: "Investir régulièrement ou en une seule fois ?",
    excerpt: "Les avantages et limites de chaque approche, expliqués simplement.",
    category: "investissement",
    readingTime: "6 min",
    date: "2026-02-06",
    authorName: "M. Dossou",
    coverImage: "/comment-marche-2.png",
    angle: "Investir régulièrement aide souvent à garder la discipline, surtout quand on débute.",
    everydayExample: "Un dépôt mensuel réduit la pression de devoir choisir le bon moment.",
    steps: [
      "Choisissez une fréquence simple à maintenir.",
      "Gardez une partie de réserve pour les imprévus.",
      "Revoyez votre plan tous les 2 à 3 mois."
    ],
    mistakes: [
      "Attendre le moment parfait pour commencer.",
      "Ne pas adapter son rythme à ses revenus.",
      "Changer de stratégie chaque semaine."
    ],
    tags: ["stratégie", "régularité", "plan"]
  },
  {
    slug: "bourse-termes-essentiels",
    title: "Bourse: les termes essentiels à connaître",
    excerpt: "Un mini glossaire utile pour comprendre les bases sans jargon compliqué.",
    category: "bourse",
    readingTime: "5 min",
    date: "2026-02-16",
    authorName: "Équipe Zepargn",
    coverImage: "/hero-visual.svg",
    angle: "Comprendre quelques mots clés suffit déjà pour lire une actualité bourse avec plus de confiance.",
    everydayExample: "Quand vous connaissez la différence entre action et obligation, vous évitez des confusions courantes.",
    steps: [
      "Commencez par 5 termes incontournables.",
      "Associez chaque terme à un exemple concret.",
      "Relisez ces bases avant chaque décision."
    ],
    mistakes: [
      "Essayer de tout apprendre en une fois.",
      "Utiliser des mots sans en comprendre le sens.",
      "Prendre une décision juste après une vidéo virale."
    ],
    tags: ["glossaire", "actions", "obligations"],
    featured: true
  },
  {
    slug: "lire-une-action-sans-stress",
    title: "Lire une action sans stress",
    excerpt: "Comment regarder les infos de base d'une action avant d'acheter.",
    category: "bourse",
    readingTime: "6 min",
    date: "2026-02-10",
    authorName: "J. Agossou",
    coverImage: "/comment-marche-3.png",
    angle: "Regarder une action ne veut pas dire deviner l'avenir. Il s'agit de comprendre les données essentielles.",
    everydayExample: "Avant d'acheter, vous vérifiez l'activité de l'entreprise et la cohérence avec votre objectif.",
    steps: [
      "Vérifiez le secteur et le modèle d'activité.",
      "Regardez l'historique sur plusieurs périodes.",
      "Décidez seulement si vous comprenez ce que vous achetez."
    ],
    mistakes: [
      "Acheter parce que le prix monte vite.",
      "Copier un portefeuille sans réflexion.",
      "Ignorer votre horizon de temps."
    ],
    tags: ["action", "analyse", "discipline"]
  },
  {
    slug: "premier-portefeuille-bourse-simple",
    title: "Construire un premier portefeuille bourse simple",
    excerpt: "Un cadre minimal pour éviter de se disperser quand on démarre.",
    category: "bourse",
    readingTime: "7 min",
    date: "2026-02-04",
    authorName: "K. Sossa",
    coverImage: "/epargne-remuneree-zlock.png",
    angle: "Un portefeuille débutant doit rester lisible. Trop de lignes dès le départ complique le suivi.",
    everydayExample: "Avec quelques positions seulement, vous comprenez mieux ce qui fonctionne et pourquoi.",
    steps: [
      "Fixez une règle simple de diversification.",
      "Définissez un montant maximum par position.",
      "Planifiez vos revues de portefeuille."
    ],
    mistakes: [
      "Multiplier les positions sans logique.",
      "Investir sans règle de sortie.",
      "Négliger le suivi mensuel."
    ],
    tags: ["portefeuille", "diversification", "débutant"]
  },
  {
    slug: "immobilier-benin-premier-pas",
    title: "Immobilier au Bénin: les premiers pas",
    excerpt: "Les questions à poser avant de lancer un projet immobilier.",
    category: "immobilier",
    readingTime: "8 min",
    date: "2026-02-15",
    authorName: "A. Hounkpatin",
    coverImage: "/comment-marche-2.png",
    angle: "Un projet immobilier se prépare d'abord avec des chiffres simples: budget, délai, objectif d'usage.",
    everydayExample: "Vous comparez location et achat selon votre horizon de vie sur 3 à 5 ans.",
    steps: [
      "Clarifiez l'objectif du projet (habiter, louer, revendre).",
      "Estimez les coûts visibles et cachés.",
      "Préparez une marge pour imprévus."
    ],
    mistakes: [
      "Sous-estimer les frais annexes.",
      "Décider sans vérifier les documents clés.",
      "S'engager avec un budget déjà trop serré."
    ],
    tags: ["projet", "logement", "préparation"]
  },
  {
    slug: "louer-ou-vendre-comment-choisir",
    title: "Louer ou vendre: comment choisir selon votre objectif",
    excerpt: "Une approche simple pour arbitrer entre revenu locatif et revente.",
    category: "immobilier",
    readingTime: "6 min",
    date: "2026-02-08",
    authorName: "N. Alao",
    coverImage: "/hero-visual.svg",
    angle: "Le bon choix dépend de votre horizon: revenu régulier long terme ou besoin de liquidité plus rapide.",
    everydayExample: "Un bien loué peut sécuriser un revenu mensuel, mais demande un suivi régulier.",
    steps: [
      "Définissez votre horizon de temps.",
      "Comparez les scénarios de revenus.",
      "Intégrez les contraintes de gestion."
    ],
    mistakes: [
      "Choisir uniquement sur l'émotion.",
      "Oublier les charges de maintenance.",
      "Ne pas prévoir la vacance locative."
    ],
    tags: ["location", "revente", "choix"]
  },
  {
    slug: "budget-achat-terrain-maison",
    title: "Préparer un budget pour terrain ou maison",
    excerpt: "Comment construire un budget immobilier lisible et réaliste.",
    category: "immobilier",
    readingTime: "7 min",
    date: "2026-02-02",
    authorName: "M. Dossou",
    coverImage: "/epargne-collective.png",
    angle: "Un bon budget immobilier inclut toujours un coussin de sécurité.",
    everydayExample: "Vous fixez un plafond de dépense total avant même de visiter un bien.",
    steps: [
      "Listez les coûts fixes et variables.",
      "Ajoutez une réserve de sécurité.",
      "Validez la capacité de paiement mensuelle."
    ],
    mistakes: [
      "Oublier les frais administratifs.",
      "Négocier sans limite budgétaire claire.",
      "Ignorer la capacité de remboursement réelle."
    ],
    tags: ["budget", "terrain", "maison"]
  },
  {
    slug: "banque-vs-mobile-money",
    title: "Banque vs Mobile Money: quelle différence pour gérer son argent",
    excerpt: "Un comparatif concret selon les usages du quotidien.",
    category: "banques",
    readingTime: "5 min",
    date: "2026-02-13",
    authorName: "Équipe Zepargn",
    coverImage: "/comment-marche-3.png",
    angle: "Les deux solutions peuvent être complémentaires si vous savez pour quel usage les utiliser.",
    everydayExample: "Mobile Money pour les paiements rapides, banque pour certaines opérations longues ou structurées.",
    steps: [
      "Listez vos usages les plus fréquents.",
      "Comparez les frais liés à ces usages.",
      "Choisissez une combinaison simple à suivre."
    ],
    mistakes: [
      "Choisir uniquement sur les habitudes.",
      "Ignorer les frais de retrait et de transfert.",
      "Multiplier les comptes sans utilité claire."
    ],
    tags: ["mobile money", "banque", "comparaison"],
    featured: true
  },
  {
    slug: "frais-bancaires-a-verifier",
    title: "Frais bancaires: les 5 lignes à vérifier en priorité",
    excerpt: "Une checklist rapide pour éviter les mauvaises surprises.",
    category: "banques",
    readingTime: "4 min",
    date: "2026-02-07",
    authorName: "F. Ahouansou",
    coverImage: "/hero-visual.svg",
    angle: "Comprendre les frais vous aide à choisir un compte vraiment adapté à votre profil.",
    everydayExample: "Un petit frais répété chaque semaine peut peser lourd sur un mois complet.",
    steps: [
      "Vérifiez les frais d'ouverture et de tenue de compte.",
      "Comparez les coûts de retrait.",
      "Regardez les frais de transfert et de carte."
    ],
    mistakes: [
      "Signer sans lire la grille tarifaire.",
      "Comparer seulement un type de frais.",
      "Négliger les frais liés aux opérations courantes."
    ],
    tags: ["frais", "checklist", "comparatif"]
  },
  {
    slug: "choisir-une-banque-quand-on-debute",
    title: "Choisir une banque quand on débute",
    excerpt: "Les critères simples pour faire un choix utile dès le départ.",
    category: "banques",
    readingTime: "6 min",
    date: "2026-02-01",
    authorName: "J. Agossou",
    coverImage: "/comment-marche-1.png",
    angle: "Le meilleur choix est souvent la banque dont les services correspondent à vos usages réels.",
    everydayExample: "Si vous encaissez souvent via mobile, privilégiez une option fluide entre compte et wallet.",
    steps: [
      "Définissez vos opérations les plus fréquentes.",
      "Testez la qualité de l'app et du support.",
      "Évaluez la clarté des frais."
    ],
    mistakes: [
      "Choisir uniquement selon la notoriété.",
      "Ignorer la facilité d'usage mobile.",
      "Négliger la disponibilité du support."
    ],
    tags: ["débutant", "choix", "services"]
  },
  {
    slug: "sgi-explique-simplement",
    title: "SGI expliqué simplement",
    subtitle: "Comprendre le rôle d'une Société de Gestion et d'Intermédiation",
    excerpt: "Découvrez à quoi sert une SGI et quand elle intervient dans un parcours d'investissement.",
    category: "sgi",
    readingTime: "6 min",
    date: "2026-02-11",
    authorName: "Équipe Zepargn",
    coverImage: "/epargne-remuneree-zlock.png",
    angle: "Une SGI est un intermédiaire qui facilite certaines opérations d'investissement sur les marchés financiers.",
    everydayExample: "C'est comme un guide qui vous aide à accéder au marché avec un cadre plus structuré.",
    steps: [
      "Comprenez le rôle exact de la SGI.",
      "Vérifiez les services proposés.",
      "Lisez les conditions avant de vous engager."
    ],
    mistakes: [
      "Confondre SGI et banque classique.",
      "Ignorer les frais de service.",
      "Signer sans comprendre les documents."
    ],
    tags: ["intermédiaire", "marché", "explication"],
    featured: true
  },
  {
    slug: "ouvrir-compte-titres-au-benin",
    title: "Ouvrir un compte titres au Bénin",
    excerpt: "Les étapes de base pour ouvrir un compte titres de manière claire.",
    category: "sgi",
    readingTime: "7 min",
    date: "2026-02-05",
    authorName: "K. Sossa",
    coverImage: "/microcredit-zflex.png",
    angle: "L'ouverture d'un compte titres demande des documents précis, mais le parcours peut rester simple si vous êtes préparé.",
    everydayExample: "Préparer vos pièces en amont vous évite des allers-retours inutiles.",
    steps: [
      "Rassemblez les documents demandés.",
      "Vérifiez les frais et conditions.",
      "Posez vos questions avant validation finale."
    ],
    mistakes: [
      "Négliger la lecture des conditions.",
      "Ne pas comparer plusieurs offres.",
      "Commencer sans objectif d'investissement clair."
    ],
    tags: ["compte titres", "démarches", "benin"]
  },
  {
    slug: "role-sgi-dans-strategie-investissement",
    title: "Le rôle d'une SGI dans une stratégie d'investissement",
    excerpt: "Quand et pourquoi une SGI peut vous aider à structurer votre approche.",
    category: "sgi",
    readingTime: "6 min",
    date: "2026-01-31",
    authorName: "A. Hounkpatin",
    coverImage: "/hero-visual.svg",
    angle: "Une SGI peut être utile pour passer d'une logique intuitive à une approche plus structurée.",
    everydayExample: "Vous définissez d'abord votre objectif, puis la SGI vous aide à choisir un cadre cohérent.",
    steps: [
      "Clarifiez vos priorités d'investissement.",
      "Demandez un plan simple et compréhensible.",
      "Suivez vos résultats dans le temps."
    ],
    mistakes: [
      "Attendre des promesses de gains rapides.",
      "Ne pas poser de questions sur les risques.",
      "Ignorer le suivi après souscription."
    ],
    tags: ["stratégie", "accompagnement", "suivi"]
  },
  {
    slug: "creer-son-premier-budget-personnel",
    title: "Créer son premier budget personnel",
    excerpt: "Une méthode en 20 minutes pour voir où part votre argent.",
    category: "debuter",
    readingTime: "5 min",
    date: "2026-02-03",
    authorName: "Équipe Zepargn",
    coverImage: "/comment-marche-2.png",
    angle: "Le budget n'est pas une punition. C'est un outil pour décider en avance au lieu de subir.",
    everydayExample: "Quand vos dépenses fixes sont claires, vous savez exactement ce qu'il reste pour vos objectifs.",
    steps: [
      "Notez vos revenus mensuels réels.",
      "Séparez dépenses fixes et variables.",
      "Réservez une part pour l'épargne avant le reste."
    ],
    mistakes: [
      "Sous-estimer les petites dépenses quotidiennes.",
      "Ne pas mettre à jour le budget chaque mois.",
      "Chercher un budget parfait dès la première version."
    ],
    tags: ["budget", "organisation", "début"]
  },
  {
    slug: "5-erreurs-finance-quand-on-debute",
    title: "5 erreurs de finance personnelle quand on débute",
    excerpt: "Évitez les pièges les plus fréquents pour progresser plus vite.",
    category: "debuter",
    readingTime: "6 min",
    date: "2026-01-29",
    authorName: "N. Alao",
    coverImage: "/comment-marche-3.png",
    angle: "La plupart des erreurs viennent d'un manque de cadre, pas d'un manque d'intelligence.",
    everydayExample: "Un simple plan hebdomadaire évite beaucoup de décisions prises sous stress.",
    steps: [
      "Faites un point financier chaque semaine.",
      "Décidez une règle simple d'épargne.",
      "Évitez de copier une stratégie sans la comprendre."
    ],
    mistakes: [
      "Vivre sans aucun suivi des dépenses.",
      "Reporter l'épargne à la fin du mois.",
      "Confondre besoin et envie dans les achats."
    ],
    tags: ["erreurs", "discipline", "bases"]
  },
  {
    slug: "checklist-avant-premier-investissement",
    title: "Checklist avant votre premier investissement",
    excerpt: "Une liste claire pour vérifier l'essentiel avant de vous lancer.",
    category: "debuter",
    readingTime: "5 min",
    date: "2026-01-24",
    authorName: "M. Dossou",
    coverImage: "/hero-visual.svg",
    angle: "Avant d'investir, le plus important est de savoir pourquoi vous investissez et combien de temps vous pouvez attendre.",
    everydayExample: "Un investissement aligné à un objectif concret est plus facile à tenir dans le temps.",
    steps: [
      "Écrivez votre objectif en une phrase.",
      "Fixez votre horizon de temps.",
      "Définissez un montant de départ raisonnable."
    ],
    mistakes: [
      "Investir sans objectif défini.",
      "Utiliser l'argent destiné aux urgences.",
      "Ne pas lire les conditions du produit."
    ],
    tags: ["checklist", "premier pas", "investissement"]
  },
  {
    slug: "taux-comment-les-lire-facilement",
    title: "Taux: comment les lire facilement",
    excerpt: "Une explication pratique des taux et de leur impact sur votre résultat.",
    category: "investissement",
    readingTime: "5 min",
    date: "2026-01-22",
    authorName: "Équipe Zepargn",
    coverImage: "/epargne-remuneree-zlock.png",
    angle: "Lire un taux devient simple quand vous le reliez à une durée et à un montant précis.",
    everydayExample: "Deux offres au même taux peuvent donner des résultats différents selon les conditions.",
    steps: [
      "Regardez le taux et la durée ensemble.",
      "Vérifiez les conditions de sortie.",
      "Calculez un scénario simple avant décision."
    ],
    mistakes: [
      "Se concentrer uniquement sur le chiffre du taux.",
      "Oublier les conditions en cas de retrait anticipé.",
      "Comparer des offres sur des durées différentes sans ajuster."
    ],
    tags: ["taux", "comparaison", "lecture"]
  },
  {
    slug: "epargne-groupe-bonnes-pratiques",
    title: "Épargne en groupe: les bonnes pratiques",
    excerpt: "Comment organiser un groupe d'épargne clair et transparent.",
    category: "epargne",
    readingTime: "6 min",
    date: "2026-01-20",
    authorName: "F. Ahouansou",
    coverImage: "/epargne-collective.png",
    angle: "Un groupe fonctionne bien quand les règles sont écrites et comprises par tous dès le départ.",
    everydayExample: "Un calendrier de dépôt partagé réduit les tensions et renforce la confiance du groupe.",
    steps: [
      "Définissez les règles de contribution.",
      "Choisissez un admin reconnu par le groupe.",
      "Partagez régulièrement l'état des fonds."
    ],
    mistakes: [
      "Commencer sans règles explicites.",
      "Ne pas communiquer les retards de dépôt.",
      "Laisser un seul membre décider sans transparence."
    ],
    tags: ["groupe", "transparence", "discipline"]
  },
  {
    slug: "epargner-avec-revenu-variable",
    title: "Épargner avec un revenu variable",
    excerpt: "Un cadre simple pour rester régulier même quand vos revenus changent d'un mois à l'autre.",
    category: "epargne",
    readingTime: "6 min",
    date: "2026-01-19",
    authorName: "K. Sossa",
    coverImage: "/epargne-simple.png",
    angle: "Quand les revenus varient, fixer une règle en pourcentage aide à garder une progression stable.",
    everydayExample: "Un mois haut, vous déposez un peu plus; un mois bas, vous gardez au moins le minimum prévu.",
    steps: [
      "Fixez un pourcentage cible réaliste de vos revenus.",
      "Définissez un minimum de dépôt pour les mois difficiles.",
      "Ajustez mensuellement sans abandonner la routine."
    ],
    mistakes: [
      "Attendre un mois parfait pour épargner.",
      "Changer la règle chaque semaine.",
      "Supprimer totalement l'épargne au premier imprévu."
    ],
    tags: ["revenu variable", "routine", "flexibilité"]
  },
  {
    slug: "immobilier-location-petit-budget",
    title: "Immobilier locatif avec petit budget: que vérifier",
    excerpt: "Les vérifications clés avant de viser un petit projet locatif.",
    category: "immobilier",
    readingTime: "7 min",
    date: "2026-01-18",
    authorName: "A. Hounkpatin",
    coverImage: "/comment-marche-1.png",
    angle: "Même avec un petit budget, il faut poser un cadre clair pour protéger votre rentabilité.",
    everydayExample: "Un loyer correct sur le papier peut devenir faible après charges et périodes sans locataire.",
    steps: [
      "Estimez les charges annuelles.",
      "Évaluez la demande locative de la zone.",
      "Gardez une réserve pour travaux et imprévus."
    ],
    mistakes: [
      "Négliger les périodes de vacance locative.",
      "Sous-estimer les coûts de maintenance.",
      "Choisir un bien sans analyse locale."
    ],
    tags: ["locatif", "petit budget", "risques"]
  },
  {
    slug: "banque-checklist-ouverture-compte",
    title: "Checklist pour ouvrir un compte bancaire utile",
    excerpt: "Les points à vérifier avant l'ouverture pour éviter les mauvaises surprises.",
    category: "banques",
    readingTime: "4 min",
    date: "2026-01-16",
    authorName: "J. Agossou",
    coverImage: "/comment-marche-2.png",
    angle: "Ouvrir un compte est facile. Choisir le bon compte demande de comparer quelques éléments essentiels.",
    everydayExample: "Un compte gratuit à l'ouverture peut coûter plus cher ensuite via les opérations courantes.",
    steps: [
      "Vérifiez les frais de gestion mensuels.",
      "Comparez les frais de retrait et de transfert.",
      "Testez la clarté de l'application mobile."
    ],
    mistakes: [
      "Signer sans lire les détails tarifaires.",
      "Choisir un compte sans lien avec vos usages.",
      "Ignorer la qualité du support client."
    ],
    tags: ["ouverture", "checklist", "frais"]
  },
  {
    slug: "investir-etape-par-etape-sur-un-an",
    title: "Investir étape par étape sur un an",
    excerpt: "Un plan annuel simple pour progresser sans se disperser.",
    category: "investissement",
    readingTime: "7 min",
    date: "2026-01-21",
    authorName: "Équipe Zepargn",
    coverImage: "/epargne-remuneree-zlock.png",
    angle: "Un plan sur douze mois vous aide à garder le cap, même quand l'actualité change vite.",
    everydayExample: "Un suivi mensuel de vos actions suffit pour corriger votre trajectoire sans stress.",
    steps: [
      "Fixez une cible annuelle claire.",
      "Programmez une fréquence d'investissement stable.",
      "Faites un bilan simple à la fin de chaque mois."
    ],
    mistakes: [
      "Changer de stratégie trop souvent.",
      "Comparer vos résultats à ceux des autres chaque semaine.",
      "Oublier l'objectif initial en cours de route."
    ],
    tags: ["plan annuel", "discipline", "suivi"]
  }
];

function buildContentBlocks(seed: ArticleSeed, index: number): EducationArticleBlock[] {
  const inlineA = INLINE_IMAGES[index % INLINE_IMAGES.length];
  const inlineB = INLINE_IMAGES[(index + 3) % INLINE_IMAGES.length];

  return [
    {
      type: "h2",
      text: "Ce qu'il faut comprendre"
    },
    {
      type: "p",
      text: seed.angle
    },
    {
      type: "h3",
      text: "Exemple de tous les jours"
    },
    {
      type: "p",
      text: seed.everydayExample
    },
    {
      type: "image",
      src: inlineA,
      alt: `Illustration: ${seed.title}`,
      caption: "Exemple visuel pour mieux comprendre"
    },
    {
      type: "h2",
      text: "Comment commencer concrètement"
    },
    {
      type: "list",
      items: seed.steps
    },
    {
      type: "image",
      src: inlineB,
      alt: `Illustration pratique: ${seed.title}`,
      caption: "Mise en pratique pas à pas"
    },
    {
      type: "h2",
      text: "Erreurs à éviter"
    },
    {
      type: "list",
      items: seed.mistakes
    },
    {
      type: "quote",
      text: "Une bonne décision financière est souvent simple, lisible et répétable dans le temps."
    }
  ];
}

export const EDUCATION_ARTICLES: EducationArticle[] = ARTICLE_SEEDS.map((seed, index) => ({
  id: seed.slug,
  slug: seed.slug,
  title: seed.title,
  subtitle: seed.subtitle,
  excerpt: seed.excerpt,
  category: seed.category,
  categoryLabel: CATEGORY_LABELS[seed.category],
  readingTime: seed.readingTime,
  date: seed.date,
  authorName: seed.authorName,
  coverImage: seed.coverImage,
  contentBlocks: buildContentBlocks(seed, index),
  keyTakeaways: [
    seed.steps[0],
    seed.steps[1],
    "Gardez un rythme régulier et ajustez votre plan sans l'abandonner."
  ],
  featured: Boolean(seed.featured),
  tags: seed.tags
}));

export function formatEducationDate(dateISO: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  }).format(new Date(dateISO));
}

export function sortEducationArticlesByDate(articles: EducationArticle[]) {
  return [...articles].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getAllEducationArticles() {
  return sortEducationArticlesByDate(EDUCATION_ARTICLES);
}

export function getEducationArticleBySlug(slug: string) {
  return EDUCATION_ARTICLES.find((article) => article.slug === slug);
}

export function getEducationCategory(slug: EducationCategorySlug) {
  return EDUCATION_CATEGORIES.find((category) => category.slug === slug);
}

export function getEducationArticlesByCategory(categorySlug: EducationCategorySlug) {
  return sortEducationArticlesByDate(EDUCATION_ARTICLES.filter((article) => article.category === categorySlug));
}

export function getRelatedEducationArticles(article: EducationArticle, limit = 3) {
  const sameCategory = EDUCATION_ARTICLES.filter(
    (candidate) => candidate.slug !== article.slug && candidate.category === article.category
  );

  const otherCategories = EDUCATION_ARTICLES.filter(
    (candidate) => candidate.slug !== article.slug && candidate.category !== article.category
  );

  return sortEducationArticlesByDate([...sameCategory, ...otherCategories]).slice(0, limit);
}
