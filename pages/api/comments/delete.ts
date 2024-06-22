import { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../../sanity/lib/client";
import { getCommentQuery } from "../../../sanity/lib/queries";

/**
 * Deletes a user's comment on a post/article
 * @author Ninjabattler
 * @param commentId The id of the comment
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  if (req.method === "POST") {
    try {
      const commentId: string | undefined = req.body.commentId;

      // Check the inputs
      if (commentId === undefined) {
        return res.status(400).send("Missing commentId");
      }

      // Delete and send the comment
      const deletedcomment = await client
        .patch(commentId)
        .set({ deleted: true })
        .commit();

      res.status(200).send(deletedcomment);
    } catch (err) {
      console.error(err);

      return res.status(500).send("Failed to delete the comment");
    }
  } else {
    return res.status(405).send("");
  }
}
