const selectAllPostsData = async (prisma) => {
  const result = await prisma.$queryRaw`
  SELECT posts.*, json_agg(
    json_build_object(
      'content', comments.content,
      'date', comments.date,
      'avatar', users.avatar,
      'username', users.username
    )
    ORDER BY comments.date DESC
  ) as comments
  FROM posts
  FULL OUTER JOIN comments ON comments.post_id = posts.id
  FULL OUTER JOIN users ON comments.user_id = users.id
  WHERE review = false
  GROUP BY posts.id`

  return result
}

module.exports = selectAllPostsData
