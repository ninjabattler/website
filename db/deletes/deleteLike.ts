import { Pool, QueryResult } from "pg";
import { PostIdType, UserIdType } from "../../types";

const deleteLike = async (
  db: Pool,
  post_id: PostIdType,
  user_id: UserIdType,
): Promise<void> => {
  try {
    const deletedLike: QueryResult<any> = await db.query(
      `
      DELETE FROM likes WHERE post_id = $1 AND user_id = $2
    `,
      [Number(post_id), Number(user_id)],
    );

    return deletedLike.rows[0];
  } catch (err) {
    return err;
  }
};

export default deleteLike;
