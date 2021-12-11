const insertNewComment = async (db, content, post_id, user_id) => {
  try {
    const newComment = await db.query(`
      INSERT INTO comments(content, post_id, user_id) VALUES($1, $2, $3)
    `, [content, Number(post_id), Number(user_id)])

    return newComment
  }
  catch(err) {
    console.log(err)
    return err
  }
}

module.exports = insertNewComment;