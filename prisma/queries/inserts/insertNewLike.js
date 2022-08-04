const insertNewLike = async (prisma, liked, user_id, post_id) => {
  const result = await  prisma.likes.create({
    data: {
      liked: liked === 'true',
      post_id: Number(post_id),
      user_id: Number(user_id)
    }
  })

  return result
}

module.exports = insertNewLike
