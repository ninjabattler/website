const selectUsersLike = async (prisma, user_id) => {
  const result = await  prisma.likes.findMany({
    where: {
      user_id: Number(user_id)
    }
  })

  return result
}

module.exports = selectUsersLike
