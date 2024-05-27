import requestIp from "request-ip";
import { GetServerSidePropsContext } from "next";
import { IpType, PostData, UserData, UserIdType } from "../types";
import { getCachedClient } from "../sanity/lib/getClient";
import { groq } from "next-sanity";

export type PostsServerSideData = {
  props: {
    posts: PostData[];
    userId: UserIdType | UserIdType[] | UserData[];
    ip: IpType;
    selectedPost: any | null;
  };
};

export const postsServerSideProps = async ({
  req,
  query,
  draftMode,
}: GetServerSidePropsContext): Promise<PostsServerSideData> => {
  const ip: IpType = requestIp.getClientIp(req);

  let userId: UserIdType[] | UserData[] = [
    { id: 0, ip: "", avatar: 0, username: "" },
  ];

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
  let comments = [];

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
      "comments": *[_type == "comment" && references(^._id)] {
        _createdAt,
        content,
        "user": *[_type == "userDetails" && references(^.userId._ref)] {
          name
        }[0]
      }
    }[0]`;

    selectedPost = await getCachedClient(preview)(postQuery);
  }

  return {
    props: {
      posts: postsArray,
      userId: userId[0].id,
      ip: ip,
      selectedPost,
    },
  };
};
