import { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../../sanity/lib/client";

/**
 * Creates a new comment in santiy for a user on a post or article
 * @author Ninjabattler
 * @param userId The id of the user who commented
 * @param postId The id of the post the user commented on
 * @param articleId The id of the article the user commented on
 * @param content The content of the user's comment
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
      const content: string | undefined = req.body.content;

      // Check the inputs
      if (userId === undefined) {
        return res.status(400).send("Missing userId");
      }

      if (postId === undefined && articleId === undefined) {
        return res.status(400).send("Missing postId or articleId");
      }

      if (content === undefined) {
        return res.status(400).send("Missing content");
      }

      // Create and send the new comment
      const newComment = await client.create({
        _type: "comment",
        userId: { _ref: userId },
        postId: postId ? { _ref: postId } : undefined,
        articleId: articleId ? { _ref: articleId } : undefined,
        content: content,
      });

      return res.status(200).send(newComment);
    } catch (err) {
      console.error(err);

      return res.status(500).send("Failed to create a new comment");
    }
  } else {
    return res.status(405).send("");
  }
}
