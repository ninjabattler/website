import noCommentMessages from "../../constants/noCommentMessages.json";
import { ArticleData, UrlType, UserIdType } from "../../types";
import { GetServerSidePropsContext } from "next";
import { getCachedClient } from "../../sanity/lib/getClient";
import { getArticleQuery } from "../../sanity/lib/queries";

export type ArticleServerSideData = {
  props: {
    articleData?: ArticleData;
    userId?: UserIdType;
    liked?: boolean;
    disliked?: boolean;
    url?: UrlType;
    randomQuoteIndex?: number;
    edit: boolean;
    jsonLocation?: string;
  };
  notFound?: boolean;
};

export const articlePageServerSideProps = async ({
  query,
  params,
  draftMode,
}: GetServerSidePropsContext): Promise<ArticleServerSideData> => {
  const randomQuoteIndex: number = Math.floor(
    Math.random() * noCommentMessages.length,
  );
  const title: string = query.title as string;

  const preview = draftMode
    ? { token: process.env.SANITY_API_READ_WRITE_TOKEN }
    : undefined;

  const article = await getCachedClient(preview)(getArticleQuery(title));

  let liked: boolean = false;
  let disliked: boolean = false;

  if (!article) {
    return {
      props: { edit: false },
      notFound: true,
    };
  }

  return {
    props: {
      articleData: { ...article, likes: 0, dislikes: 0 },
      userId: -1,
      liked,
      disliked,
      url: `https://ninjabattler.ca/articles/${params.title}`,
      randomQuoteIndex,
      edit: false,
    },
  };
};
