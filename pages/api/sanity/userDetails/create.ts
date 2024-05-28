import { NextApiRequest, NextApiResponse } from "next";
import { PostIdType, UserIdType } from "../../../../types";
import { client } from "../../../../sanity/lib/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  const userId: string = req.body.userId;
  const name: string = req.body.username;

  const newUserDetails = await client.create({
    _type: "userDetails",
    userId: { _ref: userId },
    name,
  });

  res.status(200).send(newUserDetails);
}
