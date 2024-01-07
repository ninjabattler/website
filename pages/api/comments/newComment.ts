import { NextApiRequest, NextApiResponse } from "next";
import { QueryResult } from "pg";
import db from "../../../db/db";
import insertNewComment from "../../../db/inserts/insertNewComment";
import { CommentData, PostIdType, UserData, UserIdType } from "../../../types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  const userId: UserIdType = Number(req.query.userId);
  const postId: PostIdType = Number(req.query.postId);

  await insertNewComment(db, req.query.content as string, postId, userId).then(
    async (response: CommentData) => {
      const user: QueryResult<UserData> = await db.query(
        `
      SELECT * FROM users WHERE id = $1
      `,
        [userId],
      );

      res.status(200).json({
        content: req.query.content,
        data: response.date,
        avatar: user.rows[0].avatar,
        username: user.rows[0].username,
      });
    },
  );
}
