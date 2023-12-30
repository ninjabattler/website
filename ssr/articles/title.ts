import db from '../../db/db';
import selectSingleArticle from '../../db/selects/selectSingleArticle';
import noCommentMessages from '../../constants/noCommentMessages.json';
import { ArticleData, ArticleJson, IpType, UrlType, UserData, UserIdType } from '../../types';
import { GetServerSidePropsContext } from 'next';
import { groq } from 'next-sanity';
import { client } from '../../sanity/lib/client';
import { getCachedClient } from "../../sanity/lib/getClient";

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

export const articlePageServerSideProps = async ({ req, query, params, draftMode }: GetServerSidePropsContext): Promise<ArticleServerSideData> => {
  const randomQuoteIndex: number = Math.floor(Math.random() * noCommentMessages.length);
  const title: string = query.title as string;
  const articleTitle: string = title.replace(/(_|-)/g, ' ');
  
  const preview = draftMode
    ? { token: process.env.SANITY_API_READ_TOKEN }
    : undefined;

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
        children[]{
          _type,
          _type != "picture" => {
            marks,
            text,
          },
          _type == "picture" => {
            scale,
            float,
            source,
            sourceLink,
            image {
              "url": asset->url,
              "blur": asset->metadata.lqip,
              "width": asset->metadata.dimensions.width,
              "height": asset->metadata.dimensions.height,
            }
          }
        }
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
      },
      _type == "dialogue" => {
        _type,
        speaker,
        dialogue,
        invert,
        portrait {
          "url": asset->url,
          "blur": asset->metadata.lqip,
          "width": asset->metadata.dimensions.width,
          "height": asset->metadata.dimensions.height,
        }
      },
      _type == "subtitleCard" => {
        _type,
        title,
        banner {
          "url": asset->url,
          "blur": asset->metadata.lqip,
          "width": asset->metadata.dimensions.width,
          "height": asset->metadata.dimensions.height,
        }
      },
      _type == "listItem" => {
        _type,
        text,
        icon {
          "url": asset->url,
          "blur": asset->metadata.lqip,
          "width": asset->metadata.dimensions.width,
          "height": asset->metadata.dimensions.height,
        }
      },
      _type == "codeBlock" => {
        _type,
        code,
        language,
        title
      },
      _type == "picture" => {
        _type,
        scale,
        float,
        source,
        sourceLink,
        image {
          "url": asset->url,
          "blur": asset->metadata.lqip,
          "width": asset->metadata.dimensions.width,
          "height": asset->metadata.dimensions.height,
        }
      }
    }
  }[0]`;

  const article = await getCachedClient(preview)(articleQuery);

  let liked: boolean = false;
  let disliked: boolean = false;

  if (!article) {
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