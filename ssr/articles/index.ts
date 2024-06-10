import { GetServerSidePropsContext } from "next";
import { getCachedClient } from "../../sanity/lib/getClient";
import {
  getMostRecentArticlesQuery,
  searchArticlesQuery,
} from "../../sanity/lib/queries";
import { ArticleData } from "../../types";

export type ArticlesServerProps = {
  props: {
    articles: ArticleData[];
  };
};

export const articlesServerSideProps = async ({
  req,
  query,
}: GetServerSidePropsContext): Promise<ArticlesServerProps> => {
  // Search title and optionally tags
  if (query.search && typeof query.search === "string") {
    const searchQuery = query.search.toLowerCase();
    let tagsQuery = [];

    if (query.tags && typeof query.tags === "string") {
      tagsQuery = query.tags.split(/,/g);
    }

    const searchResults: ArticleData[] = await getCachedClient()(
      searchArticlesQuery(searchQuery, tagsQuery),
    );

    return {
      props: {
        articles: searchResults,
      },
    };
    // Search just tags
  } else if (query.tags && typeof query.tags === "string") {
    const tagsQuery = query.tags.split(/,/g);

    const searchResults: ArticleData[] = await getCachedClient()(
      searchArticlesQuery("", tagsQuery),
    );

    return {
      props: {
        articles: searchResults,
      },
    };
    // No Search, just the 5 most recent articles
  } else {
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
  }
};
