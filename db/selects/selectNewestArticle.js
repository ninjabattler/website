const selectNewestArticle = async (db) => {
  try {
    const posts = await db.query(`
      SELECT title AS article_title, thumbnail AS article_thumbnail
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

  }
  catch(err) {
    console.log(err);
    return err;
  }
}

module.exports = selectNewestArticle;