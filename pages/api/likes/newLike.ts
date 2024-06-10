import { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../../sanity/lib/client";

/**
 * Creates a new like/dislike in santiy for a user on a post
 * @author Ninjabattler
 * @param userId The id of the user who commented
 * @param postId The id of the post the user commented on
 * @param isLike Whether the document is considered a like or not
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
      const isLike: boolean | undefined = req.body.isLike;

      // Check the inputs
      if (userId === undefined) {
        return res.status(400).send("Missing userId");
      }

      if (postId === undefined && articleId === undefined) {
        return res.status(400).send("Missing postId or articleId");
      }

      if (isLike === undefined) {
        return res.status(400).send("Missing isLike");
      }

      // Create and send the user's new like/dislike
      const newLike = await client.create({
        _type: "like",
        userId: { _ref: userId },
        postId: postId ? { _ref: postId } : undefined,
        articleId: articleId ? { _ref: articleId } : undefined,
        isLike,
      });

      res.status(200).send(newLike);
    } catch (err) {
      console.error(err);

      return res.status(500).send("Failed to create a new like");
    }
  } else {
    return res.status(405).send("");
  }
}
