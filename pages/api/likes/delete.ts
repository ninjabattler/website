import { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../../sanity/lib/client";
import { getPostLikesQuery } from "../../../sanity/lib/queries";

/**
 * Deletes a user's like/dislike on a post
 * @author Ninjabattler
 * @param userId The id of the user who commented
 * @param postId The id of the post the user commented on
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  if (req.method === "POST") {
    try {
      const userId: string | undefined = req.body.userId;
      const postId: string | undefined = req.body.postId;
      const articleId: string | undefined = req.body.articleId;

      // Check the inputs
      if (userId === undefined) {
        return res.status(400).send("Missing userId");
      }

      if (postId === undefined && articleId === undefined) {
        return res.status(400).send("Missing postId or articleId");
      }

      // Delete and send the user's like/dislike
      const deletedLike = await client.delete({
        query: getPostLikesQuery(postId, articleId, userId),
      });

      res.status(200).send(deletedLike);
    } catch (err) {
      console.error(err);

      return res.status(500).send("Failed to delete the user's like/dislike");
    }
  } else {
    return res.status(405).send("");
  }
}
