const selectAllPosts = async (db) => {
  try {
    const posts = await db.query(`
      SELECT * FROM posts;
    `)

    return posts
  }
  catch(err) {
    console.log(err)
    return err
  }
}

module.exports = selectAllPosts;