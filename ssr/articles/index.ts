import { getCachedClient } from "../../sanity/lib/getClient";
import { getAllArticlesQuery } from "../../sanity/lib/queries";
import { ArticleData } from "../../types";

export type ArticlesServerProps = {
  props: {
    articles: ArticleData[];
  };
};

export const articlesServerSideProps =
  async (): Promise<ArticlesServerProps> => {
    // const articlesArray: ArticleData[] = await selectAllArticles(db);
    const articlesArray: ArticleData[] = await getCachedClient()(
      getAllArticlesQuery(),
    );

    return {
      props: {
        articles: articlesArray,
      },
    };
  };
