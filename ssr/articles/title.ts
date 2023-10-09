import db from '../../db/db';
import selectSingleArticle from '../../db/selects/selectSingleArticle';
import noCommentMessages from '../../constants/noCommentMessages.json';
import { ArticleData, ArticleJson, IpType, UrlType, UserData, UserIdType } from '../../types';
import { GetServerSidePropsContext } from 'next';
import { groq } from 'next-sanity';
import { client } from '../../sanity/lib/client';

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
  const randomQuoteIndex: number = Math.floor(Math.random() * noCommentMessages.length);
  const title: string = query.title as string;
  const articleTitle: string = title.replace(/(_|-)/g, ' ');
  const articleData: ArticleData[] = await selectSingleArticle(db, articleTitle);

  const articleQuery =
    await groq`*[_type == "article" && slug == "${title}"] | order(date.start asc){
    title,
    videoHeader,
    thumbnail {
      "url": asset->url,
      "blur": asset->metadata.lqip,
      "width": asset->metadata.dimensions.width,
      "height": asset->metadata.dimensions.height,
    },
    colors,
    content[]{
      _type == "block" => {
        _type,
        style,
        _key,
        markDefs,
        children
      },
      _type == "titleCard" => {
        _type,
        title,
        banner {
          "url": asset->url,
          "blur": asset->metadata.lqip,
          "width": asset->metadata.dimensions.width,
          "height": asset->metadata.dimensions.height,
        }
      },
      _type == "image" => {
        _type,
        "url": asset->url,
        "blur": asset->metadata.lqip,
        "width": asset->metadata.dimensions.width,
        "height": asset->metadata.dimensions.height,
      },
      _type == "quote" => {
        _type,
        quote,
        source
      },
      _type == "underline" => {
        _type
      }
    }
  }[0]`;

  const article = await client.fetch(articleQuery);

  console.log(JSON.stringify(article, null, 2))
  // console.log(articleData[0])

  let liked: boolean = false;
  let disliked: boolean = false;

  if (!articleData[0]) {
    return {
      props: { edit: false },
      notFound: true,
    }
  }

  return {
    props: {
      articleData: {...article, likes: 0, dislikes: 0},
      userId: -1,
      liked,
      disliked,
      url: `https://ninjabattler.ca/articles/${params.title}`,
      randomQuoteIndex,
      edit: false
    }
  }
};