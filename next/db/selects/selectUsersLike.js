const selectUsersLike = async (db, user_id) => {
  try {
    const userId = await db.query(`
      SELECT * FROM likes WHERE user_id = $1
    `, [Number(user_id)])

    return userId.rows
  }
  catch(err) {
    console.log(err)
    return err
  }
}

module.exports = selectUsersLike;