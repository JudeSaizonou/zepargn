import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogCard } from "@/components/blog/BlogCard";
import { Container } from "@/components/Container";
import {
  EducationArticleBlock,
  formatEducationDate,
  getEducationCategory
} from "@/content/educationArticles";
import {
  getEducationArticleBySlugData,
  getEducationArticleSlugsData,
  getRelatedEducationArticlesData
} from "@/lib/education-cms";

type Props = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  const slugs = await getEducationArticleSlugsData();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getEducationArticleBySlugData(params.slug);

  if (!article) {
    return {
      title: "Article | Éducation Zepargn"
    };
  }

  return {
    title: `${article.title} | Éducation Zepargn`,
    description: article.excerpt
  };
}

function renderBlock(block: EducationArticleBlock, index: number) {
  if (block.type === "h2") {
    return (
      <h2 className="type-h2 mt-10 text-zepargn-navy" key={`h2-${index}`}>
        {block.text}
      </h2>
    );
  }

  if (block.type === "h3") {
    return (
      <h3 className="type-h3 mt-8 text-zepargn-navy" key={`h3-${index}`}>
        {block.text}
      </h3>
    );
  }

  if (block.type === "p") {
    return (
      <p className="type-body mt-4 text-slate-700" key={`p-${index}`}>
        {block.text}
      </p>
    );
  }

  if (block.type === "list") {
    return (
      <ul className="mt-5 space-y-3" key={`list-${index}`}>
        {block.items.map((item) => (
          <li className="type-body flex items-start gap-3 text-slate-700" key={item}>
            <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zepargn-orange" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  }

  if (block.type === "image") {
    return (
      <figure className="mt-8" key={`image-${index}`}>
        <div className="overflow-hidden rounded-[1.8rem] bg-[#F6F9FC]">
          <Image
            alt={block.alt}
            className="aspect-[16/10] w-full object-cover"
            height={900}
            sizes="(min-width: 1024px) 64rem, 100vw"
            src={block.src}
            width={1500}
          />
        </div>
        <figcaption className="type-small mt-2 text-slate-500">{block.caption}</figcaption>
      </figure>
    );
  }

  return (
    <blockquote className="type-quote mt-8 rounded-2xl bg-[#F6F9FC] px-5 py-4 text-zepargn-navy" key={`quote-${index}`}>
      <span className="micro-accent text-zepargn-orange">Note</span>
      <p className="mt-2">{block.text}</p>
    </blockquote>
  );
}

export default async function EducationArticlePage({ params }: Props) {
  const article = await getEducationArticleBySlugData(params.slug);

  if (!article) {
    notFound();
  }

  const category = getEducationCategory(article.category);
  const relatedArticles = await getRelatedEducationArticlesData(article, 3);

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
            {category ? (
              <Link className="transition hover:text-zepargn-orange" href={`/ressources/education/categorie/${category.slug}`}>
                {category.label}
              </Link>
            ) : null}
          </nav>

          <div className="max-w-4xl" data-reveal="" data-reveal-delay="30">
            <p className="section-kicker">{article.categoryLabel}</p>
            <h1 className="type-h1 mt-3 text-zepargn-navy">
              {article.title}
            </h1>
            {article.subtitle ? <p className="section-copy mt-4 max-w-3xl">{article.subtitle}</p> : null}
            <p className="type-small mt-5 text-slate-500">
              {article.readingTime} • {formatEducationDate(article.date)} • {article.authorName}
            </p>
          </div>
        </Container>
      </section>

      <section className="pb-14">
        <Container>
          <div className="overflow-hidden rounded-[2.4rem] bg-[#F6F9FC]" data-reveal="">
            <Image
              alt={article.title}
              className="aspect-[21/10] w-full object-cover"
              height={1100}
              priority
              sizes="100vw"
              src={article.coverImage}
              width={1900}
            />
          </div>
        </Container>
      </section>

      <section className="pb-20">
        <Container>
          <div className="mx-auto max-w-3xl" data-reveal="" data-reveal-delay="60">
            {article.contentBlocks.map((block, index) => renderBlock(block, index))}

            <section className="mt-12 rounded-[1.8rem] bg-[#F6F9FC] px-6 py-6 sm:px-8 sm:py-7">
              <h2 className="type-h3 text-zepargn-navy">À retenir</h2>
              <ul className="mt-4 space-y-3">
                {article.keyTakeaways.map((item) => (
                  <li className="type-body flex items-start gap-2 text-slate-700" key={item}>
                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zepargn-orange" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {category ? (
              <div className="mt-10 flex flex-wrap gap-3">
                <Link
                  className="section-cta border border-zepargn-navy text-zepargn-navy hover:bg-zepargn-navy hover:text-white"
                  href={`/ressources/education/categorie/${category.slug}`}
                >
                  Retour à {category.label}
                </Link>
                <Link
                  className="section-cta border border-slate-300 text-slate-700 hover:bg-slate-100"
                  href="/ressources/education"
                >
                  Voir tous les articles
                </Link>
              </div>
            ) : null}
          </div>
        </Container>
      </section>

      {relatedArticles.length > 0 ? (
        <section className="overflow-x-hidden bg-[#F6F9FC] py-20">
          <Container>
            <div className="mb-7 max-w-3xl" data-reveal="">
              <p className="section-kicker">Articles liés</p>
              <h2 className="section-title mt-2">Continuer la lecture</h2>
            </div>

            <div
              className="flex max-w-full snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-3 md:gap-6 md:overflow-visible"
              data-reveal=""
              data-reveal-delay="70"
            >
              {relatedArticles.map((relatedArticle) => (
                <div
                  className="w-[78%] min-w-[16rem] shrink-0 snap-start sm:w-[46%] md:min-w-0 md:w-auto md:shrink md:basis-auto"
                  key={relatedArticle.slug}
                >
                  <BlogCard article={relatedArticle} />
                </div>
              ))}
            </div>
          </Container>
        </section>
      ) : null}
    </>
  );
}
