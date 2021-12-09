const selectSingleArticle = async (prisma, title) => {
  const result = await prisma.$queryRaw`
  SELECT *, TO_CHAR(date, 'MM, DD, YYYY') as formattedDate,
  (SELECT COUNT(*) FROM likes WHERE liked = true AND likes.post_id = posts.id) as likes,
  (SELECT COUNT(*) FROM likes WHERE liked = false AND likes.post_id = posts.id) as dislikes
  FROM posts
  WHERE lower(title) = ${title};
  `

  return result
}

module.exports = selectSingleArticle
