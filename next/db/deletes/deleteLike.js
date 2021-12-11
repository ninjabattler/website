const deleteLike = async (db, post_id, user_id) => {
  try {
    const deletedLike = await db.query(`
      DELETE FROM likes WHERE post_id = $1 AND user_id = $2
    `, [Number(post_id), Number(user_id)])

    return deletedLike
  }
  catch(err) {
    console.log(err)
    return err
  }
}

module.exports = deleteLike;