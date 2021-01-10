const selectSinglePost = async (db, options={title: '', id: 0}) => {
  try {
    const post = await db.query(`
      SELECT *, TO_CHAR(date, 'MM, DD, YYYY') as formattedDate FROM posts
      WHERE lower(title) = $1 OR id = $2;
    `, [options.title, options.id])

    return post
  }
  catch(err) {
    console.log(err)
    return err
  }
}

module.exports = selectSinglePost;