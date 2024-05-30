import { NextApiRequest, NextApiResponse } from "next";
import { getCachedClient } from "../../../sanity/lib/getClient";
import { groq } from "next-sanity";
import { getSession } from "next-auth/react";
import { getPostQuery } from "../../../sanity/lib/queries";

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

      if (typeof postId !== "string") {
        return res.status(400).send("Wrong type for id");
      }

      // Check if a user is logged in and set the "userId" for the query if so
      const session = await getSession({ req });
      let userId = null;

      if (session && session.user) {
        // @ts-ignore
        userId = session.user.id;
      }

      // Grab and send the post
      const post = await getCachedClient()(getPostQuery(postId, userId));

      res.status(200).send(post);
    } catch (err) {
      console.log(err);

      return res.status(500).send("Failed to get post");
    }
  } else {
    return res.status(405).send("");
  }
}
