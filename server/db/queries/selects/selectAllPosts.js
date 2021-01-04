const selectAllPosts = async (db) => {
  try {
    const posts = await db.query(`
      SELECT * FROM posts
      ORDER BY date DESC;
    `)

    return posts
  }
  catch(err) {
    console.log(err)
    return err
  }
}

module.exports = selectAllPosts;