import { GetServerSidePropsContext } from "next";
import { IpType, PostData, UserData, UserIdType } from "../types";
import { getCachedClient } from "../sanity/lib/getClient";
import { groq } from "next-sanity";
import { getSession } from "next-auth/react";

export type PostsServerSideData = {
  props: {
    posts: PostData[];
    userId: UserIdType | UserIdType[] | UserData[];
    selectedPost: any | null;
  };
};

export const postsServerSideProps = async ({
  req,
  query,
  draftMode,
}: GetServerSidePropsContext): Promise<PostsServerSideData> => {
  const session = await getSession({ req });
  let userId = null;

  if (session && session.user) {
    // @ts-ignore
    userId = session.user.id;
  }

  const preview = draftMode
    ? { token: process.env.SANITY_API_READ_WRITE_TOKEN }
    : undefined;

  const postsQuery = await groq`*[_type == "post"] | order(date desc){
    _id,
    title,
    date
  }`;
  const postsArray: PostData[] = await getCachedClient()(postsQuery);

  let selectedPost = null;

  if (query.p) {
    const postQuery = await groq`*[_type == "post" && _id == "${query.p}"] {
      _id,
      title,
      date,
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
              content,
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
            },
            _type == "footnoteLink" => {
              noteIndex
            }
          }
        },
        _type == "image" => {
          _type,
          "url": asset->url,
          "blur": asset->metadata.lqip,
          "width": asset->metadata.dimensions.width,
          "height": asset->metadata.dimensions.height,
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
      },
      "comments": *[_type == "comment" && references(^._id)] | order(_createdAt desc) {
        _createdAt,
        content,
        "byCurrentUser": references("${userId}"),
        "user": *[_type == "userDetails" && references(^.userId._ref)] {
          name
        }[0]
      },
      "likes": count(*[_type == "like" && references(^._id) && isLike == true]),
      "dislikes": count(*[_type == "like" && references(^._id) && isLike == false]),
      "isLiked": count(*[_type == "like" && references(^._id) && references("${userId}") && isLike == true]) > 0,
      "isDisliked": count(*[_type == "like" && references(^._id) && references("${userId}") && isLike == false]) > 0
    }[0]`;

    selectedPost = await getCachedClient(preview)(postQuery);
  }

  return {
    props: {
      posts: postsArray,
      userId,
      selectedPost,
    },
  };
};
