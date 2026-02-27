import Image from "next/image";
import Link from "next/link";
import { EducationArticle, formatEducationDate } from "@/content/educationArticles";

type FeaturedArticleProps = {
  article: EducationArticle;
  className?: string;
  compact?: boolean;
  href?: string;
};

export function FeaturedArticle({ article, className, compact = false, href }: FeaturedArticleProps) {
  return (
    <Link className={`group block w-full min-w-0 ${className ?? ""}`} href={href ?? `/ressources/education/${article.slug}`}>
      <article>
        <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="order-2 lg:order-1">
            <p className="type-small flex flex-wrap items-center gap-x-2 gap-y-1 text-slate-500">
              <span className="type-kicker text-slate-500">{article.categoryLabel}</span>
              <span aria-hidden="true">•</span>
              <span>{article.readingTime}</span>
            </p>
            <h2
              className={`mt-3 break-words text-zepargn-navy transition-colors group-hover:text-zepargn-orange ${
                compact ? "type-h3" : "type-h2"
              }`}
            >
              {article.title}
            </h2>
            <p className="type-body mt-3 max-w-2xl text-slate-600">{article.excerpt}</p>
            <p className="type-small mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-slate-500">
              <span>{article.authorName}</span>
              <span aria-hidden="true">•</span>
              <span>{formatEducationDate(article.date)}</span>
            </p>
          </div>

          <div className="order-1 overflow-hidden rounded-[1.8rem] bg-[#F6F9FC] lg:order-2">
            <Image
              alt={article.title}
              className="aspect-[16/10] w-full object-cover transition-transform duration-300 motion-reduce:transition-none group-hover:scale-[1.02]"
              height={760}
              sizes="(min-width: 1024px) 40rem, 100vw"
              src={article.coverImage}
              width={1200}
            />
          </div>
        </div>
      </article>
    </Link>
  );
}
