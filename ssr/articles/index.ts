import { GetServerSidePropsContext } from "next";
import { getCachedClient } from "../../sanity/lib/getClient";
import {
  getAllTags,
  getMostRecentArticlesQuery,
  searchArticlesQuery,
} from "../../sanity/lib/queries";

export type ArticlesServerProps = {
  props: {
    articles: SanityArticlesSearchResult[];
    searchResults: boolean;
    tags: any[];
    searchQuery: string;
    tagsQuery: string;
  };
};

export const articlesServerSideProps = async ({
  req,
  query,
}: GetServerSidePropsContext): Promise<ArticlesServerProps> => {
  const tags: any[] = await getCachedClient()(getAllTags());

  // Search title and optionally tags
  if (query.search !== undefined && typeof query.search === "string") {
    const searchQuery = query.search;
    let tagsQuery: string[] = [];

    if (query.tags && typeof query.tags === "string") {
      tagsQuery = query.tags.split(/,/g);
    }

    const searchResults: SanityArticlesSearchResult[] = await getCachedClient()(
      searchArticlesQuery(searchQuery.toLowerCase(), tagsQuery),
    );

    return {
      props: {
        articles: searchResults,
        searchResults: true,
        tags,
        searchQuery,
        tagsQuery: tagsQuery ? tagsQuery.join(",") : "",
      },
    };
    // Search just tags
  } else if (query.tags && typeof query.tags === "string") {
    const tagsQuery = query.tags.split(/,/g);

    const searchResults: SanityArticlesSearchResult[] = await getCachedClient()(
      searchArticlesQuery("", tagsQuery),
    );

    return {
      props: {
        articles: searchResults,
        searchResults: true,
        tags,
        searchQuery: "",
        tagsQuery: tagsQuery.join(","),
      },
    };
    // No Search, just the 5 most recent articles
  } else {
    const articlesArray: SanityArticlesSearchResult[] = await getCachedClient()(
      getMostRecentArticlesQuery(),
    );

    // Move the last article to the front of the array
    // Swiper's coverflow effect pushes the second item to the front of the carousel,
    // so I haave to offset them for the first article to appear first
    const lastArticle: SanityArticlesSearchResult | undefined =
      articlesArray.pop();

    if (lastArticle) {
      articlesArray.unshift(lastArticle);
    }

    return {
      props: {
        articles: articlesArray,
        searchResults: false,
        tags,
        searchQuery: "",
        tagsQuery: "",
      },
    };
  }
};
