import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryEducationPage } from "@/components/blog/CategoryEducationPage";
import {
  EDUCATION_CATEGORIES,
  EducationCategorySlug,
  getEducationCategory
} from "@/content/educationArticles";
import { getEducationArticlesByCategoryData } from "@/lib/education-cms";

type Props = {
  params: {
    categorySlug: string;
  };
};

export function generateStaticParams() {
  return EDUCATION_CATEGORIES.map((category) => ({ categorySlug: category.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const category = getEducationCategory(params.categorySlug as EducationCategorySlug);

  if (!category) {
    return {
      title: "Catégorie Éducation | Zepargn"
    };
  }

  return {
    title: `${category.label} | Éducation Zepargn`,
    description: category.intro
  };
}

export default async function EducationCategoryPage({ params }: Props) {
  const category = getEducationCategory(params.categorySlug as EducationCategorySlug);

  if (!category) {
    notFound();
  }

  const articles = await getEducationArticlesByCategoryData(category.slug);

  return <CategoryEducationPage articles={articles} category={category} />;
}
