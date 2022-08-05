const selectAllArticles = async (db) => {
  try {
    const posts = await db.query(`
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
    `)

    return posts.rows
  }
  catch(err) {
    console.log(err)
    return err
  }
}

module.exports = selectAllArticles;