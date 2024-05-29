import { NextApiRequest, NextApiResponse } from "next";
import { getCachedClient } from "../../../sanity/lib/getClient";
import { groq } from "next-sanity";
import { getSession } from "next-auth/react";

/**
 * Grabs a single post and all the comment/like data associated with it
 * @author Ninjabattler
 * @param postId The id of the post
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    try {
      const postId: string | string[] | undefined = req.query.id;

      // Check the input
      if (postId === undefined) {
        return res.status(400).send("Missing id");
      }

      // Check if a user is logged in and set the "userId" for the query if so
      const session = await getSession({ req });
      let userId = null;

      if (session && session.user) {
        // @ts-ignore
        userId = session.user.id;
      }

      // Grab and send the post
      const postQuery = await groq`*[_type == "post" && _id == "${postId}"] {
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

      return res.status(500).send("Failed to get post");
    }
  } else {
    return res.status(405).send("");
  }
}
