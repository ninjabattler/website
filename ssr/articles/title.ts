import requestIp from 'request-ip';
import db from '../../db/db';
import selectSingleArticle from '../../db/selects/selectSingleArticle';
import selectUserId from '../../db/selects/selectUserId';
import selectUsersLike from '../../db/selects/selectUsersLike';
import insertNewUser from '../../db/inserts/insertNewUser';
import noCommentMessages from '../../constants/noCommentMessages.json';
import { ArticleData, ArticleJson, IpType, UrlType, UserData, UserIdType } from '../../types';
import { GetServerSidePropsContext } from 'next';

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
  notFound?: boolean
}

export const articlePageServerSideProps = async ({ req, query, params }: GetServerSidePropsContext): Promise<ArticleServerSideData> => {
  if (!process.env.EDIT) {
    const ip: IpType = requestIp.getClientIp(req)

    let userId: UserData[] = await selectUserId(db, ip)

    if (!userId[0]) {
      userId = await insertNewUser(db, ip)
    }

    const randomQuoteIndex: number = Math.floor(Math.random() * noCommentMessages.length);
    const title: string = query.title as string;
    const userLike: boolean = await selectUsersLike(db, userId[0].id)
    const articleTitle: string = title.replace(/_/g, ' ');
    const articleData: ArticleData[] = await selectSingleArticle(db, articleTitle);

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
        props: { edit: false },
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
        randomQuoteIndex,
        edit: false
      }
    }
  } else {
    const articleData: ArticleData = require(`../../articles/${params.title}.json`);

    return {
      props: {
        articleData: articleData,
        url: `https://ninjabattler.ca/articles/${params.title}`,
        edit: true,
        jsonLocation: `${params.title}.json`
      }
    }
  }
};