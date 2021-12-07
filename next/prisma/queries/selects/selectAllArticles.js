const selectAllArticles = async (prisma) => {
  const result = await prisma.$queryRaw`
  SELECT * FROM posts WHERE review = true ORDER BY date DESC`

  return result
}

module.exports = selectAllArticles
