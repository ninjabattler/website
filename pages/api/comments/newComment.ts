import { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../../sanity/lib/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  const userId: string = req.body.userId as string;
  const postId: string = req.body.postId as string;
  const content: string = req.body.content as string;

  const newComment = await client.create({
    _type: "comment",
    userId: { _ref: userId },
    postId: { _ref: postId },
    content: content,
  });

  res.status(200).send(newComment);
}
