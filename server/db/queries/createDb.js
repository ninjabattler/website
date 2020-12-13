const createDb = async (db) => {
  try {
    await db.query(`
      DROP TABLE IF EXISTS post;

      CREATE TABLE post (
        title VARCHAR(255),
        thumbnail VARCHAR(255),
        date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        review BOOL NOT NULL DEFAULT false,
        colour VARCHAR(255),
        content TEXT
      );
    `)

    return true
  }
  catch(err) {
    console.log(err)
    return err
  }
}

module.exports = createDb;