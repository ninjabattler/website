import { Pool, QueryResult } from "pg";
import { UserIdType } from "../../types";

const selectUsersLike = async (db: Pool, user_id: UserIdType): Promise<any> => {
  try {
    const userId: QueryResult<any> = await db.query(
      `
      SELECT * FROM likes WHERE user_id = $1
    `,
      [Number(user_id)],
    );

    return userId.rows;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export default selectUsersLike;
