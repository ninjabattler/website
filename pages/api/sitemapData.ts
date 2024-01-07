import { NextApiRequest, NextApiResponse } from "next";
import db from "../../db/db";
import selectAllArticles from "../../db/selects/selectAllArticles";
import { ArticleData, TitleType } from "../../types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  await selectAllArticles(db).then(async (articles: ArticleData[]) => {
    const articleTitles: TitleType[] = [];

    articles.forEach((article) => {
      articleTitles.push(article.title.toLowerCase().replace(/ /g, "_"));
    });

    res.status(200).json({
      articles: articleTitles,
    });
  });
}
