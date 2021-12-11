const { encrypt } = require('../../helpers/encryptHelper')
const insertNewUser = async (db, ip) => {
  try {
    const newUser = await db.query(`
      INSERT INTO users(username, avatar, ip)
      VALUES($1, $2, $3)
      RETURNING ${"*"}
    `, [encrypt(ip), Math.ceil(Math.random() * 4), ip])

    return newUser.rows
  }
  catch(err) {
    console.log(err)
    return err
  }
}

module.exports = insertNewUser;