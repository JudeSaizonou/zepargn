import { cache } from "react";
import { createClient, groq } from "next-sanity";
import {
  EducationArticle,
  EducationArticleBlock,
  EducationCategorySlug,
  EDUCATION_CATEGORIES,
  getAllEducationArticles,
  sortEducationArticlesByDate
} from "@/content/educationArticles";
import {
  hasSanityConfig,
  sanityApiVersion,
  sanityDataset,
  sanityProjectId
} from "@/sanity/env";

type SanityContentBlock = {
  _type: string;
  text?: string;
  items?: string[];
  alt?: string;
  caption?: string;
  src?: string;
};

type SanityEducationArticle = {
  _id: string;
  _updatedAt?: string;
  slug?: string;
  title?: string;
  subtitle?: string;
  excerpt?: string;
  category?: string;
  readingTime?: string;
  date?: string;
  authorName?: string;
  coverImage?: string;
  featured?: boolean;
  tags?: string[];
  keyTakeaways?: string[];
  contentBlocks?: SanityContentBlock[];
};

const sanityClient = hasSanityConfig
  ? createClient({
      projectId: sanityProjectId,
      dataset: sanityDataset,
      apiVersion: sanityApiVersion,
      useCdn: true,
      perspective: "published"
    })
  : null;

const CATEGORY_LABEL_BY_SLUG: Record<EducationCategorySlug, string> = EDUCATION_CATEGORIES.reduce(
  (accumulator, category) => {
    accumulator[category.slug] = category.label;
    return accumulator;
  },
  {} as Record<EducationCategorySlug, string>
);

const VALID_CATEGORY_SLUGS = new Set<EducationCategorySlug>(
  EDUCATION_CATEGORIES.map((category) => category.slug)
);

const SANITY_EDUCATION_ARTICLES_QUERY = groq`*[_type == "educationArticle" && defined(slug.current)] | order(coalesce(date, _updatedAt) desc) {
  _id,
  _updatedAt,
  "slug": slug.current,
  title,
  subtitle,
  excerpt,
  category,
  readingTime,
  date,
  authorName,
  "coverImage": coverImage.asset->url,
  featured,
  tags,
  keyTakeaways,
  contentBlocks[]{
    _type,
    text,
    items,
    alt,
    caption,
    "src": image.asset->url
  }
}`;

function normalizeDate(dateValue?: string, updatedAt?: string) {
  const raw = dateValue || updatedAt || "";

  if (/^\d{4}-\d{2}-\d{2}/.test(raw)) {
    return raw.slice(0, 10);
  }

  const parsed = new Date(raw);
  if (!Number.isNaN(parsed.getTime())) {
    return parsed.toISOString().slice(0, 10);
  }

  return "2026-01-01";
}

function mapBlock(block: SanityContentBlock): EducationArticleBlock | null {
  if (block._type === "h2Block" && block.text) {
    return { type: "h2", text: block.text };
  }

  if (block._type === "h3Block" && block.text) {
    return { type: "h3", text: block.text };
  }

  if (block._type === "paragraphBlock" && block.text) {
    return { type: "p", text: block.text };
  }

  if (block._type === "listBlock" && Array.isArray(block.items) && block.items.length > 0) {
    return { type: "list", items: block.items.filter(Boolean) };
  }

  if (block._type === "imageBlock" && block.src) {
    return {
      type: "image",
      src: block.src,
      alt: block.alt || "Illustration article Zepargn",
      caption: block.caption || "Illustration"
    };
  }

  if (block._type === "quoteBlock" && block.text) {
    return { type: "quote", text: block.text };
  }

  return null;
}

function mapSanityArticle(doc: SanityEducationArticle): EducationArticle | null {
  if (!doc.slug || !doc.title || !doc.excerpt || !doc.category || !VALID_CATEGORY_SLUGS.has(doc.category as EducationCategorySlug)) {
    return null;
  }

  const categorySlug = doc.category as EducationCategorySlug;
  const mappedBlocks = (doc.contentBlocks ?? []).map(mapBlock).filter(Boolean) as EducationArticleBlock[];

  return {
    id: doc._id,
    slug: doc.slug,
    title: doc.title,
    subtitle: doc.subtitle,
    excerpt: doc.excerpt,
    category: categorySlug,
    categoryLabel: CATEGORY_LABEL_BY_SLUG[categorySlug],
    readingTime: doc.readingTime || "5 min",
    date: normalizeDate(doc.date, doc._updatedAt),
    authorName: doc.authorName || "Équipe Zepargn",
    coverImage: doc.coverImage || "/hero-visual.svg",
    contentBlocks: mappedBlocks.length > 0 ? mappedBlocks : [{ type: "p", text: doc.excerpt }],
    keyTakeaways:
      Array.isArray(doc.keyTakeaways) && doc.keyTakeaways.length > 0
        ? doc.keyTakeaways.filter(Boolean)
        : ["L'essentiel est résumé dans cet article."],
    featured: Boolean(doc.featured),
    tags: Array.isArray(doc.tags) ? doc.tags.filter(Boolean) : []
  };
}

const fetchSanityEducationArticles = cache(async (): Promise<EducationArticle[]> => {
  if (!sanityClient) {
    return [];
  }

  try {
    const raw = await sanityClient.fetch<SanityEducationArticle[]>(
      SANITY_EDUCATION_ARTICLES_QUERY,
      {},
      { next: { revalidate: 60 } }
    );

    return raw
      .map(mapSanityArticle)
      .filter(Boolean) as EducationArticle[];
  } catch {
    return [];
  }
});

export async function getAllEducationArticlesData() {
  const sanityArticles = await fetchSanityEducationArticles();

  if (sanityArticles.length > 0) {
    return sortEducationArticlesByDate(sanityArticles);
  }

  return getAllEducationArticles();
}

export async function getEducationArticleBySlugData(slug: string) {
  const articles = await getAllEducationArticlesData();
  return articles.find((article) => article.slug === slug);
}

export async function getEducationArticleSlugsData() {
  const articles = await getAllEducationArticlesData();
  return articles.map((article) => article.slug);
}

export async function getEducationArticlesByCategoryData(categorySlug: EducationCategorySlug) {
  const articles = await getAllEducationArticlesData();
  return sortEducationArticlesByDate(
    articles.filter((article) => article.category === categorySlug)
  );
}

export async function getRelatedEducationArticlesData(article: EducationArticle, limit = 3) {
  const allArticles = await getAllEducationArticlesData();

  const sameCategory = allArticles.filter(
    (candidate) => candidate.slug !== article.slug && candidate.category === article.category
  );
  const otherCategories = allArticles.filter(
    (candidate) => candidate.slug !== article.slug && candidate.category !== article.category
  );

  return sortEducationArticlesByDate([...sameCategory, ...otherCategories]).slice(0, limit);
}

