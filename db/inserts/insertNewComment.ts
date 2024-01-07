import { Pool, QueryResult } from "pg";
import { CommentData, ContentType, PostIdType, UserIdType } from "../../types";

const insertNewComment = async (
  db: Pool,
  content: ContentType,
  post_id: PostIdType,
  user_id: UserIdType,
): Promise<CommentData> => {
  try {
    const newComment: QueryResult<CommentData> = await db.query(
      `
      INSERT INTO comments(content, post_id, user_id) VALUES($1, $2, $3) RETURNING ${"*"};
    `,
      [content, Number(post_id), Number(user_id)],
    );

    return newComment.rows[0];
  } catch (err) {
    console.log(err);
    return err;
  }
};

export default insertNewComment;
