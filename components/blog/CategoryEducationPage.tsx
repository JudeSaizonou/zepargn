"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { BlogCard } from "@/components/blog/BlogCard";
import { Container } from "@/components/Container";
import { EducationArticle, EducationCategoryDefinition, sortEducationArticlesByDate } from "@/content/educationArticles";

type CategoryEducationPageProps = {
  category: EducationCategoryDefinition;
  articles: EducationArticle[];
};

function normalizeText(value: string) {
  return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export function CategoryEducationPage({ category, articles }: CategoryEducationPageProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = useMemo(() => {
    const normalizedSearch = normalizeText(searchQuery.trim());

    const filtered = articles.filter((article) => {
      if (!normalizedSearch) {
        return true;
      }

      const searchable = normalizeText(
        `${article.title} ${article.subtitle ?? ""} ${article.excerpt} ${(article.tags ?? []).join(" ")}`
      );

      return searchable.includes(normalizedSearch);
    });

    return sortEducationArticlesByDate(filtered);
  }, [articles, searchQuery]);

  return (
    <>
      <section className="pb-10 pt-28 sm:pb-14 sm:pt-32">
        <Container>
          <nav aria-label="Fil d'ariane" className="type-small mb-5 text-slate-500" data-reveal="">
            <Link className="transition hover:text-zepargn-orange" href="/ressources">
              Ressources
            </Link>
            <span className="mx-2">/</span>
            <Link className="transition hover:text-zepargn-orange" href="/ressources/education">
              Éducation
            </Link>
            <span className="mx-2">/</span>
            <span className="font-semibold text-zepargn-navy">{category.label}</span>
          </nav>

          <div className="max-w-4xl" data-reveal="" data-reveal-delay="40">
            <p className="section-kicker">Catégorie</p>
            <h1 className="section-title mt-3">{category.label}</h1>
            <p className="section-copy mt-4 max-w-3xl">{category.intro}</p>
            <p className="type-small mt-3 text-slate-500">Tri: plus récents d’abord</p>
          </div>

          <div className="mt-7" data-reveal="" data-reveal-delay="60">
            <label className="sr-only" htmlFor="category-search">
              Rechercher dans la catégorie {category.label}
            </label>
            <input
              autoComplete="off"
              className="type-input h-14 w-full rounded-2xl bg-[#F6F9FC] px-4 text-zepargn-navy placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zepargn-orange"
              id="category-search"
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder={`Rechercher dans ${category.label.toLowerCase()}...`}
              type="search"
              value={searchQuery}
            />
          </div>
        </Container>
      </section>

      <section className="pb-20">
        <Container>
          <div className="mb-6 flex items-center justify-between gap-4" data-reveal="">
            <p className="type-small text-slate-500">{filteredArticles.length} article(s)</p>
            <Link className="section-cta border border-zepargn-navy text-zepargn-navy hover:bg-zepargn-navy hover:text-white" href="/ressources/education">
              Retour au hub
            </Link>
          </div>

          {filteredArticles.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3" data-reveal="" data-reveal-delay="70">
              {filteredArticles.map((article) => (
                <BlogCard article={article} key={article.slug} />
              ))}
            </div>
          ) : (
            <div className="type-body rounded-2xl bg-[#F6F9FC] px-5 py-8 text-center text-slate-600" data-reveal="" data-reveal-delay="70">
              Aucun article ne correspond à votre recherche dans cette catégorie.
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
