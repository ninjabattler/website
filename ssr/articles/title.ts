import requestIp from 'request-ip';
import db from '../../db/db';
import { selectSingleArticle, selectUserId, selectUsersLike, insertNewUser } from '../../db/queries';
import noCommentMessages from '../../constants/noCommentMessages.json';
import { ArticleData, UrlType, UserIdType } from '../../types';
import { GetServerSidePropsContext } from 'next';

export type ArticleServerSideData = {
  props: {
    articleData: ArticleData;
    userId: UserIdType;
    liked: boolean;
    disliked: boolean;
    url: UrlType;
    randomQuoteIndex: number;
  } 
} | {
  notFound: boolean
}

export const articlePageServerSideProps = async ({ req, query, params }: GetServerSidePropsContext): Promise<ArticleServerSideData> => {
  const ip: string | null = requestIp.getClientIp(req)

  let userId: UserIdType = await selectUserId(db, ip)

  if (!userId[0]) {
    userId = await insertNewUser(db, ip)
  }

  const randomQuoteIndex: number = Math.floor(Math.random() * noCommentMessages.length);
  const title: string = query.title as string;
  const userLike: boolean = await selectUsersLike(db, userId[0].id)
  const articleTitle: string = title.replace(/_/g, ' ');
  const articleData: ArticleData = await selectSingleArticle(db, articleTitle);

  let liked: boolean = false;
  let disliked: boolean = false;

  if (userLike[0]) {
    if (userLike[0].liked) {
      liked = true;
    } else {
      disliked = true;
    }
  }

  if (!articleData[0]) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      articleData: { ...articleData[0] },
      userId: userId[0].id,
      liked,
      disliked,
      url: `https://ninjabattler.ca/articles/${params.title}`,
      randomQuoteIndex
    }
  }
};