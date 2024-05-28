import { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../../sanity/lib/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  const userId: string = req.body.userId;
  const postId: string = req.body.postId;

  console.log(userId, postId);

  const deletedLike = await client.delete({
    query: `*[_type == 'like' && references("${postId}") && references("${userId}")]`,
  });

  res.status(200).send(deletedLike);
}
