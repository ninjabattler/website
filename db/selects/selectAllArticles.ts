import { Pool, QueryResult } from "pg";
import { ArticleData } from "../../types";

const selectAllArticles = async (db: Pool): Promise<ArticleData[]> => {
  try {
    const posts: QueryResult<ArticleData> = await db.query(`
      SELECT 
      title,
      thumbnail,
      colour,
      content,
      category,
      genre,
      description,
      TO_CHAR(date, 'MM, DD, YYYY') as formattedDate 
      FROM posts
      WHERE review = true
      ORDER BY date DESC;
    `);

    return posts.rows;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export default selectAllArticles;
