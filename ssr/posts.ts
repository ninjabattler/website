import db from "../db/db";
import requestIp from "request-ip";
import selectAllPostsData from "../db/selects/selectAllPostsData";
import selectUserId from "../db/selects/selectUserId";
import insertNewUser from "../db/inserts/insertNewUser";
import { GetServerSidePropsContext } from "next";
import { IpType, PostData, UserData, UserIdType } from "../types";
import { getCachedClient } from "../sanity/lib/getClient";
import { groq } from "next-sanity";

export type PostsServerSideData = {
  props: {
    posts: PostData[];
    userId: UserIdType | UserIdType[] | UserData[];
    ip: IpType;
  };
};

export const postsServerSideProps = async ({
  req,
}: GetServerSidePropsContext): Promise<PostsServerSideData> => {
  const ip: IpType = requestIp.getClientIp(req);

  // const postsArray: PostData[] = await selectAllPostsData(db);
  let userId: UserIdType[] | UserData[] = [
    { id: 0, ip: "", avatar: 0, username: "" },
  ];

  const postsQuery = await groq`*[_type == "post"] | order(date.start asc){
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
  }`;

  const postsArray: PostData[] = await getCachedClient()(postsQuery);

  // if (!userId[0]) {
  //   userId = await insertNewUser(db, ip);
  // }

  return {
    props: {
      posts: postsArray,
      userId: userId[0].id,
      ip: ip,
    },
  };
};
