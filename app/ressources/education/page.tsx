import { EducationHub } from "@/components/blog/EducationHub";
import { getAllEducationArticlesData } from "@/lib/education-cms";

export const metadata = {
  title: "Éducation | Ressources Zepargn",
  description: "Guides pratiques Zepargn sur l'épargne, l'investissement, la bourse, l'immobilier et les bases de la finance simple."
};

export const revalidate = 60;

export default async function EducationPage() {
  const articles = await getAllEducationArticlesData();
  return <EducationHub articles={articles} />;
}
