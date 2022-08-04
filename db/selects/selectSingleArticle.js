const selectSingleArticle = async (db, title) => {
  try {
    const article = await db.query(`
    SELECT posts.*, TO_CHAR(posts.date, 'MM, DD, YYYY') as formattedDate, TO_CHAR(posts.date, 'YYYY-MM-DD HH24:MI:SS.MSZ') as date,
    (SELECT COUNT(*) FROM likes WHERE liked = true AND likes.post_id = posts.id) as likes,
    (SELECT COUNT(*) FROM likes WHERE liked = false AND likes.post_id = posts.id) as dislikes,
    json_agg(
      json_build_object(
        'content', comments.content,
        'date', comments.date,
        'avatar', users.avatar,
        'username', users.username,
        'user_id', users.id
      )
      ORDER BY comments.date DESC
    ) as comments
    FROM posts
    FULL OUTER JOIN comments ON comments.post_id = posts.id
    FULL OUTER JOIN users ON comments.user_id = users.id
    WHERE lower(title) = $1
    GROUP BY posts.id;
    `, [title])

    return article.rows
  }
  catch (err) {
    console.log(err)
    return err
  }
}

module.exports = selectSingleArticle;