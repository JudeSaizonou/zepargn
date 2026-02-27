import Link from "next/link";
import { EducationArticle, formatEducationDate } from "@/content/educationArticles";

type ArticleListItemProps = {
  article: EducationArticle;
  href?: string;
};

export function ArticleListItem({ article, href }: ArticleListItemProps) {
  return (
    <Link className="group block rounded-xl px-2 py-2 transition-colors hover:bg-slate-50" href={href ?? `/ressources/education/${article.slug}`}>
      <article className="border-b border-slate-200 pb-5 last:border-b-0 last:pb-0">
        <p className="type-small flex flex-wrap items-center gap-x-2 gap-y-1 text-slate-500">
          <span className="type-kicker text-slate-500">{article.categoryLabel}</span>
          <span aria-hidden="true">•</span>
          <span>{article.readingTime}</span>
        </p>
        <h3 className="type-h3 mt-2 line-clamp-2 break-words text-zepargn-navy transition-colors group-hover:text-zepargn-orange">
          {article.title}
        </h3>
        <p className="type-body mt-2 line-clamp-2 break-words text-slate-600">{article.excerpt}</p>
        <p className="type-small mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-slate-500">
          <span>{article.authorName}</span>
          <span aria-hidden="true">•</span>
          <span>{formatEducationDate(article.date)}</span>
        </p>
      </article>
    </Link>
  );
}
