import { NextApiRequest, NextApiResponse } from "next";
import { getCachedClient } from "../../../sanity/lib/getClient";
import { groq } from "next-sanity";
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const id = req.query.id;
    const session = await getSession({ req });
    let userId = null;

    if (session && session.user) {
      // @ts-ignore
      userId = session.user.id;
    }

    const postQuery = await groq`*[_type == "post" && _id == "${id}"] {
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

    const post = await getCachedClient()(postQuery);

    res.status(200).send(post);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Error with preview or something");
  }
}
