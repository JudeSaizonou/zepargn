import Image from "next/image";
import Link from "next/link";
import { EducationArticle, formatEducationDate } from "@/content/educationArticles";

type BlogCardProps = {
  article: EducationArticle;
  href?: string;
  className?: string;
};

export function BlogCard({ article, href, className }: BlogCardProps) {
  return (
    <Link className={`group block w-full min-w-0 ${className ?? ""}`} href={href ?? `/ressources/education/${article.slug}`}>
      <article className="min-w-0 overflow-hidden">
        <div className="overflow-hidden rounded-[1.5rem] bg-[#F6F9FC]">
          <Image
            alt={article.title}
            className="aspect-[16/10] w-full object-cover transition-transform duration-300 motion-reduce:transition-none group-hover:scale-[1.03]"
            height={840}
            sizes="(min-width: 1280px) 30rem, (min-width: 768px) 50vw, 100vw"
            src={article.coverImage}
            width={1200}
          />
        </div>
        <p className="type-small mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-slate-500">
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
