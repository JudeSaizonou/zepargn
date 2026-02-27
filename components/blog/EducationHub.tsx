"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArticleListItem } from "@/components/blog/ArticleListItem";
import { BlogCard } from "@/components/blog/BlogCard";
import { FeaturedArticle } from "@/components/blog/FeaturedArticle";
import { Container } from "@/components/Container";
import {
  EDUCATION_CATEGORIES,
  EDUCATION_FILTERS,
  EducationArticle,
  EducationCategoryFilterSlug,
  sortEducationArticlesByDate
} from "@/content/educationArticles";

const RAIL_PREVIEW_LIMIT = 4;
const INITIAL_GRID_COUNT = 6;
const LOAD_MORE_STEP = 3;

function normalizeText(value: string) {
  return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function articleMatchesSearch(article: EducationArticle, normalizedSearch: string) {
  if (!normalizedSearch) {
    return true;
  }

  const searchable = normalizeText(
    `${article.title} ${article.subtitle ?? ""} ${article.excerpt} ${article.categoryLabel} ${article.authorName} ${(article.tags ?? []).join(" ")}`
  );

  return searchable.includes(normalizedSearch);
}

type EducationHubProps = {
  articles: EducationArticle[];
};

export function EducationHub({ articles }: EducationHubProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<EducationCategoryFilterSlug>("tous");
  const [visibleGridCount, setVisibleGridCount] = useState(INITIAL_GRID_COUNT);

  const allArticles = useMemo(() => sortEducationArticlesByDate(articles), [articles]);
  const normalizedSearch = useMemo(() => normalizeText(searchQuery.trim()), [searchQuery]);

  const filteredArticles = useMemo(
    () =>
      allArticles.filter((article) => {
        const matchesCategory = activeFilter === "tous" ? true : article.category === activeFilter;
        const matchesSearch = articleMatchesSearch(article, normalizedSearch);
        return matchesCategory && matchesSearch;
      }),
    [activeFilter, allArticles, normalizedSearch]
  );

  const featuredArticle = useMemo(
    () => filteredArticles.find((article) => article.featured) ?? filteredArticles[0],
    [filteredArticles]
  );

  const headlineRailArticles = useMemo(() => {
    const pool = featuredArticle
      ? filteredArticles.filter((article) => article.slug !== featuredArticle.slug)
      : filteredArticles;

    return pool.slice(0, 9);
  }, [featuredArticle, filteredArticles]);

  const categoriesToPreview = useMemo(() => {
    if (activeFilter !== "tous") {
      return EDUCATION_CATEGORIES.filter((category) => category.slug === activeFilter);
    }

    return EDUCATION_CATEGORIES;
  }, [activeFilter]);

  const categoryPreviewSections = useMemo(
    () =>
      categoriesToPreview
        .map((category) => {
          const categoryPool = allArticles.filter((article) => article.category === category.slug);
          const searchFilteredInCategory = categoryPool.filter((article) =>
            articleMatchesSearch(article, normalizedSearch)
          );
          const fullCategoryTotal = categoryPool.length;

          return {
            category,
            preview: searchFilteredInCategory.slice(0, RAIL_PREVIEW_LIMIT),
            hasMore: fullCategoryTotal > RAIL_PREVIEW_LIMIT
          };
        })
        .filter((section) => section.preview.length > 0),
    [allArticles, categoriesToPreview, normalizedSearch]
  );

  const mainGridPool = useMemo(() => {
    if (!featuredArticle) {
      return filteredArticles;
    }

    return filteredArticles.filter((article) => article.slug !== featuredArticle.slug);
  }, [featuredArticle, filteredArticles]);

  const visibleGridArticles = mainGridPool.slice(0, visibleGridCount);
  const hasMoreGridArticles = mainGridPool.length > visibleGridCount;

  const secondaryFeature = mainGridPool[0];
  const secondaryList = mainGridPool.slice(1, 5);

  return (
    <>
      <section className="overflow-x-hidden pb-12 pt-28 sm:pb-16 sm:pt-32">
        <Container>
          <div className="max-w-4xl" data-reveal="">
            <p className="section-kicker">Éducation</p>
            <h1 className="section-title mt-3">Apprendre à gérer son argent simplement</h1>
            <p className="section-copy mt-5 max-w-3xl">
              Un vrai hub de contenus pour mieux comprendre l’épargne, l’investissement, la bourse,
              l’immobilier, les banques, les SGI et les bases de la finance personnelle.
            </p>
          </div>

          <div className="mt-8" data-reveal="" data-reveal-delay="40">
            <label className="sr-only" htmlFor="education-search">
              Rechercher un article
            </label>
            <input
              autoComplete="off"
              className="type-input h-14 w-full rounded-2xl bg-[#F6F9FC] px-4 text-zepargn-navy placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zepargn-orange"
              id="education-search"
              onChange={(event) => {
                setSearchQuery(event.target.value);
                setVisibleGridCount(INITIAL_GRID_COUNT);
              }}
              placeholder="Rechercher un sujet: épargne, bourse, immobilier, SGI..."
              type="search"
              value={searchQuery}
            />
          </div>

          <div
            className="mt-6 max-w-full overflow-x-auto overscroll-x-contain pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            data-reveal=""
            data-reveal-delay="60"
          >
            <div className="flex min-w-max snap-x snap-mandatory items-center gap-2 whitespace-nowrap">
              {EDUCATION_FILTERS.map((filter) => {
                const active = filter.slug === activeFilter;

                return (
                  <button
                    aria-pressed={active}
                    className={`type-button min-h-11 shrink-0 snap-start whitespace-nowrap rounded-full px-4 transition-colors ${
                      active
                        ? "bg-zepargn-orange text-white"
                        : "bg-[#F6F9FC] text-zepargn-navy hover:bg-zepargn-sky/50"
                    }`}
                    key={filter.slug}
                    onClick={() => {
                      setActiveFilter(filter.slug);
                      setVisibleGridCount(INITIAL_GRID_COUNT);
                    }}
                    type="button"
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {featuredArticle ? (
        <section className="overflow-x-hidden pb-16 sm:pb-20">
          <Container>
            <div className="rounded-[2.3rem] bg-[#F6F9FC] p-4 sm:p-6 lg:p-8" data-reveal="" data-reveal-delay="90">
              <FeaturedArticle article={featuredArticle} />
            </div>
          </Container>
        </section>
      ) : null}

      {headlineRailArticles.length > 0 ? (
        <section className="pb-16 sm:pb-20">
          <Container>
            <div className="mb-6" data-reveal="">
              <p className="section-kicker">À la une</p>
              <h2 className="section-title mt-2">Articles à découvrir maintenant</h2>
            </div>

            <div
              className="flex max-w-full snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-2 md:gap-6 md:overflow-visible xl:grid-cols-3"
              data-reveal=""
              data-reveal-delay="50"
            >
              {headlineRailArticles.map((article) => (
                <div
                  className="w-[78%] min-w-[16rem] shrink-0 snap-start sm:w-[46%] md:min-w-0 md:w-auto md:shrink md:basis-auto"
                  key={article.slug}
                >
                  <BlogCard article={article} />
                </div>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {categoryPreviewSections.length > 0 ? (
        <section className="overflow-x-hidden pb-16 sm:pb-20">
          <Container>
            <div className="space-y-12">
              {categoryPreviewSections.map(({ category, preview, hasMore }) => (
                <article className="min-w-0" key={category.slug}>
                  <div className="mb-5 flex items-end justify-between gap-3">
                    <div>
                      <p className="type-kicker text-slate-500">Catégorie</p>
                      <h3 className="type-h3 mt-1 text-zepargn-navy">{category.label}</h3>
                      <p className="type-body mt-2 max-w-2xl text-slate-600">{category.intro}</p>
                    </div>

                    {hasMore ? (
                      <Link
                        className="section-cta border border-zepargn-navy text-zepargn-navy hover:bg-zepargn-navy hover:text-white"
                        href={`/ressources/education/categorie/${category.slug}`}
                      >
                        Voir plus
                      </Link>
                    ) : null}
                  </div>

                  <div className="flex max-w-full snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-2 md:gap-6 md:overflow-visible xl:grid-cols-3">
                    {preview.map((article) => (
                      <div
                        className="w-[78%] min-w-[16rem] shrink-0 snap-start sm:w-[46%] md:min-w-0 md:w-auto md:shrink md:basis-auto"
                        key={article.slug}
                      >
                        <BlogCard article={article} />
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <section className="pb-16 sm:pb-20">
        <Container>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-3" data-reveal="">
            <div>
              <p className="section-kicker">Bibliothèque</p>
              <h2 className="section-title mt-2">Tous les articles</h2>
            </div>
            <p className="type-small text-slate-500">{filteredArticles.length} article(s)</p>
          </div>

          {visibleGridArticles.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3" data-reveal="" data-reveal-delay="70">
              {visibleGridArticles.map((article) => (
                <BlogCard article={article} key={article.slug} />
              ))}
            </div>
          ) : (
            <div className="type-body rounded-2xl bg-[#F6F9FC] px-5 py-8 text-center text-slate-600" data-reveal="" data-reveal-delay="70">
              Aucun article ne correspond à cette recherche pour le moment.
            </div>
          )}

          <div className="mt-12" data-reveal="" data-reveal-delay="100">
            <button
              className="section-cta border border-zepargn-navy text-zepargn-navy hover:bg-zepargn-navy hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
              disabled={!hasMoreGridArticles}
              onClick={() => setVisibleGridCount((current) => current + LOAD_MORE_STEP)}
              type="button"
            >
              Charger plus d’articles
            </button>
          </div>
        </Container>
      </section>

      {secondaryFeature && secondaryList.length > 0 ? (
        <section className="bg-[#F6F9FC] py-20">
          <Container>
            <div className="mb-8 max-w-3xl" data-reveal="">
              <p className="section-kicker">Sélection éditoriale</p>
              <h2 className="section-title mt-2">À lire cette semaine</h2>
            </div>

            <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]" data-reveal="" data-reveal-delay="70">
              <div className="rounded-[2.1rem] bg-white p-5 sm:p-6">
                <FeaturedArticle article={secondaryFeature} compact />
              </div>

              <div className="space-y-2 rounded-[2.1rem] bg-white p-5 sm:p-6">
                {secondaryList.map((article) => (
                  <ArticleListItem article={article} key={article.slug} />
                ))}
              </div>
            </div>
          </Container>
        </section>
      ) : null}
    </>
  );
}
