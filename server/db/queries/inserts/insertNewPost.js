const insertNewPost = async (db, options={title: null, colour: null, category: null, genre: null, thumbnail: null, review: null}) => {
  try {
    const newPost = await db.query(`
      INSERT INTO posts(title, colour, category, genre, content, thumbnail, review)
      VALUES($1, $2, $3, $4, $5, $6, $7)
      RETURNING ${'*'};
    `, [options.title, options.colour, options.category, options.genre, options.content, options.thumbnail, options.review])

    return newPost
  }
  catch(err) {
    console.log(err)
    return err
  }
}

module.exports = insertNewPost;