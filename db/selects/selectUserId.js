const selectUserId = async (db, ip) => {
  try {
    const userId = await db.query(`
      SELECT id FROM users WHERE ip = $1
    `, [ip])

    return userId.rows
  }
  catch(err) {
    console.log(err)
    return err
  }
}

module.exports = selectUserId;