const selectSingleArticle = async (prisma, title) => {
  const result = await prisma.$queryRaw`
  SELECT posts.*, TO_CHAR(posts.date, 'MM, DD, YYYY') as formattedDate,
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
  WHERE lower(title) = ${title}
  GROUP BY posts.id;
  `

  return result
}

module.exports = selectSingleArticle
