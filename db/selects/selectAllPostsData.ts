import { Pool, QueryResult } from "pg";
import { PostData } from "../../types";

const selectAllPostsData = async (db: Pool): Promise<PostData[]> => {
  try {
    const posts: QueryResult<PostData> = await db.query(`
    SELECT posts.*, TO_CHAR(posts.date, 'YYYY-MM-DD HH24:MI:SS.MSZ') as date,
    json_agg(
      json_build_object(
        'content', comments.content,
        'date', comments.date,
        'avatar', users.avatar,
        'username', users.username,
        'user_id', users.id
      )
      ORDER BY comments.date DESC
    ) as comments
    FROM posts
    FULL OUTER JOIN comments ON comments.post_id = posts.id
    FULL OUTER JOIN users ON comments.user_id = users.id
    WHERE review = false
    GROUP BY posts.id
    ORDER BY posts.date DESC
    `);

    return posts.rows;
  }
  catch(err) {
    console.log(err);
    return err;
  }
}

export default selectAllPostsData;