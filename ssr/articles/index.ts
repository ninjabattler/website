import { getCachedClient } from "../../sanity/lib/getClient";
import { getMostRecentArticlesQuery } from "../../sanity/lib/queries";
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
      getMostRecentArticlesQuery(),
    );

    // Move the last article to the front of the array
    // Swiper's coverflow effect pushes the second item to the front of the carousel,
    // so I haave to offset them for the first article to appear first
    const lastArticle = articlesArray.pop();
    articlesArray.unshift(lastArticle);

    return {
      props: {
        articles: articlesArray,
      },
    };
  };
