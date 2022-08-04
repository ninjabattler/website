const insertNewLike = async (db, liked, post_id, user_id) => {
  try {
    const newLike = await db.query(`
      INSERT INTO likes(liked, post_id, user_id) VALUES($1, $2, $3)
    `, [liked === 'true', Number(post_id), Number(user_id)])

    return newLike
  }
  catch(err) {
    console.log(err)
    return err
  }
}

module.exports = insertNewLike;