import noCommentMessages from "../../constants/noCommentMessages.json";
import { ArticleData, UrlType, UserIdType } from "../../types";
import { GetServerSidePropsContext } from "next";
import { getCachedClient } from "../../sanity/lib/getClient";
import { getArticleQuery } from "../../sanity/lib/queries";
import { getSession } from "next-auth/react";

export type ArticleServerSideData = {
  props: {
    articleData: ArticleData;
    userId?: UserIdType;
    url: UrlType;
    randomQuoteIndex?: number;
  };
  notFound?: boolean;
};

export const articlePageServerSideProps = async ({
  req,
  query,
  params,
  draftMode,
}: GetServerSidePropsContext): Promise<ArticleServerSideData> => {
  const randomQuoteIndex: number = Math.floor(
    Math.random() * noCommentMessages.length,
  );
  const title: string = query.title as string;
  const session = await getSession({ req });
  let userId = null;

  if (session && session.user) {
    // @ts-ignore
    userId = session.user.id;
  }

  const preview = draftMode
    ? { token: process.env.SANITY_API_READ_WRITE_TOKEN }
    : undefined;

  const article = await getCachedClient(preview)(
    getArticleQuery(title, userId),
  );

  if (!article) {
    return {
      props: {
        articleData: article,
        url: `https://ninjabattler.ca/articles/${params ? params.title : ""}`,
        randomQuoteIndex,
      },
      notFound: true,
    };
  }

  return {
    props: {
      articleData: article,
      url: `https://ninjabattler.ca/articles/${params ? params.title : ""}`,
      randomQuoteIndex,
    },
  };
};
