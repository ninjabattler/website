import { Pool, QueryResult } from "pg";
import { PostIdType, UserIdType } from "../../types";

const insertNewLike = async (
  db: Pool,
  liked: string,
  post_id: PostIdType,
  user_id: UserIdType,
): Promise<any> => {
  try {
    const newLike: QueryResult<any> = await db.query(
      `
      INSERT INTO likes(liked, post_id, user_id) VALUES($1, $2, $3)
    `,
      [liked === "true", Number(post_id), Number(user_id)],
    );

    return newLike.rows[0];
  } catch (err) {
    console.log(err);
    return err;
  }
};

export default insertNewLike;
