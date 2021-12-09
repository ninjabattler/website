const deleteLike = async (prisma, post_id, user_id) => {
  const result = await  prisma.likes.deleteMany({
    where: {
      user_id: Number(user_id),
      post_id: Number(post_id)
    }
  })

  return result
}

module.exports = deleteLike
