import { Pool, QueryResult } from "pg";
import { ArticleData } from "../../types";

const selectNewestArticle = async (db: Pool): Promise<ArticleData | null> => {
  try {
    const posts: QueryResult<ArticleData> = await db.query(`
      SELECT title, thumbnail
      FROM posts
      WHERE review = true
      ORDER BY date DESC
      LIMIT 1;
    `);

    if (posts.rows[0]) {
      return posts.rows[0];
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
    return err;
  }
};

export default selectNewestArticle;
